import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap } from 'lucide-react';

interface EducationEntry {
  degree: string;
  institution: string;
  cgpa: string;
  year?: string; 
}

const educationData: EducationEntry[] = [
  {
    degree: 'Bachelor of Technology in Computer Science and Engineering',
    institution: 'Indian Institute of Technology, Delhi',
    cgpa: '8.75/10',
    year: '2019 - 2023',
  },
  // Add more education entries if needed
];

const Education: React.FC = () => {
  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-primary flex items-center">
          <GraduationCap className="mr-3 h-7 w-7" /> Education
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {educationData.map((edu, index) => (
          <div key={index} className="p-4 border border-border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
            <h3 className="text-lg font-semibold text-foreground">{edu.degree}</h3>
            <p className="text-muted-foreground">{edu.institution}</p>
            {edu.year && <p className="text-sm text-muted-foreground">{edu.year}</p>}
            <p className="text-sm text-accent font-medium mt-1">CGPA: {edu.cgpa}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default Education;
