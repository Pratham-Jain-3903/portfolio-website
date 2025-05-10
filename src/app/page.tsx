import HeaderSection from '@/components/sections/HeaderSection';
import ContactInfo from '@/components/sections/ContactInfo';
import Objective from '@/components/sections/Objective';
import Education from '@/components/sections/Education';
import Skills from '@/components/sections/Skills';
import Experience from '@/components/sections/Experience';
import FeatureGrid from '@/components/sections/FeatureGrid';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeaderSection />
      <main className="container mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-12 md:space-y-16">
          <ContactInfo />
          <Separator className="my-8 md:my-12" />
          <Objective />
          <Separator className="my-8 md:my-12" />
          <Experience />
          <Separator className="my-8 md:my-12" />
          <Education />
          <Separator className="my-8 md:my-12" />
          <Skills />
          <Separator className="my-8 md:my-12" />
          <FeatureGrid />
        </div>
      </main>
      <footer className="py-8 text-center text-muted-foreground border-t mt-16">
        <p>&copy; {new Date().getFullYear()} Pratham Jain. All rights reserved.</p>
        <p className="text-sm">Designed with passion and precision.</p>
      </footer>
    </div>
  );
}
