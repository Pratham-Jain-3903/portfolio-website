// This is the home page component
"use client";

import { Suspense, useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import HeroSection from '@/components/sections/HeroSection';
import ContactInfo from '@/components/sections/ContactInfo';
import Objective from '@/components/sections/Objective';
import Skills from '@/components/sections/Skills';
import Experience from '@/components/sections/Experience';
import Projects from '@/components/sections/Projects';
import FreelanceExperience from '@/components/sections/FreelanceExperience';
import Certifications from '@/components/sections/Certifications';
import Recommendations from '@/components/sections/Recommendations';
import VolunteerExperience from '@/components/sections/VolunteerExperience';
import Education from '@/components/sections/Education';
import LinkedInPostCarousel from '@/components/sections/LinkedInPostCarousel';
import ScrollToTopButton from '@/components/common/ScrollToTopButton';
import Footer from '@/components/common/Footer';
import { Skeleton } from '@/components/ui/skeleton';
import Navbar from '@/components/common/Navbar';
import FilterBar, { type FilterId, filters } from '@/components/common/FilterBar';
import FeedbackWidget from '@/components/common/FeedbackWidget';
import DetailSidebar from '@/components/common/DetailSidebar';
import { SectionCard } from '@/components/common/SectionCard';
import { cn } from '@/lib/utils';

// Loading skeletons for better UX during component loading
const SectionSkeleton = () => (
  <div className="space-y-4 py-4">
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
  className = "",
  hidden = false
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
  hidden?: boolean;
}) => (
  <section
    id={id}
    data-section={id}
    className={cn(
      "scroll-mt-32 h-full transition-all duration-200",
      hidden && "hidden",
      className
    )}
  >
    <Suspense fallback={<SectionSkeleton />}>
      <div className="h-full">
        {children}
      </div>
    </Suspense>
  </section>
);

// Helper to check if section should be visible based on filter
function isSectionVisible(sectionId: string, activeFilter: FilterId): boolean {
  if (activeFilter === 'all') return true;
  const filter = filters.find(f => f.id === activeFilter);
  if (!filter) return true;
  return filter.sectionIds.includes(sectionId);
}

function HomeContent() {
  const searchParams = useSearchParams();
  const detailParam = searchParams.get('detail');
  const [activeFilter, setActiveFilter] = useState<FilterId>('all');
  const [sidebarProjectId, setSidebarProjectId] = useState<string | null>(null);

  // Initialize sidebar from URL on mount
  useEffect(() => {
    setSidebarProjectId((current) => {
      const nextValue = detailParam || null;
      return current === nextValue ? current : nextValue;
    });
  }, [detailParam]);

  const handleFilterChange = useCallback((filter: FilterId) => {
    setActiveFilter(filter);
    // If filter removes the section containing expanded sidebar project, close it
    if (filter !== 'all' && filter !== 'projects' && sidebarProjectId) {
      setSidebarProjectId(null);
    }
  }, [sidebarProjectId]);

  const handleOpenSidebar = useCallback((projectId: string) => {
    setSidebarProjectId(projectId);
  }, []);

  const handleCloseSidebar = useCallback(() => {
    setSidebarProjectId(null);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Hero section takes full width */}
      <HeroSection />

      {/* Main content with CSS Grid Bento Layout */}
      <main className="flex-grow w-full bg-background pb-20">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* CSS Grid with gap-6 for consistent spacing */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-max">
            {/* Row 1: Objective (2/3) + Contact Info (1/3) */}
            <div className={cn("md:col-span-2", !isSectionVisible('objective', activeFilter) && "hidden")}>
              <SectionCard>
                <Section id="objective">
                  <Objective />
                </Section>
              </SectionCard>
            </div>
            <div className={cn("md:col-span-1", !isSectionVisible('contact-info', activeFilter) && "hidden")}>
              <SectionCard>
                <Section id="contact-info">
                  <ContactInfo />
                </Section>
              </SectionCard>
            </div>

            {/* Row 2: Experience (2/3) + Skills (1/3) */}
            <div className={cn("md:col-span-2", !isSectionVisible('experience', activeFilter) && "hidden")}>
              <SectionCard>
                <Section id="experience">
                  <Experience />
                </Section>
              </SectionCard>
            </div>
            <div className={cn("md:col-span-1", !isSectionVisible('skills', activeFilter) && "hidden")}>
              <SectionCard>
                <Section id="skills">
                  <Skills />
                </Section>
              </SectionCard>
            </div>

            {/* Row 3: Freelance (1/2) + Volunteer (1/2) */}
            <div className={cn("md:col-span-1", !isSectionVisible('freelance-experience', activeFilter) && "hidden")}>
              <SectionCard>
                <Section id="freelance-experience">
                  <FreelanceExperience />
                </Section>
              </SectionCard>
            </div>
            <div className={cn("md:col-span-2", !isSectionVisible('volunteer-experience', activeFilter) && "hidden")}>
              <SectionCard>
                <Section id="volunteer-experience">
                  <VolunteerExperience />
                </Section>
              </SectionCard>
            </div>

            {/* Row 4: Recommendations (full width) */}
            <div className={cn("md:col-span-3", !isSectionVisible('recommendations', activeFilter) && "hidden")}>
              <SectionCard>
                <Section id="recommendations">
                  <Recommendations />
                </Section>
              </SectionCard>
            </div>

            {/* Row 4: Certifications (full width) */}
            <div className={cn("md:col-span-3", !isSectionVisible('certifications', activeFilter) && "hidden")}>
              <SectionCard>
                <Section id="certifications">
                  <Certifications />
                </Section>
              </SectionCard>
            </div>

            {/* Row 5: Education (full width) */}
            <div className={cn("md:col-span-3", !isSectionVisible('education', activeFilter) && "hidden")}>
              <SectionCard>
                <Section id="education">
                  <Education />
                </Section>
              </SectionCard>
            </div>

            {/* Row 6: Projects (full width - 3/3) */}
            <div className={cn("md:col-span-3", !isSectionVisible('projects', activeFilter) && "hidden")}>
              <SectionCard>
                <Section id="projects">
                  <Projects onOpenSidebar={handleOpenSidebar} />
                </Section>
              </SectionCard>
            </div>

            {/* Row 6: LinkedIn Posts (full width - 3/3) */}
            <div className={cn("md:col-span-3", activeFilter !== 'all' && "hidden")}>
              <SectionCard>
                <Section id="linkedin-posts">
                  <div className="space-y-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">LinkedIn Posts</h2>
                    <LinkedInPostCarousel postUrls={[
                      "https://www.linkedin.com/posts/iiitraichur_iiitraichur-iiitr-iiitr-activity-7274800882293092352-2oK6?utm_source=share&utm_medium=member_desktop&rcm=ACoAADUozZ4BLGo-pv19AgZuZXbWiYOrD-5x_R0",
                      "https://www.linkedin.com/posts/pratham-jain-56682620a_amazonmlchallenge-machinelearning-visionlanguage-activity-7243848942486966272-BL4d?utm_source=share&utm_medium=member_desktop&rcm=ACoAADUozZ4BLGo-pv19AgZuZXbWiYOrD-5x_R0",
                      "https://www.linkedin.com/posts/pratham-jain-56682620a_google-genaiexchange-googlecloud-activity-7317445686927544321-mb2B?utm_source=share&utm_medium=member_desktop&rcm=ACoAADUozZ4BLGo-pv19AgZuZXbWiYOrD-5x_R0",
                      "https://www.linkedin.com/posts/pratham-jain-56682620a_from-classrooms-to-real-world-impact-activity-7295481131729117184-6egB?utm_source=share&utm_medium=member_desktop&rcm=ACoAADUozZ4BLGo-pv19AgZuZXbWiYOrD-5x_R0"
                    ]} />
                  </div>
                </Section>
              </SectionCard>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <ScrollToTopButton />

      {/* Fixed bottom filter bar */}
      <FilterBar activeFilter={activeFilter} onFilterChange={handleFilterChange} />

      {/* Fixed left feedback widget */}
      <FeedbackWidget />

      {/* Right-side detail sidebar */}
      <DetailSidebar projectId={sidebarProjectId} onClose={handleCloseSidebar} />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<SectionSkeleton />}>
      <HomeContent />
    </Suspense>
  );
}
