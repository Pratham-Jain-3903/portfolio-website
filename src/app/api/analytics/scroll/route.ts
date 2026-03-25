import { NextRequest, NextResponse } from 'next/server';

import {
    asIsoTimestamp,
    asNumber,
    asObject,
    asString,
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

        const sections = Array.isArray(body.sections) ? body.sections : [];
        const maxScrollDepth = asNumber(body.maxScrollDepth);
        const pool = getPool();

        for (const sectionEntry of sections) {
            const section = asObject(sectionEntry);
            const sectionName = asString(section.sectionName);

            if (!sectionName) {
                continue;
            }

            await pool.query(
                `
          INSERT INTO analytics_section_views (
            session_id,
            section_name,
            time_viewed_ms,
            scroll_depth,
            entered_at
          )
          VALUES ($1, $2, $3, $4, $5)
        `,
                [
                    sessionId,
                    sectionName,
                    Math.round(asNumber(section.timeViewed)),
                    asNumber(section.scrollDepth, maxScrollDepth),
                    asIsoTimestamp(section.enteredAt),
                ]
            );
        }

        return NextResponse.json({ success: true, message: 'Scroll behavior tracked' });
    } catch (error) {
        console.error('[Analytics] Error tracking scroll behavior:', error);

        return NextResponse.json(
            { success: false, error: 'Failed to track scroll behavior' },
            { status: 500 }
        );
    }
}