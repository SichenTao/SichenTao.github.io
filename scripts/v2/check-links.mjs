#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import {
  absolutePath,
  appendStepSummary,
  assertDirectory,
  decodeHtml,
  firstExisting,
  parseArgs,
  printFailures,
  routeCandidates,
  toPosix,
  walkFiles,
} from "./_lib.mjs";

const args = parseArgs(process.argv.slice(2));
const root = absolutePath(args.root, "dist");
const checkFragments = args["skip-fragments"] !== true;

const skippedSchemes = /^(?:data|blob|mailto|tel|sms|geo|javascript):/iu;
const absoluteScheme = /^[a-z][a-z0-9+.-]*:/iu;

function extractReferences(html) {
  const references = [];
  const attributePattern =
    /\b(?:href|src|poster|action)\s*=\s*(["'])(.*?)\1/giu;
  for (const match of html.matchAll(attributePattern))
    references.push(decodeHtml(match[2].trim()));

  const srcsetPattern = /\bsrcset\s*=\s*(["'])(.*?)\1/giu;
  for (const match of html.matchAll(srcsetPattern)) {
    for (const candidate of match[2].split(",")) {
      const url = candidate.trim().split(/\s+/u, 1)[0];
      if (url) references.push(decodeHtml(url));
    }
  }

  const refreshPattern =
    /<meta\b[^>]*http-equiv\s*=\s*(["'])refresh\1[^>]*content\s*=\s*(["'])(.*?)\2[^>]*>/giu;
  for (const match of html.matchAll(refreshPattern)) {
    const urlMatch = match[3].match(/\burl\s*=\s*(.+)$/iu);
    if (urlMatch)
      references.push(
        decodeHtml(urlMatch[1].trim().replace(/^['"]|['"]$/gu, "")),
      );
  }
  return references;
}

function extractCssReferences(css) {
  const references = [];
  for (const match of css.matchAll(/url\(\s*(["']?)(.*?)\1\s*\)/giu)) {
    references.push(decodeHtml(match[2].trim()));
  }
  return references;
}

function idsIn(html) {
  const ids = new Set();
  for (const match of html.matchAll(/\b(?:id|name)\s*=\s*(["'])(.*?)\1/giu))
    ids.add(decodeHtml(match[2]));
  return ids;
}

function targetForReference(sourceFile, reference) {
  if (
    !reference ||
    skippedSchemes.test(reference) ||
    reference.startsWith("//")
  )
    return null;
  if (absoluteScheme.test(reference)) return null;

  const hashIndex = reference.indexOf("#");
  const fragment = hashIndex >= 0 ? reference.slice(hashIndex + 1) : "";
  const beforeHash = hashIndex >= 0 ? reference.slice(0, hashIndex) : reference;
  const pathOnly = beforeHash.split("?", 1)[0];

  let route;
  if (!pathOnly) route = `/${toPosix(path.relative(root, sourceFile))}`;
  else if (pathOnly.startsWith("/")) route = pathOnly;
  else {
    const sourceRoute = `/${toPosix(path.relative(root, sourceFile))}`;
    route = path.posix.resolve(path.posix.dirname(sourceRoute), pathOnly);
  }

  let decodedFragment;
  try {
    decodedFragment = fragment ? decodeURIComponent(fragment) : "";
  } catch {
    decodedFragment = fragment;
  }
  return { route, fragment: decodedFragment };
}

try {
  await assertDirectory(root, "link-check root");
  const files = await walkFiles(root);
  const htmlFiles = files.filter((file) => file.endsWith(".html"));
  const cssFiles = files.filter((file) => file.endsWith(".css"));
  if (htmlFiles.length === 0)
    throw new Error(`no HTML files found under ${root}`);

  const failures = [];
  const idCache = new Map();
  let checked = 0;

  async function checkReference(sourceFile, reference) {
    const target = targetForReference(sourceFile, reference);
    if (!target) return;
    checked += 1;
    const candidates = routeCandidates(root, target.route);
    const existing = await firstExisting(candidates);
    const sourceLabel = toPosix(path.relative(root, sourceFile));
    if (!existing) {
      failures.push(`${sourceLabel}: ${reference} -> missing ${target.route}`);
      return;
    }

    if (!checkFragments || !target.fragment || !existing.endsWith(".html"))
      return;
    let ids = idCache.get(existing);
    if (!ids) {
      ids = idsIn(await fs.readFile(existing, "utf8"));
      idCache.set(existing, ids);
    }
    if (!ids.has(target.fragment) && target.fragment !== "top") {
      failures.push(
        `${sourceLabel}: ${reference} -> missing fragment #${target.fragment}`,
      );
    }
  }

  for (const file of htmlFiles) {
    const html = await fs.readFile(file, "utf8");
    for (const reference of extractReferences(html))
      await checkReference(file, reference);
  }
  for (const file of cssFiles) {
    const css = await fs.readFile(file, "utf8");
    for (const reference of extractCssReferences(css))
      await checkReference(file, reference);
  }

  if (failures.length > 0) {
    printFailures("Broken local references", failures);
    process.exitCode = 1;
  } else {
    const message = `Link check passed: ${htmlFiles.length} HTML files and ${checked} local references verified.`;
    console.log(message);
    await appendStepSummary(`### Internal links\n\n${message}`);
  }
} catch (error) {
  console.error(`Link check failed: ${error.message}`);
  process.exitCode = 1;
}
