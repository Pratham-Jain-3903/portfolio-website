# Fixtures And Mocks

## Unit And Component

- minimal project and experience fixtures derived from shared TypeScript types
- `matchMedia` with configurable reduced-motion and pointer results
- controllable IntersectionObserver and ResizeObserver
- deterministic rAF clock
- `scrollIntoView` spy
- Next navigation adapter or hook mocks at the client boundary
- Spline adapter with position, rotation, ID/name lookup, and explicit load failure

## Playwright

- analytics route interception returning success
- fixed carousel state and local image responses for visual tests
- optional local Spline response for navigation tests
- axe fixture with shared WCAG tags and result attachments

Fixtures should contain only the fields needed by the scenario. Do not clone all production content into test files; import public selectors or use typed builders to avoid drift.
