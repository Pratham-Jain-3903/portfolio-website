import type { NextRequest } from 'next/server';

import { ensureAnalyticsSchema, getPool } from '@/lib/db';

export async function readJsonBody<T>(request: NextRequest): Promise<T> {
    const rawBody = await request.text();

    if (!rawBody) {
        return {} as T;
    }

    return JSON.parse(rawBody) as T;
}

export function asString(value: unknown, fallback = ''): string {
    return typeof value === 'string' && value.trim() ? value.trim() : fallback;
}

export function asOptionalString(value: unknown): string | null {
    return typeof value === 'string' && value.trim() ? value.trim() : null;
}

export function asBoolean(value: unknown): boolean {
    return value === true;
}

export function asNumber(value: unknown, fallback = 0): number {
    if (typeof value === 'number' && Number.isFinite(value)) {
        return value;
    }

    if (typeof value === 'string') {
        const parsed = Number(value);
        return Number.isFinite(parsed) ? parsed : fallback;
    }

    return fallback;
}

export function asStringArray(value: unknown): string[] {
    if (!Array.isArray(value)) {
        return [];
    }

    return value.filter((item): item is string => typeof item === 'string' && item.trim().length > 0);
}

export function asIsoTimestamp(value: unknown): string {
    const candidate = typeof value === 'string' ? new Date(value) : new Date();

    if (Number.isNaN(candidate.getTime())) {
        return new Date().toISOString();
    }

    return candidate.toISOString();
}

export function asObject(value: unknown): Record<string, unknown> {
    return value && typeof value === 'object' && !Array.isArray(value)
        ? (value as Record<string, unknown>)
        : {};
}

export async function ensureSession(sessionId: string) {
    if (!sessionId) {
        return;
    }

    await ensureAnalyticsSchema();

    const pool = getPool();

    await pool.query(
        `
      INSERT INTO analytics_sessions (session_id)
      VALUES ($1)
      ON CONFLICT (session_id) DO NOTHING
    `,
        [sessionId]
    );
}