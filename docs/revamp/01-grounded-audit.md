# Grounded Repository Audit

Audit date: 2026-09-06.

## Verified In Repository

- Next.js `15.2.8`, React and React DOM `18.3.1`, Tailwind `3.4.1`.
- `@splinetool/react-spline` `4.1.0` and `@splinetool/runtime` are installed.
- Next Themes is configured with class-based dark mode and a dark default.
- There is no application state library and no test runner or CI workflow.
- [`src/app/page.tsx`](../../src/app/page.tsx) is a client component coordinating a three-column bento grid, content filters, feedback, and a project detail sidebar.
- [`src/components/sections/HeroSection.tsx`](../../src/components/sections/HeroSection.tsx) eagerly renders scene `https://prod.spline.design/RYL-GG3FKx6g5eEK/scene.splinecode` above a 17-image carousel.
- Hero images rotate every five seconds with a one-second opacity transition. Only the first image has priority.
- Doto is loaded through a CSS `@import` in [`src/app/globals.css`](../../src/app/globals.css).
- Portfolio content is embedded inside section components. No `src/data` directory exists.
- [`src/components/sections/Projects.tsx`](../../src/components/sections/Projects.tsx) contains 12 project records.
- URL state currently uses `?detail=` and direct `window.history.replaceState` inside [`DetailSidebar.tsx`](../../src/components/common/DetailSidebar.tsx).
- Analytics uses Neon/PostgreSQL through [`src/lib/db.ts`](../../src/lib/db.ts), not JSON files.
- [`next.config.ts`](../../next.config.ts) ignores TypeScript and ESLint errors during builds.
- [`src/types/spline-react.d.ts`](../../src/types/spline-react.d.ts) types the Spline application as `unknown` and omits supported component props.

## Compatibility Debt

Official Next.js 15 upgrade guidance states that React 19 is the minimum. The current App Router project uses React 18. `react-day-picker@8.10.1` also constrains React compatibility, so framework alignment must be an isolated dependency change with build validation.

`eslint-config-next@16.1.3` is not aligned with Next `15.2.8`. CI cannot treat the current build as a type or lint quality gate.

## Local Design Evidence

The saved [`inspirations/Buro _ Mobbin.html`](../../inspirations/B%C3%BCro%20_%20Mobbin.html) artifact is a Mobbin detail page, not the original Buro source. Useful evidenced patterns are restrained editorial headings, neutral surfaces, unframed identity sections, responsive gutters, a compact underline menu, and stable media dimensions. Mobbin recommendation-card styling is not a portfolio requirement.

Target rhythm:

- 20px mobile gutter, 24px around 720px, 32px around 1280px
- 64px to 80px major vertical spacing
- 32/36px mobile to 44/44px desktop section headings
- body copy around 16/24px and intro measure around 35ch
- 150ms control state transitions

## Official Sources

- [Spline React API](https://github.com/splinetool/react-spline): `onLoad`, `findObjectByName`, `findObjectById`, `emitEvent`, `setZoom`, and `renderOnDemand`.
- [Next.js 15 page props](https://nextjs.org/docs/15/app/api-reference/file-conventions/page): `searchParams` is asynchronous.
- [Next.js 15 useSearchParams](https://nextjs.org/docs/15/app/api-reference/functions/use-search-params): client-only and read-only; static routes need a nearby Suspense boundary.
- [Next.js 15 useRouter](https://nextjs.org/docs/15/app/api-reference/functions/use-router): `push` creates history; `replace` does not; both accept `scroll: false`.
- [Next.js lazy loading](https://nextjs.org/docs/app/guides/lazy-loading): `ssr: false` is valid only inside a Client Component.
- [Next.js Vitest guide](https://nextjs.org/docs/app/guides/testing/vitest): use Vitest for synchronous components and pure code; use E2E for async Server Components.
- [Playwright web server](https://playwright.dev/docs/test-webserver), [visual comparisons](https://playwright.dev/docs/test-snapshots), and [accessibility testing](https://playwright.dev/docs/accessibility-testing).
- [Core Web Vitals](https://web.dev/articles/vitals): field targets are LCP <= 2.5s, INP <= 200ms, and CLS <= 0.1 at p75.

## To Validate

- Whether the robot has a single editable parent and stable Development Object ID.
- Whether the current scene supports the Spline Next.js placeholder export.
- Actual CPU/GPU cost of mounting hero and world canvases together.
- Current baseline build and screenshots; Node/npm are unavailable in the active Windows and WSL PATH.
