# State And Routing

## URL Contract

| URL | Result |
| --- | --- |
| `/` | Classic |
| `/?mode=classic` | Classic |
| `/?mode=robot` | Robot world |
| `/?mode=robot&station=project-mercury` | Robot world with shareable station intent |
| `/?detail=project-mercury` | Legacy alias mapped to Classic station intent |

Invalid modes fall back to Classic. Malformed or unknown station IDs are ignored. `choose` is a visible section state, not a durable URL mode.

## Server Boundary

In Next.js 15, the page receives `searchParams` as a Promise. The Server page awaits it once and calls `parsePortfolioQuery`. It passes `initialMode` and `initialStation` to `PortfolioShell.client.tsx`.

Using page `searchParams` makes the route dynamic. This tradeoff is accepted initially to guarantee correct server output for direct mode links. A dedicated `/explore` route remains an optimization option if field data shows a material caching or LCP cost.

## Client Navigation

Mode changes use `router.push(url, { scroll: false })`, creating meaningful Back/Forward history without jumping to the page top. Shareable station opens also use push. Closing a station uses browser Back when the panel was navigation-created; otherwise it serializes a URL without station state.

Animation state, pressed keys, robot position, and proximity never enter the URL. Context may coordinate these transient values but is not a second source of truth for mode or station.

The pure implementation starts at [`src/lib/explore/modes.ts`](../../src/lib/explore/modes.ts). See [Unit tests](../testing/unit.md) and [E2E tests](../testing/e2e.md).
