const els = {
  headerControls: document.querySelector(".header-controls"),
  localeChoices: [],
  localeSwitchers: Array.from(document.querySelectorAll(".locale-switcher")),
  localeTriggers: [],
  themeChoices: [],
  themeSwitchers: Array.from(document.querySelectorAll(".theme-switcher")),
  themeTriggers: [],
  heroNative: document.getElementById("hero-native"),
  heroPortrait: document.getElementById("hero-portrait"),
  heroTitle: document.getElementById("hero-title"),
  heroNameCopy: document.getElementById("hero-name-copy"),
  heroBio: document.getElementById("hero-bio"),
  portraitRole: document.getElementById("portrait-role"),
  portraitAffiliation: document.getElementById("portrait-affiliation"),
  heroContactList: document.getElementById("hero-contact-list"),
  heroIdentityList: document.getElementById("hero-identity-list"),
  heroShortcuts: document.getElementById("hero-shortcuts"),
  recordNav: document.getElementById("record-nav"),
  moduleNav: document.getElementById("module-nav"),
  methodTags: document.getElementById("method-tags"),
  domainTags: document.getElementById("domain-tags"),
  highlightList: document.getElementById("highlight-list"),
  yearBars: document.getElementById("year-bars"),
  collaboratorList: document.getElementById("collaborator-list"),
  linkSearch: document.getElementById("link-search"),
  linkGrid: document.getElementById("link-grid"),
  documentGrid: document.getElementById("document-grid"),
  timelineList: document.getElementById("timeline-list"),
  pubSearch: document.getElementById("pub-search"),
  yearFilter: document.getElementById("year-filter"),
  typeFilter: document.getElementById("type-filter"),
  statusFilter: document.getElementById("status-filter"),
  venueFilter: document.getElementById("venue-filter"),
  sortFilter: document.getElementById("sort-filter"),
  pubReset: document.getElementById("pub-reset"),
  filterToolbarLabel: document.getElementById("filter-toolbar-label"),
  quickFilterChips: document.getElementById("quick-filter-chips"),
  quickFilterLabel: document.getElementById("quick-filter-label"),
  publicationList: document.getElementById("publication-list"),
  sourceNoteList: document.getElementById("source-note-list"),
  sourceLinkList: document.getElementById("source-link-list"),
  detailMetrics: document.getElementById("detail-metrics"),
  awardPageList: document.getElementById("award-page-list"),
  servicePageGroups: document.getElementById("service-page-groups"),
  projectRepoGrid: document.getElementById("project-repo-grid"),
  projectDirectionList: document.getElementById("project-direction-list"),
};

const fallbackData = {
  metadata: { generated_on: "2026-03-24", profile_name: "Sichen Tao" },
  person: {
    name: "Sichen Tao",
    display_name_native: "陶思晨",
    portrait: "./assets/images/avatar-openai.jpg",
    current_title: "Assistant Professor",
    affiliation: "Tohoku University",
    location: "Sendai, Japan",
    emails: ["sichen.tao@tohoku.ac.jp"],
    bio: "Public portal fallback data.",
    research_methods: [],
    application_domains: [],
    memberships: [],
    languages: [],
  },
  stats: {
    citations: 540,
    h_index: 11,
    i10_index: 11,
    indexed_publications: 45,
    cv_total_publications: 45,
    official_source_links: 0,
    top_level_awards: 0,
    jglobal_papers: 0,
    active_years: 0,
  },
  profiles: [],
  documents: [],
  featured_projects: [],
  timeline: [],
  awards: [],
  service: [],
  open_source_projects: [],
  publications: [],
  publication_highlights: [],
  publication_year_counts: [],
  top_collaborators: [],
  source_notes: [],
  source_links: [],
};

const state = {
  data: fallbackData,
  linkQuery: "",
  pubQuery: "",
  year: "all",
  type: "all",
  status: "all",
  sort: "recent",
  venue: "all",
  quick: "all",
};

const themeCatalog = {
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
  base: {
    label: "Base",
    themeColor: "#f5eee4",
    swatchClass: "theme-base",
  },
};

const heroContactEmojiMap = {
  academic_email: "📧",
  personal_email: "✉️",
  location: "📍",
  memberships: "🏛️",
  languages: "🗣️",
};

const localeCatalog = {
  en: {
    label: "EN",
    name: "English",
    lang: "en",
  },
  ja: {
    label: "日",
    name: "日本語",
    lang: "ja",
  },
  zh: {
    label: "中",
    name: "中文",
    lang: "zh-CN",
  },
};

const translations = {
  en: {
    site: {
      home_title: "Academic Homepage",
      home_description:
        "Academic homepage and research archive for Sichen Tao, covering AI, optimization, brain-inspired systems, and high-performance computing.",
      profiles_description: "External profiles and research identifiers for Sichen Tao.",
      publications_description: "Complete publications page for Sichen Tao, including filters, source grouping, and external records.",
      awards_description: "Awards and distinctions page for Sichen Tao.",
      projects_description: "Public projects and research software page for Sichen Tao.",
      service_description: "Review and editorial service page for Sichen Tao.",
      timeline_description:
        "Timeline page for Sichen Tao, covering appointments, education, fellowships, teaching, and editorial milestones.",
      research_description:
        "Research page for Sichen Tao, covering methods, application domains, recent output, and collaboration signals.",
      sources_description: "Sources page for Sichen Tao, covering provenance notes, caveats, and traceable reference links.",
      archive_description: "Archive page for Sichen Tao, covering CV files, dossier exports, collaborator notes, and reusable source files.",
    },
    controls: {
      language: "Language",
      language_choices: "Language choices",
      show_languages: "Show language options",
      cycle_languages: "Switch to the next language",
      open_portal: "Return to homepage portal",
      menu: "Menu",
      show_menu: "Open navigation menu",
      hide_menu: "Close navigation menu",
      theme: "Color theme",
      display_controls: "Display controls",
      theme_choices: "Theme choices",
      show_themes: "Show color themes",
      cycle_themes: "Switch to the next color theme",
      section_navigation: "Section navigation",
      page_navigation: "Page navigation",
      venue_filters: "Venue filters",
      quick_publication_filters: "Quick publication filters",
      quick_profile_links: "Quick profile links",
      research_focus: "Research focus",
      institution_themes: "Institution themes",
    },
    nav: {
      home: "Home",
      profiles: "Profiles",
      publications: "Publications",
      awards: "Awards",
      projects: "Projects",
      service: "Service",
      timeline: "Timeline",
      research: "Research",
      sources: "Sources",
      archive: "Archive",
    },
    home: {
      eyebrow: "High Performance Computing · Artificial Intelligence · Optimization",
      current_appointment: "Current appointment",
      contact_identity: "Contact & Identity",
      contact: "Contact",
      identity: "Identity",
      pages: "Pages",
      resources: "Resources",
      portrait_alt: "Portrait of Sichen Tao",
      bio:
        "Researcher working at the intersection of artificial intelligence, deep learning, brain-inspired neural networks, optimization, and high-performance computing, with applications in wind farm layout optimization, healthcare AI, human-robot collaboration, and AI for science.",
    },
    sections: {
      files: "Files",
      repositories: "Repositories",
      directions: "Directions",
      methods_domains_recent: "Methods, Domains, Recent Output",
      method_portfolio: "Method Portfolio",
      application_domains: "Application Domains",
      recent_output: "Recent Output",
      publication_rhythm: "Publication Rhythm, Collaboration Network",
      publication_rhythm_sub: "Publication Rhythm",
      collaboration_network: "Collaboration Network",
      research_output: "Research Output",
      browse_filter: "Browse & Filter",
      research_identity: "Research Identity",
      public_profiles: "External Profiles",
      recognition: "Recognition",
      honors_distinctions: "Honors & Distinctions",
      open_work: "Open Work",
      open_repositories: "Open Repositories",
      research_directions: "Research Directions",
      academic_service: "Scholarly Contribution",
      review_editorial: "Review & Editorial Work",
      career_path: "Career Path",
      career_milestones: "Career Milestones",
      research_overview: "Focus Areas",
      provenance: "Provenance",
      notes_reference_links: "Notes & Reference Links",
      source_notes: "Source Notes",
      reference_links: "Reference Links",
      reference_files: "Reference Files",
      documents_exports: "Documents & Exports",
      notes_links: "Notes and Links",
      resources: "Resources",
    },
    labels: {
      academic_email: "Academic email",
      personal_email: "Personal email",
      location: "Location",
      institution: "Institution",
      organization: "Organization",
      host: "Host",
      details: "Details",
      timeline_to: "to",
      timeline_present: "present",
      filters: "Filters",
      tags: "Tags",
      target_journal: "Target journal",
      doi: "DOI",
      if_short: "IF",
      jcr: "JCR",
      cas: "CAS",
      ccf: "CCF",
      top: "Top",
      citations: "Citations",
      publication_metrics: "Publication metrics",
      memberships: "Memberships",
      languages: "Languages",
      outside_research: "Outside research",
      project_direction: "Project direction",
      public_email_not_listed: "Public email not listed.",
      identity_notes_fallback: "Identity notes are summarized through public profiles.",
      latest_record_fallback: "Public record",
      indexed_record: "Indexed record",
      cv_supplement: "CV supplement",
      item: "item",
      items: "items",
      repos: "repos",
      venues: "venues",
    },
    roles: {
      co_first_author: "co-first author",
    },
    filters: {
      all: "All",
      all_years: "All years",
      all_types: "All types",
      all_statuses: "All statuses",
      all_venues: "All venues",
      sort_recent: "Sort by recent",
      sort_if: "Sort by IF",
      sort_citations: "Sort by citations",
      sort_title: "Sort by title",
      reset: "Reset",
      quick_journal: "Journal",
      quick_conference: "Conference",
      quick_preprint: "Preprint",
      quick_first_author: "First author",
      quick_corresponding: "Corresponding",
      quick_in_press: "In Press",
      quick_pending_submission: "Pending Submission",
      quick_has_doi: "Has DOI",
      search_profiles: "Search profiles and categories",
      search_publications: "Search title, author, venue, or tag",
      no_date: "n.d.",
    },
    actions: {
      back_home: "Back to homepage",
      cv: "Curriculum vitae",
      github_profile: "GitHub profile",
      award_links: "Links",
      award_official: "Official Page",
      award_github: "Official GitHub",
      award_my_repo: "My Open Source Code",
      award_paper: "Paper Page",
      award_journal: "Journal Page",
      open_link: "Open link",
      open_file: "Open file",
      open_repository: "Open repository",
      open_record: "Open record",
      open_doi: "Open DOI / source",
      open_jcr_search_copy: "Copy journal name and open official JCR search",
      open_official_platform_copy: "Open official platform and copy journal name",
      open_search_copy: "Copy citation query and open search page",
      copied_journal_name: "Journal name copied",
      copied_search_query: "Citation query copied",
      open_public_evidence: "Open public evidence",
      open_supporting_source: "Open supporting source",
      metric_sources: "Choose source",
      metric_official_page: "Official Page",
      metric_official_platform: "Official Platform",
      metric_public_evidence: "Public Evidence",
      copy_menu: "Copy citation",
      copy_citation: "Copy IEEE citation",
      copy_bibtex: "Copy BibTeX",
      copy_name: "Copy name",
      copy_email: "Copy email address",
      copied: "Copied",
      copied_citation: "IEEE citation copied",
      copied_bibtex: "BibTeX copied",
      copied_name: "Name copied",
      copied_email: "Email copied",
      scroll_top: "Scroll back to top",
    },
    empty: {
      no_profile_links: "No profile links matched the current query.",
      no_publications: "No publications matched the active filters.",
      no_awards: "No awards are listed in the current public record.",
      no_public_repositories: "No public repositories are listed yet.",
      no_project_directions: "No project directions are listed yet.",
    },
    tags: {
      Official: "Official",
      Academic: "Academic",
      Code: "Code",
      Repository: "Repository",
      Identifier: "Identifier",
      Registry: "Registry",
      PDF: "PDF",
      TeX: "TeX",
      Markdown: "Markdown",
      JSON: "JSON",
      Python: "Python",
    },
    timeline_categories: {
      Position: "Position",
      Service: "Service",
      Education: "Education",
      Fellowship: "Fellowship",
      Editorial: "Editorial",
      Teaching: "Teaching",
      Visit: "Visit",
    },
    status: {
      published: "Published",
      in_press: "In press",
      submitted: "Submitted",
      under_review: "Under review",
      accepted: "Accepted",
      preprint: "Preprint",
    },
    type: {
      journal: "Journal",
      conference: "Conference",
      preprint: "Preprint",
    },
    publication_type_phrase: {
      journal: "journal article",
      conference: "conference paper",
      preprint: "preprint",
    },
  },
  ja: {
    site: {
      home_title: "学術ホームページ",
      home_description: "Sichen Tao の学術ホームページと研究アーカイブ。AI、最適化、脳着想システム、高性能計算を扱います。",
      profiles_description: "Sichen Tao の外部プロフィールと研究者識別子をまとめたページ。",
      publications_description: "Sichen Tao の論文一覧ページ。検索、分類、外部記録へのリンクを含みます。",
      awards_description: "Sichen Tao の受賞一覧ページ。",
      projects_description: "Sichen Tao の公開プロジェクトと研究ソフトウェアのページ。",
      service_description: "Sichen Tao の査読・編集活動ページ。",
      timeline_description: "Sichen Tao の年表ページ。任職、学歴、フェローシップ、教育、編集関連の節目をまとめています。",
      research_description: "Sichen Tao の研究ページ。手法、応用分野、最近の成果、共同研究の動向をまとめています。",
      sources_description: "Sichen Tao の出典ページ。注記、根拠、参照リンクをまとめています。",
      archive_description: "Sichen Tao のアーカイブページ。CV、資料書き出し、共同研究メモ、再利用可能なファイルを収録しています。",
    },
    controls: {
      language: "言語",
      language_choices: "言語選択",
      show_languages: "言語を切り替える",
      cycle_languages: "次の言語に切り替える",
      open_portal: "ホームポータルへ戻る",
      menu: "メニュー",
      show_menu: "メニューを開く",
      hide_menu: "メニューを閉じる",
      theme: "配色テーマ",
      display_controls: "表示コントロール",
      theme_choices: "配色選択",
      show_themes: "配色を切り替える",
      cycle_themes: "次の配色に切り替える",
      section_navigation: "セクション案内",
      page_navigation: "ページ案内",
      venue_filters: "掲載先フィルター",
      quick_publication_filters: "クイックフィルター",
      quick_profile_links: "主要プロフィールリンク",
      research_focus: "研究分野",
      institution_themes: "所属機関テーマ",
    },
    nav: {
      home: "ホーム",
      profiles: "プロフィール",
      publications: "論文",
      awards: "受賞",
      projects: "プロジェクト",
      service: "査読・編集",
      timeline: "年表",
      research: "研究",
      sources: "出典",
      archive: "アーカイブ",
    },
    home: {
      eyebrow: "高性能計算・人工知能・最適化",
      current_appointment: "現職",
      contact_identity: "連絡先・基本情報",
      contact: "連絡先",
      identity: "基本情報",
      pages: "ページ",
      resources: "資料",
      portrait_alt: "陶思晨のポートレート",
      bio:
        "人工知能、深層学習、脳着想ニューラルネットワーク、最適化、高性能計算の交差領域で研究を行い、風力発電所レイアウト最適化、医療AI、人間・ロボット協調、AI for Science への応用を進めています。",
    },
    sections: {
      files: "ファイル",
      repositories: "リポジトリ",
      directions: "方向",
      methods_domains_recent: "手法・応用分野・最近の成果",
      method_portfolio: "手法一覧",
      application_domains: "応用分野",
      recent_output: "最近の成果",
      publication_rhythm: "発表推移・共同研究ネットワーク",
      publication_rhythm_sub: "発表推移",
      collaboration_network: "共同研究ネットワーク",
      research_output: "研究成果",
      browse_filter: "検索と絞り込み",
      research_identity: "研究者アイデンティティ",
      public_profiles: "外部プロフィール",
      recognition: "評価と顕彰",
      honors_distinctions: "受賞と顕彰",
      open_work: "公開成果",
      open_repositories: "公開リポジトリ",
      research_directions: "研究方向",
      academic_service: "学術貢献",
      review_editorial: "査読・編集活動",
      career_path: "キャリアパス",
      career_milestones: "主な節目",
      research_overview: "研究焦点",
      provenance: "出典情報",
      notes_reference_links: "注記と参照リンク",
      source_notes: "出典メモ",
      reference_links: "参照リンク",
      reference_files: "参考資料",
      documents_exports: "文書とエクスポート",
      notes_links: "注記・リンク",
      resources: "資料",
    },
    labels: {
      academic_email: "学術メール",
      personal_email: "個人メール",
      location: "所在地",
      institution: "所属機関",
      organization: "組織",
      host: "受入先",
      details: "詳細",
      timeline_to: "〜",
      timeline_present: "現在",
      filters: "フィルター",
      tags: "タグ",
      target_journal: "投稿先誌",
      doi: "DOI",
      if_short: "IF",
      jcr: "JCR",
      cas: "中科院",
      ccf: "CCF",
      top: "Top",
      citations: "被引用数",
      publication_metrics: "論文指標",
      memberships: "所属学会",
      languages: "言語",
      outside_research: "研究外の関心",
      project_direction: "プロジェクト方向",
      public_email_not_listed: "公開メールは未掲載です。",
      identity_notes_fallback: "基本情報は公開プロフィールに要約されています。",
      latest_record_fallback: "公開記録",
      indexed_record: "索引収録",
      cv_supplement: "CV補遺",
      item: "件",
      items: "件",
      repos: "リポジトリ",
      venues: "件",
    },
    roles: {
      co_first_author: "共同筆頭著者",
    },
    filters: {
      all: "すべて",
      all_years: "全年",
      all_types: "全種別",
      all_statuses: "全状態",
      all_venues: "全掲載先",
      sort_recent: "新しい順",
      sort_if: "IF順",
      sort_citations: "被引用順",
      sort_title: "タイトル順",
      reset: "リセット",
      quick_journal: "ジャーナル",
      quick_conference: "会議",
      quick_preprint: "プレプリント",
      quick_first_author: "筆頭著者",
      quick_corresponding: "責任著者",
      quick_in_press: "刊行前公開",
      quick_pending_submission: "投稿・査読中",
      quick_has_doi: "DOIあり",
      search_profiles: "プロフィールと分類を検索",
      search_publications: "タイトル・著者・掲載先・タグで検索",
      no_date: "年代不詳",
    },
    actions: {
      back_home: "ホームへ戻る",
      cv: "履歴書",
      github_profile: "GitHub プロフィール",
      award_links: "リンク",
      award_official: "公式ページ",
      award_github: "公式 GitHub",
      award_my_repo: "私の公開コード",
      award_paper: "論文ページ",
      award_journal: "ジャーナルページ",
      open_link: "リンクを開く",
      open_file: "ファイルを開く",
      open_repository: "リポジトリを開く",
      open_record: "記録を開く",
      open_doi: "DOI / 出典を開く",
      open_jcr_search_copy: "誌名をコピーして JCR 公式検索を開く",
      open_official_platform_copy: "公式プラットフォームを開き、誌名をコピー",
      open_search_copy: "引用検索語をコピーして検索ページを開く",
      copied_journal_name: "誌名をコピーしました",
      copied_search_query: "引用検索語をコピーしました",
      open_public_evidence: "公開証拠ページを開く",
      open_supporting_source: "補助資料を開く",
      metric_sources: "参照元を選択",
      metric_official_page: "公式ページ",
      metric_official_platform: "公式プラットフォーム",
      metric_public_evidence: "公開参照ページ",
      copy_menu: "引用をコピー",
      copy_citation: "IEEE形式の引用をコピー",
      copy_bibtex: "BibTeX をコピー",
      copy_name: "氏名をコピー",
      copy_email: "メールアドレスをコピー",
      copied: "コピー済み",
      copied_citation: "IEEE形式の引用をコピーしました",
      copied_bibtex: "BibTeX をコピーしました",
      copied_name: "氏名をコピーしました",
      copied_email: "メールアドレスをコピーしました",
      scroll_top: "ページ上部へ戻る",
    },
    empty: {
      no_profile_links: "条件に一致するプロフィールリンクはありません。",
      no_publications: "条件に一致する論文はありません。",
      no_awards: "公開記録に受賞情報はありません。",
      no_public_repositories: "公開リポジトリはまだありません。",
      no_project_directions: "プロジェクト方向はまだありません。",
    },
    tags: {
      Official: "公式",
      Academic: "学術",
      Code: "コード",
      Repository: "リポジトリ",
      Identifier: "識別子",
      Registry: "登録",
      PDF: "PDF",
      TeX: "TeX",
      Markdown: "Markdown",
      JSON: "JSON",
      Python: "Python",
    },
    timeline_categories: {
      Position: "任職",
      Service: "役割",
      Education: "学歴",
      Fellowship: "フェローシップ",
      Editorial: "編集",
      Teaching: "教育",
      Visit: "訪問",
    },
    status: {
      published: "掲載済み",
      in_press: "刊行予定",
      submitted: "投稿済み",
      under_review: "査読中",
      accepted: "採択済み",
      preprint: "プレプリント",
    },
    type: {
      journal: "学術誌",
      conference: "会議",
      preprint: "プレプリント",
    },
    publication_type_phrase: {
      journal: "学術誌論文",
      conference: "会議論文",
      preprint: "プレプリント",
    },
  },
  zh: {
    site: {
      home_title: "学术主页",
      home_description: "Sichen Tao 的学术主页与研究档案，涵盖人工智能、优化、脑启发系统与高性能计算。",
      profiles_description: "Sichen Tao 的外部主页与研究者标识页面。",
      publications_description: "Sichen Tao 的论文列表页面，包含检索、分类和外部记录链接。",
      awards_description: "Sichen Tao 的获奖页面。",
      projects_description: "Sichen Tao 的公开项目与研究软件页面。",
      service_description: "Sichen Tao 的审稿与编辑服务页面。",
      timeline_description: "Sichen Tao 的时间线页面，涵盖任职、教育、奖助、教学和编辑相关节点。",
      research_description: "Sichen Tao 的研究页面，涵盖方法、应用领域、近期成果和合作信号。",
      sources_description: "Sichen Tao 的来源页面，汇总来源说明、注记和可追溯链接。",
      archive_description: "Sichen Tao 的档案页面，收录 CV、资料导出、合作整理和可复用文件。",
    },
    controls: {
      language: "语言",
      language_choices: "语言选项",
      show_languages: "切换语言",
      cycle_languages: "切换到下一种语言",
      open_portal: "返回主页导航页",
      menu: "菜单",
      show_menu: "打开导航菜单",
      hide_menu: "关闭导航菜单",
      theme: "配色主题",
      display_controls: "显示控制",
      theme_choices: "配色选项",
      show_themes: "切换配色",
      cycle_themes: "切换到下一套配色",
      section_navigation: "分区导航",
      page_navigation: "页面导航",
      venue_filters: "刊物筛选",
      quick_publication_filters: "快速筛选",
      quick_profile_links: "快速主页链接",
      research_focus: "研究焦点",
      institution_themes: "院校主题",
    },
    nav: {
      home: "主页",
      profiles: "研究者档案",
      publications: "论文",
      awards: "获奖",
      projects: "项目",
      service: "审稿与编辑",
      timeline: "时间线",
      research: "研究",
      sources: "来源",
      archive: "档案",
    },
    home: {
      eyebrow: "高性能计算 · 人工智能 · 优化",
      current_appointment: "现职",
      contact_identity: "联系与基本信息",
      contact: "联系",
      identity: "基本信息",
      pages: "页面",
      resources: "资料",
      portrait_alt: "陶思晨肖像",
      bio:
        "研究聚焦于人工智能、深度学习、脑启发神经网络、优化与高性能计算的交叉领域，应用场景包括风电场布局优化、医疗 AI、人机协作以及 AI for Science。",
    },
    sections: {
      files: "文件",
      repositories: "仓库",
      directions: "方向",
      methods_domains_recent: "方法、领域与近期成果",
      method_portfolio: "方法概览",
      application_domains: "应用领域",
      recent_output: "近期成果",
      publication_rhythm: "发表节奏与合作网络",
      publication_rhythm_sub: "发表节奏",
      collaboration_network: "合作网络",
      research_output: "研究成果",
      browse_filter: "检索与筛选",
      research_identity: "研究身份",
      public_profiles: "外部主页",
      recognition: "学术荣誉",
      honors_distinctions: "荣誉与奖项",
      open_work: "公开成果",
      open_repositories: "公开仓库",
      research_directions: "研究方向",
      academic_service: "学术贡献",
      review_editorial: "审稿与编辑工作",
      career_path: "学术路径",
      career_milestones: "关键节点",
      research_overview: "研究焦点",
      provenance: "来源依据",
      notes_reference_links: "注记与参考链接",
      source_notes: "来源说明",
      reference_links: "参考链接",
      reference_files: "参考资料",
      documents_exports: "文档与导出",
      notes_links: "说明与链接",
      resources: "资料",
    },
    labels: {
      academic_email: "学术邮箱",
      personal_email: "个人邮箱",
      location: "所在地",
      institution: "机构",
      organization: "组织",
      host: "接收单位",
      details: "说明",
      timeline_to: "至",
      timeline_present: "至今",
      filters: "筛选",
      tags: "标签",
      target_journal: "目标期刊",
      doi: "DOI",
      if_short: "IF",
      jcr: "JCR",
      cas: "中科院",
      ccf: "CCF",
      top: "Top",
      citations: "引用",
      publication_metrics: "论文指标",
      memberships: "学会成员",
      languages: "语言",
      outside_research: "研究外兴趣",
      project_direction: "项目方向",
      public_email_not_listed: "未列出公开邮箱。",
      identity_notes_fallback: "基本信息已通过公开主页概括。",
      latest_record_fallback: "公开记录",
      indexed_record: "索引收录",
      cv_supplement: "CV补充",
      item: "项",
      items: "项",
      repos: "仓库",
      venues: "项",
    },
    roles: {
      co_first_author: "共同第一作者",
    },
    filters: {
      all: "全部",
      all_years: "全部年份",
      all_types: "全部类型",
      all_statuses: "全部状态",
      all_venues: "全部刊物",
      sort_recent: "按时间",
      sort_if: "按IF",
      sort_citations: "按引用",
      sort_title: "按标题",
      reset: "重置",
      quick_journal: "期刊",
      quick_conference: "会议",
      quick_preprint: "预印本",
      quick_first_author: "第一作者",
      quick_corresponding: "通讯作者",
      quick_in_press: "待正式刊出",
      quick_pending_submission: "投稿/审稿中",
      quick_has_doi: "有 DOI",
      search_profiles: "搜索主页与分类",
      search_publications: "搜索标题、作者、刊物或标签",
      no_date: "日期未知",
    },
    actions: {
      back_home: "返回主页",
      cv: "简历",
      github_profile: "GitHub 主页",
      award_links: "链接",
      award_official: "官方页面",
      award_github: "官方 GitHub",
      award_my_repo: "我的开源代码",
      award_paper: "论文页面",
      award_journal: "期刊页面",
      open_link: "打开链接",
      open_file: "打开文件",
      open_repository: "打开仓库",
      open_record: "打开记录",
      open_doi: "打开 DOI / 来源",
      open_jcr_search_copy: "复制期刊名并打开 JCR 官方搜索页",
      open_official_platform_copy: "打开官方平台并复制期刊名",
      open_search_copy: "复制引用检索字段并打开搜索页",
      copied_journal_name: "已复制期刊名",
      copied_search_query: "已复制引用检索字段",
      open_public_evidence: "打开公开证据页",
      open_supporting_source: "打开辅助来源",
      metric_sources: "选择来源",
      metric_official_page: "官方页面",
      metric_official_platform: "官方平台",
      metric_public_evidence: "公开参考页",
      copy_menu: "复制引用",
      copy_citation: "复制 IEEE 格式引用",
      copy_bibtex: "复制 BibTeX",
      copy_name: "复制姓名",
      copy_email: "复制邮箱地址",
      copied: "已复制",
      copied_citation: "已复制 IEEE 格式引用",
      copied_bibtex: "已复制 BibTeX",
      copied_name: "已复制姓名",
      copied_email: "已复制邮箱地址",
      scroll_top: "返回顶部",
    },
    empty: {
      no_profile_links: "没有匹配当前搜索条件的主页链接。",
      no_publications: "当前筛选条件下没有匹配的论文。",
      no_awards: "当前公开记录中没有获奖信息。",
      no_public_repositories: "暂未列出公开仓库。",
      no_project_directions: "暂未列出项目方向。",
    },
    tags: {
      Official: "官方",
      Academic: "学术",
      Code: "代码",
      Repository: "仓库",
      Identifier: "标识",
      Registry: "注册",
      PDF: "PDF",
      TeX: "TeX",
      Markdown: "Markdown",
      JSON: "JSON",
      Python: "Python",
    },
    timeline_categories: {
      Position: "任职",
      Service: "服务",
      Education: "教育",
      Fellowship: "奖助",
      Editorial: "编辑",
      Teaching: "教学",
      Visit: "访问",
    },
    status: {
      published: "已发表",
      in_press: "即将刊出",
      submitted: "已投稿",
      under_review: "审稿中",
      accepted: "已录用",
      preprint: "预印本",
    },
    type: {
      journal: "期刊",
      conference: "会议",
      preprint: "预印本",
    },
    publication_type_phrase: {
      journal: "期刊论文",
      conference: "会议论文",
      preprint: "预印本",
    },
  },
};

const THEME_STORAGE_KEY = "sichen-homepage-theme";
const LOCALE_STORAGE_KEY = "sichen-homepage-locale";
const THEME_SWITCH_SEQUENCE = ["tohoku", "toyama", "usst", "base"];
const LOCALE_SWITCH_SEQUENCE = ["en", "ja", "zh"];
let themeUiBound = false;
let localeUiBound = false;
let switcherHoverBound = false;
let scrollTopUiBound = false;
let topnavOverflowBound = false;
let topnavMenuBound = false;
let headerControlsPositionBound = false;
let headerControlsPositionTicking = false;
let scrollTopButton = null;
let dataReady = false;
const switcherCloseTimers = new WeakMap();

function normalizeString(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

function escapeHtml(value) {
  return normalizeString(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function escapeRegex(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function toTitle(value) {
  return normalizeString(value).replaceAll("_", " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

function truncateText(value, limit = 110) {
  const text = normalizeString(value);
  return text.length > limit ? `${text.slice(0, limit - 1)}…` : text;
}

function currentPage() {
  return document.body.dataset.page || "home";
}

const staticTextCatalog = {
  ja: {
    "Base": "標準テーマ",
    "Assistant Professor": "助教",
    "IEEE International Symposium on Embedded Multicore/Many-core Systems-on-Chip (MCSoC) 2026 Track Chair": "IEEE 組込みマルチコア／メニーコア SoC 国際シンポジウム（MCSoC）2026 分科会座長",
    "Doctor of Engineering conferred": "博士（工学）取得",
    "Editor Assistant": "編集補助",
    "JST SPRING Researcher": "JST SPRING 研究員",
    "JST Fellowship Researcher": "JSTフェローシップ研究員",
    "Research Visit": "訪問研究",
    "Research Assistant": "研究補助員",
    "Entered doctoral program": "博士課程入学",
    "Teaching Assistant": "ティーチング・アシスタント",
    "Entered master's program": "修士課程入学",
    "Research Student": "研究生",
    "Bachelor of Engineering conferred": "学士（工学）取得",
    "Entered bachelor's program": "学士課程入学",
    "High Performance Computing Laboratory, Cyberscience Center, Tohoku University": "東北大学サイバーサイエンスセンター高性能計算研究部",
    "19th IEEE MCSoC 2026, Shanghai Jiao Tong University": "第19回 IEEE MCSoC 2026・上海交通大学",
    "Tohoku University": "東北大学",
    "University of Toyama": "富山大学",
    "Frontiers in Neuroscience": "Frontiers in Neuroscience",
    "Japan Science and Technology Agency": "科学技術振興機構",
    "Mathematics (MDPI)": "Mathematics（MDPI）",
    "Department of Physiology, The University of Tokyo": "東京大学生理学教室",
    "AI Laboratory, University of Toyama": "富山大学 AI 研究室",
    "Japan Science and Technology Agency and University of Toyama": "科学技術振興機構・富山大学",
    "Graduate School of Science and Engineering for Education, University of Toyama": "富山大学大学院理工学教育部",
    "University of Shanghai for Science and Technology": "上海理工大学",
    "Sendai, Japan": "日本・仙台",
    "The Japan Society for Evolutionary Computation": "日本進化計算学会",
    "Chinese": "中国語",
    "Japanese": "日本語",
    "English": "英語",
    "Native": "母語",
    "Professional working proficiency": "実務レベル",
    "Artificial intelligence": "人工知能",
    "Deep learning": "深層学習",
    "Brain-inspired neural networks": "脳着想ニューラルネットワーク",
    "Computational intelligence": "計算知能",
    "Evolutionary optimization": "進化的最適化",
    "Reinforcement learning": "強化学習",
    "High-performance computing": "高性能計算",
    "Wind farm layout optimization": "風力発電所レイアウト最適化",
    "Human-robot collaboration": "人間・ロボット協調",
    "Healthcare and medical AI": "医療AI",
    "AI for science": "AI for Science",
    "Industry 5.0": "Industry 5.0",
    "Autonomous driving": "自動運転",
    "Weather and spatiotemporal modeling": "気象・時空間モデリング",
    "Tohoku University Cyberscience Center": "東北大学サイバーサイエンスセンター",
    "Takizawa Lab Member Page": "滝沢研究室メンバーページ",
    "Takizawa Lab Joining Announcement": "滝沢研究室着任案内",
    "University of Toyama Dissertation Record": "富山大学学位論文リポジトリ",
    "Current CV PDF": "最新CV（PDF）",
    "Current CV Source": "最新CVソース",
    "Public Dossier PDF": "公開ドシエ（PDF）",
    "Public Dossier JSON": "公開ドシエ（JSON）",
    "Dossier Generator Script": "ドシエ生成スクリプト",
    "Research Collaborators Directory": "共同研究者一覧",
    "Official Ranking Sources Note": "ランキング出典メモ",
    "CAS Journal Ranking Explanation": "中科院分区説明資料",
    "CCF Recommended Venues Directory 2022": "CCF推奨会議・ジャーナル一覧 2022",
    "CCF Recommended Venues Portal Snapshot": "CCF推奨掲載先ポータル保存版",
    "CCF AI Category Snapshot": "CCF AIカテゴリ保存版",
    "CAS Platform Home Snapshot": "中科院分区プラットフォーム保存版",
    "CEC 2025 RDEx Competition System": "CEC 2025 RDEx 競技システム",
    "CEC 2024 Multi-objective Benchmark Suite": "CEC 2024 多目的ベンチマークスイート",
    "Frontier Radar": "Frontier Radar",
    "Reconstructed Differential Evolution": "Reconstructed Differential Evolution",
    "GitHub Research Code Archive": "GitHub 研究コードアーカイブ",
    "Local-first research radar for tracking frontier teams, papers, repositories, and emerging directions across multiple domains.": "フロンティア研究チーム、論文、リポジトリ、新興方向を横断的に追跡するローカルファースト研究レーダー。",
    "Competition-oriented implementation around reconstructed differential evolution and benchmark-driven optimization.": "reconstructed differential evolution とベンチマーク駆動型最適化を中心としたコンペティション向け実装。",
    "Public benchmark suite for multi-objective evolutionary computation research and evaluation.": "多目的進化計算の研究と評価に向けた公開ベンチマークスイート。",
    "Repository focused on differential evolution research code and related optimization experiments.": "差分進化法の研究コードと関連する最適化実験に焦点を当てたリポジトリ。",
    "Public landing point for research code, prototypes, and competition-oriented implementation artifacts.": "研究コード、プロトタイプ、コンペティション向け実装成果物を集約した公開入口。",
    "Research Radar": "研究レーダー",
    "Optimization": "最適化",
    "Benchmarking": "ベンチマーク",
    "Method": "手法",
    "Code Profile": "コードプロフィール",
    "IEEE Congress on Evolutionary Computation (CEC) 2025 Competition Champion": "IEEE Congress on Evolutionary Computation（CEC）2025 競技優勝",
    "IEEE World Congress on Computational Intelligence (WCCI) 2024 Competition Silver Award": "IEEE World Congress on Computational Intelligence（WCCI）2024 競技準優勝",
    "Japan Science and Technology Agency (JST) Support for Pioneering Research Initiated by the Next Generation (SPRING) Fellowship Recipient": "科学技術振興機構（JST）次世代研究者挑戦的研究プログラム（SPRING）採択者",
    "Japan Science and Technology Agency (JST) University Fellowship Recipient": "科学技術振興機構（JST）大学フェローシップ採択者",
    "JGC-S Scholarship Recipient": "JGC-S 奨学金採択者",
    "Asahi International Education Foundation Scholarship Recipient": "アサヒ国際教育財団奨学金採択者",
    "ESI Highly Cited Paper": "ESI高被引用論文",
    "Champion of the bound-constrained single-objective numerical optimization competition track at the IEEE Congress on Evolutionary Computation (CEC) 2025.": "IEEE Congress on Evolutionary Computation（CEC）2025 の有界単一目的数値最適化コンペティショントラック優勝。",
    "Champion of the constrained single-objective numerical optimization competition track at the IEEE Congress on Evolutionary Computation (CEC) 2025.": "IEEE Congress on Evolutionary Computation（CEC）2025 の制約付き単一目的数値最適化コンペティショントラック優勝。",
    "Champion of the bound-constrained multi-objective numerical optimization competition track at the IEEE Congress on Evolutionary Computation (CEC) 2025.": "IEEE Congress on Evolutionary Computation（CEC）2025 の有界多目的数値最適化コンペティショントラック優勝。",
    "Champion of the constrained multi-objective numerical optimization competition track at the IEEE Congress on Evolutionary Computation (CEC) 2025.": "IEEE Congress on Evolutionary Computation（CEC）2025 の制約付き多目的数値最適化コンペティショントラック優勝。",
    "Silver award in the numerical optimization competition track at the IEEE World Congress on Computational Intelligence (WCCI) 2024.": "IEEE World Congress on Computational Intelligence（WCCI）2024 の数値最適化コンペティショントラック準優勝。",
    "IEEE Congress on Evolutionary Computation (CEC) is a world-class event in evolutionary computation and one of the flagship conferences of the IEEE Computational Intelligence Society.": "IEEE Congress on Evolutionary Computation（CEC）は、進化計算分野の世界的会議であり、IEEE Computational Intelligence Society のフラッグシップ会議の一つです。",
    "IEEE World Congress on Computational Intelligence (WCCI) is the world's largest technical event on computational intelligence, bringing together the three flagship conferences of the IEEE Computational Intelligence Society under one roof.": "IEEE World Congress on Computational Intelligence（WCCI）は、計算知能分野で世界最大規模の技術会議であり、IEEE Computational Intelligence Society の3つのフラッグシップ会議を一堂に集めます。",
    "Japan Science and Technology Agency (JST), Support for Pioneering Research Initiated by the Next Generation (SPRING).": "科学技術振興機構（JST）による次世代研究者挑戦的研究プログラム（SPRING）。",
    "Japan Science and Technology Agency (JST), Establishment of University Fellowships towards the Creation of Science, Technology and Innovation.": "科学技術振興機構（JST）による次世代科学技術イノベーション創出大学フェローシップ構築事業。",
    "Awarded the JGC-S Scholarship through the designated-university nomination process.": "指定大学推薦プロセスを経て JGC-S 奨学金を受給。",
    "Awarded the Asahi International Education Foundation Scholarship as a selected international student in Toyama.": "富山で学ぶ選抜留学生としてアサヒ国際教育財団奨学金を受給。",
    "JST explains that SPRING selects outstanding PhD students and provides sustained support for research and living expenses as well as career development opportunities, enabling them to pursue unrestricted, challenging, and interdisciplinary research.": "JST によれば、SPRING は優れた博士課程学生を選抜し、研究費・生活費相当額の支援とキャリア形成支援を継続的に提供することで、自由で挑戦的かつ学際的な研究に専念できるようにする制度です。",
    "JST explains that this program supports universities under integrated university-wide strategies so they can nurture excellent doctoral students who will drive future science, technology, and innovation in Japan.": "JST によれば、このプログラムは大学全体の戦略のもとで、日本の将来の科学技術とイノベーションを担う優れた博士人材の育成を支援するものです。",
    "The JGC-S Scholarship Foundation is a public-interest foundation supporting self-financed international students in science and engineering at designated universities in Japan.": "JGC-S 奨学財団は、日本の指定大学に在籍する理工系の私費留学生を支援する公益財団です。",
    "The Asahi International Education Foundation provides financial aid to selected international college students in Toyama from ASEAN and other countries.": "アサヒ国際教育財団は、ASEAN などから富山に学ぶ選抜留学生に対して経済的支援を提供しています。",
    "Support for Pioneering Research Initiated by the Next Generation": "次世代研究者挑戦的研究プログラム",
    "Establishment of University Fellowships towards the Creation of Science, Technology and Innovation": "次世代科学技術イノベーション創出大学フェローシップ構築事業",
    "Recognized by Clarivate Essential Science Indicators (ESI) as a Highly Cited Paper, placing the paper in the worldwide top 1% by citations for its field and publication year.": "Clarivate Essential Science Indicators（ESI）により高被引用論文として認定され、当該分野・出版年において被引用数で世界上位1%に入った論文。",
    "Artificial Visual System for Motion Direction Detection modeled by retina neuroscientific knowledge.": "網膜神経科学の知見に基づく運動方向検出向け人工視覚システム。",
    "Deep neural network implementations for motion direction detection.": "運動方向検出のための深層ニューラルネットワーク実装。",
    "Wind farm layout optimization benchmark platform coded in MATLAB.": "MATLAB による風力発電所レイアウト最適化ベンチマーク基盤。",
    "Spherical Search Algorithm with memory-guided population stage-wise control for bound-constrained optimization.": "有界最適化に向けた、memory-guided population stage-wise control を備える Spherical Search Algorithm。",
    "Level-direction guided hierarchical genetic learning particle swarm optimization for wind farm layout optimization.": "風力発電所レイアウト最適化に向けた level-direction guided hierarchical genetic learning particle swarm optimization。",
    "Potential-unleashed high performance differential evolution for wind farm layout optimization.": "風力発電所レイアウト最適化に向けた potential-unleashed high-performance differential evolution。",
    "Reconstructed differential evolution variant for the CEC2024 competition.": "CEC 2024 コンペティション向け reconstructed differential evolution 変種。",
    "AI-powered mortality-risk modeling workflow for VA-ECMO patients.": "VA-ECMO 患者の死亡リスク推定に向けた AI ワークフロー。",
    "Title wording across official sources": "公的情報源間での肩書表記",
    "Scope of the record": "記録の対象範囲",
    "Google Scholar rate limiting": "Google Scholar のレート制限",
    "Publication metric evidence": "論文指標の根拠",
    "CAS ranking evidence": "中科院分区の根拠",
    "CCF venue ranking evidence": "CCF掲載先分級の根拠",
    "Update cadence": "更新タイミング",
    "Google Scholar profile": "Google Scholar プロフィール",
    "J-GLOBAL researcher profile": "J-GLOBAL 研究者プロフィール",
    "Takizawa Lab member page": "滝沢研究室メンバーページ",
    "Takizawa Lab joining announcement": "滝沢研究室着任案内",
    "SENAC staff note": "SENAC 職員告知",
    "Tohoku University Cyberscience Center research division page": "東北大学サイバーサイエンスセンター研究部門ページ",
    "ResearchMap profile": "ResearchMap プロフィール",
    "GitHub profile": "GitHub プロフィール",
    "ResearchGate profile": "ResearchGate プロフィール",
    "ORCID record": "ORCID レコード",
    "University of Toyama dissertation record": "富山大学学位論文リポジトリ",
    "Public sources differ slightly: Takizawa Lab and J-GLOBAL describe the role as \"Assistant Professor\", while the SENAC staff notice identifies the appointment as \"Specially Appointed Assistant Professor\" in the Supercomputing Research Division.": "公開情報源によって肩書表記に差があります。滝沢研究室とJ-GLOBALでは「Assistant Professor」と記載される一方、SENAC の職員告知ではスーパーコンピューティング研究部門の「Specially Appointed Assistant Professor」と記載されています。",
    "This dossier synthesizes public internet sources only. Counts can differ across Google Scholar and J-GLOBAL because the underlying databases index different records.": "本ドシエは公開インターネット情報のみを統合しています。Google Scholar と J-GLOBAL では索引対象が異なるため、件数が一致しない場合があります。",
    "Google Scholar temporarily returned HTTP 429 during automated refresh. When that happened, this script reused the live stats already captured in-session and normalized publication metadata through OpenAlex and Crossref.": "自動更新時に Google Scholar が一時的に HTTP 429 を返しました。その際は、同一セッション内で取得済みの統計値を再利用し、論文メタデータは OpenAlex と Crossref で正規化しました。",
    "IF and JCR links now prioritize official Clarivate Journal Citation Reports journal-profile pages for the traced year. The site keeps supporting source links alongside the official JCR path for redundancy.": "IF と JCR のリンクは、追跡対象年の Clarivate Journal Citation Reports 公式 journal-profile ページを優先しています。冗長性確保のため、公開参照ページも併記しています。",
    "The official CAS Journal Ranking platform is fenqubiao.com. Direct journal detail pages are not consistently public, so the portal keeps accessible per-journal support pages for visible quartile values while archiving official CAS platform materials locally.": "中科院分区の公式プラットフォームは fenqubiao.com です。各誌の詳細ページは常に公開されているわけではないため、本サイトでは確認可能な公開補助ページを残しつつ、公式資料もローカルに保存しています。",
    "The portal archives official CCF ranking materials locally, including the 2022 recommended international conferences and journals PDF and current official portal pages.": "本サイトでは、2022年版の国際会議・ジャーナル推奨PDFと現行の公式ポータルページを含む CCF の公式資料をローカル保存しています。",
    "This portal was regenerated on the same date as the dossier snapshot and supplements it with the current CV-only entries not yet present in the indexed record.": "本サイトはドシエのスナップショットと同日に再生成され、索引記録にはまだ現れていない CV ベースの最新項目も補っています。",
    "Journal review": "ジャーナル査読",
    "Conference review": "会議査読",
  },
  zh: {
    "Base": "基础主题",
    "Assistant Professor": "助理教授",
    "IEEE International Symposium on Embedded Multicore/Many-core Systems-on-Chip (MCSoC) 2026 Track Chair": "IEEE 嵌入式多核/众核片上系统国际研讨会（MCSoC）2026 分会主席",
    "Doctor of Engineering conferred": "获得工学博士学位",
    "Editor Assistant": "编辑助理",
    "JST SPRING Researcher": "JST SPRING 研究人员",
    "JST Fellowship Researcher": "JST Fellowship 研究人员",
    "Research Visit": "访问研究",
    "Research Assistant": "研究助理",
    "Entered doctoral program": "进入博士课程",
    "Teaching Assistant": "教学助理",
    "Entered master's program": "进入硕士课程",
    "Research Student": "研究生",
    "Bachelor of Engineering conferred": "获得工学学士学位",
    "Entered bachelor's program": "进入本科课程",
    "High Performance Computing Laboratory, Cyberscience Center, Tohoku University": "东北大学网络科学中心高性能计算实验室",
    "19th IEEE MCSoC 2026, Shanghai Jiao Tong University": "第19届 IEEE MCSoC 2026，上海交通大学",
    "Tohoku University": "东北大学",
    "University of Toyama": "富山大学",
    "Frontiers in Neuroscience": "Frontiers in Neuroscience",
    "Japan Science and Technology Agency": "日本科学技术振兴机构",
    "Mathematics (MDPI)": "Mathematics（MDPI）",
    "Department of Physiology, The University of Tokyo": "东京大学生理学教室",
    "AI Laboratory, University of Toyama": "富山大学 AI 实验室",
    "Japan Science and Technology Agency and University of Toyama": "日本科学技术振兴机构与富山大学",
    "Graduate School of Science and Engineering for Education, University of Toyama": "富山大学理工学教育部",
    "University of Shanghai for Science and Technology": "上海理工大学",
    "Sendai, Japan": "日本仙台",
    "The Japan Society for Evolutionary Computation": "日本进化计算学会",
    "Chinese": "中文",
    "Japanese": "日语",
    "English": "英语",
    "Native": "母语",
    "Professional working proficiency": "专业工作水平",
    "Artificial intelligence": "人工智能",
    "Deep learning": "深度学习",
    "Brain-inspired neural networks": "脑启发神经网络",
    "Computational intelligence": "计算智能",
    "Evolutionary optimization": "进化优化",
    "Reinforcement learning": "强化学习",
    "High-performance computing": "高性能计算",
    "Wind farm layout optimization": "风电场布局优化",
    "Human-robot collaboration": "人机协作",
    "Healthcare and medical AI": "医疗 AI",
    "AI for science": "AI for Science",
    "Industry 5.0": "工业 5.0",
    "Autonomous driving": "自动驾驶",
    "Weather and spatiotemporal modeling": "气象与时空建模",
    "Tohoku University Cyberscience Center": "东北大学网络科学中心",
    "Takizawa Lab Member Page": "泷泽实验室成员页面",
    "Takizawa Lab Joining Announcement": "泷泽实验室入职公告",
    "University of Toyama Dissertation Record": "富山大学学位论文记录",
    "Current CV PDF": "当前 CV（PDF）",
    "Current CV Source": "当前 CV 源文件",
    "Public Dossier PDF": "公开档案（PDF）",
    "Public Dossier JSON": "公开档案（JSON）",
    "Dossier Generator Script": "档案生成脚本",
    "Research Collaborators Directory": "合作作者目录",
    "Official Ranking Sources Note": "排名来源说明",
    "CAS Journal Ranking Explanation": "中科院分区说明",
    "CCF Recommended Venues Directory 2022": "CCF 推荐会议与期刊目录 2022",
    "CCF Recommended Venues Portal Snapshot": "CCF 推荐刊物门户快照",
    "CCF AI Category Snapshot": "CCF AI 分类快照",
    "CAS Platform Home Snapshot": "中科院分区平台首页快照",
    "CEC 2025 RDEx Competition System": "CEC 2025 RDEx 竞赛系统",
    "CEC 2024 Multi-objective Benchmark Suite": "CEC 2024 多目标基准套件",
    "Frontier Radar": "Frontier Radar",
    "Reconstructed Differential Evolution": "Reconstructed Differential Evolution",
    "GitHub Research Code Archive": "GitHub 研究代码档案",
    "Local-first research radar for tracking frontier teams, papers, repositories, and emerging directions across multiple domains.": "面向前沿团队、论文、代码仓库与新兴方向追踪的本地优先研究雷达平台。",
    "Competition-oriented implementation around reconstructed differential evolution and benchmark-driven optimization.": "围绕 reconstructed differential evolution 与基准驱动优化构建的竞赛导向实现。",
    "Public benchmark suite for multi-objective evolutionary computation research and evaluation.": "面向多目标进化计算研究与评测的公开基准套件。",
    "Repository focused on differential evolution research code and related optimization experiments.": "聚焦差分进化研究代码及相关优化实验的仓库。",
    "Public landing point for research code, prototypes, and competition-oriented implementation artifacts.": "汇集研究代码、原型系统与竞赛导向实现成果的公开入口。",
    "Research Radar": "研究雷达",
    "Optimization": "优化",
    "Benchmarking": "基准测试",
    "Method": "方法",
    "Code Profile": "代码主页",
    "IEEE Congress on Evolutionary Computation (CEC) 2025 Competition Champion": "IEEE Congress on Evolutionary Computation（CEC）2025 竞赛冠军",
    "IEEE World Congress on Computational Intelligence (WCCI) 2024 Competition Silver Award": "IEEE World Congress on Computational Intelligence（WCCI）2024 竞赛亚军",
    "Japan Science and Technology Agency (JST) Support for Pioneering Research Initiated by the Next Generation (SPRING) Fellowship Recipient": "日本科学技术振兴机构（JST）次世代开拓性研究支持计划（SPRING）资助获得者",
    "Japan Science and Technology Agency (JST) University Fellowship Recipient": "日本科学技术振兴机构（JST）大学 Fellowship 计划资助获得者",
    "JGC-S Scholarship Recipient": "JGC-S 奖学金获得者",
    "Asahi International Education Foundation Scholarship Recipient": "朝日国际教育财团奖学金获得者",
    "ESI Highly Cited Paper": "ESI 高被引论文",
    "Champion of the bound-constrained single-objective numerical optimization competition track at the IEEE Congress on Evolutionary Computation (CEC) 2025.": "IEEE Congress on Evolutionary Computation（CEC）2025 有界单目标数值优化竞赛赛道冠军。",
    "Champion of the constrained single-objective numerical optimization competition track at the IEEE Congress on Evolutionary Computation (CEC) 2025.": "IEEE Congress on Evolutionary Computation（CEC）2025 约束单目标数值优化竞赛赛道冠军。",
    "Champion of the bound-constrained multi-objective numerical optimization competition track at the IEEE Congress on Evolutionary Computation (CEC) 2025.": "IEEE Congress on Evolutionary Computation（CEC）2025 有界多目标数值优化竞赛赛道冠军。",
    "Champion of the constrained multi-objective numerical optimization competition track at the IEEE Congress on Evolutionary Computation (CEC) 2025.": "IEEE Congress on Evolutionary Computation（CEC）2025 约束多目标数值优化竞赛赛道冠军。",
    "Silver award in the numerical optimization competition track at the IEEE World Congress on Computational Intelligence (WCCI) 2024.": "IEEE World Congress on Computational Intelligence（WCCI）2024 数值优化竞赛赛道亚军。",
    "IEEE Congress on Evolutionary Computation (CEC) is a world-class event in evolutionary computation and one of the flagship conferences of the IEEE Computational Intelligence Society.": "IEEE Congress on Evolutionary Computation（CEC）是进化计算领域的世界级国际会议，也是 IEEE Computational Intelligence Society 的旗舰会议之一。",
    "IEEE World Congress on Computational Intelligence (WCCI) is the world's largest technical event on computational intelligence, bringing together the three flagship conferences of the IEEE Computational Intelligence Society under one roof.": "IEEE World Congress on Computational Intelligence（WCCI）是计算智能领域全球规模最大的技术会议，汇集了 IEEE Computational Intelligence Society 旗下三大旗舰会议。",
    "Japan Science and Technology Agency (JST), Support for Pioneering Research Initiated by the Next Generation (SPRING).": "日本科学技术振兴机构（JST）“次世代开拓性研究支持计划（SPRING）”。",
    "Japan Science and Technology Agency (JST), Establishment of University Fellowships towards the Creation of Science, Technology and Innovation.": "日本科学技术振兴机构（JST）“面向科技创新的人才培养大学 Fellowship 计划”。",
    "Awarded the JGC-S Scholarship through the designated-university nomination process.": "通过指定大学推荐程序获得 JGC-S 奖学金。",
    "Awarded the Asahi International Education Foundation Scholarship as a selected international student in Toyama.": "作为在富山学习的选拔留学生获得朝日国际教育财团奖学金。",
    "JST explains that SPRING selects outstanding PhD students and provides sustained support for research and living expenses as well as career development opportunities, enabling them to pursue unrestricted, challenging, and interdisciplinary research.": "JST 官方说明，SPRING 选拔优秀的博士生，为其提供持续的研究经费、生活费支持和职业发展支持，使其能够专注于自由、挑战性强且跨学科的研究。",
    "JST explains that this program supports universities under integrated university-wide strategies so they can nurture excellent doctoral students who will drive future science, technology, and innovation in Japan.": "JST 官方说明，该项目在大学整体战略下支持博士生培养，旨在汇聚并培养未来引领日本科技与创新的优秀博士人才。",
    "The JGC-S Scholarship Foundation is a public-interest foundation supporting self-financed international students in science and engineering at designated universities in Japan.": "JGC-S 奖学财团是面向日本指定大学理工科自费留学生的公益基金机构。",
    "The Asahi International Education Foundation provides financial aid to selected international college students in Toyama from ASEAN and other countries.": "朝日国际教育财团面向来自东盟等国家、在富山就读的选拔留学生提供经济资助。",
    "Support for Pioneering Research Initiated by the Next Generation": "次世代开拓性研究支持计划",
    "Establishment of University Fellowships towards the Creation of Science, Technology and Innovation": "面向科技创新的人才培养大学 Fellowship 计划",
    "Recognized by Clarivate Essential Science Indicators (ESI) as a Highly Cited Paper, placing the paper in the worldwide top 1% by citations for its field and publication year.": "被 Clarivate Essential Science Indicators（ESI）认定为高被引论文，在所属学科和出版年份中位列被引量世界前 1%。",
    "Artificial Visual System for Motion Direction Detection modeled by retina neuroscientific knowledge.": "基于视网膜神经科学知识构建的运动方向检测人工视觉系统。",
    "Deep neural network implementations for motion direction detection.": "用于运动方向检测的深度神经网络实现。",
    "Wind farm layout optimization benchmark platform coded in MATLAB.": "使用 MATLAB 实现的风电场布局优化基准平台。",
    "Spherical Search Algorithm with memory-guided population stage-wise control for bound-constrained optimization.": "面向有界优化、采用 memory-guided population stage-wise control 的 Spherical Search Algorithm。",
    "Level-direction guided hierarchical genetic learning particle swarm optimization for wind farm layout optimization.": "用于风电场布局优化的 level-direction guided hierarchical genetic learning particle swarm optimization。",
    "Potential-unleashed high performance differential evolution for wind farm layout optimization.": "用于风电场布局优化的 potential-unleashed high-performance differential evolution。",
    "Reconstructed differential evolution variant for the CEC2024 competition.": "面向 CEC 2024 竞赛的 reconstructed differential evolution 变体。",
    "AI-powered mortality-risk modeling workflow for VA-ECMO patients.": "面向 VA-ECMO 患者死亡风险评估的 AI 工作流。",
    "Title wording across official sources": "官方来源中的职称表述",
    "Scope of the record": "记录范围",
    "Google Scholar rate limiting": "Google Scholar 访问限制",
    "Publication metric evidence": "论文指标依据",
    "CAS ranking evidence": "中科院分区依据",
    "CCF venue ranking evidence": "CCF 分级依据",
    "Update cadence": "更新时间",
    "Google Scholar profile": "Google Scholar 主页",
    "J-GLOBAL researcher profile": "J-GLOBAL 研究者主页",
    "Takizawa Lab member page": "泷泽实验室成员页面",
    "Takizawa Lab joining announcement": "泷泽实验室入职公告",
    "SENAC staff note": "SENAC 人员公告",
    "Tohoku University Cyberscience Center research division page": "东北大学网络科学中心研究部门页面",
    "ResearchMap profile": "ResearchMap 主页",
    "GitHub profile": "GitHub 主页",
    "ResearchGate profile": "ResearchGate 主页",
    "ORCID record": "ORCID 记录",
    "University of Toyama dissertation record": "富山大学学位论文记录",
    "Public sources differ slightly: Takizawa Lab and J-GLOBAL describe the role as \"Assistant Professor\", while the SENAC staff notice identifies the appointment as \"Specially Appointed Assistant Professor\" in the Supercomputing Research Division.": "公开来源中的职称表述略有差异：泷泽实验室与 J-GLOBAL 记为“Assistant Professor”，而 SENAC 的人员公告则写作超级计算研究部门的“Specially Appointed Assistant Professor”。",
    "This dossier synthesizes public internet sources only. Counts can differ across Google Scholar and J-GLOBAL because the underlying databases index different records.": "本档案仅整合公开互联网来源。由于底层数据库收录范围不同，Google Scholar 与 J-GLOBAL 的统计数可能不完全一致。",
    "Google Scholar temporarily returned HTTP 429 during automated refresh. When that happened, this script reused the live stats already captured in-session and normalized publication metadata through OpenAlex and Crossref.": "自动刷新期间，Google Scholar 曾暂时返回 HTTP 429。发生这种情况时，脚本会复用当前会话中已获取的统计值，并通过 OpenAlex 与 Crossref 规范化论文元数据。",
    "IF and JCR links now prioritize official Clarivate Journal Citation Reports journal-profile pages for the traced year. The site keeps supporting source links alongside the official JCR path for redundancy.": "IF 与 JCR 链接现在优先指向对应年份的 Clarivate Journal Citation Reports 官方 journal-profile 页面，同时保留公开参考页作为辅助依据。",
    "The official CAS Journal Ranking platform is fenqubiao.com. Direct journal detail pages are not consistently public, so the portal keeps accessible per-journal support pages for visible quartile values while archiving official CAS platform materials locally.": "中科院分区的官方平台为 fenqubiao.com。由于各期刊详情页并不稳定公开，本网站保留了可访问的公开辅助页面用于展示分区，同时在本地归档官方材料。",
    "The portal archives official CCF ranking materials locally, including the 2022 recommended international conferences and journals PDF and current official portal pages.": "本网站在本地归档了 CCF 官方分级材料，包括 2022 年推荐国际会议与期刊 PDF 以及当前官方门户页面。",
    "This portal was regenerated on the same date as the dossier snapshot and supplements it with the current CV-only entries not yet present in the indexed record.": "本网站与档案快照在同日重新生成，并补充了索引记录中尚未出现但已写入当前 CV 的条目。",
    "Journal review": "期刊审稿",
    "Conference review": "会议审稿",
  },
};

function lt(value) {
  const text = normalizeString(value);
  if (!text) {
    return "";
  }
  const localeName = resolveLocaleName();
  return staticTextCatalog[localeName]?.[text] || text;
}

function getTranslationValue(localeName, key) {
  return key.split(".").reduce((value, part) => value?.[part], translations[localeName]);
}

function formatMessage(template, values = {}) {
  return String(template).replace(/\{(\w+)\}/g, (_, key) => values[key] ?? "");
}

function resolveLocaleName() {
  const queryLocale = new URLSearchParams(window.location.search).get("lang");
  if (queryLocale && localeCatalog[queryLocale]) {
    return queryLocale;
  }

  try {
    const savedLocale = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (savedLocale && localeCatalog[savedLocale]) {
      return savedLocale;
    }
  } catch {}

  const documentLocale = document.documentElement.lang || "en";
  if (documentLocale.startsWith("ja")) {
    return "ja";
  }
  if (documentLocale.startsWith("zh")) {
    return "zh";
  }
  return "en";
}

function nextLocaleName(currentLocale = resolveLocaleName()) {
  const sequence = LOCALE_SWITCH_SEQUENCE.filter((localeName) => localeCatalog[localeName]);
  const pointer = sequence.indexOf(currentLocale);
  if (pointer === -1) {
    return sequence[0] || "en";
  }
  return sequence[(pointer + 1) % sequence.length];
}

function t(key, values = {}) {
  const localeName = resolveLocaleName();
  const message = getTranslationValue(localeName, key) ?? getTranslationValue("en", key) ?? key;
  return formatMessage(message, values);
}

function countLabel(count, forms) {
  const localeName = resolveLocaleName();
  if (localeName === "en") {
    return `${count} ${count === 1 ? forms.enOne : forms.enOther}`;
  }
  if (localeName === "ja") {
    return `${count}${forms.ja}`;
  }
  return `${count}${forms.zh}`;
}

function unitWord(kind) {
  const localeName = resolveLocaleName();
  const words = {
    items: {
      en: t("labels.items"),
      ja: t("labels.items"),
      zh: t("labels.items"),
    },
    repos: {
      en: t("labels.repos"),
      ja: t("labels.repos"),
      zh: t("labels.repos"),
    },
    venues: {
      en: t("labels.venues"),
      ja: t("labels.venues"),
      zh: t("labels.venues"),
    },
  };
  return words[kind]?.[localeName] || words[kind]?.en || kind;
}

function formatLocalizedLanguage(item = {}) {
  const label = lt(item?.label);
  const level = lt(item?.level);
  if (!label) {
    return "";
  }
  if (!level) {
    return label;
  }
  return resolveLocaleName() === "ja" ? `${label}（${level}）` : `${label} (${level})`;
}

function localizedQuickProfileLabel(title = "") {
  const localeName = resolveLocaleName();
  if (title === "Takizawa Lab Member Page") {
    if (localeName === "ja") {
      return "滝沢研究室";
    }
    if (localeName === "zh") {
      return "泷泽实验室";
    }
    return "Takizawa Lab";
  }
  return lt(title);
}

function translateTag(key) {
  return t(`tags.${key}`);
}

function translateTimelineCategory(key) {
  return t(`timeline_categories.${key}`);
}

function formatRole(value, note = "") {
  return note || (value && value !== "coauthor" ? toTitle(value) : "");
}

function statusLabel(value) {
  return getTranslationValue(resolveLocaleName(), `status.${value}`) ?? toTitle(value);
}

function typeLabel(value) {
  return getTranslationValue(resolveLocaleName(), `type.${value}`) ?? toTitle(value);
}

function publicationTypePhrase(value) {
  return getTranslationValue(resolveLocaleName(), `publication_type_phrase.${value}`) ?? normalizeString(typeLabel(value)).toLowerCase();
}

function normalizeDashes(value = "") {
  return normalizeString(value).replace(/[‐‑‒–—]/g, "-");
}

function formatIeeeAuthorName(name) {
  const cleaned = normalizeDashes(name).replace(/\s+/g, " ").trim();
  if (!cleaned) {
    return "";
  }

  const tokens = cleaned.split(" ").filter(Boolean);
  if (tokens.length === 1) {
    return cleaned;
  }

  const surname = tokens.pop();
  const initials = tokens
    .map((token) =>
      token
        .split("-")
        .filter(Boolean)
        .map((segment) => {
          const bare = segment.replace(/\./g, "");
          return bare ? `${bare.charAt(0).toUpperCase()}.` : "";
        })
        .filter(Boolean)
        .join("-"),
    )
    .filter(Boolean)
    .join(" ");

  return `${initials} ${surname}`.trim();
}

function publicationHasCorrespondingMark(item) {
  return item?.author_role === "corresponding_author" || /corresponding/i.test(item?.role_note || "");
}

function publicationHasFirstAuthorMark(item) {
  return ["first_author", "co_first_author"].includes(item?.author_role) || /first author/i.test(item?.role_note || "");
}

function publicationInlineAuthorRoleLabel(item) {
  const role = normalizeString(item?.author_role);
  const note = normalizeString(item?.role_note);
  if (role === "co_first_author" || /co-first author/i.test(note)) {
    return t("roles.co_first_author");
  }
  return "";
}

function formatIeeeAuthorMarkup(authors = [], item = {}) {
  const formatted = authors
    .map((name) => {
      const ieeeName = formatIeeeAuthorName(name);
      if (!ieeeName) {
        return "";
      }

      const isSelf = normalizeString(name).toLowerCase() === "sichen tao";
      const inlineRole = isSelf ? publicationInlineAuthorRoleLabel(item) : "";
      const inner = isSelf
        ? `<span class="author-self">${escapeHtml(ieeeName)}${publicationHasCorrespondingMark(item) ? '<sup class="author-star">*</sup>' : ""}${inlineRole ? `<span class="author-self-note"> (${escapeHtml(inlineRole)})</span>` : ""}</span>`
        : escapeHtml(ieeeName);
      return inner;
    })
    .filter(Boolean);

  if (!formatted.length) {
    return "";
  }
  if (formatted.length === 1) {
    return formatted[0];
  }
  if (formatted.length === 2) {
    return `${formatted[0]} and ${formatted[1]}`;
  }
  return `${formatted.slice(0, -1).join(", ")}, and ${formatted.at(-1)}`;
}

function formatIeeeAuthorText(authors = []) {
  const formatted = authors.map((name) => formatIeeeAuthorName(name)).filter(Boolean);
  if (!formatted.length) {
    return "";
  }
  if (formatted.length === 1) {
    return formatted[0];
  }
  if (formatted.length === 2) {
    return `${formatted[0]} and ${formatted[1]}`;
  }
  return `${formatted.slice(0, -1).join(", ")}, and ${formatted.at(-1)}`;
}

function publicationRoleNote(item) {
  const note = normalizeString(item?.role_note);
  if (!note) {
    return "";
  }
  if (
    /^corresponding author(?: and first author)?$/i.test(note)
    || /^first author$/i.test(note)
    || /^co-first author$/i.test(note)
  ) {
    return "";
  }
  return note;
}

function extractPublicationYear(item) {
  if (item.year) {
    return String(item.year);
  }
  const date = normalizeString(item.date);
  const match = date.match(/\b(\d{4})\b/);
  return match ? match[1] : t("filters.no_date");
}

function formatMonthYear(dateValue) {
  const value = normalizeString(dateValue);
  if (!value) {
    return "";
  }

  const match = value.match(/^(\d{4})-(\d{1,2})(?:-(\d{1,2}))?$/);
  if (!match) {
    return /^\d{4}$/.test(value) ? value : "";
  }

  const [, year, month] = match;
  const monthIndex = Number(month) - 1;
  const months = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."];
  return months[monthIndex] ? `${months[monthIndex]} ${year}` : year;
}

function formatPublicationPages(pages) {
  const value = normalizeDashes(pages);
  if (!value) {
    return "";
  }

  const [start, end] = value.split("-");
  if (end) {
    return start === end ? `Art. no. ${start}` : `pp. ${start}-${end}`;
  }

  return /^\d+$/.test(value) ? `Art. no. ${value}` : `p. ${value}`;
}

function conferenceProceedingsVenue(venue = "") {
  const value = normalizeString(venue);
  if (!value) {
    return "";
  }
  return /^(?:in\s+proceedings\b|proceedings\b)/i.test(value)
    ? value.replace(/^in\s+/i, "")
    : `Proceedings of ${value}`;
}

function publicationVenueLine(item) {
  if (item.type === "journal" && ["submitted", "under_review"].includes(item.status)) {
    const separator = resolveLocaleName() === "en" ? ": " : "：";
    return `${t("labels.target_journal")}${separator}${item.venue}.`;
  }

  const year = extractPublicationYear(item);
  const pages = formatPublicationPages(item.pages);

  if (item.type === "conference") {
    const venue = conferenceProceedingsVenue(item.venue);
    const dateLabel = formatMonthYear(item.date) || year;
    return [venue, pages, dateLabel].filter(Boolean).join(", ") + ".";
  }

  if (item.type === "preprint") {
    return [item.venue || "arXiv", year].filter(Boolean).join(", ") + ".";
  }

  const segments = [
    item.venue,
    item.volume ? `vol. ${item.volume}` : "",
    item.issue ? `no. ${item.issue}` : "",
    pages,
    year,
  ].filter(Boolean);

  return segments.join(", ") + ".";
}

function publicationVenueText(item) {
  return publicationVenueLine(item).replace(/\.\s*$/, "");
}

function buildIeeeCitationText(item) {
  const authors = formatIeeeAuthorText(item.authors);
  const title = normalizeString(item.title) ? `"${normalizeString(item.title)},"` : "";
  const year = extractPublicationYear(item);
  const doiPart = item.doi ? ` doi: ${item.doi}.` : "";

  if (item.type === "journal" && ["submitted", "under_review"].includes(item.status)) {
    const statusText = item.status === "submitted" ? "submitted to" : "under review at";
    return [authors, title, `${statusText} ${item.venue}, ${year}.`].filter(Boolean).join(" ") + doiPart;
  }

  if (item.status === "accepted" && !publicationPrimaryUrl(item)) {
    return [authors, title, `accepted for publication in ${item.venue}, ${year}.`].filter(Boolean).join(" ") + doiPart;
  }

  if (item.status === "in_press") {
    return [authors, title, `${publicationVenueText(item)}, early access.`].filter(Boolean).join(" ") + doiPart;
  }

  return [authors, title, `${publicationVenueText(item)}.`].filter(Boolean).join(" ") + doiPart;
}

function bibtexEscapeValue(value = "") {
  return normalizeString(value).replace(/\s+/g, " ").trim();
}

function bibtexIdentifierToken(value = "") {
  return normalizeString(value)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-Za-z0-9]+/g, " ")
    .trim()
    .toLowerCase();
}

const BIBTEX_TITLE_STOPWORDS = new Set([
  "a", "an", "and", "the", "of", "for", "to", "in", "on", "with", "by", "using", "via",
  "from", "their", "its", "into", "toward", "towards", "based", "driven",
]);

function buildBibtexKey(item) {
  const firstAuthor = Array.isArray(item?.authors) && item.authors.length ? item.authors[0] : "publication";
  const authorTokenSource = bibtexIdentifierToken(firstAuthor).split(" ").filter(Boolean);
  const authorToken = authorTokenSource.length ? authorTokenSource.at(-1) : "publication";
  const titleTokens = bibtexIdentifierToken(item?.title)
    .split(" ")
    .filter((token) => token && !BIBTEX_TITLE_STOPWORDS.has(token));
  const titleToken = titleTokens[0] || "work";
  const yearToken = extractPublicationYear(item) || "nd";
  return `${authorToken}${yearToken}${titleToken}`.replace(/[^a-z0-9]/g, "");
}

function bibtexMonthToken(dateValue = "") {
  const match = normalizeString(dateValue).match(/^\d{4}-(\d{1,2})(?:-\d{1,2})?$/);
  if (!match) {
    return "";
  }
  const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
  return months[Number(match[1]) - 1] || "";
}

function buildBibtexField(name, value, options = {}) {
  const text = bibtexEscapeValue(value);
  if (!text) {
    return "";
  }
  if (options.raw) {
    return `  ${name} = ${text},`;
  }
  if (options.doubleBraces) {
    return `  ${name} = {{${text}}},`;
  }
  return `  ${name} = {${text}},`;
}

function buildBibtexText(item) {
  const entryType = item.type === "conference"
    ? "inproceedings"
    : item.type === "preprint"
      ? "misc"
      : ["submitted", "under_review"].includes(item.status)
        ? "unpublished"
        : "article";
  const fields = [];
  const year = extractPublicationYear(item);
  const month = bibtexMonthToken(item.date);
  const primaryUrl = publicationPrimaryUrl(item);
  const pages = normalizeDashes(item.pages);
  const proceedingsVenue = conferenceProceedingsVenue(item.venue);

  fields.push(buildBibtexField("author", (item.authors || []).map((name) => normalizeString(name)).filter(Boolean).join(" and ")));
  fields.push(buildBibtexField("title", item.title, { doubleBraces: true }));

  if (entryType === "article") {
    fields.push(buildBibtexField("journal", item.venue));
  } else if (entryType === "inproceedings") {
    fields.push(buildBibtexField("booktitle", proceedingsVenue));
  } else if (entryType === "misc") {
    fields.push(buildBibtexField("howpublished", item.venue === "arXiv" ? "arXiv preprint" : item.venue || "Preprint"));
  }

  fields.push(buildBibtexField("year", year));
  fields.push(buildBibtexField("month", month, { raw: true }));
  fields.push(buildBibtexField("volume", item.volume));
  fields.push(buildBibtexField("number", item.issue));
  fields.push(buildBibtexField("pages", pages));

  if (entryType === "misc" && /arxiv/i.test(item.venue || "")) {
    const arxivMatch = `${item.doi || ""} ${item.url || ""}`.match(/arXiv\.([0-9]+\.[0-9]+(?:v\d+)?)/i);
    fields.push(buildBibtexField("archivePrefix", "arXiv"));
    fields.push(buildBibtexField("eprint", arxivMatch ? arxivMatch[1] : ""));
  }

  if (item.status === "in_press") {
    fields.push(buildBibtexField("note", "In press"));
  } else if (item.status === "accepted" && !primaryUrl) {
    fields.push(buildBibtexField("note", "Accepted for publication"));
  } else if (item.status === "submitted") {
    fields.push(buildBibtexField("note", `Submitted to ${item.venue}`));
  } else if (item.status === "under_review") {
    fields.push(buildBibtexField("note", `Under review at ${item.venue}`));
  }

  fields.push(buildBibtexField("doi", item.doi));
  fields.push(buildBibtexField("url", primaryUrl));

  return `@${entryType}{${buildBibtexKey(item)},\n${fields.filter(Boolean).join("\n")}\n}`;
}

function publicationCopyActionLabel(format) {
  return format === "bibtex" ? t("actions.copy_bibtex") : t("actions.copy_citation");
}

function publicationCopySuccessLabel(format) {
  return format === "bibtex" ? t("actions.copied_bibtex") : t("actions.copied_citation");
}

function publicationCopyMenuLabel() {
  return t("actions.copy_menu");
}

function publicationStatusNote(item) {
  const hasWebPage = Boolean(publicationPrimaryUrl(item));

  if (item.status === "in_press") {
    return `${statusLabel(item.status)}.`;
  }
  if (item.status === "accepted" && !hasWebPage) {
    return `${statusLabel(item.status)}.`;
  }
  if (item.status === "submitted" || item.status === "under_review") {
    return `${statusLabel(item.status)}.`;
  }
  return "";
}

function publicationVerificationNote(item) {
  const verification = item?.verification || {};
  const localeName = resolveLocaleName();
  return (
    verification[`verification_note_${localeName}`]
    || verification.verification_note_en
    || ""
  );
}

function publicationPrimaryUrl(item) {
  return item.publisher_url || item.url || (item.doi ? `https://doi.org/${item.doi}` : "");
}

const OFFICIAL_DOCS_BASE = "/assets/docs/official";
const METRIC_OFFICIAL_PAGE_LABEL = "Official Page";
const METRIC_PUBLIC_EVIDENCE_LABEL = "Public Evidence";
const JCR_OFFICIAL_SEARCH_URL = "https://jcr.clarivate.com/jcr/home";
const CAS_OFFICIAL_ARCHIVE_URL = `${OFFICIAL_DOCS_BASE}/cas_journal_ranking_explanation_official.pdf`;
const CCF_OFFICIAL_ARCHIVE_URL = `${OFFICIAL_DOCS_BASE}/ccf_recommended_venues_2022_official.pdf`;
const CCF_PUBLIC_EVIDENCE_URL = `${OFFICIAL_DOCS_BASE}/ccf_recommended_venues_portal_official.html`;

function isScholarProfileCitationUrl(url = "") {
  const value = normalizeString(url);
  return /scholar\.google\.com\/citations\?user=/i.test(value);
}

function publicationMetricYear(item, metricKind) {
  const verification = item?.verification || {};
  const metricYear = verification?.[`${metricKind}_year`];
  if (metricYear !== undefined && metricYear !== null && metricYear !== "") {
    return String(metricYear);
  }

  return normalizeString(item?.year) || "";
}

function publicationMetricVenue(item) {
  return normalizeString(item?.venue) || "";
}

function metricYearNumber(value) {
  const parsed = Number.parseInt(String(value || ""), 10);
  return Number.isFinite(parsed) ? parsed : null;
}

function isClarivateJournalProfileUrl(url = "") {
  const value = normalizeString(url);
  return Boolean(value && /jcr\.clarivate\.com\/jcr(?:-jp)?\/journal-profile/i.test(value));
}

function isClarivateSearchUrl(url = "") {
  const value = normalizeString(url);
  return Boolean(
    value
    && (
      /mjl\.clarivate\.com\/search-results/i.test(value)
      || /jcr\.clarivate\.com\/jcr(?:-jp)?\/home/i.test(value)
      || /clarivate\.com\/search-results/i.test(value)
    )
  );
}

function isFenqubiaoPlatformUrl(url = "") {
  const value = normalizeString(url);
  return Boolean(value && /fenqubiao\.com\/?$/i.test(value));
}

function isGoogleScholarDirectUrl(url = "") {
  const value = normalizeString(url);
  return Boolean(value && /scholar\.google\./i.test(value) && !isScholarProfileCitationUrl(value));
}

function isOpenAlexDirectUrl(url = "") {
  const value = normalizeString(url);
  return Boolean(value && /openalex\.org\//i.test(value));
}

function isSemanticScholarDirectUrl(url = "") {
  const value = normalizeString(url);
  return Boolean(value && /semanticscholar\.org\//i.test(value));
}

function buildGoogleScholarCitationUrl(item) {
  const direct = normalizeString(item?.citation_sources?.google_scholar?.url);
  const mode = normalizeString(item?.citation_sources?.google_scholar?.mode);
  if (direct && mode === "direct" && isGoogleScholarDirectUrl(direct)) {
    return direct;
  }

  return buildScholarCitationSearchUrl(item);
}

function buildScholarCitationSearchUrl(item) {
  const doi = normalizeString(item?.doi);
  if (doi) {
    return `https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=${encodeURIComponent(doi)}`;
  }

  const title = normalizeString(item?.title);
  if (!title) {
    return "";
  }
  return `https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=${encodeURIComponent(`"${title}"`)}`;
}

function buildOpenAlexCitationUrl(item) {
  const direct = normalizeString(item?.citation_sources?.openalex?.url);
  const mode = normalizeString(item?.citation_sources?.openalex?.mode);
  if (direct && mode === "direct" && isOpenAlexDirectUrl(direct)) {
    return direct;
  }
  const doi = normalizeString(item?.doi);
  if (doi) {
    return `https://openalex.org/works?search=${encodeURIComponent(`doi:${doi}`)}`;
  }

  const title = normalizeString(item?.title);
  if (!title) {
    return "";
  }
  return `https://openalex.org/works?search=${encodeURIComponent(`"${title}"`)}`;
}

function buildSemanticScholarCitationUrl(item) {
  const direct = normalizeString(item?.citation_sources?.semantic_scholar?.url);
  const mode = normalizeString(item?.citation_sources?.semantic_scholar?.mode);
  if (direct && mode === "direct" && isSemanticScholarDirectUrl(direct)) {
    return direct;
  }

  const doi = normalizeString(item?.doi);
  if (doi) {
    return `https://www.semanticscholar.org/search?q=${encodeURIComponent(doi)}`;
  }

  const title = normalizeString(item?.title);
  if (!title) {
    return "";
  }
  return `https://www.semanticscholar.org/search?q=${encodeURIComponent(`"${title}"`)}`;
}

function publicationCitationUrl(item) {
  const scholarSource = normalizeString(item?.citation_sources?.google_scholar?.url);
  const scholarMode = normalizeString(item?.citation_sources?.google_scholar?.mode);
  if (scholarSource && scholarMode === "direct" && isGoogleScholarDirectUrl(scholarSource)) {
    return scholarSource;
  }

  const openAlexDirect = normalizeString(item?.citation_sources?.openalex?.url);
  const openAlexMode = normalizeString(item?.citation_sources?.openalex?.mode);
  if (openAlexDirect && (!openAlexMode || openAlexMode === "direct") && isOpenAlexDirectUrl(openAlexDirect)) {
    return openAlexDirect;
  }

  const semanticSource = normalizeString(item?.citation_sources?.semantic_scholar?.url);
  const semanticMode = normalizeString(item?.citation_sources?.semantic_scholar?.mode);
  if (semanticSource && semanticMode === "direct" && isSemanticScholarDirectUrl(semanticSource)) {
    return semanticSource;
  }

  const sourceUrl = normalizeString(item?.citation_source_url);
  if (sourceUrl && (isGoogleScholarDirectUrl(sourceUrl) || isOpenAlexDirectUrl(sourceUrl) || isSemanticScholarDirectUrl(sourceUrl))) {
    return sourceUrl;
  }
  return buildGoogleScholarCitationUrl(item);
}

function metricLinkBundle(item, metricKind) {
  const verification = item?.verification || {};
  const venue = publicationMetricVenue(item);

  if (metricKind === "impact") {
    return {
      officialLabel: METRIC_OFFICIAL_PAGE_LABEL,
      officialUrl: "",
      publicUrl: normalizeString(verification.if_public_source_url || verification.if_supporting_source_url),
      searchFallbackUrl: JCR_OFFICIAL_SEARCH_URL,
      searchCopyText: verification.if_search_copy_text || venue || "",
      searchTooltip: t("actions.open_jcr_search_copy"),
      searchCopySuccessLabel: t("actions.copied_journal_name"),
    };
  }

  if (metricKind === "jcr") {
    return {
      officialLabel: METRIC_OFFICIAL_PAGE_LABEL,
      officialUrl: "",
      publicUrl: normalizeString(
        verification.jcr_public_source_url
        || verification.jcr_supporting_source_url
        || verification.if_public_source_url
        || verification.if_supporting_source_url
      ),
      searchFallbackUrl: JCR_OFFICIAL_SEARCH_URL,
      searchCopyText: verification.jcr_search_copy_text || verification.if_search_copy_text || venue || "",
      searchTooltip: t("actions.open_jcr_search_copy"),
      searchCopySuccessLabel: t("actions.copied_journal_name"),
    };
  }

  if (metricKind === "cas") {
    return {
      officialLabel: METRIC_OFFICIAL_PAGE_LABEL,
      officialUrl: CAS_OFFICIAL_ARCHIVE_URL,
      publicUrl: normalizeString(
        verification.cas_public_source_url || verification.cas_supporting_source_url || verification.cas_source_url
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

function metricOptionsForPublication(item, metricKind) {
  const bundle = metricLinkBundle(item, metricKind);
  const options = [];
  const officialFallbackOption = !bundle.officialUrl && bundle.searchFallbackUrl
    ? {
        label: bundle.officialLabel,
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

  return buildPublicationMetricOptions(options);
}

function publicationDoiMarkup(item) {
  if (!item.doi) {
    return "";
  }

  const href = publicationPrimaryUrl(item);
  const doiValue = escapeHtml(item.doi);
  return `
    <p class="doi-line">
      <span class="doi-label">${escapeHtml(t("labels.doi"))}</span>
      <span class="doi-value">${href ? buildLink(href, item.doi) : doiValue}</span>
    </p>
  `;
}

function publicationVenueMarkup(item) {
  const href = normalizeString(item?.venue_url);
  const year = extractPublicationYear(item);
  const pages = formatPublicationPages(item.pages);
  const linkedVenue = href ? buildLink(href, item.venue || "") : escapeHtml(item.venue || "");

  if (item.type === "journal" && ["submitted", "under_review"].includes(item.status)) {
    const separator = resolveLocaleName() === "en" ? ": " : "：";
    return `${escapeHtml(t("labels.target_journal"))}${separator}${linkedVenue}.`;
  }

  if (item.type === "conference") {
    const venue = /^(?:in\s+proceedings\b|proceedings\b)/i.test(item.venue || "")
      ? linkedVenue
      : `Proceedings of&nbsp;${linkedVenue}`;
    const dateLabel = formatMonthYear(item.date) || year;
    return [venue, pages ? escapeHtml(pages) : "", dateLabel ? escapeHtml(dateLabel) : ""].filter(Boolean).join(", ") + ".";
  }

  if (item.type === "preprint") {
    return [linkedVenue || escapeHtml("arXiv"), year ? escapeHtml(year) : ""].filter(Boolean).join(", ") + ".";
  }

  const segments = [
    linkedVenue,
    item.volume ? escapeHtml(`vol. ${item.volume}`) : "",
    item.issue ? escapeHtml(`no. ${item.issue}`) : "",
    pages ? escapeHtml(pages) : "",
    year ? escapeHtml(year) : "",
  ].filter(Boolean);

  return segments.join(", ") + ".";
}

function publicationMetricsLine(item) {
  const verification = item?.verification || {};
  const bits = [];

  if (item.type === "journal" && verification.if_value) {
    bits.push(`${t("labels.if_short")}: ${verification.if_value}`);
  }

  bits.push(`${t("labels.citations")}: ${item.citations || 0}`);
  return bits.join(" · ");
}

function buildPublicationMetricOptions(definitions) {
  const seen = new Set();
  return definitions.filter((option) => {
    const href = normalizeString(option?.href);
    if (!href || seen.has(href)) {
      return false;
    }
    seen.add(href);
    option.href = href;
    return true;
  });
}

function publicationMetricsMarkup(item) {
  const verification = item?.verification || {};
  const metrics = [];
  const ifBundle = metricLinkBundle(item, "impact");
  const jcrBundle = metricLinkBundle(item, "jcr");
  const ifOptions = metricOptionsForPublication(item, "impact");
  const jcrOptions = metricOptionsForPublication(item, "jcr");
  const casOptions = metricOptionsForPublication(item, "cas");
  const citationOptions = buildPublicationMetricOptions([
    {
      label: "Google Scholar",
      href: buildGoogleScholarCitationUrl(item),
      copyText:
        normalizeString(item?.citation_sources?.google_scholar?.mode) === "search"
          ? normalizeString(item?.citation_sources?.google_scholar?.copy_text)
          : "",
      tooltip:
        normalizeString(item?.citation_sources?.google_scholar?.mode) === "search"
          ? t("actions.open_search_copy")
          : "",
      copySuccessLabel:
        normalizeString(item?.citation_sources?.google_scholar?.mode) === "search"
          ? t("actions.copied_search_query")
          : "",
    },
    {
      label: "OpenAlex",
      href: buildOpenAlexCitationUrl(item),
      copyText:
        normalizeString(item?.citation_sources?.openalex?.mode) === "search"
          ? normalizeString(item?.citation_sources?.openalex?.copy_text)
          : "",
      tooltip:
        normalizeString(item?.citation_sources?.openalex?.mode) === "search"
          ? t("actions.open_search_copy")
          : "",
      copySuccessLabel:
        normalizeString(item?.citation_sources?.openalex?.mode) === "search"
          ? t("actions.copied_search_query")
          : "",
    },
    {
      label: "Semantic Scholar (S2)",
      href: buildSemanticScholarCitationUrl(item),
      copyText:
        normalizeString(item?.citation_sources?.semantic_scholar?.mode) === "search"
          ? normalizeString(item?.citation_sources?.semantic_scholar?.copy_text)
          : "",
      tooltip:
        normalizeString(item?.citation_sources?.semantic_scholar?.mode) === "search"
          ? t("actions.open_search_copy")
          : "",
      copySuccessLabel:
        normalizeString(item?.citation_sources?.semantic_scholar?.mode) === "search"
          ? t("actions.copied_search_query")
          : "",
    },
  ]);

  if (item.type === "journal" && verification.if_value) {
    metrics.push({
      label: t("labels.if_short"),
      value: verification.if_value,
      meta: verification.if_year ? String(verification.if_year) : "",
      tone: "impact",
      href: ifOptions.length === 1 ? ifOptions[0].href : ifBundle.officialUrl || ifBundle.publicUrl || ifBundle.searchFallbackUrl || "",
      options: ifOptions,
      copyText: ifOptions.length <= 1 && ifBundle.searchFallbackUrl ? ifBundle.searchCopyText : "",
      tooltip: ifOptions.length <= 1 && ifBundle.searchFallbackUrl ? ifBundle.searchTooltip : "",
    });
  }

  if (item.type === "journal" && verification.jcr_quartile) {
    metrics.push({
      label: t("labels.jcr"),
      value: verification.jcr_quartile,
      meta: verification.jcr_year ? String(verification.jcr_year) : "",
      tone: "jcr",
      href: jcrOptions.length === 1 ? jcrOptions[0].href : jcrBundle.officialUrl || jcrBundle.publicUrl || jcrBundle.searchFallbackUrl || "",
      options: jcrOptions,
      copyText: jcrOptions.length <= 1 && jcrBundle.searchFallbackUrl ? jcrBundle.searchCopyText : "",
      tooltip: jcrOptions.length <= 1 && jcrBundle.searchFallbackUrl ? jcrBundle.searchTooltip : "",
    });
  }

  if (item.type === "journal" && verification.cas_quartile) {
    metrics.push({
      label: t("labels.cas"),
      value: verification.cas_quartile,
      meta: [verification.cas_top ? t("labels.top") : "", verification.cas_year ? String(verification.cas_year) : ""].filter(Boolean).join(" · "),
      tone: "cas",
      href: casOptions.length === 1 ? casOptions[0].href : (casOptions[0]?.href || ""),
      options: casOptions,
    });
  }

  if (item.ccf?.class) {
    const ccfOptions = buildPublicationMetricOptions([
      {
        label: METRIC_OFFICIAL_PAGE_LABEL,
        href: normalizeString(item.ccf.source_url) || CCF_OFFICIAL_ARCHIVE_URL,
      },
      {
        label: METRIC_PUBLIC_EVIDENCE_LABEL,
        href: normalizeString(item.ccf.supporting_url) || CCF_PUBLIC_EVIDENCE_URL,
      },
    ]);
    metrics.push({
      label: t("labels.ccf"),
      value: item.ccf.class,
      meta: item.ccf.year ? String(item.ccf.year) : "",
      tone: "ccf",
      href: ccfOptions.length === 1 ? ccfOptions[0].href : (ccfOptions[0]?.href || ""),
      options: ccfOptions,
    });
  }

  if (!item.omit_citations) {
    metrics.push({
      label: t("labels.citations"),
      value: String(item.citations || 0),
      meta: "",
      tone: "citation",
      href: buildGoogleScholarCitationUrl(item),
      options: citationOptions,
    });
  }

  return `
    <div class="publication-metrics" aria-label="${escapeHtml(t("labels.publication_metrics"))}">
      ${metrics
        .map(
          (metric) => {
            const hasMenu = Array.isArray(metric.options) && metric.options.length > 1;
            const metricBody = `
              <span class="publication-metric-label">${escapeHtml(metric.label)}</span>
              <span class="publication-metric-value">${escapeHtml(metric.value)}</span>
              ${metric.meta ? `<span class="publication-metric-meta">${escapeHtml(metric.meta)}</span>` : ""}
            `;

            if (hasMenu) {
              return `
                <div class="publication-metric-group publication-metric-menu">
                  <button
                    class="publication-metric publication-metric-${escapeHtml(metric.tone)} publication-metric-trigger"
                    type="button"
                    aria-label="${escapeHtml(t("actions.metric_sources"))}"
                  >
                    ${metricBody}
                  </button>
                  <span class="publication-metric-options" role="menu" aria-label="${escapeHtml(t("actions.metric_sources"))}">
                    ${metric.options
                      .map(
                        (option) => `
                          <a
                            class="publication-metric-option"
                            href="${escapeHtml(option.href)}"
                            target="_blank"
                            rel="noreferrer"
                            role="menuitem"
                            ${
                              option.copyText
                                ? `data-copy-on-open="true" data-copy-text="${escapeHtml(option.copyText)}" data-tooltip="${escapeHtml(option.tooltip || t("actions.open_jcr_search_copy"))}" data-copy-success-label="${escapeHtml(option.copySuccessLabel || t("actions.copied_journal_name"))}" aria-label="${escapeHtml(option.tooltip || t("actions.open_jcr_search_copy"))}" title="${escapeHtml(option.tooltip || t("actions.open_jcr_search_copy"))}"`
                                : ""
                            }
                          >
                            <span>${escapeHtml(option.label)}</span>
                          </a>
                        `,
                      )
                      .join("")}
                  </span>
                </div>
              `;
            }

            return `
              <div class="publication-metric-group">
                <${metric.href ? "a" : "span"}
                  class="publication-metric publication-metric-${escapeHtml(metric.tone)}${metric.href ? " publication-metric-link" : ""}"
                  ${metric.href ? `href="${escapeHtml(metric.href)}" target="_blank" rel="noreferrer"` : ""}
                  ${
                    metric.copyText
                      ? `data-copy-on-open="true" data-copy-text="${escapeHtml(metric.copyText)}" data-tooltip="${escapeHtml(metric.tooltip || t("actions.open_jcr_search_copy"))}" data-copy-success-label="${escapeHtml(t("actions.copied_journal_name"))}" aria-label="${escapeHtml(metric.tooltip || t("actions.open_jcr_search_copy"))}" title="${escapeHtml(metric.tooltip || t("actions.open_jcr_search_copy"))}"`
                      : ""
                  }
                >
                  ${metricBody}
                </${metric.href ? "a" : "span"}>
              </div>
            `;
          },
        )
        .join("")}
    </div>
  `;
}

function serviceMetricsMarkup(item) {
  if (item?.tag !== "Journal review" || !item?.verification) {
    return "";
  }
  return publicationMetricsMarkup({
    type: "journal",
    venue: item.label,
    verification: item.verification,
    omit_citations: true,
  });
}

function resolveThemeName() {
  const queryTheme = new URLSearchParams(window.location.search).get("theme");
  if (queryTheme && themeCatalog[queryTheme]) {
    return queryTheme;
  }

  try {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme === "base") {
      return "tohoku";
    }
    if (savedTheme && themeCatalog[savedTheme]) {
      return savedTheme;
    }
  } catch {}

  const documentTheme = document.documentElement.dataset.theme;
  if (documentTheme && themeCatalog[documentTheme]) {
    return documentTheme;
  }

  return "tohoku";
}

function nextThemeName(currentTheme = resolveThemeName()) {
  const sequence = THEME_SWITCH_SEQUENCE.filter((themeName) => themeCatalog[themeName]);
  const pointer = sequence.indexOf(currentTheme);
  if (pointer === -1) {
    return sequence[0] || "base";
  }
  return sequence[(pointer + 1) % sequence.length];
}

function renderLocaleSwitchers() {
  if (!els.localeSwitchers.length) {
    els.localeChoices = Array.from(document.querySelectorAll("[data-locale-choice]"));
    els.localeTriggers = Array.from(document.querySelectorAll("[data-locale-trigger]"));
    return;
  }

  const activeLocaleName = resolveLocaleName();
  const activeLocale = localeCatalog[activeLocaleName] || localeCatalog.en;
  const localeButtons = Object.entries(localeCatalog)
    .map(
      ([localeName, locale]) => `
        <button
          class="locale-chip"
          type="button"
          data-locale-choice="${escapeHtml(localeName)}"
          aria-pressed="false"
          aria-label="${escapeHtml(locale.name)}"
          title="${escapeHtml(locale.name)}"
        >
          <span class="locale-label" aria-hidden="true">${escapeHtml(locale.label)}</span>
        </button>
      `,
    )
    .join("");

  els.localeSwitchers.forEach((switcher) => {
    switcher.innerHTML = `
      <button
        class="locale-trigger"
        type="button"
        data-locale-trigger
        aria-haspopup="true"
        aria-expanded="false"
        aria-label="${escapeHtml(t("controls.cycle_languages"))}"
        title="${escapeHtml(t("controls.cycle_languages"))}"
      >
        <span class="locale-label" data-locale-current-label>${escapeHtml(activeLocale.label)}</span>
      </button>
      <div class="locale-tray" role="group" aria-label="${escapeHtml(t("controls.language_choices"))}">
        ${localeButtons}
      </div>
    `;
  });

  els.localeChoices = Array.from(document.querySelectorAll("[data-locale-choice]"));
  els.localeTriggers = Array.from(document.querySelectorAll("[data-locale-trigger]"));
  renderPortalReturnControl();
}

function renderThemeSwitchers() {
  if (!els.themeSwitchers.length) {
    els.themeChoices = Array.from(document.querySelectorAll("[data-theme-choice]"));
    els.themeTriggers = Array.from(document.querySelectorAll("[data-theme-trigger]"));
    return;
  }

  const activeThemeName = resolveThemeName();
  const activeTheme = themeCatalog[activeThemeName] || themeCatalog.base;
  const themeButtons = Object.entries(themeCatalog)
    .map(
      ([themeName, theme]) => `
        <button
          class="theme-chip"
          type="button"
          data-theme-choice="${escapeHtml(themeName)}"
          aria-pressed="false"
          aria-label="${escapeHtml(translatedThemeTooltip(themeName))}"
          title="${escapeHtml(translatedThemeTooltip(themeName))}"
        >
          <span class="theme-swatch ${escapeHtml(theme.swatchClass)}" aria-hidden="true"></span>
        </button>
      `,
    )
    .join("");

  els.themeSwitchers.forEach((switcher) => {
    switcher.innerHTML = `
      <button
        class="theme-trigger"
        type="button"
        data-theme-trigger
        aria-haspopup="true"
        aria-expanded="false"
        aria-label="${escapeHtml(t("controls.cycle_themes"))}"
        title="${escapeHtml(translatedThemeTooltip(activeThemeName))}"
      >
        <span class="theme-swatch ${escapeHtml(activeTheme.swatchClass)}" data-theme-current-swatch aria-hidden="true"></span>
      </button>
      <div class="theme-tray" role="group" aria-label="${escapeHtml(t("controls.theme_choices"))}">
        ${themeButtons}
      </div>
    `;
  });

  els.themeChoices = Array.from(document.querySelectorAll("[data-theme-choice]"));
  els.themeTriggers = Array.from(document.querySelectorAll("[data-theme-trigger]"));
  renderPortalReturnControl();
}

function renderPortalReturnControl() {
  if (!els.headerControls) {
    return;
  }

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
  }[resolveLocaleName() || "en"];

  const currentPath = window.location.pathname;
  const items = [
    {
      href: "/",
      label: labels.portal,
      icon: iconSprite("home"),
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

  els.headerControls.querySelectorAll(".portal-return-link").forEach((node) => node.remove());

  let switcher = els.headerControls.querySelector(".portal-switcher");
  if (!switcher) {
    switcher = document.createElement("div");
    switcher.className = "portal-switcher control-switcher";
    els.headerControls.insertBefore(switcher, els.headerControls.firstElementChild);
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
      ${iconSprite("home")}
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

function closeLocaleSwitchers() {
  els.localeSwitchers.forEach((switcher) => {
    clearSwitcherCloseTimer(switcher);
    setSwitcherExpandedState(switcher, false);
  });
}

function closeThemeSwitchers() {
  els.themeSwitchers.forEach((switcher) => {
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

function clearSwitcherCloseTimer(switcher) {
  const timerId = switcherCloseTimers.get(switcher);
  if (timerId) {
    window.clearTimeout(timerId);
    switcherCloseTimers.delete(switcher);
  }
}

function setSwitcherExpandedState(switcher, expanded) {
  if (!switcher) {
    return;
  }
  switcher.classList.toggle("is-open", expanded);
  const trigger = switcher.querySelector("[data-theme-trigger], [data-locale-trigger], [data-portal-trigger]");
  if (trigger) {
    trigger.setAttribute("aria-expanded", expanded ? "true" : "false");
  }
}

function scheduleSwitcherClose(switcher) {
  if (!switcher) {
    return;
  }
  clearSwitcherCloseTimer(switcher);
  const timerId = window.setTimeout(() => {
    setSwitcherExpandedState(switcher, false);
    switcherCloseTimers.delete(switcher);
  }, 140);
  switcherCloseTimers.set(switcher, timerId);
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
    anchor = document.createElement("div");
    anchor.className = "header-controls-anchor";
    anchor.setAttribute("aria-hidden", "true");
    container.insertBefore(anchor, controls);
  }

  return anchor;
}

function updateHeaderControlsPosition() {
  const controls = els.headerControls || document.querySelector(".header-controls");
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

function applyTheme(themeName, persist = true) {
  const nextTheme = themeCatalog[themeName] ? themeName : "base";
  document.documentElement.dataset.theme = nextTheme;

  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor) {
    themeColor.setAttribute("content", themeCatalog[nextTheme].themeColor);
  }

  els.themeChoices.forEach((button) => {
    const active = button.dataset.themeChoice === nextTheme;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", active ? "true" : "false");
  });

  document.querySelectorAll("[data-theme-current-swatch]").forEach((swatch) => {
    swatch.className = `theme-swatch ${themeCatalog[nextTheme].swatchClass}`;
  });

  els.themeTriggers.forEach((trigger) => {
    trigger.setAttribute("aria-label", t("controls.cycle_themes"));
    trigger.setAttribute("title", t("controls.cycle_themes"));
  });

  closeThemeSwitchers();

  if (!persist) {
    return;
  }

  try {
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  } catch {}
}

function applyLocale(localeName, persist = true) {
  const nextLocale = localeCatalog[localeName] ? localeName : "en";
  document.documentElement.lang = localeCatalog[nextLocale].lang;

  els.localeChoices.forEach((button) => {
    const active = button.dataset.localeChoice === nextLocale;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", active ? "true" : "false");
  });

  document.querySelectorAll("[data-locale-current-label]").forEach((node) => {
    node.textContent = localeCatalog[nextLocale].label;
  });

  els.localeTriggers.forEach((trigger) => {
    trigger.setAttribute("aria-label", t("controls.cycle_languages"));
    trigger.setAttribute("title", t("controls.cycle_languages"));
  });
  if (scrollTopButton) {
    scrollTopButton.setAttribute("aria-label", t("actions.scroll_top"));
  }

  renderThemeSwitchers();
  els.themeChoices = Array.from(document.querySelectorAll("[data-theme-choice]"));
  els.themeTriggers = Array.from(document.querySelectorAll("[data-theme-trigger]"));
  applyTheme(resolveThemeName(), false);
  bindThemeButtons();
  closeLocaleSwitchers();

  if (persist) {
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, nextLocale);
    } catch {}
  }

  if (dataReady) {
    renderCurrentPage();
  }
}

function bindThemeButtons() {
  els.themeChoices.forEach((button) => {
    if (button.dataset.themeBound === "true") {
      return;
    }
    button.dataset.themeBound = "true";
    button.addEventListener("click", () => {
      applyTheme(button.dataset.themeChoice || "base");
    });
  });

  els.themeTriggers.forEach((trigger) => {
    if (trigger.dataset.themeBound === "true") {
      return;
    }
    trigger.dataset.themeBound = "true";
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      closeAllSwitchers();
      applyTheme(nextThemeName());
    });
  });
}

function initThemeControls() {
  renderThemeSwitchers();
  applyTheme(resolveThemeName(), false);
  bindThemeButtons();
  bindSwitcherHoverBehavior();

  if (themeUiBound) {
    return;
  }

  themeUiBound = true;
  document.addEventListener("click", (event) => {
    if (event.target.closest(".theme-switcher") || event.target.closest(".locale-switcher")) {
      return;
    }
    closeAllSwitchers();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeAllSwitchers();
    }
  });
}

function initLocaleControls() {
  renderLocaleSwitchers();
  applyLocale(resolveLocaleName(), false);

  els.localeChoices.forEach((button) => {
    if (button.dataset.localeBound === "true") {
      return;
    }
    button.dataset.localeBound = "true";
    button.addEventListener("click", () => {
      applyLocale(button.dataset.localeChoice || "en");
    });
  });

  els.localeTriggers.forEach((trigger) => {
    if (trigger.dataset.localeBound === "true") {
      return;
    }
    trigger.dataset.localeBound = "true";
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      closeAllSwitchers();
      applyLocale(nextLocaleName());
    });
  });

  if (localeUiBound) {
    return;
  }

  localeUiBound = true;
  bindSwitcherHoverBehavior();
}

function ensureScrollTopButton() {
  if (scrollTopButton?.isConnected) {
    return scrollTopButton;
  }

  const button = document.createElement("button");
  button.type = "button";
  button.className = "scroll-top-button";
  button.setAttribute("aria-label", t("actions.scroll_top"));
  button.innerHTML = `
    <svg class="ui-icon" aria-hidden="true">
      <use href="./assets/icons/ui-icons.svg#icon-up"></use>
    </svg>
  `;
  document.body.append(button);
  scrollTopButton = button;
  return button;
}

function updateScrollTopButton() {
  const button = scrollTopButton || document.querySelector(".scroll-top-button");
  if (!button) {
    return;
  }
  button.classList.toggle("is-visible", window.scrollY > 28);
}

function initScrollTopButton() {
  const button = ensureScrollTopButton();

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

async function loadData() {
  if (window.SICHEN_PORTAL_DATA) {
    return window.SICHEN_PORTAL_DATA;
  }

  try {
    const response = await fetch("./data/profile-data.json", { cache: "no-store" });
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.warn("Falling back to baked-in data.", error);
  }

  return fallbackData;
}

function buildLink(url, label = "Open") {
  return `<a href="${escapeHtml(url)}" target="_blank" rel="noreferrer">${escapeHtml(label)}</a>`;
}

function buildContactValue(item) {
  if (!item) {
    return "";
  }

  const label = normalizeString(item.value);
  if (!item.href) {
    return escapeHtml(label);
  }

  const linked = buildLink(item.href, label);
  if (!String(item.href).startsWith("mailto:")) {
    return linked;
  }

  const copyLabel = t("actions.copy_email");
  const copiedLabel = t("actions.copied_email");
  return `
    <span class="stack-value-inline">
      ${linked}
      <button
        class="publication-copy-button contact-copy-button"
        type="button"
        data-copy-email="${escapeHtml(label)}"
        data-tooltip="${escapeHtml(copyLabel)}"
        data-copy-success-label="${escapeHtml(copiedLabel)}"
        aria-label="${escapeHtml(copyLabel)}"
        title="${escapeHtml(copyLabel)}"
      >
        ${iconSprite("copy")}
      </button>
    </span>
  `;
}

function localizedExternalUrl(url = "", key = "") {
  const locale = resolveLocaleName();
  const normalizedKey = String(key || "");
  const normalizedUrl = String(url || "");

  if (!normalizedUrl) {
    return normalizedUrl;
  }

  if (normalizedKey === "Google Scholar" || normalizedKey === "Google Scholar profile") {
    if (locale === "ja") {
      return normalizedUrl.replace(/([?&])hl=[^&]+/, "$1hl=ja");
    }
    if (locale === "zh") {
      return normalizedUrl.replace(/([?&])hl=[^&]+/, "$1hl=zh-CN");
    }
    return normalizedUrl.replace(/([?&])hl=[^&]+/, "$1hl=en");
  }

  if (normalizedKey === "ResearchMap" || normalizedKey === "ResearchMap profile") {
    if (locale === "ja") {
      return normalizedUrl.replace(/([?&])lang=[^&]+/, "$1lang=ja");
    }
    return normalizedUrl.replace(/([?&])lang=[^&]+/, "$1lang=en");
  }

  if (normalizedKey === "J-GLOBAL" || normalizedKey === "J-GLOBAL researcher profile") {
    if (locale === "ja" && normalizedUrl.includes("/en/")) {
      return normalizedUrl.replace("/en/", "/");
    }
    if ((locale === "en" || locale === "zh") && !normalizedUrl.includes("/en/")) {
      return normalizedUrl.replace("https://jglobal.jst.go.jp/", "https://jglobal.jst.go.jp/en/");
    }
    return normalizedUrl;
  }

  if (normalizedKey === "Takizawa Lab Member Page" || normalizedKey === "Takizawa Lab member page") {
    if (locale === "ja") {
      return "https://www.hpc.is.tohoku.ac.jp/home/member/";
    }
    return "https://www.hpc.is.tohoku.ac.jp/home-en/member-en/";
  }

  if (
    normalizedKey === "Tohoku University Cyberscience Center" ||
    normalizedKey === "Tohoku University Cyberscience Center research division page"
  ) {
    if (locale === "ja") {
      return "https://www.cc.tohoku.ac.jp/member/rd/";
    }
    return "https://www.cc.tohoku.ac.jp/english/member/rd/";
  }

  return normalizedUrl;
}

function iconSprite(name, className = "ui-icon") {
  return `<svg class="${escapeHtml(className)}" aria-hidden="true" focusable="false"><use href="./assets/icons/ui-icons.svg#icon-${escapeHtml(name)}"></use></svg>`;
}

function iconBadge(name, tone = "") {
  return `<span class="icon-badge${tone ? ` ${escapeHtml(tone)}` : ""}">${iconSprite(name)}</span>`;
}

async function copyTextToClipboard(text) {
  const value = String(text || "");
  if (!value) {
    return false;
  }

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
      return true;
    }
  } catch {}

  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  textarea.style.pointerEvents = "none";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();

  let copied = false;
  try {
    copied = document.execCommand("copy");
  } catch {}
  textarea.remove();
  return copied;
}

function iconForProfileTag(tag) {
  const mapping = {
    Official: "official",
    Academic: "academic",
    Code: "code",
    Repository: "projects",
    Identifier: "registry",
    Registry: "registry",
  };
  return mapping[tag] || "profiles";
}

function profileMarkMeta(item = {}) {
  const url = normalizeString(item?.url).toLowerCase();
  const title = normalizeString(item?.title);

  if (url.includes("scholar.google.com")) {
    return { label: "GS", tone: "scholar" };
  }
  if (url.includes("dblp.org")) {
    return { label: "DB", tone: "dblp" };
  }
  if (url.includes("orcid.org")) {
    return { label: "ID", tone: "orcid" };
  }
  if (url.includes("researchgate.net")) {
    return { label: "RG", tone: "researchgate" };
  }
  if (url.includes("researchmap.jp")) {
    return { label: "RM", tone: "researchmap" };
  }
  if (url.includes("jglobal.jst.go.jp")) {
    return { label: "JG", tone: "jglobal" };
  }
  if (url.includes("github.com")) {
    return { label: "GH", tone: "github" };
  }
  if (url.includes("toyama.repo.nii.ac.jp")) {
    return { label: "UT", tone: "toyama" };
  }
  if (url.includes("cc.tohoku.ac.jp")) {
    return { label: "TU", tone: "tohoku" };
  }
  if (url.includes("hpc.is.tohoku.ac.jp")) {
    return { label: "HPC", tone: "hpc" };
  }
  if (/tohoku/i.test(title)) {
    return { label: "TU", tone: "tohoku" };
  }
  if (/toyama/i.test(title)) {
    return { label: "UT", tone: "toyama" };
  }
  return { label: "ID", tone: "neutral" };
}

function profileMarkMarkup(item = {}) {
  const icon = normalizeString(item?.icon || "");
  const meta = profileMarkMeta(item);
  if (icon) {
    return `
      <span class="profile-mark profile-mark-image profile-mark-${escapeHtml(meta.tone)}" aria-hidden="true">
        <img src="${escapeHtml(icon)}" alt="" loading="lazy" />
      </span>
    `;
  }
  return `<span class="profile-mark profile-mark-${escapeHtml(meta.tone)}" aria-hidden="true">${escapeHtml(meta.label)}</span>`;
}

function iconForDocumentTag(tag) {
  const mapping = {
    PDF: "file",
    TeX: "file",
    HTML: "file",
    Markdown: "file",
    JSON: "registry",
    Python: "code",
  };
  return mapping[tag] || "archive";
}

function iconForTimelineCategory(category) {
  const mapping = {
    Position: "position",
    Service: "service",
    Education: "education",
    Fellowship: "fellowship",
    Editorial: "editorial",
    Teaching: "teaching",
    Visit: "visit",
  };
  return mapping[category] || "timeline";
}

function pageTitleFor(page) {
  if (page === "home") {
    return `Sichen Tao | ${t("site.home_title")}`;
  }
  return `${t(`nav.${page}`)} | Sichen Tao`;
}

function pageDescriptionFor(page) {
  const mapping = {
    home: "site.home_description",
    profiles: "site.profiles_description",
    publications: "site.publications_description",
    awards: "site.awards_description",
    projects: "site.projects_description",
    service: "site.service_description",
    timeline: "site.timeline_description",
    research: "site.research_description",
    sources: "site.sources_description",
    archive: "site.archive_description",
  };
  return t(mapping[page] || "site.home_description");
}

function translatedThemeLabel(themeName) {
  const labels = {
    base: "Base",
    tohoku: "Tohoku University",
    toyama: "University of Toyama",
    usst: "University of Shanghai for Science and Technology",
  };
  return lt(labels[themeName] || "") || themeCatalog[themeName]?.label || themeName;
}

function translatedThemeTooltip(themeName) {
  const labels = {
    base: {
      en: "Base theme",
      ja: "標準テーマ色",
      zh: "基础主题色",
    },
    tohoku: {
      en: "Tohoku University theme",
      ja: "東北大学テーマ色",
      zh: "东北大学主题色",
    },
    toyama: {
      en: "University of Toyama theme",
      ja: "富山大学テーマ色",
      zh: "富山大学主题色",
    },
    usst: {
      en: "University of Shanghai for Science and Technology theme",
      ja: "上海理工大学テーマ色",
      zh: "上海理工大学主题色",
    },
  };
  return lt(labels[themeName]?.en || "", labels[themeName]?.ja || "", labels[themeName]?.zh || "");
}

function updateLocalizedMeta(page) {
  const title = pageTitleFor(page);
  const descriptionText = pageDescriptionFor(page);
  document.title = title;

  const description = document.querySelector('meta[name="description"]');
  if (description) {
    description.setAttribute("content", descriptionText);
  }

  document.querySelectorAll('meta[property="og:title"], meta[name="twitter:title"]').forEach((node) => {
    node.setAttribute("content", title);
  });
  document.querySelectorAll('meta[property="og:description"], meta[name="twitter:description"]').forEach((node) => {
    node.setAttribute("content", descriptionText);
  });
}

function setTextForSelectors(selectors, value) {
  selectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((node) => {
      node.textContent = value;
    });
  });
}

function setAttributeForSelectors(selectors, attribute, value) {
  selectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((node) => {
      node.setAttribute(attribute, value);
    });
  });
}

function setHeroKeylines(value) {
  const container = document.getElementById("hero-keylines");
  if (!container) {
    return;
  }

  const lines = String(value || "")
    .split(/\s*[·•・]\s*/)
    .map((item) => normalizeString(item))
    .filter(Boolean);

  const safeLines = lines.length ? lines : [normalizeString(String(value || ""))];
  container.innerHTML = safeLines
    .filter(Boolean)
    .map((item) => `<span class="warm-inline-emphasis">${escapeHtml(item)}</span>`)
    .join(' <span class="hero-keyline-separator" aria-hidden="true">·</span> ');
}

function applyWarmEmphasis(value, phrases = []) {
  let markup = escapeHtml(value);
  phrases
    .map((item) => normalizeString(item))
    .filter(Boolean)
    .sort((left, right) => right.length - left.length)
    .forEach((phrase) => {
      const safe = escapeHtml(phrase);
      markup = markup.replace(new RegExp(escapeRegex(safe), "g"), `<span class="warm-inline-emphasis">${safe}</span>`);
    });
  return markup;
}

function homeAffiliationEmphasisPhrases() {
  const localeName = resolveLocaleName();
  if (localeName === "ja") {
    return ["高性能計算研究部", "サイバーサイエンスセンター", "東北大学"];
  }
  if (localeName === "zh") {
    return ["高性能计算实验室", "网络科学中心", "东北大学"];
  }
  return ["High Performance Computing Laboratory", "Cyberscience Center", "Tohoku University"];
}

function homeBioEmphasisPhrases() {
  const localeName = resolveLocaleName();
  if (localeName === "ja") {
    return ["人工知能", "最適化", "高性能計算", "AI for Science"];
  }
  if (localeName === "zh") {
    return ["人工智能", "优化", "高性能计算", "AI for Science"];
  }
  return ["artificial intelligence", "optimization", "high-performance computing", "AI for science"];
}

function sourceNoteEmphasisPhrases() {
  const localeName = resolveLocaleName();
  if (localeName === "ja") {
    return [
      "Clarivate Journal Citation Reports 公式",
      "JCR 公式導線",
      "CAS Journal Ranking 公式プラットフォーム",
      "fenqubiao.com",
      "CAS 公式資料",
      "CCF 公式分級資料",
      "2022 年推薦国際会議・ジャーナル PDF",
      "現行の公式ポータルページ",
      "ドシエのスナップショットと同日",
      "現行 CV のみの記載",
    ];
  }
  if (localeName === "zh") {
    return [
      "Clarivate Journal Citation Reports 官方",
      "JCR 官方路径",
      "中科院分区官方平台",
      "fenqubiao.com",
      "中科院平台官方资料",
      "CCF 官方分级材料",
      "2022 年推荐国际会议与期刊 PDF",
      "当前官方门户页面",
      "与档案快照同日",
      "当前 CV 独有条目",
    ];
  }
  return [
    "official Clarivate Journal Citation Reports",
    "official JCR path",
    "official CAS Journal Ranking platform",
    "fenqubiao.com",
    "official CAS platform materials",
    "official CCF ranking materials",
    "2022 recommended international conferences and journals PDF",
    "current official portal pages",
    "same date as the dossier snapshot",
    "current CV-only entries",
  ];
}

function emphasizeSourceCopy(value = "") {
  return applyWarmEmphasis(value, sourceNoteEmphasisPhrases());
}

function renderHeroContactLabel(key, label) {
  const emoji = heroContactEmojiMap[key];
  if (!emoji) {
    return escapeHtml(label);
  }
  return `<span class="stack-label-with-emoji"><span class="stack-emoji" aria-hidden="true">${emoji}</span><span>${escapeHtml(label)}</span></span>`;
}

function localizeNavigation() {
  const navMap = {
    "./index.html": "home",
    "./profiles.html": "profiles",
    "./publications.html": "publications",
    "./awards.html": "awards",
    "./projects.html": "projects",
    "./service.html": "service",
    "./timeline.html": "timeline",
    "./research.html": "research",
    "./sources.html": "sources",
    "./archive.html": "archive",
  };

  document.querySelectorAll(".topnav").forEach((nav) => {
    nav.setAttribute("aria-label", t(currentPage() === "home" ? "controls.section_navigation" : "controls.page_navigation"));
    nav.querySelectorAll("a").forEach((link) => {
      const href = link.getAttribute("href");
      const key = navMap[href];
      const labelNode = link.querySelector("span");
      if (key && labelNode) {
        labelNode.textContent = t(`nav.${key}`);
      }
    });
  });

  document.querySelectorAll("[data-topnav-toggle]").forEach((button) => {
    const shell = button.closest(".topnav-shell");
    const expanded = shell?.classList.contains("is-open");
    const label = button.querySelector(".topnav-toggle-label");
    if (label) {
      label.textContent = t("controls.menu");
    }
    button.setAttribute("aria-label", expanded ? t("controls.hide_menu") : t("controls.show_menu"));
    button.setAttribute("title", t("controls.menu"));
  });

  refreshTopnavOverflowHints();
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
  toggle.innerHTML = `
    <svg class="ui-icon" aria-hidden="true"><use href="./assets/icons/ui-icons.svg#icon-menu"></use></svg>
    <span class="topnav-toggle-label"></span>
  `;

  shell.appendChild(toggle);
  shell.appendChild(nav);

  const hint = document.createElement("div");
  hint.className = "topnav-overflow-hint";
  hint.setAttribute("aria-hidden", "true");
  hint.innerHTML = `<svg class="ui-icon" aria-hidden="true"><use href="./assets/icons/ui-icons.svg#icon-up"></use></svg>`;
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
    trigger.setAttribute("aria-label", expanded ? t("controls.hide_menu") : t("controls.show_menu"));
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
  if (active.closest(".publication-metric-menu, .publication-head-actions, .award-link-actions")) {
    active.blur();
  }
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

function applyStaticLocale() {
  const page = currentPage();
  updateLocalizedMeta(page);

  localizeNavigation();
  setAttributeForSelectors([".header-controls"], "aria-label", t("controls.display_controls"));
  setAttributeForSelectors([".locale-switcher"], "aria-label", t("controls.language"));
  setAttributeForSelectors([".theme-switcher"], "aria-label", t("controls.theme"));

  document.querySelectorAll(".footer-panel .eyebrow").forEach((node) => {
    node.textContent = t("sections.resources");
  });
  document.querySelectorAll('.footer-actions a[href="./index.html"] span').forEach((node) => {
    node.textContent = t("actions.back_home");
  });
  document.querySelectorAll('a[href="./assets/docs/CV_SichenTao.pdf"] span').forEach((node) => {
    node.textContent = t("actions.cv");
  });
  document.querySelectorAll('a[href="https://github.com/SichenTao"] span').forEach((node) => {
    node.textContent = t("actions.github_profile");
  });

  if (page === "home") {
    setHeroKeylines(t("home.eyebrow"));
    setTextForSelectors([".hero-identity .eyebrow"], t("home.current_appointment"));
    setTextForSelectors([".hero-profile-card h3"], t("home.contact_identity"));
    setTextForSelectors([".section-card .section-head h2"], t("home.pages"));
    setAttributeForSelectors(["#hero-keylines"], "aria-label", t("controls.research_focus"));
    setAttributeForSelectors([".institution-switcher"], "aria-label", t("controls.institution_themes"));
    if (els.heroPortrait) {
      els.heroPortrait.setAttribute("alt", t("home.portrait_alt"));
    }
    document.querySelectorAll(".institution-mark").forEach((button) => {
      const themeName = button.dataset.themeChoice || "base";
      const label = translatedThemeLabel(themeName);
      button.setAttribute("aria-label", label);
      button.setAttribute("title", label);
    });
    return;
  }

  setTextForSelectors([".detail-kicker .eyebrow"], t(`nav.${page}`));
  setTextForSelectors([".detail-hero h1"], t(`nav.${page}`));

  if (page === "profiles") {
    setTextForSelectors([".detail-kicker .eyebrow"], t("sections.research_identity"));
    setTextForSelectors([".section-head h2"], t("sections.public_profiles"));
    if (els.linkSearch) {
      els.linkSearch.placeholder = t("filters.search_profiles");
    }
  } else if (page === "publications") {
    setTextForSelectors([".detail-kicker .eyebrow"], t("sections.research_output"));
    setTextForSelectors([".section-head h2"], t("sections.browse_filter"));
    if (els.pubSearch) {
      els.pubSearch.placeholder = t("filters.search_publications");
    }
    if (els.filterToolbarLabel) {
      els.filterToolbarLabel.textContent = t("labels.filters");
    }
    if (els.quickFilterLabel) {
      els.quickFilterLabel.textContent = t("labels.tags");
    }
    if (els.pubReset) {
      els.pubReset.setAttribute("aria-label", t("filters.reset"));
      els.pubReset.setAttribute("title", t("filters.reset"));
    }
    document.querySelectorAll("#sort-filter option[value='recent']").forEach((node) => {
      node.textContent = t("filters.sort_recent");
    });
    document.querySelectorAll("#sort-filter option[value='impact_factor']").forEach((node) => {
      node.textContent = t("filters.sort_if");
    });
    document.querySelectorAll("#sort-filter option[value='citations']").forEach((node) => {
      node.textContent = t("filters.sort_citations");
    });
    document.querySelectorAll("#sort-filter option[value='title']").forEach((node) => {
      node.textContent = t("filters.sort_title");
    });
    if (els.venueFilter) {
      els.venueFilter.setAttribute("aria-label", t("controls.venue_filters"));
    }
    if (els.quickFilterChips) {
      els.quickFilterChips.setAttribute("aria-label", t("controls.quick_publication_filters"));
    }
  } else if (page === "awards") {
    setTextForSelectors([".detail-kicker .eyebrow"], t("sections.recognition"));
    setTextForSelectors([".section-head h2"], t("sections.honors_distinctions"));
  } else if (page === "projects") {
    setTextForSelectors([".detail-kicker .eyebrow"], t("sections.open_work"));
    const headings = document.querySelectorAll(".section-card .section-head h2");
    if (headings[0]) {
      headings[0].textContent = t("sections.open_repositories");
    }
    if (headings[1]) {
      headings[1].textContent = t("sections.research_directions");
    }
  } else if (page === "service") {
    setTextForSelectors([".detail-kicker .eyebrow"], t("sections.academic_service"));
    setTextForSelectors([".section-head h2"], t("sections.review_editorial"));
  } else if (page === "timeline") {
    setTextForSelectors([".detail-kicker .eyebrow"], t("sections.career_path"));
    setTextForSelectors([".section-head h2"], t("sections.career_milestones"));
  } else if (page === "research") {
    setTextForSelectors([".detail-kicker .eyebrow"], t("sections.research_overview"));
    const headings = document.querySelectorAll(".section-card .section-head h2");
    if (headings[0]) {
      headings[0].textContent = t("sections.methods_domains_recent");
    }
    if (headings[1]) {
      headings[1].textContent = t("sections.publication_rhythm");
    }
    const signalHeadings = document.querySelectorAll(".signal-layout .feature-card h3");
    if (signalHeadings[0]) {
      signalHeadings[0].textContent = t("sections.method_portfolio");
    }
    if (signalHeadings[1]) {
      signalHeadings[1].textContent = t("sections.application_domains");
    }
    if (signalHeadings[2]) {
      signalHeadings[2].textContent = t("sections.recent_output");
    }
    const rhythmHeadings = document.querySelectorAll(".dual-grid .feature-card h3");
    if (rhythmHeadings[0]) {
      rhythmHeadings[0].textContent = t("sections.publication_rhythm_sub");
    }
    if (rhythmHeadings[1]) {
      rhythmHeadings[1].textContent = t("sections.collaboration_network");
    }
  } else if (page === "sources") {
    setTextForSelectors([".detail-kicker .eyebrow"], t("sections.provenance"));
    setTextForSelectors([".section-head h2"], t("sections.notes_reference_links"));
    const sourceHeadings = document.querySelectorAll(".dual-grid .feature-card h3");
    if (sourceHeadings[0]) {
      sourceHeadings[0].textContent = t("sections.source_notes");
    }
    if (sourceHeadings[1]) {
      sourceHeadings[1].textContent = t("sections.reference_links");
    }
  } else if (page === "archive") {
    setTextForSelectors([".detail-kicker .eyebrow"], t("sections.reference_files"));
    setTextForSelectors([".section-head h2"], t("sections.documents_exports"));
  }
}

function renderHero(data) {
  const { person } = data;
  applyStaticLocale();
  const copyName = [person.name, person.display_name_native].filter(Boolean).join(" / ");

  if (els.heroNative) {
    els.heroNative.textContent = person.display_name_native || person.name;
  }

  if (els.heroPortrait && person.portrait) {
    els.heroPortrait.src = person.portrait;
  }

  if (els.portraitRole) {
    els.portraitRole.textContent = lt(person.current_title) || person.name;
  }

  if (els.portraitAffiliation) {
    els.portraitAffiliation.innerHTML = applyWarmEmphasis(lt(person.affiliation) || "", homeAffiliationEmphasisPhrases());
  }

  els.heroTitle.textContent = person.name;
  if (els.heroNameCopy) {
    const defaultTooltip = t("actions.copy_name");
    els.heroNameCopy.dataset.copyText = copyName;
    els.heroNameCopy.dataset.tooltip = defaultTooltip;
    els.heroNameCopy.dataset.copySuccessLabel = t("actions.copied_name");
    els.heroNameCopy.setAttribute("aria-label", defaultTooltip);
    els.heroNameCopy.setAttribute("title", defaultTooltip);
  }
  els.heroBio.innerHTML = applyWarmEmphasis(t("home.bio") || person.bio, homeBioEmphasisPhrases());
}

function renderOverview(data) {
  const { person } = data;

  const profileItems = [
    ...person.emails.map((email) => ({
      key: /(?:\.ac\.jp|\.edu|\.ac\.)$/i.test(email.split("@")[1] || "") ? "academic_email" : "personal_email",
      label: /(?:\.ac\.jp|\.edu|\.ac\.)$/i.test(email.split("@")[1] || "") ? t("labels.academic_email") : t("labels.personal_email"),
      value: email,
      href: `mailto:${email}`,
    })),
    ...(person.location ? [{ key: "location", label: t("labels.location"), value: lt(person.location) }] : []),
    ...(person.memberships.length
      ? [{ key: "memberships", label: t("labels.memberships"), value: person.memberships.map((item) => lt(item)).join(" · ") }]
      : []),
    ...(person.languages.length
      ? [
          {
            key: "languages",
            label: t("labels.languages"),
            value: person.languages.map((item) => formatLocalizedLanguage(item)).filter(Boolean).join(" · "),
          },
        ]
      : []),
  ];

  if (els.heroContactList) {
    els.heroContactList.innerHTML = profileItems.length
      ? profileItems
          .map(
            (item) => `
              <div class="stack-item">
                <span class="stack-label">${renderHeroContactLabel(item.key, item.label)}</span>
                <span class="stack-value">${buildContactValue(item)}</span>
              </div>
            `,
          )
          .join("")
      : `<div class="stack-item"><span class="stack-value">${escapeHtml(t("labels.identity_notes_fallback"))}</span></div>`;
  }
}

function renderHomeShortcuts(data) {
  if (!els.heroShortcuts) {
    return;
  }

  const shortcutCatalog = [
    {
      title: "Takizawa Lab Member Page",
      label: "Takizawa Lab",
      icon: "official",
    },
    {
      title: "Google Scholar",
      label: "Google Scholar",
      icon: "academic",
    },
    {
      title: "ResearchMap",
      label: "ResearchMap",
      icon: "registry",
    },
    {
      title: "ResearchGate",
      label: "ResearchGate",
      icon: "academic",
    },
    {
      title: "GitHub",
      label: "GitHub",
      icon: "code",
    },
  ];

  const shortcuts = shortcutCatalog
    .map((target) => {
      const profile = data.profiles.find((item) => item.title === target.title);
      if (!profile?.url) {
        return null;
      }
      return {
        ...target,
        url: localizedExternalUrl(profile.url, target.title),
        label: localizedQuickProfileLabel(target.title),
      };
    })
    .filter(Boolean);

  els.heroShortcuts.setAttribute("aria-label", t("controls.quick_profile_links"));
  els.heroShortcuts.innerHTML = shortcuts
    .map(
      (item) => `
        <a class="shortcut-link" href="${escapeHtml(item.url)}" target="_blank" rel="noreferrer" aria-label="${escapeHtml(item.label)}">
          ${iconSprite(item.icon)}
          <span>${escapeHtml(item.label)}</span>
        </a>
      `,
    )
    .join("");
}

function renderRecordNav(data) {
  const latestPublicationYear = data.publication_year_counts[0]?.year || t("filters.no_date");
  const latestAwardDate = data.awards[0]?.date || t("labels.latest_record_fallback");
  const serviceTags = [...new Set(data.service.map((item) => lt(item.tag)))];

  if (!els.recordNav) {
    return;
  }

  const cards = [
    {
      icon: "publications",
      tone: "teal",
      label: t("nav.publications"),
      value: `${data.stats.cv_total_publications}`,
      unit: unitWord("items"),
      meta: `${countLabel(data.stats.citations, { enOne: "citation", enOther: "citations", ja: "被引用", zh: "次引用" })} · h-index ${data.stats.h_index} · ${latestPublicationYear}`,
      href: "./publications.html",
    },
    {
      icon: "awards",
      tone: "gold",
      label: t("nav.awards"),
      value: `${data.awards.length}`,
      unit: unitWord("items"),
      meta: `${latestAwardDate}`,
      href: "./awards.html",
    },
    {
      icon: "projects",
      tone: "teal",
      label: t("nav.projects"),
      value: `${(data.featured_projects || []).length}`,
      unit: unitWord("repos"),
      meta: countLabel(data.open_source_projects.length, { enOne: "direction", enOther: "directions", ja: "件の方向", zh: "个方向" }),
      href: "./projects.html",
    },
    {
      icon: "service",
      tone: "clay",
      label: t("nav.service"),
      value: `${data.service.length}`,
      unit: unitWord("venues"),
      meta: `${serviceTags.join(" · ")}`,
      href: "./service.html",
    },
  ];

  els.recordNav.innerHTML = cards
    .map(
      (card) => `
        <a class="record-card" href="${escapeHtml(card.href)}">
          <span class="record-head">
            ${iconBadge(card.icon, card.tone)}
            <span class="stack-label">${escapeHtml(card.label)}</span>
          </span>
          <span class="record-value">${escapeHtml(card.value)}</span>
          <span class="record-unit">${escapeHtml(card.unit)}</span>
          <span class="record-meta">${escapeHtml(card.meta)}</span>
        </a>
      `,
    )
    .join("");
}

function renderModuleNav(data) {
  if (!els.moduleNav) {
    return;
  }

  const documentTags = [...new Set(data.documents.map((item) => item.tag).filter(Boolean))];
  const timelineCategories = [...new Set(data.timeline.map((item) => item.category).filter(Boolean))];
  const dossierLabel = resolveLocaleName() === "ja" ? "ドシエ" : resolveLocaleName() === "zh" ? "档案" : "Dossier";

  const cards = [
    {
      icon: "profiles",
      tone: "gold",
      label: t("nav.profiles"),
      title: `${translateTag("Official")} · ${translateTag("Academic")} · ${translateTag("Registry")} · ${translateTag("Code")}`,
      meta: `${countLabel(data.profiles.length, { enOne: "public profile", enOther: "public profiles", ja: "件の公開プロフィール", zh: "个公开主页" })} · ${countLabel(data.stats.official_source_links, { enOne: "official link", enOther: "official links", ja: "件の公式リンク", zh: "个官方链接" })}`,
      href: "./profiles.html",
    },
    {
      icon: "timeline",
      tone: "teal",
      label: t("nav.timeline"),
      title: `${translateTimelineCategory("Position")} · ${translateTimelineCategory("Education")} · ${translateTimelineCategory("Fellowship")}`,
      meta: `${countLabel(data.timeline.length, { enOne: "milestone", enOther: "milestones", ja: "件の節目", zh: "个节点" })} · ${countLabel(timelineCategories.length, { enOne: "timeline category", enOther: "timeline categories", ja: "区分", zh: "个类别" })}`,
      href: "./timeline.html",
    },
    {
      icon: "research",
      tone: "teal",
      label: t("nav.research"),
      title:
        resolveLocaleName() === "ja"
          ? "手法 · 応用分野 · 共同研究"
          : resolveLocaleName() === "zh"
            ? "方法 · 领域 · 合作"
            : "Methods · Domains · Collaborators",
      meta: `${countLabel(data.person.research_methods.length, { enOne: "method", enOther: "methods", ja: "手法", zh: "种方法" })} · ${countLabel(data.person.application_domains.length, { enOne: "domain", enOther: "domains", ja: "応用分野", zh: "个领域" })} · ${countLabel(data.top_collaborators.length, { enOne: "mapped collaborator", enOther: "mapped collaborators", ja: "名の主要共同研究者", zh: "位主要合作者" })}`,
      href: "./research.html",
    },
    {
      icon: "sources",
      tone: "gold",
      label: t("nav.sources"),
      title: t("sections.notes_links"),
      meta: `${countLabel(data.source_notes.length, { enOne: "source note", enOther: "source notes", ja: "件の注記", zh: "条来源说明" })} · ${countLabel(data.source_links.length, { enOne: "reference link", enOther: "reference links", ja: "件の参照リンク", zh: "条参考链接" })}`,
      href: "./sources.html",
    },
    {
      icon: "archive",
      tone: "clay",
      label: t("nav.archive"),
      title: `CV · ${dossierLabel} · ${t("sections.files")}`,
      meta: `${countLabel(data.documents.length, { enOne: "archived file", enOther: "archived files", ja: "件の保存ファイル", zh: "个归档文件" })} · ${documentTags.map((item) => translateTag(item)).join(" · ")}`,
      href: "./archive.html",
    },
  ];

  els.moduleNav.innerHTML = cards
    .map(
      (card) => `
        <a class="module-card" href="${escapeHtml(card.href)}">
          <span class="module-head">
            ${iconBadge(card.icon, card.tone)}
            <span class="stack-label">${escapeHtml(card.label)}</span>
          </span>
          <span class="module-title">${escapeHtml(card.title)}</span>
          <span class="module-meta">${escapeHtml(card.meta)}</span>
        </a>
      `,
    )
    .join("");
}

function renderSignals(data) {
  if (!els.methodTags || !els.domainTags || !els.highlightList || !els.yearBars || !els.collaboratorList) {
    return;
  }

  const maxYearCount = Math.max(...data.publication_year_counts.map((item) => item.count), 1);
  const maxCollaborations = Math.max(...data.top_collaborators.map((item) => item.count), 1);

  els.methodTags.innerHTML = data.person.research_methods
    .map((item) => `<span class="chip-static">${escapeHtml(lt(item))}</span>`)
    .join("");
  els.domainTags.innerHTML = data.person.application_domains
    .map((item) => `<span class="chip-static chip-warm">${escapeHtml(lt(item))}</span>`)
    .join("");

  els.highlightList.innerHTML = data.publications
    .slice(0, 4)
    .map(
      (item) => `
        <div class="stack-item">
          <span class="stack-label">${escapeHtml(item.year)} · ${escapeHtml(statusLabel(item.status))}</span>
          <span class="stack-value">
            ${item.url ? buildLink(item.url, item.title) : escapeHtml(item.title)}
            <span class="inline-note">${escapeHtml(item.venue || typeLabel(item.type))}</span>
          </span>
        </div>
      `,
    )
    .join("");

  els.yearBars.innerHTML = data.publication_year_counts
    .map(
      (item) => `
        <div class="bar-item">
          <div class="bar-head">
            <span>${escapeHtml(item.year)}</span>
            <span>${escapeHtml(item.count)}</span>
          </div>
          <div class="bar-track"><span class="bar-fill" style="width:${(item.count / maxYearCount) * 100}%"></span></div>
        </div>
      `,
    )
    .join("");

  els.collaboratorList.innerHTML = data.top_collaborators
    .slice(0, 12)
    .map(
      (item) => `
        <div class="bar-item">
          <div class="bar-head">
            <span>${escapeHtml(item.name)}</span>
            <span>${escapeHtml(item.count)}</span>
          </div>
          <div class="bar-track"><span class="bar-fill warm" style="width:${(item.count / maxCollaborations) * 100}%"></span></div>
        </div>
      `,
    )
    .join("");
}

function renderLinks(data) {
  if (!els.linkGrid) {
    return;
  }

  const query = state.linkQuery.toLowerCase();
  const visible = data.profiles.filter((item) =>
    [item.title, item.tag, item.description, lt(item.title), translateTag(item.tag), lt(item.description)]
      .some((value) => normalizeString(value).toLowerCase().includes(query)),
  );

  els.linkGrid.innerHTML = visible.length
    ? visible
        .map(
          (item) => `
            <article class="link-card">
              <div class="link-card-inline">
                ${profileMarkMarkup(item)}
                <h4 class="link-card-title">${buildLink(localizedExternalUrl(item.url, item.title), lt(item.title))}</h4>
              </div>
            </article>
          `,
        )
        .join("")
    : `<div class="empty">${escapeHtml(t("empty.no_profile_links"))}</div>`;
}

function renderDocuments(data) {
  if (!els.documentGrid) {
    return;
  }

  els.documentGrid.innerHTML = data.documents
    .map(
      (item) => `
        <article class="document-card">
          <span class="tag">${iconSprite(iconForDocumentTag(item.tag))}${escapeHtml(translateTag(item.tag))}</span>
          <h4>${escapeHtml(lt(item.title))}</h4>
          <div class="link-row">${buildLink(item.url, t("actions.open_file"))}</div>
        </article>
      `,
    )
    .join("");
}

function renderTimeline(data) {
  if (!els.timelineList) {
    return;
  }

  els.timelineList.style.setProperty("--timeline-line-gradient", buildTimelineLineGradient(data.timeline || []));
  let previousTheme = "";
  els.timelineList.innerHTML = data.timeline
    .map((item) => {
      const currentTheme = normalizeString(item?.institution_theme || "").toLowerCase();
      const eraMarker = currentTheme && currentTheme !== previousTheme
        ? `
          <div class="timeline-era${timelineThemeClass(item)}">
            <span class="timeline-era-spacer" aria-hidden="true"></span>
          <div class="timeline-era-label">
              <span class="timeline-era-name">${escapeHtml(lt(timelineEraLabel(item)))}</span>
            </div>
          </div>
        `
        : "";
      previousTheme = currentTheme;

      return `
        ${eraMarker}
        <article class="timeline-item${timelineThemeClass(item)}">
          <time>${timelinePeriodMarkup(item)}</time>
          <div class="timeline-card">
            <h4 class="timeline-heading">
              <span class="timeline-tag">${iconSprite(iconForTimelineCategory(item.category))}${escapeHtml(translateTimelineCategory(item.category))}</span>
              <span class="timeline-title-text">${normalizeString(item?.url) ? buildLink(item.url, lt(item.title)) : escapeHtml(lt(item.title))}</span>
            </h4>
            ${buildTimelineSummaryMarkup(item)}
          </div>
        </article>
      `;
    })
    .join("");
}

function emphasizeTimelineSummary(text = "") {
  const value = normalizeString(text);
  if (!value) {
    return "";
  }
  const localeName = resolveLocaleName();
  const choose = (en, ja, zh) => (localeName === "ja" ? ja : localeName === "zh" ? zh : en);

  const patterns = [
    {
      regex: /^Served as Track Chair for (.+?) in MCSoC-NeuroCore 2026\.(.*)?$/i,
      render: (match) => {
        const trackTitle = normalizeString(match[1]);
        const localizedTrackTitle = trackTitle === "Cognitive Computing Models and Brain-Derived Algorithms"
          ? choose(
              trackTitle,
              "認知計算モデルと脳着想アルゴリズム",
              "认知计算模型与脑启发算法",
            )
          : trackTitle;
        return choose(
          `Served as Track Chair for <strong>${escapeHtml(trackTitle)}</strong> in MCSoC-NeuroCore 2026.`,
          `MCSoC-NeuroCore 2026 において、<strong>${escapeHtml(localizedTrackTitle)}</strong> の分科会座長を担当。`,
          `在 MCSoC-NeuroCore 2026 中担任 <strong>${escapeHtml(localizedTrackTitle)}</strong> 专题的分会主席。`,
        );
      },
    },
    {
      regex: /^Affiliated with (.+?)(\.)?$/i,
      render: (match) =>
        choose(
          `Affiliated with <strong>${escapeHtml(match[1])}</strong>.`,
          `<strong>スーパーコンピューティングシステム研究部門と滝沢研究室</strong>に所属。`,
          `隶属于<strong>超级计算系统研究部门与泷泽实验室</strong>。`,
        ),
    },
    {
      regex: /^Degree conferred\. Thesis: (.+?)(\.)?$/i,
      render: (match) =>
        choose(
          `Degree conferred. Thesis: <strong>${escapeHtml(match[1])}</strong>.`,
          `学位取得。学位論文：<strong>${escapeHtml(match[1])}</strong>。`,
          `获得学位。学位论文：<strong>${escapeHtml(match[1])}</strong>。`,
        ),
    },
    {
      regex: /^Supported the topic (.+?)(\.)?$/i,
      render: (match) =>
        choose(
          `Supported the topic <strong>${escapeHtml(match[1])}</strong>.`,
          `トピック <strong>${escapeHtml(match[1])}</strong> を支援。`,
          `参与支持专题 <strong>${escapeHtml(match[1])}</strong>。`,
        ),
    },
    {
      regex: /^Supported by the JST Support for Pioneering Research Initiated by the Next Generation \(SPRING\) program\.(.*)?$/i,
      render: () =>
        choose(
          `Supported by <strong>the JST Support for Pioneering Research Initiated by the Next Generation (SPRING) program</strong>.`,
          `<strong>JST 次世代研究者挑戦的研究プログラム（SPRING）</strong>の支援を受けた。`,
          `获得<strong>JST 次世代开拓性研究支持计划（SPRING）</strong>资助。`,
        ),
    },
    {
      regex: /^Supported the special issue (.+?) across (.+?)(\.)?$/i,
      render: (match) =>
        choose(
          `Supported the special issue <strong>${escapeHtml(match[1])}</strong> across ${escapeHtml(match[2])}.`,
          `特集 <strong>${escapeHtml(match[1])}</strong> において、初期査読、査読者選定、編集プロセス支援を担当。`,
          `参与专题 <strong>${escapeHtml(match[1])}</strong> 的初审、审稿人分配与编辑流程支持工作。`,
        ),
    },
    {
      regex: /^Visited for discussions on (.+?) and potential collaborative research\.(.*)?$/i,
      render: (match) =>
        choose(
          `Visited for discussions on <strong>${escapeHtml(match[1])}</strong> and potential collaborative research.`,
          `<strong>哺乳類視覚系モデリング</strong> に関する議論と共同研究の検討のため訪問。`,
          `围绕<strong>哺乳动物视觉系统建模</strong>进行讨论，并探讨潜在合作研究。`,
        ),
    },
    {
      regex: /^Supported seminars, (.+?)(\.)?$/i,
      render: (match) =>
        choose(
          `Supported seminars, <strong>${escapeHtml(match[1])}</strong>.`,
          `セミナー運営に加え、<strong>学生指導、共同研究、論文査読活動</strong>を支援。`,
          `除研讨会工作外，还参与<strong>学生指导、合作研究与论文评阅工作</strong>。`,
        ),
    },
    {
      regex: /^Supported by the JST Establishment of University Fellowships towards the Creation of Science, Technology and Innovation program\.(.*)?$/i,
      render: () =>
        choose(
          `Supported by <strong>the JST Establishment of University Fellowships towards the Creation of Science, Technology and Innovation program</strong>.`,
          `<strong>JST 次世代科学技術イノベーション創出大学フェローシップ構築事業</strong>の支援を受けた。`,
          `获得<strong>JST 面向科技创新的人才培养大学 Fellowship 计划</strong>资助。`,
        ),
    },
    {
      regex: /^Started the (Doctor of Engineering program)(\.)?$/i,
      render: (match) =>
        choose(
          `Started the <strong>${escapeHtml(match[1])}</strong>.`,
          `<strong>博士（工学）課程</strong>に進学。`,
          `进入<strong>工学博士项目</strong>。`,
        ),
    },
    {
      regex: /^Started the (Master of Engineering program)(\.)?$/i,
      render: (match) =>
        choose(
          `Started the <strong>${escapeHtml(match[1])}</strong>.`,
          `<strong>修士（工学）課程</strong>に進学。`,
          `进入<strong>工学硕士项目</strong>。`,
        ),
    },
    {
      regex: /^Focused on the theory and real-world applications of metaheuristic optimization\.(.*)?$/i,
      render: () =>
        choose(
          `Focused on <strong>the theory and real-world applications of metaheuristic optimization</strong>.`,
          `<strong>メタヒューリスティック最適化の理論と実応用</strong>に取り組んだ。`,
          `围绕<strong>元启发式优化的理论与实际应用</strong>开展研究。`,
        ),
    },
    {
      regex: /^Completed the EUR-ACE-accredited program in Mechanical Design, Manufacture, and Automation\.(.*)?$/i,
      render: () =>
        choose(
          `Completed the <strong><a href="https://eurace.enaee.eu/node/7434" target="_blank" rel="noreferrer">EUR-ACE®-accredited program in Mechanical Design, Manufacture, and Automation</a></strong> (<span class="timeline-summary-note">European Accreditation of Engineering Programmes</span>).`,
          `<strong><a href="https://eurace.enaee.eu/node/7434" target="_blank" rel="noreferrer">機械設計製造および自動化の EUR-ACE® 認定プログラム</a></strong>（<span class="timeline-summary-note">European Accreditation of Engineering Programmes</span>）を修了。`,
          `完成<strong><a href="https://eurace.enaee.eu/node/7434" target="_blank" rel="noreferrer">机械设计、制造与自动化 EUR-ACE® 认证项目</a></strong>（<span class="timeline-summary-note">European Accreditation of Engineering Programmes</span>）。`,
        ),
    },
    {
      regex: /^Started the Bachelor of Engineering program in (.+?)(\.)?$/i,
      render: (match) =>
        choose(
          `Started the Bachelor of Engineering program in <strong>${escapeHtml(match[1])}</strong>.`,
          `<strong>${escapeHtml(match[1])}</strong>の学士（工学）課程に入学。`,
          `进入<strong>${escapeHtml(match[1])}</strong>工学学士项目。`,
        ),
    },
    {
      regex: /^Supported courses and research-related lectures for undergraduates\.(.*)?$/i,
      render: () =>
        choose(
          `Supported <strong>courses and research-related lectures for undergraduates</strong>.`,
          `<strong>学部向け授業と研究関連講義</strong>を補助。`,
          `协助<strong>本科课程与研究相关讲授</strong>。`,
        ),
    },
  ];

  for (const pattern of patterns) {
    const match = value.match(pattern.regex);
    if (match) {
      return pattern.render(match);
    }
  }

  return escapeHtml(lt(value));
}

function buildTimelineSummaryMarkup(item = {}) {
  const organization = formatTimelineOrganization(item);
  const description = normalizeString(item?.description);

  if (!organization && !description) {
    return "";
  }

  const localizedOrganization = lt(organization);
  const lead = organization
    ? `<strong class="timeline-summary-lead">${escapeHtml(localizedOrganization)}${/[.!?。！？]$/.test(localizedOrganization) ? "" : resolveLocaleName() === "ja" ? "。" : resolveLocaleName() === "zh" ? "。" : "."}</strong>`
    : "";
  const detail = description
    ? `<span class="timeline-summary-text">${emphasizeTimelineSummary(description)}</span>`
    : "";

  return `<p class="timeline-summary">${[lead, detail].filter(Boolean).join(" ")}</p>`;
}

function formatTimelineOrganization(item = {}) {
  const organization = normalizeString(item?.organization);
  if (!organization) {
    return "";
  }

  const exactMap = new Map([
    [
      "Tohoku University, Cyberscience Center, High Performance Computing Laboratory",
      "High Performance Computing Laboratory, Cyberscience Center, Tohoku University",
    ],
    [
      "University of Toyama, Graduate School of Science and Engineering for Education",
      "Graduate School of Science and Engineering for Education, University of Toyama",
    ],
    [
      "Japan Science and Technology Agency / University of Toyama",
      "Japan Science and Technology Agency and University of Toyama",
    ],
    [
      "Mathematics, MDPI",
      "Mathematics (MDPI)",
    ],
  ]);

  return exactMap.get(organization) || organization;
}

function timelineEraLabel(item = {}) {
  const theme = normalizeString(item?.institution_theme || "").toLowerCase();
  if (theme === "tohoku") {
    return "Tohoku University";
  }
  if (theme === "toyama") {
    return "University of Toyama";
  }
  if (theme === "usst") {
    return "University of Shanghai for Science and Technology";
  }
  return normalizeString(item?.organization || t("nav.timeline"));
}

function timelineThemeClass(item) {
  const theme = normalizeString(item?.institution_theme || "").toLowerCase();
  if (!theme || theme === "neutral") {
    return "";
  }
  return ` timeline-theme-${escapeHtml(theme)}`;
}

function timelineThemeColor(item) {
  const theme = normalizeString(item?.institution_theme || "").toLowerCase();
  if (theme === "tohoku") {
    return "rgba(61, 21, 135, 0.96)";
  }
  if (theme === "toyama") {
    return "rgba(70, 109, 127, 0.94)";
  }
  if (theme === "usst") {
    return "rgba(181, 28, 47, 0.94)";
  }
  return "rgba(14, 97, 91, 0.9)";
}

function buildTimelineLineGradient(items = []) {
  const list = Array.isArray(items) ? items.filter(Boolean) : [];
  if (!list.length) {
    return "linear-gradient(180deg, rgba(14, 97, 91, 0.48), rgba(97, 85, 74, 0.22))";
  }

  const runs = [];
  list.forEach((item) => {
    const color = timelineThemeColor(item);
    const last = runs[runs.length - 1];
    if (last && last.color === color) {
      last.count += 1;
    } else {
      runs.push({ color, count: 1 });
    }
  });

  let offset = 0;
  const total = list.length;
  const stops = [];
  runs.forEach((run, index) => {
    const start = (offset / total) * 100;
    offset += run.count;
    const end = (offset / total) * 100;
    if (index === 0) {
      stops.push(`${run.color} 0%`);
    }
    stops.push(`${run.color} ${end.toFixed(2)}%`);
  });

  return `linear-gradient(180deg, ${stops.join(", ")})`;
}

function timelinePeriodMarkup(item = {}) {
  const start = normalizeString(item?.start || item?.period);
  const explicitEnd = normalizeString(item?.end);
  const period = normalizeString(item?.period);
  const isRange = explicitEnd && explicitEnd !== start;
  const isOpenRange = !explicitEnd && /present/i.test(period);
  if (!start) {
    return "";
  }
  if (!isRange && !isOpenRange) {
    return `<span class="timeline-time-line">${escapeHtml(start)}</span>`;
  }
  const endLabel = isOpenRange ? t("labels.timeline_present") : explicitEnd;
  return [
    `<span class="timeline-time-line">${escapeHtml(start)}</span>`,
    `<span class="timeline-time-connector">${escapeHtml(t("labels.timeline_to"))}</span>`,
    `<span class="timeline-time-line${isOpenRange ? " timeline-time-present" : ""}">${escapeHtml(endLabel)}</span>`,
  ].join("");
}

function timelineOverallPeriod(items = []) {
  const list = Array.isArray(items) ? items.filter(Boolean) : [];
  if (!list.length) {
    return "";
  }
  const latest = list[0];
  const earliest = list[list.length - 1];
  const start = normalizeString(earliest?.start || earliest?.period);
  const end = normalizeString(latest?.end) || (/present/i.test(normalizeString(latest?.period)) ? t("labels.timeline_present") : normalizeString(latest?.period));
  if (!start) {
    return end || "";
  }
  if (!end || start === end) {
    return start;
  }
  return `${start} ${t("labels.timeline_to")} ${end}`;
}

function renderDetailMetrics(items) {
  if (!els.detailMetrics) {
    return;
  }

  els.detailMetrics.innerHTML = items
    .filter(Boolean)
    .map((item) => `<span class="meta-pill">${escapeHtml(item)}</span>`)
    .join("");
}

function renderPublicationsPage(data) {
  const indexedCount = data.publications.filter((item) => item.source_group === "indexed").length;
  const supplementCount = data.publications.filter((item) => item.source_group === "cv_supplement").length;
  renderDetailMetrics([
    countLabel(data.stats.cv_total_publications, { enOne: "item", enOther: "items", ja: "件", zh: "项" }),
    countLabel(data.stats.citations, { enOne: "citation", enOther: "citations", ja: "被引用", zh: "次引用" }),
    `h-index ${data.stats.h_index}`,
    countLabel(indexedCount, { enOne: "indexed record", enOther: "indexed records", ja: "件の索引収録", zh: "项索引收录" }),
    countLabel(supplementCount, { enOne: "supplement", enOther: "supplements", ja: "件の補遺", zh: "项补充" }),
  ]);
  renderPublications(data);
}

function renderAwardsPage(data) {
  renderDetailMetrics([
    countLabel(data.awards.length, { enOne: "award", enOther: "awards", ja: "件の受賞", zh: "项获奖" }),
    data.awards[0]?.date ? data.awards[0].date : t("labels.latest_record_fallback"),
    countLabel(data.stats.top_level_awards, { enOne: "highlighted record", enOther: "highlighted records", ja: "件の主要記録", zh: "项重点记录" }),
  ]);

  if (!els.awardPageList) {
    return;
  }

  els.awardPageList.innerHTML = data.awards.length
    ? data.awards
        .map(
          (item) => `
            <article class="feature-card award-card">
              <div class="award-head">
                ${awardTitleMarkup(item)}
                <span class="tag award-date-tag">${escapeHtml(item.date || "Award")}</span>
              </div>
              ${awardDescriptionMarkup(item)}
            </article>
          `,
        )
        .join("")
    : `<div class="empty">${escapeHtml(t("empty.no_awards"))}</div>`;
}

function awardLinks(item = {}) {
  if (Array.isArray(item?.links) && item.links.length) {
    return item.links.filter((entry) => normalizeString(entry?.url));
  }
  const links = [];
  if (normalizeString(item?.url)) {
    links.push({ kind: "official", url: item.url });
  }
  if (normalizeString(item?.paper_url)) {
    links.push({ kind: "paper", url: item.paper_url });
  }
  if (normalizeString(item?.journal_url)) {
    links.push({ kind: "journal", url: item.journal_url });
  }
  if (links.length) {
    return links;
  }
  return [];
}

function awardLinkLabel(link = {}) {
  if (link.kind === "official") {
    return t("actions.award_official");
  }
  if (link.kind === "paper") {
    return t("actions.award_paper");
  }
  if (link.kind === "journal") {
    return t("actions.award_journal");
  }
  if (link.kind === "github") {
    return t("actions.award_github");
  }
  if (link.kind === "mine") {
    return t("actions.award_my_repo");
  }
  const localeName = resolveLocaleName();
  const localizedLabel = normalizeString(link?.[`label_${localeName}`]) || normalizeString(link?.label_en);
  if (localizedLabel) {
    return localizedLabel;
  }
  return t("actions.award_official");
}

function awardTypeLabel(item = {}) {
  const title = normalizeString(lt(item?.title || "")).toLowerCase();
  const description = normalizeString(lt(item?.description || "")).toLowerCase();
  const localeName = resolveLocaleName();

  let key = "recognition";
  if (title.includes("competition") || description.includes("competition track") || title.includes("竞赛") || title.includes("競技")) {
    key = "competition";
  } else if (title.includes("fellowship") || description.includes("spring") || title.includes("フェローシップ") || title.includes("资助")) {
    key = "fellowship";
  } else if (title.includes("scholarship") || title.includes("奨学") || title.includes("奖学")) {
    key = "scholarship";
  } else if (title.includes("highly cited") || title.includes("高被引") || title.includes("高被引用") || description.includes("highly cited")) {
    key = "recognition";
  }

  const labels = {
    en: {
      competition: "Competition",
      fellowship: "Fellowship",
      scholarship: "Scholarship",
      recognition: "Recognition",
    },
    ja: {
      competition: "Competition",
      fellowship: "Fellowship",
      scholarship: "Scholarship",
      recognition: "Recognition",
    },
    zh: {
      competition: "Competition",
      fellowship: "Fellowship",
      scholarship: "Scholarship",
      recognition: "Recognition",
    },
  };

  return labels[localeName]?.[key] || labels.en[key];
}

function awardTitleMarkup(item = {}) {
  const links = awardLinks(item);
  const typeLabel = awardTypeLabel(item);
  if (!links.length) {
    return `
      <h3>
        <span class="award-title-top">
          <span class="award-emoji" aria-hidden="true">${awardEmoji(item)}</span>
          <span class="award-kind">${escapeHtml(typeLabel)}</span>
        </span>
        <span class="award-title-text">${escapeHtml(lt(item.title))}</span>
      </h3>
    `;
  }

  return `
    <h3>
      <span class="award-title-top">
        <span class="award-emoji" aria-hidden="true">${awardEmoji(item)}</span>
        <span class="award-kind">${escapeHtml(typeLabel)}</span>
      </span>
      <span class="award-title-text">${escapeHtml(lt(item.title))}</span>
      <span class="award-link-actions">
        <button class="award-link-trigger" type="button" aria-label="${escapeHtml(t("actions.award_links"))}">
          <span>${escapeHtml(t("actions.award_links"))}</span>
        </button>
        <span class="award-link-menu" role="menu" aria-label="${escapeHtml(t("actions.award_links"))}">
          ${links
            .map(
              (link) => `
                <a class="award-link-option" href="${escapeHtml(link.url)}" target="_blank" rel="noreferrer" role="menuitem">
                  <span>${escapeHtml(awardLinkLabel(link))}</span>
                </a>
              `,
            )
            .join("")}
        </span>
      </span>
    </h3>
  `;
}

function awardAcronymPhraseMarkup(phrase = "", acronym = "") {
  const cleanPhrase = normalizeString(phrase);
  const cleanAcronym = normalizeString(acronym).toUpperCase();
  if (!cleanPhrase) {
    return "";
  }
  if (!cleanAcronym) {
    return escapeHtml(cleanPhrase);
  }

  const stopwords = new Set(["for", "of", "the", "and", "to", "by", "towards", "toward"]);
  let pointer = 0;
  const parts = cleanPhrase.split(/\s+/).map((word) => {
    const lower = word.toLowerCase();
    const first = word.charAt(0).toUpperCase();
    if (!stopwords.has(lower) && pointer < cleanAcronym.length && first === cleanAcronym.charAt(pointer)) {
      pointer += 1;
      return `<strong>${escapeHtml(word.charAt(0))}</strong>${escapeHtml(word.slice(1))}`;
    }
    return escapeHtml(word);
  });
  return parts.join(" ");
}

function formatAwardMetricValue(value) {
  const num = Number(value);
  if (!Number.isFinite(num)) {
    return "";
  }
  return Number.isInteger(num) ? String(num) : String(num.toFixed(3)).replace(/\.?0+$/, "");
}

function awardAccent(text, level = "primary") {
  const clean = normalizeString(text);
  if (!clean) {
    return "";
  }
  return `<span class="award-emphasis award-emphasis-${escapeHtml(level)}">${escapeHtml(clean)}</span>`;
}

function emphasizeAwardText(text = "") {
  const value = normalizeString(text);
  if (!value) {
    return "";
  }

  const localeName = resolveLocaleName();
  const replacements = localeName === "ja"
    ? [
        ["有界単一目的数値最適化コンペティショントラック", "track"],
        ["制約付き単一目的数値最適化コンペティショントラック", "track"],
        ["有界多目的数値最適化コンペティショントラック", "track"],
        ["制約付き多目的数値最適化コンペティショントラック", "track"],
        ["数値最適化コンペティショントラック", "track"],
        ["JGC-S 奨学金", "track"],
        ["アサヒ国際教育財団奨学金", "track"],
        ["高被引用論文", "track"],
        ["IEEE Congress on Evolutionary Computation（CEC）", "primary"],
        ["IEEE World Congress on Computational Intelligence（WCCI）", "primary"],
        ["科学技術振興機構（JST）", "primary"],
        ["次世代研究者挑戦的研究プログラム（SPRING）", "primary"],
        ["次世代科学技術イノベーション創出大学フェローシップ構築事業", "primary"],
        ["JGC-S 奨学財団", "primary"],
        ["アサヒ国際教育財団", "primary"],
        ["IEEE Computational Intelligence Society", "primary"],
        ["被引用数で世界上位1%", "primary"],
        ["世界的会議", "secondary"],
        ["世界最大規模の技術会議", "secondary"],
        ["フラッグシップ会議", "secondary"],
        ["優れた博士課程学生", "secondary"],
        ["研究費・生活費相当額の支援", "secondary"],
        ["自由で挑戦的かつ学際的な研究", "secondary"],
        ["優れた博士人材", "secondary"],
        ["指定大学推薦プロセス", "secondary"],
        ["選抜留学生", "secondary"],
      ]
    : localeName === "zh"
      ? [
          ["有界单目标数值优化竞赛赛道", "track"],
          ["约束单目标数值优化竞赛赛道", "track"],
          ["有界多目标数值优化竞赛赛道", "track"],
          ["约束多目标数值优化竞赛赛道", "track"],
          ["数值优化竞赛赛道", "track"],
          ["JGC-S 奖学金", "track"],
          ["朝日国际教育财团奖学金", "track"],
          ["高被引论文", "track"],
          ["IEEE Congress on Evolutionary Computation（CEC）", "primary"],
          ["IEEE World Congress on Computational Intelligence（WCCI）", "primary"],
          ["日本科学技术振兴机构（JST）", "primary"],
          ["次世代开拓性研究支持计划（SPRING）", "primary"],
          ["面向科技创新的人才培养大学 Fellowship 计划", "primary"],
          ["JGC-S 奖学财团", "primary"],
          ["朝日国际教育财团", "primary"],
          ["IEEE Computational Intelligence Society", "primary"],
          ["被引量世界前 1%", "primary"],
          ["重要国际会议", "secondary"],
          ["全球规模最大的技术会议", "secondary"],
          ["广受认可的项目", "secondary"],
          ["旗舰会议之一", "secondary"],
          ["三大旗舰会议", "secondary"],
          ["优秀的博士生", "secondary"],
          ["研究经费、生活费支持和职业发展支持", "secondary"],
          ["自由、挑战性强且跨学科的研究", "secondary"],
          ["优秀博士人才", "secondary"],
          ["指定大学推荐程序", "secondary"],
          ["选拔留学生", "secondary"],
        ]
      : [
          ["bound-constrained single-objective numerical optimization competition track", "track"],
          ["constrained single-objective numerical optimization competition track", "track"],
          ["bound-constrained multi-objective numerical optimization competition track", "track"],
          ["constrained multi-objective numerical optimization competition track", "track"],
          ["numerical optimization competition track", "track"],
          ["JGC-S Scholarship", "track"],
          ["Asahi International Education Foundation Scholarship", "track"],
          ["Highly Cited Paper", "track"],
          ["IEEE Congress on Evolutionary Computation (CEC)", "primary"],
          ["IEEE World Congress on Computational Intelligence (WCCI)", "primary"],
          ["Japan Science and Technology Agency (JST)", "primary"],
          ["Support for Pioneering Research Initiated by the Next Generation (SPRING)", "primary"],
          ["Establishment of University Fellowships towards the Creation of Science, Technology and Innovation", "primary"],
          ["JGC-S Scholarship Foundation", "primary"],
          ["Asahi International Education Foundation", "primary"],
          ["IEEE Computational Intelligence Society", "primary"],
          ["worldwide top 1% by citations", "primary"],
          ["world-class event", "secondary"],
          ["world's largest technical event", "secondary"],
          ["nationally recognized program", "secondary"],
          ["flagship conferences", "secondary"],
          ["outstanding PhD students", "secondary"],
          ["research and living expenses as well as career development opportunities", "secondary"],
          ["unrestricted, challenging, and interdisciplinary research", "secondary"],
          ["excellent doctoral students", "secondary"],
          ["designated-university nomination process", "secondary"],
        ];

  const orderedReplacements = [...replacements].sort((a, b) => b[0].length - a[0].length);
  let result = escapeHtml(value);
  const tokenMap = new Map();

  orderedReplacements.forEach(([phrase, level], index) => {
    const escapedPhrase = escapeHtml(phrase);
    const token = `__AWARD_ACCENT_${index}__`;
    if (result.includes(escapedPhrase)) {
      result = result.replaceAll(escapedPhrase, token);
      tokenMap.set(token, awardAccent(phrase, level));
    }
  });

  tokenMap.forEach((markup, token) => {
    result = result.replaceAll(token, markup);
  });
  return result;
}

function awardJournalMetricSummary(item = {}) {
  const localeName = resolveLocaleName();
  const parts = [];
  if (Number.isFinite(Number(item?.if_value))) {
    parts.push(`${localeName === "zh" ? "IF" : "IF"} ${formatAwardMetricValue(item.if_value)}${item.if_year ? ` (${escapeHtml(String(item.if_year))})` : ""}`);
  }
  if (normalizeString(item?.jcr_quartile)) {
    parts.push(`JCR ${escapeHtml(item.jcr_quartile)}${item.jcr_year ? ` (${escapeHtml(String(item.jcr_year))})` : ""}`);
  }
  if (normalizeString(item?.cas_quartile)) {
    const topLabel = item?.cas_top ? " Top" : "";
    const casLabel = localeName === "zh" ? "中科院" : "CAS";
    parts.push(`${casLabel} ${escapeHtml(item.cas_quartile)}${topLabel}${item.cas_year ? ` (${escapeHtml(String(item.cas_year))})` : ""}`);
  }
  return parts.map((part, index) => awardAccent(part, index === 0 ? "primary" : "secondary")).join(' <span class="award-separator">·</span> ');
}

function awardCitationSummary(item = {}) {
  const current = Number(item?.current_citations);
  const awardYearCount = Number(item?.award_year_citations);
  const awardYear = normalizeString(item?.award_year);
  const localeName = resolveLocaleName();

  if (!Number.isFinite(current) && !Number.isFinite(awardYearCount)) {
    return "";
  }

  if (localeName === "ja") {
    const parts = [];
    if (Number.isFinite(current)) {
      parts.push(`現在 ${escapeHtml(String(current))}`);
    }
    if (Number.isFinite(awardYearCount) && awardYear) {
      parts.push(`${escapeHtml(awardYear)}年 ${escapeHtml(String(awardYearCount))}`);
    }
    return `被引用数：${parts.map((part) => awardAccent(part, "secondary")).join("、")}`;
  }

  if (localeName === "zh") {
    const parts = [];
    if (Number.isFinite(current)) {
      parts.push(`截至目前 ${escapeHtml(String(current))} 次`);
    }
    if (Number.isFinite(awardYearCount) && awardYear) {
      parts.push(`${escapeHtml(awardYear)} 年 ${escapeHtml(String(awardYearCount))} 次`);
    }
    return `被引：${parts.map((part) => awardAccent(part, "secondary")).join("，")}`;
  }

  const parts = [];
  if (Number.isFinite(current)) {
    parts.push(`${escapeHtml(String(current))} to date`);
  }
  if (Number.isFinite(awardYearCount) && awardYear) {
    parts.push(`${escapeHtml(String(awardYearCount))} in ${escapeHtml(awardYear)}`);
  }
  return `Citations: ${parts.map((part) => awardAccent(part, "secondary")).join("; ")}`;
}

function awardDescriptionMarkup(item = {}) {
  const localeName = resolveLocaleName();
  const agencyName = normalizeString(item?.agency_name);
  const agencyAcronym = normalizeString(item?.agency_acronym);
  const programName = normalizeString(item?.program_name);
  const programAcronym = normalizeString(item?.program_acronym);
  const paperTitle = normalizeString(item?.paper_title);
  const journalTitle = normalizeString(item?.journal_title);
  const description = normalizeString(item?.description);
  const context = normalizeString(item?.context);

  if (paperTitle && journalTitle) {
    const metricSummary = awardJournalMetricSummary(item);
    const citationSummary = awardCitationSummary(item);
    if (localeName === "ja") {
      return `
        <p>
          ${emphasizeAwardText(lt(description))}
          論文「${buildLink(item.paper_url, paperTitle)}」
          ${citationSummary ? `（${citationSummary}）` : ""}、
          掲載誌 ${buildLink(item.journal_url, journalTitle)}${metricSummary ? `（${metricSummary}）` : ""}。
        </p>
      `;
    }
    if (localeName === "zh") {
      return `
        <p>
          ${emphasizeAwardText(lt(description))}
          对应论文《${buildLink(item.paper_url, paperTitle)}》${citationSummary ? `（${citationSummary}）` : ""}，
          期刊 ${buildLink(item.journal_url, journalTitle)}${metricSummary ? `（${metricSummary}）` : ""}。
        </p>
      `;
    }
    return `
      <p>
        ${emphasizeAwardText(description)}
        ${paperTitle ? ` For the paper “${buildLink(item.paper_url, paperTitle)}”${citationSummary ? ` (${citationSummary})` : ""}` : ""}
        ${journalTitle ? ` in ${buildLink(item.journal_url, journalTitle)}${metricSummary ? ` (${metricSummary})` : ""}.` : ""}
      </p>
    `;
  }

  if (agencyName && programName) {
    const agencyMarkup = `${escapeHtml(lt(agencyName))}${agencyAcronym ? ` (${escapeHtml(agencyAcronym)})` : ""}`;
    const localizedProgramName = lt(programName);
    const programMarkup = localeName === "en"
      ? awardAcronymPhraseMarkup(programName, programAcronym)
      : escapeHtml(localizedProgramName);
    const acronymSuffix = programAcronym ? ` (${escapeHtml(programAcronym)})` : "";
    if (localeName === "ja") {
      return `<p>${awardAccent(`${lt(agencyName)}${agencyAcronym ? ` (${agencyAcronym})` : ""}`, "primary")}、${awardAccent(`${lt(programName)}${programAcronym ? ` (${programAcronym})` : ""}`, "track")}${context ? ` ${emphasizeAwardText(lt(context))}` : ""}</p>`;
    }
    if (localeName === "zh") {
      return `<p>${awardAccent(`${lt(agencyName)}${agencyAcronym ? ` (${agencyAcronym})` : ""}`, "primary")}，${awardAccent(`${lt(programName)}${programAcronym ? ` (${programAcronym})` : ""}`, "track")}${context ? ` ${emphasizeAwardText(lt(context))}` : ""}</p>`;
    }
    return `<p>${awardAccent(`${agencyName}${agencyAcronym ? ` (${agencyAcronym})` : ""}`, "primary")}, ${awardAccent(`${programName}${programAcronym ? ` (${programAcronym})` : ""}`, "track")}.${context ? ` ${emphasizeAwardText(lt(context))}` : ""}</p>`;
  }

  return `<p>${emphasizeAwardText(lt(description))}${context ? ` ${emphasizeAwardText(lt(context))}` : ""}</p>`;
}

function awardEmoji(item = {}) {
  const title = normalizeString(item?.title).toLowerCase();
  const description = normalizeString(item?.description).toLowerCase();
  if (/fellowship/.test(title) || /spring|fellowship/.test(description)) {
    return "🔬";
  }
  if (/scholarship/.test(title) || /scholarship/.test(description)) {
    return "🎓";
  }
  if (/esi|highly cited|top 1%/.test(title) || /esi|highly cited|top 1%/.test(description)) {
    return "🏆";
  }
  if (/silver/.test(title)) {
    return "🏆";
  }
  if (/bronze|third/.test(title)) {
    return "🥉";
  }
  if (/champion|gold|first/.test(title)) {
    return "🏆";
  }
  if (/award/.test(title) || /competition/.test(description)) {
    return "🏅";
  }
  return "✨";
}

function renderServicePage(data) {
  const groups = data.service.reduce((acc, item) => {
    const key = item.tag || "Service";
    acc[key] = acc[key] || [];
    acc[key].push(item);
    return acc;
  }, {});

  renderDetailMetrics([
    countLabel(data.service.length, { enOne: "venue", enOther: "venues", ja: "件", zh: "项" }),
    countLabel(Object.keys(groups).length, { enOne: "category", enOther: "categories", ja: "区分", zh: "个类别" }),
    Object.keys(groups).map((item) => lt(item)).join(" · "),
  ]);

  if (!els.servicePageGroups) {
    return;
  }

  els.servicePageGroups.innerHTML = Object.entries(groups)
    .map(
      ([tag, items]) => `
        <article class="feature-card service-group-card">
          <div class="subhead">
            <h3>${escapeHtml(lt(tag))}</h3>
            <span class="muted-note">${escapeHtml(countLabel(items.length, { enOne: "venue", enOther: "venues", ja: "件", zh: "项" }))}</span>
          </div>
          <div class="stack-list">
            ${items
              .map(
                (item) => `
                  <div class="stack-item">
                    <div class="service-stack-body">
                      <span class="stack-value service-stack-title">${buildLink(item.url, item.label)}</span>
                      ${serviceMetricsMarkup(item)}
                    </div>
                  </div>
                `,
              )
              .join("")}
          </div>
        </article>
      `,
    )
    .join("");
}

function renderProjectsPage(data) {
  renderDetailMetrics([
    countLabel((data.featured_projects || []).length, { enOne: "repository", enOther: "repositories", ja: "件のリポジトリ", zh: "个仓库" }),
    countLabel(data.open_source_projects.length, { enOne: "direction", enOther: "directions", ja: "件の方向", zh: "个方向" }),
  ]);

  if (els.projectRepoGrid) {
    els.projectRepoGrid.innerHTML = (data.featured_projects || []).length
      ? data.featured_projects
          .map(
            (item) => `
              <article class="link-card">
                <span class="tag">${escapeHtml(lt(item.tag))}</span>
                <h4>${escapeHtml(lt(item.title))}</h4>
                <p>${escapeHtml(lt(item.description))}</p>
                <div class="link-row">${buildLink(item.url, t("actions.open_repository"))}</div>
              </article>
            `,
          )
          .join("")
      : `<div class="empty">${escapeHtml(t("empty.no_public_repositories"))}</div>`;
  }

  if (els.projectDirectionList) {
    els.projectDirectionList.innerHTML = data.open_source_projects.length
      ? data.open_source_projects
          .map(
            (item) => `
              <div class="stack-item">
                <span class="stack-label">${escapeHtml(t("labels.project_direction"))}</span>
                <span class="stack-value">${escapeHtml(lt(item))}</span>
              </div>
            `,
          )
          .join("")
      : `<div class="empty">${escapeHtml(t("empty.no_project_directions"))}</div>`;
  }
}

function renderResearchPage(data) {
  renderDetailMetrics([
    countLabel(data.person.research_methods.length, { enOne: "method", enOther: "methods", ja: "件の手法", zh: "种方法" }),
    countLabel(data.person.application_domains.length, { enOne: "application domain", enOther: "application domains", ja: "件の応用分野", zh: "个应用领域" }),
    countLabel(data.top_collaborators.length, { enOne: "mapped collaborator", enOther: "mapped collaborators", ja: "名の主要共同研究者", zh: "位主要合作者" }),
  ]);
  renderSignals(data);
}

function renderProfilesPage(data) {
  const officialProfiles = data.profiles.filter((item) => item.tag === "Official").length;
  renderDetailMetrics([
    countLabel(data.profiles.length, { enOne: "profile", enOther: "profiles", ja: "件のプロフィール", zh: "个主页" }),
    countLabel(officialProfiles, { enOne: "official record", enOther: "official records", ja: "件の公式記録", zh: "项官方记录" }),
    countLabel(data.stats.official_source_links, { enOne: "source link", enOther: "source links", ja: "件の出典リンク", zh: "条来源链接" }),
  ]);
  renderLinks(data);
}

function renderArchivePage(data) {
  const documentTags = [...new Set(data.documents.map((item) => item.tag).filter(Boolean))];
  renderDetailMetrics([
    countLabel(data.documents.length, { enOne: "archived file", enOther: "archived files", ja: "件の保存ファイル", zh: "个归档文件" }),
    countLabel(documentTags.length, { enOne: "format", enOther: "formats", ja: "形式", zh: "种格式" }),
    documentTags.map((item) => translateTag(item)).join(" · "),
  ]);
  renderDocuments(data);
}

function renderTimelinePage(data) {
  const timelineCategories = [...new Set(data.timeline.map((item) => item.category).filter(Boolean))];
  renderDetailMetrics([
    countLabel(data.timeline.length, { enOne: "entry", enOther: "entries", ja: "件の記録", zh: "条记录" }),
    countLabel(timelineCategories.length, { enOne: "category", enOther: "categories", ja: "区分", zh: "个类别" }),
    timelineOverallPeriod(data.timeline),
  ]);
  renderTimeline(data);
}

function renderSourcesPage(data) {
  renderDetailMetrics([
    countLabel(data.source_notes.length, { enOne: "source note", enOther: "source notes", ja: "件の注記", zh: "条来源说明" }),
    countLabel(data.source_links.length, { enOne: "reference link", enOther: "reference links", ja: "件の参照リンク", zh: "条参考链接" }),
  ]);
  renderSources(data);
}

function quickPublicationFilterOptions() {
  return [
    { value: "all", label: t("filters.all") },
    { value: "journal", label: t("filters.quick_journal") },
    { value: "conference", label: t("filters.quick_conference") },
    { value: "preprint", label: t("filters.quick_preprint") },
    { value: "first_author", label: t("filters.quick_first_author") },
    { value: "corresponding", label: t("filters.quick_corresponding") },
    { value: "in_press", label: t("filters.quick_in_press") },
    { value: "pending_submission", label: t("filters.quick_pending_submission") },
    { value: "has_doi", label: t("filters.quick_has_doi") },
  ];
}

function matchesQuickPublicationFilterValue(item, quickValue = state.quick) {
  switch (quickValue) {
    case "journal":
      return item.type === "journal";
    case "conference":
      return item.type === "conference";
    case "preprint":
      return item.type === "preprint";
    case "first_author":
      return publicationHasFirstAuthorMark(item);
    case "corresponding":
      return publicationHasCorrespondingMark(item);
    case "in_press":
      return item.status === "in_press";
    case "pending_submission":
      return ["submitted", "under_review"].includes(item.status);
    case "has_doi":
      return Boolean(item.doi);
    default:
      return true;
  }
}

function matchesQuickPublicationFilter(item) {
  return matchesQuickPublicationFilterValue(item, state.quick);
}

function publicationSearchHaystack(item) {
  return [
    item.title,
    item.author_line,
    item.venue,
    item.status,
    item.type,
    item.author_role,
    (item.tags || []).join(" "),
    item.source_group,
  ]
    .map((value) => normalizeString(value).toLowerCase())
    .join(" ");
}

function publicationMatchesActiveFilters(item, overrides = {}) {
  const active = {
    pubQuery: state.pubQuery,
    year: state.year,
    type: state.type,
    status: state.status,
    venue: state.venue,
    quick: state.quick,
    ...overrides,
  };

  const query = normalizeString(active.pubQuery).toLowerCase();
  const haystack = publicationSearchHaystack(item);
  const matchesQuery = !query || haystack.includes(query);
  const matchesYear = active.year === "all" || String(item.year) === active.year;
  const matchesType = active.type === "all" || item.type === active.type;
  const matchesStatus = active.status === "all" || item.status === active.status;
  const matchesVenue = active.venue === "all" || normalizeString(item.venue) === active.venue;
  const matchesQuick = active.quick === "all" || matchesQuickPublicationFilterValue(item, active.quick);

  return matchesQuery && matchesYear && matchesType && matchesStatus && matchesVenue && matchesQuick;
}

function formatFilterOptionLabel(label, count) {
  return `${label} (${count})`;
}

function updatePublicationResetButton() {
  if (!els.pubReset) {
    return;
  }

  const isDefault =
    !state.pubQuery
    && state.year === "all"
    && state.type === "all"
    && state.status === "all"
    && state.venue === "all"
    && state.sort === "recent"
    && state.quick === "all";

  els.pubReset.disabled = isDefault;
  els.pubReset.setAttribute("aria-disabled", String(isDefault));
}

function resetPublicationFilters() {
  state.pubQuery = "";
  state.year = "all";
  state.type = "all";
  state.status = "all";
  state.venue = "all";
  state.sort = "recent";
  state.quick = "all";

  if (els.pubSearch) {
    els.pubSearch.value = "";
  }

  renderPublications(state.data);
}

function populateFilters(data) {
  if (!els.yearFilter || !els.typeFilter || !els.statusFilter || !els.venueFilter || !els.quickFilterChips) {
    return;
  }

  const publications = data.publications;
  const years = [...new Set(publications.map((item) => item.year).filter(Boolean))].sort((a, b) => b - a);
  const types = [...new Set(publications.map((item) => item.type).filter(Boolean))].sort();
  const statuses = [...new Set(publications.map((item) => item.status).filter(Boolean))].sort();
  const venues = [...new Set(publications.map((item) => normalizeString(item.venue || "Unspecified")).filter(Boolean))].sort((a, b) => a.localeCompare(b));

  const facetCount = (overrides = {}) =>
    publications.filter((item) => publicationMatchesActiveFilters(item, overrides)).length;

  const allYearCount = facetCount({ year: "all" });
  const allTypeCount = facetCount({ type: "all" });
  const allStatusCount = facetCount({ status: "all" });
  const allVenueCount = facetCount({ venue: "all" });
  const allQuickCount = facetCount({ quick: "all" });

  els.yearFilter.innerHTML = [`<option value="all">${escapeHtml(formatFilterOptionLabel(t("filters.all_years"), allYearCount))}</option>`]
    .concat(
      years.map((year) => {
        const count = facetCount({ year: String(year) });
        return `<option value="${escapeHtml(year)}">${escapeHtml(formatFilterOptionLabel(String(year), count))}</option>`;
      }),
    )
    .join("");
  els.typeFilter.innerHTML = [`<option value="all">${escapeHtml(formatFilterOptionLabel(t("filters.all_types"), allTypeCount))}</option>`]
    .concat(
      types.map((item) => {
        const count = facetCount({ type: item });
        return `<option value="${escapeHtml(item)}">${escapeHtml(formatFilterOptionLabel(typeLabel(item), count))}</option>`;
      }),
    )
    .join("");
  els.statusFilter.innerHTML = [`<option value="all">${escapeHtml(formatFilterOptionLabel(t("filters.all_statuses"), allStatusCount))}</option>`]
    .concat(
      statuses.map((item) => {
        const count = facetCount({ status: item });
        return `<option value="${escapeHtml(item)}">${escapeHtml(formatFilterOptionLabel(statusLabel(item), count))}</option>`;
      }),
    )
    .join("");
  els.venueFilter.innerHTML = [`<option value="all">${escapeHtml(formatFilterOptionLabel(t("filters.all_venues"), allVenueCount))}</option>`]
    .concat(
      venues.map((venue) => {
        const count = facetCount({ venue });
        return `<option value="${escapeHtml(venue)}">${escapeHtml(formatFilterOptionLabel(venue, count))}</option>`;
      }),
    )
    .join("");

  els.yearFilter.value = state.year;
  els.typeFilter.value = state.type;
  els.statusFilter.value = state.status;
  els.venueFilter.value = state.venue;
  els.sortFilter.value = state.sort;

  els.quickFilterChips.innerHTML = quickPublicationFilterOptions()
    .map(
      (filter) => {
        const count = filter.value === "all"
          ? allQuickCount
          : facetCount({ quick: filter.value });
        return `
        <button class="chip ${filter.value === state.quick ? "is-active" : ""}" type="button" data-quick-filter="${escapeHtml(filter.value)}">
          <span>${escapeHtml(filter.label)}</span>
          <span class="chip-count">(${escapeHtml(count)})</span>
        </button>
      `;
      },
    )
    .join("");

  els.quickFilterChips.querySelectorAll(".chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      state.quick = chip.dataset.quickFilter || "all";
      renderPublications(state.data);
    });
  });

  updatePublicationResetButton();
}

function filterPublications(publications) {
  return publications.filter((item) => publicationMatchesActiveFilters(item));
}

function sortPublications(publications) {
  const list = [...publications];
  if (state.sort === "impact_factor") {
    return list.sort((a, b) => {
      const aIf = Number(a?.verification?.if_value || 0);
      const bIf = Number(b?.verification?.if_value || 0);
      return bIf - aIf || (b.citations || 0) - (a.citations || 0) || (b.year || 0) - (a.year || 0);
    });
  }
  if (state.sort === "citations") {
    return list.sort((a, b) => (b.citations || 0) - (a.citations || 0) || (b.year || 0) - (a.year || 0));
  }
  if (state.sort === "title") {
    return list.sort((a, b) => normalizeString(a.title).localeCompare(normalizeString(b.title)));
  }
  return list.sort((a, b) => (b.year || 0) - (a.year || 0) || (b.citations || 0) - (a.citations || 0));
}

function renderPublications(data) {
  if (!els.publicationList) {
    return;
  }

  populateFilters(data);
  const visible = sortPublications(filterPublications(data.publications));

  els.publicationList.innerHTML = visible.length
    ? visible
        .map(
          (item) => `
            <article class="publication-card" id="${escapeHtml(item.id)}">
              <div class="publication-head">
                <h4>${escapeHtml(item.title)}</h4>
                <div class="publication-head-actions">
                  <button
                    class="publication-copy-button publication-copy-trigger"
                    type="button"
                    aria-label="${escapeHtml(publicationCopyMenuLabel())}"
                  >
                    ${iconSprite("copy")}
                  </button>
                  <div class="publication-copy-menu" role="menu" aria-label="${escapeHtml(publicationCopyMenuLabel())}">
                    <button
                      class="publication-copy-button publication-copy-option"
                      type="button"
                      data-copy-publication-id="${escapeHtml(item.id)}"
                      data-copy-format="ieee"
                      aria-label="${escapeHtml(publicationCopyActionLabel("ieee"))}"
                    >
                      ${iconSprite("copy")}
                      <span>${escapeHtml(t("actions.copy_citation"))}</span>
                    </button>
                    <button
                      class="publication-copy-button publication-copy-button-bibtex publication-copy-option"
                      type="button"
                      data-copy-publication-id="${escapeHtml(item.id)}"
                      data-copy-format="bibtex"
                      aria-label="${escapeHtml(publicationCopyActionLabel("bibtex"))}"
                    >
                      ${iconSprite("code")}
                      <span>${escapeHtml(t("actions.copy_bibtex"))}</span>
                    </button>
                  </div>
                </div>
              </div>
              <p class="authors">${formatIeeeAuthorMarkup(item.authors, item)}</p>
              <p class="venue-line">${publicationVenueMarkup(item)}</p>
              ${
                publicationStatusNote(item)
                  ? `<p class="publication-note">${escapeHtml(publicationStatusNote(item))}</p>`
                  : ""
              }
              ${publicationDoiMarkup(item)}
              ${publicationMetricsMarkup(item)}
              ${
                publicationRoleNote(item)
                  ? `<p class="role-note">${escapeHtml(publicationRoleNote(item))}</p>`
                  : ""
              }
            </article>
          `,
        )
        .join("")
    : `<div class="empty">${escapeHtml(t("empty.no_publications"))}</div>`;
}

function renderSources(data) {
  if (!els.sourceNoteList || !els.sourceLinkList) {
    return;
  }

  els.sourceNoteList.innerHTML = data.source_notes
    .map(
      (item) => `
        <div class="stack-item source-note-item">
          <span class="stack-label source-note-label">${escapeHtml(lt(item.title))}</span>
          <span class="stack-value source-note-text">${emphasizeSourceCopy(lt(item.body))}</span>
        </div>
      `,
    )
    .join("");

  els.sourceLinkList.innerHTML = data.source_links
    .map(
      (item) => `
        <div class="stack-item source-link-item">
          <span class="stack-label source-link-label">${escapeHtml(lt(item.label))}</span>
          <span class="stack-value source-link-text">${buildLink(localizedExternalUrl(item.url, item.label), localizedExternalUrl(item.url, item.label))}</span>
        </div>
      `,
    )
    .join("");
}

function bindEvents() {
  if (els.linkSearch) {
    els.linkSearch.addEventListener("input", (event) => {
      state.linkQuery = event.target.value;
      renderLinks(state.data);
    });
  }

  if (els.pubSearch) {
    els.pubSearch.addEventListener("input", (event) => {
      state.pubQuery = event.target.value;
      renderPublications(state.data);
    });
  }

  if (els.yearFilter) {
    els.yearFilter.addEventListener("change", (event) => {
      state.year = event.target.value;
      renderPublications(state.data);
    });
  }

  if (els.typeFilter) {
    els.typeFilter.addEventListener("change", (event) => {
      state.type = event.target.value;
      renderPublications(state.data);
    });
  }

  if (els.statusFilter) {
    els.statusFilter.addEventListener("change", (event) => {
      state.status = event.target.value;
      renderPublications(state.data);
    });
  }

  if (els.venueFilter) {
    els.venueFilter.addEventListener("change", (event) => {
      state.venue = event.target.value;
      renderPublications(state.data);
    });
  }

  if (els.sortFilter) {
    els.sortFilter.addEventListener("change", (event) => {
      state.sort = event.target.value;
      renderPublications(state.data);
    });
  }

  if (els.pubReset) {
    els.pubReset.addEventListener("click", () => {
      resetPublicationFilters();
    });
  }

  if (els.publicationList && !els.publicationList.dataset.copyBound) {
    els.publicationList.dataset.copyBound = "true";
    els.publicationList.addEventListener("click", async (event) => {
      const metricLink = event.target.closest("[data-copy-on-open='true']");
      if (metricLink) {
        const targetUrl = metricLink.getAttribute("href") || "";
        const defaultTooltip = metricLink.dataset.tooltip || t("actions.open_jcr_search_copy");
        const successLabel = metricLink.dataset.copySuccessLabel || t("actions.copied_journal_name");
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
      }

      const button = event.target.closest("[data-copy-publication-id]");
      if (!button) {
        return;
      }

      event.preventDefault();
      const publicationId = button.dataset.copyPublicationId || "";
      const format = button.dataset.copyFormat === "bibtex" ? "bibtex" : "ieee";
      const item = state.data.publications.find((entry) => entry.id === publicationId);
      if (!item) {
        return;
      }

      const copied = await copyTextToClipboard(
        format === "bibtex" ? buildBibtexText(item) : buildIeeeCitationText(item),
      );
      if (!copied) {
        return;
      }

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

  if (els.heroContactList && !els.heroContactList.dataset.copyBound) {
    els.heroContactList.dataset.copyBound = "true";
    els.heroContactList.addEventListener("click", async (event) => {
      const button = event.target.closest("[data-copy-email]");
      if (!button) {
        return;
      }

      event.preventDefault();
      const copyText = button.dataset.copyEmail || "";
      if (!copyText) {
        return;
      }

      const defaultTooltip = button.dataset.tooltip || t("actions.copy_email");
      const successLabel = button.dataset.copySuccessLabel || t("actions.copied_email");
      const copied = await copyTextToClipboard(copyText);
      if (!copied) {
        return;
      }

      button.classList.add("is-copied");
      button.dataset.tooltip = successLabel;
      button.setAttribute("aria-label", successLabel);
      button.setAttribute("title", successLabel);
      window.setTimeout(() => {
        button.classList.remove("is-copied");
        button.dataset.tooltip = defaultTooltip;
        button.setAttribute("aria-label", defaultTooltip);
        button.setAttribute("title", defaultTooltip);
      }, 1400);
    });
  }

  if (els.heroNameCopy && !els.heroNameCopy.dataset.copyBound) {
    els.heroNameCopy.dataset.copyBound = "true";
    els.heroNameCopy.addEventListener("click", async (event) => {
      event.preventDefault();
      const button = event.currentTarget;
      const copyText = button.dataset.copyText || "";
      if (!copyText) {
        return;
      }

      const defaultTooltip = button.dataset.tooltip || t("actions.copy_name");
      const successLabel = button.dataset.copySuccessLabel || t("actions.copied_name");
      const copied = await copyTextToClipboard(copyText);
      if (!copied) {
        return;
      }

      button.classList.add("is-copied");
      button.dataset.tooltip = successLabel;
      button.setAttribute("aria-label", successLabel);
      button.setAttribute("title", successLabel);
      window.setTimeout(() => {
        button.classList.remove("is-copied");
        button.dataset.tooltip = defaultTooltip;
        button.setAttribute("aria-label", defaultTooltip);
        button.setAttribute("title", defaultTooltip);
      }, 1400);
    });
  }
}

function bindRevealObserver() {
  const nodes = document.querySelectorAll(".reveal");
  if (!nodes.length) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
  );

  nodes.forEach((node, index) => {
    if (index < 2) {
      node.classList.add("is-visible");
    }
    observer.observe(node);
  });
}

function renderHomepage(data) {
  renderHero(data);
  renderRecordNav(data);
  renderOverview(data);
  renderHomeShortcuts(data);
  renderModuleNav(data);
}

function renderCurrentPage() {
  applyStaticLocale();

  const page = currentPage();
  if (page === "publications") {
    renderPublicationsPage(state.data);
  } else if (page === "awards") {
    renderAwardsPage(state.data);
  } else if (page === "service") {
    renderServicePage(state.data);
  } else if (page === "projects") {
    renderProjectsPage(state.data);
  } else if (page === "research") {
    renderResearchPage(state.data);
  } else if (page === "profiles") {
    renderProfilesPage(state.data);
  } else if (page === "archive") {
    renderArchivePage(state.data);
  } else if (page === "timeline") {
    renderTimelinePage(state.data);
  } else if (page === "sources") {
    renderSourcesPage(state.data);
  } else {
    renderHomepage(state.data);
  }
}

async function init() {
  initLocaleControls();
  initThemeControls();
  initTopnavMenus();
  initTopnavOverflowHints();
  initHeaderControlsPosition();
  initScrollTopButton();
  state.data = await loadData();
  dataReady = true;
  document.body.classList.add("is-ready");
  renderCurrentPage();
  bindEvents();
  bindRevealObserver();
}

init();
