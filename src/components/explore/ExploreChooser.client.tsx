'use client';

import { Bot, FileText } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { serializePortfolioQuery, type PortfolioMode } from '@/lib/explore/modes';

export default function ExploreChooser({ activeMode }: { activeMode: PortfolioMode }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const chooseMode = (mode: PortfolioMode) => {
    const query = serializePortfolioQuery({ mode, station: null }, searchParams.toString());
    router.push(`${pathname}?${query}`, { scroll: mode === 'robot' ? false : undefined });
  };

  return (
    <div className={`fixed left-1/2 z-50 -translate-x-1/2 ${activeMode === 'robot' ? 'top-24' : 'top-4'}`} role="group" aria-label="Portfolio view">
      <div className="flex items-center gap-1 border border-border bg-background/95 p-1 shadow-lg backdrop-blur">
        <button type="button" onClick={() => chooseMode('classic')} aria-pressed={activeMode === 'classic'} className={`inline-flex h-10 items-center gap-2 px-3 text-sm font-semibold transition-colors ${activeMode === 'classic' ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-muted'}`}>
          <FileText className="h-4 w-4" aria-hidden="true" />
          <span>Classic</span>
        </button>
        <button type="button" onClick={() => chooseMode('robot')} aria-pressed={activeMode === 'robot'} className={`inline-flex h-10 items-center gap-2 px-3 text-sm font-semibold transition-colors ${activeMode === 'robot' ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-muted'}`}>
          <Bot className="h-4 w-4" aria-hidden="true" />
          <span>Robot</span>
        </button>
      </div>
    </div>
  );
}