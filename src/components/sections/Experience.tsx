import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, CheckCircle } from 'lucide-react';

interface ExperienceEntry {
  role: string;
  company: string;
  duration: string;
  achievements: string[];
  logoUrl?: string; // Optional company logo
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
    logoUrl: 'https://picsum.photos/40/40?random=1' // Placeholder
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
    logoUrl: 'https://picsum.photos/40/40?random=2' // Placeholder
  },
];

const Experience: React.FC = () => {
  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-primary flex items-center">
          <Briefcase className="mr-3 h-7 w-7" /> Experience
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {experienceData.map((exp, index) => (
          <div key={index} className="p-4 border border-border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center mb-2">
              {exp.logoUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={exp.logoUrl} alt={`${exp.company} logo`} data-ai-hint="company logo" className="h-10 w-10 rounded-full mr-3 object-contain" />
              )}
              <div>
                <h3 className="text-lg font-semibold text-foreground">{exp.role}</h3>
                <p className="text-md text-muted-foreground">{exp.company}</p>
                <p className="text-sm text-muted-foreground">{exp.duration}</p>
              </div>
            </div>
            <ul className="list-none space-y-1 mt-2 pl-2">
              {exp.achievements.map((achievement, achIndex) => (
                <li key={achIndex} className="flex items-start text-sm text-foreground/90">
                  <CheckCircle className="h-4 w-4 text-accent mr-2 mt-0.5 shrink-0" />
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
