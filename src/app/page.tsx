
import HeroSection from '@/components/sections/HeroSection';
import ContactInfo from '@/components/sections/ContactInfo';
import Objective from '@/components/sections/Objective';
import Education from '@/components/sections/Education';
import Skills from '@/components/sections/Skills';
import Experience from '@/components/sections/Experience';
import FeatureGrid from '@/components/sections/FeatureGrid';
import { Separator } from '@/components/ui/separator';
import ScrollToTopButton from '@/components/common/ScrollToTopButton';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeroSection />
      <main className="container mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-16 md:space-y-20">
          <div id="contact-info" className="pt-20 -mt-20"> {/* Navbar offset correction */}
             <ContactInfo />
          </div>
          <Separator className="my-10 md:my-16" />
          <div id="objective" className="pt-20 -mt-20">  {/* Navbar offset correction */}
            <Objective />
          </div>
          <Separator className="my-10 md:my-16" />
          <div id="experience" className="pt-20 -mt-20">  {/* Navbar offset correction */}
            <Experience />
          </div>
          <Separator className="my-10 md:my-16" />
          <div id="education" className="pt-20 -mt-20">  {/* Navbar offset correction */}
            <Education />
          </div>
          <Separator className="my-10 md:my-16" />
          <div id="skills" className="pt-20 -mt-20">  {/* Navbar offset correction */}
            <Skills />
          </div>
          <Separator className="my-10 md:my-16" />
          <FeatureGrid />
        </div>
      </main>
      <footer className="py-10 text-center text-muted-foreground border-t mt-20">
        <p>&copy; {new Date().getFullYear()} Pratham Jain. All rights reserved.</p>
        <p className="text-sm">Crafted with passion and precision.</p>
      </footer>
      <ScrollToTopButton />
    </div>
  );
}
