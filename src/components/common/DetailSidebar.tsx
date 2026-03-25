"use client";

import { useEffect, useCallback, useRef } from 'react';
import { X, ExternalLink, Users, Trophy, Zap, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { projectData, type ProjectEntry } from '@/components/sections/Projects';

interface DetailSidebarProps {
  projectId: string | null;
  onClose: () => void;
}

// Fire analytics event
function fireAnalyticsEvent(event: string, itemId: string, source: string) {
  if (typeof window !== 'undefined') {
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({ event, item_id: itemId, source });
  }
}

export default function DetailSidebar({ projectId, onClose }: DetailSidebarProps) {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const project = projectId 
    ? projectData.find(p => p.id === projectId) 
    : null;

  // Update URL when sidebar opens/closes
  useEffect(() => {
    if (projectId) {
      const url = new URL(window.location.href);
      url.searchParams.set('detail', projectId);
      window.history.replaceState({}, '', url.toString());
    } else {
      const url = new URL(window.location.href);
      url.searchParams.delete('detail');
      window.history.replaceState({}, '', url.toString());
    }
  }, [projectId]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && projectId) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [projectId, onClose]);

  // Focus close button when sidebar opens
  useEffect(() => {
    if (projectId && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [projectId]);

  // Trap focus within sidebar
  useEffect(() => {
    if (!projectId || !sidebarRef.current) return;

    const sidebar = sidebarRef.current;
    const focusableElements = sidebar.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    sidebar.addEventListener('keydown', handleTabKey);
    return () => sidebar.removeEventListener('keydown', handleTabKey);
  }, [projectId]);

  const handleClose = useCallback(() => {
    if (projectId) {
      fireAnalyticsEvent('sidebar_close', projectId, 'detail_sidebar');
    }
    onClose();
  }, [projectId, onClose]);

  if (!project) return null;

  return (
    <>
      {/* Backdrop overlay */}
      <div 
        className="fixed inset-0 bg-black/20 z-[55] md:hidden"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Sidebar panel */}
      <aside
        ref={sidebarRef}
        role="dialog"
        aria-labelledby="sidebar-title"
        aria-modal="true"
        className={cn(
          // Base styles
          "fixed top-0 right-0 h-full z-[56]",
          "w-full sm:w-96 md:w-[420px]",
          "bg-card border-l border-border shadow-2xl",
          // Animation
          "animate-in slide-in-from-right duration-200"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 p-6 border-b border-border">
            <div className="flex-1 min-w-0">
              <h2 
                id="sidebar-title" 
                className="text-xl font-bold text-foreground leading-tight"
              >
                {project.title}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {project.duration}
              </p>
            </div>
            <Button
              ref={closeButtonRef}
              variant="ghost"
              size="icon"
              onClick={handleClose}
              aria-label="Close details"
              className="shrink-0 -mr-2 -mt-2"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Scrollable content */}
          <ScrollArea className="flex-1">
            <div className="p-6 space-y-6">
              {/* Award badge */}
              {project.award && (
                <Badge 
                  variant="default" 
                  className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                >
                  <Trophy className="h-4 w-4 mr-2" />
                  {project.award}
                </Badge>
              )}

              {/* Outcome */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-2">
                  Outcome
                </h3>
                <p className="text-sm text-muted-foreground">
                  {project.outcome}
                </p>
              </div>

              <Separator />

              {/* Description */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-2">
                  Description
                </h3>
                <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Metrics */}
              {project.metrics && project.metrics.length > 0 && (
                <>
                  <Separator />
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-3">
                      Key Metrics
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                      {project.metrics.map((metric, index) => (
                        <div 
                          key={index}
                          className="flex items-center gap-2 text-sm text-primary"
                        >
                          <Zap className="h-4 w-4 shrink-0" />
                          <span>{metric}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <Separator />

              {/* Tech Stack */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="text-xs bg-primary/5 text-primary border-primary/10"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Team */}
              {project.otherCreators && project.otherCreators.length > 0 && (
                <>
                  <Separator />
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-2">
                      Team
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4 shrink-0" />
                      <span>{project.otherCreators.join(', ')}</span>
                    </div>
                  </div>
                </>
              )}

              {/* External link */}
              {project.link && (
                <>
                  <Separator />
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "inline-flex items-center gap-2 text-sm text-primary hover:underline",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded"
                    )}
                  >
                    <ExternalLink className="h-4 w-4" />
                    View project
                  </a>
                </>
              )}
            </div>
          </ScrollArea>

          {/* Footer with close button for accessibility */}
          <div className="p-4 border-t border-border">
            <Button
              variant="outline"
              onClick={handleClose}
              className="w-full"
            >
              Close details
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
