# `@sichentao/design-tokens`

Production-derived foundations for the v2 site. Import `@sichentao/design-tokens/css` once at the application root and set `data-theme="tohoku|toyama|usst"` on `<html>`.

The package keeps the current `sichen-homepage-theme` storage key and institution theme names. It owns visual values only; applications own persistence and user preference logic.

The numeric breakpoint map is exported from TypeScript because CSS custom properties cannot be used in media-query conditions.
