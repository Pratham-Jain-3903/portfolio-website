import { Pool } from '@neondatabase/serverless';

import { analyticsSchema } from '@/lib/analytics-schema';

declare global {
    var __analyticsPool: Pool | undefined;
    var __analyticsSchemaReady: Promise<void> | undefined;
}

function getDatabaseUrl() {
    const databaseUrl = process.env.DATABASE_URL;

    if (!databaseUrl) {
        throw new Error('DATABASE_URL is not configured');
    }

    return databaseUrl;
}

export function getPool() {
    if (!globalThis.__analyticsPool) {
        globalThis.__analyticsPool = new Pool({ connectionString: getDatabaseUrl() });
    }

    return globalThis.__analyticsPool;
}

export async function executeStatements(schema: string) {
    const pool = getPool();
    const statements = schema
        .split(';')
        .map((statement) => statement.trim())
        .filter(Boolean);

    for (const statement of statements) {
        await pool.query(statement);
    }
}

export async function ensureAnalyticsSchema() {
    if (!globalThis.__analyticsSchemaReady) {
        globalThis.__analyticsSchemaReady = executeStatements(analyticsSchema);
    }

    await globalThis.__analyticsSchemaReady;
}