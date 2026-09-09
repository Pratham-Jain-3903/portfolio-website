import { describe, expect, it } from 'vitest';

import { groupExperiencesByCompany, type ExperienceEntry } from '@/data/experience';

const experiences: ExperienceEntry[] = [
  {
    id: 'earlier-role',
    role: 'Earlier role',
    company: 'Example Co',
    duration: 'Jan 2024 - Jun 2024',
    responsibilities: [],
  },
  {
    id: 'later-role',
    role: 'Later role',
    company: 'Example Co',
    duration: 'Sep 2024 - Present',
    responsibilities: [],
  },
  {
    id: 'grouped-role',
    role: 'Grouped role',
    company: 'Subsidiary',
    parentCompany: 'Parent Co',
    duration: 'Mar 2025 - Present',
    responsibilities: [],
  },
];

describe('experience grouping', () => {
  it('groups parent-company roles and keeps each group newest first', () => {
    const grouped = groupExperiencesByCompany(experiences);

    expect(Array.from(grouped.keys())).toEqual(['Example Co', 'Parent Co']);
    expect(grouped.get('Example Co')?.map(({ id }) => id)).toEqual([
      'later-role',
      'earlier-role',
    ]);
    expect(grouped.get('Parent Co')?.map(({ id }) => id)).toEqual(['grouped-role']);
  });
});