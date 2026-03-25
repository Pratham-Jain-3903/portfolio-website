import { NextRequest, NextResponse } from 'next/server';

import { asIsoTimestamp, asOptionalString, asString, readJsonBody } from '@/lib/analytics';
import { ensureAnalyticsSchema, getPool } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await readJsonBody<Record<string, unknown>>(request);
    await ensureAnalyticsSchema();
    const pool = getPool();

    await pool.query(
      `
        INSERT INTO analytics_resume_downloads (
          session_id,
          source,
          event_timestamp,
          user_agent,
          referer
        )
        VALUES ($1, $2, $3, $4, $5)
      `,
      [
        asOptionalString(body.sessionId),
        asOptionalString(body.source),
        asIsoTimestamp(body.timestamp),
        asOptionalString(request.headers.get('user-agent')),
        asOptionalString(request.headers.get('referer')),
      ]
    );

    return NextResponse.json(
      { success: true, message: 'Resume download tracked' },
      { status: 200 }
    );
  } catch (error) {
    console.error('[Analytics] Error tracking resume download:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to track download' },
      { status: 500 }
    );
  }
}
