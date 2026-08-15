# `@sichentao/product-patterns`

Reusable product-level compositions built on `@sichentao/ui`:

- shared shell and width modes;
- async boundary with explicit loading, ready, empty, error, stale, and paywalled views;
- dataset filter bar, ledger, and resource card;
- freshness notice with machine-readable timestamps;
- free/premium entitlement gate;
- long-form reader with the current 760 px main column and 340 px rail.

The TypeScript functions resolve state and emit semantic attributes. They do not fetch data, decide prices, or trust client-side entitlement state as authorization.
