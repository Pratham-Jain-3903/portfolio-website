# Performance

## Principles

- Classic content is usable before Spline loads.
- Robot mode is loaded only after explicit selection.
- Robot mode has one active WebGL canvas.
- Fixed dimensions prevent layout shifts while media loads.
- Performance claims require measurement; CSS visibility is not proof of paused rendering.

## Hero Budget

Render only the current and next carousel image. Pause the timer when the hero is outside the viewport or the document is hidden. Keep only the initial image as `priority` and give every image an accurate `sizes` value.

Move Doto from CSS `@import` to `next/font` or approved self-hosted files. Remove production-only debug UI.

## World Budget

Load the world bundle from a Client Component after Robot selection. Cap incoming frame delta and avoid allocations in the animation loop. If simultaneous hero and world canvases produce unacceptable CPU, GPU, memory, or frame time, unmount the hero Spline layer while Robot mode is active.

## Measurement

Establish a production build baseline before enforcing regression thresholds. Record field Web Vitals through analytics:

- LCP <= 2.5 seconds at p75
- INP <= 200 milliseconds at p75
- CLS <= 0.1 at p75

Segment mobile and desktop. Lab checks diagnose regressions but do not substitute for field data. Remote Spline and rotating imagery must be frozen or mocked for repeatable CI measurements.

See [Performance testing](../testing/performance.md).
