"use client";

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Home, Briefcase, Code, Award, GraduationCap, Mail, Wrench } from 'lucide-react';

const sections = [
  { id: 'objective', label: 'Overview', icon: Home },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'projects', label: 'Projects', icon: Code },
  { id: 'skills', label: 'Skills', icon: Wrench },
  { id: 'recommendations', label: 'Recognition', icon: Award },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'contact-info', label: 'Contact', icon: Mail },
];

export default function SectionNavigation() {
  const [activeSection, setActiveSection] = useState<string>('objective');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.target) return;
          const id = entry.target.getAttribute('data-section') || entry.target.id;
          if (!id) return;
          if (entry.isIntersecting) setActiveSection(id);
        });
      },
      { threshold: 0.35 }
    );

    document.querySelectorAll('[data-section]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // call global tracker if present
    if ((window as any).trackNavigation) {
      (window as any).trackNavigation({ method: 'pill_click', to: id, timestamp: new Date().toISOString() });
    }
  };

  return (
    <nav className="sticky top-20 z-40 bg-background/60 backdrop-blur-md border-b border-border/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide py-3">
          {sections.map((s) => {
            const Icon = s.icon;
            const active = activeSection === s.id;
            return (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-150 whitespace-nowrap text-sm font-medium',
                  active ? 'bg-primary text-primary-foreground shadow-md' : 'bg-muted/40 text-muted-foreground hover:bg-muted/60 hover:shadow-sm'
                )}
                aria-current={active ? 'true' : undefined}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{s.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
