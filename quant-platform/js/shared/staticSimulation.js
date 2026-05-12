import { marketData, symbolName } from "./marketData.js";

const consoleData = () => window.INTERNAL_QUANT_TRADING_CONSOLE_DATA || {};

export function staticStrategyPayload() {
  const consoleStrategies = consoleData().strategies || [];
  const strategies = (marketData.strategies || []).length ? marketData.strategies : consoleStrategies;
  const fallbackProfile = {
    profile_name: "public_preview",
    strategy_id: "public_preview",
    label: "公网预览（连接 spark 后端后显示真实策略）",
    top_n: 0,
  };
  return {
    profiles: strategies.length ? strategies : [fallbackProfile],
    trading_policies: [
      {
        policy_id: "equal_weight_daily_rebalance",
        label: "等权每日调仓",
      },
    ],
    default_trading_policy: "equal_weight_daily_rebalance",
    default_profile: strategies[0]?.profile_name || fallbackProfile.profile_name,
    static_fallback: true,
  };
}

export function buildStaticTradingCalendar() {
  const dailyDates = sortedUnique(
    Object.values(marketData.symbols || {})
      .flatMap((stock) => stock?.bars || [])
      .map((bar) => String(bar.date || "").slice(0, 10))
      .filter(Boolean)
  );
  const intradayDates = sortedUnique(
    Object.values(consoleData().market_replay?.symbols || {})
      .flatMap((item) => item?.bars || [])
      .map((bar) => String(bar.date || "").slice(0, 10))
      .filter(Boolean)
  );
  const calendarsByFrequency = {
    "1d": frequencyCalendar(dailyDates),
    "1w": frequencyCalendar(bucketLastDates(dailyDates, weekKey)),
    "1mo": frequencyCalendar(bucketLastDates(dailyDates, monthKey)),
  };
  if (intradayDates.length) {
    for (const frequency of ["5m", "15m", "30m", "60m", "120m"]) {
      calendarsByFrequency[frequency] = frequencyCalendar(intradayDates);
    }
  }
  return {
    trade_dates: dailyDates,
    calendars_by_frequency: calendarsByFrequency,
    static_fallback: true,
    spark_local_only: true,
    coverage_notes: [
      "公网静态版只携带少量预览数据，用于界面演示。",
      "完整多年日线、5分钟线和派生分钟线保留在 spark 本地后端，不上传浏览器或 GitHub Pages。",
      "请通过 SSH 转发后的 http://127.0.0.1:8788/ 使用完整选股、回测和模拟交易能力。",
    ],
  };
}

export function buildStaticBacktest({ strategy, tradingPolicy = "", start, end, initialCash = 100000, frequency = "1d" } = {}) {
  const normalizedFrequency = normalizeFrequency(frequency);
  if (isIntradayFrequency(normalizedFrequency)) {
    return buildStaticIntradayBacktest({ strategy, tradingPolicy, start, end, initialCash, frequency: normalizedFrequency });
  }
  return buildStaticDailyBacktest({ strategy, tradingPolicy, start, end, initialCash, frequency: normalizedFrequency });
}

function buildStaticDailyBacktest({ strategy, tradingPolicy = "", start, end, initialCash = 100000, frequency = "1d" } = {}) {
  const selectedSymbols = staticSelectedSymbols(strategy);
  const dailyBarsBySymbol = barsBySymbolFor(selectedSymbols);
  const dates = datesForStaticDailyRequest(dailyBarsBySymbol, start, end, frequency);
  if (!selectedSymbols.length || !dates.length) {
    throw new Error("公网静态版没有足够的本地预览数据生成这段时间线；请使用 spark 后端入口运行完整回测。");
  }
  const result = simulateEqualWeightTimeline({
    dates,
    selectedSymbols,
    initialCash,
    priceFor: (symbol, date) => dailyBarsBySymbol[symbol]?.get(date),
    timeFor: (_symbol, date) => date,
    frequency,
    tradingPolicy,
    strategy,
  });
  return result;
}

function buildStaticIntradayBacktest({ strategy, tradingPolicy = "", start, end, initialCash = 100000, frequency = "5m" } = {}) {
  const selectedSymbols = staticSelectedSymbols(strategy);
  const rawSymbols = consoleData().market_replay?.symbols || {};
  const barsBySymbol = {};
  for (const symbol of selectedSymbols) {
    const bars = Array.isArray(rawSymbols[symbol]?.bars) ? rawSymbols[symbol].bars : [];
    barsBySymbol[symbol] = bars
      .filter((bar) => {
        const date = String(bar.date || "").slice(0, 10);
        return (!start || date >= start) && (!end || date <= end);
      })
      .map((bar) => ({
        ...bar,
        date: String(bar.date || "").slice(0, 10),
        as_of: localTimeFromBaoStock(bar.time, bar.time_utc),
      }));
  }
  const byTime = new Map();
  for (const symbol of selectedSymbols) {
    for (const bar of barsBySymbol[symbol] || []) {
      const key = bar.as_of || `${bar.date} 15:00`;
      if (!byTime.has(key)) byTime.set(key, {});
      byTime.get(key)[symbol] = bar;
    }
  }
  let times = [...byTime.keys()].sort();
  const bucketSize = { "5m": 1, "15m": 3, "30m": 6, "60m": 12, "120m": 24 }[frequency] || 1;
  if (bucketSize > 1) {
    times = times.filter((_time, index) => index % bucketSize === bucketSize - 1);
  }
  if (!selectedSymbols.length || !times.length) {
    throw new Error("公网静态版只携带少量分钟线预览数据，当前范围不能生成分钟级时间线；请使用 spark 后端入口运行完整分钟级模拟。");
  }
  const result = simulateEqualWeightTimeline({
    dates: times,
    selectedSymbols,
    initialCash,
    priceFor: (symbol, time) => byTime.get(time)?.[symbol],
    timeFor: (_symbol, time) => time,
    frequency,
    tradingPolicy,
    strategy,
  });
  return result;
}

function simulateEqualWeightTimeline({ dates, selectedSymbols, initialCash, priceFor, timeFor, frequency, tradingPolicy, strategy }) {
  const cashBuffer = 0.02;
  let cash = Number(initialCash || 100000);
  const positions = {};
  const timeline = [];
  const allOrders = [];
  let peakEquity = cash;
  let maxDrawdownPct = 0;
  for (const [index, date] of dates.entries()) {
    const prices = {};
    for (const symbol of selectedSymbols) {
      const bar = priceFor(symbol, date);
      if (bar?.close) prices[symbol] = Number(bar.close);
    }
    let equityBefore = cash + Object.entries(positions).reduce((total, [symbol, quantity]) => total + Number(quantity || 0) * Number(prices[symbol] || 0), 0);
    const orders = [];
    const targetValue = selectedSymbols.length ? (equityBefore * (1 - cashBuffer)) / selectedSymbols.length : 0;
    for (const symbol of selectedSymbols) {
      const price = Number(prices[symbol] || 0);
      if (!price) continue;
      const targetQuantity = Math.max(0, Math.floor(targetValue / price / 100) * 100);
      const currentQuantity = Number(positions[symbol] || 0);
      const delta = targetQuantity - currentQuantity;
      if (Math.abs(delta) < 100) continue;
      const side = delta > 0 ? "buy" : "sell";
      let quantity = Math.abs(delta);
      let notional = quantity * price;
      let fee = estimateFee(side, notional);
      if (side === "buy" && cash < notional + fee) {
        quantity = Math.max(0, Math.floor((cash / (price * 1.001)) / 100) * 100);
        notional = quantity * price;
        fee = estimateFee(side, notional);
      }
      const status = quantity >= 100 ? "filled" : "rejected";
      if (status === "filled") {
        if (side === "buy") {
          cash -= notional + fee;
          positions[symbol] = currentQuantity + quantity;
        } else {
          cash += notional - fee;
          positions[symbol] = Math.max(0, currentQuantity - quantity);
        }
      }
      const order = {
        trade_date: String(date).slice(0, 10),
        as_of: timeFor(symbol, date),
        symbol,
        name: symbolName(symbol),
        side,
        quantity: status === "filled" ? quantity : 0,
        filled_quantity: status === "filled" ? quantity : 0,
        requested_quantity: Math.abs(delta),
        fill_price: price,
        notional: status === "filled" ? notional : 0,
        transaction_cost: status === "filled" ? fee : 0,
        status,
        reject_reason: status === "filled" ? "" : "static_preview_cash_limit",
        source: "static_preview",
      };
      orders.push(order);
      allOrders.push(order);
    }
    const grossMarketValue = Object.entries(positions).reduce((total, [symbol, quantity]) => total + Number(quantity || 0) * Number(prices[symbol] || 0), 0);
    const equity = cash + grossMarketValue;
    peakEquity = Math.max(peakEquity, equity);
    const drawdownPct = peakEquity > 0 ? ((equity / peakEquity) - 1) * 100 : 0;
    maxDrawdownPct = Math.min(maxDrawdownPct, drawdownPct);
    timeline.push({
      step_index: index + 1,
      trade_date: String(date).slice(0, 10),
      as_of: String(date),
      equity,
      cash,
      gross_market_value: grossMarketValue,
      position_count: Object.values(positions).filter((quantity) => Number(quantity || 0) > 0).length,
      selected_symbols: selectedSymbols,
      return_pct: Number(initialCash) > 0 ? ((equity / Number(initialCash)) - 1) * 100 : 0,
      orders,
    });
  }
  const finalEquity = Number(timeline[timeline.length - 1]?.equity || initialCash || 0);
  return {
    profile_name: strategy,
    strategy_id: strategy,
    trading_policy_id: tradingPolicy || "equal_weight_daily_rebalance",
    requested_start_date: String(dates[0] || "").slice(0, 10),
    requested_end_date: String(dates[dates.length - 1] || "").slice(0, 10),
    resolved_start_date: String(dates[0] || "").slice(0, 10),
    resolved_end_date: String(dates[dates.length - 1] || "").slice(0, 10),
    data_frequency: frequency,
    base_data_frequency: isIntradayFrequency(frequency) ? "5m" : "1d",
    initial_cash: Number(initialCash || 100000),
    final_equity: finalEquity,
    total_return: Number(initialCash) > 0 ? (finalEquity / Number(initialCash)) - 1 : 0,
    total_return_pct: Number(initialCash) > 0 ? ((finalEquity / Number(initialCash)) - 1) * 100 : 0,
    max_drawdown_pct: maxDrawdownPct,
    day_count: timeline.length,
    step_count: timeline.length,
    order_count: allOrders.length,
    timeline,
    orders: allOrders,
    selected_symbols: selectedSymbols,
    static_fallback: true,
    static_fallback_note: "公网静态版已使用打包预览数据生成时间线；完整全市场动态选股和真实分钟级回放请使用 spark 后端入口。",
  };
}

function staticSelectedSymbols(strategy) {
  const decision = marketData.decisions?.[strategy] || consoleData().decisions?.[strategy] || Object.values(marketData.decisions || {})[0] || {};
  const selected = Array.isArray(decision.selected_symbols) ? decision.selected_symbols : [];
  const ranked = Array.isArray(decision.ranked_candidates) ? decision.ranked_candidates.map((item) => item.symbol).filter(Boolean) : [];
  const topN = Number((marketData.strategies || []).find((item) => item.profile_name === strategy)?.top_n || selected.length || 2);
  return [...new Set((selected.length ? selected : ranked).filter(Boolean))].slice(0, Math.max(1, topN));
}

function barsBySymbolFor(symbols) {
  const output = {};
  for (const symbol of symbols) {
    output[symbol] = new Map((marketData.symbols?.[symbol]?.bars || []).map((bar) => [String(bar.date || "").slice(0, 10), bar]));
  }
  return output;
}

function datesForStaticDailyRequest(barsBySymbol, start, end, frequency) {
  const dateSets = Object.values(barsBySymbol).filter((bars) => bars?.size).map((bars) => new Set([...bars.keys()]));
  const baseDates = dateSets.length
    ? [...dateSets[0]].filter((date) => dateSets.every((set) => set.has(date)))
    : [];
  const dates = sortedUnique(baseDates)
    .filter((date) => (!start || date >= start) && (!end || date <= end));
  if (frequency === "1w") return bucketLastDates(dates, weekKey);
  if (frequency === "1mo") return bucketLastDates(dates, monthKey);
  return dates;
}

function frequencyCalendar(dates) {
  const tradeDates = sortedUnique(dates);
  return {
    trade_dates: tradeDates,
    count: tradeDates.length,
    first_trade_date: tradeDates[0] || "",
    latest_trade_date: tradeDates[tradeDates.length - 1] || "",
    available_months: sortedUnique(tradeDates.map((date) => date.slice(0, 7))),
    available_years: sortedUnique(tradeDates.map((date) => date.slice(0, 4))),
  };
}

function bucketLastDates(dates, keyFn) {
  const latestByKey = new Map();
  for (const date of sortedUnique(dates)) latestByKey.set(keyFn(date), date);
  return [...latestByKey.values()].sort();
}

function normalizeFrequency(value) {
  const raw = String(value || "").toLowerCase();
  const aliases = {
    "5": "5m", "5m": "5m", "15": "15m", "15m": "15m", "30": "30m", "30m": "30m",
    "60": "60m", "60m": "60m", "120": "120m", "120m": "120m",
    day: "1d", daily: "1d", "1d": "1d", week: "1w", weekly: "1w", "1w": "1w",
    month: "1mo", monthly: "1mo", "1mo": "1mo",
  };
  return aliases[raw] || "1d";
}

function isIntradayFrequency(value) {
  return ["5m", "15m", "30m", "60m", "120m"].includes(normalizeFrequency(value));
}

function weekKey(date) {
  const value = new Date(`${date}T00:00:00Z`);
  const day = (value.getUTCDay() + 6) % 7;
  value.setUTCDate(value.getUTCDate() - day);
  return value.toISOString().slice(0, 10);
}

function monthKey(date) {
  return String(date || "").slice(0, 7);
}

function localTimeFromBaoStock(time, fallbackUtc) {
  const raw = String(time || "");
  if (/^\d{14}/.test(raw)) {
    return `${raw.slice(0, 4)}-${raw.slice(4, 6)}-${raw.slice(6, 8)} ${raw.slice(8, 10)}:${raw.slice(10, 12)}`;
  }
  return String(fallbackUtc || "").replace("T", " ").slice(0, 16);
}

function estimateFee(side, notional) {
  if (notional <= 0) return 0;
  const commission = Math.max(notional * 2.5 / 10000, 5);
  const transfer = notional * 0.1 / 10000;
  const stamp = side === "sell" ? notional * 5 / 10000 : 0;
  return commission + transfer + stamp;
}

function sortedUnique(values) {
  return [...new Set((values || []).filter(Boolean).map(String))].sort();
}
