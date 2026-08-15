import type { AttributeMap, UiState } from "@sichentao/ui/contracts";

export type AsyncPanelState =
  "loading" | "ready" | "empty" | "error" | "stale" | "paywalled";
export type FreshnessState = "fresh" | "stale" | "unknown";
export type EntitlementResolution = "checking" | "granted" | "denied" | "error";
export type EntitlementState =
  "checking" | "anonymous" | "free" | "premium" | "blocked";

export interface AsyncPanelFacts {
  entitlement: EntitlementResolution;
  loading: boolean;
  error: boolean;
  itemCount?: number;
  stale?: boolean;
}

export function resolveAsyncPanelState(
  facts: AsyncPanelFacts,
): AsyncPanelState {
  if (facts.entitlement === "error" || facts.error) return "error";
  if (facts.entitlement === "checking") return "loading";
  if (facts.entitlement === "denied") return "paywalled";
  if (facts.loading) return "loading";
  if ((facts.itemCount ?? 0) === 0) return "empty";
  if (facts.stale) return "stale";
  return "ready";
}

export function asyncPanelAttributes(state: AsyncPanelState): AttributeMap {
  if (state === "loading") {
    return {
      "data-state": state,
      "aria-busy": "true",
      role: "status",
      "aria-live": "polite",
    };
  }
  if (state === "error") {
    return {
      "data-state": state,
      role: "alert",
      "aria-live": "assertive",
      "aria-atomic": "true",
    };
  }
  if (state === "empty" || state === "stale" || state === "paywalled") {
    return {
      "data-state": state,
      role: "status",
      "aria-live": "polite",
      "aria-atomic": "true",
    };
  }
  return { "data-state": state };
}

export function toUiState(state: AsyncPanelState): UiState {
  if (state === "ready") return "idle";
  return state;
}

export interface FreshnessFacts {
  updatedAt?: string | Date | null;
  now?: string | Date;
  maxAgeMs: number;
}

export function resolveFreshness(facts: FreshnessFacts): FreshnessState {
  const updatedAt =
    facts.updatedAt instanceof Date
      ? facts.updatedAt
      : new Date(facts.updatedAt ?? "");
  const now =
    facts.now instanceof Date ? facts.now : new Date(facts.now ?? Date.now());
  if (
    !Number.isFinite(updatedAt.getTime()) ||
    !Number.isFinite(now.getTime()) ||
    !Number.isFinite(facts.maxAgeMs) ||
    facts.maxAgeMs < 0 ||
    updatedAt.getTime() > now.getTime()
  )
    return "unknown";
  return now.getTime() - updatedAt.getTime() > facts.maxAgeMs
    ? "stale"
    : "fresh";
}

export function freshnessAttributes(
  state: FreshnessState,
  timestamp?: string,
): AttributeMap {
  return {
    "data-freshness": state,
    "data-updated-at": timestamp,
    role: state === "stale" ? "status" : undefined,
    "aria-live": state === "stale" ? "polite" : undefined,
  };
}

export interface EntitlementFacts {
  state: EntitlementState;
  required: "free" | "premium";
}

export function hasEntitlement(facts: EntitlementFacts): boolean {
  if (
    facts.state === "checking" ||
    facts.state === "blocked" ||
    facts.state === "anonymous"
  )
    return false;
  if (facts.required === "free")
    return facts.state === "free" || facts.state === "premium";
  return facts.state === "premium";
}

export function entitlementAttributes(facts: EntitlementFacts): AttributeMap {
  const allowed = hasEntitlement(facts);
  return {
    "data-entitlement": facts.state,
    "data-required-entitlement": facts.required,
    "data-access": allowed ? "granted" : "denied",
    "aria-busy": facts.state === "checking" ? "true" : undefined,
  };
}
