import { describe, expect, it } from 'vitest';

import { contactDetails, objectiveStatement } from '@/data/profile';

describe('profile content', () => {
  it('preserves the approved objective copy', () => {
    expect(objectiveStatement).toBe(
      'Quantitative data engineer focused on reliable market-data, research, and risk systems. I build reproducible pipelines and analytical stores with Python, SQL, Kafka, PostgreSQL, Parquet, and cloud tooling, with an emphasis on data quality, traceability, and practical performance.\nOpen to hands-on quant data engineering roles in India and globally, where disciplined research infrastructure and sound engineering matter.'
    );
  });

  it('exposes ordered public contact details with valid link protocols', () => {
    expect(contactDetails.map(({ label }) => label)).toEqual([
      'Phone',
      'Email',
      'Location',
      'GitHub',
      'LinkedIn',
    ]);

    for (const detail of contactDetails) {
      if (detail.href) {
        expect(new URL(detail.href).protocol).toMatch(/^(https?|mailto|tel):$/);
      }
    }
  });
});