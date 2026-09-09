'use client';

import Spline from '@splinetool/react-spline';

const heroScene = 'https://prod.spline.design/RYL-GG3FKx6g5eEK/scene.splinecode';

export default function HeroSpline() {
  return (
    <div className="absolute inset-0 z-10" aria-hidden="true">
      <Spline scene={heroScene} className="h-full w-full" />
    </div>
  );
}