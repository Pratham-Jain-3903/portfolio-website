"use client";

import React, { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { ExternalLink, Linkedin } from 'lucide-react';

interface LinkedInPostCarouselProps {
  postUrls: string[];
}

// Extract post ID from LinkedIn URL for embed
function getEmbedUrl(url: string): string {
  // LinkedIn embed URLs use a different format
  // https://www.linkedin.com/embed/feed/update/urn:li:share:ACTIVITY_ID
  // or https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:POST_ID
  
  // Extract activity ID from URL like:
  // https://www.linkedin.com/posts/username_hashtag-activity-7274800882293092352-xxxx
  const activityMatch = url.match(/activity-(\d+)/);
  if (activityMatch) {
    return `https://www.linkedin.com/embed/feed/update/urn:li:activity:${activityMatch[1]}`;
  }
  
  // Fallback: return original URL (won't work but prevents errors)
  return url;
}

const LinkedInPostCarousel: React.FC<LinkedInPostCarouselProps> = ({ postUrls }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Load LinkedIn embed script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://platform.linkedin.com/in.js';
    script.type = 'text/javascript';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup
      const existingScript = document.querySelector('script[src="https://platform.linkedin.com/in.js"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="linkedin-carousel-container overflow-hidden relative">
      {/* Horizontal scrolling carousel */}
      <div className="flex overflow-x-auto snap-x snap-mandatory pb-4 gap-4 scrollbar-hide">
        {postUrls.map((url, index) => {
          const embedUrl = getEmbedUrl(url);
          
          return (
            <Card 
              key={index} 
              className="linkedin-post-item flex-shrink-0 snap-center w-full sm:w-[400px] md:w-[450px] overflow-hidden border border-border/50"
            >
              <div className="relative bg-card" style={{ minHeight: '400px' }}>
                <iframe
                  src={embedUrl}
                  title={`LinkedIn Post ${index + 1}`}
                  width="100%"
                  height="400"
                  frameBorder="0"
                  allowFullScreen
                  className="bg-white"
                />
              </div>
              
              {/* Fallback link if iframe doesn't load */}
              <div className="p-3 border-t border-border/30 bg-muted/20">
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <Linkedin className="h-4 w-4" />
                  View on LinkedIn
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default LinkedInPostCarousel;