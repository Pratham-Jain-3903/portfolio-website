import { NextRequest, NextResponse } from 'next/server';

import {
  asIsoTimestamp,
  asOptionalString,
  readJsonBody,
} from '@/lib/analytics';
import { ensureAnalyticsSchema, getPool } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await readJsonBody<Record<string, unknown>>(request);
    await ensureAnalyticsSchema();
    const pool = getPool();

    await pool.query(
      `
        INSERT INTO analytics_resume_download_forms (
          session_id,
          name,
          company,
          email,
          source,
          event_timestamp,
          user_agent,
          referer
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `,
      [
        asOptionalString(body.sessionId),
        asOptionalString(body.name),
        asOptionalString(body.company),
        asOptionalString(body.email),
        asOptionalString(body.source),
        asIsoTimestamp(body.timestamp),
        asOptionalString(request.headers.get('user-agent')),
        asOptionalString(request.headers.get('referer')),
      ]
    );

    return NextResponse.json(
      {
        success: true,
        message: 'Form submission tracked successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[Analytics] Error tracking form submission:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to track form submission' },
      { status: 500 }
    );
  }
}
