import React from 'react';

const HeaderSection: React.FC = () => {
  return (
    <header className="text-center py-8 md:py-12">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary">
        Pratham Jain
      </h1>
      <p className="mt-2 text-xl md:text-2xl text-foreground/80">
        Data Engineer & Machine Learning Engineer
      </p>
    </header>
  );
};

export default HeaderSection;
