# Delivery Phases

Har phase independently reviewable hoga. Content migration aur Spline spike parallel conceptually chal sakte hain, but experimental world code Classic ko block nahi karega.

| Phase | Deliverable | Risk | Gate |
| --- | --- | --- | --- |
| 0 | Baseline, dependency alignment, docs | Medium | Clean or recorded baseline |
| 1 | Test and CI foundation | Low | Unit and Chromium smoke tests |
| 2 | Shared content model | Low | Old UI parity and invariant tests |
| 3 | Classic editorial mode | Low | Server HTML and critical E2E |
| 4 | Chooser and URL routing | Medium | Back/Forward and invalid-query tests |
| 5 | Hero optimization and robot spike | High | Documented RobotRoot transform |
| 6 | Fixed-camera Explore World | Medium | Proximity, panel, and mobile controls |
| 7 | Analytics, accessibility, performance | Medium | Release checklist |

## First Execution Slice

1. Capture `npm ci`, typecheck, build, and screenshot baseline.
2. Align the Next/React/ESLint dependency family separately.
3. Land the modular documentation index and minimal test harness.
4. Implement pure mode query functions and their unit tests.
5. Extract project data without visual changes.

The current environment has no Node/npm on Windows or WSL PATH. Documentation and framework-independent source work can proceed, but executable JavaScript validation requires a configured Node 20+ environment.

## Removal Order

Do not delete the bento implementation during content extraction. Remove FilterBar, FeedbackWidget, SectionCard wrappers, LinkedIn embeds, and standalone resume cards only after Classic mode reaches content parity and critical tests pass.

Acceptance criteria are not repeated here. Use [Definition of done](13-verification.md).
