const THEME_STORAGE_KEY = window.HomepagePlatform?.THEME_STORAGE_KEY || "sichen-homepage-theme";
const LOCALE_STORAGE_KEY = window.HomepageI18n?.STORAGE_KEY || "sichen-homepage-locale";

const LOCALE_CATALOG = window.HomepageI18n?.LOCALES || {
  en: { label: "En", name: "English" },
  zh: { label: "中", name: "中文" },
  ja: { label: "日", name: "日本語" },
};

const THEME_CATALOG = {
  tohoku: {
    swatchClass: "theme-tohoku",
    metaColor: "#eee7f8",
    label: {
      en: "Tohoku University",
      zh: "东北大学",
      ja: "東北大学",
    },
  },
  toyama: {
    swatchClass: "theme-toyama",
    metaColor: "#edf4f7",
    label: {
      en: "University of Toyama",
      zh: "富山大学",
      ja: "富山大学",
    },
  },
  usst: {
    swatchClass: "theme-usst",
    metaColor: "#f7eded",
    label: {
      en: "University of Shanghai for Science and Technology",
      zh: "上海理工大学",
      ja: "上海理工大学",
    },
  },
};

const THEME_SWITCH_SEQUENCE = window.HomepagePlatform?.THEME_SEQUENCE || ["tohoku", "toyama", "usst"];
const LOCALE_SWITCH_SEQUENCE = window.HomepageI18n?.LOCALE_SEQUENCE || ["en", "zh", "ja"];

const I18N = {
  en: {
    page: {
      title: "Sichen Tao | Research Portal",
      description:
        "Unified entry portal for Sichen Tao's personal homepage, Academic Frontier, and JSPS KAKENHI workspace.",
    },
    controls: {
      display: "Display controls",
      language: "Language",
      languageChoices: "Language choices",
      cycleLanguages: "Switch to the next language",
      theme: "Color theme",
      themeChoices: "Theme choices",
      cycleThemes: "Switch to the next color theme",
      pageNavigation: "Page navigation",
      menu: "Menu",
      showMenu: "Show menu",
      hideMenu: "Hide menu",
      siteSections: "Site sections",
    },
    nav: {
      portal: "Portal",
      academic: "Personal Homepage",
      frontier: "Academic Frontier",
      jsps: "JSPS KAKENHI",
    },
    hero: {
      eyebrow: "Research Web Portal",
      nativeName: "陶思晨",
      title: "Sichen Tao",
      roleLabel: "Current appointment",
      role: "Assistant Professor",
      affiliation: "High Performance Computing Laboratory, Cyberscience Center, Tohoku University",
      description: "",
      portraitAlt: "Portrait of Sichen Tao",
    },
    section: {
      kicker: "",
      title: "Choose a workspace",
      lede: "",
      gridLabel: "Research portal menu",
    },
    cards: {
      academic: {
        name: "Personal Homepage",
        intro: "The public academic identity: profile, publications, awards, projects, and service.",
        action: "Open homepage",
      },
      frontier: {
        name: "Academic Frontier",
        intro: "A research intelligence workspace for papers, signals, metrics, and tracked teams.",
        action: "Open frontier",
      },
      jsps: {
        name: "JSPS KAKENHI",
        intro: "A grant-work workspace for calls, forms, deadlines, guides, and official sources.",
        action: "Open workspace",
      },
    },
  },
  zh: {
    page: {
      title: "陶思晨 | 研究导航页",
      description: "统一进入个人主页、学术前沿与 JSPS 科研费工作台的研究导航页。",
    },
    controls: {
      display: "显示控制",
      language: "语言",
      languageChoices: "语言选项",
      cycleLanguages: "切换到下一种语言",
      theme: "配色主题",
      themeChoices: "配色选项",
      cycleThemes: "切换到下一种配色",
      pageNavigation: "页面导航",
      menu: "菜单",
      showMenu: "展开菜单",
      hideMenu: "收起菜单",
      siteSections: "站点入口",
    },
    nav: {
      portal: "导航页",
      academic: "个人主页",
      frontier: "学术前沿",
      jsps: "JSPS 科研费",
    },
    hero: {
      eyebrow: "统一科研网页入口",
      nativeName: "陶思晨",
      title: "Sichen Tao",
      roleLabel: "当前任职",
      role: "助理教授",
      affiliation: "东北大学网络科学中心高性能计算实验室",
      description: "",
      portraitAlt: "陶思晨照片",
    },
    section: {
      kicker: "",
      title: "选择工作区",
      lede: "",
      gridLabel: "研究站点入口",
    },
    cards: {
      academic: {
        name: "个人主页",
        intro: "公开呈现学术身份：个人简介、论文、荣誉、项目与学术服务。",
        action: "打开主页",
      },
      frontier: {
        name: "学术前沿",
        intro: "用于论文、信号、指标与团队追踪的研究情报工作空间。",
        action: "打开前沿页",
      },
      jsps: {
        name: "JSPS 科研费",
        intro: "集中处理公募、表格、截止时间、指南与官方来源的科研费工作空间。",
        action: "打开工作台",
      },
    },
  },
  ja: {
    page: {
      title: "陶思晨 | 研究ポータル",
      description: "個人ホームページ、学術フロンティア、JSPS科研費ワークスペースへ入る統合ポータル。",
    },
    controls: {
      display: "表示コントロール",
      language: "言語",
      languageChoices: "言語オプション",
      cycleLanguages: "次の言語に切り替える",
      theme: "カラーテーマ",
      themeChoices: "テーマ選択",
      cycleThemes: "次の配色に切り替える",
      pageNavigation: "ページナビゲーション",
      menu: "メニュー",
      showMenu: "メニューを開く",
      hideMenu: "メニューを閉じる",
      siteSections: "サイト入口",
    },
    nav: {
      portal: "ポータル",
      academic: "個人ホームページ",
      frontier: "学術フロンティア",
      jsps: "JSPS科研費",
    },
    hero: {
      eyebrow: "統合研究ウェブポータル",
      nativeName: "陶思晨",
      title: "Sichen Tao",
      roleLabel: "現在の職位",
      role: "助教",
      affiliation: "東北大学サイバーサイエンスセンター 高性能計算研究部",
      description: "",
      portraitAlt: "陶思晨のポートレート",
    },
    section: {
      kicker: "",
      title: "ワークスペースを選択",
      lede: "",
      gridLabel: "研究サイト入口",
    },
    cards: {
      academic: {
        name: "個人ホームページ",
        intro: "研究者としての公開プロフィール、論文、受賞、プロジェクト、学術サービスをまとめます。",
        action: "ホームページを開く",
      },
      frontier: {
        name: "学術フロンティア",
        intro: "論文、シグナル、指標、研究チームを継続的に追跡する研究情報ワークスペースです。",
        action: "フロンティアを開く",
      },
      jsps: {
        name: "JSPS科研費",
        intro: "公募、様式、締切、ガイド、公式ソースをまとめた科研費実務ワークスペースです。",
        action: "ワークスペースを開く",
      },
    },
  },
};

const state = {
  locale: resolveLocaleName(),
  theme: resolveThemeName(),
};

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function localeText() {
  return I18N[state.locale] || I18N.en;
}

function iconSprite(name, className = "ui-icon") {
  return `<svg class="${escapeHtml(className)}" aria-hidden="true" focusable="false"><use href="/academic/assets/icons/ui-icons.svg#icon-${escapeHtml(name)}"></use></svg>`;
}

function resolveLocaleName() {
  return window.HomepageI18n?.readStoredLocale?.({ locales: LOCALE_CATALOG, fallback: "en" }) || "en";
}

function resolveThemeName() {
  const sharedTheme = window.HomepagePlatform?.readStoredTheme?.();
  if (sharedTheme && THEME_CATALOG[sharedTheme]) {
    return sharedTheme;
  }
  const documentTheme = document.documentElement.dataset.theme;
  if (documentTheme && THEME_CATALOG[documentTheme]) {
    return documentTheme;
  }
  return "tohoku";
}

function nextLocaleName() {
  const currentIndex = LOCALE_SWITCH_SEQUENCE.indexOf(state.locale);
  return LOCALE_SWITCH_SEQUENCE[(currentIndex + 1) % LOCALE_SWITCH_SEQUENCE.length];
}

function nextThemeName() {
  const currentIndex = THEME_SWITCH_SEQUENCE.indexOf(state.theme);
  return THEME_SWITCH_SEQUENCE[(currentIndex + 1) % THEME_SWITCH_SEQUENCE.length];
}

function translatedThemeTooltip(themeName) {
  const theme = THEME_CATALOG[themeName] || THEME_CATALOG.tohoku;
  return theme.label[state.locale] || theme.label.en;
}

function setMetaContent(selector, value) {
  const node = document.querySelector(selector);
  if (node) {
    node.setAttribute("content", value);
  }
}

function applyDocumentState() {
  if (window.HomepageI18n?.applyDocumentLocale) {
    window.HomepageI18n.applyDocumentLocale(state.locale, { locales: LOCALE_CATALOG });
  } else {
    document.documentElement.lang =
      state.locale === "zh" ? "zh-CN" : state.locale === "ja" ? "ja" : "en";
    document.body.dataset.lang = state.locale;
  }
  if (window.HomepagePlatform?.applyTheme) {
    window.HomepagePlatform.applyTheme(state.theme, { persist: false });
  } else {
    document.documentElement.dataset.theme = state.theme;
  }

  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.setAttribute("content", THEME_CATALOG[state.theme].metaColor);
  }
}

function renderMetadata() {
  const text = localeText();
  document.title = text.page.title;
  setMetaContent('meta[name="description"]', text.page.description);
  setMetaContent('meta[property="og:title"]', text.page.title);
  setMetaContent('meta[property="og:description"]', text.page.description);
  setMetaContent('meta[name="twitter:title"]', text.page.title);
  setMetaContent('meta[name="twitter:description"]', text.page.description);
}

function portalHref(href) {
  if (href === "/") {
    return "/";
  }
  if (href.startsWith("/academic-frontier/") && window.HomepagePlatform?.academicFrontierHref) {
    return window.HomepagePlatform.academicFrontierHref(state.locale, state.theme);
  }
  if (window.HomepagePlatform?.siteStateHref) {
    return window.HomepagePlatform.siteStateHref(href, { locale: state.locale, theme: state.theme });
  }
  return href;
}

function renderTopnav() {
  const nav = document.getElementById("portalTopnav");
  const text = localeText();
  if (!nav) {
    return;
  }

  nav.setAttribute("aria-label", text.controls.pageNavigation);
  nav.innerHTML = `
    <a href="/" aria-current="page">${iconSprite("home")}<span>${escapeHtml(text.nav.portal)}</span></a>
    <a href="${portalHref("/academic/")}">${iconSprite("profiles")}<span>${escapeHtml(text.nav.academic)}</span></a>
    <a href="${portalHref("/academic-frontier/")}">${iconSprite("research")}<span>${escapeHtml(text.nav.frontier)}</span></a>
    <a href="${portalHref("/jsps-kakenhi/")}">${iconSprite("sources")}<span>${escapeHtml(text.nav.jsps)}</span></a>
  `;
}

function renderHero() {
  const text = localeText();
  const setText = (id, value) => {
    const node = document.getElementById(id);
    if (node) {
      node.textContent = value;
    }
  };

  setText("portalEyebrow", text.hero.eyebrow);
  setText("portalNativeName", text.hero.nativeName);
  setText("portalTitle", text.hero.title);
  setText("portalRoleLabel", text.hero.roleLabel);
  setText("portalRole", text.hero.role);
  setText("portalAffiliation", text.hero.affiliation);
  setText("portalDescription", text.hero.description);

  const portrait = document.getElementById("portalPortrait");
  if (portrait) {
    portrait.alt = text.hero.portraitAlt;
  }

}

function cardIconMarkup(siteKey) {
  if (siteKey === "academic") {
    return `
      <span class="portal-card-icon portal-card-icon--portrait" aria-hidden="true">
        <img src="/academic/assets/images/avatar-openai.jpg" alt="" loading="lazy" />
      </span>
    `;
  }

  if (siteKey === "frontier") {
    return `
      <span class="portal-card-icon portal-card-icon--svg" aria-hidden="true">
        ${iconSprite("research")}
      </span>
    `;
  }

  return `
    <span class="portal-card-icon portal-card-icon--logo" aria-hidden="true">
      <img src="/jsps-kakenhi/favicon.png" alt="" loading="lazy" />
    </span>
  `;
}

function renderCards() {
  const text = localeText();
  const grid = document.getElementById("portalGrid");
  if (!grid) {
    return;
  }

  document.getElementById("portalCardsKicker").textContent = text.section.kicker;
  document.getElementById("portalCardsTitle").textContent = text.section.title;
  document.getElementById("portalCardsLede").textContent = text.section.lede;
  grid.setAttribute("aria-label", text.section.gridLabel);

  const cards = [
    {
      key: "academic",
      href: portalHref("/academic/"),
      className: "portal-card-academic",
      icon: cardIconMarkup("academic"),
      title: text.cards.academic.name,
      intro: text.cards.academic.intro,
      action: text.cards.academic.action,
    },
    {
      key: "frontier",
      href: portalHref("/academic-frontier/"),
      className: "portal-card-frontier",
      icon: cardIconMarkup("frontier"),
      title: text.cards.frontier.name,
      intro: text.cards.frontier.intro,
      action: text.cards.frontier.action,
    },
    {
      key: "jsps",
      href: portalHref("/jsps-kakenhi/"),
      className: "portal-card-jsps",
      icon: cardIconMarkup("jsps"),
      title: text.cards.jsps.name,
      intro: text.cards.jsps.intro,
      action: text.cards.jsps.action,
    },
  ];

  grid.innerHTML = cards
    .map(
      (card) => `
        <a class="portal-card ${card.className}" href="${card.href}" aria-label="${escapeHtml(card.title)}">
          ${card.icon}
          <div class="portal-card-content">
            <h3 class="portal-card-name">${escapeHtml(card.title)}</h3>
            <p class="portal-card-copy">${escapeHtml(card.intro)}</p>
            <span class="portal-card-action">${escapeHtml(card.action)}</span>
          </div>
        </a>
      `,
    )
    .join("");
}

function renderLocaleSwitcher() {
  const text = localeText();
  const switchers = Array.from(document.querySelectorAll(".locale-switcher"));
  if (window.HomepageComponents?.renderLocaleSwitcher) {
    window.HomepageComponents.renderLocaleSwitcher(switchers, {
      locale: state.locale,
      locales: LOCALE_CATALOG,
      sequence: LOCALE_SWITCH_SEQUENCE,
      ariaLabel: text.controls.language,
      triggerLabel: text.controls.cycleLanguages,
      trayLabel: text.controls.languageChoices,
      onChoice: (localeName) => setLocale(localeName),
    });
    return;
  }
  const activeLocale = LOCALE_CATALOG[state.locale] || LOCALE_CATALOG.en;

  switchers.forEach((switcher) => {
    switcher.setAttribute("aria-label", text.controls.language);
    switcher.innerHTML = `
      <button
        class="locale-trigger"
        type="button"
        data-locale-trigger
        aria-haspopup="true"
        aria-expanded="false"
        aria-label="${escapeHtml(text.controls.cycleLanguages)}"
        title="${escapeHtml(text.controls.cycleLanguages)}"
      >
        <span class="locale-label">${escapeHtml(activeLocale.label)}</span>
      </button>
      <div class="locale-tray" role="group" aria-label="${escapeHtml(text.controls.languageChoices)}">
        ${Object.entries(LOCALE_CATALOG)
          .map(
            ([localeName, locale]) => `
              <button
                class="locale-chip${localeName === state.locale ? " is-active" : ""}"
                type="button"
                data-locale-choice="${escapeHtml(localeName)}"
                aria-label="${escapeHtml(locale.name)}"
                title="${escapeHtml(locale.name)}"
              >
                <span class="locale-label">${escapeHtml(locale.label)}</span>
              </button>
            `,
          )
          .join("")}
      </div>
    `;
  });

  document.querySelectorAll("[data-locale-choice]").forEach((button) => {
    button.addEventListener("click", () => setLocale(button.dataset.localeChoice));
  });
}

function renderThemeSwitcher() {
  const text = localeText();
  const switchers = Array.from(document.querySelectorAll(".theme-switcher"));
  if (window.HomepageComponents?.renderThemeSwitcher) {
    window.HomepageComponents.renderThemeSwitcher(switchers, {
      locale: state.locale,
      theme: state.theme,
      themes: THEME_CATALOG,
      sequence: THEME_SWITCH_SEQUENCE,
      ariaLabel: text.controls.theme,
      trayLabel: text.controls.themeChoices,
      tooltip: translatedThemeTooltip,
      onChoice: (themeName) => applyTheme(themeName),
    });
    return;
  }
  const activeTheme = THEME_CATALOG[state.theme] || THEME_CATALOG.tohoku;

  switchers.forEach((switcher) => {
    switcher.setAttribute("aria-label", text.controls.theme);
    switcher.innerHTML = `
      <button
        class="theme-trigger"
        type="button"
        data-theme-trigger
        aria-haspopup="true"
        aria-expanded="false"
        aria-label="${escapeHtml(text.controls.cycleThemes)}"
        title="${escapeHtml(translatedThemeTooltip(state.theme))}"
      >
        <span class="theme-swatch ${escapeHtml(activeTheme.swatchClass)}" data-theme-current-swatch aria-hidden="true"></span>
      </button>
      <div class="theme-tray" role="group" aria-label="${escapeHtml(text.controls.themeChoices)}">
        ${Object.entries(THEME_CATALOG)
          .map(
            ([themeName, theme]) => `
              <button
                class="theme-chip${themeName === state.theme ? " is-active" : ""}"
                type="button"
                data-theme-choice="${escapeHtml(themeName)}"
                aria-label="${escapeHtml(translatedThemeTooltip(themeName))}"
                title="${escapeHtml(translatedThemeTooltip(themeName))}"
              >
                <span class="theme-swatch ${escapeHtml(theme.swatchClass)}" aria-hidden="true"></span>
              </button>
            `,
          )
          .join("")}
      </div>
    `;
  });

  document.querySelectorAll("[data-theme-choice]").forEach((button) => {
    button.addEventListener("click", () => applyTheme(button.dataset.themeChoice));
  });
}

function renderPortalReturnControl() {
  const controls = document.querySelector(".header-controls");
  const text = localeText();
  if (!controls) {
    return;
  }

  if (window.HomepageComponents?.renderPortalSwitcher) {
    window.HomepageComponents.renderPortalSwitcher(controls, {
      locale: state.locale,
      theme: state.theme,
      currentPath: window.location.pathname,
    });
    return;
  }

  let switcher = controls.querySelector(".portal-switcher");
  if (!switcher) {
    switcher = document.createElement("div");
    switcher.className = "portal-switcher control-switcher";
    controls.insertBefore(switcher, controls.firstElementChild);
  }

  switcher.innerHTML = `
    <button
      class="portal-trigger"
      type="button"
      data-portal-trigger
      aria-haspopup="true"
      aria-expanded="false"
      aria-label="${escapeHtml(text.nav.portal)}"
      title="${escapeHtml(text.nav.portal)}"
    >
      ${iconSprite("home")}
    </button>
    <div class="portal-tray" role="group" aria-label="${escapeHtml(text.controls.siteSections)}">
      <a class="portal-chip portal-chip--portrait" href="/academic/" aria-label="${escapeHtml(text.nav.academic)}" title="${escapeHtml(text.nav.academic)}">
        <img class="portal-chip-logo" src="/academic/assets/images/avatar-openai.jpg" alt="" loading="lazy" />
      </a>
      <a class="portal-chip" href="/academic-frontier/" aria-label="${escapeHtml(text.nav.frontier)}" title="${escapeHtml(text.nav.frontier)}">
        ${iconSprite("research")}
      </a>
      <a class="portal-chip" href="/jsps-kakenhi/" aria-label="${escapeHtml(text.nav.jsps)}" title="${escapeHtml(text.nav.jsps)}">
        <img class="portal-chip-logo" src="/jsps-kakenhi/favicon.png" alt="" loading="lazy" />
      </a>
    </div>
  `;
}

function syncHomepageShell() {
  if (!window.HomepageSharedShell) {
    return;
  }

  window.HomepageSharedShell.sync({
    switchers: {
      root: document,
      localeCycleLabel: localeText().controls.cycleLanguages,
      themeCycleLabel: localeText().controls.cycleThemes,
      onCycleLocale: () => setLocale(nextLocaleName()),
      onCycleTheme: () => applyTheme(nextThemeName()),
    },
    topnav: {
      root: document,
      navSelector: ".topnav",
      navAriaLabel: localeText().controls.pageNavigation,
      menuLabel: localeText().controls.menu,
      showMenuLabel: localeText().controls.showMenu,
      hideMenuLabel: localeText().controls.hideMenu,
      toggleInnerHTML: `${iconSprite("menu")}<span class="topnav-toggle-label"></span>`,
      hintInnerHTML: iconSprite("up"),
    },
  });
}

function render() {
  applyDocumentState();
  renderMetadata();
  renderTopnav();
  renderHero();
  renderCards();
  renderLocaleSwitcher();
  renderThemeSwitcher();
  const controls = document.querySelector(".header-controls");
  if (controls) {
    controls.setAttribute("aria-label", localeText().controls.display);
  }

  syncHomepageShell();
}

function setLocale(localeName) {
  if (!LOCALE_CATALOG[localeName]) {
    return;
  }
  state.locale = localeName;
  if (window.HomepageI18n?.writeStoredLocale) {
    window.HomepageI18n.writeStoredLocale(localeName, { locales: LOCALE_CATALOG });
  } else {
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, localeName);
    } catch {}
  }
  render();
}

function applyTheme(themeName) {
  if (!THEME_CATALOG[themeName]) {
    return;
  }
  state.theme = themeName;
  if (window.HomepagePlatform?.writeStoredTheme) {
    window.HomepagePlatform.writeStoredTheme(themeName);
  } else {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, themeName);
    } catch {}
  }
  render();
}

document.addEventListener("DOMContentLoaded", () => {
  render();
});
