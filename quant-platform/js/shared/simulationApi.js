import { apiGetJson, apiPostJson, isBackendUnavailableError } from "./api.js";
import { buildStaticBacktest, buildStaticTradingCalendar, staticStrategyPayload } from "./staticSimulation.js";

export async function loadStrategies() {
  try {
    return await apiGetJson("/api/strategies");
  } catch (error) {
    if (isBackendUnavailableError(error)) return staticStrategyPayload();
    throw error;
  }
}

export async function loadTradingCalendar() {
  try {
    return await apiGetJson("/api/trading_calendar");
  } catch (error) {
    if (isBackendUnavailableError(error)) return buildStaticTradingCalendar();
    throw error;
  }
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
  try {
    return await apiGetJson(`/api/backtest/run?${params.toString()}`);
  } catch (error) {
    if (isBackendUnavailableError(error)) return buildStaticBacktest({ strategy, tradingPolicy, start, end, initialCash, frequency });
    throw error;
  }
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
  try {
    return await apiGetJson(`/api/intraday/strategy-simulation?${params.toString()}`);
  } catch (error) {
    if (isBackendUnavailableError(error)) return buildStaticBacktest({ strategy, tradingPolicy, start, end, initialCash, frequency });
    throw error;
  }
}

export async function createManualSession({ strategy, tradingPolicy = "", start, end, initialCash, frequency = "1d" }) {
  return apiPostJson("/api/simulation/session/create", {
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
  return apiGetJson(`/api/simulation/session/state?${params.toString()}`);
}

export async function loadManualReview({ sessionId, accountId }) {
  const params = new URLSearchParams({ session_id: sessionId });
  if (accountId) params.set("account", accountId);
  return apiGetJson(`/api/simulation/session/review?${params.toString()}`);
}

export async function stepManualSession({ sessionId, action, note = "", details = {} }) {
  return apiPostJson("/api/simulation/session/step", {
    session_id: sessionId,
    action,
    note,
    details,
  });
}
