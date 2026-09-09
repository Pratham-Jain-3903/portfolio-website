import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Calendar, MapPin } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { freelanceExperienceEntries } from '@/data/freelance-experience';

const FreelanceExperience: React.FC = () => {
  return (
    <Card className="w-full shadow-xl rounded-xl overflow-hidden border border-border/50" id="freelance-experience">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 pb-6">
        <CardTitle className="text-3xl lg:text-4xl font-bold text-foreground flex items-center">
          <Code className="mr-3 h-8 w-8 text-primary" /> Freelance Experience
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-8 pt-6 px-6">
        {freelanceExperienceEntries.map((experience) => (
          <div
            key={experience.id}
            className="p-4 border border-border/20 bg-background/10 backdrop-blur-sm rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-start sm:items-center mb-3 flex-col sm:flex-row">
              {experience.logoUrl && (
                <div className="relative mr-0 sm:mr-4 mb-2 sm:mb-0 h-12 w-12 rounded-full overflow-hidden border-2 border-muted bg-background flex items-center justify-center">
                  <Image
 src={experience.logoUrl}
                    alt={`${experience.company} logo`}
                    width={48}
                    height={48}
                    className="object-contain p-1"
                  />
                </div>
              )}
              <div className="flex-grow">
                <h3 className="text-xl font-semibold text-foreground">{experience.role}</h3>
                <p className="text-md text-muted-foreground">{experience.company}</p>
                <p className="text-sm text-muted-foreground flex items-center">
 <Calendar className="h-4 w-4 mr-1" />
                  {experience.duration}
                  {experience.location && (
 <span className="ml-4 flex items-center">
 <MapPin className="h-4 w-4 mr-1" /> {experience.location}
 </span>
 )}
                </p>
              </div>
            </div>
            {experience.responsibilities && experience.responsibilities.length > 0 && (
              <div className="space-y-2 mt-4">
                <ul className="list-disc list-inside space-y-1 text-sm text-foreground/90">
                  {experience.responsibilities.map((responsibility, i) => (
                    <li key={i}>{responsibility}</li>
                  ))}
                </ul>
              </div>
            )}
 {experience.skills && experience.skills.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {experience.skills.map(skill => (
                  <Badge key={skill} variant="outline" className="bg-muted/50">
                    {skill}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default FreelanceExperience;