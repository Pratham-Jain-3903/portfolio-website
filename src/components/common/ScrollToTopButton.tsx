
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
      variant="outline"
      size="icon"
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-8 right-8 z-50 rounded-full p-3 shadow-lg transition-opacity duration-300 ease-in-out",
        "bg-accent/80 hover:bg-accent text-accent-foreground border-accent hover:border-accent-foreground",
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      aria-label="Scroll to top"
    >
      <ArrowUpCircle className="h-7 w-7" />
    </Button>
  );
}
