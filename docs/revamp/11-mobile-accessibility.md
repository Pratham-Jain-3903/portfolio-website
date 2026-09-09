# Mobile And Accessibility

## Fallback Order

Classic is the default for first visits, narrow screens, reduced motion, no WebGL, scene failures, and missing robot roots. Robot remains an explicit opt-in on mobile.

## Mobile Robot Controls

V1 uses visible directional buttons plus Interact, Reset, and Exit controls. A freeform joystick is deferred because discrete controls are easier to label, test, and operate without stealing page scroll.

Apply `touch-action: none` only inside the world interaction surface and controls. The rest of the page must remain normally scrollable. Controls have stable dimensions and at least 44 by 44 CSS pixel targets.

## Keyboard

- world controls activate only when the world has focus
- Escape always returns to Classic
- opening a panel locks movement
- closing restores focus to the interaction trigger or world
- hidden or blurred pages clear pressed keys

## Reduced Motion

Disable carousel crossfades, robot momentum, idle animation, camera motion, and animated panel travel. Content and mode switching remain fully available.

## Verification

Automated axe checks cover Classic, chooser, HUD, and open panel states. Manual checks cover keyboard-only use, screen-reader naming, focus order/restoration, 200% zoom, Windows high contrast, touch targets, and content equivalence.

See [Accessibility testing](../testing/accessibility.md).
