import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target } from 'lucide-react';

const Objective: React.FC = () => {
  const objectiveStatement = "Highly motivated and results-oriented Data Engineer and Machine Learning Engineer with a strong foundation in software development, big data technologies, and cloud platforms. Eager to leverage expertise in designing, building, and deploying scalable data pipelines and machine learning models to solve complex business problems and drive innovation. Seeking a challenging role to contribute to data-driven decision-making and technological advancement.";

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-primary flex items-center">
          <Target className="mr-3 h-7 w-7" /> Objective
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-foreground/90 leading-relaxed">
          {objectiveStatement}
        </p>
      </CardContent>
    </Card>
  );
};

export default Objective;
