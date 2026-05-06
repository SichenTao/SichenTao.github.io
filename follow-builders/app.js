const FALLBACK_DATA = window.FOLLOW_BUILDERS_SNAPSHOT || {};
const LOCALE_CATALOG = window.HomepageI18n?.LOCALES || {
  en: { label: "English", name: "English", lang: "en" },
  zh: { label: "简体中文", name: "简体中文", lang: "zh-CN" },
  ja: { label: "日本語", name: "日本語", lang: "ja" },
};
const THEME_CATALOG = window.HomepagePlatform?.THEMES || {};
const LOCALE_SEQUENCE = window.HomepageI18n?.LOCALE_SEQUENCE || ["zh", "en", "ja"];
const THEME_SEQUENCE = window.HomepagePlatform?.THEME_SEQUENCE || ["tohoku", "toyama", "usst"];
const LOCALE_KEY = window.HomepageI18n?.STORAGE_KEY || "sichen-homepage-locale";
const THEME_KEY = window.HomepagePlatform?.THEME_STORAGE_KEY || "sichen-homepage-theme";
const DISPLAY_LANGUAGES_KEY = "follow-builders-display-languages-v3";
const TRANSLATION_CACHE_KEY = "follow-builders-content-translations-v1";
const EMBEDDED_TRANSLATION_CACHE = window.FOLLOW_BUILDERS_TRANSLATION_CACHE || {};
const LIVE_FEEDS_ENABLED = new URLSearchParams(window.location.search).get("live") === "1";
const DISPLAY_LANGUAGE_SEQUENCE = ["en", "zh", "ja"];
const TRANSLATION_TARGETS = {
  zh: "zh-CN",
  ja: "ja",
};

const REMOTE_FEEDS = {
  x: "https://raw.githubusercontent.com/zarazhangrui/follow-builders/main/feed-x.json",
  podcasts: "https://raw.githubusercontent.com/zarazhangrui/follow-builders/main/feed-podcasts.json",
  blogs: "https://raw.githubusercontent.com/zarazhangrui/follow-builders/main/feed-blogs.json",
};

const I18N = {
  en: {
    brand: {
      note: "Visualizing Zara Zhang's open-source project",
    },
    nav: {
      home: "Home",
      feed: "Feed",
      sources: "Sources",
      github: "GitHub",
    },
    hero: {
      kicker: "Zara Zhang's open project",
      title: "Follow Builders",
      lede: "A clean reading interface for the Follow Builders feed: people building AI products, research, and infrastructure.",
      start: "Start reading",
      source: "Original project",
      updatedLabel: "Feed updated",
      buildersLabel: "Builders",
      podcastLabel: "Podcast episodes",
    },
    controls: {
      display: "Display controls",
      language: "Language",
      languageChoices: "Language choices",
      displayLanguages: "Displayed languages",
      theme: "Color theme",
      themeChoices: "Theme choices",
      cycleLanguages: "Switch to the next language",
      cycleThemes: "Switch to the next theme",
      pageNavigation: "Page navigation",
      menu: "Menu",
      showMenu: "Show menu",
      hideMenu: "Hide menu",
      searchPlaceholder: "Search builders, posts, podcasts, or sources",
      filterSource: "Source",
      reset: "Reset filters",
    },
    types: {
      all: "Source",
      x: "X posts",
      podcast: "Podcasts",
      blog: "Blogs",
    },
    modes: {
      english: "English",
      current: "Current language",
      bilingual: "English + Chinese",
      trilingual: "Three-language view",
    },
    displayLanguages: {
      en: "English",
      zh: "简体中文",
      ja: "日本語",
    },
    feed: {
      kicker: "Readable feed",
      title: "Latest from builders",
      empty: "No Follow Builders items match the current filters.",
      minRead: "min read",
      open: "Read",
      live: "central feed",
    },
    sources: {
      kicker: "Central source list",
      title: "Who it tracks",
      builders: "AI builders on X",
      podcasts: "Podcasts",
      blogs: "Official blogs",
      projectNoteTitle: "Project note",
      projectNoteText: "This reader visualizes Zara Zhang's follow-builders open-source project.",
      projectNoteLink: "Original project",
    },
    github: {
      title: "GitHub",
      zaraTitle: "Zara Zhang",
      zaraText: "Original Follow Builders project",
      sichenTitle: "Sichen Tao",
      sichenText: "Homepage and research workspace",
    },
    article: {
      back: "Back to feed",
      original: "Original content",
      overview: "Why this appears here",
      sourceLinks: "Original links",
      tweet: "Original X post",
      transcript: "Transcript excerpt",
      podcast: "Podcast episode",
      github: "Project repository",
      missingFigure:
        "The upstream text mentions a figure, but the public feed does not include that image asset. Open the original source for the visual context.",
    },
  },
  zh: {
    brand: {
      note: "可视化 Zara Zhang 的开源项目",
    },
    nav: {
      home: "首页",
      feed: "信息流",
      sources: "来源",
      github: "GitHub",
    },
    hero: {
      kicker: "Zara Zhang 的开源项目",
      title: "Follow Builders",
      lede: "把 Follow Builders 的中心 feed 做成干净的阅读界面，关注真正做 AI 产品、研究和基础设施的人。",
      start: "开始阅读",
      source: "原项目",
      updatedLabel: "Feed 更新",
      buildersLabel: "Builders",
      podcastLabel: "播客节目",
    },
    controls: {
      display: "显示控制",
      language: "语言",
      languageChoices: "语言选项",
      displayLanguages: "显示语言",
      theme: "主题色",
      themeChoices: "主题选项",
      cycleLanguages: "切换到下一种语言",
      cycleThemes: "切换到下一个主题",
      pageNavigation: "页面导航",
      menu: "菜单",
      showMenu: "展开菜单",
      hideMenu: "收起菜单",
      searchPlaceholder: "搜索 builder、帖子、播客或来源",
      filterSource: "来源",
      reset: "重置筛选",
    },
    types: {
      all: "来源",
      x: "X 帖子",
      podcast: "播客",
      blog: "博客",
    },
    modes: {
      english: "英文原文",
      current: "当前语言",
      bilingual: "英文 + 中文",
      trilingual: "三语对照",
    },
    displayLanguages: {
      en: "English",
      zh: "简体中文",
      ja: "日本語",
    },
    feed: {
      kicker: "阅读信息流",
      title: "Builders 最新动态",
      empty: "当前筛选下没有匹配的 Follow Builders 内容。",
      minRead: "分钟阅读",
      open: "阅读",
      live: "中心 feed",
    },
    sources: {
      kicker: "中心来源列表",
      title: "追踪对象",
      builders: "X 上的 AI builders",
      podcasts: "播客",
      blogs: "官方博客",
      projectNoteTitle: "项目说明",
      projectNoteText: "本阅读器用于可视化 Zara Zhang 的 follow-builders 开源项目。",
      projectNoteLink: "原项目",
    },
    github: {
      title: "GitHub",
      zaraTitle: "Zara Zhang",
      zaraText: "Follow Builders 原始开源项目",
      sichenTitle: "Sichen Tao",
      sichenText: "个人主页与研究工作区",
    },
    article: {
      back: "返回信息流",
      original: "原始内容",
      overview: "为什么收录",
      sourceLinks: "原始链接",
      tweet: "原始 X 帖子",
      transcript: "字幕节选",
      podcast: "播客节目",
      github: "项目仓库",
      missingFigure: "上游文本提到了图示，但公开 feed 没有提供对应图片资源；如需查看图，请打开原文。",
    },
  },
  ja: {
    brand: {
      note: "Zara Zhang のオープンソースプロジェクトを可視化",
    },
    nav: {
      home: "ホーム",
      feed: "フィード",
      sources: "ソース",
      github: "GitHub",
    },
    hero: {
      kicker: "Zara Zhang のオープンプロジェクト",
      title: "Follow Builders",
      lede: "Follow Builders の中央フィードを、AI プロダクト、研究、基盤を実際に作る人々の読みやすい画面として表示します。",
      start: "読み始める",
      source: "元プロジェクト",
      updatedLabel: "フィード更新",
      buildersLabel: "Builders",
      podcastLabel: "Podcast",
    },
    controls: {
      display: "表示設定",
      language: "言語",
      languageChoices: "言語オプション",
      displayLanguages: "表示言語",
      theme: "テーマ色",
      themeChoices: "テーマオプション",
      cycleLanguages: "次の言語に切り替える",
      cycleThemes: "次のテーマに切り替える",
      pageNavigation: "ページナビゲーション",
      menu: "メニュー",
      showMenu: "メニューを開く",
      hideMenu: "メニューを閉じる",
      searchPlaceholder: "builder、投稿、podcast、ソースを検索",
      filterSource: "ソース",
      reset: "フィルタをリセット",
    },
    types: {
      all: "ソース",
      x: "X 投稿",
      podcast: "Podcast",
      blog: "ブログ",
    },
    modes: {
      english: "英語原文",
      current: "現在の言語",
      bilingual: "英語 + 中国語",
      trilingual: "三言語対照",
    },
    displayLanguages: {
      en: "English",
      zh: "简体中文",
      ja: "日本語",
    },
    feed: {
      kicker: "読みやすいフィード",
      title: "Builders の最新動向",
      empty: "現在のフィルタに一致する Follow Builders の項目はありません。",
      minRead: "分で読める",
      open: "読む",
      live: "中央フィード",
    },
    sources: {
      kicker: "中央ソースリスト",
      title: "追跡対象",
      builders: "X の AI builders",
      podcasts: "Podcasts",
      blogs: "公式ブログ",
      projectNoteTitle: "プロジェクトメモ",
      projectNoteText: "この reader は Zara Zhang の follow-builders オープンソースプロジェクトを可視化します。",
      projectNoteLink: "元プロジェクト",
    },
    github: {
      title: "GitHub",
      zaraTitle: "Zara Zhang",
      zaraText: "Follow Builders の元プロジェクト",
      sichenTitle: "Sichen Tao",
      sichenText: "個人ホームページと研究ワークスペース",
    },
    article: {
      back: "フィードに戻る",
      original: "原文",
      overview: "掲載理由",
      sourceLinks: "元リンク",
      tweet: "元の X 投稿",
      transcript: "字幕抜粋",
      podcast: "Podcast episode",
      github: "プロジェクトリポジトリ",
      missingFigure:
        "上流の本文には図への言及がありますが、公開 feed には画像アセットが含まれていません。図の文脈は原文で確認してください。",
    },
  },
};

const state = {
  locale: readInitialLocale(),
  theme: readInitialTheme(),
  query: "",
  type: "all",
  displayLanguages: readStoredDisplayLanguages(),
  data: normalizeData(FALLBACK_DATA),
  articles: [],
  activeId: "",
  remoteLoaded: false,
  translationCache: { ...EMBEDDED_TRANSLATION_CACHE, ...readStoredTranslationCache() },
  translationInflight: new Set(),
  feedTranslationInflight: new Set(),
};

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function decodeHtmlEntities(value) {
  const text = String(value ?? "");
  if (!/&(?:#\d+|#x[\da-f]+|[a-z][\da-z]+);/i.test(text)) {
    return text;
  }
  const textarea = document.createElement("textarea");
  textarea.innerHTML = text;
  return textarea.value;
}

function byId(id) {
  return document.getElementById(id);
}

function t(key) {
  return window.HomepageI18n?.text?.(I18N, key, { locale: state.locale }) || key;
}

function localize(value, fallback = "") {
  if (typeof value === "string") return value;
  return window.HomepageI18n?.localizeValue?.(value, { locale: state.locale, emptyValue: fallback }) || fallback;
}

function localizeForLanguage(value, language, fallback = "") {
  if (typeof value === "string") {
    return language === "en" ? value : "";
  }
  return value?.[language] || (language === "en" ? value?.en || fallback : "") || "";
}

function displayLanguageBlocks(value, fallback = "") {
  const blocks = normalizeDisplayLanguages(state.displayLanguages)
    .map((language) => ({ language, text: localizeForLanguage(value, language, fallback) }))
    .filter((block) => block.text);
  if (blocks.length) return blocks;
  const fallbackText = typeof value === "string" ? value : value?.en || fallback;
  return fallbackText ? [{ language: "en", text: fallbackText }] : [];
}

function languageAttr(language) {
  return language === "zh" ? "zh-CN" : language === "ja" ? "ja" : "en";
}

function displayLanguageLabel(language) {
  return t(`displayLanguages.${language}`) || {
    en: "English",
    zh: "简体中文",
    ja: "日本語",
  }[language] || language;
}

function readInitialLocale() {
  return window.HomepageI18n?.readStoredLocale?.({ locales: LOCALE_CATALOG }) || "en";
}

function readInitialTheme() {
  return window.HomepagePlatform?.readStoredTheme?.() || "tohoku";
}

function normalizeDisplayLanguages(languages, fallback = ["en"]) {
  const selected = new Set((languages || []).filter((language) => DISPLAY_LANGUAGE_SEQUENCE.includes(language)));
  if (!selected.size) {
    (fallback || []).forEach((language) => {
      if (DISPLAY_LANGUAGE_SEQUENCE.includes(language)) {
        selected.add(language);
      }
    });
  }
  if (!selected.size) selected.add("en");
  return DISPLAY_LANGUAGE_SEQUENCE.filter((language) => selected.has(language));
}

function defaultDisplayLanguage(locale = readInitialLocale()) {
  return DISPLAY_LANGUAGE_SEQUENCE.includes(locale) ? locale : "en";
}

function defaultDisplayLanguages(locale = readInitialLocale()) {
  return [defaultDisplayLanguage(locale)];
}

function displayLanguagesStorageKey(locale = readInitialLocale()) {
  return `${DISPLAY_LANGUAGES_KEY}-${defaultDisplayLanguage(locale)}`;
}

function readStoredDisplayLanguages(locale = readInitialLocale()) {
  try {
    const stored = JSON.parse(localStorage.getItem(displayLanguagesStorageKey(locale)) || "null");
    if (Array.isArray(stored)) {
      return normalizeDisplayLanguages(stored, defaultDisplayLanguages(locale));
    }
    return defaultDisplayLanguages(locale);
  } catch {
    return defaultDisplayLanguages(locale);
  }
}

function writeStoredDisplayLanguages(languages, locale = readInitialLocale()) {
  try {
    localStorage.setItem(displayLanguagesStorageKey(locale), JSON.stringify(normalizeDisplayLanguages(languages)));
  } catch {}
}

function displayLanguagesEqual(left, right) {
  const normalizedLeft = normalizeDisplayLanguages(left);
  const normalizedRight = normalizeDisplayLanguages(right);
  return normalizedLeft.length === normalizedRight.length && normalizedLeft.every((language, index) => language === normalizedRight[index]);
}

function setDisplayLanguages(languages) {
  state.displayLanguages = normalizeDisplayLanguages(languages);
  writeStoredDisplayLanguages(state.displayLanguages, state.locale);
}

function displayControlsDirty() {
  return !displayLanguagesEqual(state.displayLanguages, defaultDisplayLanguages(state.locale));
}

function feedControlsDirty() {
  return Boolean(state.query) || state.type !== "all" || displayControlsDirty();
}

function readStoredTranslationCache() {
  try {
    const value = JSON.parse(localStorage.getItem(TRANSLATION_CACHE_KEY) || "{}");
    return value && typeof value === "object" && !Array.isArray(value) ? value : {};
  } catch {
    return {};
  }
}

function writeStoredTranslationCache() {
  try {
    localStorage.setItem(TRANSLATION_CACHE_KEY, JSON.stringify(state.translationCache));
  } catch {}
}

function normalizeData(data = {}) {
  return {
    sourceRepo: data.sourceRepo || "https://github.com/zarazhangrui/follow-builders",
    generatedAt: data.generatedAt || data.feeds?.x?.generatedAt || data.feeds?.podcasts?.generatedAt || "",
    sources: data.sources || { podcasts: [], blogs: [], x_accounts: [] },
    feeds: {
      x: data.feeds?.x || { x: [], stats: {} },
      podcasts: data.feeds?.podcasts || { podcasts: [], stats: {} },
      blogs: data.feeds?.blogs || { blogs: [], stats: {} },
    },
  };
}

function contentText(value) {
  return decodeHtmlEntities(value)
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeText(value) {
  return contentText(value)
    .replace(/https?:\/\/t\.co\/\S+/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function multilingualText(value, fallback = "") {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    const en = contentText(value.en || fallback);
    const zh = contentText(value.zh || "");
    const ja = contentText(value.ja || "");
    return {
      en,
      zh,
      ja,
    };
  }
  const en = contentText(value || fallback);
  return { en, zh: "", ja: "" };
}

function clip(value, max = 150) {
  const text = normalizeText(value);
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trim()}...`;
}

function clipContent(value, max = 150) {
  const text = contentText(value);
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trim()}...`;
}

const FIGURE_REFERENCE_PATTERN = /\b(?:Figure|Fig\.?|figure|fig\.?)\s*\d+\b/;

function hasFigureReference(value) {
  const text = typeof value === "string" ? value : Object.values(value || {}).join(" ");
  return FIGURE_REFERENCE_PATTERN.test(contentText(text));
}

function headlineFromText(value, max = 180) {
  const text = normalizeText(value);
  if (!text) return "";
  const sentence = text.match(/^(.+?[.!?。！？])(?:\s|$)/)?.[1] || text;
  if (sentence.length <= max) return sentence;
  const words = sentence.split(/\s+/);
  let headline = "";
  for (const word of words) {
    const next = headline ? `${headline} ${word}` : word;
    if (next.length > max) break;
    headline = next;
  }
  return headline || sentence;
}

function slug(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function formatDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value).slice(0, 10);
  const locale = state.locale === "zh" ? "zh-CN" : state.locale === "ja" ? "ja-JP" : "en-US";
  return new Intl.DateTimeFormat(locale, { month: "short", day: "numeric", year: "numeric" }).format(date);
}

function formatCompactDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value).slice(0, 10);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
}

function readingMinutes(text) {
  const words = String(text || "").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

function stableHash(value) {
  let hash = 0;
  const text = String(value || "");
  for (let index = 0; index < text.length; index += 1) {
    hash = (hash * 31 + text.charCodeAt(index)) >>> 0;
  }
  return hash.toString(36);
}

function translationCacheKey(language, text) {
  return `${language}:${stableHash(text)}:${String(text || "").length}`;
}

function splitForTranslation(text, maxLength = 1100) {
  const source = contentText(text);
  if (!source) return [];
  const sentences = source.match(/[^.!?。！？]+[.!?。！？]?|\S+/g) || [source];
  const chunks = [];
  let current = "";
  sentences.forEach((sentence) => {
    const next = current ? `${current} ${sentence.trim()}` : sentence.trim();
    if (next.length > maxLength && current) {
      chunks.push(current);
      current = sentence.trim();
    } else {
      current = next;
    }
  });
  if (current) chunks.push(current);
  return chunks;
}

async function translateChunk(text, language) {
  const target = TRANSLATION_TARGETS[language];
  if (!target || !text) return "";
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${encodeURIComponent(target)}&dt=t&q=${encodeURIComponent(text)}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Translation request failed: ${response.status}`);
  const payload = await response.json();
  return contentText((payload?.[0] || []).map((part) => part?.[0] || "").join(""));
}

async function mapWithConcurrency(items, limit, worker) {
  const results = new Array(items.length);
  let cursor = 0;
  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      results[index] = await worker(items[index], index);
    }
  });
  await Promise.all(runners);
  return results;
}

async function translateText(text, language) {
  const source = contentText(text);
  if (!source || language === "en") return source;
  const key = translationCacheKey(language, source);
  if (state.translationCache[key]) {
    return state.translationCache[key];
  }
  if (!LIVE_FEEDS_ENABLED) {
    return "";
  }
  const chunks = splitForTranslation(source);
  const translatedChunks = await mapWithConcurrency(chunks, 4, (chunk) => translateChunk(chunk, language));
  const translated = contentText(translatedChunks.join(" "));
  if (translated) {
    state.translationCache[key] = translated;
    writeStoredTranslationCache();
  }
  return translated;
}

function articleTranslationTargets(article) {
  const targets = [
    { value: article.title, path: "title" },
    { value: article.dek, path: "dek" },
  ];
  (article.sections || []).forEach((section, index) => {
    targets.push({ value: section.text, path: `sections.${index}.text` });
  });
  return targets.filter((target) => target.value?.en);
}

function feedTranslationTargets(article) {
  return [
    { value: article.title, path: "title" },
    { value: article.dek, path: "dek" },
  ].filter((target) => target.value?.en);
}

async function hydrateFeedTranslations(articles) {
  const languages = normalizeDisplayLanguages(state.displayLanguages).filter((language) => language !== "en");
  if (!languages.length || !articles?.length) return;
  const visible = articles.slice(0, 16);
  const inflightKey = `${visible.map((article) => article.id).join("|")}:${languages.join(",")}`;
  if (state.feedTranslationInflight.has(inflightKey)) return;
  const targets = visible.flatMap((article) => feedTranslationTargets(article));
  const missing = targets.filter((target) => languages.some((language) => !target.value?.[language] && target.value?.en));
  if (!missing.length) return;

  state.feedTranslationInflight.add(inflightKey);
  let changed = false;
  try {
    await mapWithConcurrency(missing, 4, async (target) => {
      const translations = await Promise.all(
        languages.map(async (language) => {
          if (!target.value?.en || target.value[language]) return null;
          const translated = await translateText(target.value.en, language);
          return translated ? { language, translated } : null;
        }),
      );
      translations.filter(Boolean).forEach(({ language, translated }) => {
        target.value[language] = translated;
        changed = true;
      });
    });
  } catch (error) {
    console.warn("Follow Builders feed translation skipped", error);
  } finally {
    state.feedTranslationInflight.delete(inflightKey);
  }
  if (changed && !document.body.classList.contains("fb-article-open")) {
    renderFeed();
  }
}

async function hydrateArticleTranslations(article) {
  if (!article) return;
  const languages = normalizeDisplayLanguages(state.displayLanguages).filter((language) => language !== "en");
  if (!languages.length) return;
  const inflightKey = `${article.id}:${languages.join(",")}`;
  if (state.translationInflight.has(inflightKey)) return;
  const targets = articleTranslationTargets(article).filter((target) =>
    languages.some((language) => !target.value?.[language] && target.value?.en),
  );
  if (!targets.length) return;

  state.translationInflight.add(inflightKey);
  let changed = false;
  try {
    for (const target of targets) {
      const translations = await Promise.all(
        languages.map(async (language) => {
          if (!target.value?.en || target.value[language]) return null;
          const translated = await translateText(target.value.en, language);
          return translated ? { language, translated } : null;
        }),
      );
      translations.filter(Boolean).forEach(({ language, translated }) => {
        target.value[language] = translated;
        changed = true;
      });
    }
  } catch (error) {
    console.warn("Follow Builders translation skipped", error);
  } finally {
    state.translationInflight.delete(inflightKey);
  }
  if (changed && state.activeId === article.id && document.body.classList.contains("fb-article-open")) {
    renderArticle(article);
  }
}

function titleFromTweet(builder) {
  const first = builder.tweets?.[0]?.text || "";
  const quote = headlineFromText(first);
  return quote ? `${builder.name}: ${quote}` : `${builder.name}: recent builder notes`;
}

function xArticle(builder) {
  const tweets = Array.isArray(builder.tweets) ? builder.tweets : [];
  const firstDate = tweets[0]?.createdAt || "";
  const bodyText = tweets.map((tweet) => tweet.text).join(" ");
  const titleEn = titleFromTweet(builder);
  return {
    id: `x-${slug(builder.handle || builder.name)}`,
    type: "x",
    source: builder.name,
    handle: builder.handle,
    date: firstDate,
    title: {
      en: titleEn,
      zh: "",
      ja: "",
    },
    dek: {
      en: `${tweets.length} recent X update${tweets.length === 1 ? "" : "s"} from @${builder.handle}.`,
      zh: `来自 @${builder.handle} 的 ${tweets.length} 条近期 X 动态。`,
      ja: `@${builder.handle} からの最近の X 投稿 ${tweets.length} 件。`,
    },
    tags: ["X", builder.handle, "builder"].filter(Boolean),
    minutes: readingMinutes(bodyText),
    sections: [
      ...tweets.map((tweet, index) => ({
        kind: "quote",
        label: {
          en: `Original X post ${index + 1}`,
          zh: `原始 X 帖子 ${index + 1}`,
          ja: `元の X 投稿 ${index + 1}`,
        },
        text: multilingualText(tweet.text || ""),
        url: tweet.url || "",
        date: tweet.createdAt || "",
      })),
    ],
    links: tweets.map((tweet, index) => ({
      label: `X ${index + 1}`,
      href: tweet.url,
    })).filter((link) => link.href),
  };
}

function podcastArticle(episode) {
  const excerpt = clipContent(episode.transcript || "", 1400);
  return {
    id: `podcast-${slug(episode.name)}-${slug(episode.guid || episode.title)}`,
    type: "podcast",
    source: episode.name,
    date: episode.publishedAt,
    title: {
      en: episode.title || episode.name,
      zh: "",
      ja: "",
    },
    dek: {
      en: `${episode.name} episode from the podcast feed.`,
      zh: `来自 ${episode.name} 的播客节目。`,
      ja: `${episode.name} の podcast エピソード。`,
    },
    tags: ["Podcast", episode.name].filter(Boolean),
    minutes: readingMinutes(episode.transcript || episode.title),
    sections: [
      {
        kind: "quote",
        label: {
          en: "Transcript excerpt",
          zh: "字幕节选",
          ja: "字幕抜粋",
        },
        text: multilingualText(excerpt),
        url: episode.url,
        date: episode.publishedAt,
      },
    ],
    links: episode.url ? [{ label: episode.name || "Podcast", href: episode.url }] : [],
  };
}

function blogArticle(post) {
  const content = contentText(post.content || post.summary || "");
  const summary = contentText(post.summary || post.description || "");
  const title = contentText(post.title || "Official blog update");
  return {
    id: `blog-${slug(post.url || post.title)}`,
    type: "blog",
    source: post.source || post.name || "Official blog",
    date: post.publishedAt || post.date,
    title: {
      en: title,
      zh: "",
      ja: "",
    },
    dek: {
      en: summary || "Official AI company blog post.",
      zh: summary || "AI 公司官方博客文章。",
      ja: summary || "AI 企業の公式ブログ記事です。",
    },
    tags: ["Blog", post.source || post.name].filter(Boolean),
    minutes: readingMinutes(post.content || post.summary || post.title),
    sections: [
      {
        kind: "paragraph",
        label: {
          en: "Blog note",
          zh: "博客说明",
          ja: "ブログメモ",
        },
        text: multilingualText(content || summary || "Open the original blog link for the full post."),
        hasMissingFigure: hasFigureReference(content || summary),
      },
    ],
    links: post.url ? [{ label: post.source || "Blog", href: post.url }] : [],
  };
}

function buildArticles(data) {
  const xArticles = (data.feeds.x.x || []).map(xArticle);
  const podcastArticles = (data.feeds.podcasts.podcasts || []).map(podcastArticle);
  const blogArticles = (data.feeds.blogs.blogs || []).map(blogArticle);
  return [...podcastArticles, ...xArticles, ...blogArticles]
    .sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));
}

function replaceUrlStateParam(key, value) {
  const url = new URL(window.location.href);
  url.searchParams.set(key, value);
  window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
}

function nextName(current, sequence, catalog) {
  const values = sequence.filter((name) => catalog[name]);
  const index = values.indexOf(current);
  return values[(index + 1) % values.length] || values[0] || current;
}

function statefulHref(path, hash = "") {
  const base = window.HomepagePlatform?.siteStateHref?.(path, { locale: state.locale, theme: state.theme }) || path;
  return `${base}${hash}`;
}

function applyDocumentState() {
  window.HomepageI18n?.applyDocumentLocale?.(state.locale, { locales: LOCALE_CATALOG });
  window.HomepagePlatform?.applyTheme?.(state.theme, { persist: false });
  document.body.dataset.lang = state.locale;
  document.title = "Follow Builders | Sichen Tao";
}

function renderStaticText() {
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  document.querySelectorAll(".header-controls").forEach((node) => node.setAttribute("aria-label", t("controls.display")));
  document.querySelectorAll(".topnav").forEach((node) => node.setAttribute("aria-label", t("controls.pageNavigation")));

  const navHrefs = [
    statefulHref("/follow-builders/", "#feed"),
    statefulHref("/follow-builders/", "#github"),
  ];
  document.querySelectorAll(".topnav a").forEach((link, index) => {
    if (navHrefs[index]) {
      link.href = navHrefs[index];
    }
  });

  const updated = byId("fb-updated");
  const builderCount = byId("fb-builder-count");
  const podcastCount = byId("fb-podcast-count");
  if (updated) updated.textContent = formatCompactDate(state.data.generatedAt) || "-";
  if (builderCount) builderCount.textContent = String(state.data.sources.x_accounts?.length || state.data.feeds.x.x?.length || 0);
  if (podcastCount) podcastCount.textContent = String(state.data.sources.podcasts?.length || 0);
}

function renderControls() {
  if (window.HomepageComponents?.renderLocaleSwitcher) {
    window.HomepageComponents.renderLocaleSwitcher(".locale-switcher", {
      locale: state.locale,
      locales: LOCALE_CATALOG,
      sequence: LOCALE_SEQUENCE,
      ariaLabel: t("controls.language"),
      triggerLabel: t("controls.languageChoices"),
      trayLabel: t("controls.languageChoices"),
      onChoice: (localeName) => setLocale(localeName),
    });
  }

  if (window.HomepageComponents?.renderThemeSwitcher) {
    window.HomepageComponents.renderThemeSwitcher(".theme-switcher", {
      locale: state.locale,
      theme: state.theme,
      themes: THEME_CATALOG,
      sequence: THEME_SEQUENCE,
      ariaLabel: t("controls.theme"),
      trayLabel: t("controls.themeChoices"),
      onChoice: (themeName) => setTheme(themeName),
    });
  }

  const search = byId("fb-search");
  if (search) {
    search.placeholder = t("controls.searchPlaceholder");
    search.value = state.query;
    if (search.dataset.bound !== "true") {
      search.dataset.bound = "true";
      search.addEventListener("input", () => {
        state.query = search.value.trim();
        renderFeed();
      });
    }
  }

  renderLanguageDisplayControl();
  renderDisplayResetButtons();
}

function renderLanguageDisplayControl() {
  document.querySelectorAll(".fb-language-display").forEach((control) => {
    control.setAttribute("aria-label", t("controls.displayLanguages"));
    control.innerHTML = DISPLAY_LANGUAGE_SEQUENCE.map((language) => {
      const selected = state.displayLanguages.includes(language);
      return `
        <button
          class="fb-language-chip${selected ? " is-selected" : ""}"
          type="button"
          data-display-language="${language}"
          aria-pressed="${selected ? "true" : "false"}"
        >
          ${escapeHtml(displayLanguageLabel(language))}
        </button>
      `;
    }).join("");
    control.querySelectorAll("[data-display-language]").forEach((button) => {
      button.addEventListener("click", () => {
        const language = button.dataset.displayLanguage;
        const selected = new Set(state.displayLanguages);
        if (selected.has(language) && selected.size > 1) {
          selected.delete(language);
        } else {
          selected.add(language);
        }
        setDisplayLanguages(Array.from(selected));
        render();
      });
    });
  });
}

function resetFeedControls() {
  state.query = "";
  state.type = "all";
  setDisplayLanguages(defaultDisplayLanguages(state.locale));
}

function resetDisplayControls() {
  setDisplayLanguages(defaultDisplayLanguages(state.locale));
}

function renderDisplayResetButtons() {
  document.querySelectorAll("[data-fb-display-reset]").forEach((button) => {
    const scope = button.dataset.fbDisplayReset || "display";
    button.setAttribute("aria-label", t("controls.reset"));
    button.setAttribute("title", t("controls.reset"));
    button.disabled = scope === "all" ? !feedControlsDirty() : !displayControlsDirty();
    if (button.dataset.bound === "true") return;
    button.dataset.bound = "true";
    button.addEventListener("click", () => {
      if (scope === "all") {
        resetFeedControls();
      } else {
        resetDisplayControls();
      }
      render();
    });
  });
}

function searchableText(article) {
  return [
    article.type,
    article.source,
    article.handle,
    ...(article.tags || []),
    ...Object.values(article.title || {}),
    ...Object.values(article.dek || {}),
    ...(article.sections || []).map((section) => typeof section.text === "string" ? section.text : Object.values(section.text || {}).join(" ")),
  ].join(" ").toLowerCase();
}

function filteredArticles() {
  const query = state.query.toLowerCase();
  return state.articles
    .filter((article) => state.type === "all" || article.type === state.type)
    .filter((article) => !query || searchableText(article).includes(query));
}

function typeLabel(type) {
  return t(`types.${type}`) || type;
}

function renderFeed() {
  const list = byId("fb-story-list");
  if (!list) return;
  const articles = filteredArticles();
  if (!articles.length) {
    list.innerHTML = `<p class="fb-empty">${escapeHtml(t("feed.empty"))}</p>`;
    return;
  }
  list.innerHTML = articles.map((article) => {
    const titleBlocks = displayLanguageBlocks(article.title, article.title.en || "");
    const dekBlocks = displayLanguageBlocks(article.dek, article.dek.en || "");
    return `
      <button class="fb-story-card" type="button" data-article-id="${escapeHtml(article.id)}">
        <span class="fb-story-body">
          <span class="fb-story-meta">
            <span class="fb-story-type">${escapeHtml(typeLabel(article.type))}</span>
            <span>${escapeHtml(article.source || "")}</span>
            <span>${escapeHtml(formatDate(article.date))}</span>
            <span>${escapeHtml(article.minutes || 1)} ${escapeHtml(t("feed.minRead"))}</span>
          </span>
          <span class="fb-story-title-group">${renderStoryTextBlocks(titleBlocks, "fb-story-title", "fb-story-title-translation")}</span>
          <span class="fb-story-dek-group">${renderStoryTextBlocks(dekBlocks, "fb-story-dek", "fb-story-dek-translation")}</span>
          <span class="fb-story-tags">${(article.tags || []).slice(0, 4).map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</span>
        </span>
        <span class="fb-story-arrow" aria-hidden="true">→</span>
      </button>
    `;
  }).join("");
  list.querySelectorAll("[data-article-id]").forEach((button) => {
    button.addEventListener("click", () => openArticle(button.dataset.articleId));
  });
  hydrateFeedTranslations(articles);
}

function renderSources() {
  const sources = state.data.sources || {};
  const xAccounts = sources.x_accounts || [];
  const podcasts = sources.podcasts || [];
  const blogs = sources.blogs || [];
  byId("fb-source-stats").innerHTML = `
    <div><strong>${escapeHtml(xAccounts.length)}</strong><span>X</span></div>
    <div><strong>${escapeHtml(podcasts.length)}</strong><span>${escapeHtml(t("types.podcast"))}</span></div>
    <div><strong>${escapeHtml(blogs.length)}</strong><span>${escapeHtml(t("types.blog"))}</span></div>
  `;
  byId("fb-builder-list").innerHTML = xAccounts
    .map((item) => `<a href="https://x.com/${escapeHtml(item.handle)}">${escapeHtml(item.name)}</a>`)
    .join("");
  byId("fb-podcast-list").innerHTML = podcasts
    .map((item) => `<a href="${escapeHtml(item.url || "#")}">${escapeHtml(item.name)}</a>`)
    .join("");
  byId("fb-blog-list").innerHTML = blogs
    .map((item) => `<a href="${escapeHtml(item.indexUrl || item.url || "#")}">${escapeHtml(item.name)}</a>`)
    .join("");
}

function sectionParagraphs(section) {
  return displayLanguageBlocks(section.text, section.text?.en || "");
}

function renderMissingFigureNotice(section) {
  const figures = Array.isArray(section.figures) ? section.figures : [];
  if (figures.length || !(section.hasMissingFigure || hasFigureReference(section.text))) {
    return "";
  }
  return `<p class="fb-source-integrity-note">${escapeHtml(t("article.missingFigure"))}</p>`;
}

function renderLanguageTextBlocks(blocks, tagName = "p") {
  const multiple = blocks.length > 1;
  return blocks
    .map((block) => `
      <${tagName} class="${multiple ? "fb-language-block" : ""}" lang="${languageAttr(block.language)}">
        ${escapeHtml(block.text)}
      </${tagName}>
    `)
    .join("");
}

function renderStoryTextBlocks(blocks, primaryClass, secondaryClass) {
  const multiple = blocks.length > 1;
  return blocks
    .map((block, index) => {
      const className = index === 0 ? primaryClass : secondaryClass;
      const tagName = index === 0 && primaryClass === "fb-story-title" ? "strong" : "span";
      return `<${tagName} class="${className}" lang="${languageAttr(block.language)}">${escapeHtml(block.text)}</${tagName}>`;
    })
    .join("");
}

function renderArticleTitleBlocks(blocks) {
  return blocks
    .map((block, index) => {
      if (index === 0) {
        return `<h1 lang="${languageAttr(block.language)}">${escapeHtml(block.text)}</h1>`;
      }
      return `<p class="fb-article-title-translation" lang="${languageAttr(block.language)}">${escapeHtml(block.text)}</p>`;
    })
    .join("");
}

function renderArticle(article) {
  const container = byId("article");
  if (!container || !article) return;
  const titleBlocks = displayLanguageBlocks(article.title, article.title.en || "");
  const dekBlocks = displayLanguageBlocks(article.dek, article.dek.en || "");
  const links = (article.links || []).filter((link) => link.href);
  container.innerHTML = `
    <div class="fb-article-tools">
      <button class="fb-article-back" type="button" data-back-to-feed>
        <span aria-hidden="true">←</span>
        ${escapeHtml(t("article.back"))}
      </button>
      <div class="fb-article-control-group">
        <div class="fb-language-display fb-language-display--article" role="group" aria-label="${escapeHtml(t("controls.displayLanguages"))}"></div>
        <button class="fb-icon-button" type="button" data-fb-display-reset="display" aria-label="${escapeHtml(t("controls.reset"))}" title="${escapeHtml(t("controls.reset"))}">
          <svg class="ui-icon" aria-hidden="true"><use href="/academic/assets/icons/ui-icons.svg#icon-reset"></use></svg>
        </button>
      </div>
    </div>
    <header class="fb-article-head">
      <p class="eyebrow">${escapeHtml(typeLabel(article.type))}</p>
      <div class="fb-article-title-group">
        ${renderArticleTitleBlocks(titleBlocks)}
      </div>
      <div class="fb-article-dek-group">
        ${renderLanguageTextBlocks(dekBlocks, "p")}
      </div>
      <div class="fb-article-meta">
        <span>${escapeHtml(article.source || "")}</span>
        <span>${escapeHtml(formatDate(article.date))}</span>
        <span>${escapeHtml(article.minutes || 1)} ${escapeHtml(t("feed.minRead"))}</span>
      </div>
    </header>
    <div class="fb-article-body">
      ${(article.sections || []).map((section) => {
        const label = localize(section.label, t("article.original"));
        if (section.kind === "quote") {
          const quoteBlocks = sectionParagraphs(section);
          return `
            <section class="fb-body-section">
              <h2>${escapeHtml(label)}</h2>
              ${renderLanguageTextBlocks(quoteBlocks, "blockquote")}
              ${renderMissingFigureNotice(section)}
              ${section.url ? `<a href="${escapeHtml(section.url)}">${escapeHtml(t("article.original"))}</a>` : ""}
            </section>
          `;
        }
        return `
          <section class="fb-body-section">
            <h2>${escapeHtml(label)}</h2>
            ${renderLanguageTextBlocks(sectionParagraphs(section), "p")}
            ${renderMissingFigureNotice(section)}
          </section>
        `;
      }).join("")}
    </div>
    ${
      links.length
        ? `<footer class="fb-article-links">
            ${links.map((link) => `<a href="${escapeHtml(link.href)}">${escapeHtml(link.label || link.href)}</a>`).join("")}
          </footer>`
        : ""
    }
  `;
  renderLanguageDisplayControl();
  renderDisplayResetButtons();
  container.querySelector("[data-back-to-feed]")?.addEventListener("click", closeArticle);
  hydrateArticleTranslations(article);
}

function openArticle(id, options = {}) {
  const article = state.articles.find((item) => item.id === id);
  if (!article) return;
  state.activeId = id;
  document.body.classList.add("fb-article-open");
  byId("article").hidden = false;
  renderArticle(article);
  if (options.updateHash !== false) {
    window.history.pushState(null, "", `${statefulHref("/follow-builders/")}#article-${encodeURIComponent(id)}`);
  }
  scrollToPageTop();
}

function closeArticle(options = {}) {
  document.body.classList.remove("fb-article-open");
  byId("article").hidden = true;
  if (options.updateHash !== false) {
    window.history.pushState(null, "", `${statefulHref("/follow-builders/")}#feed`);
  }
}

function renderArticleIfOpen() {
  if (document.body.classList.contains("fb-article-open")) {
    renderArticle(state.articles.find((article) => article.id === state.activeId));
  }
}

function scrollToPageTop() {
  const jump = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };
  jump();
  requestAnimationFrame(jump);
  setTimeout(jump, 80);
}

function handleHash() {
  const hash = decodeURIComponent(window.location.hash || "");
  if (hash.startsWith("#article-")) {
    openArticle(hash.replace("#article-", ""), { updateHash: false });
  } else {
    closeArticle({ updateHash: false });
  }
}

function setLocale(localeName) {
  const normalized = window.HomepageI18n?.normalizeLocale?.(localeName, LOCALE_CATALOG) || "";
  if (!normalized || normalized === state.locale) return;
  state.locale = normalized;
  state.displayLanguages = readStoredDisplayLanguages(normalized);
  window.HomepageI18n?.writeStoredLocale?.(normalized, { locales: LOCALE_CATALOG });
  try {
    localStorage.setItem(LOCALE_KEY, normalized);
  } catch {}
  replaceUrlStateParam("lang", normalized);
  render();
}

function setTheme(themeName) {
  const normalized = window.HomepagePlatform?.normalizeTheme?.(themeName) || "";
  if (!normalized || normalized === state.theme) return;
  state.theme = normalized;
  window.HomepagePlatform?.writeStoredTheme?.(normalized);
  try {
    localStorage.setItem(THEME_KEY, normalized);
  } catch {}
  replaceUrlStateParam("theme", normalized);
  render();
}

function syncShell() {
  window.HomepageSharedShell?.sync({
    switchers: {
      root: document,
      localeCycleLabel: t("controls.cycleLanguages"),
      themeCycleLabel: t("controls.cycleThemes"),
      onCycleLocale: () => setLocale(nextName(state.locale, LOCALE_SEQUENCE, LOCALE_CATALOG)),
      onCycleTheme: () => setTheme(nextName(state.theme, THEME_SEQUENCE, THEME_CATALOG)),
    },
    topnav: {
      root: document,
      navSelector: ".topnav",
      navAriaLabel: t("controls.pageNavigation"),
      menuLabel: t("controls.menu"),
      showMenuLabel: t("controls.showMenu"),
      hideMenuLabel: t("controls.hideMenu"),
      toggleInnerHTML:
        '<svg class="ui-icon" aria-hidden="true"><use href="/academic/assets/icons/ui-icons.svg#icon-menu"></use></svg><span class="topnav-toggle-label"></span>',
      hintInnerHTML: '<svg class="ui-icon" aria-hidden="true"><use href="/academic/assets/icons/ui-icons.svg#icon-up"></use></svg>',
    },
  });
}

function render() {
  state.articles = buildArticles(state.data);
  applyDocumentState();
  renderStaticText();
  renderControls();
  renderFeed();
  renderSources();
  renderArticleIfOpen();
  syncShell();
}

async function fetchJson(url) {
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) throw new Error(`Failed to fetch ${url}`);
  return response.json();
}

async function loadRemoteFeeds() {
  try {
    const [x, podcasts, blogs] = await Promise.all([
      fetchJson(REMOTE_FEEDS.x),
      fetchJson(REMOTE_FEEDS.podcasts),
      fetchJson(REMOTE_FEEDS.blogs),
    ]);
    state.data = normalizeData({
      ...state.data,
      generatedAt: x.generatedAt || podcasts.generatedAt || blogs.generatedAt || state.data.generatedAt,
      feeds: { x, podcasts, blogs },
    });
    state.remoteLoaded = true;
    render();
    handleHash();
  } catch {
    state.remoteLoaded = false;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  render();
  handleHash();
  if (LIVE_FEEDS_ENABLED) {
    loadRemoteFeeds();
  }
});
window.addEventListener("hashchange", handleHash);
window.addEventListener("popstate", handleHash);
