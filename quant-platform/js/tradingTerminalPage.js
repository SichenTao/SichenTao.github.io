import { escapeHtml, formatMoney, formatNumber, formatPrice, formatSignedPct, roundLot } from "./shared/format.js";
import {
  aggregateBars,
  buildStats,
  candidateRows,
  decisionByProfile,
  defaultStrategyProfile,
  ensureStockLoaded,
  loadIntradayBars,
  marketData,
  normalizeSymbol,
  selectedSymbols,
  stockBySymbol,
  strategyByProfile,
  symbolName,
} from "./shared/marketData.js";
import { KLineChart } from "./shared/klineChart.js";
import { DEFAULT_INITIAL_CASH, accountIdForMode, loadAccountState, preflightAccountOrder, submitAccountOrder } from "./shared/accountApi.js";
import { SymbolSearch } from "./shared/symbolSearch.js";
import { setupGlobalNavigation } from "./shared/navigation.js";
import { currentSimulationStep, loadSimulationScenario, localizeScenarioMessage, setupSimulationScenarioBar, showScenarioLoading } from "./shared/simulationScenario.js";
import { loadStrategies } from "./shared/simulationApi.js";

const params = new URLSearchParams(window.location.search);
const initialProfile = params.get("strategy") || defaultStrategyProfile();
const initialSymbol = normalizeSymbol(params.get("symbol") || marketData.default_symbol || "", marketData.default_symbol || "");
const initialMode = params.get("mode") || "paper";
const initialAccountId = params.get("account") || accountIdForMode(initialMode);
const requestedPeriod = params.get("period") || "daily";
const initialPeriod = normalizePeriod(requestedPeriod);
const requestedAsOf = params.get("as_of") || params.get("date") || "";
const requestedSide = params.get("side") === "sell" ? "sell" : "buy";
const requestedPrice = Number(params.get("price") || 0);
const requestedQuantity = Number(params.get("quantity") || 0);
const requestedSource = params.get("source") || "";
const requestedStatus = params.get("status") || "";
const requestedReason = params.get("reason") || params.get("reject_reason") || "";
let accountState = null;

const STANDARD_PERIODS = ["5m", "15m", "30m", "60m", "120m", "daily", "weekly", "monthly"];
const DEFAULT_MA_PERIODS = [5, 10, 20, 30, 60, 250];

const state = {
  profileName: initialProfile,
  symbol: initialSymbol,
  accountId: initialAccountId,
  accountMode: initialMode,
  manualSymbols: [],
  strategies: [],
  period: isSupportedPeriod(initialPeriod) ? initialPeriod : "daily",
  indicators: ["VOL"],
  overlays: { MA: true, BOLL: false },
  maPeriods: DEFAULT_MA_PERIODS,
  customPeriods: [],
  settingsPanel: "",
  drawTool: "crosshair",
  scale: "normal",
  orderMode: "normal",
  orderSide: requestedSide,
  orderMessage: "",
  orderRisk: null,
  orderRiskRequestId: 0,
  replayBars: [],
  replaySymbol: "",
  replayIndex: -1,
  replayTimer: null,
  requestedAsOf,
  recommendation: requestedSource === "strategy_suggestion"
    ? {
        symbol: initialSymbol,
        side: requestedSide,
        price: requestedPrice,
        quantity: requestedQuantity,
        status: requestedStatus,
        reason: requestedReason,
      }
    : null,
};

let orderRiskTimer = null;
let tickerLoadRequestId = 0;
let chartRenderRequestId = 0;

const els = {
  symbolInput: document.getElementById("symbol-input"),
  modeSelect: document.getElementById("mode-select"),
  suggestions: document.getElementById("symbol-suggestions"),
  accountLink: document.getElementById("account-link"),
  strategyList: document.getElementById("strategy-list"),
  strategyMeta: document.getElementById("strategy-meta"),
  watchList: document.getElementById("watch-list"),
  watchMeta: document.getElementById("watch-meta"),
  poolFilter: document.getElementById("pool-filter"),
  marketTicker: document.getElementById("market-ticker"),
  stockRank: document.getElementById("stock-rank"),
  stockTitle: document.getElementById("stock-title"),
  stockName: document.getElementById("stock-name"),
  quoteGrid: document.getElementById("quote-grid"),
  rangeRow: document.getElementById("range-row"),
  accountModeLabel: document.getElementById("account-mode-label"),
  accountGrid: document.getElementById("account-grid"),
  strategySuggestion: document.getElementById("strategy-suggestion"),
  orderPrice: document.getElementById("order-price"),
  orderQuantity: document.getElementById("order-quantity"),
  orderPriceLabel: document.getElementById("order-price-label"),
  orderQuantityLabel: document.getElementById("order-quantity-label"),
  triggerPrice: document.getElementById("trigger-price"),
  conditionPanel: document.getElementById("condition-panel"),
  replayPanel: document.getElementById("replay-panel"),
  ticketHint: document.getElementById("ticket-hint"),
  targetCard: document.getElementById("target-card"),
  positionCard: document.getElementById("position-card"),
  ledger: document.getElementById("ledger"),
  signalMeta: document.getElementById("signal-meta"),
  signalGrid: document.getElementById("signal-grid"),
  barMeta: document.getElementById("bar-meta"),
  dailyTape: document.getElementById("daily-tape"),
  ticketSymbol: document.getElementById("ticket-symbol"),
  chartSettingsPanel: document.getElementById("chart-settings-panel"),
  chartNote: document.getElementById("chart-note"),
  statusMarket: document.getElementById("status-market"),
  statusSession: document.getElementById("status-session"),
  replayStep: document.getElementById("replay-step"),
  replaySpeed: document.getElementById("replay-speed"),
  replayPrev: document.getElementById("replay-prev"),
  replayPlay: document.getElementById("replay-play"),
  replayNext: document.getElementById("replay-next"),
};

const chart = new KLineChart({
  svg: document.getElementById("daily-chart"),
  zoomRange: document.getElementById("zoom-range"),
  zoomLabel: document.getElementById("zoom-label"),
  zoomReset: document.getElementById("zoom-reset"),
  noteEl: els.chartNote,
});

new SymbolSearch({
  input: els.symbolInput,
  suggestions: els.suggestions,
  onSelect: async (symbol) => {
    await selectSymbol(symbol);
  },
});

setupSimulationScenarioBar({
  mode: state.accountMode,
  getGenerationConfig: () => ({
    strategy: state.profileName,
  }),
  onIndexChange: async (scenario) => {
    const step = currentSimulationStep(scenario);
    state.requestedAsOf = step?.asOf || step?.tradeDate || state.requestedAsOf;
    state.recommendation = null;
    const scenarioPeriod = terminalPeriodForSimulationFrequency(scenario?.frequency);
    if (scenarioPeriod) state.period = scenarioPeriod;
    resetReplayState();
    render();
    updateUrl();
  },
});

bindEvents();
const hideLoading = showScenarioLoading("正在初始化交易终端...");
try {
  await loadTerminalStrategies();
  await ensureStockLoaded(state.symbol, 0);
  accountState = await loadAccountState({
    accountId: state.accountId,
    mode: state.accountMode,
    initialCash: activeStrategyInitialCash(),
  });
  render();
} finally {
  hideLoading();
}

function bindEvents() {
  document.getElementById("open-symbol").addEventListener("click", () => selectSymbol(normalizeSymbol(els.symbolInput.value, state.symbol)));
  els.modeSelect.addEventListener("change", async () => {
    state.accountMode = els.modeSelect.value;
    state.accountId = accountIdForMode(state.accountMode);
    state.orderRisk = null;
    accountState = await loadAccountState({
      accountId: state.accountId,
      mode: state.accountMode,
      initialCash: activeStrategyInitialCash(),
    });
    render();
    updateUrl();
  });
  document.getElementById("back-selection").addEventListener("click", (event) => {
    event.currentTarget.href = `./stock_selection.html?strategy=${encodeURIComponent(state.profileName)}&symbol=${encodeURIComponent(state.symbol)}&mode=${encodeURIComponent(state.accountMode)}&account=${encodeURIComponent(state.accountId)}`;
  });
  document.getElementById("buy-button").addEventListener("mouseenter", () => setOrderSide("buy"));
  document.getElementById("sell-button").addEventListener("mouseenter", () => setOrderSide("sell"));
  document.getElementById("buy-button").addEventListener("focus", () => setOrderSide("buy"));
  document.getElementById("sell-button").addEventListener("focus", () => setOrderSide("sell"));
  document.getElementById("buy-button").addEventListener("click", () => submitOrder("buy"));
  document.getElementById("sell-button").addEventListener("click", () => submitOrder("sell"));
  els.orderPrice.addEventListener("input", () => {
    markRecommendedInputEdit(els.orderPrice);
    queueOrderRiskRefresh();
  });
  els.orderQuantity.addEventListener("input", () => {
    markRecommendedInputEdit(els.orderQuantity);
    queueOrderRiskRefresh();
  });
  bindRecommendedFillOnTab(els.orderPrice, () => queueOrderRiskRefresh());
  bindRecommendedFillOnTab(els.orderQuantity, () => queueOrderRiskRefresh());
  els.poolFilter.addEventListener("input", () => renderWatchList());
  document.querySelectorAll(".order-type-tabs button").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".order-type-tabs button").forEach((item) => item.classList.toggle("is-active", item === button));
    });
  });
  document.querySelectorAll(".operation-tabs [data-order-mode]").forEach((button) => {
    button.addEventListener("click", () => setOrderMode(button.dataset.orderMode));
  });
  els.replayPrev.addEventListener("click", () => stepReplay(-1));
  els.replayNext.addEventListener("click", () => stepReplay(1));
  els.replayPlay.addEventListener("click", () => toggleReplayPlayback());
  document.querySelectorAll(".quick-size [data-size]").forEach((button) => {
    button.addEventListener("click", () => applyQuickSize(button.dataset.size));
  });
  document.getElementById("chart-toolbar").addEventListener("click", async (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    if (button.dataset.period) {
      state.period = normalizePeriod(button.dataset.period);
      if (!isIntradayPeriod(state.period)) stopReplayPlayback();
      state.settingsPanel = "";
      renderToolbar();
      await renderChart();
      renderToolbar();
      updateUrl();
      return;
    }
    if (button.dataset.indicator) {
      toggleIndicator(button.dataset.indicator);
      renderToolbar();
      await renderChart();
      renderToolbar();
      return;
    }
    if (button.dataset.overlay) {
      state.overlays[button.dataset.overlay] = !state.overlays[button.dataset.overlay];
      renderToolbar();
      await renderChart();
      renderToolbar();
      return;
    }
    if (button.dataset.drawAction === "undo") {
      chart.undoDrawing();
      renderToolbar();
      return;
    }
    if (button.dataset.draw) {
      if (button.dataset.draw === "clear") {
        chart.clearDrawings();
        renderToolbar();
      } else {
        state.drawTool = button.dataset.draw;
        renderToolbar();
        await renderChart();
        renderToolbar();
      }
      return;
    }
    if (button.hasAttribute("data-ma-panel")) {
      state.settingsPanel = state.settingsPanel === "ma" ? "" : "ma";
      renderToolbar();
      return;
    }
    if (button.hasAttribute("data-period-panel")) {
      state.settingsPanel = state.settingsPanel === "period" ? "" : "period";
      renderToolbar();
    }
  });
  document.getElementById("scale-select").addEventListener("change", (event) => {
    state.scale = event.target.value;
    renderChart();
    renderToolbar();
  });
}

function markRecommendedInputEdit(input) {
  if (!input) return;
  input.dataset.userCleared = String(input.value || "").trim() ? "" : "1";
}

function setRecommendedInput(input, value, placeholder) {
  if (!input) return;
  const rendered = String(value || "");
  input.dataset.recommendedValue = rendered;
  input.placeholder = placeholder || "";
  const userCleared = input.dataset.userCleared === "1";
  const isEditingEmpty = document.activeElement === input && String(input.value || "") === "";
  if (userCleared || isEditingEmpty) return;
  input.value = rendered;
}

function forceRecommendedInput(input, value) {
  if (!input) return;
  input.dataset.userCleared = "";
  input.value = String(value || "");
}

function bindRecommendedFillOnTab(input, afterFill) {
  input?.addEventListener("keydown", (event) => {
    if (event.key !== "Tab" || String(input.value || "").trim()) return;
    const recommendedValue = input.dataset.recommendedValue || "";
    if (!recommendedValue) return;
    input.value = recommendedValue;
    input.dataset.userCleared = "";
    if (typeof afterFill === "function") afterFill();
  });
}

async function selectSymbol(symbol) {
  state.symbol = normalizeSymbol(symbol, state.symbol);
  if (state.recommendation?.symbol !== state.symbol) state.recommendation = null;
  forceRecommendedInput(els.orderPrice, "");
  forceRecommendedInput(els.orderQuantity, "");
  stopReplayPlayback();
  resetReplayState();
  await ensureStockLoaded(state.symbol, 0);
  render();
  updateUrl();
}

function render() {
  renderLinks();
  renderTerminalStatus();
  renderMarketTicker();
  renderStrategyList();
  renderWatchList();
  renderStockHeader();
  renderAccount();
  renderSignals();
  renderTape(currentDailyBars());
  renderToolbar();
  setOrderMode(state.orderMode || "normal");
  renderChart();
}

function renderLinks() {
  els.modeSelect.value = state.accountMode;
  setupGlobalNavigation({
    mode: state.accountMode,
    strategy: state.profileName,
    symbol: state.symbol,
    account: state.accountId,
    period: state.period,
  });
  const accountParams = new URLSearchParams({
    strategy: state.profileName,
    symbol: state.symbol,
    mode: state.accountMode,
    account: state.accountId,
  });
  appendScenarioParams(accountParams);
  els.accountLink.href = `./account_records.html?${accountParams.toString()}`;
}

function renderTerminalStatus() {
  const readiness = marketData.data_readiness || {};
  const daily = readiness.daily || marketData.daily_data || {};
  const intraday = readiness.intraday || {};
  const dailyRange = `${daily.first_trade_date || marketData.daily_data?.first_trade_date || "-"} 至 ${daily.last_trade_date || marketData.daily_data?.latest_trade_date || "-"}`;
  const intradayText = `${formatNumber(intraday.available_partition_count || 0)}/${formatNumber(intraday.expected_symbol_count || 0)}只 · ${formatNumber(intraday.rows_success || 0)}行`;
  els.statusMarket.textContent = `BaoStock 本地镜像 · 日线 ${dailyRange} · 5分钟 ${intradayText}`;
  if (state.orderMode !== "replay") {
    els.statusSession.textContent = state.accountMode === "live"
      ? "真实交易只读保护 · 写入已禁用"
      : isIntradayPeriod(state.period)
        ? `${periodLabel(state.period)}历史行情 · 鼠标滚轮缩放 · 横向滚动平移`
        : "交易时间 09:30-11:30 13:00-15:00";
  }
}

async function setOrderMode(mode) {
  state.orderMode = mode;
  document.querySelectorAll(".operation-tabs [data-order-mode]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.orderMode === mode);
  });
  els.conditionPanel.classList.toggle("is-hidden", mode !== "condition");
  els.replayPanel.classList.toggle("is-hidden", mode !== "replay");
  if (mode === "condition") {
    els.ticketHint.textContent = "条件单将在历史回放步进中按触发价模拟提交。";
  } else if (mode === "replay") {
    els.ticketHint.textContent = "回放模式使用5分钟历史数据逐步模拟盘中观察。";
    await prepareReplayMode();
  } else {
    stopReplayPlayback();
    renderAccount();
  }
}

function renderMarketTicker() {
  const scenarioSymbols = scenarioSelectedSymbols().slice(0, 5);
  const requestId = tickerLoadRequestId + 1;
  tickerLoadRequestId = requestId;
  if (scenarioSymbols.length) {
    const missing = scenarioSymbols.filter((symbol) => !stockBySymbol(symbol));
    if (missing.length) {
      Promise.all(missing.map((symbol) => ensureStockLoaded(symbol))).then(() => {
        if (requestId === tickerLoadRequestId) renderMarketTicker();
      }).catch(() => {});
    }
  }
  const rows = scenarioSymbols.length
    ? scenarioSymbols.map((symbol) => {
        const stock = stockBySymbol(symbol);
        const quote = currentQuote(stock);
        return {
          symbol,
          name: symbolName(symbol),
          close: quote.close || 0,
          pct_chg: quote.pct_chg || 0,
        };
      })
    : candidateRows(state.profileName).slice(0, 5);
  els.marketTicker.innerHTML = rows
    .map(
      (row) => `
        <div class="ticker-item">
          <span>${escapeHtml(row.name || symbolName(row.symbol))}</span>
          <strong>${formatPrice(row.close)}</strong>
          <em class="${normalizePercentClass(row.pct_chg)}">${formatSignedPct(row.pct_chg)}</em>
        </div>`
    )
    .join("");
}

function renderStrategyList() {
  const strategies = state.strategies.length ? state.strategies : marketData.strategies || [];
  const strategy = strategies.find((item) => item.profile_name === state.profileName) || strategyByProfile(state.profileName);
  const decision = decisionByProfile(state.profileName);
  els.strategyMeta.textContent = `${strategy.selector || "n/a"} / top ${strategy.top_n || "-"}`;
  const scenarioDate = currentAsOfDate();
  els.strategyList.innerHTML = strategies
    .map((item) => {
      const active = item.profile_name === state.profileName ? " is-active" : "";
      const itemDecision = decisionByProfile(item.profile_name);
      return `
        <button class="strategy-pill${active}" type="button" data-profile="${escapeHtml(item.profile_name)}">
          <strong>${escapeHtml(strategyDisplayName(item.profile_name))}</strong>
          <span>${item.profile_name === state.profileName ? "运行中" : "可切换"}</span>
          <span>top ${escapeHtml(item.top_n || "-")} / 初始 ${formatMoney(item.initial_cash || item.backtest_initial_cash)}</span>
          <span class="strategy-stats">
            <span>今日追踪<b>${formatNumber((itemDecision.selected_symbols || []).length)}</b></span>
            <span>候选池<b>${formatNumber(itemDecision.eligible_symbol_count || 0)}</b></span>
            <span>日期<b>${escapeHtml(scenarioDate || itemDecision.trade_date || decision.trade_date || "-")}</b></span>
          </span>
        </button>`;
    })
    .join("");
  els.strategyList.querySelectorAll("[data-profile]").forEach((button) => {
    button.addEventListener("click", () => {
      state.profileName = button.dataset.profile;
      state.symbol = selectedSymbols(state.profileName, state.manualSymbols)[0] || state.symbol;
      render();
    });
  });
}

async function loadTerminalStrategies() {
  try {
    const payload = await loadStrategies();
    state.strategies = payload.profiles || [];
  } catch (_error) {
    state.strategies = [];
  }
}

function activeStrategyInitialCash() {
  const dynamic = state.strategies.find((item) => item.profile_name === state.profileName);
  return Number(dynamic?.initial_cash || dynamic?.backtest_initial_cash || strategyByProfile(state.profileName).initial_cash || DEFAULT_INITIAL_CASH);
}

function renderWatchList() {
  const selected = scenarioSelectedSymbols().length
    ? [...scenarioSelectedSymbols(), ...state.manualSymbols.filter((symbol) => !scenarioSelectedSymbols().includes(symbol))]
    : selectedSymbols(state.profileName, state.manualSymbols);
  const candidates = candidateRows(state.profileName);
  const query = String(els.poolFilter.value || "").trim().toUpperCase();
  const rows = selected
    .map((symbol) => candidates.find((item) => item.symbol === symbol) || symbolRow(symbol))
    .filter((row) => {
      if (!query) return true;
      return row.symbol.includes(query) || String(row.name || symbolName(row.symbol)).toUpperCase().includes(query) || String(row.name || "").includes(els.poolFilter.value.trim());
    });
  els.watchMeta.textContent = `共 ${selected.length} 只`;
  els.watchList.innerHTML = `
    <table class="watch-table">
      <thead><tr><th>代码</th><th>名称</th><th>涨幅</th><th>操作</th></tr></thead>
      <tbody>
        ${rows
          .map((row) => {
            const active = row.symbol === state.symbol ? " is-active" : "";
            return `
              <tr class="${active}" data-symbol="${escapeHtml(row.symbol)}">
                <td>${escapeHtml(row.symbol.split(".")[0])}</td>
                <td>${escapeHtml(row.name || symbolName(row.symbol))}</td>
                <td class="${normalizePercentClass(row.pct_chg)}">${formatSignedPct(row.pct_chg)}</td>
                <td class="star-cell">☆</td>
              </tr>`;
          })
          .join("")}
      </tbody>
    </table>`;
  els.watchList.querySelectorAll("[data-symbol]").forEach((row) => {
    row.addEventListener("click", () => selectSymbol(row.dataset.symbol));
  });
}

function renderStockHeader() {
  const stock = currentStock();
  if (!stock) return;
  const bars = currentDailyBars();
  const latest = currentQuote(stock);
  const signal = stock.signal || {};
  const name = stock.name || symbolName(stock.symbol);
  els.stockRank.textContent = signal.rank ? `Rank ${signal.rank}` : "Watch";
  els.stockTitle.textContent = `${stock.symbol} / ${latest.date || ""}`;
  els.stockName.textContent = name;
  els.ticketSymbol.textContent = stock.symbol;
  els.symbolInput.value = `${stock.symbol} ${name}`.trim();
  els.quoteGrid.innerHTML = [
    ["最新", formatPrice(latest.close)],
    ["日涨跌", formatSignedPct(latest.pct_chg)],
    ["成交额", formatMoney(latest.amount)],
    ["换手", `${formatNumber(latest.turn)}%`],
  ]
    .map(([label, value]) => `<div class="quote-cell"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`)
    .join("");
  const stats = bars.length ? buildStats(bars) : stock.stats || {};
  els.rangeRow.innerHTML = [
    ["60日高", formatPrice(stats.high_60d)],
    ["60日低", formatPrice(stats.low_60d)],
    ["ST", latest.is_st === "1" ? "是" : "否"],
    ["状态", latest.tradestatus === "1" ? "交易" : "停牌"],
    ["数据", periodLabel(state.period)],
  ]
    .map(([label, value]) => `<div class="metric"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`)
    .join("");
}

function renderAccount() {
  const stock = currentStock();
  if (!stock || !accountState) return;
  const latest = currentQuote(stock);
  const recommendation = strategyRecommendationFor(stock);
  const summary = accountState.summary || {};
  const position = currentPosition(stock.symbol);
  const positionQty = Number(position?.quantity || 0);
  els.accountModeLabel.textContent = modeLabel(state.accountMode);
  els.accountGrid.innerHTML = [
    ["总资产", formatMoney(summary.net_liquidation_value)],
    ["可用资金", formatMoney(summary.cash_balance)],
    ["持仓市值", formatMoney(summary.positions_market_value)],
    ["总盈亏", signedMoney(summary.total_pnl)],
  ]
    .map(([label, value]) => `<div class="metric"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`)
    .join("");
  const ticketPrice = Number(recommendation?.price || latest.close || 0);
  const ticketQuantity = Number(recommendation?.quantity || suggestedQuantity(stock));
  if (recommendation) state.orderSide = recommendation.side;
  setRecommendedInput(
    els.orderPrice,
    ticketPrice > 0 ? formatPrice(ticketPrice) : "",
    recommendation?.price ? recommendedValueText(formatPrice(recommendation.price)) : "输入价格"
  );
  els.triggerPrice.value = formatPrice(ticketPrice || latest.close);
  const renderedQuantity = recommendation
    ? String(Math.max(0, Math.round(ticketQuantity)))
    : String(Math.max(100, roundLot(ticketQuantity)));
  setRecommendedInput(
    els.orderQuantity,
    renderedQuantity,
    recommendation?.quantity ? recommendedValueText(`${formatNumber(recommendation.quantity)} 股`) : "输入数量"
  );
  renderRecommendationFieldLabels(recommendation);
  document.getElementById("buy-button").textContent = `买入 ${formatPrice(ticketPrice || latest.close)}`;
  document.getElementById("sell-button").textContent = `卖出 ${formatPrice(ticketPrice || latest.close)}`;
  renderOrderSideState();
  renderStrategySuggestion(stock);
  const affordablePrice = Number(ticketPrice || latest.close || 0);
  const affordable = affordablePrice > 0 ? roundLot(Number(summary.cash_balance || 0) / affordablePrice) : 0;
  const orderMessage = state.orderMessage;
  state.orderMessage = "";
  renderOrderRiskHint({ affordable, availableSell: positionQty, message: orderMessage });
  renderOrderActionState({ recommendation, affordable, availableSell: positionQty });
  queueOrderRiskRefresh();
  const target = stock.target || {};
  els.targetCard.innerHTML = target.symbol
    ? `<strong>目标 ${formatNumber(target.target_quantity)} 股</strong><span>${formatMoney(target.target_notional)} / 参考 ${formatPrice(target.reference_price)}</span>`
    : `<strong>观察</strong><span>未在当前策略目标仓位中</span>`;
  els.positionCard.innerHTML = `
    <strong>持仓 / 目标</strong>
    <div class="position-grid">
      <span>当前持仓<strong>${formatNumber(positionQty)} 股</strong></span>
      <span>可用<strong>${formatNumber(positionQty)} 股</strong></span>
      <span>成本价<strong>${formatPrice(position?.avg_cost || 0)}</strong></span>
      <span>浮动盈亏<strong>${signedMoney(position?.unrealized_pnl || 0)}</strong></span>
    </div>`;
  const fills = accountState.fills || [];
  els.ledger.innerHTML = fills.length
    ? `<table class="ledger-table">
        <thead><tr><th>时间</th><th>价格</th><th>数量</th><th>方向</th><th>金额</th></tr></thead>
        <tbody>
          ${fills
            .slice(0, 8)
            .map(
              (item) => `
                <tr>
                  <td>${escapeHtml(displayTime(item.filled_at))}</td>
                  <td>${formatPrice(item.price)}</td>
                  <td>${formatNumber(item.quantity)}</td>
                  <td class="${item.side === "buy" ? "up" : "down"}">${item.side === "buy" ? "买入" : "卖出"}</td>
                  <td>${formatMoney(item.notional)}</td>
                </tr>`
            )
            .join("")}
        </tbody>
      </table>`
    : `<p class="muted">暂无成交</p>`;
}

function renderSignals() {
  const stock = currentStock();
  if (!stock) return;
  const signal = stock.signal || {};
  const bars = currentDailyBars();
  const stats = bars.length ? buildStats(bars) : stock.stats || {};
  els.signalMeta.textContent = signal.rank ? `score ${formatSignedPct(signal.score_pct)}` : "watchlist";
  els.signalGrid.innerHTML = [
    ["趋势信号", "多头排列", signal.score_pct, "强度"],
    ["动量信号", "上升动量", stats.return_20d_pct, "20日"],
    ["估值信号", "低位观察", stats.return_60d_pct, "60日"],
    ["资金信号", "成交活跃", stats.avg_amount_20d, "均额"],
  ]
    .map(([label, text, value, unit]) => {
      const rendered = label === "资金信号" ? formatMoney(value) : formatSignedPct(value);
      return `<div class="signal-card"><strong>${escapeHtml(label)}</strong><span>${escapeHtml(text)}</span><b class="${label === "资金信号" ? "" : normalizePercentClass(value)}">${escapeHtml(rendered)}</b><small>${escapeHtml(unit)}</small></div>`;
    })
    .join("");
}

async function renderChart() {
  const stock = currentStock();
  if (!stock) return;
  const requestId = chartRenderRequestId + 1;
  chartRenderRequestId = requestId;
  els.chartNote.textContent = "";
  const bars = await chartBars(stock);
  if (requestId !== chartRenderRequestId || stock.symbol !== state.symbol) return;
  const visibleBars = replayVisibleBars(bars);
  chart.update(visibleBars, {
    symbol: stock.symbol,
    period: state.period,
    indicators: state.indicators,
    overlays: state.overlays,
    maPeriods: state.maPeriods,
    drawTool: state.drawTool,
    scale: state.scale,
  });
  renderTape(visibleBars);
  renderStockHeader();
  renderReplayStatus();
}

function renderToolbar() {
  document.querySelectorAll("[data-period]").forEach((button) => button.classList.toggle("is-active", button.dataset.period === state.period));
  document.querySelectorAll("[data-indicator]").forEach((button) => button.classList.toggle("is-active", state.indicators.includes(button.dataset.indicator)));
  document.querySelectorAll("[data-overlay]").forEach((button) => button.classList.toggle("is-active", Boolean(state.overlays[button.dataset.overlay])));
  document.querySelectorAll("[data-draw]").forEach((button) => button.classList.toggle("is-active", button.dataset.draw === state.drawTool));
  document.querySelector("[data-ma-panel]")?.classList.toggle("is-active", state.settingsPanel === "ma");
  document.querySelector("[data-period-panel]")?.classList.toggle("is-active", state.settingsPanel === "period");
  document.getElementById("scale-select").value = state.scale;
  renderChartSettingsPanel();
}

function renderChartSettingsPanel() {
  if (!els.chartSettingsPanel) return;
  els.chartSettingsPanel.classList.toggle("is-hidden", !state.settingsPanel);
  if (!state.settingsPanel) {
    els.chartSettingsPanel.innerHTML = "";
    return;
  }
  if (state.settingsPanel === "ma") {
    const maOptions = [...new Set([...DEFAULT_MA_PERIODS, ...state.maPeriods])].sort((a, b) => a - b);
    els.chartSettingsPanel.innerHTML = `
      <div class="chart-settings-head">
        <strong>均线设置</strong>
        <span>最多显示8条，当前 ${escapeHtml(state.maPeriods.map((value) => `MA${value}`).join(" / "))}</span>
      </div>
      <div class="ma-settings-row">
        ${maOptions.map((period) => `
          <label class="setting-chip">
            <input type="checkbox" data-ma-period="${period}" ${state.maPeriods.includes(period) ? "checked" : ""} />
            <span>MA${period}</span>
          </label>`).join("")}
        <div class="custom-setting-row">
          <input id="custom-ma-period" inputmode="numeric" placeholder="输入任意天数，例如 120" />
          <button id="add-ma-period" type="button">添加</button>
        </div>
      </div>`;
    els.chartSettingsPanel.querySelectorAll("[data-ma-period]").forEach((input) => {
      input.addEventListener("change", () => {
        const period = Number(input.dataset.maPeriod || 0);
        if (input.checked) addMaPeriod(period);
        else removeMaPeriod(period);
      });
    });
    els.chartSettingsPanel.querySelector("#add-ma-period")?.addEventListener("click", () => {
      const value = Number(els.chartSettingsPanel.querySelector("#custom-ma-period")?.value || 0);
      addMaPeriod(value);
    });
    return;
  }
  const periods = [...STANDARD_PERIODS, ...state.customPeriods.filter((period) => !STANDARD_PERIODS.includes(period))];
  els.chartSettingsPanel.innerHTML = `
    <div class="chart-settings-head">
      <strong>周期设置</strong>
      <span>分钟线基于5分钟数据聚合，日线以上基于日线聚合。</span>
    </div>
    <div class="chart-settings-grid">
      ${periods.map((period) => `
        <button class="${period === state.period ? "is-active" : "secondary"}" type="button" data-settings-period="${escapeHtml(period)}">${escapeHtml(periodLabel(period))}</button>`).join("")}
    </div>
    <div class="custom-setting-row">
      <input id="custom-period-minutes" inputmode="numeric" placeholder="自定义分钟数，须为5的倍数" />
      <button id="add-custom-period" type="button">添加</button>
    </div>`;
  els.chartSettingsPanel.querySelectorAll("[data-settings-period]").forEach((button) => {
    button.addEventListener("click", async () => {
      state.period = normalizePeriod(button.dataset.settingsPeriod);
      if (!isIntradayPeriod(state.period)) stopReplayPlayback();
      await renderChart();
      renderToolbar();
      updateUrl();
    });
  });
  els.chartSettingsPanel.querySelector("#add-custom-period")?.addEventListener("click", async () => {
    const minutes = Math.round(Number(els.chartSettingsPanel.querySelector("#custom-period-minutes")?.value || 0));
    if (!Number.isFinite(minutes) || minutes < 5 || minutes % 5 !== 0) {
      els.chartNote.textContent = "自定义分钟周期需要大于等于5，且必须是5的倍数。";
      return;
    }
    const period = `${minutes}m`;
    if (!state.customPeriods.includes(period) && !STANDARD_PERIODS.includes(period)) state.customPeriods.push(period);
    state.period = period;
    await renderChart();
    renderToolbar();
    updateUrl();
  });
}

function addMaPeriod(value) {
  const period = Math.round(Number(value || 0));
  if (!Number.isFinite(period) || period < 1 || period > 999) {
    els.chartNote.textContent = "均线天数需要在 1 到 999 之间。";
    return;
  }
  state.maPeriods = [...new Set([...state.maPeriods, period])].sort((a, b) => a - b).slice(0, 8);
  state.overlays.MA = true;
  renderChart();
  renderToolbar();
}

function removeMaPeriod(value) {
  const period = Math.round(Number(value || 0));
  state.maPeriods = state.maPeriods.filter((item) => item !== period);
  if (!state.maPeriods.length) state.maPeriods = [5];
  renderChart();
  renderToolbar();
}

function toggleIndicator(value) {
  const indicator = String(value || "").toUpperCase();
  if (!["VOL", "MACD", "KDJ"].includes(indicator)) return;
  if (state.indicators.includes(indicator)) {
    if (state.indicators.length > 1) state.indicators = state.indicators.filter((item) => item !== indicator);
    return;
  }
  state.indicators = [...state.indicators, indicator].slice(-2);
}

function renderTape(bars) {
  els.barMeta.textContent = `${bars.length} bars`;
  els.dailyTape.innerHTML = `
    <table class="bar-table">
      <thead><tr><th>时间</th><th>代码</th><th>名称</th><th>价格</th><th>涨跌幅</th><th>成交量</th><th>成交额</th><th>性质</th></tr></thead>
      <tbody>
        ${bars
          .slice(-24)
          .reverse()
          .map((bar) => {
            const date = bar.date || bar.time || "";
            return `
              <tr>
                <td>${escapeHtml(date)}</td>
                <td>${escapeHtml(state.symbol.split(".")[0])}</td>
                <td>${escapeHtml(symbolName(state.symbol))}</td>
                <td class="${normalizePercentClass(bar.pct_chg)}">${formatPrice(bar.close)}</td>
                <td class="${normalizePercentClass(bar.pct_chg)}">${formatSignedPct(bar.pct_chg)}</td>
                <td>${formatNumber(bar.volume)}</td>
                <td>${formatMoney(bar.amount)}</td>
                <td>${Number(bar.pct_chg || 0) >= 0 ? "买盘" : "卖盘"}</td>
              </tr>`;
          })
          .join("")}
      </tbody>
    </table>`;
}

async function chartBars(stock) {
  const dailyBars = currentDailyBars(stock);
  if (state.period === "weekly") return aggregateBars(dailyBars, "week");
  if (state.period === "monthly") return aggregateBars(dailyBars, "month");
  if (isIntradayPeriod(state.period)) {
    const intraday = filterIntradayBarsForAsOf(await loadIntradayBars(stock, 0));
    if (intraday.length) {
      if (state.replaySymbol !== stock.symbol) {
        state.replaySymbol = stock.symbol;
        state.replayBars = intraday;
        state.replayIndex = replayIndexForAsOf(intraday, state.requestedAsOf, Math.min(intraday.length - 1, 119));
      } else {
        state.replayBars = intraday;
        if (state.replayIndex < 0 || state.replayIndex >= intraday.length) {
          state.replayIndex = replayIndexForAsOf(intraday, state.requestedAsOf, Math.min(intraday.length - 1, 119));
        }
      }
      return aggregateIntradayBars(intraday, periodMinutes(state.period));
    }
    els.chartNote.textContent = `该股票${periodLabel(state.period)}数据尚未下载完成，暂以日线图显示。`;
    return dailyBars;
  }
  return dailyBars;
}

function replayVisibleBars(bars) {
  if (state.orderMode !== "replay" || !isIntradayPeriod(state.period) || !state.replayBars.length) return bars;
  const visible = state.replayBars.slice(0, Math.max(0, state.replayIndex) + 1);
  return aggregateIntradayBars(visible, periodMinutes(state.period));
}

async function prepareReplayMode() {
  state.period = isIntradayPeriod(state.period) ? state.period : "5m";
  resetReplayState();
  await renderChart();
  if (state.replayBars.length && state.replayIndex >= state.replayBars.length - 1) {
    state.replayIndex = Math.min(state.replayBars.length - 1, 119);
    await renderChart();
  }
  renderToolbar();
  syncOrderPriceToReplay();
  updateUrl();
}

function stepReplay(direction) {
  if (!state.replayBars.length) return;
  const step = Math.max(1, Number(els.replayStep.value || 1));
  state.replayIndex = Math.max(0, Math.min(state.replayBars.length - 1, state.replayIndex + direction * step));
  syncOrderPriceToReplay();
  renderChart();
}

function toggleReplayPlayback() {
  if (state.replayTimer) {
    stopReplayPlayback();
    return;
  }
  if (!state.replayBars.length) return;
  const speed = Math.max(1, Number(els.replaySpeed.value || 1));
  els.replayPlay.textContent = "暂停";
  state.replayTimer = window.setInterval(() => {
    if (state.replayIndex >= state.replayBars.length - 1) {
      stopReplayPlayback();
      return;
    }
    stepReplay(1);
  }, Math.max(120, 700 / speed));
}

function stopReplayPlayback() {
  if (state.replayTimer) window.clearInterval(state.replayTimer);
  state.replayTimer = null;
  els.replayPlay.textContent = "播放";
}

function resetReplayState() {
  state.replayBars = [];
  state.replaySymbol = "";
  state.replayIndex = -1;
}

function syncOrderPriceToReplay() {
  const bar = state.replayBars[state.replayIndex];
  if (!bar) return;
  forceRecommendedInput(els.orderPrice, formatPrice(bar.close));
  queueOrderRiskRefresh();
}

function renderReplayStatus() {
  if (state.orderMode !== "replay" || !isIntradayPeriod(state.period) || !state.replayBars.length) {
    renderTerminalStatus();
    return;
  }
  const bar = state.replayBars[state.replayIndex] || state.replayBars[state.replayBars.length - 1];
  els.statusSession.textContent = `${periodLabel(state.period)}回放 ${formatNumber(state.replayIndex + 1)} / ${formatNumber(state.replayBars.length)} · ${String(bar?.date || bar?.time || "").slice(0, 16)}`;
}

function currentDailyBars(stock = currentStock()) {
  return dailyBarsForAsOf(stock);
}

function dailyBarsForAsOf(stock) {
  const bars = stock?.bars || [];
  const asOfDate = currentAsOfDate();
  if (!asOfDate) return bars;
  const filtered = bars.filter((bar) => String(bar.date || bar.time || "").slice(0, 10) <= asOfDate);
  return filtered.length ? filtered : bars.slice(0, 1);
}

function currentQuote(stock) {
  const bars = dailyBarsForAsOf(stock);
  return bars[bars.length - 1] || stock?.latest || {};
}

function filterIntradayBarsForAsOf(bars) {
  const target = currentAsOfKey();
  if (!target) return bars;
  const filtered = bars.filter((bar) => String(bar.date || bar.time || "").replace("T", " ").slice(0, 16) <= target);
  return filtered.length ? filtered : bars.slice(0, 1);
}

function currentAsOfDate() {
  const step = currentSimulationStep(loadSimulationScenario());
  const value = step?.asOf || step?.tradeDate || state.requestedAsOf || "";
  return asOfDateKey(value);
}

function currentAsOfKey() {
  const step = currentSimulationStep(loadSimulationScenario());
  const raw = String(step?.asOf || state.requestedAsOf || "");
  return asOfMinuteKey(raw);
}

function scenarioSelectedSymbols() {
  if (state.accountMode === "live") return [];
  const step = currentSimulationStep(loadSimulationScenario());
  return Array.isArray(step?.selectedSymbols) ? step.selectedSymbols : [];
}

async function submitOrder(side) {
  const stock = currentStock();
  if (!stock || !accountState) return;
  const actionButton = document.getElementById(`${side}-button`);
  if (actionButton?.disabled) return;
  const restoreButton = setButtonFeedback(actionButton, side === "sell" ? "卖出中" : "买入中");
  try {
    state.orderSide = side;
    const replayBar = state.orderMode === "replay" ? state.replayBars[state.replayIndex] : null;
    const price = Number(els.orderPrice.value || 0);
    const quantity = Number(els.orderQuantity.value || 0);
    if (price <= 0 || quantity <= 0) {
      state.orderMessage = "请先输入价格和数量，或在空输入框中按 Tab 填入策略推荐值。";
      return;
    }
    const result = await submitAccountOrder({
      accountId: state.accountId,
      mode: state.accountMode,
      strategy: state.profileName,
      symbol: stock.symbol,
      name: stock.name || symbolName(stock.symbol),
      side,
      price,
      quantity,
      asOf: replayBar ? String(replayBar.date || replayBar.time || "").slice(0, 10) : currentAsOfDate() || stock.latest?.date || "",
      initialCash: activeStrategyInitialCash(),
    });
    accountState = result.account;
    state.orderRisk = result.order?.risk || null;
    if (!result.accepted) {
      state.orderMessage = rejectionLabel(result.order?.reason);
    }
  } catch (error) {
    state.orderMessage = `订单未提交：${localizeScenarioMessage(error.message || String(error))}`;
  } finally {
    restoreButton();
    renderAccount();
  }
}

function setButtonFeedback(button, label = "处理中") {
  if (!button) return () => {};
  const previousText = button.textContent;
  const previousDisabled = button.disabled;
  button.textContent = label;
  button.disabled = true;
  button.classList.add("is-pending");
  return () => {
    button.classList.remove("is-pending");
    if (button.textContent === label) button.textContent = previousText;
    button.disabled = previousDisabled;
  };
}

function setOrderSide(side) {
  state.orderSide = side;
  renderOrderSideState();
  queueOrderRiskRefresh();
}

function renderOrderSideState() {
  document.getElementById("buy-button").classList.toggle("is-active", state.orderSide === "buy");
  document.getElementById("sell-button").classList.toggle("is-active", state.orderSide === "sell");
}

function renderOrderActionState({ recommendation = strategyRecommendationFor(currentStock()), affordable = 0, availableSell = 0 } = {}) {
  const buyButton = document.getElementById("buy-button");
  const sellButton = document.getElementById("sell-button");
  if (!buyButton || !sellButton) return;
  const risk = state.orderRisk && state.orderRisk.symbol === state.symbol ? state.orderRisk : null;
  const riskBlocksCurrentSide = risk && !risk.accepted ? risk.side || state.orderSide : "";
  const blockedSide = recommendation && !recommendation.executable ? recommendation.side : "";
  const liveBlocked = state.accountMode === "live";
  const missingInput = Number(els.orderPrice.value || 0) <= 0 || Number(els.orderQuantity.value || 0) <= 0;
  const buyReason = liveBlocked
    ? "真实交易写入未启用"
    : missingInput
      ? "请先输入价格和数量"
      : blockedSide === "buy"
      ? recommendation.reasonLabel
      : riskBlocksCurrentSide === "buy"
        ? rejectionLabel(risk.reason)
        : Number(affordable || 0) < 100
          ? "可用资金不足"
          : "";
  const sellReason = liveBlocked
    ? "真实交易写入未启用"
    : missingInput
      ? "请先输入价格和数量"
      : blockedSide === "sell"
      ? recommendation.reasonLabel
      : riskBlocksCurrentSide === "sell"
        ? rejectionLabel(risk.reason)
        : Number(availableSell || 0) <= 0
          ? "当前没有可卖持仓"
          : "";
  buyButton.disabled = Boolean(buyReason);
  sellButton.disabled = Boolean(sellReason);
  buyButton.title = buyReason || "提交买入委托";
  sellButton.title = sellReason || "提交卖出委托";
}

function queueOrderRiskRefresh() {
  if (orderRiskTimer) window.clearTimeout(orderRiskTimer);
  orderRiskTimer = window.setTimeout(() => {
    refreshOrderRisk().catch(() => {});
  }, 180);
}

async function refreshOrderRisk() {
  const stock = currentStock();
  if (!stock || !accountState) return;
  const replayBar = state.orderMode === "replay" ? state.replayBars[state.replayIndex] : null;
  const price = Number(els.orderPrice.value || 0);
  const quantity = Number(els.orderQuantity.value || 0);
  if (price <= 0 || quantity <= 0) return;
  const requestId = state.orderRiskRequestId + 1;
  state.orderRiskRequestId = requestId;
  const payload = await preflightAccountOrder({
    accountId: state.accountId,
    mode: state.accountMode,
    strategy: state.profileName,
    symbol: stock.symbol,
    name: stock.name || symbolName(stock.symbol),
    side: state.orderSide,
    price,
    quantity,
    asOf: replayBar ? String(replayBar.date || replayBar.time || "").slice(0, 10) : currentAsOfDate() || stock.latest?.date || "",
    initialCash: activeStrategyInitialCash(),
  });
  if (requestId !== state.orderRiskRequestId) return;
  state.orderRisk = payload.risk || null;
  const position = currentPosition(stock.symbol);
  renderOrderRiskHint({
    affordable: price > 0 ? roundLot(Number(accountState.summary?.cash_balance || 0) / price) : 0,
    availableSell: Number(position?.quantity || 0),
  });
  renderOrderActionState({
    affordable: price > 0 ? roundLot(Number(accountState.summary?.cash_balance || 0) / price) : 0,
    availableSell: Number(position?.quantity || 0),
  });
}

function renderOrderRiskHint({ affordable, availableSell, message = "" }) {
  const risk = state.orderRisk && state.orderRisk.symbol === state.symbol ? state.orderRisk : null;
  const recommendation = strategyRecommendationFor(currentStock());
  if (message) {
    els.ticketHint.textContent = message;
    return;
  }
  if (recommendation && !recommendation.executable) {
    const sideLabel = recommendation.side === "sell" ? "卖出" : "买入";
    els.ticketHint.textContent = `策略推荐${sideLabel}不可执行：${recommendation.reasonLabel}。推荐值仅用于复盘参考。`;
    return;
  }
  if (!risk) {
    els.ticketHint.textContent = `可买 ${formatNumber(affordable)} 股 / 可卖 ${formatNumber(availableSell)} 股`;
    return;
  }
  if (!risk.accepted) {
    els.ticketHint.textContent = rejectionLabel(risk.reason);
    return;
  }
  if (risk.warnings?.includes("quantity_rounded_to_lot")) {
    els.ticketHint.textContent = `预检通过，数量按一手调整为 ${formatNumber(risk.quantity)} 股。`;
    return;
  }
  els.ticketHint.textContent = `预检通过 · 预估费用 ${formatMoney(risk.estimated_fee)} · 下单后现金 ${formatMoney(risk.projected_cash_balance)}`;
}

function renderRecommendationFieldLabels(recommendation) {
  if (!els.orderPriceLabel || !els.orderQuantityLabel) return;
  if (!recommendation) {
    els.orderPriceLabel.textContent = "价格";
    els.orderQuantityLabel.textContent = "数量";
    return;
  }
  const priceText = recommendedValueText(formatPrice(recommendation.price), recommendation.executable ? "" : recommendation.reasonLabel);
  const quantityText = recommendedValueText(`${formatNumber(recommendation.quantity)}股`, recommendation.executable ? "" : "不可执行");
  els.orderPriceLabel.textContent = `价格 ${priceText}`;
  els.orderQuantityLabel.textContent = `数量 ${quantityText}`;
}

function recommendedValueText(value, suffix = "") {
  return `${value}（策略推荐${suffix ? ` · ${suffix}` : ""}）`;
}

function renderStrategySuggestion(stock) {
  if (!els.strategySuggestion) return;
  const recommendation = strategyRecommendationFor(stock);
  els.strategySuggestion.classList.toggle("is-hidden", !recommendation);
  els.strategySuggestion.classList.toggle("is-blocked", Boolean(recommendation && !recommendation.executable));
  if (!recommendation) {
    els.strategySuggestion.innerHTML = "";
    return;
  }
  const sideLabel = recommendation.side === "sell" ? "卖出" : "买入";
  const title = recommendation.executable ? "交易策略建议" : "交易策略建议 · 不可执行";
  const detail = recommendation.executable
    ? `可直接点击${sideLabel}，也可以修改价格或数量后再下单。`
    : `${recommendation.reasonLabel}。推荐值已填入，${sideLabel}按钮已锁定，只作为复盘信号展示。`;
  els.strategySuggestion.innerHTML = `
    <strong>${escapeHtml(title)}</strong>
    <span>${escapeHtml(sideLabel)} ${escapeHtml(recommendedValueText(`${formatNumber(recommendation.quantity)} 股`))} · 参考 ${escapeHtml(recommendedValueText(formatPrice(recommendation.price)))}</span>
    <small>${escapeHtml(recommendation.sourceLabel || "当前步策略推荐")} · ${escapeHtml(detail)}</small>
    <button id="apply-strategy-recommendation" type="button">填入策略推荐值</button>`;
  els.strategySuggestion.querySelector("#apply-strategy-recommendation")?.addEventListener("click", () => applyStrategyRecommendation(recommendation));
}

function applyStrategyRecommendation(recommendation = strategyRecommendationFor(currentStock())) {
  if (!recommendation) return;
  state.orderSide = recommendation.side;
  forceRecommendedInput(els.orderPrice, formatPrice(recommendation.price));
  els.triggerPrice.value = formatPrice(recommendation.price);
  forceRecommendedInput(els.orderQuantity, String(Math.max(0, Math.round(Number(recommendation.quantity || 0)))));
  renderOrderSideState();
  renderRecommendationFieldLabels(recommendation);
  const stock = currentStock();
  const latest = currentQuote(stock);
  const position = currentPosition(stock?.symbol);
  renderOrderActionState({
    recommendation,
    affordable: recommendation.price > 0
      ? roundLot(Number(accountState?.summary?.cash_balance || 0) / Number(recommendation.price))
      : latest.close > 0
        ? roundLot(Number(accountState?.summary?.cash_balance || 0) / Number(latest.close))
        : 0,
    availableSell: Number(position?.quantity || 0),
  });
  queueOrderRiskRefresh();
}

function applyQuickSize(size) {
  const stock = currentStock();
  if (!stock || !accountState) return;
  const price = Number(els.orderPrice.value || stock.latest?.close || 0);
  if (price <= 0) return;
  const ratio = size === "all" ? 1 : Number(size || 0);
  forceRecommendedInput(els.orderQuantity, String(Math.max(100, roundLot((Number(accountState.summary?.cash_balance || 0) * ratio) / price))));
}

function currentStock() {
  return stockBySymbol(state.symbol);
}

function strategyRecommendationFor(stock = currentStock()) {
  const symbol = stock?.symbol || state.symbol;
  if (!symbol) return null;
  if (state.recommendation?.symbol === symbol) {
    return normalizeRecommendation(state.recommendation, "来自交易主控的当步策略推荐");
  }
  const step = currentSimulationStep(loadSimulationScenario());
  const order = (step?.orders || []).find((item) => item.symbol === symbol);
  if (!order) return null;
  return normalizeRecommendation({
    symbol,
    side: order.side === "sell" ? "sell" : "buy",
    price: Number(order.price || 0),
    quantity: Number(order.quantity || 0),
    status: order.status || "",
    reason: order.reason || order.reject_reason || "",
  }, `当前模拟时间步 ${step.label || step.asOf || step.tradeDate || ""}`.trim());
}

function normalizeRecommendation(recommendation, sourceLabel) {
  const status = String(recommendation?.status || "").toLowerCase();
  const reason = String(recommendation?.reason || recommendation?.reject_reason || "");
  const executable = !isBlockedRecommendationStatus(status) && !reason;
  return {
    symbol: recommendation?.symbol || state.symbol,
    side: recommendation?.side === "sell" ? "sell" : "buy",
    price: Number(recommendation?.price || 0),
    quantity: Number(recommendation?.quantity || 0),
    status,
    reason,
    executable,
    reasonLabel: recommendationReasonLabel(reason, status),
    sourceLabel,
  };
}

function isBlockedRecommendationStatus(status) {
  return ["rejected", "risk_rejected", "cancelled"].includes(String(status || "").toLowerCase());
}

function recommendationReasonLabel(reason, status = "") {
  const labels = {
    limit_up_buy_blocked: "涨停无法买入",
    limit_down_sell_blocked: "跌停无法卖出",
    insufficient_cash: "可用资金不足",
    insufficient_position: "当前持仓不足",
    t_plus_one_restricted: "T+1限制",
    zero_volume_bar: "停牌或无成交",
    below_lot_size: "不足一手",
    invalid_price: "价格无效",
    invalid_side: "买卖方向无效",
    quantity_must_be_at_least_one_lot: "不足一手",
    live_trading_disabled: "真实交易写入未启用",
  };
  if (labels[reason]) return labels[reason];
  if (reason) return reason;
  if (isBlockedRecommendationStatus(status)) return "策略建议不可执行";
  return "";
}

function currentPosition(symbol) {
  return (accountState?.positions || []).find((item) => item.symbol === symbol) || null;
}

function suggestedQuantity(stock) {
  const target = stock.target || {};
  if (target.target_quantity) return target.target_quantity;
  const price = Number(currentQuote(stock).close || 0);
  if (price <= 0) return 100;
  return Math.max(100, roundLot((Number(accountState?.summary?.cash_balance || 0) * 0.2) / price));
}

function symbolRow(symbol) {
  const stock = stockBySymbol(symbol) || {};
  const latest = stock.latest || {};
  const stats = stock.stats || {};
  return {
    rank: "自选",
    symbol,
    name: stock.name || symbolName(symbol),
    score_pct: 0,
    close: latest.close || 0,
    pct_chg: latest.pct_chg || 0,
    return_20d_pct: stats.return_20d_pct || 0,
    amount: latest.amount || 0,
  };
}

function normalizePercentClass(value) {
  return Number(value || 0) >= 0 ? "up" : "down";
}

function signedMoney(value) {
  const number = Number(value || 0);
  return `${number >= 0 ? "+" : "-"}${formatMoney(Math.abs(number))}`;
}

function displayTime(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value).slice(0, 19);
  return date.toLocaleString("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function normalizePeriod(value) {
  const raw = String(value || "").toLowerCase();
  const aliases = {
    minute: "5m",
    "1d": "daily",
    day: "daily",
    daily: "daily",
    week: "weekly",
    weekly: "weekly",
    month: "monthly",
    monthly: "monthly",
  };
  if (aliases[raw]) return aliases[raw];
  const minuteMatch = raw.match(/^(\d+)m$/);
  if (minuteMatch) return `${Math.max(5, Math.round(Number(minuteMatch[1]) / 5) * 5)}m`;
  return raw;
}

function isSupportedPeriod(value) {
  const period = normalizePeriod(value);
  return STANDARD_PERIODS.includes(period) || isIntradayPeriod(period);
}

function isIntradayPeriod(value) {
  return /^(\d+)m$/.test(String(value || ""));
}

function periodMinutes(value) {
  return isIntradayPeriod(value) ? Math.max(5, Number(String(value).replace("m", "")) || 5) : 0;
}

function periodLabel(value) {
  const period = normalizePeriod(value);
  const labels = {
    daily: "日线",
    weekly: "周线",
    monthly: "月线",
  };
  if (labels[period]) return labels[period];
  if (isIntradayPeriod(period)) return `${periodMinutes(period)}分钟`;
  return period;
}

function terminalPeriodForSimulationFrequency(value) {
  const period = normalizePeriod(value);
  if (isIntradayPeriod(period) || ["daily", "weekly", "monthly"].includes(period)) return period;
  return "";
}

function strategyDisplayName(value) {
  const labels = {
    daily_rank_main: "日线强势股 Top 2",
    stable_momentum_blend: "稳健动量波动组合 Top 5",
    defensive_low_vol_momentum: "低波动动量防守 Top 5",
    trend_breakout_liquid: "流动性趋势突破 Top 5",
  };
  return labels[value] || String(value || "策略").replace(/[_:-]+/g, " ");
}

function aggregateIntradayBars(bars, minutes) {
  const bucketSize = Math.max(1, Math.round(Number(minutes || 5) / 5));
  if (bucketSize <= 1) return bars;
  const buckets = [];
  let currentDate = "";
  let currentRows = [];
  let indexInDay = 0;
  const flush = () => {
    if (!currentRows.length) return;
    buckets.push(intradayBucket(currentRows));
    currentRows = [];
  };
  for (const bar of bars || []) {
    const dateKey = String(bar.date || bar.time || "").slice(0, 10);
    if (currentDate && dateKey !== currentDate) {
      flush();
      indexInDay = 0;
    }
    currentDate = dateKey;
    if (currentRows.length && indexInDay % bucketSize === 0) flush();
    currentRows.push(bar);
    indexInDay += 1;
  }
  flush();
  return buckets;
}

function intradayBucket(rows) {
  const first = rows[0] || {};
  const last = rows[rows.length - 1] || first;
  return {
    symbol: first.symbol || state.symbol,
    date: last.date || last.time || first.date || first.time || "",
    time: last.time || last.date || first.time || first.date || "",
    open: first.open,
    high: Math.max(...rows.map((item) => Number(item.high))),
    low: Math.min(...rows.map((item) => Number(item.low))),
    close: last.close,
    volume: rows.reduce((sum, item) => sum + Number(item.volume || 0), 0),
    amount: rows.reduce((sum, item) => sum + Number(item.amount || 0), 0),
    pct_chg: Number(first.open || 0) > 0 ? ((Number(last.close || 0) / Number(first.open || 0)) - 1) * 100 : 0,
    turn: rows.reduce((sum, item) => sum + Number(item.turn || 0), 0),
  };
}

function rejectionLabel(reason) {
  const labels = {
    insufficient_cash: "可用资金不足，订单已拒绝。",
    insufficient_position: "当前持仓不足，订单已拒绝。",
    invalid_price: "价格无效，订单已拒绝。",
    invalid_side: "买卖方向无效，订单已拒绝。",
    limit_up_buy_blocked: "涨停无法买入，订单已锁定。",
    limit_down_sell_blocked: "跌停无法卖出，订单已锁定。",
    zero_volume_bar: "停牌或无成交，订单已锁定。",
    below_lot_size: "不足一手，订单已锁定。",
    t_plus_one_restricted: "T+1限制，订单已锁定。",
    quantity_must_be_at_least_one_lot: "A股按100股一手交易，请输入至少100股。",
    live_trading_disabled: "真实交易写入尚未启用，订单已被安全拦截。",
  };
  return labels[reason] || "订单已拒绝。";
}

function modeLabel(mode) {
  const labels = {
    paper: "模拟",
    manual: "手动",
    live: "只读",
  };
  return labels[mode] || mode;
}

function terminalUrl(symbol) {
  const params = new URLSearchParams({
    strategy: state.profileName,
    symbol: normalizeSymbol(symbol, state.symbol),
    mode: state.accountMode,
    account: state.accountId,
    period: state.period,
  });
  appendScenarioParams(params);
  return `./trading_terminal.html?${params.toString()}`;
}

function appendScenarioParams(params) {
  if (state.accountMode === "live") return;
  const scenario = loadSimulationScenario();
  const step = currentSimulationStep(scenario);
  const asOf = step?.asOf || step?.tradeDate || state.requestedAsOf || "";
  if (asOf) params.set("as_of", asOf);
  if (step?.tradeDate) params.set("date", step.tradeDate);
  const scenarioPeriod = terminalPeriodForSimulationFrequency(scenario?.frequency);
  if (scenarioPeriod && scenarioPeriod !== state.period) params.set("period", scenarioPeriod);
}

function replayIndexForAsOf(bars, asOf, fallbackIndex) {
  const target = asOfMinuteKey(asOf);
  if (!target) return fallbackIndex;
  let matched = -1;
  bars.forEach((bar, index) => {
    const value = String(bar.date || bar.time || "").replace("T", " ").slice(0, 16);
    if (value && value <= target) matched = index;
  });
  return matched >= 0 ? matched : fallbackIndex;
}

function asOfDateKey(value) {
  const minuteKey = asOfMinuteKey(value);
  if (minuteKey) return minuteKey.slice(0, 10);
  return String(value || "").slice(0, 10);
}

function asOfMinuteKey(value) {
  const raw = String(value || "").trim();
  if (!raw) return "";
  if (/[zZ]$|[+-]\d{2}:?\d{2}$/.test(raw)) {
    const parsed = new Date(raw);
    if (!Number.isNaN(parsed.getTime())) return formatChinaMinute(parsed);
  }
  const normalized = raw.replace("T", " ").replace(/[zZ]$/, "").replace(/[+-]\d{2}:?\d{2}$/, "");
  if (normalized.length >= 16) return normalized.slice(0, 16);
  if (normalized.length >= 10) return `${normalized.slice(0, 10)} 15:00`;
  return "";
}

function formatChinaMinute(date) {
  const local = new Date(date.getTime() + 8 * 60 * 60 * 1000);
  const pad = (number) => String(number).padStart(2, "0");
  return `${local.getUTCFullYear()}-${pad(local.getUTCMonth() + 1)}-${pad(local.getUTCDate())} ${pad(local.getUTCHours())}:${pad(local.getUTCMinutes())}`;
}

function updateUrl() {
  history.replaceState(null, "", terminalUrl(state.symbol));
}
