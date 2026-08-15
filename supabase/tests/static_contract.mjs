import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const read = (path) => readFileSync(join(root, path), "utf8");

const core = read("migrations/202608150001_platform_core.sql");
const security = read("migrations/202608150002_platform_security.sql");
const billing = read("migrations/202608150003_platform_billing_rpc.sql");

const tables = [
  "profiles",
  "applications",
  "memberships",
  "consents",
  "audit_events",
  "billing_customers",
  "plans",
  "subscriptions",
  "entitlements",
  "webhook_events",
  "learning_items",
  "learning_progress",
  "bookmarks",
  "notes",
  "content_assets",
];

const failures = [];
const check = (condition, message) => {
  if (!condition) failures.push(message);
};

for (const table of tables) {
  check(
    core.includes(`create table public.${table} (`),
    `missing table: ${table}`,
  );
  check(
    security.includes(`alter table public.${table} enable row level security;`),
    `RLS not enabled: ${table}`,
  );
  check(
    security.includes(`alter table public.${table} force row level security;`),
    `RLS not forced: ${table}`,
  );
  check(
    security.includes(`${table}_service_all`),
    `service policy missing: ${table}`,
  );
}

for (const endpoint of [
  "create-checkout",
  "customer-portal",
  "stripe-webhook",
  "signed-content-url",
]) {
  const source = read(`functions/${endpoint}/index.ts`);
  check(source.includes("Deno.serve"), `handler missing: ${endpoint}`);
  check(
    source.includes("handleError"),
    `central error handling missing: ${endpoint}`,
  );
}

const webhook = read("functions/stripe-webhook/index.ts");
check(
  webhook.includes("constructEventAsync"),
  "Stripe signature verification missing",
);
check(
  webhook.includes("platform_claim_webhook_event"),
  "webhook idempotency claim missing",
);
check(
  billing.includes("provider_event_created_at"),
  "out-of-order Stripe event guard missing",
);
check(
  billing.includes("payload_sha256"),
  "webhook payload hash validation missing",
);
check(
  !/sk_(live|test)_[A-Za-z0-9]{12,}/.test(
    [...core, security, billing, webhook].join("\n"),
  ),
  "possible Stripe secret committed",
);

if (failures.length > 0) {
  console.error(failures.map((failure) => `FAIL: ${failure}`).join("\n"));
  process.exit(1);
}

console.log(
  `PASS: ${tables.length} tables, forced RLS, service boundaries, and 4 Edge Function contracts.`,
);
