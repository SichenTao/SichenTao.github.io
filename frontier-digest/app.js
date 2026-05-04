const DIGEST_DATA = window.FRONTIER_DIGEST_DATA || { articles: [] };
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
const MODE_KEY = "frontier-digest-reading-mode";

const I18N = {
  en: {
    nav: {
      home: "Home",
      reader: "Reader",
      archive: "History",
      topics: "Topics",
    },
    hero: {
      kicker: "Daily frontier reader",
      title: "Frontier Digest",
      lede: "English-first research notes, readable as cards, long-form articles, or paragraph-level multilingual comparison.",
      updatedLabel: "Updated",
      countLabel: "Articles",
    },
    controls: {
      display: "Display controls",
      language: "Language",
      languageChoices: "Language choices",
      theme: "Color theme",
      themeChoices: "Theme choices",
      cycleLanguages: "Switch to the next language",
      cycleThemes: "Switch to the next theme",
      pageNavigation: "Page navigation",
      menu: "Menu",
      showMenu: "Show menu",
      hideMenu: "Hide menu",
      searchPlaceholder: "Search titles, topics, tags, or text",
      allTopics: "All topics",
      reset: "Reset filters",
    },
    modes: {
      english: "English",
      current: "Current language",
      bilingual: "English + Chinese",
      trilingual: "Three-language view",
    },
    history: {
      kicker: "Archive",
      title: "History",
    },
    feed: {
      kicker: "Swipeable cards",
      title: "Today and Recent Notes",
      empty: "No digest records match the current filters.",
      seedLabel: "Seed record",
      minute: "min read",
      open: "Read note",
    },
    article: {
      source: "Source",
      canonical: "Canonical English",
      zh: "Chinese",
      ja: "Japanese",
      links: "Source links",
    },
  },
  zh: {
    nav: {
      home: "首页",
      reader: "阅读器",
      archive: "历史文章",
      topics: "主题筛选",
    },
    hero: {
      kicker: "每日前沿阅读器",
      title: "前沿摘要",
      lede: "以英文为准的研究短文，可以按卡片、长文和段落级中英/三语对照阅读。",
      updatedLabel: "更新",
      countLabel: "文章",
    },
    controls: {
      display: "显示控制",
      language: "语言",
      languageChoices: "语言选项",
      theme: "主题色",
      themeChoices: "主题选项",
      cycleLanguages: "切换到下一种语言",
      cycleThemes: "切换到下一个主题",
      pageNavigation: "页面导航",
      menu: "菜单",
      showMenu: "展开菜单",
      hideMenu: "收起菜单",
      searchPlaceholder: "搜索标题、主题、标签或正文",
      allTopics: "全部主题",
      reset: "重置筛选",
    },
    modes: {
      english: "英文原文",
      current: "当前语言",
      bilingual: "英文 + 中文",
      trilingual: "三语对照",
    },
    history: {
      kicker: "归档",
      title: "历史文章",
    },
    feed: {
      kicker: "卡片阅读",
      title: "今日与近期摘要",
      empty: "当前筛选下没有匹配的摘要记录。",
      seedLabel: "种子记录",
      minute: "分钟阅读",
      open: "阅读文章",
    },
    article: {
      source: "来源",
      canonical: "英文原文",
      zh: "中文",
      ja: "日文",
      links: "来源链接",
    },
  },
  ja: {
    nav: {
      home: "ホーム",
      reader: "リーダー",
      archive: "履歴",
      topics: "トピック",
    },
    hero: {
      kicker: "日次フロンティアリーダー",
      title: "フロンティア・ダイジェスト",
      lede: "英語を基準にした研究ノートを、カード、長文、段落単位の多言語対照で読めます。",
      updatedLabel: "更新",
      countLabel: "記事",
    },
    controls: {
      display: "表示設定",
      language: "言語",
      languageChoices: "言語オプション",
      theme: "テーマ色",
      themeChoices: "テーマオプション",
      cycleLanguages: "次の言語に切り替える",
      cycleThemes: "次のテーマに切り替える",
      pageNavigation: "ページナビゲーション",
      menu: "メニュー",
      showMenu: "メニューを開く",
      hideMenu: "メニューを閉じる",
      searchPlaceholder: "タイトル、トピック、タグ、本文を検索",
      allTopics: "すべてのトピック",
      reset: "フィルタをリセット",
    },
    modes: {
      english: "英語原文",
      current: "現在の言語",
      bilingual: "英語 + 中国語",
      trilingual: "三言語対照",
    },
    history: {
      kicker: "アーカイブ",
      title: "履歴",
    },
    feed: {
      kicker: "カード表示",
      title: "今日と最近のノート",
      empty: "現在のフィルタに一致するダイジェストはありません。",
      seedLabel: "初期レコード",
      minute: "分で読める",
      open: "読む",
    },
    article: {
      source: "出典",
      canonical: "英語原文",
      zh: "中国語",
      ja: "日本語",
      links: "出典リンク",
    },
  },
};

const state = {
  locale: readInitialLocale(),
  theme: readInitialTheme(),
  query: "",
  topic: "all",
  mode: readStoredMode(),
  activeId: DIGEST_DATA.articles?.[0]?.id || "",
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
  return window.HomepageI18n?.localizeValue?.(value, { locale: state.locale, emptyValue: fallback }) || fallback;
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
    return ["english", "current", "bilingual", "trilingual"].includes(stored) ? stored : "bilingual";
  } catch {
    return "bilingual";
  }
}

function writeStoredMode(mode) {
  try {
    localStorage.setItem(MODE_KEY, mode);
  } catch {}
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
  document.body.dataset.readingMode = state.mode;
  document.title = `${t("hero.title")} | Sichen Tao`;
}

function renderStaticText() {
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  document.querySelectorAll(".header-controls").forEach((node) => node.setAttribute("aria-label", t("controls.display")));
  document.querySelectorAll(".topnav").forEach((node) => node.setAttribute("aria-label", t("controls.pageNavigation")));

  const navHrefs = [
    ["nav.home", statefulHref("/frontier-digest/")],
    ["nav.reader", statefulHref("/frontier-digest/", "#reader")],
    ["nav.archive", statefulHref("/frontier-digest/", "#archive")],
    ["nav.topics", statefulHref("/frontier-digest/", "#topics")],
  ];
  document.querySelectorAll(".topnav a").forEach((link, index) => {
    if (navHrefs[index]) {
      link.href = navHrefs[index][1];
    }
  });

  const updated = byId("digest-updated");
  if (updated) {
    updated.textContent = DIGEST_DATA.updated_at || "-";
  }
  const count = byId("digest-count");
  if (count) {
    count.textContent = String(DIGEST_DATA.articles?.length || 0);
  }
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

  const search = byId("digest-search");
  if (search) {
    search.placeholder = t("controls.searchPlaceholder");
    search.value = state.query;
    if (search.dataset.bound !== "true") {
      search.dataset.bound = "true";
      search.addEventListener("input", () => {
        state.query = search.value.trim();
        renderDigest();
      });
    }
  }

  const reset = byId("digest-reset");
  if (reset) {
    reset.setAttribute("aria-label", t("controls.reset"));
    reset.title = t("controls.reset");
    if (reset.dataset.bound !== "true") {
      reset.dataset.bound = "true";
      reset.addEventListener("click", () => {
        state.query = "";
        state.topic = "all";
        render();
      });
    }
  }

  renderTopicSelect();
  renderModeSelect();
}

function renderTopicSelect() {
  const select = byId("digest-topic-filter");
  if (!select) return;
  const topics = topicsList();
  select.innerHTML = [
    `<option value="all">${escapeHtml(t("controls.allTopics"))}</option>`,
    ...topics.map((topic) => `<option value="${escapeHtml(topic)}">${escapeHtml(topic)}</option>`),
  ].join("");
  select.value = topics.includes(state.topic) ? state.topic : "all";
  if (select.dataset.bound !== "true") {
    select.dataset.bound = "true";
    select.addEventListener("change", () => {
      state.topic = select.value;
      renderDigest();
    });
  }
}

function renderModeSelect() {
  const select = byId("digest-mode");
  if (!select) return;
  select.innerHTML = ["english", "current", "bilingual", "trilingual"]
    .map((mode) => `<option value="${mode}">${escapeHtml(t(`modes.${mode}`))}</option>`)
    .join("");
  select.value = state.mode;
  if (select.dataset.bound !== "true") {
    select.dataset.bound = "true";
    select.addEventListener("change", () => {
      state.mode = select.value;
      writeStoredMode(state.mode);
      render();
    });
  }
}

function topicsList() {
  return Array.from(new Set((DIGEST_DATA.articles || []).map((article) => article.topic).filter(Boolean))).sort();
}

function searchableText(article) {
  const chunks = [
    article.topic,
    article.source,
    article.status,
    ...(article.tags || []),
    ...Object.values(article.title || {}),
    ...Object.values(article.dek || {}),
    ...(article.paragraphs || []).flatMap((paragraph) => Object.values(paragraph || {})),
  ];
  return chunks.join(" ").toLowerCase();
}

function filteredArticles() {
  const query = state.query.toLowerCase();
  return (DIGEST_DATA.articles || [])
    .filter((article) => state.topic === "all" || article.topic === state.topic)
    .filter((article) => !query || searchableText(article).includes(query))
    .sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));
}

function ensureActiveArticle(articles) {
  if (!articles.some((article) => article.id === state.activeId)) {
    state.activeId = articles[0]?.id || "";
  }
}

function renderDigest() {
  const articles = filteredArticles();
  ensureActiveArticle(articles);
  renderTopicChips();
  renderHistory(articles);
  renderFeed(articles);
  renderArticle(articles.find((article) => article.id === state.activeId) || articles[0]);
}

function renderTopicChips() {
  const row = byId("digest-topic-chips");
  if (!row) return;
  const topics = ["all", ...topicsList()];
  row.innerHTML = topics
    .map((topic) => {
      const label = topic === "all" ? t("controls.allTopics") : topic;
      return `
        <button class="digest-topic-chip${topic === state.topic ? " is-active" : ""}" type="button" data-topic="${escapeHtml(topic)}">
          ${escapeHtml(label)}
        </button>
      `;
    })
    .join("");
  row.querySelectorAll("[data-topic]").forEach((button) => {
    button.addEventListener("click", () => {
      state.topic = button.dataset.topic || "all";
      render();
    });
  });
}

function renderHistory(articles) {
  const list = byId("digest-history-list");
  if (!list) return;
  list.innerHTML = articles
    .map((article) => {
      const title = article.title?.en || localize(article.title);
      return `
        <button class="digest-history-item${article.id === state.activeId ? " is-active" : ""}" type="button" data-article-id="${escapeHtml(article.id)}">
          <span class="digest-history-date">${escapeHtml(article.date || "")}</span>
          <strong>${escapeHtml(title)}</strong>
          <span>${escapeHtml(article.topic || "")}</span>
        </button>
      `;
    })
    .join("");
  list.querySelectorAll("[data-article-id]").forEach((button) => {
    button.addEventListener("click", () => selectArticle(button.dataset.articleId));
  });
}

function localizedSubtitle(article) {
  if (state.locale === "en") return "";
  const translated = localize(article.title, "");
  return translated && translated !== article.title?.en ? translated : "";
}

function renderFeed(articles) {
  const list = byId("digest-feed-list");
  if (!list) return;
  if (!articles.length) {
    list.innerHTML = `<p class="digest-empty">${escapeHtml(t("feed.empty"))}</p>`;
    return;
  }
  list.innerHTML = articles
    .map((article) => {
      const title = article.title?.en || localize(article.title);
      const subtitle = localizedSubtitle(article);
      const dek = localize(article.dek, article.dek?.en || "");
      return `
        <button class="digest-card${article.id === state.activeId ? " is-active" : ""}" type="button" data-article-id="${escapeHtml(article.id)}">
          <span class="digest-card-meta">
            <span>${escapeHtml(article.date || "")}</span>
            <span>${escapeHtml(article.topic || "")}</span>
            <span>${escapeHtml(article.reading_minutes || 3)} ${escapeHtml(t("feed.minute"))}</span>
          </span>
          <span class="digest-status-pill">${escapeHtml(article.status === "seed" ? t("feed.seedLabel") : article.status || "")}</span>
          <strong>${escapeHtml(title)}</strong>
          ${subtitle ? `<em>${escapeHtml(subtitle)}</em>` : ""}
          <span class="digest-card-dek">${escapeHtml(dek)}</span>
          <span class="digest-tag-row">${(article.tags || []).slice(0, 3).map((tag) => `<span># ${escapeHtml(tag)}</span>`).join("")}</span>
          <span class="digest-card-action">${escapeHtml(t("feed.open"))}</span>
        </button>
      `;
    })
    .join("");
  list.querySelectorAll("[data-article-id]").forEach((button) => {
    button.addEventListener("click", () => selectArticle(button.dataset.articleId, { scroll: true }));
  });
}

function selectArticle(id, options = {}) {
  if (!id || id === state.activeId) return;
  state.activeId = id;
  renderDigest();
  if (options.scroll && window.matchMedia?.("(max-width: 980px)").matches) {
    byId("digest-article")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function paragraphBlocks(paragraph) {
  if (state.mode === "english") {
    return [{ label: t("article.canonical"), lang: "en", text: paragraph.en }];
  }
  if (state.mode === "current") {
    const locale = state.locale || "en";
    const label = locale === "zh" ? t("article.zh") : locale === "ja" ? t("article.ja") : t("article.canonical");
    return [{ label, lang: locale, text: paragraph[locale] || paragraph.en }];
  }
  if (state.mode === "trilingual") {
    return [
      { label: t("article.canonical"), lang: "en", text: paragraph.en },
      { label: t("article.zh"), lang: "zh", text: paragraph.zh },
      { label: t("article.ja"), lang: "ja", text: paragraph.ja },
    ];
  }
  return [
    { label: t("article.canonical"), lang: "en", text: paragraph.en },
    { label: t("article.zh"), lang: "zh", text: paragraph.zh },
  ];
}

function renderArticle(article) {
  const container = byId("digest-article");
  if (!container) return;
  if (!article) {
    container.innerHTML = `<p class="digest-empty">${escapeHtml(t("feed.empty"))}</p>`;
    return;
  }
  const title = article.title?.en || localize(article.title);
  const subtitle = localizedSubtitle(article);
  const dek = localize(article.dek, article.dek?.en || "");
  const links = (article.links || [])
    .map((link) => `<a href="${escapeHtml(link.href)}">${escapeHtml(link.label || link.href)}</a>`)
    .join("");
  container.innerHTML = `
    <header class="digest-reader-head">
      <p class="eyebrow">${escapeHtml(article.topic || "")}</p>
      <h2>${escapeHtml(title)}</h2>
      ${subtitle ? `<p class="digest-reader-subtitle">${escapeHtml(subtitle)}</p>` : ""}
      <p class="digest-reader-dek">${escapeHtml(dek)}</p>
      <div class="digest-reader-meta">
        <span>${escapeHtml(article.date || "")}</span>
        <span>${escapeHtml(article.reading_minutes || 3)} ${escapeHtml(t("feed.minute"))}</span>
        <span>${escapeHtml(t("article.source"))}: ${escapeHtml(article.source || "")}</span>
      </div>
    </header>
    <div class="digest-paragraph-list">
      ${(article.paragraphs || [])
        .map(
          (paragraph, index) => `
            <section class="digest-paragraph">
              <span class="digest-paragraph-index">${String(index + 1).padStart(2, "0")}</span>
              <div>
                ${paragraphBlocks(paragraph)
                  .map(
                    (block) => `
                      <p lang="${escapeHtml(block.lang)}">
                        <span>${escapeHtml(block.label)}</span>
                        ${escapeHtml(block.text || "")}
                      </p>
                    `,
                  )
                  .join("")}
              </div>
            </section>
          `,
        )
        .join("")}
    </div>
    ${links ? `<footer class="digest-reader-links"><span>${escapeHtml(t("article.links"))}</span>${links}</footer>` : ""}
  `;
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
  applyDocumentState();
  renderStaticText();
  renderControls();
  renderDigest();
  syncShell();
}

document.addEventListener("DOMContentLoaded", render);
