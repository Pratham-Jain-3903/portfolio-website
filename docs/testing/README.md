# Testing

Testing pyramid intentionally small rakha gaya hai:

1. pure unit tests for data, routing, movement, geometry, and proximity
2. Testing Library behavior tests for client components
3. Chromium desktop and mobile Playwright tests for App Router, focus, touch, and canvas integration
4. axe scans plus manual accessibility checks
5. diagnostic visual and performance baselines after deterministic setup

## Guides

- [Test plan](test-plan.md)
- [Unit tests](unit.md)
- [Component tests](component.md)
- [Integration tests](integration.md)
- [End-to-end tests](e2e.md)
- [Visual tests](visual.md)
- [Accessibility tests](accessibility.md)
- [Performance tests](performance.md)
- [Analytics API tests](api.md)
- [Fixtures and mocks](fixtures.md)

Canonical product acceptance lives in [Definition of done](../revamp/13-verification.md).

## Pull Request Gates

[`ci.yml`](../../.github/workflows/ci.yml) runs independent TypeScript, maintained-documentation, local-link, and unit-coverage checks before the production Chromium job. Source ESLint joins this gate after the planned Next.js and `eslint-config-next` dependency alignment.
