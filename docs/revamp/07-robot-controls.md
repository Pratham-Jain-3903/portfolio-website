# Robot Controls

## Input Contract

| Input | Action |
| --- | --- |
| W or Up | Move forward |
| S or Down | Reverse |
| A or Left | Rotate left |
| D or Right | Rotate right |
| Shift | Sprint |
| E or Enter | Interact |
| R | Reset |
| Escape | Return to Classic |

Keyboard input is active only while the world owns focus. Movement keys prevent page scrolling only in that scope. Key state clears on keyup, window blur, page visibility change, panel open, mode exit, and component unmount.

## Movement Model

Use a fixed simulation timestep with a capped incoming frame delta. State contains x/z position, heading, and scalar forward speed. Damping is time-based so 30Hz, 60Hz, and 120Hz produce materially equivalent movement.

```ts
speed += acceleration * input * dt;
speed *= Math.exp(-damping * dt);
heading += turnSpeed * turnInput * dt;
position.x += Math.sin(heading) * speed * dt;
position.z += Math.cos(heading) * speed * dt;
```

Clamp speed and world position. V1 collision uses circles and explicit bounds. No vehicle mass, wheels, suspension, or physics engine.

## Spline Spike

The editable world scene must group robot meshes under `RobotRoot`. Copy its Development Object ID from Spline. `onLoad` resolves by ID first and name second using documented APIs only.

The application adapter exposes only the methods required by the implementation. Do not depend on undocumented traversal methods such as `getAllObjects()`.

The spike passes when one root transform moves and rotates the full robot, reset is exact, keyup stops input, long-tab frame deltas do not launch the robot, and a missing root shows the Classic fallback. See [Risks and fallbacks](15-risks-fallbacks.md).
