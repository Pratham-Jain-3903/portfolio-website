'use client';

import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { GithubIcon, LinkedinIcon } from 'lucide-react';
import Link from 'next/link';
import { sectionData } from '@/lib/data';
import { Application } from '@splinetool/runtime';
import { BackgroundBeams } from './ui/background-beams'; // Assuming this component exists and is needed
import About from '@/components/sections/Objective'; // Import the About component


const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let app: Application | null = null;
    let isMounted = true;

    const setupSpline = async () => {
      const canvas = canvasRef.current;

      if (!canvas || !isMounted) {
        return;
      }

      try {
        app = new Application(canvas);
        await app.load('https://prod.spline.design/vPAUfiZt37KAdHi4/scene.splinecode');
      } catch (error) {
        console.error('[Hero] Failed to load Spline scene:', error);
      }
    };

    setupSpline();

    return () => {
      isMounted = false;

      if (app && typeof app.dispose === 'function') {
        app.dispose();
      }
    };
  }, []);

  return (
    <section
      id='home'
      className='relative flex flex-col items-center justify-center py-12 md:py-24 lg:py-32 xl:py-48 overflow-hidden text-center'
    >
      <BackgroundBeams className='absolute top-0 left-0 w-full h-full pointer-events-none' />

      <div className='container px-4 md:px-6 relative z-10'>
        <div className='grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(320px,560px)] lg:items-center lg:gap-12'>
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
          <div className='order-first flex items-center justify-center min-h-[320px] sm:min-h-[420px] lg:order-none lg:min-h-[520px]'>
            <canvas
              ref={canvasRef}
              id='canvas3d'
              className='h-[320px] w-full max-w-[520px] bg-transparent sm:h-[420px] lg:h-[520px]'
              style={{ display: 'block', borderRadius: '1rem' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;