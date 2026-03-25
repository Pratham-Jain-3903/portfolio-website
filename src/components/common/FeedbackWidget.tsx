"use client";

import { useEffect, useState, useRef } from 'react';
import { ThumbsUp, ThumbsDown, MessageSquare, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Fire analytics event
function fireAnalyticsEvent(event: string, source: string) {
  if (typeof window !== 'undefined') {
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({ event, item_id: 'feedback', source });
  }
}

export default function FeedbackWidget() {
  const [open, setOpen] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [sentiment, setSentiment] = useState<'positive' | 'negative' | null>(null);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!submitted) {
        setShowPrompt(true);
        toast({ title: 'Enjoying your visit?', description: "We'd love your quick feedback", duration: 7000 });
      }
    }, 300000); // 5 minutes

    return () => clearTimeout(timer);
  }, [submitted, toast]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        setOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open]);

  // Focus trap when panel is open
  useEffect(() => {
    if (open && panelRef.current) {
      const firstFocusable = panelRef.current.querySelector('button, textarea');
      (firstFocusable as HTMLElement)?.focus();
    }
  }, [open]);

  const handleToggle = () => {
    const newState = !open;
    setOpen(newState);
    if (newState) {
      fireAnalyticsEvent('feedback_clicked', 'feedback_widget');
    }
  };

  const submit = async () => {
    if (!sentiment) return;

    const sessionId = typeof window !== 'undefined' ? sessionStorage.getItem('analyticsSessionId') || '' : '';
    const currentSection = document.querySelector('[data-section]')?.getAttribute('data-section') || 'unknown';

    const payload = {
      sessionId,
      sentiment,
      triggeredBy: showPrompt ? 'auto_timer' : 'manual_widget',
      timestamp: new Date().toISOString(),
      message: message || undefined,
      sectionContext: currentSection,
      timeToFeedback: Date.now() - Number(sessionStorage.getItem('sessionStartTime') || Date.now()),
    };

    try {
      await fetch('/api/analytics/feedback', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      toast({ title: 'Thanks for the feedback!', duration: 4000 });
      setSubmitted(true);
      setOpen(false);
    } catch (e) {
      toast({ title: 'Failed', description: 'Unable to send feedback', variant: 'destructive' });
    }
  };

  if (submitted) return null;

  return (
    <TooltipProvider>
      {/* Feedback button - fixed LEFT, vertically centered */}
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={handleToggle}
            aria-label="Give feedback"
            aria-expanded={open}
            className={cn(
              // Fixed position: left edge, lower on screen
              'fixed left-3 bottom-24 z-[60]',
              'p-3 rounded-full shadow-lg',
              'bg-primary text-primary-foreground',
              'hover:bg-primary/90 transition-colors duration-150',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
              // Hide text on small screens (icon-only)
              'flex items-center gap-2'
            )}
          >
            <MessageSquare className="h-5 w-5 shrink-0" />
            <span className="sr-only sm:not-sr-only sm:text-sm sm:font-medium hidden md:inline">
              Feedback
            </span>
          </button>
        </TooltipTrigger>
        <TooltipContent side="right" sideOffset={8}>
          <p>Give feedback</p>
        </TooltipContent>
      </Tooltip>

      {/* Feedback panel - positioned near the button on left */}
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-labelledby="feedback-title"
          className={cn(
            'fixed left-3 bottom-24 ml-14 z-[60]',
            'w-80 bg-card border border-border rounded-xl shadow-2xl p-4',
            'animate-in fade-in-0 slide-in-from-left-2 duration-150'
          )}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 id="feedback-title" className="text-lg font-semibold">Share Feedback</h3>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setOpen(false)}
              aria-label="Close feedback panel"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-3">
            <div className="flex gap-3">
              <Button 
                variant={sentiment === 'positive' ? 'default' : 'outline'} 
                className="flex-1" 
                onClick={() => setSentiment('positive')}
                aria-pressed={sentiment === 'positive'}
              >
                <ThumbsUp className="mr-2 h-4 w-4" /> Helpful
              </Button>
              <Button 
                variant={sentiment === 'negative' ? 'default' : 'outline'} 
                className="flex-1" 
                onClick={() => setSentiment('negative')}
                aria-pressed={sentiment === 'negative'}
              >
                <ThumbsDown className="mr-2 h-4 w-4" /> Needs Work
              </Button>
            </div>

            {sentiment && (
              <>
                <Textarea 
                  value={message} 
                  onChange={(e) => setMessage((e.target as HTMLTextAreaElement).value)} 
                  placeholder="Tell us more (optional)" 
                  rows={3} 
                  aria-label="Additional feedback"
                />
                <Button className="w-full" onClick={submit}>Submit</Button>
              </>
            )}
          </div>
        </div>
      )}
    </TooltipProvider>
  );
}
