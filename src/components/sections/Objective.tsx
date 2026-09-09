import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target } from 'lucide-react';
import { objectiveStatement } from '@/data/profile';

const Objective: React.FC = () => {
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
