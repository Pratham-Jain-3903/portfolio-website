import { describe, expect, it } from 'vitest';

import { volunteerExperienceEntries } from '@/data/volunteer-experience';

describe('volunteer experience content', () => {
  it('has unique stable IDs in display order', () => {
    expect(new Set(volunteerExperienceEntries.map(({ id }) => id)).size).toBe(
      volunteerExperienceEntries.length
    );
    expect(volunteerExperienceEntries.map(({ id }) => id)).toEqual([
      'rims-database-developer',
      'national-service-scheme-volunteer',
      'iiit-raichur-public-relations',
      'ecell-student-mentor',
      'epoch-iit-hyderabad-member',
      'lambda-iit-hyderabad-member',
    ]);
  });

  it('preserves the optional organization metadata', () => {
    expect(volunteerExperienceEntries.filter(({ logoUrl }) => logoUrl).length).toBe(6);
    expect(volunteerExperienceEntries.find(({ id }) => id === 'epoch-iit-hyderabad-member')?.skills).toEqual([
      'Data Science',
      'Applied Machine Learning',
      'Python',
    ]);
  });
});