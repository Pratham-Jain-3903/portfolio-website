export type Certification = {
  id: string;
  title: string;
  issuer: string;
  issuedDate: string;
  expirationDate?: string;
  credentialId?: string;
  credentialLink?: string;
  logoUrl?: string;
  skills?: readonly string[];
};

export const certifications = [
  { id: 'postman-api-test-automation', title: 'Postman API Test Automation', issuer: 'Canvas Credentials (Badgr)', issuedDate: 'Apr 2025', credentialId: '680b5cfc2cd1e656e70353a9', credentialLink: '#', logoUrl: 'https://media.badgr.com/uploads/issuers/issuer_logo_30a6ab0e-5306-43f7-b5b3-1f6c3964b896.png' },
  { id: 'lean-six-sigma-green-belt', title: 'Lean Six Sigma Green Belt Certification – Level II', issuer: 'TÜV SÜD', issuedDate: 'Mar 2025', logoUrl: 'https://www.tuvsud.com/INTERSHOP/static/WFS/BA-Academy-IN-Site/-/BA-Academy-IN/en_IN/Logo/TS_logo_RGB_Browser.svg' },
  { id: 'intuitive-sql-data-analytics', title: 'Intuitive SQL For Data Analytics', issuer: 'freeCodeCamp', issuedDate: 'Dec 2024', logoUrl: 'https://design-style-guide.freecodecamp.org/img/fcc_secondary_small.svg' },
  { id: 'aws-certified-cloud-practitioner', title: 'AWS Certified Cloud Practitioner (CLF-C02)', issuer: 'Amazon Web Services (AWS)', issuedDate: 'Aug 2024', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg' },
  { id: 'cloud-computing-iit-kharagpur', title: 'Cloud Computing by IIT Kharagpur', issuer: 'SWAYAM MHRD', issuedDate: 'Aug 2024', credentialId: 'NPTEL24CS118S1050201037', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1c/IIT_Kharagpur_Logo.svg/330px-IIT_Kharagpur_Logo.svg.png' },
  { id: 'google-data-analytics', title: 'Google Data Analytics Professional Certificate', issuer: 'Coursera', issuedDate: 'Jun 2024', credentialLink: '#', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/640px-Google_%22G%22_logo.svg.png' },
  { id: 'machine-learning-theory-practice', title: 'Machine Learning From Theory to Practice', issuer: 'Indian Institute of Technology, Kanpur', issuedDate: 'Feb 2023', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/a/a3/IIT_Kanpur_Logo.svg' },
  { id: 'microsoft-azure-fundamentals', title: 'Microsoft Certified: Azure Fundamentals (AZ-900)', issuer: 'Microsoft', issuedDate: 'Mar 2025', expirationDate: 'Jan 2028', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure.svg' },
  { id: 'mongodb-aggregation-fundamentals', title: 'MongoDB Aggregation Fundamentals', issuer: 'MongoDB', issuedDate: 'Sep 2025', credentialId: 'd7d801f4-bff5-4dd2-8a29-e4b22173c7c2', credentialLink: '#', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/45/MongoDB-Logo.svg', skills: ['MongoDB', 'Data Modeling'] },
  { id: 'mongodb-relational-document-model', title: "From Relational Model (SQL) to MongoDB's Document Model", issuer: 'MongoDB', issuedDate: 'Aug 2025', credentialLink: '#', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/45/MongoDB-Logo.svg', skills: ['Data Modeling'] },
  { id: 'mongodb-schema-design-patterns', title: 'Schema Design Patterns and Anti-patterns Skill Badge', issuer: 'MongoDB', issuedDate: 'Aug 2025', credentialId: 'bb8a6305-b1a0-4dc2-8e61-1436ab2b6a6c', credentialLink: '#', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/45/MongoDB-Logo.svg', skills: ['Data Modeling'] },
  { id: 'learn-docker', title: 'Learn Docker', issuer: 'Boot.dev', issuedDate: 'Aug 2025', credentialId: '16954b7c-d563-4675-b779-b087d0635049', credentialLink: '#', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Docker_%28container_engine%29_logo.svg', skills: ['Docker Products', 'Go (Programming Language)'] },
  { id: 'object-oriented-python', title: 'Object Oriented Programming in Python', issuer: 'Boot.dev', issuedDate: 'Aug 2025', credentialId: 'b1dc00c9-a7a0-4c97-9a4b-02598422e204', credentialLink: '#', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg', skills: ['Object-Oriented Programming (OOP)', 'Python (Programming Language)'] },
] satisfies readonly Certification[];