import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap } from 'lucide-react';
import { educationEntries } from '@/data/education';

const Education: React.FC = () => {
  return (
    <Card className="w-full shadow-xl rounded-xl">
      <CardHeader>
        <CardTitle className="text-3xl lg:text-4xl font-bold text-accent flex items-center">
          <GraduationCap className="mr-3 h-8 w-8" /> Education
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 pt-2">
        {educationEntries.map((edu) => (
          <div 
            key={edu.id}
            className="p-4 border border-border/20 bg-background/10 backdrop-blur-sm rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <h3 className="text-xl font-semibold text-foreground">{edu.degree}</h3>
            <p className="text-md text-muted-foreground">{edu.institution}</p>
            {edu.year && <p className="text-sm text-muted-foreground">{edu.year}</p>}
            <p className="text-md text-accent font-medium mt-1">Grade: {edu.cgpa}</p>

            {edu.activities && (
              <p className="mt-2 text-sm text-muted-foreground">Activities and societies: {edu.activities}</p>
            )}

            {edu.skills && edu.skills.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {edu.skills.map((skill) => (
                  <span key={skill} className="text-xs text-muted-foreground bg-muted/20 px-2 py-1 rounded-md">
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default Education;
