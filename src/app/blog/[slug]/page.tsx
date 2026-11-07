import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Github, Linkedin, FileText } from 'lucide-react';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getBlogPost, blogPosts } from '@/data/blog';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return blogPosts.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = getBlogPost(slug);
  if (!entry) return {};
  const url = `/blog/${entry.slug}`;
  return {
    title: entry.title,
    description: entry.summary,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: entry.title,
      description: entry.summary,
      publishedTime: entry.date,
      images: entry.image ? [{ url: entry.image.src, width: entry.image.width, height: entry.image.height, alt: entry.image.alt }] : undefined,
    },
    twitter: { card: entry.image ? 'summary_large_image' : 'summary', title: entry.title, description: entry.summary, images: entry.image ? [entry.image.src] : undefined },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const entry = getBlogPost(slug);
  if (!entry) notFound();

  return (
    <>
      <Navbar />
      <article className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-28 pb-12">
        <Link href="/blog" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-accent">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Blog
        </Link>
        <h1 className="mt-4 text-3xl sm:text-4xl font-bold font-heading text-foreground text-balance">{entry.title}</h1>
        <p className="mt-3 text-lg text-muted-foreground">{entry.summary}</p>

        <dl className="mt-8 grid gap-3 sm:grid-cols-2">
          {entry.findings.map((finding) => (
            <div key={finding.label} className="rounded-lg border border-border/60 bg-card p-4">
              <dt className="text-xs uppercase tracking-wide text-muted-foreground">{finding.label}</dt>
              <dd className="mt-1 font-semibold text-foreground tabular-nums">{finding.value}</dd>
            </div>
          ))}
        </dl>

        {entry.image ? (
          <figure className="mt-8 overflow-hidden rounded-xl border border-border/60 bg-white">
            <Image
              src={entry.image.src}
              alt={entry.image.alt}
              width={entry.image.width}
              height={entry.image.height}
              sizes="(min-width: 768px) 720px, 100vw"
              className="h-auto w-full"
              priority
            />
          </figure>
        ) : null}

        <div className="mt-8 space-y-5 leading-relaxed text-foreground/90">
          {entry.body.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
          {entry.next ? <p className="border-l-2 border-accent pl-4 text-muted-foreground">{entry.next}</p> : null}
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {entry.stack.map((item) => (
            <Badge key={item} variant="secondary">{item}</Badge>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {entry.links.code ? (
            <Button asChild>
              <a href={entry.links.code} target="_blank" rel="noopener noreferrer"><Github className="mr-2 h-4 w-4" aria-hidden="true" />Code</a>
            </Button>
          ) : null}
          {entry.links.linkedin ? (
            <Button asChild variant="outline">
              <a href={entry.links.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin className="mr-2 h-4 w-4" aria-hidden="true" />Discussion on LinkedIn</a>
            </Button>
          ) : null}
          {entry.links.source ? (
            <Button asChild variant="outline">
              <a href={entry.links.source} target="_blank" rel="noopener noreferrer"><FileText className="mr-2 h-4 w-4" aria-hidden="true" />Original study</a>
            </Button>
          ) : null}
        </div>
      </article>
      <Footer />
    </>
  );
}
