# Accessibility Tests

## Automated

Use a shared `AxeBuilder` fixture configured for WCAG A and AA tags. Scan:

- default Classic page
- chooser controls
- Robot HUD after initialization
- interaction panel after opening

Initially block serious and critical violations. Record existing lower-impact findings and ratchet toward zero known violations instead of broad exclusions.

## Manual

- complete Classic journey using keyboard only
- enter, operate, and leave Robot mode without a pointer
- verify focus visibility and restoration
- verify screen-reader names and live prompt announcements
- test 200% zoom without overlap or clipped controls
- test Windows high contrast
- test reduced motion
- test touch targets and scrolling on a physical mobile device
- confirm every Robot content item exists in Classic

Automated axe results do not replace manual or inclusive testing.
