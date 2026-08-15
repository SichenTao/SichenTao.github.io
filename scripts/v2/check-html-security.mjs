#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import {
  absolutePath,
  appendStepSummary,
  assertDirectory,
  decodeHtml,
  loadJson,
  parseArgs,
  printFailures,
  toPosix,
  walkFiles,
} from "./_lib.mjs";

const args = parseArgs(process.argv.slice(2));
const root = absolutePath(args.root, "dist");
const policyFile = absolutePath(
  args.policy,
  "tests/baseline/security-policy.json",
);

function attribute(tag, name) {
  const pattern = new RegExp(`\\b${name}\\s*=\\s*(["'])(.*?)\\1`, "iu");
  return decodeHtml(tag.match(pattern)?.[2] ?? "");
}

function cspDirectives(value) {
  const result = new Map();
  for (const segment of value.split(";")) {
    const tokens = segment.trim().split(/\s+/u).filter(Boolean);
    if (tokens.length > 0) result.set(tokens[0].toLowerCase(), tokens.slice(1));
  }
  return result;
}

try {
  await assertDirectory(root, "HTML security root");
  const policy = await loadJson(policyFile);
  const htmlFiles = (await walkFiles(root)).filter((file) =>
    file.endsWith(".html"),
  );
  if (htmlFiles.length === 0)
    throw new Error(`no HTML files found under ${root}`);
  const failures = [];

  for (const file of htmlFiles) {
    const relative = toPosix(path.relative(root, file));
    const html = await fs.readFile(file, "utf8");

    const cspTag = [...html.matchAll(/<meta\b[^>]*>/giu)]
      .map((match) => match[0])
      .find(
        (tag) =>
          attribute(tag, "http-equiv").toLowerCase() ===
          "content-security-policy",
      );
    if (!cspTag)
      failures.push(`${relative}: missing Content-Security-Policy meta tag`);
    else {
      const directives = cspDirectives(attribute(cspTag, "content"));
      for (const [directive, requiredValues] of Object.entries(
        policy.requiredCspDirectives ?? {},
      )) {
        const actual = directives.get(directive) ?? [];
        if (!directives.has(directive))
          failures.push(`${relative}: CSP is missing ${directive}`);
        else
          for (const value of requiredValues) {
            if (!actual.includes(value))
              failures.push(
                `${relative}: CSP ${directive} is missing ${value}`,
              );
          }
      }
    }

    const referrerTag = [...html.matchAll(/<meta\b[^>]*>/giu)]
      .map((match) => match[0])
      .find((tag) => attribute(tag, "name").toLowerCase() === "referrer");
    const referrerPolicy = referrerTag
      ? attribute(referrerTag, "content").toLowerCase()
      : "";
    if (!(policy.allowedReferrerPolicies ?? []).includes(referrerPolicy)) {
      failures.push(
        `${relative}: missing or disallowed referrer policy (${referrerPolicy || "none"})`,
      );
    }

    for (const match of html.matchAll(
      /\b(?:href|src|action|poster)\s*=\s*(["'])(.*?)\1/giu,
    )) {
      const url = decodeHtml(match[2].trim());
      if (/^javascript:/iu.test(url))
        failures.push(`${relative}: javascript: URL is prohibited`);
      if (/^http:\/\//iu.test(url))
        failures.push(`${relative}: mixed-content URL is prohibited: ${url}`);
    }

    if (policy.forbidInlineEventHandlers && /\son[a-z]+\s*=/iu.test(html)) {
      failures.push(
        `${relative}: inline event-handler attribute is prohibited`,
      );
    }

    if (policy.requireNoopenerForBlankTargets) {
      for (const match of html.matchAll(/<a\b[^>]*>/giu)) {
        const tag = match[0];
        if (attribute(tag, "target").toLowerCase() !== "_blank") continue;
        const rel = new Set(
          attribute(tag, "rel").toLowerCase().split(/\s+/u).filter(Boolean),
        );
        if (!rel.has("noopener") && !rel.has("noreferrer"))
          failures.push(
            `${relative}: target=_blank link lacks rel=noopener or noreferrer`,
          );
      }
    }

    if (policy.requireIntegrityForExternalScripts) {
      for (const match of html.matchAll(
        /<script\b[^>]*\bsrc\s*=\s*(["'])(https:\/\/.*?)\1[^>]*>/giu,
      )) {
        const tag = match[0];
        if (!attribute(tag, "integrity") || !attribute(tag, "crossorigin")) {
          failures.push(
            `${relative}: external script lacks integrity and crossorigin: ${match[2]}`,
          );
        }
      }
    }
  }

  if (failures.length > 0) {
    printFailures("HTML security violations", failures);
    process.exitCode = 1;
  } else {
    const message = `HTML security passed: ${htmlFiles.length} pages satisfy CSP, referrer, navigation, and script rules.`;
    console.log(message);
    await appendStepSummary(`### HTML security\n\n${message}`);
  }
} catch (error) {
  console.error(`HTML security check failed: ${error.message}`);
  process.exitCode = 1;
}
