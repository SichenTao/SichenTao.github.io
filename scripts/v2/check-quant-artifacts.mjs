#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
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

const args = parseArgs(process.argv.slice(2));
const root = absolutePath(args.root, "dist");
const forbiddenPath = /(?:^|\/)(?:quant-platform|quant_platform)(?:\/|$)/iu;
const forbiddenContent = [
  ["legacy browser token header", /X-Fin-Quant-Token/iu],
  ["client-controlled API base", /\bapi_base\b/iu],
  ["persisted Quant API base", /fin[_-]?quant[_-]?api[_-]?base/iu],
  [
    "ephemeral Quick Tunnel endpoint",
    /https?:\/\/[^\s"']+\.trycloudflare\.com/iu,
  ],
  ["legacy trading credential", /\bFIN_QUANT_TOKEN\b/iu],
];

try {
  await assertDirectory(root, "public artifact root");
  const files = await walkFiles(root);
  const failures = [];
  let scannedTextFiles = 0;

  for (const file of files) {
    const relative = toPosix(path.relative(root, file));
    if (forbiddenPath.test(relative))
      failures.push(`${relative}: forbidden Quant path is public`);

    const stats = await fs.stat(file);
    if (stats.size > 5 * 1024 * 1024) continue;
    const buffer = await fs.readFile(file);
    if (!isProbablyText(buffer)) continue;
    scannedTextFiles += 1;
    const text = buffer.toString("utf8");
    for (const [label, pattern] of forbiddenContent) {
      if (pattern.test(text)) failures.push(`${relative}: contains ${label}`);
    }
  }

  if (failures.length > 0) {
    printFailures("Public Quant boundary violations", failures);
    process.exitCode = 1;
  } else {
    const message = `Quant boundary passed: ${files.length} artifact files (${scannedTextFiles} text) contain no prohibited Quant path or credential route.`;
    console.log(message);
    await appendStepSummary(`### Quant public boundary\n\n${message}`);
  }
} catch (error) {
  console.error(`Quant artifact check failed: ${error.message}`);
  process.exitCode = 1;
}
