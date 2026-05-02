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

  syncHomepageShell();
}

function syncHomepageShell() {
  renderPortalReturnControl();
  if (!window.HomepageSharedShell) {
    initTopnavMenus();
    initTopnavOverflowHints();
    initHeaderControlsPosition();
    return;
  }

  window.HomepageSharedShell.sync({
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
      controlsSelector: ".header-controls",
      navAriaLabel: t(currentPage() === "home" ? "controls.section_navigation" : "controls.page_navigation"),
      menuLabel: t("controls.menu"),
      showMenuLabel: t("controls.show_menu"),
      hideMenuLabel: t("controls.hide_menu"),
      toggleInnerHTML: `
        <svg class="ui-icon" aria-hidden="true"><use href="./assets/icons/ui-icons.svg#icon-menu"></use></svg>
        <span class="topnav-toggle-label"></span>
      `,
      hintInnerHTML: `<svg class="ui-icon" aria-hidden="true"><use href="./assets/icons/ui-icons.svg#icon-up"></use></svg>`,
      transientBlurSelector: ".publication-metric-menu, .publication-head-actions, .award-link-actions",
      breakpoint: 760,
      mobileGap: 8,
    },
  });
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
  reserveMobileControlsSpace(shell, useMenu);

  if (!useMenu) {
    setTopnavMenuExpanded(shell, false);
  }
}

function reserveMobileControlsSpace(shell, useMenu) {
  if (!shell || !useMenu) {
    if (shell) {
      shell.style.marginLeft = "";
    }
    return;
  }

  const controls = els.headerControls || document.querySelector(".header-controls");
  if (!controls) {
    shell.style.marginLeft = "";
    return;
  }

  shell.style.marginLeft = "";
  const controlsRect = controls.getBoundingClientRect();
  const shellRect = shell.getBoundingClientRect();
  const overlap = controlsRect.right + 8 - shellRect.left;
  shell.style.marginLeft = overlap > 0 ? `${Math.ceil(overlap)}px` : "";
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
