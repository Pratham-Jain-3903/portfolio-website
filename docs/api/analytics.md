# Analytics API

Analytics persists to Neon/PostgreSQL through [`src/lib/db.ts`](../../src/lib/db.ts) and the schema in [`src/lib/analytics-schema.ts`](../../src/lib/analytics-schema.ts). It does not append JSON files.

## Routes

| Route | Purpose |
| --- | --- |
| `/api/analytics` | Analytics service status or root behavior |
| `/api/analytics/setup` | Initialize required database schema |
| `/api/analytics/session` | Create and query visitor sessions |
| `/api/analytics/interaction` | Store page and element interactions |
| `/api/analytics/scroll` | Store scroll and section behavior |
| `/api/analytics/engagement` | Store engagement summaries |
| `/api/analytics/theme` | Store theme preference events |
| `/api/analytics/feedback` | Store submitted feedback |
| `/api/analytics/performance` | Store client performance observations |
| `/api/analytics/resume_downloads` | Store resume download events |
| `/api/analytics/resume_download_form` | Store optional resume form submissions |
| `/api/analytics/dashboard` | Aggregate dashboard data |

Route source files are under [`src/app/api/analytics`](../../src/app/api/analytics). Exact payload types should be extracted into a shared analytics contract before adding Robot events.

## New Portfolio Events

The revamp adds deliberate mode and station events described in [Analytics](../revamp/12-analytics.md). Existing routes should be extended only after a typed event union and migration are reviewed.

## Reliability

- missing `DATABASE_URL` must not break the visible portfolio
- analytics transport failure is non-blocking
- payload validation rejects malformed input
- responses do not expose credentials or raw database errors
- browser tests intercept analytics; route tests mock the database module

See [API testing](../testing/api.md).
