export const themeNames = ["tohoku", "toyama", "usst"] as const;

export type ThemeName = (typeof themeNames)[number];

export const defaultTheme: ThemeName = "tohoku";
export const themeStorageKey = "sichen-homepage-theme";

export const themes = {
  tohoku: {
    label: { en: "Tohoku University", zh: "东北大学", ja: "東北大学" },
    metaColor: "#f5f5f7",
    ink: "#111111",
    inkSoft: "#2d2741",
    muted: "#514c63",
    accent: "#3e1485",
    accentSoft: "#e5daf6",
    secondary: "#000000",
    secondarySoft: "#efefef",
    tertiary: "#766d6c",
    tertiarySoft: "#ece8e7",
  },
  toyama: {
    label: { en: "University of Toyama", zh: "富山大学", ja: "富山大学" },
    metaColor: "#f5f5f7",
    ink: "#15212a",
    inkSoft: "#39505e",
    muted: "#5d7482",
    accent: "#466d7f",
    accentSoft: "#ddeaef",
    secondary: "#244e63",
    secondarySoft: "#dfe9ee",
    tertiary: "#7d98a5",
    tertiarySoft: "#eaf1f4",
  },
  usst: {
    label: {
      en: "University of Shanghai for Science and Technology",
      zh: "上海理工大学",
      ja: "上海理工大学",
    },
    metaColor: "#f5f5f7",
    ink: "#21191a",
    inkSoft: "#5c3b42",
    muted: "#7b5961",
    accent: "#b51c2f",
    accentSoft: "#f3dadd",
    secondary: "#0f429b",
    secondarySoft: "#e1e8f8",
    tertiary: "#8d5f69",
    tertiarySoft: "#efe4e6",
  },
} as const satisfies Record<ThemeName, object>;

export const breakpoints = {
  compact: 380,
  mobile: 760,
  tablet: 820,
  desktop: 1160,
  wide: 1440,
  ultraWide: 1760,
} as const;

export const shellWidths = {
  readable: 1180,
  wide: 1440,
  workbench: 1600,
  portal: 1480,
} as const;

export function isThemeName(value: unknown): value is ThemeName {
  return (
    typeof value === "string" &&
    (themeNames as readonly string[]).includes(value)
  );
}

export function normalizeTheme(value: unknown): ThemeName {
  if (value === "base" || value === "default") return defaultTheme;
  return isThemeName(value) ? value : defaultTheme;
}

export function themeLabel(
  theme: unknown,
  locale: "en" | "zh" | "ja" = "en",
): string {
  const normalized = normalizeTheme(theme);
  return themes[normalized].label[locale] ?? themes[normalized].label.en;
}
