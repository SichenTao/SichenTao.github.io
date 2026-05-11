import { escapeHtml } from "./format.js";
import { normalizeSymbol, symbolIndex, symbolIndexBySymbol } from "./marketData.js";

export class SymbolSearch {
  constructor({ input, suggestions, onSelect }) {
    this.input = input;
    this.suggestions = suggestions;
    this.onSelect = onSelect;
    this.matches = [];
    this.activeIndex = -1;
    this.bind();
  }

  bind() {
    this.input.addEventListener("input", () => this.render(this.input.value));
    this.input.addEventListener("focus", () => this.render(this.input.value));
    this.input.addEventListener("keydown", (event) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        this.move(1);
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        this.move(-1);
      }
      if (event.key === "Enter") {
        event.preventDefault();
        this.selectActive();
      }
      if (event.key === "Escape") this.close();
    });
    document.addEventListener("click", (event) => {
      if (!event.target.closest(".search-box")) this.close();
    });
  }

  render(value) {
    const query = String(value || "").trim().toUpperCase();
    if (!query) {
      this.close();
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
    this.matches = matches;
    this.activeIndex = matches.length ? 0 : -1;
    this.suggestions.innerHTML = matches.length
      ? matches
          .map(
            (item, index) => `
              <button type="button" class="suggestion-row${index === this.activeIndex ? " is-active" : ""}" data-symbol="${escapeHtml(item.symbol)}" data-index="${index}">
                <strong>${escapeHtml(item.symbol)}</strong>
                <span>${escapeHtml(item.name || "")}</span>
              </button>`
          )
          .join("")
      : `<button type="button" class="suggestion-row"><strong>${escapeHtml(query)}</strong><span>无匹配项</span></button>`;
    this.suggestions.classList.add("is-open");
    this.suggestions.querySelectorAll(".suggestion-row[data-symbol]").forEach((row) => {
      row.addEventListener("mouseenter", () => this.setActive(Number(row.dataset.index)));
      row.addEventListener("click", () => this.select(row.dataset.symbol));
    });
  }

  move(delta) {
    if (!this.matches.length) {
      this.render(this.input.value);
      return;
    }
    this.setActive((this.activeIndex + delta + this.matches.length) % this.matches.length);
  }

  setActive(index) {
    if (!this.matches.length) return;
    this.activeIndex = Math.max(0, Math.min(index, this.matches.length - 1));
    const rows = [...this.suggestions.querySelectorAll(".suggestion-row[data-symbol]")];
    rows.forEach((row, rowIndex) => row.classList.toggle("is-active", rowIndex === this.activeIndex));
    keepRowVisibleWithin(this.suggestions, rows[this.activeIndex]);
  }

  selectActive() {
    if (this.matches.length && this.activeIndex >= 0) {
      this.select(this.matches[this.activeIndex].symbol);
      return;
    }
    this.select(normalizeSymbol(this.input.value));
  }

  select(symbol) {
    const normalized = normalizeSymbol(symbol);
    this.input.value = `${normalized} ${symbolIndexBySymbol[normalized]?.name || ""}`.trim();
    this.close();
    this.onSelect?.(normalized);
  }

  close() {
    this.suggestions.classList.remove("is-open");
    this.suggestions.innerHTML = "";
    this.matches = [];
    this.activeIndex = -1;
  }
}

function keepRowVisibleWithin(container, row) {
  if (!container || !row) return;
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
