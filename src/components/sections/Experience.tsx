import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// Improved TypeScript interface with better type definitions
interface ExperienceEntry {
  role: string;
  company: string;
  duration: string;
  location?: string;
  projectTitle?: string;
  projectDuration?: string;
  logoUrl?: string;
  responsibilities: string[];
  skills?: string[];
  isParent?: boolean;
  parentCompany?: string;
}

// Restructured and cleaned up experience data
const experienceData: ExperienceEntry[] = [
  {
    role: 'Data Engineer',
    company: 'Luminous Power Technologies (P) Ltd',
    duration: 'Feb 2025 - Present',
    location: 'Gurugram, Haryana, India',
    logoUrl: 'https://cdn.freelogovectors.net/wp-content/uploads/2023/12/luminous-logo-freelogovectors.net_-640x400.png', // Replace with actual logo path
    responsibilities: [
      'Built a Cache Augmented Generation (CAG) chatbot backend on Azure using FastAPI, Gunicorn, and Nginx. (Demo)',
      'Engineered offline-first Local Architecture with CosmosDB, reducing query latency by 78% for 10K+ users.',
      'Developed dynamic agents using CrewAI and Azure Functions, cutting hallucinations by 18.6% and inference cost by 30%.',
      'Integrated Azure Bedrock agents to minimize latency by 88%, improving customer satisfaction score by 7%. ',
    ],
    skills: ['Azure', 'FastAPI', 'Gunicorn', 'Nginx', 'CosmosDB', 'CrewAI', 'Azure Functions', 'Azure Bedrock', 'AI/ML', 'Data Engineering', 'Chatbots'],
  },
  {
    role: 'Research Assistant',
    company: 'Bosch Global Software Technologies',
    duration: 'Mar 2024 - Feb 2025',
    location: 'Raichur, Karnataka, India',
    projectTitle: 'AI-Driven HVAC Efficiency Optimization',
    projectDuration: 'Mar 2024 – Nov 2024',
    logoUrl: 'https://i.pinimg.com/736x/c4/30/5c/c4305cf1a09a7bcf2d7dd64e67da411c.jpg', // Replace with actual logo path
    responsibilities: [
      'Designed and implemented a real-time data pipeline for AI models, focusing on energy, fuel, and electricity consumption in HVAC systems',
      'Conducted data wrangling and warehousing of IoT signals to support AI-driven insights',
      'Conducted regular peer reviews of AI models to ensure accuracy and compliance with internal standards, iterating on feedback to continuously improve performance',
      'Deployed the solution on NXT platform for production use'
    ],
    skills: ['AI/ML', 'Data Pipeline', 'IoT', 'HVAC Systems'],
    parentCompany: 'Bosch Global Software Technologies'
  },
  {
    role: 'Research Assistant',
    company: 'Bosch Global Software Technologies & Medical Institutions',
    duration: 'Jul 2024 - Dec 2024',
    location: 'Raichur, Karnataka, India',
    projectTitle: 'Multimodal AI-Powered Breast Cancer Screening System',
    projectDuration: 'Jan 2024 – Nov 2024',
    logoUrl: 'https://i.pinimg.com/736x/c4/30/5c/c4305cf1a09a7bcf2d7dd64e67da411c.jpg', // Replace with actual logo path
    responsibilities: [
      'Spearheaded a pioneering research initiative to develop a world-first inter-disciplinary multimodal screening system, achieving an 80% reduction in second screening time',
      'Integrated and tested mammogram and pathology-based approaches for accurate diagnoses, achieving 96.8% accuracy (p<0.05)',
      'Collaborated with medical professionals to validate and refine the AI model'
    ],
    skills: ['Healthcare AI', 'Medical Imaging', 'Machine Learning', 'Research'],
    parentCompany: 'Bosch Global Software Technologies'
  },
  
];

// Group experiences by company to show company timeline
const groupExperiencesByCompany = (experiences: ExperienceEntry[]) => {
  const companies = new Map<string, ExperienceEntry[]>();
  
  experiences.forEach(exp => {
    const companyName = exp.parentCompany || exp.company; // Group by parentCompany or company if no parent
    if (!companies.has(companyName)) {
      companies.set(companyName, []);
    }
    companies.get(companyName)!.push(exp);
  });
  
  // For each company, sort experiences by date (newest first)
  companies.forEach((exps, company) => {
    companies.set(company, exps.sort((a, b) => {
      // Simple date comparison assuming format "MMM YYYY - ..."
      const dateA = new Date(a.duration.split(' - ')[0]);
      const dateB = new Date(b.duration.split(' - ')[0]);
      return dateB.getTime() - dateA.getTime();
    }));
  });
  
  return companies;
};

const Experience: React.FC = () => {
  const groupedExperiences = groupExperiencesByCompany(experienceData);
  const companies = Array.from(groupedExperiences.keys());
  
  // Function to format duration into a more readable format
  const formatDuration = (duration: string) => {
    const parts = duration.split(' - ');
    if (parts.length === 2) {
      // Extract the time period at the end if it exists
      const timePeriodMatch = parts[1].match(/(\d+\s+\w+)$/);
      return (
        <span>
          {parts[0]} - {parts[1].replace(/\s+\d+\s+\w+$/, '')}
          {timePeriodMatch && (
            <span className="ml-2 text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">
              {timePeriodMatch[1]}
            </span>
          )}
        </span>
      );
    }
    return duration;
  };

  return (
    <div>
      <Card className="w-full shadow-xl rounded-xl overflow-hidden border border-border/50">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 pb-6">
          <CardTitle className="text-3xl lg:text-4xl font-bold text-foreground flex items-center">
            <Briefcase className="mr-3 h-8 w-8 text-primary" /> Experience
          </CardTitle>
        </CardHeader>
        
        <CardContent className="pt-6 px-6">
          {companies.map((company, companyIndex) => {
            const companyExperiences = groupedExperiences.get(company)!;
            const totalDuration = calculateTotalDuration(companyExperiences);
            
            return (
              <div 
                key={company} 
                className={cn(
                  "mb-8 relative",
                  companyIndex < companies.length - 1 && "pb-8 border-b border-border/30"
                )}
              >
                {/* Company header with total duration */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                    <div className="flex items-center">
                      {companyExperiences[0].logoUrl && (
                        <div className="relative mr-4 h-16 w-16 rounded-lg overflow-hidden border-2 border-muted bg-background flex items-center justify-center">
                          <Image
                            src={companyExperiences[0].logoUrl}
                            alt={`${company} logo`}
                            width={64}
                            height={64}
                            className="object-contain p-1"
                          />
                        </div>
                      )}
                      <div>
                        <h3 className="text-xl font-bold text-foreground">{company}</h3>
                        <p className="text-sm text-muted-foreground flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {totalDuration}
                        </p>
                      </div>
                    </div>
                  </div>
                
                {/* Company experiences timeline */}
                <div className="space-y-6 pl-0 sm:pl-6 relative">
                  {/* Timeline line */}
                  {companyExperiences.length > 1 && (
                    <div className="absolute left-3 top-8 bottom-0 w-0.5 bg-border/50 hidden sm:block" />
                  )}
                  
                  {companyExperiences.map((exp, index) => (
                    <div 
                      key={`${exp.company}-${exp.role}-${index}`}
                      className="relative bg-card rounded-xl shadow-md border border-border/40 transition-all duration-300 hover:shadow-lg hover:border-border/60"
                    >
                      {/* Timeline node */}
                      {companyExperiences.length > 1 && (
                        <div className="absolute -left-9 top-6 h-5 w-5 rounded-full bg-primary-foreground border-4 border-primary hidden sm:block" />
                      )}
                      
                      <div className="p-5">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                          {/* Role info */}
                          <div className="flex-grow">
                            <h4 className="text-lg font-semibold text-foreground">{exp.role}</h4>
                            <p className="text-sm text-muted-foreground mb-1">
                              {formatDuration(exp.duration)}
                            </p>
                            
                            {exp.location && (
                              <p className="text-xs text-muted-foreground flex items-center">
                                <MapPin className="h-3 w-3 mr-1" />
                                {exp.location}
                              </p>
                            )}
                          </div>
                          
                          {/* Company logo (if not showing in parent block) */}
                          {companyExperiences.length === 1 && exp.logoUrl && (
                            <div className="sm:ml-auto hidden sm:block">
                              <div className="relative h-14 w-14 rounded overflow-hidden border border-muted bg-background flex items-center justify-center">
                                <Image src={exp.logoUrl}
                                  alt={`${exp.company} logo`}
                                  width={56}
                                  height={56}
                                  className="object-contain p-1"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                        
                        {/* Project title and duration if available */}
                        {exp.projectTitle && (
                          <div className="mb-4 bg-primary/5 p-3 rounded-lg border border-primary/10">
                            <h5 className="font-medium text-foreground">{exp.projectTitle}</h5>
                            {exp.projectDuration && (
                              <p className="text-xs text-muted-foreground flex items-center mt-1">
                                <Calendar className="h-3 w-3 mr-1" />
                                {exp.projectDuration}
                              </p>
                            )}
                          </div>
                        )}
                        
                        {/* Responsibilities */}
                        {exp.responsibilities && exp.responsibilities.length > 0 && (
                          <div className="space-y-3 mt-4">
                            <ul className="space-y-2">
                              {exp.responsibilities.map((responsibility, i) => (
                                <li key={i} className="flex items-start">
                                  <span className="h-5 w-5 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 mt-0.5 mr-3">
                                    <span className="text-xs font-bold">{i + 1}</span>
                                  </span>
                                  <span className="text-sm">{responsibility}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {/* Skills used */}
                        {exp.skills && exp.skills.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {exp.skills.map(skill => (
                              <Badge key={skill} variant="outline" className="bg-muted/50">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};

// Helper function to calculate total duration at a company
function calculateTotalDuration(experiences: ExperienceEntry[]): string {
  // This is a simplified calculation that could be enhanced with actual date diff logic
  if (experiences.length === 1) {
    return experiences[0].duration;
  }
  
  // Get earliest start and latest end dates
  let earliestStart: Date | undefined = undefined;
  let latestEnd: Date | undefined = undefined;
  
  experiences.forEach(exp => {
    const [start, end] = exp.duration.split(' - ');
    const startDate = new Date(start);
    
    if (!earliestStart || startDate < earliestStart) {
      earliestStart = startDate;
    }
    
    const endDate = end.toLowerCase() === 'present' ? new Date() : new Date(end);
    if (!latestEnd || endDate > latestEnd) {
      latestEnd = endDate;
    }
  });
  
  if (earliestStart && latestEnd) {
    const startStr = earliestStart.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    const endStr = latestEnd.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    
    // Calculate years and months
    const monthsDiff = (latestEnd.getFullYear() - earliestStart.getFullYear()) * 12 + 
                       (latestEnd.getMonth() - earliestStart.getMonth());
    
    const years = Math.floor(monthsDiff / 12);
    const months = monthsDiff % 12;
    
    let duration = '';
    if (years > 0) {
      duration += `${years} year${years > 1 ? 's' : ''}`;
    }
    if (months > 0) {
      duration += `${years > 0 ? ' ' : ''}${months} month${months > 1 ? 's' : ''}`;
    }

 return `${startStr} - ${latestEnd.toDateString() === new Date().toDateString() ? 'Present' : endStr} · ${duration}`;
  }
  
  return '';
}

export default Experience;