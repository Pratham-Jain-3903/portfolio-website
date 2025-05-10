'use client';

import { Button } from '@/components/ui/button';
import { GithubIcon, LinkedinIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { sectionData } from '@/lib/data';
import SectionHeading from './SectionHeading';
import { HeroIcons } from './HeroIcons';
import { BackgroundBeams } from './ui/background-beams'; // Assuming this component exists and is needed
import About from '@/components/sections/Objective'; // Import the About component

const Hero: React.FC = () => {
  // Assuming About component renders the text directly within its CardContent
  // Or you can extract the text from the component if needed, but rendering directly might be simpler initially.

  return (
    <section
      id='home'
      className='relative flex flex-col items-center justify-center py-12 md:py-24 lg:py-32 xl:py-48 overflow-hidden text-center'
    >
      <BackgroundBeams className='absolute top-0 left-0 w-full h-full pointer-events-none' />

      <div className='container px-4 md:px-6 relative z-10'>
        <div className='grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]'>
          <div className='flex flex-col justify-center space-y-4'>
            <div className='space-y-2'>
              <h1 className='text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/80 to-foreground animate-gradient'>
                {sectionData.hero.title}
              </h1>
              <p className='max-w-[600px] md:text-xl text-muted-foreground mx-auto'>
                {sectionData.hero.subtitle}
              </p>
            </div>

            {/* Integrate the About content here */}
            <div className="max-w-[700px] mx-auto text-md text-foreground/90 space-y-4 mt-6">
               {/* Assuming About component directly renders the text within its CardContent */}
              <About />
            </div>


            <div className='flex flex-col gap-2 min-[400px]:flex-row justify-center mt-6'>
              {sectionData.hero.ctaButtons.map((button, index) => (
                <Button key={index} asChild variant={button.variant}>
                  <Link href={button.href} target={button.target}>
                    {button.text}
                    {button.icon === 'GithubIcon' && <GithubIcon className='ml-2 h-5 w-5' />}
                    {button.icon === 'LinkedinIcon' && <LinkedinIcon className='ml-2 h-5 w-5' />}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
          <div className='hidden lg:flex items-center justify-center'>
            <HeroIcons />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;