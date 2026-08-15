import { describe, expect, it } from "vitest";

import {
  asyncPanelAttributes,
  entitlementAttributes,
  hasEntitlement,
  resolveAsyncPanelState,
  resolveFreshness,
} from "./index";

describe("product state contracts", () => {
  it("does not reveal content while entitlement is unresolved or denied", () => {
    expect(
      resolveAsyncPanelState({
        entitlement: "checking",
        loading: false,
        error: false,
        itemCount: 4,
      }),
    ).toBe("loading");
    expect(
      resolveAsyncPanelState({
        entitlement: "denied",
        loading: false,
        error: false,
        itemCount: 4,
      }),
    ).toBe("paywalled");
  });

  it("resolves data states in a stable priority", () => {
    expect(
      resolveAsyncPanelState({
        entitlement: "granted",
        loading: false,
        error: true,
        itemCount: 4,
      }),
    ).toBe("error");
    expect(
      resolveAsyncPanelState({
        entitlement: "granted",
        loading: false,
        error: false,
        itemCount: 0,
      }),
    ).toBe("empty");
    expect(
      resolveAsyncPanelState({
        entitlement: "granted",
        loading: false,
        error: false,
        itemCount: 4,
        stale: true,
      }),
    ).toBe("stale");
  });

  it("marks errors assertive and loading busy", () => {
    expect(asyncPanelAttributes("error")).toMatchObject({
      role: "alert",
      "aria-live": "assertive",
    });
    expect(asyncPanelAttributes("loading")).toMatchObject({
      role: "status",
      "aria-busy": "true",
    });
  });

  it("classifies fresh, stale, invalid, and future timestamps", () => {
    const now = "2026-08-15T00:00:00.000Z";
    const day = 24 * 60 * 60 * 1000;
    expect(
      resolveFreshness({
        updatedAt: "2026-08-14T12:00:00.000Z",
        now,
        maxAgeMs: day,
      }),
    ).toBe("fresh");
    expect(
      resolveFreshness({
        updatedAt: "2026-08-13T00:00:00.000Z",
        now,
        maxAgeMs: day,
      }),
    ).toBe("stale");
    expect(resolveFreshness({ updatedAt: "invalid", now, maxAgeMs: day })).toBe(
      "unknown",
    );
    expect(
      resolveFreshness({
        updatedAt: "2026-08-16T00:00:00.000Z",
        now,
        maxAgeMs: day,
      }),
    ).toBe("unknown");
  });

  it("keeps premium authorization explicit", () => {
    expect(hasEntitlement({ state: "premium", required: "premium" })).toBe(
      true,
    );
    expect(hasEntitlement({ state: "free", required: "premium" })).toBe(false);
    expect(
      entitlementAttributes({ state: "checking", required: "premium" }),
    ).toMatchObject({ "data-access": "denied", "aria-busy": "true" });
  });
});
