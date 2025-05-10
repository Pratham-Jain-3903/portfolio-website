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
}

const certificationData: CertificationEntry[] = [
  {
    title: 'Postman API Test Automation',
    issuer: 'Canvas Credentials (Badgr)',
    issuedDate: 'Apr 2025',
    credentialId: '680b5cfc2cd1e656e70353a9',
    credentialLink: '#',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Postman_%28software%29.png',
  },
  {
    title: 'Lean Six Sigma Green Belt Certification – Level II',
    issuer: 'TÜV SÜD',
    issuedDate: 'Mar 2025',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/T%C3%9CV_S%C3%9DD_logo.svg',
  },
  {
    title: 'Intuitive SQL For Data Analytics',
    issuer: 'freeCodeCamp',
    issuedDate: 'Dec 2024',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/39/FreeCodeCamp_logo.svg',
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
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/SWAYAM_Logo.svg',
  },
  {
    title: 'Google Data Analytics Professional Certificate',
    issuer: 'Coursera',
    issuedDate: 'Jun 2024',
    credentialLink: '#',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Coursera_logo.svg',
  },
  {
    title: 'Machine Learning From Theory to Practice',
    issuer: 'Indian Institute of Technology, Kanpur',
    issuedDate: 'Feb 2023',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/3/3e/IIT_Kanpur_Logo.svg',
  },
  {
    title: 'Microsoft Certified: Azure Fundamentals (AZ-900)',
    issuer: 'Microsoft',
    issuedDate: 'Mar 2025',
    expirationDate: 'Jan 2028',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure.svg',
  },
];

const Certifications: React.FC = () => {
  return (
    <Card className="w-full shadow-xl rounded-xl overflow-hidden border border-border/50" id="certifications">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 pb-6">
        <CardTitle className="text-3xl lg:text-4xl font-bold text-foreground flex items-center">
          <Award className="mr-3 h-8 w-8 text-primary" /> Licenses & Certifications
        </CardTitle>
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
                    className="inline-flex items-center text-sm text-primary hover:underline mt-2"
                  >
                    <LinkIcon className="h-4 w-4 mr-1" /> See credential
                  </Link>
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
