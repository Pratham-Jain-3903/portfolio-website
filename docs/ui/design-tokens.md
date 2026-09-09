# Design Tokens

## Typography

- Doto: name display, short section labels, world signs, and compact control hints
- Noto Sans: descriptions, metrics, experience, project detail, and controls
- letter spacing remains zero; do not copy the negative tracking from the inspiration page
- Classic section headings scale from about 32/36px to 44/44px
- body copy uses about 16/24px with readable line length

## Color Roles

Current dark theme values in [`src/app/globals.css`](../../src/app/globals.css):

| Role | HSL token |
| --- | --- |
| Background | `220 13% 10%` |
| Card/surface | `220 13% 13%` |
| Foreground | `210 17% 86%` |
| Border | `220 13% 20%` |
| Primary | `150 100% 35%` |
| Accent | `150 100% 45%` |

Robot mode reserves green for focus, proximity, active paths, and interaction. Neutral charcoal, warm white, and grey dominate the world. Classic mode can use the same roles in light or dark theme without becoming a one-hue interface.

## Spacing And Shape

- page gutters: 20px mobile, 24px tablet, 32px desktop
- major section rhythm: 64px to 80px
- world desktop minimum height: approximately 500px, then viewport-constrained
- repeated item and tool radii: 8px or less unless an existing primitive requires otherwise
- sections remain unframed; cards are limited to repeated items, dialogs, and real tools
- icon and direction controls use stable dimensions and at least 44px touch targets

## Motion

Use approximately 150ms for control states. Continuous and spatial motion must have reduced-motion alternatives. Fixed media dimensions prevent hover, loading, and dynamic content from shifting layout.
