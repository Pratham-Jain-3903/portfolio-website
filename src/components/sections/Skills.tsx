import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code, Package, Cloud, TerminalSquare, Database, Server, BookOpen, BrainCircuit, BarChartBig, Sparkles, Wrench, Languages, Box, Dices, Lightbulb, Waypoints, Telescope } from 'lucide-react';

interface SkillCategory {
  name: string;
  skills: string[];
  icon: React.ElementType;
}

// Updated skills data with new categories and skills
const skillsData: SkillCategory[] = [
  { name: 'Languages', skills: ['Python', 'C++', 'Golang', 'CUDA', 'SQL', 'NoSQL'], icon: Languages },
  { name: 'Frameworks', skills: ['Flask', 'Django', 'FastAPI', 'Gunicorn'], icon: Package },
  { name: 'Cloud', skills: ['AWS (S3, EC2, DynamoDB)', 'GCP (BigQuery, Vertex AI)', 'Azure (VMware, Databricks)'], icon: Cloud },
  { name: 'DevOps', skills: ['Docker', 'Kubernetes (basics)', 'Jenkins', 'Git', 'CI/CD'], icon: TerminalSquare },
  { name: 'Data Engineering', skills: ['Apache Airflow', 'Apache Spark', 'Kafka', 'Flink (basics)', 'Beam (basics)'], icon: Database },
  { name: 'Database Systems', skills: ['PostgreSQL', 'MongoDB', 'Cassandra', 'DynamoDB', 'Snowflake'], icon: Server },
  { name: 'Foundations', skills: ['OOP', 'DSA (LeetCode 400+)', 'DBMS', 'Big Data', 'Linux'], icon: BookOpen },
  { name: 'Advanced Topics', skills: ['Data Lineage (DBT basics)', 'Cataloguing (Marquez)', 'AI/ML (Pytorch, Tensorflow, Pycaret)'], icon: BrainCircuit },
  { name: 'Visualisation', skills: ['Power BI', 'Plotly', 'Seaborn', 'Graphana'], icon: BarChartBig },
  { name: 'Additional Skills', skills: ['Data Lakes', 'Iceberg (basics)', 'Lakehouse Architecture', 'Monitoring (Grafana, Prometheus)', 'Postman'], icon: Lightbulb },
];

const Skills: React.FC = () => {
  return (
    <Card className="w-full shadow-xl rounded-xl">
      <CardHeader>
        <CardTitle className="text-3xl lg:text-4xl font-bold text-accent flex items-center">
          <Wrench className="mr-3 h-8 w-8" /> Technical Skills
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8 pt-2">
        {skillsData.map((category) => (
          <div key={category.name}>
            <h3 className="text-2xl font-semibold text-foreground mb-4 flex items-center font-heading">
              <category.icon className="mr-3 h-6 w-6 text-accent" />
              {category.name}
            </h3>
            <div className="flex flex-wrap gap-3">
              {category.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="px-4 py-2 text-md bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-full shadow-md">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default Skills;
