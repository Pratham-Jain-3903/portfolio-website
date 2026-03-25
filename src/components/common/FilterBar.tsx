"use client";

import { useState, useRef, useCallback, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Home, Briefcase, Code, Award, GraduationCap, Mail } from 'lucide-react';

export type FilterId = 'all' | 'experience' | 'projects' | 'recognition' | 'education' | 'contact';

interface FilterPill {
  id: FilterId;
  label: string;
  icon: React.ElementType;
  count?: number;
  sectionIds: string[]; // sections this filter shows
}

const filters: FilterPill[] = [
  { id: 'all', label: 'All', icon: Home, sectionIds: [] }, // empty means show all
  { id: 'experience', label: 'Experience', icon: Briefcase, count: 3, sectionIds: ['objective', 'experience', 'freelance-experience', 'volunteer-experience'] },
  { id: 'projects', label: 'Projects', icon: Code, count: 6, sectionIds: ['projects'] },
  { id: 'recognition', label: 'Recognition', icon: Award, count: 4, sectionIds: ['recommendations', 'certifications'] },
  { id: 'education', label: 'Education', icon: GraduationCap, sectionIds: ['education', 'skills'] },
  { id: 'contact', label: 'Contact', icon: Mail, sectionIds: ['contact-info'] },
];

interface FilterBarProps {
  activeFilter: FilterId;
  onFilterChange: (filter: FilterId) => void;
}

export default function FilterBar({ activeFilter, onFilterChange }: FilterBarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [focusedIndex, setFocusedIndex] = useState(0);

  // Fire analytics event
  const fireFilterEvent = useCallback((filterId: FilterId) => {
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'filter_changed',
        item_id: filterId,
        source: 'filter_bar',
      });
    }
  }, []);

  const handleFilterClick = (filter: FilterPill, index: number) => {
    setFocusedIndex(index);
    onFilterChange(filter.id);
    fireFilterEvent(filter.id);
  };

  // Keyboard navigation: arrow keys + enter/space
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const { key } = e;
    let newIndex = focusedIndex;

    if (key === 'ArrowRight' || key === 'ArrowDown') {
      e.preventDefault();
      newIndex = (focusedIndex + 1) % filters.length;
    } else if (key === 'ArrowLeft' || key === 'ArrowUp') {
      e.preventDefault();
      newIndex = (focusedIndex - 1 + filters.length) % filters.length;
    } else if (key === 'Enter' || key === ' ') {
      e.preventDefault();
      handleFilterClick(filters[focusedIndex], focusedIndex);
      return;
    } else if (key === 'Home') {
      e.preventDefault();
      newIndex = 0;
    } else if (key === 'End') {
      e.preventDefault();
      newIndex = filters.length - 1;
    }

    if (newIndex !== focusedIndex) {
      setFocusedIndex(newIndex);
      // Focus the button
      const buttons = containerRef.current?.querySelectorAll('button');
      buttons?.[newIndex]?.focus();
    }
  };

  return (
    <nav
      role="toolbar"
      aria-label="Content filter"
      className={cn(
        "fixed bottom-3 left-1/2 -translate-x-1/2 z-50",
        "md:bottom-3",
        "px-2 py-2 rounded-full",
        "bg-background/80 backdrop-blur-md border border-border/50 shadow-lg"
      )}
    >
      <div
        ref={containerRef}
        className="flex items-center gap-1 sm:gap-2"
        onKeyDown={handleKeyDown}
      >
        {filters.map((filter, index) => {
          const Icon = filter.icon;
          const isActive = activeFilter === filter.id;
          const showCount = filter.count && filter.count > 0;

          return (
            <button
              key={filter.id}
              onClick={() => handleFilterClick(filter, index)}
              aria-pressed={isActive}
              tabIndex={index === focusedIndex ? 0 : -1}
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 rounded-full transition-all duration-150",
                "text-sm font-medium whitespace-nowrap",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                isActive
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="hidden sm:inline">{filter.label}</span>
              {showCount && isActive && (
                <span className="hidden sm:inline text-xs opacity-80">
                  · {filter.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

// Export filter config for use in page
export { filters };
export type { FilterPill };
