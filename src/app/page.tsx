// This is the home page component
import { Suspense } from 'react';
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
// import GitHubCalendar from '@/components/sections/GitHubCalendar'; // Import GitHubCalendar
import LinkedInPostCarousel from '@/components/sections/LinkedInPostCarousel'; // Import LinkedInPostCarousel
import ScrollToTopButton from '@/components/common/ScrollToTopButton';
import Footer from '@/components/common/Footer';
import { Skeleton } from '@/components/ui/skeleton';
import Navbar from '@/components/common/Navbar'; // Import the Navbar component

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
  className = ""
}: {
  id: string;
  children: React.ReactNode;
  className?: string
}) => (
  <section
    id={id}
    className={`scroll-mt-16 h-full ${className}`}
  >
    <Suspense fallback={<SectionSkeleton />}>
      <div className="h-full">
        {children}
      </div>
    </Suspense>
  </section>
);

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Add the Navbar component here */}
      <Navbar />

      {/* Hero section takes full width */}
      <HeroSection />

      {/* Main content with Truly Gapless Bento Grid Layout */}
      <main className="flex-grow w-full bg-background">
        <div className="w-full px-4 py-1 relative">
          {/* Row 1: Objective (Adjusted Width) + Contact Info (Adjusted Width) */}
          <div className="flex flex-col md:flex-row w-full pb-1">
            {/* Introduction/Objective Section with hover effect */}
            <div className="w-full md:w-2/3 md:pr-1 pb-1 p-4 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"> {/* Already had padding/hover */}
              <Section id="objective">
                <Objective />
              </Section>
            </div>

            {/* Contact Information Section with hover effect */}
            <div className="w-full md:w-1/3">
              <Section id="contact-info">

                <ContactInfo />
              </Section>
            </div>
          </div>

          {/* Truly Gapless Bento Grid using flex and absolute positioning */}
          <div className="relative w-full">
            {/* Row 1: Objective already placed above as full width */}

            {/* Row 2: Experience (2/3) + Skills (1/3) */}
            <div className="flex flex-col md:flex-row w-full">
              <div className="w-full md:w-2/3 md:pr-1 pb-1 p-4 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"> {/* Already had padding/hover */}
                <Section id="experience">
                  <Experience />
                </Section> {/* Already had padding/hover */}
              </div>
              <div className="w-full md:w-1/3 pb-1 p-4 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
                <Section id="skills">

                  <Skills />
                </Section>
              </div>
            </div>

            {/* Row 3: Freelance (1/2) + Volunteer (1/2) + Recommendations (1/2) + Certifications (1/2) */}
            <div className="flex flex-col md:flex-row w-full">
              <div className="w-full md:w-1/2 md:pr-1 pb-1 p-4 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"> {/* Already had padding/hover */}
                <Section id="freelance-experience">
                  <FreelanceExperience />
                </Section> {/* Already had padding/hover */}
              </div>

              <div className="w-full md:w-1/2 pb-1 p-4 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"> {/* Already had padding/hover */}

                <Section id="volunteer-experience">
                  <VolunteerExperience />
                </Section>
              </div>
            </div>

            {/* New Row: Recommendations (1/2) + Certifications (1/2) */}
            <div className="flex flex-col md:flex-row w-full pb-1"> {/* Adding consistent row gap */}
              <div className="w-full md:w-1/2 md:pr-1 p-4 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"> {/* Already had padding/hover, just adding consistent row gap */}
                <Section id="recommendations">
                  <Recommendations />
                </Section>
              </div>
              <div className="w-full md:w-1/2 p-4 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"> {/* Applying padding and hover effect */}
                <Section id="certifications">
                  <Certifications />
                </Section>
              </div>
            </div>

            {/* Row 4: Projects (full width) */}
            <div className="w-full pb-1 p-4 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"> {/* Applying padding and hover effect */}
              <Section id="projects">
                <Projects />
              </Section>
            </div>

            {/* Row 5: Education */}
            <div className="flex flex-col md:flex-row w-full pb-1"> {/* Adding consistent row gap */}
              <div className="w-full md:w-3/5 p-4 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"> {/* Adjusted width and added padding/hover */}
                <Section id="education">
                  <Education />
                </Section>
              </div>
              {/* GitHub Calendar Section */}
              <div className="w-full md:w-2/5 p-4 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"> {/* Added padding and hover effect */}
                <Section id="github-calendar"> {/* Added id */}
                  <h2 className="text-2xl font-bold text-foreground mb-4">GitHub Contributions</h2> {/* Added Heading */}
                  <h3 className="text-2xl font-medium text-foreground mb-4">coming soon</h3> {/* Added Heading */}
                </Section>
              </div>
            </div>
          </div>

          {/* New Row for LinkedIn Post Carousel */}
          <div className="w-full px-4 py-1 relative"> {/* Added padding and relative positioning */}
            <Section id="linkedin-posts"> {/* Added ID for navigation */}
              <h2 className="text-2xl font-bold text-foreground mb-4">LinkedIn Posts</h2> {/* Added Heading */}
              <LinkedInPostCarousel postUrls={[
                "https://www.linkedin.com/posts/iiitraichur_iiitraichur-iiitr-iiitr-activity-7274800882293092352-2oK6?utm_source=share&utm_medium=member_desktop&rcm=ACoAADUozZ4BLGo-pv19AgZuZXbWiYOrD-5x_R0",
                "https://www.linkedin.com/posts/pratham-jain-56682620a_amazonmlchallenge-machinelearning-visionlanguage-activity-7243848942486966272-BL4d?utm_source=share&utm_medium=member_desktop&rcm=ACoAADUozZ4BLGo-pv19AgZuZXbWiYOrD-5x_R0",
                "https://www.linkedin.com/posts/pratham-jain-56682620a_google-genaiexchange-googlecloud-activity-7317445686927544321-mb2B?utm_source=share&utm_medium=member_desktop&rcm=ACoAADUozZ4BLGo-pv19AgZuZXbWiYOrD-5x_R0",
                "https://www.linkedin.com/posts/pratham-jain-56682620a_from-classrooms-to-real-world-impact-activity-7295481131729117184-6egB?utm_source=share&utm_medium=member_desktop&rcm=ACoAADUozZ4BLGo-pv19AgZuZXbWiYOrD-5x_R0"
              ]} />
            </Section>
          </div>
        </div>
      </main>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
