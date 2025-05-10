
import HeroSection from '@/components/sections/HeroSection';
import ContactInfo from '@/components/sections/ContactInfo';
import Objective from '@/components/sections/Objective';
import Education from '@/components/sections/Education';
import Skills from '@/components/sections/Skills';
import Experience from '@/components/sections/Experience';
import FeatureGrid from '@/components/sections/FeatureGrid';
import { Separator } from '@/components/ui/separator';
import ScrollToTopButton from '@/components/common/ScrollToTopButton';
import Footer from '@/components/common/Footer'; // Import the new Footer component

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <HeroSection />
      <main className="container mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 flex-grow">
        {/* Main content bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12 mb-16 md:mb-20">
          <div id="contact-info" className="pt-20 -mt-20 md:col-span-1 lg:col-span-1">
             <ContactInfo />
          </div>
          
          <div id="objective" className="pt-20 -mt-20 md:col-span-1 lg:col-span-2">
            <Objective />
          </div>
          
          <div id="experience" className="pt-20 -mt-20 md:col-span-2 lg:col-span-3">
            <Experience />
          </div>
          
          <div id="education" className="pt-20 -mt-20 md:col-span-1 lg:col-span-1">
            <Education />
          </div>
          
          <div id="skills" className="pt-20 -mt-20 md:col-span-1 lg:col-span-2">
            <Skills />
          </div>
        </div>
        
        <Separator className="my-10 md:my-16 bg-border/40" />
        
        <FeatureGrid />
      </main>
      <Footer /> {/* Use the new Footer component */}
      <ScrollToTopButton />
    </div>
  );
}
