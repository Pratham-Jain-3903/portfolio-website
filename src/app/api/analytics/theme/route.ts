import { NextRequest, NextResponse } from 'next/server';

import {
    asIsoTimestamp,
    asObject,
    asOptionalString,
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

        const themeChanges = Array.isArray(body.themeChanges) ? body.themeChanges : [];
        const latestChange = themeChanges.length > 0 ? asObject(themeChanges[themeChanges.length - 1]) : {};
        const pool = getPool();

        await pool.query(
            `
        INSERT INTO analytics_theme_preferences (
          session_id,
          preferred_theme,
          system_theme,
          event_timestamp
        )
        VALUES ($1, $2, $3, $4)
      `,
            [
                sessionId,
                asString(body.preferredTheme, 'dark'),
                asOptionalString(body.systemTheme),
                asIsoTimestamp(latestChange.timestamp),
            ]
        );

        return NextResponse.json({ success: true, message: 'Theme preference tracked' });
    } catch (error) {
        console.error('[Analytics] Error tracking theme preference:', error);

        return NextResponse.json(
            { success: false, error: 'Failed to track theme preference' },
            { status: 500 }
        );
    }
}