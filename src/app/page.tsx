import HeroSection from '@/components/sections/HeroSection';
import ContactInfo from '@/components/sections/ContactInfo';
import Objective from '@/components/sections/Objective';
import Education from '@/components/sections/Education';
import Skills from '@/components/sections/Skills';
import Experience from '@/components/sections/Experience';
import FeatureGrid from '@/components/sections/FeatureGrid';
import { Separator } from '@/components/ui/separator';
import ScrollToTopButton from '@/components/common/ScrollToTopButton';
import Footer from '@/components/common/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <HeroSection />
      <main className="container mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 flex-grow">
        {/* Main content sections in the specified order */}
        <div className="space-y-16 md:space-y-24">
          <div id="objective" className="pt-20 -mt-20">
            <Objective />
          </div>
          
          <div id="contact-info" className="pt-20 -mt-20">
            <ContactInfo />
          </div>
          
          <div id="experience" className="pt-20 -mt-20">
            <Experience />
          </div>
          
          <div id="skills" className="pt-20 -mt-20">
            <Skills />
          </div>
          
          <div id="education" className="pt-20 -mt-20">
            <Education />
          </div>
        </div>
        
        <Separator className="my-16 md:my-24 bg-border/40" />
        
        <FeatureGrid />
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
