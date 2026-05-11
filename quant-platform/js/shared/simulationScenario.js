import { formatNumber } from "./format.js";
import { datesForFrequency, enhanceSimulationDateInput, loadSimulationCalendarAvailability, nearestAvailableDate, syncInputBounds } from "./simulationCalendar.js";

const STORAGE_KEY = "internal_quant_platform.simulation_scenario.v1";
const MAX_STORED_STEPS = 5000;
const MAX_STORED_CLOCK_STEPS = 25000;
let toastTimer = null;
let loadingDepth = 0;

export function buildSimulationScenarioFromBacktest({
  backtest,
  currentIndex = 0,
  mode = "paper",
  runMode = "auto",
  frequency = "1d",
  strategy = "",
  tradingPolicy = "",
  stepInterval = 1,
  initialCash = 0,
  playbackState = "paused",
} = {}) {
  const timeline = Array.isArray(backtest?.timeline) ? backtest.timeline : [];
  const totalSteps = timeline.length;
  const safeIndex = clampIndex(currentIndex, totalSteps);
  const compactSteps = timelineStepsForStorage(timeline);
  const resolvedPlaybackState = safeIndex >= totalSteps - 1 && playbackState === "running" ? "paused" : playbackState;
  return {
    version: 1,
    mode: mode === "live" ? "live" : "paper",
    runMode,
    frequency: backtest?.data_frequency || frequency,
    baseDataFrequency: backtest?.base_data_frequency || backtest?.data_frequency || frequency,
    strategy: backtest?.profile_name || strategy,
    tradingPolicy: backtest?.trading_policy_id || tradingPolicy,
    stepInterval: Math.max(1, Number(stepInterval || 1)),
    initialCash: Number(backtest?.initial_cash || initialCash || 0),
    requestedStart: backtest?.requested_start_date || "",
    requestedEnd: backtest?.requested_end_date || "",
    resolvedStart: backtest?.resolved_start_date || "",
    resolvedEnd: backtest?.resolved_end_date || "",
    totalSteps,
    currentIndex: safeIndex,
    stepDetailLevel: totalSteps <= MAX_STORED_STEPS ? "full" : compactSteps.length ? "clock" : "current",
    selectedSymbols: Array.isArray(backtest?.selected_symbols) ? backtest.selected_symbols.slice(0, 50) : [],
    firstStep: compactStep(timeline[0], 0),
    lastStep: compactStep(timeline[totalSteps - 1], totalSteps - 1),
    currentStep: compactStep(timeline[safeIndex], safeIndex),
    steps: compactSteps,
    playbackState: resolvedPlaybackState,
    updatedAt: new Date().toISOString(),
  };
}

export function saveSimulationScenario(scenario) {
  if (!scenario || scenario.mode === "live" || !Number(scenario.totalSteps || 0)) return null;
  try {
    const payload = JSON.stringify(scenario);
    window.localStorage.setItem(STORAGE_KEY, payload);
    window.dispatchEvent(new CustomEvent("simulation-scenario-change", { detail: scenario }));
    return scenario;
  } catch (_error) {
    return null;
  }
}

export function loadSimulationScenario() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    const normalized = normalizeLoadedScenario(parsed);
    if (normalized !== parsed) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    return normalized;
  } catch (_error) {
    return null;
  }
}

export function currentSimulationStep(scenario = loadSimulationScenario()) {
  if (!scenario) return null;
  const index = clampIndex(scenario.currentIndex || 0, Number(scenario.totalSteps || 0));
  const indexedStep = scenario.steps?.[index] || null;
  const currentStep = scenario.currentStep || null;
  if (stepMatchesIndex(currentStep, index)) return mergeScenarioStep(indexedStep, currentStep, scenario);
  return mergeScenarioStep(indexedStep || currentStep, null, scenario);
}

export function localizeScenarioMessage(message) {
  let text = String(message || "").trim();
  if (!text) return "";
  text = text.replace(/^Error:\s*/i, "").replace(/^报错：\s*/, "");
  const replacements = [
    [/POST is only supported for \/api endpoints/i, "POST 请求只支持 /api 接口"],
    [/daily CSV is not available/i, "日线 CSV 数据不可用"],
    [
      /strategy selected no symbols for intraday simulation dates:\s*(.+)/i,
      (_match, detail) => `当前选股策略在这些日期都没有选出股票，无法生成 5 分钟模拟：${detail}。请换更晚的日期范围，或换一个选股策略。`,
    ],
    [/strategy selected no symbols for intraday simulation/i, "当前策略没有选出股票，无法生成 5 分钟模拟"],
    [/details must be an object when provided/i, "details 参数必须是对象"],
    [/JSON body must be an object/i, "请求体必须是 JSON 对象"],
    [/unknown endpoint:\s*(.+)/i, (_match, path) => `未知接口：${path}`],
    [/missing required query parameter:\s*([A-Za-z0-9_]+)/i, (_match, name) => `缺少必要参数：${parameterLabel(name)}`],
    [/([A-Za-z0-9_]+) must be non-negative/i, (_match, name) => `${parameterLabel(name)}必须大于等于 0`],
    [/([A-Za-z0-9_]+) must be positive/i, (_match, name) => `${parameterLabel(name)}必须大于 0`],
    [/value must be positive/i, "数值必须大于 0"],
    [/selection request failed:\s*(\d+)/i, (_match, code) => `选股请求失败，状态码 ${code}`],
    [/request failed:\s*(\d+)/i, (_match, code) => `请求失败，状态码 ${code}`],
    [/A-share daily snapshot has no available trade dates/i, "A 股日线快照没有可用交易日"],
    [/no A-share daily data is available at or before\s*([0-9-]+)/i, (_match, date) => `${date} 当日或之前没有可用 A 股日线数据`],
    [/no A-share daily data is available at or after\s*([0-9-]+)/i, (_match, date) => `${date} 当日或之后没有可用 A 股日线数据`],
    [/no strategy profile configured/i, "尚未配置选股策略"],
    [/unknown strategy profile:\s*(.+)/i, (_match, name) => `未知选股策略：${name}`],
    [/unknown trading policy:\s*(.+)/i, (_match, name) => `未知交易策略：${name}`],
    [/manual replay session not found:\s*(.+)/i, (_match, id) => `找不到手动回放会话：${id}`],
    [/manual replay session payload must be an object/i, "手动回放会话数据必须是对象"],
    [/session_id must not be empty/i, "会话 ID 不能为空"],
    [/lookback_bars must be at least 1/i, "回看周期必须至少为 1"],
    [/top_n must be at least 1/i, "选股数量必须至少为 1"],
    [/initial_cash must be positive/i, "初始资金必须大于 0"],
    [/lot_size must be at least 1/i, "每手数量必须至少为 1"],
    [/cash_buffer_ratio must be in \[0, 1\)/i, "现金缓冲比例必须在 0 到 1 之间"],
    [/participation_cap_ratio must be positive/i, "成交参与比例必须大于 0"],
    [/live trading writes are disabled/i, "真实交易写入尚未启用"],
    [/cash balance cannot cover notional plus estimated fees/i, "可用资金不足以覆盖委托金额和预估费用"],
    [/position quantity cannot cover sell order/i, "当前持仓不足以覆盖卖出委托"],
    [/missing market data for current holdings:\s*(.+)/i, (_match, symbols) => `当前持仓缺少行情数据：${symbols}`],
    [/cannot run paper session without bar history/i, "没有历史 K 线，无法运行模拟交易会话"],
  ];
  for (const [pattern, replacement] of replacements) {
    text = text.replace(pattern, replacement);
  }
  return text;
}

export function showScenarioToast(message, options = {}) {
  if (!message) return;
  const localized = localizeScenarioMessage(message);
  const type = toastTypeFor(localized, options.type);
  const displayMessage = type === "error" && !localized.startsWith("报错：")
    ? `报错：${localized}`
    : localized;
  let toast = document.getElementById("global-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "global-toast";
    toast.className = "global-toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    toast.setAttribute("tabindex", "0");
    const messageNode = document.createElement("span");
    messageNode.className = "global-toast-message";
    const closeButton = document.createElement("button");
    closeButton.className = "global-toast-close";
    closeButton.type = "button";
    closeButton.setAttribute("aria-label", "关闭提示");
    closeButton.title = "关闭提示";
    closeButton.textContent = "×";
    closeButton.addEventListener("click", (event) => {
      event.stopPropagation();
      hideScenarioToast(toast);
    });
    toast.addEventListener("mouseenter", () => {
      if (toastTimer) window.clearTimeout(toastTimer);
    });
    toast.addEventListener("focusin", () => {
      if (toastTimer) window.clearTimeout(toastTimer);
    });
    toast.addEventListener("mouseleave", () => scheduleToastHide(toast));
    toast.addEventListener("focusout", () => scheduleToastHide(toast));
    toast.append(messageNode, closeButton);
    document.body.appendChild(toast);
  }
  const messageNode = toast.querySelector(".global-toast-message");
  if (messageNode) messageNode.textContent = displayMessage;
  toast.dataset.duration = String(options.duration || toastDurationFor(type));
  toast.className = `global-toast is-visible is-${type}`;
  scheduleToastHide(toast);
}

export function showScenarioLoading(message = "正在初始化页面数据...") {
  loadingDepth += 1;
  let overlay = document.getElementById("global-loading");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "global-loading";
    overlay.className = "global-loading";
    overlay.setAttribute("role", "status");
    overlay.setAttribute("aria-live", "polite");
    overlay.innerHTML = `
      <div class="global-loading-card">
        <span class="loading-spinner" aria-hidden="true"></span>
        <strong></strong>
        <p>正在读取本地行情、策略配置和账户状态，不是网络异常。</p>
      </div>`;
    document.body.appendChild(overlay);
  }
  overlay.querySelector("strong").textContent = message;
  overlay.classList.add("is-visible");
  return () => hideScenarioLoading();
}

export function hideScenarioLoading() {
  loadingDepth = Math.max(0, loadingDepth - 1);
  if (loadingDepth > 0) return;
  document.getElementById("global-loading")?.classList.remove("is-visible");
}

function scheduleToastHide(toast) {
  if (toastTimer) window.clearTimeout(toastTimer);
  const duration = Number(toast?.dataset?.duration || 3200);
  toastTimer = window.setTimeout(() => {
    hideScenarioToast(toast);
  }, duration);
}

function hideScenarioToast(toast = document.getElementById("global-toast")) {
  if (toastTimer) window.clearTimeout(toastTimer);
  toastTimer = null;
  toast?.classList.remove("is-visible");
}

function toastTypeFor(message, explicitType = "") {
  const type = String(explicitType || "").trim().toLowerCase();
  if (["success", "error", "warning", "info"].includes(type)) return type;
  if (/报错|错误|失败|未提交|拒绝|不可用|请求失败|找不到|未知|缺少|不能为空|必须|没有可用|无法生成|无法运行|not available|failed|error|cannot|unknown|missing|invalid|must|not found/i.test(message)) return "error";
  if (/请先|尚未|待生成|不能为空|已调整|不在当前|无法启动/.test(message)) return "warning";
  if (/成功|已生成|已完成|已成交|已写入|已创建|已开始/.test(message)) return "success";
  return "info";
}

function toastDurationFor(type) {
  if (type === "error") return 4500;
  if (type === "warning") return 3600;
  if (type === "success") return 2600;
  return 3000;
}

function parameterLabel(name) {
  const labels = {
    initial_cash: "初始资金",
    top_n: "选股数量",
    lookback_bars: "回看周期",
    limit: "数量上限",
    account: "账户",
    mode: "模式",
    strategy: "选股策略",
    trading_policy: "交易策略",
    policy: "交易策略",
    symbol: "股票代码",
    start: "开始日期",
    end: "结束日期",
    value: "数值",
  };
  return labels[name] || name;
}

export function setupSimulationScenarioBar({ mode = "paper", onIndexChange, getGenerationConfig } = {}) {
  const bar = document.querySelector(".simulation-clock");
  if (!bar) return null;
  const elements = {
    mode: document.getElementById("sim-clock-mode"),
    current: document.getElementById("sim-clock-current"),
    range: document.getElementById("sim-clock-range"),
    label: document.getElementById("sim-clock-progress-label"),
    progress: document.getElementById("time-progress"),
    frequency: document.getElementById("frequency-select"),
    stepInterval: document.getElementById("step-interval-select"),
    startDate: document.getElementById("start-date"),
    endDate: document.getElementById("end-date"),
    initialCash: document.getElementById("initial-cash"),
    generate: document.getElementById("generate-timeline"),
    run: document.getElementById("run-backtest"),
    prev: document.getElementById("time-prev"),
    pause: document.getElementById("time-pause"),
    next: document.getElementById("time-next"),
    reset: document.getElementById("time-reset"),
  };
  const envMode = mode === "live" ? "live" : "paper";
  bar.classList.toggle("is-hidden", envMode === "live");
  if (envMode === "live") return null;

  let scenario = loadSimulationScenario();
  let lastNotifiedSignature = "";
  let playbackTimer = null;
  let playbackInFlight = false;
  let generating = false;
  let configDirty = false;
  let notificationQueue = Promise.resolve();
  let calendarAvailability = null;
  let datePickers = [];

  setupDatePickers();
  loadSimulationCalendarAvailability()
    .then((calendar) => {
      calendarAvailability = calendar;
      coerceScenarioDateInputs({ notify: false });
      render();
    })
    .catch(() => {});

  const notifyPage = (active) => {
    if (typeof onIndexChange !== "function" || !active) return Promise.resolve();
    const signature = `${active.updatedAt || ""}:${active.currentIndex || 0}:${active.totalSteps || 0}`;
    if (signature === lastNotifiedSignature) return notificationQueue;
    lastNotifiedSignature = signature;
    notificationQueue = notificationQueue
      .catch(() => {})
      .then(() => Promise.resolve(onIndexChange(active)))
      .catch(() => {});
    return notificationQueue;
  };

  const render = ({ notify = false } = {}) => {
    scenario = loadSimulationScenario();
    const total = Number(scenario?.totalSteps || 0);
    const hasTimeline = total > 0;
    const hasIndexedSteps = hasTimeline && Array.isArray(scenario?.steps) && scenario.steps.length >= total;
    const max = Math.max(0, total - 1);
    const index = clampIndex(Number(scenario?.currentIndex || 0), total);
    const currentStep = currentSimulationStep(scenario);
    const first = scenario?.firstStep || scenario?.steps?.[0] || null;
    const last = scenario?.lastStep || scenario?.steps?.[max] || null;
    const running = scenario?.playbackState === "running";
    bar.classList.toggle("is-empty", !hasTimeline);
    if (elements.mode) elements.mode.textContent = hasTimeline
      ? `模拟场景 · ${runModeLabel(scenario.runMode)} · ${frequencyLabel(scenario.frequency)}`
      : "模拟场景 · 未生成";
    if (elements.current) elements.current.textContent = hasTimeline ? stepLabel(currentStep, index) : "未生成时间线";
    if (elements.range) elements.range.textContent = hasTimeline
      ? `${stepLabel(first, 0)} 至 ${stepLabel(last, max)} · 策略 ${strategyLabel(scenario.strategy)}`
      : "进入交易页选择区间、粒度和策略后，生成一条全站共享的模拟时间线。";
    if (elements.label) {
      const storedNote = scenario?.stepDetailLevel === "clock" ? " · 精简时间线" : scenario?.steps?.length ? "" : " · 只同步当前步";
      const dirtyNote = configDirty ? " · 背景待生成" : "";
      elements.label.textContent = hasTimeline
        ? `进度 ${formatNumber(index + 1)} / ${formatNumber(total)}${storedNote}${dirtyNote}`
        : "进度 0 / 0";
    }
    renderScenarioFields(scenario);
    if (elements.progress) {
      elements.progress.max = String(max);
      elements.progress.value = String(index);
      elements.progress.disabled = generating || configDirty || !hasIndexedSteps;
    }
    if (elements.generate) {
      elements.generate.textContent = generating ? "生成中" : hasTimeline && !configDirty ? "重新生成" : "生成时间线";
      elements.generate.disabled = generating || running;
      elements.generate.classList.toggle("is-pending", generating);
    }
    if (elements.run) {
      elements.run.textContent = running ? "运行中" : "全自动运行";
      elements.run.disabled = generating || configDirty || running || !hasIndexedSteps || index >= max;
      elements.run.classList.toggle("is-pending", running);
    }
    if (elements.prev) elements.prev.disabled = generating || configDirty || !hasIndexedSteps || index <= 0;
    if (elements.next) elements.next.disabled = generating || configDirty || !hasIndexedSteps || index >= max;
    if (elements.reset) elements.reset.disabled = generating || configDirty || !hasIndexedSteps || index <= 0;
    if (elements.pause) {
      elements.pause.disabled = generating || !running;
      elements.pause.textContent = "暂停";
    }
    if (notify && hasTimeline) {
      notifyPage(scenario).finally(syncPlaybackTimer);
    } else {
      syncPlaybackTimer();
    }
  };

  const stopPlaybackTimer = () => {
    if (!playbackTimer) return;
    window.clearTimeout(playbackTimer);
    playbackTimer = null;
  };

  const playbackDelayMs = (active) => (isIntradaySimulationFrequency(active?.frequency) ? 110 : 160);

  const advancePlayback = async () => {
    if (playbackInFlight) return;
    playbackInFlight = true;
    const active = loadSimulationScenario();
    const total = Number(active?.totalSteps || 0);
    if (!active || !total || active.playbackState !== "running") {
      stopPlaybackTimer();
      playbackInFlight = false;
      render({ notify: true });
      return;
    }
    if (!Array.isArray(active.steps) || active.steps.length < total) {
      active.playbackState = "paused";
      active.updatedAt = new Date().toISOString();
      saveSimulationScenario(active);
      stopPlaybackTimer();
      playbackInFlight = false;
      return;
    }
    const currentIndex = clampIndex(Number(active.currentIndex || 0), total);
    const nextIndex = clampIndex(currentIndex + Math.max(1, Number(active.stepInterval || 1)), total);
    active.currentIndex = nextIndex;
    active.currentStep = active.steps?.[nextIndex] || active.currentStep || null;
    if (nextIndex >= total - 1) active.playbackState = "paused";
    active.updatedAt = new Date().toISOString();
    saveSimulationScenario(active);
    await notificationQueue;
    await nextPaint();
    playbackInFlight = false;
    if (nextIndex >= total - 1) {
      stopPlaybackTimer();
      render({ notify: true });
      return;
    }
    syncPlaybackTimer();
  };

  const syncPlaybackTimer = () => {
    const active = loadSimulationScenario();
    const total = Number(active?.totalSteps || 0);
    const index = clampIndex(Number(active?.currentIndex || 0), total);
    const canRun = Boolean(
      active
        && total > 0
        && active.playbackState === "running"
        && Array.isArray(active.steps)
        && active.steps.length >= total
        && index < total - 1
    );
    if (!canRun) {
      stopPlaybackTimer();
      return;
    }
    if (playbackTimer || playbackInFlight) return;
    playbackTimer = window.setTimeout(() => {
      playbackTimer = null;
      advancePlayback().catch(() => {
        playbackInFlight = false;
        const current = loadSimulationScenario();
        if (current) {
          current.playbackState = "paused";
          current.updatedAt = new Date().toISOString();
          saveSimulationScenario(current);
        }
        stopPlaybackTimer();
      });
    }, playbackDelayMs(active));
  };

  const setIndex = (nextIndex, { notifyToast = true } = {}) => {
    const active = loadSimulationScenario();
    const total = Number(active?.totalSteps || 0);
    if (!active || !total) return;
    if (!Array.isArray(active.steps) || active.steps.length < total) {
      showScenarioToast("当前模拟场景缺少完整时间轴，请回到交易主控重新点击“生成时间线”。", { type: "warning" });
      return;
    }
    stopPlaybackTimer();
    playbackInFlight = false;
    const index = clampIndex(nextIndex, total);
    active.currentIndex = index;
    active.currentStep = active.steps?.[index] || active.currentStep || null;
    active.playbackState = "paused";
    active.updatedAt = new Date().toISOString();
    saveSimulationScenario(active);
    render({ notify: true });
    if (notifyToast) showScenarioToast(`已切换到 ${stepLabel(active.currentStep, index)}`);
  };

  const startPlayback = () => {
    const active = loadSimulationScenario();
    const total = Number(active?.totalSteps || 0);
    const index = clampIndex(Number(active?.currentIndex || 0), total);
    if (!active || !total || index >= total - 1) return;
    if (!Array.isArray(active.steps) || active.steps.length < total) {
      showScenarioToast("当前模拟场景缺少完整时间轴，请重新点击“生成时间线”。", { type: "warning" });
      return;
    }
    active.playbackState = "running";
    active.runMode = "auto";
    active.updatedAt = new Date().toISOString();
    saveSimulationScenario(active);
    render({ notify: true });
    showScenarioToast("全自动运行已开始");
  };

  const pausePlayback = () => {
    const active = loadSimulationScenario();
    if (!active) return;
    stopPlaybackTimer();
    playbackInFlight = false;
    active.playbackState = "paused";
    active.runMode = "manual";
    active.updatedAt = new Date().toISOString();
    saveSimulationScenario(active);
    render({ notify: true });
    showScenarioToast("模拟时间已暂停");
  };

  const resetPlayback = () => setIndex(0, { notifyToast: true });

  elements.frequency?.addEventListener("change", () => {
    renderStepIntervalOptions(elements.frequency.value, elements.stepInterval);
    coerceScenarioDateInputs({ notify: true });
    configDirty = true;
    render();
    showScenarioToast("模拟粒度已修改，点击“生成时间线”后生效。", { type: "info" });
  });
  elements.startDate?.addEventListener("change", () => markScenarioConfigDirty());
  elements.endDate?.addEventListener("change", () => markScenarioConfigDirty());
  elements.initialCash?.addEventListener("input", () => {
    normalizeCashInput(elements.initialCash, { keepRaw: true });
    markScenarioConfigDirty({ quiet: true });
  });
  elements.initialCash?.addEventListener("blur", () => normalizeCashInput(elements.initialCash));
  elements.stepInterval?.addEventListener("change", () => updateScenarioStepInterval());
  elements.generate?.addEventListener("click", () => generateScenarioTimeline());
  elements.run?.addEventListener("click", () => startPlayback());
  elements.reset?.addEventListener("click", () => resetPlayback());
  elements.progress?.addEventListener("input", () => setIndex(Number(elements.progress.value || 0)));
  elements.prev?.addEventListener("click", () => {
    const active = loadSimulationScenario();
    setIndex(Number(active?.currentIndex || 0) - Math.max(1, Number(active?.stepInterval || 1)));
  });
  elements.next?.addEventListener("click", () => {
    const active = loadSimulationScenario();
    setIndex(Number(active?.currentIndex || 0) + Math.max(1, Number(active?.stepInterval || 1)));
  });
  elements.pause?.addEventListener("click", () => pausePlayback());
  window.addEventListener("storage", (event) => {
    if (event.key === STORAGE_KEY) render({ notify: true });
  });
  window.addEventListener("simulation-scenario-change", () => render({ notify: true }));
  render({ notify: true });
  return { render };

  function markScenarioConfigDirty({ quiet = false } = {}) {
    configDirty = true;
    render();
    if (!quiet) showScenarioToast("模拟背景已修改，点击“生成时间线”后生效。", { type: "info" });
  }

  function updateScenarioStepInterval() {
    const active = loadSimulationScenario();
    const value = Math.max(1, Number(elements.stepInterval?.value || active?.stepInterval || 1));
    if (!active || !Number(active.totalSteps || 0)) return;
    active.stepInterval = value;
    active.updatedAt = new Date().toISOString();
    saveSimulationScenario(active);
    showScenarioToast(`步进间隔已同步为 ${stepIntervalText(value, active.frequency)}。`, { type: "success" });
  }

  async function generateScenarioTimeline() {
    if (generating) return;
    const request = generationRequest();
    if (!request.strategy) {
      showScenarioToast("缺少选股策略，无法生成时间线。", { type: "warning" });
      return;
    }
    generating = true;
    render();
    const hideLoading = showScenarioLoading("正在生成模拟时间线...");
    try {
      const backtest = await fetchScenarioTimeline(request);
      const nextScenario = buildSimulationScenarioFromBacktest({
        backtest,
        currentIndex: 0,
        mode: envMode,
        runMode: "manual",
        frequency: request.frequency,
        strategy: request.strategy,
        tradingPolicy: request.tradingPolicy,
        stepInterval: request.stepInterval,
        initialCash: request.initialCash,
        playbackState: "paused",
      });
      saveSimulationScenario(nextScenario);
      configDirty = false;
      showScenarioToast("模拟时间线已生成，所有页面已同步到起点。", { type: "success" });
    } catch (error) {
      showScenarioToast(error.message || String(error), { type: "error" });
    } finally {
      generating = false;
      hideLoading();
      render({ notify: true });
    }
  }

  function generationRequest() {
    const active = loadSimulationScenario();
    const provided = typeof getGenerationConfig === "function" ? getGenerationConfig() || {} : {};
    const query = new URLSearchParams(window.location.search);
    const frequency = normalizedFrequency(elements.frequency?.value || active?.frequency || query.get("frequency") || "1d");
    const start = normalizedScenarioDate(elements.startDate?.value || active?.requestedStart || query.get("start") || "2026-04-01", "start", frequency);
    const end = normalizedScenarioDate(elements.endDate?.value || active?.requestedEnd || query.get("end") || "2026-04-30", "end", frequency);
    return {
      strategy: provided.strategy || active?.strategy || query.get("strategy") || defaultStrategyName(),
      tradingPolicy: provided.tradingPolicy || active?.tradingPolicy || query.get("trading_policy") || query.get("policy") || "equal_weight_daily_rebalance",
      frequency,
      stepInterval: Math.max(1, Number(elements.stepInterval?.value || active?.stepInterval || 1)),
      start,
      end: start && end && end < start ? start : end,
      initialCash: currentCashInput(elements.initialCash, active),
    };
  }

  async function fetchScenarioTimeline(request) {
    const params = new URLSearchParams({
      strategy: request.strategy,
      start: request.start,
      end: request.end,
      initial_cash: String(request.initialCash),
      frequency: request.frequency,
    });
    if (request.tradingPolicy) params.set("trading_policy", request.tradingPolicy);
    const endpoint = isIntradaySimulationFrequency(request.frequency) ? "/api/intraday/strategy-simulation" : "/api/backtest/run";
    const response = await fetch(`${endpoint}?${params.toString()}`);
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.error || `request failed: ${response.status}`);
    return payload;
  }

  function renderScenarioFields(active) {
    if (!elements.frequency && !elements.startDate && !elements.initialCash) return;
    const query = new URLSearchParams(window.location.search);
    const frequency = normalizedFrequency(configDirty ? elements.frequency?.value : active?.frequency || query.get("frequency") || elements.frequency?.value || "1d");
    renderStepIntervalOptions(frequency, elements.stepInterval);
    if (elements.frequency && document.activeElement !== elements.frequency) elements.frequency.value = frequency;
    syncDateBounds(frequency);
    if (elements.stepInterval && document.activeElement !== elements.stepInterval) {
      elements.stepInterval.value = String(Math.max(1, Number(configDirty ? elements.stepInterval.value : active?.stepInterval || elements.stepInterval.value || 1)));
    }
    if (!configDirty) {
      if (elements.startDate && document.activeElement !== elements.startDate) elements.startDate.value = active?.requestedStart || query.get("start") || "2026-04-01";
      if (elements.endDate && document.activeElement !== elements.endDate) elements.endDate.value = active?.requestedEnd || query.get("end") || "2026-04-30";
      if (elements.initialCash && document.activeElement !== elements.initialCash) {
        elements.initialCash.value = formatCashInput(Number(active?.initialCash || query.get("initial_cash") || 100000));
      }
    }
    refreshDatePickers();
  }

  function setupDatePickers() {
    if (datePickers.length) return;
    datePickers = [
      enhanceSimulationDateInput(elements.startDate, {
        label: "开始日期",
        getCalendar: () => calendarAvailability,
        getFrequency: () => elements.frequency?.value || "1d",
      }),
      enhanceSimulationDateInput(elements.endDate, {
        label: "结束日期",
        getCalendar: () => calendarAvailability,
        getFrequency: () => elements.frequency?.value || "1d",
      }),
    ].filter(Boolean);
  }

  function refreshDatePickers() {
    datePickers.forEach((picker) => picker?.refresh?.());
  }

  function syncDateBounds(frequency) {
    [elements.startDate, elements.endDate].forEach((input) => {
      syncInputBounds(input, {
        calendar: calendarAvailability,
        frequency,
      });
    });
  }

  function coerceScenarioDateInputs({ notify = false } = {}) {
    if (!calendarAvailability || !elements.startDate || !elements.endDate) return;
    const frequency = normalizedFrequency(elements.frequency?.value || "1d");
    const beforeStart = elements.startDate.value;
    const beforeEnd = elements.endDate.value;
    let start = normalizedScenarioDate(beforeStart, "start", frequency);
    let end = normalizedScenarioDate(beforeEnd, "end", frequency);
    if (start && end && end < start) end = start;
    if (start) elements.startDate.value = start;
    if (end) elements.endDate.value = end;
    syncDateBounds(frequency);
    refreshDatePickers();
    if (notify && (beforeStart !== elements.startDate.value || beforeEnd !== elements.endDate.value)) {
      showScenarioToast(`已按${frequencyLabel(frequency)}数据可用日期调整为 ${elements.startDate.value} 至 ${elements.endDate.value}。`, { type: "info" });
    }
  }

  function normalizedScenarioDate(value, kind, frequency) {
    if (!calendarAvailability) return String(value || "").slice(0, 10);
    const dates = datesForFrequency(calendarAvailability, frequency);
    if (!dates.length) return "";
    const raw = String(value || "").slice(0, 10);
    if (raw && dates.includes(raw)) return raw;
    return nearestAvailableDate(calendarAvailability, frequency, raw || (kind === "end" ? dates[dates.length - 1] : dates[0]), kind === "end" ? "backward" : "forward");
  }
}

function nextPaint() {
  return new Promise((resolve) => {
    window.requestAnimationFrame(() => window.requestAnimationFrame(resolve));
  });
}

function normalizedFrequency(value) {
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
  return ["5m", "15m", "30m", "60m", "120m"].includes(normalizedFrequency(value));
}

function renderStepIntervalOptions(frequency, select) {
  if (!select) return;
  const normalized = normalizedFrequency(frequency);
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
  const options = optionsByFrequency[normalized] || optionsByFrequency["1d"];
  const previous = Number(select.value || 1);
  select.innerHTML = options
    .map(([value, label]) => `<option value="${value}">${label}</option>`)
    .join("");
  const values = options.map(([value]) => Number(value));
  select.value = String(values.includes(previous) ? previous : values[0]);
}

function stepIntervalText(value, frequency) {
  const normalized = normalizedFrequency(frequency);
  const labelsByFrequency = {
    "5m": { 1: "1根5分钟", 3: "15分钟", 6: "30分钟", 12: "1小时", 24: "2小时", 48: "约1日", 240: "约1周" },
    "15m": { 1: "1根15分钟", 2: "30分钟", 4: "1小时", 8: "2小时", 16: "约1日", 80: "约1周" },
    "30m": { 1: "1根30分钟", 2: "1小时", 4: "2小时", 8: "约1日", 40: "约1周" },
    "60m": { 1: "1根1小时", 2: "2小时", 4: "约1日", 20: "约1周" },
    "120m": { 1: "1根2小时", 2: "约1日", 10: "约1周" },
    "1d": { 1: "1个交易日", 2: "2个交易日", 3: "3个交易日", 4: "4个交易日", 5: "5个交易日", 10: "2周", 20: "约1月", 60: "约1季", 120: "约半年" },
    "1w": { 1: "1周", 2: "2周", 4: "约1月", 13: "约1季", 26: "约半年" },
    "1mo": { 1: "1月", 2: "2月", 3: "1季", 6: "半年", 12: "1年" },
  };
  const labels = labelsByFrequency[normalized] || labelsByFrequency["1d"];
  return labels[Number(value)] || `${formatNumber(Number(value || 1))}步`;
}

function currentCashInput(input, scenario) {
  const raw = String(input?.value || "").replace(/,/g, "").trim();
  const parsed = Number(raw);
  if (Number.isFinite(parsed) && parsed > 0) return parsed;
  return Number(scenario?.initialCash || 100000);
}

function normalizeCashInput(input, { keepRaw = false } = {}) {
  if (!input) return;
  const raw = String(input.value || "").replace(/,/g, "").replace(/[^\d.]/g, "");
  if (keepRaw) {
    input.value = raw;
    return;
  }
  input.value = formatCashInput(Number(raw || 100000));
}

function formatCashInput(value) {
  const number = Math.max(0, Math.round(Number(value || 0)));
  return number.toLocaleString("en-US");
}

function defaultStrategyName() {
  return window.INTERNAL_QUANT_DAILY_TRADING_DATA?.project?.default_strategy_profile
    || window.INTERNAL_QUANT_DAILY_TRADING_DATA?.strategies?.[0]?.profile_name
    || "daily_rank_main";
}

function normalizeLoadedScenario(scenario) {
  const total = Number(scenario?.totalSteps || 0);
  if (!total || scenario.playbackState !== "running") return scenario;
  const index = clampIndex(Number(scenario.currentIndex || 0), total);
  if (index < total - 1) return scenario;
  return {
    ...scenario,
    playbackState: "paused",
    updatedAt: new Date().toISOString(),
  };
}

function timelineStepsForStorage(timeline) {
  if (!Array.isArray(timeline) || !timeline.length) return [];
  if (timeline.length <= MAX_STORED_STEPS) return timeline.map(compactStep);
  if (timeline.length <= MAX_STORED_CLOCK_STEPS) return timeline.map(compactClockStep);
  return [];
}

function compactClockStep(step, fallbackIndex = 0) {
  if (!step || typeof step !== "object") return null;
  return {
    index: Number(step.step_index ?? fallbackIndex),
    asOf: String(step.as_of || step.trade_date || ""),
    tradeDate: String(step.trade_date || String(step.as_of || "").slice(0, 10) || ""),
    label: displayStepTime(step),
  };
}

function compactStep(step, fallbackIndex = 0) {
  if (!step || typeof step !== "object") return null;
  return {
    index: Number(step.step_index ?? fallbackIndex),
    asOf: String(step.as_of || step.trade_date || ""),
    tradeDate: String(step.trade_date || String(step.as_of || "").slice(0, 10) || ""),
    label: displayStepTime(step),
    equity: Number(step.equity || 0),
    returnPct: Number(step.return_pct || 0),
    positionCount: Number(step.position_count || 0),
    orderCount: Array.isArray(step.orders) ? step.orders.length : Number(step.order_count || 0),
    orders: Array.isArray(step.orders) ? step.orders.slice(0, 20).map(compactOrder) : [],
    selectedSymbols: Array.isArray(step.selected_symbols) ? step.selected_symbols.slice(0, 20) : [],
  };
}

function mergeScenarioStep(baseStep, detailStep, scenario) {
  const merged = {
    ...(baseStep || {}),
    ...(detailStep || {}),
  };
  if (!Object.keys(merged).length) return null;
  const fallbackSymbols = Array.isArray(scenario?.selectedSymbols) ? scenario.selectedSymbols : [];
  if (!Array.isArray(merged.selectedSymbols) || !merged.selectedSymbols.length) {
    merged.selectedSymbols = fallbackSymbols.slice(0, 20);
  }
  if (!Array.isArray(merged.orders)) merged.orders = [];
  return merged;
}

function stepMatchesIndex(step, index) {
  if (!step || typeof step !== "object") return false;
  const value = Number(step.index);
  return value === Number(index) || value === Number(index) + 1;
}

function compactOrder(order) {
  const price = Number(order?.fill_price ?? order?.price ?? order?.reference_price ?? 0);
  const quantity = Number(order?.requested_quantity ?? order?.quantity ?? order?.filled_quantity ?? 0);
  return {
    symbol: String(order?.symbol || ""),
    name: String(order?.name || ""),
    side: String(order?.side || "buy"),
    price,
    quantity,
    status: String(order?.status || ""),
    reason: String(order?.reject_reason || order?.reason || ""),
  };
}

function clampIndex(index, total) {
  if (!total) return 0;
  return Math.max(0, Math.min(total - 1, Number(index || 0)));
}

function stepLabel(step, index = 0) {
  return step?.label || step?.asOf || step?.tradeDate || `第 ${formatNumber(index + 1)} 步`;
}

function displayStepTime(step) {
  const value = String(step?.as_of || step?.trade_date || "");
  if (!value) return "";
  if (!value.includes("T")) return value;
  const parsed = new Date(value);
  if (!Number.isNaN(parsed.getTime())) {
    const local = new Date(parsed.getTime() + 8 * 60 * 60 * 1000);
    const pad = (number) => String(number).padStart(2, "0");
    return `${local.getUTCFullYear()}-${pad(local.getUTCMonth() + 1)}-${pad(local.getUTCDate())} ${pad(local.getUTCHours())}:${pad(local.getUTCMinutes())}`;
  }
  return value.replace("T", " ").replace(/Z$/, "");
}

function runModeLabel(value) {
  return value === "manual" ? "手动步进" : "全自动";
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
  return labels[normalizedFrequency(value)] || "日线";
}

function strategyLabel(value) {
  const labels = {
    daily_rank_main: "日线强势股 Top 2",
    stable_momentum_blend: "稳健动量波动组合 Top 5",
    defensive_low_vol_momentum: "低波动动量防守 Top 5",
    trend_breakout_liquid: "流动性趋势突破 Top 5",
  };
  if (labels[value]) return labels[value];
  return String(value || "当前策略").replace(/[_:-]+/g, " ");
}
