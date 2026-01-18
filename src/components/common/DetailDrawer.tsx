"use client";

import * as React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DetailDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  subtitle?: string;
  badges?: string[];
  children: React.ReactNode;
}

export function DetailDrawer({
  open,
  onOpenChange,
  title,
  subtitle,
  badges,
  children,
}: DetailDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg overflow-hidden flex flex-col">
        <SheetHeader className="space-y-3 pr-6">
          <SheetTitle className="text-xl font-bold leading-tight">
            {title}
          </SheetTitle>
          {subtitle && (
            <SheetDescription className="text-sm text-muted-foreground">
              {subtitle}
            </SheetDescription>
          )}
          {badges && badges.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {badges.map((badge, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="text-xs font-medium"
                >
                  {badge}
                </Badge>
              ))}
            </div>
          )}
        </SheetHeader>
        <Separator className="my-4" />
        <ScrollArea className="flex-1 -mx-6 px-6">
          <div className="space-y-4 pb-6">{children}</div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

// Project-specific drawer content
interface ProjectDrawerContentProps {
  description: string;
  features?: string[];
  techStack: string[];
  metrics?: { label: string; value: string }[];
  links?: { label: string; url: string }[];
}

export function ProjectDrawerContent({
  description,
  features,
  techStack,
  metrics,
  links,
}: ProjectDrawerContentProps) {
  return (
    <>
      <div>
        <h4 className="text-sm font-semibold mb-2 text-foreground">
          Description
        </h4>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>

      {features && features.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold mb-2 text-foreground">
            Key Features
          </h4>
          <ul className="space-y-1.5">
            {features.map((feature, index) => (
              <li
                key={index}
                className="text-sm text-muted-foreground flex items-start gap-2"
              >
                <span className="text-primary mt-1">•</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      )}

      {metrics && metrics.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold mb-2 text-foreground">
            Impact & Metrics
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {metrics.map((metric, index) => (
              <div
                key={index}
                className="bg-muted/50 rounded-lg p-3 text-center"
              >
                <div className="text-lg font-bold text-primary">
                  {metric.value}
                </div>
                <div className="text-xs text-muted-foreground">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h4 className="text-sm font-semibold mb-2 text-foreground">
          Tech Stack
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {techStack.map((tech, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>
      </div>

      {links && links.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold mb-2 text-foreground">Links</h4>
          <div className="flex flex-wrap gap-2">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
              >
                {link.label}
                <svg
                  className="h-3 w-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

// Recommendation-specific drawer content
interface RecommendationDrawerContentProps {
  fullText: string;
  relationship: string;
  date?: string;
  linkedInUrl?: string;
}

export function RecommendationDrawerContent({
  fullText,
  relationship,
  date,
  linkedInUrl,
}: RecommendationDrawerContentProps) {
  return (
    <>
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span>{relationship}</span>
        {date && (
          <>
            <span>•</span>
            <span>{date}</span>
          </>
        )}
      </div>

      <blockquote className="border-l-2 border-primary/30 pl-4 italic text-muted-foreground leading-relaxed">
        {fullText}
      </blockquote>

      {linkedInUrl && (
        <a
          href={linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline mt-2"
        >
          View on LinkedIn
          <svg
            className="h-3 w-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      )}
    </>
  );
}
