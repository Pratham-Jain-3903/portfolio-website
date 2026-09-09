import Link from 'next/link';
import {
  ArrowUpRight,
  Award,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react';

import { certifications } from '@/data/certifications';
import { educationEntries } from '@/data/education';
import { freelanceExperienceEntries } from '@/data/freelance-experience';
import { contactDetails, objectiveStatement, type ContactIconKey } from '@/data/profile';
import { featuredProjects, getPrimaryProjectLink, projects } from '@/data/projects';
import { recommendations } from '@/data/recommendations';
import { skillGroups } from '@/data/skills';
import { volunteerExperienceEntries } from '@/data/volunteer-experience';
import Experience from '@/components/sections/Experience';

const contactIcons = {
  phone: Phone,
  email: Mail,
  location: MapPin,
  github: Github,
  linkedin: Linkedin,
} satisfies Record<ContactIconKey, typeof Phone>;

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="doto-font text-sm font-semibold uppercase text-primary">{children}</p>;
}

export default function ClassicPortfolio() {
  const publicProjects = projects.filter((project) => project.links.github);

  return (
    <div className="bg-background text-foreground">
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8" aria-labelledby="classic-intro">
        <SectionLabel>Classic portfolio</SectionLabel>
        <div className="mt-5 grid gap-10 border-b border-border pb-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end">
          <h2 id="classic-intro" className="max-w-[18ch] text-4xl font-semibold leading-tight sm:text-5xl">
            Reliable data infrastructure for quantitative research.
          </h2>
          <p className="max-w-[62ch] whitespace-pre-line text-base leading-7 text-muted-foreground">
            {objectiveStatement}
          </p>
        </div>
      </section>

      <section id="experience" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-16 sm:px-6 sm:py-20 lg:px-8" aria-labelledby="experience-heading">
        <SectionLabel>Work experience</SectionLabel>
        <div className="mt-5 max-w-3xl border-b border-border pb-7">
          <h2 id="experience-heading" className="text-4xl font-semibold leading-tight sm:text-5xl">Hands-on data systems, analytics, and delivery.</h2>
          <p className="mt-4 leading-7 text-muted-foreground">Experience building dependable pipelines, analytical products, and production-facing data systems.</p>
        </div>
        <div className="mt-10">
          <Experience />
        </div>
      </section>

      <section id="selected-work" className="border-y border-border bg-muted/20" aria-labelledby="selected-work-heading">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
          <SectionLabel>Selected work</SectionLabel>
          <div className="mt-5 flex flex-wrap items-end justify-between gap-4 border-b border-border pb-7">
            <h2 id="selected-work-heading" className="text-4xl font-semibold leading-tight sm:text-5xl">Market-data and research systems.</h2>
            <a href="#project-index" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
              View all work <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
          <div className="divide-y divide-border">
            {featuredProjects.map((project) => {
              const destination = getPrimaryProjectLink(project);

              return (
                <article id={`project-${project.id}`} key={project.id} className="grid gap-4 py-8 sm:grid-cols-[7rem_minmax(0,1fr)_auto] sm:gap-8">
                  <p className="doto-font text-sm text-muted-foreground">0{project.featuredRank}</p>
                  <div>
                    <h3 className="text-2xl font-semibold leading-tight">{project.shortTitle}</h3>
                    <p className="mt-3 max-w-[64ch] leading-7 text-muted-foreground">{project.problem || project.outcome}</p>
                    <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground" aria-label={`${project.shortTitle} metrics`}>
                      {project.metrics.map((metric) => <li key={metric}>{metric}</li>)}
                    </ul>
                  </div>
                  {destination && (
                    <Link href={destination} target="_blank" rel="noopener noreferrer" className="inline-flex h-10 w-10 items-center justify-center self-start border border-border text-primary hover:bg-primary hover:text-primary-foreground" aria-label={`Open ${project.shortTitle}`}>
                      <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                    </Link>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="freelance-experience" className="border-y border-border bg-muted/20" aria-labelledby="freelance-heading">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
          <SectionLabel>Independent work</SectionLabel>
          <h2 id="freelance-heading" className="mt-5 text-4xl font-semibold leading-tight sm:text-5xl">Freelance and consulting experience.</h2>
          <div className="mt-10 divide-y divide-border border-y border-border">
            {freelanceExperienceEntries.map((entry) => (
              <article key={entry.id} className="grid gap-4 py-7 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
                <div>
                  <p className="text-sm text-muted-foreground">{entry.duration}</p>
                  <h3 className="mt-2 text-xl font-semibold">{entry.role}</h3>
                  <p className="mt-1 text-muted-foreground">{entry.company}</p>
                  {entry.location && <p className="mt-1 text-sm text-muted-foreground">{entry.location}</p>}
                </div>
                <div>
                  <ul className="space-y-3 text-sm leading-6 text-muted-foreground">
                    {entry.responsibilities.map((responsibility) => <li key={responsibility}>{responsibility}</li>)}
                  </ul>
                  <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${entry.role} skills`}>
                    {entry.skills?.map((skill) => <li key={skill} className="border border-border px-2 py-1 text-xs text-muted-foreground">{skill}</li>)}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-16 sm:px-6 sm:py-20 lg:px-8" aria-labelledby="skills-heading">
        <SectionLabel>Capabilities</SectionLabel>
        <h2 id="skills-heading" className="mt-5 text-4xl font-semibold leading-tight sm:text-5xl">Quant data engineering toolkit.</h2>
        <div className="mt-10 grid border-t border-border sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <article key={group.id} className="border-b border-border py-6 sm:pr-6 sm:odd:border-r sm:odd:pr-6 lg:border-r lg:px-6 lg:first:pl-0 lg:nth-[3n+1]:pl-0 lg:nth-[3n+3]:border-r-0">
              <h3 className="font-semibold">{group.label}</h3>
              <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-2 text-sm leading-6 text-muted-foreground">
                {group.skills.map((skill) => <li key={skill}>{skill}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8" aria-labelledby="education-heading">
        <SectionLabel>Education and recognition</SectionLabel>
        <div className="mt-5 grid gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <h2 id="education-heading" className="text-4xl font-semibold leading-tight">Education.</h2>
            <div className="mt-8 divide-y divide-border border-y border-border">
              {educationEntries.map((entry) => (
                <article key={entry.id} className="py-6">
                  <p className="text-sm text-muted-foreground">{entry.year}</p>
                  <h3 className="mt-2 text-xl font-semibold">{entry.institution}</h3>
                  <p className="mt-2 leading-7 text-muted-foreground">{entry.degree}</p>
                  <p className="mt-3 text-sm font-medium">{entry.cgpa}</p>
                </article>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-4xl font-semibold leading-tight">Selected credentials.</h2>
            <div className="mt-8 divide-y divide-border border-y border-border">
              {certifications.map((certification) => (
                <article key={certification.id} className="flex gap-4 py-5">
                  <Award className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  <div>
                    <h3 className="font-semibold">{certification.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{certification.issuer} · {certification.issuedDate}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="volunteer-experience" className="border-y border-border bg-muted/20" aria-labelledby="volunteer-heading">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
          <SectionLabel>Community</SectionLabel>
          <h2 id="volunteer-heading" className="mt-5 text-4xl font-semibold leading-tight sm:text-5xl">Volunteer leadership and mentorship.</h2>
          <div className="mt-10 grid gap-x-10 border-t border-border md:grid-cols-2">
            {volunteerExperienceEntries.map((entry) => (
              <article key={entry.id} className="border-b border-border py-6">
                <p className="text-sm text-muted-foreground">{entry.duration}</p>
                <h3 className="mt-2 text-xl font-semibold">{entry.role}</h3>
                <p className="mt-1 text-muted-foreground">{entry.company}</p>
                {entry.category && <p className="mt-3 text-sm text-primary">{entry.category}</p>}
                {entry.description && <p className="mt-3 text-sm leading-6 text-muted-foreground">{entry.description}</p>}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="recommendations" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-16 sm:px-6 sm:py-20 lg:px-8" aria-labelledby="recommendations-heading">
        <SectionLabel>Recommendations</SectionLabel>
        <h2 id="recommendations-heading" className="mt-5 text-4xl font-semibold leading-tight sm:text-5xl">What collaborators say.</h2>
        <div className="mt-10 grid gap-x-10 border-t border-border md:grid-cols-2">
          {recommendations.map((recommendation) => (
            <figure key={recommendation.id} className="border-b border-border py-7">
              <blockquote className="text-xl leading-8 text-foreground">“{recommendation.pullQuote}”</blockquote>
              <figcaption className="mt-5 text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{recommendation.name}</span><br />
                {recommendation.title} · {recommendation.relationship} · {recommendation.date}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="project-index" className="border-t border-border bg-muted/20" aria-labelledby="project-index-heading">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
          <SectionLabel>Project index</SectionLabel>
          <h2 id="project-index-heading" className="mt-5 text-4xl font-semibold leading-tight sm:text-5xl">All public work.</h2>
          <div className="mt-10 grid border-t border-border sm:grid-cols-2">
            {publicProjects.map((project) => (
              <article id={`project-index-${project.id}`} key={project.id} className="flex border-b border-border py-6 sm:pr-8 odd:sm:border-r odd:sm:pr-8 even:sm:pl-8">
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-muted-foreground">{project.duration}</p>
                  <h3 className="mt-2 text-xl font-semibold">{project.shortTitle}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{project.outcome}</p>
                </div>
                <Link href={project.links.github!} target="_blank" rel="noopener noreferrer" className="ml-4 inline-flex h-10 w-10 shrink-0 items-center justify-center border border-border text-primary hover:bg-primary hover:text-primary-foreground" aria-label={`Open ${project.shortTitle} on GitHub`}>
                  <Github className="h-5 w-5" aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact-info" className="border-t border-border bg-muted/20" aria-labelledby="contact-heading">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-6 sm:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <SectionLabel>Contact</SectionLabel>
            <h2 id="contact-heading" className="mt-5 max-w-[12ch] text-4xl font-semibold leading-tight sm:text-5xl">Let&apos;s build something useful.</h2>
          </div>
          <dl className="grid gap-6 sm:grid-cols-2">
            {contactDetails.map((detail) => {
              const Icon = contactIcons[detail.icon];
              const value = <span className="break-all text-base text-foreground">{detail.value}</span>;

              return (
                <div key={detail.label}>
                  <dt className="flex items-center gap-2 text-sm text-muted-foreground"><Icon className="h-4 w-4 text-primary" aria-hidden="true" />{detail.label}</dt>
                  <dd className="mt-2">
                    {detail.href ? <Link href={detail.href} target={detail.target} className="hover:text-primary hover:underline">{value}</Link> : value}
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      </section>
    </div>
  );
}