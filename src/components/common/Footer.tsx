
import Link from 'next/link';
import { Github, Linkedin, Mail, Briefcase, Brain, GraduationCap, ShieldCheck, Users, HomeIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const quickLinks = [
  { name: 'Home', href: '#', icon: HomeIcon },
  { name: 'Objective', href: '#objective', icon: ShieldCheck },
  { name: 'Experience', href: '#experience', icon: Briefcase },
  { name: 'Skills', href: '#skills', icon: Brain },
  { name: 'Education', href: '#education', icon: GraduationCap },
  { name: 'Contact', href: '#contact-info', icon: Users },
];

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/Pratham-Jain-3903', icon: Github, value: 'github.com/Pratham-Jain-3903' },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/prathamjain', icon: Linkedin, value: 'linkedin.com/in/prathamjain' },
];

const contactEmail = 'Prathamjain3903@gmail.com';

export default function Footer() {
  return (
    <footer className="bg-background/20 backdrop-blur-md border-t border-border/40 text-muted-foreground mt-20">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About/Logo Section */}
          <div className="mb-6 md:mb-0">
            <Link href="/" className="text-3xl font-bold text-foreground hover:text-accent transition-colors font-heading">
              Pratham Jain
            </Link>
            <p className="mt-3 text-sm">
              Data Engineer & Machine Learning Engineer. Passionate about building scalable solutions and driving innovation through data.
            </p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 font-heading">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-accent transition-colors flex items-center">
                    <link.icon className="w-4 h-4 mr-2 text-accent/80" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Section */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 font-heading">Connect</h3>
            <ul className="space-y-3">
              {socialLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors flex items-start">
                    <link.icon className="w-5 h-5 mr-2 mt-0.5 text-accent/80 flex-shrink-0" />
                    <span className="break-all">{link.value}</span>
                  </Link>
                </li>
              ))}
              <li>
                <a href={`mailto:${contactEmail}`} className="hover:text-accent transition-colors flex items-start">
                  <Mail className="w-5 h-5 mr-2 mt-0.5 text-accent/80 flex-shrink-0" />
                  <span className="break-all">{contactEmail}</span>
                </a>
              </li>
            </ul>
          </div>
          
          {/* Get in Touch Section */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 font-heading">Get in Touch</h3>
            <p className="mb-4 text-sm">
              Have a project in mind or want to collaborate? Feel free to reach out.
            </p>
            <a
              href={`mailto:${contactEmail}?subject=Project Inquiry from DevSite`}
              className="inline-block px-6 py-3 rounded-lg font-semibold
                         bg-accent/20 text-primary-foreground hover:bg-accent/30 border-2 border-accent/40 backdrop-blur-md
                         transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Send an Email
            </a>
          </div>
        </div>

        <Separator className="my-10 bg-border/30" />

        <div className="text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Pratham Jain. All rights reserved.</p>
          <p className="mt-1">Crafted with passion and precision.</p>
        </div>
      </div>
    </footer>
  );
}
