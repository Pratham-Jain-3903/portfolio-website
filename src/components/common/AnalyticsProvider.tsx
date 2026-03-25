"use client";

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useTheme } from 'next-themes';

export default function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const { theme, resolvedTheme } = useTheme();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sessionIdRef = useRef<string>('');
  const sessionStartRef = useRef<number>(0);
  const sectionsViewedRef = useRef<Set<string>>(new Set());
  const scrollDataRef = useRef<Array<{ timestamp: number; scrollY: number; scrollDepth: number }>>([]);
  const currentSectionRef = useRef<string>('hero');
  const sectionTimesRef = useRef<Map<string, { start: number; duration: number }>>(new Map());

  useEffect(() => {
    const sessionId = `s_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    sessionIdRef.current = sessionId;
    sessionStartRef.current = Date.now();

    try {
      sessionStorage.setItem('analyticsSessionId', sessionId);
      sessionStorage.setItem('sessionStartTime', sessionStartRef.current.toString());
    } catch (e) {
      // ignore storage errors
    }

    // Post session start
    const sessionPayload = {
      sessionId,
      timestamp: new Date().toISOString(),
      referrer: typeof document !== 'undefined' ? document.referrer || 'direct' : 'server',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
      screenResolution: typeof window !== 'undefined' ? `${window.innerWidth}x${window.innerHeight}` : '0x0',
      isReturningVisitor: typeof localStorage !== 'undefined' && !!localStorage.getItem('hasVisitedBefore'),
      entrySection: 'hero',
    };

    fetch('/api/analytics/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sessionPayload),
    }).catch(() => { });

    try { localStorage.setItem('hasVisitedBefore', 'true'); } catch { }

    // Performance snapshot (best-effort)
    setTimeout(() => {
      try {
        const perf = (window as any).performance;
        if (perf && perf.getEntriesByType) {
          const timing = perf.timing || {};
          const perfPayload = {
            sessionId,
            pageLoadTime: timing.loadEventEnd && timing.navigationStart ? timing.loadEventEnd - timing.navigationStart : 0,
            largestContentfulPaint: 0,
            firstInputDelay: 0,
            cumulativeLayoutShift: 0,
            ttfb: timing.responseStart && timing.navigationStart ? timing.responseStart - timing.navigationStart : 0,
          };
          fetch('/api/analytics/performance', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(perfPayload),
          }).catch(() => { });
        }
      } catch { }
    }, 5000);

    // Scroll tracking
    const onScroll = () => {
      const scrollDepth = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      scrollDataRef.current.push({ timestamp: Date.now(), scrollY: window.scrollY, scrollDepth });
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // IntersectionObserver to track sections
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('data-section');
          if (!id) return;

          if (entry.isIntersecting) {
            sectionsViewedRef.current.add(id);
            currentSectionRef.current = id;
            const existing = sectionTimesRef.current.get(id) || { start: Date.now(), duration: 0 };
            existing.start = Date.now();
            sectionTimesRef.current.set(id, existing);
          } else {
            const existing = sectionTimesRef.current.get(id);
            if (existing && existing.start) {
              existing.duration += Date.now() - existing.start;
              delete (existing as any).start;
              sectionTimesRef.current.set(id, existing);
            }
          }
        });
      },
      { threshold: 0.45 }
    );

    document.querySelectorAll('[data-section]').forEach((el) => observer.observe(el));

    // Expose navigation tracker globally for quick instrumentation
    (window as any).trackNavigation = (data: { method: string; to: string; timestamp?: string }) => {
      try {
        fetch('/api/analytics/interaction', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId,
            type: 'navigation',
            element: data.to,
            sectionContext: currentSectionRef.current,
            timestamp: data.timestamp || new Date().toISOString(),
            metadata: { navigationMethod: data.method },
          }),
        }).catch(() => { });
      } catch { }
    };

    // On unload, send summaries
    const onUnload = () => {
      const now = Date.now();

      sectionTimesRef.current.forEach((data, name) => {
        if (typeof data.start === 'number') {
          data.duration += now - data.start;
          delete (data as { start?: number }).start;
          sectionTimesRef.current.set(name, data);
        }
      });

      const timeOnSite = Date.now() - sessionStartRef.current;

      const scrollBehavior = {
        sessionId,
        sections: Array.from(sectionTimesRef.current.entries()).map(([name, data]) => ({
          sectionName: name,
          timeViewed: data.duration || 0,
          scrollDepth: 100,
          enteredAt: new Date().toISOString(),
        })),
        maxScrollDepth: scrollDataRef.current.length ? Math.max(...scrollDataRef.current.map((d) => d.scrollDepth)) : 0,
        scrollSpeed: 0,
      };

      try {
        navigator.sendBeacon('/api/analytics/scroll', JSON.stringify(scrollBehavior));
      } catch { }

      const engagement = {
        sessionId,
        bouncedEarly: timeOnSite < 10000,
        deepEngagement: timeOnSite > 120000 && sectionsViewedRef.current.size >= 5,
        downloadedResume: false,
        clickedContact: sectionsViewedRef.current.has('contact-info'),
        sectionsViewed: Array.from(sectionsViewedRef.current),
        averageTimePerSection: sectionsViewedRef.current.size ? Math.round(timeOnSite / sectionsViewedRef.current.size) : 0,
      };

      try {
        navigator.sendBeacon('/api/analytics/engagement', JSON.stringify(engagement));
      } catch { }
    };

    window.addEventListener('beforeunload', onUnload);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('beforeunload', onUnload);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const sessionId = sessionIdRef.current;

    if (!sessionId) {
      return;
    }

    const search = searchParams.toString();
    const pagePath = search ? `${pathname}?${search}` : pathname;

    fetch('/api/analytics/interaction', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId,
        type: 'page_view',
        element: pagePath,
        sectionContext: currentSectionRef.current,
        timestamp: new Date().toISOString(),
        metadata: { pathname, search },
      }),
    }).catch(() => { });
  }, [pathname, searchParams]);

  // Track theme changes separately (best-effort)
  useEffect(() => {
    const sid = sessionIdRef.current;
    if (!sid) return;
    try {
      fetch('/api/analytics/theme', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: sid,
          themeChanges: [{ from: 'unknown', to: theme || resolvedTheme || 'dark', timestamp: new Date().toISOString() }],
          preferredTheme: theme || resolvedTheme || 'dark',
          systemTheme: resolvedTheme || 'dark',
        }),
      }).catch(() => { });
    } catch { }
  }, [theme, resolvedTheme]);

  return <>{children}</>;
}
