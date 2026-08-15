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
  routeCandidates,
} from "./_lib.mjs";

const args = parseArgs(process.argv.slice(2));
const root = absolutePath(args.root, args.mode === "baseline" ? "." : "dist");
const mode = String(args.mode ?? "release");
const inventoryFile = absolutePath(
  args.inventory,
  "tests/baseline/v1-public-urls.txt",
);
const releaseInventoryFile = absolutePath(
  args["release-inventory"],
  "tests/baseline/v2-required-urls.txt",
);
const forbiddenFile = absolutePath(
  args.forbidden,
  "tests/baseline/forbidden-public-prefixes.txt",
);

if (!["baseline", "release"].includes(mode)) {
  console.error("--mode must be baseline or release");
  process.exit(2);
}

function parseList(raw, filename) {
  const entries = raw
    .split(/\r?\n/u)
    .map((line) => line.replace(/\s*#.*$/u, "").trim())
    .filter(Boolean);
  const duplicates = entries.filter(
    (entry, index) => entries.indexOf(entry) !== index,
  );
  if (duplicates.length > 0)
    throw new Error(
      `duplicate entries in ${filename}: ${[...new Set(duplicates)].join(", ")}`,
    );
  for (const entry of entries) {
    if (
      !entry.startsWith("/") ||
      entry.includes("\\") ||
      entry.includes("..")
    ) {
      throw new Error(`unsafe route in ${filename}: ${entry}`);
    }
  }
  return entries;
}

try {
  await assertDirectory(root, "artifact root");
  const publicRoutes = parseList(
    await fs.readFile(inventoryFile, "utf8"),
    inventoryFile,
  );
  const releaseRoutes =
    mode === "release"
      ? parseList(
          await fs.readFile(releaseInventoryFile, "utf8"),
          releaseInventoryFile,
        )
      : [];
  const forbiddenPrefixes = parseList(
    await fs.readFile(forbiddenFile, "utf8"),
    forbiddenFile,
  );
  const failures = [];

  for (const route of [...publicRoutes, ...releaseRoutes]) {
    const match = await firstExisting(routeCandidates(root, route));
    if (!match) failures.push(`required legacy URL has no artifact: ${route}`);
  }

  if (mode === "release") {
    for (const prefix of forbiddenPrefixes) {
      const exact = await firstExisting(routeCandidates(root, prefix));
      const directory = path.resolve(root, prefix.replace(/^\/+|\/+$/gu, ""));
      let directoryExists = false;
      try {
        directoryExists = (await fs.stat(directory)).isDirectory();
      } catch {
        directoryExists = false;
      }
      if (exact || directoryExists)
        failures.push(`forbidden public prefix exists in release: ${prefix}`);
    }
  }

  if (failures.length > 0) {
    printFailures("URL inventory violations", failures);
    process.exitCode = 1;
  } else {
    const message = `URL inventory passed: ${publicRoutes.length} legacy routes${releaseRoutes.length > 0 ? ` plus ${releaseRoutes.length} v2 release files` : ""}; ${forbiddenPrefixes.length} forbidden prefixes checked in ${mode} mode.`;
    console.log(message);
    await appendStepSummary(`### URL inventory\n\n${message}`);
  }
} catch (error) {
  console.error(`URL inventory check failed: ${error.message}`);
  process.exitCode = 1;
}
