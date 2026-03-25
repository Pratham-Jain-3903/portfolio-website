import React from 'react';

interface SectionCardProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionCard({ children, className = '' }: SectionCardProps) {
  return (
    <div
      className={`bg-card border border-border/50 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 ${className}`}
    >
      {children}
    </div>
  );
}
