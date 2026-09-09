export const skillIconKeys = [
  'languages',
  'frameworks',
  'cloud',
  'devops',
  'data-engineering',
  'databases',
  'foundations',
  'advanced-topics',
  'visualisation',
  'additional-skills',
] as const;

export type SkillIconKey = (typeof skillIconKeys)[number];

export type SkillGroup = {
  id: string;
  label: string;
  icon: SkillIconKey;
  skills: readonly string[];
};

export const skillGroups = [
  { id: 'languages', label: 'Programming and Querying', icon: 'languages', skills: ['Python', 'SQL', 'C++', 'Golang', 'Bash', 'Linux'] },
  { id: 'data-engineering', label: 'Market and Data Pipelines', icon: 'data-engineering', skills: ['Kafka', 'Apache Spark', 'Apache Airflow', 'Parquet', 'Flink (foundational)', 'Beam (foundational)'] },
  { id: 'databases', label: 'Analytical Storage', icon: 'databases', skills: ['PostgreSQL', 'DuckDB', 'Snowflake', 'BigQuery', 'DynamoDB', 'MongoDB'] },
  { id: 'research', label: 'Research and Evaluation', icon: 'advanced-topics', skills: ['Backtesting', 'Time-Series Analysis', 'Risk Metrics', 'Qlib (exploring)', 'PyTorch', 'PyCaret'] },
  { id: 'cloud', label: 'Cloud and Compute', icon: 'cloud', skills: ['AWS (S3, EC2, DynamoDB)', 'GCP (BigQuery, Vertex AI)', 'Azure (Databricks)', 'Docker', 'Kubernetes (foundational)'] },
  { id: 'data-platforms', label: 'Data Platform Practices', icon: 'foundations', skills: ['Data Quality', 'Reproducibility', 'Data Lineage (dbt basics)', 'Iceberg (foundational)', 'CI/CD', 'Git'] },
  { id: 'visualisation', label: 'Analytics and Monitoring', icon: 'visualisation', skills: ['Plotly Dash', 'Grafana', 'Power BI', 'Seaborn', 'Prometheus'] },
  { id: 'frameworks', label: 'Application Delivery', icon: 'frameworks', skills: ['FastAPI', 'Flask', 'Django', 'GitHub Actions', 'Docker Compose'] },
] satisfies readonly SkillGroup[];