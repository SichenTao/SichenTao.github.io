# Contributing

## Local verification

Use the repository-pinned Node.js and pnpm versions. Install with `pnpm install --frozen-lockfile`, then run the same gates used by pull requests:

```bash
pnpm lint
pnpm typecheck
pnpm typecheck:edge
pnpm test:design-system
pnpm test:unit
pnpm test:quality-tools
pnpm build
pnpm test:links
pnpm test:freshness
pnpm test:security
pnpm test:a11y
```

`dist/` is generated and must not be committed. GitHub Pages publishes only that directory.

## Change requirements

- Preserve documented legacy URLs or add a generated compatibility page.
- Add tests for changed behavior, including keyboard and failure states for interactive UI.
- Update the relevant content freshness record only after checking its declared sources.
- Keep credentials in deployment secret stores. Commit only documented placeholders in `.env.example`.
- Keep Quant Platform code and data outside the public artifact and public product workspace.

## Pull requests

Describe the user-visible change, evidence used, test result, accessibility impact, security impact, and rollback considerations. Production deployment starts only after all required checks pass and the product owner approves the change.
