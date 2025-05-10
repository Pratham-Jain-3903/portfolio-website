"use client";

import React from 'react';

interface LinkedInPostCarouselProps {
  postUrls: string[];
}

const LinkedInPostCarousel: React.FC<LinkedInPostCarouselProps> = ({ postUrls }) => {
  return (
    <div className="linkedin-carousel-container overflow-hidden relative">
      {/* Simple flexbox layout for horizontal scrolling/carousel effect */}
      <div className="flex overflow-x-auto snap-x snap-mandatory pb-4">
        {postUrls.map((url, index) => (
          <div key={index} className="linkedin-post-item flex-shrink-0 snap-center w-full sm:w-2/3 md:w-1/2 lg:w-1/3 px-2">
            <div className="relative" style={{ paddingBottom: '56.25%', height: 0 }}>
              <iframe
                src={url}
                title={`LinkedIn Post ${index + 1}`}
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen={true}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              ></iframe>
            </div>
          </div>
        ))}
      </div>
      {/* Add carousel navigation/indicators here if needed */}
    </div>
  );
};

export default LinkedInPostCarousel;