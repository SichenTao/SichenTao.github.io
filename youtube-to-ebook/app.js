const LIBRARY_DATA = window.YOUTUBE_TO_EBOOK_LIBRARY || {};
const LOCALE_CATALOG = window.HomepageI18n?.LOCALES || {
  en: { label: "English", name: "English", lang: "en" },
  zh: { label: "简体中文", name: "简体中文", lang: "zh-CN" },
  ja: { label: "日本語", name: "日本語", lang: "ja" },
};
const THEME_CATALOG = window.HomepagePlatform?.THEMES || {};
const LOCALE_SEQUENCE = window.HomepageI18n?.LOCALE_SEQUENCE || ["zh", "en", "ja"];
const THEME_SEQUENCE = window.HomepagePlatform?.THEME_SEQUENCE || ["tohoku", "toyama", "usst"];
const DISPLAY_LANGUAGES_KEY = "youtube-to-ebook-display-languages-v1";
const DISPLAY_LANGUAGE_SEQUENCE = ["en", "zh", "ja"];
const TRANSCRIPT_VARIANT_SEQUENCE = ["reviewed", "youtube"];

const I18N = {
  en: {
    page: {
      title: "YouTube to Ebook | Sichen Tao",
      description:
        "A Follow Builders-style reading workspace where YouTube to Ebook outputs become searchable adaptive ebook articles.",
    },
    brand: { note: "Adaptive ebook articles" },
    nav: { feed: "Home", github: "GitHub" },
    controls: {
      display: "Display controls",
      language: "Language",
      languageChoices: "Language choices",
      displayLanguages: "Displayed languages",
      cycleLanguages: "Switch to the next language",
      theme: "Color theme",
      themeChoices: "Theme choices",
      cycleThemes: "Switch to the next theme",
      pageNavigation: "Page navigation",
      menu: "Menu",
      showMenu: "Show menu",
      hideMenu: "Hide menu",
      searchPlaceholder: "Search ebook articles, sources, or workflows",
      reset: "Reset filters",
    },
    displayLanguages: { en: "English", zh: "简体中文", ja: "日本語" },
    transcriptVariants: { reviewed: "Reviewed transcript", youtube: "YouTube transcript" },
    types: { ebook: "Ebook article", workflow: "Workflow note" },
    feed: {
      title: "Adaptive ebook articles",
      empty: "No YouTube to Ebook articles match the current filters.",
      minRead: "min read",
    },
    sources: {
      title: "Library context",
      channels: "Seed channels",
      pipeline: "Pipeline services",
      outputs: "Output formats",
      modules: "Upstream modules",
      articles: "Articles",
      services: "Services",
      formats: "Formats",
    },
    github: {
      title: "GitHub",
      upstreamTitle: "Zara Zhang",
      upstreamText: "Original YouTube to Ebook project",
      sichenTitle: "Sichen Tao",
      sichenText: "Homepage and research workspace",
    },
    article: {
      back: "Back to feed",
      links: "Source links",
      articleMode: "Article",
      transcriptMode: "Video transcript",
      transcript: "Transcript",
      timebar: "Highlights",
      jumpTo: "Jump to",
      returnToTime: "Return to the current video time",
      videoUnavailable: "Video preview is unavailable. Open the original YouTube page instead.",
    },
  },
  zh: {
    page: {
      title: "YouTube to Ebook | 陶思晨",
      description: "一个复用 Follow Builders UI 的文章承载工作区，用来发布 YouTube to Ebook 生成的适配型 ebook 文章。",
    },
    brand: { note: "适配型 ebook 文章" },
    nav: { feed: "首页", github: "GitHub" },
    controls: {
      display: "显示控制",
      language: "语言",
      languageChoices: "语言选项",
      displayLanguages: "显示语言",
      cycleLanguages: "切换到下一种语言",
      theme: "主题色",
      themeChoices: "主题选项",
      cycleThemes: "切换到下一个主题",
      pageNavigation: "页面导航",
      menu: "菜单",
      showMenu: "展开菜单",
      hideMenu: "收起菜单",
      searchPlaceholder: "搜索 ebook 文章、来源或流程",
      reset: "重置筛选",
    },
    displayLanguages: { en: "English", zh: "简体中文", ja: "日本語" },
    transcriptVariants: { reviewed: "校稿逐字稿", youtube: "YouTube 逐字稿" },
    types: { ebook: "Ebook 文章", workflow: "流程笔记" },
    feed: {
      title: "适配型 ebook 文章",
      empty: "当前筛选下没有匹配的 YouTube to Ebook 文章。",
      minRead: "分钟阅读",
    },
    sources: {
      title: "文章库上下文",
      channels: "默认频道",
      pipeline: "流程服务",
      outputs: "输出格式",
      modules: "上游模块",
      articles: "文章",
      services: "服务",
      formats: "格式",
    },
    github: {
      title: "GitHub",
      upstreamTitle: "Zara Zhang",
      upstreamText: "YouTube to Ebook 原始项目",
      sichenTitle: "Sichen Tao",
      sichenText: "个人主页与研究工作区",
    },
    article: {
      back: "返回信息流",
      links: "来源链接",
      articleMode: "文章",
      transcriptMode: "视频逐字稿",
      transcript: "逐字稿",
      timebar: "高亮时间条",
      jumpTo: "跳转到",
      returnToTime: "回到当前视频时间点",
      videoUnavailable: "当前视频无法内嵌预览，请打开原 YouTube 页面。",
    },
  },
  ja: {
    page: {
      title: "YouTube to Ebook | Sichen Tao",
      description: "Follow Builders の UI を再利用し、YouTube to Ebook の出力を適応型 ebook 記事として公開する workspace。",
    },
    brand: { note: "適応型 ebook 記事" },
    nav: { feed: "ホーム", github: "GitHub" },
    controls: {
      display: "表示設定",
      language: "言語",
      languageChoices: "言語オプション",
      displayLanguages: "表示言語",
      cycleLanguages: "次の言語に切り替える",
      theme: "テーマ色",
      themeChoices: "テーマオプション",
      cycleThemes: "次のテーマに切り替える",
      pageNavigation: "ページナビゲーション",
      menu: "メニュー",
      showMenu: "メニューを開く",
      hideMenu: "メニューを閉じる",
      searchPlaceholder: "ebook 記事、source、workflow を検索",
      reset: "フィルタをリセット",
    },
    displayLanguages: { en: "English", zh: "简体中文", ja: "日本語" },
    transcriptVariants: { reviewed: "校正逐語録", youtube: "YouTube 逐語録" },
    types: { ebook: "Ebook 記事", workflow: "Workflow note" },
    feed: {
      title: "適応型 ebook 記事",
      empty: "現在の条件に一致する YouTube to Ebook 記事はありません。",
      minRead: "分で読む",
    },
    sources: {
      title: "記事ライブラリ文脈",
      channels: "初期チャンネル",
      pipeline: "Pipeline services",
      outputs: "出力形式",
      modules: "上流モジュール",
      articles: "記事",
      services: "サービス",
      formats: "形式",
    },
    github: {
      title: "GitHub",
      upstreamTitle: "Zara Zhang",
      upstreamText: "元の YouTube to Ebook project",
      sichenTitle: "Sichen Tao",
      sichenText: "Homepage and research workspace",
    },
    article: {
      back: "フィードに戻る",
      links: "Source links",
      articleMode: "記事",
      transcriptMode: "動画逐語録",
      transcript: "逐語録",
      timebar: "ハイライト時間軸",
      jumpTo: "移動",
      returnToTime: "現在の動画時刻へ戻る",
      videoUnavailable: "動画プレビューを埋め込めません。元の YouTube ページを開いてください。",
    },
  },
};

const state = {
  locale: readInitialLocale(),
  theme: readInitialTheme(),
  query: "",
  displayLanguages: readStoredDisplayLanguages(),
  data: normalizeData(LIBRARY_DATA),
  articles: [],
  activeId: "",
  detailMode: "article",
  transcriptVariant: "reviewed",
  videoSync: {
    player: null,
    timer: 0,
    currentTime: 0,
    duration: 0,
    playing: false,
    lastScrolledStart: null,
    articleId: "",
    seekTarget: null,
    seekLockUntil: 0,
  },
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
  return window.HomepageI18n?.text?.(I18N, key, { locale: state.locale, locales: LOCALE_CATALOG }) || key;
}

function localize(value, fallback = "") {
  if (typeof value === "string") return value;
  return window.HomepageI18n?.localizeValue?.(value, {
    locale: state.locale,
    locales: LOCALE_CATALOG,
    fallbacks: ["en", "zh", "ja"],
    emptyValue: fallback,
  }) || fallback;
}

function localizeForLanguage(value, language, fallback = "") {
  if (typeof value === "string") return language === "en" ? value : "";
  return value?.[language] || (language === "en" ? value?.en || fallback : "") || "";
}

function languageAttr(language) {
  return language === "zh" ? "zh-CN" : language === "ja" ? "ja" : "en";
}

function readInitialLocale() {
  return window.HomepageI18n?.readStoredLocale?.({ locales: LOCALE_CATALOG, fallback: "en" }) || "en";
}

function readInitialTheme() {
  return window.HomepagePlatform?.readStoredTheme?.() || "tohoku";
}

function displayLanguageSequence(locale = readInitialLocale()) {
  const primary = defaultDisplayLanguage(locale);
  return window.HomepageComponents?.prioritizeLocaleSequence?.(DISPLAY_LANGUAGE_SEQUENCE, primary, LOCALE_CATALOG)
    || [primary, ...DISPLAY_LANGUAGE_SEQUENCE.filter((language) => language !== primary)];
}

function defaultDisplayLanguage(locale = readInitialLocale()) {
  return DISPLAY_LANGUAGE_SEQUENCE.includes(locale) ? locale : "en";
}

function defaultDisplayLanguages(locale = readInitialLocale()) {
  return [defaultDisplayLanguage(locale)];
}

function normalizeDisplayLanguages(languages, fallback = ["en"], locale = readInitialLocale()) {
  const selected = new Set((languages || []).filter((language) => DISPLAY_LANGUAGE_SEQUENCE.includes(language)));
  if (!selected.size) {
    (fallback || []).forEach((language) => {
      if (DISPLAY_LANGUAGE_SEQUENCE.includes(language)) selected.add(language);
    });
  }
  if (!selected.size) selected.add("en");
  return displayLanguageSequence(locale).filter((language) => selected.has(language));
}

function displayLanguagesStorageKey(locale = readInitialLocale()) {
  return `${DISPLAY_LANGUAGES_KEY}-${defaultDisplayLanguage(locale)}`;
}

function readStoredDisplayLanguages(locale = readInitialLocale()) {
  try {
    const stored = JSON.parse(localStorage.getItem(displayLanguagesStorageKey(locale)) || "null");
    return Array.isArray(stored)
      ? normalizeDisplayLanguages(stored, defaultDisplayLanguages(locale), locale)
      : defaultDisplayLanguages(locale);
  } catch {
    return defaultDisplayLanguages(locale);
  }
}

function writeStoredDisplayLanguages(languages, locale = readInitialLocale()) {
  try {
    localStorage.setItem(
      displayLanguagesStorageKey(locale),
      JSON.stringify(normalizeDisplayLanguages(languages, defaultDisplayLanguages(locale), locale)),
    );
  } catch {}
}

function setDisplayLanguages(languages) {
  state.displayLanguages = normalizeDisplayLanguages(languages, defaultDisplayLanguages(state.locale), state.locale);
  writeStoredDisplayLanguages(state.displayLanguages, state.locale);
}

function displayLanguagesEqual(left, right) {
  const normalizedLeft = normalizeDisplayLanguages(left, defaultDisplayLanguages(state.locale), state.locale);
  const normalizedRight = normalizeDisplayLanguages(right, defaultDisplayLanguages(state.locale), state.locale);
  return normalizedLeft.length === normalizedRight.length
    && normalizedLeft.every((language, index) => language === normalizedRight[index]);
}

function displayControlsDirty() {
  return !displayLanguagesEqual(state.displayLanguages, defaultDisplayLanguages(state.locale));
}

function feedControlsDirty() {
  return Boolean(state.query) || displayControlsDirty();
}

function displayLanguageBlocks(value, fallback = "") {
  const blocks = normalizeDisplayLanguages(state.displayLanguages, defaultDisplayLanguages(state.locale), state.locale)
    .map((language) => ({ language, text: localizeForLanguage(value, language, fallback) }))
    .filter((block) => block.text);
  if (blocks.length) return blocks;
  const fallbackText = typeof value === "string" ? value : value?.en || fallback;
  return fallbackText ? [{ language: "en", text: fallbackText }] : [];
}

function displayLanguageLabel(language) {
  return t(`displayLanguages.${language}`) || language;
}

function transcriptVariantLabel(variant) {
  return t(`transcriptVariants.${variant}`) || variant;
}

function normalizeTranscriptVariant(variant) {
  return TRANSCRIPT_VARIANT_SEQUENCE.includes(variant) ? variant : "reviewed";
}

function setTranscriptVariant(variant) {
  state.transcriptVariant = normalizeTranscriptVariant(variant);
}

function normalizeData(data = {}) {
  return {
    generatedAt: data.generatedAt || "",
    sourceRepo: data.sourceRepo || "",
    upstream: data.upstream || {},
    sources: {
      channels: data.sources?.channels || [],
      pipeline: data.sources?.pipeline || [],
      outputs: data.sources?.outputs || [],
      modules: data.sources?.modules || [],
    },
    articles: Array.isArray(data.articles) ? data.articles : data.article ? [data.article] : [],
  };
}

function flattenText(value) {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.map(flattenText).join(" ");
  if (typeof value === "object") return Object.values(value).map(flattenText).join(" ");
  return String(value);
}

function formatDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value).slice(0, 10);
  const locale = state.locale === "zh" ? "zh-CN" : state.locale === "ja" ? "ja-JP" : "en-US";
  return new Intl.DateTimeFormat(locale, { month: "short", day: "numeric", year: "numeric" }).format(date);
}

function replaceUrlStateParam(key, value) {
  const url = new URL(window.location.href);
  if (value) url.searchParams.set(key, value);
  else url.searchParams.delete(key);
  window.history.replaceState(window.history.state, "", `${url.pathname}${url.search}${url.hash}`);
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

function typeLabel(type) {
  return t(`types.${type}`) || type;
}

function articleTags(article) {
  return (article.tags || []).map((tag) => localize(tag)).filter(Boolean);
}

function buildArticles(data) {
  return [...(data.articles || [])].sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));
}

function searchableText(article) {
  return [
    article.type,
    article.source,
    flattenText(article.title),
    flattenText(article.dek),
    flattenText(article.tags),
    flattenText(article.sections),
    flattenText(article.transcript),
    flattenText(article.links),
  ].join(" ").toLowerCase();
}

function filteredArticles() {
  const query = state.query.toLowerCase();
  return state.articles.filter((article) => !query || searchableText(article).includes(query));
}

function applyDocumentState() {
  window.HomepageI18n?.applyDocumentLocale?.(state.locale, { locales: LOCALE_CATALOG });
  window.HomepagePlatform?.applyTheme?.(state.theme, { persist: false });
  document.body.dataset.lang = state.locale;
  document.title = t("page.title");
  document.querySelector('meta[name="description"]')?.setAttribute("content", t("page.description"));
  document.querySelector('meta[property="og:title"]')?.setAttribute("content", t("page.title"));
  document.querySelector('meta[property="og:description"]')?.setAttribute("content", t("page.description"));
}

function renderStaticText() {
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  document.querySelectorAll(".header-controls").forEach((node) => node.setAttribute("aria-label", t("controls.display")));
  document.querySelectorAll(".topnav").forEach((node) => node.setAttribute("aria-label", t("controls.pageNavigation")));

  const navHrefs = [
    statefulHref("/youtube-to-ebook/", "#feed"),
    statefulHref("/youtube-to-ebook/", "#github"),
  ];
  document.querySelectorAll(".topnav > a").forEach((link, index) => {
    if (navHrefs[index]) link.href = navHrefs[index];
  });
}

function renderControls() {
  window.HomepageComponents?.renderLocaleSwitcher?.(".locale-switcher", {
    locale: state.locale,
    locales: LOCALE_CATALOG,
    sequence: LOCALE_SEQUENCE,
    ariaLabel: t("controls.language"),
    triggerLabel: t("controls.languageChoices"),
    trayLabel: t("controls.languageChoices"),
    onChoice: (localeName) => setLocale(localeName),
  });

  window.HomepageComponents?.renderThemeSwitcher?.(".theme-switcher", {
    locale: state.locale,
    theme: state.theme,
    themes: THEME_CATALOG,
    sequence: THEME_SEQUENCE,
    ariaLabel: t("controls.theme"),
    trayLabel: t("controls.themeChoices"),
    onChoice: (themeName) => setTheme(themeName),
  });

  const search = byId("fb-search");
  if (search) {
    search.placeholder = t("controls.searchPlaceholder");
    search.value = state.query;
    if (search.dataset.bound !== "true") {
      search.dataset.bound = "true";
      search.addEventListener("input", () => {
        state.query = search.value.trim();
        renderFeed();
        renderDisplayResetButtons();
      });
    }
  }

  renderLanguageDisplayControl();
  renderDisplayResetButtons();
}

function renderLanguageDisplayControl() {
  const onChoice = (language) => {
    const selected = new Set(state.displayLanguages);
    if (selected.has(language) && selected.size > 1) selected.delete(language);
    else selected.add(language);
    setDisplayLanguages(Array.from(selected));
    render();
  };

  if (window.HomepageComponents?.renderLanguageSegmentedControl) {
    window.HomepageComponents.renderLanguageSegmentedControl(".fb-language-display", {
      locales: LOCALE_CATALOG,
      sequence: displayLanguageSequence(state.locale),
      selected: state.displayLanguages,
      choiceClass: "fb-language-chip",
      dataAttribute: "data-display-language",
      ariaLabel: t("controls.displayLanguages"),
      labelFor: (language) => displayLanguageLabel(language),
      onChoice,
    });
    return;
  }

  document.querySelectorAll(".fb-language-display").forEach((control) => {
    control.setAttribute("aria-label", t("controls.displayLanguages"));
    control.innerHTML = displayLanguageSequence(state.locale).map((language) => {
      const selected = state.displayLanguages.includes(language);
      return `
        <button
          class="fb-language-chip shared-language-chip${selected ? " is-selected" : ""}"
          type="button"
          data-display-language="${language}"
          aria-pressed="${selected ? "true" : "false"}"
        >
          ${escapeHtml(displayLanguageLabel(language))}
        </button>
      `;
    }).join("");
    control.querySelectorAll("[data-display-language]").forEach((button) => {
      button.addEventListener("click", () => onChoice(button.dataset.displayLanguage));
    });
  });
}

function resetFeedControls() {
  state.query = "";
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
      if (scope === "all") resetFeedControls();
      else resetDisplayControls();
      render();
    });
  });
}

function renderStoryTextBlocks(blocks, primaryClass, secondaryClass) {
  return blocks
    .map((block, index) => {
      const className = index === 0 ? primaryClass : secondaryClass;
      const tagName = index === 0 && primaryClass === "fb-story-title" ? "strong" : "span";
      return `<${tagName} class="${className}" lang="${languageAttr(block.language)}">${escapeHtml(block.text)}</${tagName}>`;
    })
    .join("");
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
    const titleBlocks = displayLanguageBlocks(article.title, article.title?.en || "");
    const dekBlocks = displayLanguageBlocks(article.dek, article.dek?.en || "");
    const tags = articleTags(article).slice(0, 4);
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
          <span class="fb-story-tags">${tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</span>
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
  const pipeline = sources.pipeline || [];
  const outputs = sources.outputs || [];
  const channels = sources.channels || [];
  byId("fb-source-stats").innerHTML = `
    <div><strong>${escapeHtml(state.articles.length)}</strong><span>${escapeHtml(t("sources.articles"))}</span></div>
    <div><strong>${escapeHtml(pipeline.length)}</strong><span>${escapeHtml(t("sources.services"))}</span></div>
    <div><strong>${escapeHtml(outputs.length)}</strong><span>${escapeHtml(t("sources.formats"))}</span></div>
  `;
  byId("fb-builder-list").innerHTML = channels
    .map((handle) => `<a href="https://www.youtube.com/${escapeHtml(handle)}">${escapeHtml(handle)}</a>`)
    .join("");
  byId("fb-podcast-list").innerHTML = pipeline
    .map((item) => `<a href="${escapeHtml(item.url || "#")}">${escapeHtml(item.name || item)}</a>`)
    .join("");
  byId("fb-blog-list").innerHTML = outputs
    .map((item) => `<span>${escapeHtml(item)}</span>`)
    .join("");
  byId("yte-module-list").innerHTML = (sources.modules || [])
    .map((item) => `<span>${escapeHtml(item)}</span>`)
    .join("");
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

function renderArticleTitleBlocks(blocks) {
  return blocks
    .map((block, index) => {
      if (index === 0) return `<h1 lang="${languageAttr(block.language)}">${escapeHtml(block.text)}</h1>`;
      return `<p class="fb-article-title-translation" lang="${languageAttr(block.language)}">${escapeHtml(block.text)}</p>`;
    })
    .join("");
}

function renderTranscriptTitleBlocks(article) {
  const blocks = displayLanguageBlocks(article.title, article.video?.title || article.title?.en || "");
  return blocks
    .map((block, index) => {
      if (index === 0) return `<h2 lang="${languageAttr(block.language)}">${escapeHtml(block.text)}</h2>`;
      return `<p class="yte-transcript-title-translation" lang="${languageAttr(block.language)}">${escapeHtml(block.text)}</p>`;
    })
    .join("");
}

function renderStepBlocks(section) {
  const languages = normalizeDisplayLanguages(state.displayLanguages, defaultDisplayLanguages(state.locale), state.locale);
  return languages.map((language) => {
    const steps = (section.steps || [])
      .map((step, index) => {
        const title = localizeForLanguage(step.title, language, step.title?.en || "");
        const body = localizeForLanguage(step.body, language, step.body?.en || "");
        if (!title && !body) return "";
        return `
          <li>
            <span class="yte-step-number">${String(index + 1).padStart(2, "0")}</span>
            <span class="yte-step-copy">
              <strong>${escapeHtml(title)}</strong>
              <span>${escapeHtml(body)}</span>
            </span>
          </li>
        `;
      })
      .join("");
    return steps ? `<ol class="yte-step-list" lang="${languageAttr(language)}">${steps}</ol>` : "";
  }).join("");
}

function renderMarkdown(value) {
  return displayLanguageBlocks(value, "")
    .map((block) => {
      const lines = block.text.split(/\n+/).map((line) => line.trim()).filter(Boolean);
      const html = lines.map((line) => {
        if (line.startsWith("### ")) return `<h3>${escapeHtml(line.slice(4))}</h3>`;
        if (line.startsWith("## ")) return `<h2>${escapeHtml(line.slice(3))}</h2>`;
        if (/^[-*]\s+/.test(line)) return `<p>${escapeHtml(line.replace(/^[-*]\s+/, ""))}</p>`;
        return `<p>${escapeHtml(line)}</p>`;
      }).join("");
      return `<div class="yte-markdown-block" lang="${languageAttr(block.language)}">${html}</div>`;
    })
    .join("");
}

function renderArticleSection(section) {
  const label = localize(section.label);
  if (section.kind === "steps") {
    return `
      <section class="fb-body-section">
        <h2>${escapeHtml(label)}</h2>
        ${renderStepBlocks(section)}
      </section>
    `;
  }
  if (section.kind === "markdown" || section.markdown) {
    return `
      <section class="fb-body-section">
        <h2>${escapeHtml(label)}</h2>
        ${renderMarkdown(section.markdown || section.text)}
      </section>
    `;
  }
  const tagName = section.kind === "quote" ? "blockquote" : "p";
  return `
    <section class="fb-body-section">
      <h2>${escapeHtml(label)}</h2>
      ${renderLanguageTextBlocks(displayLanguageBlocks(section.text, section.text?.en || ""), tagName)}
    </section>
  `;
}

function transcriptSegments(article) {
  if (Array.isArray(article?.transcript?.segments)) return article.transcript.segments;
  if (Array.isArray(article?.transcriptSegments)) return article.transcriptSegments;
  return [];
}

function transcriptPreparedBlocks(article, variant = state.transcriptVariant) {
  const transcript = article?.transcript || {};
  if (variant === "reviewed" && Array.isArray(transcript.reviewedBlocks) && transcript.reviewedBlocks.length) {
    return transcript.reviewedBlocks;
  }
  return Array.isArray(transcript.blocks) ? transcript.blocks : [];
}

function articleHasTranscript(article) {
  return Boolean(article?.video?.id && (transcriptPreparedBlocks(article).length || transcriptSegments(article).length));
}

function cleanTranscriptText(value) {
  return String(value || "").replace(/^(?:>>\s*)+/, "").trim();
}

function proofreadTranscriptText(value, language = "en") {
  let text = cleanTranscriptText(value)
    .replace(/\s+/g, " ")
    .replace(/\s+([,.;:!?])/g, "$1")
    .replace(/([。！？、，])\s+/g, "$1");
  const common = [
    [/\bCo+deex\b/gi, "Codex"],
    [/\bcodeex\b/gi, "Codex"],
    [/\bco\s+codeex\b/gi, "Codex"],
    [/\bchat\s*bt\b/gi, "ChatGPT"],
    [/\bJBT\b/g, "GPT"],
    [/\bGBT5\b/g, "GPT-5"],
    [/\bcloud\s+code\b/gi, "Claude Code"],
    [/\bcloud\s+co-?work\b/gi, "Claude Code"],
    [/\bClaudeecode\b/gi, "Claude Code"],
    [/\bClaude\s*ecode\b/gi, "Claude Code"],
    [/\bAnthrobic\b/gi, "Anthropic"],
    [/\bgeneralpurpose\b/gi, "general-purpose"],
    [/\bWeb VNC\b/g, "WebVNC"],
    [/\bOpenclaw\b/gi, "OpenClaw"],
  ];
  const byLanguage = {
    zh: [
      [/Co+deex/g, "Codex"],
      [/codeex/gi, "Codex"],
      [/chatbt/gi, "ChatGPT"],
      [/JBT/g, "GPT"],
      [/GBT5/g, "GPT-5"],
      [/云代码|克劳德代码/g, "Claude Code"],
      [/编解码器|代码交换/g, "Codex"],
      [/Claudeecode/g, "Claude Code"],
      [/Web VNC/g, "WebVNC"],
      [/Openclaw/gi, "OpenClaw"],
    ],
    ja: [
      [/Co+deex/g, "Codex"],
      [/codeex/gi, "Codex"],
      [/chatbt/gi, "ChatGPT"],
      [/JBT/g, "GPT"],
      [/GBT5/g, "GPT-5"],
      [/クラウド コード|クラウドコード|クロードコード/g, "Claude Code"],
      [/Claudeecode/g, "Claude Code"],
      [/Web VNC/g, "WebVNC"],
      [/Openclaw/gi, "OpenClaw"],
    ],
  };
  [...common, ...(byLanguage[language] || [])].forEach(([pattern, replacement]) => {
    text = text.replace(pattern, replacement);
  });
  return text.trim();
}

function transcriptDisplayLanguages() {
  return normalizeDisplayLanguages(state.displayLanguages, defaultDisplayLanguages(state.locale), state.locale);
}

function transcriptTextBlocks(value, languages = transcriptDisplayLanguages(), { proofread = false } = {}) {
  const blocks = languages
    .map((language) => ({
      language,
      text: proofread
        ? proofreadTranscriptText(
            typeof value === "string"
              ? (language === "en" ? value : "")
              : value?.[language] || "",
            language,
          )
        : cleanTranscriptText(
            typeof value === "string"
              ? (language === "en" ? value : "")
              : value?.[language] || "",
          ),
    }))
    .filter((block) => block.text);
  if (blocks.length) return blocks;
  const fallbackText = cleanTranscriptText(typeof value === "string" ? value : value?.en || "");
  return fallbackText ? [{ language: "en", text: fallbackText }] : [];
}

function renderTranscriptTextStack(textBlocks = [], className = "yte-transcript-text-stack") {
  return `
    <span class="${className}">
      ${textBlocks.map((textBlock) => `
        <span lang="${languageAttr(textBlock.language)}">${escapeHtml(textBlock.text)}</span>
      `).join("")}
    </span>
  `;
}

function renderHighlightCopy(item) {
  return `
    <span class="yte-highlight-copy">
      ${(item.copyBlocks || []).map((block) => `
        <span class="yte-highlight-lang" lang="${languageAttr(block.language)}">
          <strong>${escapeHtml(block.title)}</strong>
          ${block.reason ? `<small>${escapeHtml(block.reason)}</small>` : ""}
        </span>
      `).join("")}
    </span>
  `;
}

function formatTimestamp(value) {
  const total = Math.max(0, Math.floor(Number(value) || 0));
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;
  if (hours) return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function transcriptDuration(article) {
  const videoDuration = Number(article?.video?.duration);
  if (Number.isFinite(videoDuration) && videoDuration > 0) return videoDuration;
  const last = transcriptSegments(article).at(-1);
  return Number(last?.start || 0) + Number(last?.duration || 0);
}

function buildTranscriptBlocks(article) {
  const languages = transcriptDisplayLanguages();
  const hasReviewedBlocks = Array.isArray(article?.transcript?.reviewedBlocks) && article.transcript.reviewedBlocks.length;
  const proofread = state.transcriptVariant === "reviewed" && !hasReviewedBlocks;
  const preparedBlocks = transcriptPreparedBlocks(article, state.transcriptVariant);
  if (preparedBlocks.length) {
    return preparedBlocks.map((item) => ({
      start: Number(item.start) || 0,
      end: Number(item.end) || Number(item.start) || 0,
      textBlocks: transcriptTextBlocks(item.text, languages, { proofread }),
    })).filter((item) => item.textBlocks.length);
  }

  const blocks = [];
  let block = null;
  transcriptSegments(article).forEach((segment) => {
    const textBlocks = transcriptTextBlocks(segment.text, languages, { proofread });
    if (!textBlocks.length) return;
    const text = textBlocks[0]?.text || "";
    const start = Number(segment.start) || 0;
    const end = start + (Number(segment.duration) || 0);
    if (!block) {
      block = { start, end, partsByLanguage: {}, chars: 0 };
    }
    const primaryParts = block.partsByLanguage[textBlocks[0].language] || [];
    const shouldClose = primaryParts.length
      && (
        block.chars + text.length > 430
        || start - block.end > 8
        || (/[\.\?!。！？]$/.test(primaryParts.at(-1) || "") && block.chars > 220)
      );
    if (shouldClose) {
      blocks.push(block);
      block = { start, end, partsByLanguage: {}, chars: 0 };
    }
    textBlocks.forEach((textBlock) => {
      block.partsByLanguage[textBlock.language] = block.partsByLanguage[textBlock.language] || [];
      block.partsByLanguage[textBlock.language].push(textBlock.text);
    });
    block.end = end;
    block.chars += text.length + 1;
  });
  if (block && Object.keys(block.partsByLanguage).length) blocks.push(block);
  return blocks.map((item) => ({
    start: item.start,
    end: item.end,
    textBlocks: languages
      .map((language) => ({
        language,
        text: (item.partsByLanguage[language] || []).join(" ").replace(/\s+/g, " ").trim(),
      }))
      .filter((textBlock) => textBlock.text)
      .concat(
        languages.some((language) => item.partsByLanguage[language]?.length)
          ? []
          : [{
              language: "en",
              text: (item.partsByLanguage.en || []).join(" ").replace(/\s+/g, " ").trim(),
            }],
      )
      .filter((textBlock) => textBlock.text),
  }));
}

function buildTranscriptHighlights(article, blocks) {
  const duration = transcriptDuration(article);
  if (!duration || !blocks.length) return [];
  const languages = transcriptDisplayLanguages();
  const curated = Array.isArray(article?.transcript?.highlights) ? article.transcript.highlights : [];
  if (curated.length) {
    return curated.map((item, index) => {
      const start = Number(item.start) || 0;
      const end = Math.max(start + 1, Number(item.end) || start + 1);
      const copyBlocks = languages
        .map((language) => ({
          language,
          title: cleanTranscriptText(localizeForLanguage(item.title, language, item.title?.en || "")),
          reason: cleanTranscriptText(localizeForLanguage(item.reason, language, item.reason?.en || "")),
        }))
        .filter((block) => block.title || block.reason);
      return {
        start,
        end,
        label: copyBlocks[0]?.title || `${t("article.transcript")} ${index + 1}`,
        copyBlocks,
        percent: Math.min(100, Math.max(0, (start / duration) * 100)),
        widthPercent: Math.max(2.8, Math.min(100, ((end - start) / duration) * 100)),
      };
    });
  }

  const targets = [0, 0.22, 0.42, 0.62, 0.82].map((ratio) => duration * ratio);
  return targets.map((target, index) => {
    const block = blocks.find((item) => item.start >= target) || blocks.at(-1);
    const labelBlocks = (block?.textBlocks || []).map((textBlock) => ({
      language: textBlock.language,
      text: textBlock.text.slice(0, 76).replace(/\s+\S*$/, "") || `${t("article.transcript")} ${index + 1}`,
    }));
    const primaryText = labelBlocks[0]?.text || `${t("article.transcript")} ${index + 1}`;
    return {
      start: block?.start || 0,
      end: block?.end || block?.start || 0,
      label: primaryText,
      copyBlocks: labelBlocks.map((textBlock) => ({ ...textBlock, title: textBlock.text, reason: "" })),
      percent: Math.min(100, Math.max(0, ((block?.start || 0) / duration) * 100)),
      widthPercent: Math.max(2.8, Math.min(100, (((block?.end || block?.start || 0) - (block?.start || 0)) / duration) * 100)),
    };
  });
}

function youtubeEmbedUrl(article) {
  const id = article?.video?.id;
  if (!id) return "";
  const origin = encodeURIComponent(window.location.origin);
  return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?enablejsapi=1&playsinline=1&rel=0&origin=${origin}`;
}

function syncNow() {
  return window.performance?.now ? window.performance.now() : Date.now();
}

function loadYouTubeIframeApi() {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (window.__yteYouTubeIframeApiPromise) return window.__yteYouTubeIframeApiPromise;
  window.__yteYouTubeIframeApiPromise = new Promise((resolve) => {
    const previousReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (typeof previousReady === "function") previousReady();
      resolve(window.YT);
    };
    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      document.head.appendChild(script);
    }
  });
  return window.__yteYouTubeIframeApiPromise;
}

function teardownVideoSync({ resetTime = false } = {}) {
  if (state.videoSync.timer) {
    window.clearInterval(state.videoSync.timer);
    state.videoSync.timer = 0;
  }
  if (state.videoSync.player?.destroy) {
    try {
      state.videoSync.player.destroy();
    } catch {}
  }
  state.videoSync.player = null;
  state.videoSync.playing = false;
  state.videoSync.lastScrolledStart = null;
  state.videoSync.seekTarget = null;
  state.videoSync.seekLockUntil = 0;
  if (resetTime) {
    state.videoSync.currentTime = 0;
    state.videoSync.duration = 0;
    state.videoSync.articleId = "";
  }
}

function seekEmbeddedVideo(seconds, { smooth = false } = {}) {
  const value = Number(seconds) || 0;
  state.videoSync.currentTime = value;
  state.videoSync.lastScrolledStart = null;
  state.videoSync.seekTarget = value;
  state.videoSync.seekLockUntil = syncNow() + 1600;
  updateTranscriptPlaybackUI(value, { autoScroll: true, forceScroll: true, smooth });
  window.requestAnimationFrame?.(() => {
    if (state.detailMode === "transcript" && state.videoSync.seekTarget === value) {
      updateTranscriptPlaybackUI(value, { autoScroll: true, forceScroll: true, smooth: false });
    }
  });
  if (state.videoSync.player?.seekTo) {
    try {
      state.videoSync.player.seekTo(value, true);
      state.videoSync.player.playVideo?.();
      return;
    } catch {}
  }
  const iframe = byId("yte-video-player");
  if (!iframe?.contentWindow) return;
  const seek = JSON.stringify({ event: "command", func: "seekTo", args: [value, true] });
  const play = JSON.stringify({ event: "command", func: "playVideo", args: [] });
  iframe.contentWindow.postMessage(seek, "*");
  iframe.contentWindow.postMessage(play, "*");
}

function setupVideoSync(article) {
  if (state.detailMode !== "transcript" || !articleHasTranscript(article)) return;
  state.videoSync.articleId = article.id;
  state.videoSync.duration = transcriptDuration(article);
  updateTranscriptPlaybackUI(state.videoSync.currentTime, { autoScroll: false, forceScroll: false });
  loadYouTubeIframeApi().then((YT) => {
    if (state.detailMode !== "transcript" || state.activeId !== article.id || !byId("yte-video-player")) return;
    try {
      state.videoSync.player = new YT.Player("yte-video-player", {
        events: {
          onReady: () => {
            if (state.videoSync.currentTime > 0) {
              state.videoSync.player.seekTo(state.videoSync.currentTime, true);
            }
            startVideoSyncTimer();
          },
          onStateChange: (event) => {
            state.videoSync.playing = event.data === 1;
            tickVideoSync({ force: event.data === 2 || event.data === 0 });
          },
        },
      });
    } catch {
      startVideoSyncTimer();
    }
  });
}

function startVideoSyncTimer() {
  if (state.videoSync.timer) window.clearInterval(state.videoSync.timer);
  state.videoSync.timer = window.setInterval(tickVideoSync, 200);
  tickVideoSync({ force: true });
}

function tickVideoSync({ force = false } = {}) {
  const player = state.videoSync.player;
  if (player?.getCurrentTime) {
    try {
      const reportedTime = Number(player.getCurrentTime()) || state.videoSync.currentTime || 0;
      const isSeekLocked = state.videoSync.seekTarget !== null
        && syncNow() < state.videoSync.seekLockUntil
        && Math.abs(reportedTime - state.videoSync.seekTarget) > 1.25;
      if (isSeekLocked) {
        state.videoSync.currentTime = state.videoSync.seekTarget;
      } else {
        state.videoSync.currentTime = reportedTime;
        if (state.videoSync.seekTarget !== null) {
          state.videoSync.seekTarget = null;
          state.videoSync.seekLockUntil = 0;
        }
      }
      const playerState = player.getPlayerState?.();
      state.videoSync.playing = playerState === 1;
    } catch {}
  }
  updateTranscriptPlaybackUI(state.videoSync.currentTime, {
    autoScroll: state.videoSync.playing,
    forceScroll: force && state.videoSync.playing,
  });
}

function activeTimedNode(selector, currentTime) {
  const nodes = [...document.querySelectorAll(selector)];
  let active = nodes[0] || null;
  let activeStart = Number(active?.dataset.transcriptStart || active?.dataset.highlightStart || active?.dataset.seekStart || 0);
  for (const node of nodes) {
    const start = Number(node.dataset.transcriptStart || node.dataset.highlightStart || node.dataset.seekStart || 0);
    if (currentTime >= start && start >= activeStart) {
      active = node;
      activeStart = start;
    }
  }
  return active;
}

function scrollNodeIntoContainer(node, containerSelector, { smooth = true, block = "center" } = {}) {
  const container = node?.closest(containerSelector) || document.querySelector(containerSelector);
  if (!node || !container) return;
  const nodeTop = node.offsetTop;
  const nodeBottom = nodeTop + node.offsetHeight;
  let targetTop = nodeTop - (container.clientHeight - node.offsetHeight) / 2;
  if (block === "nearest") {
    if (nodeTop >= container.scrollTop && nodeBottom <= container.scrollTop + container.clientHeight) return;
    targetTop = nodeTop < container.scrollTop ? nodeTop : nodeBottom - container.clientHeight;
  }
  container.scrollTo({
    top: Math.max(0, targetTop),
    behavior: smooth ? "smooth" : "auto",
  });
}

function scrollCurrentPlaybackIntoView({ smooth = true } = {}) {
  const current = state.videoSync.currentTime || 0;
  const activeRow = activeTimedNode(".yte-transcript-row", current);
  const activeHighlight = activeTimedNode(".yte-highlight-item", current);
  scrollNodeIntoContainer(activeRow, ".yte-transcript-list", { smooth, block: "center" });
  scrollNodeIntoContainer(activeHighlight, ".yte-highlight-list", { smooth, block: "nearest" });
}

function updateTranscriptPlaybackUI(currentTime, { autoScroll = false, forceScroll = false, smooth = true } = {}) {
  const duration = state.videoSync.duration || Number(byId("yte-timebar-track")?.dataset.duration || 0) || 1;
  const percent = Math.min(100, Math.max(0, (Number(currentTime || 0) / duration) * 100));
  document.querySelectorAll(".yte-timebar-track").forEach((track) => {
    track.style.setProperty("--yte-progress", `${percent}%`);
  });

  const activeRow = activeTimedNode(".yte-transcript-row", currentTime);
  const activeHighlight = activeTimedNode(".yte-highlight-item", currentTime);
  const activeRange = activeTimedNode(".yte-timebar-range", currentTime);

  document.querySelectorAll(".yte-transcript-row.is-active, .yte-highlight-item.is-active, .yte-timebar-range.is-active")
    .forEach((node) => node.classList.remove("is-active"));
  activeRow?.classList.add("is-active");
  activeHighlight?.classList.add("is-active");
  activeRange?.classList.add("is-active");
  document.querySelectorAll("[data-current-video-time]").forEach((node) => {
    node.textContent = formatTimestamp(currentTime);
  });

  const activeStart = activeRow ? Number(activeRow.dataset.transcriptStart || 0) : null;
  if ((autoScroll || forceScroll) && activeRow && (forceScroll || activeStart !== state.videoSync.lastScrolledStart)) {
    state.videoSync.lastScrolledStart = activeStart;
    scrollNodeIntoContainer(activeRow, ".yte-transcript-list", { smooth, block: "center" });
    scrollNodeIntoContainer(activeHighlight, ".yte-highlight-list", { smooth, block: "nearest" });
  }
}

function renderDetailModeSwitch(article) {
  const transcriptDisabled = !articleHasTranscript(article);
  return `
    <div class="yte-detail-mode" role="group" aria-label="${escapeHtml(t("article.transcriptMode"))}">
      <button class="${state.detailMode === "article" ? "is-active" : ""}" type="button" data-yte-detail-mode="article">
        ${escapeHtml(t("article.articleMode"))}
      </button>
      <button
        class="${state.detailMode === "transcript" ? "is-active" : ""}"
        type="button"
        data-yte-detail-mode="transcript"
        ${transcriptDisabled ? "disabled" : ""}
      >
        ${escapeHtml(t("article.transcriptMode"))}
      </button>
    </div>
  `;
}

function renderTranscriptVariantControl(article) {
  if (state.detailMode !== "transcript" || !articleHasTranscript(article)) return "";
  return `
    <div class="yte-transcript-variant" role="group" aria-label="${escapeHtml(t("article.transcript"))}">
      ${TRANSCRIPT_VARIANT_SEQUENCE.map((variant) => {
        const selected = normalizeTranscriptVariant(state.transcriptVariant) === variant;
        return `
          <button
            class="fb-language-chip yte-transcript-variant-chip${selected ? " is-selected" : ""}"
            type="button"
            data-transcript-variant="${escapeHtml(variant)}"
            aria-pressed="${selected ? "true" : "false"}"
            title="${escapeHtml(transcriptVariantLabel(variant))}"
          >
            ${escapeHtml(transcriptVariantLabel(variant))}
          </button>
        `;
      }).join("")}
    </div>
  `;
}

function renderVideoTranscriptReader(article) {
  const blocks = buildTranscriptBlocks(article);
  const highlights = buildTranscriptHighlights(article, blocks);
  const videoUrl = youtubeEmbedUrl(article);
  const duration = transcriptDuration(article);
  return `
    <section class="yte-video-reader" aria-label="${escapeHtml(t("article.transcriptMode"))}">
      <aside class="yte-video-pane">
        <div class="yte-video-sticky">
          ${
            videoUrl
              ? `<div class="yte-video-frame">
                  <iframe
                    id="yte-video-player"
                    src="${escapeHtml(videoUrl)}"
                    title="${escapeHtml(article.video?.title || article.title?.en || "")}"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                  ></iframe>
                </div>`
              : `<p class="yte-video-unavailable">${escapeHtml(t("article.videoUnavailable"))}</p>`
          }
          <div class="yte-timebar-row">
            <div class="yte-timebar" aria-label="${escapeHtml(t("article.timebar"))}">
              <div id="yte-timebar-track" class="yte-timebar-track" data-duration="${escapeHtml(duration)}">
                <span class="yte-timebar-playhead" aria-hidden="true"></span>
                ${highlights.map((item, index) => `
                  <button
                    class="yte-timebar-range"
                    type="button"
                    data-seek-start="${escapeHtml(item.start)}"
                    data-highlight-start="${escapeHtml(item.start)}"
                    data-highlight-end="${escapeHtml(item.end)}"
                    style="--yte-left: ${item.percent.toFixed(2)}%; --yte-width: ${item.widthPercent.toFixed(2)}%; --yte-index: ${index};"
                    aria-label="${escapeHtml(`${t("article.jumpTo")} ${formatTimestamp(item.start)}-${formatTimestamp(item.end)}`)}"
                  ></button>
                `).join("")}
              </div>
            </div>
            <button class="yte-return-time" type="button" data-return-to-video-time aria-label="${escapeHtml(t("article.returnToTime"))}" title="${escapeHtml(t("article.returnToTime"))}">
              <svg class="ui-icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="6.5"></circle>
                <circle cx="12" cy="12" r="1.8"></circle>
                <path d="M12 2.8v3.1M12 18.1v3.1M2.8 12h3.1M18.1 12h3.1"></path>
              </svg>
              <time data-current-video-time>${escapeHtml(formatTimestamp(state.videoSync.currentTime || 0))}</time>
            </button>
          </div>
          <div class="yte-highlight-list">
            ${highlights.map((item, index) => `
              <button class="yte-highlight-item" type="button" data-seek-start="${escapeHtml(item.start)}" data-highlight-start="${escapeHtml(item.start)}" data-highlight-end="${escapeHtml(item.end)}">
                <span class="yte-highlight-dot" style="--yte-index: ${index};"></span>
                ${renderHighlightCopy(item)}
                <time>${escapeHtml(`${formatTimestamp(item.start)}-${formatTimestamp(item.end)}`)}</time>
              </button>
            `).join("")}
          </div>
        </div>
      </aside>
      <section class="yte-transcript-pane">
        <header class="yte-transcript-head">
          <p class="eyebrow">${escapeHtml(t("article.transcript"))}</p>
          <div class="yte-transcript-title-group">${renderTranscriptTitleBlocks(article)}</div>
          <span>${escapeHtml(formatTimestamp(duration))}</span>
        </header>
        <div class="yte-transcript-list">
          ${blocks.map((block) => `
            <article class="yte-transcript-row" data-transcript-start="${escapeHtml(block.start)}" data-transcript-end="${escapeHtml(block.end)}">
              <button class="yte-transcript-time" type="button" data-seek-start="${escapeHtml(block.start)}">
                ${escapeHtml(formatTimestamp(block.start))}
              </button>
              <div class="yte-transcript-copy">
                ${(block.textBlocks || []).map((textBlock) => `
                  <p lang="${languageAttr(textBlock.language)}">${escapeHtml(textBlock.text)}</p>
                `).join("")}
              </div>
            </article>
          `).join("")}
        </div>
      </section>
    </section>
  `;
}

function bindArticleDetailControls(container, article) {
  container.querySelectorAll("[data-yte-detail-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.disabled) return;
      const nextMode = button.dataset.yteDetailMode || "article";
      if (nextMode === "transcript" && state.detailMode !== "transcript") {
        setDisplayLanguages(defaultDisplayLanguages(state.locale));
      }
      state.detailMode = nextMode;
      renderArticle(article);
    });
  });
  container.querySelectorAll("[data-transcript-variant]").forEach((button) => {
    button.addEventListener("click", () => {
      const nextVariant = normalizeTranscriptVariant(button.dataset.transcriptVariant);
      if (nextVariant === state.transcriptVariant) return;
      setTranscriptVariant(nextVariant);
      renderArticle(article);
    });
  });
  container.querySelectorAll("[data-seek-start]").forEach((button) => {
    button.addEventListener("click", () => seekEmbeddedVideo(button.dataset.seekStart, { smooth: false }));
  });
  container.querySelectorAll("[data-return-to-video-time]").forEach((button) => {
    button.addEventListener("click", () => scrollCurrentPlaybackIntoView({ smooth: true }));
  });
}

function renderArticle(article) {
  const container = byId("article");
  if (!container || !article) return;
  if (state.detailMode === "transcript" && !articleHasTranscript(article)) state.detailMode = "article";
  teardownVideoSync({ resetTime: state.detailMode !== "transcript" });
  document.body.classList.toggle("yte-transcript-open", state.detailMode === "transcript");
  const titleBlocks = displayLanguageBlocks(article.title, article.title?.en || "");
  const dekBlocks = displayLanguageBlocks(article.dek, article.dek?.en || "");
  const links = (article.links || []).filter((link) => link.href);
  container.innerHTML = `
    <div class="fb-article-tools">
      <button class="fb-article-back" type="button" data-back-to-feed>
        <span aria-hidden="true">←</span>
        ${escapeHtml(t("article.back"))}
      </button>
      ${renderDetailModeSwitch(article)}
      <div class="fb-article-control-group">
        ${renderTranscriptVariantControl(article)}
        <div class="fb-language-display fb-language-display--article" role="group" aria-label="${escapeHtml(t("controls.displayLanguages"))}"></div>
        <button class="fb-icon-button" type="button" data-fb-display-reset="display" aria-label="${escapeHtml(t("controls.reset"))}" title="${escapeHtml(t("controls.reset"))}">
          <svg class="ui-icon" aria-hidden="true"><use href="/academic/assets/icons/ui-icons.svg#icon-reset"></use></svg>
        </button>
      </div>
    </div>
    ${state.detailMode === "article"
      ? `<header class="fb-article-head">
          <p class="eyebrow">${escapeHtml(typeLabel(article.type))}</p>
          <div class="fb-article-title-group">${renderArticleTitleBlocks(titleBlocks)}</div>
          <div class="fb-article-dek-group">${renderLanguageTextBlocks(dekBlocks, "p")}</div>
          <div class="fb-article-meta">
            <span>${escapeHtml(article.source || "")}</span>
            <span>${escapeHtml(formatDate(article.date))}</span>
            <span>${escapeHtml(article.minutes || 1)} ${escapeHtml(t("feed.minRead"))}</span>
          </div>
          <span class="fb-story-tags">${articleTags(article).map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</span>
        </header>`
      : ""
    }
    ${state.detailMode === "transcript"
      ? renderVideoTranscriptReader(article)
      : `<div class="fb-article-body">
          ${(article.sections || []).map(renderArticleSection).join("")}
        </div>
        ${
          links.length
            ? `<footer class="fb-article-links">
                ${links.map((link) => `<a href="${escapeHtml(link.href)}">${escapeHtml(link.label || link.href)}</a>`).join("")}
              </footer>`
            : ""
        }`
    }
  `;
  renderLanguageDisplayControl();
  renderDisplayResetButtons();
  container.querySelector("[data-back-to-feed]")?.addEventListener("click", closeArticle);
  bindArticleDetailControls(container, article);
  setupVideoSync(article);
}

function openArticle(id, options = {}) {
  const article = state.articles.find((item) => item.id === id);
  if (!article) return;
  if (state.activeId !== id) {
    state.detailMode = articleHasTranscript(article) ? "transcript" : "article";
    state.transcriptVariant = "reviewed";
    setDisplayLanguages(defaultDisplayLanguages(state.locale));
    state.videoSync.currentTime = 0;
  }
  state.activeId = id;
  document.body.classList.add("fb-article-open");
  byId("article").hidden = false;
  renderArticle(article);
  if (options.updateHash !== false) {
    window.history.pushState(null, "", `${statefulHref("/youtube-to-ebook/")}#article-${encodeURIComponent(id)}`);
  }
  scrollToPageTop();
}

function closeArticle(options = {}) {
  document.body.classList.remove("fb-article-open");
  document.body.classList.remove("yte-transcript-open");
  teardownVideoSync({ resetTime: true });
  const article = byId("article");
  if (article) article.hidden = true;
  if (options.updateHash !== false) {
    window.history.pushState(null, "", `${statefulHref("/youtube-to-ebook/")}#feed`);
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
  if (hash.startsWith("#article-")) openArticle(hash.replace("#article-", ""), { updateHash: false });
  else closeArticle({ updateHash: false });
}

function setLocale(localeName) {
  const normalized = window.HomepageI18n?.normalizeLocale?.(localeName, LOCALE_CATALOG) || "";
  if (!normalized || normalized === state.locale) return;
  state.locale = normalized;
  setDisplayLanguages(defaultDisplayLanguages(normalized));
  window.HomepageI18n?.writeStoredLocale?.(normalized, { locales: LOCALE_CATALOG });
  replaceUrlStateParam("lang", normalized);
  render();
}

function setTheme(themeName) {
  const normalized = window.HomepagePlatform?.normalizeTheme?.(themeName) || "";
  if (!normalized || normalized === state.theme) return;
  state.theme = normalized;
  window.HomepagePlatform?.writeStoredTheme?.(normalized);
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

document.addEventListener("DOMContentLoaded", () => {
  render();
  handleHash();
});
window.addEventListener("hashchange", handleHash);
window.addEventListener("popstate", handleHash);
