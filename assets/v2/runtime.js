(function initV2Runtime(global) {
  "use strict";

  const document = global.document;
  if (!document?.documentElement) return;

  document.documentElement.dataset.productSystem = "v2";

  const skipLink = document.querySelector(".skip-link");
  if (skipLink) {
    skipLink.addEventListener("click", () => {
      const main =
        document.getElementById("main-content") ||
        document.querySelector("main");
      if (!main) return;
      if (!main.hasAttribute("tabindex")) main.setAttribute("tabindex", "-1");
      global.requestAnimationFrame(() => main.focus({ preventScroll: true }));
    });
  }

  const onStoredPreference = (event) => {
    if (event.key === "sichen-homepage-theme") {
      const theme = global.HomepagePlatform?.normalizeTheme?.(event.newValue);
      if (theme)
        global.HomepagePlatform?.applyTheme?.(theme, { persist: false });
    }
    if (event.key === "sichen-homepage-locale") {
      const locale = global.HomepageI18n?.normalizeLocale?.(event.newValue);
      if (locale) global.location.reload();
    }
  };

  global.addEventListener("storage", onStoredPreference);
})(window);
