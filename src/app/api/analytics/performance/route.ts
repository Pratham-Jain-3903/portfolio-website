import { NextRequest, NextResponse } from 'next/server';

import { asNumber, asString, ensureSession, readJsonBody } from '@/lib/analytics';
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
        INSERT INTO analytics_performance (
          session_id,
          page_load_time,
          largest_contentful_paint,
          first_input_delay,
          cumulative_layout_shift,
          ttfb
        )
        VALUES ($1, $2, $3, $4, $5, $6)
      `,
            [
                sessionId,
                Math.round(asNumber(body.pageLoadTime)),
                asNumber(body.largestContentfulPaint),
                asNumber(body.firstInputDelay),
                asNumber(body.cumulativeLayoutShift),
                Math.round(asNumber(body.ttfb)),
            ]
        );

        return NextResponse.json({ success: true, message: 'Performance tracked' });
    } catch (error) {
        console.error('[Analytics] Error tracking performance:', error);

        return NextResponse.json(
            { success: false, error: 'Failed to track performance' },
            { status: 500 }
        );
    }
}