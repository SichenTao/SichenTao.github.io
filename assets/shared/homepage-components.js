(function initHomepageComponents(global) {
  if (global.HomepageComponents) {
    return;
  }

  const DEFAULT_ICON_SPRITE = "/academic/assets/icons/ui-icons.svg";

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function classNames(...values) {
    const seen = new Set();
    const classes = [];
    values
      .flat()
      .join(" ")
      .split(/\s+/)
      .filter(Boolean)
      .forEach((name) => {
        if (!seen.has(name)) {
          seen.add(name);
          classes.push(name);
        }
      });
    return classes.join(" ");
  }

  function toNodes(target) {
    if (!target) {
      return [];
    }
    if (typeof target === "string") {
      return Array.from(document.querySelectorAll(target));
    }
    if (target instanceof Element || target === document) {
      return [target];
    }
    return Array.from(target).filter(Boolean);
  }

  function localeName(locale, locales) {
    const normalized = global.HomepageI18n?.normalizeLocale?.(locale, locales) || locale || "en";
    return locales?.[normalized] ? normalized : Object.keys(locales || {})[0] || "en";
  }

  function themeName(theme, themes) {
    const normalized = global.HomepagePlatform?.normalizeTheme?.(theme) || theme || "tohoku";
    return themes?.[normalized] ? normalized : Object.keys(themes || {})[0] || "tohoku";
  }

  function themeLabel(theme, locale) {
    if (global.HomepagePlatform?.themeLabel) {
      return global.HomepagePlatform.themeLabel(theme, locale);
    }
    const labels = {
      tohoku: "Tohoku University",
      toyama: "University of Toyama",
      usst: "University of Shanghai for Science and Technology",
    };
    return labels[theme] || theme;
  }

  function themeTooltip(theme, locale = "en") {
    if (global.HomepagePlatform?.themeTooltip) {
      return global.HomepagePlatform.themeTooltip(theme, locale);
    }
    const suffix = {
      en: " theme",
      zh: "主题色",
      ja: "テーマ色",
    }[locale] || " theme";
    return `${themeLabel(theme, locale)}${suffix}`;
  }

  const PROFILE_LINK_HREFS = {
    tohokuCenter: "https://www.cc.tohoku.ac.jp/english/member/rd/",
    hpcLab: "https://www.hpc.is.tohoku.ac.jp/home-en/member-en/",
    takizawaAnnouncement: "https://www.hpc.is.tohoku.ac.jp/event-en/2025/5231/",
    googleScholar: "https://scholar.google.com/citations?user=gmOx-i4AAAAJ&hl=en",
    researchMap: "https://researchmap.jp/sichentao?lang=en",
    researchGate: "https://www.researchgate.net/profile/Sichen-Tao",
    github: "https://github.com/SichenTao",
    dblp: "https://dblp.org/pid/283/6924.html",
    orcid: "https://orcid.org/0000-0001-9858-4208",
    jglobal: "https://jglobal.jst.go.jp/en/detail?JGLOBAL_ID=202601018035308144",
    toyamaDissertation: "https://toyama.repo.nii.ac.jp/records/2001776",
  };

  const PROFILE_LINK_LOCALE_HREFS = {
    tohokuCenter: {
      en: "https://www.cc.tohoku.ac.jp/english/member/rd/",
      zh: "https://www.cc.tohoku.ac.jp/english/member/rd/",
      ja: "https://www.cc.tohoku.ac.jp/member/rd/",
    },
    hpcLab: {
      en: "https://www.hpc.is.tohoku.ac.jp/home-en/member-en/",
      zh: "https://www.hpc.is.tohoku.ac.jp/home-en/member-en/",
      ja: "https://www.hpc.is.tohoku.ac.jp/home/member/",
    },
    takizawaAnnouncement: {
      en: "https://www.hpc.is.tohoku.ac.jp/event-en/2025/5231/",
      zh: "https://www.hpc.is.tohoku.ac.jp/event-en/2025/5231/",
      ja: "https://www.hpc.is.tohoku.ac.jp/event/2025/5226/",
    },
  };

  function profileLinkHref(key, locale = "en") {
    const localeHrefs = PROFILE_LINK_LOCALE_HREFS[key];
    if (!localeHrefs) {
      return PROFILE_LINK_HREFS[key] || "#";
    }
    return localeHrefs[locale] || localeHrefs.en || PROFILE_LINK_HREFS[key] || "#";
  }

  function iconSprite(name, className = "ui-icon", spriteHref = DEFAULT_ICON_SPRITE) {
    return `<svg class="${escapeHtml(className)}" aria-hidden="true" focusable="false"><use href="${escapeHtml(spriteHref)}#icon-${escapeHtml(name)}"></use></svg>`;
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

  function portalIconMarkup(icon, options = {}) {
    if (icon === "home") {
      return iconSprite("home", "ui-icon", options.iconSprite || DEFAULT_ICON_SPRITE);
    }
    if (icon === "portrait") {
      return '<img class="portal-chip-logo" src="/academic/assets/images/avatar-openai.jpg" alt="" loading="lazy" />';
    }
    if (icon === "frontier" || icon === "radar") {
      return iconSprite("research", "ui-icon", options.iconSprite || DEFAULT_ICON_SPRITE);
    }
    if (icon === "follow-builders") {
      return iconSprite("publications", "ui-icon", options.iconSprite || DEFAULT_ICON_SPRITE);
    }
    if (icon === "jsps") {
      return '<img class="portal-chip-logo" src="/jsps-kakenhi/favicon.png" alt="" loading="lazy" />';
    }
    return typeof icon === "string" ? icon : "";
  }

  function workspaceIconMarkup(options = {}) {
    return iconSprite("menu", "ui-icon", options.iconSprite || DEFAULT_ICON_SPRITE);
  }

  function statefulHref(href, locale, theme) {
    if (!href) {
      return "#";
    }
    if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("http")) {
      return href;
    }
    let normalizedHref = href;
    if (!href.startsWith("/")) {
      try {
        normalizedHref = new URL(href, global.location?.href || "https://sichentao.github.io/").pathname;
      } catch {
        normalizedHref = href;
      }
    }
    if (normalizedHref.startsWith("/academic-frontier/")) {
      const normalizedLocale = global.HomepageI18n?.normalizeLocale?.(locale) || "en";
      const fileName = normalizedHref.replace(/^\/academic-frontier\/(?:zh\/|ja\/)?/, "");
      const localizedPath = normalizedLocale === "en"
        ? `/academic-frontier/${fileName || ""}`
        : `/academic-frontier/${encodeURIComponent(normalizedLocale)}/${fileName || ""}`;
      return global.HomepagePlatform?.siteStateHref?.(localizedPath, { locale: normalizedLocale, theme }) || localizedPath;
    }
    return global.HomepagePlatform?.siteStateHref?.(normalizedHref, { locale, theme }) || normalizedHref;
  }

  function workspaceMeta(locale = "en", theme = "tohoku") {
    const labels = global.HomepagePlatform?.portalLabels?.(locale) || {};
    const text = {
      en: {
        kicker: "Workspaces",
        hint: "Switch workspaces.",
        tags: {
          portal: ["Start", "Overview"],
          academic: ["Profile", "Records"],
          frontier: ["Papers", "Metrics"],
          followBuilders: ["Builders", "Reader"],
          jsps: ["Grants", "Deadlines"],
        },
      },
      zh: {
        kicker: "工作区",
        hint: "切换主工作区。",
        tags: {
          portal: ["起点", "总览"],
          academic: ["身份", "记录"],
          frontier: ["论文", "分区"],
          followBuilders: ["Builders", "阅读"],
          jsps: ["科研费", "时间线"],
        },
      },
      ja: {
        kicker: "ワークスペース",
        hint: "ワークスペースを切り替えます。",
        tags: {
          portal: ["起点", "概要"],
          academic: ["プロフィール", "記録"],
          frontier: ["論文", "指標"],
          followBuilders: ["Builders", "読む"],
          jsps: ["科研費", "締切"],
        },
      },
    }[locale] || {};
    const portalData = global.HomepagePlatform?.portalItems?.({
      locale,
      theme,
      currentPath: global.location?.pathname || "/",
    }) || { items: [] };
    return {
      kicker: text.kicker || "Workspaces",
      hint: text.hint || "Switch the whole site context.",
      items: (portalData.items || []).map((item) => ({
        ...item,
        label: item.label || labels[item.id]?.full || item.id,
        iconMarkup: item.iconMarkup || item.iconHtml || portalIconMarkup(item.icon),
        tags: text.tags?.[item.id] || [],
      })),
    };
  }

  const SHARED_MEGA_TEXT = {
    en: {
      workspace: {
        kicker: "Workspaces",
        primary: [
          { label: "Navigation portal", href: "/" },
          { label: "Personal homepage", href: "/academic/" },
          { label: "Academic Frontier", href: "/academic-frontier/" },
          { label: "Follow Builders", href: "/follow-builders/" },
          { label: "JSPS KAKENHI", href: "/jsps-kakenhi/" },
        ],
        columns: [
          { title: "Homepage", items: ["Profile", "Publications", "Awards", "Projects"] },
          { title: "Feeds", items: ["Builders on X", "AI podcasts", "Official blogs", "Source links"] },
        ],
      },
      academic: {
        home: [["Profile", "Contact", "Statistics", "CV"], ["Appointment", "Affiliation", "AI", "HPC"]],
        timeline: [["Education", "Appointments", "Research visits"], ["Career history", "Institutions", "Milestones"]],
        publications: [["Search", "Filters", "Metrics", "DOI"], ["Journal papers", "Conference papers", "Citation data"]],
        awards: [["Awards", "IEEE CIS", "JST"], ["Evidence", "Dates", "Awarding bodies"]],
        projects: [["Repositories", "Research directions", "Code"], ["AI", "Optimization", "HPC tools"]],
        service: [["Reviewing", "Editorial service", "Venues"], ["IEEE Trans", "IEEE", "Elsevier", "Springer"]],
        profiles: [[
          { label: "Tohoku Cyberscience Center", href: profileLinkHref("tohokuCenter", "en") },
          { label: "High Performance Computing Laboratory", href: profileLinkHref("hpcLab", "en") },
          { label: "Takizawa Lab announcement", href: profileLinkHref("takizawaAnnouncement", "en") },
          { label: "Google Scholar", href: PROFILE_LINK_HREFS.googleScholar },
          { label: "ResearchMap", href: PROFILE_LINK_HREFS.researchMap },
          { label: "ResearchGate", href: PROFILE_LINK_HREFS.researchGate },
          { label: "GitHub", href: PROFILE_LINK_HREFS.github },
          { label: "DBLP", href: PROFILE_LINK_HREFS.dblp },
          { label: "ORCID", href: PROFILE_LINK_HREFS.orcid },
          { label: "J-GLOBAL", href: PROFILE_LINK_HREFS.jglobal },
        ], [
          { label: "Official profiles", href: "/academic/profiles.html" },
          { label: "Author IDs", href: "/academic/profiles.html" },
          { label: "Code profile", href: PROFILE_LINK_HREFS.github },
          { label: "Doctoral record", href: PROFILE_LINK_HREFS.toyamaDissertation },
        ]],
        research: [["AI", "HPC", "Optimization", "Collaborators"], ["Methods", "Domains", "Research highlights"]],
      },
      frontier: {
        overview: [["Paper library", "Search", "Filters"], ["Recent papers", "DOI", "Abstracts"]],
        papers: [["Ledger view", "Cards", "Full abstracts"], ["JCR", "CAS", "Impact factor"]],
        metrics: [["Venue metrics", "JCR", "CAS", "IF"], ["Public evidence", "Source trail", "Year aware"]],
      },
      followBuilders: {
        overview: [["Feed", "Sources", "Article reader"], ["X posts", "Podcasts", "Official blogs"]],
        feed: [["Story cards", "Search", "Filters"], ["Builders", "Posts", "Central feed"]],
        sources: [["AI builders", "Podcasts", "Blogs"], ["GitHub project", "Central source list", "Public feed"]],
        github: [[
          { label: "Zara Zhang / follow-builders", href: "https://github.com/zarazhangrui/follow-builders" },
          { label: "Sichen Tao / GitHub", href: "https://github.com/SichenTao" },
        ], ["Original feed", "Reader implementation", "Homepage workspace"]],
      },
      jsps: {
        calls: [["Program directory", "Eligibility", "Priority"], ["Open calls", "Groups", "Target applicants"]],
        deadlines: [["Timeline", "Submission dates", "System windows"], ["Upcoming", "Official dates", "Reminders"]],
        forms: [["Get Materials", "Notices", "Forms"], ["Application procedures", "Instructions", "Downloads"]],
        guides: [["Application guides", "FAQ", "e-Rad"], ["Writing support", "Official manuals", "Checklist"]],
        program: [["Program detail", "Documents", "Actions"], ["Eligibility", "Forms", "Official links"]],
      },
    },
    zh: {
      workspace: {
        kicker: "工作区",
        primary: [
          { label: "导航页", href: "/" },
          { label: "个人主页", href: "/academic/" },
          { label: "学术前沿", href: "/academic-frontier/" },
          { label: "Follow Builders", href: "/follow-builders/" },
          { label: "JSPS 科研费", href: "/jsps-kakenhi/" },
        ],
        columns: [
          { title: "个人主页", items: ["个人身份", "发表论文", "获奖", "项目"] },
          { title: "信息流", items: ["AI builders", "X 动态", "播客", "官方博客"] },
        ],
      },
      academic: {
        home: [["个人资料", "联系方式", "统计概览", "简历"], ["任职", "所属", "人工智能", "高性能计算"]],
        timeline: [["教育经历", "任职经历", "访问经历"], ["时间线", "机构", "关键节点"]],
        publications: [["搜索", "筛选", "指标", "DOI"], ["期刊论文", "会议论文", "被引用"]],
        awards: [["获奖", "IEEE CIS", "JST"], ["证据", "日期", "授奖机构"]],
        projects: [["代码仓库", "研究方向", "项目代码"], ["AI", "优化", "HPC 工具"]],
        service: [["审稿", "编辑服务", "出版地"], ["IEEE Trans", "IEEE", "Elsevier", "Springer"]],
        profiles: [[
          { label: "东北大学网络科学中心", href: profileLinkHref("tohokuCenter", "zh") },
          { label: "高性能计算研究室", href: profileLinkHref("hpcLab", "zh") },
          { label: "泷泽研究室加入公告", href: profileLinkHref("takizawaAnnouncement", "zh") },
          { label: "Google Scholar", href: PROFILE_LINK_HREFS.googleScholar },
          { label: "ResearchMap", href: PROFILE_LINK_HREFS.researchMap },
          { label: "ResearchGate", href: PROFILE_LINK_HREFS.researchGate },
          { label: "GitHub", href: PROFILE_LINK_HREFS.github },
          { label: "DBLP", href: PROFILE_LINK_HREFS.dblp },
          { label: "ORCID", href: PROFILE_LINK_HREFS.orcid },
          { label: "J-GLOBAL", href: PROFILE_LINK_HREFS.jglobal },
        ], [
          { label: "官方主页", href: "/academic/profiles.html" },
          { label: "作者标识", href: "/academic/profiles.html" },
          { label: "代码主页", href: PROFILE_LINK_HREFS.github },
          { label: "博士论文记录", href: PROFILE_LINK_HREFS.toyamaDissertation },
        ]],
        research: [["人工智能", "高性能计算", "优化", "合作者"], ["方法", "应用领域", "研究亮点"]],
      },
      frontier: {
        overview: [["论文库", "搜索", "筛选"], ["近期论文", "DOI", "摘要"]],
        papers: [["论文清单", "卡片视图", "完整摘要"], ["JCR", "中科院", "影响因子"]],
        metrics: [["期刊指标", "JCR", "中科院", "IF"], ["公开证据", "来源线索", "按年份追踪"]],
      },
      followBuilders: {
        overview: [["信息流", "来源", "文章阅读"], ["X 帖子", "播客", "官方博客"]],
        feed: [["故事卡片", "搜索", "筛选"], ["Builders", "帖子", "中心 feed"]],
        sources: [["AI builders", "播客", "博客"], ["GitHub 项目", "中心来源列表", "公开 feed"]],
        github: [[
          { label: "Zara Zhang / follow-builders", href: "https://github.com/zarazhangrui/follow-builders" },
          { label: "Sichen Tao / GitHub", href: "https://github.com/SichenTao" },
        ], ["原项目", "阅读器实现", "个人主页工作区"]],
      },
      jsps: {
        calls: [["项目目录", "申请对象", "优先级"], ["公募中", "项目分组", "申请者类型"]],
        deadlines: [["时间线", "提交日期", "系统开放"], ["近期截止", "官方日期", "提醒"]],
        forms: [["获取材料", "通知", "样式"], ["公募要领", "填写说明", "下载链接"]],
        guides: [["申请指南", "FAQ", "e-Rad"], ["写作辅助", "官方手册", "检查清单"]],
        program: [["项目详情", "资料", "操作"], ["申请条件", "表格", "官方链接"]],
      },
    },
    ja: {
      workspace: {
        kicker: "ワークスペース",
        primary: [
          { label: "ナビゲーション", href: "/" },
          { label: "個人ホームページ", href: "/academic/" },
          { label: "学術前沿", href: "/academic-frontier/" },
          { label: "Follow Builders", href: "/follow-builders/" },
          { label: "JSPS 科研費", href: "/jsps-kakenhi/" },
        ],
        columns: [
          { title: "個人ホームページ", items: ["プロフィール", "発表論文", "受賞", "プロジェクト"] },
          { title: "フィード", items: ["AI builders", "X 投稿", "Podcasts", "公式ブログ"] },
        ],
      },
      academic: {
        home: [["プロフィール", "連絡先", "統計", "CV"], ["現職", "所属", "人工知能", "高性能計算"]],
        timeline: [["学歴", "職歴", "訪問歴"], ["年表", "機関", "節目"]],
        publications: [["検索", "フィルタ", "指標", "DOI"], ["論文", "会議論文", "被引用"]],
        awards: [["受賞", "IEEE CIS", "JST"], ["根拠", "日付", "授与機関"]],
        projects: [["リポジトリ", "研究方向", "コード"], ["AI", "最適化", "HPC ツール"]],
        service: [["査読", "編集", "出版地"], ["IEEE Trans", "IEEE", "Elsevier", "Springer"]],
        profiles: [[
          { label: "東北大学サイバーサイエンスセンター", href: profileLinkHref("tohokuCenter", "ja") },
          { label: "高性能計算研究室", href: profileLinkHref("hpcLab", "ja") },
          { label: "滝沢研究室着任告知", href: profileLinkHref("takizawaAnnouncement", "ja") },
          { label: "Google Scholar", href: PROFILE_LINK_HREFS.googleScholar },
          { label: "ResearchMap", href: PROFILE_LINK_HREFS.researchMap },
          { label: "ResearchGate", href: PROFILE_LINK_HREFS.researchGate },
          { label: "GitHub", href: PROFILE_LINK_HREFS.github },
          { label: "DBLP", href: PROFILE_LINK_HREFS.dblp },
          { label: "ORCID", href: PROFILE_LINK_HREFS.orcid },
          { label: "J-GLOBAL", href: PROFILE_LINK_HREFS.jglobal },
        ], [
          { label: "公式プロフィール", href: "/academic/profiles.html" },
          { label: "著者ID", href: "/academic/profiles.html" },
          { label: "コードページ", href: PROFILE_LINK_HREFS.github },
          { label: "博士論文記録", href: PROFILE_LINK_HREFS.toyamaDissertation },
        ]],
        research: [["人工知能", "高性能計算", "最適化", "共同研究者"], ["方法", "応用領域", "研究ハイライト"]],
      },
      frontier: {
        overview: [["論文庫", "検索", "フィルタ"], ["最新論文", "DOI", "要旨"]],
        papers: [["論文一覧", "カード", "全文要旨"], ["JCR", "CAS", "インパクトファクター"]],
        metrics: [["会場指標", "JCR", "CAS", "IF"], ["公式情報", "公開根拠", "年次追跡"]],
      },
      followBuilders: {
        overview: [["フィード", "ソース", "記事リーダー"], ["X 投稿", "Podcasts", "公式ブログ"]],
        feed: [["ストーリーカード", "検索", "フィルタ"], ["Builders", "投稿", "中央フィード"]],
        sources: [["AI builders", "Podcasts", "ブログ"], ["GitHub project", "中央ソース", "公開 feed"]],
        github: [[
          { label: "Zara Zhang / follow-builders", href: "https://github.com/zarazhangrui/follow-builders" },
          { label: "Sichen Tao / GitHub", href: "https://github.com/SichenTao" },
        ], ["元プロジェクト", "Reader 実装", "個人ワークスペース"]],
      },
      jsps: {
        calls: [["プログラム", "対象者", "優先度"], ["募集中", "区分", "申請者"]],
        deadlines: [["年表", "提出日", "システム期間"], ["今後の締切", "公式日程", "リマインド"]],
        forms: [["資料取得", "通知", "様式"], ["公募要領", "記入要領", "ダウンロード"]],
        guides: [["申請ガイド", "FAQ", "e-Rad"], ["執筆支援", "公式手引き", "チェックリスト"]],
        program: [["プログラム詳細", "資料", "操作"], ["応募条件", "様式", "公式リンク"]],
      },
    },
  };

  const QUICK_COLUMN_TITLE = {
    en: "Quick Links",
    zh: "快速链接",
    ja: "クイックリンク",
  };

  function siteFromPath(pathname = global.location?.pathname || "/") {
    const path = decodeURIComponent(pathname);
    if (path.startsWith("/academic-frontier/")) return "frontier";
    if (path.startsWith("/follow-builders/")) return "followBuilders";
    if (path.startsWith("/jsps-kakenhi/")) return "jsps";
    if (path.startsWith("/academic/")) return "academic";
    return "portal";
  }

  function megaKeyForHref(href, site = siteFromPath()) {
    if (!href) return "";
    let path = href;
    try {
      const parsed = new URL(href, global.location?.href || "https://sichentao.github.io/");
      path = parsed.pathname;
      if (site === "followBuilders" && parsed.hash) {
        const hashKey = parsed.hash.replace(/^#/, "");
        if (["feed", "sources", "github"].includes(hashKey) || hashKey.startsWith("article-")) {
          if (hashKey.startsWith("article-")) return "feed";
          return hashKey;
        }
      }
    } catch {}
    const clean = decodeURIComponent(path).replace(/\/(?:zh|ja)\//, "/");
    const file = clean.split("/").pop() || "index.html";
    if (site === "academic") {
      if (file === "index.html" || clean.endsWith("/academic/")) return "home";
      return file.replace(/\.html$/, "");
    }
    if (site === "frontier") {
      if (file === "index.html" || clean.endsWith("/academic-frontier/")) return "overview";
      return file.replace(/\.html$/, "");
    }
    if (site === "followBuilders") {
      if (file === "index.html" || clean.endsWith("/follow-builders/")) return "overview";
      return file.replace(/\.html$/, "");
    }
    if (site === "jsps") {
      if (file === "index.html" || clean.endsWith("/jsps-kakenhi/")) return "calls";
      return file.replace(/\.html$/, "");
    }
    if (clean === "/") return "workspace";
    if (clean.startsWith("/academic-frontier/")) return "frontier";
    if (clean.startsWith("/follow-builders/")) return "followBuilders";
    if (clean.startsWith("/jsps-kakenhi/")) return "jsps";
    if (clean.startsWith("/academic/")) return "academic";
    return "workspace";
  }

  function normalizeMegaGroups(rawGroups = [], locale = "en") {
    return rawGroups.map((items, index) => ({
      title: index === 0 ? "" : QUICK_COLUMN_TITLE[locale] || QUICK_COLUMN_TITLE.en,
      items: Array.isArray(items) ? items : [],
    }));
  }

  function menuItemLabel(item) {
    return typeof item === "string" ? item : item?.label || "";
  }

  function externalLinkAttrs(href = "") {
    if (/^https?:\/\//i.test(String(href))) {
      return ' target="_blank" rel="noreferrer"';
    }
    return "";
  }

  const PRIMARY_TARGETS = {
    academic: {
      home: ["#home", "#hero-contact-list", "#record-nav", "/academic/assets/docs/CV_SichenTao.pdf"],
      timeline: ["#timeline-list", "#timeline-list", "#timeline-list"],
      publications: ["#pub-search", "#filter-toolbar-label", "#publication-list", "#publication-list"],
      awards: ["#award-page-list", "#award-page-list", "#award-page-list"],
      projects: ["#project-repo-grid", "#project-direction-list", "#project-repo-grid"],
      service: ["#service-page-groups", "#service-page-groups", "#service-page-groups"],
      profiles: ["#link-grid", "#link-grid", "#link-grid", "#link-grid", "#link-grid", "#link-grid", "#link-grid", "#link-grid", "#link-grid", "#link-grid"],
      research: ["#method-tags", "#domain-tags", "#year-bars", "#collaborator-list"],
    },
    frontier: {
      overview: ["#papers", "#pub-search", "#filter-toolbar-label"],
      papers: ["#paperList", "#paperList", "#paperList"],
      metrics: ["#venueMetricsList", "#metric-search", "#metric-filter-toolbar-label", "#venueMetricsList"],
    },
    followBuilders: {
      overview: ["#feed", "#sources", "#article"],
      feed: ["#fb-story-list", "#fb-search", "#fb-type-filter"],
      sources: ["#fb-builder-list", "#fb-podcast-list", "#fb-blog-list"],
      github: ["https://github.com/zarazhangrui/follow-builders", "https://github.com/SichenTao"],
    },
    jsps: {
      calls: ["#call-list", "#call-search", "#call-list"],
      deadlines: ["#deadline-timeline", "#deadline-programs", "#deadline-timeline"],
      forms: ["#form-grid", "#form-search", "#form-grid"],
      guides: ["#guide-grid", "#guide-summary", "#guide-grid"],
      program: ["#program-detail", "#program-page-actions", "#program-detail"],
    },
  };

  function primaryHref(site, key, index, baseHref, locale, theme) {
    const target = PRIMARY_TARGETS[site]?.[key]?.[index] || "";
    if (/^https?:\/\//i.test(target)) {
      return target;
    }
    if (target.startsWith("/")) {
      return statefulHref(target, locale, theme);
    }
    const base = statefulHref(baseHref || global.location?.pathname || "/", locale, theme);
    if (!target || target === "#") {
      return base;
    }
    return `${base.split("#")[0]}${target}`;
  }

  function megaItemHref(item, site, key, index, baseHref, locale, theme) {
    const explicit = typeof item === "string" ? "" : item?.href || "";
    if (explicit) {
      return /^https?:\/\//i.test(explicit) ? explicit : statefulHref(explicit, locale, theme);
    }
    return primaryHref(site, key, index, baseHref, locale, theme);
  }

  function sharedMegaPanelForKey(key, options = {}) {
    const locale = localeName(options.locale || global.HomepageI18n?.readStoredLocale?.(), global.HomepageI18n?.LOCALES || {});
    const theme = themeName(options.theme || global.HomepagePlatform?.readStoredTheme?.(), global.HomepagePlatform?.THEMES || {});
    const site = options.site || siteFromPath();
    const text = SHARED_MEGA_TEXT[locale] || SHARED_MEGA_TEXT.en;
    if (key === "workspace") {
      return {
        kicker: text.workspace.kicker,
        primary: text.workspace.primary.map((item) => ({ ...item, href: statefulHref(item.href, locale, theme) })),
        columns: text.workspace.columns,
      };
    }
    const rawGroups = text[site]?.[key];
    if (!rawGroups) {
      return null;
    }
    const groups = normalizeMegaGroups(rawGroups, locale);
    return {
      kicker: "",
      primary: groups[0]?.items?.map((item, index) => ({
        label: menuItemLabel(item),
        href: megaItemHref(item, site, key, index, options.baseHref, locale, theme),
      })) || [],
      columns: groups.slice(1).map((group) => ({ title: group.title, items: group.items })),
    };
  }

  function renderSharedMegaPanel(panel, key) {
    const columns = (panel.columns || [])
      .map(
        (column) => `
          <div class="shared-mega-column">
            ${column.title ? `<p class="shared-mega-column-title">${escapeHtml(column.title)}</p>` : ""}
            <div class="shared-mega-link-list">
              ${(column.items || [])
                .map((item) => {
                  const label = menuItemLabel(item);
                  const href = typeof item === "string" ? "" : item.href || "";
                  return href
                    ? `<a class="shared-mega-keyword" href="${escapeHtml(href)}"${externalLinkAttrs(href)}>${escapeHtml(label)}</a>`
                    : `<span class="shared-mega-keyword">${escapeHtml(label)}</span>`;
                })
                .join("")}
            </div>
          </div>
        `,
      )
      .join("");
    const primary = (panel.primary || [])
      .map((item) => {
        const href = item.href && item.href !== "#" ? ` href="${escapeHtml(item.href)}"` : "";
        return `<a class="shared-mega-primary-link"${href}${externalLinkAttrs(item.href)}>${escapeHtml(item.label)}</a>`;
      })
      .join("");
    return `
      <div class="topnav-mega-panel" data-topnav-mega-panel="${escapeHtml(key)}" role="group" aria-label="${escapeHtml(panel.kicker || "Navigation")}" hidden>
        <div class="shared-mega-inner">
          <div class="shared-mega-primary">
            ${panel.kicker ? `<p class="shared-mega-kicker">${escapeHtml(panel.kicker)}</p>` : ""}
            <div class="shared-mega-primary-list">${primary}</div>
          </div>
          ${columns ? `<div class="shared-mega-columns">${columns}</div>` : ""}
        </div>
      </div>
    `;
  }

  function renderPortalStyleMegaMenu(panel, key) {
    const workspaceColumn = panel.workspaceColumn
      ? `
        <div class="portal-mega-column portal-mega-workspace-column">
          <p class="portal-mega-column-title">${escapeHtml(panel.workspaceColumn.title)}</p>
          <div class="portal-mega-link-list">
            ${(panel.workspaceColumn.items || [])
              .map(
                (item) => `
                  <a class="portal-mega-link portal-mega-workspace-link${item.active ? " is-active" : ""}" href="${escapeHtml(item.href || "#")}" ${item.active ? 'aria-current="page"' : ""}>
                    ${escapeHtml(item.label)}
                  </a>
                `,
              )
              .join("")}
          </div>
        </div>
      `
      : "";
    const columns = (panel.columns || [])
      .map(
        (column) => `
          <div class="portal-mega-column">
            ${column.title ? `<p class="portal-mega-column-title">${escapeHtml(column.title)}</p>` : ""}
            <div class="portal-mega-link-list">
              ${(column.items || [])
                .map((item) => {
                  const label = typeof item === "string" ? item : item.label;
                  const href = typeof item === "string" ? panel.fallbackHref || "#" : item.href || panel.fallbackHref || "#";
                  return `<a class="portal-mega-link" href="${escapeHtml(href)}"${externalLinkAttrs(href)}>${escapeHtml(label)}</a>`;
                })
                .join("")}
            </div>
          </div>
        `,
      )
      .join("");
    const primary = (panel.primary || [])
      .map((item) => `<a class="portal-mega-primary-link" href="${escapeHtml(item.href || "#")}"${externalLinkAttrs(item.href)}>${escapeHtml(item.label)}</a>`)
      .join("");
    return `
      <div class="portal-mega-inner${workspaceColumn ? " portal-mega-inner--with-workspace" : ""}" data-shared-portal-mega-key="${escapeHtml(key)}">
        ${workspaceColumn}
        <div class="portal-mega-primary">
          ${panel.kicker ? `<p class="portal-mega-kicker">${escapeHtml(panel.kicker)}</p>` : ""}
          <div class="portal-mega-primary-list">${primary}</div>
        </div>
        ${columns}
      </div>
    `;
  }

  function renderMobileWorkspaceLinks(locale, theme) {
    const workspace = workspaceMeta(locale, theme);
    return `
      <div class="topnav-mobile-workspaces" aria-label="${escapeHtml(workspace.kicker)}">
        <p class="topnav-mobile-workspaces-title">${escapeHtml(workspace.kicker)}</p>
        <div class="topnav-mobile-workspace-list">
          ${(workspace.items || [])
            .map(
              (item) => `
                <a class="topnav-mobile-workspace-link${item.active ? " is-active" : ""}" href="${escapeHtml(item.href)}" ${item.active ? 'aria-current="page"' : ""}>
                  ${escapeHtml(item.label)}
                </a>
              `,
            )
            .join("")}
        </div>
      </div>
    `;
  }

  function ensureSharedPortalMegaScaffold(root = document) {
    let backdrop = document.getElementById("portalMegaBackdrop");
    let panel = document.getElementById("portalMegaMenu");
    const header = root.querySelector?.(".site-header") || document.querySelector(".site-header");
    if (!backdrop) {
      backdrop = document.createElement("div");
      backdrop.className = "portal-mega-backdrop";
      backdrop.id = "portalMegaBackdrop";
      backdrop.setAttribute("aria-hidden", "true");
    }
    if (!panel) {
      panel = document.createElement("div");
      panel.className = "portal-mega-menu";
      panel.id = "portalMegaMenu";
      panel.setAttribute("aria-hidden", "true");
    }
    if (header) {
      if (!backdrop.parentElement) {
        header.insertAdjacentElement("afterend", backdrop);
      }
      if (!panel.parentElement) {
        backdrop.insertAdjacentElement("afterend", panel);
      }
    } else {
      if (!backdrop.parentElement) {
        document.body?.prepend(backdrop);
      }
      if (!panel.parentElement) {
        backdrop.insertAdjacentElement("afterend", panel);
      }
    }
    return { backdrop, panel };
  }

  function currentMegaContext(config = {}) {
    return {
      locale: localeName(config.locale || global.HomepageI18n?.readStoredLocale?.(), global.HomepageI18n?.LOCALES || {}),
      theme: themeName(config.theme || global.HomepagePlatform?.readStoredTheme?.(), global.HomepagePlatform?.THEMES || {}),
    };
  }

  function renderPortalMegaForLink(link, options = {}) {
    const root = options.root || document;
    const panel = options.panel || document.getElementById("portalMegaMenu");
    const nav = options.nav || link?.closest?.(".topnav");
    const site = options.site || siteFromPath();
    if (!link?.dataset?.sharedMegaKey || !panel || !nav) {
      return false;
    }
    const { locale, theme } = currentMegaContext(options);
    const key = link.dataset.sharedMegaKey;
    const baseHref = link.getAttribute("href");
    const menu = sharedMegaPanelForKey(key, { locale, theme, site, baseHref });
    if (!menu) {
      return false;
    }
    if (!menu.kicker) {
      menu.kicker = (link.textContent || "").trim();
    }
    const fallbackHref = primaryHref(site, key, 0, baseHref, locale, theme);
    const workspace = workspaceMeta(locale, theme);
    const workspaceColumn = {
      title: workspace.kicker,
      items: (workspace.items || []).map((item) => ({
        label: item.label,
        href: item.href,
        active: item.active,
      })),
    };
    panel.innerHTML = renderPortalStyleMegaMenu({ ...menu, fallbackHref, workspaceColumn }, key);
    panel.dataset.activeKey = key;
    panel.dataset.activeLocale = locale;
    panel.dataset.activeTheme = theme;
    panel.setAttribute("aria-hidden", "false");
    document.body?.classList.remove("shared-mega-open");
    document.body?.classList.add("portal-mega-open");
    global.HomepageSharedShell?.syncPortalMegaAlignment?.(panel, nav);
    root.querySelectorAll?.("[data-portal-menu-key], [data-shared-mega-key]")?.forEach((node) => {
      const isActive = node === link;
      node.setAttribute("aria-expanded", isActive ? "true" : "false");
      if (isActive) {
        node.setAttribute("data-mega-active", "true");
        node.setAttribute("data-shared-mega-active", "true");
      } else {
        node.removeAttribute("data-mega-active");
        node.removeAttribute("data-shared-mega-active");
      }
    });
    return true;
  }

  function refreshOpenTopnavMegaMenu(config = {}) {
    const root = config.root || document;
    const panel = config.panel || document.getElementById("portalMegaMenu");
    if (!panel || panel.getAttribute("aria-hidden") === "true") {
      return false;
    }
    const activeKey = panel.dataset.activeKey || "";
    const site = config.site || siteFromPath();
    return toNodes(config.navSelector || ".topnav").some((nav) => {
      const selector = activeKey
        ? `a[data-shared-mega-active='true'], a[data-mega-active='true'], a[data-shared-mega-key='${activeKey}']`
        : "a[data-shared-mega-active='true'], a[data-mega-active='true']";
      const activeLink = nav.querySelector(selector);
      return activeLink ? renderPortalMegaForLink(activeLink, { ...config, root, panel, nav, site }) : false;
    });
  }

  function addChoiceListener(node, choiceName, callback, hasHref) {
    if (typeof callback !== "function") {
      return;
    }
    node.addEventListener("click", (event) => {
      callback(choiceName, event);
      if (!hasHref && !event.defaultPrevented) {
        event.preventDefault();
      }
    });
  }

  function languageSegmentedItemsHtml(config = {}) {
    const locales = config.locales || global.HomepageI18n?.LOCALES || {};
    const sequence = (config.sequence || global.HomepageI18n?.LOCALE_SEQUENCE || Object.keys(locales)).filter((name) => locales[name]);
    const selected = new Set(
      (Array.isArray(config.selected) ? config.selected : [config.locale])
        .map((name) => localeName(name, locales))
        .filter((name) => locales[name]),
    );
    const activeClass = config.activeClass || "is-selected";
    const choiceClass = classNames(config.choiceClass || "", "shared-language-chip");
    const dataAttribute = config.dataAttribute || "data-language-choice";
    const labelFor = typeof config.labelFor === "function"
      ? config.labelFor
      : (name, locale) => locale?.label || name.toUpperCase();
    const nameFor = typeof config.nameFor === "function"
      ? config.nameFor
      : (name, locale) => locale?.name || locale?.label || name;

    return sequence
      .map((name) => {
        const locale = locales[name];
        const isSelected = selected.has(name);
        const label = labelFor(name, locale);
        const fullName = nameFor(name, locale);
        const href = typeof config.choiceHref === "function" ? config.choiceHref(name) : "";
        const selectedClasses = isSelected ? classNames(activeClass, "is-selected") : "";
        const classes = classNames(choiceClass, selectedClasses);
        const commonAttrs = `
          class="${escapeHtml(classes)}"
          ${dataAttribute}="${escapeHtml(name)}"
          aria-label="${escapeHtml(fullName)}"
          title="${escapeHtml(fullName)}"
        `;

        if (href) {
          return `
            <a
              ${commonAttrs}
              href="${escapeHtml(href)}"
              ${isSelected ? 'aria-current="page"' : ""}
            >
              <span class="locale-label" aria-hidden="true">${escapeHtml(label)}</span>
            </a>
          `;
        }

        return `
          <button
            ${commonAttrs}
            type="button"
            aria-pressed="${isSelected ? "true" : "false"}"
          >
            <span class="locale-label" aria-hidden="true">${escapeHtml(label)}</span>
          </button>
        `;
      })
      .join("");
  }

  function renderLanguageSegmentedControl(target, config = {}) {
    const locales = config.locales || global.HomepageI18n?.LOCALES || {};
    const dataAttribute = config.dataAttribute || "data-language-choice";
    const containerClass = config.containerClass || "";
    const ariaLabel = config.ariaLabel || config.label || "Language choices";

    toNodes(target).forEach((container) => {
      container.className = classNames(container.className, containerClass, "shared-language-segmented");
      container.setAttribute("aria-label", ariaLabel);
      container.innerHTML = languageSegmentedItemsHtml({ ...config, locales, dataAttribute });
      container.querySelectorAll(`[${dataAttribute}]`).forEach((choice) => {
        addChoiceListener(
          choice,
          choice.getAttribute(dataAttribute),
          config.onChoice,
          choice.tagName.toLowerCase() === "a",
        );
      });
    });
  }

  function renderLocaleSwitcher(target, config = {}) {
    const locales = config.locales || global.HomepageI18n?.LOCALES || {};
    const sequence = (config.sequence || global.HomepageI18n?.LOCALE_SEQUENCE || Object.keys(locales)).filter((name) => locales[name]);
    const activeLocaleName = localeName(config.locale || global.HomepageI18n?.readStoredLocale?.({ locales }), locales);
    const activeLocale = locales[activeLocaleName] || locales.en || {};
    const activeLabel = activeLocale.label || activeLocaleName.toUpperCase();
    const activeName = activeLocale.name || activeLocaleName;
    const switcherLabel = config.ariaLabel || config.label || "Language";
    const trayLabel = config.trayLabel || config.choiceLabel || "Language choices";
    const triggerLabel = config.triggerLabel || switcherLabel || activeName;
    const activeClass = config.activeClass || "is-active";

    toNodes(target).forEach((switcher) => {
      switcher.setAttribute("aria-label", switcherLabel);
      const wasOpen = switcher.classList.contains("is-open");
      const choices = languageSegmentedItemsHtml({
        locales,
        sequence,
        selected: [activeLocaleName],
        activeClass,
        choiceClass: "locale-chip",
        dataAttribute: "data-locale-choice",
        choiceHref: config.choiceHref,
      });

      switcher.innerHTML = `
        <button
          class="locale-trigger"
          type="button"
          data-locale-trigger
          aria-haspopup="true"
          aria-expanded="${wasOpen ? "true" : "false"}"
          aria-label="${escapeHtml(triggerLabel)}"
          title="${escapeHtml(triggerLabel)}"
        >
          ${languageIconMarkup()}
          <span class="locale-current-label" data-locale-current-label>${escapeHtml(activeLabel)}</span>
        </button>
        <div class="locale-tray shared-language-segmented shared-language-segmented--floating" role="group" aria-label="${escapeHtml(trayLabel)}">
          ${choices}
        </div>
      `;

      switcher.querySelectorAll("[data-locale-choice]").forEach((choice) => {
        addChoiceListener(choice, choice.dataset.localeChoice, config.onChoice, choice.tagName.toLowerCase() === "a");
      });
    });
  }

  function renderThemeSwitcher(target, config = {}) {
    const themes = config.themes || global.HomepagePlatform?.THEMES || {};
    const sequence = (config.sequence || global.HomepagePlatform?.THEME_SEQUENCE || Object.keys(themes)).filter((name) => themes[name]);
    const locale = localeName(config.locale || global.HomepageI18n?.readStoredLocale?.(), global.HomepageI18n?.LOCALES || {});
    const activeThemeName = themeName(config.theme || global.HomepagePlatform?.readStoredTheme?.(), themes);
    const activeTheme = themes[activeThemeName] || themes.tohoku || {};
    const trayLabel = config.trayLabel || "Theme choices";
    const switcherLabel = config.ariaLabel || config.label || "Color theme";
    const tooltip = typeof config.tooltip === "function" ? config.tooltip : (name) => themeTooltip(name, locale);
    const activeTooltip = tooltip(activeThemeName);
    const activeClass = config.activeClass || "is-active";

    toNodes(target).forEach((switcher) => {
      switcher.setAttribute("aria-label", switcherLabel);
      const wasOpen = switcher.classList.contains("is-open");
      const choices = sequence
        .map((name) => {
          const theme = themes[name];
          const isActive = name === activeThemeName;
          const label = tooltip(name);
          return `
            <button
              class="theme-chip${isActive ? ` ${activeClass}` : ""}"
              type="button"
              data-theme-choice="${escapeHtml(name)}"
              aria-pressed="${isActive ? "true" : "false"}"
              aria-label="${escapeHtml(label)}"
              title="${escapeHtml(label)}"
            >
              <span class="theme-swatch ${escapeHtml(theme?.swatchClass || "")}" aria-hidden="true"></span>
            </button>
          `;
        })
        .join("");

      switcher.innerHTML = `
        <button
          class="theme-trigger"
          type="button"
          data-theme-trigger
          aria-haspopup="true"
          aria-expanded="${wasOpen ? "true" : "false"}"
          aria-label="${escapeHtml(activeTooltip)}"
          title="${escapeHtml(activeTooltip)}"
        >
          <span class="theme-swatch ${escapeHtml(activeTheme.swatchClass || "")}" data-theme-current-swatch aria-hidden="true"></span>
        </button>
        <div class="theme-tray" role="group" aria-label="${escapeHtml(trayLabel)}">
          ${choices}
        </div>
      `;

      switcher.querySelectorAll("[data-theme-choice]").forEach((choice) => {
        addChoiceListener(choice, choice.dataset.themeChoice, config.onChoice, false);
      });
    });
  }

  function renderPortalSwitcher(targetControls, config = {}) {
    toNodes(targetControls).forEach((controls) => {
      if (!controls) {
        return;
      }

      controls.querySelectorAll(".portal-return-link, .portal-switcher").forEach((node) => node.remove());
      const headerTools = controls.closest(".header-tools");
      headerTools?.querySelectorAll(".workspace-switcher").forEach((node) => node.remove());
    });
  }

  function enhanceTopnavMegaMenus(config = {}) {
    const root = config.root || document;
    const site = config.site || siteFromPath();
    if (site === "portal") {
      return;
    }
    const { locale, theme } = currentMegaContext(config);
    const { backdrop, panel } = ensureSharedPortalMegaScaffold(root);
    toNodes(config.navSelector || ".topnav").forEach((nav) => {
      nav.querySelectorAll(".topnav-mega-panel").forEach((panel) => panel.remove());
      nav.querySelectorAll(".topnav-mobile-workspaces").forEach((node) => node.remove());
      nav.insertAdjacentHTML("afterbegin", renderMobileWorkspaceLinks(locale, theme));
      Array.from(nav.children)
        .filter((node) => node.matches?.("a"))
        .forEach((link) => {
          const key = megaKeyForHref(link.getAttribute("href"), site);
          const menu = sharedMegaPanelForKey(key, { locale, theme, site, baseHref: link.getAttribute("href") });
          if (!menu) {
            link.removeAttribute("data-shared-mega-key");
            link.removeAttribute("data-portal-menu-key");
            return;
          }
          link.dataset.sharedMegaKey = key;
          link.dataset.portalMenuKey = key;
          link.setAttribute("aria-haspopup", "true");
          link.setAttribute("aria-expanded", "false");
        });

      if (panel?.getAttribute("aria-hidden") === "false") {
        refreshOpenTopnavMegaMenu({ ...config, root, panel, navSelector: nav, site });
      }

      if (nav.dataset.sharedMegaBound === "true") {
        return;
      }
      nav.dataset.sharedMegaBound = "true";
      let closeTimer = null;
      const clearTimer = () => {
        if (closeTimer) {
          global.clearTimeout(closeTimer);
          closeTimer = null;
        }
      };
      const close = () => {
        clearTimer();
        document.body?.classList.remove("portal-mega-open", "shared-mega-open");
        panel?.setAttribute("aria-hidden", "true");
        root.querySelectorAll?.("[data-portal-menu-key], [data-shared-mega-key]")?.forEach((link) => {
          link.setAttribute("aria-expanded", "false");
          link.removeAttribute("data-mega-active");
          link.removeAttribute("data-shared-mega-active");
        });
      };
      const activate = (link) => {
        if (!link?.dataset?.sharedMegaKey) {
          return;
        }
        clearTimer();
        document.querySelectorAll(".control-switcher.is-open").forEach((switcher) => {
          switcher.classList.remove("is-open");
          switcher
            .querySelector("[data-locale-trigger], [data-theme-trigger], [data-portal-trigger]")
            ?.setAttribute("aria-expanded", "false");
        });
        if (!global.matchMedia?.("(min-width: 761px) and (hover: hover) and (pointer: fine)")?.matches) {
          close();
          return;
        }
        if (!renderPortalMegaForLink(link, { ...config, root, panel, nav, site })) {
          return;
        }
      };
      const scheduleClose = () => {
        clearTimer();
        closeTimer = global.setTimeout(() => {
          if (
            !nav.closest(".site-header")?.matches(":hover") &&
            !panel?.matches(":hover") &&
            !panel?.contains(document.activeElement)
          ) {
            close();
          }
        }, 130);
      };
      nav.addEventListener("pointerover", (event) => {
        const link = event.target.closest?.("a[data-shared-mega-key]");
        if (link && nav.contains(link)) {
          activate(link);
        }
      });
      nav.querySelectorAll("a[data-shared-mega-key]").forEach((link) => {
        if (link.dataset.sharedPortalMegaLinkBound === "true") {
          return;
        }
        link.dataset.sharedPortalMegaLinkBound = "true";
        link.addEventListener("mouseenter", () => activate(link));
        link.addEventListener("focus", () => activate(link));
      });
      nav.closest(".site-header")?.addEventListener("mouseenter", clearTimer);
      nav.closest(".site-header")?.addEventListener("mouseleave", scheduleClose);
      nav.addEventListener("focusin", (event) => {
        const link = event.target.closest?.("a[data-shared-mega-key]");
        if (link && nav.contains(link)) {
          activate(link);
        }
      });
      nav.addEventListener("focusout", scheduleClose);
      nav.addEventListener("click", (event) => {
        if (!event.target.closest("#portalMegaMenu")) close();
      });
      panel?.addEventListener("mouseenter", clearTimer);
      panel?.addEventListener("mouseleave", scheduleClose);
      panel?.addEventListener("focusin", clearTimer);
      panel?.addEventListener("focusout", (event) => {
        if (!panel.contains(event.relatedTarget)) scheduleClose();
      });
      backdrop?.addEventListener("mouseenter", scheduleClose);
      backdrop?.addEventListener("click", close);
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          close();
        }
      });
      global.addEventListener("resize", () => {
        if (!global.matchMedia?.("(min-width: 761px) and (hover: hover) and (pointer: fine)")?.matches) {
          close();
        }
      });
    });
  }

  function controlLabels(locale = "en") {
    return {
      en: {
        display: "Display controls",
        language: "Language",
        languageChoices: "Language choices",
        cycleLanguages: "Switch to the next language",
        theme: "Color theme",
        themeChoices: "Theme choices",
        cycleThemes: "Switch to the next theme",
        pageNavigation: "Page navigation",
        menu: "Menu",
        showMenu: "Show menu",
        hideMenu: "Hide menu",
      },
      zh: {
        display: "显示控制",
        language: "语言",
        languageChoices: "语言选项",
        cycleLanguages: "切换到下一种语言",
        theme: "主题色",
        themeChoices: "主题选项",
        cycleThemes: "切换到下一个主题",
        pageNavigation: "页面导航",
        menu: "菜单",
        showMenu: "展开菜单",
        hideMenu: "收起菜单",
      },
      ja: {
        display: "表示設定",
        language: "言語",
        languageChoices: "言語オプション",
        cycleLanguages: "次の言語に切り替える",
        theme: "テーマ色",
        themeChoices: "テーマオプション",
        cycleThemes: "次のテーマに切り替える",
        pageNavigation: "ページナビゲーション",
        menu: "メニュー",
        showMenu: "メニューを開く",
        hideMenu: "メニューを閉じる",
      },
    }[locale] || controlLabels("en");
  }

  function nextName(current, sequence, catalog) {
    const values = sequence.filter((name) => catalog[name]);
    const pointer = values.indexOf(current);
    if (pointer === -1) {
      return values[0] || current;
    }
    return values[(pointer + 1) % values.length];
  }

  function renderStaticControlCluster(config = {}) {
    const locales = config.locales || global.HomepageI18n?.LOCALES || {};
    const themes = config.themes || global.HomepagePlatform?.THEMES || {};
    const localeSequence = config.localeSequence || global.HomepageI18n?.LOCALE_SEQUENCE || Object.keys(locales);
    const themeSequence = config.themeSequence || global.HomepagePlatform?.THEME_SEQUENCE || Object.keys(themes);

    function readLocale() {
      return localeName(global.HomepageI18n?.readStoredLocale?.({ locales }) || document.documentElement.lang || "en", locales);
    }

    function readTheme() {
      return themeName(global.HomepagePlatform?.readStoredTheme?.() || document.documentElement.dataset.theme || "tohoku", themes);
    }

    function render() {
      const locale = readLocale();
      const theme = readTheme();
      const labels = { ...controlLabels(locale), ...(config.labels?.[locale] || config.labels || {}) };

      document.querySelectorAll(".header-controls").forEach((node) => node.setAttribute("aria-label", labels.display));
      renderLocaleSwitcher(config.localeTarget || ".locale-switcher", {
        locale,
        locales,
        sequence: localeSequence,
        ariaLabel: labels.language,
        triggerLabel: labels.cycleLanguages,
        trayLabel: labels.languageChoices,
        onChoice: (localeName) => {
          global.HomepageI18n?.writeStoredLocale?.(localeName, { locales });
          global.HomepageI18n?.applyDocumentLocale?.(localeName, { locales });
          config.onLocaleChange?.(localeName);
          render();
        },
      });
      renderThemeSwitcher(config.themeTarget || ".theme-switcher", {
        locale,
        theme,
        themes,
        sequence: themeSequence,
        ariaLabel: labels.theme,
        trayLabel: labels.themeChoices,
        tooltip: (themeNameValue) => themeTooltip(themeNameValue, locale),
        onChoice: (themeNameValue) => {
          global.HomepagePlatform?.applyTheme?.(themeNameValue);
          config.onThemeChange?.(themeNameValue);
          render();
        },
      });
      renderPortalSwitcher(config.portalTarget || ".header-controls", {
        locale,
        theme,
        currentPath: config.currentPath || global.location?.pathname || "/",
      });
      global.HomepageSharedShell?.sync?.({
        switchers: {
          root: document,
          localeCycleLabel: labels.cycleLanguages,
          themeCycleLabel: labels.cycleThemes,
          onCycleLocale: () => {
            const nextLocale = nextName(readLocale(), localeSequence, locales);
            global.HomepageI18n?.writeStoredLocale?.(nextLocale, { locales });
            global.HomepageI18n?.applyDocumentLocale?.(nextLocale, { locales });
            config.onLocaleChange?.(nextLocale);
            render();
          },
          onCycleTheme: () => {
            const nextTheme = nextName(readTheme(), themeSequence, themes);
            global.HomepagePlatform?.applyTheme?.(nextTheme);
            config.onThemeChange?.(nextTheme);
            render();
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
        topnav: document.querySelector(".topnav")
          ? {
              root: document,
              navSelector: ".topnav",
              navAriaLabel: labels.pageNavigation,
              menuLabel: labels.menu,
              showMenuLabel: labels.showMenu,
              hideMenuLabel: labels.hideMenu,
              toggleInnerHTML: `${iconSprite("menu")}<span class="topnav-toggle-label"></span>`,
              hintInnerHTML: iconSprite("up"),
              breakpoint: 760,
            }
          : null,
      });
    }

    render();
  }

  global.HomepageComponents = Object.freeze({
    escapeHtml,
    iconSprite,
    portalIconMarkup,
    themeTooltip,
    renderLanguageSegmentedControl,
    renderLocaleSwitcher,
    renderThemeSwitcher,
    renderPortalSwitcher,
    enhanceTopnavMegaMenus,
    refreshOpenTopnavMegaMenu,
    renderStaticControlCluster,
  });
})(window);
