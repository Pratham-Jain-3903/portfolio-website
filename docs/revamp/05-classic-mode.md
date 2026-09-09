# Classic Mode

Classic is the default and canonical information experience. It must work before Spline loads, without WebGL, with JavaScript failures limited to optional controls, and under reduced motion.

## Structure

1. Intro and current role
2. Selected Work
3. Experience timeline
4. Full project index
5. Approved writing
6. Education and selected recognition
7. Contact and resume

## Visual Direction

Use the neutral editorial rhythm evidenced in the local Buro/Mobbin capture without copying its brand:

- unframed full-width sections with a constrained inner column
- 20px mobile, 24px tablet, and 32px desktop gutters
- 64px to 80px major section spacing
- 32/36px mobile to 44/44px desktop section headings
- intro copy no wider than about 35 characters
- Doto for short labels; Noto Sans for descriptions and technical detail
- no bento grid, nested cards, or decorative marketing hero below the retained hero

## Rendering

Content should be server-rendered. Interactive project expansion is optional; direct anchors and links cannot depend on expansion state. JSON-LD uses the same project and profile selectors as visible content.

Stable project anchors use `project-{project.id}`. A station query may focus and scroll to the matching Classic anchor after navigation, but the canonical URL omits UI query parameters.

## Accessibility

Heading order is semantic, links identify their destinations, and resume access is available from the header and contact section. The full Robot content set has an equivalent Classic representation.

See [Mobile and accessibility](11-mobile-accessibility.md) and [Component tests](../testing/component.md).
