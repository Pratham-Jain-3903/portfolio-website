import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, CheckCircle } from 'lucide-react';
import Image from 'next/image';


interface ExperienceEntry {
  role: string;
  company: string;
  duration: string;
  achievements: string[];
  logoUrl?: string; 
}

const experienceData: ExperienceEntry[] = [
  {
    role: 'Data & Applied Scientist Intern',
    company: 'Microsoft',
    duration: 'May 2022 - July 2022',
    achievements: [
      "Developed a sentiment analysis model for customer feedback, improving accuracy by 15%.",
      "Built data pipelines using Azure Data Factory to ingest and process 1TB of daily data.",
      "Created dashboards in Power BI for visualizing key performance indicators.",
    ],
    logoUrl: 'https://picsum.photos/seed/microsoft/40/40' 
  },
  {
    role: 'Software Development Engineer Intern',
    company: 'Amazon',
    duration: 'Dec 2021 - Feb 2022',
    achievements: [
      "Optimized an existing microservice, reducing latency by 20%.",
      "Implemented new features for an internal tool, used by 100+ engineers.",
      "Wrote unit and integration tests, achieving 95% code coverage.",
    ],
    logoUrl: 'https://picsum.photos/seed/amazon/40/40'
  },
];

const Experience: React.FC = () => {
  return (
    <Card className="w-full shadow-xl rounded-xl">
      <CardHeader>
        <CardTitle className="text-3xl lg:text-4xl font-bold text-primary flex items-center">
          <Briefcase className="mr-3 h-8 w-8" /> Experience
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8 pt-2">
        {experienceData.map((exp, index) => (
          <div key={index} className="p-5 border border-border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 bg-card-foreground/5">
            <div className="flex items-start sm:items-center mb-3 flex-col sm:flex-row">
              {exp.logoUrl && (
                <Image 
                  src={exp.logoUrl} 
                  alt={`${exp.company} logo`} 
                  width={48} 
                  height={48} 
                  className="h-12 w-12 rounded-full mr-0 sm:mr-4 mb-2 sm:mb-0 object-contain border-2 border-muted"
                  data-ai-hint="company logo" 
                />
              )}
              <div className="flex-grow">
                <h3 className="text-xl font-semibold text-foreground">{exp.role}</h3>
                <p className="text-md text-muted-foreground">{exp.company}</p>
                <p className="text-sm text-muted-foreground">{exp.duration}</p>
              </div>
            </div>
            <ul className="list-none space-y-2 mt-3 pl-0 sm:pl-2">
              {exp.achievements.map((achievement, achIndex) => (
                <li key={achIndex} className="flex items-start text-md text-foreground/90">
                  <CheckCircle className="h-5 w-5 text-accent mr-2 mt-1 shrink-0" />
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default Experience;
