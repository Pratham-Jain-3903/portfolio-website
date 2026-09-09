'use client';

import Spline from '@splinetool/react-spline/next';

const heroScene = 'https://prod.spline.design/RYL-GG3FKx6g5eEK/scene.splinecode';

export default function HeroSpline() {
  return (
    <div className="absolute inset-0 z-10" aria-hidden="true">
      <Spline
        scene={heroScene}
        className="h-full w-full"
        onLoad={(app) => {
          // Defensive: prod Spline + Turbopack can deliver a disposed/error app
          // that later throws `reading 'position'` on every onFrame.
          try {
            const anyApp = app as unknown as { _onFrame?: unknown };
            if (!anyApp || typeof anyApp._onFrame !== 'function') return;
          } catch {
            // swallow — hero is decorative; never break the page
          }
        }}
      />
    </div>
  );
}