export type FreelanceExperienceEntry = {
  id: string;
  role: string;
  company: string;
  duration: string;
  location?: string;
  logoUrl?: string;
  responsibilities: readonly string[];
  skills?: readonly string[];
};

export const freelanceExperienceEntries = [
  {
    id: 'neocfo-freelance-software-engineer',
    role: 'Freelance Software Engineer',
    company: 'NeoCFO',
    duration: 'Jan 2025 - Mar 2025',
    location: 'Gurugram, Haryana, India',
    logoUrl: 'https://neocfo.io/logo_color.webp',
    responsibilities: [
      'Utilized agents to fetch data from business tools (e.g., Salesforce, HubSpot) and user data in S3 buckets, enabling dynamic query analysis for revenue forecasting and marketing budget optimization',
      'Deployed APIs using PM2 on serverless EC2 instances and Lambda to process user queries sourced from CRM systems',
      'Trained prediction models on acquired data asynchronously for reasoning models, enhancing backend intelligence',
    ],
    skills: ['AWS', 'Lambda', 'EC2', 'CRM Integration', 'API Development'],
  },
  {
    id: 'yourguide-business-intelligence-growth-analyst',
    role: 'Business Intelligence Growth Analyst',
    company: 'YourGuide',
    duration: 'Aug 2022 - Oct 2022',
    location: 'Hyderabad, Telangana, India',
    logoUrl: 'https://media.licdn.com/dms/image/v2/D4D0BAQH1DtSTwuBLfw/company-logo_200_200/company-logo_200_200/0/1691164381194/yourguide_india_logo?e=2147483647&v=beta&t=3XDDqVXjnv0VbJifBHBhgRmfCStmPI5845lgYJTu3QE',
    responsibilities: [
      'Leveraged business intelligence tools to optimize intern onboarding processes, reducing HR time by 50%',
      'Developed data-driven pitch decks, combining market research and HR analytics, which were instrumental in securing seed funding',
      'Analyzed internal communication patterns and enhanced strategies to improve team collaboration and proactive problem-solving',
    ],
    skills: ['Business Intelligence', 'Data Analysis', 'HR Analytics'],
  },
  {
    id: 'yourguide-market-research-analyst',
    role: 'Market Research Analyst',
    company: 'YourGuide',
    duration: 'Jan 2022 - Aug 2022',
    location: 'Hyderabad, Telangana, India',
    logoUrl: 'https://media.licdn.com/dms/image/v2/D4D0BAQH1DtSTwuBLfw/company-logo_200_200/company-logo_200_200/0/1691164381194/yourguide_india_logo?e=2147483647&v=beta&t=3XDDqVXjnv0VbJifBHBhgRmfCStmPI5845lgYJTu3QE',
    responsibilities: [
      'Conducted market research and survey design, impacting over 500 users',
      'Provided actionable insights from detailed analysis, guiding business decisions',
    ],
    skills: ['Market Research', 'Data Analysis', 'Survey Design'],
  },
] satisfies readonly FreelanceExperienceEntry[];