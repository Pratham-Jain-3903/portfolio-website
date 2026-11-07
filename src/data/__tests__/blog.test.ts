import { existsSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

import { getBlogPost, blogPosts } from '@/data/blog';

describe('blog content', () => {
  it('has unique URL-safe slugs', () => {
    const slugs = blogPosts.map(({ slug }) => slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(slugs.every((slug) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug))).toBe(true);
  });

  it('uses ISO dates and has findings and body copy', () => {
    for (const entry of blogPosts) {
      expect(entry.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(entry.findings.length).toBeGreaterThan(0);
      expect(entry.body.length).toBeGreaterThan(0);
    }
  });

  it('points every image at a file in /public', () => {
    for (const entry of blogPosts) {
      if (entry.image) expect(existsSync(path.join(process.cwd(), 'public', entry.image.src))).toBe(true);
    }
  });

  it('contains only valid HTTP links', () => {
    for (const entry of blogPosts) {
      for (const link of Object.values(entry.links)) {
        expect(new URL(link).protocol).toMatch(/^https?:$/);
      }
    }
  });

  it('looks entries up by slug', () => {
    expect(getBlogPost('kelly-coin')?.title).toContain('60% coin');
    expect(getBlogPost('missing')).toBeUndefined();
  });
});
