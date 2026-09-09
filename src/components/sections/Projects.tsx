"use client";

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Calendar, Users, ChevronDown, ChevronUp, ExternalLink, Trophy, Zap, PanelRightOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  getPrimaryProjectLink,
  getProjectDescription,
  projects,
  type Project,
} from '@/data/projects';

// Constants
const COLLAPSED_HEIGHT = 180;
const ANIMATION_DURATION = 140;
const ANIMATION_EASING = 'cubic-bezier(0, 0, 0.2, 1)';

// Analytics helper
function fireAnalyticsEvent(event: string, itemId: string, source: string) {
  if (typeof window !== 'undefined') {
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({ event, item_id: itemId, source });
  }
}

interface ProjectCardProps {
  project: Project;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onOpenSidebar: () => void;
  prefersReducedMotion: boolean;
}

function ProjectCard({ project, isExpanded, onToggleExpand, onOpenSidebar, prefersReducedMotion }: ProjectCardProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState<string>(`${COLLAPSED_HEIGHT}px`);
  const description = getProjectDescription(project);
  const projectLink = getPrimaryProjectLink(project);

  // Update maxHeight for animation
  useEffect(() => {
    if (isExpanded && contentRef.current) {
      const scrollHeight = contentRef.current.scrollHeight;
      setMaxHeight(`${scrollHeight}px`);
    } else {
      setMaxHeight(`${COLLAPSED_HEIGHT}px`);
    }
  }, [isExpanded]);

  const handleToggle = () => {
    fireAnalyticsEvent(isExpanded ? 'card_collapsed' : 'card_expanded', project.id, 'project_card');
    onToggleExpand();
  };

  const handleSidebarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    fireAnalyticsEvent('sidebar_open', project.id, 'project_card');
    onOpenSidebar();
  };

  const transitionStyle = prefersReducedMotion 
    ? {} 
    : { transition: `max-height ${ANIMATION_DURATION}ms ${ANIMATION_EASING}` };

  return (
    <div
      data-expanded={isExpanded}
      data-project-id={project.id}
      className={cn(
        "relative group border border-border/30 bg-card/50 backdrop-blur-sm rounded-xl overflow-hidden",
        "hover:border-primary/30 hover:shadow-md transition-shadow duration-200",
        "focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2"
      )}
    >
      {/* Card content with max-height animation */}
      <div
        ref={contentRef}
        className="flex flex-col overflow-hidden"
        style={{ maxHeight, ...transitionStyle }}
      >
        <div className="p-5 flex flex-col h-full">
          {/* Header: Title + Date + Award */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex-grow min-w-0">
              <h3 className="text-lg font-semibold text-foreground leading-tight">
                {project.shortTitle}
              </h3>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
                <Calendar className="h-3 w-3" />
                {project.duration}
              </p>
            </div>
            {project.award && (
              <Badge variant="default" className="shrink-0 bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20">
                <Trophy className="h-3 w-3 mr-1" />
                {project.award}
              </Badge>
            )}
          </div>

          {/* Outcome (1-liner) */}
          <p className="mt-3 text-sm text-foreground/80 line-clamp-1">
            {project.outcome}
          </p>

          {/* Tech Stack Badges - max 4 in collapsed */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.stack.slice(0, isExpanded ? undefined : 4).map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="text-xs px-2 py-0.5 bg-primary/5 text-primary border-primary/10"
                title={tech}
              >
                {tech}
              </Badge>
            ))}
            {!isExpanded && project.stack.length > 4 && (
              <Badge variant="outline" className="text-xs px-2 py-0.5">
                +{project.stack.length - 4}
              </Badge>
            )}
          </div>

          {/* Key Metrics - max 2 in collapsed */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {project.metrics.slice(0, isExpanded ? undefined : 2).map((metric) => (
                <span
                  key={metric}
                  className="text-xs text-primary flex items-center gap-1"
                >
                  <Zap className="h-3 w-3" />
                  {metric}
                </span>
              ))}
            </div>
          )}

          {/* Expanded Content */}
          {isExpanded && (
            <div 
              className="mt-4 pt-4 border-t border-border/20"
              aria-live="polite"
            >
              <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                Details
              </h4>
              <p className="text-sm text-foreground/90 whitespace-pre-line leading-relaxed">
                {description}
              </p>

              {project.collaborators.length > 0 && (
                <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                  <Users className="h-3 w-3" />
                  <span>Team: {project.collaborators.join(', ')}</span>
                </div>
              )}

              {projectLink && (
                <a
                  href={projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1 text-xs text-primary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  View project <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Bottom fade gradient for collapsed state */}
      {!isExpanded && (
        <div 
          className="absolute bottom-10 left-0 right-0 h-9 bg-gradient-to-t from-card/95 to-transparent pointer-events-none"
          aria-hidden="true"
        />
      )}

      {/* Toggle button + Sidebar affordance */}
      <div className="flex items-center justify-between px-5 py-2 bg-muted/20 border-t border-border/20">
        <button
          onClick={handleToggle}
          aria-expanded={isExpanded}
          aria-controls={`project-content-${project.id}`}
          className={cn(
            "flex items-center gap-1 text-xs text-muted-foreground hover:text-primary",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded px-2 py-1 -ml-2"
          )}
        >
          {isExpanded ? (
            <>
              <ChevronUp className="h-3 w-3" />
              See less
            </>
          ) : (
            <>
              <ChevronDown className="h-3 w-3" />
              See more
            </>
          )}
        </button>

        <button
          onClick={handleSidebarClick}
          aria-label={`View ${project.shortTitle} details in sidebar`}
          className={cn(
            "flex items-center gap-1 text-xs text-muted-foreground hover:text-primary",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded px-2 py-1 -mr-2"
          )}
        >
          <PanelRightOpen className="h-3 w-3" />
          <span className="hidden sm:inline">Details</span>
        </button>
      </div>
    </div>
  );
}

interface ProjectsProps {
  onOpenSidebar?: (projectId: string) => void;
}

const Projects: React.FC<ProjectsProps> = ({ onOpenSidebar }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Detect reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const handleToggleExpand = useCallback((projectId: string) => {
    setExpandedId(prev => prev === projectId ? null : projectId);
  }, []);

  const handleOpenSidebar = useCallback((projectId: string) => {
    onOpenSidebar?.(projectId);
  }, [onOpenSidebar]);

  return (
    <Card className="w-full shadow-xl rounded-xl overflow-hidden border border-border/50" id="projects">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 pb-4">
        <CardTitle className="text-2xl lg:text-3xl font-bold text-foreground flex items-center">
          <Briefcase className="mr-3 h-7 w-7 text-primary" /> Projects
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-1">
          Hackathons, research, and personal builds
        </p>
      </CardHeader>
      <CardContent className="pt-4 px-4 pb-6">
        {/* CSS Grid with equal collapsed heights */}
        <div 
          className={cn(
            "grid gap-4",
            // Responsive columns: 1 col mobile, 2 col md-lg, 3 col xl+
            "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
          )}
        >
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isExpanded={expandedId === project.id}
              onToggleExpand={() => handleToggleExpand(project.id)}
              onOpenSidebar={() => handleOpenSidebar(project.id)}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Projects;
