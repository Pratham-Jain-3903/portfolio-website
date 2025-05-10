import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Heart, BookOpen, Lightbulb } from 'lucide-react'; // Added relevant icons
import Image from 'next/image';

interface VolunteerExperienceEntry {
  role: string;
  company: string;
  duration: string;
  category?: string; // Optional category field
  description?: string; // Optional description field
  logoUrl?: string;
}

const volunteerExperienceData: VolunteerExperienceEntry[] = [
  {
    role: 'Database Developer',
    company: 'Raichur Institute of Medical Sciences',
    duration: 'Aug 2024 - Present 10 months',
    category: 'Science and Technology',
    description: 'Identified and Addressed Key Challenges: Discovered that the Pathology Department at RIMS relied on physical storage for medical records, leading to difficulties in searching and accessing relevant slides due to the high cost and inefficiency of physical archives. Developed Digital Solution: Designed and implemented a comprehensive digital archive system using MongoDB and Streamlit. This solution was aimed at transitioning the pathology department from expensive physical storage to a…Show more',
    logoUrl: 'https://picsum.photos/seed/rimsvolunteer/40/40', // Placeholder logo
  },
  {
    role: 'Student Volunteer',
    company: 'National Service Scheme',
    duration: 'Dec 2021 - Present 3 years 6 months',
    logoUrl: 'https://picsum.photos/seed/nssvolunteer/40/40', // Placeholder logo
  },
  {
    role: 'Head of Public Relations',
    company: 'Indian Institute of Information Technology, Raichur',
    duration: 'Sep 2022 - Present 2 years 9 months',
    category: 'Education',
    logoUrl: 'https://picsum.photos/seed/iiitrvolunteer/40/40', // Placeholder logo
  },
  {
    role: 'Student Mentor',
    company: 'E-Cell, IIIT Raichur',
    duration: 'Nov 2024 - Present 7 months',
    category: 'Economic Empowerment',
    logoUrl: 'https://picsum.photos/seed/ecellvolunteer/40/40', // Placeholder logo
  },
];

const VolunteerExperience: React.FC = () => {
  return (
    <Card className="w-full shadow-xl rounded-xl" id="volunteer-experience">
      <CardHeader>
        <CardTitle className="text-3xl lg:text-4xl font-bold text-accent flex items-center">
          <Heart className="mr-3 h-8 w-8" /> Volunteer Experience
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8 pt-2">
        {volunteerExperienceData.map((volunteer, index) => (
          <div
            key={index}
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
                <p className="text-sm text-muted-foreground">{volunteer.duration}</p>
                {volunteer.category && <p className="text-sm text-muted-foreground italic mt-1">Category: {volunteer.category}</p>}
              </div>
            </div>
            {volunteer.description && (
              <div className="mt-3 text-md text-foreground/90">
                {volunteer.description}
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default VolunteerExperience;