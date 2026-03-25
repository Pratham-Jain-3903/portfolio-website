import { NextResponse } from 'next/server';

import { ensureAnalyticsSchema } from '@/lib/db';

export async function GET() {
    try {
        await ensureAnalyticsSchema();

        return NextResponse.json({
            ok: true,
            service: 'analytics',
            endpoints: [
                '/api/analytics/dashboard',
                '/api/analytics/session',
                '/api/analytics/performance',
                '/api/analytics/interaction',
                '/api/analytics/scroll',
                '/api/analytics/engagement',
                '/api/analytics/theme',
                '/api/analytics/feedback',
                '/api/analytics/resume_downloads',
                '/api/analytics/resume_download_form',
                '/api/analytics/setup'
            ]
        });
    } catch (error) {
        console.error('[Analytics] Error loading analytics root:', error);

        return NextResponse.json(
            { ok: false, error: 'Failed to initialize analytics service' },
            { status: 500 }
        );
    }
}