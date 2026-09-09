export const portfolioModes = ['classic', 'robot'] as const;

export type PortfolioMode = (typeof portfolioModes)[number];

export type PortfolioQuery = {
  mode: PortfolioMode;
  station: string | null;
};

export type PortfolioSearchParams = Readonly<
  Record<string, string | string[] | undefined>
>;

type SearchParamsReader = Pick<URLSearchParams, 'get'>;

const stationIdPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function isSearchParamsReader(
  source: PortfolioSearchParams | SearchParamsReader
): source is SearchParamsReader {
  return typeof (source as SearchParamsReader).get === 'function';
}

function readFirstValue(
  source: PortfolioSearchParams | SearchParamsReader,
  key: string
): string | undefined {
  if (isSearchParamsReader(source)) {
    return source.get(key) ?? undefined;
  }

  const value = source[key];
  return Array.isArray(value) ? value[0] : value;
}

function parseMode(value: string | undefined): PortfolioMode {
  return value === 'robot' ? 'robot' : 'classic';
}

function parseStation(value: string | undefined): string | null {
  const normalizedValue = value?.trim().toLowerCase();

  if (!normalizedValue || !stationIdPattern.test(normalizedValue)) {
    return null;
  }

  return normalizedValue;
}

export function parsePortfolioQuery(
  source: PortfolioSearchParams | SearchParamsReader,
  validStationIds?: ReadonlySet<string>
): PortfolioQuery {
  const station = parseStation(
    readFirstValue(source, 'station') ?? readFirstValue(source, 'detail')
  );

  return {
    mode: parseMode(readFirstValue(source, 'mode')),
    station: station && (!validStationIds || validStationIds.has(station))
      ? station
      : null,
  };
}

export function serializePortfolioQuery(
  query: PortfolioQuery,
  currentSearch = ''
): string {
  const searchParams = new URLSearchParams(currentSearch);

  searchParams.set('mode', query.mode);
  searchParams.delete('detail');

  if (query.station) {
    searchParams.set('station', query.station);
  } else {
    searchParams.delete('station');
  }

  return searchParams.toString();
}