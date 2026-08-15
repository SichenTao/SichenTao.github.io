import { describe, expect, it } from "vitest";

import {
  buttonContract,
  disclosureContract,
  fieldContract,
  iconButtonContract,
  stateAttributes,
} from "./contracts";

describe("UI accessibility contracts", () => {
  it("makes a busy button unavailable and machine-readable", () => {
    const button = buttonContract({ tone: "primary", size: "lg", busy: true });
    expect(button.className).toContain("st-button--primary");
    expect(button.attributes).toMatchObject({
      disabled: true,
      "aria-disabled": "true",
      "aria-busy": "true",
      "data-pending": "true",
    });
  });

  it("requires an accessible name for an icon button", () => {
    const button = iconButtonContract({
      label: "Open navigation",
      controls: "site-menu",
      expanded: false,
    });
    expect(button.attributes).toMatchObject({
      "aria-label": "Open navigation",
      "aria-controls": "site-menu",
      "aria-expanded": "false",
    });
  });

  it("connects a field to all help and error descriptions", () => {
    expect(
      fieldContract({
        id: "query",
        describedBy: ["query-help", "query-error"],
        invalid: true,
        required: true,
      }),
    ).toMatchObject({
      id: "query",
      "aria-describedby": "query-help query-error",
      "aria-invalid": "true",
      required: true,
    });
  });

  it("connects disclosure trigger and panel in both states", () => {
    const closed = disclosureContract({
      triggerId: "theme-trigger",
      panelId: "theme-panel",
      expanded: false,
    });
    expect(closed.trigger["aria-controls"]).toBe("theme-panel");
    expect(closed.panel).toMatchObject({
      "aria-labelledby": "theme-trigger",
      hidden: true,
    });
  });

  it("uses assertive announcements only for errors", () => {
    expect(stateAttributes("error")).toMatchObject({
      role: "alert",
      "aria-live": "assertive",
    });
    expect(stateAttributes("stale")).toMatchObject({
      role: "status",
      "aria-live": "polite",
    });
  });
});
