const DATA_URL = "./data/conferences.json";
const LOCALE_KEY = "sichen-homepage-locale";
const THEME_KEY = "sichen-homepage-theme";
const LOCALES = ["zh", "en", "ja"];
const THEMES = ["tohoku", "toyama", "usst"];

const COPY = {
  zh: {
    documentTitle: "Conference Radar | 陶思晨",
    documentDescription: "按投稿截止日期检索人工智能、高性能计算、系统、安全、数据库、机器人、人机交互等多领域会议。",
    brandNote: "研究投稿时间情报",
    navPortal: "导航页",
    navFrontier: "学术前沿",
    heroKicker: "来自官方来源的会议信息",
    heroTitle: "把下一次投稿窗口，看得更早。",
    heroLede: "聚合多领域核心会议的投稿截止、开会日期与地点；默认只显示从今天起仍可准备的投稿机会。",
    heroAction: "查看开放投稿",
    heroLocal: "杭州 · 上海雷达",
    radarLabel: "最近核验的截止日期",
    statRecords: "条已核验会议记录",
    statOpen: "个仍可投稿的窗口",
    statDomains: "个研究领域",
    statLocal: "条杭州／上海动态",
    searchLabel: "搜索会议",
    searchPlaceholder: "搜索会议、领域或城市",
    scopeOpen: "开放投稿",
    scopeAll: "全部记录",
    scopeLocal: "杭州 · 上海",
    scopeTba: "待公布",
    sortLabel: "排序",
    sortDeadline: "按投稿截止",
    sortMeeting: "按开会日期",
    sortVerified: "按核验时间",
    domainAll: "全部领域",
    nextLabel: "最近截止",
    localLabel: "杭州 · 上海",
    methodLabel: "数据纪律",
    methodCopy: "只记录官方来源已经公布的信息；待公布字段保持为空，并显示最近核验日期。",
    openData: "查看开放数据 ↗",
    resultsKicker: "投稿时间索引",
    resultsTitle: "仍可准备的投稿窗口",
    resultsTitleAll: "全部会议记录",
    resultsTitleLocal: "杭州与上海会议",
    resultsTitleTba: "等待官方日期",
    resultCount: count => `${count} 条结果`,
    emptyTitle: "没有匹配的会议",
    emptyCopy: "尝试清空搜索词，或切换到“全部记录”。",
    reset: "重置筛选",
    footerCopy: "由 Sichen Tao 维护的紧凑型研究计划界面。",
    verified: date => `数据核验：${date}`,
    officialSource: "官方来源",
    verifiedShort: date => `核验 ${date}`,
    deadline: "投稿节点",
    tba: "待官方公布",
    meetingTba: "开会日期待公布",
    open: "开放",
    upcoming: "即将截止",
    local: "杭州／上海",
    today: "今天截止",
    daysLeft: days => `剩余 ${days} 天`,
    deadlinePassed: "已截止",
    nextStage: "后续节点",
    recurring: "滚动投稿",
    sourceError: "会议数据暂时无法载入，请稍后重试或打开原始 JSON。",
    nextUnknown: "暂无已公布日期",
    localeLabel: "切换语言",
    themeLabel: "切换配色",
    locationTba: "地点待公布"
  },
  en: {
    documentTitle: "Conference Radar | Sichen Tao",
    documentDescription: "Search official conference deadlines, meeting dates, and locations across AI, HPC, systems, security, databases, robotics, HCI, and more.",
    brandNote: "Research deadline intelligence",
    navPortal: "Portal",
    navFrontier: "Academic Frontier",
    heroKicker: "Official-source conference intelligence",
    heroTitle: "See the next submission window sooner.",
    heroLede: "A compact index of submission deadlines, meeting dates, and locations across research fields. The default view keeps only opportunities you can still prepare for.",
    heroAction: "Explore open calls",
    heroLocal: "Hangzhou · Shanghai radar",
    radarLabel: "Next verified deadline",
    statRecords: "verified conference records",
    statOpen: "submission windows still ahead",
    statDomains: "research domains",
    statLocal: "Hangzhou / Shanghai signals",
    searchLabel: "Search conferences",
    searchPlaceholder: "Search conference, field, or city",
    scopeOpen: "Open calls",
    scopeAll: "All records",
    scopeLocal: "Hangzhou · Shanghai",
    scopeTba: "Dates TBA",
    sortLabel: "Sort",
    sortDeadline: "Submission deadline",
    sortMeeting: "Meeting date",
    sortVerified: "Last verified",
    domainAll: "All domains",
    nextLabel: "Next deadline",
    localLabel: "Hangzhou · Shanghai",
    methodLabel: "Data discipline",
    methodCopy: "Only officially published facts are recorded. Unannounced fields remain empty and every record carries a verification date.",
    openData: "Open data ↗",
    resultsKicker: "Deadline index",
    resultsTitle: "Submission windows still ahead",
    resultsTitleAll: "All conference records",
    resultsTitleLocal: "Hangzhou and Shanghai conferences",
    resultsTitleTba: "Awaiting official dates",
    resultCount: count => `${count} results`,
    emptyTitle: "No conferences match",
    emptyCopy: "Clear the search or switch to all records.",
    reset: "Reset filters",
    footerCopy: "A compact research planning surface maintained by Sichen Tao.",
    verified: date => `Data verified: ${date}`,
    officialSource: "Official source",
    verifiedShort: date => `Verified ${date}`,
    deadline: "Submission milestone",
    tba: "Official date TBA",
    meetingTba: "Meeting date TBA",
    open: "Open",
    upcoming: "Closing soon",
    local: "Hangzhou / Shanghai",
    today: "Due today",
    daysLeft: days => `${days} days left`,
    deadlinePassed: "Closed",
    nextStage: "Following milestones",
    recurring: "Rolling submissions",
    sourceError: "Conference data could not be loaded. Try again later or open the raw JSON.",
    nextUnknown: "No announced date",
    localeLabel: "Change language",
    themeLabel: "Change color theme",
    locationTba: "Location TBA"
  },
  ja: {
    documentTitle: "Conference Radar | 陶思晨",
    documentDescription: "AI、HPC、システム、セキュリティ、データベース、ロボティクス、HCIなどの投稿締切・開催日・開催地を検索できます。",
    brandNote: "研究投稿スケジュール",
    navPortal: "ポータル",
    navFrontier: "学術フロンティア",
    heroKicker: "公式ソースに基づく会議情報",
    heroTitle: "次の投稿機会を、もっと早く見つける。",
    heroLede: "複数分野の投稿締切、開催日、開催地を集約。初期表示では、今日から準備できる投稿機会だけを示します。",
    heroAction: "募集中の会議を見る",
    heroLocal: "杭州・上海レーダー",
    radarLabel: "次の確認済み締切",
    statRecords: "件の確認済み会議",
    statOpen: "件の投稿可能枠",
    statDomains: "研究分野",
    statLocal: "件の杭州・上海情報",
    searchLabel: "会議を検索",
    searchPlaceholder: "会議・分野・都市を検索",
    scopeOpen: "募集中",
    scopeAll: "全記録",
    scopeLocal: "杭州・上海",
    scopeTba: "日程未発表",
    sortLabel: "並び順",
    sortDeadline: "投稿締切順",
    sortMeeting: "開催日順",
    sortVerified: "確認日順",
    domainAll: "全分野",
    nextLabel: "次の締切",
    localLabel: "杭州・上海",
    methodLabel: "データ方針",
    methodCopy: "公式に公開済みの情報だけを記録します。未発表の項目は空欄のままにし、最終確認日を表示します。",
    openData: "オープンデータ ↗",
    resultsKicker: "投稿日程インデックス",
    resultsTitle: "これから準備できる投稿枠",
    resultsTitleAll: "全会議記録",
    resultsTitleLocal: "杭州・上海の会議",
    resultsTitleTba: "公式日程を待っている会議",
    resultCount: count => `${count} 件`,
    emptyTitle: "該当する会議がありません",
    emptyCopy: "検索を消去するか、「全記録」に切り替えてください。",
    reset: "フィルターをリセット",
    footerCopy: "Sichen Tao が管理する研究計画用のコンパクトな画面です。",
    verified: date => `データ確認日：${date}`,
    officialSource: "公式ソース",
    verifiedShort: date => `確認 ${date}`,
    deadline: "投稿マイルストーン",
    tba: "公式日程未発表",
    meetingTba: "開催日未発表",
    open: "募集中",
    upcoming: "締切間近",
    local: "杭州・上海",
    today: "本日締切",
    daysLeft: days => `残り ${days} 日`,
    deadlinePassed: "締切済み",
    nextStage: "後続マイルストーン",
    recurring: "ローリング投稿",
    sourceError: "会議データを読み込めませんでした。後でもう一度試すか、JSONを開いてください。",
    nextUnknown: "発表済み日程なし",
    localeLabel: "言語を切り替える",
    themeLabel: "配色を切り替える",
    locationTba: "開催地未発表"
  }
};

const DOMAIN_COPY = {
  ai: { zh: "人工智能", en: "Artificial intelligence", ja: "人工知能" },
  ml: { zh: "机器学习", en: "Machine learning", ja: "機械学習" },
  nlp: { zh: "自然语言处理", en: "Natural language processing", ja: "自然言語処理" },
  vision: { zh: "计算机视觉", en: "Computer vision", ja: "コンピュータビジョン" },
  robotics: { zh: "机器人", en: "Robotics", ja: "ロボティクス" },
  hpc: { zh: "高性能计算", en: "High-performance computing", ja: "高性能計算" },
  systems: { zh: "计算机系统", en: "Computer systems", ja: "コンピュータシステム" },
  architecture: { zh: "体系结构", en: "Computer architecture", ja: "計算機アーキテクチャ" },
  networks: { zh: "计算机网络", en: "Computer networks", ja: "コンピュータネットワーク" },
  security: { zh: "安全与隐私", en: "Security & privacy", ja: "セキュリティ・プライバシー" },
  databases: { zh: "数据库", en: "Databases", ja: "データベース" },
  hci: { zh: "人机交互", en: "Human-computer interaction", ja: "ヒューマン・コンピュータ・インタラクション" },
  signal: { zh: "信号处理", en: "Signal processing", ja: "信号処理" },
  storage: { zh: "存储系统", en: "Storage systems", ja: "ストレージシステム" },
  algorithms: { zh: "算法", en: "Algorithms", ja: "アルゴリズム" }
};

const state = {
  locale: resolveLocale(),
  theme: resolveTheme(),
  scope: new URLSearchParams(location.search).get("scope") || "open",
  domain: new URLSearchParams(location.search).get("domain") || "all",
  query: new URLSearchParams(location.search).get("q") || "",
  sort: new URLSearchParams(location.search).get("sort") || "deadline",
  data: null
};

function resolveLocale() {
  try {
    const saved = localStorage.getItem(LOCALE_KEY);
    if (LOCALES.includes(saved)) return saved;
  } catch {}
  const lang = document.documentElement.lang;
  return lang.startsWith("ja") ? "ja" : lang.startsWith("en") ? "en" : "zh";
}

function resolveTheme() {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (THEMES.includes(saved)) return saved;
  } catch {}
  return THEMES.includes(document.documentElement.dataset.theme) ? document.documentElement.dataset.theme : "tohoku";
}

function t() {
  return COPY[state.locale] || COPY.zh;
}

function localized(value) {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value[state.locale] || value.en || value.zh || value.ja || "";
  }
  return value || "";
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function parseDeadline(date) {
  return date ? new Date(`${date}T23:59:59Z`) : null;
}

function parseMeeting(date) {
  return date ? new Date(`${date}T12:00:00Z`) : null;
}

function nextDeadline(conference) {
  const now = new Date();
  return (conference.deadlines || [])
    .map(item => ({ ...item, parsed: parseDeadline(item.date) }))
    .filter(item => item.parsed && item.parsed >= now)
    .sort((a, b) => a.parsed - b.parsed)[0] || null;
}

function daysUntil(date) {
  const target = parseDeadline(date);
  if (!target) return null;
  return Math.max(0, Math.ceil((target - new Date()) / 86400000));
}

function localeCode() {
  return state.locale === "zh" ? "zh-CN" : state.locale === "ja" ? "ja-JP" : "en-US";
}

function formatDate(date, options = {}) {
  if (!date) return t().tba;
  return new Intl.DateTimeFormat(localeCode(), {
    year: "numeric",
    month: options.short ? "short" : "2-digit",
    day: "2-digit",
    timeZone: "UTC"
  }).format(parseMeeting(date));
}

function formatRange(meeting) {
  if (!meeting?.start) return t().meetingTba;
  if (!meeting.end || meeting.end === meeting.start) return formatDate(meeting.start, { short: true });
  const start = parseMeeting(meeting.start);
  const end = parseMeeting(meeting.end);
  const sameYear = start.getUTCFullYear() === end.getUTCFullYear();
  const sameMonth = sameYear && start.getUTCMonth() === end.getUTCMonth();
  if (sameMonth) {
    const monthYear = new Intl.DateTimeFormat(localeCode(), { year: "numeric", month: "short", timeZone: "UTC" }).format(start);
    return state.locale === "en"
      ? `${new Intl.DateTimeFormat("en-US", { month: "short", timeZone: "UTC" }).format(start)} ${start.getUTCDate()}–${end.getUTCDate()}, ${start.getUTCFullYear()}`
      : `${monthYear} ${start.getUTCDate()}–${end.getUTCDate()}`;
  }
  return `${formatDate(meeting.start, { short: true })} – ${formatDate(meeting.end, { short: true })}`;
}

function domainLabel(domain) {
  return DOMAIN_COPY[domain]?.[state.locale] || domain;
}

function countdownCopy(deadline) {
  if (!deadline) return t().tba;
  const days = daysUntil(deadline.date);
  if (days === 0) return t().today;
  return t().daysLeft(days);
}

function conferenceSearchText(conference) {
  return [
    conference.acronym,
    conference.name,
    ...conference.domains.map(domain => Object.values(DOMAIN_COPY[domain] || {}).join(" ")),
    localized(conference.meeting?.location),
    conference.meeting?.venue,
    localized(conference.note)
  ].join(" ").toLocaleLowerCase();
}

function filteredConferences() {
  if (!state.data) return [];
  const query = state.query.trim().toLocaleLowerCase();
  const filtered = state.data.conferences.filter(conference => {
    const next = nextDeadline(conference);
    const scopeMatch =
      state.scope === "all" ||
      (state.scope === "open" && Boolean(next)) ||
      (state.scope === "local" && conference.collection === "local") ||
      (state.scope === "tba" && !conference.deadlines.length);
    const domainMatch = state.domain === "all" || conference.domains.includes(state.domain);
    const queryMatch = !query || conferenceSearchText(conference).includes(query);
    return scopeMatch && domainMatch && queryMatch;
  });

  return filtered.sort((a, b) => {
    if (state.sort === "meeting") {
      return (parseMeeting(a.meeting?.start)?.getTime() || Number.MAX_SAFE_INTEGER) -
        (parseMeeting(b.meeting?.start)?.getTime() || Number.MAX_SAFE_INTEGER);
    }
    if (state.sort === "verified") {
      return String(b.verifiedAt).localeCompare(String(a.verifiedAt));
    }
    return (nextDeadline(a)?.parsed?.getTime() || Number.MAX_SAFE_INTEGER) -
      (nextDeadline(b)?.parsed?.getTime() || Number.MAX_SAFE_INTEGER);
  });
}

function updateUrl() {
  const params = new URLSearchParams();
  if (state.scope !== "open") params.set("scope", state.scope);
  if (state.domain !== "all") params.set("domain", state.domain);
  if (state.query) params.set("q", state.query);
  if (state.sort !== "deadline") params.set("sort", state.sort);
  const query = params.toString();
  history.replaceState(null, "", query ? `?${query}` : location.pathname);
}

function applyDocumentState() {
  const copy = t();
  document.documentElement.lang = state.locale === "zh" ? "zh-CN" : state.locale === "ja" ? "ja" : "en";
  document.documentElement.dataset.theme = state.theme;
  document.body.dataset.lang = state.locale;
  document.title = copy.documentTitle;
  document.querySelector('meta[name="description"]')?.setAttribute("content", copy.documentDescription);
  document.querySelectorAll("[data-i18n]").forEach(node => {
    const value = copy[node.dataset.i18n];
    if (typeof value === "string") node.textContent = value;
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(node => {
    const value = copy[node.dataset.i18nPlaceholder];
    if (typeof value === "string") node.setAttribute("placeholder", value);
  });
}

function renderLocaleControl() {
  const labels = { zh: "中", en: "EN", ja: "日" };
  const names = { zh: "简体中文", en: "English", ja: "日本語" };
  const control = document.getElementById("localeControl");
  control.setAttribute("aria-label", t().localeLabel);
  control.innerHTML = LOCALES.map(locale => `
    <button type="button" data-locale="${locale}" class="${locale === state.locale ? "is-active" : ""}" aria-label="${names[locale]}" aria-pressed="${locale === state.locale}">${labels[locale]}</button>
  `).join("");
  control.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", () => setLocale(button.dataset.locale));
  });
  const themeButton = document.getElementById("themeButton");
  themeButton.setAttribute("aria-label", t().themeLabel);
  themeButton.title = t().themeLabel;
}

function renderStats() {
  const conferences = state.data.conferences;
  const open = conferences.filter(conference => nextDeadline(conference)).length;
  const domains = new Set(conferences.flatMap(conference => conference.domains)).size;
  const local = conferences.filter(conference => conference.collection === "local").length;
  const values = [
    [conferences.length, t().statRecords],
    [open, t().statOpen],
    [domains, t().statDomains],
    [local, t().statLocal]
  ];
  document.getElementById("statGrid").innerHTML = values.map(([value, label]) => `
    <div class="cr-stat"><strong>${value}</strong><span>${escapeHtml(label)}</span></div>
  `).join("");
}

function renderControls() {
  const scopes = [
    ["open", t().scopeOpen],
    ["all", t().scopeAll],
    ["local", t().scopeLocal],
    ["tba", t().scopeTba]
  ];
  const scopeTabs = document.getElementById("scopeTabs");
  scopeTabs.innerHTML = scopes.map(([value, label]) => `
    <button type="button" data-scope="${value}" class="${state.scope === value ? "is-active" : ""}" aria-pressed="${state.scope === value}">${escapeHtml(label)}</button>
  `).join("");
  scopeTabs.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", () => {
      state.scope = button.dataset.scope;
      renderDynamic();
    });
  });

  const select = document.getElementById("sortSelect");
  select.innerHTML = [
    ["deadline", t().sortDeadline],
    ["meeting", t().sortMeeting],
    ["verified", t().sortVerified]
  ].map(([value, label]) => `<option value="${value}" ${state.sort === value ? "selected" : ""}>${escapeHtml(label)}</option>`).join("");
  select.addEventListener("change", event => {
    state.sort = event.target.value;
    renderResults();
    updateUrl();
  });

  const availableDomains = [...new Set(state.data.conferences.flatMap(conference => conference.domains))]
    .sort((a, b) => domainLabel(a).localeCompare(domainLabel(b), localeCode()));
  document.getElementById("domainFilters").innerHTML = ["all", ...availableDomains].map(domain => `
    <button type="button" class="cr-domain-chip ${state.domain === domain ? "is-active" : ""}" data-domain="${domain}" aria-pressed="${state.domain === domain}">
      ${escapeHtml(domain === "all" ? t().domainAll : domainLabel(domain))}
    </button>
  `).join("");
  document.querySelectorAll("[data-domain]").forEach(button => {
    button.addEventListener("click", () => {
      state.domain = button.dataset.domain;
      renderDynamic();
    });
  });
}

function cardStatus(next) {
  if (!next) return { label: t().tba, className: "is-tba" };
  const days = daysUntil(next.date);
  return days <= 14
    ? { label: t().upcoming, className: "is-urgent" }
    : { label: t().open, className: "" };
}

function meetingIcon() {
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s6-5.2 6-11a6 6 0 10-12 0c0 5.8 6 11 6 11z"></path><circle cx="12" cy="10" r="2"></circle></svg>`;
}

function renderConferenceCard(conference) {
  const next = nextDeadline(conference);
  const status = cardStatus(next);
  const upcomingStages = (conference.deadlines || [])
    .filter(item => parseDeadline(item.date) >= new Date() && item.date !== next?.date)
    .slice(0, 2);
  const note = localized(conference.note);
  const location = localized(conference.meeting?.location) || t().locationTba;
  const meetingDate = formatRange(conference.meeting);
  const countdown = next ? countdownCopy(next) : t().tba;
  const days = next ? daysUntil(next.date) : null;

  return `
    <article class="cr-conference-card ${conference.collection === "local" ? "is-local" : ""}" data-primary-domain="${escapeHtml(conference.domains[0])}" id="${escapeHtml(conference.id)}">
      <div class="cr-card-main">
        <div class="cr-card-topline">
          <span class="cr-acronym">${escapeHtml(conference.acronym)}</span>
          <span class="cr-status-pill ${status.className}">${escapeHtml(status.label)}</span>
          ${conference.collection === "local" ? `<span class="cr-local-pill">${escapeHtml(t().local)}</span>` : ""}
        </div>
        <h3>${escapeHtml(conference.name)}</h3>
        <div class="cr-domain-list">
          ${conference.domains.map(domain => `<span class="cr-domain-tag">${escapeHtml(domainLabel(domain))}</span>`).join("")}
          ${conference.recurring ? `<span class="cr-domain-tag">${escapeHtml(t().recurring)}</span>` : ""}
        </div>
        ${note ? `<p class="cr-card-note">${escapeHtml(note)}</p>` : ""}
      </div>

      <div class="cr-deadline-panel">
        ${next ? `
          <div class="cr-deadline-primary">
            <span>${escapeHtml(t().deadline)}</span>
            <time datetime="${escapeHtml(next.date)}">${escapeHtml(formatDate(next.date))}</time>
            <strong>${escapeHtml(localized(next.label))}</strong>
            <small class="cr-countdown ${days <= 7 ? "is-urgent" : ""}">${escapeHtml(countdown)} · ${escapeHtml(next.timezone || "")}</small>
          </div>
        ` : `
          <span class="cr-deadline-primary"><span>${escapeHtml(t().deadline)}</span><strong class="cr-tba-large">${escapeHtml(t().tba)}</strong></span>
        `}
        ${upcomingStages.length ? `
          <div class="cr-stage-list" aria-label="${escapeHtml(t().nextStage)}">
            ${upcomingStages.map(stage => `
              <div class="cr-stage"><span>${escapeHtml(localized(stage.label))}</span><time datetime="${escapeHtml(stage.date)}">${escapeHtml(formatDate(stage.date, { short: true }))}</time></div>
            `).join("")}
          </div>
        ` : ""}
      </div>

      <div class="cr-card-bottom">
        <div class="cr-meeting">
          ${meetingIcon()}
          <strong>${escapeHtml(meetingDate)}</strong>
          <span>${escapeHtml(location)}${conference.meeting?.venue ? ` · ${escapeHtml(conference.meeting.venue)}` : ""}</span>
        </div>
        <a class="cr-source-link" href="${escapeHtml(conference.sourceUrl)}" target="_blank" rel="noreferrer">
          <span>${escapeHtml(t().officialSource)}</span><span aria-hidden="true">↗</span>
        </a>
      </div>
    </article>
  `;
}

function renderResults() {
  const conferences = filteredConferences();
  const list = document.getElementById("conferenceList");
  const empty = document.getElementById("emptyState");
  list.setAttribute("aria-busy", "false");
  list.innerHTML = conferences.map(renderConferenceCard).join("");
  empty.hidden = conferences.length > 0;
  list.hidden = conferences.length === 0;
  document.getElementById("resultCount").textContent = t().resultCount(conferences.length);
  const title = state.scope === "all" ? t().resultsTitleAll : state.scope === "local" ? t().resultsTitleLocal : state.scope === "tba" ? t().resultsTitleTba : t().resultsTitle;
  document.getElementById("resultsTitle").textContent = title;
}

function renderRail() {
  const exact = state.data.conferences
    .map(conference => ({ conference, deadline: nextDeadline(conference) }))
    .filter(item => item.deadline)
    .sort((a, b) => a.deadline.parsed - b.deadline.parsed);
  const next = exact[0];
  document.getElementById("radarNext").textContent = next
    ? `${next.conference.acronym} · ${formatDate(next.deadline.date, { short: true })}`
    : t().nextUnknown;
  document.getElementById("nextDeadlineCard").innerHTML = next ? `
    <div class="cr-next-mini">
      <time datetime="${escapeHtml(next.deadline.date)}">${escapeHtml(formatDate(next.deadline.date, { short: true }))}</time>
      <strong>${escapeHtml(next.conference.acronym)}</strong>
      <span>${escapeHtml(localized(next.deadline.label))} · ${escapeHtml(countdownCopy(next.deadline))}</span>
    </div>
  ` : `<span>${escapeHtml(t().nextUnknown)}</span>`;

  const local = state.data.conferences
    .filter(conference => conference.collection === "local")
    .sort((a, b) => (nextDeadline(a)?.parsed || parseMeeting(a.meeting?.start) || Infinity) - (nextDeadline(b)?.parsed || parseMeeting(b.meeting?.start) || Infinity));
  document.getElementById("localSummary").innerHTML = `<div class="cr-local-mini">${local.slice(0, 4).map(conference => `
    <button type="button" data-local-id="${escapeHtml(conference.id)}">
      <span><strong>${escapeHtml(conference.acronym)}</strong><br><span>${escapeHtml(localized(conference.meeting.location))}</span></span>
      <em>${escapeHtml(nextDeadline(conference) ? formatDate(nextDeadline(conference).date, { short: true }) : t().tba)}</em>
    </button>
  `).join("")}</div>`;
  document.querySelectorAll("[data-local-id]").forEach(button => {
    button.addEventListener("click", () => showLocalConference(button.dataset.localId));
  });
}

function renderTimestamp() {
  document.getElementById("dataTimestamp").textContent = t().verified(state.data.meta.verifiedAt);
}

function renderDynamic() {
  updateUrl();
  applyDocumentState();
  renderLocaleControl();
  renderControls();
  renderStats();
  renderRail();
  renderResults();
  renderTimestamp();
}

function setLocale(locale) {
  if (!LOCALES.includes(locale)) return;
  state.locale = locale;
  try { localStorage.setItem(LOCALE_KEY, locale); } catch {}
  renderDynamic();
}

function cycleTheme() {
  const index = THEMES.indexOf(state.theme);
  state.theme = THEMES[(index + 1) % THEMES.length];
  try { localStorage.setItem(THEME_KEY, state.theme); } catch {}
  applyDocumentState();
}

function showLocalConference(id) {
  state.scope = "local";
  state.domain = "all";
  state.query = "";
  document.getElementById("conferenceSearch").value = "";
  renderDynamic();
  requestAnimationFrame(() => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "center" });
  });
}

function bindEvents() {
  const search = document.getElementById("conferenceSearch");
  search.value = state.query;
  search.addEventListener("input", event => {
    state.query = event.target.value;
    renderResults();
    updateUrl();
  });
  document.getElementById("themeButton").addEventListener("click", cycleTheme);
  document.getElementById("localShortcut").addEventListener("click", () => {
    state.scope = "local";
    state.domain = "all";
    state.query = "";
    search.value = "";
    renderDynamic();
    document.getElementById("results").scrollIntoView({ behavior: "smooth" });
  });
  document.getElementById("resetFilters").addEventListener("click", () => {
    state.scope = "open";
    state.domain = "all";
    state.query = "";
    state.sort = "deadline";
    search.value = "";
    renderDynamic();
  });
  document.addEventListener("keydown", event => {
    const tag = document.activeElement?.tagName;
    if (event.key === "/" && !["INPUT", "TEXTAREA", "SELECT"].includes(tag)) {
      event.preventDefault();
      search.focus();
    }
    if (event.key === "Escape" && document.activeElement === search) {
      search.value = "";
      state.query = "";
      renderResults();
      updateUrl();
      search.blur();
    }
  });
}

async function init() {
  applyDocumentState();
  renderLocaleControl();
  try {
    const response = await fetch(DATA_URL, { cache: "no-cache" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    state.data = await response.json();
    renderDynamic();
    bindEvents();
  } catch (error) {
    console.error("Conference Radar data load failed", error);
    const list = document.getElementById("conferenceList");
    list.setAttribute("aria-busy", "false");
    list.innerHTML = `<div class="cr-empty"><strong>${escapeHtml(t().sourceError)}</strong><p><a href="${DATA_URL}">${escapeHtml(t().openData)}</a></p></div>`;
  }
}

document.addEventListener("DOMContentLoaded", init);
