export const existingAssets = {
  iconSprite: "/academic-homepage/assets/icons/ui-icons.svg",
  portrait: "/academic-homepage/assets/images/avatar-openai.jpg",
  faviconPortrait: "/academic-homepage/assets/images/favicon-portrait.png",
  institutions: {
    tohoku: "/academic-homepage/assets/institutions/tohoku-logo.svg",
    toyama: "/academic-homepage/assets/institutions/toyama-symbol.svg",
    usst: "/academic-homepage/assets/institutions/usst-logo.svg",
  },
  workspaceMarks: {
    frontier: "/academic-frontier/favicon.svg",
    followBuilders: "/follow-builders/favicon.svg",
    jsps: "/jsps-kakenhi/favicon.svg",
  },
} as const;

export const iconNames = [
  "academic",
  "archive",
  "awards",
  "code",
  "contact",
  "copy",
  "editorial",
  "education",
  "fellowship",
  "file",
  "filter",
  "home",
  "identity",
  "keyword",
  "menu",
  "official",
  "position",
  "profiles",
  "projects",
  "publications",
  "registry",
  "research",
  "reset",
  "service",
  "sources",
  "teaching",
  "timeline",
  "up",
  "visit",
] as const;

export type IconName = (typeof iconNames)[number];

export function iconHref(name: IconName): string {
  return `${existingAssets.iconSprite}#icon-${name}`;
}
