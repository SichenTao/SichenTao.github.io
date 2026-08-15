import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { isIndexableHtml } from "../../scripts/finalize-dist.mjs";
import { isAllowedPublicFile } from "../../scripts/prepare-public.mjs";

const repositoryRoot = path.resolve(import.meta.dirname, "../..");
const scripts = path.join(repositoryRoot, "scripts/v2");

function run(script, argumentsList, cwd = repositoryRoot) {
  return spawnSync(
    process.execPath,
    [path.join(scripts, script), ...argumentsList],
    {
      cwd,
      encoding: "utf8",
    },
  );
}

async function temporaryDirectory(prefix) {
  return fs.mkdtemp(path.join(os.tmpdir(), `${prefix}-`));
}

async function write(filename, contents) {
  await fs.mkdir(path.dirname(filename), { recursive: true });
  await fs.writeFile(filename, contents, "utf8");
}

const secureHead = `
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; base-uri 'self'; object-src 'none'">
  <meta name="referrer" content="strict-origin-when-cross-origin">
`;

test("URL inventory requires legacy pages and rejects a forbidden release prefix", async (context) => {
  const fixture = await temporaryDirectory("url-inventory");
  context.after(() => fs.rm(fixture, { recursive: true, force: true }));
  await write(
    path.join(fixture, "dist/index.html"),
    "<!doctype html><html></html>",
  );
  await write(path.join(fixture, "inventory.txt"), "# comment\n/index.html\n");
  await write(path.join(fixture, "release.txt"), "/index.html\n");
  await write(path.join(fixture, "forbidden.txt"), "/quant-platform/\n");

  const baseArgs = [
    "--root",
    path.join(fixture, "dist"),
    "--mode",
    "release",
    "--inventory",
    path.join(fixture, "inventory.txt"),
    "--release-inventory",
    path.join(fixture, "release.txt"),
    "--forbidden",
    path.join(fixture, "forbidden.txt"),
  ];
  assert.equal(run("check-url-inventory.mjs", baseArgs).status, 0);
  await write(
    path.join(fixture, "dist/quant-platform/index.html"),
    "public quant",
  );
  assert.equal(run("check-url-inventory.mjs", baseArgs).status, 1);
});

test("link checker resolves files and fragments and fails a broken target", async (context) => {
  const fixture = await temporaryDirectory("link-check");
  context.after(() => fs.rm(fixture, { recursive: true, force: true }));
  await write(
    path.join(fixture, "index.html"),
    '<a href="/about/#team">Team</a>',
  );
  await write(
    path.join(fixture, "about/index.html"),
    '<section id="team">Team</section>',
  );
  assert.equal(run("check-links.mjs", ["--root", fixture]).status, 0);
  await write(
    path.join(fixture, "index.html"),
    '<a href="/missing.html">Missing</a>',
  );
  assert.equal(run("check-links.mjs", ["--root", fixture]).status, 1);
});

test("secret checker permits placeholders and blocks a credential-shaped token", async (context) => {
  const fixture = await temporaryDirectory("secret-check");
  context.after(() => fs.rm(fixture, { recursive: true, force: true }));
  await write(
    path.join(fixture, "example.txt"),
    "STRIPE_SECRET_KEY=REPLACE_ME",
  );
  assert.equal(run("check-secrets.mjs", ["--root", fixture]).status, 0);
  await write(
    path.join(fixture, "leak.txt"),
    `key=${"sk_test_"}${"a".repeat(24)}`,
  );
  assert.equal(run("check-secrets.mjs", ["--root", fixture]).status, 1);
});

test("Quant checker rejects both a public path and legacy browser-token code", async (context) => {
  const fixture = await temporaryDirectory("quant-check");
  context.after(() => fs.rm(fixture, { recursive: true, force: true }));
  await write(path.join(fixture, "index.html"), "public site");
  assert.equal(run("check-quant-artifacts.mjs", ["--root", fixture]).status, 0);
  await write(
    path.join(fixture, "quant-platform/app.js"),
    'headers["X-Fin-Quant-Token"] = token;',
  );
  assert.equal(run("check-quant-artifacts.mjs", ["--root", fixture]).status, 1);
});

test("freshness checker separates policy from observed status and rejects stale data", async (context) => {
  const fixture = await temporaryDirectory("freshness-check");
  context.after(() => fs.rm(fixture, { recursive: true, force: true }));
  const policy = {
    version: 1,
    datasets: [{ id: "sample", maximumAgeHours: 24, minimumRecordCount: 2 }],
  };
  const manifest = {
    version: 1,
    datasets: [
      {
        id: "sample",
        label: "Sample",
        lastSuccessfulRefresh: "2026-08-15T00:00:00Z",
        recordCount: 2,
        sourceUrls: ["https://example.com/source"],
      },
    ],
  };
  await write(path.join(fixture, "policy.json"), JSON.stringify(policy));
  await write(path.join(fixture, "manifest.json"), JSON.stringify(manifest));
  const baseArgs = [
    "--policy",
    path.join(fixture, "policy.json"),
    "--manifest",
    path.join(fixture, "manifest.json"),
  ];
  assert.equal(
    run("check-freshness.mjs", [...baseArgs, "--now", "2026-08-15T12:00:00Z"])
      .status,
    0,
  );
  assert.equal(
    run("check-freshness.mjs", [...baseArgs, "--now", "2026-08-17T12:00:00Z"])
      .status,
    1,
  );
});

test("HTML and dist gates accept a minimal secure site and reject source metadata", async (context) => {
  const fixture = await temporaryDirectory("dist-check");
  context.after(() => fs.rm(fixture, { recursive: true, force: true }));
  const html = `<!doctype html><html><head>${secureHead}</head><body><main>OK</main></body></html>`;
  await write(path.join(fixture, "index.html"), html);
  await write(path.join(fixture, "404.html"), html);
  await write(
    path.join(fixture, "robots.txt"),
    "User-agent: *\nSitemap: https://example.com/sitemap.xml\n",
  );
  await write(
    path.join(fixture, "sitemap.xml"),
    '<?xml version="1.0"?><urlset></urlset>',
  );
  assert.equal(run("check-html-security.mjs", ["--root", fixture]).status, 0);
  assert.equal(run("check-dist-boundary.mjs", ["--root", fixture]).status, 0);
  assert.equal(isAllowedPublicFile("assets/avatar.png"), true);
  assert.equal(isAllowedPublicFile("assets/profile.tex"), false);
  assert.equal(isAllowedPublicFile("assets/generator.py"), false);
  assert.equal(
    isAllowedPublicFile("assets/docs/research_collaborators_directory.md"),
    false,
  );
  assert.equal(
    isIndexableHtml("/account/", '<meta name="robots" content="noindex">'),
    false,
  );
  assert.equal(isIndexableHtml("/docs/404.html", "<main>404</main>"), false);
  assert.equal(
    isIndexableHtml("/private/", "<main>Private</main>", ["/private/"]),
    false,
  );
  assert.equal(isIndexableHtml("/public/", "<main>Public</main>"), true);
  await write(path.join(fixture, "assets/app.js.map"), "{}");
  assert.equal(run("check-dist-boundary.mjs", ["--root", fixture]).status, 1);
  await fs.rm(path.join(fixture, "assets/app.js.map"));
  await write(path.join(fixture, "assets/generator.py"), "print('source')");
  assert.equal(run("check-dist-boundary.mjs", ["--root", fixture]).status, 1);
  await fs.rm(path.join(fixture, "assets/generator.py"));
  await write(
    path.join(fixture, "sitemap-index.xml"),
    '<?xml version="1.0"?><sitemapindex></sitemapindex>',
  );
  assert.equal(run("check-dist-boundary.mjs", ["--root", fixture]).status, 1);
});

test("account client, Edge functions, and seeded plans share one contract", async () => {
  const [account, accountPage, seed, checkoutFunction, portalFunction] =
    await Promise.all(
      [
        "src/scripts/account.ts",
        "src/pages/account/index.astro",
        "supabase/seed.sql",
        "supabase/functions/create-checkout/index.ts",
        "supabase/functions/customer-portal/index.ts",
      ].map((filename) =>
        fs.readFile(path.join(repositoryRoot, filename), "utf8"),
      ),
    );

  assert.match(
    account,
    /\.select\(\s*["']entitlement_key, expires_at["']\s*\)/,
    "account must query the entitlement fields exposed by the schema",
  );
  assert.match(
    account,
    /appendEntitlement\(\s*entitlement\.entitlement_key\s*,\s*entitlement\.expires_at\s*\)/,
    "account must render the entitlement fields it queried",
  );
  assert.match(
    account,
    /["']create-checkout["']\s*,\s*\{[\s\S]{0,800}?body:\s*\{[\s\S]{0,500}?application_slug:\s*["']youtube-learner["'][\s\S]{0,200}?plan_key:\s*planCode[\s\S]{0,200}?request_id:\s*crypto\.randomUUID\(\)[\s\S]{0,200}?success_path:\s*["']\/account\/["'][\s\S]{0,200}?cancel_path:\s*["']\/account\/["']/,
    "checkout body must use the Edge request contract",
  );
  assert.match(
    account,
    /checkout_url\?:\s*string[\s\S]{0,900}?data\?\.checkout_url[\s\S]{0,500}?window\.location\.assign\(data\.checkout_url\)/,
    "checkout must consume checkout_url from the Edge response",
  );
  assert.match(
    account,
    /["']customer-portal["']\s*,\s*\{[\s\S]{0,500}?body:\s*\{[\s\S]{0,300}?application_slug:\s*["']youtube-learner["'][\s\S]{0,200}?return_path:\s*["']\/account\/["']/,
    "portal body must include its application and safe return path",
  );
  assert.match(
    account,
    /portal_url\?:\s*string[\s\S]{0,700}?data\?\.portal_url[\s\S]{0,500}?window\.location\.assign\(data\.portal_url\)/,
    "portal must consume portal_url from the Edge response",
  );

  for (const field of [
    "application_slug",
    "plan_key",
    "request_id",
    "success_path",
    "cancel_path",
  ]) {
    assert.match(
      checkoutFunction,
      new RegExp(`\\b${field}\\??:\\s*unknown\\b`),
      `create-checkout must declare ${field}`,
    );
  }
  assert.match(checkoutFunction, /checkout_url:\s*session\.url/);
  assert.match(portalFunction, /application_slug\?:\s*unknown/);
  assert.match(portalFunction, /return_path\?:\s*unknown/);
  assert.match(portalFunction, /portal_url:\s*portal\.url/);

  const pagePlanKeys = new Set(
    [...accountPage.matchAll(/\bdata-plan=["']([^"']+)["']/g)].map(
      ([, planKey]) => planKey,
    ),
  );
  assert.ok(pagePlanKeys.size > 0, "account page must expose checkout plans");

  const plansValues = seed.match(
    /insert into public\.plans\s*\([\s\S]*?\)\s*values([\s\S]*?)on conflict\s*\(application_id, plan_key\)/i,
  );
  assert.ok(plansValues, "seed must contain the plans insert block");
  const seededPlanKeys = new Set(
    [...plansValues[1].matchAll(/\(\s*'[^']+'\s*,\s*'[^']+'\s*,\s*'([^']+)'/g)]
      .map(([, planKey]) => planKey)
      .filter((planKey) => planKey !== "free"),
  );
  assert.ok(seededPlanKeys.size > 0, "seed must contain paid plans");
  assert.deepEqual(
    [...pagePlanKeys].sort(),
    [...seededPlanKeys].sort(),
    "Astro data-plan values must exactly match the seeded paid plan keys",
  );
});
