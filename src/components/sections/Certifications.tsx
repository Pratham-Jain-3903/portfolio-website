import React from 'react';
import Image from 'next/image'; // ✅ Required for logo images
import Link from 'next/link';   // ✅ Required for credential links
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Calendar, LinkIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { certifications } from '@/data/certifications';

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
          {certifications.map((cert) => (
            <div
              key={cert.id}
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
