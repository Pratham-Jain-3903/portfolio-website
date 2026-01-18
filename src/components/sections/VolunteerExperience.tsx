import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Heart, BookOpen, Lightbulb } from 'lucide-react'; // Added relevant icons
import { Badge } from '@/components/ui/badge'; // Import Badge component
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
    logoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6i3ntEYZoC5TD0DDAUM43iIKY0SbKU91ZJA&s', // Placeholder logo
  },
  {
    role: 'Student Volunteer',
    company: 'National Service Scheme',
    duration: 'Dec 2021 - Present 3 years 6 months',
    logoUrl: 'https://students.iiitr.ac.in/assets/images/club/nss-inverted.png', // Placeholder logo
  },
  {
    role: 'Head of Public Relations',
    company: 'Indian Institute of Information Technology, Raichur',
    duration: 'Sep 2022 - Present 2 years 9 months',
    category: 'Education',
    logoUrl: 'https://students.iiitr.ac.in/assets/images/logo/logo_white.png', // Placeholder logo
  },
  {
    role: 'Student Mentor',
    company: 'E-Cell, IIIT Raichur',
    duration: 'Nov 2024 - Present 7 months',
    category: 'Economic Empowerment',
    logoUrl: 'https://students.iiitr.ac.in/assets/images/club/E_cell_logo.jpg', // Placeholder logo
  },
];

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
                <p className="text-sm text-muted-foreground mt-1">{volunteer.duration}</p> {/* Add margin-top */}
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
          </div>
        ))} {/* Close map function */}
      </CardContent>
    </Card>
  );
};

export default VolunteerExperience;