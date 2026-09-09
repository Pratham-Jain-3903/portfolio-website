export interface ProjectLinks {
  github?: string;
  live?: string;
  package?: string;
}

export interface Project {
  id: string;
  title: string;
  shortTitle: string;
  duration: string;
  outcome: string;
  problem: string;
  impact: readonly string[];
  architecture?: readonly string[];
  stack: readonly string[];
  metrics: readonly string[];
  links: ProjectLinks;
  collaborators: readonly string[];
  award?: string;
  featuredRank?: number;
}

export const projects = [
  {
    id: 'solarwise',
    title: 'SolarWise: Dynamic AI-Driven Energy Management Cloud Solutions',
    shortTitle: 'SolarWise',
    duration: 'Oct 2024',
    outcome: 'Winner - Luminous TechnoX Hackathon 2024',
    award: '🏆 1st Place',
    stack: ['AWS IoT', 'Kafka', 'DynamoDB', 'LSTM', 'Grafana', 'PostgreSQL'],
    metrics: ['Streaming architecture', 'Forecasting experiments', 'Grafana dashboards'],
    problem: 'IoT-powered platform for real-time monitoring of solar power generation, battery levels, and energy savings with Time-of-Use tariff integration.',
    impact: [
      'AI-powered predictions using Linear Regression (R² > 90%) and LSTM models',
      'Smart scheduling via Mixed-Integer Linear Programming (MILP)',
      'Z-Score-based anomaly detection with 95%+ precision',
      'Real-time dashboards via Grafana integrated with PostgreSQL',
    ],
    links: {
      github: 'https://github.com/Pratham-Jain-3903/Luminous-TechnoX-Hackathon-Submission-2024',
    },
    collaborators: ['Krishna Faujdar', 'Manvendra Singh', 'Pavan Kumar'],
  },
  {
    id: 'smart-grocery-scanner',
    title: 'Flipkart Grid 6.0 - Smart Grocery Scanner Application',
    shortTitle: 'Smart Grocery Scanner',
    duration: 'Sep 2024',
    outcome: 'Computer vision system for warehouse automation',
    stack: ['Computer Vision', 'OCR', 'CustomTkinter', 'Edge AI', 'Cloud Analytics'],
    metrics: ['Real-time detection', 'Freshness assessment', 'Hybrid cloud-edge'],
    problem: '',
    impact: [
      'Automated scanning and recognition using computer vision',
      'One-click interface for warehouse staff',
      'Real-time alerts for incorrect, missing, or expired products',
      'AI-powered freshness detection for perishables',
      'Hybrid cloud-edge model for efficient processing',
    ],
    links: {
      github: 'https://github.com/Pratham-Jain-3903/Flipkart_Grid_6.0',
    },
    collaborators: ['Ashutosh Singh', 'Prathamesh Patil'],
  },
  {
    id: 'hvac-optimization',
    title: 'AI-Driven HVAC Efficiency Optimization',
    shortTitle: 'HVAC Optimization',
    duration: 'Mar 2024',
    outcome: 'Research project with Bosch Global Software Technologies',
    stack: ['Apache Spark', 'Kafka', 'IoT', 'Python', 'Data Pipelines'],
    metrics: ['30 days continuous processing', 'Real-time insights'],
    problem: '',
    impact: [
      'Designed real-time data pipelines for IoT energy optimization',
      'Engineered scalable ingestion frameworks processing continuous IoT signals',
      'Utilized distributed computing (Spark, Kafka) for large-scale data',
      'Advanced transformation techniques for AI-driven decision-making',
    ],
    links: {},
    collaborators: ['Anandan Arumugam', 'Vipin Pulikkal'],
  },
  {
    id: 'cancer-diagnosis-ai',
    title: 'Breast Cancer Diagnosis Framework',
    shortTitle: 'Cancer Diagnosis AI',
    duration: 'Jan 2024',
    outcome: '97% diagnostic accuracy on FNAC data',
    stack: ['PyCaret', 'Grad-CAM', 'SHAP', 'Streamlit', 'Docker', 'W&B'],
    metrics: ['97% accuracy', '80% time reduction', 'Real-time validation'],
    problem: '',
    impact: [
      'Open-source AI framework leveraging pathology, radiology, and medical history',
      'First-party medical datasets curated with medical professionals',
      'Multiple AI models for detecting masses, lesions, calcifications',
      'SHAP for model interpretability',
      'Deployed at scale using Streamlit and Docker',
    ],
    links: {
      github: 'https://github.com/Pratham-Jain-3903/BGSW-CAD-BreastCancerPrediction',
    },
    collaborators: ['Jahnvi Tiwari', 'Shruti Jaiswal'],
  },
  {
    id: 'msme-credit-platform',
    title: 'GenAI-Powered Credit Access Platform for MSMEs',
    shortTitle: 'MSME Credit Platform',
    duration: 'Jan 2024',
    outcome: 'AI-driven financial assessment for small businesses',
    stack: ['GenAI', 'OCEN', 'Financial APIs', 'ML'],
    metrics: [],
    problem: '',
    impact: [
      'AI algorithms for creditworthiness evaluation',
      'Seamless integration with OCEN for loan processing',
      'Diverse financing options from multiple sources',
      'Financial literacy tools for MSMEs',
    ],
    links: {},
    collaborators: [],
  },
  {
    id: 'trendloop',
    title: 'TrendLoop - Sustainable Fashion Platform',
    shortTitle: 'TrendLoop',
    duration: 'May - Jun 2024',
    outcome: 'AI-powered sustainable fashion marketplace',
    stack: ['Flutter', 'Firebase', 'TensorFlow', 'FLUX.1', 'Python'],
    metrics: [],
    problem: '',
    impact: [
      'Personalized outfit recommendations via AI',
      'Virtual clothing try-ons with 3D garment rendering',
      'Circular fashion marketplace for pre-owned clothing',
      'Support for ethical and eco-friendly production',
    ],
    links: {},
    collaborators: ['Rushikesh Muneshwar'],
  },
  {
    id: 'pydorky',
    title: 'Pydorky — Practical Artifact Storage for Teams',
    shortTitle: 'Pydorky',
    duration: 'Dec 2025 - Present',
    outcome: 'Minimal, auditable artifact storage; npm package available',
    stack: ['GitHub Actions', 'Python', 'AWS', 'Azure Data Lake', 'GCP', 'Express.js'],
    metrics: [],
    problem: 'I grew tired of important artifacts being scattered across chat apps (Teams, Slack), quick paste services, and personal drives. Pydorky provides a minimal, auditable, and automated alternative that:\n\n1. keeps artifacts out of VCS while enabling reproducible sharing\n2. integrates with existing cloud storage and IAM controls\n3. provides lightweight metadata, idempotency, and streaming-friendly APIs\n4. offers a Python client for data teams (Parquet/pyarrow integration) and thin clients for other languages\n\nRepository: https://github.com/Pratham-Jain-3903/pydorky\nPackage: https://www.npmjs.com/package/pydorky',
    impact: [],
    links: {
      github: 'https://github.com/Pratham-Jain-3903/pydorky',
      package: 'https://www.npmjs.com/package/pydorky',
    },
    collaborators: ['Various contributors'],
    featuredRank: 2,
  },
  {
    id: 'fin-stream-dashboard',
    title: 'Financial News Research and Streaming Dashboard',
    shortTitle: 'Financial Research Dashboard',
    duration: 'Nov 2025 - Present',
    outcome: 'Kafka-backed research dashboard for comparing financial news and market data',
    stack: ['GitHub Actions', 'Docker', 'Data Warehousing', 'Applied Machine Learning', 'Apache Kafka', 'DuckDB', 'PyCaret', 'Qlib'],
    metrics: [],
    problem: 'Built a Kafka and DuckDB dashboard for exploring financial-news signals alongside equity prices. Qlib integration is currently exploratory for basic quantitative research and backtesting.',
    impact: [],
    links: {
      github: 'https://github.com/Pratham-Jain-3903/streamprocessing-kafka-finlight-news-dashboard',
    },
    collaborators: [],
    featuredRank: 3,
  },
  {
    id: 'agentic-call-handler',
    title: 'Automated Agentic AI Call handler/ Integrated Chatbot',
    shortTitle: 'Agentic Call Handler',
    duration: 'Sep 2025 - Present',
    outcome: 'AI-driven cloud system deployed for Luminous Power Technologies with measurable latency and cost improvements',
    stack: ['Next.js', 'AKS', 'Redis', 'Embeddings', 'LLMs', 'WebSockets', 'Redis Streams'],
    metrics: ['78% lower query latency', '30% cost savings', '7% higher satisfaction', '88% faster responses for 10k calls daily'],
    problem: 'Engineered AI-driven cloud systems by orchestrating adaptive agents, LLMs, and embedding models for IoT data analysis and customer queries; deployed on Next.js PWA + AKS microservices with Redis caching, idempotent workflows, and real-time APIs. Implemented auto-termination of expensive bidirectional WebSocket channels to prevent idle sessions, and added Mermaid-backed visualizers and an adhoc query tool for premium users. Also integrated feedback-intelligence workflows to surface product insights.',
    impact: [],
    links: {},
    collaborators: ['Luminous Power Technologies (P) Ltd'],
  },
  {
    id: 'tcp-congestion-control',
    title: 'TCP Congestion Control - CUBIC-FIT Implementation in ns-3 C++',
    shortTitle: 'TCP Congestion Control',
    duration: '2025',
    outcome: "Near-perfect fairness (Jain's index 0.99999) in multi-flow tests",
    stack: ['C++', 'ns-3', 'Python', 'Networking'],
    metrics: ["Jain's index 0.99999", '9.79 Mbps aggregate throughput', '>98% bottleneck utilisation'],
    problem: 'Implemented CUBIC-FIT as a C++ subclass of TCP CUBIC in ns-3.47, extending the congestion module with dynamic parameter scaling to model multiple competing flows within a single connection.',
    impact: [
      'Achieved near-perfect fairness in multi-flow tests, outperforming vanilla CUBIC.',
      'Delivered 9.79 Mbps aggregate throughput at 58.9 ms delay (2-flow scenario).',
      'Automated measurement and visualisation pipeline in Python to generate comparative graphs.',
    ],
    links: {
      github: 'https://github.com/Pratham-Jain-3903/ns3-tcp-cubic-fit',
    },
    collaborators: [],
  },
  {
    id: 'project-mercury',
    title: 'Project Mercury - Financial News Research Platform',
    shortTitle: 'Project Mercury',
    duration: '2025',
    outcome: 'Reproducible financial-news research across 13,000+ articles and 10 equities',
    stack: ['Kafka', 'PostgreSQL', 'Docker', 'Python', 'Plotly Dash'],
    metrics: ['13,000+ articles', '200 lag configurations per symbol', 'Cost- and slippage-aware evaluation'],
    problem: 'Built a reproducible financial-news research and backtesting platform across 13,000+ articles and 10 equities.',
    impact: [
      'Evaluated news signals with configurable transaction costs, slippage, holding periods, and risk controls.',
      'Tested 200 lag configurations per symbol rather than presenting a single backtest outcome as representative.',
      'Computed risk and return diagnostics, including drawdown and value-at-risk measures, in a Plotly Dash research interface.',
    ],
    links: {
      github: 'https://github.com/Pratham-Jain-3903/streamprocessing-kafka-finlight-news-dashboard',
    },
    collaborators: [],
    featuredRank: 1,
  },
  {
    id: 'fno-analytics',
    title: 'F&O Market Data Warehouse and Analytics',
    shortTitle: 'F&O Market Data Warehouse',
    duration: '2026',
    outcome: 'PostgreSQL market-data design for 2.5M+ Indian futures and options records',
    stack: ['PostgreSQL', 'Python', 'Docker', 'SQL', 'Pandas'],
    metrics: ['2.5M+ trade rows', '77,976 contracts', 'Partitioned analytical queries'],
    problem: 'Designed and loaded a normalized PostgreSQL store for Indian futures and options data across NSE, BSE, and MCX.',
    impact: [
      'Built an idempotent Python ingestion path using COPY through a staging table for high-volume market data.',
      'Modeled contracts, expiries, symbols, and trade facts with integrity constraints that prevent duplicate daily rows.',
      'Used exchange partitions, BRIN indexes, composite indexes, and EXPLAIN ANALYZE to validate time-series query performance.',
    ],
    links: {
      github: 'https://github.com/Pratham-Jain-3903/fno-analytics',
    },
    collaborators: [],
    featuredRank: 4,
  },
  {
    id: 'smart-retail-scanner-pro',
    title: 'Smart Retail Scanner Pro',
    shortTitle: 'Smart Retail Scanner Pro',
    duration: '2025',
    outcome: 'Flipkart Grid 6.0 (National Level 2 Finalist)',
    award: 'National Level 2 Finalist',
    stack: ['Edge Computing', 'Computer Vision', 'MobileNetSSD', 'SQLite'],
    metrics: ['<2s end-to-end latency', 'F1 0.832'],
    problem: 'Designed hybrid edge-cloud architecture for real-time product detection.',
    impact: [
      'Edge inference achieved <2s end-to-end latency on Jetson Nano with 4 simultaneous feeds (MobileNetSSD, F1 0.832).',
      'Implemented local SQLite storage with cloud aggregation under strict latency constraints.',
    ],
    links: {
      github: 'https://github.com/Pratham-Jain-3903/Flipkart_Grid_6.0',
    },
    collaborators: [],
  },
] satisfies readonly Project[];

export const projectIds = new Set(projects.map(({ id }) => id));

export const featuredProjects = projects
  .filter((project) => project.featuredRank !== undefined)
  .sort((left, right) => left.featuredRank! - right.featuredRank!);

const projectsById = new Map(projects.map((project) => [project.id, project]));

export function getProjectById(projectId: string): Project | undefined {
  return projectsById.get(projectId);
}

export function getProjectDescription(project: Project): string {
  const impact = project.impact.map((item) => `• ${item}`).join('\n');
  return [project.problem, impact].filter(Boolean).join('\n\n');
}

export function getPrimaryProjectLink(project: Project): string | undefined {
  return project.links.github ?? project.links.package ?? project.links.live;
}