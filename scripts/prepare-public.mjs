import {
  cp,
  mkdir,
  readFile,
  readdir,
  rm,
  stat,
  writeFile,
} from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildAcademicHomepageAssets } from "./v2/build-academic-homepage.mjs";

const REPO_ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const GENERATED_ROOT = path.join(REPO_ROOT, ".generated-public");
const SITE_ORIGIN = "https://sichentao.github.io";

const TEXT_EXTENSIONS = new Set([
  ".css",
  ".html",
  ".js",
  ".json",
  ".txt",
  ".webmanifest",
  ".xml",
]);
const PUBLIC_FILE_EXTENSIONS = new Set([
  ...TEXT_EXTENSIONS,
  ".avif",
  ".epub",
  ".gif",
  ".ico",
  ".jpeg",
  ".jpg",
  ".pdf",
  ".png",
  ".svg",
  ".webp",
  ".woff",
  ".woff2",
]);
const PUBLIC_SPECIAL_FILES = new Set([".nojekyll"]);
const PRIVATE_SOURCE_PATHS = new Set([
  "assets/docs/research_collaborators_directory.md",
]);
const SOURCE_DIRECTORIES = [
  "assets",
  "academic-homepage",
  "academic-frontier",
  "follow-builders",
  "youtube-to-ebook",
  "jsps-kakenhi",
];
const SOURCE_FILES = ["portal.css", "portal.js"];
const ROOT_ACADEMIC_REDIRECTS = [
  "awards.html",
  "profiles.html",
  "projects.html",
  "publications.html",
  "research.html",
  "service.html",
  "timeline.html",
];
const SAFE_EVIDENCE_PAGES = {
  "cas_platform_home_official.html": {
    title: "CAS Journal Ranking Platform",
    sourceUrl: "https://www.fenqubiao.com/",
  },
  "ccf_ai_category_official.html": {
    title: "CCF Artificial Intelligence Category",
    sourceUrl: "https://www.ccf.org.cn/Academic_Evaluation/AI/",
  },
  "ccf_recommended_venues_portal_official.html": {
    title: "CCF Recommended International Venues",
    sourceUrl: "https://www.ccf.org.cn/Academic_Evaluation/By_category/",
  },
};

const CSP = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "form-action 'self' https://checkout.stripe.com",
  "script-src 'self' 'unsafe-inline' https://www.youtube.com https://www.youtube-nocookie.com https://s.ytimg.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "media-src 'self' blob: https:",
  "frame-src https://www.youtube.com https://www.youtube-nocookie.com https://checkout.stripe.com",
  "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://api.stripe.com",
  "worker-src 'self' blob:",
].join("; ");

function assertSafeGeneratedRoot() {
  const expected = path.join(REPO_ROOT, ".generated-public");
  if (
    GENERATED_ROOT !== expected ||
    path.basename(GENERATED_ROOT) !== ".generated-public"
  ) {
    throw new Error(
      `Refusing to mutate unexpected generated directory: ${GENERATED_ROOT}`,
    );
  }
}

function shouldSkip(sourceRelativePath) {
  const normalized = sourceRelativePath.split(path.sep).join("/");
  return (
    PRIVATE_SOURCE_PATHS.has(normalized) ||
    normalized === "README.md" ||
    normalized.endsWith("/README.md") ||
    normalized === ".DS_Store" ||
    normalized.includes("/.DS_Store") ||
    normalized === "academic-homepage/frontend" ||
    normalized.startsWith("academic-homepage/frontend/")
  );
}

export function isAllowedPublicFile(sourceRelativePath) {
  const normalized = sourceRelativePath.split(path.sep).join("/");
  if (PRIVATE_SOURCE_PATHS.has(normalized)) return false;
  const filename = path.posix.basename(normalized);
  if (PUBLIC_SPECIAL_FILES.has(filename)) return true;
  return PUBLIC_FILE_EXTENSIONS.has(path.posix.extname(filename).toLowerCase());
}

function pageLanguage(html) {
  const match = html.match(/<html\b[^>]*\blang=["']([^"']+)["']/i);
  const lang = match?.[1]?.toLowerCase() || "en";
  if (lang.startsWith("zh")) return "zh";
  if (lang.startsWith("ja")) return "ja";
  return "en";
}

function skipLabel(lang) {
  if (lang === "zh") return "跳至主要内容";
  if (lang === "ja") return "メインコンテンツへ移動";
  return "Skip to main content";
}

function canonicalUrl(destinationRelativePath) {
  const normalized = destinationRelativePath.split(path.sep).join("/");
  const route = normalized.endsWith("/index.html")
    ? `/${normalized.slice(0, -"index.html".length)}`
    : `/${normalized}`;
  return new URL(route, SITE_ORIGIN).href;
}

function stripRemoteFonts(html) {
  return html
    .replace(
      /\s*<link\b[^>]*href=["']https:\/\/fonts\.googleapis\.com[^>]*>\s*/gi,
      "\n",
    )
    .replace(
      /\s*<link\b[^>]*href=["']https:\/\/fonts\.gstatic\.com[^>]*>\s*/gi,
      "\n",
    )
    .replace(
      /\s*<link\b[^>]*rel=["']preconnect["'][^>]*href=["']https:\/\/fonts\.(?:googleapis|gstatic)\.com[^>]*>\s*/gi,
      "\n",
    );
}

function hardenHtml(html, destinationRelativePath) {
  let output = stripRemoteFonts(html);
  const lang = pageLanguage(output);
  if (!/http-equiv=["']Content-Security-Policy["']/i.test(output)) {
    output = output.replace(
      /<\/head>/i,
      `    <meta http-equiv="Content-Security-Policy" content="${CSP}" />\n  </head>`,
    );
  }
  if (!/<link\b[^>]*rel=["']canonical["']/i.test(output)) {
    output = output.replace(
      /<\/head>/i,
      `    <link rel="canonical" href="${canonicalUrl(destinationRelativePath)}" />\n  </head>`,
    );
  }
  if (!/<meta\b[^>]*name=["']referrer["']/i.test(output)) {
    output = output.replace(
      /<\/head>/i,
      '    <meta name="referrer" content="strict-origin-when-cross-origin" />\n  </head>',
    );
  }
  if (!/\/assets\/v2\/runtime\.css/i.test(output)) {
    output = output.replace(
      /<\/head>/i,
      '    <link rel="stylesheet" href="/assets/v2/runtime.css" />\n  </head>',
    );
  }
  if (!/<main\b[^>]*\bid=["']main-content["']/i.test(output)) {
    output = output.replace(/<main\b/i, '<main id="main-content"');
  }
  if (!/class=["'][^"']*\bskip-link\b/i.test(output)) {
    output = output.replace(
      /<body([^>]*)>/i,
      `<body$1>\n    <a class="skip-link" href="#main-content">${skipLabel(lang)}</a>`,
    );
  }
  if (!/\/assets\/v2\/runtime\.js/i.test(output)) {
    output = output.replace(
      /<\/body>/i,
      '    <script defer src="/assets/v2/runtime.js"></script>\n  </body>',
    );
  }
  return output;
}

function evidenceDocument(destinationRelativePath) {
  const normalized = destinationRelativePath.split(path.sep).join("/");
  const filename = path.basename(normalized);
  const jspsSnapshot = normalized.match(
    /^jsps-kakenhi\/external\/jsps\/(\d{4}-\d{2}-\d{2})\/([^/]+\.html)$/,
  );
  const evidence = jspsSnapshot
    ? {
        title: `JSPS KAKENHI official snapshot — ${jspsSnapshot[1]}`,
        sourceUrl: "https://www.jsps.go.jp/j-grantsinaid/02_koubo/index.html",
        returnUrl: "/jsps-kakenhi/",
        detail: `Snapshot record: ${jspsSnapshot[2]}`,
      }
    : SAFE_EVIDENCE_PAGES[filename];
  if (!evidence) return null;
  const canonical = canonicalUrl(destinationRelativePath);
  const returnUrl = evidence.returnUrl ?? "/academic-homepage/profiles.html";
  const detail = evidence.detail ? `\n      <p>${evidence.detail}</p>` : "";
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="referrer" content="strict-origin-when-cross-origin" />
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; base-uri 'self'; object-src 'none'; form-action 'none'; script-src 'none'; style-src 'self'; img-src 'self' data:" />
    <meta name="robots" content="noindex,follow" />
    <link rel="canonical" href="${canonical}" />
    <link rel="stylesheet" href="/assets/v2/runtime.css" />
    <title>${evidence.title} | Evidence record</title>
  </head>
  <body data-v2-evidence="true">
    <main id="main-content" class="v2-evidence-record">
      <p class="v2-evidence-kicker">Evidence record</p>
      <h1>${evidence.title}</h1>
      <p>The third-party HTML snapshot is retained in source control for provenance, but it is not executed in the public site.</p>${detail}
      <p><a href="${evidence.sourceUrl}" rel="noreferrer">Open the current official source</a></p>
      <p><a href="${returnUrl}">Return to the product page</a></p>
    </main>
  </body>
</html>
`;
}

function transformText(contents, destinationRelativePath) {
  const extension = path.extname(destinationRelativePath).toLowerCase();
  if (extension === ".html") {
    const safeEvidence = evidenceDocument(destinationRelativePath);
    if (safeEvidence) return safeEvidence;
    return hardenHtml(contents, destinationRelativePath);
  }
  return contents;
}

async function copyEntry(
  sourcePath,
  destinationPath,
  sourceRelativePath,
  destinationRelativePath,
) {
  if (shouldSkip(sourceRelativePath)) return;
  const metadata = await stat(sourcePath);
  if (metadata.isDirectory()) {
    await mkdir(destinationPath, { recursive: true });
    const entries = await readdir(sourcePath, { withFileTypes: true });
    await Promise.all(
      entries.map((entry) =>
        copyEntry(
          path.join(sourcePath, entry.name),
          path.join(destinationPath, entry.name),
          path.join(sourceRelativePath, entry.name),
          path.join(destinationRelativePath, entry.name),
        ),
      ),
    );
    return;
  }
  if (!isAllowedPublicFile(sourceRelativePath)) return;
  await mkdir(path.dirname(destinationPath), { recursive: true });
  if (TEXT_EXTENSIONS.has(path.extname(sourcePath).toLowerCase())) {
    const contents = await readFile(sourcePath, "utf8");
    await writeFile(
      destinationPath,
      transformText(contents, destinationRelativePath),
      "utf8",
    );
    return;
  }
  await cp(sourcePath, destinationPath, { force: true });
}

function redirectDocument(target, title = "Page moved") {
  const escapedTarget = target
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;");
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="referrer" content="strict-origin-when-cross-origin" />
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; base-uri 'self'; object-src 'none'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; script-src 'none'" />
    <meta http-equiv="refresh" content="0; url=${escapedTarget}" />
    <meta name="robots" content="noindex,follow" />
    <link rel="canonical" href="${new URL(target, SITE_ORIGIN).href}" />
    <title>${title}</title>
  </head>
  <body data-v2-redirect="true">
    <main id="main-content">
      <p>This page moved to <a href="${escapedTarget}">${escapedTarget}</a>.</p>
    </main>
  </body>
</html>
`;
}

async function writeRedirect(destinationRelativePath, target) {
  const destination = path.join(GENERATED_ROOT, destinationRelativePath);
  await mkdir(path.dirname(destination), { recursive: true });
  await writeFile(destination, redirectDocument(target), "utf8");
}

async function generateAcademicCompatibility() {
  const sourceRoot = path.join(REPO_ROOT, "academic-homepage");
  const legacyRoot = path.join(GENERATED_ROOT, "academic");
  await mkdir(legacyRoot, { recursive: true });

  async function visit(relative = "") {
    const current = path.join(sourceRoot, relative);
    const entries = await readdir(current, { withFileTypes: true });
    for (const entry of entries) {
      const child = path.join(relative, entry.name);
      if (shouldSkip(path.join("academic-homepage", child))) continue;
      if (entry.isDirectory()) {
        if (child === "frontend") continue;
        if (child === "assets") {
          await copyEntry(
            path.join(sourceRoot, child),
            path.join(legacyRoot, child),
            path.join("academic-homepage", child),
            path.join("academic", child),
          );
        } else {
          await visit(child);
        }
      } else if (entry.name.endsWith(".html")) {
        const target = `/academic-homepage/${child === "index.html" ? "" : child.split(path.sep).join("/")}`;
        await writeRedirect(path.join("academic", child), target);
      } else if (/^(favicon\.|site\.webmanifest$)/.test(entry.name)) {
        await copyEntry(
          path.join(sourceRoot, child),
          path.join(legacyRoot, child),
          path.join("academic-homepage", child),
          path.join("academic", child),
        );
      }
    }
  }

  await visit();
}

async function main() {
  assertSafeGeneratedRoot();
  await rm(GENERATED_ROOT, { recursive: true, force: true });
  await mkdir(GENERATED_ROOT, { recursive: true });

  for (const directory of SOURCE_DIRECTORIES) {
    await copyEntry(
      path.join(REPO_ROOT, directory),
      path.join(GENERATED_ROOT, directory),
      directory,
      directory,
    );
  }
  for (const file of SOURCE_FILES) {
    await copyEntry(
      path.join(REPO_ROOT, file),
      path.join(GENERATED_ROOT, file),
      file,
      file,
    );
  }

  const academicAssets = await buildAcademicHomepageAssets({
    frontendRoot: path.join(REPO_ROOT, "academic-homepage/frontend"),
    outputRoot: path.join(GENERATED_ROOT, "academic-homepage"),
  });
  for (const asset of academicAssets) {
    console.log(
      `Built academic-homepage/${asset.output}: ${asset.fragmentCount} fragments, ${asset.bytes} B, sha256 ${asset.sha256}`,
    );
  }

  await generateAcademicCompatibility();
  await writeRedirect("jsps-kakenhi/calls.html", "/jsps-kakenhi/");
  for (const file of ROOT_ACADEMIC_REDIRECTS) {
    await writeRedirect(file, `/academic-homepage/${file}`);
  }

  await writeFile(path.join(GENERATED_ROOT, ".nojekyll"), "", "utf8");
  await writeFile(
    path.join(GENERATED_ROOT, "robots.txt"),
    "User-agent: *\nAllow: /\nDisallow: /account/\nSitemap: https://sichentao.github.io/sitemap.xml\n",
    "utf8",
  );
  await cp(
    path.join(REPO_ROOT, "academic-homepage", "favicon.png"),
    path.join(GENERATED_ROOT, "favicon.png"),
    { force: true },
  );

  console.log(
    `Prepared public artifact input at ${path.relative(REPO_ROOT, GENERATED_ROOT)}`,
  );
}

if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  await main();
}
