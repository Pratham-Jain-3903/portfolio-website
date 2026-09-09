# Integration Tests

Integration tests combine pure controllers with rendered client behavior while external systems remain mocked.

## Scenarios

- parsed server query initializes the client shell to the same mode and station
- chooser action serializes query state and calls router navigation
- simulated robot position enters proximity, updates HUD, and opens the matching panel
- panel open clears active movement input and panel close restores world focus
- legacy project detail state resolves to the new station selector
- Spline adapter resolves Development Object ID first, then name, then emits a fallback state
- AnalyticsProvider records deliberate mode/station events and unload handling without throwing when transport fails

Use explicit fake clocks and rAF control for movement. Keep URL serialization tests in the pure layer and only verify component collaboration here.
