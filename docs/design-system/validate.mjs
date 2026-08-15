/* global console, process */

import { readFile, access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDirectory, "../..");
const failures = [];

const relative = (file) => path.relative(root, file);
const fail = (message) => failures.push(message);
const read = async (file) => readFile(path.join(root, file), "utf8");
const blockAfter = (source, marker) => {
  const markerIndex = source.indexOf(marker);
  if (markerIndex < 0) return "";
  const openIndex = source.indexOf("{", markerIndex);
  const closeIndex = source.indexOf("\n}", openIndex);
  return openIndex >= 0 && closeIndex >= 0
    ? source.slice(openIndex + 1, closeIndex)
    : "";
};
const customHex = (block, token) =>
  block.match(new RegExp(`${token}:\\s*(#[0-9a-f]{6})`, "i"))?.[1];
const luminance = (hex) => {
  const channels = hex
    .slice(1)
    .match(/../g)
    .map((value) => Number.parseInt(value, 16) / 255)
    .map((value) =>
      value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4,
    );
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
};
const contrast = (first, second) => {
  const values = [luminance(first), luminance(second)].sort((a, b) => b - a);
  return (values[0] + 0.05) / (values[1] + 0.05);
};
const exists = async (file) => {
  try {
    await access(path.join(root, file));
    return true;
  } catch {
    return false;
  }
};

const tokenFile = "packages/design-tokens/src/tokens.css";
const tokenTsFile = "packages/design-tokens/src/index.ts";
const uiCssFile = "packages/ui/src/styles.css";
const uiContractFile = "packages/ui/src/contracts.ts";
const uiAssetFile = "packages/ui/src/assets.ts";
const patternCssFile = "packages/product-patterns/src/styles.css";
const patternTsFile = "packages/product-patterns/src/index.ts";

const [tokenCss, tokenTs, uiCss, uiContracts, uiAssets, patternCss, patternTs] =
  await Promise.all([
    read(tokenFile),
    read(tokenTsFile),
    read(uiCssFile),
    read(uiContractFile),
    read(uiAssetFile),
    read(patternCssFile),
    read(patternTsFile),
  ]);

const definitions = new Set(
  [...tokenCss.matchAll(/(--st-[a-z0-9-]+)\s*:/g)].map((match) => match[1]),
);
const references = new Set(
  [...`${uiCss}\n${patternCss}`.matchAll(/var\((--st-[a-z0-9-]+)/g)].map(
    (match) => match[1],
  ),
);
for (const reference of references) {
  if (!definitions.has(reference)) fail(`Undefined design token ${reference}`);
}

const requiredTokens = [
  "--st-color-canvas",
  "--st-color-ink",
  "--st-color-accent",
  "--st-font-ui",
  "--st-font-display",
  "--st-space-4",
  "--st-radius-lg",
  "--st-shadow-card",
  "--st-motion-standard",
  "--st-shell-readable",
];
for (const token of requiredTokens) {
  if (!definitions.has(token)) fail(`Required token ${token} is missing`);
}

for (const theme of ["tohoku", "toyama", "usst"]) {
  if (!tokenCss.includes(`data-theme="${theme}"`))
    fail(`CSS theme ${theme} is missing`);
  if (!tokenTs.includes(`"${theme}"`))
    fail(`TypeScript theme ${theme} is missing`);
}

const tohokuBlock = blockAfter(tokenCss, ':root[data-theme="tohoku"]');
const canvas = customHex(tohokuBlock, "--st-color-canvas");
for (const theme of ["tohoku", "toyama", "usst"]) {
  const block = blockAfter(tokenCss, `:root[data-theme="${theme}"]`);
  const pairs = [
    ["muted text/canvas", customHex(block, "--st-color-text-muted"), canvas],
    [
      "accent/soft surface",
      customHex(block, "--st-color-accent"),
      customHex(block, "--st-color-accent-soft"),
    ],
  ];
  for (const [label, foreground, background] of pairs) {
    if (!foreground || !background) {
      fail(`Cannot resolve ${theme} ${label} contrast pair`);
    } else if (contrast(foreground, background) < 4.5) {
      fail(`${theme} ${label} contrast is below 4.5:1`);
    }
  }
}
if (!tokenTs.includes('defaultTheme: ThemeName = "tohoku"'))
  fail("The production default theme must remain Tohoku");
if (!tokenTs.includes('themeStorageKey = "sichen-homepage-theme"'))
  fail("The production theme storage key changed");

for (const state of ["loading", "empty", "error", "stale", "paywalled"]) {
  if (!uiContracts.includes(`"${state}"`))
    fail(`UI state ${state} is missing from the TypeScript contract`);
  if (!uiCss.includes(`.st-state--${state}`))
    fail(`UI state ${state} has no CSS contract`);
  if (!patternTs.includes(`"${state}"`))
    fail(`Product pattern state ${state} is missing from TypeScript`);
  if (!patternCss.includes(`data-state="${state}"`))
    fail(`Product pattern state ${state} has no CSS view`);
}

if (!uiCss.includes(":focus-visible"))
  fail("Visible keyboard focus contract is missing");
if (!uiCss.includes("forced-colors: active"))
  fail("Forced-colors contract is missing");
const globalCss = await read("packages/design-tokens/src/index.css");
if (!globalCss.includes("prefers-reduced-motion: reduce"))
  fail("Reduced-motion contract is missing");
if (!uiCss.includes(".st-visually-hidden"))
  fail("Visually hidden utility is missing");
if (
  !uiContracts.includes('"aria-busy"') ||
  !uiContracts.includes('role: "alert"')
)
  fail("Async accessibility attributes are incomplete");
if (/outline\s*:\s*none/.test(`${uiCss}\n${patternCss}`))
  fail("Shared components must not suppress focus outlines");

for (const [file, css] of [
  [uiCssFile, uiCss],
  [patternCssFile, patternCss],
]) {
  if (
    /#[0-9a-f]{3,8}\b/i.test(css) ||
    /rgba?\(\s*\d/i.test(css) ||
    /hsla?\(/i.test(css)
  ) {
    fail(`${file} contains a hard-coded color; move it to design tokens`);
  }
  if (/var\(--(?:teal|ink|line|bg|surface|fb-)/.test(css)) {
    fail(`${file} references a legacy product token`);
  }
}

for (const packageDirectory of [
  "packages/design-tokens",
  "packages/ui",
  "packages/product-patterns",
]) {
  const packageFile = path.join(packageDirectory, "package.json");
  const manifest = JSON.parse(await read(packageFile));
  for (const target of Object.values(manifest.exports ?? {})) {
    const exportedFile = path.join(
      packageDirectory,
      String(target).replace(/^\.\//, ""),
    );
    if (!(await exists(exportedFile)))
      fail(`${packageFile} exports missing target ${exportedFile}`);
  }
}

const assetPaths = [
  ...uiAssets.matchAll(/"(\/[a-z0-9_./-]+\.(?:svg|png|jpg|jpeg|ico))"/gi),
].map((match) => match[1].slice(1));
for (const asset of assetPaths) {
  if (!(await exists(asset)))
    fail(`Existing asset reference does not resolve: ${asset}`);
}

const iconList = uiAssets.match(
  /export const iconNames = \[([\s\S]*?)\] as const/,
)?.[1];
const spritePath = uiAssets
  .match(/iconSprite:\s*"(\/[^"]+\.svg)"/)?.[1]
  ?.slice(1);
if (!iconList || !spritePath) {
  fail("Typed icon registry is incomplete");
} else {
  const sprite = await read(spritePath);
  const iconNames = [...iconList.matchAll(/"([a-z-]+)"/g)].map(
    (match) => match[1],
  );
  for (const icon of iconNames) {
    if (!sprite.includes(`id="icon-${icon}"`))
      fail(`Icon ${icon} is missing from ${spritePath}`);
  }
}

const fontCss = await read("packages/design-tokens/src/fonts.css");
const fontPaths = [
  ...fontCss.matchAll(/url\("(\/[a-z0-9_./-]+\.woff2)"\)/gi),
].map((match) => match[1].slice(1));
for (const font of fontPaths) {
  if (!(await exists(font)))
    fail(`Existing font reference does not resolve: ${font}`);
}

for (const source of [tokenTs, uiContracts, uiAssets, patternTs]) {
  if (/\.innerHTML\s*=|insertAdjacentHTML/.test(source))
    fail("Shared TypeScript must not inject HTML strings");
}

if (failures.length) {
  console.error(`Design-system validation failed (${failures.length}):`);
  failures.forEach((message) => console.error(`- ${message}`));
  process.exitCode = 1;
} else {
  console.log(
    `Design-system validation passed: ${definitions.size} tokens, ${references.size} references, 3 themes, 5 critical states.`,
  );
  console.log(`Validated from ${relative(fileURLToPath(import.meta.url))}.`);
}
