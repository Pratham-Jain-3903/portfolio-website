# Visual Tests

Visual baselines use one pinned Chromium/Linux CI environment. Before capture:

- wait for fonts
- emulate reduced motion
- disable CSS transitions and animations
- freeze the carousel at a known image
- use fixed viewport and color scheme
- mask the live Spline canvas

Capture Classic desktop/mobile, chooser selected states, Robot HUD idle/prompt states, and open interaction panel.

Keep live canvas output out of pixel-perfect screenshots because remote scene loading, WebGL, and hardware rendering are nondeterministic. Test it separately with a nonblank pixel-variance smoke check and manual framing review.

Snapshot updates require intentional review and the same environment that generated the baseline.
