import { describe, expect, it } from 'vitest';

import { linkedInPostUrls, publicWritingEntries, writingEntries } from '@/data/writing';

describe('writing content', () => {
  it('keeps stable unique records for the existing LinkedIn URLs', () => {
    expect(new Set(writingEntries.map(({ id }) => id)).size).toBe(writingEntries.length);
    expect(linkedInPostUrls).toHaveLength(4);
    expect(linkedInPostUrls.every((url) => new URL(url).hostname === 'www.linkedin.com')).toBe(true);
  });

  it('hides entries pending approved editorial copy', () => {
    expect(writingEntries.every(({ status }) => status === 'needs-copy')).toBe(true);
    expect(publicWritingEntries).toEqual([]);
  });
});