import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SectionHeadingProps {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
}

export function SectionHeading({ icon: Icon, title, subtitle }: SectionHeadingProps) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 dark:from-emerald-500 dark:to-emerald-700">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">{title}</h2>
        {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
      </div>
    </div>
  );
}
