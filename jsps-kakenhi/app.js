const DATA_URL = "./data/kakenhi-data.json";
const DATA_BUNDLE = window.KAKENHI_PORTAL_DATA || null;
const THEME_KEY = "sichen-homepage-theme";
const LEGACY_THEME_KEY = "kakenhi-portal-theme";
const LOCALE_KEY = "sichen-homepage-locale";
const LEGACY_LOCALE_KEY = "kakenhi-portal-locale";
const FILTER_KEY = "kakenhi-portal-filters";
let topnavOverflowBound = false;
let topnavMenuBound = false;
let headerControlsPositionBound = false;
let headerControlsPositionTicking = false;

const I18N = {
  zh: {
    nav: {
      home: "首页",
      calls: "项目目录",
      deadlines: "时间线",
      forms: "表格材料",
      guides: "申请指引",
      sources: "官方来源",
      archive: "快照归档",
    },
    common: {
      open: "开放中",
      closed: "已截止",
      reference: "参考入口",
      unknown: "待确认",
      priority: "重点项目",
      official: "官方页面",
      snapshot: "本地快照",
      documents: "文档",
      forms: "表格",
      links: "链接",
      noResults: "没有匹配结果",
      viewOfficial: "打开官方页面",
      viewSnapshot: "打开本地快照",
      nextDeadline: "下一截止",
      updated: "页面更新时间",
      status: "状态",
      group: "分组",
      openPrograms: "开放项目",
      trackedForms: "追踪表格",
      archiveSnapshots: "归档快照",
      officialDocs: "重点文档",
      watchpoints: "提醒",
      detailHint: "点选左侧条目查看更细内容。",
      all: "全部",
      showMore: "更多",
      openLink: "打开链接",
      menu: "菜单",
      showMenu: "展开菜单",
      hideMenu: "收起菜单",
      displayControls: "显示控制",
      language: "语言",
      theme: "配色主题",
      openPortal: "返回主页导航页",
    },
    status: {
      open: "开放中",
      closed: "已截止",
      reference: "参考",
      unknown: "待确认",
    },
    eventType: {
      notice: "通知",
      open: "公募开始",
      system: "系统开放",
      deadline: "JSPS 截止",
      past: "已发生",
      today: "今天",
      upcoming: "待到来",
    },
    home: {
      keyline: "重点项目 · 时间线 · 表格",
      nativeName: "科研费项目调查与汇总",
      heroTitle: "JSPS KAKENHI",
      focusLabel: "今年重点",
      focusRole: "研究活动启动支援 · 若手研究",
      focusNote: "当前开放项目、近期截止与关键表格的一体化工作台。",
      lede: "先看今年最值得关注的重点项目，再沿着时间线、表格与官方来源进入细节。",
      snapshotTitle: "当前快照",
      priorityKicker: "重点项目",
      prioritySection: "重点项目",
      workflowKicker: "工作流程",
      workflowSection: "工作流程",
      sourceKicker: "来源与归档",
      sourceSection: "官方来源与归档",
      watchTitle: "行动提醒",
      jumpTitle: "官方快速跳转",
      archiveTitle: "归档快照",
      sourceGuideTitle: "如何使用此工作台",
      callsLead: "先在全部项目中锁定感兴趣的申请项目与赛道。",
      deadlinesLead: "把开放时间、系统开放与官方截止时间放在同一条时间线上确认。",
      formsLead: "围绕 S-21、S-22 与配套说明进入材料准备阶段。",
      guidesLead: "把 FAQ、e-Rad、电子系统与重点指南集中检查。",
      sourceGuideProgramsTitle: "先看重点项目",
      sourceGuideProgramsText: "先从开放中或优先级最高的项目卡进入，再扩展到完整项目目录。",
      sourceGuideDatesTitle: "再核对时间线",
      sourceGuideDatesText: "用时间线确认通知、公募开始、系统开放与最终提交节点。",
      sourceGuideFormsTitle: "然后进入表格",
      sourceGuideFormsText: "确定项目后立即查看对应表格家族、填写要领与上传说明。",
      sourceGuideSourcesTitle: "最后回到官方来源",
      sourceGuideSourcesText: "站内页面负责整理，真正提交前仍应回到官方页面与快照交叉核对。",
    },
    calls: {
      kicker: "项目浏览",
      title: "项目目录",
      lede: "把重点项目与 JSPS 公募索引条目放在同一页里筛选，你可以先锁定研究活動スタート支援和若手研究，再沿着官方总索引扩展到其他种目。",
      filterTitle: "浏览与筛选",
      quickFilters: "快速筛选",
      footerTitle: "项目定位后，下一步就去看时间线和表格",
      searchPlaceholder: "搜索项目、表格号、官方入口或关键词",
      statusAll: "全部状态",
      statusOpen: "仅开放中",
      statusClosed: "已截止/参考",
      groupAll: "全部分组",
      sortPriority: "按优先级",
      sortTitle: "按标题",
      sortStatus: "按状态",
      quickAll: "全部",
      quickPriority: "重点",
      quickOpen: "开放中",
      quickStartup: "Start-up",
      quickYoung: "若手研究",
      quickForms: "S-21 / S-22",
      detailTitle: "条目详情",
      officialLinks: "官方入口",
      featuredDocs: "重点文档",
      featuredForms: "重点表格",
    },
    deadlines: {
      kicker: "时间安排",
      title: "时间线与截止",
      lede: "用一页看清重点项目的通知发布、公募开始、电子系统开放和 JSPS 官方截止时间，避免只看网页却错过时间节点。",
      timelineTitle: "关键事件时间线",
      tableTitle: "精确时间表",
      colProgram: "项目",
      colType: "节点",
      colDate: "日期",
      colNote: "说明",
      footerTitle: "时间确认后，就进入材料准备阶段",
    },
    forms: {
      kicker: "表格家族",
      title: "表格与材料",
      lede: "这一页专门看 S-21、S-22 以及它们所在页面的相关输入要领、上传说明、PDF 版与配套链接，方便从“截止”直接过渡到“写材料”。",
      filterTitle: "检索表格家族",
      searchPlaceholder: "搜索 S-21、S-22、项目名、章节名或官方说明",
      programAll: "全部项目",
      sortCode: "按表格号",
      sortProgram: "按项目",
      footerTitle: "表格找到了，再去补流程和 FAQ",
    },
    guides: {
      kicker: "官方指引",
      title: "申请指引",
      lede: "这一页不只是罗列链接，而是把最值得反复查看的 FAQ、e-Rad、电子系统和重点文档集中放在一起，便于申请前反复核对。",
      gridTitle: "关键申请入口",
      watchTitle: "重点项目提醒",
      startupWatch: "研究活動スタート支援",
      youngWatch: "若手研究",
      footerTitle: "官方指引核对完，再看来源和归档",
    },
    sources: {
      kicker: "来源追踪",
      title: "官方来源",
      lede: "这一页把“真正的官方页面”和“公募索引里的分类入口”分开展示，避免把整理后的站内信息误当作唯一来源。",
      registryTitle: "核心来源注册表",
      categoryTitle: "公募总索引条目",
      footerTitle: "来源确认后，可以回到项目页继续申请准备",
    },
    archive: {
      kicker: "快照归档",
      title: "快照归档",
      lede: "每次抓取官方网页都会形成一个日期目录，这样即使 JSPS 页面更新或关闭，也能回看当时的官方表述与链接结构。",
      gridTitle: "快照目录",
      footerTitle: "归档确认后，回到当前快照继续工作",
    },
    footer: {
      resources: "Resources",
      homeTitle: "继续进入更细的申请页面",
      catalog: "查看项目目录",
      archive: "查看归档快照",
      deadlines: "查看时间线",
      forms: "查看表格材料",
      guides: "查看申请指引",
      sources: "查看官方来源",
      home: "返回首页",
    },
  },
  en: {
    nav: {
      home: "Home",
      calls: "Calls",
      deadlines: "Timeline",
      forms: "Forms",
      guides: "Guides",
      sources: "Sources",
      archive: "Archive",
    },
    common: {
      open: "Open",
      closed: "Closed",
      reference: "Reference",
      unknown: "Unknown",
      priority: "Priority",
      official: "Official page",
      snapshot: "Local snapshot",
      documents: "Documents",
      forms: "Forms",
      links: "Links",
      noResults: "No matching results",
      viewOfficial: "Open official page",
      viewSnapshot: "Open local snapshot",
      nextDeadline: "Next deadline",
      updated: "Page updated",
      status: "Status",
      group: "Group",
      openPrograms: "Open programs",
      trackedForms: "Tracked forms",
      archiveSnapshots: "Archived snapshots",
      officialDocs: "Featured docs",
      watchpoints: "Watchpoints",
      detailHint: "Select an item on the left to inspect more detail.",
      all: "All",
      showMore: "More",
      openLink: "Open link",
      menu: "Menu",
      showMenu: "Open navigation menu",
      hideMenu: "Close navigation menu",
      displayControls: "Display controls",
      language: "Language",
      theme: "Color theme",
      openPortal: "Return to homepage portal",
    },
    status: {
      open: "Open",
      closed: "Closed",
      reference: "Reference",
      unknown: "Unknown",
    },
    eventType: {
      notice: "Notice",
      open: "Opens",
      system: "System opens",
      deadline: "JSPS deadline",
      past: "Past",
      today: "Today",
      upcoming: "Upcoming",
    },
    home: {
      keyline: "Priority calls · timeline · forms",
      nativeName: "Project tracking and summary",
      heroTitle: "JSPS KAKENHI",
      focusLabel: "Current priorities",
      focusRole: "Research Activity Start-up Support · Early-Career Scientists",
      focusNote: "A single workspace for open calls, upcoming deadlines, and the forms that matter most.",
      lede: "Start from the calls that deserve attention this year, then move into the timeline, forms, and official evidence.",
      snapshotTitle: "Current snapshot",
      priorityKicker: "Priority calls",
      prioritySection: "Priority programs",
      workflowKicker: "Workflow",
      workflowSection: "Workflow shortcuts",
      sourceKicker: "Sources & archive",
      sourceSection: "Official sources and archive",
      watchTitle: "Action reminders",
      jumpTitle: "Official quick links",
      archiveTitle: "Archive snapshots",
      sourceGuideTitle: "How to use this workspace",
      callsLead: "Start by identifying the calls that deserve attention from the full catalog.",
      deadlinesLead: "Confirm notice dates, system opening, and the final official deadline in one place.",
      formsLead: "Move from a selected call directly into the relevant form family and instructions.",
      guidesLead: "Keep FAQ, e-Rad, electronic systems, and key guidance in the same review loop.",
      sourceGuideProgramsTitle: "Start from the priority calls",
      sourceGuideProgramsText: "Begin with the currently relevant or open programs, then expand into the broader catalog only when needed.",
      sourceGuideDatesTitle: "Confirm the timeline next",
      sourceGuideDatesText: "Use the timeline to align notice dates, system opening, and the final submission deadline before preparing materials.",
      sourceGuideFormsTitle: "Then prepare forms",
      sourceGuideFormsText: "Once the call is fixed, move immediately into the matching form family, entry guidance, and upload instructions.",
      sourceGuideSourcesTitle: "Finish with official evidence",
      sourceGuideSourcesText: "The workspace organizes the information, but every final check should still go back to the official page or archived snapshot.",
    },
    calls: {
      kicker: "Program Explorer",
      title: "Call Catalog",
      lede: "Filter detailed priority programs and official JSPS index entries together, so you can focus on Start-up Support and Early-Career Scientists first, then expand outward into the broader catalog.",
      filterTitle: "Browse and filter",
      quickFilters: "Quick filters",
      footerTitle: "Once you identify the call, move straight to the timeline and forms",
      searchPlaceholder: "Search calls, form codes, official entries, or keywords",
      statusAll: "All statuses",
      statusOpen: "Open only",
      statusClosed: "Closed / reference",
      groupAll: "All groups",
      sortPriority: "Priority first",
      sortTitle: "By title",
      sortStatus: "By status",
      quickAll: "All",
      quickPriority: "Priority",
      quickOpen: "Open",
      quickStartup: "Start-up",
      quickYoung: "Early-Career",
      quickForms: "S-21 / S-22",
      detailTitle: "Entry detail",
      officialLinks: "Official links",
      featuredDocs: "Featured documents",
      featuredForms: "Form families",
    },
    deadlines: {
      kicker: "Schedule",
      title: "Timeline and Deadlines",
      lede: "See notice dates, call opening dates, electronic system availability, and the official JSPS deadlines for the priority programs in one place.",
      timelineTitle: "Key event timeline",
      tableTitle: "Exact schedule table",
      colProgram: "Program",
      colType: "Milestone",
      colDate: "Date",
      colNote: "Notes",
      footerTitle: "Once the dates are clear, move into the form-preparation phase",
    },
    forms: {
      kicker: "Form Families",
      title: "Forms and Materials",
      lede: "This page keeps S-21, S-22, the related entry guidance, upload instructions, PDF versions, and companion links together so the move from schedule-checking to document-preparation is smooth.",
      filterTitle: "Search form families",
      searchPlaceholder: "Search S-21, S-22, program names, sections, or official instructions",
      programAll: "All programs",
      sortCode: "By form code",
      sortProgram: "By program",
      footerTitle: "After locating the forms, fill in the procedural context and FAQ",
    },
    guides: {
      kicker: "Official Guides",
      title: "Application Guides",
      lede: "This page goes beyond a plain link dump by concentrating the FAQ, e-Rad, electronic system, and priority documents that are worth revisiting while preparing an application.",
      gridTitle: "Core application entry points",
      watchTitle: "Priority-program watchpoints",
      startupWatch: "Research Activity Start-up Support",
      youngWatch: "Early-Career Scientists",
      footerTitle: "After checking the guides, review the source registry and archive",
    },
    sources: {
      kicker: "Provenance",
      title: "Official Sources",
      lede: "This page separates the true official pages from the classified entries inside the JSPS public-call index so the portal does not replace the original sources.",
      registryTitle: "Core source registry",
      categoryTitle: "Public-call index entries",
      footerTitle: "Once the sources are verified, return to the call pages for preparation",
    },
    archive: {
      kicker: "Snapshot Archive",
      title: "Snapshot Archive",
      lede: "Each fetch creates a dated directory so that even if JSPS updates or closes a page, the official wording and link structure from that date remain traceable.",
      gridTitle: "Snapshot directories",
      footerTitle: "After checking history, jump back into the current snapshot",
    },
    footer: {
      resources: "Resources",
      homeTitle: "Continue into the more detailed preparation pages",
      catalog: "Open call catalog",
      archive: "Open archive",
      deadlines: "Open timeline",
      forms: "Open forms",
      guides: "Open guides",
      sources: "Open sources",
      home: "Back home",
    },
  },
};

const state = {
  locale: getStoredLocale(),
  theme: getStoredTheme(),
  data: null,
  page: document.body?.dataset.page || "home",
  filters: getStoredFilters(),
};
const THEME_OPTIONS = [
  { value: "tohoku", label: "Tohoku", title: "Tohoku University theme", swatchClass: "theme-tohoku", themeColor: "#f3eef9" },
  { value: "toyama", label: "Toyama", title: "University of Toyama theme", swatchClass: "theme-toyama", themeColor: "#edf4f7" },
  { value: "usst", label: "USST", title: "USST theme", swatchClass: "theme-usst", themeColor: "#f7eded" },
  { value: "default", label: "Base", title: "Base theme", swatchClass: "theme-base", themeColor: "#f5eee4" },
];

document.addEventListener("DOMContentLoaded", init);

async function init() {
  state.data = await loadData();
  if (!state.data) {
    return;
  }

  renderLocaleSwitcher();
  renderThemeSwitcher();
  applyI18n();
  bindSharedHashState();
  routePage();
  revealPage();
}

function getStoredLocale() {
  try {
    const saved = localStorage.getItem(LOCALE_KEY) || localStorage.getItem(LEGACY_LOCALE_KEY);
    return saved === "zh" ? "zh" : "en";
  } catch {
    return "en";
  }
}

function getStoredTheme() {
  try {
    const saved = localStorage.getItem(THEME_KEY) || localStorage.getItem(LEGACY_THEME_KEY);
    return saved === "default" || !saved ? "tohoku" : saved;
  } catch {
    return "tohoku";
  }
}

function getStoredFilters() {
  const fallback = {
    calls: { search: "", status: "all", group: "all", sort: "priority", quick: "all", selectedId: "" },
    forms: { search: "", program: "all", sort: "code" },
  };
  try {
    const parsed = JSON.parse(localStorage.getItem(FILTER_KEY) || "{}");
    return {
      calls: { ...fallback.calls, ...(parsed.calls || {}) },
      forms: { ...fallback.forms, ...(parsed.forms || {}) },
    };
  } catch {
    return fallback;
  }
}

function persistFilters() {
  try {
    localStorage.setItem(FILTER_KEY, JSON.stringify(state.filters));
  } catch {}
}

async function loadData() {
  if (DATA_BUNDLE) {
    return DATA_BUNDLE;
  }
  try {
    const response = await fetch(DATA_URL, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.warn("Failed to load portal data:", error);
    return null;
  }
}

function routePage() {
  switch (state.page) {
    case "home":
      renderHomePage();
      break;
    case "calls":
      renderCallsPage();
      break;
    case "deadlines":
      renderDeadlinesPage();
      break;
    case "forms":
      renderFormsPage();
      break;
    case "guides":
      renderGuidesPage();
      break;
    case "sources":
      renderSourcesPage();
      break;
    case "archive":
      renderArchivePage();
      break;
    default:
      break;
  }
}

function nextLocaleName(currentLocale = state.locale) {
  const sequence = ["zh", "en"];
  const pointer = sequence.indexOf(currentLocale);
  if (pointer === -1) {
    return sequence[0];
  }
  return sequence[(pointer + 1) % sequence.length];
}

function nextThemeName(currentTheme = state.theme) {
  const sequence = THEME_OPTIONS.map((option) => option.value);
  const pointer = sequence.indexOf(currentTheme);
  if (pointer === -1) {
    return sequence[0];
  }
  return sequence[(pointer + 1) % sequence.length];
}

function translatedThemeTooltip(theme) {
  if (state.locale === "zh") {
    return {
      tohoku: "东北大学主题色",
      toyama: "富山大学主题色",
      usst: "上海理工大学主题色",
      default: "基础主题色",
    }[theme.value] || theme.title;
  }
  return theme.title;
}

function renderLocaleSwitcher() {
  const container = document.querySelector(".locale-switcher");
  if (!container) {
    return;
  }
  const currentLabel = state.locale === "zh" ? "ZH" : "EN";
  container.innerHTML = `
    <button class="locale-trigger" type="button" data-locale-trigger aria-label="${escapeHtml(t("common.language"))}">
      <span class="locale-label">${currentLabel}</span>
    </button>
    <div class="locale-tray">
      <button class="locale-chip" type="button" data-locale="zh"><span class="locale-label">ZH</span></button>
      <button class="locale-chip" type="button" data-locale="en"><span class="locale-label">EN</span></button>
    </div>
  `;
  container.querySelectorAll("[data-locale]").forEach((button) => {
    button.addEventListener("click", () => {
      state.locale = button.dataset.locale;
      try {
        localStorage.setItem(LOCALE_KEY, state.locale);
      } catch {}
      document.documentElement.lang = state.locale === "zh" ? "zh-CN" : "en";
      renderLocaleSwitcher();
      applyI18n();
      routePage();
    });
  });
  renderPortalReturnControl();
  syncHomepageShell();
}

function renderThemeSwitcher() {
  const container = document.querySelector(".theme-switcher");
  if (!container) {
    return;
  }
  const active = THEME_OPTIONS.find((item) => item.value === state.theme) || THEME_OPTIONS[0];
  container.innerHTML = `
    <button class="theme-trigger" type="button" data-theme-trigger aria-haspopup="true" aria-expanded="false" aria-label="${escapeHtml(t("common.theme"))}" title="${escapeHtml(translatedThemeTooltip(active))}">
      <span class="theme-swatch ${escapeHtml(active.swatchClass)}" aria-hidden="true"></span>
    </button>
    <div class="theme-tray" role="group" aria-label="${escapeHtml(t("common.theme"))}">
      ${THEME_OPTIONS
        .map(
          (theme) =>
            `<button class="theme-chip" type="button" data-theme-choice="${theme.value}" aria-label="${escapeHtml(translatedThemeTooltip(theme))}" title="${escapeHtml(translatedThemeTooltip(theme))}"><span class="theme-swatch ${escapeHtml(theme.swatchClass)}" aria-hidden="true"></span></button>`
        )
        .join("")}
    </div>
  `;
  container.querySelectorAll("[data-theme-choice]").forEach((button) => {
    button.addEventListener("click", () => {
      const nextTheme = button.dataset.themeChoice;
      state.theme = nextTheme;
      const themeOption = THEME_OPTIONS.find((opt) => opt.value === nextTheme);
      if (nextTheme === "default") {
        delete document.documentElement.dataset.theme;
      } else {
        document.documentElement.dataset.theme = nextTheme;
      }
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor && themeOption) {
        metaThemeColor.setAttribute("content", themeOption.themeColor);
      }
      try {
        localStorage.setItem(THEME_KEY, nextTheme);
      } catch {}
      renderThemeSwitcher();
    });
  });
  syncHomepageShell();
}

function applyI18n() {
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  const controls = document.querySelector(".header-controls");
  if (controls) {
    controls.setAttribute("aria-label", t("common.displayControls"));
  }
  const placeholderMap = {
    "call-search": t("calls.searchPlaceholder"),
    "form-search": t("forms.searchPlaceholder"),
  };
  Object.entries(placeholderMap).forEach(([id, value]) => {
    const input = document.getElementById(id);
    if (input) {
      input.setAttribute("placeholder", value);
    }
  });
  updateDocumentTitle();
  syncHomepageShell();
}

function syncHomepageShell() {
  if (!window.HomepageSharedShell) {
    return;
  }

  window.HomepageSharedShell.sync({
    switchers: {
      root: document,
      localeCycleLabel: state.locale === "zh" ? "切换语言" : "Cycle language",
      themeCycleLabel: state.locale === "zh" ? "切换配色" : "Cycle theme",
      onCycleLocale: () => {
        state.locale = nextLocaleName();
        try {
          localStorage.setItem(LOCALE_KEY, state.locale);
        } catch {}
        document.documentElement.lang = state.locale === "zh" ? "zh-CN" : "en";
        renderLocaleSwitcher();
        applyI18n();
        routePage();
      },
      onCycleTheme: () => {
        state.theme = nextThemeName();
        if (state.theme === "default") {
          delete document.documentElement.dataset.theme;
        } else {
          document.documentElement.dataset.theme = state.theme;
        }
        try {
          localStorage.setItem(THEME_KEY, state.theme);
        } catch {}
        renderThemeSwitcher();
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
    topnav: {
      root: document,
      navSelector: ".topnav",
      navAriaLabel: state.locale === "zh" ? "页面导航" : "Page navigation",
      menuLabel: t("common.menu"),
      showMenuLabel: t("common.showMenu"),
      hideMenuLabel: t("common.hideMenu"),
      toggleInnerHTML:
        '<svg class="ui-icon" aria-hidden="true"><use href="./assets/icons/ui-icons.svg#icon-menu"></use></svg><span class="topnav-toggle-label"></span>',
      hintInnerHTML:
        '<svg class="ui-icon" aria-hidden="true"><use href="./assets/icons/ui-icons.svg#icon-up"></use></svg>',
      breakpoint: 760,
    },
  });
  renderPortalReturnControl();
}

function renderPortalReturnControl() {
  const controls = document.querySelector(".header-controls");
  if (!controls) {
    return;
  }

  const labels = state.locale === "zh"
    ? {
        trigger: "打开功能主页菜单",
        tray: "功能主页",
        portal: "主页导航",
        academic: "个人主页",
        radar: "学术前沿",
        jsps: "JSPS 科研费",
      }
    : {
        trigger: "Open portal menu",
        tray: "Site sections",
        portal: "Homepage portal",
        academic: "Personal homepage",
        radar: "Academic Frontier",
        jsps: "JSPS KAKENHI",
      };

  const currentPath = window.location.pathname;
  const items = [
    {
      href: "/",
      label: labels.portal,
      icon: '<svg class="ui-icon" aria-hidden="true"><use href="./assets/icons/ui-icons.svg#icon-home"></use></svg>',
      active: currentPath === "/",
    },
    {
      href: "/academic/",
      label: labels.academic,
      icon: '<img class="portal-chip-logo" src="/assets/images/avatar-openai.jpg" alt="" loading="lazy" />',
      active: currentPath.startsWith("/academic/"),
      extraClass: "portal-chip--portrait",
    },
    {
      href: "/frontier-radar/",
      label: labels.radar,
      icon: '<img class="portal-chip-logo" src="/frontier-radar/favicon.svg" alt="" loading="lazy" />',
      active: currentPath.startsWith("/frontier-radar/"),
    },
    {
      href: "/jsps-kakenhi/",
      label: labels.jsps,
      icon: '<img class="portal-chip-logo" src="/jsps-kakenhi/favicon.png" alt="" loading="lazy" />',
      active: currentPath.startsWith("/jsps-kakenhi/"),
    },
  ];
  const activeItem = items.find((item) => item.active) || items[0];
  const trayItems = items.filter((item) => item.href !== activeItem.href);

  controls.querySelectorAll(".portal-return-link").forEach((node) => node.remove());

  let switcher = controls.querySelector(".portal-switcher");
  if (!switcher) {
    switcher = document.createElement("div");
    switcher.className = "portal-switcher control-switcher";
    controls.insertBefore(switcher, controls.firstElementChild);
  }

  switcher.innerHTML = `
    <button
      class="portal-trigger ${activeItem.extraClass || ""}"
      type="button"
      data-portal-trigger
      aria-haspopup="true"
      aria-expanded="false"
      aria-label="${escapeHtml(activeItem.label)}"
      title="${escapeHtml(activeItem.label)}"
    >
      ${activeItem.icon}
    </button>
    <div class="portal-tray" role="group" aria-label="${escapeHtml(labels.tray)}">
      ${trayItems.map((item) => `
        <a
          class="portal-chip ${item.extraClass || ""}"
          href="${item.href}"
          aria-label="${escapeHtml(item.label)}"
          title="${escapeHtml(item.label)}"
        >
          ${item.icon}
        </a>
      `).join("")}
    </div>
  `;
}

function updateDocumentTitle() {
  const titleMap = {
    home: state.locale === "zh" ? "JSPS 科研费工作台" : "JSPS KAKENHI Workspace",
    calls: state.locale === "zh" ? "项目目录 | JSPS 科研费工作台" : "Call Catalog | JSPS KAKENHI Workspace",
    deadlines: state.locale === "zh" ? "时间线 | JSPS 科研费工作台" : "Timeline | JSPS KAKENHI Workspace",
    forms: state.locale === "zh" ? "表格材料 | JSPS 科研费工作台" : "Forms | JSPS KAKENHI Workspace",
    guides: state.locale === "zh" ? "申请指引 | JSPS 科研费工作台" : "Guides | JSPS KAKENHI Workspace",
    sources: state.locale === "zh" ? "官方来源 | JSPS 科研费工作台" : "Sources | JSPS KAKENHI Workspace",
    archive: state.locale === "zh" ? "快照归档 | JSPS 科研费工作台" : "Archive | JSPS KAKENHI Workspace",
  };
  if (titleMap[state.page]) {
    document.title = titleMap[state.page];
  }
}

function ensureHeaderControlsAnchor(controls) {
  const container = controls?.closest(".header-tools");
  if (!container) {
    return null;
  }

  let anchor = container.querySelector(".header-controls-anchor");
  if (!anchor) {
    anchor = document.createElement("div");
    anchor.className = "header-controls-anchor";
    anchor.setAttribute("aria-hidden", "true");
    container.insertBefore(anchor, controls);
  }

  return anchor;
}

function updateHeaderControlsPosition() {
  const controls = document.querySelector(".header-controls");
  const nav = document.querySelector(".topnav-shell") || document.querySelector(".topnav");
  const header = document.querySelector(".site-header");
  if (!controls || !nav || !header) {
    return;
  }
  const navRect = nav.getBoundingClientRect();
  const headerRect = header.getBoundingClientRect();
  const controlsRect = controls.getBoundingClientRect();
  const gutterGap = window.matchMedia("(max-width: 760px)").matches ? 8 : 12;
  const referenceLeft = Math.min(headerRect.left, navRect.left);
  const nextTop = Math.round(navRect.top + (navRect.height - controlsRect.height) / 2);
  const nextLeft = Math.round(Math.max(8, referenceLeft - controlsRect.width - gutterGap));

  controls.style.setProperty("--header-controls-top", `${Math.max(8, nextTop)}px`);
  controls.style.setProperty("--header-controls-left", `${nextLeft}px`);
}

function scheduleHeaderControlsPositionUpdate() {
  if (headerControlsPositionTicking) {
    return;
  }

  headerControlsPositionTicking = true;
  window.requestAnimationFrame(() => {
    headerControlsPositionTicking = false;
    updateHeaderControlsPosition();
  });
}

function initHeaderControlsPosition() {
  scheduleHeaderControlsPositionUpdate();

  if (headerControlsPositionBound) {
    return;
  }

  headerControlsPositionBound = true;
  window.addEventListener("resize", scheduleHeaderControlsPositionUpdate);
  window.addEventListener("orientationchange", scheduleHeaderControlsPositionUpdate);
  window.addEventListener("load", scheduleHeaderControlsPositionUpdate);
  if (document.fonts?.ready) {
    document.fonts.ready.then(scheduleHeaderControlsPositionUpdate).catch(() => {});
  }
}

function ensureTopnavOverflowShell(nav) {
  if (!nav) {
    return null;
  }

  if (nav.parentElement?.classList.contains("topnav-shell")) {
    return nav.parentElement;
  }

  const shell = document.createElement("div");
  shell.className = "topnav-shell";
  nav.parentNode?.insertBefore(shell, nav);

  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "topnav-toggle";
  toggle.dataset.topnavToggle = "true";
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-haspopup", "true");
  toggle.innerHTML = `<span class="topnav-toggle-label">${escapeHtml(t("common.menu"))}</span>`;

  shell.appendChild(toggle);
  shell.appendChild(nav);
  return shell;
}

function updateTopnavOverflowState(nav) {
  const shell = ensureTopnavOverflowShell(nav);
  if (!shell) {
    return;
  }

  shell.classList.remove("use-menu");
  const maxScrollLeft = Math.max(0, nav.scrollWidth - nav.clientWidth);
  const overflowing = maxScrollLeft > 12;
  const atStart = nav.scrollLeft <= 8;
  const atEnd = nav.scrollLeft >= maxScrollLeft - 8;
  const forceMenu = window.matchMedia("(max-width: 760px)").matches;
  const useMenu = forceMenu;

  shell.classList.toggle("has-overflow", overflowing);
  shell.classList.toggle("is-scrolled", overflowing && !atStart);
  shell.classList.toggle("is-at-end", !overflowing || atEnd);
  shell.classList.toggle("use-menu", useMenu);

  if (!useMenu) {
    setTopnavMenuExpanded(shell, false);
  }
}

function refreshTopnavOverflowHints() {
  document.querySelectorAll(".topnav").forEach((nav) => {
    updateTopnavOverflowState(nav);
  });
  scheduleHeaderControlsPositionUpdate();
}

function setTopnavMenuExpanded(shell, expanded) {
  if (!shell) {
    return;
  }
  shell.classList.toggle("is-open", expanded);
  const trigger = shell.querySelector("[data-topnav-toggle]");
  if (trigger) {
    trigger.setAttribute("aria-expanded", expanded ? "true" : "false");
    trigger.setAttribute("aria-label", expanded ? t("common.hideMenu") : t("common.showMenu"));
    trigger.textContent = t("common.menu");
  }
}

function closeTopnavMenus() {
  document.querySelectorAll(".topnav-shell.is-open").forEach((shell) => {
    setTopnavMenuExpanded(shell, false);
  });
}

function initTopnavMenus() {
  document.querySelectorAll(".topnav").forEach((nav) => {
    ensureTopnavOverflowShell(nav);
  });

  document.querySelectorAll("[data-topnav-toggle]").forEach((button) => {
    if (button.dataset.topnavBound === "true") {
      return;
    }
    button.dataset.topnavBound = "true";
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const shell = button.closest(".topnav-shell");
      const willOpen = !shell?.classList.contains("is-open");
      closeTopnavMenus();
      setTopnavMenuExpanded(shell, willOpen);
    });
  });

  document.querySelectorAll(".topnav a").forEach((link) => {
    if (link.dataset.topnavLinkBound === "true") {
      return;
    }
    link.dataset.topnavLinkBound = "true";
    link.addEventListener("click", () => {
      closeTopnavMenus();
    });
  });

  if (topnavMenuBound) {
    return;
  }

  topnavMenuBound = true;

  document.addEventListener("click", (event) => {
    if (event.target.closest(".topnav-shell")) {
      return;
    }
    closeTopnavMenus();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeTopnavMenus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
      closeTopnavMenus();
    }
  });
}

function initTopnavOverflowHints() {
  document.querySelectorAll(".topnav").forEach((nav) => {
    ensureTopnavOverflowShell(nav);
  });

  refreshTopnavOverflowHints();

  if (topnavOverflowBound) {
    return;
  }

  topnavOverflowBound = true;

  document.querySelectorAll(".topnav").forEach((nav) => {
    nav.addEventListener("scroll", () => updateTopnavOverflowState(nav), { passive: true });
  });

  window.addEventListener("resize", refreshTopnavOverflowHints, { passive: true });
  window.addEventListener("load", refreshTopnavOverflowHints, { passive: true });

  if (document.fonts?.ready) {
    document.fonts.ready.then(() => {
      refreshTopnavOverflowHints();
      window.setTimeout(refreshTopnavOverflowHints, 120);
    });
  } else {
    window.setTimeout(refreshTopnavOverflowHints, 120);
  }
}

function bindSharedHashState() {
  window.addEventListener("hashchange", () => {
    if (state.page === "calls") {
      const id = window.location.hash.replace(/^#/, "");
      if (id) {
        state.filters.calls.selectedId = id;
        renderCallsPage();
      }
    }
    if (state.page === "forms") {
      const id = window.location.hash.replace(/^#/, "");
      if (id) {
        state.filters.forms.program = id;
        renderFormsPage();
      }
    }
  });
}

function revealPage() {
  document.querySelectorAll(".reveal").forEach((node, index) => {
    node.style.transitionDelay = `${index * 45}ms`;
    node.classList.add("is-visible");
  });
  document.body.classList.add("is-ready");
}

function renderHomePage() {
  const priorityGrid = document.getElementById("home-priority-grid");
  const workflowGrid = document.getElementById("home-workflow-grid");
  const watchList = document.getElementById("home-watch-list");
  const jumpList = document.getElementById("home-jump-list");
  const sourceGrid = document.getElementById("home-source-grid");
  const archiveList = document.getElementById("home-archive-list");
  const sourceGuideList = document.getElementById("home-source-guide-list");

  if (!priorityGrid || !workflowGrid || !watchList || !jumpList || !sourceGrid || !archiveList || !sourceGuideList) {
    return;
  }

  const { programs, guides, source_registry: sourceRegistry, archive } = state.data;
  const workflowCards = [
    {
      kicker: t("nav.calls"),
      title: t("nav.calls"),
      text: t("home.callsLead"),
      meta: `${state.data.call_catalog.length} ${state.locale === "zh" ? "条目录" : "entries"}`,
      href: "./calls.html",
    },
    {
      kicker: t("nav.deadlines"),
      title: t("nav.deadlines"),
      text: t("home.deadlinesLead"),
      meta: `${state.data.timeline.length} ${state.locale === "zh" ? "个节点" : "milestones"}`,
      href: "./deadlines.html",
    },
    {
      kicker: t("nav.forms"),
      title: t("nav.forms"),
      text: t("home.formsLead"),
      meta: `${overview.form_count} ${state.locale === "zh" ? "份表格" : "forms"}`,
      href: "./forms.html",
    },
    {
      kicker: t("nav.guides"),
      title: t("nav.guides"),
      text: t("home.guidesLead"),
      meta: `${guides.length} ${state.locale === "zh" ? "条指引" : "guides"}`,
      href: "./guides.html",
    },
  ];

  priorityGrid.innerHTML = programs
    .map(
      (program) => `
        <article class="feature-card program-spotlight">
          <div class="portal-card-head">
            <div>
              <p class="eyebrow">${escapeHtml(program.family_title)}</p>
              <h3>${escapeHtml(program.title)}</h3>
            </div>
            ${statusPill(program.status)}
          </div>
          <p>${escapeHtml(localeValue(program, "summary"))}</p>
          <p class="portal-subtle">${escapeHtml(localeValue(program, "eligibility"))}</p>
          <div class="meta-strip">
            ${metaPill(`${t("common.documents")} ${program.document_count}`)}
            ${metaPill(`${t("common.forms")} ${program.form_count}`)}
            ${metaPill(`${t("common.updated")} ${program.page_last_updated || "--"}`)}
          </div>
          <div class="link-row">
            <a class="button button-primary" href="./calls.html#${program.id}">${t("footer.catalog")}</a>
            <a class="button button-secondary" href="${resolveHref(program.snapshot_path)}">${t("common.snapshot")}</a>
          </div>
        </article>
      `
    )
    .join("");

  workflowGrid.innerHTML = workflowCards
    .map(
      (card) => `
        <article class="feature-card">
          <div class="portal-card-head">
            <div>
              <p class="eyebrow">${escapeHtml(card.kicker)}</p>
              <h3>${escapeHtml(card.title)}</h3>
            </div>
          </div>
          <p>${escapeHtml(card.text)}</p>
          <div class="meta-strip">
            ${metaPill(card.meta)}
          </div>
          <div class="link-row">
            <a class="button button-secondary" href="${card.href}">${escapeHtml(card.title)}</a>
          </div>
        </article>
      `
    )
    .join("");

  watchList.innerHTML = programs
    .flatMap((program) => programWatchItems(program).slice(0, 2))
    .map((item) => stackItem(item.title, item.text))
    .join("");

  jumpList.innerHTML = sourceRegistry
    .slice(0, 4)
    .map((source) => stackItem(localeField(source, "title"), localeField(source, "summary"), source.official_url))
    .join("");

  sourceGrid.innerHTML = sourceRegistry
    .slice(0, 4)
    .map(
      (source) => `
        <article class="link-card">
          <h3 class="link-card-title">${escapeHtml(localeField(source, "title"))}</h3>
          <p>${escapeHtml(localeField(source, "summary"))}</p>
          <div class="meta-strip">
            ${metaPill(`${t("common.links")} ${source.resource_count}`)}
          </div>
          <div class="link-row">
            <a href="${source.official_url}" target="_blank" rel="noreferrer">${t("common.viewOfficial")}</a>
            <a href="${resolveHref(source.snapshot_path)}">${t("common.viewSnapshot")}</a>
          </div>
        </article>
      `
    )
    .join("");

  archiveList.innerHTML = archive
    .slice(0, 3)
    .map((snapshotEntry) => stackItem(snapshotEntry.snapshot_date, `${snapshotEntry.files.length} ${state.locale === "zh" ? "份文件" : "files"} · ${snapshotEntry.fetched_at || "--"}`, snapshotEntry.files[0]?.local_path || ""))
    .join("");

  sourceGuideList.innerHTML = [
    stackItem(t("home.sourceGuideProgramsTitle"), t("home.sourceGuideProgramsText")),
    stackItem(t("home.sourceGuideDatesTitle"), t("home.sourceGuideDatesText")),
    stackItem(t("home.sourceGuideFormsTitle"), t("home.sourceGuideFormsText")),
    stackItem(t("home.sourceGuideSourcesTitle"), t("home.sourceGuideSourcesText")),
  ].join("");
}

function renderCallsPage() {
  const searchInput = document.getElementById("call-search");
  const statusFilter = document.getElementById("call-status-filter");
  const groupFilter = document.getElementById("call-group-filter");
  const sortFilter = document.getElementById("call-sort-filter");
  const resetButton = document.getElementById("call-reset");
  const quickFilters = document.getElementById("call-quick-filters");
  const callList = document.getElementById("call-list");
  const callDetail = document.getElementById("call-detail");
  const metrics = document.getElementById("calls-detail-metrics");

  if (!searchInput || !statusFilter || !groupFilter || !sortFilter || !resetButton || !quickFilters || !callList || !callDetail) {
    return;
  }

  const allEntries = state.data.call_catalog.slice();
  const groups = Array.from(new Set(allEntries.map((entry) => entry.group))).sort();
  const hashId = window.location.hash.replace(/^#/, "");
  if (hashId) {
    state.filters.calls.selectedId = hashId;
  }
  if (!state.filters.calls.selectedId && allEntries.length) {
    const preferred = allEntries.find((entry) => entry.priority && entry.status === "open") || allEntries[0];
    state.filters.calls.selectedId = preferred.id;
  }

  searchInput.value = state.filters.calls.search;
  statusFilter.innerHTML = [
    optionHtml("all", t("calls.statusAll"), state.filters.calls.status),
    optionHtml("open", t("calls.statusOpen"), state.filters.calls.status),
    optionHtml("closed", t("calls.statusClosed"), state.filters.calls.status),
  ].join("");
  groupFilter.innerHTML = [optionHtml("all", t("calls.groupAll"), state.filters.calls.group)]
    .concat(groups.map((group) => optionHtml(group, group, state.filters.calls.group)))
    .join("");
  sortFilter.innerHTML = [
    optionHtml("priority", t("calls.sortPriority"), state.filters.calls.sort),
    optionHtml("title", t("calls.sortTitle"), state.filters.calls.sort),
    optionHtml("status", t("calls.sortStatus"), state.filters.calls.sort),
  ].join("");

  if (!searchInput.dataset.bound) {
    searchInput.addEventListener("input", (event) => {
      state.filters.calls.search = event.target.value.trim();
      persistFilters();
      renderCallsPage();
    });
    statusFilter.addEventListener("change", (event) => {
      state.filters.calls.status = event.target.value;
      persistFilters();
      renderCallsPage();
    });
    groupFilter.addEventListener("change", (event) => {
      state.filters.calls.group = event.target.value;
      persistFilters();
      renderCallsPage();
    });
    sortFilter.addEventListener("change", (event) => {
      state.filters.calls.sort = event.target.value;
      persistFilters();
      renderCallsPage();
    });
    resetButton.addEventListener("click", () => {
      state.filters.calls = {
        search: "",
        status: "all",
        group: "all",
        sort: "priority",
        quick: "all",
        selectedId: state.filters.calls.selectedId,
      };
      persistFilters();
      renderCallsPage();
    });
    searchInput.dataset.bound = "true";
  }

  const quickButtons = [
    { id: "all", label: t("calls.quickAll"), apply: () => ({ search: "", status: "all", group: "all" }) },
    { id: "priority", label: t("calls.quickPriority"), apply: () => ({ group: "重点项目" }) },
    { id: "open", label: t("calls.quickOpen"), apply: () => ({ status: "open" }) },
    { id: "startup", label: t("calls.quickStartup"), apply: () => ({ search: "研究活動スタート支援" }) },
    { id: "young", label: t("calls.quickYoung"), apply: () => ({ search: "若手研究" }) },
    { id: "forms", label: t("calls.quickForms"), apply: () => ({ search: "S-2" }) },
  ];
  quickFilters.innerHTML = quickButtons
    .map(
      (button) => `<button class="tag ${button.id === state.filters.calls.quick ? "is-active" : ""}" type="button" data-quick="${button.id}">${escapeHtml(button.label)}</button>`
    )
    .join("");
  quickFilters.querySelectorAll("[data-quick]").forEach((button) => {
    button.addEventListener("click", () => {
      const choice = quickButtons.find((item) => item.id === button.dataset.quick);
      state.filters.calls.quick = choice.id;
      state.filters.calls = { ...state.filters.calls, ...choice.apply(), quick: choice.id };
      persistFilters();
      renderCallsPage();
    });
  });

  let filtered = allEntries.filter((entry) => {
    const query = state.filters.calls.search.toLowerCase();
    const matchesSearch =
      !query ||
      [entry.title, entry.subtitle, entry.group, entry.search_blob]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(query);
    const matchesStatus = state.filters.calls.status === "all" || entry.status === state.filters.calls.status;
    const matchesGroup = state.filters.calls.group === "all" || entry.group === state.filters.calls.group;
    return matchesSearch && matchesStatus && matchesGroup;
  });

  filtered = filtered.sort((left, right) => {
    if (state.filters.calls.sort === "title") {
      return left.title.localeCompare(right.title, "ja");
    }
    if (state.filters.calls.sort === "status") {
      return left.status.localeCompare(right.status, "en") || left.title.localeCompare(right.title, "ja");
    }
    return (
      Number(right.priority) - Number(left.priority) ||
      statusWeight(left.status) - statusWeight(right.status) ||
      left.title.localeCompare(right.title, "ja")
    );
  });

  if (!filtered.some((entry) => entry.id === state.filters.calls.selectedId)) {
    state.filters.calls.selectedId = filtered[0]?.id || "";
  }

  if (metrics) {
    metrics.innerHTML = [
      metaPill(`${t("common.links")} ${allEntries.length}`),
      metaPill(`${t("common.openPrograms")} ${state.data.programs.filter((program) => program.status === "open").length}`),
      metaPill(`${t("common.priority")} ${state.data.programs.filter((program) => program.priority).length}`),
    ].join("");
  }

  callList.innerHTML = filtered.length
    ? filtered
        .map(
          (entry) => `
            <button class="portal-select-card ${entry.id === state.filters.calls.selectedId ? "is-selected" : ""}" type="button" data-entry-id="${entry.id}">
              <span class="portal-select-head">
                <span>
                  <span class="eyebrow">${escapeHtml(entry.subtitle || entry.group)}</span>
                  <strong>${escapeHtml(entry.title)}</strong>
                </span>
                ${statusPill(entry.status)}
              </span>
              <span class="portal-select-body">${escapeHtml(localeValue(entry, "summary"))}</span>
              <span class="portal-select-meta">
                ${metaPill(entry.group)}
                ${entry.form_codes?.length ? metaPill(entry.form_codes.join(" / ")) : ""}
              </span>
            </button>
          `
        )
        .join("")
    : `<div class="empty">${t("common.noResults")}</div>`;

  callList.querySelectorAll("[data-entry-id]").forEach((button) => {
    button.addEventListener("click", () => {
      state.filters.calls.selectedId = button.dataset.entryId;
      persistFilters();
      history.replaceState(null, "", `#${state.filters.calls.selectedId}`);
      renderCallsPage();
    });
  });

  const selected = allEntries.find((entry) => entry.id === state.filters.calls.selectedId);
  callDetail.innerHTML = selected ? renderCallDetail(selected) : `<div class="empty">${t("common.detailHint")}</div>`;
}

function renderCallDetail(entry) {
  if (entry.type !== "detailed") {
    return `
      <div class="portal-card-head">
        <div>
          <p class="eyebrow">${escapeHtml(entry.group)}</p>
          <h3>${escapeHtml(entry.title)}</h3>
        </div>
        ${statusPill(entry.status)}
      </div>
      <p>${escapeHtml(localeValue(entry, "summary"))}</p>
      <div class="meta-strip">
        ${metaPill(entry.group)}
      </div>
      <div class="link-row">
        <a href="${entry.official_url}" target="_blank" rel="noreferrer">${t("common.viewOfficial")}</a>
      </div>
    `;
  }

  const program = state.data.programs.find((item) => item.id === entry.id);
  if (!program) {
    return `<div class="empty">${t("common.detailHint")}</div>`;
  }
  return `
    <div class="portal-card-head">
      <div>
        <p class="eyebrow">${escapeHtml(program.family_title)}</p>
        <h3>${escapeHtml(program.title)}</h3>
      </div>
      ${statusPill(program.status)}
    </div>
    <p>${escapeHtml(localeValue(program, "summary"))}</p>
    <p class="portal-subtle">${escapeHtml(localeValue(program, "eligibility"))}</p>
    <div class="meta-strip">
      ${metaPill(`${t("common.updated")} ${program.page_last_updated || "--"}`)}
      ${program.submission_deadline ? metaPill(`${t("common.nextDeadline")} ${formatDate(program.submission_deadline)}`) : ""}
    </div>
    <div class="portal-detail-block">
      <h4>${t("calls.officialLinks")}</h4>
      <div class="link-row-inline">
        ${program.key_links.map((link) => `<a href="${resolveHref(link.href)}" ${link.href.startsWith("http") ? 'target="_blank" rel="noreferrer"' : ""}>${escapeHtml(localeField(link, "label"))}</a>`).join("")}
      </div>
    </div>
    <div class="portal-detail-block">
      <h4>${t("calls.featuredDocs")}</h4>
      <ul class="portal-list">
        ${program.featured_documents
          .slice(0, 6)
          .map((document) => `<li><a href="${document.url}" target="_blank" rel="noreferrer">${escapeHtml(document.title)}</a></li>`)
          .join("")}
      </ul>
    </div>
    <div class="portal-detail-block">
      <h4>${t("calls.featuredForms")}</h4>
      <ul class="portal-list">
        ${program.forms
          .slice(0, 4)
          .map((form) => `<li>${escapeHtml(form.form_number)} · ${escapeHtml((form.family_names || [program.title])[0])}</li>`)
          .join("")}
      </ul>
    </div>
    <div class="portal-detail-block">
      <h4>${t("common.watchpoints")}</h4>
      <ul class="portal-list">
        ${localeList(program, "watchpoints").map((note) => `<li>${escapeHtml(note)}</li>`).join("")}
      </ul>
    </div>
  `;
}

function renderDeadlinesPage() {
  const timelineEl = document.getElementById("deadline-timeline");
  const tableBody = document.getElementById("deadline-table-body");
  const metrics = document.getElementById("deadlines-detail-metrics");
  if (!timelineEl || !tableBody) {
    return;
  }
  const events = state.data.timeline;
  const nextDeadline = events.find((event) => event.type === "deadline" && (event.status === "today" || event.status === "upcoming"));
  if (metrics) {
    metrics.innerHTML = [
      metaPill(`${t("common.links")} ${events.length}`),
      metaPill(nextDeadline ? `${t("common.nextDeadline")} ${nextDeadline.program_title}` : `${t("common.nextDeadline")} --`),
      metaPill(`${t("common.status")} ${state.data.site.snapshot_date}`),
    ].join("");
  }

  timelineEl.innerHTML = events
    .map(
      (event) => `
        <div class="timeline-item timeline-theme-${event.theme}">
          <time datetime="${event.datetime || event.date}">
            <span>${formatTimelineMonth(event.date)}</span>
            <strong>${formatTimelineDay(event.date)}</strong>
          </time>
          <article class="timeline-card">
            <div class="timeline-heading">
              <h4 class="timeline-title-text">${escapeHtml(event.program_title)} · ${escapeHtml(eventTypeLabel(event.type))}</h4>
              <span class="timeline-tag">${escapeHtml(t(`eventType.${event.status}`))}</span>
            </div>
            <p class="timeline-summary">
              <strong>${escapeHtml(localeField(event, "title"))}</strong><br />
              ${escapeHtml(formatDateTime(event.datetime || event.date))}
            </p>
            ${event.note_zh || event.note_en ? `<p class="timeline-summary-note">${escapeHtml(localeField(event, "note"))}</p>` : ""}
          </article>
        </div>
      `
    )
    .join("");

  tableBody.innerHTML = events
    .map(
      (event) => `
        <tr>
          <td>${escapeHtml(event.program_title)}</td>
          <td>${escapeHtml(eventTypeLabel(event.type))}</td>
          <td>${escapeHtml(formatDateTime(event.datetime || event.date))}</td>
          <td>${escapeHtml(localeField(event, "note") || "--")}</td>
        </tr>
      `
    )
    .join("");
}

function renderFormsPage() {
  const searchInput = document.getElementById("form-search");
  const programFilter = document.getElementById("form-program-filter");
  const sortFilter = document.getElementById("form-sort-filter");
  const resetButton = document.getElementById("form-reset");
  const grid = document.getElementById("form-grid");
  const metrics = document.getElementById("forms-detail-metrics");
  if (!searchInput || !programFilter || !sortFilter || !resetButton || !grid) {
    return;
  }

  const hashProgram = window.location.hash.replace(/^#/, "");
  if (hashProgram && state.data.programs.some((program) => program.id === hashProgram)) {
    state.filters.forms.program = hashProgram;
  }

  const forms = state.data.forms_catalog.slice();
  const programs = state.data.programs.slice();

  searchInput.value = state.filters.forms.search;
  programFilter.innerHTML = [optionHtml("all", t("forms.programAll"), state.filters.forms.program)]
    .concat(programs.map((program) => optionHtml(program.id, program.title, state.filters.forms.program)))
    .join("");
  sortFilter.innerHTML = [
    optionHtml("code", t("forms.sortCode"), state.filters.forms.sort),
    optionHtml("program", t("forms.sortProgram"), state.filters.forms.sort),
  ].join("");

  if (!searchInput.dataset.bound) {
    searchInput.addEventListener("input", (event) => {
      state.filters.forms.search = event.target.value.trim();
      persistFilters();
      renderFormsPage();
    });
    programFilter.addEventListener("change", (event) => {
      state.filters.forms.program = event.target.value;
      persistFilters();
      renderFormsPage();
    });
    sortFilter.addEventListener("change", (event) => {
      state.filters.forms.sort = event.target.value;
      persistFilters();
      renderFormsPage();
    });
    resetButton.addEventListener("click", () => {
      state.filters.forms = { search: "", program: "all", sort: "code" };
      persistFilters();
      renderFormsPage();
    });
    searchInput.dataset.bound = "true";
  }

  if (metrics) {
    metrics.innerHTML = [
      metaPill(`${t("common.forms")} ${forms.length}`),
      metaPill(`${t("common.openPrograms")} ${programs.filter((program) => program.status === "open").length}`),
      metaPill(`${t("common.status")} ${state.data.site.snapshot_date}`),
    ].join("");
  }

  const query = state.filters.forms.search.toLowerCase();
  let filtered = forms.filter((form) => {
    const matchesProgram = state.filters.forms.program === "all" || form.program_id === state.filters.forms.program;
    const haystack = [form.form_number, form.program_title, form.family_name, ...(form.page_sections || []), ...(form.row_texts || [])]
      .join(" ")
      .toLowerCase();
    const matchesSearch = !query || haystack.includes(query);
    return matchesProgram && matchesSearch;
  });

  filtered = filtered.sort((left, right) => {
    if (state.filters.forms.sort === "program") {
      return left.program_title.localeCompare(right.program_title, "ja") || left.form_number.localeCompare(right.form_number, "en");
    }
    return left.form_number.localeCompare(right.form_number, "en") || left.program_title.localeCompare(right.program_title, "ja");
  });

  grid.innerHTML = filtered.length
    ? filtered
        .map(
          (form) => `
            <article class="document-card portal-form-card">
              <div class="portal-card-head">
                <div>
                  <p class="eyebrow">${escapeHtml(form.program_title)}</p>
                  <h3>${escapeHtml(form.form_number)} · ${escapeHtml(form.family_name)}</h3>
                </div>
                ${metaPill(form.form_number)}
              </div>
              <p>${escapeHtml((form.page_sections || []).join(" / ") || form.program_title)}</p>
              ${form.row_texts?.length ? `<p class="portal-subtle">${escapeHtml(form.row_texts[0])}</p>` : ""}
              <div class="link-row">
                ${form.links
                  .slice(0, 5)
                  .map((link) => `<a href="${resolveHref(link.url)}" ${link.url.startsWith("http") ? 'target="_blank" rel="noreferrer"' : ""}>${escapeHtml(link.title || form.form_number)}</a>`)
                  .join("")}
              </div>
            </article>
          `
        )
        .join("")
    : `<div class="empty">${t("common.noResults")}</div>`;
}

function renderGuidesPage() {
  const guideGrid = document.getElementById("guide-grid");
  const startupWatch = document.getElementById("guide-startup-watch");
  const youngWatch = document.getElementById("guide-young-watch");
  const metrics = document.getElementById("guides-detail-metrics");
  if (!guideGrid || !startupWatch || !youngWatch) {
    return;
  }

  const guides = state.data.guides;
  const startup = state.data.programs.find((program) => program.id === "startup_support");
  const young = state.data.programs.find((program) => program.id === "young_research");

  if (metrics) {
    metrics.innerHTML = [
      metaPill(`${t("common.links")} ${guides.length}`),
      metaPill(`${t("common.officialDocs")} ${state.data.programs.reduce((sum, program) => sum + program.featured_documents.length, 0)}`),
      metaPill(`${t("common.status")} ${state.data.site.snapshot_date}`),
    ].join("");
  }

  guideGrid.innerHTML = guides
    .map(
      (guide) => `
        <article class="link-card">
          <div class="portal-card-head">
            <div>
              <p class="eyebrow">${escapeHtml(guide.group)}</p>
              <h3 class="link-card-title">${escapeHtml(localeField(guide, "title"))}</h3>
            </div>
            ${metaPill(guide.kind)}
          </div>
          <p>${escapeHtml(localeField(guide, "summary"))}</p>
          <div class="link-row">
            <a href="${resolveHref(guide.href)}" ${guide.href.startsWith("http") ? 'target="_blank" rel="noreferrer"' : ""}>${t("common.openLink")}</a>
          </div>
        </article>
      `
    )
    .join("");

  startupWatch.innerHTML = startup ? localeList(startup, "watchpoints").map((note) => stackItem(startup.title, note)).join("") : "";
  youngWatch.innerHTML = young ? localeList(young, "watchpoints").map((note) => stackItem(young.title, note)).join("") : "";
}

function renderSourcesPage() {
  const sourceGrid = document.getElementById("source-grid");
  const categoryGrid = document.getElementById("category-grid");
  const metrics = document.getElementById("sources-detail-metrics");
  if (!sourceGrid || !categoryGrid) {
    return;
  }

  if (metrics) {
    metrics.innerHTML = [
      metaPill(`${t("common.links")} ${state.data.source_registry.length}`),
      metaPill(`${t("common.group")} ${state.data.public_call_categories.length}`),
      metaPill(`${t("common.archiveSnapshots")} ${state.data.archive.length}`),
    ].join("");
  }

  sourceGrid.innerHTML = state.data.source_registry
    .map(
      (source) => `
        <article class="link-card">
          <div class="portal-card-head">
            <div>
              <p class="eyebrow">${escapeHtml(source.kind)}</p>
              <h3 class="link-card-title">${escapeHtml(localeField(source, "title"))}</h3>
            </div>
            ${metaPill(`${source.resource_count}`)}
          </div>
          <p>${escapeHtml(localeField(source, "summary"))}</p>
          <div class="link-row">
            <a href="${source.official_url}" target="_blank" rel="noreferrer">${t("common.viewOfficial")}</a>
            <a href="${resolveHref(source.snapshot_path)}">${t("common.viewSnapshot")}</a>
          </div>
        </article>
      `
    )
    .join("");

  categoryGrid.innerHTML = state.data.public_call_categories
    .map(
      (category) => `
        <article class="feature-card">
          <div class="portal-card-head">
            <div>
              <p class="eyebrow">${escapeHtml(category.group)}</p>
              <h3>${escapeHtml(category.title)}</h3>
            </div>
          </div>
          <div class="link-row">
            <a href="${category.url}" target="_blank" rel="noreferrer">${t("common.viewOfficial")}</a>
          </div>
        </article>
      `
    )
    .join("");
}

function renderArchivePage() {
  const archiveGrid = document.getElementById("archive-grid");
  const metrics = document.getElementById("archive-detail-metrics");
  if (!archiveGrid) {
    return;
  }
  const archive = state.data.archive;
  const totalFiles = archive.reduce((sum, snapshot) => sum + snapshot.files.length, 0);
  if (metrics) {
    metrics.innerHTML = [
      metaPill(`${t("common.archiveSnapshots")} ${archive.length}`),
      metaPill(`${t("common.links")} ${totalFiles}`),
      metaPill(`${t("common.status")} ${state.data.site.snapshot_date}`),
    ].join("");
  }

  archiveGrid.innerHTML = archive
    .map(
      (snapshot) => `
        <article class="document-card">
          <div class="portal-card-head">
            <div>
              <p class="eyebrow">${escapeHtml(snapshot.local_dir)}</p>
              <h3>${escapeHtml(snapshot.snapshot_date)}</h3>
            </div>
            ${metaPill(`${snapshot.files.length}`)}
          </div>
          <p>${escapeHtml(snapshot.fetched_at || "--")}</p>
          <ul class="portal-list">
            ${snapshot.files
              .map(
                (file) => `
                  <li>
                    <a href="${resolveHref(file.local_path)}">${escapeHtml(file.name)}</a>
                    ${file.official_url ? ` <span class="portal-inline-muted">· <a href="${file.official_url}" target="_blank" rel="noreferrer">${t("common.official")}</a></span>` : ""}
                  </li>
                `
              )
              .join("")}
          </ul>
        </article>
      `
    )
    .join("");
}

function localeValue(record, base) {
  if (!record) {
    return "";
  }
  if (state.locale === "en" && record[`${base}_en`]) {
    return record[`${base}_en`];
  }
  return record[`${base}_zh`] || record[base] || record[`${base}_en`] || "";
}

function localeField(record, field) {
  if (!record) {
    return "";
  }
  const altField = state.locale === "en" ? `${field}_en` : `${field}_zh`;
  return record[altField] || record[field] || record[`${field}_en`] || record[`${field}_zh`] || "";
}

function localeList(record, base) {
  if (!record) {
    return [];
  }
  if (state.locale === "en" && Array.isArray(record[`${base}_en`])) {
    return record[`${base}_en`];
  }
  return record[`${base}_zh`] || record[base] || record[`${base}_en`] || [];
}

function t(key) {
  const source = I18N[state.locale] || I18N.zh;
  return key.split(".").reduce((value, segment) => (value && value[segment] !== undefined ? value[segment] : null), source) || key;
}

function statusWeight(status) {
  return { open: 0, closed: 1, reference: 2, unknown: 3 }[status] ?? 4;
}

function statusPill(status) {
  return `<span class="meta-pill portal-status-pill portal-status-${status}">${escapeHtml(t(`status.${status}`))}</span>`;
}

function metricCard(label, value) {
  return `
    <article class="summary-card portal-metric-card">
      <p class="eyebrow">${escapeHtml(label)}</p>
      <h3>${escapeHtml(value)}</h3>
    </article>
  `;
}

function recordCard(icon, tone, label, value, unit, meta, href) {
  return `
    <a class="record-card" href="${escapeHtml(href)}">
      <span class="record-head">
        ${iconBadge(icon, tone)}
        <span class="stack-label">${escapeHtml(label)}</span>
      </span>
      <span class="record-value">${escapeHtml(value)}</span>
      <span class="record-unit">${escapeHtml(unit)}</span>
      <span class="record-meta">${escapeHtml(meta)}</span>
    </a>
  `;
}

function metaPill(text) {
  return `<span class="meta-pill">${escapeHtml(text)}</span>`;
}

function stackItem(title, text, href = "") {
  const body = `<span class="portal-stack-title">${escapeHtml(title)}</span><span class="portal-stack-text">${escapeHtml(text)}</span>`;
  if (href) {
    return `<a class="portal-stack-item" href="${resolveHref(href)}" ${href.startsWith("http") ? 'target="_blank" rel="noreferrer"' : ""}>${body}</a>`;
  }
  return `<div class="portal-stack-item">${body}</div>`;
}

function navChip(href, label) {
  return `<a class="button button-secondary portal-nav-chip" href="${href}">${escapeHtml(label)}</a>`;
}

function optionHtml(value, label, current) {
  return `<option value="${escapeHtml(value)}" ${value === current ? "selected" : ""}>${escapeHtml(label)}</option>`;
}

function programWatchItems(program) {
  return localeList(program, "watchpoints").map((note) => ({ title: program.title, text: note }));
}

function eventTypeLabel(type) {
  return t(`eventType.${type}`);
}

function formatDate(isoDate) {
  if (!isoDate) {
    return "--";
  }
  const date = new Date(`${isoDate}T00:00:00+09:00`);
  return new Intl.DateTimeFormat(state.locale === "zh" ? "zh-CN" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

function formatDateTime(value) {
  if (!value) {
    return "--";
  }
  const date = value.includes("T") ? new Date(value) : new Date(`${value}T00:00:00+09:00`);
  const opts = value.includes("T")
    ? { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }
    : { year: "numeric", month: "short", day: "numeric" };
  return new Intl.DateTimeFormat(state.locale === "zh" ? "zh-CN" : "en-US", opts).format(date);
}

function formatTimelineMonth(value) {
  const date = new Date(`${value}T00:00:00+09:00`);
  return new Intl.DateTimeFormat("en-US", { month: "short" }).format(date).toUpperCase();
}

function formatTimelineDay(value) {
  const date = new Date(`${value}T00:00:00+09:00`);
  return new Intl.DateTimeFormat("en-US", { day: "2-digit" }).format(date);
}

function resolveHref(href) {
  if (!href) {
    return "#";
  }
  if (/^(https?:)?\/\//.test(href)) {
    return href;
  }
  return `./${String(href).replace(/^\.\//, "")}`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
