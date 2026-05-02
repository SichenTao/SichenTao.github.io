function renderHomepage(data) {
  renderHero(data);
  renderRecordNav(data);
  renderOverview(data);
  renderHomeShortcuts(data);
  renderModuleNav(data);
}

function renderCurrentPage() {
  applyStaticLocale();

  const page = currentPage();
  if (page === "publications") {
    renderPublicationsPage(state.data);
  } else if (page === "awards") {
    renderAwardsPage(state.data);
  } else if (page === "service") {
    renderServicePage(state.data);
  } else if (page === "projects") {
    renderProjectsPage(state.data);
  } else if (page === "research") {
    renderResearchPage(state.data);
  } else if (page === "profiles") {
    renderProfilesPage(state.data);
  } else if (page === "archive") {
    renderArchivePage(state.data);
  } else if (page === "timeline") {
    renderTimelinePage(state.data);
  } else if (page === "sources") {
    renderSourcesPage(state.data);
  } else {
    renderHomepage(state.data);
  }
}

async function init() {
  initLocaleControls();
  initThemeControls();
  syncHomepageShell();
  initScrollTopButton();
  state.data = await loadData();
  dataReady = true;
  document.body.classList.add("is-ready");
  renderCurrentPage();
  bindEvents();
  bindRevealObserver();
}

init();
