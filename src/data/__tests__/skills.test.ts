import { describe, expect, it } from 'vitest';

import { skillGroups, skillIconKeys } from '@/data/skills';

describe('skill content', () => {
  it('has unique stable IDs and known presentation keys', () => {
    expect(new Set(skillGroups.map(({ id }) => id)).size).toBe(skillGroups.length);
    expect(skillGroups.every(({ icon }) => skillIconKeys.includes(icon))).toBe(true);
  });

  it('preserves ordered non-empty groups', () => {
    expect(skillGroups.map(({ label }) => label)).toEqual([
      'Programming and Querying',
      'Market and Data Pipelines',
      'Analytical Storage',
      'Research and Evaluation',
      'Cloud and Compute',
      'Data Platform Practices',
      'Analytics and Monitoring',
      'Application Delivery',
    ]);
    expect(skillGroups.every(({ skills }) => skills.length > 0)).toBe(true);
  });
});