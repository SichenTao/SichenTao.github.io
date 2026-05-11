const dailyData = window.INTERNAL_QUANT_DAILY_TRADING_DATA || {
  strategies: [],
  decisions: {},
  symbols: {},
  daily_data: {},
  data_readiness: {},
};

const defaultProfileName = dailyData.project?.default_strategy_profile || dailyData.strategies?.[0]?.profile_name;
const defaultStrategy = (dailyData.strategies || []).find((item) => item.profile_name === defaultProfileName) || dailyData.strategies?.[0] || {};
const symbolIndex = dailyData.symbol_index || [];
const symbolIndexBySymbol = Object.fromEntries(symbolIndex.map((item) => [item.symbol, item]));
const MIN_VISIBLE_BARS = 24;
const DEFAULT_VISIBLE_BARS = 150;

const state = {
  profileName: defaultProfileName,
  symbol: dailyData.default_symbol || Object.keys(dailyData.symbols || {})[0],
  showMode: "selected",
  manualStrategySymbols: [],
  period: "daily",
  indicator: "VOL",
  overlays: { MA: true, BOLL: false },
  drawTool: "crosshair",
  scale: "normal",
  drawings: [],
  chartRanges: {},
  pendingTrendPoint: null,
  cash: Number(defaultStrategy.initial_cash || 100000),
  positions: {},
  ledger: [],
};

let chartCache = null;

const strategySelect = document.getElementById("strategy-select");
const symbolInput = document.getElementById("symbol-input");

render();
bindEvents();

function bindEvents() {
  strategySelect.addEventListener("change", () => {
    state.profileName = strategySelect.value;
    const selected = currentDecision().selected_symbols || [];
    state.symbol = selected[0] || state.symbol;
    resetAccountFromStrategy();
    render();
  });
  document.getElementById("symbol-search").addEventListener("click", () => {
    selectSymbol(normalizeSymbol(symbolInput.value));
  });
  document.getElementById("add-watch").addEventListener("click", async () => {
    const symbol = normalizeSymbol(symbolInput.value);
    await selectSymbol(symbol);
    addManualStrategySymbol(symbol);
  });
  symbolInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") selectSymbol(normalizeSymbol(symbolInput.value));
    if (event.key === "Escape") closeSuggestions();
  });
  symbolInput.addEventListener("input", () => renderSuggestions(symbolInput.value));
  symbolInput.addEventListener("focus", () => renderSuggestions(symbolInput.value));
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".search-box")) closeSuggestions();
  });
  document.getElementById("strategy-buy").addEventListener("click", () => {
    applyStrategyPlan();
    render();
  });
  document.getElementById("show-selected").addEventListener("click", () => {
    state.showMode = "selected";
    renderSelection();
  });
  document.getElementById("show-candidates").addEventListener("click", () => {
    state.showMode = "candidates";
    renderSelection();
  });
  document.getElementById("buy-button").addEventListener("click", () => {
    submitOrder("buy");
  });
  document.getElementById("sell-button").addEventListener("click", () => {
    submitOrder("sell");
  });
  document.getElementById("chart-toolbar").addEventListener("click", async (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    if (button.dataset.period) {
      state.period = button.dataset.period;
      if (state.period === "minute") await loadIntradayForCurrent();
      renderTradingView();
      return;
    }
    if (button.dataset.indicator) {
      state.indicator = button.dataset.indicator;
      renderTradingView();
      return;
    }
    if (button.dataset.overlay) {
      state.overlays[button.dataset.overlay] = !state.overlays[button.dataset.overlay];
      renderTradingView();
      return;
    }
    if (button.dataset.draw) {
      if (button.dataset.draw === "clear") {
        state.drawings = [];
        state.pendingTrendPoint = null;
      } else {
        state.drawTool = button.dataset.draw;
        state.pendingTrendPoint = null;
      }
      renderTradingView();
    }
  });
  document.getElementById("scale-select").addEventListener("change", (event) => {
    state.scale = event.target.value;
    renderTradingView();
  });
  document.getElementById("zoom-reset").addEventListener("click", () => {
    const stock = currentStock();
    if (!stock) return;
    resetChartRange(currentChartBars(stock));
    renderTradingView();
  });
  document.getElementById("zoom-range").addEventListener("input", (event) => {
    const stock = currentStock();
    if (!stock) return;
    const bars = currentChartBars(stock);
    const range = ensureChartRange(bars);
    const visibleCount = range.end - range.start;
    const maxStart = Math.max(0, bars.length - visibleCount);
    const nextStart = Math.max(0, Math.min(maxStart, Number(event.target.value || 0)));
    state.chartRanges[chartRangeKey()] = { start: nextStart, end: nextStart + visibleCount, total: bars.length };
    renderTradingView();
  });
}

function render() {
  renderStatusStrip();
  renderStrategyMenu();
  renderSelection();
  renderTradingView();
}

function renderSuggestions(value) {
  const box = document.getElementById("symbol-suggestions");
  const query = String(value || "").trim().toUpperCase();
  if (!query) {
    closeSuggestions();
    return;
  }
  const compact = query.replace(/\s+/g, "");
  const matches = symbolIndex
    .filter((item) => {
      const symbol = String(item.symbol || "").toUpperCase();
      const code = symbol.split(".")[0];
      const name = String(item.name || "").toUpperCase();
      return symbol.includes(compact) || code.includes(compact) || name.includes(compact) || String(item.name || "").includes(value.trim());
    })
    .slice(0, 12);
  if (!matches.length) {
    box.innerHTML = `<button type="button" class="suggestion-row"><strong>${escapeHtml(query)}</strong><span>无匹配项</span></button>`;
    box.classList.add("is-open");
    return;
  }
  box.innerHTML = matches
    .map(
      (item) => `
        <button type="button" class="suggestion-row" data-symbol="${escapeHtml(item.symbol)}">
          <strong>${escapeHtml(item.symbol)}</strong>
          <span>${escapeHtml(item.name || "")}</span>
        </button>`
    )
    .join("");
  box.classList.add("is-open");
  box.querySelectorAll(".suggestion-row[data-symbol]").forEach((row) => {
    row.addEventListener("click", () => {
      symbolInput.value = `${row.dataset.symbol} ${symbolIndexBySymbol[row.dataset.symbol]?.name || ""}`.trim();
      selectSymbol(row.dataset.symbol);
      closeSuggestions();
    });
  });
}

function closeSuggestions() {
  const box = document.getElementById("symbol-suggestions");
  box.classList.remove("is-open");
  box.innerHTML = "";
}

function renderStatusStrip() {
  const readiness = dailyData.data_readiness || {};
  const daily = dailyData.daily_data || {};
  const decision = currentDecision();
  const items = [
    ["日线日期", daily.latest_trade_date || "n/a"],
    ["股票池", formatNumber(daily.symbol_count || 0)],
    ["候选", formatNumber(decision.eligible_symbol_count || 0)],
    ["入选", formatNumber((decision.selected_symbols || []).length)],
    ["数据", formatReadinessStatus(readiness.status)],
  ];
  document.getElementById("status-strip").innerHTML = items
    .map(([label, value]) => `<div class="status-item"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`)
    .join("");
}

function renderStrategyMenu() {
  strategySelect.innerHTML = (dailyData.strategies || [])
    .map((item) => `<option value="${escapeHtml(item.profile_name)}">${escapeHtml(item.profile_name)}</option>`)
    .join("");
  strategySelect.value = state.profileName || "";
}

function renderSelection() {
  const decision = currentDecision();
  const candidates = decision.ranked_candidates || [];
  const selected = selectedSymbols();
  document.getElementById("decision-meta").textContent = `${decision.trade_date || "n/a"} / ${decision.selector || "n/a"}`;
  document.getElementById("selected-count").textContent = `${selected.length} / ${formatNumber(decision.eligible_symbol_count || 0)}`;
  document.getElementById("selected-list").innerHTML = selected
    .map((symbol) => {
      const stock = dailyData.symbols?.[symbol] || {};
      const signal = stock.signal || candidates.find((item) => item.symbol === symbol) || {};
      const name = stock.name || symbolIndexBySymbol[symbol]?.name || "";
      const source = (decision.selected_symbols || []).includes(symbol) ? `排名 ${escapeHtml(signal.rank || "-")}` : "手动加入";
      const active = symbol === state.symbol ? " is-active" : "";
      return `
        <button type="button" class="stock-button${active}" data-symbol="${escapeHtml(symbol)}">
          <strong>${escapeHtml(symbol)} ${escapeHtml(name)}</strong>
          <span>${source} / ${formatSignedPct(signal.score_pct)}</span>
        </button>`;
    })
    .join("");
  document.querySelectorAll(".stock-button").forEach((button) => {
    button.addEventListener("click", () => selectSymbol(button.dataset.symbol));
  });
  document.getElementById("show-selected").classList.toggle("is-active", state.showMode === "selected");
  document.getElementById("show-candidates").classList.toggle("is-active", state.showMode === "candidates");
  const rows =
    state.showMode === "selected"
      ? selected.map((symbol) => candidates.find((item) => item.symbol === symbol) || dailyData.symbols?.[symbol]?.signal || symbolRow(symbol)).filter(Boolean)
      : candidates;
  document.getElementById("candidate-table").innerHTML = `
    <table class="candidate-table">
      <thead>
        <tr>
          <th>#</th>
          <th>代码</th>
          <th>名称</th>
          <th>信号</th>
          <th>最新</th>
          <th>日涨跌</th>
          <th>20日</th>
          <th>成交额</th>
        </tr>
      </thead>
      <tbody>
        ${rows
          .map(
            (item) => `
              <tr class="${item.symbol === state.symbol ? "is-active" : ""}" data-symbol="${escapeHtml(item.symbol)}">
                <td>${escapeHtml(item.rank)}</td>
                <td>${escapeHtml(item.symbol)}</td>
                <td>${escapeHtml(item.name || symbolIndexBySymbol[item.symbol]?.name || "")}</td>
                <td class="${Number(item.score_pct) >= 0 ? "up" : "down"}">${formatSignedPct(item.score_pct)}</td>
                <td>${formatPrice(item.close)}</td>
                <td class="${Number(item.pct_chg) >= 0 ? "up" : "down"}">${formatSignedPct(item.pct_chg)}</td>
                <td class="${Number(item.return_20d_pct) >= 0 ? "up" : "down"}">${formatSignedPct(item.return_20d_pct)}</td>
                <td>${formatMoney(item.amount)}</td>
              </tr>`
          )
          .join("")}
      </tbody>
    </table>`;
  document.querySelectorAll(".candidate-table tr[data-symbol]").forEach((row) => {
    row.addEventListener("click", () => selectSymbol(row.dataset.symbol));
  });
}

function renderTradingView() {
  const stock = currentStock();
  if (!stock) {
    document.getElementById("stock-title").textContent = state.symbol || "未选择";
    return;
  }
  const latest = stock.latest || {};
  const signal = stock.signal || {};
  const target = stock.target || {};
  const stats = stock.stats || {};
  const stockName = stock.name || symbolIndexBySymbol[stock.symbol]?.name || "";
  const positionQty = Number(state.positions[stock.symbol] || 0);
  const marketValue = positionQty * Number(latest.close || 0);
  document.getElementById("stock-rank").textContent = signal.rank ? `Rank ${signal.rank}` : "Watch";
  document.getElementById("stock-title").textContent = `${stock.symbol} / ${latest.date || ""}`;
  document.getElementById("stock-name").textContent = stockName;
  document.getElementById("ticket-symbol").textContent = stock.symbol;
  symbolInput.value = `${stock.symbol} ${stockName}`.trim();
  renderChartToolbar();
  document.getElementById("quote-grid").innerHTML = [
    ["最新", formatPrice(latest.close)],
    ["日涨跌", formatSignedPct(latest.pct_chg)],
    ["成交额", formatMoney(latest.amount)],
    ["换手", `${formatNumber(latest.turn)}%`],
  ]
    .map(([label, value]) => `<div class="quote-cell"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`)
    .join("");
  document.getElementById("account-grid").innerHTML = [
    ["现金", formatMoney(state.cash)],
    ["持仓", `${formatNumber(positionQty)} 股`],
    ["市值", formatMoney(marketValue)],
    ["总权益", formatMoney(accountEquity())],
  ]
    .map(([label, value]) => `<div class="metric"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`)
    .join("");
  document.getElementById("order-quantity").value = String(target.target_quantity || suggestedQuantity(stock));
  document.getElementById("target-card").innerHTML = target.symbol
    ? `<strong>目标 ${formatNumber(target.target_quantity)} 股</strong><span>${formatMoney(target.target_notional)} / 参考 ${formatPrice(target.reference_price)}</span>`
    : `<strong>观察</strong><span>未在当前策略目标仓位中</span>`;
  document.getElementById("signal-meta").textContent = signal.rank ? `score ${formatSignedPct(signal.score_pct)}` : "watchlist";
  document.getElementById("signal-grid").innerHTML = [
    ["2日信号", formatSignedPct(signal.score_pct)],
    ["20日收益", formatSignedPct(stats.return_20d_pct)],
    ["60日收益", formatSignedPct(stats.return_60d_pct)],
    ["20日均额", formatMoney(stats.avg_amount_20d)],
  ]
    .map(([label, value]) => `<div class="metric"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`)
    .join("");
  document.getElementById("range-row").innerHTML = [
    ["60日高", formatPrice(stats.high_60d)],
    ["60日低", formatPrice(stats.low_60d)],
    ["ST", latest.is_st === "1" ? "是" : "否"],
    ["状态", latest.tradestatus === "1" ? "交易" : "停牌"],
    ["数据", "日线"],
  ]
    .map(([label, value]) => `<div class="metric"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`)
    .join("");
  const chartBars = currentChartBars(stock);
  renderChart(chartBars);
  renderDailyTape(chartBars);
  renderLedger();
}

function renderChartToolbar() {
  document.querySelectorAll("[data-period]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.period === state.period);
  });
  document.querySelectorAll("[data-indicator]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.indicator === state.indicator);
  });
  document.querySelectorAll("[data-overlay]").forEach((button) => {
    button.classList.toggle("is-active", Boolean(state.overlays[button.dataset.overlay]));
  });
  document.querySelectorAll("[data-draw]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.draw === state.drawTool);
  });
  document.getElementById("scale-select").value = state.scale;
}

function renderChart(bars) {
  const svg = document.getElementById("daily-chart");
  if (!bars.length) {
    svg.innerHTML = "";
    chartCache = null;
    updateZoomControls([], { start: 0, end: 0 });
    return;
  }
  const width = 880;
  const height = 390;
  const leftPad = 32;
  const rightPad = 56;
  const topPad = 24;
  const bottomPad = 28;
  const indicatorHeight = 88;
  const chartRight = width - rightPad;
  const range = ensureChartRange(bars);
  const visible = bars.slice(range.start, range.end);
  const priceBottom = height - bottomPad - indicatorHeight;
  const displayValues = visible.flatMap((bar, index) => [displayPrice(Number(bar.high), visible), displayPrice(Number(bar.low), visible)]);
  const maxPrice = Math.max(...displayValues);
  const minPrice = Math.min(...displayValues);
  const span = maxPrice - minPrice || 1;
  const maxVolume = Math.max(...visible.map((bar) => Number(bar.volume || 0)), 1);
  const xStep = (chartRight - leftPad) / Math.max(visible.length - 1, 1);
  const xFor = (index) => leftPad + index * xStep;
  const xForAbsolute = (absoluteIndex) => leftPad + (absoluteIndex - range.start) * xStep;
  const y = (value) => priceBottom - ((displayPrice(value, visible) - minPrice) / span) * (priceBottom - topPad);
  const closePoints = visible
    .map((bar, index) => `${xFor(index).toFixed(2)},${y(Number(bar.close)).toFixed(2)}`)
    .join(" ");
  const area = `${leftPad},${priceBottom} ${closePoints} ${chartRight},${priceBottom}`;
  const candleBodyWidth = Math.max(3, Math.min(12, xStep * 0.58));
  const candles = visible
    .map((bar, index) => {
      const x = xFor(index);
      const open = Number(bar.open);
      const close = Number(bar.close);
      const high = Number(bar.high);
      const low = Number(bar.low);
      const up = close >= open;
      const color = up ? "var(--red)" : "var(--green)";
      const bodyTop = Math.min(y(open), y(close));
      const bodyHeight = Math.max(2, Math.abs(y(open) - y(close)));
      const volume = Number(bar.volume || 0);
      const volumeBarHeight = (volume / maxVolume) * (indicatorHeight - 20);
      const volumeY = height - bottomPad - volumeBarHeight;
      return `
        <line class="candle-wick" x1="${x.toFixed(2)}" y1="${y(high).toFixed(2)}" x2="${x.toFixed(2)}" y2="${y(low).toFixed(2)}" stroke="${color}"></line>
        <rect class="candle-body" x="${(x - candleBodyWidth / 2).toFixed(2)}" y="${bodyTop.toFixed(2)}" width="${candleBodyWidth.toFixed(2)}" height="${bodyHeight.toFixed(2)}" fill="${up ? "rgba(217,45,32,0.22)" : "rgba(3,152,85,0.2)"}" stroke="${color}"></rect>
        ${state.indicator === "VOL" ? `<rect class="volume-bar" x="${(x - candleBodyWidth / 2).toFixed(2)}" y="${volumeY.toFixed(2)}" width="${candleBodyWidth.toFixed(2)}" height="${volumeBarHeight.toFixed(2)}" fill="${color}"></rect>` : ""}`;
    })
    .join("");
  const overlays = [
    ...(state.overlays.MA ? renderMaLines(visible, xFor, y) : []),
    ...(state.overlays.BOLL ? renderBollLines(visible, xFor, y) : []),
  ].join("");
  const indicator =
    state.indicator === "MACD"
      ? renderMacd(visible, xFor, height, bottomPad, indicatorHeight, leftPad, chartRight, xStep)
      : state.indicator === "KDJ"
        ? renderKdj(visible, xFor, height, bottomPad, indicatorHeight)
        : "";
  chartCache = {
    visible,
    allBars: bars,
    width,
    height,
    pad: leftPad,
    chartRight,
    topPad,
    bottomPad,
    priceBottom,
    rangeStart: range.start,
    rangeEnd: range.end,
    xFor,
    xForAbsolute,
    y,
    xStep,
    minDisplay: minPrice,
    maxDisplay: maxPrice,
    span,
  };
  const scaffold = renderChartScaffold(visible, minPrice, span);
  const drawings = renderDrawings();
  svg.innerHTML = `
    ${scaffold}
    <polyline class="chart-area" points="${area}"></polyline>
    ${candles}
    <polyline class="chart-line" points="${closePoints}"></polyline>
    ${overlays}
    <line class="axis-line" x1="${leftPad}" y1="${priceBottom}" x2="${chartRight}" y2="${priceBottom}"></line>
    ${indicator}
    ${drawings}
    <g id="crosshair-layer" style="display:none"></g>
    <rect id="chart-hitbox" x="${leftPad}" y="${topPad}" width="${chartRight - leftPad}" height="${height - topPad - bottomPad}" fill="transparent"></rect>
  `;
  updateZoomControls(bars, range);
  attachChartInteractions();
}

function renderChartScaffold(visible, minDisplay, span) {
  if (!chartCache) return "";
  const priceTicks = Array.from({ length: 5 }, (_, index) => minDisplay + (span * index) / 4);
  const priceGrid = priceTicks
    .map((value) => {
      const yPos = chartCache.priceBottom - ((value - minDisplay) / span) * (chartCache.priceBottom - chartCache.topPad);
      return `
        <line class="grid-line" x1="${chartCache.pad}" y1="${yPos.toFixed(2)}" x2="${chartCache.chartRight}" y2="${yPos.toFixed(2)}"></line>
        <text class="axis-label" x="${(chartCache.chartRight + 8).toFixed(2)}" y="${(yPos + 4).toFixed(2)}">${escapeHtml(axisLabelFromDisplay(value, visible))}</text>`;
    })
    .join("");
  const count = visible.length;
  const dateIndices = [...new Set([0, Math.floor((count - 1) * 0.25), Math.floor((count - 1) * 0.5), Math.floor((count - 1) * 0.75), count - 1])].filter((index) => index >= 0);
  const dateGrid = dateIndices
    .map((index) => {
      const x = chartCache.xFor(index);
      const date = visible[index]?.date || visible[index]?.time || "";
      return `
        <line class="grid-line" x1="${x.toFixed(2)}" y1="${chartCache.topPad}" x2="${x.toFixed(2)}" y2="${(chartCache.height - chartCache.bottomPad).toFixed(2)}"></line>
        <text class="date-label" x="${x.toFixed(2)}" y="${(chartCache.height - 8).toFixed(2)}" text-anchor="${index === 0 ? "start" : index === count - 1 ? "end" : "middle"}">${escapeHtml(String(date).slice(0, 10))}</text>`;
    })
    .join("");
  return `
    ${priceGrid}
    ${dateGrid}
    <line class="axis-line" x1="${chartCache.chartRight}" y1="${chartCache.topPad}" x2="${chartCache.chartRight}" y2="${(chartCache.height - chartCache.bottomPad).toFixed(2)}"></line>
    <line class="axis-line" x1="${chartCache.pad}" y1="${(chartCache.height - chartCache.bottomPad).toFixed(2)}" x2="${chartCache.chartRight}" y2="${(chartCache.height - chartCache.bottomPad).toFixed(2)}"></line>`;
}

function currentChartBars(stock) {
  const dailyBars = stock.bars || [];
  document.getElementById("chart-note").textContent = "";
  if (state.period === "weekly") return aggregateBars(dailyBars, "week");
  if (state.period === "monthly") return aggregateBars(dailyBars, "month");
  if (state.period === "minute") {
    if (stock.intradayBars?.length) return stock.intradayBars;
    document.getElementById("chart-note").textContent = "该股票5分钟数据尚未下载完成，暂以日线图显示。";
    return dailyBars;
  }
  return dailyBars;
}

function chartRangeKey() {
  return `${state.symbol || ""}:${state.period || "daily"}`;
}

function ensureChartRange(bars) {
  const total = bars.length;
  const key = chartRangeKey();
  if (!total) {
    state.chartRanges[key] = { start: 0, end: 0, total: 0 };
    return state.chartRanges[key];
  }
  const existing = state.chartRanges[key];
  const defaultCount = Math.min(total, state.period === "minute" ? 120 : DEFAULT_VISIBLE_BARS);
  if (!existing) {
    state.chartRanges[key] = { start: Math.max(0, total - defaultCount), end: total, total };
    return state.chartRanges[key];
  }
  const wasPinnedToLatest = existing.end >= existing.total;
  const visibleCount = clamp(existing.end - existing.start, minimumVisibleCount(total), total);
  const start = wasPinnedToLatest ? Math.max(0, total - visibleCount) : clamp(existing.start, 0, Math.max(0, total - visibleCount));
  state.chartRanges[key] = { start, end: start + visibleCount, total };
  return state.chartRanges[key];
}

function resetChartRange(bars) {
  const total = bars.length;
  const count = Math.min(total, state.period === "minute" ? 120 : DEFAULT_VISIBLE_BARS);
  state.chartRanges[chartRangeKey()] = { start: Math.max(0, total - count), end: total, total };
}

function updateZoomControls(bars, range) {
  const slider = document.getElementById("zoom-range");
  const label = document.getElementById("zoom-label");
  const reset = document.getElementById("zoom-reset");
  const total = bars.length;
  const visibleCount = Math.max(0, range.end - range.start);
  const maxStart = Math.max(0, total - visibleCount);
  slider.min = "0";
  slider.max = String(maxStart);
  slider.value = String(Math.min(maxStart, range.start));
  slider.disabled = maxStart <= 0;
  reset.disabled = total <= 0;
  const first = bars[range.start]?.date || bars[range.start]?.time || "";
  const last = bars[Math.max(range.start, range.end - 1)]?.date || bars[Math.max(range.start, range.end - 1)]?.time || "";
  label.textContent = total ? `${first} - ${last} / ${visibleCount}根` : "暂无数据";
}

function zoomChartAt(x, deltaY) {
  if (!chartCache?.allBars?.length) return;
  const total = chartCache.allBars.length;
  const range = ensureChartRange(chartCache.allBars);
  const currentCount = range.end - range.start;
  const factor = deltaY < 0 ? 0.82 : 1.22;
  const nextCount = clamp(Math.round(currentCount * factor), minimumVisibleCount(total), total);
  if (nextCount === currentCount) return;
  const cursorRatio = clamp((x - chartCache.pad) / Math.max(chartCache.chartRight - chartCache.pad, 1), 0, 1);
  const anchorIndex = range.start + cursorRatio * Math.max(currentCount - 1, 0);
  const start = clamp(Math.round(anchorIndex - cursorRatio * Math.max(nextCount - 1, 0)), 0, Math.max(0, total - nextCount));
  state.chartRanges[chartRangeKey()] = { start, end: start + nextCount, total };
  renderTradingView();
}

function panChartByWheel(deltaPixels) {
  if (!chartCache?.allBars?.length) return;
  const total = chartCache.allBars.length;
  const range = ensureChartRange(chartCache.allBars);
  const visibleCount = range.end - range.start;
  const deltaBars = Math.round(deltaPixels / Math.max(chartCache.xStep, 1));
  if (!deltaBars) return;
  const start = clamp(range.start + deltaBars, 0, Math.max(0, total - visibleCount));
  state.chartRanges[chartRangeKey()] = { start, end: start + visibleCount, total };
  renderTradingView();
}

function minimumVisibleCount(total) {
  return Math.min(total, state.period === "minute" ? 30 : MIN_VISIBLE_BARS);
}

function axisLabelFromDisplay(value, visible) {
  if (state.scale === "percent") return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
  if (state.scale === "log") return formatPrice(Math.exp(value));
  return formatPrice(value);
}

function displayPrice(value, bars) {
  if (state.scale === "log") return value > 0 ? Math.log(value) : 0;
  if (state.scale === "percent") {
    const base = Number(bars[0]?.close || 0);
    return base > 0 ? ((value / base) - 1) * 100 : 0;
  }
  return value;
}

function renderMaLines(bars, xFor, y) {
  return [
    indicatorLine(movingAverage(bars, 5), xFor, y, "#d08a1f"),
    indicatorLine(movingAverage(bars, 10), xFor, y, "#7b5fc8"),
    indicatorLine(movingAverage(bars, 20), xFor, y, "#176d67"),
  ];
}

function renderBollLines(bars, xFor, y) {
  const boll = bollinger(bars, 20);
  return [
    indicatorLine(boll.upper, xFor, y, "#a15f9b"),
    indicatorLine(boll.mid, xFor, y, "#7d8b99"),
    indicatorLine(boll.lower, xFor, y, "#a15f9b"),
  ];
}

function indicatorLine(values, xFor, y, color) {
  const points = values
    .map((value, index) => (value === null ? null : `${xFor(index).toFixed(2)},${y(value).toFixed(2)}`))
    .filter(Boolean)
    .join(" ");
  return points ? `<polyline class="indicator-line" points="${points}" stroke="${color}"></polyline>` : "";
}

function renderMacd(bars, xFor, height, bottomPad, indicatorHeight, leftPad, chartRight, xStep) {
  const macd = computeMacd(bars);
  const values = macd.flatMap((item) => [item.dif, item.dea, item.hist]);
  const max = Math.max(...values.map(Math.abs), 1);
  const midY = height - bottomPad - indicatorHeight / 2;
  const scale = (indicatorHeight / 2 - 8) / max;
  const histWidth = Math.max(2, Math.min(7, xStep * 0.5));
  const hist = macd
    .map((item, index) => {
      const x = xFor(index);
      const h = Math.abs(item.hist) * scale;
      const y = item.hist >= 0 ? midY - h : midY;
      return `<rect class="volume-bar" x="${(x - histWidth / 2).toFixed(2)}" y="${y.toFixed(2)}" width="${histWidth.toFixed(2)}" height="${h.toFixed(2)}" fill="${item.hist >= 0 ? "var(--red)" : "var(--green)"}"></rect>`;
    })
    .join("");
  const line = (key, color) => {
    const pts = macd.map((item, index) => `${xFor(index).toFixed(2)},${(midY - item[key] * scale).toFixed(2)}`).join(" ");
    return `<polyline class="indicator-line" points="${pts}" stroke="${color}"></polyline>`;
  };
  return `<line class="axis-line" x1="${leftPad}" y1="${midY}" x2="${chartRight}" y2="${midY}"></line>${hist}${line("dif", "#d08a1f")}${line("dea", "#0a66d9")}`;
}

function renderKdj(bars, xFor, height, bottomPad, indicatorHeight) {
  const kdj = computeKdj(bars);
  const top = height - bottomPad - indicatorHeight + 8;
  const bottom = height - bottomPad - 6;
  const y = (value) => bottom - (Math.max(0, Math.min(100, value)) / 100) * (bottom - top);
  const line = (key, color) => {
    const pts = kdj.map((item, index) => `${xFor(index).toFixed(2)},${y(item[key]).toFixed(2)}`).join(" ");
    return `<polyline class="indicator-line" points="${pts}" stroke="${color}"></polyline>`;
  };
  return `${line("k", "#d08a1f")}${line("d", "#245a8d")}${line("j", "#b4232a")}`;
}

function renderDrawings() {
  if (!chartCache) return "";
  return state.drawings
    .map((drawing) => {
      if (drawing.symbol !== state.symbol) return "";
      if (drawing.type === "horizontal") {
        const y = chartCache.y(drawing.price);
        return `<line class="draw-line" x1="${chartCache.pad}" y1="${y.toFixed(2)}" x2="${chartCache.chartRight}" y2="${y.toFixed(2)}"></line>`;
      }
      if (drawing.type === "trend") {
        if (drawing.startIndex < chartCache.rangeStart && drawing.endIndex < chartCache.rangeStart) return "";
        if (drawing.startIndex >= chartCache.rangeEnd && drawing.endIndex >= chartCache.rangeEnd) return "";
        const x1 = chartCache.xForAbsolute(drawing.startIndex);
        const y1 = chartCache.y(drawing.startPrice);
        const x2 = chartCache.xForAbsolute(drawing.endIndex);
        const y2 = chartCache.y(drawing.endPrice);
        return `<line class="draw-line" x1="${x1.toFixed(2)}" y1="${y1.toFixed(2)}" x2="${x2.toFixed(2)}" y2="${y2.toFixed(2)}"></line>`;
      }
      return "";
    })
    .join("");
}

function attachChartInteractions() {
  const svg = document.getElementById("daily-chart");
  const hitbox = document.getElementById("chart-hitbox");
  const layer = document.getElementById("crosshair-layer");
  if (!chartCache || !hitbox || !layer) return;
  hitbox.addEventListener("mousemove", (event) => {
    const point = svgPoint(svg, event);
    const index = nearestChartIndex(point.x);
    const bar = chartCache.visible[index];
    if (!bar) return;
    const x = chartCache.xFor(index);
    const y = chartCache.y(Number(bar.close));
    const tooltipX = x > chartCache.width * 0.58 ? x - 238 : x + 12;
    const tooltipY = y < 92 ? y + 12 : y - 78;
    layer.style.display = "";
    layer.innerHTML = `
      <line class="crosshair-line" x1="${x.toFixed(2)}" y1="${chartCache.topPad}" x2="${x.toFixed(2)}" y2="${chartCache.height - chartCache.bottomPad}"></line>
      <line class="crosshair-line" x1="${chartCache.pad}" y1="${y.toFixed(2)}" x2="${chartCache.chartRight}" y2="${y.toFixed(2)}"></line>
      <rect class="chart-tooltip-bg" x="${tooltipX.toFixed(2)}" y="${tooltipY.toFixed(2)}" width="226" height="66" rx="6"></rect>
      <text class="chart-tooltip-text" x="${(tooltipX + 8).toFixed(2)}" y="${(tooltipY + 18).toFixed(2)}">${escapeHtml(bar.date || bar.time || "")}</text>
      <text class="chart-tooltip-text" x="${(tooltipX + 8).toFixed(2)}" y="${(tooltipY + 36).toFixed(2)}">开 ${formatPrice(bar.open)} 高 ${formatPrice(bar.high)} 低 ${formatPrice(bar.low)} 收 ${formatPrice(bar.close)}</text>
      <text class="chart-tooltip-text" x="${(tooltipX + 8).toFixed(2)}" y="${(tooltipY + 54).toFixed(2)}">量 ${formatNumber(bar.volume)} 额 ${formatMoney(bar.amount)}</text>
    `;
  });
  hitbox.addEventListener(
    "wheel",
    (event) => {
      event.preventDefault();
      const point = svgPoint(svg, event);
      if (event.shiftKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
        panChartByWheel(Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY);
        return;
      }
      zoomChartAt(point.x, event.deltaY);
    },
    { passive: false }
  );
  hitbox.addEventListener("mouseleave", () => {
    layer.style.display = "none";
  });
  hitbox.addEventListener("click", (event) => {
    if (state.drawTool === "crosshair") return;
    const point = svgPoint(svg, event);
    const index = nearestChartIndex(point.x);
    const price = priceFromY(point.y);
    if (state.drawTool === "horizontal") {
      state.drawings.push({ symbol: state.symbol, type: "horizontal", price });
      renderTradingView();
      return;
    }
    if (state.drawTool === "trend") {
      if (!state.pendingTrendPoint) {
        state.pendingTrendPoint = { index: chartCache.rangeStart + index, price };
      } else {
        state.drawings.push({
          symbol: state.symbol,
          type: "trend",
          startIndex: state.pendingTrendPoint.index,
          startPrice: state.pendingTrendPoint.price,
          endIndex: chartCache.rangeStart + index,
          endPrice: price,
        });
        state.pendingTrendPoint = null;
        renderTradingView();
      }
    }
  });
}

function svgPoint(svg, event) {
  const point = svg.createSVGPoint();
  point.x = event.clientX;
  point.y = event.clientY;
  return point.matrixTransform(svg.getScreenCTM().inverse());
}

function nearestChartIndex(x) {
  return Math.max(0, Math.min(chartCache.visible.length - 1, Math.round((x - chartCache.pad) / chartCache.xStep)));
}

function priceFromY(y) {
  const ratio = clamp((chartCache.priceBottom - y) / (chartCache.priceBottom - chartCache.topPad), 0, 1);
  const displayValue = ratio * chartCache.span + chartCache.minDisplay;
  if (state.scale === "log") return Math.exp(displayValue);
  if (state.scale === "percent") {
    const base = Number(chartCache.visible[0]?.close || 0);
    return base * (1 + displayValue / 100);
  }
  return displayValue;
}

function renderDailyTape(bars) {
  document.getElementById("bar-meta").textContent = `${bars.length} bars`;
  document.getElementById("daily-tape").innerHTML = bars
    .slice(-24)
    .reverse()
    .map(
      (bar) => `
        <div class="bar-row">
          <strong>${escapeHtml(bar.date)}</strong>
          <span>开 ${formatPrice(bar.open)}</span>
          <span>高 ${formatPrice(bar.high)}</span>
          <span>低 ${formatPrice(bar.low)}</span>
          <span>收 ${formatPrice(bar.close)}</span>
          <span class="${Number(bar.pct_chg) >= 0 ? "up" : "down"}">${formatSignedPct(bar.pct_chg)}</span>
          <span>${formatMoney(bar.amount)}</span>
        </div>`
    )
    .join("");
}

function renderLedger() {
  document.getElementById("ledger").innerHTML = state.ledger.length
    ? state.ledger
        .slice(0, 8)
        .map(
          (item) => `
            <div class="ledger-row">
              <strong>${escapeHtml(item.side.toUpperCase())} ${escapeHtml(item.symbol)} ${formatNumber(item.quantity)}</strong>
              <span>${formatPrice(item.price)} / ${formatMoney(item.notional)} / ${escapeHtml(item.time)}</span>
            </div>`
        )
        .join("")
    : `<p class="muted">暂无成交</p>`;
}

async function selectSymbol(symbol) {
  const normalized = normalizeSymbol(symbol);
  state.symbol = normalized;
  if (!dailyData.symbols[normalized]) {
    await loadSymbolFromApi(normalized);
  }
  render();
}

function addManualStrategySymbol(symbol) {
  if (!symbol || selectedSymbols().includes(symbol)) return;
  state.manualStrategySymbols.push(symbol);
  state.showMode = "selected";
  renderSelection();
}

async function loadSymbolFromApi(symbol) {
  if (!window.location.protocol.startsWith("http")) return;
  try {
    const response = await fetch(`/api/daily/bars?symbol=${encodeURIComponent(symbol)}&limit=260`);
    if (!response.ok) return;
    const payload = await response.json();
    if (!payload.bars || !payload.bars.length) return;
    const bars = payload.bars;
    const latest = bars[bars.length - 1];
    dailyData.symbols[symbol] = {
      symbol,
      name: symbolIndexBySymbol[symbol]?.name || "",
      security_id: latest.security_id,
      latest,
      stats: buildStats(bars),
      signal: null,
      target: null,
      bars,
    };
  } catch (_error) {
    return;
  }
}

async function loadIntradayForCurrent() {
  const stock = currentStock();
  if (!stock || stock.intradayLoaded) return;
  stock.intradayLoaded = true;
  if (!window.location.protocol.startsWith("http")) return;
  try {
    const response = await fetch(`/api/intraday/bars?symbol=${encodeURIComponent(stock.symbol)}&limit=240`);
    if (!response.ok) return;
    const payload = await response.json();
    if (!payload.bars || !payload.bars.length) return;
    stock.intradayBars = payload.bars.map((bar) => ({
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
  } catch (_error) {
    return;
  }
}

function submitOrder(side) {
  const stock = currentStock();
  if (!stock) return;
  const price = Number(stock.latest?.close || 0);
  let quantity = roundLot(Number(document.getElementById("order-quantity").value || 0));
  if (quantity <= 0 || price <= 0) return;
  const notional = quantity * price;
  const fee = estimateFee(side, notional);
  if (side === "buy") {
    while (quantity > 0 && quantity * price + estimateFee(side, quantity * price) > state.cash + 1e-9) {
      quantity -= 100;
    }
    if (quantity <= 0) return;
    const cappedNotional = quantity * price;
    state.cash -= cappedNotional + estimateFee(side, cappedNotional);
    state.positions[stock.symbol] = Number(state.positions[stock.symbol] || 0) + quantity;
    recordFill(side, stock.symbol, quantity, price);
  } else {
    quantity = Math.min(quantity, Number(state.positions[stock.symbol] || 0));
    quantity = roundLot(quantity);
    if (quantity <= 0) return;
    const sellNotional = quantity * price;
    state.cash += sellNotional - estimateFee(side, sellNotional);
    state.positions[stock.symbol] = Number(state.positions[stock.symbol] || 0) - quantity;
    if (state.positions[stock.symbol] <= 0) delete state.positions[stock.symbol];
    recordFill(side, stock.symbol, quantity, price);
  }
  renderTradingView();
}

function applyStrategyPlan() {
  resetAccountFromStrategy();
  const decision = currentDecision();
  (decision.target_positions || []).forEach((target) => {
    const stock = dailyData.symbols[target.symbol];
    if (!stock) return;
    const price = Number(target.reference_price || stock.latest?.close || 0);
    let quantity = roundLot(Number(target.target_quantity || 0));
    while (quantity > 0 && quantity * price + estimateFee("buy", quantity * price) > state.cash + 1e-9) {
      quantity -= 100;
    }
    if (quantity <= 0) return;
    const notional = quantity * price;
    state.cash -= notional + estimateFee("buy", notional);
    state.positions[target.symbol] = Number(state.positions[target.symbol] || 0) + quantity;
    recordFill("buy", target.symbol, quantity, price);
  });
}

function recordFill(side, symbol, quantity, price) {
  state.ledger.unshift({
    side,
    symbol,
    quantity,
    price,
    notional: quantity * price,
    time: new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }),
  });
}

function resetAccountFromStrategy() {
  state.cash = Number(currentStrategy()?.initial_cash || 100000);
  state.positions = {};
  state.ledger = [];
}

function currentStrategy() {
  return (dailyData.strategies || []).find((item) => item.profile_name === state.profileName);
}

function currentDecision() {
  return dailyData.decisions?.[state.profileName] || {};
}

function currentStock() {
  return dailyData.symbols?.[state.symbol];
}

function accountEquity() {
  return (
    state.cash +
    Object.entries(state.positions).reduce((total, [symbol, quantity]) => {
      const close = Number(dailyData.symbols?.[symbol]?.latest?.close || 0);
      return total + Number(quantity) * close;
    }, 0)
  );
}

function suggestedQuantity(stock) {
  const target = stock.target || {};
  if (target.target_quantity) return target.target_quantity;
  const price = Number(stock.latest?.close || 0);
  if (price <= 0) return 100;
  return Math.max(100, roundLot((state.cash * 0.2) / price));
}

function buildStats(bars) {
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

function selectedSymbols() {
  return [...(currentDecision().selected_symbols || []), ...state.manualStrategySymbols.filter((symbol) => !(currentDecision().selected_symbols || []).includes(symbol))];
}

function symbolRow(symbol) {
  const stock = dailyData.symbols?.[symbol];
  const latest = stock?.latest || {};
  const stats = stock?.stats || {};
  return {
    rank: "自选",
    symbol,
    name: stock?.name || symbolIndexBySymbol[symbol]?.name || "",
    score_pct: 0,
    close: latest.close || 0,
    pct_chg: latest.pct_chg || 0,
    return_20d_pct: stats.return_20d_pct || 0,
    amount: latest.amount || 0,
  };
}

function aggregateBars(bars, period) {
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

function movingAverage(bars, windowSize) {
  return bars.map((_, index) => {
    if (index + 1 < windowSize) return null;
    const slice = bars.slice(index + 1 - windowSize, index + 1);
    return slice.reduce((sum, bar) => sum + Number(bar.close), 0) / windowSize;
  });
}

function bollinger(bars, windowSize) {
  const mid = movingAverage(bars, windowSize);
  const upper = [];
  const lower = [];
  bars.forEach((_, index) => {
    if (index + 1 < windowSize || mid[index] === null) {
      upper.push(null);
      lower.push(null);
      return;
    }
    const slice = bars.slice(index + 1 - windowSize, index + 1).map((bar) => Number(bar.close));
    const variance = slice.reduce((sum, value) => sum + Math.pow(value - mid[index], 2), 0) / windowSize;
    const sd = Math.sqrt(variance);
    upper.push(mid[index] + 2 * sd);
    lower.push(mid[index] - 2 * sd);
  });
  return { upper, mid, lower };
}

function computeMacd(bars) {
  const closes = bars.map((bar) => Number(bar.close));
  const ema12 = ema(closes, 12);
  const ema26 = ema(closes, 26);
  const dif = closes.map((_, index) => ema12[index] - ema26[index]);
  const dea = ema(dif, 9);
  return closes.map((_, index) => ({ dif: dif[index], dea: dea[index], hist: (dif[index] - dea[index]) * 2 }));
}

function ema(values, period) {
  const alpha = 2 / (period + 1);
  const out = [];
  values.forEach((value, index) => {
    out.push(index === 0 ? value : out[index - 1] * (1 - alpha) + value * alpha);
  });
  return out;
}

function computeKdj(bars) {
  let k = 50;
  let d = 50;
  return bars.map((bar, index) => {
    const windowRows = bars.slice(Math.max(0, index - 8), index + 1);
    const low = Math.min(...windowRows.map((item) => Number(item.low)));
    const high = Math.max(...windowRows.map((item) => Number(item.high)));
    const rsv = high === low ? 50 : ((Number(bar.close) - low) / (high - low)) * 100;
    k = (2 / 3) * k + (1 / 3) * rsv;
    d = (2 / 3) * d + (1 / 3) * k;
    return { k, d, j: 3 * k - 2 * d };
  });
}

function estimateFee(side, notional) {
  if (notional <= 0) return 0;
  const commission = Math.max(5, notional * 2.5 / 10000);
  const transfer = notional * 0.1 / 10000;
  const stamp = side === "sell" ? notional * 5 / 10000 : 0;
  return commission + transfer + stamp;
}

function normalizeSymbol(value) {
  const raw = String(value || "").trim().split(/\s+/)[0].toUpperCase();
  if (!raw) return state.symbol;
  if (raw.includes(".")) return raw;
  if (raw.startsWith("6")) return `${raw.padStart(6, "0")}.SH`;
  if (raw.startsWith("8") || raw.startsWith("4") || raw.startsWith("9")) return `${raw.padStart(6, "0")}.BJ`;
  return `${raw.padStart(6, "0")}.SZ`;
}

function roundLot(value) {
  return Math.floor(Number(value || 0) / 100) * 100;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
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

function formatSignedPct(value) {
  const number = Number(value || 0);
  return `${number >= 0 ? "+" : ""}${number.toFixed(2)}%`;
}

function formatReadinessStatus(value) {
  const labels = {
    full_intraday_ready: "5m完整",
    selected_intraday_ready: "选股可回放",
    partial_intraday_ready: "日线完整",
    daily_ready: "日线完整",
    blocked: "受阻",
  };
  return labels[String(value || "")] || "日线完整";
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
