// This is the home page component
import { Suspense } from 'react';
import HeroSection from '@/components/sections/HeroSection';
import ContactInfo from '@/components/sections/ContactInfo';
import Objective from '@/components/sections/Objective';
import Education from '@/components/sections/Education';
import Skills from '@/components/sections/Skills';
import Experience from '@/components/sections/Experience';
import VolunteerExperience from '@/components/sections/VolunteerExperience';
import FeatureGrid from '@/components/sections/FeatureGrid';
import { Separator } from '@/components/ui/separator';
import ScrollToTopButton from '@/components/common/ScrollToTopButton';
import Footer from '@/components/common/Footer';
import { Skeleton } from '@/components/ui/skeleton';

// Loading skeletons for better UX during component loading
const SectionSkeleton = () => (
  <div className="space-y-4 py-8">
    <Skeleton className="h-8 w-1/3" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-4/6" />
    </div>
  </div>
);

// Section wrapper component with proper scroll margins
const Section = ({ 
  id, 
  children, 
  className = "" 
}: { 
  id: string; 
  children: React.ReactNode; 
  className?: string 
}) => (
  <section 
    id={id}
    className={`scroll-mt-24 ${className}`}
  >
    <Suspense fallback={<SectionSkeleton />}>
      {children}
    </Suspense>
  </section>
);

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero section takes full width */}
      <HeroSection />
      
      {/* Main content */}
      <main className="flex-grow">
        {/* Core resume sections with container */}
        <div className="container mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <Section id="objective">
            <Objective />
          </Section>

          <Section id="contact-info" className="mt-16">
            <ContactInfo />
          </Section>

          <Section id="experience" className="mt-16">
            <Experience />
          </Section>

          <Section id="volunteer-experience" className="mt-16">
 <VolunteerExperience />
          </Section>

          <Section id="skills" className="mt-16">
            <Skills />
          </Section>

          <Section id="education" className="mt-16">
            <Education />
          </Section>
        
          <Separator className="my-16 bg-border/40" />
        </div>
        
        {/* Feature grid section can bleed to edges on smaller screens if needed */}
        <div className="bg-gradient-to-b from-background to-background/95 py-8">
          <Suspense fallback={<SectionSkeleton />}>
            <FeatureGrid />
          </Suspense>
        </div>
      </main>
      
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}