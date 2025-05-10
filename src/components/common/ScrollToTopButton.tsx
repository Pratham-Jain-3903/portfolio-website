"use client";

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <Button
      variant="default" // Use default for structural styles like backdrop-blur, border-width
      size="icon"
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-8 right-8 z-50 rounded-full p-3 shadow-lg transition-all duration-300 ease-in-out",
        // Override colors from 'default' variant to use 'accent' and match the new pattern
        "bg-accent/20 hover:bg-accent/30 border-accent/40 text-accent-foreground backdrop-blur-md", 
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      aria-label="Scroll to top"
    >
      <ArrowUpCircle className="h-7 w-7" />
    </Button>
  );
}
