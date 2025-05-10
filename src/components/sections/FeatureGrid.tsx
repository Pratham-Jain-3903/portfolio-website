import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Award, Briefcase, DownloadCloud, FileText, Github, Users, LayoutGrid, CalendarDays } from 'lucide-react';
import { cn } from '@/lib/utils';

// Improved type definition with better documentation
interface FeatureItem {
  icon: React.ElementType;
  name: string;
  description: string;
  link?: string;
  className?: string;
  cta?: string;
  iframeSrc?: string;
  iframeHeight?: string;
  externalLink?: boolean; // New prop to easily identify external links
}

// Enhanced features array with better organization and layout properties
const features: FeatureItem[] = [
  {
    icon: Briefcase,
    name: "My Projects",
    description: "Explore a collection of my personal and academic projects, showcasing practical application of my skills.",
    link: "#projects",
    className: "col-span-2 row-span-2 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800",
    cta: "View Projects"
  },
  {
    icon: FileText,
    name: "Tech Blog",
    description: "Read my thoughts, findings, and tutorials on various data engineering and machine learning topics.",
    link: "#blog",
    className: "col-span-1 row-span-1 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20",
    cta: "Read Blog"
  },
  {
    icon: Award,
    name: "Certifications",
    description: "View my professional certifications and accreditations that validate my expertise.",
    link: "#certifications",
    className: "col-span-1 row-span-1 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20",
    cta: "See Certs"
  },
  {
    icon: DownloadCloud,
    name: "Resume",
    description: "Get a PDF copy of my comprehensive resume detailing my skills and experience.",
    link: "/pratham-jain-resume.pdf",
    className: "col-span-1 row-span-1 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20",
    cta: "Download PDF",
    externalLink: true
  },
  {
    icon: Github,
    name: "Open Source",
    description: "Check out my contributions to the open source community and collaborative projects.",
    link: "https://github.com/Pratham-Jain-3903",
    className: "col-span-1 row-span-1 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20",
    cta: "Visit GitHub",
    externalLink: true
  },
  {
    icon: CalendarDays,
    name: "GitHub Contributions",
    description: "See my recent GitHub activity and contributions visualized.",
    iframeSrc: `data:text/html;charset=utf-8,${encodeURIComponent(`
      <html>
        <head>
          <link rel="stylesheet" href="https://unpkg.com/github-calendar@latest/dist/github-calendar-responsive.css"/>
          <style>
            body {
              background-color: transparent;
              overflow: hidden;
              margin: 0;
              padding: 0;
            }
            .calendar {
              width: 100%;
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
            }
            .calendar-graph text.month {
              font-size: 10px;
              fill: #767676;
            }
            .calendar-graph text.wday {
              font-size: 9px;
              fill: #767676;
            }
          </style>
        </head>
        <body>
          <div class="calendar">Loading the calendar...</div>
          <script src="https://unpkg.com/github-calendar@latest/dist/github-calendar.min.js"></script>
          <script>
            document.addEventListener('DOMContentLoaded', function() {
              GitHubCalendar(".calendar", "Pratham-Jain-3903", {
                responsive: true,
                tooltips: true,
                global_stats: false
              });
            });
          </script>
        </body>
      </html>`)}`,
    iframeHeight: "160px",
    className: "col-span-2 row-span-1 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50",
  },
  {
    icon: Users,
    name: "Testimonials",
    description: "See what colleagues and collaborators say about my work and skills.",
    link: "#testimonials",
    className: "col-span-1 row-span-1 bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20",
    cta: "Read More"
  },
];

const FeatureGrid: React.FC = () => {
  // Function to determine if a link is external
  const isExternalLink = (link: string) => {
    return link.startsWith('http') || link.startsWith('/') || link.endsWith('.pdf');
  };

  return (
    <section className="w-full py-12 px-4 md:px-0" aria-labelledby="explore-heading">
      <div className="container mx-auto max-w-6xl">
        <h2 
          id="explore-heading"
          className="text-3xl md:text-4xl font-bold text-accent mb-8 text-center flex items-center justify-center gap-3 font-heading"
        >
          <LayoutGrid className="h-8 w-8" /> 
          <span>Explore More</span>
        </h2>
        
        {/* True bento-style grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-auto"
          role="region"
          aria-label="Feature cards"
        >
          {features.map((feature, index) => (
            <Card
              key={feature.name}
              className={cn(
                "overflow-hidden transition-all duration-300 border border-slate-200 dark:border-slate-700",
                "hover:shadow-lg hover:scale-[1.02] hover:z-10",
                // Apply custom background colors and spans from each feature
                feature.className
              )}
            >
              {feature.link ? (
                <Link 
                  href={feature.link}
                  target={feature.externalLink || isExternalLink(feature.link) ? '_blank' : '_self'}
                  rel={feature.externalLink || isExternalLink(feature.link) ? 'noopener noreferrer' : ''}
                  className="flex flex-col h-full"
                  aria-label={`${feature.name}: ${feature.description}`}
                >
                  <CardContent className="flex flex-col h-full p-0">
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-accent/10">
                          <feature.icon className="h-6 w-6 text-accent" />
                        </div>
                        <CardTitle className="text-xl font-medium text-foreground">
                          {feature.name}
                        </CardTitle>
                      </div>
                      <CardDescription className="text-sm text-muted-foreground">
                        {feature.description}
                      </CardDescription>
                    </div>
                    
                    {/* iFrame content if provided */}
                    {feature.iframeSrc && (
                      <div className="flex-grow mt-2 px-2 pb-4">
                        <iframe
                          src={feature.iframeSrc}
                          width="100%"
                          height={feature.iframeHeight || "150px"}
                          frameBorder="0"
                          loading="lazy"
                          title={feature.name}
                          className="rounded-md w-full"
                          sandbox="allow-scripts allow-same-origin"
                        />
                      </div>
                    )}
                    
                    {/* Show CTA button if provided and no iframe */}
                    {!feature.iframeSrc && feature.cta && (
                      <div className="mt-auto p-6 pt-0">
                        <div className="flex items-center text-sm font-medium text-accent">
                          {feature.cta}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 ml-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Link>
              ) : (
                <CardContent className="flex flex-col h-full p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-accent/10">
                      <feature.icon className="h-6 w-6 text-accent" />
                    </div>
                    <CardTitle className="text-xl font-medium text-foreground">
                      {feature.name}
                    </CardTitle>
                  </div>
                  <CardDescription className="text-sm text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                  
                  {/* iFrame content if provided */}
                  {feature.iframeSrc && (
                    <div className="flex-grow mt-4">
                      <iframe
                        src={feature.iframeSrc}
                        width="100%"
                        height={feature.iframeHeight || "150px"}
                        frameBorder="0"
                        loading="lazy"
                        title={feature.name}
                        className="rounded-md w-full"
                        sandbox="allow-scripts allow-same-origin"
                      />
                    </div>
                  )}
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;