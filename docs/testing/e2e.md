# End-To-End Tests

Use Playwright with desktop Chromium and one mobile Chromium profile on pull requests.

## Critical Paths

1. `/` contains server-rendered Classic identity, Selected Work, experience, and contact.
2. Hero EXPLORE scrolls to the chooser without a page jump or layout shift.
3. Selecting Robot updates the URL, loads the world, and browser Back returns to Classic.
4. Invalid mode and station values remain usable and resolve safely.
5. A Robot station deep link opens or focuses the intended content after world initialization.
6. Keyboard control works only while the world is focused; Escape returns to Classic.
7. Mobile defaults to Classic, supports Robot opt-in, and directional controls do not block scrolling outside the world.
8. Resume dialog and destination remain available.

Intercept analytics routes in shared fixtures. Use local or intercepted Spline assets where practical; remote network availability cannot decide core navigation test results.

Firefox and WebKit run on a scheduled or pre-release workflow after Chromium tests stabilize.

Local Windows runs use installed Chrome when `CI` is absent. CI installs Playwright's pinned Chromium build, creates the production Next.js build first, and lets Playwright manage `next start` on port 9002.
