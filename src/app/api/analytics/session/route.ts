import { NextRequest, NextResponse } from 'next/server';

import {
    asBoolean,
    asIsoTimestamp,
    asOptionalString,
    asString,
    readJsonBody,
} from '@/lib/analytics';
import { ensureAnalyticsSchema, getPool } from '@/lib/db';

export async function POST(request: NextRequest) {
    try {
        const body = await readJsonBody<Record<string, unknown>>(request);
        const sessionId = asString(body.sessionId);

        if (!sessionId) {
            return NextResponse.json({ success: false, error: 'sessionId is required' }, { status: 400 });
        }

        const pool = getPool();

        await ensureAnalyticsSchema();

        await pool.query(
            `
        INSERT INTO analytics_sessions (
          session_id,
          timestamp,
          referrer,
          user_agent,
          screen_resolution,
          is_returning_visitor,
          entry_section
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT (session_id)
        DO UPDATE SET
          timestamp = EXCLUDED.timestamp,
          referrer = COALESCE(EXCLUDED.referrer, analytics_sessions.referrer),
          user_agent = COALESCE(EXCLUDED.user_agent, analytics_sessions.user_agent),
          screen_resolution = COALESCE(EXCLUDED.screen_resolution, analytics_sessions.screen_resolution),
          is_returning_visitor = EXCLUDED.is_returning_visitor,
          entry_section = COALESCE(EXCLUDED.entry_section, analytics_sessions.entry_section)
      `,
            [
                sessionId,
                asIsoTimestamp(body.timestamp),
                asOptionalString(body.referrer),
                asOptionalString(body.userAgent),
                asOptionalString(body.screenResolution),
                asBoolean(body.isReturningVisitor),
                asOptionalString(body.entrySection),
            ]
        );

        return NextResponse.json({ success: true, message: 'Session tracked' });
    } catch (error) {
        console.error('[Analytics] Error tracking session:', error);

        return NextResponse.json(
            { success: false, error: 'Failed to track session' },
            { status: 500 }
        );
    }
}