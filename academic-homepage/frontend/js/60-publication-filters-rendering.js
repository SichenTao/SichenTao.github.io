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

