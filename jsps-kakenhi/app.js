const DATA_URL = "./data/kakenhi-data.json";
const DATA_BUNDLE = window.KAKENHI_PORTAL_DATA || null;
const THEME_KEY = "sichen-homepage-theme";
const LEGACY_THEME_KEY = "kakenhi-portal-theme";
const LOCALE_KEY = "sichen-homepage-locale";
const LEGACY_LOCALE_KEY = "kakenhi-portal-locale";
const FILTER_KEY = "kakenhi-portal-filters";
const FILTER_SCHEMA_VERSION = 4;
const LOCALE_SWITCH_SEQUENCE = window.HomepageI18n?.LOCALE_SEQUENCE || ["zh", "en", "ja"];
let topnavOverflowBound = false;
let topnavMenuBound = false;
let headerControlsPositionBound = false;
let headerControlsPositionTicking = false;

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
const I18N = {
  zh: {
    nav: {
      home: "首页",
      calls: "项目目录",
      deadlines: "时间线",
      forms: "获取材料",
      guides: "申请指南",
    },
    common: {
      siteTitle: "JSPS 科研费工作台",
      open: "公募中",
      closed: "已结束",
      suspended: "停止募集",
      reference: "参考入口",
      unknown: "待确认",
      priority: "优先确认",
      official: "官方页面",
      documents: "文档",
      forms: "材料",
      links: "链接",
      noResults: "没有匹配结果",
      viewOfficial: "打开官方页面",
      current: "当前",
      currentTime: "当前时间",
      returnToCurrentTime: "返回当前时间点",
      nextDeadline: "下一截止",
      expectedOpening: "预计开启",
      expectedDeadline: "预计截止",
      opening: "开启",
      deadlineLabel: "截止",
      updated: "官方页更新",
      updatedShort: "更新",
      status: "状态",
      group: "分组",
      openPrograms: "公募中项目",
      trackedForms: "追踪材料",
      officialDocs: "重点资料",
      watchpoints: "提醒",
      detailHint: "点击左侧条目查看详细内容。",
      all: "全部",
      showMore: "更多",
      openLink: "打开链接",
      download: "下载",
      downloadAll: "全部下载",
      resetFilters: "重置筛选",
      menu: "菜单",
      showMenu: "展开菜单",
      hideMenu: "收起菜单",
      displayControls: "显示控制",
      language: "语言",
      languageChoices: "语言选项",
      showLanguages: "显示语言选项",
      cycleLanguages: "切换到下一种语言",
      theme: "配色主题",
      themeChoices: "配色选项",
      showThemes: "显示配色选项",
      cycleThemes: "切换到下一种配色",
      pageNavigation: "页面导航",
      openPortal: "返回主页导航页",
    },
    portal: {
      tray: "功能主页",
      portalShort: "导航页",
      portalFull: "导航页",
      academicShort: "个人主页",
      academicFull: "个人主页",
      radarShort: "学术前沿",
      radarFull: "学术前沿",
      jspsShort: "JSPS",
      jspsFull: "JSPS 科研费",
    },
    status: {
      open: "公募中",
      closed: "已结束",
      suspended: "停止募集",
      reference: "参考",
      forecast: "经验预计",
      forecastParen: "（经验预计）",
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
      keyline: "重点项目 · 时间线 · 材料",
      nativeName: "科研费项目调查与汇总",
      heroTitle: "JSPS KAKENHI",
      focusLabel: "今年重点",
      focusRole: "研究活动启动支援 · 若手研究",
      focusNote: "当前开放项目、近期截止与关键材料的一体化工作台。",
      lede: "先看今年最值得关注的重点项目，再沿着时间线、材料与官方页面进入细节。",
      snapshotTitle: "数据日期",
      priorityKicker: "重点项目",
      prioritySection: "重点项目",
      workflowKicker: "工作流程",
      workflowSection: "工作流程",
      watchTitle: "行动提醒",
      jumpTitle: "官方快速跳转",
      sourceGuideTitle: "如何使用此工作台",
      callsLead: "先在全部项目中锁定感兴趣的申请项目与赛道。",
      deadlinesLead: "把开放时间、系统开放与官方截止时间放在同一条时间线上确认。",
      formsLead: "按项目获取官方材料、填写说明与下载链接。",
      guidesLead: "把 FAQ、e-Rad、电子系统与重点指南集中检查。",
      sourceGuideProgramsTitle: "先看重点项目",
      sourceGuideProgramsText: "先从开放中或优先级最高的项目卡进入，再扩展到完整项目目录。",
      sourceGuideDatesTitle: "再核对时间线",
      sourceGuideDatesText: "用时间线确认通知、公募开始、系统开放与最终提交节点。",
      sourceGuideFormsTitle: "然后获取材料",
      sourceGuideFormsText: "确定项目后立即查看对应材料、填写要领与上传说明。",
    },
    calls: {
      kicker: "项目浏览",
      title: "项目目录",
      lede: "这一页把重点科研费项目、已抓取的官方公募页、特别研究员与海外特别研究员、外国人特别研究员与外国研究者招访项目等 JSPS 相关项目放在同一目录中统一筛选；共享官方页面的项目会互相关联，资料同时尽量保留今年与上一年度的参考入口。",
      filterTitle: "浏览与筛选",
      timelineTitle: "时间线",
      openDetail: "查看详情",
      quickFilters: "快速筛选",
      footerTitle: "项目定位后，下一步就去看时间线和材料",
      searchPlaceholder: "搜索项目、材料名称、官方入口或关键词",
      statusAll: "募集状态",
      statusOpen: "仅看公募中",
      statusClosed: "已结束 / 参考 / 停止募集",
      groupAll: "项目分组",
      audienceAll: "申请对象",
      sortPriority: "按优先级高",
      sortDeadline: "按截止时间近",
      sortTitle: "按项目名称",
      sortStatus: "按募集状态",
      targetLabel: "对象",
      scrollPrev: "向左滚动",
      scrollNext: "向右滚动",
      formTag: "材料",
      quickAll: "全部",
      quickOpen: "公募中",
      quickDeadline: "近截止",
      quickFaculty: "教员",
      quickFellowships: "特别研究员",
      quickInbound: "来日研究者",
      quickOutbound: "海外派遣",
      detailTitle: "条目详情",
      officialLinks: "官方入口",
      featuredDocs: "重点资料",
      featuredForms: "重点材料",
      pageHighlights: "页面重点链接",
      relatedPrograms: "关联项目",
      recentCycles: "今年与往年参考",
    },
    program: {
      kicker: "项目详情",
      title: "项目详情",
      lede: "这一页承接首页卡片，集中查看单个项目的官方入口、申请资料与历年参考。",
      backToCatalog: "返回项目目录",
      notFoundTitle: "未找到对应项目",
      notFoundText: "这个项目链接可能已失效、已更名，或尚未整理完成，请返回首页重新浏览。",
    },
    deadlines: {
      kicker: "时间安排",
      title: "时间线与项目入口",
      lede: "左侧扫读通知、公募开始、电子系统开放和 JSPS 官方截止，右侧按研究者阶段保留项目入口；点击任一侧才会定位对应项目，避免浏览时跳动。",
      timelineTitle: "关键事件与项目入口",
      timelinePane: "时间线",
      programPane: "项目入口",
      tableTitle: "精确时间表",
      colProgram: "项目",
      colType: "节点",
      colDate: "日期",
      colNote: "说明",
      footerTitle: "时间确认后，就进入材料准备阶段",
    },
    forms: {
      kicker: "官方材料",
      title: "获取材料",
      lede: "按科研费项目列出官方页面提供的通知、公募要领、填写说明、样式文件与相关下载链接。",
      filterTitle: "获取材料",
      searchPlaceholder: "搜索项目名、材料名称、S-21、S-22 或官方说明",
      programAll: "项目",
      sortStage: "按研究阶段",
      sortMaterials: "按材料数量",
      sortProgram: "按项目",
      proposalForms: "研究计划书・申请书样式",
      otherMaterials: "其他官方材料",
      categoryNotice: "通知",
      categorySchedule: "日程",
      categoryGuidelines: "公募要领",
      categoryInstructions: "填写说明",
      categoryForms: "研究计划书",
      categorySystem: "FAQ与系统",
      categoryReview: "审查资料",
      categoryOther: "官方材料",
      footerTitle: "材料确认后，再去核对流程和 FAQ",
    },
    guides: {
      kicker: "官方指引",
      title: "申请指南",
      lede: "这一页只保留跨项目通用、会影响提交质量的检查清单；具体日期、项目入口和材料下载分别回到时间线与材料页。",
      gridTitle: "关键申请入口",
      watchTitle: "重点项目与项目群提醒",
      commonTitle: "通用重要信息",
      programNotesTitle: "个别项目重要信息",
      checklistTitle: "申请检查清单",
      checklistText: "只保留跨项目通用、会影响实际提交质量的检查事项；具体材料、项目入口和时间节点分别回到材料页与时间线页处理。",
      stagePrepareTitle: "准备阶段",
      stagePrepareItems: [
        "确认所属机构、申请资格、e-Rad 账号、研究者番号和机构内部截止。",
        "确认是否存在重複制限、申请件数限制、职务或雇用状态限制。",
        "先用时间线确定官方截止，再倒推校内确认、导师/合作者确认和最终 PDF 检查。"
      ],
      stageDraftTitle: "撰写阶段",
      stageDraftItems: [
        "研究目的、方法、年度计划、经费明细和研究体制要互相一致。",
        "摘要、题目和关键词要能让非本领域评审快速理解问题、方法和预期贡献。",
        "图表、参考文献、预算理由和伦理/安全说明要服务于同一个研究逻辑。"
      ],
      stageSubmitTitle: "提交前",
      stageSubmitItems: [
        "逐项检查系统输入内容、上传文件、页数、格式、文件名和版本日期。",
        "最终提交前回到官方页面确认材料是否更新，避免使用过期资料。",
        "保留提交前 PDF、系统确认画面和关键邮件记录，便于后续追踪。"
      ],
      coreTitle: "通用流程入口",
      coreText: "先确认制度总入口、FAQ、电子申报系统和 e-Rad；这些决定能否顺利进入正式提交。",
      documentTitle: "重点官方文件",
      documentText: "只保留外部官方页和官方文件，避免把归档入口误认为正式依据。",
      watchChecklistTitle: "项目提醒清单",
      watchChecklistText: "把容易影响申请节奏的项目差异放在一起，例如截止时间、轮次、电子系统和英文材料状态。",
      startupWatch: "研究活動スタート支援",
      youngWatch: "若手研究",
      footerTitle: "指南核对完，就回到材料和时间线交叉确认",
      useStep1Kicker: "系统",
      useStep1Title: "先确认能不能提交",
      useStep1Text: "e-Rad、电子申报系统、资格赋予和 FAQ 是申请能否运行的前置条件。",
      useStep2Kicker: "文件",
      useStep2Title: "再看制度文件",
      useStep2Text: "指南页只放会影响理解和填写策略的官方文件，具体下载仍回材料页。",
      useStep3Kicker: "提醒",
      useStep3Title: "最后查项目差异",
      useStep3Text: "不同项目的轮次、截止和材料状态不同，需要用提醒清单做最后扫读。",
    },
    footer: {
      resources: "资源",
      homeTitle: "继续进入更细的申请页面",
      catalog: "查看项目目录",
      deadlines: "查看时间线",
      forms: "获取材料",
      guides: "查看申请指南",
      home: "返回首页",
    },
    groupLabel: {
      priority: "重点项目",
      programs: "科研费项目",
      jspsFellowships: "特别研究员相关项目",
      inboundFellowships: "外国研究者来访项目",
      core: "核心入口",
      program: "项目入口",
      documents: "重点资料",
      faq: "FAQ",
      publicCallProcedures: "公募要领与计划书等",
      programPages: "各项目页面",
    },
    kindLabel: {
      page: "页面",
      file: "文件",
      system: "系统",
      external: "外部链接",
      snapshot: "来源",
      faq: "FAQ",
      registry: "索引",
      overview: "总览",
      program: "项目页",
      guide: "指南",
    },
    unit: {
      entries: "条目录",
      milestones: "个节点",
      forms: "份材料",
      guides: "条指引",
      files: "份文件",
    },
  },
  en: {
    nav: {
      home: "Home",
      calls: "Calls",
      deadlines: "Timeline",
      forms: "Get Materials",
      guides: "Guidance",
    },
    common: {
      siteTitle: "JSPS KAKENHI Workspace",
      open: "Open",
      closed: "Closed",
      suspended: "Suspended",
      reference: "Reference",
      unknown: "Unknown",
      priority: "Priority review",
      official: "Official page",
      documents: "Documents",
      forms: "Materials",
      links: "Links",
      noResults: "No matching results",
      viewOfficial: "Open official page",
      current: "Now",
      currentTime: "Current time",
      returnToCurrentTime: "Return to current time",
      nextDeadline: "Next deadline",
      expectedOpening: "Expected opening",
      expectedDeadline: "Expected deadline",
      opening: "Opens",
      deadlineLabel: "Deadline",
      updated: "Official page updated",
      updatedShort: "Updated",
      status: "Status",
      group: "Group",
      openPrograms: "Open programs",
      trackedForms: "Tracked materials",
      officialDocs: "Key documents",
      watchpoints: "Watchpoints",
      detailHint: "Select an item on the left to inspect more detail.",
      all: "All",
      showMore: "More",
      openLink: "Open link",
      download: "Download",
      downloadAll: "Download all",
      resetFilters: "Reset filters",
      menu: "Menu",
      showMenu: "Open navigation menu",
      hideMenu: "Close navigation menu",
      displayControls: "Display controls",
      language: "Language",
      languageChoices: "Language choices",
      showLanguages: "Show language options",
      cycleLanguages: "Switch to the next language",
      theme: "Color theme",
      themeChoices: "Theme choices",
      showThemes: "Show color themes",
      cycleThemes: "Switch to the next color theme",
      pageNavigation: "Page navigation",
      openPortal: "Return to homepage portal",
    },
    portal: {
      tray: "Site sections",
      portalShort: "Portal",
      portalFull: "Navigation portal",
      academicShort: "Homepage",
      academicFull: "Personal homepage",
      radarShort: "Frontier",
      radarFull: "Academic Frontier",
      jspsShort: "JSPS",
      jspsFull: "JSPS KAKENHI",
    },
    status: {
      open: "Open",
      closed: "Closed",
      suspended: "Suspended",
      reference: "Reference",
      forecast: "Prior-cycle estimate",
      forecastParen: "(estimated)",
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
      keyline: "Priority calls · timeline · materials",
      nativeName: "Project tracking and summary",
      heroTitle: "JSPS KAKENHI",
      focusLabel: "Current priorities",
      focusRole: "Research Activity Start-up Support · Early-Career Scientists",
      focusNote: "A single workspace for open calls, upcoming deadlines, and the materials that matter most.",
      lede: "Start from the calls that deserve attention this year, then move into the timeline, materials, and official pages.",
      snapshotTitle: "Data date",
      priorityKicker: "Priority calls",
      prioritySection: "Priority programs",
      workflowKicker: "Workflow",
      workflowSection: "Workflow shortcuts",
      watchTitle: "Action reminders",
      jumpTitle: "Official quick links",
      sourceGuideTitle: "How to use this workspace",
      callsLead: "Start by identifying the calls that deserve attention from the full catalog.",
      deadlinesLead: "Confirm notice dates, system opening, and the final official deadline in one place.",
      formsLead: "Get official notices, instructions, materials, and download links by program.",
      guidesLead: "Keep FAQ, e-Rad, electronic systems, and key guidance in the same review loop.",
      sourceGuideProgramsTitle: "Start from the priority calls",
      sourceGuideProgramsText: "Begin with the currently relevant or open programs, then expand into the broader catalog only when needed.",
      sourceGuideDatesTitle: "Confirm the timeline next",
      sourceGuideDatesText: "Use the timeline to align notice dates, system opening, and the final submission deadline before preparing materials.",
      sourceGuideFormsTitle: "Then get materials",
      sourceGuideFormsText: "Once the call is fixed, move immediately into the matching official materials, entry guidance, and upload instructions.",
    },
    calls: {
      kicker: "Program Explorer",
      title: "Call Catalog",
      lede: "Browse KAKENHI priority calls, captured official JSPS call pages, JSPS fellowship schemes, and inbound-researcher programs in one place. Entries that share the same official page are cross-linked, and when the official site keeps both current and prior-year materials, those references are surfaced together.",
      filterTitle: "Browse and filter",
      timelineTitle: "Timeline",
      openDetail: "View detail",
      quickFilters: "Quick filters",
      footerTitle: "Once you identify the call, move straight to the timeline and materials",
      searchPlaceholder: "Search calls, material titles, official entries, or keywords",
      statusAll: "Call status",
      statusOpen: "Open only",
      statusClosed: "Closed / reference / suspended",
      groupAll: "Program group",
      audienceAll: "Applicant type",
      sortPriority: "Highest priority",
      sortDeadline: "Nearest deadline",
      sortTitle: "Program title",
      sortStatus: "Call status",
      targetLabel: "Audience",
      scrollPrev: "Scroll left",
      scrollNext: "Scroll right",
      formTag: "Material",
      quickAll: "All",
      quickOpen: "Open",
      quickDeadline: "Due soon",
      quickFaculty: "Faculty",
      quickFellowships: "JSPS fellows",
      quickInbound: "Inbound",
      quickOutbound: "Outbound",
      detailTitle: "Entry detail",
      officialLinks: "Official links",
      featuredDocs: "Featured documents",
      featuredForms: "Material families",
      pageHighlights: "Page highlights",
      relatedPrograms: "Related programs",
      recentCycles: "Current and prior-cycle references",
    },
    program: {
      kicker: "Program Detail",
      title: "Program detail",
      lede: "This page expands a single homepage card into the full official links, documents, materials, and prior-cycle references.",
      backToCatalog: "Back to catalog",
      notFoundTitle: "Program not found",
      notFoundText: "This link may be outdated, renamed, or not yet curated. Return to the catalog and browse again.",
    },
    deadlines: {
      kicker: "Schedule",
      title: "Timeline and Program Entries",
      lede: "Scan notices, call openings, electronic-system windows, and JSPS deadlines on the left while keeping program entries on the right by researcher stage. The matching side moves only on click, so browsing does not cause jumpy motion.",
      timelineTitle: "Key events and program entries",
      timelinePane: "Timeline",
      programPane: "Program entries",
      tableTitle: "Exact schedule table",
      colProgram: "Program",
      colType: "Milestone",
      colDate: "Date",
      colNote: "Notes",
      footerTitle: "Once the dates are clear, move into the form-preparation phase",
    },
    forms: {
      kicker: "Official Materials",
      title: "Get Materials",
      lede: "Official notices, application procedures, entry guidance, material files, and related downloads are grouped by program.",
      filterTitle: "Get materials",
      searchPlaceholder: "Search program names, material titles, S-21, S-22, or official instructions",
      programAll: "Program",
      sortStage: "By researcher stage",
      sortMaterials: "Most materials",
      sortProgram: "By program",
      proposalForms: "Research proposal and application forms",
      otherMaterials: "Other official materials",
      categoryNotice: "Notice",
      categorySchedule: "Schedule",
      categoryGuidelines: "Application procedures",
      categoryInstructions: "Instructions",
      categoryForms: "Proposal forms",
      categorySystem: "FAQ and systems",
      categoryReview: "Review materials",
      categoryOther: "Official materials",
      footerTitle: "After checking the materials, review the procedural context and FAQ",
    },
    guides: {
      kicker: "Official Guides",
      title: "Application Guidance",
      lede: "This page keeps only cross-program checks that affect submission quality. Dates, program entry points, and material downloads live on the timeline and materials pages.",
      gridTitle: "Core application entry points",
      watchTitle: "Priority calls and program-hub watchpoints",
      commonTitle: "General important information",
      programNotesTitle: "Program-specific important information",
      checklistTitle: "Application checklist",
      checklistText: "This page keeps only cross-program checks that affect submission quality. Use the materials page for files, and the timeline page for dates and program entry points.",
      stagePrepareTitle: "Preparation",
      stagePrepareItems: [
        "Confirm affiliation, eligibility, e-Rad account, researcher number, and internal institutional deadlines.",
        "Check duplicate-application restrictions, application-count limits, job-status rules, and employment-status constraints.",
        "Start from the official deadline on the timeline, then work backward to internal review, collaborator confirmation, and final PDF checks."
      ],
      stageDraftTitle: "Drafting",
      stageDraftItems: [
        "Keep the objective, method, yearly plan, budget details, and research organization mutually consistent.",
        "Make the title, abstract, and keywords understandable to reviewers adjacent to the field.",
        "Figures, references, budget justifications, and ethics or safety notes should support one coherent research logic."
      ],
      stageSubmitTitle: "Before submission",
      stageSubmitItems: [
        "Check every system entry, upload, page count, format rule, file name, and version date.",
        "Return to the official page before final submission to confirm that no material has been updated.",
        "Keep the final PDF, submission confirmation screen, and key email records for later tracking."
      ],
      coreTitle: "Core process links",
      coreText: "Check the public-call index, FAQ, electronic application system, and e-Rad first; they decide whether a formal submission can actually proceed.",
      documentTitle: "Key official documents",
      documentText: "Only external official pages and files are shown here, so archived entries are not mistaken for the live authority.",
      watchChecklistTitle: "Program reminder checklist",
      watchChecklistText: "Program differences that affect timing are grouped here: deadlines, rounds, system windows, and pending English materials.",
      startupWatch: "Research Activity Start-up Support",
      youngWatch: "Early-Career Scientists",
      footerTitle: "After checking guidance, cross-check materials and timeline again",
      useStep1Kicker: "System",
      useStep1Title: "Confirm submission readiness first",
      useStep1Text: "e-Rad, the electronic application system, eligibility assignment, and FAQ are prerequisites for a runnable application.",
      useStep2Kicker: "Documents",
      useStep2Title: "Then read the scheme documents",
      useStep2Text: "Guidance keeps documents that affect interpretation and writing strategy; detailed downloads still live on the materials page.",
      useStep3Kicker: "Reminders",
      useStep3Title: "Finally check program differences",
      useStep3Text: "Rounds, deadlines, and material status vary by program, so the reminders provide a last scan before drafting.",
    },
    footer: {
      resources: "Resources",
      homeTitle: "Continue into the more detailed preparation pages",
      catalog: "Open call catalog",
      deadlines: "Open timeline",
      forms: "Get materials",
      guides: "Open guidance",
      home: "Back home",
    },
    groupLabel: {
      priority: "Priority programs",
      programs: "KAKENHI programs",
      jspsFellowships: "JSPS fellowships",
      inboundFellowships: "Inbound fellowships",
      core: "Core entry points",
      program: "Program entry points",
      documents: "Key documents",
      faq: "FAQ",
      publicCallProcedures: "Application procedures and proposal forms",
      programPages: "Program pages",
    },
    kindLabel: {
      page: "Page",
      file: "File",
      system: "System",
      external: "External link",
      snapshot: "Source",
      faq: "FAQ",
      registry: "Index",
      overview: "Hub",
      program: "Program page",
      guide: "Guide",
    },
    unit: {
      entries: "entries",
      milestones: "milestones",
      forms: "materials",
      guides: "guides",
      files: "files",
    },
  },
};

I18N.ja = {
  nav: {
    home: "ホーム",
    calls: "ホーム",
    deadlines: "タイムライン",
    forms: "資料取得",
    guides: "申請ガイド",
  },
  common: {
    siteTitle: "JSPS 科研費ワークスペース",
    open: "公募中",
    closed: "終了",
    suspended: "募集停止",
    reference: "参考",
    unknown: "要確認",
    priority: "優先確認",
    official: "公式ページ",
    documents: "資料",
    forms: "資料",
    links: "リンク",
    noResults: "一致する結果はありません",
    viewOfficial: "公式ページを開く",
    current: "現在",
    currentTime: "現在時点",
    returnToCurrentTime: "現在時点へ戻る",
    nextDeadline: "次の締切",
    expectedOpening: "予定公募開始",
    expectedDeadline: "予定締切",
    opening: "受付開始",
    deadlineLabel: "締切",
    updated: "公式ページ更新",
    updatedShort: "更新",
    status: "状態",
    group: "区分",
    openPrograms: "公募中の種目",
    trackedForms: "追跡中の資料",
    officialDocs: "重要資料",
    watchpoints: "確認ポイント",
    detailHint: "左側の項目を選ぶと詳細を確認できます。",
    all: "すべて",
    showMore: "もっと見る",
    openLink: "リンクを開く",
    download: "ダウンロード",
    downloadAll: "すべてダウンロード",
    resetFilters: "絞り込みをリセット",
    menu: "メニュー",
    showMenu: "ナビゲーションメニューを開く",
    hideMenu: "ナビゲーションメニューを閉じる",
    displayControls: "表示コントロール",
    language: "言語",
    languageChoices: "言語の選択",
    showLanguages: "言語オプションを表示",
    cycleLanguages: "次の言語に切り替える",
    theme: "配色テーマ",
    themeChoices: "テーマの選択",
    showThemes: "配色オプションを表示",
    cycleThemes: "次の配色に切り替える",
    pageNavigation: "ページナビゲーション",
    openPortal: "ホームポータルに戻る",
  },
  portal: {
    tray: "機能ページ",
    portalShort: "ポータル",
    portalFull: "ナビゲーション",
    academicShort: "個人HP",
    academicFull: "個人ホームページ",
    radarShort: "学術前沿",
    radarFull: "学術フロンティア",
    jspsShort: "JSPS",
    jspsFull: "JSPS 科研費",
  },
  status: {
    open: "公募中",
    closed: "終了",
    suspended: "募集停止",
    reference: "参考",
    forecast: "経験的予定",
    forecastParen: "（経験的見込み）",
    unknown: "要確認",
  },
  eventType: {
    notice: "告知",
    open: "公募開始",
    system: "システム公開",
    deadline: "JSPS 締切",
    past: "過去",
    today: "今日",
    upcoming: "今後",
  },
  calls: {
    kicker: "ホーム",
    title: "ホーム",
    lede: "重点科研費種目だけでなく、特別研究員、海外特別研究員、外国人特別研究員、外国人招へい研究者などの JSPS 関連制度を同じ画面で横断整理できます。共通ページを使う種目は相互に関連づけ、現行年度と前年度の比較参照も追いやすくしています。",
    filterTitle: "検索と絞り込み",
    timelineTitle: "タイムライン",
    openDetail: "詳細を見る",
    quickFilters: "クイックフィルタ",
    footerTitle: "対象種目を決めたら、次はタイムラインと資料を確認します",
    searchPlaceholder: "種目、資料名、公式入口、キーワードで検索",
    statusAll: "募集状態",
    statusOpen: "公募中のみ",
    statusClosed: "終了 / 参考 / 募集停止",
    groupAll: "制度区分",
    audienceAll: "対象者",
    sortPriority: "優先度が高い順",
    sortDeadline: "締切が近い順",
    sortTitle: "制度名順",
    sortStatus: "募集状態順",
    targetLabel: "対象",
    scrollPrev: "左へスクロール",
    scrollNext: "右へスクロール",
    formTag: "資料",
    quickAll: "すべて",
    quickOpen: "公募中",
    quickDeadline: "締切順",
    quickFaculty: "教員向け",
    quickFellowships: "特別研究員系",
    quickInbound: "来日研究者",
    quickOutbound: "海外派遣",
    detailTitle: "項目詳細",
    officialLinks: "公式リンク",
    featuredDocs: "重要資料",
    featuredForms: "主要資料",
    pageHighlights: "ページ内の注目リンク",
    relatedPrograms: "関連種目",
    recentCycles: "現行年度と過年度の参照",
  },
  program: {
    kicker: "種目詳細",
    title: "種目詳細",
    lede: "ホームのカードから入った 1 件について、公式リンク、申請資料、過年度参照を確認するページです。",
    backToCatalog: "種目ディレクトリへ戻る",
    notFoundTitle: "該当種目が見つかりません",
    notFoundText: "このリンクは古いか、名称変更済みか、まだ整理前の可能性があります。ホームに戻って対象を選び直してください。",
  },
  deadlines: {
    kicker: "スケジュール",
    title: "タイムラインと種目入口",
    lede: "左側で告知、公募開始、電子申請システム公開、JSPS 公式締切を確認し、右側には研究段階順に種目入口を残します。対応項目への移動はクリック時だけにし、閲覧中の不要なジャンプを避けます。",
    timelineTitle: "重要イベントと種目入口",
    timelinePane: "タイムライン",
    programPane: "種目入口",
    tableTitle: "詳細スケジュール",
    colProgram: "種目",
    colType: "区分",
    colDate: "日付",
    colNote: "メモ",
    footerTitle: "日程を確認したら、次は書類準備へ進みます",
  },
  forms: {
    kicker: "公式資料",
    title: "資料取得",
    lede: "科研費種目ごとに、公式ページ上の通知、公募要領、記入要領、資料ファイル、関連ダウンロードを整理します。",
    filterTitle: "資料取得",
    searchPlaceholder: "種目名、資料名、S-21、S-22、公式説明を検索",
    programAll: "種目",
    sortStage: "研究段階順",
    sortMaterials: "資料数順",
    sortProgram: "種目順",
    proposalForms: "研究計画調書・申請書様式",
    otherMaterials: "その他の公式資料",
    categoryNotice: "通知",
    categorySchedule: "日程",
    categoryGuidelines: "公募要領",
    categoryInstructions: "記入要領",
    categoryForms: "研究計画調書",
    categorySystem: "FAQ・システム",
    categoryReview: "審査資料",
    categoryOther: "公式資料",
    footerTitle: "資料を確認したら、次は手順と FAQ を補います",
  },
  guides: {
    kicker: "公式ガイド",
    title: "申請ガイド",
    lede: "種目を越えて提出品質に関わる確認事項だけを残します。日程、種目入口、資料ダウンロードはタイムラインと資料取得ページで確認します。",
    gridTitle: "主要な申請入口",
    watchTitle: "重点種目とプログラム群の確認ポイント",
    commonTitle: "共通の重要情報",
    programNotesTitle: "種目別の重要情報",
    checklistTitle: "申請チェックリスト",
    checklistText: "このページでは、種目を越えて提出品質に関わる確認事項だけを残します。資料は資料取得ページ、日程と種目入口はタイムラインで確認します。",
    stagePrepareTitle: "準備段階",
    stagePrepareItems: [
      "所属機関、応募資格、e-Rad アカウント、研究者番号、機関内締切を確認する。",
      "重複制限、応募件数、職務・雇用状態に関する制限を確認する。",
      "タイムラインで公式締切を確認し、学内確認、共同研究者確認、最終 PDF 点検から逆算する。"
    ],
    stageDraftTitle: "作成段階",
    stageDraftItems: [
      "研究目的、方法、年度計画、経費内訳、研究体制の整合性を保つ。",
      "題目、概要、キーワードは隣接分野の審査員にも伝わる表現にする。",
      "図表、参考文献、経費理由、倫理・安全面の説明を同じ研究ロジックに接続する。"
    ],
    stageSubmitTitle: "提出前",
    stageSubmitItems: [
      "システム入力、アップロード、ページ数、様式、ファイル名、版の日付を項目ごとに確認する。",
      "最終提出前に公式ページへ戻り、資料が更新されていないか確認する。",
      "最終 PDF、提出確認画面、重要メールを保存し、後から追跡できるようにする。"
    ],
    coreTitle: "共通手続き入口",
    coreText: "公募情報、FAQ、電子申請システム、e-Rad を先に確認します。これらは正式提出が進められるかを左右します。",
    documentTitle: "重要な公式資料",
    documentText: "外部の公式ページと公式ファイルだけを表示し、アーカイブ入口を正式根拠と誤認しないようにします。",
    watchChecklistTitle: "種目別リマインダー",
    watchChecklistText: "締切、募集回、電子申請システム、英語資料の準備状況など、申請日程に影響する差分をまとめます。",
    startupWatch: "研究活動スタート支援",
    youngWatch: "若手研究",
    footerTitle: "ガイド確認後は、資料とタイムラインを再確認します",
    useStep1Kicker: "システム",
    useStep1Title: "提出可能性を先に確認",
    useStep1Text: "e-Rad、電子申請システム、応募資格付与、FAQ は申請を進める前提条件です。",
    useStep2Kicker: "資料",
    useStep2Title: "次に制度資料を見る",
    useStep2Text: "ガイドページには解釈や作成方針に関わる資料を置き、細かなダウンロードは資料取得ページに集約します。",
    useStep3Kicker: "注意点",
    useStep3Title: "最後に種目差を確認",
    useStep3Text: "募集回、締切、資料公開状況は種目ごとに異なるため、注意点で最後に横断確認します。",
  },
  footer: {
    resources: "リソース",
    homeTitle: "次の確認ページへ進む",
    catalog: "ホームを開く",
    deadlines: "タイムラインを開く",
    forms: "資料を取得",
    guides: "申請ガイドを開く",
    home: "ホームへ戻る",
  },
  groupLabel: {
    priority: "重点種目",
    programs: "科研費種目",
    jspsFellowships: "特別研究員関連",
    inboundFellowships: "外国人研究者招へい",
    core: "共通入口",
    program: "種目別入口",
    documents: "主要資料",
    faq: "FAQ",
    publicCallProcedures: "公募要領・計画調書等",
    programPages: "各種目のページ",
  },
  kindLabel: {
    page: "ページ",
    file: "ファイル",
    system: "システム",
    external: "外部リンク",
    snapshot: "記録",
    faq: "FAQ",
    registry: "索引",
    overview: "ハブ",
    program: "種目ページ",
    guide: "ガイド",
  },
  unit: {
    entries: "件の項目",
    milestones: "件の節目",
    forms: "件の資料",
    guides: "件の案内",
    files: "件のファイル",
  },
};
const LOCALE_CATALOG = window.HomepageI18n?.LOCALES || {
  en: { label: "English", name: "English", lang: "en" },
  ja: { label: "日本語", name: "日本語", lang: "ja" },
  zh: { label: "简体中文", name: "简体中文", lang: "zh-CN" },
};

const THEME_OPTIONS = [
  { value: "tohoku", label: "Tohoku", title: "Tohoku University theme", swatchClass: "theme-tohoku", themeColor: "#f5f5f7" },
  { value: "toyama", label: "Toyama", title: "University of Toyama theme", swatchClass: "theme-toyama", themeColor: "#f5f5f7" },
  { value: "usst", label: "USST", title: "USST theme", swatchClass: "theme-usst", themeColor: "#f5f5f7" },
];

const THEME_CATALOG = Object.fromEntries(THEME_OPTIONS.map((option) => [option.value, option]));

const AUDIENCE_CATALOG = {
  faculty_researchers: {
    zh: "教员・研究人员",
    ja: "教員・研究者",
    en: "Faculty & researchers",
  },
  early_career: {
    zh: "青年教员・起步期研究者",
    ja: "若手・立ち上げ期",
    en: "Early-career researchers",
  },
  masters_doctoral: {
    zh: "硕二至博士阶段",
    ja: "修士2年・博士課程",
    en: "M2 / doctoral students",
  },
  postdoctoral: {
    zh: "博士后・PD",
    ja: "ポスドク・PD",
    en: "Postdocs & PD fellows",
  },
  returnees: {
    zh: "复归研究者",
    ja: "復帰研究者",
    en: "Returnee researchers",
  },
  japan_side: {
    zh: "日本侧申请者",
    ja: "日本側応募者",
    en: "Japan-side applicants",
  },
  inbound_researchers: {
    zh: "海外研究者来日",
    ja: "海外研究者・来日",
    en: "Inbound researchers to Japan",
  },
  europe_us: {
    zh: "欧美研究者",
    ja: "欧米研究者",
    en: "Europe / North America",
  },
  outbound_japan: {
    zh: "海外派遣志向",
    ja: "海外派遣志向",
    en: "Outbound from Japan",
  },
};

const CALL_AUDIENCE_MAP = {
  startup_support: ["early_career", "faculty_researchers", "japan_side"],
  young_research: ["early_career", "faculty_researchers", "japan_side"],
  invitational_fellowships_for_research_in_japan: ["inbound_researchers"],
  foreign_jsps_fellowship_open: ["inbound_researchers", "europe_us"],
  overseas_research_fellowship: ["postdoctoral", "outbound_japan", "japan_side"],
  overseas_research_fellowship_rra: ["postdoctoral", "returnees", "outbound_japan", "japan_side"],
  jsps_fellow_pd_dc: ["masters_doctoral", "postdoctoral", "japan_side"],
  jsps_fellow_rpd: ["postdoctoral", "returnees", "japan_side"],
  independent_base_building_support: ["early_career", "faculty_researchers", "japan_side"],
  international_leading_research: ["faculty_researchers", "japan_side"],
  international_research_strengthening: ["faculty_researchers", "outbound_japan", "japan_side"],
  returning_researchers_development: ["faculty_researchers", "returnees", "japan_side"],
  overseas_partnership_research: ["faculty_researchers", "outbound_japan", "japan_side"],
  scientific_research_abc: ["faculty_researchers", "japan_side"],
  scientific_research_s: ["faculty_researchers", "japan_side"],
  incentive_research: ["faculty_researchers", "japan_side"],
  challenging_research: ["faculty_researchers", "japan_side"],
  special_promotion_research: ["faculty_researchers", "japan_side"],
  jsps_fellows_incentive: ["masters_doctoral", "postdoctoral", "japan_side"],
  jsps_fellow_cpd: ["postdoctoral", "japan_side"],
  research_results_publication: ["faculty_researchers", "japan_side"],
  "overview-34_new_scientific__index": ["faculty_researchers", "japan_side"],
  "overview-39_transformative__index": ["faculty_researchers", "japan_side"],
};

const CALL_GROUP_ORDER = ["重点项目", "Programs", "JSPS Fellowships", "Inbound Fellowships", "各種目のページ"];

const PROGRAM_CAREER_STAGE_ORDER = [
  "jsps_fellow_pd_dc",
  "jsps_fellows_incentive",
  "jsps_fellow_cpd",
  "jsps_fellow_rpd",
  "foreign_jsps_fellowship_open",
  "overseas_research_fellowship",
  "overseas_research_fellowship_rra",
  "invitational_fellowships_for_research_in_japan",
  "startup_support",
  "young_research",
  "independent_base_building_support",
  "incentive_research",
  "scientific_research_abc",
  "challenging_research",
  "international_research_strengthening",
  "returning_researchers_development",
  "overseas_partnership_research",
  "international_leading_research",
  "scientific_research_s",
  "special_promotion_research",
  "research_results_publication",
];

const PROGRAM_CAREER_STAGE_INDEX = Object.fromEntries(PROGRAM_CAREER_STAGE_ORDER.map((id, index) => [id, index]));

const state = {
  locale: getStoredLocale(),
  theme: getStoredTheme(),
  data: null,
  page: document.body?.dataset.page || "home",
  filters: getStoredFilters(),
};
document.addEventListener("DOMContentLoaded", init);

async function init() {
  state.data = await loadData();
  if (!state.data) {
    return;
  }

  if (redirectLegacyProgramHash()) {
    return;
  }

  state.locale = getStoredLocale();
  state.theme = getStoredTheme();
  applyTheme(state.theme, false);
  renderLocaleSwitcher();
  renderThemeSwitcher();
  applyLocale(state.locale, false);
  applyTheme(state.theme, false);
  applyI18n();
  bindSharedHashState();
  routePage();
  revealPage();
}

function getStoredLocale() {
  return window.HomepageI18n?.readStoredLocale?.({
    locales: LOCALE_CATALOG,
    storageKey: LOCALE_KEY,
    legacyKeys: [LEGACY_LOCALE_KEY],
    fallback: "en",
  }) || "en";
}

function getStoredTheme() {
  const sharedTheme = window.HomepagePlatform?.readStoredTheme?.({
    storageKey: THEME_KEY,
    legacyKeys: [LEGACY_THEME_KEY],
  });
  if (sharedTheme && THEME_CATALOG[sharedTheme]) {
    return sharedTheme;
  }
  const saved = readSessionValue(THEME_KEY);
  if (!saved || saved === "default" || saved === "base") {
    return "tohoku";
  }
  return THEME_CATALOG[saved] ? saved : "tohoku";
}

function getStoredFilters() {
  const fallback = {
    calls: { search: "", status: "all", group: "all", audience: "all", sort: "deadline", quick: "all", selectedId: "" },
    forms: { search: "", program: "all", sort: "stage" },
  };
  try {
    const parsed = JSON.parse(localStorage.getItem(FILTER_KEY) || "{}");
    const calls = { ...fallback.calls, ...(parsed.calls || {}) };
    const forms = { ...fallback.forms, ...(parsed.forms || {}) };
    if (!["deadline", "priority", "title", "status"].includes(calls.sort)) {
      calls.sort = "deadline";
    }
    if (parsed.version !== FILTER_SCHEMA_VERSION) {
      calls.audience = "all";
      if (calls.sort === "priority") {
        calls.sort = "deadline";
      }
    }
    if (parsed.version !== FILTER_SCHEMA_VERSION || !["stage", "materials", "program"].includes(forms.sort)) {
      forms.sort = "stage";
    }
    return {
      calls,
      forms,
    };
  } catch {
    return fallback;
  }
}

function persistFilters() {
  try {
    localStorage.setItem(FILTER_KEY, JSON.stringify({ version: FILTER_SCHEMA_VERSION, ...state.filters }));
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
    case "calls":
      renderCallsPage();
      break;
    case "program":
      renderProgramPage();
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
    default:
      break;
  }
}
function nextLocaleName(currentLocale = state.locale) {
  const sequence = LOCALE_SWITCH_SEQUENCE.filter((localeName) => LOCALE_CATALOG[localeName]);
  const pointer = sequence.indexOf(currentLocale);
  if (pointer === -1) {
    return sequence[0] || "en";
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
  const themeValue = typeof theme === "string" ? theme : theme?.value;
  if (window.HomepagePlatform?.themeTooltip) {
    return window.HomepagePlatform.themeTooltip(themeValue, state.locale);
  }
  if (state.locale === "zh") {
    return {
      tohoku: "东北大学主题色",
      toyama: "富山大学主题色",
      usst: "上海理工大学主题色",
    }[themeValue] || THEME_CATALOG[themeValue]?.title || "";
  }
  if (state.locale === "ja") {
    return {
      tohoku: "東北大学テーマ",
      toyama: "富山大学テーマ",
      usst: "上海理工大学テーマ",
    }[themeValue] || THEME_CATALOG[themeValue]?.title || "";
  }
  return THEME_CATALOG[themeValue]?.title || "";
}

function languageIconMarkup() {
  return `
    <svg class="ui-icon locale-trigger-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="8"></circle>
      <path d="M12 4a12.5 12.5 0 0 1 0 16"></path>
      <path d="M12 4a12.5 12.5 0 0 0 0 16"></path>
      <path d="M4 12h16"></path>
    </svg>
  `;
}

function portalSpriteIconMarkup(name) {
  return `<svg class="ui-icon" aria-hidden="true" focusable="false"><use href="/academic/assets/icons/ui-icons.svg#icon-${escapeHtml(name)}"></use></svg>`;
}

function portalHomeIconMarkup() {
  return portalSpriteIconMarkup("home");
}

function frontierHomeHref(locale = state.locale, theme = state.theme) {
  if (window.HomepagePlatform?.academicFrontierHref) {
    return window.HomepagePlatform.academicFrontierHref(locale, theme);
  }
  const href = locale === "en" ? "/academic-frontier/" : `/academic-frontier/${encodeURIComponent(locale)}/`;
  const url = new URL(href, window.location.origin);
  url.searchParams.set("theme", theme);
  return `${url.pathname}${url.search}`;
}

function siteStateHref(href, locale = state.locale, theme = state.theme) {
  if (window.HomepagePlatform?.siteStateHref) {
    return window.HomepagePlatform.siteStateHref(href, { locale, theme });
  }
  const url = new URL(href, window.location.origin);
  if (url.pathname.startsWith("/academic/") || url.pathname.startsWith("/jsps-kakenhi/")) {
    url.searchParams.set("lang", locale);
  }
  if (url.pathname.startsWith("/academic/") || url.pathname.startsWith("/academic-frontier/") || url.pathname.startsWith("/jsps-kakenhi/")) {
    url.searchParams.set("theme", theme);
  }
  return `${url.pathname}${url.search}`;
}

function replaceUrlStateParam(key, value) {
  try {
    const url = new URL(window.location.href);
    if (value === undefined || value === null || value === "") {
      url.searchParams.delete(key);
    } else {
      url.searchParams.set(key, value);
    }
    window.history.replaceState(window.history.state, "", `${url.pathname}${url.search}${url.hash}`);
  } catch {}
}

function renderLocaleSwitcher() {
  const container = document.querySelector(".locale-switcher");
  if (!container) {
    return;
  }
  if (window.HomepageComponents?.renderLocaleSwitcher) {
    window.HomepageComponents.renderLocaleSwitcher(container, {
      locale: state.locale,
      locales: LOCALE_CATALOG,
      sequence: LOCALE_SWITCH_SEQUENCE,
      ariaLabel: t("common.language"),
      triggerLabel: t("common.languageChoices"),
      trayLabel: t("common.languageChoices"),
      onChoice: (localeName) => {
        applyLocale(localeName);
        renderLocaleSwitcher();
        renderThemeSwitcher();
        applyTheme(state.theme, false);
      },
    });
    renderPortalReturnControl();
    syncHomepageShell();
    return;
  }
  const activeLocale = LOCALE_CATALOG[state.locale] || LOCALE_CATALOG.en;
  container.innerHTML = `
    <button
      class="locale-trigger"
      type="button"
      data-locale-trigger
      aria-haspopup="true"
      aria-expanded="false"
      aria-label="${escapeHtml(t("common.languageChoices"))}"
      title="${escapeHtml(t("common.languageChoices"))}"
    >
      ${languageIconMarkup()}
      <span class="locale-current-label" data-locale-current-label>${escapeHtml(activeLocale.label)}</span>
    </button>
    <div class="locale-tray" role="group" aria-label="${escapeHtml(t("common.languageChoices"))}">
      ${LOCALE_SWITCH_SEQUENCE
        .filter((localeName) => LOCALE_CATALOG[localeName])
        .map(
          (localeName) => {
            const locale = LOCALE_CATALOG[localeName];
            return `
            <button
              class="locale-chip${localeName === state.locale ? " is-active" : ""}"
              type="button"
              data-locale-choice="${localeName}"
              aria-pressed="${localeName === state.locale ? "true" : "false"}"
              aria-label="${escapeHtml(locale.name)}"
              title="${escapeHtml(locale.name)}"
            >
              <span class="locale-label" aria-hidden="true">${escapeHtml(locale.label)}</span>
            </button>
          `;
          },
        )
        .join("")}
    </div>
  `;
  container.querySelectorAll("[data-locale-choice]").forEach((button) => {
    button.addEventListener("click", () => {
      applyLocale(button.dataset.localeChoice);
      renderLocaleSwitcher();
      renderThemeSwitcher();
      applyTheme(state.theme, false);
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
  if (window.HomepageComponents?.renderThemeSwitcher) {
    window.HomepageComponents.renderThemeSwitcher(container, {
      locale: state.locale,
      theme: state.theme,
      themes: THEME_CATALOG,
      sequence: THEME_OPTIONS.map((option) => option.value),
      ariaLabel: t("common.theme"),
      trayLabel: t("common.themeChoices"),
      tooltip: translatedThemeTooltip,
      onChoice: (themeName) => {
        applyTheme(themeName);
        renderThemeSwitcher();
      },
    });
    syncHomepageShell();
    return;
  }
  const active = THEME_CATALOG[state.theme] || THEME_OPTIONS[0];
  container.innerHTML = `
    <button
      class="theme-trigger"
      type="button"
      data-theme-trigger
      aria-haspopup="true"
      aria-expanded="false"
      aria-label="${escapeHtml(translatedThemeTooltip(active.value))}"
      title="${escapeHtml(translatedThemeTooltip(active.value))}"
    >
      <span class="theme-swatch ${escapeHtml(active.swatchClass)}" data-theme-current-swatch aria-hidden="true"></span>
    </button>
    <div class="theme-tray" role="group" aria-label="${escapeHtml(t("common.themeChoices"))}">
      ${THEME_OPTIONS
        .map(
          (theme) =>
            `<button class="theme-chip${theme.value === state.theme ? " is-active" : ""}" type="button" data-theme-choice="${theme.value}" aria-pressed="${theme.value === state.theme ? "true" : "false"}" aria-label="${escapeHtml(translatedThemeTooltip(theme.value))}" title="${escapeHtml(translatedThemeTooltip(theme.value))}"><span class="theme-swatch ${escapeHtml(theme.swatchClass)}" aria-hidden="true"></span></button>`
        )
        .join("")}
    </div>
  `;
  container.querySelectorAll("[data-theme-choice]").forEach((button) => {
    button.addEventListener("click", () => {
      applyTheme(button.dataset.themeChoice);
      renderThemeSwitcher();
    });
  });
  syncHomepageShell();
}

function applyLocale(localeName, persist = true) {
  const nextLocale = LOCALE_CATALOG[localeName] ? localeName : "en";
  state.locale = nextLocale;
  if (window.HomepageI18n?.applyDocumentLocale) {
    window.HomepageI18n.applyDocumentLocale(nextLocale, { locales: LOCALE_CATALOG });
  } else {
    document.documentElement.lang = LOCALE_CATALOG[nextLocale].lang;
    document.body.dataset.lang = nextLocale;
  }
  if (persist && window.HomepageI18n?.writeStoredLocale) {
    window.HomepageI18n.writeStoredLocale(nextLocale, {
      locales: LOCALE_CATALOG,
      storageKey: LOCALE_KEY,
      legacyKeys: [LEGACY_LOCALE_KEY],
    });
  }
  writeSessionValue(LOCALE_KEY, nextLocale);
  if (persist) {
    replaceUrlStateParam("lang", nextLocale);
  }

  document.querySelectorAll("[data-locale-choice]").forEach((button) => {
    const active = button.dataset.localeChoice === nextLocale;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", active ? "true" : "false");
  });
  document.querySelectorAll("[data-locale-current-label]").forEach((node) => {
    node.textContent = LOCALE_CATALOG[nextLocale].label;
  });

  applyI18n();
  routePage();
  window.HomepageComponents?.refreshOpenTopnavMegaMenu?.({
    root: document,
    navSelector: ".topnav",
    locale: nextLocale,
    theme: state.theme,
  });
  window.HomepageSharedShell?.closeAllSwitchers?.();
}

function applyTheme(themeName, persist = true) {
  const nextTheme = THEME_CATALOG[themeName] ? themeName : "tohoku";
  state.theme = nextTheme;
  if (window.HomepagePlatform?.applyTheme) {
    window.HomepagePlatform.applyTheme(nextTheme, {
      persist,
      storageKey: THEME_KEY,
      legacyKeys: [LEGACY_THEME_KEY],
    });
  } else {
    document.documentElement.dataset.theme = nextTheme;
  }
  writeSessionValue(THEME_KEY, nextTheme);
  if (persist) {
    replaceUrlStateParam("theme", nextTheme);
  }

  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.setAttribute("content", THEME_CATALOG[nextTheme].themeColor);
  }

  document.querySelectorAll("[data-theme-choice]").forEach((button) => {
    const active = button.dataset.themeChoice === nextTheme;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", active ? "true" : "false");
  });
  document.querySelectorAll("[data-theme-current-swatch]").forEach((swatch) => {
    swatch.className = `theme-swatch ${THEME_CATALOG[nextTheme].swatchClass}`;
  });
  document.querySelectorAll("[data-theme-trigger]").forEach((trigger) => {
    trigger.setAttribute("aria-label", translatedThemeTooltip(nextTheme));
    trigger.setAttribute("title", translatedThemeTooltip(nextTheme));
  });

  if (persist) {
    window.HomepageSharedShell?.closeAllSwitchers?.();
  }
}

function applyI18n() {
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  document.documentElement.lang = LOCALE_CATALOG[state.locale]?.lang || "en";
  document.body.dataset.lang = state.locale;
  const controls = document.querySelector(".header-controls");
  if (controls) {
    controls.setAttribute("aria-label", t("common.displayControls"));
  }
  document.querySelectorAll(".locale-switcher").forEach((node) => node.setAttribute("aria-label", t("common.language")));
  document.querySelectorAll(".theme-switcher").forEach((node) => node.setAttribute("aria-label", t("common.theme")));
  document.querySelectorAll(".topnav").forEach((node) => node.setAttribute("aria-label", t("common.pageNavigation")));
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
  ["call-reset", "form-reset"].forEach((id) => {
    const button = document.getElementById(id);
    if (button) {
      button.setAttribute("aria-label", t("common.resetFilters"));
      button.setAttribute("title", t("common.resetFilters"));
    }
  });
  const quickFilters = document.getElementById("call-quick-filters");
  if (quickFilters) {
    quickFilters.setAttribute("aria-label", t("calls.quickFilters"));
  }
  updateDocumentTitle();
  syncHomepageShell();
}

function syncHomepageShell() {
  renderPortalReturnControl();
  if (!window.HomepageSharedShell) {
    return;
  }

  window.HomepageSharedShell.sync({
    switchers: {
      root: document,
      localeCycleLabel: t("common.cycleLanguages"),
      themeCycleLabel: t("common.cycleThemes"),
      onCycleLocale: () => applyLocale(nextLocaleName()),
      onCycleTheme: () => applyTheme(nextThemeName()),
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
      navAriaLabel: t("common.pageNavigation"),
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
}

function renderPortalReturnControl() {
  const controls = document.querySelector(".header-controls");
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

  const labels = {
    tray: t("portal.tray"),
    portal: { short: t("portal.portalShort"), full: t("portal.portalFull") },
    academic: { short: t("portal.academicShort"), full: t("portal.academicFull") },
    radar: { short: t("portal.radarShort"), full: t("portal.radarFull") },
    jsps: { short: t("portal.jspsShort"), full: t("portal.jspsFull") },
  };

  const currentPath = decodeURIComponent(window.location.pathname);
  const items = [
    {
      href: "/",
      label: labels.portal.full,
      triggerLabel: labels.portal.short,
      icon: portalHomeIconMarkup(),
      active: currentPath === "/",
    },
    {
      href: siteStateHref("/academic/"),
      label: labels.academic.full,
      triggerLabel: labels.academic.short,
      icon: '<img class="portal-chip-logo" src="/academic/assets/images/avatar-openai.jpg" alt="" loading="lazy" />',
      active: currentPath.startsWith("/academic/"),
      extraClass: "portal-chip--portrait",
    },
    {
      href: frontierHomeHref(state.locale, state.theme),
      label: labels.radar.full,
      triggerLabel: labels.radar.short,
      icon: portalSpriteIconMarkup("research"),
      active: currentPath.startsWith("/academic-frontier/"),
    },
    {
      href: siteStateHref("/jsps-kakenhi/"),
      label: labels.jsps.full,
      triggerLabel: labels.jsps.short,
      icon: '<img class="portal-chip-logo" src="/jsps-kakenhi/favicon.png" alt="" loading="lazy" />',
      active: currentPath.startsWith("/jsps-kakenhi/"),
    },
  ];
  const activeItem = items.find((item) => item.active) || items[0];

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
      ${items.map((item) => `
        <a
          class="portal-chip ${item.extraClass || ""}${item.active ? " is-active" : ""}"
          href="${item.href}"
          aria-label="${escapeHtml(item.label)}"
          title="${escapeHtml(item.label)}"
          ${item.active ? 'aria-current="page"' : ""}
        >
          ${item.icon}
        </a>
      `).join("")}
    </div>
  `;
}
function updateDocumentTitle() {
  const titleNavKey = state.page === "calls" ? "home" : state.page;
  const pageTitle = t(`nav.${titleNavKey}`);
  document.title = `${pageTitle} | ${t("common.siteTitle")}`;
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
      if (redirectLegacyProgramHash()) {
        return;
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
function renderCallsPage() {
  const searchInput = document.getElementById("call-search");
  const statusFilter = document.getElementById("call-status-filter");
  const groupFilter = document.getElementById("call-group-filter");
  const audienceFilter = document.getElementById("call-audience-filter");
  const sortFilter = document.getElementById("call-sort-filter");
  const resetButton = document.getElementById("call-reset");
  const quickFilters = document.getElementById("call-quick-filters");
  const homeTimeline = document.getElementById("home-timeline");
  const callList = document.getElementById("call-list");
  const metrics = document.getElementById("calls-detail-metrics");

  if (!searchInput || !statusFilter || !groupFilter || !audienceFilter || !sortFilter || !resetButton || !quickFilters || !callList) {
    return;
  }

  const allEntries = state.data.call_catalog.slice();
  const groups = Array.from(new Set(allEntries.map((entry) => groupKey(entry.group)))).sort(compareCallGroups);
  const audiences = Object.keys(AUDIENCE_CATALOG).filter((key) => allEntries.some((entry) => getCallAudienceKeys(entry).includes(key)));

  searchInput.value = state.filters.calls.search;
  statusFilter.innerHTML = [
    optionHtml("all", t("calls.statusAll"), state.filters.calls.status),
    optionHtml("open", t("calls.statusOpen"), state.filters.calls.status),
    optionHtml("closed", t("calls.statusClosed"), state.filters.calls.status),
  ].join("");
  groupFilter.innerHTML = [optionHtml("all", t("calls.groupAll"), state.filters.calls.group)]
    .concat(groups.map((group) => optionHtml(group, displayGroupLabel(group), state.filters.calls.group)))
    .join("");
  audienceFilter.innerHTML = [optionHtml("all", t("calls.audienceAll"), state.filters.calls.audience)]
    .concat(audiences.map((key) => optionHtml(key, displayAudienceLabel(key), state.filters.calls.audience)))
    .join("");
  sortFilter.innerHTML = [
    optionHtml("deadline", t("calls.sortDeadline"), state.filters.calls.sort),
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
    audienceFilter.addEventListener("change", (event) => {
      state.filters.calls.audience = event.target.value;
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
        audience: "all",
        sort: "deadline",
        quick: "all",
        selectedId: state.filters.calls.selectedId,
      };
      persistFilters();
      renderCallsPage();
    });
    searchInput.dataset.bound = "true";
  }

  const quickButtons = [
    { id: "all", label: t("calls.quickAll"), apply: () => ({ search: "", status: "all", group: "all", audience: "all" }) },
    { id: "open", label: t("calls.quickOpen"), apply: () => ({ status: "open" }) },
    { id: "deadline", label: t("calls.quickDeadline"), apply: () => ({ status: "open", sort: "deadline" }) },
    { id: "faculty", label: t("calls.quickFaculty"), apply: () => ({ audience: "faculty_researchers" }) },
    { id: "fellows", label: t("calls.quickFellowships"), apply: () => ({ group: "JSPS Fellowships" }) },
    { id: "inbound", label: t("calls.quickInbound"), apply: () => ({ group: "Inbound Fellowships" }) },
    { id: "outbound", label: t("calls.quickOutbound"), apply: () => ({ audience: "outbound_japan" }) },
  ];
  quickFilters.innerHTML = quickButtons
    .map(
      (button) => `<button class="tag ${button.id === state.filters.calls.quick ? "is-active" : ""}" type="button" data-quick="${button.id}">${escapeHtml(button.label)}</button>`
    )
    .join("");
  quickFilters.querySelectorAll("[data-quick]").forEach((button) => {
    button.addEventListener("click", () => {
      const choice = quickButtons.find((item) => item.id === button.dataset.quick);
      state.filters.calls = {
        ...state.filters.calls,
        search: "",
        status: "all",
        group: "all",
        audience: "all",
        ...choice.apply(),
        quick: choice.id,
      };
      persistFilters();
      renderCallsPage();
    });
  });

  let filtered = allEntries.filter((entry) => {
    const query = state.filters.calls.search.toLowerCase();
    const matchesSearch =
      !query ||
      [
        entry.title,
        entry.subtitle,
        entry.group,
        localizedSearchText(entry, ["title", "subtitle", "group"]),
        entry.search_blob,
        callAudienceSearchText(entry),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(query);
    const matchesStatus =
      state.filters.calls.status === "all" ||
      (state.filters.calls.status === "closed"
        ? entry.status === "closed" || entry.status === "reference" || entry.status === "suspended"
        : entry.status === state.filters.calls.status);
    const matchesGroup = state.filters.calls.group === "all" || groupKey(entry.group) === state.filters.calls.group;
    const matchesAudience =
      state.filters.calls.audience === "all" || getCallAudienceKeys(entry).includes(state.filters.calls.audience);
    return matchesSearch && matchesStatus && matchesGroup && matchesAudience;
  });

  filtered = sortCallEntries(filtered, state.filters.calls.sort);

  if (metrics) {
    metrics.innerHTML = [
      metaPill(`${t("common.links")} ${allEntries.length}`),
      metaPill(`${t("common.openPrograms")} ${state.data.programs.filter((program) => program.status === "open").length}`),
      metaPill(`${t("common.priority")} ${state.data.programs.filter((program) => program.priority).length}`),
    ].join("");
  }

  callList.innerHTML = filtered.length
    ? renderCallRailSections(filtered)
    : `<div class="empty">${t("common.noResults")}</div>`;

  bindCallRailControls(callList);
  renderHomeTimeline(homeTimeline, filtered);
  bindHomeTimeline(homeTimeline, callList);
}

function renderHomeTimeline(root, entries) {
  if (!root) {
    return;
  }
  const visibleProgramIds = new Set(entries.map((entry) => entry.id));
  const events = state.data.timeline.filter((event) => visibleProgramIds.has(event.program_id));
  root.innerHTML = events.length
    ? renderTimelineWithCurrentMarker(
        events,
        (event, index) => `
            <button class="${timelineItemClass(event)} portal-home-timeline-item" type="button" data-home-timeline-index="${index}" data-home-timeline-target="${escapeHtml(event.program_id)}" aria-label="${escapeHtml(localeField(event, "program_title"))} · ${escapeHtml(localeField(event, "title"))}">
              <time datetime="${event.datetime || event.date}">
                <span>${formatTimelineMonth(event.date)}</span>
                <strong>${formatTimelineCompactDate(event.date)}</strong>
              </time>
              <span class="timeline-card">
                <strong class="timeline-title-text">${escapeHtml(localeField(event, "program_title"))}</strong>
                <span class="timeline-summary">
                  <span class="timeline-event-type">${escapeHtml(timelineEventLabel(event))}</span>
                </span>
              </span>
            </button>
          `,
        "portal-home-timeline-current-marker"
      )
    : `<div class="empty">${escapeHtml(t("common.noResults"))}</div>`;
  positionHomeTimelineAtCurrent(root, events);
  bindCurrentTimelineJump(root);
}

function tokyoTodayIsoDate() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const byType = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${byType.year}-${byType.month}-${byType.day}`;
}

function positionHomeTimelineAtCurrent(root, events) {
  const pane = root.closest(".portal-home-timeline-pane");
  if (!pane || !events.length) {
    return;
  }
  const today = tokyoTodayIsoDate();
  const upcomingIndex = events.findIndex((event) => String(event.date || "").slice(0, 10) >= today);
  const index = upcomingIndex >= 0 ? upcomingIndex : events.length - 1;
  const item = root.querySelector("[data-current-timeline-marker]") || root.querySelector(`[data-home-timeline-index="${index}"]`);
  if (!item) {
    return;
  }
  window.requestAnimationFrame(() => {
    scrollTimelineElementIntoPane(item, "auto");
  });
}

function scrollTimelineElementIntoPane(element, behavior = "smooth") {
  const pane = element?.closest(".portal-home-timeline-pane, .portal-linked-timeline-pane");
  if (!pane || !element) {
    return;
  }
  const paneRect = pane.getBoundingClientRect();
  const elementRect = element.getBoundingClientRect();
  const head = pane.querySelector(".portal-timeline-pane-head");
  const offset = head && getComputedStyle(head).position === "sticky" ? head.offsetHeight + 8 : 8;
  const targetTop = Math.max(pane.scrollTop + elementRect.top - paneRect.top - offset, 0);
  pane.scrollTo({ top: targetTop, behavior });
}

function scrollTimelineRootToCurrent(root, behavior = "smooth") {
  const marker = root?.querySelector("[data-current-timeline-marker]");
  if (!marker) {
    return;
  }
  scrollTimelineElementIntoPane(marker, behavior);
}

function bindCurrentTimelineJump(root) {
  if (!root?.id) {
    return;
  }
  const button = Array.from(document.querySelectorAll("[data-current-timeline-jump]")).find((node) => node.dataset.currentTimelineJump === root.id);
  if (!button) {
    return;
  }
  button.onclick = () => scrollTimelineRootToCurrent(root, "smooth");
}

function timelineEventDateKey(event) {
  return String(event?.date || event?.datetime || "").slice(0, 10);
}

function currentTimelineMarkerIndex(events) {
  const today = tokyoTodayIsoDate();
  const index = events.findIndex((event) => timelineEventDateKey(event) >= today);
  return index >= 0 ? index : events.length;
}

function renderTimelineCurrentMarker(extraClass = "") {
  const today = tokyoTodayIsoDate();
  const dateLabel = formatTimelineCompactDate(today);
  const label = t("common.currentTime");
  return `
    <div class="portal-timeline-current-marker ${escapeHtml(extraClass)}" role="note" aria-label="${escapeHtml(`${label} ${dateLabel}`)}" data-current-timeline-marker>
      <span class="portal-timeline-current-date">
        <span>${escapeHtml(t("common.current"))}</span>
        <strong>${escapeHtml(dateLabel)}</strong>
      </span>
      <span class="portal-timeline-current-rule">
        <span>${escapeHtml(label)}</span>
      </span>
    </div>
  `;
}

function renderTimelineWithCurrentMarker(events, renderEvent, markerClass = "") {
  const markerIndex = currentTimelineMarkerIndex(events);
  const chunks = [];
  events.forEach((event, index) => {
    if (index === markerIndex) {
      chunks.push(renderTimelineCurrentMarker(markerClass));
    }
    chunks.push(renderEvent(event, index));
  });
  if (markerIndex === events.length) {
    chunks.push(renderTimelineCurrentMarker(markerClass));
  }
  return chunks.join("");
}

function bindHomeTimeline(root, cardRoot) {
  if (!root || !cardRoot) {
    return;
  }
  root.querySelectorAll("[data-home-timeline-target]").forEach((item) => {
    item.addEventListener("click", () => {
      const programId = item.dataset.homeTimelineTarget;
      const card = Array.from(cardRoot.querySelectorAll("[data-call-card]")).find((node) => node.dataset.callCard === programId);
      if (!card) {
        return;
      }
      const track = card.closest("[data-rail-track]");
      const section = card.closest(".portal-rail-section") || card;
      section.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
      if (track) {
        const trackRect = track.getBoundingClientRect();
        const cardRect = card.getBoundingClientRect();
        const cardLeft = cardRect.left - trackRect.left + track.scrollLeft;
        track.scrollTo({ left: Math.max(cardLeft - 18, 0), behavior: "smooth" });
      }
      card.classList.add("is-sync-highlight");
      window.setTimeout(() => card.classList.remove("is-sync-highlight"), 1200);
    });
  });
}

function renderCallRailSections(entries) {
  const grouped = entries.reduce((map, entry) => {
    const key = groupKey(entry.group) || "Programs";
    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key).push(entry);
    return map;
  }, new Map());

  return Array.from(grouped.entries())
    .sort(([leftGroup], [rightGroup]) => compareCallGroups(leftGroup, rightGroup))
    .map(([group, items], index) => {
      const railId = `call-rail-${index}`;
      const title = displayGroupLabel(group);
      const isStaticRail = items.length <= 2;
      return `
        <section class="portal-rail-section">
          <div class="portal-rail-head">
            <div class="portal-rail-copy">
              <p class="eyebrow">${escapeHtml(callRailSummary(items.length))}</p>
              <h3>${escapeHtml(title)}</h3>
            </div>
            ${
              isStaticRail
                ? ""
                : `
            <div class="portal-rail-controls" aria-label="${escapeHtml(title)}">
              <button class="portal-rail-button" type="button" data-rail-control="prev" data-rail-target="${railId}" aria-label="${escapeHtml(t("calls.scrollPrev"))}" title="${escapeHtml(t("calls.scrollPrev"))}">
                <svg class="ui-icon rail-arrow rail-arrow-prev" aria-hidden="true"><use href="./assets/icons/ui-icons.svg#icon-up"></use></svg>
              </button>
              <button class="portal-rail-button" type="button" data-rail-control="next" data-rail-target="${railId}" aria-label="${escapeHtml(t("calls.scrollNext"))}" title="${escapeHtml(t("calls.scrollNext"))}">
                <svg class="ui-icon rail-arrow rail-arrow-next" aria-hidden="true"><use href="./assets/icons/ui-icons.svg#icon-up"></use></svg>
              </button>
            </div>
            `
            }
          </div>
          <div class="portal-rail-track${isStaticRail ? " is-static" : ""}" id="${railId}" data-rail-track>
            ${items.map((entry) => renderCallRailCard(entry)).join("")}
          </div>
        </section>
      `;
    })
    .join("");
}

function renderCallRailCard(entry) {
  const href = officialProgramHref(entry.id);
  return `
    <a class="portal-call-card" id="call-card-${escapeHtml(entry.id)}" data-call-card="${escapeHtml(entry.id)}" href="${href}"${linkTargetAttrs(href)}>
      <span class="portal-card-head">
        <span>
          <span class="eyebrow portal-call-card-statusline portal-call-card-statusline-${escapeHtml(timingStatusTone(entry))}">${compactTimingMarkup(entry)}</span>
          <strong>${escapeHtml(localeField(entry, "title"))}</strong>
        </span>
      </span>
      <span class="portal-call-summary">${escapeHtml(callCardDescription(entry))}</span>
      <span class="portal-select-meta">
        ${callCardMeta(entry)}
      </span>
      <span class="portal-card-cta">${t("common.viewOfficial")}</span>
    </a>
  `;
}

function callHashTag(text) {
  return `<span class="portal-hash-tag">${escapeHtml(text)}</span>`;
}

function primaryFormCode(entry) {
  return (entry?.form_focus || entry?.form_codes || []).find(Boolean) || "";
}

function displayFormCodeLabel(code) {
  const normalized = String(code || "").trim().toUpperCase();
  if (!normalized) {
    return "";
  }
  const specificLabel = {
    "S-21": {
      zh: "若手研究计划书",
      ja: "若手研究計画調書",
      en: "Early-Career proposal",
    },
    "S-22": {
      zh: "启动支援计划书",
      ja: "スタート支援計画調書",
      en: "Start-up proposal",
    },
  }[normalized];
  if (specificLabel) {
    const label = specificLabel[state.locale] || specificLabel.ja || specificLabel.en;
    return `${label} ${normalized}`;
  }
  const proposalLabel = {
    zh: "计划书",
    ja: "計画調書",
    en: "Proposal",
  };
  const genericLabel = {
    zh: "表格",
    ja: "様式",
    en: "Form",
  };
  const label = ["S-21", "S-22"].includes(normalized)
    ? proposalLabel[state.locale] || proposalLabel.ja
    : genericLabel[state.locale] || genericLabel.ja;
  return `${label} ${normalized}`;
}

function callCardDescription(entry) {
  return localeValue(entry, "card_summary") || localeValue(entry, "eligibility") || localeValue(entry, "summary") || "";
}

function callCardMeta(entry) {
  const tags = [];
  const preferredAudienceKeys = getCallAudienceKeys(entry)
    .filter((key) => key !== "japan_side")
    .slice(0, 1);
  const primaryAudience = preferredAudienceKeys[0];
  const formCode = primaryFormCode(entry);

  if (entry.priority) {
    tags.push(callHashTag(t("common.priority")));
  } else if (primaryAudience) {
    tags.push(callHashTag(displayAudienceLabel(primaryAudience)));
  }

  if (formCode) {
    tags.push(callHashTag(displayFormCodeLabel(formCode)));
  } else if (entry.priority && primaryAudience) {
    tags.push(callHashTag(displayAudienceLabel(primaryAudience)));
  }

  if (!tags.length) {
    const fallbackAudience = getCallAudienceKeys(entry)[0];
    tags.push(callHashTag(fallbackAudience ? displayAudienceLabel(fallbackAudience) : displayGroupLabel(entry.group)));
  }
  return tags.slice(0, 2).join("");
}

function callRailSummary(count) {
  const parts = [countText(count, "entries"), callSortLabel(state.filters.calls.sort)];
  if (state.filters.calls.audience !== "all") {
    parts.push(`${t("calls.targetLabel")} ${displayAudienceLabel(state.filters.calls.audience)}`);
  }
  return parts.join(" · ");
}

function bindCallRailControls(root) {
  root.querySelectorAll("[data-rail-track]").forEach((track) => {
    const railId = track.id;
    const prevButton = root.querySelector(`[data-rail-control="prev"][data-rail-target="${railId}"]`);
    const nextButton = root.querySelector(`[data-rail-control="next"][data-rail-target="${railId}"]`);
    if (!prevButton || !nextButton) {
      return;
    }

    const syncButtons = () => {
      const maxScroll = Math.max(track.scrollWidth - track.clientWidth, 0);
      prevButton.disabled = track.scrollLeft <= 8;
      nextButton.disabled = track.scrollLeft >= maxScroll - 8;
    };

    const scrollAmount = () => {
      const firstCard = track.querySelector(".portal-call-card");
      const cardWidth = firstCard ? firstCard.getBoundingClientRect().width : 0;
      return Math.max(track.clientWidth * 0.84, cardWidth + 18);
    };

    prevButton.addEventListener("click", () => {
      track.scrollBy({ left: -scrollAmount(), behavior: "smooth" });
    });
    nextButton.addEventListener("click", () => {
      track.scrollBy({ left: scrollAmount(), behavior: "smooth" });
    });
    track.addEventListener("scroll", syncButtons, { passive: true });
    requestAnimationFrame(syncButtons);
  });
}

function renderCallDetail(entry) {
  if (entry.type === "overview") {
    const relatedPrograms = entry.related_programs || [];
    const highlights = entry.page_highlights || [];
    const watchpoints = localeList(entry, "watchpoints");
    return `
      <div class="portal-card-head">
        <div>
          <p class="eyebrow">${escapeHtml(displayGroupLabel(entry.group))}</p>
          <h3>${escapeHtml(localeField(entry, "title"))}</h3>
        </div>
        ${timingPillCluster(entry)}
      </div>
      <p>${escapeHtml(localeValue(entry, "summary"))}</p>
      <div class="meta-strip">
        ${metaPill(displayGroupLabel(entry.group))}
        ${entry.page_last_updated ? metaPill(`${t("common.updated")} ${entry.page_last_updated}`) : ""}
        ${entry.resource_count ? metaPill(`${t("common.links")} ${entry.resource_count}`) : ""}
      </div>
      <div class="portal-detail-block">
        <h4>${t("calls.officialLinks")}</h4>
        <div class="link-row-inline">
          ${(entry.key_links || [])
            .filter((link) => link.kind !== "snapshot")
            .map((link) => `<a href="${resolveHref(link.href)}" ${link.href.startsWith("http") ? 'target="_blank" rel="noreferrer"' : ""}>${escapeHtml(localeField(link, "label"))}</a>`)
            .join("")}
        </div>
      </div>
      ${
        relatedPrograms.length
          ? `
      <div class="portal-detail-block">
        <h4>${t("calls.relatedPrograms")}</h4>
        <ul class="portal-list">
          ${relatedPrograms
            .map(
              (program) =>
                `<li><a href="${program.official_url}" target="_blank" rel="noreferrer">${escapeHtml(localeField(program, "title"))}</a></li>`
            )
            .join("")}
        </ul>
      </div>`
          : ""
      }
      ${
        highlights.length
          ? `
      <div class="portal-detail-block">
        <h4>${t("calls.pageHighlights")}</h4>
        <ul class="portal-list">
          ${highlights
            .map(
              (resource) =>
                `<li><a href="${resource.url}" target="_blank" rel="noreferrer">${escapeHtml(resource.title)}</a>${resource.section ? `<span class="portal-inline-muted"> · ${escapeHtml(resource.section)}</span>` : ""}</li>`
            )
            .join("")}
        </ul>
      </div>`
          : ""
      }
      ${
        watchpoints.length
          ? `
      <div class="portal-detail-block">
        <h4>${t("common.watchpoints")}</h4>
        <ul class="portal-list">
          ${watchpoints.map((note) => `<li>${escapeHtml(note)}</li>`).join("")}
        </ul>
      </div>`
          : ""
      }
    `;
  }

  if (entry.type !== "detailed") {
    return `
      <div class="portal-card-head">
        <div>
          <p class="eyebrow">${escapeHtml(displayGroupLabel(entry.group))}</p>
          <h3>${escapeHtml(localeField(entry, "title"))}</h3>
        </div>
        ${timingPillCluster(entry)}
      </div>
      <p>${escapeHtml(localeValue(entry, "summary"))}</p>
      <div class="meta-strip">
        ${metaPill(displayGroupLabel(entry.group))}
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
  const relatedPrograms = program.related_programs || [];
  const featuredDocuments = program.featured_documents || [];
  const featuredForms = program.forms || [];
  const recentCycles = program.recent_cycles || [];
  const watchpoints = localeList(program, "watchpoints");
  return `
    <div class="portal-card-head">
      <div>
        <p class="eyebrow">${escapeHtml(localeField(program, "family_title"))}</p>
        <h3>${escapeHtml(localeField(program, "title"))}</h3>
      </div>
      ${timingPillCluster(program)}
    </div>
    <p>${escapeHtml(localeValue(program, "summary"))}</p>
    <p class="portal-subtle">${escapeHtml(localeValue(program, "eligibility"))}</p>
    <div class="meta-strip">
      ${metaPill(`${t("common.updated")} ${program.page_last_updated || "--"}`)}
      ${deadlineDisplay(program) ? metaPill(`${timingDeadlineLabel(program)} ${deadlineDisplay(program)}`) : ""}
      ${callOpenDisplay(program) ? metaPill(`${timingOpenLabel(program)} ${callOpenDisplay(program)}`) : ""}
    </div>
      <div class="portal-detail-block">
        <h4>${t("calls.officialLinks")}</h4>
        <div class="link-row-inline">
        ${program.key_links
          .filter((link) => link.kind !== "snapshot")
          .map((link) => `<a href="${resolveHref(link.href)}" ${link.href.startsWith("http") ? 'target="_blank" rel="noreferrer"' : ""}>${escapeHtml(localeField(link, "label"))}</a>`)
          .join("")}
      </div>
    </div>
    ${
      relatedPrograms.length
        ? `
    <div class="portal-detail-block">
      <h4>${t("calls.relatedPrograms")}</h4>
      <ul class="portal-list">
        ${relatedPrograms
          .map(
            (related) =>
              `<li><a href="${officialProgramHref(related.id)}"${linkTargetAttrs(officialProgramHref(related.id))}>${escapeHtml(localeField(related, "title"))}</a><span class="portal-inline-muted"> · ${escapeHtml(t(`status.${related.status}`))}</span></li>`
          )
          .join("")}
      </ul>
    </div>`
        : ""
    }
    ${
      featuredDocuments.length
        ? `
    <div class="portal-detail-block">
      <h4>${t("calls.featuredDocs")}</h4>
      <ul class="portal-list">
        ${featuredDocuments
          .slice(0, 6)
          .map((document) => `<li><a href="${document.url}" target="_blank" rel="noreferrer">${escapeHtml(document.title)}</a></li>`)
          .join("")}
      </ul>
    </div>`
        : ""
    }
    ${
      featuredForms.length
        ? `
    <div class="portal-detail-block">
      <h4>${t("calls.featuredForms")}</h4>
      <ul class="portal-list">
        ${featuredForms
          .slice(0, 4)
          .map((form) => `<li>${escapeHtml(form.form_number)} · ${escapeHtml((form.family_names || [localeField(program, "title")])[0])}</li>`)
          .join("")}
      </ul>
    </div>`
        : ""
    }
    ${
      recentCycles.length
        ? `
    <div class="portal-detail-block">
      <h4>${t("calls.recentCycles")}</h4>
      <div class="portal-history-groups">
        ${recentCycles
          .map(
            (cycle) => `
              <section class="portal-history-group">
                <h5>${escapeHtml(localeField(cycle, "title"))}</h5>
                ${
                  localeList(cycle, "notes").length
                    ? `<ul class="portal-list">${localeList(cycle, "notes").map((note) => `<li>${escapeHtml(note)}</li>`).join("")}</ul>`
                    : ""
                }
                ${
                  (cycle.links || []).length
                    ? `<ul class="portal-list portal-history-links">${cycle.links
                        .map((link) => `<li><a href="${link.url}" target="_blank" rel="noreferrer">${escapeHtml(link.title)}</a></li>`)
                        .join("")}</ul>`
                    : ""
                }
              </section>
            `
          )
          .join("")}
      </div>
    </div>`
        : ""
    }
    ${
      watchpoints.length
        ? `
    <div class="portal-detail-block">
      <h4>${t("common.watchpoints")}</h4>
      <ul class="portal-list">
        ${watchpoints.map((note) => `<li>${escapeHtml(note)}</li>`).join("")}
      </ul>
    </div>`
        : ""
    }
  `;
}
function timelineItemClass(event) {
  return [
    "timeline-item",
    `timeline-item-type-${event.type || "unknown"}`,
    `timeline-item-status-${event.status || "unknown"}`,
    String(event.id || "").includes("forecast") ? "timeline-item-forecast" : "",
  ]
    .filter(Boolean)
    .join(" ");
}

function splitMaterialUrls(rawUrl) {
  return String(rawUrl || "")
    .split(",")
    .map((url) => url.trim())
    .filter(Boolean);
}

function materialSectionRank(section = "") {
  const text = String(section).toLowerCase();
  if (/通知|notice|告知/.test(text)) {
    return 10;
  }
  if (/期間|schedule|スケジュール|日程|締切|期限|受付/.test(text)) {
    return 20;
  }
  if (/公募要領|募集要項|application procedures|応募要項/.test(text)) {
    return 30;
  }
  if (/別冊|記入要領|作成要領|supplement|manual|応募書類/.test(text)) {
    return 40;
  }
  if (/研究計画調書|計画調書|申請書|様式|application forms|proposal document|添付ファイル/.test(text)) {
    return 50;
  }
  if (/faq|フロー|flow|電子|e-rad|提出|システム|説明会/.test(text)) {
    return 60;
  }
  if (/審査|区分|セット|変更点|poster|ポスター/.test(text)) {
    return 70;
  }
  return 90;
}

function materialSectionCategory(section = "") {
  const key = materialSectionCategoryKey(section);
  return t(`forms.category${key.charAt(0).toUpperCase()}${key.slice(1)}`) || t("forms.categoryOther");
}

function materialSectionCategoryKey(section = "") {
  const text = String(section).toLowerCase();
  if (/通知|notice|告知/.test(text)) {
    return "notice";
  }
  if (/期間|schedule|スケジュール|日程|締切|期限|受付/.test(text)) {
    return "schedule";
  }
  if (/公募要領|募集要項|application procedures|応募要項/.test(text)) {
    return "guidelines";
  }
  if (/別冊|記入要領|作成要領|supplement|manual|応募書類/.test(text)) {
    return "instructions";
  }
  if (/研究計画調書|計画調書|申請書|様式|application forms|proposal document|添付ファイル/.test(text)) {
    return "forms";
  }
  if (/faq|フロー|flow|電子|e-rad|提出|システム|説明会/.test(text)) {
    return "system";
  }
  if (/審査|区分|セット|変更点|poster|ポスター/.test(text)) {
    return "review";
  }
  return "other";
}

function cleanMaterialTitle(title, fallback = "") {
  return String(title || fallback || t("forms.otherMaterials")).replace(/\s+/g, " ").trim();
}

function formMaterialSection(form, link) {
  const sections = Array.isArray(form.page_sections) ? form.page_sections.filter(Boolean) : [];
  const title = String(link?.title || "");
  if (/イメージ|image/i.test(title) && sections[0]) {
    return sections[0];
  }
  if (sections.length) {
    return sections[sections.length - 1];
  }
  return t("forms.proposalForms");
}

function addMaterialGroup(groups, indexByKey, rawTitle, item, rankSeed = 90) {
  const title = cleanMaterialTitle(rawTitle, t("forms.otherMaterials"));
  const key = title.toLowerCase();
  if (!indexByKey.has(key)) {
    indexByKey.set(key, groups.length);
    groups.push({
      title,
      rank: Math.min(materialSectionRank(title), rankSeed),
      items: [],
    });
  }
  groups[indexByKey.get(key)].items.push(item);
}

function programMaterialGroups(program) {
  const seen = new Set();
  const groups = [];
  const indexByKey = new Map();
  const add = (title, urls, section = "", extra = {}) => {
    splitMaterialUrls(urls).forEach((url, index, list) => {
      const key = url;
      if (!url || seen.has(key)) {
        return;
      }
      seen.add(key);
      const suffix = list.length > 1 ? ` ${index + 1}` : "";
      addMaterialGroup(groups, indexByKey, section || extra.section || t("forms.otherMaterials"), {
        title: cleanMaterialTitle(title, section || extra.section || t("common.documents")) + suffix,
        url,
        formNumber: extra.formNumber || "",
        source: extra.source || "document",
      });
    });
  };
  (program.documents || []).forEach((document) => add(document.title, document.url, document.section || t("forms.otherMaterials")));
  (program.forms || []).forEach((form) => {
    (form.links || []).forEach((link) => add(link.title || form.form_number, link.url, formMaterialSection(form, link), { formNumber: form.form_number, source: "form" }));
  });
  return groups
    .map((group, index) => ({ ...group, index }))
    .filter((group) => group.items.length)
    .sort((left, right) => left.rank - right.rank || left.index - right.index || left.title.localeCompare(right.title));
}

function programMaterialItems(program) {
  return programMaterialGroups(program).flatMap((group) => group.items.map((item) => ({ ...item, section: group.title })));
}

function materialLinksMarkup(item) {
  return `<a href="${resolveHref(item.url)}"${linkTargetAttrs(item.url)} data-material-download-link>${escapeHtml(t("common.download"))}</a>`;
}

function renderMaterialGroups(groups) {
  return groups
    .map(
      (group) => {
        const categoryKey = materialSectionCategoryKey(group.title);
        return `
        <section class="portal-material-section portal-material-section-${escapeHtml(categoryKey)}">
          <div class="portal-material-section-head">
            <div>
              <span class="portal-material-section-category">${escapeHtml(materialSectionCategory(group.title))}</span>
              <h4>${escapeHtml(group.title)}</h4>
            </div>
            <div class="portal-material-section-actions">
              <span>${escapeHtml(countText(group.items.length, "files"))}</span>
              <button class="portal-material-download-all" type="button">${escapeHtml(t("common.downloadAll"))}</button>
            </div>
          </div>
          <ul class="portal-material-link-list">
            ${group.items
              .map(
                (item) => `
                  <li class="portal-material-link-item">
                    <span class="portal-material-link-title">
                      ${item.formNumber ? `<small>${escapeHtml(item.formNumber)}</small>` : ""}
                      ${escapeHtml(item.title)}
                    </span>
                    ${materialLinksMarkup(item)}
                  </li>
                `
              )
              .join("")}
          </ul>
        </section>
      `;
      }
    )
    .join("");
}

function bindMaterialDownloadButtons(root) {
  root.querySelectorAll(".portal-material-download-all").forEach((button) => {
    button.addEventListener("click", () => {
      const links = Array.from(button.closest(".portal-material-section")?.querySelectorAll("[data-material-download-link]") || []);
      links.forEach((link) => {
        window.open(link.href, "_blank", "noopener");
      });
    });
  });
}

function timelineEventLabel(event) {
  const isForecast = String(event.id || "").includes("forecast");
  const baseLabel = isForecast ? eventTypeLabel(event.type) : localeField(event, "title") || eventTypeLabel(event.type);
  return isForecast ? `${baseLabel}${t("status.forecastParen")}` : baseLabel;
}

function guideLinkMarkup(guide) {
  return `<a href="${resolveHref(guide.href)}"${linkTargetAttrs(guide.href)}>${escapeHtml(localeField(guide, "title"))}</a>`;
}

function renderUtilityStrip(items) {
  return items
    .map(
      (item) => `
        <article class="portal-utility-card">
          <p class="eyebrow">${escapeHtml(item.kicker || "")}</p>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.text)}</p>
          ${item.meta ? `<span class="meta-pill">${escapeHtml(item.meta)}</span>` : ""}
        </article>
      `
    )
    .join("");
}

function renderProgramPage() {
  const detail = document.getElementById("program-detail");
  const actions = document.getElementById("program-page-actions");
  if (!detail || !actions) {
    return;
  }

  const entry = findCallEntryById(currentProgramId());
  const program = entry ? state.data.programs.find((item) => item.id === entry.id) : null;

  actions.innerHTML = [
    `<a class="button button-secondary" href="./index.html">${escapeHtml(t("program.backToCatalog"))}</a>`,
    program ? `<a class="button button-secondary" href="./forms.html#${encodeURIComponent(program.id)}">${escapeHtml(t("footer.forms"))}</a>` : "",
    `<a class="button button-secondary" href="./deadlines.html">${escapeHtml(t("footer.deadlines"))}</a>`,
    entry?.official_url ? `<a class="button button-primary" href="${escapeHtml(entry.official_url)}" target="_blank" rel="noreferrer">${escapeHtml(t("common.viewOfficial"))}</a>` : "",
  ]
    .filter(Boolean)
    .join("");

  if (!entry) {
    detail.innerHTML = `
      <div class="empty">
        <strong>${escapeHtml(t("program.notFoundTitle"))}</strong>
        <p>${escapeHtml(t("program.notFoundText"))}</p>
      </div>
    `;
    updateProgramPageMetadata();
    return;
  }

  detail.innerHTML = renderCallDetail(entry);
  updateProgramPageMetadata(entry, program);
}

function renderDeadlinesPage() {
  const timelineEl = document.getElementById("deadline-timeline");
  const programEl = document.getElementById("deadline-programs");
  const metrics = document.getElementById("deadlines-detail-metrics");
  if (!timelineEl || !programEl) {
    return;
  }
  const events = state.data.timeline;
  const programs = sortProgramsByCareerStage(state.data.programs.slice());
  const nextDeadline = events.find((event) => event.type === "deadline" && (event.status === "today" || event.status === "upcoming"));
  if (metrics) {
    metrics.innerHTML = [
      metaPill(`${t("common.links")} ${programs.length}`),
      metaPill(countText(events.length, "milestones")),
      metaPill(nextDeadline ? `${t("common.nextDeadline")} ${localeField(nextDeadline, "program_title")}` : `${t("common.nextDeadline")} --`),
      metaPill(`${t("common.status")} ${state.data.site.snapshot_date}`),
    ].join("");
  }

  timelineEl.innerHTML = renderTimelineWithCurrentMarker(
    events,
    (event) => {
      const href = officialProgramHref(event.program_id);
      return `
        <a class="${timelineItemClass(event)} portal-linked-timeline-item" href="${href}"${linkTargetAttrs(href)} data-sync-program="${escapeHtml(event.program_id)}" data-timeline-card="${escapeHtml(event.program_id)}" aria-label="${escapeHtml(localeField(event, "program_title"))} · ${escapeHtml(localeField(event, "title"))}">
          <time datetime="${event.datetime || event.date}">
            <span>${formatTimelineMonth(event.date)}</span>
            <strong>${formatTimelineDay(event.date)}</strong>
          </time>
          <article class="timeline-card">
            <h4 class="timeline-title-text">${escapeHtml(localeField(event, "program_title"))}</h4>
            <p class="timeline-summary">
              <span class="timeline-event-type">${escapeHtml(timelineEventLabel(event))}</span>
            </p>
          </article>
        </a>
      `;
    },
    "portal-linked-timeline-current-marker"
  );
  positionLinkedTimelineAtCurrent(timelineEl);
  bindCurrentTimelineJump(timelineEl);

  programEl.innerHTML = programs
    .map((program) => {
      const href = officialProgramHref(program.id);
      return `
        <a class="portal-call-card portal-linked-program-card" href="${href}"${linkTargetAttrs(href)} data-sync-program="${escapeHtml(program.id)}" data-timeline-program-card="${escapeHtml(program.id)}">
          <span class="portal-card-head">
            <span>
              <span class="eyebrow portal-call-card-statusline portal-call-card-statusline-${escapeHtml(timingStatusTone(program))}">${compactTimingMarkup(program)}</span>
              <strong>${escapeHtml(localeField(program, "title"))}</strong>
            </span>
          </span>
          <span class="portal-call-summary">${escapeHtml(callCardDescription(program))}</span>
          <span class="portal-select-meta">${callCardMeta(program)}</span>
          <span class="portal-card-cta">${escapeHtml(t("common.viewOfficial"))}</span>
        </a>
      `;
    })
    .join("");
  bindTimelineSync(document.getElementById("deadline-workbench") || document);
}

function positionLinkedTimelineAtCurrent(root) {
  const pane = root?.closest(".portal-linked-timeline-pane");
  const marker = root?.querySelector("[data-current-timeline-marker]");
  if (!pane || !marker) {
    return;
  }
  window.requestAnimationFrame(() => {
    scrollTimelineElementIntoPane(marker, "auto");
  });
}

function bindTimelineSync(root) {
  root.querySelectorAll("[data-sync-program]").forEach((node) => {
    if (node.dataset.timelineSyncBound === "true") {
      return;
    }
    node.dataset.timelineSyncBound = "true";
    const syncMatchingProgram = () => {
      const programId = node.dataset.syncProgram;
      const targetSelector = node.dataset.syncTarget || (node.closest("#deadline-timeline") ? `[data-timeline-program-card="${CSS.escape(programId)}"]` : `[data-timeline-card="${CSS.escape(programId)}"]`);
      const target = root.querySelector(targetSelector);
      if (!target) {
        return;
      }
      target.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
      target.classList.add("is-sync-highlight");
      window.setTimeout(() => target.classList.remove("is-sync-highlight"), 1100);
    };
    node.addEventListener("click", syncMatchingProgram);
  });
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

  const programs = state.data.programs.slice();

  searchInput.value = state.filters.forms.search;
  programFilter.innerHTML = [optionHtml("all", t("forms.programAll"), state.filters.forms.program)]
    .concat(programs.map((program) => optionHtml(program.id, localeField(program, "title"), state.filters.forms.program)))
    .join("");
  sortFilter.innerHTML = [
    optionHtml("stage", t("forms.sortStage"), state.filters.forms.sort),
    optionHtml("materials", t("forms.sortMaterials"), state.filters.forms.sort),
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
      state.filters.forms = { search: "", program: "all", sort: "stage" };
      persistFilters();
      renderFormsPage();
    });
    searchInput.dataset.bound = "true";
  }

  if (metrics) {
    metrics.innerHTML = [
      metaPill(`${t("common.documents")} ${programs.reduce((sum, program) => sum + programMaterialItems(program).length, 0)}`),
      metaPill(`${t("common.openPrograms")} ${programs.filter((program) => program.status === "open").length}`),
      metaPill(`${t("common.status")} ${state.data.site.snapshot_date}`),
    ].join("");
  }

  const query = state.filters.forms.search.toLowerCase();
  let filtered = programs.filter((program) => {
    const materials = programMaterialItems(program);
    const matchesProgram = state.filters.forms.program === "all" || program.id === state.filters.forms.program;
    const haystack = [
      program.id,
      localeField(program, "title"),
      localizedSearchText(program, ["title", "family_title", "summary"]),
      ...(program.form_codes || []),
      ...materials.map((item) => `${item.title} ${item.section} ${item.url}`),
    ]
      .join(" ")
      .toLowerCase();
    const matchesSearch = !query || haystack.includes(query);
    return matchesProgram && matchesSearch;
  });

  filtered = filtered.sort((left, right) => {
    if (state.filters.forms.sort === "stage") {
      return compareByCareerStage(left, right);
    }
    if (state.filters.forms.sort === "program") {
      return localeField(left, "title").localeCompare(localeField(right, "title"), state.locale === "ja" ? "ja" : state.locale === "zh" ? "zh" : "en");
    }
    return programMaterialItems(right).length - programMaterialItems(left).length || localeField(left, "title").localeCompare(localeField(right, "title"), state.locale === "ja" ? "ja" : state.locale === "zh" ? "zh" : "en");
  });

  grid.innerHTML = filtered.length
    ? filtered
        .map(
          (program) => {
            const materialGroups = programMaterialGroups(program);
            const materials = materialGroups.flatMap((group) => group.items);
            return `
            <article class="document-card portal-form-card portal-material-card" id="${escapeHtml(program.id)}">
              <div class="portal-card-head">
                <div>
                  <p class="eyebrow">${escapeHtml(localeField(program, "family_title") || displayGroupLabel(program.group))}</p>
                  <h3>${escapeHtml(localeField(program, "title"))}</h3>
                </div>
                <div class="portal-material-card-aside">
                  ${metaPill(`${materials.length}`)}
                  <a class="portal-material-official-link" href="${officialProgramHref(program.id)}"${linkTargetAttrs(officialProgramHref(program.id))}>${escapeHtml(t("common.viewOfficial"))}</a>
                </div>
              </div>
              <div class="portal-material-list">
                ${renderMaterialGroups(materialGroups)}
              </div>
            </article>
          `;
          }
        )
        .join("")
    : `<div class="empty">${t("common.noResults")}</div>`;
  bindMaterialDownloadButtons(grid);
}

function rawI18nValue(key) {
  const sources = [I18N[state.locale], I18N.en, I18N.zh].filter(Boolean);
  for (const source of sources) {
    const value = key.split(".").reduce((current, segment) => (current && current[segment] !== undefined ? current[segment] : undefined), source);
    if (value !== undefined && value !== null) {
      return value;
    }
  }
  return null;
}

function guideChecklistItems(key) {
  const items = rawI18nValue(key);
  return Array.isArray(items) ? items : [];
}

function renderGuidesPage() {
  const guideGrid = document.getElementById("guide-grid");
  const summary = document.getElementById("guide-summary");
  const metrics = document.getElementById("guides-detail-metrics");
  if (!guideGrid) {
    return;
  }

  const checklistGroups = [
    { title: t("guides.stagePrepareTitle"), items: guideChecklistItems("guides.stagePrepareItems") },
    { title: t("guides.stageDraftTitle"), items: guideChecklistItems("guides.stageDraftItems") },
    { title: t("guides.stageSubmitTitle"), items: guideChecklistItems("guides.stageSubmitItems") },
  ];
  const checklistCount = checklistGroups.reduce((sum, group) => sum + group.items.length, 0);

  if (metrics) {
    metrics.innerHTML = [
      metaPill(`${t("guides.checklistTitle")} ${checklistCount}`),
      metaPill(`${t("common.status")} ${state.data.site.snapshot_date}`),
    ].join("");
  }
  if (summary) {
    summary.hidden = true;
    summary.innerHTML = "";
  }

  guideGrid.classList.add("portal-guide-workbench-simple");
  guideGrid.innerHTML = `
    <article class="portal-guide-panel portal-guide-check-panel">
      <div class="portal-guide-panel-head">
        <p class="eyebrow">${escapeHtml(t("guides.commonTitle"))}</p>
        <h3>${escapeHtml(t("guides.checklistTitle"))}</h3>
        <p>${escapeHtml(t("guides.checklistText"))}</p>
      </div>
      <div class="portal-guide-check-grid">
        ${checklistGroups
          .map(
            (group) => `
              <section class="portal-guide-check-card">
                <h4>${escapeHtml(group.title)}</h4>
                <ul>
                  ${group.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
                </ul>
              </section>
            `
          )
          .join("")}
      </div>
    </article>
  `;
}
function localeValue(record, base) {
  return localeValueFor(record, base, state.locale);
}

function isLocaleRecord(value) {
  return (
    value &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    ["canonical", "en", "zh", "ja"].some((key) => Object.prototype.hasOwnProperty.call(value, key))
  );
}

function localizeLocaleRecord(value, localeName = state.locale, emptyValue = "") {
  if (!isLocaleRecord(value)) {
    return emptyValue;
  }
  if (window.HomepageI18n?.localizeValue) {
    return window.HomepageI18n.localizeValue(value, { locale: localeName, locales: LOCALE_CATALOG, emptyValue });
  }
  const candidates =
    localeName === "ja"
      ? [value.ja, value.canonical, value.zh, value.en]
      : localeName === "zh"
        ? [value.zh, value.canonical, value.ja, value.en]
        : [value.en, value.ja, value.canonical, value.zh];
  return candidates.find((candidate) => candidate !== undefined && candidate !== null && candidate !== "") ?? emptyValue;
}

function localeValueFor(record, base, localeName = state.locale) {
  if (!record) {
    return "";
  }
  if (isLocaleRecord(record[base])) {
    return localizeLocaleRecord(record[base], localeName, "");
  }
  const candidates =
    localeName === "ja"
      ? [record[`${base}_ja`], record[base], record[`${base}_zh`], record[`${base}_en`]]
      : localeName === "zh"
        ? [record[`${base}_zh`], record[base], record[`${base}_ja`], record[`${base}_en`]]
        : [record[`${base}_en`], record[`${base}_ja`], record[base], record[`${base}_zh`]];
  for (const candidate of candidates) {
    if (candidate) {
      return candidate;
    }
  }
  return "";
}

function localeField(record, field) {
  if (!record) {
    return "";
  }
  return localeValue(record, field);
}

function localeList(record, base) {
  if (!record) {
    return [];
  }
  if (isLocaleRecord(record[base])) {
    const localized = localizeLocaleRecord(record[base], state.locale, []);
    return Array.isArray(localized) ? localized : localized ? [localized] : [];
  }
  const candidates =
    state.locale === "ja"
      ? [record[`${base}_ja`], record[base], record[`${base}_zh`], record[`${base}_en`]]
      : state.locale === "zh"
        ? [record[`${base}_zh`], record[base], record[`${base}_ja`], record[`${base}_en`]]
        : [record[`${base}_en`], record[`${base}_ja`], record[base], record[`${base}_zh`]];
  for (const candidate of candidates) {
    if (Array.isArray(candidate)) {
      return candidate;
    }
  }
  return [];
}

function localizedSearchText(record, bases = []) {
  const values = [];
  bases.forEach((base) => {
    const direct = record?.[base];
    if (isLocaleRecord(direct)) {
      ["en", "zh", "ja"].forEach((localeName) => {
        values.push(localizeLocaleRecord(direct, localeName, ""));
      });
      values.push(direct.canonical);
      return;
    }
    values.push(direct, record?.[`${base}_en`], record?.[`${base}_zh`], record?.[`${base}_ja`]);
  });
  return values.flat().filter(Boolean).join(" ");
}

function displayGroupLabel(group) {
  const canonicalGroup = groupKey(group);
  const key = {
    "重点项目": "priority",
    Programs: "programs",
    "JSPS Fellowships": "jspsFellowships",
    "Inbound Fellowships": "inboundFellowships",
    Core: "core",
    Program: "program",
    Documents: "documents",
    FAQ: "faq",
    "公募要領・計画調書等": "publicCallProcedures",
    "各種目のページ": "programPages",
  }[canonicalGroup];
  if (key) {
    return t(`groupLabel.${key}`);
  }
  if (isLocaleRecord(group)) {
    return localizeLocaleRecord(group, state.locale, "");
  }
  return canonicalGroup;
}

function groupKey(group) {
  if (isLocaleRecord(group)) {
    return group.canonical || group.en || group.zh || group.ja || "";
  }
  return String(group || "");
}

function displayAudienceLabel(key) {
  const audience = AUDIENCE_CATALOG[key];
  if (!audience) {
    return key;
  }
  return audience[state.locale] || audience.ja || audience.en || key;
}

function getCallAudienceKeys(entry) {
  return CALL_AUDIENCE_MAP[entry?.id] || [];
}

function callAudienceSearchText(entry) {
  return getCallAudienceKeys(entry)
    .map((key) => Object.values(AUDIENCE_CATALOG[key] || {}).join(" "))
    .join(" ");
}

function displayKindLabel(kind) {
  const label = t(`kindLabel.${kind}`);
  return label === `kindLabel.${kind}` ? kind : label;
}

function countText(value, unitKey) {
  return `${value} ${t(`unit.${unitKey}`)}`;
}
function t(key) {
  if (window.HomepageI18n?.text) {
    return window.HomepageI18n.text(I18N, key, { locale: state.locale, fallbacks: ["en", "zh"] });
  }
  const sources = [I18N[state.locale], I18N.en, I18N.zh].filter(Boolean);
  for (const source of sources) {
    const value = key.split(".").reduce((current, segment) => (current && current[segment] !== undefined ? current[segment] : null), source);
    if (value !== null && value !== undefined) {
      return value;
    }
  }
  return key;
}

function statusWeight(status) {
  return { open: 0, closed: 1, suspended: 2, reference: 3, unknown: 4 }[status] ?? 5;
}

function statusPill(status, label = "") {
  const text = label || t(`status.${status}`);
  return `<span class="meta-pill portal-status-pill portal-status-${status}">${escapeHtml(text)}</span>`;
}

function activeForecastCycle(record) {
  const cycle = record?.forecast_cycle;
  if (!cycle || record?.status === "open") {
    return null;
  }
  if (cycle.call_open_date || localeValue(cycle, "call_open_label") || cycle.submission_deadline || cycle.deadline_at) {
    return cycle;
  }
  return null;
}

function timingStatusTone(record) {
  return activeForecastCycle(record) ? "forecast" : record?.status || "unknown";
}

function timingStatusLabel(record) {
  return activeForecastCycle(record) ? t("status.forecastParen") : t(`status.${record?.status || "unknown"}`);
}

function timingOpenLabel(record) {
  return activeForecastCycle(record) ? t("common.expectedOpening") : t("common.opening");
}

function timingDeadlineLabel(record) {
  return activeForecastCycle(record) ? t("common.expectedDeadline") : t("common.deadlineLabel");
}

function currentProgramId() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id") || window.location.hash.replace(/^#/, "");
}

function findCallEntryById(id) {
  if (!id || !state.data?.call_catalog) {
    return null;
  }
  return state.data.call_catalog.find((entry) => entry.id === id) || null;
}

function programHref(id) {
  return `./program.html?id=${encodeURIComponent(id)}`;
}

function officialProgramHref(id) {
  const entry = findCallEntryById(id);
  if (entry?.official_url) {
    return entry.official_url;
  }
  const program = state.data?.programs?.find((item) => item.id === id);
  return program?.official_url || programHref(id);
}

function linkTargetAttrs(href = "") {
  return /^https?:\/\//i.test(String(href)) ? ' target="_blank" rel="noreferrer"' : "";
}

function redirectLegacyProgramHash() {
  if (state.page !== "calls") {
    return false;
  }
  const id = window.location.hash.replace(/^#/, "");
  if (!findCallEntryById(id)) {
    return false;
  }
  window.location.replace(programHref(id));
  return true;
}

function dateSortNumber(value, fallback = Number.POSITIVE_INFINITY) {
  if (!value) {
    return fallback;
  }
  return new Date(`${value}T00:00:00+09:00`).getTime();
}

function deadlineDate(record) {
  if (!record) {
    return "";
  }
  const source = activeForecastCycle(record) || record;
  if (source.submission_deadline) {
    return source.submission_deadline;
  }
  if (source.deadline_at) {
    return String(source.deadline_at).slice(0, 10);
  }
  return "";
}

function deadlineDisplay(record) {
  const value = deadlineDate(record);
  return value ? formatDate(value) : "";
}

function compareTitle(left, right) {
  return localeField(left, "title").localeCompare(
    localeField(right, "title"),
    state.locale === "ja" ? "ja" : state.locale === "zh" ? "zh" : "en",
  );
}

function compareByDeadline(left, right) {
  const leftOpen = left.status === "open";
  const rightOpen = right.status === "open";
  if (leftOpen !== rightOpen) {
    return leftOpen ? -1 : 1;
  }

  const leftDeadlineDate = deadlineDate(left);
  const rightDeadlineDate = deadlineDate(right);
  const leftHasDeadline = Boolean(leftDeadlineDate);
  const rightHasDeadline = Boolean(rightDeadlineDate);
  if (leftHasDeadline !== rightHasDeadline) {
    return leftHasDeadline ? -1 : 1;
  }

  if (leftHasDeadline && rightHasDeadline) {
    const leftDeadline = dateSortNumber(leftDeadlineDate);
    const rightDeadline = dateSortNumber(rightDeadlineDate);
    const diff = leftOpen ? leftDeadline - rightDeadline : rightDeadline - leftDeadline;
    if (diff) {
      return diff;
    }
  }

  return Number(right.priority) - Number(left.priority) || statusWeight(left.status) - statusWeight(right.status) || compareTitle(left, right);
}

function compareByPriority(left, right) {
  return Number(right.priority) - Number(left.priority) || compareByDeadline(left, right) || compareTitle(left, right);
}

function compareByStatus(left, right) {
  return statusWeight(left.status) - statusWeight(right.status) || compareByDeadline(left, right) || compareTitle(left, right);
}

function compareCallGroups(leftGroup, rightGroup) {
  const leftKey = groupKey(leftGroup);
  const rightKey = groupKey(rightGroup);
  const leftIndex = CALL_GROUP_ORDER.indexOf(leftKey);
  const rightIndex = CALL_GROUP_ORDER.indexOf(rightKey);
  if (leftIndex !== -1 || rightIndex !== -1) {
    return (leftIndex === -1 ? CALL_GROUP_ORDER.length : leftIndex) - (rightIndex === -1 ? CALL_GROUP_ORDER.length : rightIndex);
  }
  return displayGroupLabel(leftKey).localeCompare(displayGroupLabel(rightKey), state.locale === "ja" ? "ja" : state.locale === "zh" ? "zh" : "en");
}

function sortCallEntries(entries, sortMode = "deadline") {
  return entries.sort((left, right) => {
    if (sortMode === "title") {
      return compareTitle(left, right);
    }
    if (sortMode === "status") {
      return compareByStatus(left, right);
    }
    if (sortMode === "priority") {
      return compareByPriority(left, right);
    }
    return compareByDeadline(left, right);
  });
}

function sortProgramsByDeadline(programs) {
  return programs.sort((left, right) => compareByDeadline(left, right));
}

function programCareerStageIndex(program) {
  return PROGRAM_CAREER_STAGE_INDEX[program?.id] ?? PROGRAM_CAREER_STAGE_ORDER.length + statusWeight(program?.status || "unknown");
}

function compareByCareerStage(left, right) {
  return (
    programCareerStageIndex(left) - programCareerStageIndex(right) ||
    statusWeight(left.status) - statusWeight(right.status) ||
    compareByDeadline(left, right) ||
    compareTitle(left, right)
  );
}

function sortProgramsByCareerStage(programs) {
  return programs.sort((left, right) => compareByCareerStage(left, right));
}

function timingInfoPill(label, value, tone = "default") {
  return `<span class="meta-pill portal-date-pill portal-date-pill-${tone}">${escapeHtml(label)} ${escapeHtml(value)}</span>`;
}

function callSortLabel(sortMode) {
  const key = {
    deadline: "sortDeadline",
    priority: "sortPriority",
    title: "sortTitle",
    status: "sortStatus",
  }[sortMode] || "sortDeadline";
  return t(`calls.${key}`);
}

function callOpenDisplay(record) {
  const source = activeForecastCycle(record) || record;
  if (!source) {
    return "";
  }
  if (source.call_open_date) {
    return formatDate(source.call_open_date);
  }
  return localeValue(source, "call_open_label");
}

function callOpenCompactDisplay(record) {
  const source = activeForecastCycle(record) || record;
  if (!source) {
    return "";
  }
  if (source.call_open_date) {
    return formatShortDate(source.call_open_date);
  }
  return formatApproximateOpenLabel(source);
}

function deadlineCompactDisplay(record) {
  const value = deadlineDate(record);
  return value ? formatShortDate(value) : "";
}

function compactTimingText(record) {
  if (!record) {
    return "";
  }
  const parts = [timingStatusLabel(record)];
  const opening = callOpenCompactDisplay(record);
  const deadline = deadlineCompactDisplay(record);
  if (opening && deadline) {
    parts.push(`${opening}-${deadline}`);
    return parts.join(" · ");
  }
  if (deadline) {
    parts.push(`-${deadline}`);
    return parts.join(" · ");
  }
  if (opening) {
    parts.push(opening);
    return parts.join(" · ");
  } else if (record.page_last_updated) {
    parts.push(`${t("common.updatedShort")} ${formatShortDate(String(record.page_last_updated).slice(0, 10))}`);
  }
  return parts.join(" · ");
}

function compactTimingMarkup(record) {
  if (!record) {
    return "";
  }
  const status = timingStatusLabel(record);
  const opening = callOpenCompactDisplay(record);
  const deadline = deadlineCompactDisplay(record);
  const timing = opening && deadline ? `${opening}-${deadline}` : deadline ? `-${deadline}` : opening || "";
  const parts = [`<span class="portal-call-card-status">${escapeHtml(status)}</span>`];
  if (timing) {
    parts.push(`<span class="portal-call-card-separator" aria-hidden="true">·</span>`);
    parts.push(`<span class="portal-call-card-timing">${escapeHtml(timing)}</span>`);
  } else if (record.page_last_updated) {
    parts.push(`<span class="portal-call-card-separator" aria-hidden="true">·</span>`);
    parts.push(`<span class="portal-call-card-timing">${escapeHtml(`${t("common.updatedShort")} ${formatShortDate(String(record.page_last_updated).slice(0, 10))}`)}</span>`);
  }
  return parts.join(" ");
}

function timingPillCluster(record) {
  if (!record) {
    return "";
  }
  const items = [statusPill(timingStatusTone(record), timingStatusLabel(record))];
  const deadline = deadlineDisplay(record);
  if (deadline) {
    items.push(timingInfoPill(timingDeadlineLabel(record), deadline, "deadline"));
  }
  const openDisplay = callOpenDisplay(record);
  if (openDisplay) {
    items.push(timingInfoPill(timingOpenLabel(record), openDisplay, "opening"));
  }
  return `<span class="portal-head-meta">${items.join("")}</span>`;
}
function setMetaContent(selector, value) {
  if (!value) {
    return;
  }
  const node = document.querySelector(selector);
  if (node) {
    node.setAttribute("content", value);
  }
}

function updateProgramPageMetadata(entry = null) {
  if (state.page !== "program") {
    return;
  }

  const title = entry
    ? `${localeField(entry, "title")} | JSPS KAKENHI Workspace`
    : `${t("program.title")} | JSPS KAKENHI Workspace`;
  const description = entry ? localeValue(entry, "summary") : t("program.notFoundText");
  const canonicalHref = entry
    ? `https://sichentao.github.io/jsps-kakenhi/program.html?id=${encodeURIComponent(entry.id)}`
    : "https://sichentao.github.io/jsps-kakenhi/program.html";

  document.title = title;
  setMetaContent('meta[name="description"]', description);
  setMetaContent('meta[property="og:title"]', title);
  setMetaContent('meta[property="og:description"]', description);
  setMetaContent('meta[property="og:url"]', canonicalHref);

  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) {
    canonical.setAttribute("href", canonicalHref);
  }
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
  return localeList(program, "watchpoints").map((note) => ({ title: localeField(program, "title"), text: note }));
}

function eventTypeLabel(type) {
  return t(`eventType.${type}`);
}

function formatDate(isoDate) {
  if (!isoDate) {
    return "--";
  }
  const date = new Date(`${isoDate}T00:00:00+09:00`);
  return new Intl.DateTimeFormat(
    state.locale === "zh" ? "zh-CN" : state.locale === "ja" ? "ja-JP" : "en-US",
    {
    year: "numeric",
    month: "short",
    day: "numeric",
    },
  ).format(date);
}

function formatShortDate(value) {
  if (!value) {
    return "--";
  }
  const raw = String(value).slice(0, 10);
  const date = new Date(`${raw}T00:00:00+09:00`);
  if (Number.isNaN(date.getTime())) {
    return raw;
  }
  return `${String(date.getFullYear()).slice(-2)}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
}

function formatApproximateOpenLabel(record) {
  const raw = localeValueFor(record, "call_open_label", "ja") || localeValue(record, "call_open_label");
  if (!raw) {
    return "";
  }

  const jaMatch = String(raw).match(/^(\d{4})年(\d{1,2})月(上旬|中旬|下旬)$/);
  if (jaMatch) {
    const [, year, month, phase] = jaMatch;
    const prefix = `${String(year).slice(-2)}.${String(month).padStart(2, "0")}`;
    const phaseMap =
      state.locale === "en"
        ? { "上旬": "early", "中旬": "mid", "下旬": "late" }
        : { "上旬": "上旬", "中旬": "中旬", "下旬": "下旬" };
    return `${prefix}${state.locale === "en" ? " " : ""}${phaseMap[phase] || phase}`;
  }

  return String(raw);
}

function formatDateTime(value) {
  if (!value) {
    return "--";
  }
  const date = value.includes("T") ? new Date(value) : new Date(`${value}T00:00:00+09:00`);
  const opts = value.includes("T")
    ? { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }
    : { year: "numeric", month: "short", day: "numeric" };
  return new Intl.DateTimeFormat(state.locale === "zh" ? "zh-CN" : state.locale === "ja" ? "ja-JP" : "en-US", opts).format(date);
}

function formatTimelineMonth(value) {
  const date = new Date(`${value}T00:00:00+09:00`);
  if (state.locale === "ja" || state.locale === "zh") {
    return `${date.getMonth() + 1}月`;
  }
  return new Intl.DateTimeFormat("en-US", { month: "short" }).format(date).toUpperCase();
}

function formatTimelineDay(value) {
  const date = new Date(`${value}T00:00:00+09:00`);
  return new Intl.DateTimeFormat(state.locale === "zh" ? "zh-CN" : state.locale === "ja" ? "ja-JP" : "en-US", { day: "2-digit" }).format(date);
}

function formatTimelineCompactDate(value) {
  const date = new Date(`${value}T00:00:00+09:00`);
  if (Number.isNaN(date.getTime())) {
    return String(value || "");
  }
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join(".");
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
