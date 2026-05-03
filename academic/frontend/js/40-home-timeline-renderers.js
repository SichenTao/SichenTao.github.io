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
        url: localizedExternalUrl(profile.localized_urls?.[resolveLocaleName()] || profile.url, target.title),
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
      meta: `${data.stats.citations} ${t("labels.cited_short")} · h-index ${data.stats.h_index}`,
      href: "./publications.html",
    },
    {
      icon: "awards",
      tone: "gold",
      label: t("nav.awards"),
      value: `${data.awards.length}`,
      unit: unitWord("items"),
      meta: t("labels.award_summary"),
      href: "./awards.html",
    },
    {
      icon: "projects",
      tone: "teal",
      label: t("nav.projects"),
      value: `${(data.featured_projects || []).length}`,
      unit: unitWord("repos"),
      meta: "",
      href: "./projects.html",
    },
    {
      icon: "service",
      tone: "clay",
      label: t("nav.service"),
      value: `${data.service.length}`,
      unit: unitWord("venues"),
      meta: t("labels.service_summary"),
      href: "./service.html",
    },
  ];

  els.recordNav.innerHTML = cards
    .map(
      (card) => `
        <a class="record-card" href="${escapeHtml(card.href)}">
          <span class="record-icon">${iconBadge(card.icon, card.tone)}</span>
          <span class="record-primary-line">
            <span class="stack-label">${escapeHtml(card.label)}</span>
            <span class="record-count"><span class="record-value">${escapeHtml(card.value)}</span><span class="record-unit">${escapeHtml(card.unit)}</span></span>
          </span>
          ${card.meta ? `<span class="record-meta">${escapeHtml(card.meta)}</span>` : ""}
        </a>
      `,
    )
    .join("");
}

function renderModuleNav(data) {
  if (!els.moduleNav) {
    return;
  }

  const timelineCategories = [...new Set(data.timeline.map((item) => item.category).filter(Boolean))];

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
          (item) => {
            const meta = profileMarkMeta(item);
            const href = localizedExternalUrl(item.localized_urls?.[resolveLocaleName()] || item.url, item.title);
            const wordmarkOnlyClass = profileUsesEmbeddedWordmark(item) ? " profile-link-card-wordmark" : "";
            return `
            <a class="link-card profile-link-card link-card-tone-${escapeHtml(meta.tone)}${wordmarkOnlyClass}" href="${escapeHtml(href)}" target="_blank" rel="noreferrer" aria-label="${escapeHtml(lt(item.title))}">
              <div class="link-card-inline">
                ${profileMarkMarkup(item)}
                ${profileTitleMarkup(item)}
              </div>
            </a>
          `;
          },
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
          `隶属于<strong>超级计算系统研究部门与泷泽研究室</strong>。`,
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
