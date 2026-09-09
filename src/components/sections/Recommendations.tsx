"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, ChevronDown, ChevronUp, Quote } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { recommendations, type Recommendation } from '@/data/recommendations';

function RecommendationCard({ rec }: { rec: Recommendation }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={cn(
        "group p-5 border border-border/30 bg-card/50 backdrop-blur-sm rounded-xl",
        "hover:border-primary/30 hover:shadow-md transition-all duration-200"
      )}
    >
      {/* Header: Avatar + Name + Title */}
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 text-primary flex items-center justify-center font-semibold text-lg">
          {rec.name.charAt(0)}
        </div>
        <div className="flex-grow min-w-0">
          <h3 className="text-base font-semibold text-foreground truncate">{rec.name}</h3>
          <p className="text-sm text-muted-foreground truncate">{rec.title}</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {rec.relationship} • {rec.date}
          </p>
        </div>
      </div>

      {/* Pull Quote (always visible) */}
      <div className="mt-4 relative">
        <Quote className="absolute -left-1 -top-1 h-4 w-4 text-primary/30" />
        <p className="text-sm text-foreground/80 italic pl-4 line-clamp-2">
          "{rec.pullQuote}"
        </p>
      </div>

      {/* Expanded Content */}
      {expanded && (
        <div className="mt-4 pt-4 border-t border-border/20 animate-in fade-in-0 slide-in-from-top-2 duration-200">
          <p className="text-sm text-foreground/90 whitespace-pre-line leading-relaxed">
            {rec.recommendation}
          </p>
        </div>
      )}

      {/* Expand/Collapse Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setExpanded(!expanded)}
        className="mt-3 w-full text-xs text-muted-foreground hover:text-primary"
      >
        {expanded ? (
          <>
            <ChevronUp className="h-3 w-3 mr-1" />
            Show less
          </>
        ) : (
          <>
            <ChevronDown className="h-3 w-3 mr-1" />
            Read full recommendation
          </>
        )}
      </Button>
    </div>
  );
}

const Recommendations: React.FC = () => {
  return (
    <Card className="w-full shadow-xl rounded-xl overflow-hidden border border-border/50" id="recommendations">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 pb-4">
        <CardTitle className="text-2xl lg:text-3xl font-bold text-foreground flex items-center">
          <MessageSquare className="mr-3 h-7 w-7 text-primary" /> Recommendations
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-1">
          What colleagues and mentors say
        </p>
      </CardHeader>
      <CardContent className="pt-4 px-4 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendations.map((rec) => (
            <RecommendationCard key={rec.id} rec={rec} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Recommendations;
