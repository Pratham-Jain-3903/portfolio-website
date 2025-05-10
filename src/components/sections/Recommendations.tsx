import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, User } from 'lucide-react'; // Added User icon for recommender
import { cn } from '@/lib/utils';

interface RecommendationEntry {
  name: string;
  title: string;
  relationship: string;
  date: string;
  recommendation: string;
}

const recommendationData: RecommendationEntry[] = [
  {
    name: 'Shruti Jaiswal',
    title: 'Artificial Intelligence Specialist',
    relationship: 'Mentor',
    date: 'January 6, 2025',
    recommendation: 'I had the pleasure of mentoring Pratham on a project focused on developing a breast cancer prediction models. His dedication to understanding the complexities of data preprocessing, feature engineering, and machine learning algorithms was truly commendable. Pratham demonstrated excellent problem-solving skills, a keen eye for detail, and a collaborative spirit throughout the project.\n\nHis ability to translate theoretical knowledge into a practical and impactful solution was impressive. I am confident that Pratham will excel in his future endeavors and make significant contributions to any team he is part of.',
  },
  {
    name: 'Suresh Chavhan',
    title: 'Assistant Professor, Indian Institute of Science Education and Research, Thiruvananthapuram | Ph.D. (IISc) | Postdoc (UFPI, Brazil) | SMIEEE (USA) | NITK Surthakal',
    relationship: 'Managed directly',
    date: 'October 12, 2024',
    recommendation: 'I had the opportunity to work closely with Mr. Pratham from October 2022 to October 2024, in my roles as PRO, course instructor, and project guide. Pratham is exceptional in content creation, planning, and executing tasks efficiently. His design skills and coding expertise, particularly in the IoT and computer network labs, are commendable.\n\nAdditionally, his ability to generate high-quality reports is outstanding, showcasing his attention to detail and professionalism. It has been a pleasure to guide him, and I am confident he will continue to achieve great success.\n\nWishing him all the very best in his future endeavors. Keep up the excellent work, Pratham!\n\nThank you.',
  },
  {
    name: 'Jahnvi Tiwari',
    title: 'Assistant Professor at IIIT Raichur',
    relationship: 'Managed directly',
    date: 'October 7, 2024',
    recommendation: 'I am pleased to recommend Pratham Jain, who has completed two projects under my supervision. Pratham has consistently demonstrated a strong work ethic, a thorough understanding of his subjects, and an impressive knowledge of AI and Machine Learning. He approaches his work with diligence and enthusiasm, and his ability to grasp complex concepts and apply them effectively is commendable.',
  },
  {
    name: 'Mitalee Agrawal',
    title: 'Cybersecurity Enthusiast | LinkedIn - Top Creative Problem Solving & PR Voice | e4m 40 under 40 PR & Corp Comm| Dynamic Women Leader - Comm | Grand Queen - Corporate Comm | Stri Shakti 2025 | 2X Chanakya Awardee',
    relationship: 'Mentor',
    date: 'October 5, 2024',
    recommendation: 'It has been a great experience working with Pratham as the Student PR Council Head, leading a team of over 20 members. His leadership and focus on soft skills like critical thinking, creativity, and collaboration have truly commendable. Pratham’s adaptability, attention to detail, problem-solving abilities, and communication skills have kept the team motivated and organized. I am confident this experience will be a key differentiator in any role he takes on in the future.',
  },
];

const Recommendations: React.FC = () => {
  return (
    <Card className="w-full shadow-xl rounded-xl overflow-hidden border border-border/50" id="recommendations">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 pb-6">
        <CardTitle className="text-3xl lg:text-4xl font-bold text-foreground flex items-center">
          <MessageSquare className="mr-3 h-8 w-8 text-primary" /> Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 px-6 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> {/* Bento Grid Container */}
          {recommendationData.map((recommendation, index) => (
            <div
              key={index}
              className="p-4 border border-border/20 bg-background/10 backdrop-blur-sm rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-start space-x-4">
                {/* Optional: Add a placeholder user icon or image */}
                {/* <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <User className="h-6 w-6" />
                </div> */}
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-foreground">{recommendation.name}</h3>
                  <p className="text-sm text-muted-foreground">{recommendation.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {recommendation.relationship} ({recommendation.date})
                  </p>
                </div>
              </div>
              <div className="mt-4 text-sm text-foreground/90 whitespace-pre-wrap">
                {recommendation.recommendation}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Recommendations;