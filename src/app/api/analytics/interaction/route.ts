import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, type, element, sectionContext, timestamp, metadata } = body;

    // Log the interaction event
    console.log('[Analytics] Interaction:', {
      sessionId,
      type,
      element,
      sectionContext,
      timestamp,
      metadata,
    });

    // Here you would typically store this in a database or send to an analytics service
    // For now, we'll just log it and return success

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
