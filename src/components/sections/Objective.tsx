import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target } from 'lucide-react';

const Objective: React.FC = () => {
  const objectiveStatement = " As a passionate and dedicated software engineering student at the Indian Institute of Information Technology, Raichur, I bring a robust understanding of Python, SQL, and data structures to the table. With hands-on experience in AI-driven solutions, Big Data Analytics, and Cloud Computing, I have a proven track record of delivering innovative and scalable solutions. From optimizing HVAC systems with Bosch to pioneering a breast cancer screening system, I thrive on transforming complex challenges into opportunities for growth. My work extends beyond academics into hackathons and competitions, where I've consistently secured top positions. \n As a PR leader, I also excel in communication, team mentorship, and strategic collaboration.\n Let’s connect if you’re looking for someone who can blend technical expertise with creative problem-solving to drive impactful results."
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
