export type UiState =
  "idle" | "loading" | "empty" | "error" | "stale" | "paywalled" | "success";
export type ButtonTone = "primary" | "secondary" | "ghost" | "danger";
export type ControlSize = "sm" | "md" | "lg";
export type AttributeValue = string | boolean | undefined;
export type AttributeMap = Readonly<Record<string, AttributeValue>>;

export function classNames(
  ...values: Array<string | false | null | undefined>
): string {
  return [
    ...new Set(
      values
        .filter((value): value is string => Boolean(value))
        .flatMap((value) => value.split(/\s+/))
        .filter(Boolean),
    ),
  ].join(" ");
}

export function stateClass(state: UiState): string {
  return `st-state st-state--${state}`;
}

export function stateAttributes(state: UiState, label?: string): AttributeMap {
  const base: Record<string, AttributeValue> = {
    "data-state": state,
    "aria-label": label,
  };

  if (state === "loading") {
    return {
      ...base,
      role: "status",
      "aria-live": "polite",
      "aria-busy": "true",
    };
  }
  if (state === "error") {
    return {
      ...base,
      role: "alert",
      "aria-live": "assertive",
      "aria-atomic": "true",
    };
  }
  if (
    state === "empty" ||
    state === "stale" ||
    state === "paywalled" ||
    state === "success"
  ) {
    return {
      ...base,
      role: "status",
      "aria-live": "polite",
      "aria-atomic": "true",
    };
  }
  return base;
}

export interface ButtonContract {
  type?: "button" | "submit" | "reset";
  tone?: ButtonTone;
  size?: ControlSize;
  busy?: boolean;
  disabled?: boolean;
  className?: string;
}

export function buttonContract(options: ButtonContract = {}): {
  className: string;
  attributes: AttributeMap;
} {
  const tone = options.tone ?? "secondary";
  const size = options.size ?? "md";
  const unavailable = Boolean(options.disabled || options.busy);
  return {
    className: classNames(
      "st-button",
      `st-button--${tone}`,
      `st-control--${size}`,
      options.className,
    ),
    attributes: {
      type: options.type ?? "button",
      disabled: unavailable || undefined,
      "aria-disabled": unavailable ? "true" : undefined,
      "aria-busy": options.busy ? "true" : undefined,
      "data-pending": options.busy ? "true" : undefined,
    },
  };
}

export interface IconButtonContract extends ButtonContract {
  label: string;
  pressed?: boolean;
  expanded?: boolean;
  controls?: string;
}

export function iconButtonContract(options: IconButtonContract): {
  className: string;
  attributes: AttributeMap;
} {
  const button = buttonContract(options);
  return {
    className: classNames(button.className, "st-icon-button"),
    attributes: {
      ...button.attributes,
      "aria-label": options.label,
      "aria-pressed":
        options.pressed === undefined ? undefined : String(options.pressed),
      "aria-expanded":
        options.expanded === undefined ? undefined : String(options.expanded),
      "aria-controls": options.controls,
    },
  };
}

export interface FieldContract {
  id: string;
  describedBy?: string[];
  invalid?: boolean;
  required?: boolean;
  disabled?: boolean;
}

export function fieldContract(options: FieldContract): AttributeMap {
  return {
    id: options.id,
    "aria-describedby":
      options.describedBy?.filter(Boolean).join(" ") || undefined,
    "aria-invalid": options.invalid ? "true" : undefined,
    "aria-required": options.required ? "true" : undefined,
    required: options.required || undefined,
    disabled: options.disabled || undefined,
  };
}

export interface DisclosureContract {
  triggerId: string;
  panelId: string;
  expanded: boolean;
}

export function disclosureContract(options: DisclosureContract): {
  trigger: AttributeMap;
  panel: AttributeMap;
} {
  return {
    trigger: {
      id: options.triggerId,
      type: "button",
      "aria-controls": options.panelId,
      "aria-expanded": String(options.expanded),
    },
    panel: {
      id: options.panelId,
      "aria-labelledby": options.triggerId,
      hidden: options.expanded ? undefined : true,
    },
  };
}
