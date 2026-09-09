# Component Tests

Use React Testing Library for synchronous Client Components and accessible behavior. Async Server Components belong in Playwright.

## Hero

- EXPLORE control targets the chooser
- decorative background images have empty alternative text
- only current and next carousel images are mounted
- fake timers advance images and stop while offscreen or document-hidden
- reduced motion hides the control hint and removes animated transitions
- fixed loading container remains present before Spline resolves

## Chooser And Shell

- Classic and Robot controls expose selected state
- keyboard activation calls the navigation adapter with `scroll: false`
- mobile underline presentation keeps the same accessible roles
- invalid initial mode renders Classic
- Robot loading and failure states always expose Classic

## World UI

- HUD announces nearest station and available action
- panel open locks movement
- Escape and close restore focus
- Back-compatible URL close behavior is called correctly
- panel content is selected from shared data
- mobile directional controls handle pointer down/up and have stable labels

Mock Spline behind a narrow adapter. Do not test Three.js or Spline internals through jsdom.
