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
  return window.HomepageI18n?.readStoredLocale?.({ locales: localeCatalog, fallback: "en" }) || "en";
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
  if (window.HomepageI18n?.text) {
    return window.HomepageI18n.text(translations, key, { locale: localeName, values });
  }
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
      return "泷泽研究室";
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
    normalizeString(verification.verification_note)
    || verification[`verification_note_${localeName}`]
    || verification.verification_note_en
    || ""
  );
}

function publicationPrimaryUrl(item) {
  return item.publisher_url || item.url || (item.doi ? `https://doi.org/${item.doi}` : "");
}
