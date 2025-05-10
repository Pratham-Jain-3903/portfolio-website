import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target } from 'lucide-react';

const Objective: React.FC = () => {
  const objectiveStatement = "Highly motivated and results-oriented Data Engineer and Machine Learning Engineer with a strong foundation in software development, big data technologies, and cloud platforms. Eager to leverage expertise in designing, building, and deploying scalable data pipelines and machine learning models to solve complex business problems and drive innovation. Seeking a challenging role to contribute to data-driven decision-making and technological advancement.";

  return (
    <Card className="w-full shadow-xl rounded-xl">
      <CardHeader>
        <CardTitle className="text-3xl lg:text-4xl font-bold text-primary flex items-center">
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
