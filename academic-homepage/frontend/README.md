# Academic Homepage frontend source

The ordered fragments in this directory are the only source of truth for the Academic Homepage JavaScript and CSS bundles.

- `js/manifest.txt` lists every JavaScript fragment in execution order.
- `css/manifest.txt` lists every stylesheet fragment in cascade order.
- `scripts/v2/build-academic-homepage.mjs` validates both manifests and concatenates the fragments byte-for-byte.
- `scripts/prepare-public.mjs` writes the generated bundles to `.generated-public/academic-homepage/app.js` and `.generated-public/academic-homepage/styles.css` before Astro builds `dist`.

The public HTML continues to request `./app.js` and `./styles.css`; those stable URLs are generated artifacts and must not be added back under `academic-homepage/`.

Run the focused contract tests with `pnpm test:unit -- tests/academic-homepage-build.test.mjs`. A manifest fails when it contains an unsafe path, duplicate, wrong extension, missing fragment, or omits a fragment present in its directory. The build also fails if a hand-maintained source monolith is reintroduced.
