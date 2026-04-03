(function initHomepageSharedShell(global) {
  if (global.HomepageSharedShell) {
    return;
  }

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

  function setSwitcherExpandedState(switcher, expanded) {
    if (!switcher) {
      return;
    }
    switcher.classList.toggle("is-open", expanded);
    const trigger = switcher.querySelector("[data-locale-trigger], [data-theme-trigger]");
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
    }, 140);
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

  function bindCycleTrigger(trigger, handler) {
    if (!trigger || typeof handler !== "function") {
      return;
    }
    if (trigger.dataset.sharedCycleBound === "true") {
      return;
    }
    trigger.dataset.sharedCycleBound = "true";
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      closeAllSwitchers(runtime.root);
      handler();
    });
  }

  function syncSwitchers(config = {}) {
    runtime.root = config.root || document;
    runtime.switchers = config;
    bindSwitcherHoverBehavior(runtime.root);

    qsa("[data-locale-trigger]", runtime.root).forEach((trigger) => {
      if (config.localeCycleLabel) {
        trigger.setAttribute("aria-label", config.localeCycleLabel);
        trigger.setAttribute("title", config.localeCycleLabel);
      }
      bindCycleTrigger(trigger, config.onCycleLocale);
    });

    qsa("[data-theme-trigger]", runtime.root).forEach((trigger) => {
      if (config.themeCycleLabel) {
        trigger.setAttribute("aria-label", config.themeCycleLabel);
        trigger.setAttribute("title", config.themeCycleLabel);
      }
      bindCycleTrigger(trigger, config.onCycleTheme);
    });

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

    const breakpoint = config.breakpoint || 760;
    const desktopGap = config.desktopGap ?? 12;
    const mobileGap = config.mobileGap ?? 8;
    const navRect = nav.getBoundingClientRect();
    const headerRect = header.getBoundingClientRect();
    const controlsRect = controls.getBoundingClientRect();
    const gutterGap = global.matchMedia(`(max-width: ${breakpoint}px)`).matches ? mobileGap : desktopGap;
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
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeTopnavMenus(runtime.root);
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
    global.addEventListener("blur", blurTransientMenuFocus);
    global.addEventListener("pageshow", blurTransientMenuFocus);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
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
