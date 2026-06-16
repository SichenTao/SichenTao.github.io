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

