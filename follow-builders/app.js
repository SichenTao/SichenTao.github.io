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
const MODE_KEY = "follow-builders-reading-mode";
const DISPLAY_LANGUAGES_KEY = "follow-builders-display-languages";
const DISPLAY_LANGUAGE_SEQUENCE = ["en", "zh", "ja"];

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
      reset: "Reset filters",
    },
    types: {
      all: "All",
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
      en: "EN",
      zh: "中文",
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
    article: {
      back: "Back to feed",
      original: "Original content",
      overview: "Why this appears here",
      sourceLinks: "Original links",
      tweet: "Original X post",
      transcript: "Transcript excerpt",
      podcast: "Podcast episode",
      github: "Project repository",
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
      reset: "重置筛选",
    },
    types: {
      all: "全部",
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
      en: "EN",
      zh: "中文",
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
    article: {
      back: "返回信息流",
      original: "原始内容",
      overview: "为什么收录",
      sourceLinks: "原始链接",
      tweet: "原始 X 帖子",
      transcript: "字幕节选",
      podcast: "播客节目",
      github: "项目仓库",
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
      reset: "フィルタをリセット",
    },
    types: {
      all: "すべて",
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
      en: "EN",
      zh: "中文",
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
    article: {
      back: "フィードに戻る",
      original: "原文",
      overview: "掲載理由",
      sourceLinks: "元リンク",
      tweet: "元の X 投稿",
      transcript: "字幕抜粋",
      podcast: "Podcast episode",
      github: "プロジェクトリポジトリ",
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
};

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
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

function readInitialLocale() {
  return window.HomepageI18n?.readStoredLocale?.({ locales: LOCALE_CATALOG }) || "en";
}

function readInitialTheme() {
  return window.HomepagePlatform?.readStoredTheme?.() || "tohoku";
}

function readStoredMode() {
  try {
    const stored = localStorage.getItem(MODE_KEY);
    return ["english", "current", "bilingual", "trilingual"].includes(stored) ? stored : "english";
  } catch {
    return "english";
  }
}

function writeStoredMode(mode) {
  try {
    localStorage.setItem(MODE_KEY, mode);
  } catch {}
}

function normalizeDisplayLanguages(languages) {
  const selected = new Set((languages || []).filter((language) => DISPLAY_LANGUAGE_SEQUENCE.includes(language)));
  if (!selected.size) selected.add("en");
  return DISPLAY_LANGUAGE_SEQUENCE.filter((language) => selected.has(language));
}

function displayLanguagesFromMode(mode) {
  if (mode === "current") return [readInitialLocale() || "en"];
  if (mode === "bilingual") return ["en", "zh"];
  if (mode === "trilingual") return ["en", "zh", "ja"];
  return ["en"];
}

function readStoredDisplayLanguages() {
  try {
    const stored = JSON.parse(localStorage.getItem(DISPLAY_LANGUAGES_KEY) || "null");
    if (Array.isArray(stored)) {
      return normalizeDisplayLanguages(stored);
    }
    return normalizeDisplayLanguages(displayLanguagesFromMode(readStoredMode()));
  } catch {
    return ["en"];
  }
}

function writeStoredDisplayLanguages(languages) {
  try {
    localStorage.setItem(DISPLAY_LANGUAGES_KEY, JSON.stringify(normalizeDisplayLanguages(languages)));
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

function normalizeText(value) {
  return String(value || "")
    .replace(/https?:\/\/t\.co\/\S+/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function clip(value, max = 150) {
  const text = normalizeText(value);
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trim()}...`;
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
      zh: `${builder.name} 的近期 builder 动态`,
      ja: `${builder.name} の最新 builder ノート`,
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
        text: tweet.text || "",
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
  const excerpt = clip(episode.transcript || "", 1400);
  return {
    id: `podcast-${slug(episode.name)}-${slug(episode.guid || episode.title)}`,
    type: "podcast",
    source: episode.name,
    date: episode.publishedAt,
    title: {
      en: episode.title || episode.name,
      zh: episode.title || episode.name,
      ja: episode.title || episode.name,
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
        text: excerpt,
        url: episode.url,
        date: episode.publishedAt,
      },
    ],
    links: episode.url ? [{ label: episode.name || "Podcast", href: episode.url }] : [],
  };
}

function blogArticle(post) {
  return {
    id: `blog-${slug(post.url || post.title)}`,
    type: "blog",
    source: post.source || post.name || "Official blog",
    date: post.publishedAt || post.date,
    title: {
      en: post.title || "Official blog update",
      zh: post.title || "官方博客更新",
      ja: post.title || "公式ブログ更新",
    },
    dek: {
      en: post.summary || "Official AI company blog post.",
      zh: post.summary || "AI 公司官方博客文章。",
      ja: post.summary || "AI 企業の公式ブログ記事です。",
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
        text: {
          en: post.content || post.summary || "Open the original blog link for the full post.",
          zh: post.content || post.summary || "打开原始博客链接查看全文。",
          ja: post.content || post.summary || "原文ブログリンクから全文を確認できます。",
        },
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
    statefulHref("/follow-builders/"),
    statefulHref("/follow-builders/", "#feed"),
    statefulHref("/follow-builders/", "#sources"),
    "https://github.com/zarazhangrui/follow-builders",
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

  const reset = byId("fb-reset");
  if (reset) {
    reset.setAttribute("aria-label", t("controls.reset"));
    reset.title = t("controls.reset");
    if (reset.dataset.bound !== "true") {
      reset.dataset.bound = "true";
      reset.addEventListener("click", () => {
        state.query = "";
        state.type = "all";
        render();
      });
    }
  }

  renderTypeFilter();
  renderLanguageDisplayControl();
}

function renderTypeFilter() {
  const select = byId("fb-type-filter");
  if (!select) return;
  select.innerHTML = ["all", "x", "podcast", "blog"]
    .map((type) => `<option value="${type}">${escapeHtml(t(`types.${type}`))}</option>`)
    .join("");
  select.value = state.type;
  if (select.dataset.bound !== "true") {
    select.dataset.bound = "true";
    select.addEventListener("change", () => {
      state.type = select.value;
      renderFeed();
    });
  }
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
          ${escapeHtml(t(`displayLanguages.${language}`))}
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
        state.displayLanguages = normalizeDisplayLanguages(Array.from(selected));
        writeStoredDisplayLanguages(state.displayLanguages);
        renderLanguageDisplayControl();
        renderArticleIfOpen();
      });
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
    const title = displayLanguageBlocks(article.title, article.title.en || "")[0]?.text || article.title.en || "";
    const dek = displayLanguageBlocks(article.dek, article.dek.en || "")[0]?.text || article.dek.en || "";
    return `
      <button class="fb-story-card" type="button" data-article-id="${escapeHtml(article.id)}">
        <span class="fb-story-body">
          <span class="fb-story-meta">
            <span class="fb-story-type">${escapeHtml(typeLabel(article.type))}</span>
            <span>${escapeHtml(article.source || "")}</span>
            <span>${escapeHtml(formatDate(article.date))}</span>
            <span>${escapeHtml(article.minutes || 1)} ${escapeHtml(t("feed.minRead"))}</span>
          </span>
          <strong class="fb-story-title">${escapeHtml(title)}</strong>
          <span class="fb-story-dek">${escapeHtml(dek)}</span>
          <span class="fb-story-tags">${(article.tags || []).slice(0, 4).map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</span>
        </span>
        <span class="fb-story-arrow" aria-hidden="true">→</span>
      </button>
    `;
  }).join("");
  list.querySelectorAll("[data-article-id]").forEach((button) => {
    button.addEventListener("click", () => openArticle(button.dataset.articleId));
  });
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

function renderLanguageTextBlocks(blocks, tagName = "p") {
  const multiple = blocks.length > 1;
  return blocks
    .map((block) => `
      <${tagName} class="${multiple ? "fb-language-block" : ""}" lang="${languageAttr(block.language)}">
        ${multiple ? `<span class="fb-language-label">${escapeHtml(t(`displayLanguages.${block.language}`))}</span>` : ""}
        ${escapeHtml(block.text)}
      </${tagName}>
    `)
    .join("");
}

function renderArticleTitleBlocks(blocks) {
  return blocks
    .map((block, index) => {
      const label = blocks.length > 1 ? `<span class="fb-language-label">${escapeHtml(t(`displayLanguages.${block.language}`))}</span>` : "";
      if (index === 0) {
        return `<h1 lang="${languageAttr(block.language)}">${label}${escapeHtml(block.text)}</h1>`;
      }
      return `<p class="fb-article-title-translation" lang="${languageAttr(block.language)}">${label}${escapeHtml(block.text)}</p>`;
    })
    .join("");
}

function renderArticle(article) {
  const container = byId("article");
  if (!container || !article) return;
  const titleBlocks = displayLanguageBlocks(article.title, article.title.en || "");
  const dekBlocks = displayLanguageBlocks(article.dek, article.dek.en || "");
  const links = [
    ...(article.links || []),
    { label: t("article.github"), href: state.data.sourceRepo },
  ].filter((link) => link.href);
  container.innerHTML = `
    <div class="fb-article-tools">
      <button class="fb-article-back" type="button" data-back-to-feed>
        <span aria-hidden="true">←</span>
        ${escapeHtml(t("article.back"))}
      </button>
      <div class="fb-language-display fb-language-display--article" role="group" aria-label="${escapeHtml(t("controls.displayLanguages"))}"></div>
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
              ${section.url ? `<a href="${escapeHtml(section.url)}">${escapeHtml(t("article.original"))}</a>` : ""}
            </section>
          `;
        }
        return `
          <section class="fb-body-section">
            <h2>${escapeHtml(label)}</h2>
            ${renderLanguageTextBlocks(sectionParagraphs(section), "p")}
          </section>
        `;
      }).join("")}
    </div>
    <footer class="fb-article-links">
      ${links.map((link) => `<a href="${escapeHtml(link.href)}">${escapeHtml(link.label || link.href)}</a>`).join("")}
    </footer>
  `;
  renderLanguageDisplayControl();
  container.querySelector("[data-back-to-feed]")?.addEventListener("click", closeArticle);
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
  loadRemoteFeeds();
});
window.addEventListener("hashchange", handleHash);
window.addEventListener("popstate", handleHash);
