import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Award, Briefcase, DownloadCloud, FileText, Github, Users, LayoutGrid, CalendarDays } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureItem {
  icon: React.ElementType;
  name: string;
  description: string;
  link: string;
  className?: string; 
  cta: string;
}

const features: FeatureItem[] = [
  {
    icon: Briefcase,
    name: "My Projects",
    description: "Explore a collection of my personal and academic projects, showcasing practical application of my skills.",
    link: "#projects", 
    className: "md:col-span-2 md:row-span-2",
    cta: "View Projects"
  },
  {
    icon: FileText,
    name: "Tech Blog",
    description: "Read my thoughts, findings, and tutorials on various data engineering and machine learning topics.",
    link: "#blog",
    className: "md:col-span-1 md:row-span-1",
    cta: "Read Blog"
  },
  {
    icon: Award,
    name: "Certifications",
    description: "View my professional certifications and accreditations that validate my expertise.",
    link: "#certifications",
    className: "md:col-span-1 md:row-span-1",
    cta: "See Certs"
  },
  {
    icon: DownloadCloud,
    name: "Download Resume",
    description: "Get a PDF copy of my comprehensive resume detailing my skills and experience.",
    link: "/pratham-jain-resume.pdf", 
    className: "md:col-span-1 md:row-span-1",
    cta: "Download PDF"
  },
  {
    icon: Github,
    name: "Open Source",
    description: "Check out my contributions to the open source community and collaborative projects.",
    link: "https://github.com/Pratham-Jain-3903", 
    className: "md:col-span-2 md:row-span-1",
    cta: "Visit GitHub"
  },
  {
    icon: CalendarDays,
    name: "GitHub Contributions",
    description: "View my activity and contributions calendar on GitHub.",
    link: "https://github.com/Pratham-Jain-3903",
    className: "md:col-span-1 md:row-span-1",
    cta: "View Calendar"
  },
   {
    icon: Users,
    name: "Testimonials",
    description: "See what colleagues and collaborators say about my work and skills.",
    link: "#testimonials",
    className: "md:col-span-2 md:row-span-1", // Adjusted from col-span-3
    cta: "Read More"
  },
];

const FeatureGrid: React.FC = () => {
  return (
    <section className="w-full py-8">
       <h2 className="text-4xl md:text-5xl font-bold text-accent mb-12 text-center flex items-center justify-center font-heading">
        <LayoutGrid className="mr-3 h-10 w-10" /> Explore More
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
        {features.map((feature) => (
          <Card 
            key={feature.name} 
            className={cn(
              "flex flex-col shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-none",
              "first:rounded-tl-xl last:rounded-br-xl", // Base mobile/overall
              "md:first:rounded-tl-xl md:last:rounded-br-xl", // MD overrides for first/last
              "md:[&:nth-child(2)]:rounded-tr-xl", // Blog card (top-right)
              "md:[&:nth-child(4)]:rounded-bl-xl", // Resume card (starts a new visual row under Projects)
              "md:[&:nth-child(6)]:rounded-bl-xl", // GitHub Contributions card (starts its row)
              feature.className || 'md:col-span-1 md:row-span-1'
            )}
          >
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3 mb-3">
                <feature.icon className="h-10 w-10 text-accent" />
                <CardTitle className="text-2xl font-semibold text-accent">{feature.name}</CardTitle>
              </div>
              <CardDescription className="text-md text-muted-foreground min-h-[60px]">
                {feature.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              {/* Additional content can go here if needed */}
            </CardContent>
            <CardFooter>
              <Button 
                asChild 
                variant="default" 
                className="w-full text-md py-3 font-semibold"
              >
                <Link href={feature.link} target={feature.link.startsWith('http') || feature.link.startsWith('/') ? '_blank' : '_self'}>
                  {feature.cta}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default FeatureGrid;
