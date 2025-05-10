
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Github, Linkedin, Mail, MapPin, Phone, User } from 'lucide-react';
import Link from 'next/link';

const contactDetails = [
  { icon: Phone, label: 'Phone', value: '+91-9876543210', href: 'tel:+919876543210' },
  { icon: Mail, label: 'Email', value: 'Prathamjain3903@gmail.com', href: 'mailto:Prathamjain3903@gmail.com' },
  { icon: MapPin, label: 'Location', value: 'Bangalore, India' },
  { icon: Github, label: 'GitHub', value: 'github.com/prathamjain', href: 'https://github.com/prathamjain', target: '_blank' },
  { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/prathamjain', href: 'https://linkedin.com/in/prathamjain', target: '_blank' },
];

const ContactInfo: React.FC = () => {
  return (
    <Card className="w-full shadow-xl rounded-xl" id="contact-info">
      <CardHeader>
        <CardTitle className="text-3xl lg:text-4xl font-bold text-accent flex items-center">
          <User className="mr-3 h-8 w-8" /> Contact Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 pt-2">
        {contactDetails.map((detail) => (
          <div key={detail.label} className="flex items-start space-x-4">
            <detail.icon className="h-6 w-6 text-accent mt-1" />
            <div>
              <p className="text-md font-semibold text-muted-foreground">{detail.label}</p>
              {detail.href ? (
                <Link href={detail.href} target={detail.target || '_self'} className="text-lg text-foreground hover:text-accent transition-colors duration-200 break-all">
                  {detail.value}
                </Link>
              ) : (
                <p className="text-lg text-foreground">{detail.value}</p>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ContactInfo;
