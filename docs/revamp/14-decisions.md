# Architecture Decisions

## ADR-001: Classic Is Default

**Decision:** No query renders Classic. Robot is explicit opt-in.

**Why:** Best server content, mobile ergonomics, accessibility, SEO, and failure resilience.

## ADR-002: One Content Model

**Decision:** Both modes consume `src/data` and shared selectors.

**Why:** Prevents copy drift and makes parity testable.

## ADR-003: Server Page, Small Client Shell

**Decision:** The page parses async search parameters on the server. A client shell owns mode transitions.

**Why:** Direct links render correctly while WebGL and navigation state remain isolated.

## ADR-004: Documented Spline APIs Only

**Decision:** Resolve RobotRoot by Development Object ID, then name. Do not depend on undocumented scene traversal.

**Why:** Reduces runtime-version coupling and makes failure explicit.

## ADR-005: Fixed-Camera V1

**Decision:** V1 uses a fixed top-down camera and discrete mobile controls.

**Why:** Delivers the core interaction with lower motion, accessibility, and test risk.

## ADR-006: Pure Movement, No Physics Engine

**Decision:** Use fixed-step acceleration, time-based damping, heading, bounds, and circle collision.

**Why:** Vehicle physics does not improve the portfolio goal and increases bundle and debugging cost.

## ADR-007: One Canvas Plus DOM

**Decision:** Spline renders the world; React DOM renders signs, text, HUD, and panels.

**Why:** Keeps long content semantic, accessible, responsive, and searchable.

## ADR-008: Small Test Stack First

**Decision:** Vitest, Testing Library, Chromium Playwright, and axe ship first.

**Why:** Covers pure logic and critical browser behavior without premature infrastructure.

## ADR-009: Static Data Uses TypeScript

**Decision:** Do not add runtime schema validation until content crosses a runtime boundary.

**Why:** Static trusted modules already receive compile-time checks; invariant tests cover domain rules.
