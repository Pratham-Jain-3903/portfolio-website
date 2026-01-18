import React from 'react';
import Image from 'next/image'; // ✅ Required for logo images
import Link from 'next/link';   // ✅ Required for credential links
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Calendar, LinkIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CertificationEntry {
  title: string;
  issuer: string;
  issuedDate: string;
  expirationDate?: string;
  credentialId?: string;
  credentialLink?: string;
  logoUrl?: string;
  skills?: string[];
}

const certificationData: CertificationEntry[] = [
  {
    title: 'Postman API Test Automation',
    issuer: 'Canvas Credentials (Badgr)',
    issuedDate: 'Apr 2025',
    credentialId: '680b5cfc2cd1e656e70353a9',
    credentialLink: '#',
    logoUrl: 'https://media.badgr.com/uploads/issuers/issuer_logo_30a6ab0e-5306-43f7-b5b3-1f6c3964b896.png',
  },
  {
    title: 'Lean Six Sigma Green Belt Certification – Level II',
    issuer: 'TÜV SÜD',
    issuedDate: 'Mar 2025',
    logoUrl: 'https://www.tuvsud.com/INTERSHOP/static/WFS/BA-Academy-IN-Site/-/BA-Academy-IN/en_IN/Logo/TS_logo_RGB_Browser.svg',
  },
  {
    title: 'Intuitive SQL For Data Analytics',
    issuer: 'freeCodeCamp',
    issuedDate: 'Dec 2024',
    logoUrl: 'https://design-style-guide.freecodecamp.org/img/fcc_secondary_small.svg',
  },
  {
    title: 'AWS Certified Cloud Practitioner (CLF-C02)',
    issuer: 'Amazon Web Services (AWS)',
    issuedDate: 'Aug 2024',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg',
  },
  {
    title: 'Cloud Computing by IIT Kharagpur',
    issuer: 'SWAYAM MHRD',
    issuedDate: 'Aug 2024',
    credentialId: 'NPTEL24CS118S1050201037',
    logoUrl: 'http://sangamuniversity.ac.in/wp-content/uploads/2023/03/nptel.jpg',
  },
  {
    title: 'Google Data Analytics Professional Certificate',
    issuer: 'Coursera',
    issuedDate: 'Jun 2024',
    credentialLink: '#',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/640px-Google_%22G%22_logo.svg.png',
  },
  {
    title: 'Machine Learning From Theory to Practice',
    issuer: 'Indian Institute of Technology, Kanpur',
    issuedDate: 'Feb 2023',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/a/a3/IIT_Kanpur_Logo.svg',
  },
  {
    title: 'Microsoft Certified: Azure Fundamentals (AZ-900)',
    issuer: 'Microsoft',
    issuedDate: 'Mar 2025',
    expirationDate: 'Jan 2028',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure.svg',
  },
  {
    title: 'MongoDB Aggregation Fundamentals',
    issuer: 'MongoDB',
    issuedDate: 'Sep 2025',
    credentialId: 'd7d801f4-bff5-4dd2-8a29-e4b22173c7c2',
    credentialLink: '#',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/45/MongoDB-Logo.svg',
    skills: ['MongoDB', 'Data Modeling'],
  },
  {
    title: "From Relational Model (SQL) to MongoDB's Document Model",
    issuer: 'MongoDB',
    issuedDate: 'Aug 2025',
    credentialLink: '#',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/45/MongoDB-Logo.svg',
    skills: ['Data Modeling'],
  },
  {
    title: 'Schema Design Patterns and Anti-patterns Skill Badge',
    issuer: 'MongoDB',
    issuedDate: 'Aug 2025',
    credentialId: 'bb8a6305-b1a0-4dc2-8e61-1436ab2b6a6c',
    credentialLink: '#',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/45/MongoDB-Logo.svg',
    skills: ['Data Modeling'],
  },
  {
    title: 'Learn Docker',
    issuer: 'Boot.dev',
    issuedDate: 'Aug 2025',
    credentialId: '16954b7c-d563-4675-b779-b087d0635049',
    credentialLink: '#',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Docker_%28container_engine%29_logo.svg',
    skills: ['Docker Products', 'Go (Programming Language)'],
  },
  {
    title: 'Object Oriented Programming in Python',
    issuer: 'Boot.dev',
    issuedDate: 'Aug 2025',
    credentialId: 'b1dc00c9-a7a0-4c97-9a4b-02598422e204',
    credentialLink: '#',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg',
    skills: ['Object-Oriented Programming (OOP)', 'Python (Programming Language)'],
  },
];

const Certifications: React.FC = () => {
  return (
    <Card className="w-full shadow-xl rounded-xl overflow-hidden border border-border/50" id="certifications">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 pb-4">
        <CardTitle className="text-2xl lg:text-3xl font-bold text-foreground flex items-center">
          <Award className="mr-3 h-7 w-7 text-primary" /> Certifications
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-1">
          Professional credentials and courses
        </p>
      </CardHeader>
      <CardContent className="pt-6 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certificationData.map((cert, idx) => (
            <div
              key={idx}
              className={cn(
                "p-4 border border-border/20 bg-background/10 backdrop-blur-sm rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200",
                "flex items-start space-x-4 flex-col sm:flex-row"
              )}
            >
              {cert.logoUrl && (
                <div className="relative mr-0 sm:mr-4 mb-3 sm:mb-0 flex-shrink-0">
                  <Image
                    src={cert.logoUrl}
                    alt={`${cert.issuer} logo`}
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-lg object-contain border-2 border-muted bg-background"
                  />
                </div>
              )}
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-foreground">{cert.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{cert.issuer}</p>
                <div className="text-xs text-muted-foreground flex items-center flex-wrap gap-x-4 gap-y-1">
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" /> Issued: {cert.issuedDate}
                  </div>
                  {cert.expirationDate && (
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" /> Expires: {cert.expirationDate}
                    </div>
                  )}
                </div>
                {cert.credentialId && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Credential ID: <span className="font-mono text-xs">{cert.credentialId}</span>
                  </p>
                )}
                {cert.credentialLink && (
                  <Link
                    href={cert.credentialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline mt-2 group"
                  >
                    <LinkIcon className="h-3.5 w-3.5" />
                    <span>See credential</span>
                    <svg className="h-3 w-3 opacity-50 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </Link>
                )}
                {cert.skills && cert.skills.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {cert.skills.map((s, i) => (
                      <span key={i} className="text-xs text-muted-foreground bg-muted/20 px-2 py-1 rounded-md">
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Certifications;
