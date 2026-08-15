#!/usr/bin/env node

import {
  absolutePath,
  appendStepSummary,
  asPositiveInteger,
  loadJson,
  parseArgs,
  printFailures,
  requireHttpsUrl,
} from "./_lib.mjs";

const args = parseArgs(process.argv.slice(2));
const manifestFile = absolutePath(args.manifest, "content/freshness.json");
const policyFile = absolutePath(
  args.policy,
  "tests/baseline/freshness-policy.json",
);
const now = args.now ? new Date(String(args.now)) : new Date();

function validInstant(date) {
  return date instanceof Date && Number.isFinite(date.getTime());
}

try {
  if (!validInstant(now))
    throw new Error("--now must be an ISO-8601 timestamp");
  const [manifest, policy] = await Promise.all([
    loadJson(manifestFile),
    loadJson(policyFile),
  ]);
  if (manifest.version !== 1)
    throw new Error(`${manifestFile}: version must equal 1`);
  if (policy.version !== 1)
    throw new Error(`${policyFile}: version must equal 1`);
  if (!Array.isArray(manifest.datasets))
    throw new Error(`${manifestFile}: datasets must be an array`);
  if (!Array.isArray(policy.datasets) || policy.datasets.length === 0)
    throw new Error(`${policyFile}: datasets must be a non-empty array`);

  const records = new Map();
  for (const record of manifest.datasets) {
    if (
      !record ||
      typeof record !== "object" ||
      typeof record.id !== "string" ||
      !record.id.trim()
    ) {
      throw new Error(`${manifestFile}: every dataset requires a non-empty id`);
    }
    if (records.has(record.id))
      throw new Error(`${manifestFile}: duplicate dataset id ${record.id}`);
    records.set(record.id, record);
  }

  const failures = [];
  const results = [];
  const policyIds = new Set();
  for (const rule of policy.datasets) {
    if (!rule || typeof rule.id !== "string" || !rule.id.trim())
      throw new Error(`${policyFile}: every policy requires an id`);
    if (policyIds.has(rule.id))
      throw new Error(`${policyFile}: duplicate dataset id ${rule.id}`);
    policyIds.add(rule.id);
    if (rule.maximumAgeHours === undefined) {
      throw new Error(`${rule.id}.maximumAgeHours is required`);
    }
    const maximumAgeHours = asPositiveInteger(
      rule.maximumAgeHours,
      1,
      `${rule.id}.maximumAgeHours`,
    );
    const minimumRecordCount = Number.parseInt(
      String(rule.minimumRecordCount ?? 0),
      10,
    );
    if (!Number.isSafeInteger(minimumRecordCount) || minimumRecordCount < 0) {
      throw new Error(
        `${rule.id}.minimumRecordCount must be a non-negative integer`,
      );
    }

    const record = records.get(rule.id);
    if (!record) {
      failures.push(`${rule.id}: required freshness record is missing`);
      continue;
    }
    if (typeof record.label !== "string" || !record.label.trim())
      failures.push(`${rule.id}: label is required`);
    if (
      !Number.isSafeInteger(record.recordCount) ||
      record.recordCount < minimumRecordCount
    ) {
      failures.push(
        `${rule.id}: recordCount ${record.recordCount} is below required ${minimumRecordCount}`,
      );
    }
    if (!Array.isArray(record.sourceUrls) || record.sourceUrls.length === 0) {
      failures.push(
        `${rule.id}: at least one authoritative source URL is required`,
      );
    } else {
      for (const [index, url] of record.sourceUrls.entries()) {
        try {
          requireHttpsUrl(url, `${rule.id}.sourceUrls[${index}]`);
        } catch (error) {
          failures.push(error.message);
        }
      }
    }

    const refreshed = new Date(record.lastSuccessfulRefresh);
    if (
      !validInstant(refreshed) ||
      !/[zZ]|[+-]\d{2}:\d{2}$/u.test(String(record.lastSuccessfulRefresh))
    ) {
      failures.push(
        `${rule.id}: lastSuccessfulRefresh must be ISO-8601 with a timezone`,
      );
      continue;
    }
    const ageHours = (now.getTime() - refreshed.getTime()) / 3_600_000;
    if (ageHours < -0.25)
      failures.push(
        `${rule.id}: lastSuccessfulRefresh is ${Math.abs(ageHours).toFixed(1)} hours in the future`,
      );
    if (ageHours > maximumAgeHours) {
      failures.push(
        `${rule.id}: ${ageHours.toFixed(1)} hours old; budget is ${maximumAgeHours} hours`,
      );
    }
    results.push({
      id: rule.id,
      ageHours,
      maximumAgeHours,
      recordCount: record.recordCount,
    });
  }

  if (failures.length > 0) {
    printFailures("Freshness violations", failures);
    process.exitCode = 1;
  } else {
    console.log(`Freshness passed at ${now.toISOString()}:`);
    for (const result of results) {
      console.log(
        `- ${result.id}: ${result.ageHours.toFixed(1)}h / ${result.maximumAgeHours}h; ${result.recordCount} records`,
      );
    }
    const rows = results
      .map(
        (result) =>
          `| ${result.id} | ${result.ageHours.toFixed(1)} h | ${result.maximumAgeHours} h | ${result.recordCount} |`,
      )
      .join("\n");
    await appendStepSummary(
      `### Content freshness\n\n| Dataset | Age | Budget | Records |\n|---|---:|---:|---:|\n${rows}`,
    );
  }
} catch (error) {
  console.error(`Freshness check failed: ${error.message}`);
  process.exitCode = 1;
}
