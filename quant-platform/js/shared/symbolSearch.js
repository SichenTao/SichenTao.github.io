import { escapeHtml } from "./format.js";
import { localSymbolMatches, normalizeSymbol, searchSymbols, symbolIndexBySymbol } from "./marketData.js";

export class SymbolSearch {
  constructor({ input, suggestions, onSelect }) {
    this.input = input;
    this.suggestions = suggestions;
    this.onSelect = onSelect;
    this.matches = [];
    this.activeIndex = -1;
    this.requestId = 0;
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

  async render(value) {
    const query = String(value || "").trim().toUpperCase();
    if (!query) {
      this.close();
      return;
    }
    const requestId = this.requestId + 1;
    this.requestId = requestId;
    const local = localSymbolMatches(value, 12);
    if (local.length) {
      this.setMatches(local, query);
      return;
    }
    this.suggestions.innerHTML = `<button type="button" class="suggestion-row"><strong>${escapeHtml(query)}</strong><span>正在从本地后端搜索</span></button>`;
    this.suggestions.classList.add("is-open");
    const matches = await searchSymbols(value, 12);
    if (requestId !== this.requestId) return;
    this.setMatches(matches, query);
  }

  setMatches(matches, query) {
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
    searchSymbols(this.input.value, 1).then((matches) => {
      this.select(matches[0]?.symbol || normalizeSymbol(this.input.value));
    });
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
