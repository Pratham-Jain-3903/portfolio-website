import React from 'react';

type Props = React.PropsWithChildren<{ title?: string; subtitle?: string }>

const SectionHeading = ({ title, subtitle, children }: Props) => {
  return (
    <div className="mb-4">
      {title && <h2 className="text-2xl font-bold">{title}</h2>}
      {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      {children}
    </div>
  );
};

export default SectionHeading;
