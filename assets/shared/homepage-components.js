(function initHomepageComponents(global) {
  if (global.HomepageComponents) {
    return;
  }

  const DEFAULT_ICON_SPRITE = "/academic/assets/icons/ui-icons.svg";

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function toNodes(target) {
    if (!target) {
      return [];
    }
    if (typeof target === "string") {
      return Array.from(document.querySelectorAll(target));
    }
    if (target instanceof Element || target === document) {
      return [target];
    }
    return Array.from(target).filter(Boolean);
  }

  function localeName(locale, locales) {
    const normalized = global.HomepageI18n?.normalizeLocale?.(locale, locales) || locale || "en";
    return locales?.[normalized] ? normalized : Object.keys(locales || {})[0] || "en";
  }

  function themeName(theme, themes) {
    const normalized = global.HomepagePlatform?.normalizeTheme?.(theme) || theme || "tohoku";
    return themes?.[normalized] ? normalized : Object.keys(themes || {})[0] || "tohoku";
  }

  function themeLabel(theme, locale) {
    if (global.HomepagePlatform?.themeLabel) {
      return global.HomepagePlatform.themeLabel(theme, locale);
    }
    const labels = {
      tohoku: "Tohoku University",
      toyama: "University of Toyama",
      usst: "University of Shanghai for Science and Technology",
    };
    return labels[theme] || theme;
  }

  function themeTooltip(theme, locale = "en") {
    const suffix = {
      en: " theme",
      zh: "主题色",
      ja: "テーマ色",
    }[locale] || " theme";
    return `${themeLabel(theme, locale)}${suffix}`;
  }

  function iconSprite(name, className = "ui-icon", spriteHref = DEFAULT_ICON_SPRITE) {
    return `<svg class="${escapeHtml(className)}" aria-hidden="true" focusable="false"><use href="${escapeHtml(spriteHref)}#icon-${escapeHtml(name)}"></use></svg>`;
  }

  function languageIconMarkup() {
    return `
      <svg class="ui-icon locale-trigger-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <circle cx="12" cy="12" r="8"></circle>
        <path d="M12 4a12.5 12.5 0 0 1 0 16"></path>
        <path d="M12 4a12.5 12.5 0 0 0 0 16"></path>
        <path d="M4 12h16"></path>
      </svg>
    `;
  }

  function portalIconMarkup(icon, options = {}) {
    if (icon === "home") {
      return iconSprite("home", "ui-icon", options.iconSprite || DEFAULT_ICON_SPRITE);
    }
    if (icon === "portrait") {
      return '<img class="portal-chip-logo" src="/academic/assets/images/avatar-openai.jpg" alt="" loading="lazy" />';
    }
    if (icon === "frontier" || icon === "radar") {
      return iconSprite("research", "ui-icon", options.iconSprite || DEFAULT_ICON_SPRITE);
    }
    if (icon === "jsps") {
      return '<img class="portal-chip-logo" src="/jsps-kakenhi/favicon.png" alt="" loading="lazy" />';
    }
    return typeof icon === "string" ? icon : "";
  }

  function addChoiceListener(node, choiceName, callback, hasHref) {
    if (typeof callback !== "function") {
      return;
    }
    node.addEventListener("click", (event) => {
      callback(choiceName, event);
      if (!hasHref && !event.defaultPrevented) {
        event.preventDefault();
      }
    });
  }

  function renderLocaleSwitcher(target, config = {}) {
    const locales = config.locales || global.HomepageI18n?.LOCALES || {};
    const sequence = (config.sequence || global.HomepageI18n?.LOCALE_SEQUENCE || Object.keys(locales)).filter((name) => locales[name]);
    const activeLocaleName = localeName(config.locale || global.HomepageI18n?.readStoredLocale?.({ locales }), locales);
    const activeLocale = locales[activeLocaleName] || locales.en || {};
    const activeLabel = activeLocale.label || activeLocaleName.toUpperCase();
    const activeName = activeLocale.name || activeLocaleName;
    const switcherLabel = config.ariaLabel || config.label || "Language";
    const trayLabel = config.trayLabel || config.choiceLabel || "Language choices";
    const triggerLabel = config.triggerLabel || switcherLabel || activeName;
    const activeClass = config.activeClass || "is-active";

    toNodes(target).forEach((switcher) => {
      switcher.setAttribute("aria-label", switcherLabel);
      const wasOpen = switcher.classList.contains("is-open");
      const choices = sequence
        .map((name) => {
          const locale = locales[name];
          const isActive = name === activeLocaleName;
          const label = locale?.label || name.toUpperCase();
          const fullName = locale?.name || name;
          const href = typeof config.choiceHref === "function" ? config.choiceHref(name) : "";
          if (href) {
            return `
              <a
                class="locale-chip${isActive ? ` ${activeClass}` : ""}"
                href="${escapeHtml(href)}"
                data-locale-choice="${escapeHtml(name)}"
                aria-label="${escapeHtml(fullName)}"
                title="${escapeHtml(fullName)}"
                ${isActive ? 'aria-current="page"' : ""}
              >
                <span class="locale-label" aria-hidden="true">${escapeHtml(label)}</span>
              </a>
            `;
          }
          return `
            <button
              class="locale-chip${isActive ? ` ${activeClass}` : ""}"
              type="button"
              data-locale-choice="${escapeHtml(name)}"
              aria-pressed="${isActive ? "true" : "false"}"
              aria-label="${escapeHtml(fullName)}"
              title="${escapeHtml(fullName)}"
            >
              <span class="locale-label" aria-hidden="true">${escapeHtml(label)}</span>
            </button>
          `;
        })
        .join("");

      switcher.innerHTML = `
        <button
          class="locale-trigger"
          type="button"
          data-locale-trigger
          aria-haspopup="true"
          aria-expanded="${wasOpen ? "true" : "false"}"
          aria-label="${escapeHtml(triggerLabel)}"
          title="${escapeHtml(triggerLabel)}"
        >
          ${languageIconMarkup()}
          <span class="locale-current-label" data-locale-current-label>${escapeHtml(activeLabel)}</span>
        </button>
        <div class="locale-tray" role="group" aria-label="${escapeHtml(trayLabel)}">
          ${choices}
        </div>
      `;

      switcher.querySelectorAll("[data-locale-choice]").forEach((choice) => {
        addChoiceListener(choice, choice.dataset.localeChoice, config.onChoice, choice.tagName.toLowerCase() === "a");
      });
    });
  }

  function renderThemeSwitcher(target, config = {}) {
    const themes = config.themes || global.HomepagePlatform?.THEMES || {};
    const sequence = (config.sequence || global.HomepagePlatform?.THEME_SEQUENCE || Object.keys(themes)).filter((name) => themes[name]);
    const locale = localeName(config.locale || global.HomepageI18n?.readStoredLocale?.(), global.HomepageI18n?.LOCALES || {});
    const activeThemeName = themeName(config.theme || global.HomepagePlatform?.readStoredTheme?.(), themes);
    const activeTheme = themes[activeThemeName] || themes.tohoku || {};
    const trayLabel = config.trayLabel || "Theme choices";
    const switcherLabel = config.ariaLabel || config.label || "Color theme";
    const tooltip = typeof config.tooltip === "function" ? config.tooltip : (name) => themeTooltip(name, locale);
    const activeTooltip = tooltip(activeThemeName);
    const activeClass = config.activeClass || "is-active";

    toNodes(target).forEach((switcher) => {
      switcher.setAttribute("aria-label", switcherLabel);
      const wasOpen = switcher.classList.contains("is-open");
      const choices = sequence
        .map((name) => {
          const theme = themes[name];
          const isActive = name === activeThemeName;
          const label = tooltip(name);
          return `
            <button
              class="theme-chip${isActive ? ` ${activeClass}` : ""}"
              type="button"
              data-theme-choice="${escapeHtml(name)}"
              aria-pressed="${isActive ? "true" : "false"}"
              aria-label="${escapeHtml(label)}"
              title="${escapeHtml(label)}"
            >
              <span class="theme-swatch ${escapeHtml(theme?.swatchClass || "")}" aria-hidden="true"></span>
            </button>
          `;
        })
        .join("");

      switcher.innerHTML = `
        <button
          class="theme-trigger"
          type="button"
          data-theme-trigger
          aria-haspopup="true"
          aria-expanded="${wasOpen ? "true" : "false"}"
          aria-label="${escapeHtml(activeTooltip)}"
          title="${escapeHtml(activeTooltip)}"
        >
          <span class="theme-swatch ${escapeHtml(activeTheme.swatchClass || "")}" data-theme-current-swatch aria-hidden="true"></span>
        </button>
        <div class="theme-tray" role="group" aria-label="${escapeHtml(trayLabel)}">
          ${choices}
        </div>
      `;

      switcher.querySelectorAll("[data-theme-choice]").forEach((choice) => {
        addChoiceListener(choice, choice.dataset.themeChoice, config.onChoice, false);
      });
    });
  }

  function renderPortalSwitcher(targetControls, config = {}) {
    toNodes(targetControls).forEach((controls) => {
      if (!controls) {
        return;
      }

      const locale = config.locale || global.HomepageI18n?.readStoredLocale?.() || "en";
      const theme = config.theme || global.HomepagePlatform?.readStoredTheme?.() || "tohoku";
      const portalData = global.HomepagePlatform?.portalItems?.({
        locale,
        theme,
        currentPath: config.currentPath || global.location?.pathname || "/",
      }) || { labels: {}, items: [] };
      const labels = config.labels || portalData.labels || {};
      const items = (config.items || portalData.items || []).map((item) => ({
        ...item,
        iconMarkup: item.iconMarkup || item.iconHtml || portalIconMarkup(item.icon, config),
        extraClass: item.extraClass || (item.icon === "portrait" ? "portal-chip--portrait" : ""),
      }));
      const activeItem = items.find((item) => item.active) || items[0];
      if (!activeItem) {
        return;
      }

      controls.querySelectorAll(".portal-return-link").forEach((node) => node.remove());
      let switcher = controls.querySelector(".portal-switcher");
      if (!switcher) {
        switcher = document.createElement("div");
        switcher.className = "portal-switcher control-switcher";
        controls.insertBefore(switcher, controls.firstElementChild);
      }
      const wasOpen = switcher.classList.contains("is-open");
      const trayLabel = config.trayLabel || labels.tray || "Site sections";

      switcher.innerHTML = `
        <button
          class="portal-trigger ${escapeHtml(activeItem.extraClass || "")}"
          type="button"
          data-portal-trigger
          aria-haspopup="true"
          aria-expanded="${wasOpen ? "true" : "false"}"
          aria-label="${escapeHtml(activeItem.label)}"
          title="${escapeHtml(activeItem.label)}"
        >
          ${activeItem.iconMarkup}
        </button>
        <div class="portal-tray" role="group" aria-label="${escapeHtml(trayLabel)}">
          ${items
            .map(
              (item) => `
                <a
                  class="portal-chip ${escapeHtml(item.extraClass || "")}${item.active ? " is-active" : ""}"
                  href="${escapeHtml(item.href)}"
                  aria-label="${escapeHtml(item.label)}"
                  title="${escapeHtml(item.label)}"
                  ${item.active ? 'aria-current="page"' : ""}
                >
                  ${item.iconMarkup}
                </a>
              `,
            )
            .join("")}
        </div>
      `;
    });
  }

  function controlLabels(locale = "en") {
    return {
      en: {
        display: "Display controls",
        language: "Language",
        languageChoices: "Language choices",
        cycleLanguages: "Switch to the next language",
        theme: "Color theme",
        themeChoices: "Theme choices",
        cycleThemes: "Switch to the next theme",
        pageNavigation: "Page navigation",
        menu: "Menu",
        showMenu: "Show menu",
        hideMenu: "Hide menu",
      },
      zh: {
        display: "显示控制",
        language: "语言",
        languageChoices: "语言选项",
        cycleLanguages: "切换到下一种语言",
        theme: "主题色",
        themeChoices: "主题选项",
        cycleThemes: "切换到下一个主题",
        pageNavigation: "页面导航",
        menu: "菜单",
        showMenu: "展开菜单",
        hideMenu: "收起菜单",
      },
      ja: {
        display: "表示設定",
        language: "言語",
        languageChoices: "言語オプション",
        cycleLanguages: "次の言語に切り替える",
        theme: "テーマ色",
        themeChoices: "テーマオプション",
        cycleThemes: "次のテーマに切り替える",
        pageNavigation: "ページナビゲーション",
        menu: "メニュー",
        showMenu: "メニューを開く",
        hideMenu: "メニューを閉じる",
      },
    }[locale] || controlLabels("en");
  }

  function nextName(current, sequence, catalog) {
    const values = sequence.filter((name) => catalog[name]);
    const pointer = values.indexOf(current);
    if (pointer === -1) {
      return values[0] || current;
    }
    return values[(pointer + 1) % values.length];
  }

  function renderStaticControlCluster(config = {}) {
    const locales = config.locales || global.HomepageI18n?.LOCALES || {};
    const themes = config.themes || global.HomepagePlatform?.THEMES || {};
    const localeSequence = config.localeSequence || global.HomepageI18n?.LOCALE_SEQUENCE || Object.keys(locales);
    const themeSequence = config.themeSequence || global.HomepagePlatform?.THEME_SEQUENCE || Object.keys(themes);

    function readLocale() {
      return localeName(global.HomepageI18n?.readStoredLocale?.({ locales }) || document.documentElement.lang || "en", locales);
    }

    function readTheme() {
      return themeName(global.HomepagePlatform?.readStoredTheme?.() || document.documentElement.dataset.theme || "tohoku", themes);
    }

    function render() {
      const locale = readLocale();
      const theme = readTheme();
      const labels = { ...controlLabels(locale), ...(config.labels?.[locale] || config.labels || {}) };

      document.querySelectorAll(".header-controls").forEach((node) => node.setAttribute("aria-label", labels.display));
      renderLocaleSwitcher(config.localeTarget || ".locale-switcher", {
        locale,
        locales,
        sequence: localeSequence,
        ariaLabel: labels.language,
        triggerLabel: labels.cycleLanguages,
        trayLabel: labels.languageChoices,
        onChoice: (localeName) => {
          global.HomepageI18n?.writeStoredLocale?.(localeName, { locales });
          global.HomepageI18n?.applyDocumentLocale?.(localeName, { locales });
          config.onLocaleChange?.(localeName);
          render();
        },
      });
      renderThemeSwitcher(config.themeTarget || ".theme-switcher", {
        locale,
        theme,
        themes,
        sequence: themeSequence,
        ariaLabel: labels.theme,
        trayLabel: labels.themeChoices,
        tooltip: (themeNameValue) => themeTooltip(themeNameValue, locale),
        onChoice: (themeNameValue) => {
          global.HomepagePlatform?.applyTheme?.(themeNameValue);
          config.onThemeChange?.(themeNameValue);
          render();
        },
      });
      renderPortalSwitcher(config.portalTarget || ".header-controls", {
        locale,
        theme,
        currentPath: config.currentPath || global.location?.pathname || "/",
      });
      global.HomepageSharedShell?.sync?.({
        switchers: {
          root: document,
          localeCycleLabel: labels.cycleLanguages,
          themeCycleLabel: labels.cycleThemes,
          onCycleLocale: () => {
            const nextLocale = nextName(readLocale(), localeSequence, locales);
            global.HomepageI18n?.writeStoredLocale?.(nextLocale, { locales });
            global.HomepageI18n?.applyDocumentLocale?.(nextLocale, { locales });
            config.onLocaleChange?.(nextLocale);
            render();
          },
          onCycleTheme: () => {
            const nextTheme = nextName(readTheme(), themeSequence, themes);
            global.HomepagePlatform?.applyTheme?.(nextTheme);
            config.onThemeChange?.(nextTheme);
            render();
          },
        },
        controls: {
          root: document,
          controlsSelector: ".header-controls",
          navSelector: ".topnav-shell, .topnav",
          headerSelector: ".site-header",
          breakpoint: 760,
          desktopGap: 12,
          mobileGap: 8,
        },
        topnav: document.querySelector(".topnav")
          ? {
              root: document,
              navSelector: ".topnav",
              navAriaLabel: labels.pageNavigation,
              menuLabel: labels.menu,
              showMenuLabel: labels.showMenu,
              hideMenuLabel: labels.hideMenu,
              toggleInnerHTML: `${iconSprite("menu")}<span class="topnav-toggle-label"></span>`,
              hintInnerHTML: iconSprite("up"),
              breakpoint: 760,
            }
          : null,
      });
    }

    render();
  }

  global.HomepageComponents = Object.freeze({
    escapeHtml,
    iconSprite,
    portalIconMarkup,
    themeTooltip,
    renderLocaleSwitcher,
    renderThemeSwitcher,
    renderPortalSwitcher,
    renderStaticControlCluster,
  });
})(window);
