"use client";

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Spline from '@splinetool/react-spline';
import { ChevronDownCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useEffect, useState } from 'react';

const images = [
  '/images/hero/download.jpg',
  '/images/hero/download%20(1).jpg',
  '/images/hero/images.jpg',
  '/images/hero/1739096682093.jpg',
  '/images/hero/1739096695433.jpg',
  '/images/hero/1742976664668.jpg',
  '/images/hero/1744317010280.jpg',
  '/images/hero/1754833626230.jpg',
  '/images/hero/1767560109415.jpg',
  '/images/hero/1767560110809.jpg',
  '/images/hero/WhatsApp%20Image%202025-04-12%20at%2011.23.16_95fecb1e.jpg',
  '/images/hero/WhatsApp%20Image%202025-04-13%20at%2015.06.50_bff0c27b.jpg',
  '/images/hero/WhatsApp%20Image%202025-04-13%20at%2015.06.53_10377330.jpg',
  '/images/hero/WhatsApp%20Image%202025-04-13%20at%2015.06.53_2fc65b1d.jpg',
  '/images/hero/WhatsApp%20Image%202025-04-13%20at%2015.06.53_47677fc8.jpg',
  '/images/hero/WhatsApp%20Image%202025-04-13%20at%2015.06.55_d7eef5a3.jpg',
  '/images/hero/WhatsApp%20Image%202025-04-13%20at%2015.06.57_530de533.jpg',
];

export default function HeroSection() {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact-info');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <TooltipProvider delayDuration={0}>
      <section className="relative min-h-screen flex flex-col justify-center items-center bg-background text-white overflow-hidden">
        {/* Background slideshow */}
        <div className="absolute inset-0 w-full h-full z-0">
          {images.map((url, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${idx === currentImageIndex ? 'opacity-100' : 'opacity-0'
                }`}
            >
              <Image
                src={url}
                alt={`Background ${idx + 1}`}
                fill
                sizes="100vw"
                quality={90}
                style={{ objectFit: 'cover' }}
                priority={idx === 0}
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-black/60" /> {/* Moved overlay outside the loop */}
        </div>

        <div className="absolute inset-0 z-10">
          <Spline
            scene="https://prod.spline.design/RYL-GG3FKx6g5eEK/scene.splinecode"
            className="h-full w-full"
          />
        </div>

        {/* Main content */}
        <div className="relative z-20 flex flex-col items-center justify-center text-center p-4 md:p-8 mt-20 pointer-events-none">
          <h1 className="doto-font text-7xl sm:text-8xl md:text-9xl lg:text-[180px] tracking-tighter leading-none drop-shadow-xl">
            <span className="block animate-fade-in-up">PRATHAM</span>
            <span className="block text-accent animate-fade-in-up animation-delay-200">JAIN</span>
          </h1>
          <p className="doto-font mt-4 md:mt-6 text-xl sm:text-2xl md:text-3xl text-white/80 max-w-3xl drop-shadow-md">
            Data Engineer & Machine Learning Engineer
          </p>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                onClick={scrollToContact}
                className="pointer-events-auto mt-10 md:mt-12 rounded-full shadow-xl hover:shadow-accent/40 transition-all duration-300 ease-in-out transform hover:scale-105 bg-white/10 hover:bg-white/20 backdrop-blur-md border-2 border-white/30 text-foreground w-16 h-16 flex items-center justify-center"
                aria-label="Explore My Work"
              >
                <ChevronDownCircle className="h-8 w-8" />
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
  );
}