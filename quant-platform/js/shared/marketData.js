import { formatReadinessStatus } from "./format.js";

export const marketData = window.INTERNAL_QUANT_DAILY_TRADING_DATA || {
  strategies: [],
  decisions: {},
  symbols: {},
  daily_data: {},
  data_readiness: {},
  symbol_index: [],
};

export const symbolIndex = marketData.symbol_index || [];
export const symbolIndexBySymbol = Object.fromEntries(symbolIndex.map((item) => [item.symbol, item]));

export function defaultStrategyProfile() {
  return marketData.project?.default_strategy_profile || marketData.strategies?.[0]?.profile_name || "";
}

export function strategyByProfile(profileName) {
  return (marketData.strategies || []).find((item) => item.profile_name === profileName) || marketData.strategies?.[0] || {};
}

export function decisionByProfile(profileName) {
  return marketData.decisions?.[profileName] || {};
}

export function stockBySymbol(symbol) {
  return marketData.symbols?.[symbol];
}

export function symbolName(symbol) {
  return stockBySymbol(symbol)?.name || symbolIndexBySymbol[symbol]?.name || "";
}

export function normalizeSymbol(value, fallbackSymbol = marketData.default_symbol || "") {
  const raw = String(value || "").trim().split(/\s+/)[0].toUpperCase();
  if (!raw) return fallbackSymbol;
  const directMatch = symbolIndex.find((item) => item.name === raw || String(item.name || "").toUpperCase() === raw);
  if (directMatch) return directMatch.symbol;
  if (raw.includes(".")) return raw;
  const codeMatch = raw.match(/\d{1,6}/)?.[0];
  if (!codeMatch) return fallbackSymbol;
  const code = codeMatch.padStart(6, "0");
  if (code.startsWith("6")) return `${code}.SH`;
  if (code.startsWith("8") || code.startsWith("4") || code.startsWith("9")) return `${code}.BJ`;
  return `${code}.SZ`;
}

export function selectedSymbols(profileName, manualSymbols = []) {
  const strategySymbols = decisionByProfile(profileName).selected_symbols || [];
  return [...strategySymbols, ...manualSymbols.filter((symbol) => !strategySymbols.includes(symbol))];
}

export function candidateRows(profileName) {
  return decisionByProfile(profileName).ranked_candidates || [];
}

export function statusItems(profileName) {
  const daily = marketData.daily_data || {};
  const readiness = marketData.data_readiness || {};
  const decision = decisionByProfile(profileName);
  return [
    ["日线日期", daily.latest_trade_date || "n/a"],
    ["股票池", daily.symbol_count || 0],
    ["候选", decision.eligible_symbol_count || 0],
    ["入选", (decision.selected_symbols || []).length],
    ["数据", formatReadinessStatus(readiness.status)],
  ];
}

export async function ensureStockLoaded(symbol, limit = 260) {
  const normalized = normalizeSymbol(symbol);
  const requestedLimit = Number(limit || 0);
  const existing = marketData.symbols?.[normalized];
  if (existing) {
    const existingLimit = Number(existing.dailyLimit ?? existing.bars?.length ?? 0);
    const existingIsFull = existing.dailyLimit === 0;
    const hasEnoughPartial = requestedLimit > 0 && (existingIsFull || (existing.bars || []).length >= requestedLimit || existingLimit >= requestedLimit);
    if (requestedLimit === 0 ? existingIsFull : hasEnoughPartial) return existing;
  }
  if (!window.location.protocol.startsWith("http")) return existing || null;
  try {
    const response = await fetch(`/api/daily/bars?symbol=${encodeURIComponent(normalized)}&limit=${limit}`);
    if (!response.ok) return null;
    const payload = await response.json();
    if (!payload.bars?.length) return null;
    const bars = payload.bars;
    const latest = bars[bars.length - 1];
    const previous = marketData.symbols?.[normalized] || {};
    marketData.symbols[normalized] = {
      ...previous,
      symbol: normalized,
      name: previous.name || symbolName(normalized),
      security_id: latest.security_id,
      latest,
      stats: buildStats(bars),
      signal: previous.signal || null,
      target: previous.target || null,
      bars,
      dailyLimit: requestedLimit,
    };
    return marketData.symbols[normalized];
  } catch (_error) {
    return existing || null;
  }
}

export async function loadIntradayBars(stock, limit = 0) {
  if (!stock) return [];
  const requestedLimit = Number(limit || 0);
  const cachedLimit = Number(stock.intradayLimit ?? -1);
  if (stock.intradayLoaded && (cachedLimit === 0 || (requestedLimit > 0 && cachedLimit >= requestedLimit))) return stock.intradayBars || [];
  stock.intradayLoaded = true;
  stock.intradayLimit = requestedLimit;
  if (!window.location.protocol.startsWith("http")) return [];
  try {
    const response = await fetch(`/api/intraday/bars?symbol=${encodeURIComponent(stock.symbol)}&limit=${requestedLimit}`);
    if (!response.ok) return [];
    const payload = await response.json();
    stock.intradayBars = (payload.bars || []).map((bar) => ({
      symbol: stock.symbol,
      date: bar.local_time ? bar.local_time.replace("T", " ").slice(0, 16) : bar.bar_time,
      time: bar.local_time || bar.bar_time,
      open: bar.open,
      high: bar.high,
      low: bar.low,
      close: bar.close,
      volume: bar.volume,
      amount: bar.amount,
      pct_chg: 0,
      turn: 0,
    }));
    return stock.intradayBars;
  } catch (_error) {
    return [];
  }
}

export function buildStats(bars) {
  const latest = bars[bars.length - 1] || {};
  const latestClose = Number(latest.close || 0);
  const returnPct = (lookback) => {
    if (bars.length <= lookback) return 0;
    const base = Number(bars[bars.length - 1 - lookback].close || 0);
    return base > 0 ? ((latestClose / base) - 1) * 100 : 0;
  };
  const amountWindow = bars.slice(-20);
  const priceWindow = bars.slice(-60);
  return {
    return_20d_pct: returnPct(20),
    return_60d_pct: returnPct(60),
    avg_amount_20d: amountWindow.reduce((sum, bar) => sum + Number(bar.amount || 0), 0) / Math.max(amountWindow.length, 1),
    high_60d: Math.max(...priceWindow.map((bar) => Number(bar.high || 0))),
    low_60d: Math.min(...priceWindow.map((bar) => Number(bar.low || 0))),
  };
}

export function aggregateBars(bars, period) {
  const groups = {};
  bars.forEach((bar) => {
    const date = new Date(`${bar.date}T00:00:00`);
    let key = bar.date;
    if (period === "week") {
      const first = new Date(date);
      first.setDate(date.getDate() - ((date.getDay() + 6) % 7));
      key = first.toISOString().slice(0, 10);
    } else if (period === "month") {
      key = bar.date.slice(0, 7);
    }
    groups[key] ||= [];
    groups[key].push(bar);
  });
  return Object.entries(groups).map(([key, rows]) => {
    const first = rows[0];
    const last = rows[rows.length - 1];
    return {
      date: key,
      open: first.open,
      high: Math.max(...rows.map((item) => Number(item.high))),
      low: Math.min(...rows.map((item) => Number(item.low))),
      close: last.close,
      volume: rows.reduce((sum, item) => sum + Number(item.volume || 0), 0),
      amount: rows.reduce((sum, item) => sum + Number(item.amount || 0), 0),
      pct_chg: first.open > 0 ? ((last.close / first.open) - 1) * 100 : 0,
      turn: rows.reduce((sum, item) => sum + Number(item.turn || 0), 0),
    };
  });
}
