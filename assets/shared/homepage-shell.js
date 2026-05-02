(function initHomepageSharedShell(global) {
  if (global.HomepageSharedShell) {
    return;
  }

  const SWITCHER_CLOSE_DELAY_MS = 760;
  const switcherCloseTimers = new WeakMap();
  let switcherDocumentBound = false;
  let topnavDocumentBound = false;
  let headerControlsPositionBound = false;
  let topnavOverflowBound = false;
  let headerControlsPositionTicking = false;
  let runtime = {
    root: document,
    switchers: null,
    controls: null,
    topnav: null,
  };

  function qsa(selector, root = document) {
    return Array.from(root.querySelectorAll(selector));
  }

  function clearSwitcherCloseTimer(switcher) {
    const timerId = switcherCloseTimers.get(switcher);
    if (timerId) {
      global.clearTimeout(timerId);
      switcherCloseTimers.delete(switcher);
    }
  }

  function suspendTransientOverlays() {
    const body = document.body;
    if (!body) {
      return;
    }
    body.classList.add("transient-overlay-reset");
    global.clearTimeout(body.__transientOverlayResetTimer);
    body.__transientOverlayResetTimer = global.setTimeout(() => {
      body.classList.remove("transient-overlay-reset");
    }, 220);
  }

  function setSwitcherExpandedState(switcher, expanded) {
    if (!switcher) {
      return;
    }
    switcher.classList.toggle("is-open", expanded);
    const trigger = switcher.querySelector("[data-locale-trigger], [data-theme-trigger], [data-portal-trigger]");
    if (trigger) {
      trigger.setAttribute("aria-expanded", expanded ? "true" : "false");
    }
  }

  function scheduleSwitcherClose(switcher) {
    if (!switcher) {
      return;
    }
    clearSwitcherCloseTimer(switcher);
    const timerId = global.setTimeout(() => {
      setSwitcherExpandedState(switcher, false);
      switcherCloseTimers.delete(switcher);
    }, SWITCHER_CLOSE_DELAY_MS);
    switcherCloseTimers.set(switcher, timerId);
  }

  function closeAllSwitchers(root = document) {
    qsa(".control-switcher", root).forEach((switcher) => {
      clearSwitcherCloseTimer(switcher);
      setSwitcherExpandedState(switcher, false);
    });
  }

  function bindSwitcherHoverBehavior(root = document) {
    if (!global.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }

    qsa(".control-switcher", root).forEach((switcher) => {
      if (switcher.dataset.sharedHoverBound === "true") {
        return;
      }
      switcher.dataset.sharedHoverBound = "true";

      switcher.addEventListener("pointerenter", () => {
        clearSwitcherCloseTimer(switcher);
        qsa(".control-switcher", root).forEach((other) => {
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

  function bindSwitcherTrigger(trigger) {
    if (!trigger) {
      return;
    }
    if (trigger.dataset.sharedToggleBound === "true") {
      return;
    }
    trigger.dataset.sharedToggleBound = "true";
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const switcher = trigger.closest(".control-switcher");
      if (!switcher) {
        return;
      }

      const shouldExpand = !switcher.classList.contains("is-open");
      qsa(".control-switcher", runtime.root).forEach((other) => {
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
  }

  function syncSwitchers(config = {}) {
    runtime.root = config.root || document;
    runtime.switchers = config;
    bindSwitcherHoverBehavior(runtime.root);

    qsa("[data-locale-trigger], [data-theme-trigger], [data-portal-trigger]", runtime.root).forEach(bindSwitcherTrigger);

    if (switcherDocumentBound) {
      return;
    }

    switcherDocumentBound = true;
    document.addEventListener("click", (event) => {
      if (!event.target.closest(".control-switcher")) {
        closeAllSwitchers(runtime.root);
      }
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeAllSwitchers(runtime.root);
      }
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
    return controls && global.getComputedStyle(controls).position === "fixed";
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
    const config = runtime.controls || {};
    const root = config.root || document;
    const controls = root.querySelector(config.controlsSelector || ".header-controls");
    const nav = root.querySelector(config.navSelector || ".topnav-shell, .topnav");
    const header = root.querySelector(config.headerSelector || ".site-header");
    if (!controls || !nav || !header) {
      return;
    }

    ensureHeaderControlsAnchor(controls);
    if (!controlsUseViewportPositioning(controls)) {
      clearHeaderControlsOffset(controls, nav);
      return;
    }

    const breakpoint = config.breakpoint || 760;
    const desktopGap = config.desktopGap ?? 12;
    const mobileGap = config.mobileGap ?? 8;
    const navRect = nav.getBoundingClientRect();
    const headerRect = header.getBoundingClientRect();
    const controlsRect = controls.getBoundingClientRect();
    const useMobileLayout = global.matchMedia(`(max-width: ${breakpoint}px)`).matches;
    const gutterGap = useMobileLayout ? mobileGap : desktopGap;
    const referenceLeft = Math.min(headerRect.left, navRect.left);
    const nextTop = Math.round(navRect.top + (navRect.height - controlsRect.height) / 2);
    const nextLeft = Math.round(Math.max(8, referenceLeft - (useMobileLayout ? 0 : controlsRect.width + gutterGap)));
    const reserveNavSpace =
      !useMobileLayout && nextLeft <= 8
        ? Math.ceil(Math.max(0, controlsRect.width + gutterGap + 8 - referenceLeft))
        : 0;

    controls.style.setProperty("--header-controls-top", `${Math.max(8, nextTop)}px`);
    controls.style.setProperty("--header-controls-left", `${nextLeft}px`);
    controls.style.setProperty("--header-controls-shift", "0px");
    if (!useMobileLayout) {
      nav.style.marginLeft = reserveNavSpace ? `${reserveNavSpace}px` : "";
    }
  }

  function reserveMobileControlsSpace(shell) {
    if (!shell) {
      return;
    }
    const config = runtime.topnav || {};
    const breakpoint = config.breakpoint || 760;
    const useMobileLayout = global.matchMedia(`(max-width: ${breakpoint}px)`).matches;
    if (!useMobileLayout) {
      shell.style.marginLeft = "";
      return;
    }

    const controls = (config.root || document).querySelector(config.controlsSelector || ".header-controls");
    if (!controls || !controlsUseViewportPositioning(controls)) {
      shell.style.marginLeft = "";
      return;
    }

    shell.style.marginLeft = "";
    const controlsRect = controls.getBoundingClientRect();
    const shellRect = shell.getBoundingClientRect();
    const gap = config.mobileGap ?? 8;
    const overlap = controlsRect.right + gap - shellRect.left;
    shell.style.marginLeft = overlap > 0 ? `${Math.ceil(overlap)}px` : "";
  }

  function scheduleHeaderControlsPositionUpdate() {
    if (headerControlsPositionTicking) {
      return;
    }
    headerControlsPositionTicking = true;
    global.requestAnimationFrame(() => {
      headerControlsPositionTicking = false;
      updateHeaderControlsPosition();
    });
  }

  function syncHeaderControlsPosition(config = {}) {
    runtime.root = config.root || document;
    runtime.controls = config;
    scheduleHeaderControlsPositionUpdate();

    if (headerControlsPositionBound) {
      return;
    }

    headerControlsPositionBound = true;
    global.addEventListener("resize", scheduleHeaderControlsPositionUpdate);
    global.addEventListener("orientationchange", scheduleHeaderControlsPositionUpdate);
    global.addEventListener("load", scheduleHeaderControlsPositionUpdate);
    if (document.fonts?.ready) {
      document.fonts.ready.then(scheduleHeaderControlsPositionUpdate).catch(() => {});
    }
  }

  function ensureTopnavOverflowShell(nav, config = {}) {
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
    toggle.innerHTML = config.toggleInnerHTML || '<span class="topnav-toggle-label"></span>';

    shell.appendChild(toggle);
    shell.appendChild(nav);

    const hint = document.createElement("div");
    hint.className = "topnav-overflow-hint";
    hint.setAttribute("aria-hidden", "true");
    hint.innerHTML = config.hintInnerHTML || "";
    shell.appendChild(hint);
    return shell;
  }

  function setTopnavMenuExpanded(shell, expanded) {
    if (!shell) {
      return;
    }
    shell.classList.toggle("is-open", expanded);
    const config = runtime.topnav || {};
    const trigger = shell.querySelector("[data-topnav-toggle]");
    if (trigger) {
      trigger.setAttribute("aria-expanded", expanded ? "true" : "false");
      if (config.menuLabel) {
        trigger.setAttribute("title", config.menuLabel);
      }
      const label = trigger.querySelector(".topnav-toggle-label");
      if (label && config.menuLabel) {
        label.textContent = config.menuLabel;
      }
      if (expanded && config.hideMenuLabel) {
        trigger.setAttribute("aria-label", config.hideMenuLabel);
      } else if (!expanded && config.showMenuLabel) {
        trigger.setAttribute("aria-label", config.showMenuLabel);
      }
    }
  }

  function closeTopnavMenus(root = document) {
    qsa(".topnav-shell.is-open", root).forEach((shell) => {
      setTopnavMenuExpanded(shell, false);
    });
  }

  function updateTopnavOverflowState(nav) {
    const config = runtime.topnav || {};
    const shell = ensureTopnavOverflowShell(nav, config);
    if (!shell) {
      return;
    }

    const breakpoint = config.breakpoint || 760;
    const maxScrollLeft = Math.max(0, nav.scrollWidth - nav.clientWidth);
    const overflowing = maxScrollLeft > 12;
    const atStart = nav.scrollLeft <= 8;
    const atEnd = nav.scrollLeft >= maxScrollLeft - 8;
    const useMenu = global.matchMedia(`(max-width: ${breakpoint}px)`).matches;

    shell.classList.toggle("has-overflow", overflowing);
    shell.classList.toggle("is-scrolled", overflowing && !atStart);
    shell.classList.toggle("is-at-end", !overflowing || atEnd);
    shell.classList.toggle("use-menu", useMenu);
    reserveMobileControlsSpace(shell);

    if (!useMenu) {
      setTopnavMenuExpanded(shell, false);
    }
  }

  function blurTransientMenuFocus() {
    const selectors = runtime.topnav?.transientBlurSelector || ".publication-metric-menu, .publication-head-actions, .award-link-actions";
    const active = document.activeElement;
    if (!(active instanceof HTMLElement)) {
      return;
    }
    if (active.closest(selectors)) {
      active.blur();
    }
    suspendTransientOverlays();
  }

  function refreshTopnavOverflowHints() {
    const config = runtime.topnav || {};
    const root = config.root || document;
    qsa(config.navSelector || ".topnav", root).forEach((nav) => {
      updateTopnavOverflowState(nav);
    });
    scheduleHeaderControlsPositionUpdate();
  }

  function syncTopnavMenus(config = {}) {
    runtime.root = config.root || document;
    runtime.topnav = config;

    qsa(config.navSelector || ".topnav", runtime.root).forEach((nav) => {
      const shell = ensureTopnavOverflowShell(nav, config);
      const toggle = shell?.querySelector("[data-topnav-toggle]");
      if (toggle) {
        const expanded = shell.classList.contains("is-open");
        const label = toggle.querySelector(".topnav-toggle-label");
        if (label && config.menuLabel) {
          label.textContent = config.menuLabel;
        }
        if (config.menuLabel) {
          toggle.setAttribute("title", config.menuLabel);
        }
        if (expanded && config.hideMenuLabel) {
          toggle.setAttribute("aria-label", config.hideMenuLabel);
        } else if (!expanded && config.showMenuLabel) {
          toggle.setAttribute("aria-label", config.showMenuLabel);
        }

        if (toggle.dataset.sharedTopnavBound !== "true") {
          toggle.dataset.sharedTopnavBound = "true";
          toggle.addEventListener("click", (event) => {
            event.preventDefault();
            const currentShell = toggle.closest(".topnav-shell");
            const willOpen = !currentShell?.classList.contains("is-open");
            closeTopnavMenus(runtime.root);
            setTopnavMenuExpanded(currentShell, willOpen);
          });
        }
      }

      nav.setAttribute("aria-label", config.navAriaLabel || nav.getAttribute("aria-label") || "Primary navigation");

      if (nav.dataset.sharedTopnavScrollBound !== "true") {
        nav.dataset.sharedTopnavScrollBound = "true";
        nav.addEventListener("scroll", () => updateTopnavOverflowState(nav), { passive: true });
      }
    });

    qsa(".topnav a", runtime.root).forEach((link) => {
      if (link.dataset.sharedTopnavLinkBound === "true") {
        return;
      }
      link.dataset.sharedTopnavLinkBound = "true";
      link.addEventListener("click", () => {
        closeTopnavMenus(runtime.root);
      });
    });

    refreshTopnavOverflowHints();

    if (topnavDocumentBound) {
      return;
    }

    topnavDocumentBound = true;
    document.addEventListener("click", (event) => {
      if (event.target.closest(".topnav-shell")) {
        return;
      }
      closeTopnavMenus(runtime.root);
      suspendTransientOverlays();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeTopnavMenus(runtime.root);
        suspendTransientOverlays();
      }
    });
    global.addEventListener("resize", () => {
      const breakpoint = runtime.topnav?.breakpoint || 760;
      if (global.innerWidth > breakpoint) {
        closeTopnavMenus(runtime.root);
      }
      refreshTopnavOverflowHints();
    }, { passive: true });
    global.addEventListener("load", refreshTopnavOverflowHints, { passive: true });
    global.addEventListener("blur", () => {
      closeAllSwitchers(runtime.root);
      closeTopnavMenus(runtime.root);
      blurTransientMenuFocus();
    });
    global.addEventListener("pageshow", () => {
      closeAllSwitchers(runtime.root);
      closeTopnavMenus(runtime.root);
      blurTransientMenuFocus();
    });
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        closeAllSwitchers(runtime.root);
        closeTopnavMenus(runtime.root);
        blurTransientMenuFocus();
      }
    });
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        refreshTopnavOverflowHints();
        global.setTimeout(refreshTopnavOverflowHints, 120);
      }).catch(() => {});
    } else {
      global.setTimeout(refreshTopnavOverflowHints, 120);
    }
  }

  function sync(config = {}) {
    if (config.switchers) {
      syncSwitchers(config.switchers);
    }
    if (config.controls) {
      syncHeaderControlsPosition(config.controls);
    }
    if (config.topnav) {
      syncTopnavMenus(config.topnav);
    }
  }

  global.HomepageSharedShell = {
    sync,
    closeAllSwitchers,
    refreshTopnavOverflowHints,
    scheduleHeaderControlsPositionUpdate,
  };
})(window);
