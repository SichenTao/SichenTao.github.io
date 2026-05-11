import { escapeHtml, formatMoney, formatNumber, formatPrice, formatReadinessStatus, formatSignedPct } from "./shared/format.js";
import {
  candidateRows as staticCandidateRows,
  decisionByProfile,
  defaultStrategyProfile,
  ensureStockLoaded,
  marketData,
  normalizeSymbol,
  selectedSymbols,
  statusItems,
  stockBySymbol,
  symbolName,
} from "./shared/marketData.js";
import { SymbolSearch } from "./shared/symbolSearch.js";
import { setupGlobalNavigation } from "./shared/navigation.js";
import { currentSimulationStep, loadSimulationScenario, setupSimulationScenarioBar, showScenarioLoading } from "./shared/simulationScenario.js";
import { loadStrategies } from "./shared/simulationApi.js";

const state = {
  profileName: new URLSearchParams(window.location.search).get("strategy") || defaultStrategyProfile(),
  symbol: new URLSearchParams(window.location.search).get("symbol") || marketData.default_symbol || "",
  mode: new URLSearchParams(window.location.search).get("mode") || "paper",
  showMode: "candidates",
  manualSymbols: [],
  strategies: [],
  remoteDecision: null,
  selectionRequestId: 0,
};

const els = {
  strategySelect: document.getElementById("strategy-select"),
  symbolInput: document.getElementById("symbol-input"),
  suggestions: document.getElementById("symbol-suggestions"),
  statusStrip: document.getElementById("status-strip"),
  decisionMeta: document.getElementById("decision-meta"),
  selectedCount: document.getElementById("selected-count"),
  candidateTable: document.getElementById("candidate-table"),
  accountLink: document.getElementById("account-link"),
  terminalLink: document.getElementById("terminal-link"),
  dataSource: document.getElementById("data-source"),
  dataCoverage: document.getElementById("data-coverage"),
  selectionUpdate: document.getElementById("selection-update"),
};

new SymbolSearch({
  input: els.symbolInput,
  suggestions: els.suggestions,
  onSelect: async (symbol) => {
    state.symbol = symbol;
    await ensureStockLoaded(symbol);
    render();
  },
});

setupSimulationScenarioBar({
  mode: state.mode,
  getGenerationConfig: () => ({
    strategy: state.profileName,
  }),
  onIndexChange: async () => {
    await refreshSelectionForScenario();
    render();
  },
});

bindEvents();
const hideLoading = showScenarioLoading("正在初始化选股页面...");
try {
  await loadStrategyOptions();
  await refreshSelectionForScenario();
  render();
} finally {
  hideLoading();
}

function bindEvents() {
  els.strategySelect.addEventListener("change", async () => {
    state.profileName = els.strategySelect.value;
    state.remoteDecision = null;
    await refreshSelectionForScenario();
    state.symbol = currentSelectedSymbols()[0] || state.symbol;
    render();
  });
  document.getElementById("open-symbol").addEventListener("click", () => openTerminal(normalizeSymbol(els.symbolInput.value, state.symbol)));
  document.getElementById("open-active").addEventListener("click", () => openTerminal(state.symbol));
  document.getElementById("add-manual").addEventListener("click", async () => {
    const symbol = normalizeSymbol(els.symbolInput.value, state.symbol);
    await ensureStockLoaded(symbol);
    if (symbol && !state.manualSymbols.includes(symbol)) state.manualSymbols.push(symbol);
    state.symbol = symbol;
    state.showMode = "selected";
    render();
  });
  document.getElementById("show-selected").addEventListener("click", () => {
    state.showMode = "selected";
    render();
  });
  document.getElementById("show-candidates").addEventListener("click", () => {
    state.showMode = "candidates";
    render();
  });
}

function render() {
  renderStatus();
  renderDataCoverage();
  renderStrategyMenu();
  renderCandidates();
  updateLinks();
}

function renderStatus() {
  const items = state.remoteDecision
    ? dynamicStatusItems(state.remoteDecision)
    : statusItems(state.profileName);
  els.statusStrip.innerHTML = items
    .map(([label, value]) => `<div class="status-item"><span>${escapeHtml(label)}</span><strong>${escapeHtml(typeof value === "number" ? formatNumber(value) : value)}</strong></div>`)
    .join("");
}

function renderDataCoverage() {
  const readiness = marketData.data_readiness || {};
  const daily = readiness.daily || marketData.daily_data || {};
  const intraday = readiness.intraday || {};
  els.dataSource.textContent = `数据来源：${sourceLabel(daily.source_name)} · ${sourceFeedLabel(daily.source_feed)}`;
  els.dataCoverage.textContent = `数据覆盖：日线 ${daily.first_trade_date || "-"} 至 ${daily.last_trade_date || marketData.daily_data?.latest_trade_date || "-"}，${formatNumber(daily.symbol_count || 0)} 只；5分钟 ${formatNumber(intraday.available_partition_count || 0)}/${formatNumber(intraday.expected_symbol_count || 0)} 只，${formatNumber(intraday.rows_success || 0)} 行`;
  els.selectionUpdate.textContent = `最后更新：${displayGeneratedAt(marketData.generated_at)}`;
}

function renderStrategyMenu() {
  const strategies = state.strategies.length ? state.strategies : marketData.strategies || [];
  els.strategySelect.innerHTML = strategies
    .map((item) => `<option value="${escapeHtml(item.profile_name)}">${escapeHtml(strategyLabel(item))}</option>`)
    .join("");
  els.strategySelect.value = state.profileName;
}

async function loadStrategyOptions() {
  try {
    const payload = await loadStrategies();
    state.strategies = payload.profiles || [];
    if (!state.profileName) state.profileName = payload.default_profile || state.strategies[0]?.profile_name || defaultStrategyProfile();
  } catch (_error) {
    state.strategies = [];
  }
}

function renderCandidates() {
  const decision = currentDecision();
  const selected = currentSelectedSymbols();
  const candidates = currentCandidateRows();
  const selectedRows = selected.map((symbol) => candidates.find((item) => item.symbol === symbol) || symbolRow(symbol)).filter(Boolean);
  const tradeDate = decision.trade_date || decision.resolved_trade_date || "n/a";
  els.decisionMeta.textContent = `交易日 ${tradeDate} · ${selectorLabel(decision.selector)} · ${state.showMode === "selected" ? "仅看入选" : "查看全部候选"}`;
  els.selectedCount.textContent = `入选 ${selected.length} / 候选 ${formatNumber(decision.eligible_symbol_count || 0)}`;
  els.symbolInput.value = `${state.symbol} ${symbolName(state.symbol)}`.trim();

  document.getElementById("show-selected").classList.toggle("is-active", state.showMode === "selected");
  document.getElementById("show-candidates").classList.toggle("is-active", state.showMode === "candidates");
  const rows = state.showMode === "selected" ? selectedRows : candidates;
  els.candidateTable.innerHTML = `
    <table class="candidate-table">
      <thead>
        <tr><th>#</th><th>代码</th><th>名称</th><th>信号</th><th>最新</th><th>日涨跌</th><th>20日</th><th>成交额</th><th>操作</th></tr>
      </thead>
      <tbody>
        ${rows
          .map((item) => {
            const active = item.symbol === state.symbol ? " is-active" : "";
            return `
              <tr class="${active}" data-symbol="${escapeHtml(item.symbol)}">
                <td>${escapeHtml(item.rank)}</td>
                <td>${escapeHtml(item.symbol)}</td>
                <td>${escapeHtml(item.name || symbolName(item.symbol))}</td>
                <td class="${Number(item.score_pct) >= 0 ? "up" : "down"}">${formatSignedPct(item.score_pct)}</td>
                <td>${formatPrice(item.close)}</td>
                <td class="${Number(item.pct_chg) >= 0 ? "up" : "down"}">${formatSignedPct(item.pct_chg)}</td>
                <td class="${Number(item.return_20d_pct) >= 0 ? "up" : "down"}">${formatSignedPct(item.return_20d_pct)}</td>
                <td>${formatMoney(item.amount)}</td>
                <td><button type="button" data-open="${escapeHtml(item.symbol)}">终端</button></td>
              </tr>`;
          })
          .join("")}
      </tbody>
    </table>`;
  els.candidateTable.querySelectorAll("tr[data-symbol]").forEach((row) => {
    row.addEventListener("click", (event) => {
      if (event.target.closest("[data-open]")) return;
      state.symbol = row.dataset.symbol;
      render();
    });
  });
  els.candidateTable.querySelectorAll("[data-open]").forEach((button) => {
    button.addEventListener("click", () => openTerminal(button.dataset.open));
  });
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

async function refreshSelectionForScenario() {
  if (state.mode === "live") {
    state.remoteDecision = null;
    return;
  }
  const step = currentSimulationStep(loadSimulationScenario());
  const asOf = step?.tradeDate || String(step?.asOf || "").slice(0, 10) || marketData.daily_data?.latest_trade_date || "";
  if (!asOf) {
    state.remoteDecision = null;
    return;
  }
  const requestId = state.selectionRequestId + 1;
  state.selectionRequestId = requestId;
  try {
    const params = new URLSearchParams({
      strategy: state.profileName,
      date: asOf,
      limit: "120",
    });
    const response = await fetch(`/api/selection/run?${params.toString()}`);
    if (!response.ok) throw new Error(`selection request failed: ${response.status}`);
    const payload = await response.json();
    if (requestId === state.selectionRequestId) {
      state.remoteDecision = payload;
      const selected = currentSelectedSymbols();
      if (selected.length && !selected.includes(state.symbol)) state.symbol = selected[0];
    }
  } catch (_error) {
    if (requestId === state.selectionRequestId) state.remoteDecision = null;
  }
}

function currentDecision() {
  return state.remoteDecision || decisionByProfile(state.profileName);
}

function currentSelectedSymbols() {
  const strategySymbols = state.remoteDecision?.selected_symbols || selectedSymbols(state.profileName, []);
  return [...strategySymbols, ...state.manualSymbols.filter((symbol) => !strategySymbols.includes(symbol))];
}

function currentCandidateRows() {
  const rows = state.remoteDecision?.ranked_candidates || staticCandidateRows(state.profileName);
  return rows.map((item) => normalizeCandidateRow(item));
}

function normalizeCandidateRow(item) {
  const close = Number(item.close || item.close_price || 0);
  const volume = Number(item.volume || 0);
  return {
    rank: item.rank || "-",
    symbol: item.symbol,
    name: item.name || symbolName(item.symbol),
    score_pct: Number(item.score_pct || 0),
    close,
    pct_chg: Number(item.pct_chg || 0),
    return_20d_pct: Number(item.return_20d_pct ?? item.score_pct ?? 0),
    amount: Number(item.amount || (close * volume) || 0),
  };
}

function dynamicStatusItems(decision) {
  const snapshot = decision.data_snapshot || {};
  return [
    ["日线日期", decision.resolved_trade_date || "n/a"],
    ["股票池", snapshot.symbol_count || 0],
    ["候选", decision.eligible_symbol_count || 0],
    ["入选", (decision.selected_symbols || []).length],
    ["数据", formatReadinessStatus(marketData.data_readiness?.status)],
  ];
}

function updateLinks() {
  setupGlobalNavigation({
    mode: state.mode,
    strategy: state.profileName,
    symbol: normalizeSymbol(state.symbol, marketData.default_symbol || ""),
  });
  const href = terminalHref(state.symbol);
  els.terminalLink.href = href;
  const accountParams = new URLSearchParams({
    strategy: state.profileName,
    symbol: normalizeSymbol(state.symbol, marketData.default_symbol || ""),
    mode: state.mode,
  });
  appendScenarioParams(accountParams);
  els.accountLink.href = `./account_records.html?${accountParams.toString()}`;
}

function openTerminal(symbol) {
  window.location.href = terminalHref(symbol);
}

function terminalHref(symbol) {
  const params = new URLSearchParams({ strategy: state.profileName, symbol: normalizeSymbol(symbol, state.symbol), mode: state.mode });
  appendScenarioParams(params);
  return `./trading_terminal.html?${params.toString()}`;
}

function appendScenarioParams(params) {
  if (state.mode === "live") return;
  const scenario = loadSimulationScenario();
  const step = currentSimulationStep(scenario);
  if (!step) return;
  const asOf = step.asOf || step.tradeDate || "";
  if (asOf) params.set("as_of", asOf);
  if (step.tradeDate) params.set("date", step.tradeDate);
  const period = terminalPeriodForSimulationFrequency(scenario?.frequency);
  if (period) params.set("period", period);
}

function strategyLabel(strategy) {
  const labels = {
    daily_rank_main: "日线强势股 Top 2",
    stable_momentum_blend: "稳健动量波动组合 Top 5",
    defensive_low_vol_momentum: "低波动动量防守 Top 5",
    trend_breakout_liquid: "流动性趋势突破 Top 5",
  };
  return strategy.display_name || labels[strategy.profile_name] || readableToken(strategy.profile_name || "策略");
}

function selectorLabel(selector) {
  const labels = {
    "builtin:lookback_return_desc": "近一年涨幅优先",
    "builtin:momentum_volatility_blend": "动量 + 低波动 + 流动性",
    "builtin:low_volatility_momentum": "正动量 / 低波动",
    "builtin:trend_breakout": "趋势突破",
  };
  return labels[selector] || readableToken(selector || "综合排序");
}

function topLabel(strategy) {
  return strategy.top_n ? `入选 ${strategy.top_n} 只` : "自动入选";
}

function readableToken(value) {
  return String(value)
    .replace(/^builtin:/, "")
    .split(/[_:-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function sourceLabel(value) {
  const labels = {
    baostock_public: "BaoStock 公共数据",
  };
  return labels[value] || value || "本地数据镜像";
}

function sourceFeedLabel(value) {
  const labels = {
    baostock_unadjusted: "日线不复权",
    baostock_5m_unadjusted: "5分钟不复权",
  };
  return labels[value] || value || "本地镜像";
}

function terminalPeriodForSimulationFrequency(value) {
  const raw = String(value || "").toLowerCase();
  if (["5m", "15m", "30m", "60m", "120m"].includes(raw)) return raw;
  if (["1w", "weekly", "week"].includes(raw)) return "weekly";
  if (["1mo", "monthly", "month"].includes(raw)) return "monthly";
  if (["1d", "daily", "day"].includes(raw)) return "daily";
  return "";
}

function displayGeneratedAt(value) {
  if (!value) return "-";
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
