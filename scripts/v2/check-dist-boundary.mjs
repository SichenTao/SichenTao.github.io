#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import {
  absolutePath,
  appendStepSummary,
  assertDirectory,
  firstExisting,
  parseArgs,
  printFailures,
  toPosix,
  walkFiles,
} from "./_lib.mjs";

const args = parseArgs(process.argv.slice(2));
const root = absolutePath(args.root, "dist");
const maximumTotalBytes = 100 * 1024 * 1024;
const maximumFileBytes = 15 * 1024 * 1024;
const forbiddenTopLevel = new Set([
  ".git",
  ".github",
  "apps",
  "content",
  "docs",
  "node_modules",
  "packages",
  "scripts",
  "src",
  "supabase",
  "tests",
  "quant-platform",
]);
const forbiddenFile =
  /(?:^|\/)(?:\.env(?:\..+)?|package(?:-lock)?\.json|pnpm-lock\.yaml|pnpm-workspace\.yaml|tsconfig[^/]*\.json|.*\.(?:key|lock|map|md|pem|py|sh|sql|tex|toml|ts|tsx|yaml|yml))$/iu;

try {
  await assertDirectory(root, "dist boundary root");
  const failures = [];
  const rootEntries = await fs.readdir(root, { withFileTypes: true });
  const sitemapFiles = rootEntries
    .filter(
      (entry) =>
        entry.isFile() &&
        (entry.name === "sitemap.xml" ||
          entry.name === "sitemap-index.xml" ||
          /^sitemap-\d+\.xml$/u.test(entry.name)),
    )
    .map((entry) => entry.name)
    .sort();
  if (sitemapFiles.length !== 1 || sitemapFiles[0] !== "sitemap.xml") {
    failures.push(
      `expected sitemap.xml as the only sitemap artifact; found ${sitemapFiles.join(", ") || "none"}`,
    );
  }
  for (const entry of rootEntries) {
    if (forbiddenTopLevel.has(entry.name))
      failures.push(
        `${entry.name}: source/private top-level path present in dist`,
      );
  }

  async function checkSymlinks(directory) {
    const entries = await fs.readdir(directory, { withFileTypes: true });
    for (const entry of entries) {
      const absolute = path.join(directory, entry.name);
      const relative = toPosix(path.relative(root, absolute));
      if (entry.isSymbolicLink())
        failures.push(`${relative}: symlinks are prohibited in dist`);
      else if (entry.isDirectory()) await checkSymlinks(absolute);
    }
  }
  await checkSymlinks(root);

  const files = await walkFiles(root, { ignoredDirectories: [] });
  let totalBytes = 0;
  for (const file of files) {
    const relative = toPosix(path.relative(root, file));
    const size = (await fs.stat(file)).size;
    totalBytes += size;
    if (forbiddenFile.test(relative))
      failures.push(
        `${relative}: source, secret, or build metadata file present in dist`,
      );
    if (size > maximumFileBytes)
      failures.push(
        `${relative}: ${size} bytes exceeds the 15 MiB single-file budget`,
      );
  }
  if (totalBytes > maximumTotalBytes)
    failures.push(
      `artifact size ${totalBytes} bytes exceeds the 100 MiB budget`,
    );
  if (files.length === 0) failures.push("dist is empty");

  for (const required of ["/index.html", "/404.html", "/robots.txt"]) {
    if (!(await firstExisting([path.join(root, required.slice(1))])))
      failures.push(`required release file missing: ${required}`);
  }
  const sitemap = await firstExisting([path.join(root, "sitemap.xml")]);
  if (!sitemap) failures.push("required authoritative sitemap.xml is missing");

  if (failures.length > 0) {
    printFailures("Dist boundary violations", failures);
    process.exitCode = 1;
  } else {
    const message = `Dist boundary passed: ${files.length} files, ${(totalBytes / 1024 / 1024).toFixed(2)} MiB, public assets only.`;
    console.log(message);
    await appendStepSummary(`### Release artifact boundary\n\n${message}`);
  }
} catch (error) {
  console.error(`Dist boundary check failed: ${error.message}`);
  process.exitCode = 1;
}
