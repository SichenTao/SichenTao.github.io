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
  const resolvedIcon = resolveProfileMarkIcon(item, icon);
  if (icon) {
    const badgeClass = resolvedIcon.includes("-badge.svg") ? " profile-mark-badge" : "";
    return `
      <span class="profile-mark profile-mark-image${badgeClass} profile-mark-${escapeHtml(meta.tone)}" aria-hidden="true">
        <img src="${escapeHtml(resolvedIcon)}" alt="" loading="lazy" />
      </span>
    `;
  }
  return `<span class="profile-mark profile-mark-${escapeHtml(meta.tone)}" aria-hidden="true">${escapeHtml(meta.label)}</span>`;
}

function profileUsesEmbeddedWordmark(item = {}) {
  const title = normalizeString(item?.title);
  return title === "J-GLOBAL" || title === "ResearchMap";
}

function profileTitleMarkup(item = {}) {
  const title = lt(item.title);

  if (profileUsesEmbeddedWordmark(item)) {
    return "";
  }

  if (title === "Google Scholar") {
    return `
      <h4 class="link-card-title link-card-title-google-scholar">
        <span class="google-wordmark" aria-label="Google">
          <span class="google-blue">G</span><span class="google-red">o</span><span class="google-yellow">o</span><span class="google-blue">g</span><span class="google-green">l</span><span class="google-red">e</span>
        </span>
        <span class="google-scholar-suffix">Scholar</span>
      </h4>
    `;
  }

  return `<h4 class="link-card-title">${escapeHtml(title)}</h4>`;
}

function resolveProfileMarkIcon(item = {}, icon = "") {
  const normalizedIcon = normalizeString(icon);
  const title = normalizeString(item?.title);
  const url = normalizeString(item?.url).toLowerCase();

  if (
    normalizedIcon.endsWith("tohoku-cyberscience-center.svg")
    || title === "Tohoku University Cyberscience Center"
    || url.includes("cc.tohoku.ac.jp")
  ) {
    return "./assets/profile-icons/tohoku-cyberscience-center-badge.svg?v=20260407-161500";
  }

  return normalizedIcon;
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
  if (window.HomepagePlatform?.themeTooltip) {
    return window.HomepagePlatform.themeTooltip(themeName, resolveLocaleName());
  }
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
  return [];
}

function homeBioEmphasisPhrases() {
  const localeName = resolveLocaleName();
  if (localeName === "ja") {
    return ["人工知能", "高性能計算"];
  }
  if (localeName === "zh") {
    return ["人工智能", "高性能计算"];
  }
  return ["artificial intelligence", "high-performance computing"];
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
