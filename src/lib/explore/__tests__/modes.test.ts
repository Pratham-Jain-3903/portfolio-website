import { describe, expect, it } from 'vitest';

import {
  parsePortfolioQuery,
  serializePortfolioQuery,
} from '@/lib/explore/modes';

describe('parsePortfolioQuery', () => {
  it('defaults to Classic without station state', () => {
    expect(parsePortfolioQuery({})).toEqual({
      mode: 'classic',
      station: null,
    });
  });

  it('parses Robot mode and normalizes a station ID', () => {
    expect(parsePortfolioQuery({
      mode: 'robot',
      station: '  Project-Mercury  ',
    })).toEqual({
      mode: 'robot',
      station: 'project-mercury',
    });
  });

  it('uses the first value from repeated server query parameters', () => {
    expect(parsePortfolioQuery({
      mode: ['robot', 'classic'],
      station: ['pydorky', 'solarwise'],
    })).toEqual({
      mode: 'robot',
      station: 'pydorky',
    });
  });

  it('supports the legacy detail parameter', () => {
    expect(parsePortfolioQuery(new URLSearchParams('detail=solarwise'))).toEqual({
      mode: 'classic',
      station: 'solarwise',
    });
  });

  it('rejects unknown stations when a station set is supplied', () => {
    const validStationIds = new Set(['project-mercury']);

    expect(parsePortfolioQuery(
      { mode: 'robot', station: 'pydorky' },
      validStationIds
    )).toEqual({
      mode: 'robot',
      station: null,
    });
  });

  it.each([
    { mode: 'unexpected', station: 'valid-id', expectedMode: 'classic' },
    { mode: 'robot', station: '../invalid', expectedMode: 'robot' },
    { mode: 'robot', station: 'invalid space', expectedMode: 'robot' },
  ])('safely handles malformed input: $station', ({ mode, station, expectedMode }) => {
    expect(parsePortfolioQuery({ mode, station })).toEqual({
      mode: expectedMode,
      station: station === 'valid-id' ? 'valid-id' : null,
    });
  });
});

describe('serializePortfolioQuery', () => {
  it('preserves unrelated parameters and removes legacy detail state', () => {
    const result = serializePortfolioQuery(
      { mode: 'robot', station: 'project-mercury' },
      'ref=linkedin&detail=old-project'
    );
    const searchParams = new URLSearchParams(result);

    expect(Object.fromEntries(searchParams)).toEqual({
      ref: 'linkedin',
      mode: 'robot',
      station: 'project-mercury',
    });
  });

  it('removes station state when closing a station', () => {
    const result = serializePortfolioQuery(
      { mode: 'classic', station: null },
      'mode=robot&station=pydorky'
    );

    expect(result).toBe('mode=classic');
  });
});