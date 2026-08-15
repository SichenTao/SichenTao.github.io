# Design QA — Sichen Tao Web Product Family v2.0

## Comparison target

The visual source of truth is the v1.0 browser capture set at:

`/Users/taosichen/Documents/Codex/2026-08-15/improve-skill-users-taosichen-codex-skills/work/audit-baseline/screens/desktop/`

The rendered v2.0 implementation evidence is at:

- desktop: `/Users/taosichen/Documents/Codex/2026-08-15/improve-skill-users-taosichen-codex-skills/work/audit-v2/screens/desktop/`
- mobile: `/Users/taosichen/Documents/Codex/2026-08-15/improve-skill-users-taosichen-codex-skills/work/audit-v2/screens/mobile/`
- combined source/implementation comparisons: `/Users/taosichen/Documents/Codex/2026-08-15/improve-skill-users-taosichen-codex-skills/work/audit-v2/comparisons/`
- focused Account evidence: `/Users/taosichen/Documents/Codex/2026-08-15/improve-skill-users-taosichen-codex-skills/work/audit-v2/regions/`

The implementation was rendered from `http://127.0.0.1:4321/` with the in-app Browser against the current local `dist/` candidate.

## Normalization and state

| Evidence                  | Source pixels | Implementation pixels | CSS viewport | Density | State                                                                |
| ------------------------- | ------------: | --------------------: | -----------: | ------: | -------------------------------------------------------------------- |
| Desktop full view         |    1440 × 900 |            1440 × 900 |   1440 × 900 |      1× | English, Tohoku theme, public/unauthenticated                        |
| Desktop comparison canvas |    1440 × 900 |            1440 × 900 |   1440 × 900 |      1× | Two captures joined under a 56 px evidence header; output 2880 × 956 |
| Mobile full view          |           n/a |             390 × 844 |    390 × 844 |      1× | English, Tohoku theme, public/unauthenticated, collapsed menu        |
| Account menu state        |           n/a |             390 × 844 |    390 × 844 |      1× | Mobile menu open                                                     |

The v1 and v2 desktop captures use the same viewport, crop, theme, language, and public state. Follow Builders and JSPS contain intentional data changes from the verified 2026-08-15 refresh; their layout and component comparison therefore treats changed article, deadline, and count copy as product data, not visual drift.

## Full-view comparison evidence

The following combined images were opened and reviewed as source/v2 pairs:

1. `01-portal-home.png`
2. `02-academic-home.png`
3. `03-academic-publications.png`
4. `04-academic-frontier.png`
5. `05-follow-builders.png`
6. `06-youtube-learner.png`
7. `07-jsps-kakenhi.png`

Portal, Academic Homepage, Publications, Academic Frontier, Follow Builders, YouTube Learner, and JSPS preserve the v1 hierarchy, spacing system, typography, theme palette, controls, and responsive composition. The Portal adds the approved Account entry. Follow Builders changes from 25 to 26 tracked X accounts and displays the refreshed feed. JSPS changes program status and deadline content while retaining the original interface grammar.

## Focused region evidence

- `08-account-plans-desktop.png` verifies the free/monthly/annual plan hierarchy, labels, states, and card spacing.
- `08-account-zh-desktop.png` verifies Simplified Chinese copy and the same component geometry.
- `08-account-menu-open.png` verifies the 390 × 844 mobile navigation, selected Account state, unclipped right edge, and 44 px link height.
- `mobile-contact-sheet.png` verifies all eight representative routes at the same mobile viewport.

Focused evidence was required because the Account controls and mobile navigation are too small to judge reliably in the full-page desktop comparison.

## Required fidelity surfaces

### Fonts and typography

The implementation retains the existing display serif/body sans hierarchy, weights, line heights, and wrapping behavior. No visible font substitution, cramped heading, truncation, or hierarchy regression remains in the compared states. Account uses the same optical contrast as the existing product family.

### Spacing and layout rhythm

Desktop content widths, top navigation height, card radii, dividers, section gaps, and mobile stacking follow the v1 source. All eight mobile captures have `scrollWidth = 390`, so no horizontal overflow remains. Refreshed Follow Builders and JSPS copy wraps within existing card and timeline bounds.

### Colors and visual tokens

Tohoku, Toyama, and USST themes retain the production palette. Component `text-muted` uses the existing higher-contrast `ink-soft` token where small Toyama text needs WCAG AA contrast. Disabled, error, active, stale, and success states remain semantically distinct without introducing a new visual language.

### Image quality and asset fidelity

Existing portrait, institution logos, profile marks, favicons, and the shared icon sprite are reused. No target image or icon was replaced by emoji, CSS art, a handwritten SVG, or a placeholder asset. Captures show no visible stretching, haloing, masking, or compression regression.

### Copy and content

Static product copy remains concise and consistent across the family. Account clearly states that authentication is unconfigured and public content remains available. Current JSPS copy correctly marks Early-Career Scientists open and Research Activity Start-up Support closed. Current Follow Builders copy reflects the verified feed refresh. English, Simplified Chinese, and Japanese controls retain their existing terminology.

## Interaction and browser checks

- Top navigation, mobile menu, locale switch, and theme switch were exercised in the in-app Browser.
- Account switched to Simplified Chinese and Toyama, then returned to English/Tohoku.
- Follow Builders search reduced the feed to the `thsottiaux` result.
- JSPS search plus the `open` status filter returned Early-Career Scientists and excluded Research Activity Start-up Support; reset restored the initial state.
- Eight representative routes were checked at desktop and mobile widths with no browser console errors and no horizontal overflow.
- Automated accessibility evidence covers 8 routes × 2 viewports: 16 axe scans, zero WCAG 2.2 AA-oriented automated violations, and zero page script errors.

## Findings

No actionable P0, P1, or P2 visual findings remain in the captured public/unauthenticated states.

The authenticated Account profile, live entitlement, Stripe Checkout, customer portal, and webhook states require a configured Supabase/Stripe sandbox. They are an external activation and end-to-end test gap recorded in the engineering release plan; they are outside the available source visual state and are not represented as visually verified here.

## Comparison history

### Iteration 1 — Account hidden-state regression

- Earlier finding: **P1** — `.account-card { display: grid }` overrode the HTML `hidden` behavior, so empty profile and entitlement cards appeared for unauthenticated users.
- Fix: added `.account-card[hidden] { display: none }` and retained only sign-in and plan cards in the unconfigured state.
- Post-fix evidence: `screens/desktop/08-account.png`, `screens/mobile/08-account-closed.png`, and the Account state assertion in the accessibility gate.

### Iteration 2 — Mobile navigation clipping

- Earlier finding: **P1** — the last Account-navigation link was clipped at the right edge on the 390 px viewport, leaving only 21.2 px visible and failing the target-size rule.
- Fix: re-synchronized the shared menu after load, preserved the right-side scroll area, and enforced the 44 px mobile navigation link height.
- Post-fix evidence: `screens/mobile/08-account-menu-open.png`; all 16 accessibility scans subsequently passed with zero automated violations.

### Iteration 3 — Refreshed content regression check

- Earlier condition: Follow Builders and JSPS changed materially after their 2026-08-15 source refresh.
- Action: rebuilt the site, recaptured desktop/mobile states, regenerated the combined comparisons, and rechecked layout, wrapping, console output, search, and filtering.
- Post-fix evidence: updated `comparisons/05-follow-builders.png`, `comparisons/07-jsps-kakenhi.png`, `screens/mobile/05-follow-builders.png`, and `screens/mobile/07-jsps-kakenhi.png`. The changes are content-only; no P0/P1/P2 design regression was found.

## Follow-up polish

No P3 visual change is required for the candidate. Authenticated and paid states should receive a separate evidence capture after sandbox activation because their server-backed copy and error cases cannot be established from the current unconfigured state.

## Final result

final result: passed
