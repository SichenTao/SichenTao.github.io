import { escapeHtml, formatMoney, formatNumber, formatPrice, formatSignedPct } from "./shared/format.js";
import { DEFAULT_INITIAL_CASH, accountIdForMode, loadAccountState, resetAccountState } from "./shared/accountApi.js";
import { apiGetJson } from "./shared/api.js";
import { defaultStrategyProfile, normalizeSymbol, statusItems, symbolName } from "./shared/marketData.js";
import { SymbolSearch } from "./shared/symbolSearch.js";
import { setupGlobalNavigation } from "./shared/navigation.js";
import { currentSimulationStep, loadSimulationScenario, localizeScenarioMessage, setupSimulationScenarioBar, showScenarioLoading, showScenarioToast } from "./shared/simulationScenario.js";

const params = new URLSearchParams(window.location.search);
const state = {
  mode: params.get("mode") || "paper",
  accountId: params.get("account") || accountIdForMode(params.get("mode") || "paper"),
  strategy: params.get("strategy") || defaultStrategyProfile(),
  symbol: normalizeSymbol(params.get("symbol") || "300632.SZ", "300632.SZ"),
  asOf: params.get("as_of") || params.get("date") || "",
  dataReadiness: null,
  account: null,
};

const els = {
  modeSelect: document.getElementById("mode-select"),
  symbolInput: document.getElementById("symbol-input"),
  suggestions: document.getElementById("symbol-suggestions"),
  terminalLink: document.getElementById("terminal-link"),
  accountStatus: document.getElementById("account-status"),
  accountMeta: document.getElementById("account-meta"),
  accountPnl: document.getElementById("account-pnl"),
  accountMetrics: document.getElementById("account-metrics"),
  positionsTable: document.getElementById("positions-table"),
  fillsTable: document.getElementById("fills-table"),
  ordersTable: document.getElementById("orders-table"),
  resetAccount: document.getElementById("reset-account"),
};

new SymbolSearch({
  input: els.symbolInput,
  suggestions: els.suggestions,
  onSelect: (symbol) => {
    state.symbol = symbol;
    renderLinks();
  },
});

setupSimulationScenarioBar({
  mode: state.mode,
  getGenerationConfig: () => ({
    strategy: state.strategy,
  }),
  onIndexChange: () => render(),
});

bindEvents();
const hideLoading = showScenarioLoading("正在初始化收益总结...");
try {
  await loadAndRender();
} finally {
  hideLoading();
}

function bindEvents() {
  els.modeSelect.addEventListener("change", async () => {
    state.mode = els.modeSelect.value;
    state.accountId = accountIdForMode(state.mode);
    await loadAndRender();
  });
  document.getElementById("open-symbol").addEventListener("click", () => {
    state.symbol = normalizeSymbol(els.symbolInput.value, state.symbol);
    window.location.href = terminalHref(state.symbol);
  });
  els.resetAccount.addEventListener("click", async () => {
    if (state.mode === "live") return;
    try {
      state.account = await resetAccountState({
        accountId: state.accountId,
        mode: state.mode,
        initialCash: DEFAULT_INITIAL_CASH,
      });
    } catch (error) {
      state.account = staticAccountState();
      showScenarioToast(localizeScenarioMessage(error.message || String(error)), { type: "warning" });
    }
    render();
  });
}

async function loadAndRender() {
  els.modeSelect.value = state.mode;
  els.resetAccount.disabled = state.mode === "live";
  if (!state.dataReadiness) {
    try {
      state.dataReadiness = await apiGetJson("/api/data/readiness");
    } catch (_error) {
      state.dataReadiness = null;
    }
  }
  try {
    state.account = await loadAccountState({
      accountId: state.accountId,
      mode: state.mode,
      initialCash: DEFAULT_INITIAL_CASH,
    });
  } catch (error) {
    state.account = staticAccountState();
    showScenarioToast(localizeScenarioMessage(error.message || String(error)), { type: "warning" });
  }
  render();
}

function staticAccountState() {
  const cash = DEFAULT_INITIAL_CASH;
  return {
    account_id: state.accountId,
    mode: state.mode,
    initial_cash: cash,
    updated_at: new Date().toISOString(),
    positions: [],
    fills: [],
    orders: [],
    summary: {
      cash_balance: cash,
      positions_market_value: 0,
      net_liquidation_value: cash,
      total_pnl: 0,
      return_pct: 0,
      position_count: 0,
      order_count: 0,
      fill_count: 0,
      rejected_order_count: 0,
    },
  };
}

function render() {
  renderStatus();
  renderOverview();
  renderPositions();
  renderFills();
  renderOrders();
  renderLinks();
}

function renderStatus() {
  const calendarLike = state.dataReadiness ? {
    latest_trade_date: state.dataReadiness.daily?.last_trade_date || "",
    data_readiness_summary: state.dataReadiness,
  } : null;
  els.accountStatus.innerHTML = statusItems(state.strategy, { calendar: calendarLike })
    .map(([label, value]) => `<div class="status-item"><span>${escapeHtml(label)}</span><strong>${escapeHtml(typeof value === "number" ? formatNumber(value) : value)}</strong></div>`)
    .join("");
}

function renderOverview() {
  const account = accountView();
  const summary = account.summary || {};
  els.symbolInput.value = `${state.symbol} ${symbolName(state.symbol)}`.trim();
  const asOf = currentAsOfDate();
  const asOfLabel = state.mode === "live" || !asOf ? "" : ` · 截至 ${asOf}`;
  els.accountMeta.textContent = `${modeLabel(state.mode)} · ${account.account_id || state.accountId}${asOfLabel} · 更新 ${displayTime(account.updated_at)}`;
  els.accountPnl.textContent = signedMoney(summary.total_pnl);
  els.accountPnl.className = Number(summary.total_pnl || 0) >= 0 ? "up" : "down";
  els.accountMetrics.innerHTML = [
    ["总资产", formatMoney(summary.net_liquidation_value)],
    ["可用资金", formatMoney(summary.cash_balance)],
    ["持仓市值", formatMoney(summary.positions_market_value)],
    ["总盈亏", signedMoney(summary.total_pnl)],
    ["收益率", formatSignedPct(summary.return_pct)],
  ]
    .map(([label, value]) => `<div class="metric"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`)
    .join("");
}

function renderPositions() {
  const positions = accountView().positions || [];
  if (!positions.length) {
    els.positionsTable.innerHTML = `<div class="empty-state">暂无持仓。可以从交易终端买入，成交后这里会自动更新。</div>`;
    return;
  }
  els.positionsTable.innerHTML = `
    <table class="account-table">
      <thead><tr><th>代码</th><th>名称</th><th>持仓</th><th>成本</th><th>最新</th><th>市值</th><th>浮动盈亏</th><th>操作</th></tr></thead>
      <tbody>
        ${positions
          .map(
            (item) => `
              <tr data-symbol="${escapeHtml(item.symbol)}">
                <td>${escapeHtml(item.symbol)}</td>
                <td>${escapeHtml(item.name || symbolName(item.symbol))}</td>
                <td>${formatNumber(item.quantity)}</td>
                <td>${formatPrice(item.avg_cost)}</td>
                <td>${formatPrice(item.market_price)}</td>
                <td>${formatMoney(item.market_value)}</td>
                <td class="${Number(item.unrealized_pnl || 0) >= 0 ? "up" : "down"}">${signedMoney(item.unrealized_pnl)}</td>
                <td><button type="button" data-open="${escapeHtml(item.symbol)}">终端</button></td>
              </tr>`
          )
          .join("")}
      </tbody>
    </table>`;
  bindTableLinks(els.positionsTable);
}

function renderFills() {
  const fills = accountView().fills || [];
  if (!fills.length) {
    els.fillsTable.innerHTML = `<div class="empty-state">暂无成交记录。</div>`;
    return;
  }
  els.fillsTable.innerHTML = `
    <table class="account-table">
      <thead><tr><th>时间</th><th>代码</th><th>方向</th><th>价格</th><th>数量</th><th>金额</th><th>费用</th></tr></thead>
      <tbody>
        ${fills
          .slice(0, 80)
          .map(
            (item) => `
              <tr data-symbol="${escapeHtml(item.symbol)}">
                <td>${escapeHtml(displayTime(item.filled_at))}</td>
                <td>${escapeHtml(item.symbol)}</td>
                <td class="${item.side === "buy" ? "up" : "down"}">${item.side === "buy" ? "买入" : "卖出"}</td>
                <td>${formatPrice(item.price)}</td>
                <td>${formatNumber(item.quantity)}</td>
                <td>${formatMoney(item.notional)}</td>
                <td>${formatMoney(item.fee)}</td>
              </tr>`
          )
          .join("")}
      </tbody>
    </table>`;
  bindTableLinks(els.fillsTable);
}

function renderOrders() {
  const orders = accountView().orders || [];
  if (!orders.length) {
    els.ordersTable.innerHTML = `<div class="empty-state">暂无订单。</div>`;
    return;
  }
  els.ordersTable.innerHTML = `
    <table class="account-table">
      <thead><tr><th>时间</th><th>代码</th><th>方向</th><th>数量</th><th>状态</th><th>原因</th></tr></thead>
      <tbody>
        ${orders
          .slice(0, 80)
          .map(
            (item) => `
              <tr data-symbol="${escapeHtml(item.symbol)}">
                <td>${escapeHtml(displayTime(item.created_at))}</td>
                <td>${escapeHtml(item.symbol)}</td>
                <td class="${item.side === "buy" ? "up" : "down"}">${item.side === "buy" ? "买入" : "卖出"}</td>
                <td>${formatNumber(item.quantity)}</td>
                <td>${escapeHtml(orderStatusLabel(item.status))}</td>
                <td>${escapeHtml(rejectionLabel(item.reason))}</td>
              </tr>`
          )
          .join("")}
      </tbody>
    </table>`;
  bindTableLinks(els.ordersTable);
}

function bindTableLinks(root) {
  root.querySelectorAll("[data-symbol]").forEach((row) => {
    row.addEventListener("click", (event) => {
      if (event.target.closest("button")) return;
      window.location.href = terminalHref(row.dataset.symbol);
    });
  });
  root.querySelectorAll("[data-open]").forEach((button) => {
    button.addEventListener("click", () => {
      window.location.href = terminalHref(button.dataset.open);
    });
  });
}

function renderLinks() {
  setupGlobalNavigation({
    mode: state.mode,
    strategy: state.strategy,
    symbol: state.symbol,
    account: state.accountId,
  });
  els.terminalLink.href = terminalHref(state.symbol);
}

function terminalHref(symbol) {
  const params = new URLSearchParams({
    strategy: state.strategy,
    symbol: normalizeSymbol(symbol, state.symbol),
    mode: state.mode,
    account: state.accountId,
  });
  appendScenarioParams(params);
  return `./trading_terminal.html?${params.toString()}`;
}

function appendScenarioParams(params) {
  if (state.mode === "live") return;
  const scenario = loadSimulationScenario();
  const step = currentSimulationStep(scenario);
  const asOf = step?.asOf || step?.tradeDate || state.asOf || "";
  if (asOf) params.set("as_of", asOf);
  if (step?.tradeDate) params.set("date", step.tradeDate);
  const period = terminalPeriodForSimulationFrequency(scenario?.frequency);
  if (period) params.set("period", period);
}

function terminalPeriodForSimulationFrequency(value) {
  const raw = String(value || "").toLowerCase();
  if (["5m", "15m", "30m", "60m", "120m"].includes(raw)) return raw;
  if (["1w", "weekly", "week"].includes(raw)) return "weekly";
  if (["1mo", "monthly", "month"].includes(raw)) return "monthly";
  if (["1d", "daily", "day"].includes(raw)) return "daily";
  return "";
}

function accountView() {
  const account = state.account || {};
  if (state.mode === "live") return account;
  const asOf = currentAsOfDate();
  if (!asOf) return account;
  return buildAsOfAccount(account, asOf);
}

function currentAsOfDate() {
  const step = currentSimulationStep(loadSimulationScenario());
  return String(step?.tradeDate || step?.asOf || state.asOf || "").slice(0, 10);
}

function buildAsOfAccount(account, asOf) {
  const initialCash = Number(account.initial_cash || DEFAULT_INITIAL_CASH);
  const orders = (account.orders || []).filter((item) => includeRecordAtAsOf(item, asOf));
  const fillsNewestFirst = (account.fills || []).filter((item) => includeRecordAtAsOf(item, asOf));
  const fillsChronological = fillsNewestFirst.slice().sort((a, b) => recordSortValue(a).localeCompare(recordSortValue(b)));
  const positions = new Map();
  let cash = initialCash;

  for (const fill of fillsChronological) {
    const symbol = normalizeSymbol(fill.symbol, "");
    if (!symbol) continue;
    const quantity = Math.max(0, Number(fill.quantity || 0));
    const price = Math.max(0, Number(fill.price || 0));
    const fee = Math.max(0, Number(fill.fee || 0));
    const notional = Number(fill.notional || price * quantity);
    if (quantity <= 0 || price <= 0) continue;
    const current = positions.get(symbol) || {
      symbol,
      name: fill.name || symbolName(symbol),
      quantity: 0,
      avg_cost: 0,
      market_price: price,
    };
    if (fill.side === "sell") {
      const sellQuantity = Math.min(Number(current.quantity || 0), quantity);
      cash += notional - fee;
      current.quantity = Number(current.quantity || 0) - sellQuantity;
      current.market_price = price;
      if (current.quantity > 0) {
        positions.set(symbol, current);
      } else {
        positions.delete(symbol);
      }
      continue;
    }
    const oldQuantity = Number(current.quantity || 0);
    const newQuantity = oldQuantity + quantity;
    const oldCost = Number(current.avg_cost || 0) * oldQuantity;
    current.quantity = newQuantity;
    current.avg_cost = newQuantity > 0 ? (oldCost + notional + fee) / newQuantity : 0;
    current.market_price = price;
    positions.set(symbol, current);
    cash -= notional + fee;
  }

  const positionRows = Array.from(positions.values())
    .filter((item) => Number(item.quantity || 0) > 0)
    .map((item) => {
      const marketValue = Number(item.quantity || 0) * Number(item.market_price || 0);
      const unrealized = (Number(item.market_price || 0) - Number(item.avg_cost || 0)) * Number(item.quantity || 0);
      return {
        ...item,
        market_value: marketValue,
        unrealized_pnl: unrealized,
      };
    })
    .sort((a, b) => String(a.symbol).localeCompare(String(b.symbol)));
  const positionsMarketValue = positionRows.reduce((total, item) => total + Number(item.market_value || 0), 0);
  const netLiquidationValue = cash + positionsMarketValue;
  const totalPnl = netLiquidationValue - initialCash;
  return {
    ...account,
    positions: positionRows,
    orders,
    fills: fillsNewestFirst,
    summary: {
      cash_balance: cash,
      positions_market_value: positionsMarketValue,
      net_liquidation_value: netLiquidationValue,
      total_pnl: totalPnl,
      return_pct: initialCash > 0 ? (totalPnl / initialCash) * 100 : 0,
      position_count: positionRows.length,
      order_count: orders.length,
      fill_count: fillsNewestFirst.length,
      rejected_order_count: orders.filter((item) => item.status === "rejected").length,
    },
  };
}

function includeRecordAtAsOf(item, asOf) {
  if (!asOf) return true;
  const value = recordDate(item);
  return !value || value <= asOf;
}

function recordDate(item) {
  return String(item.as_of || item.trade_date || item.filled_at || item.created_at || "").slice(0, 10);
}

function recordSortValue(item) {
  return String(item.as_of || item.filled_at || item.created_at || "");
}

function signedMoney(value) {
  const number = Number(value || 0);
  return `${number >= 0 ? "+" : "-"}${formatMoney(Math.abs(number))}`;
}

function displayTime(value) {
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

function modeLabel(mode) {
  const labels = {
    paper: "模拟账户",
    manual: "手动记录",
    live: "真实交易只读",
  };
  return labels[mode] || mode;
}

function orderStatusLabel(status) {
  const labels = {
    created: "已创建",
    filled: "已成交",
    rejected: "已拒绝",
  };
  return labels[status] || status || "-";
}

function rejectionLabel(reason) {
  const labels = {
    insufficient_cash: "资金不足",
    insufficient_position: "持仓不足",
    invalid_price: "价格无效",
    invalid_side: "方向无效",
    quantity_must_be_at_least_one_lot: "不足一手",
    live_trading_disabled: "真实交易写入未启用",
  };
  return labels[reason] || reason || "-";
}
