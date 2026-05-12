import { escapeHtml, formatMoney, formatNumber, formatPrice, formatSignedPct, roundLot } from "./shared/format.js";
import { accountIdForMode, loadAccountState, preflightAccountOrder, resetAccountState, submitAccountOrder } from "./shared/accountApi.js";
import { defaultStrategyProfile, ensureStockLoaded, marketData, normalizeSymbol, statusItems, stockBySymbol, symbolName } from "./shared/marketData.js";
import { createManualSession, loadManualReview, loadStrategies, runBacktest, runIntradayStrategySimulation, stepManualSession } from "./shared/simulationApi.js";
import { SymbolSearch } from "./shared/symbolSearch.js";
import { setupGlobalNavigation } from "./shared/navigation.js";
import { buildSimulationScenarioFromBacktest, localizeScenarioMessage, saveSimulationScenario, showScenarioLoading, showScenarioToast } from "./shared/simulationScenario.js";
import { calendarCoverageSummary, datesForFrequency, enhanceSimulationDateInput, loadSimulationCalendarAvailability, nearestAvailableDate, syncInputBounds } from "./shared/simulationCalendar.js";

const params = new URLSearchParams(window.location.search);
const state = {
  mode: params.get("mode") || "paper",
  strategy: params.get("strategy") || defaultStrategyProfile(),
  tradingPolicy: params.get("trading_policy") || "",
  frequency: normalizedSimulationFrequency(params.get("frequency") || "1d"),
  runMode: params.get("run_mode") || "manual",
  stepInterval: Number(params.get("step_interval") || 1),
  start: params.get("start") || "2026-04-01",
  end: params.get("end") || "2026-04-30",
  initialCash: Number(params.get("initial_cash") || 100000),
  strategies: [],
  tradingPolicies: [],
  calendarAvailability: null,
  tradingCalendar: [],
  backtest: null,
  selectedDayIndex: 0,
  manualSession: null,
  manualAccount: null,
  manualAccountId: "",
  manualSymbol: "300632.SZ",
  manualSide: "buy",
  manualOrderType: "limit",
  manualMessage: "",
  manualRisk: null,
  manualRiskRequestId: 0,
  tradeReview: null,
  message: "",
  timelineTradeFilter: "orders",
  timelineTradeQuery: "",
  timelineConfigDirty: false,
  timelineConfigSignature: "",
  autoRunPreparing: false,
  timelineGenerating: false,
};

let manualRiskTimer = null;
let autoRunTimer = null;
let autoRunActive = false;
let autoRunInFlight = false;
let autoRunRenderTick = 0;
let datePickers = [];
let clockCoverageNote = null;

const els = {
  strategySelect: document.getElementById("strategy-select"),
  tradingPolicySelect: document.getElementById("trading-policy-select"),
  frequencySelect: document.getElementById("frequency-select"),
  stepIntervalSelect: document.getElementById("step-interval-select"),
  startDate: document.getElementById("start-date"),
  endDate: document.getElementById("end-date"),
  initialCash: document.getElementById("initial-cash"),
  generateTimeline: document.getElementById("generate-timeline"),
  runBacktest: document.getElementById("run-backtest"),
  status: document.getElementById("backtest-status"),
  terminalLink: document.getElementById("terminal-link"),
  simClockMode: document.getElementById("sim-clock-mode"),
  simClockCurrent: document.getElementById("sim-clock-current"),
  simClockRange: document.getElementById("sim-clock-range"),
  simClockProgressLabel: document.getElementById("sim-clock-progress-label"),
  timeProgress: document.getElementById("time-progress"),
  timePrev: document.getElementById("time-prev"),
  timePause: document.getElementById("time-pause"),
  timeReset: document.getElementById("time-reset"),
  timeNext: document.getElementById("time-next"),
  reviewMeta: document.getElementById("review-meta"),
  reviewReturn: document.getElementById("review-return"),
  summaryMetrics: document.getElementById("summary-metrics"),
  equityChart: document.getElementById("equity-chart"),
  equityChartMeta: document.getElementById("equity-chart-meta"),
  returnChart: document.getElementById("return-chart"),
  returnChartMeta: document.getElementById("return-chart-meta"),
  pnlChart: document.getElementById("pnl-chart"),
  pnlChartMeta: document.getElementById("pnl-chart-meta"),
  cashChangeChart: document.getElementById("cash-change-chart"),
  cashChangeChartMeta: document.getElementById("cash-change-chart-meta"),
  fillRateChart: document.getElementById("fill-rate-chart"),
  fillRateChartMeta: document.getElementById("fill-rate-chart-meta"),
  drawdownChart: document.getElementById("drawdown-chart"),
  drawdownChartMeta: document.getElementById("drawdown-chart-meta"),
  exposureChart: document.getElementById("exposure-chart"),
  exposureChartMeta: document.getElementById("exposure-chart-meta"),
  ordersChart: document.getElementById("orders-chart"),
  ordersChartMeta: document.getElementById("orders-chart-meta"),
  timelineList: document.getElementById("timeline-list"),
  currentStepInsight: document.getElementById("current-step-insight"),
  timelineTradeTape: document.getElementById("timeline-trade-tape"),
  timelineTradeMeta: document.getElementById("timeline-trade-meta"),
  timelineTradeSearch: document.getElementById("timeline-trade-search"),
  stepSelectionMeta: document.getElementById("step-selection-meta"),
  stepSelectionList: document.getElementById("step-selection-list"),
  dayReviewMeta: document.getElementById("day-review-meta"),
  tradeReviewMeta: document.getElementById("trade-review-meta"),
  tradeReviewTable: document.getElementById("trade-review-table"),
  manualMeta: document.getElementById("manual-meta"),
  manualProgress: document.getElementById("manual-progress"),
  manualCurrent: document.getElementById("manual-current"),
  manualAccountLabel: document.getElementById("manual-account-label"),
  manualSymbolInput: document.getElementById("manual-symbol-input"),
  manualSymbolSuggestions: document.getElementById("manual-symbol-suggestions"),
  manualPrice: document.getElementById("manual-price"),
  manualQuantity: document.getElementById("manual-quantity"),
  manualPriceLabel: document.getElementById("manual-price-label"),
  manualQuantityLabel: document.getElementById("manual-quantity-label"),
  manualEstimate: document.getElementById("manual-estimate"),
  manualSubmitBuy: document.getElementById("manual-submit-buy"),
  manualSubmitSell: document.getElementById("manual-submit-sell"),
  manualTicketMessage: document.getElementById("manual-ticket-message"),
  manualNote: document.getElementById("manual-note"),
  acceptDay: document.getElementById("accept-day"),
  skipDay: document.getElementById("skip-day"),
  previousDay: document.getElementById("previous-day"),
  resetSession: document.getElementById("reset-session"),
  manualOrders: document.getElementById("manual-orders"),
  manualOrderMeta: document.getElementById("manual-order-meta"),
};

new SymbolSearch({
  input: els.manualSymbolInput,
  suggestions: els.manualSymbolSuggestions,
  onSelect: async (symbol) => {
    await selectManualSymbol(symbol);
  },
});

bindEvents();
await boot();

function bindEvents() {
  els.generateTimeline.addEventListener("click", () => generateTimelineFromCurrent({ preserveCurrentStep: false }));
  els.runBacktest.addEventListener("click", () => runAutoFromCurrent());
  els.strategySelect.addEventListener("change", () => {
    state.strategy = els.strategySelect.value;
    markTimelineConfigDirty();
    renderTimeProgress();
    updateUrl();
  });
  els.tradingPolicySelect.addEventListener("change", () => {
    state.tradingPolicy = els.tradingPolicySelect.value;
    markTimelineConfigDirty();
    renderTimeProgress();
    updateUrl();
  });
  els.frequencySelect.addEventListener("change", () => {
    state.frequency = els.frequencySelect.value;
    renderStepIntervalOptions();
    updateTradingCalendarForFrequency();
    coerceDateInputsForCurrentFrequency({ notify: true });
    markTimelineConfigDirty();
    renderTimeProgress();
    updateUrl();
  });
  els.stepIntervalSelect.addEventListener("change", () => {
    state.stepInterval = Number(els.stepIntervalSelect.value || 1);
    renderTimeProgress();
    updateUrl();
  });
  els.startDate.addEventListener("change", () => handleDateInputChange("start"));
  els.endDate.addEventListener("change", () => handleDateInputChange("end"));
  els.initialCash.addEventListener("input", () => {
    state.initialCash = currentInitialCash();
    markTimelineConfigDirty();
    renderTimeProgress();
  });
  els.initialCash.addEventListener("blur", () => {
    els.initialCash.value = formatCashInput(currentInitialCash());
  });
  els.acceptDay.addEventListener("click", () => stepManual("accept_strategy_day"));
  els.skipDay.addEventListener("click", () => stepManual("skip_day"));
  els.previousDay.addEventListener("click", () => stepManual("previous"));
  els.resetSession.addEventListener("click", () => stepManual("reset"));
  document.querySelectorAll(".manual-order-tabs [data-order-type]").forEach((button) => {
    button.addEventListener("click", () => {
      state.manualOrderType = button.dataset.orderType;
      renderManualTicket();
      queueManualRiskRefresh();
    });
  });
  document.querySelectorAll("[data-timeline-trade-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      state.timelineTradeFilter = button.dataset.timelineTradeFilter || "orders";
      renderTimeline();
    });
  });
  els.timelineTradeSearch?.addEventListener("input", () => {
    state.timelineTradeQuery = els.timelineTradeSearch.value;
    renderTimelineTradeTape(state.backtest?.timeline || []);
  });
  document.querySelectorAll(".manual-quick-size [data-size]").forEach((button) => {
    button.addEventListener("click", () => applyManualQuickSize(button.dataset.size));
  });
  els.manualPrice.addEventListener("input", () => {
    markRecommendedInputEdit(els.manualPrice);
    state.manualRisk = null;
    renderManualEstimate();
    queueManualRiskRefresh();
  });
  els.manualQuantity.addEventListener("input", () => {
    markRecommendedInputEdit(els.manualQuantity);
    state.manualRisk = null;
    renderManualEstimate();
    queueManualRiskRefresh();
  });
  bindRecommendedFillOnTab(els.manualPrice, () => {
    state.manualRisk = null;
    renderManualEstimate();
    queueManualRiskRefresh();
  });
  bindRecommendedFillOnTab(els.manualQuantity, () => {
    state.manualRisk = null;
    renderManualEstimate();
    queueManualRiskRefresh();
  });
  ["mouseenter", "focus"].forEach((eventName) => {
    els.manualSubmitBuy.addEventListener(eventName, () => setManualPreviewSide("buy"));
    els.manualSubmitSell.addEventListener(eventName, () => setManualPreviewSide("sell"));
  });
  els.manualSubmitBuy.addEventListener("click", () => submitManualOrder("buy"));
  els.manualSubmitSell.addEventListener("click", () => submitManualOrder("sell"));
  els.timeProgress.addEventListener("input", () => selectTimelineIndex(Number(els.timeProgress.value || 0)));
  els.timePrev.addEventListener("click", () => moveTimeline(-1));
  els.timePause.addEventListener("click", () => toggleTimePlayback());
  els.timeNext.addEventListener("click", () => moveTimeline(1));
  els.timeReset.addEventListener("click", () => resetTimelineToStart());
}

function markRecommendedInputEdit(input) {
  if (!input) return;
  input.dataset.userCleared = String(input.value || "").trim() ? "" : "1";
}

function setRecommendedInput(input, value, placeholder, { force = false } = {}) {
  if (!input) return;
  const rendered = String(value || "");
  input.dataset.recommendedValue = rendered;
  input.placeholder = placeholder || "";
  const userCleared = input.dataset.userCleared === "1";
  const isEditingEmpty = document.activeElement === input && String(input.value || "") === "";
  if (!force && (userCleared || isEditingEmpty)) return;
  input.dataset.userCleared = "";
  input.value = rendered;
}

function forceRecommendedInput(input, value) {
  setRecommendedInput(input, value, input?.placeholder || "", { force: true });
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

async function boot() {
  const hideLoading = showScenarioLoading("正在初始化交易主控...");
  try {
    applyEnvironmentModeToInputs();
    applyDateBounds();
    els.startDate.value = state.start;
    els.endDate.value = state.end;
    els.initialCash.value = formatCashInput(state.initialCash);
    els.frequencySelect.value = state.frequency;
    renderStepIntervalOptions();
    setupDatePickers();
    try {
      const calendar = await loadSimulationCalendarAvailability();
      state.calendarAvailability = calendar;
      updateTradingCalendarForFrequency();
      applyDateBounds();
      coerceDateInputsForCurrentFrequency({ notify: false });
      if (calendar?.static_fallback) {
        showScenarioToast("当前是公网静态预览，完整多年行情和策略计算请使用 spark 本地后端入口。", { type: "warning", duration: 5200 });
      }
    } catch (_error) {
      state.tradingCalendar = [];
    }
    try {
      const payload = await loadStrategies();
      state.strategies = payload.profiles || [];
      state.tradingPolicies = payload.trading_policies || [];
      state.tradingPolicy = state.tradingPolicy || payload.default_trading_policy || state.tradingPolicies[0]?.policy_id || "";
    } catch (_error) {
      state.strategies = [];
      state.tradingPolicies = [];
    }
    renderStrategyOptions();
    renderTradingPolicyOptions();
    renderStatus();
    if (state.calendarAvailability?.static_fallback && !datesForFrequency(state.calendarAvailability, state.frequency).length) {
      state.backtest = null;
      state.message = "公网静态预览未携带本地行情数据。完整多年日期、选股、回测和模拟交易请通过 SSH 转发访问 spark 本地后端 http://127.0.0.1:8788/。";
      render();
      return;
    }
    await runCurrentBacktest({ animate: false, label: "初始化" });
  } finally {
    hideLoading();
  }
}

async function runCurrentBacktest({ animate = false, preserveCurrentStep = false, label = "" } = {}) {
  stopAutoRunPlayback({ clearPreparing: false });
  setBusy(true, label || (state.autoRunPreparing ? "准备中" : "运行中"));
  const previousStep = preserveCurrentStep ? currentStep() : null;
  try {
    applyEnvironmentModeToInputs();
    state.selectedDayIndex = 0;
    renderTimeProgress();
    const request = currentSimulationRequest();
    state.backtest = isIntradaySimulationFrequency(state.frequency)
      ? await runIntradayStrategySimulation(request)
      : await runBacktest(request);
    state.start = state.backtest.requested_start_date || els.startDate.value;
    state.end = state.backtest.requested_end_date || els.endDate.value;
    state.initialCash = Number(state.backtest.initial_cash || state.initialCash);
    els.startDate.value = state.start;
    els.endDate.value = state.end;
    state.timelineConfigSignature = timelineConfigSignature();
    state.timelineConfigDirty = false;
    state.selectedDayIndex = preserveCurrentStepIndex(previousStep, state.backtest.timeline || []);
    hydrateManualTicketFromDay((state.backtest.timeline || [])[state.selectedDayIndex]);
    state.message = "";
  } catch (error) {
    state.message = localizeScenarioMessage(error.message || String(error));
  } finally {
    setBusy(false);
    render();
    if (state.message) {
      showScenarioToast(state.message, { type: "error" });
    } else if (animate && state.backtest?.timeline?.length) {
      const fallbackMessage = selectionFallbackMessage(state.backtest);
      const baseMessage = preserveCurrentStep ? "模拟时间线已按当前背景刷新。" : "模拟时间线已生成，主控数据已回到起点。";
      showScenarioToast(fallbackMessage ? `${baseMessage}${fallbackMessage}` : baseMessage, { type: fallbackMessage ? "warning" : "success" });
    }
  }
}

function selectionFallbackMessage(backtest) {
  if (backtest?.static_fallback_note) return backtest.static_fallback_note;
  if (!backtest?.selection_fallback_used || !Array.isArray(backtest.selection_attempts)) return "";
  const attempts = backtest.selection_attempts;
  const first = attempts[0] || {};
  const last = attempts[attempts.length - 1] || {};
  const firstDate = first.resolved_trade_date || first.requested_as_of || "开始日期";
  const lastDate = last.resolved_trade_date || last.requested_as_of || backtest.selection_as_of || "可选日期";
  return `${firstDate} 没有选出股票，已改用 ${lastDate} 的股票池生成 5 分钟固定股票池回放。`;
}

async function generateTimelineFromCurrent({ preserveCurrentStep = false } = {}) {
  if (state.mode === "live" || state.timelineGenerating || autoRunActive) return;
  state.runMode = "manual";
  state.timelineGenerating = true;
  renderTimeProgress();
  const hideLoading = showScenarioLoading("正在生成模拟时间线...");
  try {
    await runCurrentBacktest({ animate: true, preserveCurrentStep, label: "生成时间线" });
  } finally {
    state.timelineGenerating = false;
    hideLoading();
    renderTimeProgress();
  }
}

async function runAutoFromCurrent() {
  if (autoRunActive || state.autoRunPreparing) return;
  if (!isTimelineReady()) {
    showScenarioToast("请先点击“生成时间线”，确认当前模拟背景已经生成。", { type: "warning" });
    renderTimeProgress();
    return;
  }
  state.runMode = "auto";
  state.autoRunPreparing = true;
  renderTimeProgress();
  showScenarioToast("全自动运行准备中。", { type: "info" });
  await nextPaint();
  try {
    const ready = await ensureTimelineForCurrentConfig({ preserveCurrentStep: true });
    if (!ready) {
      showScenarioToast("时间线尚未生成，无法启动全自动运行。", { type: "warning" });
      return;
    }
    startAutoRunPlayback({ reset: false });
  } finally {
    if (!autoRunActive) {
      state.autoRunPreparing = false;
      renderTimeProgress();
    }
  }
}

async function startManualReplay({ silent = false, syncToSelected = true } = {}) {
  stopAutoRunPlayback();
  setBusy(true, "创建回放");
  try {
    const timelineReady = await ensureTimelineForCurrentConfig({ preserveCurrentStep: true });
    if (!timelineReady) return;
    applyEnvironmentModeToInputs();
    state.manualSession = await createManualSession({
      strategy: state.strategy,
      tradingPolicy: state.tradingPolicy,
      start: els.startDate.value,
      end: els.endDate.value,
      initialCash: currentInitialCash(),
      frequency: state.frequency,
    });
    state.manualAccountId = manualAccountId(state.manualSession.session_id);
    state.manualAccount = await resetAccountState({
      accountId: state.manualAccountId,
      mode: "manual",
      initialCash: Number(state.manualSession.initial_cash || state.initialCash || currentInitialCash() || 100000),
    });
    if (syncToSelected && state.selectedDayIndex > 0) {
      state.manualSession = await stepManualSession({
        sessionId: state.manualSession.session_id,
        action: "goto",
        details: { step_index: state.selectedDayIndex },
      });
    }
    await refreshTradeReview();
    state.backtest = sessionToBacktest(state.manualSession);
    state.selectedDayIndex = Number(state.manualSession.current_step_index || 0);
    hydrateManualTicketFromDay(state.manualSession.current_step);
    await refreshManualRisk();
    state.message = "";
  } catch (error) {
    state.message = localizeScenarioMessage(error.message || String(error));
  } finally {
    setBusy(false);
    render();
    if (state.message) showScenarioToast(state.message, { type: "error" });
    if (!silent && state.manualSession?.session_id) showScenarioToast("手动步进会话已创建。", { type: "success" });
  }
}

async function ensureManualReplaySession() {
  const timelineReady = await ensureTimelineForCurrentConfig({ preserveCurrentStep: true });
  if (!timelineReady) return false;
  if (!state.manualSession?.session_id) {
    await startManualReplay({ silent: true, syncToSelected: true });
    return Boolean(state.manualSession?.session_id);
  }
  if (Number(state.manualSession.current_step_index || 0) !== Number(state.selectedDayIndex || 0)) {
    state.manualSession = await stepManualSession({
      sessionId: state.manualSession.session_id,
      action: "goto",
      details: { step_index: state.selectedDayIndex },
    });
    state.backtest = sessionToBacktest(state.manualSession);
    hydrateManualTicketFromDay(state.manualSession.current_step);
    await refreshManualRisk();
    render();
  }
  return true;
}

async function stepManual(action) {
  const restoreButton = setButtonFeedback(manualStepButton(action), manualStepBusyLabel(action));
  if (!state.manualSession?.session_id) {
    if (action === "previous") {
      restoreButton();
      return;
    }
    const ready = await ensureManualReplaySession();
    if (!ready) {
      restoreButton();
      return;
    }
  }
  setBusy(true, "推进中");
  try {
    state.manualSession = await stepManualSession({
      sessionId: state.manualSession.session_id,
      action,
      note: els.manualNote.value,
    });
    if (action === "reset") {
      state.manualAccount = await resetAccountState({
        accountId: state.manualAccountId,
        mode: "manual",
        initialCash: Number(state.manualSession.initial_cash || state.initialCash || 100000),
      });
    }
    await refreshTradeReview();
    state.backtest = sessionToBacktest(state.manualSession);
    state.selectedDayIndex = Number(state.manualSession.current_step_index || 0);
    hydrateManualTicketFromDay(state.manualSession.current_step);
    await refreshManualRisk();
    if (action !== "previous") els.manualNote.value = "";
    state.message = "";
  } catch (error) {
    state.message = localizeScenarioMessage(error.message || String(error));
  } finally {
    setBusy(false);
    restoreButton();
    render();
    if (state.message) {
      showScenarioToast(state.message, { type: "error" });
    } else {
      showScenarioToast(action === "previous" ? "已回到上一步。" : action === "reset" ? "步进交易已重置。" : "当前步已执行，时间线已同步。", { type: "success" });
    }
  }
}

function render() {
  applyEnvironmentModeToInputs();
  renderStatus();
  renderSummary();
  renderTimeProgress();
  renderEquityChart();
  renderTimeline();
  renderStepSelection();
  renderTradeReview();
  renderManual();
  updateUrl();
}

function renderStrategyOptions() {
  const options = state.strategies.length
    ? state.strategies
    : [{ profile_name: state.strategy, strategy_id: state.strategy }];
  els.strategySelect.innerHTML = options
    .map((item) => `<option value="${escapeHtml(item.profile_name)}">${escapeHtml(strategyLabel(item))}</option>`)
    .join("");
  els.strategySelect.value = state.strategy;
}

function renderTradingPolicyOptions() {
  const options = state.tradingPolicies.length
    ? state.tradingPolicies
    : [{ policy_id: state.tradingPolicy || "equal_weight_daily_rebalance", label: "等权每日调仓" }];
  if (!state.tradingPolicy) state.tradingPolicy = options[0]?.policy_id || "";
  els.tradingPolicySelect.innerHTML = options
    .map((item) => `<option value="${escapeHtml(item.policy_id)}">${escapeHtml(policyLabel(item.policy_id))}</option>`)
    .join("");
  els.tradingPolicySelect.value = state.tradingPolicy;
}

function renderStatus() {
  els.status.innerHTML = statusItems(state.strategy, { calendar: state.calendarAvailability })
    .map(([label, value]) => `<div class="status-item"><span>${escapeHtml(label)}</span><strong>${escapeHtml(typeof value === "number" ? formatNumber(value) : value)}</strong></div>`)
    .join("");
  const firstSymbol = firstOrderSymbol();
  const period = terminalPeriodForSimulationFrequency(state.frequency);
  const terminalMode = state.mode === "live" ? "live" : "paper";
  els.terminalLink.href = `./trading_terminal.html?strategy=${encodeURIComponent(state.strategy)}&symbol=${encodeURIComponent(firstSymbol || "300632.SZ")}&period=${period}&mode=${terminalMode}`;
  setupGlobalNavigation({
    mode: state.mode,
    strategy: state.strategy,
    symbol: firstSymbol || "300632.SZ",
    frequency: state.frequency,
    start: els.startDate.value,
    end: els.endDate.value,
    initialCash: String(currentInitialCash()),
    tradingPolicy: state.tradingPolicy,
    period,
  });
  renderCalendarCoverage();
}

function renderTimeProgress() {
  const live = state.mode === "live";
  const preparing = Boolean(state.autoRunPreparing);
  const generating = Boolean(state.timelineGenerating);
  document.querySelector(".simulation-clock")?.classList.toggle("is-hidden", live);
  renderCalendarCoverage();
  if (live) {
    els.generateTimeline.disabled = true;
    els.generateTimeline.classList.remove("is-pending");
    els.generateTimeline.textContent = "生成时间线";
    els.timeProgress.disabled = true;
    els.timePrev.disabled = true;
    els.timePause.disabled = true;
    els.timeNext.disabled = true;
    els.timeReset.disabled = true;
    els.runBacktest.textContent = "刷新最新日";
    els.runBacktest.classList.remove("is-pending");
    els.runBacktest.disabled = true;
    return;
  }
  const timeline = state.backtest?.timeline || [];
  const selected = timeline[state.selectedDayIndex];
  const hasTimeline = timeline.length > 0;
  const timelineReady = isTimelineReady();
  const max = Math.max(0, timeline.length - 1);
  els.timeProgress.max = String(max);
  els.timeProgress.value = String(Math.min(max, Math.max(0, state.selectedDayIndex || 0)));
  els.timeProgress.disabled = preparing || generating || !timelineReady;
  els.timePrev.disabled = preparing || generating || !timelineReady || state.selectedDayIndex <= 0;
  els.timeNext.disabled = preparing || generating || !timelineReady || state.selectedDayIndex >= max;
  els.timeReset.disabled = preparing || generating || !timelineReady || state.selectedDayIndex <= 0;
  els.timePause.disabled = !autoRunActive;
  els.timePause.textContent = "暂停";
  const stepNumber = hasTimeline ? state.selectedDayIndex + 1 : 0;
  const runStateLabel = generating ? "生成中" : preparing ? "准备中" : timelineReady ? runModeLabel(state.runMode) : "时间线待生成";
  els.simClockMode.textContent = `${environmentLabel(state.mode)} · ${runStateLabel} · ${frequencyLabel(state.frequency)}`;
  els.simClockCurrent.textContent = timelineReady && selected ? displayStepTime(selected) : hasTimeline ? "背景已变更" : "等待生成";
  els.simClockProgressLabel.textContent = timelineReady
    ? `进度 ${formatNumber(stepNumber)} / ${formatNumber(timeline.length)} · 每次 ${stepIntervalLabel()}`
    : "请先生成时间线，确认当前模拟背景。";
  const startLabel = selected ? displayStepTime(timeline[0]) : els.startDate.value || "-";
  const endLabel = selected ? displayStepTime(timeline[timeline.length - 1]) : els.endDate.value || "-";
  const liveNote = state.mode === "live" ? " · 实盘模式当前只读，使用最新本地交易日作保护视图" : "";
  els.simClockRange.textContent = timelineReady
    ? `${startLabel || "-"} 至 ${endLabel || "-"}${liveNote}`
    : `${els.startDate.value || "-"} 至 ${els.endDate.value || "-"} · 当前设置尚未生成时间线`;
  els.generateTimeline.textContent = generating ? "生成中" : timelineReady ? "重新生成" : "生成时间线";
  els.generateTimeline.classList.toggle("is-pending", generating);
  els.generateTimeline.disabled = generating || preparing || autoRunActive || state.mode === "live";
  els.runBacktest.textContent = preparing ? "准备中" : autoRunActive ? "运行中" : "全自动运行";
  els.runBacktest.classList.toggle("is-pending", preparing || autoRunActive);
  const atTimelineEnd = hasTimeline && state.selectedDayIndex >= max;
  els.runBacktest.disabled = !timelineReady || preparing || generating || autoRunActive || state.mode === "live" || atTimelineEnd;
  if (timelineReady) publishCurrentScenario(autoRunActive ? "running" : "paused");
}

function renderCalendarCoverage() {
  const clock = document.querySelector(".simulation-clock");
  if (!clock) return;
  if (!clockCoverageNote) {
    clockCoverageNote = document.createElement("p");
    clockCoverageNote.className = "clock-coverage-note";
    clockCoverageNote.hidden = true;
    (clock.querySelector(".clock-center") || clock).appendChild(clockCoverageNote);
  }
  const message = calendarCoverageSummary(state.calendarAvailability, state.frequency);
  clockCoverageNote.textContent = message;
  clockCoverageNote.hidden = !message;
  clock.classList.toggle("is-static-preview", Boolean(state.calendarAvailability?.static_fallback));
}

function renderSummary() {
  const bt = state.backtest;
  if (!bt) {
    els.reviewMeta.textContent = state.message || "等待运行";
    els.reviewReturn.textContent = "-";
    els.summaryMetrics.innerHTML = "";
    return;
  }
  const timeline = bt.timeline || [];
  const visible = visibleTimeline();
  const selected = currentStep();
  const startLabel = displayResolvedTime(bt.resolved_start_date, bt.data_frequency);
  const endLabel = displayResolvedTime(bt.resolved_end_date, bt.data_frequency);
  const currentEquity = selected ? Number(selected.equity || bt.initial_cash || 0) : Number(bt.initial_cash || bt.final_equity || 0);
  const currentReturnPct = returnPctForEquity(currentEquity, Number(bt.initial_cash || state.initialCash || 0));
  const currentDrawdownPct = maxDrawdownPctFor(visible, Number(bt.initial_cash || state.initialCash || 0));
  const orderCount = visible.reduce((total, item) => total + (item.orders || []).length, 0);
  const selectedTime = selected ? displayStepTime(selected) : endLabel;
  els.reviewMeta.textContent = `截至 ${selectedTime || "-"} · 场景 ${startLabel || "-"} 至 ${endLabel || "-"} · ${frequencyLabel(bt.data_frequency)} · ${policyLabel(bt.trading_policy_id)}${state.message ? ` · ${state.message}` : ""}`;
  els.reviewReturn.textContent = formatSignedPct(currentReturnPct);
  els.reviewReturn.className = Number(currentReturnPct || 0) >= 0 ? "up" : "down";
  els.summaryMetrics.innerHTML = [
    ["当前资产", formatMoney(currentEquity)],
    ["截至收益", formatSignedPct(currentReturnPct)],
    ["已知最大回撤", formatSignedPct(currentDrawdownPct)],
    [isIntradaySimulationFrequency(bt.data_frequency) ? `已知${frequencyLabel(bt.data_frequency)}步数` : "已知交易周期", `${formatNumber(visible.length)} / ${formatNumber(timeline.length)}`],
    ["已知订单", formatNumber(orderCount)],
  ]
    .map(([label, value]) => `<div class="metric"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`)
    .join("");
}

function renderEquityChart() {
  const timeline = visibleTimeline();
  renderMainEquityChart(timeline);
  renderReturnChart(timeline);
  renderStepReturnChart(timeline);
  renderRiskTelemetryCharts(timeline);
}

function renderMainEquityChart(timeline) {
  const svg = els.equityChart;
  svg.innerHTML = "";
  const width = 760;
  const height = 260;
  const pad = { left: 74, right: 18, top: 22, bottom: 34 };
  const chartWidth = width - pad.left - pad.right;
  const chartHeight = height - pad.top - pad.bottom;
  const equities = timeline.map((item) => Number(item.equity || 0));
  const cashValues = timeline.map((item) => Number(item.cash || 0));
  if (!equities.length) {
    if (els.equityChartMeta) els.equityChartMeta.textContent = "等待运行";
    svg.appendChild(svgText("运行后显示资金曲线", width / 2, height / 2, "middle", "chart-empty"));
    return;
  }
  const last = timeline[timeline.length - 1];
  const initial = Number(state.backtest?.initial_cash || state.initialCash || equities[0]);
  const currentReturn = returnPctForEquity(Number(last.equity || 0), initial);
  if (els.equityChartMeta) els.equityChartMeta.textContent = `${displayStepTime(last)} · 净值 ${formatMoney(last.equity)} · 现金 ${formatMoney(last.cash)} · 蓝=净值 · 灰=现金 · 虚线=初始资金 · ${formatSignedPct(currentReturn)}`;
  const allValues = [...equities, ...cashValues, initial].filter((value) => Number.isFinite(value));
  let min = Math.min(...allValues);
  let max = Math.max(...allValues);
  if (Math.abs(max - min) < 1) {
    const padding = Math.max(1, Math.abs(max || 1) * 0.01);
    min -= padding;
    max += padding;
  }
  const spread = Math.max(max - min, 1);
  const xFor = (index) => pad.left + (timeline.length <= 1 ? chartWidth : (index / (timeline.length - 1)) * chartWidth);
  const yFor = (value) => pad.top + chartHeight - ((value - min) / spread) * chartHeight;
  for (let i = 0; i <= 4; i += 1) {
    const y = pad.top + (chartHeight / 4) * i;
    svg.appendChild(svgLine(pad.left, y, width - pad.right, y, "grid-line"));
  }
  const points = linePoints(equities, xFor, yFor, pad.left, width - pad.right);
  const cashPoints = linePoints(cashValues, xFor, yFor, pad.left, width - pad.right);
  const area = `${pad.left},${height - pad.bottom} ${points} ${width - pad.right},${height - pad.bottom}`;
  svg.appendChild(svgLine(pad.left, yFor(initial), width - pad.right, yFor(initial), "baseline-line"));
  svg.appendChild(svgPolyline(area, "equity-area"));
  svg.appendChild(svgPolyline(cashPoints, "cash-line"));
  svg.appendChild(svgPolyline(points, "equity-line"));
  svg.appendChild(svgCircle(xFor(timeline.length - 1), yFor(Number(last.equity || 0)), 4, "equity-dot"));
  svg.appendChild(svgText(formatMoney(max), pad.left - 8, yFor(max) + 4, "end", "axis-label"));
  svg.appendChild(svgText(formatMoney(min), pad.left - 8, yFor(min) + 4, "end", "axis-label"));
  svg.appendChild(svgText(displayStepTime(timeline[0]), pad.left, height - 12, "start", "axis-label"));
  svg.appendChild(svgText(displayStepTime(last), width - pad.right, height - 12, "end", "axis-label"));
}

function renderReturnChart(timeline) {
  const initial = Number(state.backtest?.initial_cash || state.initialCash || 0);
  const returns = (timeline || []).map((item) => returnPctForEquity(Number(item.equity || 0), initial));
  if (!returns.length) {
    if (els.returnChartMeta) els.returnChartMeta.textContent = "-";
    renderReferenceLineChart(els.returnChart, [], {
      emptyText: "运行后显示累计收益",
      valueFormatter: formatSignedPct,
      lineClass: "return-line",
      areaClass: "return-area",
      minBaseline: 0,
    });
    return;
  }
  const last = timeline[timeline.length - 1];
  const current = returns[returns.length - 1] || 0;
  const best = Math.max(0, ...returns);
  const worst = Math.min(0, ...returns);
  if (els.returnChartMeta) els.returnChartMeta.textContent = `${displayStepTime(last)} · ${formatSignedPct(current)} · 高 ${formatSignedPct(best)} / 低 ${formatSignedPct(worst)}`;
  renderReferenceLineChart(els.returnChart, returns, {
    emptyText: "运行后显示累计收益",
    valueFormatter: formatSignedPct,
    lineClass: "return-line",
    areaClass: "return-area",
    minBaseline: 0,
  });
}

function renderStepReturnChart(timeline) {
  const initial = Number(state.backtest?.initial_cash || state.initialCash || 0);
  const steps = timeline || [];
  const stepReturns = steps.map((item, index) => {
    const previous = index > 0 ? Number(timeline[index - 1]?.equity || 0) : initial;
    const current = Number(item.equity || 0);
    return previous > 0 ? ((current / previous) - 1) * 100 : 0;
  });
  const cashChanges = steps.map((item, index) => {
    const previousCash = index > 0 ? Number(steps[index - 1]?.cash || 0) : initial;
    return Number(item.cash || 0) - previousCash;
  });
  const fillRates = steps.map((item) => fillRatePct(item));
  if (!steps.length) {
    if (els.pnlChartMeta) els.pnlChartMeta.textContent = "-";
    if (els.cashChangeChartMeta) els.cashChangeChartMeta.textContent = "-";
    if (els.fillRateChartMeta) els.fillRateChartMeta.textContent = "-";
    renderReferenceBarChart(els.pnlChart, [], { emptyText: "运行后显示单步收益", valueFormatter: formatSignedPct });
    renderReferenceBarChart(els.cashChangeChart, [], { emptyText: "运行后显示现金变化", valueFormatter: formatSignedMoney });
    renderReferenceLineChart(els.fillRateChart, [], { emptyText: "运行后显示成交效率", valueFormatter: formatPctPlain, minBaseline: 0, maxBaseline: 100 });
    return;
  }
  const last = steps[steps.length - 1];
  const lastReturn = stepReturns[stepReturns.length - 1] || 0;
  const bestReturn = Math.max(0, ...stepReturns);
  const worstReturn = Math.min(0, ...stepReturns);
  const lastCashChange = cashChanges[cashChanges.length - 1] || 0;
  const buyPressure = cashChanges.filter((value) => value < 0).reduce((total, value) => total + Math.abs(value), 0);
  const sellPressure = cashChanges.filter((value) => value > 0).reduce((total, value) => total + value, 0);
  const lastFillRate = fillRates[fillRates.length - 1] || 0;
  const orderSteps = steps.filter((item) => (item.orders || []).length > 0);
  const averageFillRate = orderSteps.length
    ? orderSteps.reduce((total, item) => total + fillRatePct(item), 0) / orderSteps.length
    : 0;
  if (els.pnlChartMeta) els.pnlChartMeta.textContent = `${displayStepTime(last)} · ${formatSignedPct(lastReturn)} · 最好 ${formatSignedPct(bestReturn)} / 最差 ${formatSignedPct(worstReturn)}`;
  if (els.cashChangeChartMeta) els.cashChangeChartMeta.textContent = `${formatSignedMoney(lastCashChange)} · 买 ${formatMoney(buyPressure)} / 卖 ${formatMoney(sellPressure)}`;
  if (els.fillRateChartMeta) els.fillRateChartMeta.textContent = orderSteps.length ? `${formatPctPlain(lastFillRate)} · 均值 ${formatPctPlain(averageFillRate)}` : "暂无策略订单";
  renderReferenceBarChart(els.pnlChart, stepReturns, {
    emptyText: "运行后显示单步收益",
    valueFormatter: formatSignedPct,
    positiveClass: "pnl-bar-up",
    negativeClass: "pnl-bar-down",
  });
  renderReferenceBarChart(els.cashChangeChart, cashChanges, {
    emptyText: "运行后显示现金变化",
    valueFormatter: formatSignedMoney,
    positiveClass: "cash-change-up",
    negativeClass: "cash-change-down",
  });
  renderReferenceLineChart(els.fillRateChart, fillRates, {
    emptyText: "运行后显示成交效率",
    valueFormatter: formatPctPlain,
    minBaseline: 0,
    maxBaseline: 100,
  });
}

function renderRiskTelemetryCharts(timeline) {
  const drawdowns = drawdownSeriesFor(timeline, Number(state.backtest?.initial_cash || state.initialCash || 0));
  const exposures = timeline.map((item) => exposurePct(item));
  const orderCounts = timeline.map((item) => (item.orders || []).length);
  const rejectedCounts = timeline.map((item) => (item.orders || []).filter((order) => order.status === "rejected").length);
  const last = timeline[timeline.length - 1] || null;
  const lastDrawdown = drawdowns[drawdowns.length - 1] || 0;
  const lastExposure = exposures[exposures.length - 1] || 0;
  const currentOrders = last ? (last.orders || []).length : 0;
  const currentRejected = last ? (last.orders || []).filter((order) => order.status === "rejected").length : 0;
  if (els.drawdownChartMeta) els.drawdownChartMeta.textContent = `${formatSignedPct(lastDrawdown)} · 最大 ${formatSignedPct(Math.min(0, ...drawdowns))}`;
  if (els.exposureChartMeta) els.exposureChartMeta.textContent = `${formatSignedPct(lastExposure).replace("+", "")} · 持仓 ${formatNumber(Number(last?.position_count || 0))}`;
  if (els.ordersChartMeta) els.ordersChartMeta.textContent = `${formatNumber(currentOrders)} 单 · 拒 ${formatNumber(currentRejected)}`;
  renderMiniLineChart(els.drawdownChart, drawdowns, {
    emptyText: "暂无回撤",
    areaClass: "drawdown-area",
    lineClass: "drawdown-line",
    minBaseline: 0,
    topLabel: "0%",
    bottomLabel: formatSignedPct(Math.min(0, ...drawdowns)),
  });
  renderMiniLineChart(els.exposureChart, exposures, {
    emptyText: "暂无仓位",
    areaClass: "exposure-area",
    lineClass: "exposure-line",
    minBaseline: 0,
    topLabel: formatAxisPct(Math.max(0, ...exposures)),
    bottomLabel: "0%",
  });
  renderMiniBarChart(els.ordersChart, orderCounts, rejectedCounts);
}

function renderTimeline() {
  const timeline = state.backtest?.timeline || [];
  if (!timeline.length) {
    els.timelineList.innerHTML = `<div class="empty-state">暂无回测时间线。</div>`;
    if (els.currentStepInsight) els.currentStepInsight.innerHTML = `<div class="empty-state">暂无当前步详情。</div>`;
    if (els.timelineTradeTape) els.timelineTradeTape.innerHTML = `<div class="empty-state">暂无交易明细。</div>`;
    if (els.timelineTradeMeta) els.timelineTradeMeta.textContent = "运行回测后显示订单、成交和拒单。";
    els.dayReviewMeta.textContent = "运行回测后显示时间线复盘。";
    return;
  }
  const selected = timeline[state.selectedDayIndex] || timeline[timeline.length - 1];
  const entries = timelineTradeEntries(timeline);
  const tradeStepCount = timeline.filter((day) => (day.orders || []).length).length;
  els.dayReviewMeta.textContent = `${displayStepTime(selected)} · 当前订单 ${formatNumber((selected.orders || []).length)} · 全部明细 ${formatNumber(entries.length)} · 有订单时间步 ${formatNumber(tradeStepCount)}`;
  renderCurrentStepInsight(selected);
  renderTimelineTradeTape(timeline);
  els.timelineList.innerHTML = timeline
    .map((day, index) => {
      const active = index === state.selectedDayIndex ? " is-active" : "";
      const orders = day.orders || [];
      const rejected = orders.filter((order) => order.status === "rejected").length;
      const filled = orders.length - rejected;
      const orderText = orders.length ? `${formatNumber(orders.length)} 单 / 成 ${formatNumber(filled)} / 拒 ${formatNumber(rejected)}` : "0";
      const hasOrders = orders.length ? " has-orders" : "";
      return `
        <button class="day-row${active}${hasOrders}" type="button" data-index="${index}">
          <span>${isIntradaySimulationFrequency(state.backtest?.data_frequency) ? "时刻" : "日期"}<strong>${escapeHtml(displayStepTime(day))}</strong></span>
          <span>资产<strong>${formatMoney(day.equity)}</strong></span>
          <span>收益<strong class="${Number(day.return_pct || 0) >= 0 ? "up" : "down"}">${formatSignedPct(day.return_pct)}</strong></span>
          <span>持仓<strong>${formatNumber(day.position_count)}</strong></span>
          <span>订单<strong>${escapeHtml(orderText)}</strong></span>
        </button>`;
    })
    .join("");
  els.timelineList.querySelectorAll("[data-index]").forEach((button) => {
    button.addEventListener("click", () => {
      selectTimelineIndex(Number(button.dataset.index || 0));
    });
  });
}

function renderTimelineFast() {
  const timeline = state.backtest?.timeline || [];
  if (!timeline.length) return;
  const selected = timeline[state.selectedDayIndex] || timeline[timeline.length - 1];
  const tradeStepCount = timeline.filter((day) => (day.orders || []).length).length;
  const totalOrders = Number(state.backtest?.order_count || 0);
  els.dayReviewMeta.textContent = `${displayStepTime(selected)} · 当前订单 ${formatNumber((selected.orders || []).length)} · 策略订单 ${formatNumber(totalOrders)} · 有订单时间步 ${formatNumber(tradeStepCount)}`;
  renderCurrentStepInsight(selected);
  const active = els.timelineList?.querySelector(".day-row.is-active");
  const next = els.timelineList?.querySelector(`[data-index="${state.selectedDayIndex}"]`);
  if (active && active !== next) active.classList.remove("is-active");
  if (next) {
    next.classList.add("is-active");
    if (autoRunRenderTick % 5 === 0) keepTimelineRowVisible(next);
  }
  if (els.timelineTradeMeta) {
    els.timelineTradeMeta.textContent = `${tradeFilterLabel(state.timelineTradeFilter)} · 自动运行中低频刷新列表，当前时间步订单 ${formatNumber((selected.orders || []).length)} 条`;
  }
}

function keepTimelineRowVisible(row) {
  const container = els.timelineList;
  if (!row || !container || !elementIntersectsViewport(container)) return;
  const rowTop = row.offsetTop;
  const rowBottom = rowTop + row.offsetHeight;
  const visibleTop = container.scrollTop;
  const visibleBottom = visibleTop + container.clientHeight;
  if (rowTop < visibleTop) {
    container.scrollTop = rowTop;
  } else if (rowBottom > visibleBottom) {
    container.scrollTop = rowBottom - container.clientHeight;
  }
}

function elementIntersectsViewport(element) {
  const rect = element.getBoundingClientRect();
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;
  const viewportWidth = window.innerWidth || document.documentElement.clientWidth || 0;
  return rect.bottom > 0 && rect.right > 0 && rect.top < viewportHeight && rect.left < viewportWidth;
}

function renderTimelineTradeTape(timeline) {
  if (!els.timelineTradeTape) return;
  document.querySelectorAll("[data-timeline-trade-filter]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.timelineTradeFilter === state.timelineTradeFilter);
  });
  if (els.timelineTradeSearch && els.timelineTradeSearch.value !== state.timelineTradeQuery) {
    els.timelineTradeSearch.value = state.timelineTradeQuery;
  }
  const allEntries = timelineTradeEntries(timeline);
  const entries = filteredTimelineTradeEntries(allEntries);
  if (els.timelineTradeMeta) {
    els.timelineTradeMeta.textContent = `${tradeFilterLabel(state.timelineTradeFilter)} ${formatNumber(entries.length)} / 全部 ${formatNumber(allEntries.length)} 条 · 点击明细可定位到对应时间步`;
  }
  if (!allEntries.length) {
    els.timelineTradeTape.innerHTML = `<div class="empty-state">当前时间线没有订单或成交。</div>`;
    return;
  }
  if (!entries.length) {
    els.timelineTradeTape.innerHTML = `<div class="empty-state">没有符合筛选条件的交易明细。</div>`;
    return;
  }
  els.timelineTradeTape.innerHTML = `
    <div class="timeline-trade-header">
      <span>股票 / 时间</span>
      <span>价格</span>
      <span>数量</span>
      <span>状态 / 金额</span>
    </div>
    <div class="timeline-trade-list">
      ${entries
        .slice(0, 120)
        .map((entry) => {
          const sideLabel = entry.side === "sell" ? "卖" : "买";
          const sideClass = entry.side === "sell" ? "down" : "up";
          const rejectedClass = entry.status === "rejected" ? " is-rejected" : "";
          return `
            <button class="timeline-trade-row${rejectedClass}" type="button" data-trade-step="${entry.stepIndex}">
              <span class="trade-symbol">
                <strong class="${sideClass}">${escapeHtml(entry.name || entry.symbol)}</strong>
                <small><b class="${sideClass}">${escapeHtml(sideLabel)}</b> ${escapeHtml(entry.symbol)} · ${escapeHtml(entry.timeLabel)} · ${escapeHtml(entry.sourceLabel)}</small>
              </span>
              <span><strong>${formatPrice(entry.price)}</strong><small>参考价</small></span>
              <span><strong>${formatNumber(entry.quantity)}</strong><small>股</small></span>
              <span class="trade-status ${sideClass}">
                <strong>${escapeHtml(entry.statusLabel)}</strong>
                <small>${escapeHtml(entry.amountLabel)}</small>
              </span>
            </button>`;
        })
        .join("")}
    </div>
    ${entries.length > 120 ? `<p class="timeline-trade-note">已显示前 120 条，请用筛选或搜索缩小范围。</p>` : ""}`;
  els.timelineTradeTape.querySelectorAll("[data-trade-step]").forEach((button) => {
    button.addEventListener("click", () => {
      selectTimelineIndex(Number(button.dataset.tradeStep || 0));
    });
  });
}

function timelineTradeEntries(timeline) {
  const strategyEntries = (timeline || []).flatMap((step, stepIndex) =>
    (step.orders || []).map((order) => orderEntryFromStrategyOrder(order, step, stepIndex))
  );
  const manualEntries = (state.manualAccount?.orders || []).map((order) => orderEntryFromManualOrder(order, timeline));
  return [...strategyEntries, ...manualEntries]
    .filter(Boolean)
    .sort((a, b) => String(a.timeKey).localeCompare(String(b.timeKey)) || a.sourceSort - b.sourceSort)
    .reverse();
}

function orderEntryFromStrategyOrder(order, step, stepIndex) {
  const quantity = Number(order.requested_quantity || order.quantity || order.filled_quantity || 0);
  const filledQuantity = Number(order.filled_quantity || order.quantity || 0);
  const price = Number(order.fill_price || order.price || 0);
  const status = String(order.status || "").toLowerCase();
  const rejected = status === "rejected";
  const amount = Number(order.notional || 0) || price * (filledQuantity || quantity);
  return {
    sourceLabel: "策略",
    sourceSort: 0,
    stepIndex,
    timeKey: step.as_of || step.trade_date || "",
    timeLabel: displayStepTime(step),
    symbol: order.symbol || "",
    name: order.name || symbolName(order.symbol) || "",
    side: order.side === "sell" ? "sell" : "buy",
    price,
    quantity,
    filledQuantity,
    amount,
    status,
    statusLabel: rejected ? rejectLabel(order.reject_reason) : orderStatus(order),
    amountLabel: rejected ? `参考 ${formatMoney(amount)}` : formatMoney(amount),
  };
}

function orderEntryFromManualOrder(order, timeline) {
  const quantity = Number(order.requested_quantity || order.quantity || 0);
  const price = Number(order.price || order.average_fill_price || 0);
  const amount = price * Number(order.quantity || quantity || 0);
  const stepIndex = stepIndexForTime(timeline, order.as_of || order.created_at || order.updated_at || "");
  const status = String(order.status || "").toLowerCase();
  return {
    sourceLabel: "手动",
    sourceSort: 1,
    stepIndex,
    timeKey: order.as_of || order.created_at || order.updated_at || "",
    timeLabel: displayManualOrderTime(order),
    symbol: order.symbol || "",
    name: order.name || symbolName(order.symbol) || "",
    side: order.side === "sell" ? "sell" : "buy",
    price,
    quantity,
    filledQuantity: Number(order.quantity || 0),
    amount,
    status,
    statusLabel: status === "rejected" ? rejectionLabel(order.reason) : orderStatus(order),
    amountLabel: status === "rejected" ? `参考 ${formatMoney(amount)}` : formatMoney(amount),
  };
}

function filteredTimelineTradeEntries(entries) {
  const query = String(state.timelineTradeQuery || "").trim().toUpperCase();
  return (entries || []).filter((entry) => {
    if (state.timelineTradeFilter === "filled" && entry.status === "rejected") return false;
    if (state.timelineTradeFilter === "rejected" && entry.status !== "rejected") return false;
    if (state.timelineTradeFilter === "buy" && entry.side !== "buy") return false;
    if (state.timelineTradeFilter === "sell" && entry.side !== "sell") return false;
    if (state.timelineTradeFilter === "manual" && entry.sourceLabel !== "手动") return false;
    if (!query) return true;
    const haystack = `${entry.symbol} ${entry.name} ${entry.timeLabel} ${entry.statusLabel}`.toUpperCase();
    return haystack.includes(query) || `${entry.name}`.includes(state.timelineTradeQuery.trim());
  });
}

function stepIndexForTime(timeline, value) {
  const key = String(value || "").slice(0, 10);
  if (!key) return Math.max(0, state.selectedDayIndex || 0);
  const exact = (timeline || []).findIndex((step) => String(step.as_of || step.trade_date || "").slice(0, 10) === key);
  return exact >= 0 ? exact : Math.max(0, state.selectedDayIndex || 0);
}

function displayManualOrderTime(order) {
  const value = order.as_of || order.created_at || order.updated_at || "";
  if (!value) return "-";
  if (String(value).includes("T")) return formatChinaTime(String(value));
  return String(value).replace(/[-:]/g, "").slice(0, 15);
}

function tradeFilterLabel(value) {
  const labels = {
    orders: "有订单",
    filled: "成交",
    rejected: "拒单",
    buy: "买入",
    sell: "卖出",
    manual: "手动",
  };
  return labels[value] || "有订单";
}

function renderCurrentStepInsight(day) {
  if (!els.currentStepInsight) return;
  const orders = day?.orders || [];
  const rejectedOrders = orders.filter((order) => order.status === "rejected");
  const filledOrders = orders.filter((order) => order.status !== "rejected");
  const selected = Array.isArray(day?.selected_symbols) ? day.selected_symbols : [];
  const exposure = exposurePct(day);
  const netTrade = orders.reduce((total, order) => {
    const signed = order.side === "sell" ? -1 : 1;
    return total + signed * Number(order.notional || 0);
  }, 0);
  const orderRows = orders.slice(0, 5).map((order) => {
    const sideLabel = order.side === "sell" ? "卖出" : "买入";
    const quantity = Number(order.requested_quantity || order.quantity || order.filled_quantity || 0);
    const status = order.status === "rejected" ? rejectLabel(order.reject_reason) : orderStatus(order);
    return `
      <div class="insight-order">
        <strong>${escapeHtml(order.symbol)} ${escapeHtml(order.name || "")}</strong>
        <span class="${order.side === "sell" ? "down" : "up"}">${sideLabel} ${formatNumber(quantity)}</span>
        <small>${escapeHtml(status)} · ${formatPrice(order.fill_price)} · ${formatMoney(order.notional)}</small>
      </div>`;
  }).join("");
  const chips = selected.slice(0, 8).map((symbol) => `<span class="insight-chip">${escapeHtml(symbol)} ${escapeHtml(symbolName(symbol) || "")}</span>`).join("");
  const rejectSummary = rejectedOrders.length
    ? rejectedOrders
        .slice(0, 3)
        .map((order) => `${order.symbol} ${rejectLabel(order.reject_reason)}`)
        .join("；")
    : "无拒单，按当前撮合假设执行。";
  els.currentStepInsight.innerHTML = `
    <div class="insight-header">
      <strong>${escapeHtml(displayStepTime(day))}</strong>
      <span>${formatNumber(orders.length)} 单 · 成 ${formatNumber(filledOrders.length)} · 拒 ${formatNumber(rejectedOrders.length)}</span>
    </div>
    <div class="insight-grid">
      <div class="insight-metric"><span>资产</span><strong>${formatMoney(day.equity)}</strong></div>
      <div class="insight-metric"><span>收益</span><strong class="${Number(day.return_pct || 0) >= 0 ? "up" : "down"}">${formatSignedPct(day.return_pct)}</strong></div>
      <div class="insight-metric"><span>仓位</span><strong>${formatSignedPct(exposure).replace("+", "")}</strong></div>
      <div class="insight-metric"><span>净买入额</span><strong>${formatMoney(netTrade)}</strong></div>
    </div>
    <section class="insight-block">
      <h3>本步订单</h3>
      <div class="insight-order-list">${orderRows || `<div class="empty-state">本步没有订单。</div>`}</div>
    </section>
    <section class="insight-block">
      <h3>入选股票</h3>
      <div class="insight-chip-row">${chips || `<span class="insight-chip">暂无入选</span>`}</div>
    </section>
    <section class="insight-block">
      <h3>风险提示</h3>
      <p class="manual-ticket-message">${escapeHtml(rejectSummary)}</p>
    </section>`;
}

function renderStepSelection() {
  const timeline = state.backtest?.timeline || [];
  const day = selectedTimelineStep() || state.manualSession?.current_step || timeline[timeline.length - 1];
  const symbols = stepSymbols(day);
  if (!day || !symbols.length) {
    els.stepSelectionMeta.textContent = "当前步没有可显示的入选股票。";
    els.stepSelectionList.innerHTML = `<div class="empty-state">暂无当前步股票池。</div>`;
    return;
  }
  els.stepSelectionMeta.textContent = `${displayStepTime(day)} · 入选 ${formatNumber(symbols.length)} 只 · 点击进入交易终端`;
  els.stepSelectionList.innerHTML = symbols
    .map((symbol) => {
      const name = symbolName(symbol) || stockBySymbol(symbol)?.name || "";
      const order = (day.orders || []).find((item) => item.symbol === symbol);
      const detail = order ? `${order.side === "buy" ? "买入" : "卖出"} ${formatNumber(order.requested_quantity || order.quantity)} 股` : "持仓观察";
      return `
        <article class="step-stock-card">
          <div>
            <strong>${escapeHtml(symbol)} ${escapeHtml(name)}</strong>
            <span>${escapeHtml(detail)}</span>
          </div>
          <button type="button" data-terminal-symbol="${escapeHtml(symbol)}">终端</button>
        </article>`;
    })
    .join("");
  els.stepSelectionList.querySelectorAll("[data-terminal-symbol]").forEach((button) => {
    button.addEventListener("click", () => openTerminalForStep(button.dataset.terminalSymbol, day));
  });
}

function renderTradeReview() {
  const review = state.tradeReview;
  if (!review) {
    els.tradeReviewMeta.textContent = "点击逐日模拟后生成综合复盘。";
    els.tradeReviewTable.innerHTML = `<div class="empty-state">暂无综合复盘。运行逐日模拟并手动下单后，这里会合并策略订单、手动委托和账户结果。</div>`;
    return;
  }
  const cutoff = currentStepDate();
  const rows = (review.rows || []).filter((row) => !cutoff || String(row.trade_date || "").slice(0, 10) <= cutoff);
  const summary = summarizeTradeReviewRows(rows);
  els.tradeReviewMeta.textContent = `截至 ${cutoff || "当前步"} · 手动订单 ${formatNumber(summary.manual_order_count)} · 手动成交 ${formatNumber(summary.manual_fill_count)} · 手动盈亏 ${formatSignedPct(summary.return_pct)} · 费用 ${formatMoney(summary.total_fees)}`;
  if (!rows.length) {
    els.tradeReviewTable.innerHTML = `<div class="empty-state">当前时间步之前暂无复盘行。</div>`;
    return;
  }
  els.tradeReviewTable.innerHTML = `
    <table class="trade-review-table">
      <thead>
        <tr>
          <th>日期</th>
          <th>策略订单</th>
          <th>手动委托</th>
          <th>成交额</th>
          <th>费用</th>
          <th>账户资产</th>
          <th>手动盈亏</th>
          <th>备注</th>
        </tr>
      </thead>
      <tbody>
        ${rows
          .map((row) => `
            <tr>
              <td>${escapeHtml(row.trade_date)}</td>
              <td>${formatNumber(row.strategy_order_count)} / 拒 ${formatNumber(row.strategy_rejected_count)}</td>
              <td>${formatNumber(row.manual_order_count)} / 成 ${formatNumber(row.manual_filled_count)}</td>
              <td>${formatMoney(row.manual_notional)}</td>
              <td>${formatMoney(row.manual_fees)}</td>
              <td>${formatMoney(row.manual_net_liquidation_value)}</td>
              <td class="${Number(row.manual_return_pct || 0) >= 0 ? "up" : "down"}">${formatSignedPct(row.manual_return_pct)}</td>
              <td>${escapeHtml((row.notes || []).join("；") || "-")}</td>
            </tr>`)
          .join("")}
      </tbody>
    </table>`;
}

function renderManual() {
  const session = state.manualSession;
  const timeline = state.backtest?.timeline || [];
  const day = selectedTimelineStep() || session?.current_step;
  const disabled = state.mode === "live";
  els.manualMeta.textContent = session
    ? `${session.session_id.slice(0, 8)} · ${session.status === "completed" ? "已结束" : "进行中"} · 已记录 ${formatNumber(session.action_count)} 次`
    : "首次执行或下单时会自动创建可保存的本地会话。";
  els.manualProgress.textContent = `${Math.round(Number(session?.progress_pct || 0))}%`;
  els.acceptDay.disabled = disabled;
  els.skipDay.disabled = disabled;
  els.previousDay.disabled = !session;
  els.resetSession.disabled = !session || state.mode === "live";
  if (!day) {
    els.manualCurrent.innerHTML = `<div class="empty-state">暂无当前交易日。</div>`;
    renderManualTicket();
    renderManualOrders(null);
    return;
  }
  els.manualCurrent.innerHTML = `
    <h3>${escapeHtml(displayStepTime(day))}</h3>
    <p>当前资产 ${formatMoney(day.equity)}，收益 ${formatSignedPct(day.return_pct)}，持仓 ${formatNumber(day.position_count)}，本日订单 ${formatNumber((day.orders || []).length)}。</p>`;
  renderManualTicket();
  renderManualOrders(day);
}

function renderManualTicket() {
  const session = state.manualSession;
  const account = state.manualAccount;
  const day = selectedTimelineStep() || session?.current_step || {};
  const symbol = normalizeSymbol(state.manualSymbol || firstOrderSymbol() || "300632.SZ", "300632.SZ");
  const name = symbolName(symbol) || stockBySymbol(symbol)?.name || "";
  const recommendation = manualRecommendationFor(day, symbol);
  const price = Number(els.manualPrice.value || recommendation?.price || referencePriceForSymbol(day, symbol) || stockBySymbol(symbol)?.latest?.close || 0);
  const position = currentManualPosition(symbol);
  const cash = Number(account?.summary?.cash_balance || session?.initial_cash || state.initialCash || 0);
  const availableSell = Number(position?.quantity || 0);
  const affordable = price > 0 ? roundLot(cash / price) : 0;
  const isMarketOrder = state.manualOrderType === "market";
  els.manualAccountLabel.textContent = session ? `${manualAccountId(session.session_id)} · 手动` : "首次下单自动启用";
  els.manualSymbolInput.value = `${symbol} ${name}`.trim();
  document.querySelectorAll(".manual-order-tabs [data-order-type]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.orderType === state.manualOrderType);
  });
  els.manualPrice.readOnly = isMarketOrder;
  els.manualPrice.classList.toggle("is-readonly", isMarketOrder);
  const recommendedPriceText = price > 0 ? formatPrice(price) : "";
  const recommendedQuantityText = recommendation
    ? String(Math.max(0, Math.round(recommendation.quantity)))
    : String(Math.max(100, Math.min(affordable || 100, 2000)));
  setRecommendedInput(
    els.manualPrice,
    recommendedPriceText,
    recommendation?.price ? recommendedValueText(formatPrice(recommendation.price)) : "输入价格",
    { force: isMarketOrder }
  );
  setRecommendedInput(
    els.manualQuantity,
    recommendedQuantityText,
    recommendation?.quantity ? recommendedValueText(`${formatNumber(recommendation.quantity)} 股`) : "输入数量"
  );
  renderManualRecommendationLabels(recommendation, { isMarketOrder });
  const enteredPrice = Number(els.manualPrice.value || 0);
  els.manualSubmitBuy.textContent = enteredPrice > 0 ? `买入 ${formatPrice(enteredPrice)}` : "买入";
  els.manualSubmitSell.textContent = enteredPrice > 0 ? `卖出 ${formatPrice(enteredPrice)}` : "卖出";
  const risk = state.manualRisk || null;
  renderManualActionState({ recommendation, risk, availableSell });
  const riskMessage = risk
    ? risk.accepted
      ? risk.warnings?.includes("quantity_rounded_to_lot")
        ? `预检通过，数量将按一手规则调整为 ${formatNumber(risk.quantity)} 股。`
        : `预检通过 · 预估费用 ${formatMoney(risk.estimated_fee)} · 下单后现金 ${formatMoney(risk.projected_cash_balance)}`
      : rejectionLabel(risk.reason)
    : "";
  els.manualTicketMessage.textContent =
    state.manualMessage ||
    manualRecommendationMessage(recommendation) ||
    riskMessage ||
    `${isMarketOrder ? "市价单按当前时间步参考价模拟成交。 · " : ""}可买 ${formatNumber(affordable)} 股 / 可卖 ${formatNumber(availableSell)} 股 · 当前 ${displayStepTime(day) || "-"}`;
  els.manualTicketMessage.className = `manual-ticket-message ${state.manualMessage || manualRecommendationMessage(recommendation) || (risk && !risk.accepted) ? "is-alert" : ""}`;
  renderManualEstimate();
}

function renderManualEstimate() {
  const price = Number(els.manualPrice.value || 0);
  const quantity = roundLot(Number(els.manualQuantity.value || 0));
  const notional = Math.max(0, price * quantity);
  const fee = estimateFee(state.manualSide, notional);
  els.manualEstimate.innerHTML = [
    ["委托金额", formatMoney(notional)],
    ["预估费用", formatMoney(fee)],
    ["合计占用", formatMoney(notional + fee)],
  ]
    .map(([label, value]) => `<span>${escapeHtml(label)}<strong>${escapeHtml(value)}</strong></span>`)
    .join("");
}

function setManualPreviewSide(side) {
  if (!["buy", "sell"].includes(side)) return;
  if (state.manualSide === side) return;
  state.manualSide = side;
  state.manualRisk = null;
  renderManualEstimate();
  queueManualRiskRefresh();
}

function renderManualRecommendationLabels(recommendation, { isMarketOrder = false } = {}) {
  if (!els.manualPriceLabel || !els.manualQuantityLabel) return;
  const priceLabel = isMarketOrder ? "参考价（市价预估）" : "价格";
  if (!recommendation) {
    els.manualPriceLabel.textContent = priceLabel;
    els.manualQuantityLabel.textContent = "数量";
    return;
  }
  const priceText = recommendedValueText(formatPrice(recommendation.price), recommendation.executable ? "" : rejectLabel(recommendation.reason));
  const quantityText = recommendedValueText(`${formatNumber(recommendation.quantity)}股`, recommendation.executable ? "" : "不可执行");
  els.manualPriceLabel.textContent = isMarketOrder
    ? `参考价（市价预估 · ${priceText}）`
    : `价格 ${priceText}`;
  els.manualQuantityLabel.textContent = `数量 ${quantityText}`;
}

function recommendedValueText(value, suffix = "") {
  return `${value}（策略推荐${suffix ? ` · ${suffix}` : ""}）`;
}

function renderManualActionState({ recommendation = null, risk = state.manualRisk || null, availableSell = 0 } = {}) {
  const liveBlocked = state.mode === "live";
  const blockedSide = recommendation && !recommendation.executable ? recommendation.side : "";
  const riskSide = risk && !risk.accepted ? risk.side || state.manualSide : "";
  const missingInput = Number(els.manualPrice.value || 0) <= 0 || Number(els.manualQuantity.value || 0) <= 0;
  const buyReason = liveBlocked
    ? "真实交易写入未启用"
    : missingInput
      ? "请先输入价格和数量"
      : blockedSide === "buy"
      ? rejectLabel(recommendation.reason)
      : riskSide === "buy"
        ? rejectionLabel(risk.reason)
        : "";
  const sellReason = liveBlocked
    ? "真实交易写入未启用"
    : missingInput
      ? "请先输入价格和数量"
      : blockedSide === "sell"
      ? rejectLabel(recommendation.reason)
      : riskSide === "sell"
        ? rejectionLabel(risk.reason)
        : Number(availableSell || 0) <= 0
          ? "当前没有可卖持仓"
          : "";
  els.manualSubmitBuy.disabled = Boolean(buyReason);
  els.manualSubmitSell.disabled = Boolean(sellReason);
  els.manualSubmitBuy.title = buyReason || "提交买入委托";
  els.manualSubmitSell.title = sellReason || "提交卖出委托";
}

function manualRecommendationMessage(recommendation) {
  if (!recommendation || recommendation.executable) return "";
  const sideLabel = recommendation.side === "sell" ? "卖出" : "买入";
  return `策略推荐${sideLabel}不可执行：${rejectLabel(recommendation.reason)}。推荐值仅用于复盘参考。`;
}

async function selectManualSymbol(symbol) {
  state.manualSymbol = normalizeSymbol(symbol, state.manualSymbol || "300632.SZ");
  await ensureStockLoaded(state.manualSymbol);
  const day = selectedTimelineStep() || state.manualSession?.current_step || {};
  const recommendation = manualRecommendationFor(day, state.manualSymbol);
  if (recommendation?.side) state.manualSide = recommendation.side;
  forceRecommendedInput(els.manualPrice, formatPrice(recommendation?.price || referencePriceForSymbol(day, state.manualSymbol) || stockBySymbol(state.manualSymbol)?.latest?.close || 0));
  forceRecommendedInput(els.manualQuantity, recommendation ? String(Math.max(0, Math.round(recommendation.quantity))) : "100");
  state.manualMessage = "";
  await refreshManualRisk();
  renderManualTicket();
}

function applyManualQuickSize(size) {
  const price = Number(els.manualPrice.value || 0);
  if (price <= 0) return;
  const ratio = size === "all" ? 1 : Number(size || 0);
  if (state.manualSide === "sell") {
    const available = Number(currentManualPosition(state.manualSymbol)?.quantity || 0);
    forceRecommendedInput(els.manualQuantity, String(roundLot(available * ratio)));
  } else {
    const cash = Number(state.manualAccount?.summary?.cash_balance || state.manualSession?.initial_cash || state.initialCash || 0);
    forceRecommendedInput(els.manualQuantity, String(Math.max(100, roundLot((cash * ratio) / price))));
  }
  renderManualEstimate();
  queueManualRiskRefresh();
}

async function submitManualOrder(side) {
  const actionButton = side === "sell" ? els.manualSubmitSell : els.manualSubmitBuy;
  if (actionButton?.disabled) return;
  const restoreButton = setButtonFeedback(actionButton, side === "sell" ? "卖出中" : "买入中");
  try {
    const ready = await ensureManualReplaySession();
    if (!ready || !state.manualSession?.session_id) return;
    state.manualSide = side;
    const symbol = normalizeSymbol(state.manualSymbol || els.manualSymbolInput.value, "300632.SZ");
    await ensureStockLoaded(symbol);
    const price = Number(els.manualPrice.value || 0);
    const quantity = roundLot(Number(els.manualQuantity.value || 0));
    const day = state.manualSession.current_step || {};
    if (price <= 0 || quantity <= 0) {
      state.manualMessage = "请先输入价格和数量，或在空输入框中按 Tab 填入策略推荐值。";
      return;
    }
    const result = await submitAccountOrder({
      accountId: state.manualAccountId || manualAccountId(state.manualSession.session_id),
      mode: "manual",
      strategy: state.strategy,
      symbol,
      name: symbolName(symbol),
      side,
      price,
      quantity,
      orderType: state.manualOrderType,
      asOf: day.as_of || day.trade_date || "",
      initialCash: Number(state.manualSession.initial_cash || state.initialCash || 100000),
    });
    state.manualAccount = result.account;
    state.manualRisk = result.order?.risk || null;
    state.manualMessage = result.accepted ? "手动委托已成交并写入本地账本。" : rejectionLabel(result.order?.reason);
    state.manualSession = await stepManualSession({
      sessionId: state.manualSession.session_id,
      action: "record_manual_order",
      note: els.manualNote.value,
      details: {
        accepted: Boolean(result.accepted),
        order: result.order,
        fill: result.fill,
        account_id: state.manualAccountId,
      },
    });
    await refreshTradeReview();
    state.backtest = sessionToBacktest(state.manualSession);
    state.selectedDayIndex = Number(state.manualSession.current_step_index || 0);
    hydrateManualTicketFromDay(state.manualSession.current_step);
  } catch (error) {
    state.manualMessage = `委托失败：${localizeScenarioMessage(error.message || String(error))}`;
  } finally {
    restoreButton();
    render();
    if (state.manualMessage) showScenarioToast(state.manualMessage);
  }
}

function queueManualRiskRefresh() {
  if (manualRiskTimer) window.clearTimeout(manualRiskTimer);
  manualRiskTimer = window.setTimeout(() => {
    refreshManualRisk().then(() => renderManualTicket()).catch(() => {});
  }, 180);
}

async function refreshManualRisk() {
  if (!state.manualSession?.session_id) {
    state.manualRisk = null;
    return;
  }
  const symbol = normalizeSymbol(state.manualSymbol || els.manualSymbolInput.value, "300632.SZ");
  const price = Number(els.manualPrice.value || 0);
  const quantity = Number(els.manualQuantity.value || 0);
  if (!symbol || price <= 0 || quantity <= 0) {
    state.manualRisk = null;
    return;
  }
  const requestId = state.manualRiskRequestId + 1;
  state.manualRiskRequestId = requestId;
  const payload = await preflightAccountOrder({
    accountId: state.manualAccountId || manualAccountId(state.manualSession.session_id),
    mode: "manual",
    strategy: state.strategy,
    symbol,
    name: symbolName(symbol),
    side: state.manualSide,
    price,
    quantity,
    orderType: state.manualOrderType,
    asOf: state.manualSession.current_step?.as_of || state.manualSession.current_step?.trade_date || "",
    initialCash: Number(state.manualSession.initial_cash || state.initialCash || 100000),
  });
  if (requestId === state.manualRiskRequestId) {
    state.manualRisk = payload.risk || null;
  }
}

async function refreshTradeReview() {
  if (!state.manualSession?.session_id) {
    state.tradeReview = null;
    return;
  }
  state.tradeReview = await loadManualReview({
    sessionId: state.manualSession.session_id,
    accountId: state.manualAccountId,
  });
}

function renderManualOrders(day) {
  const orders = day?.orders || [];
  els.manualOrderMeta.textContent = orders.length ? `${orders.length} 条` : "无订单";
  if (!orders.length) {
    els.manualOrders.innerHTML = `<div class="empty-state">本步没有交易策略建议，可以手动下单或跳过。</div>`;
    return;
  }
  els.manualOrders.innerHTML = `
    <div class="order-card-list">
      ${orders
        .map(
          (order) => `
            <article class="order-card">
              <div>
                <strong>${escapeHtml(order.symbol)}</strong>
                <span>${escapeHtml(order.name || "")}</span>
              </div>
              <em class="${order.side === "buy" ? "up" : "down"}">${order.side === "buy" ? "买入" : "卖出"}</em>
              <small>${formatNumber(order.requested_quantity || order.quantity)} 股 · ${formatPrice(order.fill_price)}</small>
              <b>${escapeHtml(orderStatus(order))}</b>
            </article>`
        )
        .join("")}
    </div>`;
}

function setBusy(isBusy, label = "运行中") {
  [els.generateTimeline, els.runBacktest, els.acceptDay, els.skipDay, els.previousDay, els.resetSession, els.timePrev, els.timePause, els.timeNext, els.timeReset].forEach((button) => {
    button.disabled = isBusy;
  });
  if (isBusy) els.reviewMeta.textContent = label;
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

function manualStepButton(action) {
  if (action === "previous") return els.previousDay;
  if (action === "reset") return els.resetSession;
  if (action === "skip_day") return els.skipDay;
  return els.acceptDay;
}

function manualStepBusyLabel(action) {
  if (action === "previous") return "步退中";
  if (action === "reset") return "重置中";
  if (action === "skip_day") return "跳过中";
  return "执行中";
}

function sessionToBacktest(session) {
  return {
    profile_name: session.profile_name,
    strategy_id: session.strategy_id,
    trading_policy_id: session.trading_policy_id,
    data_frequency: session.data_frequency || state.frequency,
    requested_start_date: session.requested_start_date,
    requested_end_date: session.requested_end_date,
    resolved_start_date: session.resolved_start_date,
    resolved_end_date: session.resolved_end_date,
    initial_cash: session.initial_cash,
    final_equity: session.final_equity,
    total_return_pct: session.total_return_pct,
    max_drawdown_pct: session.max_drawdown_pct,
    day_count: session.day_count,
    step_count: session.step_count || session.day_count,
    order_count: session.order_count,
    timeline: session.timeline || [],
  };
}

function currentSimulationRequest() {
  return {
    strategy: state.strategy,
    tradingPolicy: state.tradingPolicy,
    start: els.startDate.value,
    end: els.endDate.value,
    initialCash: currentInitialCash(),
    frequency: state.frequency,
  };
}

function currentInitialCash() {
  const parsed = Number(String(els.initialCash.value || "").replace(/[^\d.]/g, ""));
  return parsed > 0 ? parsed : Number(state.initialCash || 100000);
}

function formatCashInput(value) {
  const number = Number(value || 0);
  if (!Number.isFinite(number) || number <= 0) return "";
  const [integer, decimal] = String(number).split(".");
  const formattedInteger = Number(integer || 0).toLocaleString("zh-CN");
  return decimal ? `${formattedInteger}.${decimal.slice(0, 2)}` : formattedInteger;
}

function timelineConfigSignature() {
  return JSON.stringify({
    ...currentSimulationRequest(),
    frequency: state.frequency,
  });
}

function markTimelineConfigDirty() {
  state.timelineConfigDirty = state.timelineConfigSignature !== timelineConfigSignature();
  if (state.timelineConfigDirty) {
    state.tradeReview = null;
    state.manualSession = null;
    state.manualAccount = null;
    state.manualAccountId = "";
  }
}

function isTimelineReady() {
  return Boolean(
    state.backtest?.timeline?.length
      && !state.timelineConfigDirty
      && state.timelineConfigSignature === timelineConfigSignature()
  );
}

async function ensureTimelineForCurrentConfig({ preserveCurrentStep = true, autoGenerate = false } = {}) {
  if (isTimelineReady()) return true;
  if (autoGenerate) {
    await runCurrentBacktest({ animate: true, preserveCurrentStep, label: "生成时间线" });
    return isTimelineReady();
  }
  showScenarioToast("请先点击“生成时间线”，确认当前模拟背景已经生成。", { type: "warning" });
  renderTimeProgress();
  return false;
}

function preserveCurrentStepIndex(previousStep, timeline) {
  if (!previousStep || !timeline.length) return 0;
  const previousKey = String(previousStep.as_of || previousStep.trade_date || "");
  const previousDate = String(previousStep.trade_date || previousStep.as_of || "").slice(0, 10);
  const exact = timeline.findIndex((item) => String(item.as_of || item.trade_date || "") === previousKey);
  if (exact >= 0) return exact;
  const sameDate = timeline.findIndex((item) => String(item.trade_date || item.as_of || "").slice(0, 10) === previousDate);
  if (sameDate >= 0) return sameDate;
  const next = timeline.findIndex((item) => String(item.trade_date || item.as_of || "").slice(0, 10) >= previousDate);
  return next >= 0 ? next : timeline.length - 1;
}

function currentStep() {
  const timeline = state.backtest?.timeline || [];
  return timeline[state.selectedDayIndex] || timeline[timeline.length - 1] || null;
}

function selectedTimelineStep() {
  const timeline = state.backtest?.timeline || [];
  return timeline[state.selectedDayIndex] || null;
}

function visibleTimeline() {
  const timeline = state.backtest?.timeline || [];
  if (!timeline.length) return [];
  const end = Math.max(0, Math.min(timeline.length - 1, Number(state.selectedDayIndex || 0)));
  return timeline.slice(0, end + 1);
}

function currentStepDate() {
  const step = currentStep();
  return String(step?.trade_date || step?.as_of || "").slice(0, 10);
}

function returnPctForEquity(equity, initialCash) {
  const initial = Number(initialCash || 0);
  if (initial <= 0) return 0;
  return ((Number(equity || 0) / initial) - 1) * 100;
}

function maxDrawdownPctFor(timeline, initialCash) {
  const initial = Number(initialCash || timeline?.[0]?.equity || 0);
  let peak = initial;
  let maxDrawdown = 0;
  for (const item of timeline || []) {
    const equity = Number(item.equity || 0);
    peak = Math.max(peak, equity);
    if (peak > 0) maxDrawdown = Math.min(maxDrawdown, ((equity - peak) / peak) * 100);
  }
  return maxDrawdown;
}

function summarizeTradeReviewRows(rows) {
  const summary = {
    manual_order_count: 0,
    manual_fill_count: 0,
    total_fees: 0,
    return_pct: 0,
  };
  for (const row of rows || []) {
    summary.manual_order_count += Number(row.manual_order_count || 0);
    summary.manual_fill_count += Number(row.manual_fill_count ?? row.manual_filled_count ?? 0);
    summary.total_fees += Number(row.manual_fees || 0);
    summary.return_pct = Number(row.manual_return_pct || 0);
  }
  return summary;
}

function drawdownSeriesFor(timeline, initialCash) {
  let peak = Number(initialCash || timeline?.[0]?.equity || 0);
  return (timeline || []).map((item) => {
    const equity = Number(item.equity || 0);
    peak = Math.max(peak, equity);
    return peak > 0 ? ((equity - peak) / peak) * 100 : 0;
  });
}

function exposurePct(step) {
  const equity = Number(step?.equity || 0);
  if (equity <= 0) return 0;
  return (Number(step?.gross_market_value || 0) / equity) * 100;
}

function fillRatePct(step) {
  const orders = step?.orders || [];
  if (!orders.length) return 0;
  const filledCount = orders.filter((order) => orderWasFilled(order)).length;
  return (filledCount / orders.length) * 100;
}

function orderWasFilled(order) {
  const status = String(order?.status || "").toLowerCase();
  if (status === "filled" || status === "partially_filled") return true;
  if (status === "rejected" || status === "risk_rejected" || status === "cancelled") return false;
  return Number(order?.filled_quantity || order?.quantity || 0) > 0;
}

function formatPctPlain(value) {
  return `${Number(value || 0).toFixed(0)}%`;
}

function formatAxisPct(value) {
  const number = Number(value || 0);
  if (Math.abs(number) >= 100) return `${number.toFixed(0)}%`;
  if (Math.abs(number) >= 10) return `${number.toFixed(2)}%`;
  return `${number.toFixed(2)}%`;
}

function formatSignedMoney(value) {
  const number = Number(value || 0);
  return `${number >= 0 ? "+" : "-"}${formatMoney(Math.abs(number))}`;
}

function renderReferenceBarChart(svg, values, {
  emptyText = "暂无数据",
  valueFormatter = formatSignedPct,
  positiveClass = "pnl-bar-up",
  negativeClass = "pnl-bar-down",
} = {}) {
  if (!svg) return;
  svg.innerHTML = "";
  const size = svgSize(svg, 520, 78);
  const width = size.width;
  const height = size.height;
  const pad = { left: width <= 380 ? 46 : 56, right: 12, top: 8, bottom: 12 };
  const chartWidth = width - pad.left - pad.right;
  const chartHeight = height - pad.top - pad.bottom;
  const series = compactNumericSeries(values || [], 120);
  if (!series.length) {
    svg.appendChild(svgText(emptyText, width / 2, height / 2 + 4, "middle", "chart-empty"));
    return;
  }
  const maxAbs = Math.max(0.01, ...series.map((value) => Math.abs(value)));
  const yZero = pad.top + chartHeight / 2;
  const yFor = (value) => yZero - (value / maxAbs) * (chartHeight / 2);
  const bandWidth = chartWidth / Math.max(1, series.length);
  const barWidth = Math.max(1, Math.min(12, bandWidth * 0.62));
  for (let i = 0; i <= 2; i += 1) {
    const y = pad.top + (chartHeight / 2) * i;
    svg.appendChild(svgLine(pad.left, y, width - pad.right, y, "grid-line"));
  }
  svg.appendChild(svgLine(pad.left, yZero, width - pad.right, yZero, "baseline-line"));
  series.forEach((value, index) => {
    const x = pad.left + index * bandWidth + (bandWidth - barWidth) / 2;
    const y = value >= 0 ? yFor(value) : yZero;
    const heightValue = Math.max(1, Math.abs(yZero - yFor(value)));
    svg.appendChild(svgRect(x, y, barWidth, heightValue, value >= 0 ? positiveClass : negativeClass));
  });
  svg.appendChild(svgText(valueFormatter(maxAbs), pad.left - 6, pad.top + 4, "end", "mini-axis-label"));
  svg.appendChild(svgText("0", pad.left - 6, yZero + 4, "end", "mini-axis-label"));
  svg.appendChild(svgText(valueFormatter(-maxAbs), pad.left - 6, height - pad.bottom + 4, "end", "mini-axis-label"));
}

function renderReferenceLineChart(svg, values, {
  emptyText = "暂无数据",
  valueFormatter = formatPctPlain,
  minBaseline = null,
  maxBaseline = null,
  areaClass = "fill-rate-area",
  lineClass = "fill-rate-line",
} = {}) {
  if (!svg) return;
  svg.innerHTML = "";
  const size = svgSize(svg, 520, 78);
  const width = size.width;
  const height = size.height;
  const pad = { left: width <= 380 ? 46 : 56, right: 12, top: 8, bottom: 12 };
  const chartWidth = width - pad.left - pad.right;
  const chartHeight = height - pad.top - pad.bottom;
  const series = compactNumericSeries(values || [], 120);
  if (!series.length) {
    svg.appendChild(svgText(emptyText, width / 2, height / 2 + 4, "middle", "chart-empty"));
    return;
  }
  const min = Math.min(...series, minBaseline ?? series[0]);
  const max = Math.max(...series, maxBaseline ?? series[0]);
  const spread = Math.max(max - min, 0.0001);
  const xFor = (index) => pad.left + (series.length <= 1 ? chartWidth : (index / (series.length - 1)) * chartWidth);
  const yFor = (value) => pad.top + chartHeight - ((value - min) / spread) * chartHeight;
  for (let i = 0; i <= 2; i += 1) {
    const y = pad.top + (chartHeight / 2) * i;
    svg.appendChild(svgLine(pad.left, y, width - pad.right, y, "grid-line"));
  }
  const points = linePoints(series, xFor, yFor, pad.left, width - pad.right);
  const area = `${pad.left},${height - pad.bottom} ${points} ${width - pad.right},${height - pad.bottom}`;
  svg.appendChild(svgPolyline(area, areaClass));
  svg.appendChild(svgPolyline(points, lineClass));
  svg.appendChild(svgCircle(xFor(series.length - 1), yFor(series[series.length - 1]), 3, "equity-dot"));
  svg.appendChild(svgText(valueFormatter(max), pad.left - 6, pad.top + 4, "end", "mini-axis-label"));
  svg.appendChild(svgText(valueFormatter(min), pad.left - 6, height - pad.bottom + 4, "end", "mini-axis-label"));
}

function renderMiniLineChart(svg, values, {
  emptyText = "暂无数据",
  areaClass = "equity-area",
  lineClass = "equity-line",
  minBaseline = null,
  topLabel = "",
  bottomLabel = "",
} = {}) {
  if (!svg) return;
  svg.innerHTML = "";
  const width = 360;
  const height = 82;
  const pad = { left: 60, right: 10, top: 10, bottom: 16 };
  const chartWidth = width - pad.left - pad.right;
  const chartHeight = height - pad.top - pad.bottom;
  const series = (values || []).map((value) => Number(value || 0));
  if (!series.length) {
    svg.appendChild(svgText(emptyText, width / 2, height / 2, "middle", "chart-empty"));
    return;
  }
  const min = Math.min(...series, minBaseline ?? series[0]);
  const max = Math.max(...series, minBaseline ?? series[0]);
  const spread = Math.max(max - min, 0.0001);
  const xFor = (index) => pad.left + (series.length <= 1 ? chartWidth : (index / (series.length - 1)) * chartWidth);
  const yFor = (value) => pad.top + chartHeight - ((value - min) / spread) * chartHeight;
  for (let i = 0; i <= 2; i += 1) {
    const y = pad.top + (chartHeight / 2) * i;
    svg.appendChild(svgLine(pad.left, y, width - pad.right, y, "grid-line"));
  }
  const points = series.map((value, index) => `${xFor(index).toFixed(2)},${yFor(value).toFixed(2)}`).join(" ");
  const area = `${pad.left},${height - pad.bottom} ${points} ${width - pad.right},${height - pad.bottom}`;
  svg.appendChild(svgPolyline(area, areaClass));
  svg.appendChild(svgPolyline(points, lineClass));
  svg.appendChild(svgCircle(xFor(series.length - 1), yFor(series[series.length - 1]), 3, "equity-dot"));
  svg.appendChild(svgText(topLabel || formatSignedPct(max), pad.left - 6, pad.top + 4, "end", "mini-axis-label"));
  svg.appendChild(svgText(bottomLabel || formatSignedPct(min), pad.left - 6, height - pad.bottom + 4, "end", "mini-axis-label"));
}

function linePoints(values, xFor, yFor, leftX, rightX) {
  const series = (values || []).map((value) => Number(value || 0));
  if (series.length === 1) {
    const y = yFor(series[0]).toFixed(2);
    return `${leftX.toFixed(2)},${y} ${rightX.toFixed(2)},${y}`;
  }
  return series.map((value, index) => `${xFor(index).toFixed(2)},${yFor(value).toFixed(2)}`).join(" ");
}

function renderMiniBarChart(svg, values, rejectedValues = []) {
  if (!svg) return;
  svg.innerHTML = "";
  const width = 360;
  const height = 82;
  const pad = { left: 60, right: 10, top: 10, bottom: 16 };
  const chartWidth = width - pad.left - pad.right;
  const chartHeight = height - pad.top - pad.bottom;
  const compact = compactBarSeries(values || [], rejectedValues || [], 120);
  const series = compact.values;
  const rejectedSeries = compact.rejectedValues;
  if (!series.length) {
    svg.appendChild(svgText("暂无订单", width / 2, height / 2, "middle", "chart-empty"));
    return;
  }
  const max = Math.max(1, ...series);
  const bandWidth = chartWidth / Math.max(1, series.length);
  const barWidth = Math.max(1, Math.min(24, bandWidth * 0.64));
  for (let i = 0; i <= 2; i += 1) {
    const y = pad.top + (chartHeight / 2) * i;
    svg.appendChild(svgLine(pad.left, y, width - pad.right, y, "grid-line"));
  }
  series.forEach((value, index) => {
    const x = pad.left + index * bandWidth + (bandWidth - barWidth) / 2;
    const heightValue = (value / max) * chartHeight;
    const rejected = Math.min(value, Number(rejectedSeries[index] || 0));
    const rejectedHeight = (rejected / max) * chartHeight;
    svg.appendChild(svgRect(x, height - pad.bottom - heightValue, barWidth, Math.max(1, heightValue), "order-bar"));
    if (rejected > 0) {
      svg.appendChild(svgRect(x, height - pad.bottom - rejectedHeight, barWidth, Math.max(1, rejectedHeight), "reject-bar"));
    }
  });
  svg.appendChild(svgText(`${formatNumber(max)}单`, pad.left - 6, pad.top + 4, "end", "mini-axis-label"));
  svg.appendChild(svgText("0", pad.left - 6, height - pad.bottom + 4, "end", "mini-axis-label"));
}

function compactBarSeries(values, rejectedValues, maxBuckets) {
  const series = values.map((value) => Number(value || 0));
  const rejected = rejectedValues.map((value) => Number(value || 0));
  if (series.length <= maxBuckets) {
    return { values: series, rejectedValues: rejected };
  }
  const bucketSize = Math.ceil(series.length / maxBuckets);
  const compactValues = [];
  const compactRejected = [];
  for (let start = 0; start < series.length; start += bucketSize) {
    const end = Math.min(series.length, start + bucketSize);
    compactValues.push(series.slice(start, end).reduce((total, value) => total + value, 0));
    compactRejected.push(rejected.slice(start, end).reduce((total, value) => total + value, 0));
  }
  return { values: compactValues, rejectedValues: compactRejected };
}

function compactNumericSeries(values, maxBuckets) {
  const series = (values || []).map((value) => Number(value || 0));
  if (series.length <= maxBuckets) return series;
  const bucketSize = Math.ceil(series.length / maxBuckets);
  const compactValues = [];
  for (let start = 0; start < series.length; start += bucketSize) {
    const bucket = series.slice(start, Math.min(series.length, start + bucketSize));
    compactValues.push(bucket.reduce((total, value) => total + value, 0) / Math.max(1, bucket.length));
  }
  return compactValues;
}

function updateUrl() {
  const next = new URLSearchParams({
    mode: state.mode,
    strategy: state.strategy,
    trading_policy: state.tradingPolicy,
    frequency: state.frequency,
    step_interval: String(state.stepInterval || 1),
    start: els.startDate.value,
    end: els.endDate.value,
    initial_cash: String(currentInitialCash()),
  });
  history.replaceState(null, "", `./backtest_workbench.html?${next.toString()}`);
}

function stepSymbols(day) {
  const selected = Array.isArray(day?.selected_symbols) ? day.selected_symbols : [];
  const orderSymbols = (day?.orders || []).map((item) => item.symbol).filter(Boolean);
  const backtestSymbols = Array.isArray(state.backtest?.selected_symbols) ? state.backtest.selected_symbols : [];
  return [...new Set([...selected, ...orderSymbols, ...backtestSymbols])].filter(Boolean);
}

function openTerminalForStep(symbol, day) {
  const period = terminalPeriodForSimulationFrequency(state.frequency || state.backtest?.data_frequency);
  const normalizedSymbol = normalizeSymbol(symbol, "300632.SZ");
  const order = (day?.orders || []).find((item) => item.symbol === normalizedSymbol);
  const params = new URLSearchParams({
    strategy: state.strategy,
    trading_policy: state.tradingPolicy,
    symbol: normalizedSymbol,
    mode: state.mode === "live" ? "live" : "paper",
    period,
  });
  if (day?.as_of) params.set("as_of", day.as_of);
  if (day?.trade_date) params.set("date", day.trade_date);
  if (order) {
    params.set("side", order.side === "sell" ? "sell" : "buy");
    params.set("price", String(Number(order.fill_price || 0)));
    params.set("quantity", String(Number(order.requested_quantity || order.quantity || 0)));
    params.set("status", String(order.status || ""));
    if (order.reject_reason) params.set("reason", String(order.reject_reason));
    params.set("source", "strategy_suggestion");
  }
  window.location.href = `./trading_terminal.html?${params.toString()}`;
}

function firstOrderSymbol() {
  const timeline = state.backtest?.timeline || [];
  for (const day of timeline) {
    const order = (day.orders || []).find((item) => item.symbol);
    if (order) return order.symbol;
  }
  return null;
}

function hydrateManualTicketFromDay(day) {
  const order = (day?.orders || []).find((item) => item.symbol);
  const nextSymbol = normalizeSymbol(order?.symbol || state.manualSymbol || "300632.SZ", "300632.SZ");
  state.manualSymbol = nextSymbol;
  const recommendation = manualRecommendationFor(day, nextSymbol);
  if (recommendation?.side) state.manualSide = recommendation.side;
  const price = Number(recommendation?.price || stockBySymbol(nextSymbol)?.latest?.close || 0);
  forceRecommendedInput(els.manualPrice, price > 0 ? formatPrice(price) : "");
  forceRecommendedInput(
    els.manualQuantity,
    recommendation ? String(Math.max(0, Math.round(recommendation.quantity))) : String(Math.max(100, roundLot(100)))
  );
}

function manualRecommendationFor(day, symbol) {
  const normalizedSymbol = normalizeSymbol(symbol, "");
  const order = (day?.orders || []).find((item) => item.symbol === normalizedSymbol);
  if (!order) return null;
  const reason = String(order.reject_reason || order.reason || "");
  const status = String(order.status || "").toLowerCase();
  return {
    symbol: normalizedSymbol,
    side: order.side === "sell" ? "sell" : "buy",
    price: Number(order.fill_price || order.price || 0),
    quantity: Number(order.requested_quantity || order.quantity || 0),
    status,
    reason,
    executable: status !== "rejected" && status !== "risk_rejected" && status !== "cancelled" && !reason,
  };
}

function manualAccountId(sessionId) {
  return `replay_${String(sessionId || "").slice(0, 12) || "default"}`;
}

function referencePriceForSymbol(day, symbol) {
  const order = (day?.orders || []).find((item) => item.symbol === symbol);
  return Number(order?.fill_price || 0);
}

function displayStepTime(step) {
  const value = String(step?.as_of || step?.trade_date || "");
  if (!value) return "";
  if (!value.includes("T")) return value;
  return formatChinaTime(value);
}

function normalizedSimulationFrequency(value) {
  const raw = String(value || "").toLowerCase();
  const aliases = {
    "5": "5m",
    "5m": "5m",
    "5min": "5m",
    minute: "5m",
    intraday: "5m",
    "15": "15m",
    "15m": "15m",
    "15min": "15m",
    "30": "30m",
    "30m": "30m",
    "30min": "30m",
    "60": "60m",
    "60m": "60m",
    "60min": "60m",
    "1h": "60m",
    "120": "120m",
    "120m": "120m",
    "120min": "120m",
    "2h": "120m",
    day: "1d",
    daily: "1d",
    "1d": "1d",
    week: "1w",
    weekly: "1w",
    "1w": "1w",
    month: "1mo",
    monthly: "1mo",
    "1mo": "1mo",
  };
  return aliases[raw] || "1d";
}

function isIntradaySimulationFrequency(value) {
  return ["5m", "15m", "30m", "60m", "120m"].includes(normalizedSimulationFrequency(value));
}

function terminalPeriodForSimulationFrequency(value) {
  const frequency = normalizedSimulationFrequency(value);
  if (isIntradaySimulationFrequency(frequency)) return frequency;
  if (frequency === "1w") return "weekly";
  if (frequency === "1mo") return "monthly";
  return "daily";
}

function displayResolvedTime(value, frequency) {
  if (!value) return "";
  return isIntradaySimulationFrequency(frequency) ? formatChinaTime(String(value)) : String(value);
}

function formatChinaTime(value) {
  const parsed = new Date(value);
  if (!Number.isNaN(parsed.getTime())) {
    const local = new Date(parsed.getTime() + 8 * 60 * 60 * 1000);
    const pad = (number) => String(number).padStart(2, "0");
    return `${local.getUTCFullYear()}-${pad(local.getUTCMonth() + 1)}-${pad(local.getUTCDate())} ${pad(local.getUTCHours())}:${pad(local.getUTCMinutes())}`;
  }
  return value.replace("T", " ").replace(/Z$/, "");
}

function frequencyLabel(value) {
  const labels = {
    "5m": "5分钟",
    "15m": "15分钟",
    "30m": "30分钟",
    "60m": "60分钟",
    "120m": "120分钟",
    "1d": "日线",
    "1w": "周线",
    "1mo": "月线",
  };
  return labels[normalizedSimulationFrequency(value)] || "日线";
}

function renderStepIntervalOptions() {
  const options = stepIntervalOptionsForFrequency(state.frequency);
  const validValues = options.map(([value]) => Number(value));
  if (!validValues.includes(Number(state.stepInterval))) state.stepInterval = validValues[0] || 1;
  els.stepIntervalSelect.innerHTML = options
    .map(([value, label]) => `<option value="${value}">${label}</option>`)
    .join("");
  els.stepIntervalSelect.value = String(state.stepInterval);
}

function stepIntervalOptionsForFrequency(frequency) {
  const optionsByFrequency = {
    "5m": [[1, "1根5分钟"], [3, "15分钟"], [6, "30分钟"], [12, "1小时"], [24, "2小时"], [48, "约1日"], [240, "约1周"]],
    "15m": [[1, "1根15分钟"], [2, "30分钟"], [4, "1小时"], [8, "2小时"], [16, "约1日"], [80, "约1周"]],
    "30m": [[1, "1根30分钟"], [2, "1小时"], [4, "2小时"], [8, "约1日"], [40, "约1周"]],
    "60m": [[1, "1根1小时"], [2, "2小时"], [4, "约1日"], [20, "约1周"]],
    "120m": [[1, "1根2小时"], [2, "约1日"], [10, "约1周"]],
    "1d": [[1, "1个交易日"], [2, "2个交易日"], [3, "3个交易日"], [4, "4个交易日"], [5, "5个交易日"], [10, "2周"], [20, "约1月"], [60, "约1季"], [120, "约半年"]],
    "1w": [[1, "1周"], [2, "2周"], [4, "约1月"], [13, "约1季"], [26, "约半年"]],
    "1mo": [[1, "1月"], [2, "2月"], [3, "1季"], [6, "半年"], [12, "1年"]],
  };
  return optionsByFrequency[normalizedSimulationFrequency(frequency)] || optionsByFrequency["1d"];
}

function applyDateBounds() {
  [els.startDate, els.endDate].forEach((input) => {
    if (!input) return;
    syncInputBounds(input, {
      calendar: state.calendarAvailability,
      frequency: state.frequency,
    });
  });
  refreshDatePickers();
}

function handleDateInputChange(kind) {
  const input = kind === "end" ? els.endDate : els.startDate;
  const peer = kind === "end" ? els.startDate : els.endDate;
  const label = kind === "end" ? "结束日期" : "开始日期";
  const normalized = normalizeTradeDateInput(input.value, kind);
  input.value = normalized.value;
  input.classList.toggle("is-invalid", Boolean(normalized.invalid));

  if (kind === "start") {
    state.start = input.value;
    if (peer.value && peer.value < input.value) {
      peer.value = input.value;
      state.end = input.value;
      showScenarioToast(`${label}已设置为 ${input.value}，结束日期已同步到同一天。`);
    } else {
      showScenarioToast(normalized.message || `${label}已设置为 ${input.value}。`);
    }
  } else {
    state.end = input.value;
    if (peer.value && input.value < peer.value) {
      peer.value = input.value;
      state.start = input.value;
      showScenarioToast(`${label}已设置为 ${input.value}，开始日期已同步到同一天。`);
    } else {
      showScenarioToast(normalized.message || `${label}已设置为 ${input.value}。`);
    }
  }
  markTimelineConfigDirty();
  renderTimeProgress();
  updateUrl();
}

function setupDatePickers() {
  if (datePickers.length) return;
  datePickers = [
    enhanceSimulationDateInput(els.startDate, {
      label: "开始日期",
      getCalendar: () => state.calendarAvailability,
      getFrequency: () => state.frequency,
    }),
    enhanceSimulationDateInput(els.endDate, {
      label: "结束日期",
      getCalendar: () => state.calendarAvailability,
      getFrequency: () => state.frequency,
    }),
  ].filter(Boolean);
}

function refreshDatePickers() {
  datePickers.forEach((picker) => picker?.refresh?.());
}

function updateTradingCalendarForFrequency() {
  const dates = datesForFrequency(state.calendarAvailability, state.frequency);
  state.tradingCalendar = state.calendarAvailability ? dates : state.tradingCalendar;
  applyDateBounds();
}

function coerceDateInputsForCurrentFrequency({ notify = false } = {}) {
  const beforeStart = els.startDate.value;
  const beforeEnd = els.endDate.value;
  const start = normalizeTradeDateInput(beforeStart || state.start, "start").value;
  let end = normalizeTradeDateInput(beforeEnd || state.end, "end").value;
  let resolvedStart = start;
  if (resolvedStart && end && end < resolvedStart) {
    end = resolvedStart;
  }
  els.startDate.value = resolvedStart;
  els.endDate.value = end;
  state.start = resolvedStart;
  state.end = end;
  if (notify && (beforeStart !== resolvedStart || beforeEnd !== end)) {
    showScenarioToast(`已按${frequencyLabel(state.frequency)}数据可用日期调整为 ${resolvedStart} 至 ${end}。`, { type: "info" });
  }
  refreshDatePickers();
}

function normalizeTradeDateInput(value, kind) {
  const minDate = firstTradeDate();
  const maxDate = latestTradeDate();
  if (!value) {
    const fallback = kind === "end" ? maxDate : minDate;
    return { value: fallback, invalid: true, message: `日期不能为空，已恢复为 ${fallback}。` };
  }
  if (minDate && value < minDate) {
    return { value: minDate, invalid: true, message: `本地数据从 ${minDate} 开始，已调整到最早可用日。` };
  }
  if (maxDate && value > maxDate) {
    return { value: maxDate, invalid: true, message: `本地数据到 ${maxDate}，已调整到最新可用日。` };
  }
  if (!isAllowedTradeDate(value)) {
    const nearest = nearestAllowedTradeDate(value, kind === "end" ? "backward" : "forward");
    return {
      value: nearest || value,
      invalid: true,
      message: nearest
        ? `${value} 不是当前数据中的交易日，已调整到 ${nearest}。`
        : `${value} 不在当前可用交易日内。`,
    };
  }
  return { value, invalid: false, message: "" };
}

function isAllowedTradeDate(value) {
  const dates = availableTradeDates();
  if (dates.length) return dates.includes(value);
  const day = new Date(`${value}T00:00:00`).getDay();
  return day !== 0 && day !== 6;
}

function nearestAllowedTradeDate(value, direction = "backward") {
  const scopedNearest = nearestAvailableDate(state.calendarAvailability, state.frequency, value, direction);
  if (scopedNearest) return scopedNearest;
  const dates = availableTradeDates();
  if (dates.length) {
    if (direction === "forward") return dates.find((date) => date >= value) || dates[dates.length - 1] || "";
    return [...dates].reverse().find((date) => date <= value) || dates[0] || "";
  }
  const cursor = new Date(`${value}T00:00:00`);
  const step = direction === "forward" ? 1 : -1;
  for (let attempt = 0; attempt < 14; attempt += 1) {
    const rendered = cursor.toISOString().slice(0, 10);
    if (rendered >= firstTradeDate() && rendered <= latestTradeDate() && isAllowedTradeDate(rendered)) return rendered;
    cursor.setDate(cursor.getDate() + step);
  }
  return direction === "forward" ? firstTradeDate() : latestTradeDate();
}

function availableTradeDates() {
  const frequencyDates = datesForFrequency(state.calendarAvailability, state.frequency);
  if (frequencyDates.length) return frequencyDates;
  if (state.tradingCalendar.length) return state.tradingCalendar;
  const dates = new Set();
  for (const stock of Object.values(marketData.symbols || {})) {
    for (const bar of stock?.bars || []) {
      const date = String(bar.date || bar.time || "").slice(0, 10);
      if (date) dates.add(date);
    }
  }
  for (const step of state.backtest?.timeline || []) {
    const date = String(step.trade_date || step.as_of || "").slice(0, 10);
    if (date) dates.add(date);
  }
  return [...dates].sort();
}

function applyEnvironmentModeToInputs() {
  if (state.mode !== "live") {
    els.startDate.disabled = false;
    els.endDate.disabled = false;
    els.stepIntervalSelect.disabled = false;
    return;
  }
  const latest = latestTradeDate();
  if (latest) {
    state.start = latest;
    state.end = latest;
    els.startDate.value = latest;
    els.endDate.value = latest;
  }
  els.startDate.disabled = true;
  els.endDate.disabled = true;
  els.stepIntervalSelect.disabled = true;
  state.runMode = "auto";
}

function latestTradeDate() {
  const dates = availableTradeDates();
  if (dates.length) return dates[dates.length - 1];
  if (state.tradingCalendar.length) return state.tradingCalendar[state.tradingCalendar.length - 1];
  return marketData.daily_data?.latest_trade_date
    || marketData.data_readiness?.daily?.last_trade_date
    || "2026-04-30";
}

function firstTradeDate() {
  const dates = availableTradeDates();
  if (dates.length) return dates[0];
  if (state.tradingCalendar.length) return state.tradingCalendar[0];
  return marketData.daily_data?.first_trade_date
    || marketData.data_readiness?.daily?.first_trade_date
    || "2025-05-06";
}

function selectTimelineIndex(index, { stopPlayback = true, notifyToast = true } = {}) {
  if (stopPlayback) {
    stopAutoRunPlayback();
    state.runMode = "manual";
  }
  const timeline = state.backtest?.timeline || [];
  if (!timeline.length) return;
  state.selectedDayIndex = Math.max(0, Math.min(timeline.length - 1, index));
  state.manualRisk = null;
  state.manualMessage = "";
  hydrateManualTicketFromDay(timeline[state.selectedDayIndex]);
  renderSelectedStepViews();
  if (notifyToast) showScenarioToast(`已切换到 ${displayStepTime(timeline[state.selectedDayIndex])}`);
}

async function moveTimeline(direction) {
  const restoreButton = setButtonFeedback(direction > 0 ? els.timeNext : els.timePrev, direction > 0 ? "步进中" : "步退中");
  stopAutoRunPlayback();
  state.runMode = "manual";
  try {
    const timelineReady = await ensureTimelineForCurrentConfig({ preserveCurrentStep: true });
    if (!timelineReady) return;
    const timeline = state.backtest?.timeline || [];
    if (!timeline.length) return;
    selectTimelineIndex(state.selectedDayIndex + direction * Math.max(1, Number(state.stepInterval || 1)));
  } finally {
    restoreButton();
    renderTimeProgress();
  }
}

function resetTimelineToStart() {
  const restoreButton = setButtonFeedback(els.timeReset, "重置中");
  stopAutoRunPlayback();
  state.runMode = "manual";
  selectTimelineIndex(0, { stopPlayback: false, notifyToast: true });
  restoreButton();
  renderTimeProgress();
}

function shouldRenderHeavyAutoStep(final = false) {
  if (!autoRunActive || final) return true;
  const cadence = isIntradaySimulationFrequency(state.frequency) ? 3 : 1;
  return autoRunRenderTick % cadence === 0;
}

function shouldRenderFullTimeline(final = false) {
  if (!autoRunActive || final) return true;
  const cadence = isIntradaySimulationFrequency(state.frequency) ? 10 : 4;
  return autoRunRenderTick % cadence === 0;
}

function renderSelectedStepViews({ fast = false, final = false } = {}) {
  const heavyTick = shouldRenderHeavyAutoStep(final);
  const fullTimelineTick = shouldRenderFullTimeline(final);
  renderSummary();
  renderTimeProgress();
  if (!fast || heavyTick) renderEquityChart();
  if (fast && !fullTimelineTick) {
    renderTimelineFast();
  } else {
    renderTimeline();
  }
  renderStepSelection();
  if (!fast || fullTimelineTick) renderTradeReview();
  renderManual();
  if (!fast || final) updateUrl();
}

function startAutoRunPlayback({ reset = true } = {}) {
  const timeline = state.backtest?.timeline || [];
  if (timeline.length <= 1) return;
  stopAutoRunPlayback({ clearPreparing: false });
  state.runMode = "auto";
  state.autoRunPreparing = false;
  autoRunActive = true;
  autoRunRenderTick = 0;
  if (reset) state.selectedDayIndex = 0;
  renderSelectedStepViews({ final: true });
  scheduleAutoRunStep();
  showScenarioToast("全自动运行已开始。");
}

function stopAutoRunPlayback({ clearPreparing = true } = {}) {
  autoRunActive = false;
  autoRunInFlight = false;
  if (clearPreparing) state.autoRunPreparing = false;
  if (autoRunTimer) {
    window.clearTimeout(autoRunTimer);
    autoRunTimer = null;
  }
}

function scheduleAutoRunStep() {
  if (!autoRunActive || autoRunTimer || autoRunInFlight) return;
  autoRunTimer = window.setTimeout(() => {
    autoRunTimer = null;
    advanceAutoRunStep().catch(() => {
      stopAutoRunPlayback();
      state.runMode = "manual";
      renderSelectedStepViews({ final: true });
      showScenarioToast("全自动运行已暂停：页面同步失败。");
    });
  }, autoRunDelayMs());
}

async function advanceAutoRunStep() {
  const timeline = state.backtest?.timeline || [];
  if (!autoRunActive || autoRunInFlight || !timeline.length) return;
  autoRunInFlight = true;
  const step = Math.max(1, Number(state.stepInterval || 1));
  const nextIndex = Math.min(timeline.length - 1, state.selectedDayIndex + step);
  state.selectedDayIndex = nextIndex;
  state.manualRisk = null;
  state.manualMessage = "";
  hydrateManualTicketFromDay(timeline[state.selectedDayIndex]);
  autoRunRenderTick += 1;
  renderSelectedStepViews({ fast: true });
  await nextPaint();
  autoRunInFlight = false;
  if (nextIndex >= timeline.length - 1) {
    stopAutoRunPlayback();
    state.runMode = "manual";
    renderSelectedStepViews({ final: true });
    showScenarioToast("全自动运行已完成。");
    return;
  }
  scheduleAutoRunStep();
}

function autoRunDelayMs() {
  return isIntradaySimulationFrequency(state.frequency) ? 90 : 140;
}

function nextPaint() {
  return new Promise((resolve) => {
    window.requestAnimationFrame(() => window.requestAnimationFrame(resolve));
  });
}

function toggleTimePlayback() {
  const timeline = state.backtest?.timeline || [];
  if (!timeline.length) return;
  if (autoRunActive) {
    stopAutoRunPlayback();
    state.runMode = "manual";
    renderSelectedStepViews();
    showScenarioToast("模拟时间已暂停。");
    return;
  }
  if (state.selectedDayIndex >= timeline.length - 1) return;
  startAutoRunPlayback({ reset: false });
}

function publishCurrentScenario(playbackState = "paused") {
  if (state.mode === "live" || !state.backtest?.timeline?.length) return;
  saveSimulationScenario(buildSimulationScenarioFromBacktest({
    backtest: state.backtest,
    currentIndex: state.selectedDayIndex,
    mode: state.mode,
    runMode: state.runMode,
    frequency: state.frequency,
    strategy: state.strategy,
    tradingPolicy: state.tradingPolicy,
    stepInterval: state.stepInterval,
    playbackState,
  }));
}

function environmentLabel(mode) {
  return mode === "live" ? "实盘交易" : "模拟交易";
}

function runModeLabel(value) {
  return value === "manual" ? "暂停/步进" : "全自动";
}

function stepIntervalLabel() {
  const selected = els.stepIntervalSelect.options[els.stepIntervalSelect.selectedIndex];
  return selected?.textContent || `${formatNumber(state.stepInterval)}步`;
}

function currentManualPosition(symbol) {
  return (state.manualAccount?.positions || []).find((item) => item.symbol === symbol) || null;
}

function estimateFee(side, notional) {
  if (notional <= 0) return 0;
  const commission = Math.max(notional * 2.5 / 10000, 5);
  const transfer = notional * 0.1 / 10000;
  const stamp = side === "sell" ? notional * 5.0 / 10000 : 0;
  return commission + transfer + stamp;
}

function strategyLabel(strategy) {
  const labels = {
    daily_rank_main: "日线强势股 Top 2",
    stable_momentum_blend: "稳健动量波动组合 Top 5",
    defensive_low_vol_momentum: "低波动动量防守 Top 5",
    trend_breakout_liquid: "流动性趋势突破 Top 5",
  };
  if (labels[strategy.profile_name]) return labels[strategy.profile_name];
  return String(strategy.profile_name || strategy.strategy_id || "策略").replace(/[_:-]+/g, " ");
}

function policyLabel(value) {
  const registered = state.tradingPolicies.find((item) => item.policy_id === value);
  if (registered?.label) return registered.label;
  const labels = {
    equal_weight_daily_rebalance: "等权每日调仓",
  };
  return labels[value] || value || "交易策略";
}

function orderStatus(order) {
  if (order.status === "rejected") return rejectLabel(order.reject_reason);
  if (order.status === "partially_filled") return "部分成交";
  return "已成交";
}

function rejectLabel(reason) {
  const labels = {
    limit_up_buy_blocked: "涨停无法买入",
    limit_down_sell_blocked: "跌停无法卖出",
    insufficient_cash: "资金不足",
    t_plus_one_restricted: "T+1限制",
    zero_volume_bar: "停牌或无成交",
    below_lot_size: "不足一手",
  };
  return labels[reason] || reason || "拒单";
}

function rejectionLabel(reason) {
  const labels = {
    insufficient_cash: "可用资金不足，委托被拒绝。",
    insufficient_position: "当前持仓不足，委托被拒绝。",
    invalid_price: "价格无效，委托被拒绝。",
    invalid_side: "买卖方向无效，委托被拒绝。",
    quantity_must_be_at_least_one_lot: "A股按100股一手交易，请输入至少100股。",
    live_trading_disabled: "真实交易写入未启用。",
  };
  return labels[reason] || "委托被拒绝。";
}

function svgSize(svg, fallbackWidth, fallbackHeight) {
  const box = svg?.viewBox?.baseVal;
  return {
    width: Number(box?.width || fallbackWidth),
    height: Number(box?.height || fallbackHeight),
  };
}

function svgLine(x1, y1, x2, y2, className) {
  const node = document.createElementNS("http://www.w3.org/2000/svg", "line");
  node.setAttribute("x1", x1);
  node.setAttribute("y1", y1);
  node.setAttribute("x2", x2);
  node.setAttribute("y2", y2);
  node.setAttribute("class", className);
  return node;
}

function svgPolyline(points, className) {
  const node = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
  node.setAttribute("points", points);
  node.setAttribute("class", className);
  return node;
}

function svgCircle(cx, cy, r, className) {
  const node = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  node.setAttribute("cx", cx);
  node.setAttribute("cy", cy);
  node.setAttribute("r", r);
  node.setAttribute("class", className);
  return node;
}

function svgRect(x, y, width, height, className) {
  const node = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  node.setAttribute("x", x);
  node.setAttribute("y", y);
  node.setAttribute("width", width);
  node.setAttribute("height", height);
  node.setAttribute("rx", "2");
  node.setAttribute("class", className);
  return node;
}

function svgText(text, x, y, anchor, className) {
  const node = document.createElementNS("http://www.w3.org/2000/svg", "text");
  node.textContent = text;
  node.setAttribute("x", x);
  node.setAttribute("y", y);
  node.setAttribute("text-anchor", anchor);
  node.setAttribute("class", className);
  return node;
}
