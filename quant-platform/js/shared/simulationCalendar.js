let calendarPromise = null;

export async function loadSimulationCalendarAvailability() {
  if (!calendarPromise) {
    calendarPromise = fetch("/api/trading_calendar")
      .then(async (response) => {
        const payload = await response.json();
        if (!response.ok) throw new Error(payload.error || `request failed: ${response.status}`);
        return normalizeCalendarPayload(payload);
      })
      .catch((error) => {
        calendarPromise = null;
        throw error;
      });
  }
  return calendarPromise;
}

export function normalizeFrequency(value) {
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

export function datesForFrequency(calendar, frequency) {
  const normalized = normalizeFrequency(frequency);
  const scoped = calendar?.calendars_by_frequency?.[normalized];
  if (Array.isArray(scoped?.trade_dates)) return scoped.trade_dates;
  if (Array.isArray(scoped)) return scoped;
  return Array.isArray(calendar?.trade_dates) ? calendar.trade_dates : [];
}

export function monthsForFrequency(calendar, frequency) {
  const normalized = normalizeFrequency(frequency);
  const scoped = calendar?.calendars_by_frequency?.[normalized];
  if (Array.isArray(scoped?.available_months)) return scoped.available_months;
  return sortedUnique(datesForFrequency(calendar, frequency).map((date) => date.slice(0, 7)).filter(Boolean));
}

export function boundsForFrequency(calendar, frequency) {
  const dates = datesForFrequency(calendar, frequency);
  return {
    min: dates[0] || "",
    max: dates[dates.length - 1] || "",
  };
}

export function nearestAvailableDate(calendar, frequency, value, direction = "backward") {
  const dates = datesForFrequency(calendar, frequency);
  if (!dates.length) return "";
  const target = String(value || "");
  if (!target) return direction === "forward" ? dates[0] : dates[dates.length - 1];
  if (direction === "forward") return dates.find((date) => date >= target) || dates[dates.length - 1];
  for (let index = dates.length - 1; index >= 0; index -= 1) {
    if (dates[index] <= target) return dates[index];
  }
  return dates[0];
}

export function isAvailableDate(calendar, frequency, value) {
  const date = String(value || "").slice(0, 10);
  if (!date) return false;
  return new Set(datesForFrequency(calendar, frequency)).has(date);
}

export function enhanceSimulationDateInput(input, options = {}) {
  if (!input || input.dataset.simulationCalendarEnhanced === "1") return null;
  input.dataset.simulationCalendarEnhanced = "1";
  input.type = "text";
  input.inputMode = "none";
  input.autocomplete = "off";
  input.readOnly = true;
  input.classList.add("simulation-date-input");
  input.setAttribute("aria-haspopup", "dialog");
  input.setAttribute("aria-expanded", "false");

  const popover = document.createElement("div");
  popover.className = "simulation-calendar-popover";
  popover.setAttribute("role", "dialog");
  popover.setAttribute("aria-label", `${options.label || "日期"}选择器`);
  document.body.appendChild(popover);

  let open = false;
  let activeMonth = "";

  const controller = {
    refresh() {
      syncInputBounds(input, options);
      if (open) render();
    },
    close,
  };

  input.addEventListener("click", () => openPicker());
  input.addEventListener("focus", () => openPicker());
  input.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
    } else if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openPicker();
    }
  });
  document.addEventListener("pointerdown", (event) => {
    if (!open) return;
    if (event.target === input || popover.contains(event.target)) return;
    close();
  });
  window.addEventListener("resize", () => {
    if (open) positionPopover();
  });
  window.addEventListener("scroll", () => {
    if (open) positionPopover();
  }, true);

  syncInputBounds(input, options);
  return controller;

  function openPicker() {
    if (input.disabled) return;
    open = true;
    input.setAttribute("aria-expanded", "true");
    const months = availableMonths();
    activeMonth = resolveInitialMonth(months);
    render();
    positionPopover();
    popover.classList.add("is-open");
  }

  function close() {
    open = false;
    input.setAttribute("aria-expanded", "false");
    popover.classList.remove("is-open");
  }

  function render() {
    const calendar = calendarValue();
    const frequency = frequencyValue();
    const dates = datesForFrequency(calendar, frequency);
    const allowed = new Set(dates);
    const marketDates = Array.isArray(calendar?.trade_dates) ? calendar.trade_dates : datesForFrequency(calendar, "1d");
    const marketOpen = new Set(marketDates);
    const marketRange = {
      min: marketDates[0] || "",
      max: marketDates[marketDates.length - 1] || "",
    };
    const months = availableMonths();
    if (!months.length) {
      popover.innerHTML = `<div class="calendar-empty">当前模拟粒度没有可用日期</div>`;
      return;
    }
    if (!months.includes(activeMonth)) activeMonth = resolveInitialMonth(months);
    const monthIndex = months.indexOf(activeMonth);
    const years = yearsForMonths(months);
    const activeYear = activeMonth.slice(0, 4);
    const monthOptions = monthsForYear(months, activeYear);
    const activeMonthNumber = activeMonth.slice(5, 7);
    const prevYear = adjacentYearMonth(months, activeYear, activeMonthNumber, -1);
    const nextYear = adjacentYearMonth(months, activeYear, activeMonthNumber, 1);
    const days = monthGrid(activeMonth);
    popover.innerHTML = `
      <div class="calendar-head">
        <div class="calendar-nav-group">
          <button type="button" data-calendar-year-prev ${prevYear ? "" : "disabled"} aria-label="上一年">‹</button>
          <select data-calendar-year aria-label="选择有数据的年份">
            ${years.map((year) => `<option value="${year}" ${year === activeYear ? "selected" : ""}>${year}年</option>`).join("")}
          </select>
          <button type="button" data-calendar-year-next ${nextYear ? "" : "disabled"} aria-label="下一年">›</button>
        </div>
        <div class="calendar-nav-group">
          <button type="button" data-calendar-prev ${monthIndex <= 0 ? "disabled" : ""} aria-label="上一个有数据的月份">‹</button>
          <select data-calendar-month aria-label="选择有数据的月份">
            ${monthOptions.map((month) => `<option value="${month}" ${month === activeMonth ? "selected" : ""}>${Number(month.slice(5, 7))}月</option>`).join("")}
          </select>
          <button type="button" data-calendar-next ${monthIndex >= months.length - 1 ? "disabled" : ""} aria-label="下一个有数据的月份">›</button>
        </div>
      </div>
      <div class="calendar-weekdays">
        ${["一", "二", "三", "四", "五", "六", "日"].map((day) => `<span>${day}</span>`).join("")}
      </div>
      <div class="calendar-grid">
        ${days.map((date) => dayButton(date, allowed, marketOpen, marketRange)).join("")}
      </div>
      <div class="calendar-foot">${frequencyLabel(frequency)} · 仅显示有数据的年月，休市日标“休”，无该粒度数据置灰</div>
    `;
    popover.querySelector("[data-calendar-year-prev]")?.addEventListener("click", () => {
      if (!prevYear) return;
      activeMonth = prevYear;
      render();
    });
    popover.querySelector("[data-calendar-year-next]")?.addEventListener("click", () => {
      if (!nextYear) return;
      activeMonth = nextYear;
      render();
    });
    popover.querySelector("[data-calendar-prev]")?.addEventListener("click", () => {
      activeMonth = months[Math.max(0, monthIndex - 1)];
      render();
    });
    popover.querySelector("[data-calendar-next]")?.addEventListener("click", () => {
      activeMonth = months[Math.min(months.length - 1, monthIndex + 1)];
      render();
    });
    popover.querySelector("[data-calendar-year]")?.addEventListener("change", (event) => {
      activeMonth = closestMonthInYear(months, event.currentTarget.value, activeMonth.slice(5, 7));
      render();
    });
    popover.querySelector("[data-calendar-month]")?.addEventListener("change", (event) => {
      activeMonth = event.currentTarget.value;
      render();
    });
    popover.querySelectorAll("[data-date]").forEach((button) => {
      button.addEventListener("click", () => {
        const selectedDate = button.dataset.date || "";
        input.value = selectedDate;
        const selectedMonth = selectedDate.slice(0, 7);
        if (selectedMonth && selectedMonth !== activeMonth) {
          activeMonth = selectedMonth;
          render();
          positionPopover();
        } else {
          close();
        }
        input.dispatchEvent(new Event("change", { bubbles: true }));
        if (typeof options.onSelect === "function") options.onSelect(input.value);
      });
    });
  }

  function dayButton(date, allowed, marketOpen, marketRange) {
    const inMonth = date.slice(0, 7) === activeMonth;
    const selectable = allowed.has(date);
    const selected = input.value === date;
    const inMarketRange = (!marketRange.min || date >= marketRange.min) && (!marketRange.max || date <= marketRange.max);
    const isRest = inMarketRange && !marketOpen.has(date);
    const stateClass = selectable ? "is-available" : isRest ? "is-rest" : "is-disabled";
    const title = selectable ? `${date} 有数据` : isRest ? `${date} 休市` : `${date} 当前粒度无数据`;
    return `
      <button
        type="button"
        class="${stateClass}${selected ? " is-selected" : ""}${inMonth ? "" : " is-outside"}"
        data-calendar-date="${date}"
        ${selectable ? `data-date="${date}"` : "disabled"}
        title="${title}"
      ><span class="calendar-day-number">${Number(date.slice(8, 10))}</span>${isRest ? `<span class="calendar-rest-mark">休</span>` : ""}</button>`;
  }

  function availableMonths() {
    return monthsForFrequency(calendarValue(), frequencyValue());
  }

  function resolveInitialMonth(months) {
    const valueMonth = String(input.value || "").slice(0, 7);
    if (months.includes(valueMonth)) return valueMonth;
    const nearest = nearestAvailableDate(calendarValue(), frequencyValue(), input.value, "backward");
    const nearestMonth = nearest.slice(0, 7);
    if (months.includes(nearestMonth)) return nearestMonth;
    return months[months.length - 1] || months[0] || "";
  }

  function positionPopover() {
    const rect = input.getBoundingClientRect();
    const width = Math.max(292, rect.width);
    const top = rect.bottom + window.scrollY + 6;
    const left = Math.min(
      Math.max(12, rect.left + window.scrollX),
      Math.max(12, window.scrollX + window.innerWidth - width - 12)
    );
    popover.style.minWidth = `${width}px`;
    popover.style.left = `${left}px`;
    popover.style.top = `${top}px`;
  }

  function calendarValue() {
    return typeof options.getCalendar === "function" ? options.getCalendar() : options.calendar;
  }

  function frequencyValue() {
    return normalizeFrequency(typeof options.getFrequency === "function" ? options.getFrequency() : options.frequency);
  }
}

export function syncInputBounds(input, options = {}) {
  if (!input) return;
  const calendar = typeof options.getCalendar === "function" ? options.getCalendar() : options.calendar;
  const frequency = normalizeFrequency(typeof options.getFrequency === "function" ? options.getFrequency() : options.frequency);
  const { min, max } = boundsForFrequency(calendar, frequency);
  input.min = min;
  input.max = max;
  input.title = min && max ? `${frequencyLabel(frequency)}可用区间 ${min} 至 ${max}` : "当前粒度没有可用日期";
}

function normalizeCalendarPayload(payload) {
  const next = { ...(payload || {}) };
  next.trade_dates = sortedUnique(next.trade_dates || []);
  next.calendars_by_frequency = next.calendars_by_frequency || {};
  for (const [frequency, calendar] of Object.entries(next.calendars_by_frequency)) {
    if (Array.isArray(calendar)) {
      next.calendars_by_frequency[frequency] = frequencyCalendar(calendar);
    } else {
      const dates = sortedUnique(calendar?.trade_dates || []);
      next.calendars_by_frequency[frequency] = {
        ...(calendar || {}),
        trade_dates: dates,
        available_months: sortedUnique(calendar?.available_months || dates.map((date) => date.slice(0, 7)).filter(Boolean)),
        available_years: sortedUnique(calendar?.available_years || dates.map((date) => date.slice(0, 4)).filter(Boolean)),
      };
    }
  }
  return next;
}

function frequencyCalendar(dates) {
  const tradeDates = sortedUnique(dates || []);
  return {
    trade_dates: tradeDates,
    count: tradeDates.length,
    first_trade_date: tradeDates[0] || "",
    latest_trade_date: tradeDates[tradeDates.length - 1] || "",
    available_months: sortedUnique(tradeDates.map((date) => date.slice(0, 7)).filter(Boolean)),
    available_years: sortedUnique(tradeDates.map((date) => date.slice(0, 4)).filter(Boolean)),
  };
}

function monthGrid(month) {
  const [year, monthNumber] = month.split("-").map(Number);
  const first = new Date(Date.UTC(year, monthNumber - 1, 1));
  const startOffset = (first.getUTCDay() + 6) % 7;
  const cursor = new Date(first);
  cursor.setUTCDate(first.getUTCDate() - startOffset);
  const dates = [];
  for (let index = 0; index < 42; index += 1) {
    dates.push(cursor.toISOString().slice(0, 10));
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }
  return dates;
}

function yearsForMonths(months) {
  return sortedUnique((months || []).map((month) => month.slice(0, 4)).filter(Boolean));
}

function monthsForYear(months, year) {
  return (months || []).filter((month) => month.startsWith(`${year}-`));
}

function closestMonthInYear(months, year, targetMonthNumber = "12") {
  const scoped = monthsForYear(months, year);
  if (!scoped.length) return "";
  const exact = `${year}-${targetMonthNumber}`;
  if (scoped.includes(exact)) return exact;
  return scoped.find((month) => month.slice(5, 7) >= targetMonthNumber) || scoped[scoped.length - 1];
}

function adjacentYearMonth(months, activeYear, activeMonthNumber, offset) {
  const years = yearsForMonths(months);
  const yearIndex = years.indexOf(activeYear);
  const nextYear = years[yearIndex + offset];
  return nextYear ? closestMonthInYear(months, nextYear, activeMonthNumber) : "";
}

function formatMonth(month) {
  const [year, monthNumber] = month.split("-");
  return `${year}年${Number(monthNumber)}月`;
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
  return labels[normalizeFrequency(value)] || "日线";
}

function sortedUnique(values) {
  return [...new Set((values || []).filter(Boolean).map(String))].sort();
}
