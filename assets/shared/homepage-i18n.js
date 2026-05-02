(function initHomepageI18n(global) {
  if (global.HomepageI18n) {
    return;
  }

  const STORAGE_KEY = "sichen-homepage-locale";
  const LEGACY_STORAGE_KEYS = ["academic-frontier-language", "kakenhi-portal-locale"];
  const DEFAULT_LOCALE = "en";
  const LOCALES = {
    en: { label: "EN", name: "English", lang: "en" },
    zh: { label: "中", name: "中文", lang: "zh-CN" },
    ja: { label: "日", name: "日本語", lang: "ja" },
  };
  const LOCALE_SEQUENCE = ["en", "zh", "ja"];

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

  function normalizeLocale(value, allowedLocales = LOCALES) {
    const raw = String(value || "").trim().toLowerCase();
    if (!raw) {
      return "";
    }
    const normalized = raw.replace("_", "-");
    if (allowedLocales[normalized]) {
      return normalized;
    }
    if (normalized.startsWith("zh")) {
      return allowedLocales.zh ? "zh" : "";
    }
    if (normalized.startsWith("ja")) {
      return allowedLocales.ja ? "ja" : "";
    }
    if (normalized.startsWith("en")) {
      return allowedLocales.en ? "en" : "";
    }
    return "";
  }

  function htmlLang(locale) {
    return LOCALES[normalizeLocale(locale)]?.lang || LOCALES[DEFAULT_LOCALE].lang;
  }

  function fallbackChain(locale, options = {}) {
    const allowedLocales = options.locales || LOCALES;
    const primary = normalizeLocale(locale, allowedLocales) || DEFAULT_LOCALE;
    const chain = [primary];
    const preferredFallbacks = options.fallbacks || [DEFAULT_LOCALE, "zh", "ja"];
    preferredFallbacks.forEach((candidate) => {
      const normalized = normalizeLocale(candidate, allowedLocales);
      if (normalized && allowedLocales[normalized] && !chain.includes(normalized)) {
        chain.push(normalized);
      }
    });
    return chain;
  }

  function readStoredLocale(options = {}) {
    const allowedLocales = options.locales || LOCALES;
    const queryParam = options.queryParam || "lang";
    const fallback = normalizeLocale(options.fallback, allowedLocales) || DEFAULT_LOCALE;

    const queryLocale = normalizeLocale(new URLSearchParams(global.location?.search || "").get(queryParam), allowedLocales);
    if (queryLocale) {
      return queryLocale;
    }

    const storageKeys = [options.storageKey || STORAGE_KEY, ...(options.legacyKeys || LEGACY_STORAGE_KEYS)];
    for (const key of storageKeys) {
      const sessionValue = normalizeLocale(storageGet(global.sessionStorage, key), allowedLocales);
      if (sessionValue) {
        return sessionValue;
      }
      const localValue = normalizeLocale(storageGet(global.localStorage, key), allowedLocales);
      if (localValue) {
        return localValue;
      }
    }

    const documentLocale = normalizeLocale(global.document?.documentElement?.lang, allowedLocales);
    return documentLocale || fallback;
  }

  function writeStoredLocale(locale, options = {}) {
    const allowedLocales = options.locales || LOCALES;
    const normalized = normalizeLocale(locale, allowedLocales);
    if (!normalized) {
      return "";
    }

    const storageKey = options.storageKey || STORAGE_KEY;
    storageSet(global.localStorage, storageKey, normalized);
    storageSet(global.sessionStorage, storageKey, normalized);
    (options.legacyKeys || []).forEach((key) => {
      storageSet(global.localStorage, key, normalized);
      storageSet(global.sessionStorage, key, normalized);
    });
    return normalized;
  }

  function applyDocumentLocale(locale, options = {}) {
    const allowedLocales = options.locales || LOCALES;
    const normalized = normalizeLocale(locale, allowedLocales) || DEFAULT_LOCALE;
    if (global.document?.documentElement) {
      global.document.documentElement.lang = allowedLocales[normalized]?.lang || htmlLang(normalized);
    }
    if (global.document?.body && options.bodyDataset !== false) {
      global.document.body.dataset.lang = normalized;
    }
    return normalized;
  }

  function getPath(source, key) {
    if (!source || !key) {
      return undefined;
    }
    return String(key)
      .split(".")
      .reduce((current, segment) => (current && current[segment] !== undefined ? current[segment] : undefined), source);
  }

  function formatMessage(template, values = {}) {
    return String(template ?? "").replace(/\{(\w+)\}/g, (_, key) => values[key] ?? "");
  }

  function text(catalog, key, options = {}) {
    const chain = fallbackChain(options.locale, { locales: options.locales, fallbacks: options.fallbacks });
    for (const locale of chain) {
      const value = getPath(catalog?.[locale], key);
      if (value !== undefined && value !== null) {
        return formatMessage(value, options.values);
      }
    }
    const direct = getPath(catalog, key);
    if (direct !== undefined && direct !== null && typeof direct !== "object") {
      return formatMessage(direct, options.values);
    }
    return options.missingValue ?? key;
  }

  function isLocaleObject(value, locales = LOCALES) {
    return Boolean(
      value &&
        typeof value === "object" &&
        !Array.isArray(value) &&
        Object.keys(locales).some((locale) => Object.prototype.hasOwnProperty.call(value, locale)),
    );
  }

  function localizeValue(value, options = {}) {
    if (value === undefined || value === null) {
      return options.emptyValue ?? "";
    }
    if (typeof value !== "object" || Array.isArray(value)) {
      return value;
    }

    const locales = options.locales || LOCALES;
    const chain = fallbackChain(options.locale, { locales, fallbacks: options.fallbacks });
    for (const locale of chain) {
      if (value[locale] !== undefined && value[locale] !== null && value[locale] !== "") {
        return value[locale];
      }
    }

    for (const key of options.canonicalKeys || ["canonical", "official", "source", "value", "text", "title", "name", "label"]) {
      if (value[key] !== undefined && value[key] !== null && value[key] !== "") {
        return value[key];
      }
    }
    return options.emptyValue ?? "";
  }

  function localizedField(record, field, options = {}) {
    if (!record || !field) {
      return options.emptyValue ?? "";
    }

    const locales = options.locales || LOCALES;
    const chain = fallbackChain(options.locale, { locales, fallbacks: options.fallbacks });
    const direct = record[field];
    if (isLocaleObject(direct, locales)) {
      return localizeValue(direct, options);
    }

    for (const locale of chain) {
      const localized = record[`${field}_${locale}`];
      if (localized !== undefined && localized !== null && localized !== "") {
        return localized;
      }
    }

    if (direct !== undefined && direct !== null && direct !== "") {
      return direct;
    }

    for (const key of options.aliases || []) {
      const value = localizedField(record, key, { ...options, aliases: [] });
      if (value !== undefined && value !== null && value !== "") {
        return value;
      }
    }
    return options.emptyValue ?? "";
  }

  function localizedList(record, field, options = {}) {
    const value = localizedField(record, field, { ...options, emptyValue: [] });
    if (Array.isArray(value)) {
      return value;
    }
    if (value === undefined || value === null || value === "") {
      return [];
    }
    return [value];
  }

  global.HomepageI18n = Object.freeze({
    STORAGE_KEY,
    LEGACY_STORAGE_KEYS,
    DEFAULT_LOCALE,
    LOCALES,
    LOCALE_SEQUENCE,
    normalizeLocale,
    htmlLang,
    fallbackChain,
    readStoredLocale,
    writeStoredLocale,
    applyDocumentLocale,
    getPath,
    formatMessage,
    text,
    isLocaleObject,
    localizeValue,
    localizedField,
    localizedList,
  });
})(window);
