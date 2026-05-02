const THEME_STORAGE_KEY = window.HomepagePlatform?.THEME_STORAGE_KEY || "sichen-homepage-theme";
const LOCALE_STORAGE_KEY = window.HomepageI18n?.STORAGE_KEY || "sichen-homepage-locale";
const THEME_SWITCH_SEQUENCE = window.HomepagePlatform?.THEME_SEQUENCE || ["tohoku", "toyama", "usst"];
const LOCALE_SWITCH_SEQUENCE = window.HomepageI18n?.LOCALE_SEQUENCE || ["zh", "en", "ja"];
let themeUiBound = false;
let localeUiBound = false;
let switcherHoverBound = false;
let scrollTopUiBound = false;
let topnavOverflowBound = false;
let topnavMenuBound = false;
let headerControlsPositionBound = false;
let headerControlsPositionTicking = false;
let scrollTopButton = null;
let dataReady = false;
const switcherCloseTimers = new WeakMap();

function normalizeString(value) {
  const localized = localizeDataValue(value);
  return String(localized ?? "").replace(/\s+/g, " ").trim();
}

function localizeDataValue(value, localeName = resolveLocaleName()) {
  if (window.HomepageI18n?.isLocaleObject?.(value, localeCatalog)) {
    return window.HomepageI18n.localizeValue(value, { locale: localeName, locales: localeCatalog });
  }
  return value;
}

function escapeHtml(value) {
  return normalizeString(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function escapeRegex(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function toTitle(value) {
  return normalizeString(value).replaceAll("_", " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

function truncateText(value, limit = 110) {
  const text = normalizeString(value);
  return text.length > limit ? `${text.slice(0, limit - 1)}…` : text;
}

function currentPage() {
  return document.body.dataset.page || "home";
}

function readSessionValue(key) {
  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeSessionValue(key, value) {
  try {
    window.sessionStorage.setItem(key, value);
  } catch {}
}
