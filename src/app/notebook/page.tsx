import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import { Badge } from '@/components/ui/badge';
import { notebookEntries } from '@/data/notebook';

export const metadata: Metadata = {
  title: 'Notebook',
  description: 'Small, tested experiments in probability, trading systems and market data, each with its chart and code.',
  alternates: { canonical: '/notebook' },
  openGraph: { url: '/notebook', title: 'Notebook | Pratham Jain' },
};

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });

export default function NotebookPage() {
  const entries = [...notebookEntries].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <>
      <Navbar />
      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-28 pb-12">
        <header className="mb-10 max-w-2xl">
          <h1 className="text-4xl font-bold font-heading text-foreground">Notebook</h1>
          <p className="mt-3 text-muted-foreground">
            Experiments I run and write up: a question, the code that answers it, and what came out. Each one is also a
            LinkedIn post; this is where the full version and the code live.
          </p>
        </header>
        <ul className="grid gap-6 md:grid-cols-2">
          {entries.map((entry) => (
            <li key={entry.slug}>
              <Link
                href={`/notebook/${entry.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-border/60 bg-card transition-colors hover:border-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-border/60 bg-white">
                  <Image
                    src={entry.image.src}
                    alt={entry.image.alt}
                    fill
                    sizes="(min-width: 768px) 480px, 100vw"
                    className="object-cover object-top"
                  />
                </div>
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
