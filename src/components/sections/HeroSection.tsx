
"use client";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/common/Navbar';
import { ArrowDownCircle, ChevronDownCircle } from 'lucide-react';

export default function HeroSection() {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact-info');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center bg-background text-foreground overflow-hidden">
      <Navbar />
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
        <h1 className="text-7xl sm:text-8xl md:text-9xl lg:text-[180px] font-black tracking-tighter leading-none drop-shadow-xl">
          <span className="block text-foreground">PRATHAM</span>
          <span className="block text-accent">JAIN</span>
        </h1>
        <p className="mt-4 md:mt-6 text-xl sm:text-2xl md:text-3xl text-foreground/80 font-medium max-w-3xl drop-shadow-md">
          Data Engineer & Machine Learning Engineer
        </p>
        
        <Button
          size="lg"
          onClick={scrollToContact}
          className="mt-10 md:mt-12 text-lg font-semibold px-10 py-7 rounded-full shadow-xl hover:shadow-accent/40 
                     transition-all duration-300 ease-in-out transform hover:scale-105 
                     bg-white/10 hover:bg-white/20 backdrop-blur-md border-2 border-white/30 text-foreground"
        >
          Explore My Work 
          <ArrowDownCircle className="ml-2 h-6 w-6" />
        </Button>
      </div>

      <div className="absolute bottom-10 z-10 text-center w-full">
        <button
            onClick={scrollToContact}
            aria-label="Scroll to next section"
            className="p-2 text-foreground/70 hover:text-accent transition-colors duration-300 animate-pulse-subtle"
        >
            <ChevronDownCircle size={48} strokeWidth={1.5} />
        </button>
      </div>
    </section>
  );
}
