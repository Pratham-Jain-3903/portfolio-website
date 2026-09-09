# Test Plan

## Initial Tooling

- Vitest with V8 coverage
- React Testing Library, DOM Testing Library, jest-dom, and user-event
- jsdom for synchronous Client Components
- Playwright Test for App Router and real browser behavior
- `@axe-core/playwright` for automated WCAG checks
- markdownlint-cli2 and markdown-link-check for local documentation

MSW, Vitest Browser Mode, Lighthouse CI, visual SaaS, and a blocking Firefox/WebKit matrix are deferred until a concrete need appears.

## Initial CI Gates

- lint and TypeScript run independently because Next build currently ignores their failures
- 70% lines/functions/statements and 60% branches for new `src/data` and `src/lib/explore`
- named behavior tests for chooser, routing, panel focus, and reduced motion
- Chromium desktop and mobile critical paths
- zero serious or critical automated WCAG A/AA violations
- Markdown lint and repository-local link validation

Coverage is ratcheted after stable modules exist. Exact LCP, FPS, all-browser, and live-canvas screenshot gates are not blocking until a production baseline is recorded.

## Test Isolation

Portfolio E2E tests intercept `/api/analytics/**` so they do not need `DATABASE_URL`. Analytics route tests call exported handlers directly and mock `@/lib/db`.

Spline behavior is split: pure transforms and adapters are automated; the opaque remote scene receives a nonblank canvas smoke check and a manual RobotRoot transform gate.
