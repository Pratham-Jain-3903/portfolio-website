import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Calendar, MapPin } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

interface FreelanceExperienceEntry {
  role: string;
  company: string;
  duration: string;
  location?: string;
  logoUrl?: string;
  responsibilities: string[];
  skills?: string[];
}

const freelanceExperienceData: FreelanceExperienceEntry[] = [
  {
    role: 'Freelance Software Engineer',
    company: 'NeoCFO',
    duration: 'Jan 2025 - Mar 2025',
    location: 'Gurugram, Haryana, India',
    logoUrl: '/logos/neocfo.png', // Replace with actual logo path
    responsibilities: [
      'Utilized agents to fetch data from business tools (e.g., Salesforce, HubSpot) and user data in S3 buckets, enabling dynamic query analysis for revenue forecasting and marketing budget optimization',
      'Deployed APIs using PM2 on serverless EC2 instances and Lambda to process user queries sourced from CRM systems',
      'Trained prediction models on acquired data asynchronously for reasoning models, enhancing backend intelligence'
 ],
    skills: ['AWS', 'Lambda', 'EC2', 'CRM Integration', 'API Development']
  },
  {
    role: 'Business Intelligence Growth Analyst',
    company: 'YourGuide',
    duration: 'Aug 2022 - Oct 2022',
    location: 'Hyderabad, Telangana, India',
    logoUrl: '/logos/yourguide.png', // Replace with actual logo path
    responsibilities: [
      'Leveraged business intelligence tools to optimize intern onboarding processes, reducing HR time by 50%',
      'Developed data-driven pitch decks, combining market research and HR analytics, which were instrumental in securing seed funding',
      'Analyzed internal communication patterns and enhanced strategies to improve team collaboration and proactive problem-solving'
    ],
    skills: ['Business Intelligence', 'Data Analysis', 'HR Analytics']
  },
  {
    role: 'Market Research Analyst',
    company: 'YourGuide',
    duration: 'Jan 2022 - Aug 2022',
    location: 'Hyderabad, Telangana, India',
    logoUrl: '/logos/yourguide.png', // Replace with actual logo path
    responsibilities: [
      'Conducted market research and survey design, impacting over 500 users',
      'Provided actionable insights from detailed analysis, guiding business decisions'
    ],
 skills: ['Market Research', 'Data Analysis', 'Survey Design']
  }
];

const FreelanceExperience: React.FC = () => {
  return (
    <Card className="w-full shadow-xl rounded-xl overflow-hidden border border-border/50" id="freelance-experience">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 pb-6">
        <CardTitle className="text-3xl lg:text-4xl font-bold text-foreground flex items-center">
          <Code className="mr-3 h-8 w-8 text-primary" /> Freelance Experience
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-8 pt-6 px-6">
        {freelanceExperienceData.map((experience, index) => (
          <div
            key={index}
            className="p-4 border border-border/20 bg-background/10 backdrop-blur-sm rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-start sm:items-center mb-3 flex-col sm:flex-row">
              {experience.logoUrl && (
                <div className="relative mr-0 sm:mr-4 mb-2 sm:mb-0 h-12 w-12 rounded-full overflow-hidden border-2 border-muted bg-background flex items-center justify-center">
                  <Image
                    src={experience.logoUrl.startsWith('/')
                      ? experience.logoUrl
                      : `https://picsum.photos/seed/${experience.company.toLowerCase().replace(/\s+/g, '-')}/48/48`}
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