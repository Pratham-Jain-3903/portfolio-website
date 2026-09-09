import { NextResponse } from 'next/server';

import { ensureAnalyticsSchema, getPool } from '@/lib/db';

const EMPTY_DASHBOARD = {
  totalSessions: 0,
  returningVisitors: 0,
  bounceRate: 0,
  deepEngagementRate: 0,
  avgPageLoadTime: 0,
  sectionPopularity: [] as { section: string; avgTimeMs: number; visits: number }[],
  topInteractions: [] as { element: string; count: number }[],
  feedbackSummary: { positive: 0, negative: 0, comments: [] as string[] },
  themePreferences: { light: 0, dark: 0 },
  totalPageViews: 0,
} as const;

export async function GET() {
  // App Hosting preview / fresh env may not have DATABASE_URL — don't 500 the dashboard.
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ ...EMPTY_DASHBOARD, _unavailable: 'analytics_disabled_missing_DATABASE_URL' }, { status: 200 });
  }
  try {
    await ensureAnalyticsSchema();
    const pool = getPool();

    const [sessionResult, engagementResult, performanceResult, sectionResult, interactionResult, themeResult, pageViewResult, feedbackResult] =
      await Promise.all([
        pool.query(
          `
            SELECT
              COUNT(*)::int AS total_sessions,
              COALESCE(ROUND(AVG(CASE WHEN is_returning_visitor THEN 100.0 ELSE 0 END)), 0)::int AS returning_visitors
            FROM analytics_sessions
          `
        ),
        pool.query(
          `
            SELECT
              COALESCE(ROUND(AVG(CASE WHEN bounced_early THEN 100.0 ELSE 0 END)), 0)::int AS bounce_rate,
              COALESCE(ROUND(AVG(CASE WHEN deep_engagement THEN 100.0 ELSE 0 END)), 0)::int AS deep_engagement_rate
            FROM analytics_engagement
          `
        ),
        pool.query(
          `
            SELECT COALESCE(ROUND(AVG(page_load_time)), 0)::int AS avg_page_load_time
            FROM analytics_performance
            WHERE page_load_time > 0
          `
        ),
        pool.query(
          `
            SELECT
              section_name AS section,
              COALESCE(ROUND(AVG(time_viewed_ms)), 0)::int AS avg_time_ms,
              COUNT(*)::int AS visits
            FROM analytics_section_views
            GROUP BY section_name
            ORDER BY visits DESC, avg_time_ms DESC
            LIMIT 10
          `
        ),
        pool.query(
          `
            SELECT element, COUNT(*)::int AS count
            FROM analytics_interactions
            WHERE type <> 'page_view'
            GROUP BY element
            ORDER BY count DESC, element ASC
            LIMIT 10
          `
        ),
        pool.query(
          `
            SELECT preferred_theme, COUNT(*)::int AS count
            FROM analytics_theme_preferences
            GROUP BY preferred_theme
          `
        ),
        pool.query(
          `
            SELECT COUNT(*)::int AS total_page_views
            FROM analytics_interactions
            WHERE type = 'page_view'
          `
        ),
        pool.query(
          `
            SELECT
              COUNT(*) FILTER (WHERE sentiment = 'positive')::int AS positive,
              COUNT(*) FILTER (WHERE sentiment = 'negative')::int AS negative,
              (
                ARRAY_REMOVE(
                  ARRAY_AGG(message ORDER BY event_timestamp DESC),
                  NULL
                )
              )[1:5] AS comments
            FROM analytics_feedback
          `
        ),
      ]);

    const sessionStats = sessionResult.rows[0] ?? { total_sessions: 0, returning_visitors: 0 };
    const engagementStats = engagementResult.rows[0] ?? { bounce_rate: 0, deep_engagement_rate: 0 };
    const performanceStats = performanceResult.rows[0] ?? { avg_page_load_time: 0 };
    const feedbackStats = feedbackResult.rows[0] ?? { positive: 0, negative: 0, comments: [] };
    const themeCounts = themeResult.rows.reduce(
      (accumulator, row) => {
        const theme = typeof row.preferred_theme === 'string' ? row.preferred_theme.toLowerCase() : 'dark';
        const count = Number(row.count) || 0;

        if (theme === 'light') {
          accumulator.light += count;
        } else {
          accumulator.dark += count;
        }

        return accumulator;
      },
      { light: 0, dark: 0 }
    );

    const dashboardData = {
      totalSessions: Number(sessionStats.total_sessions) || 0,
      returningVisitors: Number(sessionStats.returning_visitors) || 0,
      bounceRate: Number(engagementStats.bounce_rate) || 0,
      deepEngagementRate: Number(engagementStats.deep_engagement_rate) || 0,
      avgPageLoadTime: Number(performanceStats.avg_page_load_time) || 0,
      sectionPopularity: sectionResult.rows.map((row) => ({
        section: String(row.section),
        avgTimeMs: Number(row.avg_time_ms) || 0,
        visits: Number(row.visits) || 0,
      })),
      topInteractions: interactionResult.rows.map((row) => ({
        element: String(row.element),
        count: Number(row.count) || 0,
      })),
      feedbackSummary: {
        positive: Number(feedbackStats.positive) || 0,
        negative: Number(feedbackStats.negative) || 0,
        comments: Array.isArray(feedbackStats.comments)
          ? feedbackStats.comments.filter((comment: unknown): comment is string => typeof comment === 'string' && comment.length > 0)
          : []
      },
      themePreferences: themeCounts,
      totalPageViews: Number(pageViewResult.rows[0]?.total_page_views) || 0,
    };

    return NextResponse.json(dashboardData, { status: 200 });
  } catch (error) {
    console.error('[Analytics] Error fetching dashboard data:', error instanceof Error ? error.message : 'Unknown error');
    // Degrade gracefully on hosted envs (Neon unreachable, missing tables, etc.) — never 500 the page.
    return NextResponse.json({ ...EMPTY_DASHBOARD, _error: error instanceof Error ? error.message : 'Unknown error' }, { status: 200 });
  }
}
