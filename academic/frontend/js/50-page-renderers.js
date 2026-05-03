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
    `${data.stats.citations} ${t("labels.cited_short")}`,
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
  const localizedLabel = normalizeString(link?.label) || normalizeString(link?.[`label_${localeName}`]) || normalizeString(link?.label_en);
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
