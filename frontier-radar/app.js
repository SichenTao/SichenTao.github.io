const STORAGE_KEY_LANGUAGE = "sichen-homepage-locale";
const LEGACY_STORAGE_KEY_LANGUAGE = "frontier-radar-language";
const STORAGE_KEY_DOMAIN = "frontier-radar-domain";
const STORAGE_KEY_THEME = "sichen-homepage-theme";

const THEME_CATALOG = {
  tohoku: {
    label: "Tohoku",
    themeColor: "#f3eef9",
    swatchClass: "theme-tohoku",
  },
  toyama: {
    label: "Toyama",
    themeColor: "#edf4f7",
    swatchClass: "theme-toyama",
  },
  usst: {
    label: "USST",
    themeColor: "#f7eded",
    swatchClass: "theme-usst",
  },
};

function readStoredValue(key) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStoredValue(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch {}
}

const state = {
  activeDomainId: null,
  statusFilter: "all",
  paperQuery: "",
  language: window.FRONTIER_RADAR_DEFAULT_LANGUAGE || "en",
  theme: window.FRONTIER_RADAR_DEFAULT_THEME || "tohoku",
  localArchiveIndex: {},
};

const PAGE_PATHS = {
  overview: "./index.html",
  papers: "./papers.html",
  signals: "./signals.html",
  teams: "./teams.html",
  downloads: "./downloads.html",
  guide: "./guide.html",
};

const UI_TEXT = {
  en: {
    htmlLang: "en",
    pageTitle: "Frontier Radar",
    pageDescription:
      "A local-first radar for tracking frontier teams, papers, signals, and contribution opportunities across multiple research domains.",
    brandTitle: "Frontier Radar",
    heroEyebrow: "Live radar",
    heroPrimaryAction: "Open papers",
    heroSecondaryAction: "Review the guide",
    snapshotLabel: "Snapshot",
    nextRunLabel: "Next planned run",
    sourcesCoveredLabel: "Sources covered",
    activeFocusLabel: "Active focus",
    domainsKicker: "Domains",
    domainsTitle: "Choose where to look harder",
    overviewKicker: "Overview",
    overviewTitle: "Radar posture",
    trackedTeamsLabel: "Tracked teams",
    papersInLaneLabel: "Papers now",
    localPdfsLabel: "Local PDFs",
    browserPullsLabel: "Browser pulls",
    trendKicker: "Trend map",
    trendTitle: "Where the field is bending",
    teamsKicker: "Teams",
    teamsTitle: "Who looks structurally important",
    teamsNote: "Curated to favor signal density, not name recognition alone.",
    paperLaneKicker: "Latest papers",
    papersTitle: "Priority papers for this domain",
    papersNote: "Read, verify, or queue next.",
    statusFieldLabel: "Status",
    searchFieldLabel: "Search",
    searchPlaceholder: "Find a title, venue, author, or clue",
    statusOptionAll: "All states",
    statusOptionMustRead: "Must-read",
    statusOptionMonitor: "Monitor",
    statusOptionArchive: "Archive",
    downloadKicker: "Download queue",
    downloadTitle: "What OpenClaw should fetch next",
    guideKicker: "Guide",
    guideTitle: "How this radar should work for us",
    guideNote: "The product brief lives here so the homepage can stay operational.",
    workflowKicker: "Workflow",
    workflowTitle: "How the daily machine should run",
    footerText:
      "Built for local-first iteration now, GitHub Pages publication next, and scheduled OpenClaw refresh later.",
    domainSwitcherLabel: "Domain switcher",
    displayControlsLabel: "Display controls",
    languageLabel: "Language",
    languageChoicesLabel: "Language choices",
    languageMenuLabel: "Language menu",
    showLanguagesLabel: "Show language options",
    openPortalLabel: "Return to homepage portal",
    languageTriggerLabel: "En",
    menuLabel: "Menu",
    showMenuLabel: "Open navigation menu",
    hideMenuLabel: "Close navigation menu",
    themeLabel: "Color theme",
    themeChoicesLabel: "Theme choices",
    showThemesLabel: "Show color themes",
    themeTohokuLabel: "Tohoku University",
    themeToyamaLabel: "University of Toyama",
    themeUsstLabel: "University of Shanghai for Science and Technology",
    navOverview: "Overview",
    navPapers: "Papers",
    navSignals: "Signals",
    navTeams: "Teams",
    navDownloads: "Downloads",
    navGuide: "Guide",
    whyThisDomainMatters: "Why this domain matters",
    signalsToWatch: "Signals to watch",
    whatShouldTriggerActionNext: "What should trigger action next",
    tensionLabel: "Tension:",
    reposLabel: "Repos:",
    papersLabel: "Papers:",
    authorsLabel: "Authors",
    abstractLabel: "Abstract",
    strategicLabel: "Why it matters",
    citationLabel: "IEEE-style citation",
    doiLabel: "DOI",
    venueLabel: "Venue",
    publisherLabel: "Publisher",
    sourceLabel: "Source:",
    pathLabel: "Target path:",
    localArchiveLabel: "Local archive",
    localArchiveHint: "Open local PDF",
    citationSourceLabel: "Citation source",
    impactFactorLabel: "IF",
    jcrLabel: "JCR",
    casLabel: "CAS",
    citationsMetricLabel: "Citations",
    pendingMetric: "Pending",
    notListedMetric: "Not publicly listed",
    openPdfAction: "Open PDF",
    sourcePdfAction: "Source PDF",
    doiAction: "DOI",
    publisherAction: "Publisher",
    localArchiveAction: "Local PDF",
    queueAction: "Queued locally",
    abstractUnavailable: "Abstract not yet available in the current source.",
    localArchiveReady: "Archived locally",
    downloadModeDirect: "Auto-archive ready",
    downloadModeBrowser: "Browser pull",
    downloadModeManual: "Manual review",
    backToTop: "Back to top",
    statusPrefix: "PDF",
    featuredTag: "Key paper",
    metricSourcesLabel: "Choose source",
    metricOfficialPageLabel: "Official page",
    metricPublicEvidenceLabel: "Public Evidence",
    metricOfficialPlatformLabel: "Official Platform",
    openJcrSearchCopyLabel: "Copy journal name and open official JCR search",
    openCasSearchCopyLabel: "Open CAS official platform and copy journal name",
    openSearchCopyLabel: "Copy citation query and open search page",
    copiedJournalNameLabel: "Copied journal name",
    copiedSearchQueryLabel: "Copied search query",
    primaryNavigationLabel: "Primary navigation",
    quickLinksLabel: "Quick radar links",
    copyMenuLabel: "Copy citation",
    copyCitationAction: "Copy IEEE citation",
    copyBibtexAction: "Copy BibTeX",
    copiedCitationLabel: "IEEE citation copied",
    copiedBibtexLabel: "BibTeX copied",
    topLabel: "Top",
  },
  zh: {
    htmlLang: "zh-CN",
    pageTitle: "前沿雷达",
    pageDescription: "一个面向多研究方向的本地优先前沿雷达，用于追踪关键团队、论文、信号与潜在贡献机会。",
    brandTitle: "前沿雷达",
    heroEyebrow: "当前雷达",
    heroPrimaryAction: "查看论文",
    heroSecondaryAction: "查看说明",
    snapshotLabel: "快照时间",
    nextRunLabel: "下次计划运行",
    sourcesCoveredLabel: "已覆盖来源",
    activeFocusLabel: "当前焦点",
    domainsKicker: "研究方向",
    domainsTitle: "选择需要重点追踪的方向",
    overviewKicker: "概览",
    overviewTitle: "雷达态势",
    trackedTeamsLabel: "跟踪团队",
    papersInLaneLabel: "当前论文",
    localPdfsLabel: "本地 PDF",
    browserPullsLabel: "浏览器拉取项",
    trendKicker: "趋势图谱",
    trendTitle: "领域正在向哪里弯折",
    teamsKicker: "团队",
    teamsTitle: "哪些团队最值得重点盯住",
    teamsNote: "筛选标准更偏向信号密度，而不只是名气大小。",
    paperLaneKicker: "最新论文",
    papersTitle: "当前方向的重点论文",
    papersNote: "直接判断阅读、核验或加入队列。",
    statusFieldLabel: "状态",
    searchFieldLabel: "搜索",
    searchPlaceholder: "搜索标题、期刊、作者或线索",
    statusOptionAll: "全部状态",
    statusOptionMustRead: "必读",
    statusOptionMonitor: "持续观察",
    statusOptionArchive: "归档",
    downloadKicker: "下载队列",
    downloadTitle: "接下来应由 OpenClaw 抓取的内容",
    guideKicker: "说明",
    guideTitle: "这个雷达应该如何为我们服务",
    guideNote: "把产品说明收在这里，这样首页就能保持真正可操作。",
    workflowKicker: "工作流",
    workflowTitle: "每日机器应该如何运转",
    footerText: "当前为本地优先迭代，下一步通过 GitHub Pages 发布，并在之后接入 OpenClaw 定时刷新。",
    domainSwitcherLabel: "研究方向切换",
    displayControlsLabel: "显示控制",
    languageLabel: "语言",
    languageChoicesLabel: "语言选项",
    languageMenuLabel: "语言菜单",
    showLanguagesLabel: "显示语言选项",
    openPortalLabel: "返回主页导航页",
    languageTriggerLabel: "中",
    menuLabel: "菜单",
    showMenuLabel: "打开导航菜单",
    hideMenuLabel: "关闭导航菜单",
    themeLabel: "配色主题",
    themeChoicesLabel: "配色选项",
    showThemesLabel: "切换配色",
    themeTohokuLabel: "东北大学",
    themeToyamaLabel: "富山大学",
    themeUsstLabel: "上海理工大学",
    navOverview: "总览",
    navPapers: "论文",
    navSignals: "趋势",
    navTeams: "团队",
    navDownloads: "下载",
    navGuide: "说明",
    whyThisDomainMatters: "为什么这个方向值得投入",
    signalsToWatch: "需要重点观察的信号",
    whatShouldTriggerActionNext: "什么变化会触发下一步行动",
    tensionLabel: "张力：",
    reposLabel: "仓库：",
    papersLabel: "论文：",
    authorsLabel: "作者",
    abstractLabel: "摘要",
    strategicLabel: "为什么重要",
    citationLabel: "IEEE 风格引文",
    doiLabel: "DOI",
    venueLabel: "发表渠道",
    publisherLabel: "出版社页面",
    sourceLabel: "来源：",
    pathLabel: "目标路径：",
    localArchiveLabel: "本地归档",
    localArchiveHint: "打开本地 PDF",
    citationSourceLabel: "引用来源",
    impactFactorLabel: "IF",
    jcrLabel: "JCR",
    casLabel: "CAS",
    citationsMetricLabel: "被引",
    pendingMetric: "待补充",
    notListedMetric: "公开未列出",
    openPdfAction: "打开 PDF",
    sourcePdfAction: "源 PDF",
    doiAction: "DOI",
    publisherAction: "发表页面",
    localArchiveAction: "本地 PDF",
    queueAction: "已加入本地队列",
    abstractUnavailable: "当前来源暂未提供摘要。",
    localArchiveReady: "已本地归档",
    downloadModeDirect: "可自动归档",
    downloadModeBrowser: "浏览器抓取",
    downloadModeManual: "人工复核",
    backToTop: "回到顶部",
    statusPrefix: "PDF",
    featuredTag: "重点论文",
    metricSourcesLabel: "选择来源",
    metricOfficialPageLabel: "官方页面",
    metricPublicEvidenceLabel: "公开参考页",
    metricOfficialPlatformLabel: "官方平台",
    openJcrSearchCopyLabel: "复制期刊名并打开 JCR 官方搜索页",
    openCasSearchCopyLabel: "打开 CAS 官方平台并复制期刊名",
    openSearchCopyLabel: "复制检索词并打开搜索页",
    copiedJournalNameLabel: "已复制期刊名",
    copiedSearchQueryLabel: "已复制检索词",
    primaryNavigationLabel: "主导航",
    quickLinksLabel: "快捷入口",
    copyMenuLabel: "复制引文",
    copyCitationAction: "复制 IEEE 格式引用",
    copyBibtexAction: "复制 BibTeX",
    copiedCitationLabel: "已复制 IEEE 格式引用",
    copiedBibtexLabel: "已复制 BibTeX",
    topLabel: "Top",
  },
  ja: {
    htmlLang: "ja",
    pageTitle: "フロンティア・レーダー",
    pageDescription:
      "複数の研究領域にまたがって重要チーム、論文、シグナル、次の貢献機会を追跡するためのローカルファーストなフロンティア・レーダー。",
    brandTitle: "フロンティア・レーダー",
    heroEyebrow: "ライブレーダー",
    heroPrimaryAction: "論文を見る",
    heroSecondaryAction: "ガイドを見る",
    snapshotLabel: "スナップショット",
    nextRunLabel: "次回予定実行",
    sourcesCoveredLabel: "カバー済みソース",
    activeFocusLabel: "現在の焦点",
    domainsKicker: "領域",
    domainsTitle: "より深く追うべき領域を選ぶ",
    overviewKicker: "概要",
    overviewTitle: "レーダーの現在地",
    trackedTeamsLabel: "追跡チーム数",
    papersInLaneLabel: "現在の論文数",
    localPdfsLabel: "ローカル PDF",
    browserPullsLabel: "ブラウザ取得待ち",
    trendKicker: "トレンドマップ",
    trendTitle: "分野はどこへ曲がり始めているか",
    teamsKicker: "チーム",
    teamsTitle: "構造的に重要そうなチーム",
    teamsNote: "知名度よりも信号密度を優先してキュレーションしています。",
    paperLaneKicker: "最新論文",
    papersTitle: "現在の領域の重点論文",
    papersNote: "読む・確認する・取得するをすぐ判断できます。",
    statusFieldLabel: "状態",
    searchFieldLabel: "検索",
    searchPlaceholder: "タイトル、会場、著者、手がかりで検索",
    statusOptionAll: "すべて",
    statusOptionMustRead: "必読",
    statusOptionMonitor: "監視",
    statusOptionArchive: "アーカイブ",
    downloadKicker: "ダウンロードキュー",
    downloadTitle: "次に OpenClaw が取得すべきもの",
    guideKicker: "ガイド",
    guideTitle: "このレーダーを私たちのためにどう機能させるか",
    guideNote: "プロダクトの説明はここへ移し、ホームは運用画面のままにします。",
    workflowKicker: "ワークフロー",
    workflowTitle: "日々のマシンをどう回すか",
    footerText:
      "今はローカルファーストで反復し、次に GitHub Pages へ公開し、その後 OpenClaw の定期更新へつなげます。",
    domainSwitcherLabel: "領域切り替え",
    displayControlsLabel: "表示コントロール",
    languageLabel: "言語",
    languageChoicesLabel: "言語選択",
    languageMenuLabel: "言語メニュー",
    showLanguagesLabel: "言語オプションを表示",
    openPortalLabel: "ホームポータルへ戻る",
    languageTriggerLabel: "日",
    menuLabel: "メニュー",
    showMenuLabel: "メニューを開く",
    hideMenuLabel: "メニューを閉じる",
    themeLabel: "配色テーマ",
    themeChoicesLabel: "配色選択",
    showThemesLabel: "配色を切り替える",
    themeTohokuLabel: "東北大学",
    themeToyamaLabel: "富山大学",
    themeUsstLabel: "上海理工大学",
    navOverview: "概要",
    navPapers: "論文",
    navSignals: "シグナル",
    navTeams: "チーム",
    navDownloads: "取得",
    navGuide: "ガイド",
    whyThisDomainMatters: "なぜこの領域が重要か",
    signalsToWatch: "見るべきシグナル",
    whatShouldTriggerActionNext: "次の行動を引き起こす変化",
    tensionLabel: "緊張点：",
    reposLabel: "リポジトリ：",
    papersLabel: "論文：",
    authorsLabel: "著者",
    abstractLabel: "要旨",
    strategicLabel: "なぜ重要か",
    citationLabel: "IEEE 形式の引用",
    doiLabel: "DOI",
    venueLabel: "掲載先",
    publisherLabel: "出版社ページ",
    sourceLabel: "ソース：",
    pathLabel: "保存先：",
    localArchiveLabel: "ローカルアーカイブ",
    localArchiveHint: "ローカル PDF を開く",
    citationSourceLabel: "引用ソース",
    impactFactorLabel: "IF",
    jcrLabel: "JCR",
    casLabel: "CAS",
    citationsMetricLabel: "被引用",
    pendingMetric: "保留",
    notListedMetric: "公開未収載",
    openPdfAction: "PDF を開く",
    sourcePdfAction: "元 PDF",
    doiAction: "DOI",
    publisherAction: "出版社ページ",
    localArchiveAction: "ローカル PDF",
    queueAction: "ローカルキュー済み",
    abstractUnavailable: "現在のソースでは要旨がまだ取得できていません。",
    localArchiveReady: "ローカル保存済み",
    downloadModeDirect: "自動保存可能",
    downloadModeBrowser: "ブラウザ取得",
    downloadModeManual: "手動レビュー",
    backToTop: "トップへ戻る",
    statusPrefix: "PDF",
    featuredTag: "重点論文",
    metricSourcesLabel: "参照元を選ぶ",
    metricOfficialPageLabel: "公式ページ",
    metricPublicEvidenceLabel: "公開参照ページ",
    metricOfficialPlatformLabel: "公式プラットフォーム",
    openJcrSearchCopyLabel: "誌名をコピーして JCR 公式検索を開く",
    openCasSearchCopyLabel: "CAS 公式プラットフォームを開き、誌名をコピー",
    openSearchCopyLabel: "検索語をコピーして検索ページを開く",
    copiedJournalNameLabel: "誌名をコピーしました",
    copiedSearchQueryLabel: "検索語をコピーしました",
    primaryNavigationLabel: "主要ナビゲーション",
    quickLinksLabel: "クイックリンク",
    copyMenuLabel: "引用をコピー",
    copyCitationAction: "IEEE形式の引用をコピー",
    copyBibtexAction: "BibTeX をコピー",
    copiedCitationLabel: "IEEE形式の引用をコピーしました",
    copiedBibtexLabel: "BibTeX をコピーしました",
    topLabel: "Top",
  },
};

const GUIDE_CONTENT = {
  en: [
    {
      title: "Operate from the paper surface",
      body:
        "The homepage should open with domain choice and immediately move into the latest important papers, with citation text, abstract, DOI, venue metrics, and local download actions in one place.",
    },
    {
      title: "Keep subscription PDFs local",
      body:
        "PDF acquisition should stay on this machine. Direct open-access files can be archived automatically, while publisher-restricted PDFs should flow into an OpenClaw browser queue instead of being published to GitHub Pages.",
    },
    {
      title: "Turn tracking into research leverage",
      body:
        "The radar is not only for monitoring. It should continuously collapse frontier evidence into reading order, synthesis notes, and realistic next-step contribution directions.",
    },
  ],
  zh: [
    {
      title: "从论文工作面进入",
      body:
        "首页应该先完成方向选择，然后立刻进入该方向最新且重要的论文，把引文、摘要、DOI、期刊指标和本地下载入口都放在同一张工作卡上。",
    },
    {
      title: "把订阅 PDF 留在本地",
      body:
        "论文 PDF 的获取应留在这台机器上。开放获取文件可以自动归档，而受出版社权限限制的 PDF 应该进入 OpenClaw 浏览器队列，而不是被发布到 GitHub Pages 上。",
    },
    {
      title: "把跟踪变成研究杠杆",
      body:
        "这个雷达不只是监控面板，它应持续把前沿证据压缩成阅读顺序、综合笔记和现实可行的下一步贡献方向。",
    },
  ],
  ja: [
    {
      title: "論文の作業面から入る",
      body:
        "ホームはまず領域選択から始まり、そのままその領域の最新重要論文へ入るべきです。引用、要旨、DOI、掲載先指標、ローカル取得導線を一枚の作業カードに集約します。",
    },
    {
      title: "購読 PDF はローカルに置く",
      body:
        "論文 PDF の取得はこのマシンに残すべきです。オープンアクセスは自動保存し、出版社アクセスが必要な PDF は GitHub Pages に公開せず OpenClaw のブラウザキューへ送ります。",
    },
    {
      title: "追跡を研究レバレッジへ変える",
      body:
        "このレーダーは単なる監視盤ではありません。フロンティアの証拠を、読む順番、統合メモ、そして現実的な次の貢献方向へ継続的に変換するための面です。",
    },
  ],
};

const EXACT_TRANSLATIONS = {
  "The strongest immediate opportunity is to track computation-rich research systems as products: not just papers, but the loop between teams, code, reproducibility, and what becomes a usable capability next.": {
    zh: "眼下最强的机会，是把计算密集型研究系统当作产品来追踪：不仅看论文，还要看团队、代码、可复现性，以及哪些成果会真正沉淀成可用能力。",
    ja: "今いちばん強い機会は、計算集約型の研究システムをプロダクトとして追うことです。論文だけでなく、チーム、コード、再現性、そして次に何が実用的な能力として立ち上がるかまで含めて見る必要があります。",
  },
  "Tomorrow 08:00 JST via OpenClaw cron": {
    zh: "明天 08:00 JST，通过 OpenClaw cron 运行",
    ja: "明日 08:00 JST、OpenClaw cron 経由",
  },
  high: { zh: "高", ja: "高" },
  exploratory: { zh: "探索", ja: "探索的" },
  "Scientific AI Systems": { zh: "科学智能系统", ja: "科学 AI システム" },
  "HPC and Autotuning": { zh: "HPC 与自动调优", ja: "HPC と自動チューニング" },
  "Agentic Research Ops": { zh: "Agent 化研究运营", ja: "エージェント型リサーチオペレーション" },
  "Evolutionary Computation": { zh: "进化计算", ja: "進化計算" },
  "The frontier is shifting from isolated model wins toward full scientific systems that combine simulation, adaptive experimentation, workflow orchestration, and research software that can survive contact with real labs.": {
    zh: "前沿正在从孤立的模型成绩，转向完整的科学系统：它们把仿真、自适应实验、流程编排和真正能在实验室环境中落地的研究软件结合在一起。",
    ja: "フロンティアは、個別モデルの勝ち筋から、シミュレーション、適応的実験、ワークフロー制御、そして実際の研究室環境に耐える研究ソフトウェアを統合した総合的な科学システムへと移りつつあります。",
  },
  "The interesting edge is no longer generic optimization alone. It is how autotuning, compilers, performance models, and heterogeneous systems combine into practical acceleration stacks for real workloads.": {
    zh: "真正有意思的边界，已经不只是泛化意义上的优化本身，而是自动调优、编译器、性能模型和异构系统如何组合成面向真实工作负载的可用加速栈。",
    ja: "面白い最前線は、もはや汎用的な最適化そのものではありません。自動チューニング、コンパイラ、性能モデル、異種システムが、実ワークロード向けの実践的な高速化スタックとしてどう結びつくかです。",
  },
  "Research teams are starting to treat agents as infrastructure for discovery, synthesis, and execution. The durable opportunity is not generic chat, but disciplined systems that collect, structure, and operationalize frontier evidence.": {
    zh: "研究团队正开始把 agent 当作发现、综合与执行的基础设施。真正长期的机会不在于泛化聊天，而在于能够采集、结构化并落地前沿证据的严谨系统。",
    ja: "研究チームは、発見・統合・実行のための基盤としてエージェントを扱い始めています。持続的な機会は汎用チャットではなく、フロンティアの証拠を収集し、構造化し、運用可能にする規律あるシステムにあります。",
  },
  "This first live slice tracks researcher-centered EC signals around open-source algorithm stacks, multiobjective optimization, and GPU-native evolutionary systems. The goal is to follow people who are not only publishing, but also shaping reusable infrastructure and realistic next-step directions.": {
    zh: "这一版首个真实采集切片，围绕开源算法栈、多目标优化和 GPU 原生进化系统，跟踪以研究者为中心的 EC 信号。目标是盯住那些不仅在发论文，而且在塑造可复用基础设施和现实下一步方向的人。",
    ja: "最初のライブ収集スライスでは、オープンソースのアルゴリズム基盤、多目的最適化、GPU ネイティブな進化システムを中心に、研究者起点の EC シグナルを追跡します。論文を出すだけでなく、再利用可能な基盤や現実的な次の方向性を形作っている人を追うのが目的です。",
  },
  "Which teams are turning foundation models into dependable scientific instruments instead of demos?": {
    zh: "哪些团队正在把基础模型变成可靠的科学仪器，而不是仅停留在演示层面？",
    ja: "どのチームが、基盤モデルを単なるデモではなく信頼できる科学的道具へ変えつつあるのか。",
  },
  "Where are the real bottlenecks: data curation, experiment control, evaluation, or integration with domain workflows?": {
    zh: "真正的瓶颈在哪里：数据整理、实验控制、评估，还是与领域工作流的整合？",
    ja: "本当のボトルネックはどこにあるのか。データ整備、実験制御、評価、それとも領域ワークフローへの統合なのか。",
  },
  "What contributions would still matter if model performance jumps again next quarter?": {
    zh: "如果下个季度模型性能再次跃升，什么样的贡献依然会有意义？",
    ja: "もし来四半期にモデル性能が再び大きく伸びても、なお意味を持つ貢献は何か。",
  },
  "Which work is actually deployable on heterogeneous production systems?": {
    zh: "哪些工作是真正能够部署到异构生产系统上的？",
    ja: "どの研究が、異種混在の本番システムへ実際に投入可能なのか。",
  },
  "Where can LLMs and ML help without collapsing trust in performance engineering?": {
    zh: "LLM 和机器学习在哪些环节能真正帮上忙，同时又不损害性能工程中的可信性？",
    ja: "LLM や機械学習は、性能工学への信頼を壊さずにどこで有効に使えるのか。",
  },
  "What research gaps remain around adaptive scheduling, performance portability, and explainability?": {
    zh: "在自适应调度、性能可移植性和可解释性方面，还存在哪些研究空白？",
    ja: "適応的スケジューリング、性能移植性、説明可能性の周辺には、どのような研究上の空白が残っているのか。",
  },
  "What should be fully automated versus always reviewed by a researcher?": {
    zh: "哪些环节应该完全自动化，哪些又必须始终由研究者复核？",
    ja: "何を完全自動化し、何を常に研究者がレビューすべきか。",
  },
  "How can we make agent-produced summaries auditable and genuinely useful?": {
    zh: "怎样才能让 agent 生成的总结既可审计，又真正有用？",
    ja: "エージェント生成の要約を、監査可能で本当に役立つものにするにはどうすればよいか。",
  },
  "What UI patterns best support long-horizon, multi-domain thinking?": {
    zh: "什么样的 UI 模式最适合支持长期、多领域的思考？",
    ja: "長期かつ複数領域にまたがる思考を支えるのに最適な UI パターンは何か。",
  },
  "Which EC researchers are still pairing strong methods with durable code and infrastructure?": {
    zh: "哪些 EC 研究者仍在把强方法与持久的代码和基础设施结合起来？",
    ja: "どの EC 研究者が、強い手法と持続するコード・基盤を結び付け続けているのか。",
  },
  "Where is the frontier moving from benchmark wins toward scalable, reusable systems?": {
    zh: "前沿正在如何从基准成绩，转向可扩展、可复用的系统？",
    ja: "フロンティアは、ベンチマークでの勝利から、拡張可能で再利用可能なシステムへどう移っているのか。",
  },
  "Which recent papers look like genuine starting points for new contributions rather than isolated demonstrations?": {
    zh: "哪些近期论文看起来更像是新贡献的真实起点，而不是孤立的展示？",
    ja: "どの最近の論文が、孤立したデモではなく新しい貢献の本当の出発点に見えるか。",
  },
  "new reproducible software releases tied to top papers": {
    zh: "与顶会顶刊论文直接对应的新可复现软件发布",
    ja: "主要論文と直結した再現可能ソフトウェアの新規公開",
  },
  "benchmarks that move from offline prediction to closed-loop decision making": {
    zh: "从离线预测走向闭环决策的基准",
    ja: "オフライン予測からクローズドループ意思決定へ進むベンチマーク",
  },
  "lab websites and GitHub orgs showing sustained infrastructure work": {
    zh: "在实验室主页和 GitHub 组织中持续体现基础设施投入的信号",
    ja: "研究室サイトや GitHub 組織から見える継続的な基盤整備の動き",
  },
  "code releases for compiler and runtime tooling": { zh: "编译器与运行时工具的代码发布", ja: "コンパイラ・ランタイム系ツールのコード公開" },
  "papers with real-system evidence instead of microbenchmarks only": { zh: "不只停留在微基准，而是带有真实系统证据的论文", ja: "マイクロベンチマークだけでなく実システムの証拠を伴う論文" },
  "cross-institution collaborations around exascale or urgent computing": { zh: "围绕 exascale 或紧急计算的跨机构合作", ja: "エクサスケールや緊急計算をめぐる機関横断の協力" },
  "agent workflows that persist state and evidence over time": { zh: "能够跨时间持续保存状态和证据的 agent 工作流", ja: "状態と証拠を時間を超えて保持できるエージェントワークフロー" },
  "browser-native acquisition of papers and artifacts": { zh: "浏览器原生的论文与研究产物采集", ja: "ブラウザネイティブな論文・成果物収集" },
  "products that combine search, summarization, and agenda formation": { zh: "把搜索、总结与议程形成结合在一起的产品", ja: "検索、要約、アジェンダ形成を統合したプロダクト" },
  "recent TEVC, GECCO, and Swarm and Evolutionary Computation papers from tracked people": { zh: "来自跟踪对象的近期 TEVC、GECCO 和 Swarm and Evolutionary Computation 论文", ja: "追跡対象から出ている最近の TEVC、GECCO、Swarm and Evolutionary Computation 論文" },
  "public repositories that still receive meaningful updates after publication": { zh: "发表之后仍持续获得有效更新的公开仓库", ja: "公開後も意味のある更新が続いている公開リポジトリ" },
  "open-access PDFs that can be pulled automatically into the local archive": { zh: "可自动拉入本地文献库的开放获取 PDF", ja: "ローカルアーカイブへ自動取得できるオープンアクセス PDF" },
  "Closed-loop scientific workflows": { zh: "闭环科学工作流", ja: "クローズドループ型科学ワークフロー" },
  "Trustworthy autotuning under real constraints": { zh: "真实约束下可信的自动调优", ja: "現実的制約下で信頼できる自動チューニング" },
  "Persistent research agent stacks": { zh: "持久化研究 agent 栈", ja: "持続的な研究エージェント・スタック" },
  "Open-source EC stacks are still where leverage compounds": { zh: "开源 EC 技术栈仍是杠杆持续累积的地方", ja: "オープンソース EC スタックはいまもレバレッジが積み上がる中心にある" },
  "Multi-objective optimization remains a live frontier core": { zh: "多目标优化仍是活跃的前沿核心", ja: "多目的最適化はいまも生きたフロンティアの中核である" },
  "Paper acquisition is uneven enough to justify browser automation": { zh: "论文获取链路足够不均衡，因此值得引入浏览器自动化", ja: "論文取得のばらつきは大きく、ブラウザ自動化を導入する十分な理由がある" },
  "The field is increasingly rewarding integrated systems that sense, simulate, decide, and update rather than one-shot prediction modules.": { zh: "这个领域越来越奖励那类能够感知、仿真、决策并持续更新的整体系统，而不是一次性预测模块。", ja: "この分野では、ワンショット予測モジュールよりも、感知し、シミュレートし、判断し、更新し続ける統合システムがより評価されつつあります。" },
  "Many releases still look impressive in slides but remain fragile when evaluated as full workflows.": { zh: "很多发布在幻灯片里看起来很亮眼，但一旦按完整工作流去评估，仍然很脆弱。", ja: "多くの公開物はスライド上では印象的でも、完全なワークフローとして評価すると依然として脆弱です。" },
  "Teams want adaptive optimization that can survive schedule constraints, hardware diversity, and reproducibility requirements.": { zh: "团队真正想要的是那种能扛住调度约束、硬件多样性和可复现性要求的自适应优化。", ja: "チームが本当に求めているのは、スケジュール制約、ハードウェアの多様性、再現性要求に耐えられる適応的最適化です。" },
  "Performance gains are easy to claim and hard to verify across systems, kernels, and workloads.": { zh: "性能提升很容易宣称，但要跨系统、内核和工作负载去验证却很难。", ja: "性能向上は主張しやすい一方で、システム・カーネル・ワークロードをまたいで検証するのは難しいです。" },
  "The next useful layer is agents that remember, curate evidence, and keep a research operating cadence instead of restarting from scratch each day.": { zh: "下一层真正有用的能力，是那些能记住、整理证据，并维持研究节奏，而不是每天从零开始的 agent。", ja: "次に本当に有用になる層は、毎日ゼロから始めるのではなく、記憶し、証拠を整理し、研究のリズムを保つエージェントです。" },
  "Without careful structure, the output devolves into noisy summaries instead of real research leverage.": { zh: "如果缺乏谨慎的结构设计，输出就会退化成噪声化摘要，而不是真正的研究杠杆。", ja: "慎重な構造設計がなければ、出力は本当の研究レバレッジではなく、ノイズだらけの要約へと崩れてしまいます。" },
  "The strongest EC signals are not just papers. They are papers backed by reusable codebases like EvoX and pymoo that keep moving after publication.": { zh: "最强的 EC 信号不只是论文本身，而是那些背后有 EvoX、pymoo 这类可复用代码库支撑，并且在发表后仍继续演化的论文。", ja: "強い EC シグナルは論文だけではありません。EvoX や pymoo のような再利用可能なコードベースに支えられ、公開後も動き続ける論文です。" },
  "Tooling quality is improving, but many promising papers still do not translate into durable public systems.": { zh: "工具质量确实在提升，但很多看起来很有前景的论文，仍然没有转化成持久的公开系统。", ja: "ツールの質は向上していますが、有望に見える多くの論文が、依然として持続的な公開システムへはつながっていません。" },
  "Recent activity still clusters around multi-objective optimization, especially where methods become parallel, practical, and easier to connect to real engineering workflows.": { zh: "近期活动依然聚集在多目标优化上，尤其是在方法变得更并行、更实用、更容易接入真实工程工作流的地方。", ja: "最近の活動は依然として多目的最適化に集中しており、特に手法が並列化され、実用的になり、実際の工学ワークフローへ接続しやすくなる領域で顕著です。" },
  "A lot of multi-objective work is method-heavy; the harder question is which ideas survive realistic evaluation and deployment.": { zh: "很多多目标工作的方法味很重；更难的问题是，哪些想法能在现实评测与部署中活下来。", ja: "多目的最適化の研究は手法寄りになりがちで、より難しい問いは、どのアイデアが現実的な評価と実運用に耐えるかです。" },
  "Even in a well-defined field like EC, some important items are open immediately while others still require publisher access or manual browser work.": { zh: "即便在像 EC 这样边界相对清晰的领域里，一些重要内容能立即开放获取，而另一些仍需要出版社权限或手动浏览器操作。", ja: "EC のように比較的輪郭のはっきりした分野でも、すぐ開ける重要項目がある一方で、出版社アクセスや手作業のブラウザ操作を要する項目もあります。" },
  "This is exactly where OpenClaw-driven download workflows can turn a reading backlog into a real archive.": { zh: "这恰恰就是 OpenClaw 驱动的下载工作流能够把待读清单变成真实文献库的地方。", ja: "まさにここが、OpenClaw 駆動のダウンロードワークフローによって読書 backlog を本当のアーカイブへ変えられるポイントです。" },
  "rising fast": { zh: "快速上升", ja: "急上昇" },
  "high signal": { zh: "高信号密度", ja: "高シグナル" },
  "early but important": { zh: "尚早但重要", ja: "初期だが重要" },
  "live code signal": { zh: "活跃代码信号", ja: "生きたコード信号" },
  "method pressure": { zh: "方法压力", ja: "手法圧力" },
  "workflow gap": { zh: "工作流缺口", ja: "ワークフローのギャップ" },
  "systems papers": { zh: "系统论文", ja: "システム論文" },
  "production pressure": { zh: "生产压力", ja: "本番圧力" },
  "workflow tooling": { zh: "工作流工具", ja: "ワークフローツール" },
  "Scientific Workflow Systems Labs": { zh: "科学工作流系统实验室群", ja: "科学ワークフローシステム系ラボ" },
  "Exascale Runtime and Tuning Groups": { zh: "Exascale 运行时与调优团队", ja: "エクサスケール実行系・チューニンググループ" },
  "Research Agent Product Builders": { zh: "研究 Agent 产品构建者", ja: "研究エージェント製品ビルダー" },
  "US + Europe": { zh: "美国 + 欧洲", ja: "米国 + 欧州" },
  "Japan + US": { zh: "日本 + 美国", ja: "日本 + 米国" },
  Distributed: { zh: "分布式", ja: "分散型" },
  "systems + reproducibility": { zh: "系统 + 可复现性", ja: "システム + 再現性" },
  "runtime + compilers": { zh: "运行时 + 编译器", ja: "ランタイム + コンパイラ" },
  "workflow product design": { zh: "工作流产品设计", ja: "ワークフロー製品設計" },
  "GPU-native EC systems": { zh: "GPU 原生 EC 系统", ja: "GPU ネイティブな EC システム" },
  "multiobjective toolchains": { zh: "多目标工具链", ja: "多目的最適化ツールチェーン" },
  "multiobjective foundations": { zh: "多目标基础方法", ja: "多目的最適化の基盤" },
  "gpu-native evolutionary systems, multiobjective optimization, and open-source ec infrastructure": { zh: "GPU 原生进化系统、多目标优化与开源 EC 基础设施", ja: "GPU ネイティブな進化システム、多目的最適化、オープンソース EC 基盤" },
  "parallel multiobjective optimization and practical optimization tooling": { zh: "并行多目标优化与实用优化工具链", ja: "並列多目的最適化と実用的な最適化ツール" },
  "multiobjective optimization, ec problem structure, and durable benchmark-setting ideas": { zh: "多目标优化、EC 问题结构与能够长期立住的基准思想", ja: "多目的最適化、EC 問題構造、長く効くベンチマーク発想" },
  "advanced multi-objective optimization algorithms": { zh: "先进多目标优化算法", ja: "先進的な多目的最適化アルゴリズム" },
  "evolutionary algorithms and applications": { zh: "进化算法及其应用", ja: "進化アルゴリズムとその応用" },
  "optimization and packing problems": { zh: "优化与装箱问题", ja: "最適化とパッキング問題" },
  "These groups are treating AI-enabled science as a software systems problem with real attention to instrumentation, orchestration, and evidence quality.": { zh: "这些团队把 AI 驱动的科学问题当作软件系统问题来做，真正重视仪器化、编排和证据质量。", ja: "これらのグループは、AI を活用した科学をソフトウェアシステムの問題として捉え、計測性、オーケストレーション、証拠品質を本気で重視しています。" },
  "The most interesting groups are combining runtime adaptation, scheduling, and model-based tuning around heterogeneous systems.": { zh: "最值得关注的团队，正在把运行时自适应、调度和基于模型的调优，围绕异构系统整合起来。", ja: "最も興味深いグループは、異種システムをめぐってランタイム適応、スケジューリング、モデルベースのチューニングを組み合わせています。" },
  "The strongest teams are building interfaces that help users stay oriented across evidence, tasks, and long-running summaries.": { zh: "最强的团队正在构建一种界面，让用户在证据、任务和长期总结之间始终保持方向感。", ja: "強いチームは、証拠・タスク・長期的な要約のあいだでユーザーが見失わないためのインターフェースを作っています。" },
  "public repos tied directly to papers": { zh: "直接与论文绑定的公开仓库", ja: "論文と直接結びついた公開リポジトリ" },
  "datasets and eval harnesses that support regeneration": { zh: "支持重现实验的数据集和评测框架", ja: "再生成を支えるデータセットと評価ハーネス" },
  "sustained updates beyond the paper deadline": { zh: "超过论文 deadline 之后仍持续更新", ja: "論文締切後も継続する更新" },
  "real machine evaluations": { zh: "真实机器上的评估", ja: "実機での評価" },
  "compiler-runtime co-design": { zh: "编译器与运行时协同设计", ja: "コンパイラとランタイムの協調設計" },
  "urgent computing or operational constraints": { zh: "紧急计算或运维级约束", ja: "緊急計算や運用上の制約" },
  "attention to provenance and traceability": { zh: "重视来源与可追溯性", ja: "来歴とトレーサビリティへの配慮" },
  "browser-native acquisition": { zh: "浏览器原生采集", ja: "ブラウザネイティブ収集" },
  "stateful workflows that actually help teams work": { zh: "真正帮助团队工作的有状态流程", ja: "チームの実作業を支える状態保持型ワークフロー" },
  "closed-loop orchestration": { zh: "闭环编排", ja: "クローズドループ・オーケストレーション" },
  "scientific agent systems": { zh: "科学 agent 系统", ja: "科学エージェントシステム" },
  "runtime-guided optimization": { zh: "运行时引导优化", ja: "ランタイム誘導最適化" },
  "heterogeneous scheduling": { zh: "异构调度", ja: "異種スケジューリング" },
  "agent memory systems": { zh: "agent 记忆系统", ja: "エージェント記憶システム" },
  "human-in-the-loop research ops": { zh: "人在环研究运营", ja: "Human-in-the-loop 型リサーチオペレーション" },
  "Closed-Loop Scientific Discovery Systems Beyond One-Shot Prediction": { zh: "超越单次预测的闭环科学发现系统", ja: "ワンショット予測を超えるクローズドループ科学発見システム" },
  "Benchmarking Scientific Agents Under Real Instrument and Workflow Constraints": { zh: "在真实仪器与工作流约束下评测科学 agent", ja: "実機器・実ワークフロー制約下での科学エージェント評価" },
  "Adaptive Tuning for Heterogeneous HPC Systems Under Deadline Constraints": { zh: "面向截止期限约束的异构 HPC 系统自适应调优", ja: "締切制約下における異種 HPC システム向け適応チューニング" },
  "Compiler and Runtime Co-Design for Portable Performance at Scale": { zh: "面向大规模可移植性能的编译器与运行时协同设计", ja: "大規模環境における移植可能性能のためのコンパイラ・ランタイム協調設計" },
  "Persistent Research Agents with Evidence Graphs and Audit Trails": { zh: "带有证据图谱与审计轨迹的持久化研究 agent", ja: "証拠グラフと監査証跡を備えた持続型研究エージェント" },
  "Human-Grounded Interfaces for Long-Horizon Literature Synthesis": { zh: "面向长期文献综合的人本界面", ja: "長期的な文献統合のための人間中心インターフェース" },
  "Evolutionary Generative Optimization: Towards Fully Data-Driven Evolutionary Optimization via Generative Learning": { zh: "进化生成优化：迈向基于生成学习的全数据驱动进化优化", ja: "進化的生成最適化：生成学習による完全データ駆動型進化最適化へ" },
  "EvoSort: a genetic-algorithm-based adaptive parallel sorting framework for large-scale high performance computing": { zh: "EvoSort：面向大规模高性能计算的基于遗传算法的自适应并行排序框架", ja: "EvoSort：大規模 HPC 向け遺伝的アルゴリズムベース適応並列ソート枠組み" },
  "An adaptive weight optimization algorithm based on decision variable grouping for large-scale multi-objective optimization problems": { zh: "基于决策变量分组的大规模多目标优化自适应权重优化算法", ja: "決定変数グルーピングに基づく大規模多目的最適化のための適応重み最適化アルゴリズム" },
  "Dynamic performance evaluation of evolutionary multi-objective optimization algorithms for gait cycle optimization of a 25-DOFs NAO humanoid robot": { zh: "面向 25 自由度 NAO 人形机器人步态周期优化的进化多目标优化算法动态性能评估", ja: "25 自由度 NAO ヒューマノイドの歩行周期最適化に対する進化多目的最適化アルゴリズムの動的性能評価" },
  "A cooperative co-evolutionary algorithm with core-based grouping strategy for large-scale 0–1 knapsack problems": { zh: "一种面向大规模 0-1 背包问题、采用核心分组策略的协同协进化算法", ja: "大規模 0-1 ナップサック問題のためのコアベース分割戦略を用いた協調的共進化アルゴリズム" },
  "EvoRL: A GPU-accelerated Framework for Evolutionary Reinforcement Learning": { zh: "EvoRL：一个面向进化强化学习的 GPU 加速框架", ja: "EvoRL：進化的強化学習のための GPU 加速フレームワーク" },
  "GPU-accelerated Evolutionary Many-objective Optimization Using Tensorized NSGA-III": { zh: "利用张量化 NSGA-III 的 GPU 加速进化多目标优化", ja: "テンソル化 NSGA-III を用いた GPU 加速進化多目的最適化" },
  "TensorNEAT: A GPU-accelerated Library for NeuroEvolution of Augmenting Topologies": { zh: "TensorNEAT：一个面向拓扑增广神经进化的 GPU 加速库", ja: "TensorNEAT：トポロジー拡張型神経進化のための GPU 加速ライブラリ" },
  "Hot off the Press: Parallel Multi-Objective Optimization for Expensive and Inexpensive Objectives and Constraints": {
    zh: "新近发布：面向高代价与低代价目标及约束的并行多目标优化",
    ja: "最新論文：高コスト・低コストの目的と制約に対する並列多目的最適化",
  },
  "Parallel multi-objective optimization for expensive and inexpensive objectives and constraints": {
    zh: "面向高代价与低代价目标及约束的并行多目标优化",
    ja: "高コスト・低コストの目的と制約に対する並列多目的最適化",
  },
  "Recent advances in data-driven evolutionary algorithms (EAs) have demonstrated the potential of leveraging historical data to improve optimization accuracy and adaptability. Despite these advancements, existing methods remain reliant on handcrafted process-level operators. In contrast, Evolutionary Generative Optimization (EvoGO) is a fully data-driven framework designed from the objective level, enabling autonomous learning of the entire search process. EvoGO streamlines the evolutionary optimization process into three stages: data preparation, model training, and population generation. The data preparation stage constructs a pairwise dataset to enrich training diversity without incurring additional evaluation costs. During model training, a tailored generative model learns to transform inferior solutions into superior ones. In the population generation stage, EvoGO replaces traditional reproduction operators with a scalable and parallelizable generative mechanism. Extensive experiments on numerical benchmarks, classical control problems, and high-dimensional robotic tasks demonstrate that EvoGO consistently converges within merely 10 generations and substantially outperforms a wide spectrum of optimization approaches, including traditional EAs, Bayesian optimization, and reinforcement learning based methods. Code is available at: https://github.com/EMI-Group/evogo.": {
    zh: "近年来，数据驱动进化算法（EA）的进展已经表明，利用历史数据能够提升优化的精度与适应性。尽管如此，现有方法仍然依赖人工设计的过程级算子。与之相对，Evolutionary Generative Optimization（EvoGO）是一个从目标层面出发设计的全数据驱动框架，能够自主学习整个搜索过程。EvoGO 将进化优化流程整理为三个阶段：数据准备、模型训练和种群生成。数据准备阶段通过构造成对数据集，在不增加额外评估成本的前提下提升训练多样性。模型训练阶段中，一个定制的生成模型学习如何把较差的解映射为更优的解。到了种群生成阶段，EvoGO 用一种可扩展、可并行的生成机制取代了传统繁殖算子。作者在数值基准、经典控制问题以及高维机器人任务上的大量实验表明，EvoGO 往往只需 10 代就能稳定收敛，并且显著优于传统进化算法、贝叶斯优化和基于强化学习的方法等广泛优化路线。代码地址为：https://github.com/EMI-Group/evogo。",
    ja: "近年のデータ駆動型進化アルゴリズム（EA）の進展は、履歴データを活用することで最適化の精度と適応性を高められる可能性を示しています。しかし既存手法の多くは、依然として人手で設計されたプロセスレベルの演算子に依存しています。これに対し Evolutionary Generative Optimization（EvoGO）は、目的関数レベルから設計された完全データ駆動型の枠組みであり、探索過程全体を自律的に学習できます。EvoGO は進化最適化の流れを、データ準備、モデル学習、個体群生成の 3 段階に整理します。データ準備段階では、追加の評価コストを発生させずに学習の多様性を高めるため、ペアワイズなデータセットを構成します。モデル学習段階では、劣った解をより良い解へ変換する方法を、専用の生成モデルが学習します。個体群生成段階では、EvoGO は従来の繁殖演算子を、拡張性と並列性を備えた生成機構に置き換えます。数値ベンチマーク、古典制御問題、高次元ロボット課題における大規模実験の結果、EvoGO はわずか 10 世代で安定して収束し、従来の EA、ベイズ最適化、強化学習ベース手法を含む幅広い最適化手法を大きく上回ることが示されました。コードは https://github.com/EMI-Group/evogo で公開されています。",
  },
  "We present EvoSort, a general-purpose adaptive parallel parallel sorting framework accessible at the Python level. EvoSort employs a Genetic Algorithm (GA) to automatically discover and refine critical parameters, including insertion sort thresholds and algorithm selection (e.g., versus LSD radix sort). By adapting continuously to input data and system architecture, EvoSort provides a drop-in replacement for standard Python routines like NumPy and Pandas. Experiments up to10 billion elements across nine data distributions and two hardware platforms demonstrate that EvoSort consistently outperforms competing methods. Results show speedups of up to 225x, exemplifying a powerful auto-tuning solution for large-scale data processing.": {
    zh: "本文提出 EvoSort，这是一种可在 Python 层直接使用的通用自适应并行排序框架。EvoSort 使用遗传算法（GA）自动发现并优化关键参数，包括插入排序阈值和算法选择（例如是否采用 LSD 基数排序）。通过持续适应输入数据特征和系统架构，EvoSort 可以作为 NumPy、Pandas 等标准 Python 排序流程的即插即用替代方案。作者在 9 类数据分布、2 种硬件平台、最多 100 亿个元素的实验中表明，EvoSort 能够稳定优于对比方法，最高实现 225 倍加速，展现出面向大规模数据处理的强大自动调优能力。",
    ja: "本論文では、Python レベルで利用できる汎用的な適応型並列ソート基盤 EvoSort を提案します。EvoSort は遺伝的アルゴリズム（GA）を用いて、挿入ソートのしきい値やアルゴリズム選択（たとえば LSD 基数ソートとの切り替え）などの重要パラメータを自動的に探索・改善します。入力データとシステム構成へ継続的に適応することで、EvoSort は NumPy や Pandas といった標準的な Python ルーチンのドロップイン置換として機能します。9 種類のデータ分布、2 つのハードウェア基盤、最大 100 億要素に及ぶ実験の結果、EvoSort は一貫して既存手法を上回り、最大 225 倍の高速化を示しました。これは大規模データ処理向けの強力な自動チューニング解であることを示しています。",
  },
  "Evolutionary Reinforcement Learning (EvoRL) has emerged as a promising approach to overcoming the limitations of traditional reinforcement learning (RL) by integrating the Evolutionary Computation (EC) paradigm with RL. However, the population-based nature of EC significantly increases computational costs, thereby restricting the exploration of algorithmic design choices and scalability in large-scale settings. To address this challenge, we introduce EvoRL 1, the first end-to-end EvoRL framework optimized for GPU acceleration. The framework executes the entire training pipeline on accelerators, including environment simulations and EC processes, leveraging hierarchical parallelism through vectorization and compilation techniques to achieve superior speed and scalability. This design enables the efficient training of large populations on a single machine. In addition to its performance-oriented design, EvoRL offers a comprehensive platform for EvoRL research, encompassing implementations of traditional RL algorithms (e.g., A2C, PPO, DDPG, TD3, SAC), Evolutionary Algorithms (e.g., CMA-ES, OpenES, ARS), and hybrid EvoRL paradigms such as Evolutionary-guided RL (e.g., ERL, CEM-RL) and Population-Based AutoRL (e.g., PBT). The framework's modular architecture and user-friendly interface allow researchers to seamlessly integrate new components, customize algorithms, and conduct fair benchmarking and ablation studies. The project is open-source and available at: https://github.com/EMI-Group/evorl.": {
    zh: "进化强化学习（EvoRL）通过把进化计算（EC）范式与强化学习（RL）结合起来，被视为突破传统 RL 局限的一条有前景的路线。然而，EC 的种群式特征会显著抬高计算成本，从而限制算法设计空间的探索和大规模场景下的可扩展性。为了解决这一问题，本文提出 EvoRL 1，这是首个面向 GPU 加速优化的端到端 EvoRL 框架。该框架把环境模拟和 EC 过程在内的整个训练流水线都运行在加速器上，并通过向量化与编译技术实现层次化并行，从而获得更强的速度与扩展性。这种设计使得在单机上高效训练大规模种群成为可能。除性能导向设计外，EvoRL 还提供了一个完整的 EvoRL 研究平台，覆盖传统 RL 算法（如 A2C、PPO、DDPG、TD3、SAC）、进化算法（如 CMA-ES、OpenES、ARS），以及演化引导 RL（如 ERL、CEM-RL）和基于种群的 AutoRL（如 PBT）等混合范式。框架的模块化架构和友好接口让研究者能够顺畅接入新组件、定制算法，并开展公平的基准测试与消融研究。项目已开源，地址为：https://github.com/EMI-Group/evorl。",
    ja: "進化的強化学習（EvoRL）は、進化計算（EC）の枠組みを強化学習（RL）へ統合することで、従来の RL の限界を乗り越える有望なアプローチとして注目されています。しかし EC の個体群ベースな性質は計算コストを大きく押し上げ、大規模設定におけるアルゴリズム設計の探索や拡張性を制約してきました。これに対処するため、本論文では GPU 加速に最適化された初のエンドツーエンド EvoRL フレームワーク EvoRL 1 を提案します。このフレームワークは、環境シミュレーションや EC 処理を含む学習パイプライン全体をアクセラレータ上で実行し、ベクトル化とコンパイルを通じた階層的並列性を活用することで、高い速度とスケーラビリティを実現します。これにより、単一マシン上で大規模個体群を効率的に学習させることが可能になります。性能面に加えて、EvoRL は A2C、PPO、DDPG、TD3、SAC といった従来 RL 手法、CMA-ES、OpenES、ARS などの進化的手法、さらに ERL や CEM-RL のような進化誘導型 RL、PBT のような Population-Based AutoRL まで含む包括的な研究基盤も提供します。モジュール化された設計と扱いやすいインターフェースにより、新しい要素の統合、アルゴリズムのカスタマイズ、公平なベンチマークやアブレーション研究が容易になります。プロジェクトはオープンソースで、https://github.com/EMI-Group/evorl にて公開されています。",
  },
  "NSGA-III is one of the most widely adopted algorithms for tackling many-objective optimization problems. However, its CPU-based design severely limits scalability and computational efficiency. To address the limitations, we propose TensorNSGA-III, a fully tensorized implementation of NSGA-III that leverages GPU parallelism for large-scale many-objective optimization. Unlike conventional GPU-accelerated evolutionary algorithms that rely on heuristic approximations to improve efficiency, TensorNSGA-III maintains the exact selection and variation mechanisms of NSGA-III while achieving significant acceleration. By reformulating the selection process with tensorized data structures and an optimized caching strategy, our approach effectively eliminates computational bottlenecks inherent in traditional CPU-based and naïve GPU implementations. Experimental results on widely used numerical benchmarks show that TensorNSGA-III achieves speedups of up to 3629× over the CPU version of NSGA-III. Additionally, we validate its effectiveness in multiobjective robotic control tasks, where it discovers diverse and high-quality behavioral solutions. Furthermore, we investigate the critical role of large population sizes in many-objective optimization and demonstrate the scalability of TensorNSGA-III in such scenarios. The source code is available at https://github.com/EMI-Group/evomo.": {
    zh: "NSGA-III 是解决多目标优化问题时最广泛采用的算法之一，但其基于 CPU 的设计严重限制了可扩展性和计算效率。为了解决这一局限，本文提出 TensorNSGA-III，这是一种完全张量化的 NSGA-III 实现，利用 GPU 并行来处理大规模多目标优化。与依赖启发式近似来换取效率的传统 GPU 加速进化算法不同，TensorNSGA-III 在获得显著加速的同时，保留了 NSGA-III 精确的选择与变异机制。通过用张量化数据结构重构选择过程，并结合优化后的缓存策略，该方法有效消除了传统 CPU 实现和朴素 GPU 实现中的计算瓶颈。广泛数值基准上的实验结果表明，TensorNSGA-III 相比 CPU 版 NSGA-III 最高可实现 3629 倍加速。作者还在多目标机器人控制任务中验证了其有效性，证明它能够发现多样且高质量的行为解。此外，论文还考察了大种群规模在多目标优化中的关键作用，并展示了 TensorNSGA-III 在这类场景下的可扩展性。源码地址为：https://github.com/EMI-Group/evomo。",
    ja: "NSGA-III は多目的最適化問題を扱ううえで最も広く用いられているアルゴリズムの一つですが、その CPU ベースの設計は拡張性と計算効率を大きく制限します。そこで本論文では、GPU 並列性を活用した完全テンソル化実装 TensorNSGA-III を提案します。効率向上のためにヒューリスティック近似へ頼る従来の GPU 加速進化アルゴリズムとは異なり、TensorNSGA-III は NSGA-III の厳密な選択・変異機構を保ったまま大幅な高速化を実現します。選択処理をテンソル化データ構造で再構成し、最適化されたキャッシュ戦略と組み合わせることで、従来の CPU 実装や素朴な GPU 実装に存在した計算ボトルネックを効果的に取り除いています。広く使われる数値ベンチマークでの実験では、TensorNSGA-III は CPU 版 NSGA-III に対して最大 3629 倍の高速化を達成しました。さらに多目的ロボット制御課題でも有効性を確認し、多様で高品質な行動解を発見できることを示しています。加えて、大規模個体群が多目的最適化で果たす重要な役割を検討し、そのような条件下でも TensorNSGA-III が高い拡張性を持つことを示しました。ソースコードは https://github.com/EMI-Group/evomo で公開されています。",
  },
  "The NeuroEvolution of Augmenting Topologies (NEAT) algorithm has received considerable recognition in the field of neuroevolution. Its effectiveness is derived from initiating with simple networks and incrementally evolving both their topologies and weights. Although its capability across various challenges is evident, the algorithm's computational efficiency remains an impediment, limiting its scalability potential. To address these limitations, this paper introduces TensorNEAT, a GPU-accelerated library that applies tensorization to the NEAT algorithm. Tensorization reformulates NEAT's diverse network topologies and operations into uniformly shaped tensors, enabling efficient parallel execution across entire populations. TensorNEAT is built upon JAX, leveraging automatic function vectorization and hardware acceleration to significantly enhance computational efficiency. In addition to NEAT, the library supports variants such as CPPN and HyperNEAT, and integrates with benchmark environments like Gym, Brax, and gymnax. Experimental evaluations across various robotic control environments in Brax demonstrate that TensorNEAT delivers up to 500x speedups compared to existing implementations, such as NEAT-Python. The source code for TensorNEAT is publicly available at: https://github.com/EMI-Group/tensorneat.": {
    zh: "拓扑增广神经进化（NEAT）算法在神经进化领域得到了广泛认可。它的有效性来自于从简单网络出发，逐步同时演化网络拓扑与权重。尽管它在多种挑战任务中的能力已经得到证明，但其计算效率依然是一个障碍，限制了进一步扩展。为解决这一问题，本文提出 TensorNEAT，一个把张量化思想应用到 NEAT 的 GPU 加速库。张量化将 NEAT 中多样化的网络拓扑和操作重构为统一形状的张量，从而实现对整个种群的高效并行执行。TensorNEAT 构建于 JAX 之上，借助自动函数向量化和硬件加速显著提升计算效率。除了 NEAT 本身，该库还支持 CPPN、HyperNEAT 等变体，并能与 Gym、Brax、gymnax 等基准环境集成。在 Brax 的多种机器人控制环境中的实验表明，相较于 NEAT-Python 等现有实现，TensorNEAT 最高可达到 500 倍加速。TensorNEAT 的源码已公开发布：https://github.com/EMI-Group/tensorneat。",
    ja: "NeuroEvolution of Augmenting Topologies（NEAT）アルゴリズムは、神経進化分野で広く認知されています。その有効性は、単純なネットワークから開始し、トポロジーと重みの両方を段階的に進化させる点にあります。さまざまな課題に対する能力は示されている一方で、計算効率の低さが依然として障害となり、拡張性を制約しています。これに対し本論文では、NEAT にテンソル化を適用した GPU 加速ライブラリ TensorNEAT を提案します。テンソル化によって、NEAT の多様なネットワーク構造と演算を一様な形状のテンソルへ再定式化し、個体群全体に対する効率的な並列実行を可能にします。TensorNEAT は JAX 上に構築されており、自動ベクトル化とハードウェア加速を活用して計算効率を大幅に改善します。NEAT に加えて、CPPN や HyperNEAT といった変種にも対応し、Gym、Brax、gymnax などのベンチマーク環境とも統合できます。Brax 上の複数のロボット制御環境での評価では、TensorNEAT は NEAT-Python など既存実装に対して最大 500 倍の高速化を達成しました。TensorNEAT のソースコードは https://github.com/EMI-Group/tensorneat で公開されています。",
  },
  "Useful because it frames the real frontier as an end-to-end workflow problem and not just another model comparison.": { zh: "它有价值，因为它把真正的前沿表述为端到端工作流问题，而不只是又一轮模型对比。", ja: "価値があるのは、真のフロンティアを単なるモデル比較ではなく、エンドツーエンドのワークフロー問題として捉えている点です。" },
  "Good lens for separating flashy demos from research systems that can actually operate under external constraints.": { zh: "这是区分花哨 demo 与真正能在外部约束下运行的研究系统的一个好视角。", ja: "派手なデモと、外部制約の下でも実際に動く研究システムを見分けるうえで良いレンズになります。" },
  "Directly relevant because it moves the conversation from abstract speedups to constrained, operationally realistic optimization.": { zh: "它之所以直接相关，是因为它把讨论从抽象加速比推进到了受约束、符合运维现实的优化问题上。", ja: "抽象的な速度向上の話から、制約付きで運用上も現実的な最適化へ議論を移している点で直接的に重要です。" },
  "Potentially useful as a map of where there is still room for a contribution that is both principled and implementable.": { zh: "它可能有用，因为它像一张地图，标出了哪些地方仍然存在既有原则性、又可实现的贡献空间。", ja: "原理的でありながら実装可能でもある貢献余地がどこに残っているかを示す地図として有用になり得ます。" },
  "This is close to the product we want to build, so it is strategically valuable even if the implementation is still rough.": { zh: "这与我们想做的产品很接近，因此即使实现还粗糙，也具有战略价值。", ja: "これは私たちが作りたいプロダクトに近いため、実装がまだ粗くても戦略的価値があります。" },
  "Useful for designing the UI layer so the product supports thinking, not just accumulation.": { zh: "它有助于设计 UI 层，使产品支持思考，而不只是信息堆积。", ja: "情報を積み上げるだけでなく、思考そのものを支える UI 層を設計するうえで役立ちます。" },
  Acquire: { zh: "采集", ja: "収集" },
  Digest: { zh: "消化", ja: "整理" },
  Synthesize: { zh: "综合", ja: "統合" },
  Act: { zh: "行动", ja: "実行" },
  "Search GitHub, paper feeds, lab sites, and watchlists; collect high-signal candidates instead of scraping the whole universe.": { zh: "搜索 GitHub、论文源、实验室主页和 watchlist，优先收集高信号候选，而不是试图抓完整个宇宙。", ja: "GitHub、論文フィード、研究室サイト、ウォッチリストを探索し、宇宙全体を無差別に集めるのではなく、高シグナル候補を収集します。" },
  "Score items, identify duplicates, extract why-this-matters notes, and move weak items out of the active lane early.": { zh: "给条目打分、识别重复、抽取“为什么重要”的说明，并尽早把弱信号移出活跃队列。", ja: "項目を採点し、重複を見つけ、「なぜ重要か」を抽出し、弱い項目を早めにアクティブレーンから外します。" },
  "Turn the daily evidence stream into trends, opportunity gaps, and concrete next-step research questions.": { zh: "把每日证据流转化为趋势、机会缺口和具体的下一步研究问题。", ja: "日々の証拠の流れを、トレンド、機会のギャップ、そして具体的な次の研究課題へ変換します。" },
  "Convert strong signals into reading queues, replication targets, idea notes, and realistic project directions.": { zh: "把强信号转化为阅读队列、复现实验目标、想法笔记和现实可行的项目方向。", ja: "強いシグナルを、読むべきキュー、再現対象、アイデアノート、現実的なプロジェクト方向へ変換します。" },
  "raw source hits": { zh: "原始来源命中", ja: "生のソースヒット" },
  "normalized metadata": { zh: "标准化元数据", ja: "正規化メタデータ" },
  "candidate PDF links": { zh: "候选 PDF 链接", ja: "候補 PDF リンク" },
  "scored cards": { zh: "评分卡片", ja: "採点済みカード" },
  "trend evidence": { zh: "趋势证据", ja: "トレンド証拠" },
  "team watch updates": { zh: "团队监测更新", ja: "チーム監視アップデート" },
  "trend map": { zh: "趋势图谱", ja: "トレンドマップ" },
  "insight memo": { zh: "洞察备忘录", ja: "インサイトメモ" },
  "contribution candidates": { zh: "候选贡献方向", ja: "候補となる貢献テーマ" },
  "download queue": { zh: "下载队列", ja: "ダウンロードキュー" },
  "agenda list": { zh: "议程列表", ja: "アジェンダ一覧" },
  "project seeds": { zh: "项目种子", ja: "プロジェクトの種" },
  "cron + browser": { zh: "cron + 浏览器", ja: "cron + ブラウザ" },
  "Codex summaries": { zh: "Codex 总结", ja: "Codex 要約" },
  "human reviewed": { zh: "人工复核", ja: "人手レビュー" },
  "mixed mode": { zh: "混合模式", ja: "混合モード" },
  "publisher landing page": { zh: "出版社落地页", ja: "出版社ランディングページ" },
  "conference PDF": { zh: "会议 PDF", ja: "会議 PDF" },
  "arXiv PDF": { zh: "arXiv PDF", ja: "arXiv PDF" },
  "must-read": { zh: "必读", ja: "必読" },
  monitor: { zh: "持续观察", ja: "監視" },
  archive: { zh: "归档", ja: "アーカイブ" },
  ready: { zh: "就绪", ja: "準備完了" },
  queued: { zh: "排队中", ja: "待機中" },
  manual: { zh: "手动", ja: "手動" },
  "queued for browser pull": { zh: "等待浏览器抓取", ja: "ブラウザ取得待ち" },
  "No tracked GitHub repository configured yet": { zh: "目前还没有配置要跟踪的 GitHub 仓库", ja: "追跡対象の GitHub リポジトリはまだ設定されていません" },
  "Unknown venue": { zh: "未知发表渠道", ja: "掲載先不明" },
  "manual review": { zh: "需要手动复核", ja: "手動レビュー" },
  "ready for auto-archive": { zh: "可自动归档", ja: "自動保存可能" },
  "Hong Kong": { zh: "香港", ja: "香港" },
  "United States": { zh: "美国", ja: "米国" },
  India: { zh: "印度", ja: "インド" },
};

const PATTERN_TRANSLATORS = [
  {
    regex: /^(\d+) EC-relevant works captured since ([0-9-]+)$/,
    render: (lang, count, date) =>
      ({
        zh: `自 ${date} 起已捕捉到 ${count} 篇 EC 相关论文`,
        ja: `${date} 以降に EC 関連論文を ${count} 件取得`,
      })[lang],
  },
  {
    regex: /^(\d+) tracked repos pushed in the last 120 days$/,
    render: (lang, count) =>
      ({
        zh: `最近 120 天内有 ${count} 个跟踪仓库发生更新`,
        ja: `直近 120 日で更新のあった追跡リポジトリは ${count} 件`,
      })[lang],
  },
  {
    regex: /^(\d+) recent multi-objective papers in the current capture$/,
    render: (lang, count) =>
      ({
        zh: `当前采集中有 ${count} 篇近期多目标论文`,
        ja: `今回の取得分には最近の多目的論文が ${count} 本`,
      })[lang],
  },
  {
    regex: /^(\d+) ready PDFs out of (\d+) captured papers$/,
    render: (lang, readyCount, totalCount) =>
      ({
        zh: `${totalCount} 篇已捕捉论文中有 ${readyCount} 篇 PDF 已就绪`,
        ja: `取得済み ${totalCount} 本のうち PDF 即取得可能なのは ${readyCount} 本`,
      })[lang],
  },
  {
    regex: /^OpenAlex h-index ([0-9.]+), 2yr mean citedness ([0-9.]+)$/,
    render: (lang, hIndex, meanCitedness) =>
      ({
        zh: `OpenAlex h-index ${hIndex}，近 2 年平均被引度 ${meanCitedness}`,
        ja: `OpenAlex h-index ${hIndex}、直近 2 年平均被引用度 ${meanCitedness}`,
      })[lang],
  },
  {
    regex: /^(.*?) \(([\d,]+)★, pushed ([0-9-]+)\)$/,
    render: (lang, repoName, stars, date) =>
      ({
        zh: `${repoName}（${stars}★，最近更新于 ${date}）`,
        ja: `${repoName}（${stars}★、最終更新 ${date}）`,
      })[lang],
  },
  {
    regex:
      /^(.*?) at (.*?) is worth watching for (.*?)\. The current feed captures (\d+) recent EC papers since ([0-9-]+)\.(?: Tracked code signal includes (.*)\.)?$/,
    render: (lang, name, institution, focus, count, date, repoSignal) => {
      if (lang === "zh") {
        return `${name}（${institution}）值得持续关注，重点方向是${localizeText(
          focus
        )}。当前信息流已抓取自 ${date} 以来的 ${count} 篇近期 EC 相关论文。${
          repoSignal ? `当前代码信号包括 ${localizeText(repoSignal)}。` : ""
        }`;
      }

      return `${name}（${institution}）は継続的に追う価値があります。焦点は${localizeText(
        focus
      )}です。現在のフィードでは ${date} 以降の最近の EC 論文を ${count} 件取得しています。${
        repoSignal ? `コード面のシグナルとして ${localizeText(repoSignal)} も確認できます。` : ""
      }`;
    },
  },
  {
    regex: /^(.*?) is still active around (.*?); this recent (.*?) paper is a strong EC signal\.$/,
    render: (lang, name, topic, venue) =>
      ({
        zh: `${name} 在${localizeText(topic)}方向上仍然很活跃；这篇近期发表于 ${localizeText(
          venue
        )} 的论文，是一个很强的 EC 信号。`,
        ja: `${name} は${localizeText(topic)}周辺でいまも活発であり、この最近の ${localizeText(
          venue
        )} 論文は強い EC シグナルです。`,
      })[lang],
  },
  {
    regex: /^(.*?) remains active in (.*?); this recent (.*?) paper is worth monitoring\.$/,
    render: (lang, name, focus, venue) =>
      ({
        zh: `${name} 在${localizeText(focus)}方面仍保持活跃；这篇近期发表于 ${localizeText(
          venue
        )} 的论文值得持续关注。`,
        ja: `${name} は${localizeText(focus)}において引き続き活発であり、この最近の ${localizeText(
          venue
        )} 論文は追って見る価値があります。`,
      })[lang],
  },
];

function loadInitialLanguage() {
  const pageLanguage =
    window.FRONTIER_RADAR_DEFAULT_LANGUAGE ||
    document.body?.dataset?.defaultLanguage ||
    document.documentElement?.lang?.toLowerCase();
  if (pageLanguage && UI_TEXT[pageLanguage]) {
    return pageLanguage;
  }

  const saved = readStoredValue(STORAGE_KEY_LANGUAGE) || readStoredValue(LEGACY_STORAGE_KEY_LANGUAGE);
  if (saved && UI_TEXT[saved]) {
    return saved;
  }

  const browserLanguage = navigator.language.toLowerCase();
  if (browserLanguage.startsWith("zh")) return "zh";
  if (browserLanguage.startsWith("ja")) return "ja";
  return "en";
}

function translatedThemeLabel(themeName) {
  return (
    {
      tohoku: ui("themeTohokuLabel"),
      toyama: ui("themeToyamaLabel"),
      usst: ui("themeUsstLabel"),
    }[themeName] || THEME_CATALOG.tohoku.label
  );
}

function loadInitialTheme() {
  const queryTheme = new URLSearchParams(window.location.search).get("theme");
  if (queryTheme && THEME_CATALOG[queryTheme]) {
    return queryTheme;
  }

  const defaultTheme =
    window.FRONTIER_RADAR_DEFAULT_THEME ||
    document.documentElement?.dataset?.theme ||
    "tohoku";

  const savedTheme = readStoredValue(STORAGE_KEY_THEME);
  if (savedTheme && THEME_CATALOG[savedTheme]) {
    return savedTheme;
  }

  return THEME_CATALOG[defaultTheme] ? defaultTheme : "tohoku";
}

const LOCALE_CATALOG = {
  en: { label: "En", name: "English", lang: "en" },
  zh: { label: "中", name: "中文", lang: "zh-CN" },
  ja: { label: "日", name: "日本語", lang: "ja" },
};

let localeUiBound = false;
let themeUiBound = false;
let switcherHoverBound = false;
let scrollTopUiBound = false;
let metricCopyUiBound = false;
let topnavMenuBound = false;
let topnavOverflowBound = false;
let headerControlsPositionBound = false;
const switcherCloseTimers = new WeakMap();

function currentLocale() {
  return (
    window.FRONTIER_RADAR_DEFAULT_LANGUAGE ||
    document.body?.dataset?.defaultLanguage ||
    state.language ||
    "en"
  );
}

function nextLocaleName(currentLanguage = state.language || currentLocale()) {
  const sequence = Object.keys(LOCALE_CATALOG);
  const pointer = sequence.indexOf(currentLanguage);
  if (pointer === -1) {
    return sequence[0] || "en";
  }
  return sequence[(pointer + 1) % sequence.length];
}

function nextThemeName(currentTheme = state.theme || loadInitialTheme()) {
  const sequence = Object.keys(THEME_CATALOG);
  const pointer = sequence.indexOf(currentTheme);
  if (pointer === -1) {
    return sequence[0] || "tohoku";
  }
  return sequence[(pointer + 1) % sequence.length];
}

function pageFilename(page = currentPage()) {
  return page === "overview" ? "index.html" : `${page}.html`;
}

function localePageHref(targetLocale, page = currentPage()) {
  const activeLocale = currentLocale();
  const filename = pageFilename(page);

  if (activeLocale === targetLocale) {
    return `./${filename}`;
  }
  if (activeLocale === "en" && targetLocale !== "en") {
    return `./${targetLocale}/${filename}`;
  }
  if (activeLocale !== "en" && targetLocale === "en") {
    return `../${filename}`;
  }
  return `../${targetLocale}/${filename}`;
}

function assetBasePath() {
  return currentLocale() === "en" ? "." : "..";
}

function byId(id) {
  return document.getElementById(id);
}

function setText(id, value) {
  const node = byId(id);
  if (node) {
    node.textContent = value;
  }
}

function setAttr(id, attr, value) {
  const node = byId(id);
  if (node) {
    node.setAttribute(attr, value);
  }
}

function setProp(id, prop, value) {
  const node = byId(id);
  if (node) {
    node[prop] = value;
  }
}

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function escapeHtml(value) {
  const container = document.createElement("div");
  container.textContent = value === undefined || value === null ? "" : String(value);
  return container.innerHTML;
}

const ICON_PATHS = {
  copy: "M16 1H6a2 2 0 0 0-2 2v12h2V3h10V1zm3 4H10a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 16H10V7h9v14z",
  code: "M8.7 16.6 3.1 12l5.6-4.6 1.3 1.5L6.2 12l3.8 3.1-1.3 1.5zm6.6 0-1.3-1.5 3.8-3.1-3.8-3.1 1.3-1.5 5.6 4.6-5.6 4.6z",
  home: "M3 11.2 12 4l9 7.2V21h-6v-6H9v6H3v-9.8z",
  menu: "M4 7h16v2H4V7zm0 4h16v2H4v-2zm0 4h16v2H4v-2z",
  up: "M12 5.5l-6 6 1.4 1.4 3.6-3.6V19h2V9.3l3.6 3.6 1.4-1.4-6-6z",
};

const OFFICIAL_DOCS_BASE = "/assets/docs/official";
const METRIC_OFFICIAL_PAGE_LABEL = "Official Page";
const METRIC_PUBLIC_EVIDENCE_LABEL = "Public Evidence";
const JCR_OFFICIAL_SEARCH_URL = "https://jcr.clarivate.com/jcr/home";
const CAS_OFFICIAL_ARCHIVE_URL = `${OFFICIAL_DOCS_BASE}/cas_journal_ranking_explanation_official.pdf`;
const CCF_OFFICIAL_ARCHIVE_URL = `${OFFICIAL_DOCS_BASE}/ccf_recommended_venues_2022_official.pdf`;
const CCF_PUBLIC_EVIDENCE_URL = `${OFFICIAL_DOCS_BASE}/ccf_recommended_venues_portal_official.html`;

function iconSvg(name, className = "ui-icon") {
  const path = ICON_PATHS[name];
  if (!path) return "";
  return `<svg class="${escapeHtml(className)}" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="${path}" fill="currentColor"></path></svg>`;
}

function ui(key) {
  return UI_TEXT[state.language][key] || UI_TEXT.en[key] || "";
}

function plainTextByLanguage(values) {
  return values[state.language] || values.en;
}

function localizedFieldValue(value) {
  if (!value || Array.isArray(value) || typeof value !== "object") {
    return null;
  }

  const localized = value[state.language] ?? value.en ?? value.zh ?? value.ja;
  return localized === undefined || localized === null ? null : String(localized);
}

function normalizeUrl(value) {
  if (value === undefined || value === null) {
    return null;
  }
  const normalized = String(value).trim();
  return normalized || null;
}

function buildMetricOptions(definitions) {
  const seen = new Set();
  return definitions.filter((option) => {
    const href = normalizeUrl(option?.href);
    if (!href || seen.has(href)) {
      return false;
    }
    seen.add(href);
    option.href = href;
    return true;
  });
}

function publicationPrimaryUrl(item) {
  return normalizeUrl(item?.paper_url || item?.paperUrl || item?.publisher_url || item?.publisherUrl || item?.url)
    || (normalizeUrl(item?.doi) ? `https://doi.org/${normalizeUrl(item.doi)}` : "");
}

function publicationMetricYear(item, metricKind) {
  const verification = item?.verification || {};
  const metricYear = verification?.[`${metricKind}_year`];
  if (metricYear !== undefined && metricYear !== null && metricYear !== "") {
    return String(metricYear);
  }

  return normalizeUrl(item?.year) || normalizeUrl(item?.publicationYear) || "";
}

function publicationMetricVenue(item) {
  return normalizeUrl(item?.venue || item?.journal || item?.booktitle) || "";
}

function isClarivateJournalProfileUrl(url = "") {
  const value = normalizeUrl(url);
  return Boolean(value && /jcr\.clarivate\.com\/jcr(?:-jp)?\/journal-profile/i.test(value));
}

function isClarivateSearchUrl(url = "") {
  const value = normalizeUrl(url);
  return Boolean(
    value
    && (
      /mjl\.clarivate\.com\/search-results/i.test(value)
      || /jcr\.clarivate\.com\/jcr(?:-jp)?\/home/i.test(value)
      || /clarivate\.com\/search-results/i.test(value)
    )
  );
}

function isFenqubiaoJournalDetailUrl(url = "") {
  const value = normalizeUrl(url);
  return Boolean(value && /fenqubiao\.com\/Core\/JournalDetail\.aspx/i.test(value));
}

function isFenqubiaoPlatformUrl(url = "") {
  const value = normalizeUrl(url);
  return Boolean(value && /fenqubiao\.com/i.test(value) && !isFenqubiaoJournalDetailUrl(value));
}

function buildFenqubiaoJournalDetailUrl(venue = "", year = "") {
  const normalizedVenue = normalizeUrl(venue);
  const normalizedYear = normalizeUrl(year);
  if (!normalizedVenue || !normalizedYear) {
    return "";
  }

  return `https://www.fenqubiao.com/Core/JournalDetail.aspx?t=${encodeURIComponent(normalizedVenue)}&y=${encodeURIComponent(normalizedYear)}`;
}

function directMetricUrl(url = "", metricKind = "") {
  const value = normalizeUrl(url);
  if (!value) {
    return "";
  }

  if (metricKind === "cas") {
    return isFenqubiaoPlatformUrl(value) ? "" : value;
  }

  if (metricKind === "impact" || metricKind === "jcr") {
    if (isClarivateJournalProfileUrl(value)) {
      return value;
    }
    return isClarivateSearchUrl(value) ? "" : value;
  }

  return value;
}

function metricSearchFallbackUrl(url = "", metricKind = "") {
  const value = normalizeUrl(url);
  if (!value) {
    return "";
  }

  if (metricKind === "impact" || metricKind === "jcr") {
    return isClarivateSearchUrl(value) ? value : "";
  }

  if (metricKind === "cas") {
    return isFenqubiaoPlatformUrl(value) ? value : "";
  }

  return "";
}

function metricYearNumber(value) {
  const parsed = Number.parseInt(String(value || ""), 10);
  return Number.isFinite(parsed) ? parsed : null;
}

function metricLinkBundle(paper, metricKind) {
  const metrics = paper?.metrics || {};
  const verification = paper?.verification || {};
  const venue = publicationMetricVenue(paper);

  if (metricKind === "impact") {
    return {
      officialLabel: METRIC_OFFICIAL_PAGE_LABEL,
      officialUrl: "",
      publicUrl: normalizeUrl(verification.if_public_source_url || metrics.ifPublicSourceUrl || verification.if_supporting_source_url || metrics.sourceUrl),
      searchFallbackUrl: JCR_OFFICIAL_SEARCH_URL,
      searchCopyText: verification.if_search_copy_text || metrics.ifSearchCopyText || paper?.venue || "",
      searchTooltip: ui("openJcrSearchCopyLabel"),
      searchCopySuccessLabel: ui("copiedJournalNameLabel"),
    };
  }

  if (metricKind === "jcr") {
    return {
      officialLabel: METRIC_OFFICIAL_PAGE_LABEL,
      officialUrl: "",
      publicUrl: normalizeUrl(
        verification.jcr_public_source_url
        || metrics.jcrPublicSourceUrl
        || verification.jcr_supporting_source_url
        || verification.if_public_source_url
        || metrics.ifPublicSourceUrl
      ),
      searchFallbackUrl: JCR_OFFICIAL_SEARCH_URL,
      searchCopyText: verification.jcr_search_copy_text || metrics.jcrSearchCopyText || verification.if_search_copy_text || metrics.ifSearchCopyText || paper?.venue || "",
      searchTooltip: ui("openJcrSearchCopyLabel"),
      searchCopySuccessLabel: ui("copiedJournalNameLabel"),
    };
  }

  if (metricKind === "cas") {
    return {
      officialLabel: METRIC_OFFICIAL_PAGE_LABEL,
      officialUrl: CAS_OFFICIAL_ARCHIVE_URL,
      publicUrl: normalizeUrl(
        verification.cas_public_source_url
        || metrics.casPublicSourceUrl
        || verification.cas_supporting_source_url
        || metrics.casSupportingSourceUrl
        || verification.cas_source_url
        || metrics.casSourceUrl
      ),
      searchFallbackUrl: "",
      searchCopyText: "",
      searchTooltip: "",
      searchCopySuccessLabel: "",
    };
  }

  return {
    officialLabel: "",
    officialUrl: "",
    publicUrl: "",
    searchFallbackUrl: "",
    searchCopyText: "",
    searchTooltip: "",
    searchCopySuccessLabel: "",
  };
}

function metricOptionsForDirectLinks(paper, metricKind) {
  const bundle = metricLinkBundle(paper, metricKind);
  const options = [];
  const officialFallbackOption = !bundle.officialUrl && bundle.searchFallbackUrl
    ? {
        label: METRIC_OFFICIAL_PAGE_LABEL,
        href: bundle.searchFallbackUrl,
        copyText: bundle.searchCopyText,
        tooltip: bundle.searchTooltip,
        copySuccessLabel: bundle.searchCopySuccessLabel,
      }
    : null;

  if (bundle.officialUrl) {
    options.push({
      label: METRIC_OFFICIAL_PAGE_LABEL,
      href: bundle.officialUrl,
    });
  } else if (metricKind !== "cas" && officialFallbackOption) {
    options.push(officialFallbackOption);
  }

  if (bundle.publicUrl) {
    options.push({
      label: METRIC_PUBLIC_EVIDENCE_LABEL,
      href: bundle.publicUrl,
    });
  }

  return buildMetricOptions(options);
}

function isScholarProfileCitationUrl(url = "") {
  const value = normalizeUrl(url);
  return Boolean(value && /scholar\.google\.com\/citations\?user=/i.test(value));
}

function isGoogleScholarDirectUrl(url = "") {
  const value = normalizeUrl(url);
  return Boolean(value && /scholar\.google\./i.test(value) && !isScholarProfileCitationUrl(value));
}

function isOpenAlexDirectUrl(url = "") {
  const value = normalizeUrl(url);
  return Boolean(value && /openalex\.org\//i.test(value));
}

function isSemanticScholarDirectUrl(url = "") {
  const value = normalizeUrl(url);
  return Boolean(value && /semanticscholar\.org\//i.test(value));
}

function buildGoogleScholarCitationUrl(item) {
  const direct = normalizeUrl(item?.citation_sources?.google_scholar?.url);
  const mode = normalizeUrl(item?.citation_sources?.google_scholar?.mode);
  if (direct && mode === "direct" && isGoogleScholarDirectUrl(direct)) {
    return direct;
  }

  return buildScholarCitationSearchUrl(item);
}

function buildScholarCitationSearchUrl(item) {
  const doi = normalizeUrl(item?.doi);
  if (doi) {
    return `https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=${encodeURIComponent(doi)}`;
  }

  const title = normalizeUrl(item?.title);
  if (!title) {
    return "";
  }
  return `https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=${encodeURIComponent(`"${title}"`)}`;
}

function buildOpenAlexCitationUrl(item) {
  const direct = normalizeUrl(item?.citation_sources?.openalex?.url || item?.openAlexUrl);
  const mode = normalizeUrl(item?.citation_sources?.openalex?.mode);
  if (direct && mode === "direct" && isOpenAlexDirectUrl(direct)) {
    return direct;
  }

  const doi = normalizeUrl(item?.doi);
  if (doi) {
    return `https://openalex.org/works?search=${encodeURIComponent(`doi:${doi}`)}`;
  }

  const title = normalizeUrl(item?.title);
  if (!title) {
    return "";
  }
  return `https://openalex.org/works?search=${encodeURIComponent(`"${title}"`)}`;
}

function buildSemanticScholarCitationUrl(item) {
  const direct = normalizeUrl(item?.citation_sources?.semantic_scholar?.url);
  const mode = normalizeUrl(item?.citation_sources?.semantic_scholar?.mode);
  if (direct && mode === "direct" && isSemanticScholarDirectUrl(direct)) {
    return direct;
  }

  const doi = normalizeUrl(item?.doi);
  if (doi) {
    return `https://www.semanticscholar.org/search?q=${encodeURIComponent(doi)}`;
  }

  const title = normalizeUrl(item?.title);
  if (!title) {
    return "";
  }
  return `https://www.semanticscholar.org/search?q=${encodeURIComponent(`"${title}"`)}`;
}

function publicationCitationUrl(item) {
  const scholarSource = normalizeUrl(item?.citation_sources?.google_scholar?.url);
  const scholarMode = normalizeUrl(item?.citation_sources?.google_scholar?.mode);
  if (scholarSource && scholarMode === "direct" && isGoogleScholarDirectUrl(scholarSource)) {
    return scholarSource;
  }

  const openAlexDirect = normalizeUrl(item?.openAlexUrl || item?.citation_sources?.openalex?.url);
  const openAlexMode = normalizeUrl(item?.citation_sources?.openalex?.mode);
  if (openAlexDirect && (!openAlexMode || openAlexMode === "direct") && isOpenAlexDirectUrl(openAlexDirect)) {
    return openAlexDirect;
  }

  const semanticSource = normalizeUrl(item?.citation_sources?.semantic_scholar?.url);
  const semanticMode = normalizeUrl(item?.citation_sources?.semantic_scholar?.mode);
  if (semanticSource && semanticMode === "direct" && isSemanticScholarDirectUrl(semanticSource)) {
    return semanticSource;
  }

  const sourceUrl = normalizeUrl(item?.citation_source_url || item?.citationSourceUrl);
  if (sourceUrl && (isGoogleScholarDirectUrl(sourceUrl) || isOpenAlexDirectUrl(sourceUrl) || isSemanticScholarDirectUrl(sourceUrl))) {
    return sourceUrl;
  }

  return buildGoogleScholarCitationUrl(item);
}

function metricOptionsForPaper(paper, metricKind) {
  if (metricKind === "impact") {
    return metricOptionsForDirectLinks(paper, "impact");
  }

  if (metricKind === "jcr") {
    return metricOptionsForDirectLinks(paper, "jcr");
  }

  if (metricKind === "cas") {
    return metricOptionsForDirectLinks(paper, "cas");
  }

  if (metricKind === "citation") {
    const citationSources = paper?.citation_sources || {};
    const scholar = citationSources.google_scholar || {};
    const openalex = citationSources.openalex || {};
    const semantic = citationSources.semantic_scholar || {};
    return buildMetricOptions([
      {
        label: "Google Scholar",
        href: buildGoogleScholarCitationUrl(paper),
        copyText: normalizeUrl(scholar.mode) === "search" ? normalizeUrl(scholar.copy_text) : "",
        tooltip: normalizeUrl(scholar.mode) === "search" && normalizeUrl(scholar.copy_text) ? ui("openSearchCopyLabel") : "",
        copySuccessLabel:
          normalizeUrl(scholar.mode) === "search" ? ui("copiedSearchQueryLabel") : "",
      },
      {
        label: "OpenAlex",
        href: buildOpenAlexCitationUrl(paper),
        copyText: normalizeUrl(openalex.mode) === "search" ? normalizeUrl(openalex.copy_text) : "",
        tooltip: normalizeUrl(openalex.mode) === "search" && normalizeUrl(openalex.copy_text) ? ui("openSearchCopyLabel") : "",
        copySuccessLabel:
          normalizeUrl(openalex.mode) === "search" ? ui("copiedSearchQueryLabel") : "",
      },
      {
        label: "Semantic Scholar (S2)",
        href: buildSemanticScholarCitationUrl(paper),
        copyText: normalizeUrl(semantic.mode) === "search" ? normalizeUrl(semantic.copy_text) : "",
        tooltip: normalizeUrl(semantic.mode) === "search" && normalizeUrl(semantic.copy_text) ? ui("openSearchCopyLabel") : "",
        copySuccessLabel:
          normalizeUrl(semantic.mode) === "search" ? ui("copiedSearchQueryLabel") : "",
      },
    ]);
  }

  return [];
}

function localizeText(value) {
  if (value === undefined || value === null) {
    return value;
  }

  const localizedField = localizedFieldValue(value);
  if (localizedField !== null) {
    return localizedField;
  }

  const text = String(value);
  if (state.language === "en") {
    return text;
  }

  for (const translator of PATTERN_TRANSLATORS) {
    const match = text.match(translator.regex);
    if (match) {
      return translator.render(state.language, ...match.slice(1));
    }
  }

  return EXACT_TRANSLATIONS[text]?.[state.language] || text;
}

function buildExternalLinkHtml(label, href) {
  const normalizedHref = String(href || "").trim();
  if (!normalizedHref) {
    return escapeHtml(label || "");
  }

  return `<a class="inline-link" href="${escapeHtml(normalizedHref)}" target="_blank" rel="noreferrer">${escapeHtml(
    label || normalizedHref
  )}</a>`;
}

function formatRichText(value) {
  const rawValue = localizeText(value);
  const rawText = rawValue === undefined || rawValue === null ? "" : String(rawValue);
  if (!rawText) {
    return "";
  }

  const tokens = [];
  const stash = (html) => {
    const token = `%%HTMLTOKEN${tokens.length}%%`;
    tokens.push({ token, html });
    return token;
  };

  let safe = rawText;
  safe = safe.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, (_, label, href) => stash(buildExternalLinkHtml(label, href)));
  safe = safe.replace(/(^|[\s(>])((https?:\/\/|www\.)[^\s<)]+[^\s<.,;:!?])/g, (match, prefix, href) => {
    const normalizedHref = href.startsWith("www.") ? `https://${href}` : href;
    return `${prefix}${stash(buildExternalLinkHtml(href, normalizedHref))}`;
  });

  safe = escapeHtml(safe).replace(/\n/g, "<br>");
  safe = safe.replace(/\+\+(.+?)\+\+/g, '<strong class="accent-strong">$1</strong>');
  safe = safe.replace(/\^\^(.+?)\^\^/g, '<span class="accent-inline">$1</span>');
  safe = safe.replace(/==(.+?)==/g, '<span class="warm-inline-emphasis">$1</span>');
  safe = safe.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

  tokens.forEach(({ token, html }) => {
    safe = safe.replaceAll(token, html);
  });

  return safe;
}

function richTextHtml(value, options = {}) {
  const localized = localizeText(value);
  const text = options.truncate ? truncateText(localized || "", options.truncate) : localized;
  return formatRichText(text);
}

function setRichHtml(id, value, options = {}) {
  const node = byId(id);
  if (node) {
    node.innerHTML = richTextHtml(value, options);
  }
}

function publicationCopyActionLabel(format) {
  return format === "bibtex" ? ui("copyBibtexAction") : ui("copyCitationAction");
}

function publicationCopySuccessLabel(format) {
  return format === "bibtex" ? ui("copiedBibtexLabel") : ui("copiedCitationLabel");
}

function publicationCopyMenuLabel() {
  return ui("copyMenuLabel");
}

function domainData() {
  return window.FRONTIER_DATA || {
    snapshot: {},
    domains: [],
    trendMap: [],
    teams: [],
    papers: [],
    workflow: [],
    downloadQueue: [],
  };
}

function papersForDomain(domainId = state.activeDomainId) {
  return domainData().papers.filter((paper) => paper.domainId === domainId);
}

function related(items) {
  return items.filter((item) => item.domainId === state.activeDomainId);
}

function activeDomain() {
  const data = domainData();
  return data.domains.find((domain) => domain.id === state.activeDomainId) || data.domains[0];
}

function localArchiveEntry(paperId) {
  return state.localArchiveIndex[paperId] || null;
}

function currentPage() {
  return document.body?.dataset?.page || "overview";
}

function currentPageTitle() {
  const page = currentPage();
  const pageKey = {
    overview: null,
    papers: "navPapers",
    signals: "navSignals",
    teams: "navTeams",
    downloads: "navDownloads",
    guide: "navGuide",
  }[page];

  if (!pageKey) {
    return ui("pageTitle");
  }

  return `${ui("pageTitle")} · ${ui(pageKey)}`;
}

function markCurrentPage() {
  const page = currentPage();
  Object.entries(PAGE_PATHS).forEach(([key, href]) => {
    const navId = `nav${key.charAt(0).toUpperCase()}${key.slice(1)}`;
    const link = byId(navId);
    if (!link) return;
    link.setAttribute("href", href);
    if (key === page) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function chooseDefaultDomain() {
  const data = domainData();
  const saved = readStoredValue(STORAGE_KEY_DOMAIN);
  if (saved && data.domains.some((domain) => domain.id === saved)) {
    return saved;
  }

  return [...data.domains]
    .sort((left, right) => {
      const paperDelta = papersForDomain(right.id).length - papersForDomain(left.id).length;
      if (paperDelta !== 0) return paperDelta;
      return (right.momentum || 0) - (left.momentum || 0);
    })[0]?.id;
}

function setMetaLanguage() {
  document.documentElement.lang = ui("htmlLang");
  document.body.dataset.lang = state.language;
  document.title = currentPageTitle();
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute("content", ui("pageDescription"));
  }
}

function filterToolbarLabel() {
  return plainTextByLanguage({
    en: "Filters",
    zh: "筛选",
    ja: "フィルター",
  });
}

function statusPanelTitle() {
  return plainTextByLanguage({
    en: "Snapshot & Queue",
    zh: "快照与队列",
    ja: "スナップショットとキュー",
  });
}

function localizePrioritySummary(priority, momentum) {
  if (state.language === "zh") {
    return `${localizeText(priority)}优先级，势能 ${momentum}/100`;
  }

  if (state.language === "ja") {
    return `優先度 ${localizeText(priority)} · 勢い ${momentum}/100`;
  }

  return `${String(priority).toUpperCase()} priority · Momentum ${momentum}/100`;
}

function metricValue(value) {
  if (value === "__not_listed__") return ui("notListedMetric");
  return value === undefined || value === null || value === "" ? ui("pendingMetric") : String(value);
}

function truncateText(value, limit = 420) {
  const text = String(value || "").replace(/\s+/g, " ").trim();
  if (!text) return "";
  return text.length > limit ? `${text.slice(0, limit - 1)}…` : text;
}

function renderStaticText() {
  setMetaLanguage();
  [
    ["navOverview", ui("navOverview")],
    ["navPapers", ui("navPapers")],
    ["navSignals", ui("navSignals")],
    ["navTeams", ui("navTeams")],
    ["navDownloads", ui("navDownloads")],
    ["navGuide", ui("navGuide")],
    ["heroEyebrow", ui("heroEyebrow")],
    ["domainSwitcherLabelText", ui("domainSwitcherLabel")],
    ["activeFocusLabel", ui("activeFocusLabel")],
    ["statusCardTitle", statusPanelTitle()],
    ["domainsKicker", ui("domainsKicker")],
    ["domains-title", ui("domainsTitle")],
    ["whyThisDomainMattersLabel", ui("whyThisDomainMatters")],
    ["signalsToWatchLabel", ui("signalsToWatch")],
    ["watchSignalsTitle", ui("whatShouldTriggerActionNext")],
    ["paperLaneKicker", ui("paperLaneKicker")],
    ["papers-title", ui("papersTitle")],
    ["papersNote", ui("papersNote")],
    ["filterToolbarLabel", filterToolbarLabel()],
    ["statusFieldLabel", ui("statusFieldLabel")],
    ["searchFieldLabel", ui("searchFieldLabel")],
    ["statusOptionAll", ui("statusOptionAll")],
    ["statusOptionMustRead", ui("statusOptionMustRead")],
    ["statusOptionMonitor", ui("statusOptionMonitor")],
    ["statusOptionArchive", ui("statusOptionArchive")],
    ["trendKicker", ui("trendKicker")],
    ["trend-title", ui("trendTitle")],
    ["teamsKicker", ui("teamsKicker")],
    ["teams-title", ui("teamsTitle")],
    ["teamsNote", ui("teamsNote")],
    ["downloadKicker", ui("downloadKicker")],
    ["download-title", ui("downloadTitle")],
    ["guideKicker", ui("guideKicker")],
    ["guide-title", ui("guideTitle")],
    ["guideNote", ui("guideNote")],
    ["workflow-title", ui("workflowTitle")],
    ["footerBackHome", ui("brandTitle")],
  ].forEach(([id, value]) => setText(id, value));
  markCurrentPage();
  document.querySelectorAll(".header-controls").forEach((node) => node.setAttribute("aria-label", ui("displayControlsLabel")));
  document.querySelectorAll(".locale-switcher").forEach((node) => node.setAttribute("aria-label", ui("languageLabel")));
  document.querySelectorAll(".theme-switcher").forEach((node) => node.setAttribute("aria-label", ui("themeLabel")));
  document.querySelectorAll(".topnav").forEach((node) => node.setAttribute("aria-label", ui("primaryNavigationLabel")));
  document.querySelectorAll("[data-topnav-toggle]").forEach((button) => {
    const expanded = button.getAttribute("aria-expanded") === "true";
    const label = button.querySelector(".topnav-toggle-label");
    if (label) {
      label.textContent = ui("menuLabel");
    }
    button.setAttribute("aria-label", expanded ? ui("hideMenuLabel") : ui("showMenuLabel"));
    button.setAttribute("title", ui("menuLabel"));
  });
  document.querySelectorAll("#heroShortcuts").forEach((node) => node.setAttribute("aria-label", ui("quickLinksLabel")));
  setAttr("footerBackHome", "href", PAGE_PATHS.overview);
  setProp("paperSearch", "placeholder", ui("searchPlaceholder"));
  setAttr("scrollTopButton", "aria-label", ui("backToTop"));
}

function renderLocaleSwitcher() {
  const switcher = byId("localeSwitcher");
  if (!switcher) return;

  const activeLocale = LOCALE_CATALOG[state.language] || LOCALE_CATALOG.en;
  const tray = el("div", "locale-tray");
  tray.setAttribute("role", "group");
  tray.setAttribute("aria-label", ui("languageChoicesLabel"));

  Object.entries(LOCALE_CATALOG).forEach(([localeName, locale]) => {
    const link = el("a", `locale-chip${localeName === state.language ? " is-active" : ""}`);
    link.href = localePageHref(localeName);
    link.dataset.localeChoice = localeName;
    link.setAttribute("aria-label", locale.name);
    link.title = locale.name;
    if (localeName === state.language) {
      link.setAttribute("aria-current", "page");
    }
    link.appendChild(el("span", "locale-label", locale.label));
    link.addEventListener("click", () => {
      writeStoredValue(STORAGE_KEY_LANGUAGE, localeName);
      writeStoredValue(LEGACY_STORAGE_KEY_LANGUAGE, localeName);
    });
    tray.appendChild(link);
  });

  switcher.innerHTML = "";
  const trigger = el("button", "locale-trigger");
  trigger.type = "button";
  trigger.dataset.localeTrigger = "true";
  trigger.setAttribute("aria-haspopup", "true");
  trigger.setAttribute("aria-expanded", switcher.classList.contains("is-open") ? "true" : "false");
  trigger.setAttribute("aria-label", ui("cycleLanguagesLabel") || ui("showLanguagesLabel"));
  trigger.title = ui("cycleLanguagesLabel") || ui("showLanguagesLabel");
  trigger.appendChild(el("span", "locale-label", activeLocale.label));

  switcher.appendChild(trigger);
  switcher.appendChild(tray);
  renderPortalReturnControl();
}

function renderThemeSwitcher() {
  const switcher = byId("themeSwitcher");
  if (!switcher) return;

  const activeThemeName = state.theme && THEME_CATALOG[state.theme] ? state.theme : "tohoku";
  const activeTheme = THEME_CATALOG[activeThemeName];
  const tray = el("div", "theme-tray");
  tray.setAttribute("role", "group");
  tray.setAttribute("aria-label", ui("themeChoicesLabel"));

  Object.entries(THEME_CATALOG).forEach(([themeName, theme]) => {
    const button = el("button", `theme-chip${themeName === activeThemeName ? " is-active" : ""}`);
    button.type = "button";
    button.dataset.themeChoice = themeName;
    button.setAttribute("aria-pressed", themeName === activeThemeName ? "true" : "false");
    button.setAttribute("aria-label", translatedThemeLabel(themeName));
    button.title = translatedThemeLabel(themeName);
    const swatch = el("span", `theme-swatch ${theme.swatchClass}`);
    swatch.setAttribute("aria-hidden", "true");
    button.appendChild(swatch);
    button.addEventListener("click", () => applyTheme(themeName));
    tray.appendChild(button);
  });

  switcher.innerHTML = "";
  const trigger = el("button", "theme-trigger");
  trigger.type = "button";
  trigger.dataset.themeTrigger = "true";
  trigger.setAttribute("aria-haspopup", "true");
  trigger.setAttribute("aria-expanded", switcher.classList.contains("is-open") ? "true" : "false");
  trigger.setAttribute("aria-label", ui("cycleThemesLabel") || ui("showThemesLabel"));
  trigger.title = ui("cycleThemesLabel") || ui("showThemesLabel");
  const currentSwatch = el("span", `theme-swatch ${activeTheme.swatchClass}`);
  currentSwatch.dataset.themeCurrentSwatch = "true";
  currentSwatch.setAttribute("aria-hidden", "true");
  trigger.appendChild(currentSwatch);

  switcher.appendChild(trigger);
  switcher.appendChild(tray);
  renderPortalReturnControl();
}

function renderPortalReturnControl() {
  const controls = document.querySelector(".header-controls");
  if (!controls) return;

  const locale = currentLocale();
  const labels = {
    en: {
      trigger: "Open portal menu",
      tray: "Site sections",
      portal: "Homepage portal",
      academic: "Academic homepage",
      radar: "Frontier Radar",
      jsps: "JSPS KAKENHI",
    },
    zh: {
      trigger: "打开功能主页菜单",
      tray: "功能主页",
      portal: "主页导航",
      academic: "学术主页",
      radar: "前沿雷达",
      jsps: "JSPS 科研费",
    },
    ja: {
      trigger: "機能ページメニューを開く",
      tray: "機能ページ",
      portal: "ホームポータル",
      academic: "学術ホームページ",
      radar: "フロンティアレーダー",
      jsps: "JSPS 科研費",
    },
  }[locale] || {
    trigger: "Open portal menu",
    tray: "Site sections",
    portal: "Homepage portal",
    academic: "Academic homepage",
    radar: "Frontier Radar",
    jsps: "JSPS KAKENHI",
  };

  const currentPath = window.location.pathname;
  const items = [
    {
      href: "/",
      label: labels.portal,
      icon: iconSvg("home"),
      active: currentPath === "/",
    },
    {
      href: "/academic/",
      label: labels.academic,
      icon: '<img class="portal-chip-logo" src="/assets/images/favicon-portrait.png" alt="" loading="lazy" />',
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

  controls.querySelectorAll(".portal-return-link").forEach((node) => node.remove());

  let switcher = controls.querySelector(".portal-switcher");
  if (!switcher) {
    switcher = el("div", "portal-switcher control-switcher");
    controls.insertBefore(switcher, controls.firstElementChild);
  }

  switcher.innerHTML = `
    <button
      class="portal-trigger"
      type="button"
      data-portal-trigger
      aria-haspopup="true"
      aria-expanded="false"
      aria-label="${escapeHtml(labels.trigger)}"
      title="${escapeHtml(labels.trigger)}"
    >
      ${iconSvg("home")}
    </button>
    <div class="portal-tray" role="group" aria-label="${escapeHtml(labels.tray)}">
      ${items.map((item) => `
        <a
          class="portal-chip ${item.extraClass || ""} ${item.active ? "is-active" : ""}"
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

function syncHomepageShell() {
  if (!window.HomepageSharedShell) {
    return;
  }

  window.HomepageSharedShell.sync({
    switchers: {
      root: document,
      localeCycleLabel: ui("cycleLanguagesLabel") || ui("showLanguagesLabel"),
      themeCycleLabel: ui("cycleThemesLabel") || ui("showThemesLabel"),
      onCycleLocale: () => setLanguage(nextLocaleName()),
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
      navAriaLabel: ui("primaryNavigationLabel"),
      menuLabel: ui("menuLabel"),
      showMenuLabel: ui("showMenuLabel"),
      hideMenuLabel: ui("hideMenuLabel"),
      toggleInnerHTML: `${iconSvg("menu")}<span class="topnav-toggle-label"></span>`,
      hintInnerHTML: iconSvg("up"),
      breakpoint: 760,
      transientBlurSelector: ".publication-metric-menu, .publication-head-actions",
    },
  });
}

function clearSwitcherCloseTimer(switcher) {
  const timerId = switcherCloseTimers.get(switcher);
  if (timerId) {
    window.clearTimeout(timerId);
    switcherCloseTimers.delete(switcher);
  }
}

function setSwitcherExpandedState(switcher, expanded) {
  if (!switcher) return;
  switcher.classList.toggle("is-open", expanded);
  const trigger = switcher.querySelector("[data-locale-trigger], [data-theme-trigger], [data-portal-trigger]");
  if (trigger) {
    trigger.setAttribute("aria-expanded", expanded ? "true" : "false");
  }
}

function scheduleSwitcherClose(switcher) {
  clearSwitcherCloseTimer(switcher);
  const timerId = window.setTimeout(() => {
    setSwitcherExpandedState(switcher, false);
    switcherCloseTimers.delete(switcher);
  }, 140);
  switcherCloseTimers.set(switcher, timerId);
}

function closeLocaleSwitchers() {
  document.querySelectorAll(".locale-switcher").forEach((switcher) => {
    clearSwitcherCloseTimer(switcher);
    setSwitcherExpandedState(switcher, false);
  });
}

function closeThemeSwitchers() {
  document.querySelectorAll(".theme-switcher").forEach((switcher) => {
    clearSwitcherCloseTimer(switcher);
    setSwitcherExpandedState(switcher, false);
  });
}

function closeAllSwitchers() {
  document.querySelectorAll(".control-switcher").forEach((switcher) => {
    clearSwitcherCloseTimer(switcher);
    setSwitcherExpandedState(switcher, false);
  });
}

function bindSwitcherHoverBehavior() {
  if (switcherHoverBound || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    return;
  }

  switcherHoverBound = true;
  document.querySelectorAll(".control-switcher").forEach((switcher) => {
    switcher.addEventListener("pointerenter", () => {
      clearSwitcherCloseTimer(switcher);
      document.querySelectorAll(".control-switcher").forEach((other) => {
        if (other !== switcher) {
          clearSwitcherCloseTimer(other);
          setSwitcherExpandedState(other, false);
        }
      });
      setSwitcherExpandedState(switcher, true);
    });
    switcher.addEventListener("pointerleave", () => {
      scheduleSwitcherClose(switcher);
    });
  });
}

function ensureHeaderControlsAnchor(controls) {
  const container = controls?.closest(".header-tools");
  if (!container) {
    return null;
  }

  let anchor = container.querySelector(".header-controls-anchor");
  if (!anchor) {
    anchor = el("div", "header-controls-anchor");
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

function initHeaderControlsPosition() {
  updateHeaderControlsPosition();

  if (headerControlsPositionBound) {
    return;
  }

  headerControlsPositionBound = true;
  window.addEventListener("resize", updateHeaderControlsPosition);
  window.addEventListener("orientationchange", updateHeaderControlsPosition);
  window.addEventListener("load", updateHeaderControlsPosition);
  if (document.fonts?.ready) {
    document.fonts.ready.then(updateHeaderControlsPosition).catch(() => {});
  }
}

function ensureTopnavOverflowShell(nav) {
  if (!nav) {
    return null;
  }

  if (nav.parentElement?.classList.contains("topnav-shell")) {
    return nav.parentElement;
  }

  const shell = el("div", "topnav-shell");
  nav.parentNode?.insertBefore(shell, nav);

  const toggle = el("button", "topnav-toggle");
  toggle.type = "button";
  toggle.dataset.topnavToggle = "true";
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-haspopup", "true");
  toggle.innerHTML = `${iconSvg("menu")}<span class="topnav-toggle-label"></span>`;

  shell.appendChild(toggle);
  shell.appendChild(nav);

  const hint = el("div", "topnav-overflow-hint");
  hint.setAttribute("aria-hidden", "true");
  hint.innerHTML = iconSvg("up");
  shell.appendChild(hint);

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
  updateHeaderControlsPosition();
}

function setTopnavMenuExpanded(shell, expanded) {
  if (!shell) {
    return;
  }
  shell.classList.toggle("is-open", expanded);
  const trigger = shell.querySelector("[data-topnav-toggle]");
  if (trigger) {
    trigger.setAttribute("aria-expanded", expanded ? "true" : "false");
    trigger.setAttribute("aria-label", expanded ? ui("hideMenuLabel") : ui("showMenuLabel"));
    trigger.setAttribute("title", ui("menuLabel"));
  }
}

function closeTopnavMenus() {
  document.querySelectorAll(".topnav-shell.is-open").forEach((shell) => {
    setTopnavMenuExpanded(shell, false);
  });
}

function blurTransientMenuFocus() {
  const active = document.activeElement;
  if (!(active instanceof HTMLElement)) {
    return;
  }
  if (active.closest(".publication-metric-menu, .publication-head-actions")) {
    active.blur();
  }
}

function initTopnavMenus() {
  document.querySelectorAll(".topnav").forEach((nav) => {
    ensureTopnavOverflowShell(nav);
  });

  document.querySelectorAll("[data-topnav-toggle]").forEach((button) => {
    const shell = button.closest(".topnav-shell");
    const expanded = shell?.classList.contains("is-open");
    const label = button.querySelector(".topnav-toggle-label");
    if (label) {
      label.textContent = ui("menuLabel");
    }
    button.setAttribute("aria-label", expanded ? ui("hideMenuLabel") : ui("showMenuLabel"));
    button.setAttribute("title", ui("menuLabel"));

    if (button.dataset.topnavBound === "true") {
      return;
    }
    button.dataset.topnavBound = "true";
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const currentShell = button.closest(".topnav-shell");
      const willOpen = !currentShell?.classList.contains("is-open");
      closeTopnavMenus();
      setTopnavMenuExpanded(currentShell, willOpen);
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

  window.addEventListener("blur", blurTransientMenuFocus);
  window.addEventListener("pageshow", blurTransientMenuFocus);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      blurTransientMenuFocus();
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

function setLanguage(language) {
  if (!UI_TEXT[language]) return;
  writeStoredValue(STORAGE_KEY_LANGUAGE, language);
  writeStoredValue(LEGACY_STORAGE_KEY_LANGUAGE, language);
  window.location.assign(localePageHref(language));
}

function applyTheme(themeName, persist = true) {
  const nextTheme = THEME_CATALOG[themeName] ? themeName : "tohoku";
  state.theme = nextTheme;
  document.documentElement.dataset.theme = nextTheme;

  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor) {
    themeColor.setAttribute("content", THEME_CATALOG[nextTheme].themeColor);
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
    trigger.setAttribute("aria-label", ui("cycleThemesLabel") || ui("showThemesLabel"));
    trigger.title = ui("cycleThemesLabel") || ui("showThemesLabel");
  });

  window.HomepageSharedShell?.closeAllSwitchers?.();

  if (persist) {
    writeStoredValue(STORAGE_KEY_THEME, nextTheme);
  }
}

function setActiveDomain(domainId) {
  state.activeDomainId = domainId;
  writeStoredValue(STORAGE_KEY_DOMAIN, domainId);
  renderAll();
}

function makeStackItem(label, value) {
  const item = el("div", "stack-item");
  item.appendChild(el("div", "stack-label", label));
  const content = el("div", "stack-value");
  content.textContent = value;
  item.appendChild(content);
  return item;
}

function renderHero() {
  if (!byId("heroTitle")) return;

  const data = domainData();
  const domain = activeDomain();
  const domainName = localizeText(domain?.name || ui("brandTitle"));
  const downloadItems = related(data.downloadQueue);
  const localPdfs = papersForDomain().filter((paper) => localArchiveEntry(paper.id)).length;
  const browserPulls = downloadItems.filter(
    (item) => item.downloadMode === "openclaw-browser" && !localArchiveEntry(item.paperId)
  ).length;

  setText("heroNative", ui("brandTitle"));
  setRichHtml("heroTitle", domainName);
  setText("heroRole", domain ? localizePrioritySummary(domain.priority, domain.momentum) : "--");
  setRichHtml("heroAffiliation", `${ui("nextRunLabel")}: ${localizeText(data.snapshot.nextRun || "--")}`);
  setRichHtml("headline", domain?.thesis || data.snapshot.headline || "");

  const shortcuts = byId("heroShortcuts");
  if (!shortcuts) return;
  shortcuts.innerHTML = "";
  [
    { href: PAGE_PATHS.papers, label: ui("heroPrimaryAction"), className: "button button-primary" },
    { href: PAGE_PATHS.downloads, label: ui("navDownloads"), className: "button" },
    { href: PAGE_PATHS.guide, label: ui("navGuide"), className: "button" },
  ].forEach((item) => {
    const link = el("a", item.className, item.label);
    link.href = item.href;
    shortcuts.appendChild(link);
  });

  const statusList = byId("heroStatusList");
  if (!statusList) return;
  statusList.innerHTML = "";
  statusList.appendChild(makeStackItem(ui("snapshotLabel"), data.snapshot.generatedAt || "--"));
  statusList.appendChild(makeStackItem(ui("nextRunLabel"), localizeText(data.snapshot.nextRun || "--")));
  statusList.appendChild(makeStackItem(ui("sourcesCoveredLabel"), String(data.snapshot.sourcesCovered ?? 0)));
  statusList.appendChild(makeStackItem(ui("localPdfsLabel"), String(localPdfs)));
  statusList.appendChild(makeStackItem(ui("browserPullsLabel"), String(browserPulls)));
}

function renderRecordNav() {
  const nav = byId("recordNav");
  if (!nav) return;
  nav.innerHTML = "";

  const cards = [
    {
      label: ui("trackedTeamsLabel"),
      value: related(domainData().teams).length,
      meta: plainTextByLanguage({
        en: "tracked people and labs",
        zh: "当前方向的人与团队",
        ja: "現在の領域で追跡中の人とチーム",
      }),
    },
    {
      label: ui("papersInLaneLabel"),
      value: papersForDomain().length,
      meta: plainTextByLanguage({
        en: "paper cards in this lane",
        zh: "当前方向的论文卡片数",
        ja: "この領域の論文カード数",
      }),
    },
    {
      label: ui("localPdfsLabel"),
      value: papersForDomain().filter((paper) => localArchiveEntry(paper.id)).length,
      meta: plainTextByLanguage({
        en: "already archived on this machine",
        zh: "已经在本机归档",
        ja: "このマシンへ保存済み",
      }),
    },
    {
      label: ui("browserPullsLabel"),
      value: related(domainData().downloadQueue).filter(
        (item) => item.downloadMode === "openclaw-browser" && !localArchiveEntry(item.paperId)
      ).length,
      meta: plainTextByLanguage({
        en: "still waiting for OpenClaw browser work",
        zh: "仍等待 OpenClaw 浏览器抓取",
        ja: "OpenClaw ブラウザ取得待ち",
      }),
    },
  ];

  cards.forEach((card) => {
    const article = el("article", "record-card");
    article.appendChild(el("div", "stack-label", card.label));
    article.appendChild(el("div", "record-value", String(card.value)));
    article.appendChild(el("div", "record-meta", card.meta));
    nav.appendChild(article);
  });
}

function renderDomainSwitcher() {
  const switcher = byId("domainSwitcher");
  if (!switcher) return;
  switcher.innerHTML = "";

  domainData().domains.forEach((domain) => {
    const button = el("button", `chip${domain.id === state.activeDomainId ? " is-active" : ""}`, localizeText(domain.name));
    button.type = "button";
    button.setAttribute("role", "tab");
    button.setAttribute("aria-selected", String(domain.id === state.activeDomainId));
    button.addEventListener("click", () => setActiveDomain(domain.id));
    switcher.appendChild(button);
  });
}

function renderDomainFocus() {
  const domain = activeDomain();
  if (!domain) return;
  setText("domainSummary", localizePrioritySummary(domain.priority, domain.momentum));
  setRichHtml("domainThesis", domain.thesis);

  const questions = byId("domainQuestions");
  if (!questions) return;
  questions.innerHTML = "";
  (domain.questions || []).forEach((question) => {
    const item = el("li");
    item.innerHTML = richTextHtml(question);
    questions.appendChild(item);
  });

  const watchSignals = byId("watchSignalsList");
  if (!watchSignals) return;
  watchSignals.innerHTML = "";
  (domain.watchSignals || []).forEach((signal) => {
    const item = el("li");
    item.innerHTML = richTextHtml(signal);
    watchSignals.appendChild(item);
  });
}

function sortPapers(papers) {
  const statusWeight = { "must-read": 3, monitor: 2, archive: 1 };
  return [...papers].sort((left, right) => {
    const statusDelta = (statusWeight[right.status] || 0) - (statusWeight[left.status] || 0);
    if (statusDelta !== 0) return statusDelta;
    const dateDelta = (right.publicationDate || "").localeCompare(left.publicationDate || "");
    if (dateDelta !== 0) return dateDelta;
    return (right.citationCount || 0) - (left.citationCount || 0);
  });
}

function filteredPapers() {
  return sortPapers(papersForDomain()).filter((paper) => {
    const matchesStatus = state.statusFilter === "all" || paper.status === state.statusFilter;
    const haystack = [
      paper.title,
      localizeText(paper.title),
      paper.venue,
      localizeText(paper.venue),
      paper.whyItMatters,
      localizeText(paper.whyItMatters),
      paper.abstract,
      localizeText(paper.abstract),
      paper.citationText,
      ...(paper.authors || []),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return matchesStatus && haystack.includes(state.paperQuery.toLowerCase());
  });
}

function tagVariant(value) {
  if (value === "must-read" || value === ui("localArchiveReady")) return "tag is-strong";
  if (value === "monitor" || value === ui("downloadModeBrowser")) return "tag is-warm";
  return "tag";
}

function addMetric(container, tone, label, value, meta, options = []) {
  const metricOptions = buildMetricOptions(options || []);
  const hasMenu = metricOptions.length > 1;
  const group = el("div", hasMenu ? "publication-metric-group publication-metric-menu" : "publication-metric-group");
  const appendMetricContent = (node) => {
    node.appendChild(el("span", "publication-metric-label", label));
    node.appendChild(el("span", "publication-metric-value", metricValue(value)));
    if (meta) node.appendChild(el("span", "publication-metric-meta", meta));
  };

  if (!metricOptions.length) {
    const node = document.createElement("span");
    node.className = `publication-metric publication-metric-${tone}`;
    appendMetricContent(node);
    group.appendChild(node);
    container.appendChild(group);
    return;
  }

  if (!hasMenu) {
    const option = metricOptions[0];
    const link = document.createElement("a");
    link.className = `publication-metric publication-metric-${tone} publication-metric-link`;
    link.href = option.href;
    link.target = "_blank";
    link.rel = "noreferrer";
    if (option.copyText) {
      const tooltip = option.tooltip || ui("openJcrSearchCopyLabel");
      link.dataset.copyOnOpen = "true";
      link.dataset.copyText = option.copyText;
      link.dataset.tooltip = tooltip;
      link.dataset.copySuccessLabel = option.copySuccessLabel || ui("copiedJournalNameLabel");
      link.setAttribute("aria-label", tooltip);
      link.title = tooltip;
    }
    appendMetricContent(link);
    group.appendChild(link);
    container.appendChild(group);
    return;
  }

  const trigger = document.createElement("button");
  trigger.className = `publication-metric publication-metric-${tone} publication-metric-trigger`;
  trigger.type = "button";
  trigger.setAttribute("aria-haspopup", "true");
  trigger.setAttribute("aria-label", ui("metricSourcesLabel"));
  appendMetricContent(trigger);

  const optionTray = el("span", "publication-metric-options");
  optionTray.setAttribute("role", "menu");
  optionTray.setAttribute("aria-label", ui("metricSourcesLabel"));

  metricOptions.forEach((option) => {
    const link = document.createElement("a");
    link.className = "publication-metric-option";
    link.href = option.href;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.setAttribute("role", "menuitem");
    if (option.copyText) {
      link.dataset.copyOnOpen = "true";
      link.dataset.copyText = option.copyText;
      link.dataset.tooltip = option.tooltip || ui("openJcrSearchCopyLabel");
      link.dataset.copySuccessLabel = option.copySuccessLabel || ui("copiedJournalNameLabel");
      link.setAttribute("aria-label", option.tooltip || ui("openJcrSearchCopyLabel"));
      link.title = option.tooltip || ui("openJcrSearchCopyLabel");
    }
    link.appendChild(el("span", "", option.label));
    optionTray.appendChild(link);
  });

  group.appendChild(trigger);
  group.appendChild(optionTray);
  container.appendChild(group);
}

function actionLink(label, href, className = "button") {
  const link = el("a", className, label);
  link.href = href;
  link.target = "_blank";
  link.rel = "noreferrer";
  return link;
}

function renderPapers() {
  const list = byId("paperList");
  if (!list) return;
  list.innerHTML = "";
  const papers = filteredPapers();

  if (!papers.length) {
    list.appendChild(el("div", "empty", plainTextByLanguage({
      en: "No papers match the current filter.",
      zh: "当前筛选条件下没有匹配论文。",
      ja: "現在のフィルター条件に一致する論文はありません。",
    })));
    return;
  }

  papers.forEach((paper) => {
    const localArchive = localArchiveEntry(paper.id);
    const primaryUrl = publicationPrimaryUrl(paper);
    const publisherUrl = normalizeUrl(paper.publisherUrl || paper.publisher_url);
    const doiActionUrl = primaryUrl || normalizeUrl(paper.doiUrl || paper.doi_url);
    const featured = paper.status === "must-read";
    const article = el("article", `publication-card${featured ? " is-featured" : ""}`);
    const head = el("div", "publication-head");
    const titleBlock = el("div", "");
    const tags = el("div", "tag-row");
    tags.appendChild(el("span", "tag", `${localizeText(paper.venue)} ${paper.year || ""}`.trim()));
    tags.appendChild(el("span", tagVariant(paper.status), localizeText(paper.status)));
    tags.appendChild(
      el(
        "span",
        tagVariant(
          localArchive
            ? ui("localArchiveReady")
            : paper.downloadMode === "direct-http"
              ? ui("downloadModeDirect")
              : paper.downloadMode === "openclaw-browser"
                ? ui("downloadModeBrowser")
                : ui("downloadModeManual")
        ),
        localArchive
          ? ui("localArchiveReady")
          : paper.downloadMode === "direct-http"
            ? ui("downloadModeDirect")
            : paper.downloadMode === "openclaw-browser"
              ? ui("downloadModeBrowser")
              : ui("downloadModeManual")
      )
    );
    if (featured) {
      tags.appendChild(el("span", "tag tag-attention", ui("featuredTag")));
    }
    titleBlock.appendChild(tags);
    const title = el("h4", `publication-title${featured ? " is-featured" : ""}`);
    title.innerHTML = richTextHtml(paper.title);
    titleBlock.appendChild(title);
    head.appendChild(titleBlock);

    const headActions = el("div", "publication-head-actions");
    const copyTrigger = el("button", "publication-copy-button publication-copy-trigger");
    copyTrigger.type = "button";
    copyTrigger.setAttribute("aria-label", publicationCopyMenuLabel());
    copyTrigger.innerHTML = iconSvg("copy");
    const copyMenu = el("div", "publication-copy-menu");
    copyMenu.setAttribute("role", "menu");
    copyMenu.setAttribute("aria-label", publicationCopyMenuLabel());

    const citationCopy = el("button", "publication-copy-button publication-copy-option");
    citationCopy.type = "button";
    citationCopy.dataset.copyPublicationId = paper.id;
    citationCopy.dataset.copyFormat = "ieee";
    citationCopy.setAttribute("aria-label", publicationCopyActionLabel("ieee"));
    citationCopy.innerHTML = `${iconSvg("copy")}<span>${escapeHtml(ui("copyCitationAction"))}</span>`;
    copyMenu.appendChild(citationCopy);

    if (paper.bibtexText) {
      const bibtexCopy = el("button", "publication-copy-button publication-copy-button-bibtex publication-copy-option");
      bibtexCopy.type = "button";
      bibtexCopy.dataset.copyPublicationId = paper.id;
      bibtexCopy.dataset.copyFormat = "bibtex";
      bibtexCopy.setAttribute("aria-label", publicationCopyActionLabel("bibtex"));
      bibtexCopy.innerHTML = `${iconSvg("code")}<span>${escapeHtml(ui("copyBibtexAction"))}</span>`;
      copyMenu.appendChild(bibtexCopy);
    }

    headActions.appendChild(copyTrigger);
    headActions.appendChild(copyMenu);
    head.appendChild(headActions);
    article.appendChild(head);

    const authors = el("p", "authors");
    authors.innerHTML = `<strong class="accent-strong">${escapeHtml(ui("authorsLabel"))}:</strong> ${escapeHtml(
      (paper.authors || []).join(", ")
    )}`;
    article.appendChild(authors);

    const venueLine = el("p", "venue-line");
    venueLine.innerHTML = `<span class="doi-label">${ui("venueLabel")}</span> ${
      normalizeUrl(paper?.venue_url || paper?.venueUrl)
        ? `<a href="${escapeHtml(normalizeUrl(paper?.venue_url || paper?.venueUrl))}" target="_blank" rel="noreferrer">${escapeHtml(localizeText(paper.venue))}</a>`
        : escapeHtml(localizeText(paper.venue))
    }`;
    article.appendChild(venueLine);

    const doiLine = el("p", "doi-line");
    doiLine.innerHTML = `<span class="doi-label">${ui("doiLabel")}</span> <span class="doi-value">${
      primaryUrl
        ? `<a href="${escapeHtml(primaryUrl)}" target="_blank" rel="noreferrer">${escapeHtml(paper.doi || paper.doiUrl || primaryUrl)}</a>`
        : ui("pendingMetric")
    }</span>`;
    article.appendChild(doiLine);

    const metrics = el("div", "publication-metrics");
    const showVenueMetrics = (paper.metrics?.venueType || "") === "journal";
    if (showVenueMetrics) {
      addMetric(
        metrics,
        "impact",
        ui("impactFactorLabel"),
        paper.metrics?.impactFactor,
        paper.metrics?.impactYear,
        metricOptionsForPaper(paper, "impact")
      );
      addMetric(metrics, "jcr", ui("jcrLabel"), paper.metrics?.jcrQuartile, paper.metrics?.jcrYear, metricOptionsForPaper(paper, "jcr"));
      addMetric(
        metrics,
        "cas",
        ui("casLabel"),
        paper.metrics?.casQuartile,
        [paper.metrics?.casTop ? ui("topLabel") : "", paper.metrics?.casYear].filter(Boolean).join(" · "),
        metricOptionsForPaper(paper, "cas")
      );
    }
    addMetric(metrics, "citation", ui("citationsMetricLabel"), paper.citationCount || 0, null, metricOptionsForPaper(paper, "citation"));
    article.appendChild(metrics);

    const citation = el("p", "publication-note publication-note-accent");
    citation.innerHTML = `<strong class="accent-strong">${escapeHtml(ui("citationLabel"))}:</strong> ${escapeHtml(
      paper.citationText || ui("pendingMetric")
    )}`;
    article.appendChild(citation);

    const abstract = el("p", `abstract-block${featured ? " abstract-highlight" : ""}`);
    abstract.innerHTML = `<strong class="accent-strong">${escapeHtml(ui("abstractLabel"))}:</strong> <span class="rich-text">${richTextHtml(
      paper.abstract || ui("abstractUnavailable"),
      { truncate: 560 }
    )}</span>`;
    article.appendChild(abstract);

    const strategic = el("p", "publication-note publication-note-highlight");
    strategic.innerHTML = `<strong class="warm-strong">${escapeHtml(ui("strategicLabel"))}:</strong> <span class="rich-text">${richTextHtml(
      paper.whyItMatters || ui("pendingMetric")
    )}</span>`;
    article.appendChild(strategic);

    const links = el("div", "link-row");
    if (localArchive?.browserUrl) {
      links.appendChild(actionLink(ui("localArchiveAction"), localArchive.browserUrl, "button button-primary"));
    } else if (paper.pdfUrl) {
      links.appendChild(actionLink(ui("sourcePdfAction"), paper.pdfUrl, "button button-primary"));
    } else {
      links.appendChild(el("span", "tag", ui("queueAction")));
    }
    if (doiActionUrl) links.appendChild(actionLink(ui("doiAction"), doiActionUrl));
    if (publisherUrl && publisherUrl !== doiActionUrl) {
      links.appendChild(actionLink(ui("publisherAction"), publisherUrl));
    }
    article.appendChild(links);

    list.appendChild(article);
  });
}

function renderCardGrid(containerId, items, renderItem) {
  const container = byId(containerId);
  if (!container) return;
  container.innerHTML = "";
  if (!items.length) {
    container.appendChild(el("div", "empty", plainTextByLanguage({
      en: "No items available for this section yet.",
      zh: "这个部分暂时还没有条目。",
      ja: "このセクションにはまだ項目がありません。",
    })));
    return;
  }
  items.forEach((item) => container.appendChild(renderItem(item)));
}

function renderTrends() {
  renderCardGrid("trendStack", related(domainData().trendMap), (trend) => {
    const card = el("article", "trend-card");
    const tags = el("div", "tag-row");
    tags.appendChild(el("span", "tag is-strong", localizeText(trend.momentumLabel)));
    tags.appendChild(el("span", "tag is-warm", localizeText(trend.signal)));
    card.appendChild(tags);
    const title = el("h4");
    title.innerHTML = richTextHtml(trend.name);
    card.appendChild(title);
    const body = el("p", "rich-text");
    body.innerHTML = richTextHtml(trend.whyNow);
    card.appendChild(body);
    const note = el("p", "publication-note publication-note-accent");
    note.innerHTML = `<strong class="warm-strong">${escapeHtml(ui("tensionLabel"))}</strong> <span class="rich-text">${richTextHtml(
      trend.tension
    )}</span>`;
    card.appendChild(note);
    return card;
  });
}

function renderTeams() {
  renderCardGrid("teamGrid", related(domainData().teams), (team) => {
    const card = el("article", "team-card");
    const tags = el("div", "tag-row");
    tags.appendChild(el("span", "tag", localizeText(team.region)));
    tags.appendChild(el("span", "tag is-strong", localizeText(team.strength)));
    card.appendChild(tags);
    const title = el("h4");
    title.innerHTML = richTextHtml(team.name);
    card.appendChild(title);
    const thesis = el("p", "team-thesis emphasis-surface rich-text");
    thesis.innerHTML = richTextHtml(team.thesis);
    card.appendChild(thesis);

    const signals = el("ul", "mini-list");
    (team.signals || []).forEach((signal) => {
      const item = el("li");
      item.innerHTML = richTextHtml(signal);
      signals.appendChild(item);
    });
    card.appendChild(signals);

    const refs = el("p", "publication-note publication-note-accent");
    refs.innerHTML = `<strong class="accent-strong">${escapeHtml(ui("reposLabel"))}</strong> <span class="rich-text">${(
      team.repositories || []
    )
      .map((item) => richTextHtml(item))
      .join(", ")}</span><br><strong class="accent-strong">${escapeHtml(ui("papersLabel"))}</strong> <span class="rich-text">${(
      team.papers || []
    )
      .map((item) => richTextHtml(item))
      .join(", ")}</span>`;
    card.appendChild(refs);
    return card;
  });
}

function renderDownloads() {
  renderCardGrid("downloadList", related(domainData().downloadQueue), (item) => {
    const localArchive = localArchiveEntry(item.paperId);
    const primaryUrl = publicationPrimaryUrl(item);
    const publisherUrl = normalizeUrl(item.publisherUrl || item.publisher_url);
    const doiActionUrl = primaryUrl || normalizeUrl(item.doiUrl || item.doi_url);
    const card = el("article", "download-card");
    card.appendChild(
      el(
        "span",
        "stack-label emphasis-signal",
        localArchive
          ? ui("localArchiveReady")
          : item.downloadMode === "direct-http"
            ? ui("downloadModeDirect")
            : item.downloadMode === "openclaw-browser"
              ? ui("downloadModeBrowser")
              : ui("downloadModeManual")
      )
    );
    const title = el("h4");
    title.innerHTML = richTextHtml(item.title);
    card.appendChild(title);
    const source = el("p", "");
    source.innerHTML = `<strong class="accent-strong">${escapeHtml(ui("sourceLabel"))}</strong> ${escapeHtml(
      item.source || ui("pendingMetric")
    )}`;
    card.appendChild(source);
    const path = el("p", "publication-note publication-note-highlight");
    path.innerHTML = `<strong class="warm-strong">${escapeHtml(ui("pathLabel"))}</strong> ${escapeHtml(item.path)}`;
    card.appendChild(path);
    const links = el("div", "link-row");
    if (localArchive?.browserUrl) links.appendChild(actionLink(ui("localArchiveAction"), localArchive.browserUrl, "button button-primary"));
    if (item.pdfUrl) links.appendChild(actionLink(ui("sourcePdfAction"), item.pdfUrl));
    if (doiActionUrl) links.appendChild(actionLink(ui("doiAction"), doiActionUrl));
    if (publisherUrl && publisherUrl !== doiActionUrl) links.appendChild(actionLink(ui("publisherAction"), publisherUrl));
    if (links.children.length) card.appendChild(links);
    return card;
  });
}

function renderGuide() {
  renderCardGrid("guideGrid", GUIDE_CONTENT[state.language] || GUIDE_CONTENT.en, (item) => {
    const card = el("article", "guide-card");
    const title = el("h4");
    title.innerHTML = richTextHtml(item.title);
    card.appendChild(title);
    const body = el("p", "rich-text");
    body.innerHTML = richTextHtml(item.body);
    card.appendChild(body);
    return card;
  });
}

function renderWorkflow() {
  renderCardGrid("workflowLane", domainData().workflow, (step) => {
    const card = el("article", "workflow-card");
    const tags = el("div", "tag-row");
    tags.appendChild(el("span", "tag is-strong", localizeText(step.stage)));
    tags.appendChild(el("span", "tag", localizeText(step.automation)));
    card.appendChild(tags);
    const title = el("h4");
    title.innerHTML = richTextHtml(step.goal);
    card.appendChild(title);
    const artifacts = el("ul", "mini-list");
    (step.artifacts || []).forEach((artifact) => {
      const item = el("li");
      item.innerHTML = richTextHtml(artifact);
      artifacts.appendChild(item);
    });
    card.appendChild(artifacts);
    return card;
  });
}

function bindControls() {
  const statusFilter = byId("statusFilter");
  const paperSearch = byId("paperSearch");
  if (!statusFilter || !paperSearch) return;

  statusFilter.addEventListener("change", (event) => {
    state.statusFilter = event.target.value;
    renderPapers();
  });
  paperSearch.addEventListener("input", (event) => {
    state.paperQuery = event.target.value;
    renderPapers();
  });
}

function bindRevealObserver() {
  const nodes = document.querySelectorAll(".reveal");
  if (!nodes.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  nodes.forEach((node, index) => {
    if (index < 2) {
      node.classList.add("is-visible");
    }
    observer.observe(node);
  });
}

function updateScrollTopButton() {
  const button = byId("scrollTopButton");
  if (!button) return;
  button.classList.toggle("is-visible", window.scrollY > 28);
}

async function copyTextToClipboard(text) {
  if (!text) return false;

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {}

  try {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "true");
    textarea.style.position = "fixed";
    textarea.style.top = "-1000px";
    textarea.style.left = "-1000px";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    const copied = document.execCommand("copy");
    textarea.remove();
    return copied;
  } catch {
    return false;
  }
}

function bindMetricCopyHandlers() {
  if (metricCopyUiBound) return;
  metricCopyUiBound = true;

  document.addEventListener("click", async (event) => {
    const metricLink = event.target.closest("[data-copy-on-open='true']");
    if (!metricLink) return;

    const targetUrl = metricLink.getAttribute("href") || "";
    const defaultTooltip = metricLink.dataset.tooltip || ui("openJcrSearchCopyLabel");
    const successLabel = metricLink.dataset.copySuccessLabel || ui("copiedJournalNameLabel");
    const copyText = metricLink.dataset.copyText || "";
    if (copyText) {
      const copied = await copyTextToClipboard(copyText);
      if (copied) {
        metricLink.classList.add("is-copied");
        metricLink.dataset.tooltip = successLabel;
        metricLink.setAttribute("aria-label", successLabel);
        metricLink.setAttribute("title", successLabel);
        window.setTimeout(() => {
          metricLink.classList.remove("is-copied");
          metricLink.dataset.tooltip = defaultTooltip;
          metricLink.setAttribute("aria-label", defaultTooltip);
          metricLink.setAttribute("title", defaultTooltip);
        }, 1400);
      }
    }
    if (metricLink instanceof HTMLElement) {
      metricLink.blur();
    }
    window.requestAnimationFrame(() => {
      blurTransientMenuFocus();
    });
    if (!targetUrl) {
      event.preventDefault();
    }
    return;
  });

  document.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-copy-publication-id]");
    if (!button) return;

    event.preventDefault();
    const publicationId = button.dataset.copyPublicationId || "";
    const format = button.dataset.copyFormat === "bibtex" ? "bibtex" : "ieee";
    const item = (domainData().papers || []).find((entry) => entry.id === publicationId);
    if (!item) return;

    const payload = format === "bibtex" ? item.bibtexText : item.citationText;
    const copied = await copyTextToClipboard(payload || "");
    if (!copied) return;

    button.classList.add("is-copied");
    button.dataset.tooltip = publicationCopySuccessLabel(format);
    button.setAttribute("aria-label", publicationCopySuccessLabel(format));
    window.setTimeout(() => {
      button.classList.remove("is-copied");
      button.removeAttribute("data-tooltip");
      button.setAttribute("aria-label", publicationCopyActionLabel(format));
    }, 1400);
  });
}

function bindScrollTopButton() {
  const button = byId("scrollTopButton");
  if (!button) return;

  if (button.dataset.bound !== "true") {
    button.dataset.bound = "true";
    button.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  updateScrollTopButton();

  if (scrollTopUiBound) {
    return;
  }

  scrollTopUiBound = true;
  window.addEventListener("scroll", updateScrollTopButton, { passive: true });
  window.addEventListener("resize", updateScrollTopButton);
}

async function mergeArchiveManifest(url) {
  const response = await window.fetch(url, { cache: "no-store" });
  if (!response.ok) return;
  const payload = await response.json();
  Object.assign(state.localArchiveIndex, Object.fromEntries((payload.items || []).map((item) => [item.paperId, item])));
}

async function loadLocalArchiveManifest() {
  state.localArchiveIndex = {};
  const basePath = assetBasePath();
  try {
    await mergeArchiveManifest(`${basePath}/data/public_archive_manifest.json`);

    if (["127.0.0.1", "localhost", ""].includes(window.location.hostname)) {
      await mergeArchiveManifest(`${basePath}/data/local_archive_manifest.json`);
    }
  } catch {
    state.localArchiveIndex = {};
  }

  renderAll();
}

function renderAll() {
  try {
    renderStaticText();
    renderLocaleSwitcher();
    renderThemeSwitcher();
    applyTheme(state.theme, false);
    renderHero();
    renderRecordNav();
    renderDomainSwitcher();
    renderDomainFocus();
    renderPapers();
    renderTrends();
    renderTeams();
    renderDownloads();
    renderGuide();
    renderWorkflow();
    syncHomepageShell();
  } catch (error) {
    console.error("Frontier Radar render failed", error);
    document.body.classList.add("is-ready");
  }
}

function init() {
  state.language = loadInitialLanguage();
  state.theme = loadInitialTheme();
  state.activeDomainId = chooseDefaultDomain();
  document.body.classList.add("is-ready");
  bindControls();
  bindScrollTopButton();
  bindMetricCopyHandlers();
  renderAll();
  bindRevealObserver();
  loadLocalArchiveManifest();
}

window.addEventListener("DOMContentLoaded", init);
