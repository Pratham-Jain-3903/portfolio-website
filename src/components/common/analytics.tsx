"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Path change tracking
    const url = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;
    
    // This is where you would add your analytics tracking code
    // Example for Google Analytics:
    if (typeof window.gtag === 'function') {
      window.gtag('config', 'YOUR-GA-ID', {
        page_path: url,
      });
    }

    // Page view timing
    if (window.performance) {
      const navigationEntries = performance.getEntriesByType("navigation");
      if (navigationEntries.length > 0 && navigationEntries[0] instanceof PerformanceNavigationTiming) {
        const timing = navigationEntries[0];
        const pageLoadTime = timing.loadEventEnd - timing.startTime;
        
        // Send timing data to analytics
        // window.gtag('event', 'timing_complete', {
        //   name: 'page_load',
        //   value: pageLoadTime,
        //   event_category: 'Page Timing',
        // });
      }
    }
  }, [pathname, searchParams]);

  return null;
}