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
    role: 'Quantitative Analyst',
    company: 'Qode Advisors / Swan Capital',
    duration: 'March 2026 - Present',
    logoUrl: 'data:image/jpeg;base64,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',
    location: 'Mumbai, Maharashtra, India · On-site',
    responsibilities: ["Implemented a real-time data pipeline using Python, Kafka, and Spark to process and analyze financial market data, reducing latency by 30% and enabling faster trading decisions.",
      "Developed and maintained ETL processes to ensure data quality and integrity, resulting in a 25% decrease in data-related issues and improved reporting accuracy.",
      "Collaborated with cross-functional teams to design and implement scalable data solutions, leading to a increase in system performance and reliability.",],
    skills: ["Python", "Kafka", "Spark", "ETL", "Data Quality", "Data Analysis", "Financial Markets", "Go", "SQL", "AWS", "C++", "Distributed Systems", "Data Modeling", "DuckDB", "Redis", "Kubernetes"],
  },
  {
    role: 'Data Engineer Intern — R&D ',
    company: 'Luminous Power Technologies (Schneider Electric Group)',
    duration: 'Feb 2025 - Feb 2026',
    location: 'Gurugram, Haryana, India · On-site',
    logoUrl: 'https://cdn.freelogovectors.net/wp-content/uploads/2023/12/luminous-logo-freelogovectors.net_-640x400.png',
    responsibilities: [
      'Implemented EL image semantic segmentation for 24 defect classes using AMP and distributed training, achieving a 67% average IoU.',
      'Designed and built a physics-informed network to extract KPIs from IV curves with 95% accuracy and developed a clustering-driven quality grader to surface production anomalies.',
      'Eliminated N+1 query inefficiencies in a legacy Java 8 notification pipeline serving 100K+ IoT devices. Orchestrated operation chaining with idempotent tracking IDs, achieving 14× faster query execution and 98% cost reduction across 5.1M monthly events using Azure Data Factory and Azure Batch in Python.',
      'Resolved a thundering herd problem in device provisioning using exponential backoff with jitter, reducing provisioning time from 11.3 hours to 32 minutes and cutting redundant retries by 99.8% at scale.',
      'Designed dimensional data models following Medallion Architecture (Bronze/Silver/Gold) across SQL and NoSQL stores, enabling real-time analytics and reporting.',
      'Maintained CI/CD pipelines and Agile delivery processes; translated requirements from product, engineering, and finance teams into fault-tolerant technical solutions.',
    ],
    skills: ['Computer Vision', 'Distributed Training', 'PyTorch', 'AMP', 'Model Evaluation', 'Production ML', 'Azure', 'DPS', 'CosmosDB', 'Parquet', 'Blob Storage', 'Next.js', 'AKS', 'Redis', 'Distributed Systems', 'Embeddings'],
    parentCompany: 'Luminous Power Technologies (Schneider Electric Group)',
  },
  {
    role: 'Data & Applied Sciences Research Assistant',
    company: 'Bosch Global Software Technologies',
    duration: 'Mar 2024 - Feb 2025',
    location: 'Raichur, Karnataka, India',
    logoUrl: 'https://i.pinimg.com/736x/c4/30/5c/c4305cf1a09a7bcf2d7dd64e67da411c.jpg', // Replace with actual logo path
    responsibilities: [
      'Optimised data pipelines for 300+ GB of IoT sensor data using Python and SQL; improved throughput by 40% through query optimisation and partition pruning.',
      'Developed a no-code TinyML tool on Spark/Kubernetes exposing HuggingFace transformers through a clean abstraction layer, enabling domain experts to deploy edge models without ML expertise.',
    ],
    skills: ['AI/ML', 'Data Pipeline', 'IoT', 'Python', 'SQL', 'Spark', 'Kubernetes', 'HuggingFace'],
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
    // Narrow types explicitly to Date to satisfy TS strict checks
    const s = earliestStart as Date;
    const e = latestEnd as Date;

    const startStr = s.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    const endStr = e.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

    // Calculate years and months
    const monthsDiff = (e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth());

    const years = Math.floor(monthsDiff / 12);
    const months = monthsDiff % 12;

    let duration = '';
    if (years > 0) {
      duration += `${years} year${years > 1 ? 's' : ''}`;
    }
    if (months > 0) {
      duration += `${years > 0 ? ' ' : ''}${months} month${months > 1 ? 's' : ''}`;
    }

    return `${startStr} - ${e.toDateString() === new Date().toDateString() ? 'Present' : endStr} · ${duration}`;
  }

  return '';
}

export default Experience;