import { describe, expect, it } from 'vitest';

import { freelanceExperienceEntries } from '@/data/freelance-experience';

describe('freelance experience content', () => {
  it('has unique stable IDs in the current display order', () => {
    expect(new Set(freelanceExperienceEntries.map(({ id }) => id)).size).toBe(
      freelanceExperienceEntries.length
    );
    expect(freelanceExperienceEntries.map(({ id }) => id)).toEqual([
      'neocfo-freelance-software-engineer',
      'yourguide-business-intelligence-growth-analyst',
      'yourguide-market-research-analyst',
    ]);
  });

  it('preserves responsibilities, skills, and locations', () => {
    expect(freelanceExperienceEntries[0].responsibilities).toHaveLength(3);
    expect(freelanceExperienceEntries[1].skills).toContain('Data Analysis');
    expect(freelanceExperienceEntries[2].location).toBe('Hyderabad, Telangana, India');
  });
});