export const products = [
  {
    id: "academic",
    href: "/academic-homepage/",
    access: "public",
    family: "identity",
  },
  {
    id: "frontier",
    href: "/academic-frontier/",
    access: "public",
    family: "knowledge",
  },
  {
    id: "follow-builders",
    href: "/follow-builders/",
    access: "public",
    family: "knowledge",
  },
  {
    id: "youtube-learner",
    href: "/youtube-to-ebook/",
    access: "public-preview",
    family: "learning",
  },
  {
    id: "jsps-kakenhi",
    href: "/jsps-kakenhi/",
    access: "public",
    family: "knowledge",
  },
  {
    id: "account",
    href: "/account/",
    access: "authenticated",
    family: "platform",
  },
] as const;

export type ProductId = (typeof products)[number]["id"];
