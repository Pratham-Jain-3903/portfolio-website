import { NextRequest, NextResponse } from 'next/server';

import {
    asBoolean,
    asNumber,
    asString,
    asStringArray,
    ensureSession,
    readJsonBody,
} from '@/lib/analytics';
import { getPool } from '@/lib/db';

export async function POST(request: NextRequest) {
    try {
        const body = await readJsonBody<Record<string, unknown>>(request);
        const sessionId = asString(body.sessionId);

        if (!sessionId) {
            return NextResponse.json({ success: false, error: 'sessionId is required' }, { status: 400 });
        }

        await ensureSession(sessionId);

        const pool = getPool();

        await pool.query(
            `
        INSERT INTO analytics_engagement (
          session_id,
          bounced_early,
          deep_engagement,
          downloaded_resume,
          clicked_contact,
          sections_viewed,
          average_time_per_section
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `,
            [
                sessionId,
                asBoolean(body.bouncedEarly),
                asBoolean(body.deepEngagement),
                asBoolean(body.downloadedResume),
                asBoolean(body.clickedContact),
                asStringArray(body.sectionsViewed),
                Math.round(asNumber(body.averageTimePerSection)),
            ]
        );

        return NextResponse.json({ success: true, message: 'Engagement tracked' });
    } catch (error) {
        console.error('[Analytics] Error tracking engagement:', error);

        return NextResponse.json(
            { success: false, error: 'Failed to track engagement' },
            { status: 500 }
        );
    }
}