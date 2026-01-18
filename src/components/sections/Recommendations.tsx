"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, ChevronDown, ChevronUp, Quote } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface RecommendationEntry {
  name: string;
  title: string;
  relationship: string;
  date: string;
  recommendation: string;
  pullQuote: string;
}

const recommendationData: RecommendationEntry[] = [
  {
    name: 'Shruti Jaiswal',
    title: 'Artificial Intelligence Specialist',
    relationship: 'Mentor',
    date: 'January 2025',
    pullQuote: "His dedication to understanding data preprocessing, feature engineering, and ML algorithms was truly commendable.",
    recommendation: 'I had the pleasure of mentoring Pratham on a project focused on developing a breast cancer prediction models. His dedication to understanding the complexities of data preprocessing, feature engineering, and machine learning algorithms was truly commendable. Pratham demonstrated excellent problem-solving skills, a keen eye for detail, and a collaborative spirit throughout the project.\n\nHis ability to translate theoretical knowledge into a practical and impactful solution was impressive. I am confident that Pratham will excel in his future endeavors and make significant contributions to any team he is part of.',
  },
  {
    name: 'Suresh Chavhan',
    title: 'Assistant Professor, IISER Thiruvananthapuram',
    relationship: 'Professor & PRO',
    date: 'October 2024',
    pullQuote: "Exceptional in content creation, planning, and executing tasks efficiently. His design skills and coding expertise are commendable.",
    recommendation: 'I had the opportunity to work closely with Mr. Pratham from October 2022 to October 2024, in my roles as PRO, course instructor, and project guide. Pratham is exceptional in content creation, planning, and executing tasks efficiently. His design skills and coding expertise, particularly in the IoT and computer network labs, are commendable.\n\nAdditionally, his ability to generate high-quality reports is outstanding, showcasing his attention to detail and professionalism. It has been a pleasure to guide him, and I am confident he will continue to achieve great success.',
  },
  {
    name: 'Jahnvi Tiwari',
    title: 'Assistant Professor, IIIT Raichur',
    relationship: 'Project Guide',
    date: 'October 2024',
    pullQuote: "Strong work ethic, thorough understanding of his subjects, and impressive knowledge of AI and Machine Learning.",
    recommendation: 'I am pleased to recommend Pratham Jain, who has completed two projects under my supervision. Pratham has consistently demonstrated a strong work ethic, a thorough understanding of his subjects, and an impressive knowledge of AI and Machine Learning. He approaches his work with diligence and enthusiasm, and his ability to grasp complex concepts and apply them effectively is commendable.',
  },
  {
    name: 'Mitalee Agrawal',
    title: 'LinkedIn Top PR Voice | e4m 40 under 40',
    relationship: 'Mentor',
    date: 'October 2024',
    pullQuote: "His leadership and focus on soft skills like critical thinking, creativity, and collaboration are truly commendable.",
    recommendation: "It has been a great experience working with Pratham as the Student PR Council Head, leading a team of over 20 members. His leadership and focus on soft skills like critical thinking, creativity, and collaboration have truly commendable. Pratham's adaptability, attention to detail, problem-solving abilities, and communication skills have kept the team motivated and organized. I am confident this experience will be a key differentiator in any role he takes on in the future.",
  }
];

function RecommendationCard({ rec }: { rec: RecommendationEntry }) {
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
          <p className="text-xs text-muted-foreground/70 mt-0.5">
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
          {recommendationData.map((rec, index) => (
            <RecommendationCard key={index} rec={rec} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Recommendations;
