'use client';

import { useSearchParams } from 'next/navigation';

import ClassicPortfolio from '@/components/classic/ClassicPortfolio';
import ExploreChooser from '@/components/explore/ExploreChooser.client';
import RobotWorld from '@/components/explore/RobotWorld';
import { parsePortfolioQuery } from '@/lib/explore/modes';
import HeroSection from '@/components/sections/HeroSection';

export default function PortfolioShell() {
  const searchParams = useSearchParams();
  const query = parsePortfolioQuery(searchParams);

  return (
    <>
      <ExploreChooser activeMode={query.mode} />
      {query.mode === 'robot' && <RobotWorld />}
      {query.mode === 'classic' && <><HeroSection /><ClassicPortfolio /></>}
    </>
  );
}