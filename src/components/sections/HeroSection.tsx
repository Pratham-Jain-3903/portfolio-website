"use client";

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDownCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useState, useEffect } from 'react';

const images = [
  "https://media.licdn.com/dms/image/v2/D5622AQGsNXz6g4MTFQ/feedshare-shrink_1280/B56ZYzKDzUGUAk-/0/1744614999972?e=1749686400&v=beta&t=gxactCTnELL-L3hq1TcjySQubl7B6PU2UBdVTmBNLNE",
  "https://media.licdn.com/dms/image/v2/D5622AQHR-yZHnH_rVw/feedshare-shrink_1280/B56ZYzKD1CGUAo-/0/1744615000421?e=1749686400&v=beta&t=zEISDypfTCqql_O_m0yjKZilNxxxWNAkgaYjcIZuWOQ",
    "https://images.unsplash.com/photo-1551836022-d5d88e9218df",
  "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
  "https://media.licdn.com/dms/image/v2/D5622AQHeL4vR99W7QQ/feedshare-shrink_1280/B56ZYzKDyoGoAk-/0/1744614999944?e=1749686400&v=beta&t=SQSt_UXdKpBijcRjVI15ZZBIgx4bsRJBmKqXP0gIxtQ",
  "https://media.licdn.com/dms/image/v2/D5622AQHtObyxHOXkWw/feedshare-shrink_1280/B56ZYzKDzxGoAk-/0/1744615000512?e=1749686400&v=beta&t=xbtEXPDC7lpoXT_OkFqHEXrmrmM2mpXfCGUrjwkAMdA",
    "https://images.unsplash.com/photo-1593642532973-d31b6557fa68",
  "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg",
  "https://media.licdn.com/dms/image/v2/D562DAQFBQDRqysyTjg/profile-treasury-image-shrink_800_800/B56ZY0qwh4GoAY-/0/1744640348312?e=1747497600&v=beta&t=nbniDyYfSCXVdQTXX9J2Dw5wtGzbO7SE9yjXXvy5U9w",
  "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
  "https://media.licdn.com/dms/image/v2/D5622AQHeL4vR99W7QQ/feedshare-shrink_1280/B56ZYzKDyoGoAk-/0/1744614999944?e=1749686400&v=beta&t=SQSt_UXdKpBijcRjVI15ZZBIgx4bsRJBmKqXP0gIxtQ",
  "https://media.licdn.com/dms/image/v2/D5622AQHtObyxHOXkWw/feedshare-shrink_1280/B56ZYzKDzxGoAk-/0/1744615000512?e=1749686400&v=beta&t=xbtEXPDC7lpoXT_OkFqHEXrmrmM2mpXfCGUrjwkAMdA",
    "https://images.unsplash.com/photo-1593642532973-d31b6557fa68",
  "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg",
  "https://media.licdn.com/dms/image/v2/D562DAQFBQDRqysyTjg/profile-treasury-image-shrink_800_800/B56ZY0qwh4GoAY-/0/1744640348312?e=1747497600&v=beta&t=nbniDyYfSCXVdQTXX9J2Dw5wtGzbO7SE9yjXXvy5U9w",
  "https://media.licdn.com/dms/image/v2/D4D2DAQEE15D98C2w3A/profile-treasury-image-shrink_1280_1280/B4DZYhZTHNHwAU-/0/1744317010280?e=1747497600&v=beta&t=ShyKCHrXQ-3c3Jw20ziKZnNmIA4lQ-J6jIvEyYIq2FY",
  "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg",
  "https://media.licdn.com/dms/image/v2/D4D2DAQFXo7ZZ4Eu5UQ/profile-treasury-image-shrink_800_800/B4DZTqPWvSG8Ac-/0/1739096682093?e=1747497600&v=beta&t=rxaYlMBUun1ZsgMecDHXGuGWhHVXD_VIqm3JbUNjQWg",
  "https://media.licdn.com/dms/image/v2/D4D2DAQGdn7u0L1KQ4w/profile-treasury-image-shrink_800_800/B4DZTqPCzAGkAc-/0/1739096600447?e=1747497600&v=beta&t=cgUWrV2liBGeBnVRjsfQjK2Q4r43Z1-iPfpHX_ew-_w",
    "https://images.unsplash.com/photo-1593642532973-d31b6557fa68",
  "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg",
  "https://media.licdn.com/dms/image/v2/D4D2DAQF3IYCjPNrlzA/profile-treasury-image-shrink_800_800/B4DZTqQTXlGcAY-/0/1739096930470?e=1747497600&v=beta&t=9fq_wGWldeBsKICry5M3zAgmhyUpPsCLnTXWJ09Pk-U",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
  "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg",
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
      <section className="relative min-h-screen flex flex-col justify-center items-center bg-background text-foreground overflow-hidden">
        {/* Background slideshow */}
        <div className="absolute inset-0 w-full h-full z-0">
          {images.map((url, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
                idx === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={url}
                alt={`Background ${idx + 1}`}
                fill
                style={{ objectFit: 'cover' }}
                priority={true}
                placeholder="blur"
                blurDataURL="/placeholder.png"
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-black/60" /> {/* Moved overlay outside the loop */}
        </div>

        {/* Main content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center p-4 md:p-8 mt-20">
          <h1 className="doto-font text-7xl sm:text-8xl md:text-9xl lg:text-[180px] tracking-tighter leading-none drop-shadow-xl">
            <span className="block animate-fade-in-up">PRATHAM</span>
            <span className="block text-accent animate-fade-in-up animation-delay-200">JAIN</span>
          </h1>
          <p className="doto-font mt-4 md:mt-6 text-xl sm:text-2xl md:text-3xl text-foreground/80  max-w-3xl drop-shadow-md">
            Data Engineer & Machine Learning Engineer
          </p>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                onClick={scrollToContact}
                className="mt-10 md:mt-12 rounded-full shadow-xl hover:shadow-accent/40 transition-all duration-300 ease-in-out transform hover:scale-105 bg-white/10 hover:bg-white/20 backdrop-blur-md border-2 border-white/30 text-foreground w-16 h-16 flex items-center justify-center"
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