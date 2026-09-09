# Hero

## Preserve

- photo-led composition and dark overlay
- `PRATHAM / JAIN` Doto display
- current Spline robot scene
- role subtitle and general first-viewport hierarchy

## Change

- CTA becomes a down icon plus `EXPLORE` and scrolls to `#explore-chooser`
- a restrained WASD hint appears only for fine pointers without reduced motion
- Doto moves away from blocking CSS `@import`
- Spline receives a fixed-dimension loading state and typed `onLoad`
- the carousel mounts only the current and next image
- carousel timing pauses while the hero is offscreen or the document is hidden

Background images are decorative and use empty alt text. The first image is priority; subsequent images load on demand. The visual fallback preserves hero text and photography if Spline fails.

## Spline Loading

Test `@splinetool/react-spline/next` first because the official package supports a generated Next.js placeholder when exported accordingly. If the existing scene lacks that export, place `next/dynamic({ ssr: false })` inside a dedicated Client Component. Never declare `ssr: false` from the Server page.

Spline does not expose a documented general pause API in the reviewed React API. `renderOnDemand` and mount lifecycle must be measured rather than described as guaranteed pausing.

See [Performance](10-performance.md) and [Hero tests](../testing/component.md).
