# Definition Of Done

This is the canonical acceptance checklist. Other documents link here instead of copying it.

## Foundation

- [ ] Framework dependencies are mutually supported and lockfile is committed.
- [ ] Typecheck and production build pass, or unrelated baseline failures are recorded.
- [ ] Unit, Chromium desktop/mobile E2E, and accessibility commands run in CI.
- [ ] Modular docs pass Markdown lint and local link checks.

## Identity And Classic

- [ ] Existing hero scene, photography, Doto name treatment, and composition remain recognizable.
- [ ] `/` renders useful Classic content in server HTML.
- [ ] Selected Work, experience, resume, and contact are reachable without WebGL.
- [ ] Featured projects are Mercury, Pydorky, Financial Streaming Dashboard, and SolarWise.
- [ ] Incomplete writing copy is not rendered publicly.
- [ ] JSON-LD and visible content use the same selectors.

## Routing

- [ ] Classic and Robot URLs survive reload.
- [ ] Mode changes preserve scroll and create meaningful Back/Forward entries.
- [ ] Legacy `?detail=` links resolve without errors.
- [ ] Invalid query values fall back to Classic.
- [ ] Canonical metadata excludes interface state parameters.

## Robot

- [ ] RobotRoot resolves through documented ID or name lookup.
- [ ] W/A/S/D and arrows move consistently across frame rates.
- [ ] Shift, E/Enter, R, and Escape work.
- [ ] Key state clears on keyup, blur, visibility change, panel open, and mode exit.
- [ ] Missing root or scene failure shows a usable Classic fallback.
- [ ] World contains one active canvas and stations contain none.
- [ ] Proximity prompt, panel open/close, URL, focus, and movement lock stay synchronized.

## Mobile And Accessibility

- [ ] Mobile defaults to Classic and Robot is opt-in.
- [ ] Directional controls do not block scrolling outside the world.
- [ ] Reduced motion removes nonessential motion and momentum.
- [ ] All Robot content has a Classic equivalent.
- [ ] Automated scans have no serious or critical WCAG A/AA violations.
- [ ] Manual keyboard, focus, zoom, high-contrast, and screen-reader checks pass.

## Performance And Analytics

- [ ] Hero has fixed loading dimensions and no visible load shift.
- [ ] Carousel pauses offscreen and while the document is hidden.
- [ ] Robot bundle loads only after opt-in.
- [ ] Production performance baseline is recorded before strict CI budgets are enabled.
- [ ] Field LCP, INP, and CLS are measured separately for mobile and desktop.
- [ ] Analytics emits deliberate mode/station events without per-frame movement noise.
