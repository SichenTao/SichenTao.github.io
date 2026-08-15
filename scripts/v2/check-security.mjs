#!/usr/bin/env node

import path from "node:path";
import { spawnSync } from "node:child_process";
import { absolutePath, parseArgs } from "./_lib.mjs";

const args = parseArgs(process.argv.slice(2));
const root = absolutePath(args.root, "dist");
const repoRoot = absolutePath(args["repo-root"], ".");
const scriptRoot = path.dirname(new URL(import.meta.url).pathname);

const checks = [
  [
    "tracked source secret scan",
    "check-secrets.mjs",
    ["--root", repoRoot, "--tracked"],
  ],
  ["artifact secret scan", "check-secrets.mjs", ["--root", root]],
  ["Quant public boundary", "check-quant-artifacts.mjs", ["--root", root]],
  ["dist-only boundary", "check-dist-boundary.mjs", ["--root", root]],
  ["HTML security controls", "check-html-security.mjs", ["--root", root]],
  [
    "legacy URL contract",
    "check-url-inventory.mjs",
    ["--root", root, "--mode", "release"],
  ],
];

let failed = 0;
for (const [label, script, scriptArgs] of checks) {
  console.log(`\n[security] ${label}`);
  const result = spawnSync(
    process.execPath,
    [path.join(scriptRoot, script), ...scriptArgs],
    {
      cwd: repoRoot,
      encoding: "utf8",
      stdio: "inherit",
    },
  );
  if (result.error) {
    console.error(`${label} could not run: ${result.error.message}`);
    failed += 1;
  } else if (result.status !== 0) {
    failed += 1;
  }
}

if (failed > 0) {
  console.error(
    `\nSecurity gate failed: ${failed} of ${checks.length} checks failed.`,
  );
  process.exitCode = 1;
} else {
  console.log(`\nSecurity gate passed: ${checks.length} checks completed.`);
}
