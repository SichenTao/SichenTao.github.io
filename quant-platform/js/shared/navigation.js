export function setupGlobalNavigation({
  mode = "paper",
  strategy = "",
  symbol = "",
  account = "",
  period = "",
  frequency = "",
  start = "",
  end = "",
  initialCash = "",
  tradingPolicy = "",
} = {}) {
  const envMode = environmentMode(mode);
  const baseParams = new URLSearchParams();
  if (strategy) baseParams.set("strategy", strategy);
  if (symbol) baseParams.set("symbol", symbol);
  if (account) baseParams.set("account", account);
  baseParams.set("mode", mode || "paper");

  document.body.classList.toggle("env-live", envMode === "live");
  document.body.classList.toggle("env-paper", envMode !== "live");

  document.querySelectorAll("#environment-mode-select").forEach((select) => {
    select.value = envMode;
    select.onchange = () => {
      const nextMode = select.value === "live" ? "live" : "paper";
      const params = new URLSearchParams(baseParams);
      params.set("mode", nextMode);
      window.location.href = `${currentPageName()}?${params.toString()}`;
    };
  });

  document.querySelectorAll(".nav-tabs a[href]").forEach((link) => {
    const target = link.getAttribute("href").split("?")[0].replace("./", "");
    const params = new URLSearchParams(baseParams);
    if (target === "backtest_workbench.html") {
      if (frequency) params.set("frequency", frequency);
      if (start) params.set("start", start);
      if (end) params.set("end", end);
      if (initialCash) params.set("initial_cash", initialCash);
      if (tradingPolicy) params.set("trading_policy", tradingPolicy);
    }
    if (target === "trading_terminal.html" && period) {
      params.set("period", period);
    }
    link.href = `./${target}?${params.toString()}`;
  });
}

export function environmentMode(mode) {
  return mode === "live" ? "live" : "paper";
}

function currentPageName() {
  const name = window.location.pathname.split("/").pop() || "stock_selection.html";
  return name === "index.html" ? "stock_selection.html" : name;
}
