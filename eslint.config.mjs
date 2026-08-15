import eslint from "@eslint/js";
import astro from "eslint-plugin-astro";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: [
      "dist/**",
      ".generated-public/**",
      ".astro/**",
      "node_modules/**",
      "academic/**",
      "academic-homepage/**",
      "academic-frontier/**",
      "follow-builders/**",
      "youtube-to-ebook/**",
      "jsps-kakenhi/**",
      "quant-platform/**",
      "assets/docs/**",
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  {
    files: [
      "scripts/**/*.mjs",
      "tests/**/*.{js,mjs,ts}",
      "supabase/tests/**/*.{js,mjs,ts}",
    ],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    files: ["portal.js", "assets/shared/**/*.js", "assets/v2/**/*.js"],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      "no-empty": ["error", { allowEmptyCatch: true }],
    },
  },
  {
    files: ["src/**/*.{ts,astro}"],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
);
