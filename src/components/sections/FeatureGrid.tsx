import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Award, Briefcase, DownloadCloud, FileText, Github, Users, LayoutGrid } from 'lucide-react';

interface FeatureItem {
  icon: React.ElementType;
  name: string;
  description: string;
  link: string;
  className?: string; // For col-span and row-span
  cta: string;
}

const features: FeatureItem[] = [
  {
    icon: Briefcase,
    name: "My Projects",
    description: "Explore a collection of my personal and academic projects, showcasing practical application of my skills.",
    link: "#projects", // Placeholder, update with actual links
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
    link: "/pratham-jain-resume.pdf", // Placeholder
    className: "md:col-span-1 md:row-span-1",
    cta: "Download PDF"
  },
  {
    icon: Github,
    name: "Open Source",
    description: "Check out my contributions to the open source community and collaborative projects.",
    link: "https://github.com/prathamjain", // Placeholder
    className: "md:col-span-2 md:row-span-1",
    cta: "Visit GitHub"
  },
   {
    icon: Users,
    name: "Testimonials",
    description: "See what colleagues and collaborators say about my work and skills.",
    link: "#testimonials",
    className: "md:col-span-3 md:row-span-1",
    cta: "Read More"
  },
];

const FeatureGrid: React.FC = () => {
  return (
    <section className="w-full">
       <h2 className="text-3xl font-semibold text-primary mb-8 text-center flex items-center justify-center">
        <LayoutGrid className="mr-3 h-8 w-8" /> Explore More
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature) => (
          <Card key={feature.name} className={`flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 ${feature.className || 'md:col-span-1 md:row-span-1'}`}>
            <CardHeader>
              <div className="flex items-center space-x-3 mb-2">
                <feature.icon className="h-10 w-10 text-accent" />
                <CardTitle className="text-xl text-primary">{feature.name}</CardTitle>
              </div>
              <CardDescription className="text-sm text-muted-foreground h-16 overflow-hidden">
                {feature.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              {/* Additional content can go here if needed */}
            </CardContent>
            <CardFooter>
              <Button asChild variant="default" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
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
