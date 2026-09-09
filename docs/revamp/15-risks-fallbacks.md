# Risks And Fallbacks

| Risk | Early Signal | Response | Fallback |
| --- | --- | --- | --- |
| Robot meshes lack one parent | ID/name lookup moves only part of robot | Duplicate scene and group under RobotRoot | Custom Three.js world, Spline stays in hero |
| Scene is not editable | No stable Development Object ID | Use documented name lookup spike | Stop Spline world work if unstable |
| Hero and world overload GPU | High frame time or memory with both mounted | Keep one active Spline mount | Hero keeps photo and text without live robot in Robot mode |
| Remote scene fails | onLoad timeout or network error | Retry once and record diagnostic | Render Classic with optional retry |
| Query state causes poor caching | Dynamic home worsens field LCP | Measure direct-link traffic and caching | Move Robot to `/explore` route |
| Keyboard hijacks scrolling | Arrow keys move page outside world | Scope listeners to focused world | Disable keyboard controller until refocused |
| Touch controls block page | Pointer capture leaks outside world | Limit touch-action and pointer capture | Exit to Classic control remains visible |
| Content drifts between modes | Different project metrics or links | Shared selectors and parity tests | Robot panel renders Classic detail component |
| Visual tests are unstable | Live canvas, fonts, or carousel differ | Freeze motion, wait fonts, mask canvas | Keep canvas as smoke/manual check |
| Analytics requires database in UI tests | Requests fail without DATABASE_URL | Intercept analytics paths in Playwright | Disable analytics in test environment |

## Release Rule

Classic can ship independently. Robot mode remains behind explicit selection or a feature flag until the Spline spike and Robot checklist in [Definition of done](13-verification.md) pass.
