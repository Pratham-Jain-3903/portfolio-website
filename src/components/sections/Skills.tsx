import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code, Package, Cloud, TerminalSquare, Database, Server, BookOpen, BrainCircuit, BarChartBig, Sparkles, Wrench } from 'lucide-react';

interface SkillCategory {
  name: string;
  skills: string[];
  icon: React.ElementType;
}

const skillsData: SkillCategory[] = [
  { name: 'Languages', skills: ['Python', 'Java', 'SQL', 'JavaScript', 'R', 'Scala', 'Bash'], icon: Code },
  { name: 'Frameworks & Libraries', skills: ['React', 'Next.js', 'Node.js', 'Spring Boot', 'FastAPI', 'Flask', 'Apache Spark', 'Apache Kafka', 'Apache Airflow', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Pandas', 'NumPy'], icon: Package },
  { name: 'Cloud Platforms', skills: ['AWS (EC2, S3, Lambda, Glue, EMR, Redshift, SageMaker)', 'GCP (Compute Engine, Cloud Storage, Cloud Functions, Dataflow, BigQuery, Vertex AI)', 'Azure (VMs, Blob Storage, Functions, Data Factory, Synapse Analytics, Machine Learning)'], icon: Cloud },
  { name: 'DevOps', skills: ['Docker', 'Kubernetes', 'Jenkins', 'Git', 'CI/CD', 'Terraform', 'Ansible'], icon: TerminalSquare },
  { name: 'Data Engineering', skills: ['ETL/ELT', 'Data Warehousing', 'Data Lakes', 'Data Modeling', 'Data Governance', 'Data Quality', 'Stream Processing', 'Batch Processing'], icon: Database },
  { name: 'Database Systems', skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Cassandra', 'HBase', 'Oracle'], icon: Server },
  { name: 'Foundations', skills: ['Data Structures & Algorithms', 'OOPS', 'Operating Systems', 'Computer Networks', 'DBMS'], icon: BookOpen },
  { name: 'Advanced Topics', skills: ['Machine Learning', 'Deep Learning', 'Natural Language Processing', 'Computer Vision', 'Big Data Analytics'], icon: BrainCircuit },
  { name: 'Visualisation', skills: ['Tableau', 'Power BI', 'Matplotlib', 'Seaborn', 'D3.js'], icon: BarChartBig },
  { name: 'Additional Skills', skills: ['Agile Methodologies', 'Problem Solving', 'Communication', 'Teamwork'], icon: Sparkles },
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
