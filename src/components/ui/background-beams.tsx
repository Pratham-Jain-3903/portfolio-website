import React from 'react';

export const BackgroundBeams: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className = '' }) => {
  return (
    <div className={className} aria-hidden>
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-transparent pointer-events-none" />
    </div>
  );
};

export default BackgroundBeams;
