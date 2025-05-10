import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Calendar, MapPin, ExternalLink } from 'lucide-react';
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
    logoUrl: '/logos/luminous.png', // Replace with actual logo path
    responsibilities: [],
    skills: ['Data Engineering', 'ETL', 'Data Pipelines']
  },
  {
    role: 'Research Assistant',
    company: 'Bosch Global Software Technologies',
    duration: 'Mar 2024 - Present',
    location: 'Raichur, Karnataka, India',
    projectTitle: 'AI-Driven HVAC Efficiency Optimization',
    projectDuration: 'Mar 2024 – Nov 2024',
    logoUrl: '/logos/bosch.png', // Replace with actual logo path
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
    logoUrl: '/logos/bosch-medical.png', // Replace with actual logo path
    responsibilities: [
      'Spearheaded a pioneering research initiative to develop a world-first inter-disciplinary multimodal screening system, achieving an 80% reduction in second screening time',
      'Integrated and tested mammogram and pathology-based approaches for accurate diagnoses, achieving 96.8% accuracy (p<0.05)',
      'Collaborated with medical professionals to validate and refine the AI model'
    ],
    skills: ['Healthcare AI', 'Medical Imaging', 'Machine Learning', 'Research'],
    parentCompany: 'Bosch Global Software Technologies'
  },
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
    role: 'Database Developer',
    company: 'RIMS',
    duration: 'Aug 2024 - Sep 2024',
    location: 'Raichur, Karnataka, India',
    logoUrl: '/logos/rims.png', // Replace with actual logo path
    responsibilities: [
      'Managed hybrid cloud storage for 2,000 patients annually using Amazon S3 and EC2',
      'Transitioned from costly physical storage to a digital system with MongoDB and Streamlit',
      'Developed a user-friendly interface to streamline access to medical records and research materials',
      'Improved data management, boosting the department\'s research capabilities',
      'Collaborated with medical professionals to ensure the solution met departmental needs and industry standards'
    ],
    skills: ['MongoDB', 'AWS S3', 'EC2', 'Streamlit', 'Healthcare IT']
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
    skills: ['Business Intelligence', 'Data Analysis', 'HR Analytics'],
    parentCompany: 'YourGuide'
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
    skills: ['Market Research', 'Data Analysis', 'Survey Design'],
    parentCompany: 'YourGuide'
  }
];

// Group experiences by company to show company timeline
const groupExperiencesByCompany = (experiences: ExperienceEntry[]) => {
  const companies = new Map<string, ExperienceEntry[]>();
  
  experiences.forEach(exp => {
    const companyName = exp.parentCompany || exp.company;
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
                {companyExperiences.length > 1 && (
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                    <div className="flex items-center">
                      {companyExperiences[0].logoUrl && (
                        <div className="relative mr-4 h-16 w-16 rounded-lg overflow-hidden border-2 border-muted bg-background flex items-center justify-center">
                          <Image
                            src={companyExperiences[0].logoUrl.startsWith('/') 
                              ? companyExperiences[0].logoUrl 
                              : `https://picsum.photos/seed/${company.toLowerCase().replace(/\s+/g, '-')}/64/64`}
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
                )}
                
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
                                <Image
                                  src={exp.logoUrl.startsWith('/') 
                                    ? exp.logoUrl 
                                    : `https://picsum.photos/seed/${exp.company.toLowerCase().replace(/\s+/g, '-')}/56/56`}
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
  let earliestStart: Date | null = null;
  let latestEnd: Date | null = null;
  
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
    
    return `${startStr} - ${endStr === 'Present' ? 'Present' : endStr} · ${duration}`;
  }
  
  return '';
}

export default Experience;