type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'

type CTAButton = {
  variant?: ButtonVariant
  href: string
  target?: string
  text: string
  icon?: string
}

export const sectionData: { hero: { title: string; subtitle: string; ctaButtons: CTAButton[] } } = {
  hero: {
    title: "Hi, I'm Pratham — Data & ML Engineer",
    subtitle: 'I build data pipelines and AI-powered systems.',
    ctaButtons: [
      { variant: 'default', href: '#contact', target: '_self', text: 'Contact', icon: 'LinkedinIcon' },
      { variant: 'ghost', href: '#projects', target: '_self', text: 'Projects', icon: 'GithubIcon' },
    ],
  },
}

export default sectionData;
