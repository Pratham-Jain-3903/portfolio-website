import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChartBig, BookOpen, BrainCircuit, Cloud, Database, Languages, Lightbulb, Package, Server, TerminalSquare, Wrench } from 'lucide-react';
import { skillGroups, type SkillIconKey } from '@/data/skills';

const skillIcons: Record<SkillIconKey, React.ElementType> = {
  languages: Languages,
  frameworks: Package,
  cloud: Cloud,
  devops: TerminalSquare,
  'data-engineering': Database,
  databases: Server,
  foundations: BookOpen,
  'advanced-topics': BrainCircuit,
  visualisation: BarChartBig,
  'additional-skills': Lightbulb,
};

const Skills: React.FC = () => {
  return (
    <Card className="w-full shadow-xl rounded-xl">
      <CardHeader>
        <CardTitle className="text-3xl lg:text-4xl font-bold text-accent flex items-center">
          <Wrench className="mr-3 h-8 w-8" /> Technical Skills
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8 pt-2">
        {skillGroups.map((group) => {
          const Icon = skillIcons[group.icon];

          return (
          <div key={group.id}>
            <h3 className="text-2xl font-semibold text-foreground mb-4 flex items-center font-heading">
              <Icon className="mr-3 h-6 w-6 text-accent" />
              {group.label}
            </h3>
            <div className="flex flex-wrap gap-3">
              {group.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="px-4 py-2 text-md bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-full shadow-md">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default Skills;
