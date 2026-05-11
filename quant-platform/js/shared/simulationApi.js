export async function loadStrategies() {
  return apiGet("/api/strategies");
}

export async function loadTradingCalendar() {
  return apiGet("/api/trading_calendar");
}

export async function runBacktest({ strategy, tradingPolicy = "", start, end, initialCash, frequency = "1d" }) {
  const params = new URLSearchParams({
    strategy,
    start,
    end,
    initial_cash: String(initialCash),
    frequency,
  });
  if (tradingPolicy) params.set("trading_policy", tradingPolicy);
  return apiGet(`/api/backtest/run?${params.toString()}`);
}

export async function runIntradayStrategySimulation({ strategy, tradingPolicy = "", start, end, initialCash, frequency = "5m" }) {
  const params = new URLSearchParams({
    strategy,
    start,
    end,
    initial_cash: String(initialCash),
    frequency,
  });
  if (tradingPolicy) params.set("trading_policy", tradingPolicy);
  return apiGet(`/api/intraday/strategy-simulation?${params.toString()}`);
}

export async function createManualSession({ strategy, tradingPolicy = "", start, end, initialCash, frequency = "1d" }) {
  return apiPost("/api/simulation/session/create", {
    strategy,
    trading_policy: tradingPolicy,
    start,
    end,
    initial_cash: initialCash,
    frequency,
  });
}

export async function loadManualSession(sessionId) {
  const params = new URLSearchParams({ session_id: sessionId });
  return apiGet(`/api/simulation/session/state?${params.toString()}`);
}

export async function loadManualReview({ sessionId, accountId }) {
  const params = new URLSearchParams({ session_id: sessionId });
  if (accountId) params.set("account", accountId);
  return apiGet(`/api/simulation/session/review?${params.toString()}`);
}

export async function stepManualSession({ sessionId, action, note = "", details = {} }) {
  return apiPost("/api/simulation/session/step", {
    session_id: sessionId,
    action,
    note,
    details,
  });
}

async function apiGet(path) {
  const response = await fetch(path);
  return parseResponse(response);
}

async function apiPost(path, payload) {
  const response = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseResponse(response);
}

async function parseResponse(response) {
  const payload = await response.json();
  if (!response.ok) throw new Error(payload.error || `request failed: ${response.status}`);
  return payload;
}
