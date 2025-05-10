
"use client";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/common/Navbar';
import { ChevronDownCircle } from 'lucide-react'; 
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import FeatureGrid from '@/components/sections/FeatureGrid';
import ContactInfo from '@/components/sections/ContactInfo';
import Skills from '@/components/sections/Skills';
import Education from '@/components/sections/Education';

export default function Home() {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact-info');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

    return (
      <div className="bg-background text-foreground">
        {/* Hero Section */}
        <Navbar />
        <TooltipProvider delayDuration={0}>
          <section className="relative min-h-screen flex flex-col justify-center items-center bg-background text-foreground overflow-hidden">
            {/* Removed Navbar from Hero Section to be a persistent element in layout.tsx */}
            <div className="absolute inset-0 z-0">
              <Image
                src="https://picsum.photos/seed/space-hero/1920/1080"
                alt="Deep space background with stars and nebulae"
                layout="fill"
                objectFit="cover"
                quality={90}
                priority
                data-ai-hint="galaxy stars"
              />
              <div className="absolute inset-0 bg-black/60"></div> {/* Dark overlay for text readability */}
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center text-center p-4 md:p-8 mt-20"> {/* Added mt-20 for navbar space */}
              <h1 className="font-heading text-7xl sm:text-8xl md:text-9xl lg:text-[180px] font-black tracking-tighter leading-none drop-shadow-xl font-doto">
                <span className="block text-foreground animate-fade-in-up">PRATHAM</span>
                <span className="block text-accent animate-fade-in-up animation-delay-200">JAIN</span> {/* Added delay */}
              </h1>
              <p className="mt-4 md:mt-6 text-xl sm:text-2xl md:text-3xl text-foreground/80 font-medium max-w-3xl drop-shadow-md">
                Data Engineer & Machine Learning Engineer
              </p>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    onClick={scrollToContact}
                    className="mt-10 md:mt-12 rounded-full shadow-xl hover:shadow-accent/40
                           transition-all duration-300 ease-in-out transform hover:scale-105
                           bg-white/10 hover:bg-white/20 backdrop-blur-md border-2 border-white/30 text-foreground
                           w-16 h-16 flex items-center justify-center" // Explicitly set size and ensure content centering
                    aria-label="Explore My Work"
                  >
                    <ChevronDownCircle className="h-8 w-8" /> {/* User requested icon, larger size */}
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="bg-background/80 backdrop-blur-md text-foreground border-border/40 shadow-lg rounded-md"
                >
                  <p className="font-semibold">Explore My Work</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </section>
        </TooltipProvider>

        {/* Removed the auto-scroll down button div based on user request */}

        <FeatureGrid />
        <Skills />
        <Education />
        <ContactInfo />
      </div>
  );
}

