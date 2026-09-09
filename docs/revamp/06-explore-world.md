# Explore World

Robot mode is a fixed-camera, top-down exhibition for V1. It is an alternate presentation of shared content, not a separate game or portfolio.

## World Map

```text
                  CONTACT
                     |
WRITING -------- CROSSROADS -------- EXPERIENCE
                     |
                   START
                     |
              SELECTED WORK
              /     |     \
         MERCURY  PYDORKY  STREAMING
                     |
                   ABOUT
```

Writing station is omitted until at least one entry has approved public copy. SolarWise can occupy the fourth project plinth without widening the main route.

## Configuration

`worldConfig.ts` owns every station:

```ts
type WorldStationConfig = {
  id: string;
  kind: 'project' | 'experience' | 'writing' | 'about' | 'contact';
  contentId: string;
  position: { x: number; z: number };
  promptRadius: number;
  interactionRadius: number;
};
```

Configuration tests enforce unique IDs, valid content references, world bounds, radius ordering, station spacing, and reachable path structure.

## Rendering Contract

`ExploreWorld` owns one canvas inside `[data-world-canvas]`. Station signs, HUD, prompts, and interaction panels are DOM. No station mounts Spline or another canvas.

The world is an unframed viewport, not a card. Use charcoal, warm white, neutral grey, and the existing green only for active interaction. Short signs use Doto; all long copy uses Noto Sans.

## V2 Deferred

Follow camera, head/body lag, idle character animation, sound, minimap, and environmental Easter eggs follow only after V1 control, accessibility, and performance gates pass.
