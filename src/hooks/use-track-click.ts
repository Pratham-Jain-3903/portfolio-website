import { useCallback } from 'react';

export function useTrackClick(elementId: string, metadata?: Record<string, any>) {
  const handler = useCallback(() => {
    try {
      const sessionId = typeof window !== 'undefined' ? sessionStorage.getItem('analyticsSessionId') || '' : '';
      const section = document.querySelector('[data-section]')?.getAttribute('data-section') || '';
      const payload = {
        sessionId,
        type: 'click',
        element: elementId,
        sectionContext: section,
        timestamp: new Date().toISOString(),
        metadata,
      };
      fetch('/api/analytics/interaction', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }).catch(() => {});
    } catch (e) {}
  }, [elementId, metadata]);

  return { onClick: handler };
}

export default useTrackClick;
