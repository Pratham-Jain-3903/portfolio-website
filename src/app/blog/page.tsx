import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import { Badge } from '@/components/ui/badge';
import { blogPosts } from '@/data/blog';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Write-ups of what I build and test: trading systems, market-data engineering and probability, with the charts and code.',
  alternates: { canonical: '/blog' },
  openGraph: { url: '/blog', title: 'Blog | Pratham Jain' },
};

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });

export default function BlogPage() {
  const entries = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <>
      <Navbar />
      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-28 pb-12">
        <header className="mb-10 max-w-2xl">
          <h1 className="text-4xl font-bold font-heading text-foreground">Blog</h1>
          <p className="mt-3 text-muted-foreground">
            What I build and test, written up properly: trading systems, market-data engineering and probability.
            Most of these started as LinkedIn posts; this is where the full version and the code live.
          </p>
        </header>
        <ul className="grid gap-6 md:grid-cols-2">
          {entries.map((entry) => (
            <li key={entry.slug}>
              <Link
                href={`/blog/${entry.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-border/60 bg-card transition-colors hover:border-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
              >
                {entry.image ? (
                  <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-border/60 bg-white">
                    <Image
                      src={entry.image.src}
                      alt={entry.image.alt}
                      fill
                      sizes="(min-width: 768px) 480px, 100vw"
                      className="object-cover object-top"
                    />
                  </div>
                ) : (
                  <div className="border-b border-border/60 bg-accent/10 px-5 py-6">
                    <p className="text-2xl font-semibold font-heading text-foreground tabular-nums">{entry.findings[0]?.value}</p>
                    <p className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">{entry.findings[0]?.label}</p>
                  </div>
                )}
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <time dateTime={entry.date} className="text-xs uppercase tracking-wide text-muted-foreground">
                    {formatDate(entry.date)}
                  </time>
                  <h2 className="text-xl font-semibold font-heading text-foreground group-hover:text-accent">{entry.title}</h2>
                  <p className="text-sm text-muted-foreground">{entry.summary}</p>
                  <div className="mt-auto flex flex-wrap gap-2 pt-2">
                    {entry.stack.map((item) => (
                      <Badge key={item} variant="secondary">{item}</Badge>
                    ))}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </>
  );
}
