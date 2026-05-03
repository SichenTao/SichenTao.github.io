function renderPortalReturnControl() {
  if (!els.headerControls) {
    return;
  }

  if (window.HomepageComponents?.renderPortalSwitcher) {
    window.HomepageComponents.renderPortalSwitcher(els.headerControls, {
      locale: resolveLocaleName(),
      theme: resolveThemeName(),
      currentPath: window.location.pathname,
    });
    bindSwitcherTriggerButtons();
    return;
  }

  const labels = {
    tray: t("portal.tray"),
    portal: { short: t("portal.portal_short"), full: t("portal.portal_full") },
    academic: { short: t("portal.academic_short"), full: t("portal.academic_full") },
    radar: { short: t("portal.radar_short"), full: t("portal.radar_full") },
    jsps: { short: t("portal.jsps_short"), full: t("portal.jsps_full") },
  };

  const currentPath = decodeURIComponent(window.location.pathname);
  const localeName = resolveLocaleName();
  const themeName = resolveThemeName();
  const items = [
    {
      href: "/",
      label: labels.portal.full,
      triggerLabel: labels.portal.short,
      icon: iconSprite("home"),
      active: currentPath === "/",
    },
    {
      href: siteStateHref("/academic/", localeName, themeName),
      label: labels.academic.full,
      triggerLabel: labels.academic.short,
      icon: '<img class="portal-chip-logo" src="/academic/assets/images/avatar-openai.jpg" alt="" loading="lazy" />',
      active: currentPath.startsWith("/academic/"),
      extraClass: "portal-chip--portrait",
    },
    {
      href: academicFrontierHomeHref(localeName),
      label: labels.radar.full,
      triggerLabel: labels.radar.short,
      icon: iconSprite("research"),
      active: currentPath.startsWith("/academic-frontier/"),
    },
    {
      href: siteStateHref("/jsps-kakenhi/", localeName, themeName),
      label: labels.jsps.full,
      triggerLabel: labels.jsps.short,
      icon: '<img class="portal-chip-logo" src="/jsps-kakenhi/favicon.png" alt="" loading="lazy" />',
      active: currentPath.startsWith("/jsps-kakenhi/"),
    },
  ];
  const activeItem = items.find((item) => item.active) || items[0];

  els.headerControls.querySelectorAll(".portal-return-link").forEach((node) => node.remove());

  let switcher = els.headerControls.querySelector(".portal-switcher");
  if (!switcher) {
    switcher = document.createElement("div");
    switcher.className = "portal-switcher control-switcher";
    els.headerControls.insertBefore(switcher, els.headerControls.firstElementChild);
  }

  switcher.innerHTML = `
    <button
      class="portal-trigger ${activeItem.extraClass || ""}"
      type="button"
      data-portal-trigger
      aria-haspopup="true"
      aria-expanded="false"
      aria-label="${escapeHtml(activeItem.label)}"
      title="${escapeHtml(activeItem.label)}"
    >
      ${activeItem.icon}
    </button>
    <div class="portal-tray" role="group" aria-label="${escapeHtml(labels.tray)}">
      ${items.map((item) => `
        <a
          class="portal-chip ${item.extraClass || ""}${item.active ? " is-active" : ""}"
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
  bindSwitcherTriggerButtons();
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
  }, 500);
  switcherCloseTimers.set(switcher, timerId);
}

function bindSwitcherHoverBehavior() {
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    return;
  }

  document.querySelectorAll(".control-switcher").forEach((switcher) => {
    if (switcher.dataset.switcherHoverBound === "true") {
      return;
    }
    switcher.dataset.switcherHoverBound = "true";
    switcherHoverBound = true;

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

function bindSwitcherTriggerButtons() {
  document.querySelectorAll("[data-theme-trigger], [data-locale-trigger], [data-portal-trigger]").forEach((trigger) => {
    if (trigger.dataset.switcherToggleBound === "true") {
      return;
    }
    trigger.dataset.switcherToggleBound = "true";
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      const switcher = trigger.closest(".control-switcher");
      if (!switcher) {
        return;
      }

      const shouldExpand = !switcher.classList.contains("is-open");
      document.querySelectorAll(".control-switcher").forEach((other) => {
        clearSwitcherCloseTimer(other);
        setSwitcherExpandedState(other, false);
      });
      if (shouldExpand) {
        clearSwitcherCloseTimer(switcher);
        setSwitcherExpandedState(switcher, true);
        trigger.focus({ preventScroll: true });
      } else {
        trigger.blur();
      }
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

function controlsUseViewportPositioning(controls) {
  return controls && window.getComputedStyle(controls).position === "fixed";
}

function clearHeaderControlsOffset(controls, nav) {
  controls?.style.removeProperty("--header-controls-top");
  controls?.style.removeProperty("--header-controls-left");
  controls?.style.removeProperty("--header-controls-shift");
  if (nav) {
    nav.style.marginLeft = "";
  }
}

function updateHeaderControlsPosition() {
  const controls = els.headerControls || document.querySelector(".header-controls");
  const nav = document.querySelector(".topnav-shell") || document.querySelector(".topnav");
  const header = document.querySelector(".site-header");
  if (!controls || !nav || !header) {
    return;
  }

  ensureHeaderControlsAnchor(controls);
  if (!controlsUseViewportPositioning(controls)) {
    clearHeaderControlsOffset(controls, nav);
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
  const nextTheme = themeCatalog[themeName] && themeName !== "base" ? themeName : "tohoku";
  if (window.HomepagePlatform?.applyTheme) {
    window.HomepagePlatform.applyTheme(nextTheme, { persist });
  } else {
    document.documentElement.dataset.theme = nextTheme;
  }
  writeSessionValue(THEME_STORAGE_KEY, nextTheme);

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
    trigger.setAttribute("aria-label", translatedThemeTooltip(nextTheme));
    trigger.setAttribute("title", translatedThemeTooltip(nextTheme));
  });

  closeThemeSwitchers();

  if (!persist) {
    return;
  }
}

function applyLocale(localeName, persist = true) {
  const nextLocale = localeCatalog[localeName] ? localeName : "en";
  if (window.HomepageI18n?.applyDocumentLocale) {
    window.HomepageI18n.applyDocumentLocale(nextLocale, { locales: localeCatalog });
  } else {
    document.documentElement.lang = localeCatalog[nextLocale].lang;
  }
  if (persist && window.HomepageI18n?.writeStoredLocale) {
    window.HomepageI18n.writeStoredLocale(nextLocale, { locales: localeCatalog });
  }
  writeSessionValue(LOCALE_STORAGE_KEY, nextLocale);

  els.localeChoices.forEach((button) => {
    const active = button.dataset.localeChoice === nextLocale;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", active ? "true" : "false");
  });

  document.querySelectorAll("[data-locale-current-label]").forEach((node) => {
    node.textContent = localeCatalog[nextLocale].label;
  });

  els.localeTriggers.forEach((trigger) => {
    trigger.setAttribute("aria-label", t("controls.show_languages"));
    trigger.setAttribute("title", t("controls.show_languages"));
  });
  if (scrollTopButton) {
    scrollTopButton.setAttribute("aria-label", t("actions.scroll_top"));
  }

  renderThemeSwitchers();
  els.themeChoices = Array.from(document.querySelectorAll("[data-theme-choice]"));
  els.themeTriggers = Array.from(document.querySelectorAll("[data-theme-trigger]"));
  applyTheme(resolveThemeName(), false);
  bindThemeButtons();
  bindSwitcherHoverBehavior();
  closeLocaleSwitchers();

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
      applyTheme(button.dataset.themeChoice || "tohoku");
    });
  });
}

function initThemeControls() {
  renderThemeSwitchers();
  applyTheme(resolveThemeName(), false);
  bindThemeButtons();
  bindSwitcherHoverBehavior();
  bindSwitcherTriggerButtons();

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

  if (localeUiBound) {
    return;
  }

  localeUiBound = true;
  bindSwitcherHoverBehavior();
  bindSwitcherTriggerButtons();
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
