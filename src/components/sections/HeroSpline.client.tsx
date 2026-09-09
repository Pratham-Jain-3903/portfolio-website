'use client';

import { useEffect, useRef } from 'react';
import { Application } from '@splinetool/runtime';

const heroScene = 'https://prod.spline.design/RYL-GG3FKx6g5eEK/scene.splinecode';

export default function HeroSpline() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let app: Application | null = null;
    let mounted = true;
    // Decorative hero — must never crash the page if Spline fails (the `position` onFrame flood).
    (async () => {
      try {
        app = new Application(canvas);
        await app.load(heroScene);
        if (!mounted) app.dispose?.();
      } catch (error) {
        console.error('[HeroSpline] Failed to load scene:', error);
      }
    })();
    return () => {
      mounted = false;
      try {
        app?.dispose?.();
      } catch {
        // ignore
      }
    };
  }, []);

  return (
    <div className="absolute inset-0 z-10" aria-hidden="true">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}