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

