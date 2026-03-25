import { NextRequest, NextResponse } from 'next/server';

import {
    asIsoTimestamp,
    asNumber,
    asOptionalString,
    asString,
    ensureSession,
    readJsonBody,
} from '@/lib/analytics';
import { ensureAnalyticsSchema, getPool } from '@/lib/db';

export async function POST(request: NextRequest) {
    try {
        const body = await readJsonBody<Record<string, unknown>>(request);
        const sessionId = asString(body.sessionId);
        const sentiment = asString(body.sentiment);

        if (!sentiment) {
            return NextResponse.json(
                { success: false, error: 'sentiment is required' },
                { status: 400 }
            );
        }

        await ensureAnalyticsSchema();

        if (sessionId) {
            await ensureSession(sessionId);
        }

        const pool = getPool();

        await pool.query(
            `
        INSERT INTO analytics_feedback (
          session_id,
          sentiment,
          triggered_by,
          message,
          section_context,
          time_to_feedback,
          event_timestamp
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `,
            [
                asOptionalString(body.sessionId),
                sentiment,
                asOptionalString(body.triggeredBy),
                asOptionalString(body.message),
                asOptionalString(body.sectionContext),
                Math.round(asNumber(body.timeToFeedback)),
                asIsoTimestamp(body.timestamp),
            ]
        );

        return NextResponse.json({ success: true, message: 'Feedback tracked' });
    } catch (error) {
        console.error('[Analytics] Error tracking feedback:', error);

        return NextResponse.json(
            { success: false, error: 'Failed to track feedback' },
            { status: 500 }
        );
    }
}