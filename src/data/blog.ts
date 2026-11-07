export interface BlogFinding {
  label: string;
  value: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  /** ISO date (YYYY-MM-DD) the entry was published. */
  date: string;
  /** One or two sentences: what was asked and what came out. Used on cards and in link previews. */
  summary: string;
  findings: readonly BlogFinding[];
  image?: { src: string; alt: string; width: number; height: number };
  /** Paragraphs, rendered in order. */
  body: readonly string[];
  /** What I would do differently or test next. */
  next?: string;
  stack: readonly string[];
  links: { code?: string; linkedin?: string; source?: string };
}

export const blogPosts: readonly BlogPost[] = [
  {
    slug: 'sig-predictions-cup',
    title: 'SIG Predictions Cup: the edge was structure, not prediction',
    date: '2026-11-07',
    summary:
      'I built an automated trading system for Susquehanna’s play-money midterms competition. Backtests showed that predicting prices lost to the spread, so the capital went to a structural arbitrage and a measured pricing bias instead.',
    findings: [
      { label: 'Signals tested', value: '102k, none profitable after costs' },
      { label: 'Race pairs priced above 1', value: '45% of snapshots' },
      { label: 'Underdogs overpriced by', value: 'up to 12¢' },
      { label: 'Orders sent', value: '5,650 over 3 weeks' },
      { label: 'Tests', value: '278' },
    ],
    image: {
      src: '/blog/sig-longshot-bias.png',
      alt: 'Chart comparing SIG prices with Polymarket and Kalshi, showing underdogs priced too high on SIG',
      width: 1600,
      height: 800,
    },
    body: [
      'Susquehanna’s Predictions Cup gave about 1,965 university players 100,000 play-money SUSQies each to trade the 2026 US midterms. I joined with a stalled multi-agent prototype and had a live, risk-managed book a week later.',
      'The first finding was negative. The inherited pipeline produced 102,000 signals from four model families. They predicted at most 0.2 ticks of price movement, while crossing the spread cost about 1.3 ticks. None of 40 branch, horizon and direction combinations made money after costs, so I dropped prediction entirely.',
      'The edge turned out to be structural. In a two-party race at most one side wins, so buying NO on both the Democrat and Republican contracts pays at least 1. When their bids summed above 1, which happened in 45% of snapshots, the pair cost less than it was guaranteed to pay. A capital-constrained replay with caps, recycling and rotation decided how to size it.',
      'The second edge was a bias. Compared with Polymarket and Kalshi, SIG priced underdogs up to 12¢ too high. A hold-to-settlement value book bet against them, with every bet’s worst-case loss capped per race, per party and in total.',
      'Market making was tested live in three small canaries against a bar I set in advance. It missed (0.17¢ captured per share against 0.25¢, and 59 fills against 200), so I shelved it.',
      'Most of the work was engineering for unattended operation: one rate-limited gateway for every reader, idempotent order retries, kill switches, an hourly risk check, and a numbered decision log for every change to live behaviour.',
    ],
    next:
      'No prize: the top three turned their capital over 50 to 180 times, while this system was built for locked profit, not speed. Next time I would budget for turnover from day one.',
    stack: ['Python', 'REST & websocket APIs', 'Backtesting', 'Market microstructure', 'pytest'],
    links: {
      code: 'https://github.com/Pratham-Jain-3903/susquehanna_prediction_markets_competitions',
    },
  },
  {
    slug: 'kelly-coin',
    title: 'A 60% coin and $25: how much should you bet?',
    date: '2026-11-07',
    summary:
      'In a famous experiment, 28% of finance-trained players went bust on a coin that favoured them. I rebuilt the game in C++ and ran 20,000 players: betting half the Kelly amount beat betting the full amount.',
    findings: [
      { label: 'Half Kelly (10% a flip)', value: '94% hit the cap, 0.1% bust' },
      { label: 'Kelly (20% a flip)', value: '91% hit the cap, 6% bust' },
      { label: 'Double Kelly (40% a flip)', value: '49% bust' },
      { label: 'Runtime', value: '0.4 s for 1.6M games' },
    ],
    image: {
      src: '/blog/kelly-coin.png',
      alt: 'Chart of the share of players who reach the $250 cap and who go bust, by bet size',
      width: 1080,
      height: 1350,
    },
    body: [
      'In 2016 Victor Haghani and Richard Dewey gave 61 finance students and young professionals $25 and a coin that lands heads 60% of the time. They had 300 flips and winnings were capped at $250. 28% went bust and only 21% reached the cap.',
      'The Kelly rule says to bet a fixed share of what you have: 2 × 60% − 1 = 20% each flip. I simulated the real game, cap and all, for 20,000 players at every bet size from 1% to 80%.',
      'With the cap in place, half Kelly does better than Kelly: 94% of players reach $250 and almost none go bust. At double Kelly, going bust is a coin flip, on a coin that favours you.',
      'The engineering mattered as much as the maths. The cap makes the game path-dependent, so the textbook formula is wrong here and the game has to be played flip by flip. Wealth is tracked as a sum of logs so 300 multiplications don’t drift, and the random numbers come from a fixed-seed generator so the chart re-creates exactly on any machine. Five tests check the result, including against the formula once the cap is removed.',
    ],
    next: 'Next: what happens when you only know your edge roughly, and how much Kelly to give up for that uncertainty.',
    stack: ['C++17', 'Monte Carlo', 'Python', 'Matplotlib'],
    links: {
      source: 'https://papers.ssrn.com/abstract=2856963',
    },
  },
  {
    slug: 'ipl-chaos-index',
    title: 'Which IPL season was the most chaotic? I built a score, then tried to break it',
    date: '2026-11-07',
    summary:
      'I scored every IPL season from 2008 to 2025 on close finishes, upsets, a bunched-up table and super overs. 2015 won, but re-running the score under 2,000 random weightings showed how much the answer depends on my own assumptions.',
    findings: [
      { label: 'Matches scored', value: '1,169 across 18 seasons' },
      { label: 'Most chaotic', value: '2015 (score 79 of 100)' },
      { label: 'Calmest', value: '2014 (score 15)' },
      { label: '2015 still wins under', value: '48% of 2,000 weightings' },
      { label: 'Four most chaotic seasons', value: 'all had CSK in the final' },
    ],
    image: {
      src: '/blog/ipl-chaos-index.png',
      alt: 'Bar chart of an IPL chaos score per season, 2008 to 2025, with 2015 highest and 2014 lowest',
      width: 1080,
      height: 1350,
    },
    body: [
      '“Most entertaining season” isn’t measurable, so the first step was defining it. I used chaos: close finishes (won by 10 runs or fewer, or by 2 wickets or fewer), upsets (a team finishing four or more places lower winning a league match), how bunched the points table was, and super overs.',
      'Each measure was scaled from 0 to 1 across seasons and weighted 35%, 30%, 20% and 15%. 2015 scored highest: close finishes and underdogs winning in the same season. 2014 was the calmest by a distance.',
      'Then I stopped trusting my own weights. Re-running the score under 2,000 random weightings, 2015 still came first about half the time, but 2020, with its four super overs, came first a third of the time. Same data, different opinions, different champion. If an answer flips when your assumptions move, the assumptions are the finding.',
      'A related check on the same data: using the points table as it stood before each match, so the analysis never sees results from the future, the team placed higher won only 52% of 778 matches. In the IPL, form barely predicts the next game.',
    ],
    next: 'Next: add IPL 2026 and ball-by-ball measures such as last-over finishes and batting collapses.',
    stack: ['Python', 'pandas', 'Sensitivity analysis', 'Matplotlib'],
    links: {},
  },
  {
    slug: 'could-i-have-known-it-then',
    title: 'Could I have known it then? Joining data on when it became knowable',
    date: '2026-11-07',
    summary:
      'Four clean datasets joined on the date each fact happened quietly gave a backtest three days of the future. The fix was two timestamps on every row and as-of joins on the second one.',
    findings: [
      { label: 'Lookahead from one bad join', value: '3 days' },
      { label: 'Timestamps per row', value: '2: event time and available time' },
      { label: 'Revisions', value: 'new rows, never overwrites' },
    ],
    image: {
      src: '/blog/point-in-time.png',
      alt: 'Comic: a report measured on Tuesday but published on Friday; joining on Tuesday shows the backtest three days of the future',
      width: 1200,
      height: 675,
    },
    body: [
      'I was lining up four weekly and monthly public datasets into one daily table. Every source looked clean on its own. Together they quietly lied.',
      'The CFTC’s Commitments of Traders report is measured on Tuesday but published on Friday. Join it on the measurement date and every backtest gets three days of information nobody had at the time. Other sources arrive with their own lags, some are monthly and get revised, and two venues that close in different time zones don’t share a “same day”.',
      'The fix was boring and strict. Every row now carries two timestamps: when it happened and when it became available. Every join is an as-of join on the second. Revisions are new rows, never overwrites, so a backtest can be replayed against exactly what was known at each moment.',
      'A dataset can be accurate and still be wrong for research. The question isn’t “is this number right?” It’s “could I have known it then?”',
    ],
    stack: ['Point-in-time data', 'As-of joins', 'Data modelling'],
    links: {},
  },
  {
    slug: 'measure-the-measurement-first',
    title: 'Measure the measurement first, then measure the machine',
    date: '2026-11-07',
    summary:
      'I spent a week making a market-data feed faster. The biggest slowdown was the profiler I was using to find slowdowns, and the second biggest was everything else running on the box.',
    findings: [
      { label: 'Tail latency with per-tick profiling on', value: 'nearly 3× worse' },
      { label: 'Biggest single win', value: 'one process per feed' },
      { label: 'Tail latency after', value: 'down by more than 10×' },
    ],
    body: [
      'I’d turned on detailed per-tick profiling to find the slow spots. With it on, tail latency nearly tripled. Every timestamp and every stack capture sat directly on the hot path, on every single tick, so the profiler was mostly measuring itself.',
      'The second lesson came from looking past the process to the machine it runs on. Latency belongs to the whole box. Core 0 is often where Linux puts its own housekeeping and interrupts, so anything latency-sensitive sitting there quietly shares it with the kernel. An in-memory store that snapshots to disk on a timer will fork and write on that schedule, whether the hot path likes it or not. And a binary built on one machine has to match the system libraries of the one it runs on, or it won’t start where it matters.',
      'None of that shows up in a benchmark on a laptop. It shows up as a p99 spike when traffic peaks.',
      'So I now start capacity planning with three questions. Which cores are actually free when it matters? What else on the box wakes up on a schedule? How much headroom is left before the busiest minute? The biggest win came from the simplest change: giving each feed its own process instead of sharing one.',
    ],
    stack: ['Linux', 'Performance engineering', 'Profiling', 'Low latency'],
    links: {},
  },
  {
    slug: 'failure-semantics-before-speed',
    title: 'If failure behaviour is unclear, the database benchmark fails before I look at speed',
    date: '2026-11-07',
    summary:
      'How I test a research database migration: concurrent readers, a writer killed mid-publish, rollback and restart, all before a single query-speed number counts.',
    findings: [
      { label: 'Concurrent readers in the test', value: '8 or more' },
      { label: 'Writer killed at', value: '25%, 50% and 90% of a publish' },
      { label: 'Order of checks', value: 'correctness, isolation, recovery, compatibility, speed' },
    ],
    body: [
      'The requirement was near-continuous readers plus regular publication of new data, on a workload already heavily coupled to DuckDB SQL. A SELECT leaderboard can’t answer whether a new engine survives that.',
      'So the test matrix looks like operations, not a benchmark: eight or more concurrent readers, one writer publishing a new snapshot, one reader whose query spans the publish boundary, the writer killed at 25%, 50% and 90% of publication, forced memory pressure, a rollback of a bad publish, a restart that must come back to the last good state, and a replay of the real SQL corpus.',
      'The pass/fail gates come first: no partial state is ever visible, every reader sees one consistent snapshot version, recovery finishes under a threshold. Only then do blocked-reader seconds, SQL compatibility, peak memory, publish latency and p95 query time get compared.',
      'Correctness, then isolation, then recovery, then compatibility, then performance. Never SELECT benchmark, then architecture decision.',
    ],
    stack: ['DuckDB', 'DuckLake', 'ClickHouse', 'QuestDB', 'Database engineering'],
    links: {},
  },
  {
    slug: 'success-failed-is-too-coarse',
    title: 'SUCCESS/FAILED is too coarse for research pipelines',
    date: '2026-11-07',
    summary:
      'A backtest finished every batch, then the whole run was marked failed because an outside API returned a 502 while computing metrics. The fix was modelling the run’s states, not retrying harder.',
    findings: [
      { label: 'Run states instead of two', value: '5' },
      { label: 'Recomputation after a downstream outage', value: 'none' },
    ],
    body: [
      'The simulation completed and every batch finished. Then the workflow failed anyway, because a downstream index API returned HTTP 502 while metrics were being generated. Re-running everything would have recomputed hours of valid work.',
      'A single SUCCESS or FAILED state hides that. I’d rather model the run as SIMULATION_COMPLETE, TRADEBOOK_PUBLISHED, EXTERNAL_METRICS_PENDING, METRICS_DEGRADED_EXTERNAL and FINALIZED, because each has a different recovery.',
      'The contract becomes: compute once, persist deterministic artifacts, make every downstream step idempotent, retry external fetches on their own, and bind every derived number to the same simulation ID and dataset version.',
      'That changes the incident question from “why did the pipeline fail?” to “which results are valid, which dependency failed, and what is the cheapest correct recovery?”',
    ],
    stack: ['Airflow', 'Idempotency', 'Workflow design', 'Observability'],
    links: {},
  },
];

export const getBlogPost = (slug: string) => blogPosts.find((entry) => entry.slug === slug);
