# Performance Tests

## Baseline First

Use a production build and repeat each measurement. Freeze or intercept remote media before comparing revisions. Record machine, browser, viewport, network profile, and sample count.

Track:

- initial and route-specific JavaScript bytes
- hero image and Spline request timing
- LCP and CLS before and after Spline load
- Robot world initialization time
- active canvas count and memory
- frame-time distribution during movement
- CPU activity after hero leaves the viewport

Official Core Web Vitals targets are field goals at p75: LCP <= 2.5s, INP <= 200ms, CLS <= 0.1. Lab CI data is diagnostic and should use a baseline-relative tolerance only after variance is understood.

Do not assert exact 60 FPS on shared CI hardware. Assert movement correctness independently, then evaluate frame-time percentiles on agreed hardware.
