import type { UiState } from "./contracts";

export interface DisclosureBinding {
  trigger: HTMLButtonElement;
  panel: HTMLElement;
  initialExpanded?: boolean;
  closeOnEscape?: boolean;
  onChange?: (expanded: boolean) => void;
}

export function bindDisclosure(options: DisclosureBinding): () => void {
  const { trigger, panel } = options;
  let expanded =
    options.initialExpanded ?? trigger.getAttribute("aria-expanded") === "true";

  const render = () => {
    trigger.setAttribute("aria-expanded", String(expanded));
    panel.hidden = !expanded;
    options.onChange?.(expanded);
  };
  const toggle = () => {
    expanded = !expanded;
    render();
  };
  const onKeyDown = (event: KeyboardEvent) => {
    if (options.closeOnEscape !== false && event.key === "Escape" && expanded) {
      expanded = false;
      render();
      trigger.focus();
    }
  };

  trigger.addEventListener("click", toggle);
  panel.addEventListener("keydown", onKeyDown);
  render();

  return () => {
    trigger.removeEventListener("click", toggle);
    panel.removeEventListener("keydown", onKeyDown);
  };
}

export function setPressed(button: HTMLButtonElement, pressed: boolean): void {
  button.setAttribute("aria-pressed", String(pressed));
  button.dataset.selected = String(pressed);
}

export function setUiState(element: HTMLElement, state: UiState): void {
  element.dataset.state = state;
  if (state === "loading") {
    element.setAttribute("aria-busy", "true");
  } else {
    element.removeAttribute("aria-busy");
  }
  if (state === "error") {
    element.setAttribute("role", "alert");
    element.setAttribute("aria-live", "assertive");
  } else if (state !== "idle") {
    element.setAttribute("role", "status");
    element.setAttribute("aria-live", "polite");
  } else {
    element.removeAttribute("role");
    element.removeAttribute("aria-live");
  }
}

export function announce(
  region: HTMLElement,
  message: string,
  priority: "polite" | "assertive" = "polite",
): void {
  region.setAttribute("role", priority === "assertive" ? "alert" : "status");
  region.setAttribute("aria-live", priority);
  region.setAttribute("aria-atomic", "true");
  region.textContent = message;
}
