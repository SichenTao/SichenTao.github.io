# Security Policy

## Supported version

Security fixes are applied to the current production release on `main`. Archived v1 files are retained only as a recovery reference and do not receive fixes.

## Reporting a vulnerability

Do not publish credentials, personal data, payment details, exploit code, or a working attack path in a public issue.

1. Open the repository's **Security** tab and use **Report a vulnerability** when private vulnerability reporting is available.
2. Include the affected URL or component, reproduction steps, impact, and the minimum evidence needed to verify the report.
3. If private reporting is unavailable, contact the repository owner through the GitHub profile first and wait for a private channel before sending sensitive details.

The owner will acknowledge a private report, assess severity, contain active exposure, and coordinate a fix. Public disclosure should wait until affected credentials are rotated, production is patched, and users have been notified when required.

## Security boundary

The GitHub Pages artifact contains public, static content only. Quant Platform, service-role keys, Stripe secrets, private learning assets, user records, and production environment files are prohibited from `dist/` and from Git history.
