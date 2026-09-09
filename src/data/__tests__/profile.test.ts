import { describe, expect, it } from 'vitest';

import { contactDetails, objectiveStatement } from '@/data/profile';

describe('profile content', () => {
  it('preserves the approved objective copy', () => {
    expect(objectiveStatement).toBe(
      'Experienced data and software engineer focused on building production-ready AI and cloud systems. I work across data platforms, distributed systems, and applied ML, with an emphasis on reliability, scale, and cost-aware design. I translate business goals into clear technical outcomes and take ownership from design through production.\nOpen to senior engineering and technical leadership roles where deep hands-on work and sound decision-making matter.'
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