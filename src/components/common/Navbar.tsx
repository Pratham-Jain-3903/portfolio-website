
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import ThemeToggle from '@/components/common/ThemeToggle';
import { Download } from 'lucide-react';
import { useTrackClick } from '@/hooks/use-track-click';

const navLinks = [
  // { name: 'Objective', href: '#objective' },
  // { name: 'Experience', href: '#experience' },
  // { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact-info' }
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const resumeDownloadTracker = useTrackClick('resume-download-button', { 
    action: 'download_resume',
    destination: 'google_drive'
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleResumeClick = async () => {
    // Track the download
    resumeDownloadTracker.onClick();
    
    // Also send to the resume_downloads endpoint for dedicated tracking
    try {
      const sessionId = typeof window !== 'undefined' ? sessionStorage.getItem('analyticsSessionId') || '' : '';
      await fetch('/api/analytics/resume_downloads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          timestamp: new Date().toISOString(),
          source: 'navbar',
        }),
      });
    } catch (e) {
      // Silently fail - don't block navigation
    }
    
    // Open the resume in a new tab
    // Note: Resume URL is specified in the issue requirements
    window.open('https://drive.google.com/file/d/1aNzxysdndIRi2BPtyiqrmuF5iYeAHStH/view?usp=sharing', '_blank');
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-lg" : "bg-transparent"
      )}
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-4">
          <Link href="/" className="text-2xl font-bold text-foreground hover:text-accent transition-colors font-heading">
            Pratham Jain
          </Link>
          <div className="flex items-center gap-3">
            <nav className="hidden md:flex space-x-2">
              {navLinks.map((link) => (
                <Button key={link.name} variant="ghost" asChild className="text-lg font-medium text-foreground hover:text-accent">
                  <Link href={link.href}>{link.name}</Link>
                </Button>
              ))}
            </nav>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleResumeClick}
              aria-label="Download Resume"
              className="relative w-10 h-10 rounded-full border border-border/60 hover:border-accent/70 hover:bg-accent/10"
              title="Download Resume"
            >
              <Download className="h-5 w-5" />
            </Button>
            <ThemeToggle />
          </div>
          {/* Mobile menu button can be added here if needed */}
        </div>
      </div>
    </header>
  );
}
