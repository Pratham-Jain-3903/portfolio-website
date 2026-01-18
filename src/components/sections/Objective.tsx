import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target } from 'lucide-react';

const Objective: React.FC = () => {
  const objectiveStatement = `Experienced data and software engineer focused on building production-ready AI and cloud systems. I work across data platforms, distributed systems, and applied ML, with an emphasis on reliability, scale, and cost-aware design. I translate business goals into clear technical outcomes and take ownership from design through production.
Open to senior engineering and technical leadership roles where deep hands-on work and sound decision-making matter.`


  return (
    <Card className="w-full shadow-xl rounded-xl">
      <CardHeader>
        <CardTitle className="text-3xl lg:text-4xl font-bold text-accent flex items-center">
          <Target className="mr-3 h-8 w-8" /> Objective
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <p className="text-lg text-foreground/90 leading-relaxed">
          {objectiveStatement}
        </p>
      </CardContent>
    </Card>
  );
};

export default Objective;
