import { describe, expect, it } from 'vitest';

import { educationEntries } from '@/data/education';

describe('education content', () => {
  it('has unique stable IDs in the approved display order', () => {
    expect(new Set(educationEntries.map(({ id }) => id)).size).toBe(educationEntries.length);
    expect(educationEntries.map(({ id }) => id)).toEqual([
      'iim-visakhapatnam-mba',
      'iiit-raichur-btech',
    ]);
  });

  it('keeps education results and supporting details intact', () => {
    expect(educationEntries[0]).toMatchObject({
      cgpa: '4.0 / 4.0',
      activities: '',
      skills: [],
    });
    expect(educationEntries[1].skills).toContain('Machine Learning');
  });
});