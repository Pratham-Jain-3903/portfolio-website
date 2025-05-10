"use client";

import React, { useEffect, useRef } from 'react';

interface GitHubCalendarProps {
  username: string;
}

const GitHubCalendar: React.FC<GitHubCalendarProps> = ({ username }) => {
  useEffect(() => {
    // Load the GitHub Calendar library
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/github-calendar@latest/dist/github-calendar.min.js';
    script.async = true;
    script.onload = () => {
      // Initialize the calendar once the script is loaded
      // Ensure the element exists before initializing
      if (document.querySelector('.calendar')) {
        // @ts-ignore // Ignore TypeScript error for GitHubCalendar which is globally available after script load
        GitHubCalendar('.calendar', username, { responsive: true });
      }
    };
    document.body.appendChild(script);

    // Clean up the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, [username]); // Re-run effect if username changes

  useEffect(() => {
    // Load the responsive CSS stylesheet
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/github-calendar@latest/dist/github-calendar-responsive.css';
    document.head.appendChild(link);

    // Clean up the stylesheet when the component unmounts
    return () => {
      document.head.removeChild(link);
    };
  }, []); // Only run once on mount

  return (
    <div className="calendar">
      {/* Loading message */}
      Loading the data just for you...
    </div>
  );
};

export default GitHubCalendar;