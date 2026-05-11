const tradingData = window.INTERNAL_QUANT_TRADING_CONSOLE_DATA || {
  strategies: [],
  decisions: {},
  daily_data: {},
  intraday_data: { progress: { counts: {} } },
  data_readiness: {},
  market_replay: { symbols: {} },
};

const state = {
  profileName: tradingData.project?.default_strategy_profile || tradingData.strategies?.[0]?.profile_name,
  symbol: tradingData.market_replay?.default_symbol,
  replayIndex: null,
  replayTimer: null,
  simulation: null,
  simulationKey: null,
};

const strategySelect = document.getElementById("strategy-select");
const symbolInput = document.getElementById("symbol-input");

renderShell();
bindEvents();
refreshIntradayStatus();
refreshDataReadiness();
refreshReplaySimulation();
if (window.location.protocol.startsWith("http")) {
  window.setInterval(refreshIntradayStatus, 30000);
  window.setInterval(refreshDataReadiness, 60000);
}

function bindEvents() {
  strategySelect.addEventListener("change", () => {
    state.profileName = strategySelect.value;
    const selected = currentDecision().selected_symbols || [];
    const nextSymbol = selected[0] || state.symbol;
    state.profileName = strategySelect.value;
    requestAndRenderSymbol(nextSymbol);
    refreshDataReadiness();
    refreshReplaySimulation();
  });
  document.getElementById("symbol-search").addEventListener("click", () => {
    requestAndRenderSymbol(normalizeSymbol(symbolInput.value));
  });
  symbolInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      requestAndRenderSymbol(normalizeSymbol(symbolInput.value));
    }
  });
  document.getElementById("replay-reset").addEventListener("click", () => {
    stopReplay();
    state.replayIndex = 0;
    renderMarket();
  });
  document.getElementById("replay-prev").addEventListener("click", () => {
    stopReplay();
    const bars = currentBars();
    state.replayIndex = Math.max(0, replayIndex(bars) - 1);
    renderMarket();
  });
  document.getElementById("replay-next").addEventListener("click", () => {
    stopReplay();
    const bars = currentBars();
    state.replayIndex = Math.min(Math.max(bars.length - 1, 0), replayIndex(bars) + 1);
    renderMarket();
  });
  document.getElementById("replay-play").addEventListener("click", () => {
    if (state.replayTimer) {
      stopReplay();
      renderMarket();
      return;
    }
    startReplay();
  });
  document.getElementById("replay-range").addEventListener("input", (event) => {
    stopReplay();
    state.replayIndex = Number(event.target.value || 0);
    renderMarket();
  });
}

function renderShell() {
  renderStatusStrip();
  renderStrategyMenu();
  renderDecision();
  renderMarket();
  renderSimulation();
}

function renderStatusStrip() {
  const progress = tradingData.intraday_data?.progress || {};
  const counts = progress.counts || {};
  const items = [
    ["日线日期", tradingData.daily_data?.latest_trade_date || "n/a"],
    ["股票池", formatNumber(tradingData.daily_data?.symbol_count || 0)],
    ["5m成功", formatNumber(counts.success || 0)],
    ["5m进度", `${progress.success_pct_of_5200 || 0}%`],
    ["数据状态", formatReadinessStatus(tradingData.data_readiness?.status)],
  ];
  document.getElementById("status-strip").innerHTML = items
    .map(([label, value]) => `<div class="status-item"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`)
    .join("");
}

async function refreshIntradayStatus() {
  if (!window.location.protocol.startsWith("http")) {
    return;
  }
  try {
    const response = await fetch("/api/intraday/status");
    if (!response.ok) return;
    const status = await response.json();
    tradingData.intraday_data.progress = {
      counts: status.counts || {},
      rows_success: status.rows_success || 0,
      success_pct_of_5200: status.success_pct_of_5200 || 0,
      symbols_recorded: status.symbols_recorded || 0,
    };
    renderStatusStrip();
  } catch (_error) {
    return;
  }
}

async function refreshDataReadiness() {
  if (!window.location.protocol.startsWith("http")) {
    return;
  }
  try {
    const selected = currentDecision().selected_symbols || [];
    const query = selected.length ? `?symbols=${encodeURIComponent(selected.join(","))}` : "";
    const response = await fetch(`/api/data/readiness${query}`);
    if (!response.ok) return;
    tradingData.data_readiness = await response.json();
    renderStatusStrip();
    renderSimulation();
  } catch (_error) {
    return;
  }
}

function renderStrategyMenu() {
  strategySelect.innerHTML = (tradingData.strategies || [])
    .map((item) => `<option value="${escapeHtml(item.profile_name)}">${escapeHtml(item.profile_name)}</option>`)
    .join("");
  strategySelect.value = state.profileName || "";
  document.getElementById("strategy-list").innerHTML = (tradingData.strategies || [])
    .map((item) => {
      const active = item.profile_name === state.profileName ? " is-active" : "";
      return `
        <button class="strategy-button${active}" type="button" data-profile="${escapeHtml(item.profile_name)}">
          <strong>${escapeHtml(item.profile_name)}</strong>
          <span>${escapeHtml(item.selector)} / Top ${escapeHtml(String(item.top_n))} / Lookback ${escapeHtml(String(item.lookback_bars))}</span>
        </button>`;
    })
    .join("");
  document.querySelectorAll(".strategy-button").forEach((button) => {
    button.addEventListener("click", () => {
      state.profileName = button.dataset.profile;
      renderShell();
      refreshDataReadiness();
      refreshReplaySimulation();
    });
  });
  const strategy = currentStrategy();
  document.getElementById("strategy-meta").textContent = strategy
    ? `${strategy.strategy_id} / 初始资金 ${formatMoney(strategy.initial_cash)}`
    : "未配置";
}

function renderDecision() {
  const decision = currentDecision();
  const candidates = decision.ranked_candidates || [];
  const selected = decision.selected_symbols || [];
  document.getElementById("decision-meta").textContent = `${decision.trade_date || "n/a"} / ${decision.selector || "n/a"}`;
  document.getElementById("decision-metrics").innerHTML = [
    ["候选股票", formatNumber(decision.eligible_symbol_count || 0)],
    ["入选", formatNumber(selected.length)],
    ["排名展示", formatNumber(candidates.length)],
    ["目标仓位", formatNumber((decision.target_positions || []).length)],
  ]
    .map(([label, value]) => `<div class="metric"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`)
    .join("");
  document.getElementById("selected-symbols").innerHTML = selected.length
    ? selected
        .map((symbol) => {
          const candidate = candidates.find((item) => item.symbol === symbol) || {};
          const active = symbol === state.symbol ? " is-active" : "";
          return `
            <button type="button" class="symbol-button${active}" data-symbol="${escapeHtml(symbol)}">
              <strong>${escapeHtml(symbol)}</strong>
              <span>score ${formatPct(candidate.score_pct)} / close ${formatPrice(candidate.close)}</span>
            </button>`;
        })
        .join("")
    : `<p class="muted">当前策略没有入选股票。</p>`;
  document.querySelectorAll(".symbol-button").forEach((button) => {
    button.addEventListener("click", () => {
      requestAndRenderSymbol(button.dataset.symbol);
    });
  });
  document.getElementById("target-positions").innerHTML = (decision.target_positions || [])
    .map(
      (item) => `
        <article class="order-card">
          <strong>${escapeHtml(item.symbol)} ${escapeHtml(item.side || "hold").toUpperCase()}</strong>
          <span>${formatNumber(item.target_quantity)} 股 / ${formatMoney(item.target_notional)} / 参考 ${formatPrice(item.reference_price)}</span>
        </article>`
    )
    .join("");
  document.getElementById("candidate-table").innerHTML = `
    <table class="candidate-table">
      <thead>
        <tr>
          <th>#</th>
          <th>代码</th>
          <th>得分</th>
          <th>收盘</th>
          <th>成交量</th>
          <th>成交额</th>
        </tr>
      </thead>
      <tbody>
        ${candidates
          .map(
            (item, index) => `
              <tr>
                <td>${index + 1}</td>
                <td>${escapeHtml(item.symbol)}</td>
                <td class="${item.score >= 0 ? "up" : "down"}">${formatPct(item.score_pct)}</td>
                <td>${formatPrice(item.close)}</td>
                <td>${formatNumber(item.volume)}</td>
                <td>${formatMoney(item.amount)}</td>
              </tr>`
          )
          .join("")}
      </tbody>
    </table>`;
}

function renderMarket() {
  const symbols = tradingData.market_replay?.symbols || {};
  if (!state.symbol || !symbols[state.symbol]) {
    const fallback = Object.keys(symbols)[0];
    if (!state.symbol && fallback) state.symbol = fallback;
  }
  symbolInput.value = state.symbol || "";
  const payload = symbols[state.symbol];
  if (!payload) {
    document.getElementById("market-meta").textContent = "该代码尚未进入静态预览数据";
    document.getElementById("quote-board").innerHTML = `<div class="quote-cell"><span>状态</span><strong>未预载</strong></div>`;
    document.getElementById("price-chart").innerHTML = "";
    document.getElementById("bar-tape").innerHTML = `<p class="muted">未预载。如果页面由 trading cockpit 服务启动，会自动从本地 5m 分区 API 按需读取。</p>`;
    updateReplayControls([]);
    renderSimulation();
    return;
  }
  const bars = payload.bars || [];
  const currentIndex = replayIndex(bars);
  const visibleBars = bars.slice(0, currentIndex + 1);
  const first = visibleBars[0] || {};
  const last = visibleBars[visibleBars.length - 1] || {};
  const change = Number(last.close || 0) - Number(first.open || last.close || 0);
  const changePct = first.open ? (change / Number(first.open)) * 100 : 0;
  document.getElementById("market-meta").textContent = `${payload.symbol} / step ${currentIndex + 1}/${bars.length} / ${last.time_utc || payload.last_bar_time_utc || "n/a"}`;
  document.getElementById("quote-board").innerHTML = [
    ["最新", formatPrice(last.close)],
    ["区间涨跌", formatSignedPct(changePct)],
    ["最高", formatPrice(maxOf(bars, "high"))],
    ["最低", formatPrice(minOf(bars, "low"))],
  ]
    .map(([label, value]) => `<div class="quote-cell"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`)
    .join("");
  renderChart(visibleBars);
  updateReplayControls(bars);
  document.getElementById("bar-tape").innerHTML = visibleBars
    .slice(-36)
    .reverse()
    .map(
      (bar) => `
        <div class="bar-row">
          <strong>${escapeHtml(formatTime(bar.time))}</strong>
          <span>开 ${formatPrice(bar.open)}</span>
          <span>高 ${formatPrice(bar.high)}</span>
          <span>低 ${formatPrice(bar.low)}</span>
          <span>收 ${formatPrice(bar.close)}</span>
        </div>`
    )
    .join("");
  renderSimulation();
}

function renderSimulation() {
  const panel = document.getElementById("simulation-panel");
  const simulation = state.simulation;
  if (!simulation) {
    panel.innerHTML = `
      <div class="simulation-card">
        <h3>模拟账户</h3>
        <p class="muted">等待本地回放 API</p>
      </div>
      <div class="simulation-card">
        <h3>成交</h3>
        <p class="muted">暂无</p>
      </div>`;
    return;
  }
  const steps = simulation.steps || [];
  const step = currentSimulationStep(steps);
  const warnings = simulation.warnings || [];
  const fills = simulation.fills || [];
  const statusLine = warnings.length
    ? warnings.map(formatReplayWarning).join(" / ")
    : `${simulation.replay_symbols?.join(", ") || simulation.symbols?.join(", ")}`;
  panel.innerHTML = `
    <div class="simulation-card">
      <h3>模拟账户</h3>
      <div class="simulation-metrics">
        ${[
          ["权益", formatMoney(step?.equity ?? simulation.final_equity)],
          ["收益", formatSignedPct(step?.return_pct ?? simulation.total_return_pct)],
          ["现金", formatMoney(step?.cash ?? simulation.cash)],
          ["持仓", formatNumber(step?.position_count ?? simulation.position_count)],
        ]
          .map(([label, value]) => `<div class="metric"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`)
          .join("")}
      </div>
      <p class="muted">${escapeHtml(statusLine)}</p>
    </div>
    <div class="simulation-card">
      <h3>成交</h3>
      ${
        fills.length
          ? fills
              .slice(0, 8)
              .map(
                (fill) => `
                  <div class="fill-row">
                    <strong>${escapeHtml(formatClock(fill.as_of))}</strong>
                    <span>${escapeHtml(fill.symbol)}</span>
                    <span>${escapeHtml(String(fill.quantity))} 股</span>
                    <span>${formatPrice(fill.price)}</span>
                  </div>`
              )
              .join("")
          : `<p class="muted">暂无成交</p>`
      }
    </div>`;
}

async function refreshReplaySimulation() {
  if (!window.location.protocol.startsWith("http")) {
    return;
  }
  const decision = currentDecision();
  const strategy = currentStrategy();
  const selected = decision.selected_symbols || [];
  const fallback = state.symbol ? [state.symbol] : Object.keys(tradingData.market_replay?.symbols || {}).slice(0, 2);
  const symbols = selected.length ? selected : fallback;
  if (!symbols.length) return;
  const date = decision.trade_date || "";
  const initialCash = strategy?.initial_cash || 100000;
  const strategyId = strategy?.strategy_id || state.profileName || "historical_replay";
  const key = `${strategyId}|${date}|${symbols.join(",")}|${initialCash}`;
  if (key === state.simulationKey) return;
  state.simulationKey = key;
  try {
    const params = new URLSearchParams({
      symbols: symbols.join(","),
      date,
      initial_cash: String(initialCash),
      strategy_id: strategyId,
      limit: "240",
    });
    const response = await fetch(`/api/replay/simulation?${params.toString()}`);
    if (!response.ok) return;
    state.simulation = await response.json();
    renderSimulation();
  } catch (_error) {
    return;
  }
}

async function requestAndRenderSymbol(symbol) {
  stopReplay();
  const normalized = normalizeSymbol(symbol);
  state.symbol = normalized;
  state.replayIndex = null;
  if (!tradingData.market_replay.symbols[normalized]) {
    await loadSymbolFromApi(normalized);
  }
  renderShell();
  refreshReplaySimulation();
}

async function loadSymbolFromApi(symbol) {
  if (!window.location.protocol.startsWith("http")) {
    return;
  }
  document.getElementById("market-meta").textContent = `${symbol} / 本地 API 读取中`;
  try {
    const response = await fetch(`/api/intraday/bars?symbol=${encodeURIComponent(symbol)}&limit=240`);
    if (!response.ok) return;
    const payload = await response.json();
    if (!payload.bars || !payload.bars.length) return;
    tradingData.market_replay.symbols[symbol] = {
      symbol,
      row_count: payload.count,
      first_bar_time_utc: payload.bars[0].bar_time,
      last_bar_time_utc: payload.bars[payload.bars.length - 1].bar_time,
      bars: payload.bars.map((bar) => ({
        date: bar.local_time ? bar.local_time.slice(0, 10) : "",
        time: bar.local_time ? bar.local_time.replace(/\D/g, "").slice(0, 14) : "",
        time_utc: bar.bar_time,
        open: bar.open,
        high: bar.high,
        low: bar.low,
        close: bar.close,
        volume: bar.volume,
        amount: bar.amount,
      })),
    };
  } catch (_error) {
    return;
  }
}

function startReplay() {
  const bars = currentBars();
  if (!bars.length) return;
  if (replayIndex(bars) >= bars.length - 1) {
    state.replayIndex = 0;
  }
  state.replayTimer = window.setInterval(() => {
    const nextIndex = replayIndex(bars) + 1;
    if (nextIndex >= bars.length) {
      stopReplay();
      renderMarket();
      return;
    }
    state.replayIndex = nextIndex;
    renderMarket();
  }, 450);
  renderMarket();
}

function stopReplay() {
  if (state.replayTimer) {
    window.clearInterval(state.replayTimer);
    state.replayTimer = null;
  }
}

function currentBars() {
  return tradingData.market_replay?.symbols?.[state.symbol]?.bars || [];
}

function replayIndex(bars) {
  if (!bars.length) return 0;
  if (state.replayIndex === null || state.replayIndex === undefined) {
    return bars.length - 1;
  }
  return Math.max(0, Math.min(Number(state.replayIndex), bars.length - 1));
}

function currentSimulationStep(steps) {
  if (!steps.length) return null;
  const bars = currentBars();
  const index = bars.length ? replayIndex(bars) : steps.length - 1;
  return steps[Math.max(0, Math.min(index, steps.length - 1))];
}

function updateReplayControls(bars) {
  const index = replayIndex(bars);
  const range = document.getElementById("replay-range");
  range.max = String(Math.max(bars.length - 1, 0));
  range.value = String(index);
  document.getElementById("replay-label").textContent = bars.length ? `${index + 1} / ${bars.length}` : "0 / 0";
  document.getElementById("replay-play").textContent = state.replayTimer ? "暂停" : "播放";
}

function renderChart(bars) {
  const svg = document.getElementById("price-chart");
  if (!bars.length) {
    svg.innerHTML = "";
    return;
  }
  const width = 720;
  const height = 280;
  const pad = 28;
  const closes = bars.map((bar) => Number(bar.close));
  const min = Math.min(...closes);
  const max = Math.max(...closes);
  const span = max - min || 1;
  const points = closes.map((value, index) => {
    const x = pad + (index / Math.max(closes.length - 1, 1)) * (width - pad * 2);
    const y = height - pad - ((value - min) / span) * (height - pad * 2);
    return [x, y];
  });
  const line = points.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(" ");
  const area = `${pad},${height - pad} ${line} ${width - pad},${height - pad}`;
  svg.innerHTML = `
    <polyline class="chart-area" points="${area}"></polyline>
    <polyline class="chart-line" points="${line}"></polyline>
    <line class="chart-axis" x1="${pad}" y1="${height - pad}" x2="${width - pad}" y2="${height - pad}"></line>
    <line class="chart-axis" x1="${pad}" y1="${pad}" x2="${pad}" y2="${height - pad}"></line>
  `;
}

function currentStrategy() {
  return (tradingData.strategies || []).find((item) => item.profile_name === state.profileName);
}

function currentDecision() {
  return tradingData.decisions?.[state.profileName] || {};
}

function normalizeSymbol(value) {
  const raw = String(value || "").trim().toUpperCase();
  if (!raw) return state.symbol;
  if (raw.includes(".")) return raw;
  if (raw.startsWith("6")) return `${raw.padStart(6, "0")}.SH`;
  return `${raw.padStart(6, "0")}.SZ`;
}

function maxOf(rows, key) {
  return Math.max(...rows.map((row) => Number(row[key] || 0)));
}

function minOf(rows, key) {
  return Math.min(...rows.map((row) => Number(row[key] || 0)));
}

function formatTime(value) {
  const digits = String(value || "").replace(/\D/g, "");
  if (digits.length < 12) return value || "";
  return `${digits.slice(8, 10)}:${digits.slice(10, 12)}`;
}

function formatClock(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value || "";
  return date.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Shanghai" });
}

function formatReplayWarning(value) {
  const text = String(value || "");
  if (text.startsWith("symbols_not_downloaded:")) {
    return `选股5m待下载 ${text.split(":", 2)[1]}`;
  }
  if (text === "fallback_symbols_used_until_requested_intraday_partitions_exist") {
    return "临时样本回放";
  }
  if (text.startsWith("missing_symbols_at_first_rebalance:")) {
    return `首个step缺失 ${text.split(":", 2)[1]}`;
  }
  if (text === "no_requested_symbols_available_for_replay") {
    return "请求股票暂无5m分区";
  }
  return text;
}

function formatNumber(value) {
  return Number(value || 0).toLocaleString("zh-CN");
}

function formatMoney(value) {
  const number = Number(value || 0);
  if (Math.abs(number) >= 100000000) return `${(number / 100000000).toFixed(2)}亿`;
  if (Math.abs(number) >= 10000) return `${(number / 10000).toFixed(2)}万`;
  return number.toFixed(2);
}

function formatPrice(value) {
  return Number(value || 0).toFixed(2);
}

function formatPct(value) {
  return `${Number(value || 0).toFixed(2)}%`;
}

function formatSignedPct(value) {
  const number = Number(value || 0);
  return `${number >= 0 ? "+" : ""}${number.toFixed(2)}%`;
}

function formatReadinessStatus(value) {
  const status = String(value || "checking");
  const labels = {
    full_intraday_ready: "5m完整",
    selected_intraday_ready: "选股可回放",
    partial_intraday_ready: "部分可用",
    daily_ready: "日线可用",
    blocked: "受阻",
    checking: "检查中",
  };
  return labels[status] || status;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
