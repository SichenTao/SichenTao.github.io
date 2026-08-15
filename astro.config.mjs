import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://sichentao.github.io",
  output: "static",
  publicDir: ".generated-public",
  outDir: "dist",
  trailingSlash: "always",
  build: {
    assets: "_assets",
    format: "directory",
  },
  vite: {
    server: {
      host: "0.0.0.0",
      allowedHosts: ["localhost", "terminal.local"],
    },
  },
});
