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
const baseUrl = requireHttpsUrl(String(args["base-url"] ?? ""), "--base-url");
const routesFile = absolutePath(
  args.routes,
  "tests/baseline/smoke-routes.json",
);
const attempts = asPositiveInteger(args.attempts, 1, "--attempts");
const retryDelayMs = asPositiveInteger(
  args["retry-delay-ms"],
  2000,
  "--retry-delay-ms",
);
const timeoutMs = asPositiveInteger(args["timeout-ms"], 10000, "--timeout-ms");

const sleep = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

async function probe(spec) {
  const url = new URL(spec.path, baseUrl);
  url.searchParams.set("_smoke", Date.now().toString());
  let response;
  try {
    response = await fetch(url, {
      redirect: "follow",
      headers: {
        "cache-control": "no-cache",
        "user-agent": "SichenTao-release-smoke/2.0",
      },
      signal: AbortSignal.timeout(timeoutMs),
    });
  } catch (error) {
    return `${spec.path}: request failed (${error.message})`;
  }

  const expectedStatuses = Array.isArray(spec.status)
    ? spec.status
    : [spec.status];
  if (!expectedStatuses.includes(response.status)) {
    return `${spec.path}: expected HTTP ${expectedStatuses.join(" or ")}, received ${response.status} at ${response.url}`;
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (
    spec.contentType &&
    !contentType.toLowerCase().includes(String(spec.contentType).toLowerCase())
  ) {
    return `${spec.path}: expected content-type containing ${spec.contentType}, received ${contentType || "none"}`;
  }

  const body = await response.text();
  for (const marker of spec.mustContain ?? []) {
    if (!body.includes(marker))
      return `${spec.path}: response does not contain required marker ${JSON.stringify(marker)}`;
  }
  for (const marker of spec.mustNotContain ?? []) {
    if (body.includes(marker))
      return `${spec.path}: response contains forbidden marker ${JSON.stringify(marker)}`;
  }
  return null;
}

try {
  const manifest = await loadJson(routesFile);
  if (
    manifest.version !== 1 ||
    !Array.isArray(manifest.routes) ||
    manifest.routes.length === 0
  ) {
    throw new Error(
      `${routesFile}: expected version 1 with a non-empty routes array`,
    );
  }
  for (const spec of manifest.routes) {
    if (!spec.path?.startsWith("/") || spec.path.includes(".."))
      throw new Error(`unsafe smoke path: ${spec.path}`);
    if (!Number.isInteger(spec.status) && !Array.isArray(spec.status))
      throw new Error(`${spec.path}: status must be an integer or array`);
  }

  let failures = [];
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    console.log(`Smoke attempt ${attempt}/${attempts}: ${baseUrl.origin}`);
    failures = (await Promise.all(manifest.routes.map(probe))).filter(Boolean);
    if (failures.length === 0) break;
    if (attempt < attempts) {
      console.warn(
        `${failures.length} probes failed; retrying after ${retryDelayMs} ms.`,
      );
      await sleep(retryDelayMs);
    }
  }

  if (failures.length > 0) {
    printFailures("Production smoke failures", failures);
    process.exitCode = 1;
  } else {
    const message = `Smoke passed: ${manifest.routes.length} production routes verified at ${baseUrl.origin}.`;
    console.log(message);
    await appendStepSummary(`### Production smoke\n\n${message}`);
  }
} catch (error) {
  console.error(`Smoke test failed: ${error.message}`);
  process.exitCode = 1;
}
