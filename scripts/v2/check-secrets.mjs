#!/usr/bin/env node

import { execFile } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import {
  absolutePath,
  appendStepSummary,
  assertDirectory,
  isProbablyText,
  parseArgs,
  printFailures,
  toPosix,
  walkFiles,
} from "./_lib.mjs";

const execFileAsync = promisify(execFile);
const args = parseArgs(process.argv.slice(2));
const root = absolutePath(args.root, ".");
const trackedOnly = args.tracked === true;
const maximumBytes = 10 * 1024 * 1024;

const secretPatterns = [
  [
    "private key",
    /-----BEGIN (?:RSA |EC |DSA |OPENSSH |PGP )?PRIVATE KEY-----/gu,
  ],
  [
    "GitHub token",
    /\b(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{30,}\b|\bgithub_pat_[A-Za-z0-9_]{40,}\b/gu,
  ],
  ["AWS access key", /\b(?:AKIA|ASIA)[A-Z0-9]{16}\b/gu],
  ["Stripe secret key", /\bsk_(?:live|test)_[A-Za-z0-9]{16,}\b/gu],
  ["Stripe webhook secret", /\bwhsec_[A-Za-z0-9]{16,}\b/gu],
  ["Slack token", /\bxox[baprs]-[A-Za-z0-9-]{20,}\b/gu],
  ["Google API key", /\bAIza[0-9A-Za-z_-]{35}\b/gu],
  [
    "generic assigned secret",
    /\b(?:SUPABASE_SERVICE_ROLE_KEY|STRIPE_SECRET_KEY|STRIPE_WEBHOOK_SECRET|PRIVATE_KEY|CLIENT_SECRET|DATABASE_PASSWORD)\s*[=:]\s*["']?([A-Za-z0-9_./+=-]{16,})/giu,
  ],
];

const placeholderPattern =
  /(?:REPLACE(?:_ME)?|EXAMPLE|CHANGEME|YOUR[_-]|process\.env|import\.meta\.env|\$\{|<[^>]+>)/iu;
const forbiddenTrackedNames =
  /(?:^|\/)(?:\.env(?:\..+)?|id_(?:rsa|ed25519)|credentials\.json|service-account[^/]*\.json)$/iu;

async function filesToScan() {
  if (!trackedOnly) return walkFiles(root);
  let stdout;
  try {
    ({ stdout } = await execFileAsync(
      "git",
      [
        "-C",
        root,
        "ls-files",
        "--cached",
        "--others",
        "--exclude-standard",
        "-z",
      ],
      {
        encoding: "buffer",
        maxBuffer: 20 * 1024 * 1024,
      },
    ));
  } catch (error) {
    throw new Error(`cannot list tracked files: ${error.message}`, {
      cause: error,
    });
  }
  return stdout
    .toString("utf8")
    .split("\0")
    .filter(Boolean)
    .map((relative) => path.join(root, relative));
}

try {
  await assertDirectory(root, "secret-scan root");
  const files = await filesToScan();
  const failures = [];
  let scannedFiles = 0;

  for (const file of files) {
    const relative = toPosix(path.relative(root, file));
    const isEnvironmentExample =
      path.posix.basename(relative) === ".env.example";
    if (
      trackedOnly &&
      forbiddenTrackedNames.test(relative) &&
      !isEnvironmentExample
    ) {
      failures.push(`${relative}: sensitive credential filename is tracked`);
    }

    let stats;
    try {
      stats = await fs.stat(file);
    } catch {
      continue;
    }
    if (!stats.isFile() || stats.size > maximumBytes) continue;
    const buffer = await fs.readFile(file);
    if (!isProbablyText(buffer)) continue;
    scannedFiles += 1;
    const text = buffer.toString("utf8");

    for (const [label, pattern] of secretPatterns) {
      pattern.lastIndex = 0;
      for (const match of text.matchAll(pattern)) {
        const excerpt = match[0];
        if (placeholderPattern.test(excerpt)) continue;
        const line = text.slice(0, match.index).split("\n").length;
        failures.push(`${relative}:${line}: possible ${label}`);
      }
    }
  }

  if (failures.length > 0) {
    printFailures("Potential secrets", failures);
    process.exitCode = 1;
  } else {
    const message = `Secret scan passed: ${scannedFiles} text files checked${trackedOnly ? " from Git-visible sources" : ""}.`;
    console.log(message);
    await appendStepSummary(`### Secret scan\n\n${message}`);
  }
} catch (error) {
  console.error(`Secret scan failed: ${error.message}`);
  process.exitCode = 1;
}
