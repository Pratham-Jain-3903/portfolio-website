import { describe, expect, it } from 'vitest';

import { recommendations } from '@/data/recommendations';

describe('recommendation content', () => {
  it('has stable unique IDs in the current display order', () => {
    expect(new Set(recommendations.map(({ id }) => id)).size).toBe(recommendations.length);
    expect(recommendations.map(({ id }) => id)).toEqual([
      'shruti-jaiswal',
      'suresh-chavhan',
      'jahnvi-tiwari',
      'mitalee-agrawal',
    ]);
  });

  it('preserves separate pull quotes and multiline recommendation copy', () => {
    expect(recommendations[0].pullQuote).toContain('data preprocessing');
    expect(recommendations[0].recommendation).toContain('\n\n');
    expect(recommendations.every(({ recommendation }) => recommendation.length > 0)).toBe(true);
  });
});