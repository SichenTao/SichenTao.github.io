import { apiGetJson, apiPostJson } from "./api.js";

export const DEFAULT_ACCOUNT_ID = "paper_default";
export const DEFAULT_ACCOUNT_MODE = "paper";
export const DEFAULT_INITIAL_CASH = 100000;

export function accountIdForMode(mode) {
  if (mode === "manual") return "manual_default";
  if (mode === "live") return "live_default";
  return DEFAULT_ACCOUNT_ID;
}

export async function loadAccountState({ accountId = DEFAULT_ACCOUNT_ID, mode = DEFAULT_ACCOUNT_MODE, initialCash = DEFAULT_INITIAL_CASH } = {}) {
  const params = new URLSearchParams({ account: accountId, mode, initial_cash: String(initialCash) });
  return apiGetJson(`/api/account/state?${params.toString()}`);
}

export async function submitAccountOrder({
  accountId = DEFAULT_ACCOUNT_ID,
  mode = DEFAULT_ACCOUNT_MODE,
  strategy = "",
  symbol,
  name = "",
  side,
  price,
  quantity,
  orderType = "limit",
  asOf = "",
  initialCash = DEFAULT_INITIAL_CASH,
}) {
  return apiPostJson("/api/account/order", {
    account: accountId,
    mode,
    strategy,
    symbol,
    name,
    side,
    price,
    quantity,
    order_type: orderType,
    as_of: asOf,
    initial_cash: initialCash,
  });
}

export async function preflightAccountOrder({
  accountId = DEFAULT_ACCOUNT_ID,
  mode = DEFAULT_ACCOUNT_MODE,
  strategy = "",
  symbol,
  name = "",
  side,
  price,
  quantity,
  orderType = "limit",
  asOf = "",
  initialCash = DEFAULT_INITIAL_CASH,
}) {
  return apiPostJson("/api/account/order/preflight", {
    account: accountId,
    mode,
    strategy,
    symbol,
    name,
    side,
    price,
    quantity,
    order_type: orderType,
    as_of: asOf,
    initial_cash: initialCash,
  });
}

export async function resetAccountState({ accountId = DEFAULT_ACCOUNT_ID, mode = DEFAULT_ACCOUNT_MODE, initialCash = DEFAULT_INITIAL_CASH } = {}) {
  return apiPostJson("/api/account/reset", {
    account: accountId,
    mode,
    initial_cash: initialCash,
  });
}
