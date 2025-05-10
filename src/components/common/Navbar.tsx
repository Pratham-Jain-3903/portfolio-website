
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

const navLinks = [
  { name: 'Objective', href: '#objective' },
  { name: 'Experience', href: '#experience' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact-info' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-lg" : "bg-transparent"
      )}
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-foreground hover:text-accent transition-colors font-heading">
            Pratham Jain
          </Link>
          <nav className="hidden md:flex space-x-2">
            {navLinks.map((link) => (
              <Button key={link.name} variant="ghost" asChild className="text-lg font-medium text-foreground hover:text-accent">
                <Link href={link.href}>{link.name}</Link>
              </Button>
            ))}
          </nav>
          {/* Mobile menu button can be added here if needed */}
        </div>
      </div>
    </header>
  );
}
