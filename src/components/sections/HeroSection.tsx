import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center bg-background text-foreground overflow-hidden">
      <div className="absolute inset-0 opacity-5 dark:opacity-[0.03]">
         <Image
          src="https://picsum.photos/seed/hero-bg-abstract/1920/1080"
          alt="Abstract background pattern"
          layout="fill"
          objectFit="cover"
          priority
          data-ai-hint="abstract geometric"
        />
      </div>
      <div className="relative z-10 flex-grow flex flex-col items-center justify-center text-center p-4 md:p-8 pt-20 md:pt-24">
        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter leading-tight">
          <span className="block">Pratham</span>
          <span className="block text-accent">Jain</span>
        </h1>
        <p className="mt-6 md:mt-8 text-xl sm:text-2xl md:text-3xl text-muted-foreground font-semibold max-w-3xl">
          Data Engineer & Machine Learning Engineer
        </p>
        <Button 
          size="lg" 
          asChild 
          className="mt-10 md:mt-12 text-lg font-semibold px-10 py-7 rounded-lg shadow-lg hover:shadow-accent/30 transition-all duration-300 ease-in-out transform hover:scale-105 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Link href="#contact-info">Explore My Work</Link>
        </Button>
      </div>

      {/* Optional: Decorative elements or subtle bottom image band */}
      <div className="relative h-[15vh] md:h-[20vh] w-full mt-auto">
         <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent"></div>
      </div>
    </section>
  );
}
