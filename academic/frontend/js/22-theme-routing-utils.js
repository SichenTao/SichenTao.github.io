function serviceMetricsMarkup(item) {
  if (item?.tag !== "Journal review" || !item?.verification) {
    return "";
  }
  return publicationMetricsMarkup({
    type: "journal",
    venue: item.label,
    verification: item.verification,
    omit_citations: true,
  });
}

function resolveThemeName() {
  const queryTheme = new URLSearchParams(window.location.search).get("theme");
  if (queryTheme === "base") {
    return "tohoku";
  }
  if (queryTheme && themeCatalog[queryTheme] && queryTheme !== "base") {
    return queryTheme;
  }

  const savedTheme = readSessionValue(THEME_STORAGE_KEY);
  if (savedTheme === "base") {
    return "tohoku";
  }
  if (savedTheme && themeCatalog[savedTheme] && savedTheme !== "base") {
    return savedTheme;
  }

  const documentTheme = document.documentElement.dataset.theme;
  if (documentTheme === "base") {
    return "tohoku";
  }
  if (documentTheme && themeCatalog[documentTheme] && documentTheme !== "base") {
    return documentTheme;
  }

  return "tohoku";
}

function nextThemeName(currentTheme = resolveThemeName()) {
  const sequence = THEME_SWITCH_SEQUENCE.filter((themeName) => themeCatalog[themeName]);
  const pointer = sequence.indexOf(currentTheme);
  if (pointer === -1) {
    return sequence[0] || "tohoku";
  }
  return sequence[(pointer + 1) % sequence.length];
}

function renderLocaleSwitchers() {
  if (!els.localeSwitchers.length) {
    els.localeChoices = Array.from(document.querySelectorAll("[data-locale-choice]"));
    els.localeTriggers = Array.from(document.querySelectorAll("[data-locale-trigger]"));
    return;
  }

  if (window.HomepageComponents?.renderLocaleSwitcher) {
    window.HomepageComponents.renderLocaleSwitcher(els.localeSwitchers, {
      locale: resolveLocaleName(),
      locales: localeCatalog,
      sequence: LOCALE_SWITCH_SEQUENCE,
      ariaLabel: t("controls.language"),
      trayLabel: t("controls.language_choices"),
    });
    els.localeChoices = Array.from(document.querySelectorAll("[data-locale-choice]"));
    els.localeTriggers = Array.from(document.querySelectorAll("[data-locale-trigger]"));
    renderPortalReturnControl();
    bindSwitcherTriggerButtons();
    return;
  }

  const activeLocaleName = resolveLocaleName();
  const activeLocale = localeCatalog[activeLocaleName] || localeCatalog.en;
  const localeButtons = LOCALE_SWITCH_SEQUENCE
    .filter((localeName) => localeCatalog[localeName])
    .map(
      (localeName) => {
        const locale = localeCatalog[localeName];
        return `
        <button
          class="locale-chip${localeName === activeLocaleName ? " is-active" : ""}"
          type="button"
          data-locale-choice="${escapeHtml(localeName)}"
          aria-pressed="${localeName === activeLocaleName ? "true" : "false"}"
          aria-label="${escapeHtml(locale.name)}"
          title="${escapeHtml(locale.name)}"
        >
          <span class="locale-label" aria-hidden="true">${escapeHtml(locale.label)}</span>
        </button>
      `;
      },
    )
    .join("");

  els.localeSwitchers.forEach((switcher) => {
    switcher.innerHTML = `
      <button
        class="locale-trigger"
        type="button"
        data-locale-trigger
        aria-haspopup="true"
        aria-expanded="false"
        aria-label="${escapeHtml(activeLocale.name)}"
        title="${escapeHtml(activeLocale.name)}"
      >
        <span class="locale-label" data-locale-current-label>${escapeHtml(activeLocale.label)}</span>
      </button>
      <div class="locale-tray" role="group" aria-label="${escapeHtml(t("controls.language_choices"))}">
        ${localeButtons}
      </div>
    `;
  });

  els.localeChoices = Array.from(document.querySelectorAll("[data-locale-choice]"));
  els.localeTriggers = Array.from(document.querySelectorAll("[data-locale-trigger]"));
  renderPortalReturnControl();
  bindSwitcherTriggerButtons();
}

function renderThemeSwitchers() {
  if (!els.themeSwitchers.length) {
    els.themeChoices = Array.from(document.querySelectorAll("[data-theme-choice]"));
    els.themeTriggers = Array.from(document.querySelectorAll("[data-theme-trigger]"));
    return;
  }

  if (window.HomepageComponents?.renderThemeSwitcher) {
    window.HomepageComponents.renderThemeSwitcher(els.themeSwitchers, {
      locale: resolveLocaleName(),
      theme: resolveThemeName(),
      themes: themeCatalog,
      sequence: THEME_SWITCH_SEQUENCE,
      ariaLabel: t("controls.theme"),
      trayLabel: t("controls.theme_choices"),
      tooltip: translatedThemeTooltip,
    });
    els.themeChoices = Array.from(document.querySelectorAll("[data-theme-choice]"));
    els.themeTriggers = Array.from(document.querySelectorAll("[data-theme-trigger]"));
    renderPortalReturnControl();
    bindSwitcherTriggerButtons();
    return;
  }

  const activeThemeName = resolveThemeName();
  const activeTheme = themeCatalog[activeThemeName] || themeCatalog.tohoku;
  const themeButtons = THEME_SWITCH_SEQUENCE
    .filter((themeName) => themeCatalog[themeName])
    .map(
      (themeName) => {
        const theme = themeCatalog[themeName];
        return `
        <button
          class="theme-chip${themeName === activeThemeName ? " is-active" : ""}"
          type="button"
          data-theme-choice="${escapeHtml(themeName)}"
          aria-pressed="${themeName === activeThemeName ? "true" : "false"}"
          aria-label="${escapeHtml(translatedThemeTooltip(themeName))}"
          title="${escapeHtml(translatedThemeTooltip(themeName))}"
        >
          <span class="theme-swatch ${escapeHtml(theme.swatchClass)}" aria-hidden="true"></span>
        </button>
      `;
      },
    )
    .join("");

  els.themeSwitchers.forEach((switcher) => {
    switcher.innerHTML = `
      <button
        class="theme-trigger"
        type="button"
        data-theme-trigger
        aria-haspopup="true"
        aria-expanded="false"
        aria-label="${escapeHtml(translatedThemeTooltip(activeThemeName))}"
        title="${escapeHtml(translatedThemeTooltip(activeThemeName))}"
      >
        <span class="theme-swatch ${escapeHtml(activeTheme.swatchClass)}" data-theme-current-swatch aria-hidden="true"></span>
      </button>
      <div class="theme-tray" role="group" aria-label="${escapeHtml(t("controls.theme_choices"))}">
        ${themeButtons}
      </div>
    `;
  });

  els.themeChoices = Array.from(document.querySelectorAll("[data-theme-choice]"));
  els.themeTriggers = Array.from(document.querySelectorAll("[data-theme-trigger]"));
  renderPortalReturnControl();
  bindSwitcherTriggerButtons();
}

function academicFrontierHomeHref(localeName = resolveLocaleName()) {
  const themeName = resolveThemeName();
  if (window.HomepagePlatform?.academicFrontierHref) {
    return window.HomepagePlatform.academicFrontierHref(localeName, themeName);
  }
  const href = localeName === "en" ? "/academic-frontier/" : `/academic-frontier/${encodeURIComponent(localeName)}/`;
  const url = new URL(href, window.location.origin);
  url.searchParams.set("theme", themeName);
  return `${url.pathname}${url.search}`;
}

function siteStateHref(href, localeName = resolveLocaleName(), themeName = resolveThemeName()) {
  if (window.HomepagePlatform?.siteStateHref) {
    return window.HomepagePlatform.siteStateHref(href, { locale: localeName, theme: themeName });
  }
  const url = new URL(href, window.location.origin);
  if (url.pathname.startsWith("/academic/") || url.pathname.startsWith("/jsps-kakenhi/")) {
    url.searchParams.set("lang", localeName);
  }
  if (url.pathname.startsWith("/academic/") || url.pathname.startsWith("/academic-frontier/") || url.pathname.startsWith("/jsps-kakenhi/")) {
    url.searchParams.set("theme", themeName);
  }
  return `${url.pathname}${url.search}`;
}

