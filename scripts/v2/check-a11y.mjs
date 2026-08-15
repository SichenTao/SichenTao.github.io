#!/usr/bin/env node

import fs from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import {
  absolutePath,
  appendStepSummary,
  assertDirectory,
  firstExisting,
  loadJson,
  parseArgs,
  printFailures,
  routeCandidates,
} from "./_lib.mjs";

const args = parseArgs(process.argv.slice(2));
const root = absolutePath(args.root, "dist");
const routesFile = absolutePath(args.routes, "tests/baseline/a11y-routes.json");

const contentTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".ico", "image/x-icon"],
  [".jpeg", "image/jpeg"],
  [".jpg", "image/jpeg"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".png", "image/png"],
  [".svg", "image/svg+xml"],
  [".webp", "image/webp"],
  [".xml", "application/xml; charset=utf-8"],
]);

async function startServer() {
  const server = http.createServer(async (request, response) => {
    try {
      const url = new URL(request.url ?? "/", "http://127.0.0.1");
      const target = await firstExisting(routeCandidates(root, url.pathname));
      if (!target) {
        const fallback = path.join(root, "404.html");
        response.writeHead(404, { "content-type": "text/html; charset=utf-8" });
        response.end(await fs.readFile(fallback));
        return;
      }
      response.writeHead(200, {
        "cache-control": "no-store",
        "content-type":
          contentTypes.get(path.extname(target).toLowerCase()) ??
          "application/octet-stream",
      });
      response.end(await fs.readFile(target));
    } catch (error) {
      response.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
      response.end(error.message);
    }
  });
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const address = server.address();
  if (!address || typeof address === "string")
    throw new Error("local accessibility server did not expose a TCP port");
  return { server, baseUrl: `http://127.0.0.1:${address.port}` };
}

async function checkUnauthenticatedAccountState(page, viewport, failures) {
  const expected = [
    ["#sign-in-card", true],
    ["#plan-card", true],
    ["#profile-card", false],
    ["#entitlement-card", false],
  ];
  for (const [selector, shouldBeVisible] of expected) {
    const element = page.locator(selector);
    const count = await element.count();
    if (count !== 1) {
      failures.push(
        `${viewport} /account/: expected one ${selector}, found ${count}`,
      );
      continue;
    }
    const isVisible = await element.isVisible();
    if (isVisible !== shouldBeVisible) {
      failures.push(
        `${viewport} /account/: ${selector} must be ${shouldBeVisible ? "visible" : "hidden"} without configured auth environment`,
      );
    }
  }
}

try {
  await assertDirectory(root, "accessibility artifact root");
  const config = await loadJson(routesFile);
  if (
    config.version !== 1 ||
    !Array.isArray(config.routes) ||
    config.routes.length === 0
  ) {
    throw new Error(
      `${routesFile}: expected version 1 with a non-empty routes array`,
    );
  }
  const viewports = config.viewports ?? [
    { name: "desktop", width: 1440, height: 900 },
  ];
  const { server, baseUrl } = await startServer();
  const browser = await chromium.launch({ headless: true });
  const failures = [];
  let scans = 0;

  try {
    for (const viewport of viewports) {
      const context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height },
        reducedMotion: "reduce",
      });
      const page = await context.newPage();
      for (const route of config.routes) {
        const pageErrors = [];
        const onPageError = (error) => pageErrors.push(error.message);
        page.on("pageerror", onPageError);
        const response = await page.goto(new URL(route, baseUrl).href, {
          waitUntil: "networkidle",
        });
        if (!response || !response.ok()) {
          failures.push(
            `${viewport.name} ${route}: HTTP ${response?.status() ?? "no response"}`,
          );
        } else {
          if (route === "/account/") {
            await checkUnauthenticatedAccountState(
              page,
              viewport.name,
              failures,
            );
          }
          const results = await new AxeBuilder({ page })
            .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
            .analyze();
          scans += 1;
          for (const violation of results.violations) {
            for (const node of violation.nodes.slice(0, 3)) {
              const target = node.target.join(", ");
              const reason = (node.failureSummary ?? violation.description)
                .replace(/\s+/gu, " ")
                .trim();
              const element = node.html.replace(/\s+/gu, " ").slice(0, 180);
              failures.push(
                `${viewport.name} ${route}: ${violation.id} (${violation.impact ?? "unknown"}) at ${target} ${element} - ${reason}`,
              );
            }
          }
        }
        for (const error of pageErrors)
          failures.push(`${viewport.name} ${route}: page error: ${error}`);
        page.off("pageerror", onPageError);
      }
      await context.close();
    }
  } finally {
    await browser.close();
    await new Promise((resolve, reject) =>
      server.close((error) => (error ? reject(error) : resolve())),
    );
  }

  if (failures.length > 0) {
    printFailures("Accessibility violations", failures);
    process.exitCode = 1;
  } else {
    const message = `Accessibility passed: ${scans} WCAG 2.2 AA-oriented axe scans completed with zero automated violations.`;
    console.log(message);
    await appendStepSummary(
      `### Accessibility\n\n${message}\n\nAutomated results do not replace keyboard, screen-reader, zoom, or cognitive usability review.`,
    );
  }
} catch (error) {
  console.error(`Accessibility check failed: ${error.message}`);
  process.exitCode = 1;
}
