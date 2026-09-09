import { describe, expect, it } from 'vitest';

import { certifications } from '@/data/certifications';

describe('certification content', () => {
  it('has unique stable IDs in the current display order', () => {
    expect(new Set(certifications.map(({ id }) => id)).size).toBe(certifications.length);
    expect(certifications).toHaveLength(13);
    expect(certifications.map(({ id }) => id).slice(0, 3)).toEqual([
      'postman-api-test-automation',
      'lean-six-sigma-green-belt',
      'intuitive-sql-data-analytics',
    ]);
  });

  it('preserves credential and skills metadata', () => {
    expect(certifications.find(({ id }) => id === 'microsoft-azure-fundamentals')?.expirationDate).toBe('Jan 2028');
    expect(certifications.find(({ id }) => id === 'mongodb-aggregation-fundamentals')?.skills).toEqual([
      'MongoDB',
      'Data Modeling',
    ]);
  });
});