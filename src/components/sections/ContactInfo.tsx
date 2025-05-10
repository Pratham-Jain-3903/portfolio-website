import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Github, Linkedin, Mail, MapPin, Phone, User } from 'lucide-react';
import Link from 'next/link';

const contactDetails = [
  { icon: Phone, label: 'Phone', value: '+91-9876543210', href: 'tel:+919876543210' },
  { icon: Mail, label: 'Email', value: 'pratham.jain@example.com', href: 'mailto:pratham.jain@example.com' },
  { icon: MapPin, label: 'Location', value: 'Bangalore, India' },
  { icon: Github, label: 'GitHub', value: 'github.com/prathamjain', href: 'https://github.com/prathamjain', target: '_blank' },
  { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/prathamjain', href: 'https://linkedin.com/in/prathamjain', target: '_blank' },
];

const ContactInfo: React.FC = () => {
  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-primary flex items-center">
          <User className="mr-3 h-7 w-7" /> Contact Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {contactDetails.map((detail) => (
          <div key={detail.label} className="flex items-center space-x-3">
            <detail.icon className="h-5 w-5 text-accent" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">{detail.label}</p>
              {detail.href ? (
                <Link href={detail.href} target={detail.target || '_self'} className="text-foreground hover:text-primary transition-colors duration-200">
                  {detail.value}
                </Link>
              ) : (
                <p className="text-foreground">{detail.value}</p>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ContactInfo;
