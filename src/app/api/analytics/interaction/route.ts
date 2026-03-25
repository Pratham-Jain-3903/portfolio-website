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
    const type = asString(body.type);
    const element = asString(body.element);

    if (!sessionId || !type || !element) {
      return NextResponse.json(
        { success: false, error: 'sessionId, type, and element are required' },
        { status: 400 }
      );
    }

    await ensureSession(sessionId);

    const pool = getPool();

    await pool.query(
      `
        INSERT INTO analytics_interactions (
          session_id,
          type,
          element,
          section_context,
          event_timestamp,
          metadata
        )
        VALUES ($1, $2, $3, $4, $5, $6::jsonb)
      `,
      [
        sessionId,
        type,
        element,
        asOptionalString(body.sectionContext),
        asIsoTimestamp(body.timestamp),
        JSON.stringify(asObject(body.metadata)),
      ]
    );

    return NextResponse.json(
      { success: true, message: 'Interaction tracked' },
      { status: 200 }
    );
  } catch (error) {
    console.error('[Analytics] Error tracking interaction:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to track interaction' },
      { status: 500 }
    );
  }
}
