import { NextResponse } from 'next/server';

import { analyticsSchema } from '@/lib/analytics-schema';
import { executeStatements } from '@/lib/db';

export async function GET() {
    try {
        await executeStatements(analyticsSchema);

        return NextResponse.json({ success: true, message: 'Analytics schema initialized' });
    } catch (error) {
        console.error('[Analytics] Error initializing schema:', error);

        return NextResponse.json(
            { success: false, error: 'Failed to initialize analytics schema' },
            { status: 500 }
        );
    }
}