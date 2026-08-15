import fs from "node:fs/promises";
import path from "node:path";

export function parseArgs(argv) {
  const result = { _: [] };
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token === "--") continue;
    if (!token.startsWith("--")) {
      result._.push(token);
      continue;
    }

    const equalsAt = token.indexOf("=");
    if (equalsAt > 2) {
      result[token.slice(2, equalsAt)] = token.slice(equalsAt + 1);
      continue;
    }

    const key = token.slice(2);
    const next = argv[index + 1];
    if (next !== undefined && !next.startsWith("--")) {
      result[key] = next;
      index += 1;
    } else {
      result[key] = true;
    }
  }
  return result;
}

export function asPositiveInteger(value, fallback, label) {
  if (value === undefined) return fallback;
  const parsed = Number.parseInt(String(value), 10);
  if (!Number.isSafeInteger(parsed) || parsed <= 0) {
    throw new Error(`${label} must be a positive integer`);
  }
  return parsed;
}

export function absolutePath(value, fallback = ".") {
  return path.resolve(process.cwd(), String(value ?? fallback));
}

export async function assertDirectory(directory, label = "directory") {
  let stats;
  try {
    stats = await fs.stat(directory);
  } catch {
    throw new Error(`${label} does not exist: ${directory}`);
  }
  if (!stats.isDirectory())
    throw new Error(`${label} is not a directory: ${directory}`);
}

export async function loadJson(filename) {
  let raw;
  try {
    raw = await fs.readFile(filename, "utf8");
  } catch (error) {
    throw new Error(`cannot read JSON file ${filename}: ${error.message}`, {
      cause: error,
    });
  }
  try {
    return JSON.parse(raw);
  } catch (error) {
    throw new Error(`invalid JSON in ${filename}: ${error.message}`, {
      cause: error,
    });
  }
}

export async function walkFiles(root, options = {}) {
  const ignoredDirectories = new Set(
    options.ignoredDirectories ?? [
      ".git",
      "node_modules",
      ".astro",
      "coverage",
      "playwright-report",
      "test-results",
    ],
  );
  const files = [];

  async function visit(directory) {
    const entries = await fs.readdir(directory, { withFileTypes: true });
    entries.sort((left, right) => left.name.localeCompare(right.name));
    for (const entry of entries) {
      const absolute = path.join(directory, entry.name);
      if (entry.isSymbolicLink()) continue;
      if (entry.isDirectory()) {
        if (!ignoredDirectories.has(entry.name)) await visit(absolute);
      } else if (entry.isFile()) {
        files.push(absolute);
      }
    }
  }

  await visit(root);
  return files;
}

export function toPosix(relativePath) {
  return relativePath.split(path.sep).join("/");
}

export function routeCandidates(root, route) {
  const withoutHash = route.split("#", 1)[0].split("?", 1)[0];
  let decoded;
  try {
    decoded = decodeURIComponent(withoutHash);
  } catch {
    return [];
  }
  const normalized = decoded.replace(/^\/+/, "");
  if (normalized.includes("\0")) return [];

  const candidates = [];
  if (normalized === "") candidates.push("index.html");
  else if (normalized.endsWith("/")) candidates.push(`${normalized}index.html`);
  else {
    candidates.push(normalized);
    if (!path.posix.extname(normalized)) {
      candidates.push(`${normalized}.html`, `${normalized}/index.html`);
    }
  }

  return [...new Set(candidates)]
    .map((candidate) => {
      const absolute = path.resolve(root, candidate);
      return absolute.startsWith(`${root}${path.sep}`) || absolute === root
        ? absolute
        : null;
    })
    .filter(Boolean);
}

export async function firstExisting(candidates) {
  for (const candidate of candidates) {
    try {
      const stats = await fs.stat(candidate);
      if (stats.isFile()) return candidate;
    } catch {
      // Continue to the next valid candidate.
    }
  }
  return null;
}

export function decodeHtml(value) {
  return value
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">");
}

export function isProbablyText(buffer) {
  const sample = buffer.subarray(0, Math.min(buffer.length, 8192));
  if (sample.includes(0)) return false;
  let suspicious = 0;
  for (const byte of sample) {
    if (byte < 7 || (byte > 13 && byte < 32)) suspicious += 1;
  }
  return sample.length === 0 || suspicious / sample.length < 0.02;
}

export async function appendStepSummary(markdown) {
  const summaryFile = process.env.GITHUB_STEP_SUMMARY;
  if (!summaryFile) return;
  await fs.appendFile(summaryFile, `${markdown.trim()}\n`, "utf8");
}

export function printFailures(title, failures, limit = 100) {
  console.error(`\n${title} (${failures.length})`);
  for (const failure of failures.slice(0, limit)) console.error(`- ${failure}`);
  if (failures.length > limit) {
    console.error(
      `- ... ${failures.length - limit} additional failures omitted`,
    );
  }
}

export function requireHttpsUrl(value, label) {
  let url;
  try {
    url = new URL(value);
  } catch {
    throw new Error(`${label} must be a valid absolute URL`);
  }
  if (url.protocol !== "https:") throw new Error(`${label} must use https:`);
  return url;
}
