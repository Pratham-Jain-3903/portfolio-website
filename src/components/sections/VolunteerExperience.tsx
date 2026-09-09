import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Heart, BookOpen, Lightbulb } from 'lucide-react'; // Added relevant icons
import { Badge } from '@/components/ui/badge'; // Import Badge component
import Image from 'next/image';
import { volunteerExperienceEntries } from '@/data/volunteer-experience';

const VolunteerExperience: React.FC = () => {
  return (
    <Card className="w-full shadow-xl rounded-xl overflow-hidden border border-border/50" id="volunteer-experience">
      <CardHeader className="bg-gradient-to-r from-accent/5 to-accent/10 pb-6">
        <CardTitle className="text-3xl lg:text-4xl font-bold text-foreground flex items-center">
          <Heart className="mr-3 h-8 w-8 text-accent" /> Volunteer Experience
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 px-6 space-y-6"> {/* Adjust spacing */}
        {/* Add a descriptive paragraph if needed */}
        {/* <p className="text-muted-foreground mb-8">Highlight your contributions and impact through volunteer work.</p> */}

        {/* Map over volunteer entries */}
        {volunteerExperienceEntries.map((volunteer) => (
          <div
            key={volunteer.id}
            className="p-4 border border-border/20 bg-background/10 backdrop-blur-sm rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
          >
             <div className="flex items-start sm:items-center mb-3 flex-col sm:flex-row">
              {volunteer.logoUrl && (
                <Image
                  src={volunteer.logoUrl}
                  alt={`${volunteer.company} logo`}
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-full mr-0 sm:mr-4 mb-2 sm:mb-0 object-contain border-2 border-muted"
                  data-ai-hint="organization logo"
                />
              )}
              <div className="flex-grow">
                <h3 className="text-xl font-semibold text-foreground">{volunteer.role}</h3>
                <p className="text-md text-muted-foreground">{volunteer.company}</p>
                  <p className="text-sm text-muted-foreground mt-1">{volunteer.duration}</p> {/* Add margin-top */}
                  {volunteer.location && (
                    <p className="text-sm text-muted-foreground">{volunteer.location}</p>
                  )}
              </div>
            </div>

            {/* Display category as a badge */}
            {volunteer.category && (
              <div className="mt-3"> {/* Adjust margin-top */}
                 <Badge variant="outline" className="bg-muted/50">
                   {volunteer.category}
                 </Badge>
              </div>
            )}

            {/* Display description as a list */}
            {volunteer.description && (
              <div className="mt-4 text-md text-foreground/90"> {/* Adjust margin-top */}
                 <ul className="list-disc list-inside space-y-2"> {/* Use unordered list for description */}
                   {/* Split description by newlines or specific delimiters if necessary */}
                   {/* For now, treating the entire description as one item */}
                   <li>{volunteer.description}</li>
                 </ul>
              </div>
            )}

            {/* Display skills as badges */}
            {volunteer.skills && volunteer.skills.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {volunteer.skills.map((skill, idx) => (
                  <Badge key={idx} variant="secondary" className="px-2 py-1">
                    {skill}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        ))} {/* Close map function */}
      </CardContent>
    </Card>
  );
};

export default VolunteerExperience;