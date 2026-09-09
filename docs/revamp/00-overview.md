# Revamp Overview

## Product Rule

> Interaction portfolio ko memorable banaye, information access ko difficult nahi.

## Outcome

Existing hero identity retain hogi:

- current photo carousel
- `PRATHAM / JAIN` Doto display type
- current Spline scene
- dark overlay and composition

Hero ke baad visitor ko two presentations milengi, but content model one hi rahega:

- **Classic**: default, server-rendered, editorial, recruiter-friendly
- **Robot**: explicit opt-in, fixed-camera interactive exhibition

Absent ya invalid mode, mobile first visit, reduced motion, no WebGL, aur robot failure sab Classic par resolve honge.

## Information Architecture

```text
Navbar
Hero
Explore chooser
  Classic portfolio OR Robot world
Footer
```

Current bento coordination, content filters, feedback prompt, LinkedIn embed carousel, and project sidebar main experience se retire honge only after Classic parity is proven.

## V1 Boundaries

Included: shared content, Classic mode, URL state, hero optimization, robot-root spike, fixed-camera world, proximity, DOM detail panel, mobile direction controls, accessibility, analytics, and tests.

Deferred: follow camera, joystick, sound, minimap, car physics, per-frame analytics, and invented project or writing copy.

See [Architecture](02-architecture.md), [Delivery phases](03-delivery-phases.md), and [Definition of done](13-verification.md).
