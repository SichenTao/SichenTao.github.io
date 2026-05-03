(function initHomepagePlatform(global) {
  if (global.HomepagePlatform) {
    return;
  }

  const THEME_STORAGE_KEY = "sichen-homepage-theme";
  const LEGACY_THEME_STORAGE_KEYS = ["academic-frontier-theme", "kakenhi-portal-theme"];
  const THEME_SEQUENCE = ["tohoku", "toyama", "usst"];
  const DEFAULT_THEME = "tohoku";
  const THEMES = {
    tohoku: {
      label: "Tohoku University",
      metaColor: "#f5f5f7",
      swatchClass: "theme-tohoku",
      labels: {
        en: "Tohoku University",
        zh: "东北大学",
        ja: "東北大学",
      },
    },
    toyama: {
      label: "University of Toyama",
      metaColor: "#f5f5f7",
      swatchClass: "theme-toyama",
      labels: {
        en: "University of Toyama",
        zh: "富山大学",
        ja: "富山大学",
      },
    },
    usst: {
      label: "University of Shanghai for Science and Technology",
      metaColor: "#f5f5f7",
      swatchClass: "theme-usst",
      labels: {
        en: "University of Shanghai for Science and Technology",
        zh: "上海理工大学",
        ja: "上海理工大学",
      },
    },
  };

  const PORTAL_LABELS = {
    en: {
      tray: "Site sections",
      portal: { short: "Portal", full: "Navigation portal" },
      academic: { short: "Homepage", full: "Personal homepage" },
      frontier: { short: "Frontier", full: "Academic Frontier" },
      jsps: { short: "JSPS", full: "JSPS KAKENHI" },
    },
    zh: {
      tray: "功能主页",
      portal: { short: "导航页", full: "导航页" },
      academic: { short: "个人主页", full: "个人主页" },
      frontier: { short: "学术前沿", full: "学术前沿" },
      jsps: { short: "JSPS", full: "JSPS 科研费" },
    },
    ja: {
      tray: "機能ページ",
      portal: { short: "ポータル", full: "ナビゲーション" },
      academic: { short: "個人HP", full: "個人ホームページ" },
      frontier: { short: "学術前沿", full: "学術前沿" },
      jsps: { short: "JSPS", full: "JSPS 科研費" },
    },
  };

  function storageGet(storage, key) {
    try {
      return storage.getItem(key);
    } catch {
      return null;
    }
  }

  function storageSet(storage, key, value) {
    try {
      storage.setItem(key, value);
    } catch {}
  }

  function normalizeTheme(value) {
    const raw = String(value || "").trim().toLowerCase();
    if (!raw) {
      return "";
    }
    if (raw === "default" || raw === "base") {
      return DEFAULT_THEME;
    }
    return THEMES[raw] ? raw : "";
  }

  function readStoredTheme(options = {}) {
    const queryParam = options.queryParam || "theme";
    const queryTheme = normalizeTheme(new URLSearchParams(global.location?.search || "").get(queryParam));
    if (queryTheme) {
      return queryTheme;
    }

    const storageKeys = [options.storageKey || THEME_STORAGE_KEY, ...(options.legacyKeys || LEGACY_THEME_STORAGE_KEYS)];
    for (const key of storageKeys) {
      const localValue = normalizeTheme(storageGet(global.localStorage, key));
      if (localValue) {
        return localValue;
      }
      const sessionValue = normalizeTheme(storageGet(global.sessionStorage, key));
      if (sessionValue) {
        return sessionValue;
      }
    }

    const documentTheme = normalizeTheme(global.document?.documentElement?.dataset?.theme);
    return documentTheme || DEFAULT_THEME;
  }

  function writeStoredTheme(themeName, options = {}) {
    const normalized = normalizeTheme(themeName);
    if (!normalized) {
      return "";
    }
    const storageKey = options.storageKey || THEME_STORAGE_KEY;
    storageSet(global.localStorage, storageKey, normalized);
    storageSet(global.sessionStorage, storageKey, normalized);
    (options.legacyKeys || []).forEach((key) => {
      storageSet(global.localStorage, key, normalized);
      storageSet(global.sessionStorage, key, normalized);
    });
    return normalized;
  }

  function applyTheme(themeName, options = {}) {
    const normalized = normalizeTheme(themeName) || DEFAULT_THEME;
    if (global.document?.documentElement) {
      global.document.documentElement.dataset.theme = normalized;
    }
    const metaThemeColor = global.document?.querySelector?.('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", THEMES[normalized].metaColor);
    }
    if (options.persist !== false) {
      writeStoredTheme(normalized, options);
    }
    return normalized;
  }

  function themeLabel(themeName, locale = "en") {
    const normalized = normalizeTheme(themeName) || DEFAULT_THEME;
    const labels = THEMES[normalized]?.labels || {};
    const localeName = global.HomepageI18n?.normalizeLocale(locale) || "en";
    return labels[localeName] || labels.en || THEMES[normalized]?.label || normalized;
  }

  function siteStateHref(href, options = {}) {
    const locale = options.locale || global.HomepageI18n?.readStoredLocale?.() || "en";
    const theme = options.theme || readStoredTheme();
    const url = new URL(href, options.origin || global.location?.origin || "https://sichentao.github.io");
    if (url.pathname.startsWith("/academic/") || url.pathname.startsWith("/jsps-kakenhi/")) {
      url.searchParams.set("lang", locale);
    }
    if (url.pathname.startsWith("/academic/") || url.pathname.startsWith("/academic-frontier/") || url.pathname.startsWith("/jsps-kakenhi/")) {
      url.searchParams.set("theme", theme);
    }
    return `${url.pathname}${url.search}`;
  }

  function academicFrontierHref(locale = "en", theme = readStoredTheme()) {
    const normalizedLocale = global.HomepageI18n?.normalizeLocale(locale) || "en";
    const href = normalizedLocale === "en" ? "/academic-frontier/" : `/academic-frontier/${encodeURIComponent(normalizedLocale)}/`;
    return siteStateHref(href, { locale: normalizedLocale, theme });
  }

  function portalLabels(locale = "en") {
    const normalizedLocale = global.HomepageI18n?.normalizeLocale(locale) || "en";
    return PORTAL_LABELS[normalizedLocale] || PORTAL_LABELS.en;
  }

  function portalItems(options = {}) {
    const locale = options.locale || global.HomepageI18n?.readStoredLocale?.() || "en";
    const theme = options.theme || readStoredTheme();
    const currentPath = decodeURIComponent(options.currentPath || global.location?.pathname || "/");
    const labels = portalLabels(locale);
    return {
      labels,
      items: [
        {
          id: "portal",
          href: "/",
          label: labels.portal.full,
          triggerLabel: labels.portal.short,
          active: currentPath === "/",
          icon: "home",
        },
        {
          id: "academic",
          href: siteStateHref("/academic/", { locale, theme }),
          label: labels.academic.full,
          triggerLabel: labels.academic.short,
          active: currentPath.startsWith("/academic/"),
          icon: "portrait",
        },
        {
          id: "frontier",
          href: academicFrontierHref(locale, theme),
          label: labels.frontier.full,
          triggerLabel: labels.frontier.short,
          active: currentPath.startsWith("/academic-frontier/"),
          icon: "frontier",
        },
        {
          id: "jsps",
          href: siteStateHref("/jsps-kakenhi/", { locale, theme }),
          label: labels.jsps.full,
          triggerLabel: labels.jsps.short,
          active: currentPath.startsWith("/jsps-kakenhi/"),
          icon: "jsps",
        },
      ],
    };
  }

  global.HomepagePlatform = Object.freeze({
    THEME_STORAGE_KEY,
    LEGACY_THEME_STORAGE_KEYS,
    THEME_SEQUENCE,
    DEFAULT_THEME,
    THEMES,
    normalizeTheme,
    readStoredTheme,
    writeStoredTheme,
    applyTheme,
    themeLabel,
    siteStateHref,
    academicFrontierHref,
    portalLabels,
    portalItems,
  });
})(window);
