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

const I18N = {
  en: {
    page: {
      title: "YouTube to Ebook | Sichen Tao",
      description:
        "A Follow Builders-style reading workspace where YouTube to Ebook outputs become searchable adaptive ebook articles.",
    },
    brand: { note: "Adaptive ebook articles" },
    nav: { feed: "Feed", github: "GitHub" },
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
      license: "License note",
    },
  },
  zh: {
    page: {
      title: "YouTube to Ebook | 陶思晨",
      description: "一个复用 Follow Builders UI 的文章承载工作区，用来发布 YouTube to Ebook 生成的适配型 ebook 文章。",
    },
    brand: { note: "适配型 ebook 文章" },
    nav: { feed: "信息流", github: "GitHub" },
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
      license: "许可说明",
    },
  },
  ja: {
    page: {
      title: "YouTube to Ebook | Sichen Tao",
      description: "Follow Builders の UI を再利用し、YouTube to Ebook の出力を適応型 ebook 記事として公開する workspace。",
    },
    brand: { note: "適応型 ebook 記事" },
    nav: { feed: "フィード", github: "GitHub" },
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
      license: "ライセンスメモ",
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
  if (section.markdown) {
    return `
      <section class="fb-body-section">
        <h2>${escapeHtml(label)}</h2>
        ${renderMarkdown(section.markdown)}
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

function renderArticle(article) {
  const container = byId("article");
  if (!container || !article) return;
  const titleBlocks = displayLanguageBlocks(article.title, article.title?.en || "");
  const dekBlocks = displayLanguageBlocks(article.dek, article.dek?.en || "");
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
      <div class="fb-article-title-group">${renderArticleTitleBlocks(titleBlocks)}</div>
      <div class="fb-article-dek-group">${renderLanguageTextBlocks(dekBlocks, "p")}</div>
      <div class="fb-article-meta">
        <span>${escapeHtml(article.source || "")}</span>
        <span>${escapeHtml(formatDate(article.date))}</span>
        <span>${escapeHtml(article.minutes || 1)} ${escapeHtml(t("feed.minRead"))}</span>
      </div>
      <span class="fb-story-tags">${articleTags(article).map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</span>
    </header>
    <div class="fb-article-body">
      ${(article.sections || []).map(renderArticleSection).join("")}
    </div>
    ${
      links.length
        ? `<footer class="fb-article-links">
            ${links.map((link) => `<a href="${escapeHtml(link.href)}">${escapeHtml(link.label || link.href)}</a>`).join("")}
          </footer>`
        : ""
    }
    ${
      state.data.upstream?.licenseNote
        ? `<p class="yte-license-note"><strong>${escapeHtml(t("article.license"))}:</strong> ${escapeHtml(localize(state.data.upstream.licenseNote))}</p>`
        : ""
    }
  `;
  renderLanguageDisplayControl();
  renderDisplayResetButtons();
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
    window.history.pushState(null, "", `${statefulHref("/youtube-to-ebook/")}#article-${encodeURIComponent(id)}`);
  }
  scrollToPageTop();
}

function closeArticle(options = {}) {
  document.body.classList.remove("fb-article-open");
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
  state.displayLanguages = readStoredDisplayLanguages(normalized);
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
