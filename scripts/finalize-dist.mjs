import { execFileSync } from "node:child_process";
import { readFile, readdir, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const DIST_ROOT = path.join(REPO_ROOT, "dist");
const SITE_ORIGIN = "https://sichentao.github.io";

async function walk(root, predicate = () => true, relative = "") {
  const entries = await readdir(path.join(root, relative), {
    withFileTypes: true,
  });
  const paths = [];
  for (const entry of entries) {
    const child = path.join(relative, entry.name);
    if (entry.isDirectory())
      paths.push(...(await walk(root, predicate, child)));
    else if (predicate(child)) paths.push(child);
  }
  return paths;
}

function routeForHtml(relativePath) {
  const normalized = relativePath.split(path.sep).join("/");
  if (normalized === "index.html") return "/";
  if (normalized.endsWith("/index.html"))
    return `/${normalized.slice(0, -"index.html".length)}`;
  return `/${normalized}`;
}

function xmlEscape(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function htmlAttribute(tag, name) {
  const pattern = new RegExp(`\\b${name}\\s*=\\s*(["'])(.*?)\\1`, "iu");
  return tag.match(pattern)?.[2] ?? "";
}

export function robotsDisallowPaths(robotsText) {
  return robotsText
    .split(/\r?\n/u)
    .map((line) => line.replace(/\s*#.*$/u, "").trim())
    .map((line) => line.match(/^Disallow\s*:\s*(\S.*)$/iu)?.[1]?.trim())
    .filter(Boolean);
}

function routeIsDisallowed(route, disallowPaths) {
  return disallowPaths.some((disallow) => {
    if (disallow === "/") return true;
    return route.startsWith(disallow);
  });
}

export function isIndexableHtml(route, html, disallowPaths = []) {
  if (/data-v2-(?:redirect|evidence)=["']true["']/iu.test(html)) return false;
  if (/(?:^|\/)404(?:\.html|\/)?$/iu.test(route)) return false;
  if (routeIsDisallowed(route, disallowPaths)) return false;
  const robotsTag = [...html.matchAll(/<meta\b[^>]*>/giu)].find(
    (match) => htmlAttribute(match[0], "name").toLowerCase() === "robots",
  )?.[0];
  if (robotsTag) {
    const directives = htmlAttribute(robotsTag, "content")
      .toLowerCase()
      .split(/[\s,]+/u);
    if (directives.includes("noindex")) return false;
  }
  return true;
}

export function isObsoleteSitemapFile(filename) {
  return (
    filename === "sitemap-index.xml" || /^sitemap-\d+\.xml$/u.test(filename)
  );
}

function commitMetadata() {
  try {
    return {
      commit: execFileSync("git", ["rev-parse", "HEAD"], {
        cwd: REPO_ROOT,
        encoding: "utf8",
      }).trim(),
      committedAt: execFileSync("git", ["show", "-s", "--format=%cI", "HEAD"], {
        cwd: REPO_ROOT,
        encoding: "utf8",
      }).trim(),
    };
  } catch {
    return { commit: "unknown", committedAt: "unknown" };
  }
}

async function addFrontierLanguageLinks(htmlFiles) {
  const normalizedFiles = new Set(
    htmlFiles.map((file) => file.split(path.sep).join("/")),
  );
  for (const file of htmlFiles) {
    const normalized = file.split(path.sep).join("/");
    if (
      !normalized.startsWith("academic-frontier/") ||
      normalized.includes("/assets/")
    )
      continue;
    const relative = normalized.slice("academic-frontier/".length);
    const base = relative.replace(/^(?:zh|ja)\//, "");
    const candidates = {
      en: `academic-frontier/${base}`,
      zh: `academic-frontier/zh/${base}`,
      ja: `academic-frontier/ja/${base}`,
    };
    const links = Object.entries(candidates)
      .filter(([, candidate]) => normalizedFiles.has(candidate))
      .map(([lang, candidate]) => {
        const route = routeForHtml(candidate);
        return `    <link rel="alternate" hreflang="${lang}" href="${new URL(route, SITE_ORIGIN).href}" />`;
      });
    if (!links.length) continue;
    links.push(
      `    <link rel="alternate" hreflang="x-default" href="${new URL(routeForHtml(candidates.en), SITE_ORIGIN).href}" />`,
    );
    const fullPath = path.join(DIST_ROOT, file);
    let html = await readFile(fullPath, "utf8");
    html = html.replace(
      /\s*<link\b[^>]*rel=["']alternate["'][^>]*hreflang=[^>]*>\s*/gi,
      "\n",
    );
    html = html.replace(/<\/head>/i, `${links.join("\n")}\n  </head>`);
    await writeFile(fullPath, html, "utf8");
  }
}

async function main() {
  const distStats = await stat(DIST_ROOT);
  if (!distStats.isDirectory()) throw new Error("dist is not a directory");

  const quantPath = path.join(DIST_ROOT, "quant-platform");
  try {
    await stat(quantPath);
    throw new Error(
      "Security invariant failed: quant-platform exists in the public artifact",
    );
  } catch (error) {
    if (error?.code !== "ENOENT") throw error;
  }

  const htmlFiles = (
    await walk(DIST_ROOT, (file) => file.endsWith(".html"))
  ).sort();
  await addFrontierLanguageLinks(htmlFiles);

  for (const entry of await readdir(DIST_ROOT, { withFileTypes: true })) {
    if (entry.isFile() && isObsoleteSitemapFile(entry.name)) {
      await rm(path.join(DIST_ROOT, entry.name));
    }
  }
  const robotsText = await readFile(path.join(DIST_ROOT, "robots.txt"), "utf8");
  const disallowPaths = robotsDisallowPaths(robotsText);

  const publicRoutes = [];
  const redirectRoutes = [];
  const evidenceRoutes = [];
  for (const file of htmlFiles) {
    const html = await readFile(path.join(DIST_ROOT, file), "utf8");
    const route = routeForHtml(file);
    if (/data-v2-redirect=["']true["']/.test(html)) redirectRoutes.push(route);
    else if (/data-v2-evidence=["']true["']/.test(html))
      evidenceRoutes.push(route);
    else if (isIndexableHtml(route, html, disallowPaths))
      publicRoutes.push(route);
  }

  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...publicRoutes.map(
      (route) =>
        `  <url><loc>${xmlEscape(new URL(route, SITE_ORIGIN).href)}</loc></url>`,
    ),
    "</urlset>",
    "",
  ].join("\n");
  await writeFile(path.join(DIST_ROOT, "sitemap.xml"), sitemap, "utf8");

  const metadata = commitMetadata();
  await writeFile(
    path.join(DIST_ROOT, "release-manifest.json"),
    `${JSON.stringify(
      {
        schemaVersion: 1,
        release: "2.0.0-alpha.1",
        ...metadata,
        publicRouteCount: publicRoutes.length,
        compatibilityRouteCount: redirectRoutes.length,
        evidenceRouteCount: evidenceRoutes.length,
        quantPublicArtifactCount: 0,
      },
      null,
      2,
    )}\n`,
    "utf8",
  );

  console.log(
    `Finalized ${publicRoutes.length} public routes, ${redirectRoutes.length} compatibility routes, and ${evidenceRoutes.length} noindex evidence routes; Quant artifact count is 0.`,
  );
}

if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  await main();
}
