import { clamp, escapeHtml, formatMoney, formatNumber, formatPrice } from "./format.js";

const MIN_VISIBLE_BARS = 24;
const DEFAULT_VISIBLE_BARS = 150;
const DEFAULT_MA_PERIODS = [5, 10, 20, 30, 60, 250];
const MA_COLORS = ["#d08a1f", "#7b5fc8", "#176d67", "#c1467a", "#0a66d9", "#6e6e73", "#b76e00", "#087e8b"];

export class KLineChart {
  constructor({ svg, zoomRange, zoomLabel, zoomReset, noteEl }) {
    this.svg = svg;
    this.zoomRange = zoomRange;
    this.zoomLabel = zoomLabel;
    this.zoomReset = zoomReset;
    this.noteEl = noteEl;
    this.state = {
      symbol: "",
      period: "daily",
      indicator: "VOL",
      indicators: ["VOL"],
      overlays: { MA: true, BOLL: false },
      maPeriods: DEFAULT_MA_PERIODS,
      drawTool: "crosshair",
      scale: "normal",
    };
    this.chartRanges = {};
    this.drawings = [];
    this.pendingTrendPoint = null;
    this.pointerDrawing = null;
    this.cache = null;
    this.bars = [];
    this.bindZoomControls();
    this.bindKeyboardShortcuts();
  }

  update(bars, nextState = {}) {
    this.bars = bars || [];
    const nextIndicators = nextState.indicators || (nextState.indicator ? [nextState.indicator] : this.state.indicators);
    const previousSymbol = this.state.symbol;
    const previousDrawTool = this.state.drawTool;
    this.state = {
      ...this.state,
      ...nextState,
      indicators: normalizeIndicators(nextIndicators),
      indicator: normalizeIndicators(nextIndicators)[0] || "VOL",
      overlays: { ...this.state.overlays, ...(nextState.overlays || {}) },
      maPeriods: normalizeMaPeriods(nextState.maPeriods || this.state.maPeriods),
    };
    if (previousDrawTool !== this.state.drawTool || previousSymbol !== this.state.symbol) {
      this.pendingTrendPoint = null;
      this.pointerDrawing = null;
      this.setDrawingNote();
    }
    this.render();
  }

  clearDrawings() {
    this.drawings = [];
    this.pendingTrendPoint = null;
    this.pointerDrawing = null;
    this.setDrawingNote("画线已清除。");
    this.render();
  }

  undoDrawing() {
    if (this.pendingTrendPoint) {
      this.pendingTrendPoint = null;
      this.pointerDrawing = null;
      this.setDrawingNote("已取消当前画线。");
      this.render();
      return true;
    }
    const index = [...this.drawings].map((drawing, drawingIndex) => ({ drawing, drawingIndex })).reverse().find((item) => item.drawing.symbol === this.state.symbol)?.drawingIndex;
    if (index === undefined) {
      this.setDrawingNote("当前股票没有可撤回的画线。");
      return false;
    }
    this.drawings.splice(index, 1);
    this.setDrawingNote("已撤回上一根画线。");
    this.render();
    return true;
  }

  resetRange() {
    this.resetChartRange();
    this.render();
  }

  bindZoomControls() {
    this.zoomReset?.addEventListener("click", () => this.resetRange());
    this.zoomRange?.addEventListener("input", (event) => {
      const range = this.ensureChartRange();
      const visibleCount = range.end - range.start;
      const maxStart = Math.max(0, this.bars.length - visibleCount);
      const start = clamp(Number(event.target.value || 0), 0, maxStart);
      this.chartRanges[this.rangeKey()] = { start, end: start + visibleCount, total: this.bars.length };
      this.render();
    });
  }

  bindKeyboardShortcuts() {
    document.addEventListener("keydown", (event) => {
      if (!(event.metaKey || event.ctrlKey) || event.key.toLowerCase() !== "z") return;
      const active = document.activeElement;
      if (active && ["INPUT", "TEXTAREA", "SELECT"].includes(active.tagName)) return;
      event.preventDefault();
      this.undoDrawing();
    });
  }

  render() {
    if (!this.bars.length) {
      this.svg.innerHTML = "";
      this.cache = null;
      this.updateZoomControls({ start: 0, end: 0 });
      return;
    }
    const width = 880;
    const height = 460;
    const leftPad = 32;
    const rightPad = 56;
    const topPad = 24;
    const bottomPad = 28;
    const indicators = normalizeIndicators(this.state.indicators);
    const indicatorHeight = indicators.length ? 84 : 0;
    const indicatorTotalHeight = indicatorHeight * indicators.length;
    const chartRight = width - rightPad;
    const range = this.ensureChartRange();
    const visible = this.bars.slice(range.start, range.end);
    const priceBottom = height - bottomPad - indicatorTotalHeight;
    const displayValues = visible.flatMap((bar) => [this.displayPrice(Number(bar.high), visible), this.displayPrice(Number(bar.low), visible)]);
    const maxDisplay = Math.max(...displayValues);
    const minDisplay = Math.min(...displayValues);
    const span = maxDisplay - minDisplay || 1;
    const xStep = (chartRight - leftPad) / Math.max(visible.length - 1, 1);
    const xFor = (index) => leftPad + index * xStep;
    const xForAbsolute = (absoluteIndex) => leftPad + (absoluteIndex - range.start) * xStep;
    const y = (value) => priceBottom - ((this.displayPrice(value, visible) - minDisplay) / span) * (priceBottom - topPad);
    const candleBodyWidth = Math.max(3, Math.min(12, xStep * 0.58));
    const closePoints = visible.map((bar, index) => `${xFor(index).toFixed(2)},${y(Number(bar.close)).toFixed(2)}`).join(" ");
    const area = `${leftPad},${priceBottom} ${closePoints} ${chartRight},${priceBottom}`;

    this.cache = {
      visible,
      allBars: this.bars,
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
      minDisplay,
      maxDisplay,
      span,
    };

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
        return `
          <line class="candle-wick" x1="${x.toFixed(2)}" y1="${y(high).toFixed(2)}" x2="${x.toFixed(2)}" y2="${y(low).toFixed(2)}" stroke="${color}"></line>
          <rect class="candle-body" x="${(x - candleBodyWidth / 2).toFixed(2)}" y="${bodyTop.toFixed(2)}" width="${candleBodyWidth.toFixed(2)}" height="${bodyHeight.toFixed(2)}" fill="${up ? "rgba(217,45,32,0.22)" : "rgba(3,152,85,0.2)"}" stroke="${color}"></rect>`;
      })
      .join("");
    const overlays = [
      ...(this.state.overlays.MA ? this.renderMaLines(visible, xFor, y) : []),
      ...(this.state.overlays.BOLL ? this.renderBollLines(visible, xFor, y) : []),
    ].join("");
    const indicator = this.renderIndicators(indicators, visible, xFor, priceBottom, indicatorHeight, chartRight, xStep, candleBodyWidth);
    this.svg.innerHTML = `
      ${this.renderScaffold(visible, minDisplay, span)}
      <polyline class="chart-area" points="${area}"></polyline>
      ${candles}
      <polyline class="chart-line" points="${closePoints}"></polyline>
      ${overlays}
      <line class="axis-line" x1="${leftPad}" y1="${priceBottom}" x2="${chartRight}" y2="${priceBottom}"></line>
      ${indicator}
      ${this.renderDrawings()}
      <g id="drawing-preview-layer"></g>
      <g id="crosshair-layer" style="display:none"></g>
      <rect id="chart-hitbox" x="${leftPad}" y="${topPad}" width="${chartRight - leftPad}" height="${priceBottom - topPad}" fill="transparent"></rect>
    `;
    this.updateZoomControls(range);
    this.attachInteractions();
  }

  renderScaffold(visible, minDisplay, span) {
    const priceTicks = Array.from({ length: 5 }, (_, index) => minDisplay + (span * index) / 4);
    const priceGrid = priceTicks
      .map((value) => {
        const yPos = this.cache.priceBottom - ((value - minDisplay) / span) * (this.cache.priceBottom - this.cache.topPad);
        return `
          <line class="grid-line" x1="${this.cache.pad}" y1="${yPos.toFixed(2)}" x2="${this.cache.chartRight}" y2="${yPos.toFixed(2)}"></line>
          <text class="axis-label" x="${(this.cache.chartRight + 8).toFixed(2)}" y="${(yPos + 4).toFixed(2)}">${escapeHtml(this.axisLabelFromDisplay(value, visible))}</text>`;
      })
      .join("");
    const count = visible.length;
    const dateIndices = [...new Set([0, Math.floor((count - 1) * 0.25), Math.floor((count - 1) * 0.5), Math.floor((count - 1) * 0.75), count - 1])].filter((index) => index >= 0);
    const dateGrid = dateIndices
      .map((index) => {
        const x = this.cache.xFor(index);
        const date = visible[index]?.date || visible[index]?.time || "";
        return `
          <line class="grid-line" x1="${x.toFixed(2)}" y1="${this.cache.topPad}" x2="${x.toFixed(2)}" y2="${(this.cache.height - this.cache.bottomPad).toFixed(2)}"></line>
          <text class="date-label" x="${x.toFixed(2)}" y="${(this.cache.height - 8).toFixed(2)}" text-anchor="${index === 0 ? "start" : index === count - 1 ? "end" : "middle"}">${escapeHtml(String(date).slice(0, 10))}</text>`;
      })
      .join("");
    return `
      ${priceGrid}
      ${dateGrid}
      <line class="axis-line" x1="${this.cache.chartRight}" y1="${this.cache.topPad}" x2="${this.cache.chartRight}" y2="${(this.cache.height - this.cache.bottomPad).toFixed(2)}"></line>
      <line class="axis-line" x1="${this.cache.pad}" y1="${(this.cache.height - this.cache.bottomPad).toFixed(2)}" x2="${this.cache.chartRight}" y2="${(this.cache.height - this.cache.bottomPad).toFixed(2)}"></line>`;
  }

  attachInteractions() {
    const hitbox = this.svg.querySelector("#chart-hitbox");
    const layer = this.svg.querySelector("#crosshair-layer");
    const previewLayer = this.svg.querySelector("#drawing-preview-layer");
    if (!this.cache || !hitbox || !layer || !previewLayer) return;
    hitbox.addEventListener("pointerdown", (event) => this.handlePointerDown(event, previewLayer));
    hitbox.addEventListener("pointerup", (event) => this.handlePointerUp(event, previewLayer));
    hitbox.addEventListener("pointercancel", () => {
      this.pointerDrawing = null;
      this.renderDrawingPreview(null, previewLayer);
    });
    hitbox.addEventListener("pointermove", (event) => {
      this.renderCrosshair(event, layer);
      this.renderDrawingPreview(event, previewLayer);
    });
    hitbox.addEventListener(
      "wheel",
      (event) => {
        event.preventDefault();
        const point = this.svgPoint(event);
        if (event.shiftKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
          this.panByWheel(Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY);
          return;
        }
        this.zoomAt(point.x, event.deltaY);
      },
      { passive: false }
    );
    hitbox.addEventListener("pointerleave", () => {
      layer.style.display = "none";
      if (!this.pendingTrendPoint) this.renderDrawingPreview(null, previewLayer);
    });
  }

  renderCrosshair(event, layer) {
    const point = this.svgPoint(event);
    const index = this.nearestIndex(point.x);
    const bar = this.cache.visible[index];
    if (!bar) return;
    const x = this.cache.xFor(index);
    const y = this.cache.y(Number(bar.close));
    const tooltipX = x > this.cache.width * 0.58 ? x - 238 : x + 12;
    const tooltipY = y < 92 ? y + 12 : y - 78;
    layer.style.display = "";
    layer.innerHTML = `
      <line class="crosshair-line" x1="${x.toFixed(2)}" y1="${this.cache.topPad}" x2="${x.toFixed(2)}" y2="${this.cache.height - this.cache.bottomPad}"></line>
      <line class="crosshair-line" x1="${this.cache.pad}" y1="${y.toFixed(2)}" x2="${this.cache.chartRight}" y2="${y.toFixed(2)}"></line>
      <rect class="chart-tooltip-bg" x="${tooltipX.toFixed(2)}" y="${tooltipY.toFixed(2)}" width="226" height="66" rx="6"></rect>
      <text class="chart-tooltip-text" x="${(tooltipX + 8).toFixed(2)}" y="${(tooltipY + 18).toFixed(2)}">${escapeHtml(bar.date || bar.time || "")}</text>
      <text class="chart-tooltip-text" x="${(tooltipX + 8).toFixed(2)}" y="${(tooltipY + 36).toFixed(2)}">开 ${formatPrice(bar.open)} 高 ${formatPrice(bar.high)} 低 ${formatPrice(bar.low)} 收 ${formatPrice(bar.close)}</text>
      <text class="chart-tooltip-text" x="${(tooltipX + 8).toFixed(2)}" y="${(tooltipY + 54).toFixed(2)}">量 ${formatNumber(bar.volume)} 额 ${formatMoney(bar.amount)}</text>`;
  }

  handlePointerDown(event, previewLayer) {
    if (!this.isDrawingTool()) return;
    event.preventDefault();
    const anchor = this.anchorFromEvent(event);
    if (!anchor) return;
    if (this.state.drawTool === "horizontal") {
      this.drawings.push({ symbol: this.state.symbol, type: "horizontal", price: anchor.price });
      this.setDrawingNote(`已添加水平线 ${formatPrice(anchor.price)}。`);
      this.render();
      return;
    }
    event.currentTarget?.setPointerCapture?.(event.pointerId);
    if (this.pendingTrendPoint) {
      this.pointerDrawing = { mode: "finish", start: this.pendingTrendPoint, dragStart: anchor, moved: false };
      this.renderDrawingPreview(event, previewLayer);
      return;
    }
    this.pendingTrendPoint = anchor;
    this.pointerDrawing = { mode: "start", start: anchor, dragStart: anchor, moved: false };
    this.setDrawingNote(`${this.drawToolLabel()}已选择起点，移动鼠标预览，点击终点确认。`);
    this.renderDrawingPreview(event, previewLayer);
  }

  handlePointerUp(event, previewLayer) {
    if (!this.isDrawingTool() || this.state.drawTool === "horizontal") return;
    event.currentTarget?.releasePointerCapture?.(event.pointerId);
    const anchor = this.anchorFromEvent(event);
    if (!anchor || !this.pendingTrendPoint) return;
    const shouldCommit = this.pointerDrawing?.mode === "finish" || this.pointerDrawing?.moved;
    if (shouldCommit && this.validTwoPointDrawing(this.pendingTrendPoint, anchor)) {
      this.pushTwoPointDrawing(this.pendingTrendPoint, anchor);
      this.pendingTrendPoint = null;
      this.pointerDrawing = null;
      this.renderDrawingPreview(null, previewLayer);
      this.render();
      return;
    }
    this.pointerDrawing = null;
    this.renderDrawingPreview(event, previewLayer);
  }

  renderDrawingPreview(event, previewLayer) {
    if (!previewLayer) return;
    if (!this.isDrawingTool() || this.state.drawTool === "horizontal") {
      previewLayer.innerHTML = "";
      return;
    }
    const current = event ? this.anchorFromEvent(event) : null;
    if (this.pointerDrawing && current) {
      this.pointerDrawing.moved = this.pointerDistance(this.pointerDrawing.dragStart, current) > 4;
    }
    if (!this.pendingTrendPoint) {
      previewLayer.innerHTML = "";
      return;
    }
    previewLayer.innerHTML = this.renderPreviewDrawing(this.pendingTrendPoint, current || this.pendingTrendPoint);
  }

  pushTwoPointDrawing(start, end) {
    this.drawings.push({
      symbol: this.state.symbol,
      type: this.state.drawTool === "fibonacci" ? "fibonacci" : "trend",
      startIndex: start.index,
      startPrice: start.price,
      endIndex: end.index,
      endPrice: end.price,
    });
    this.setDrawingNote(`已添加${this.drawToolLabel()}。Cmd/Ctrl+Z 可撤回。`);
  }

  validTwoPointDrawing(start, end) {
    return start.index !== end.index || Math.abs(start.price - end.price) > 0.000001;
  }

  isDrawingTool() {
    return ["trend", "horizontal", "fibonacci"].includes(this.state.drawTool);
  }

  drawToolLabel() {
    if (this.state.drawTool === "fibonacci") return "黄金分割线";
    if (this.state.drawTool === "trend") return "趋势线";
    if (this.state.drawTool === "horizontal") return "水平线";
    return "画线";
  }

  anchorFromEvent(event) {
    if (!this.cache) return null;
    const point = this.svgPoint(event);
    const index = this.nearestIndex(point.x);
    return {
      index: this.cache.rangeStart + index,
      visibleIndex: index,
      price: this.priceFromY(point.y),
      x: this.cache.xFor(index),
      y: clamp(point.y, this.cache.topPad, this.cache.priceBottom),
    };
  }

  pointerDistance(a, b) {
    return Math.hypot((a?.x || 0) - (b?.x || 0), (a?.y || 0) - (b?.y || 0));
  }

  setDrawingNote(message = "") {
    if (!this.noteEl) return;
    if (message) {
      this.noteEl.textContent = message;
      return;
    }
    if (this.state.drawTool === "trend") {
      this.noteEl.textContent = "趋势线：点击起点，移动鼠标预览，再点击终点确认。Cmd/Ctrl+Z 撤回。";
    } else if (this.state.drawTool === "fibonacci") {
      this.noteEl.textContent = "黄金分割线：点击高低两个锚点，自动生成 23.6 / 38.2 / 50 / 61.8 / 78.6% 辅助线。";
    } else if (this.state.drawTool === "horizontal") {
      this.noteEl.textContent = "水平线：点击价格位置即可添加，Cmd/Ctrl+Z 撤回。";
    } else {
      this.noteEl.textContent = "十字光标：移动鼠标查看K线信息。";
    }
  }

  renderDrawings() {
    if (!this.cache) return "";
    const committed = this.drawings
      .map((drawing) => {
        if (drawing.symbol !== this.state.symbol) return "";
        if (drawing.type === "horizontal") {
          const y = this.cache.y(drawing.price);
          return `<line class="draw-line" x1="${this.cache.pad}" y1="${y.toFixed(2)}" x2="${this.cache.chartRight}" y2="${y.toFixed(2)}"></line>`;
        }
        if (drawing.type === "trend") {
          if (drawing.startIndex < this.cache.rangeStart && drawing.endIndex < this.cache.rangeStart) return "";
          if (drawing.startIndex >= this.cache.rangeEnd && drawing.endIndex >= this.cache.rangeEnd) return "";
          const x1 = this.cache.xForAbsolute(drawing.startIndex);
          const y1 = this.cache.y(drawing.startPrice);
          const x2 = this.cache.xForAbsolute(drawing.endIndex);
          const y2 = this.cache.y(drawing.endPrice);
          return `<line class="draw-line" x1="${x1.toFixed(2)}" y1="${y1.toFixed(2)}" x2="${x2.toFixed(2)}" y2="${y2.toFixed(2)}"></line>`;
        }
        if (drawing.type === "fibonacci") return this.renderFibonacci(drawing);
        return "";
      })
      .join("");
    return `${committed}${this.renderPendingAnchor()}`;
  }

  renderPendingAnchor() {
    if (!this.pendingTrendPoint || !this.isDrawingTool() || this.state.drawTool === "horizontal") return "";
    const x = this.cache.xForAbsolute(this.pendingTrendPoint.index);
    const y = this.cache.y(this.pendingTrendPoint.price);
    if (x < this.cache.pad - 16 || x > this.cache.chartRight + 16 || y < this.cache.topPad - 16 || y > this.cache.priceBottom + 16) return "";
    return `
      <circle class="draw-anchor" cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="4"></circle>
      <text class="draw-status-label" x="${(x + 8).toFixed(2)}" y="${(y - 8).toFixed(2)}">起点</text>`;
  }

  renderPreviewDrawing(start, end) {
    if (!start || !end) return "";
    const drawing = {
      symbol: this.state.symbol,
      type: this.state.drawTool === "fibonacci" ? "fibonacci" : "trend",
      startIndex: start.index,
      startPrice: start.price,
      endIndex: end.index,
      endPrice: end.price,
    };
    const x1 = this.cache.xForAbsolute(drawing.startIndex);
    const y1 = this.cache.y(drawing.startPrice);
    const x2 = this.cache.xForAbsolute(drawing.endIndex);
    const y2 = this.cache.y(drawing.endPrice);
    const base = drawing.type === "fibonacci"
      ? this.renderFibonacci(drawing, { preview: true })
      : `<line class="draw-line draw-preview" x1="${x1.toFixed(2)}" y1="${y1.toFixed(2)}" x2="${x2.toFixed(2)}" y2="${y2.toFixed(2)}"></line>`;
    return `
      ${base}
      <circle class="draw-anchor" cx="${x1.toFixed(2)}" cy="${y1.toFixed(2)}" r="4"></circle>
      <circle class="draw-anchor draw-anchor-preview" cx="${x2.toFixed(2)}" cy="${y2.toFixed(2)}" r="4"></circle>`;
  }

  renderFibonacci(drawing, { preview = false } = {}) {
    const x1 = this.cache.xForAbsolute(drawing.startIndex);
    const y1 = this.cache.y(drawing.startPrice);
    const x2 = this.cache.xForAbsolute(drawing.endIndex);
    const y2 = this.cache.y(drawing.endPrice);
    const high = Math.max(drawing.startPrice, drawing.endPrice);
    const low = Math.min(drawing.startPrice, drawing.endPrice);
    const span = high - low || 1;
    const xStart = clamp(Math.min(x1, x2), this.cache.pad, this.cache.chartRight);
    const xEnd = this.cache.chartRight;
    const className = preview ? "fib-line fib-preview" : "fib-line";
    const levels = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1];
    const lines = levels
      .map((level) => {
        const price = high - span * level;
        const y = this.cache.y(price);
        if (y < this.cache.topPad - 12 || y > this.cache.priceBottom + 12) return "";
        const major = level === 0 || level === 0.5 || level === 1 ? " is-major" : "";
        const label = `${this.formatFibLevel(level)} ${formatPrice(price)}`;
        return `
          <line class="${className}${major}" x1="${xStart.toFixed(2)}" y1="${y.toFixed(2)}" x2="${xEnd.toFixed(2)}" y2="${y.toFixed(2)}"></line>
          <text class="fib-label" x="${(xStart + 6).toFixed(2)}" y="${(y - 4).toFixed(2)}">${escapeHtml(label)}</text>`;
      })
      .join("");
    return `
      <line class="${preview ? "draw-preview" : "fib-anchor-line"}" x1="${x1.toFixed(2)}" y1="${y1.toFixed(2)}" x2="${x2.toFixed(2)}" y2="${y2.toFixed(2)}"></line>
      ${lines}`;
  }

  formatFibLevel(level) {
    if (level === 0 || level === 0.5 || level === 1) return `${Math.round(level * 100)}%`;
    return `${(level * 100).toFixed(1)}%`;
  }

  ensureChartRange() {
    const total = this.bars.length;
    const key = this.rangeKey();
    if (!total) {
      this.chartRanges[key] = { start: 0, end: 0, total: 0 };
      return this.chartRanges[key];
    }
    const existing = this.chartRanges[key];
    const defaultCount = Math.min(total, isIntradayPeriod(this.state.period) ? 120 : DEFAULT_VISIBLE_BARS);
    if (!existing) {
      this.chartRanges[key] = { start: Math.max(0, total - defaultCount), end: total, total };
      return this.chartRanges[key];
    }
    const wasPinnedToLatest = existing.end >= existing.total;
    const visibleCount = clamp(existing.end - existing.start, this.minimumVisibleCount(total), total);
    const start = wasPinnedToLatest ? Math.max(0, total - visibleCount) : clamp(existing.start, 0, Math.max(0, total - visibleCount));
    this.chartRanges[key] = { start, end: start + visibleCount, total };
    return this.chartRanges[key];
  }

  resetChartRange() {
    const total = this.bars.length;
    const count = Math.min(total, isIntradayPeriod(this.state.period) ? 120 : DEFAULT_VISIBLE_BARS);
    this.chartRanges[this.rangeKey()] = { start: Math.max(0, total - count), end: total, total };
  }

  updateZoomControls(range) {
    if (!this.zoomRange || !this.zoomLabel || !this.zoomReset) return;
    const total = this.bars.length;
    const visibleCount = Math.max(0, range.end - range.start);
    const maxStart = Math.max(0, total - visibleCount);
    this.zoomRange.min = "0";
    this.zoomRange.max = String(maxStart);
    this.zoomRange.value = String(Math.min(maxStart, range.start));
    this.zoomRange.disabled = maxStart <= 0;
    this.zoomReset.disabled = total <= 0;
    const first = this.bars[range.start]?.date || this.bars[range.start]?.time || "";
    const last = this.bars[Math.max(range.start, range.end - 1)]?.date || this.bars[Math.max(range.start, range.end - 1)]?.time || "";
    this.zoomLabel.textContent = total ? `${first} - ${last} / ${visibleCount}根` : "暂无数据";
  }

  zoomAt(x, deltaY) {
    if (!this.cache?.allBars?.length) return;
    const total = this.cache.allBars.length;
    const range = this.ensureChartRange();
    const currentCount = range.end - range.start;
    const factor = deltaY < 0 ? 0.82 : 1.22;
    const nextCount = clamp(Math.round(currentCount * factor), this.minimumVisibleCount(total), total);
    if (nextCount === currentCount) return;
    const cursorRatio = clamp((x - this.cache.pad) / Math.max(this.cache.chartRight - this.cache.pad, 1), 0, 1);
    const anchorIndex = range.start + cursorRatio * Math.max(currentCount - 1, 0);
    const start = clamp(Math.round(anchorIndex - cursorRatio * Math.max(nextCount - 1, 0)), 0, Math.max(0, total - nextCount));
    this.chartRanges[this.rangeKey()] = { start, end: start + nextCount, total };
    this.render();
  }

  panByWheel(deltaPixels) {
    if (!this.cache?.allBars?.length) return;
    const total = this.cache.allBars.length;
    const range = this.ensureChartRange();
    const visibleCount = range.end - range.start;
    const deltaBars = Math.round(deltaPixels / Math.max(this.cache.xStep, 1));
    if (!deltaBars) return;
    const start = clamp(range.start + deltaBars, 0, Math.max(0, total - visibleCount));
    this.chartRanges[this.rangeKey()] = { start, end: start + visibleCount, total };
    this.render();
  }

  priceFromY(y) {
    const ratio = clamp((this.cache.priceBottom - y) / (this.cache.priceBottom - this.cache.topPad), 0, 1);
    const displayValue = ratio * this.cache.span + this.cache.minDisplay;
    if (this.state.scale === "log") return Math.exp(displayValue);
    if (this.state.scale === "percent") {
      const base = Number(this.cache.visible[0]?.close || 0);
      return base * (1 + displayValue / 100);
    }
    return displayValue;
  }

  displayPrice(value, bars) {
    if (this.state.scale === "log") return value > 0 ? Math.log(value) : 0;
    if (this.state.scale === "percent") {
      const base = Number(bars[0]?.close || 0);
      return base > 0 ? (value / base - 1) * 100 : 0;
    }
    return value;
  }

  axisLabelFromDisplay(value, visible) {
    if (this.state.scale === "percent") return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
    if (this.state.scale === "log") return formatPrice(Math.exp(value));
    return formatPrice(value);
  }

  rangeKey() {
    return `${this.state.symbol || ""}:${this.state.period || "daily"}`;
  }

  minimumVisibleCount(total) {
    return Math.min(total, isIntradayPeriod(this.state.period) ? 30 : MIN_VISIBLE_BARS);
  }

  nearestIndex(x) {
    return Math.max(0, Math.min(this.cache.visible.length - 1, Math.round((x - this.cache.pad) / this.cache.xStep)));
  }

  svgPoint(event) {
    const point = this.svg.createSVGPoint();
    point.x = event.clientX;
    point.y = event.clientY;
    return point.matrixTransform(this.svg.getScreenCTM().inverse());
  }

  renderMaLines(bars, xFor, y) {
    const rangeStart = this.cache?.rangeStart || 0;
    const rangeEnd = this.cache?.rangeEnd || rangeStart + bars.length;
    return normalizeMaPeriods(this.state.maPeriods)
      .map((period, index) => {
        const values = movingAverage(this.bars, period).slice(rangeStart, rangeEnd);
        return indicatorLine(values, xFor, y, MA_COLORS[index % MA_COLORS.length]);
      })
      .filter(Boolean);
  }

  renderBollLines(bars, xFor, y) {
    const boll = bollinger(bars, 20);
    return [indicatorLine(boll.upper, xFor, y, "#a15f9b"), indicatorLine(boll.mid, xFor, y, "#7d8b99"), indicatorLine(boll.lower, xFor, y, "#a15f9b")];
  }

  renderIndicators(indicators, bars, xFor, priceBottom, indicatorHeight, chartRight, xStep, candleBodyWidth) {
    return indicators
      .map((type, index) => {
        const top = priceBottom + indicatorHeight * index;
        const bottom = top + indicatorHeight;
        const label = `<text class="indicator-label" x="${this.cache.pad}" y="${(top + 15).toFixed(2)}">${escapeHtml(type)}</text>`;
        const divider = `<line class="axis-line" x1="${this.cache.pad}" y1="${top.toFixed(2)}" x2="${chartRight}" y2="${top.toFixed(2)}"></line>`;
        if (type === "MACD") return `${divider}${label}${this.renderMacd(bars, xFor, top, bottom, this.cache.pad, chartRight, xStep)}`;
        if (type === "KDJ") return `${divider}${label}${this.renderKdj(bars, xFor, top, bottom)}`;
        return `${divider}${label}${this.renderVolume(bars, xFor, top, bottom, candleBodyWidth)}`;
      })
      .join("");
  }

  renderVolume(bars, xFor, top, bottom, candleBodyWidth) {
    const maxVolume = Math.max(...bars.map((bar) => Number(bar.volume || 0)), 1);
    const usableHeight = Math.max(12, bottom - top - 22);
    return bars
      .map((bar, index) => {
        const x = xFor(index);
        const open = Number(bar.open);
        const close = Number(bar.close);
        const color = close >= open ? "var(--red)" : "var(--green)";
        const h = (Number(bar.volume || 0) / maxVolume) * usableHeight;
        return `<rect class="volume-bar" x="${(x - candleBodyWidth / 2).toFixed(2)}" y="${(bottom - 6 - h).toFixed(2)}" width="${candleBodyWidth.toFixed(2)}" height="${Math.max(1, h).toFixed(2)}" fill="${color}"></rect>`;
      })
      .join("");
  }

  renderMacd(bars, xFor, top, bottom, leftPad, chartRight, xStep) {
    const macd = computeMacd(bars);
    const values = macd.flatMap((item) => [item.dif, item.dea, item.hist]);
    const max = Math.max(...values.map(Math.abs), 1);
    const midY = top + (bottom - top) / 2;
    const scale = ((bottom - top) / 2 - 12) / max;
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

  renderKdj(bars, xFor, top, bottom) {
    const kdj = computeKdj(bars);
    const plotTop = top + 18;
    const plotBottom = bottom - 6;
    const y = (value) => plotBottom - (Math.max(0, Math.min(100, value)) / 100) * (plotBottom - plotTop);
    const line = (key, color) => {
      const pts = kdj.map((item, index) => `${xFor(index).toFixed(2)},${y(item[key]).toFixed(2)}`).join(" ");
      return `<polyline class="indicator-line" points="${pts}" stroke="${color}"></polyline>`;
    };
    return `${line("k", "#d08a1f")}${line("d", "#0a66d9")}${line("j", "#d92d20")}`;
  }
}

function normalizeIndicators(values) {
  const allowed = new Set(["VOL", "MACD", "KDJ"]);
  const out = [];
  (Array.isArray(values) ? values : [values]).forEach((value) => {
    const normalized = String(value || "").toUpperCase();
    if (allowed.has(normalized) && !out.includes(normalized)) out.push(normalized);
  });
  return out.slice(0, 2).length ? out.slice(0, 2) : ["VOL"];
}

function normalizeMaPeriods(values) {
  const out = [];
  (Array.isArray(values) ? values : DEFAULT_MA_PERIODS).forEach((value) => {
    const period = Math.round(Number(value || 0));
    if (period >= 1 && period <= 999 && !out.includes(period)) out.push(period);
  });
  return out.length ? out.slice(0, 8) : DEFAULT_MA_PERIODS;
}

function isIntradayPeriod(period) {
  return String(period || "").endsWith("m") || period === "minute";
}

function indicatorLine(values, xFor, y, color) {
  const points = values
    .map((value, index) => (value === null ? null : `${xFor(index).toFixed(2)},${y(value).toFixed(2)}`))
    .filter(Boolean)
    .join(" ");
  return points ? `<polyline class="indicator-line" points="${points}" stroke="${color}"></polyline>` : "";
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
