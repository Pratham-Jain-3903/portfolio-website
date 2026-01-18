"use client";

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Calendar, Users, ChevronDown, ChevronUp, ExternalLink, Trophy, Zap, PanelRightOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

// Constants
const COLLAPSED_HEIGHT = 180;
const ANIMATION_DURATION = 140;
const ANIMATION_EASING = 'cubic-bezier(0, 0, 0.2, 1)';

interface ProjectEntry {
  id: string;
  title: string;
  shortTitle: string;
  duration: string;
  outcome: string;
  techStack: string[];
  metrics?: string[];
  description: string;
  otherCreators?: string[];
  award?: string;
  link?: string;
}

const projectData: ProjectEntry[] = [
  {
    id: 'solarwise',
    title: 'SolarWise: Dynamic AI-Driven Energy Management Cloud Solutions',
    shortTitle: 'SolarWise',
    duration: 'Oct 2024',
    outcome: 'Winner - Luminous TechnoX Hackathon 2024',
    award: '🏆 1st Place',
    techStack: ['AWS IoT', 'Kafka', 'DynamoDB', 'LSTM', 'Grafana', 'PostgreSQL'],
    metrics: ['95% anomaly detection', '99.5% uptime', '92% forecast accuracy'],
    description: 'IoT-powered platform for real-time monitoring of solar power generation, battery levels, and energy savings with Time-of-Use tariff integration.\n\n• AI-powered predictions using Linear Regression (R² > 90%) and LSTM models\n• Smart scheduling via Mixed-Integer Linear Programming (MILP)\n• Z-Score-based anomaly detection with 95%+ precision\n• Real-time dashboards via Grafana integrated with PostgreSQL',
    otherCreators: ['Krishna Faujdar', 'Manvendra Singh', 'Pavan Kumar'],
  },
  {
    id: 'smart-grocery-scanner',
    title: 'Flipkart Grid 6.0 - Smart Grocery Scanner Application',
    shortTitle: 'Smart Grocery Scanner',
    duration: 'Sep 2024',
    outcome: 'Computer vision system for warehouse automation',
    techStack: ['Computer Vision', 'OCR', 'CustomTkinter', 'Edge AI', 'Cloud Analytics'],
    metrics: ['Real-time detection', 'Freshness assessment', 'Hybrid cloud-edge'],
    description: '• Automated scanning and recognition using computer vision\n• One-click interface for warehouse staff\n• Real-time alerts for incorrect, missing, or expired products\n• AI-powered freshness detection for perishables\n• Hybrid cloud-edge model for efficient processing',
    otherCreators: ['Ashutosh Singh', 'Prathamesh Patil'],
  },
  {
    id: 'hvac-optimization',
    title: 'AI-Driven HVAC Efficiency Optimization',
    shortTitle: 'HVAC Optimization',
    duration: 'Mar 2024',
    outcome: 'Research project with Bosch Global Software Technologies',
    techStack: ['Apache Spark', 'Kafka', 'IoT', 'Python', 'Data Pipelines'],
    metrics: ['30 days continuous processing', 'Real-time insights'],
    description: '• Designed real-time data pipelines for IoT energy optimization\n• Engineered scalable ingestion frameworks processing continuous IoT signals\n• Utilized distributed computing (Spark, Kafka) for large-scale data\n• Advanced transformation techniques for AI-driven decision-making',
    otherCreators: ['Anandan Arumugam', 'Vipin Pulikkal'],
  },
  {
    id: 'cancer-diagnosis-ai',
    title: 'Breast Cancer Diagnosis Framework',
    shortTitle: 'Cancer Diagnosis AI',
    duration: 'Jan 2024',
    outcome: '97% diagnostic accuracy on FNAC data',
    techStack: ['PyCaret', 'Grad-CAM', 'SHAP', 'Streamlit', 'Docker', 'W&B'],
    metrics: ['97% accuracy', '80% time reduction', 'Real-time validation'],
    description: '• Open-source AI framework leveraging pathology, radiology, and medical history\n• First-party medical datasets curated with medical professionals\n• Multiple AI models for detecting masses, lesions, calcifications\n• SHAP for model interpretability\n• Deployed at scale using Streamlit and Docker',
    otherCreators: ['Jahnvi Tiwari', 'Shruti Jaiswal'],
  },
  {
    id: 'msme-credit-platform',
    title: 'GenAI-Powered Credit Access Platform for MSMEs',
    shortTitle: 'MSME Credit Platform',
    duration: 'Jan 2024',
    outcome: 'AI-driven financial assessment for small businesses',
    techStack: ['GenAI', 'OCEN', 'Financial APIs', 'ML'],
    description: '• AI algorithms for creditworthiness evaluation\n• Seamless integration with OCEN for loan processing\n• Diverse financing options from multiple sources\n• Financial literacy tools for MSMEs',
  },
  {
    id: 'trendloop',
    title: 'TrendLoop - Sustainable Fashion Platform',
    shortTitle: 'TrendLoop',
    duration: 'May - Jun 2024',
    outcome: 'AI-powered sustainable fashion marketplace',
    techStack: ['Flutter', 'Firebase', 'TensorFlow', 'FLUX.1', 'Python'],
    description: '• Personalized outfit recommendations via AI\n• Virtual clothing try-ons with 3D garment rendering\n• Circular fashion marketplace for pre-owned clothing\n• Support for ethical and eco-friendly production',
    otherCreators: ['Rushikesh Muneshwar'],
  },
  {
    id: 'pydorky',
    title: 'Pydorky — Practical Artifact Storage for Teams',
    shortTitle: 'Pydorky',
    duration: 'Dec 2025 - Present',
    outcome: 'Minimal, auditable artifact storage; npm package available',
    techStack: ['GitHub Actions', 'Python', 'AWS', 'Azure Data Lake', 'GCP', 'Express.js'],
    description: "I grew tired of important artifacts being scattered across chat apps (Teams, Slack), quick paste services, and personal drives. Pydorky provides a minimal, auditable, and automated alternative that:\n\n1. keeps artifacts out of VCS while enabling reproducible sharing\n2. integrates with existing cloud storage and IAM controls\n3. provides lightweight metadata, idempotency, and streaming-friendly APIs\n4. offers a Python client for data teams (Parquet/pyarrow integration) and thin clients for other languages\n\nRepository: https://github.com/Pratham-Jain-3903/pydorky\nPackage: https://www.npmjs.com/package/pydorky",
    link: 'https://www.npmjs.com/package/pydorky',
    otherCreators: ['Various contributors'],
  },
  {
    id: 'fin-stream-dashboard',
    title: 'Lightweight Financial Streaming Dashboard for Trading Strategies',
    shortTitle: 'Financial Streaming Dashboard',
    duration: 'Nov 2025 - Present',
    outcome: 'Kafka + DuckDB dashboard for comparing market data and news',
    techStack: ['GitHub Actions', 'Docker', 'Data Warehousing', 'Applied Machine Learning', 'Apache Kafka', 'DuckDB', 'PyCaret', 'Qlib'],
    description: "Built a Kafka + DuckDB polling-based dashboard for comparing stock prices with news across publishers. Adding Qlib next for basic quant research and backtesting.",
  },
  {
    id: 'agentic-call-handler',
    title: 'Automated Agentic AI Call handler/ Integrated Chatbot',
    shortTitle: 'Agentic Call Handler',
    duration: 'Sep 2025 - Present',
    outcome: 'AI-driven cloud system deployed for Luminous Power Technologies with measurable latency and cost improvements',
    techStack: ['Next.js', 'AKS', 'Redis', 'Embeddings', 'LLMs', 'WebSockets', 'Redis Streams'],
    metrics: ['78% lower query latency', '30% cost savings', '7% higher satisfaction', '88% faster responses for 10k calls daily'],
    description: "Engineered AI-driven cloud systems by orchestrating adaptive agents, LLMs, and embedding models for IoT data analysis and customer queries; deployed on Next.js PWA + AKS microservices with Redis caching, idempotent workflows, and real-time APIs. Implemented auto-termination of expensive bidirectional WebSocket channels to prevent idle sessions, and added Mermaid-backed visualizers and an adhoc query tool for premium users. Also integrated feedback-intelligence workflows to surface product insights.",
    otherCreators: ['Luminous Power Technologies (P) Ltd'],
  },
];

// Analytics helper
function fireAnalyticsEvent(event: string, itemId: string, source: string) {
  if (typeof window !== 'undefined') {
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({ event, item_id: itemId, source });
  }
}

interface ProjectCardProps {
  project: ProjectEntry;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onOpenSidebar: () => void;
  prefersReducedMotion: boolean;
}

function ProjectCard({ project, isExpanded, onToggleExpand, onOpenSidebar, prefersReducedMotion }: ProjectCardProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState<string>(`${COLLAPSED_HEIGHT}px`);

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
            {project.techStack.slice(0, isExpanded ? undefined : 4).map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="text-xs px-2 py-0.5 bg-primary/5 text-primary border-primary/10"
                title={tech}
              >
                {tech}
              </Badge>
            ))}
            {!isExpanded && project.techStack.length > 4 && (
              <Badge variant="outline" className="text-xs px-2 py-0.5">
                +{project.techStack.length - 4}
              </Badge>
            )}
          </div>

          {/* Key Metrics - max 2 in collapsed */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {project.metrics.slice(0, isExpanded ? undefined : 2).map((metric) => (
                <span
                  key={metric}
                  className="text-xs text-primary/80 flex items-center gap-1"
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
                {project.description}
              </p>

              {project.otherCreators && project.otherCreators.length > 0 && (
                <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                  <Users className="h-3 w-3" />
                  <span>Team: {project.otherCreators.join(', ')}</span>
                </div>
              )}

              {project.link && (
                <a
                  href={project.link}
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
          {projectData.map((project) => (
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
export { projectData };
export type { ProjectEntry };
