import "server-only";

import { Pool } from "pg";

type DatabaseRows = Array<Record<string, unknown>>;

export interface DatabaseClient {
  (strings: TemplateStringsArray, ...values: unknown[]): Promise<DatabaseRows>;
  query(text: string, values?: unknown[]): Promise<DatabaseRows>;
}

const globalForDb = globalThis as typeof globalThis & {
  portfolioDbClient?: DatabaseClient;
  portfolioDbPool?: Pool;
};

function getDatabaseUrl() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error(
      "DATABASE_URL is not configured. Copy .env.example to .env.local and add your Neon connection string.",
    );
  }

  return databaseUrl;
}

function createClient(pool: Pool): DatabaseClient {
  const taggedQuery = async (
    strings: TemplateStringsArray,
    ...values: unknown[]
  ) => {
    const text = strings
      .map(
        (part, index) =>
          `${part}${index < values.length ? `$${index + 1}` : ""}`,
      )
      .join("");
    const result = await pool.query(text, values);

    return result.rows as DatabaseRows;
  };

  return Object.assign(taggedQuery, {
    async query(text: string, values: unknown[] = []) {
      const result = await pool.query(text, values);

      return result.rows as DatabaseRows;
    },
  });
}

/**
 * Returns a shared PostgreSQL client for server-side queries.
 *
 * Use Neon's pooled connection string in DATABASE_URL. The pool is deliberately
 * small for serverless deployments and is cached across warm invocations.
 */
export function getDb(): DatabaseClient {
  if (!globalForDb.portfolioDbPool) {
    globalForDb.portfolioDbPool = new Pool({
      connectionString: getDatabaseUrl(),
      max: 1,
      connectionTimeoutMillis: 10_000,
      idleTimeoutMillis: 10_000,
    });
  }

  globalForDb.portfolioDbClient ??= createClient(globalForDb.portfolioDbPool);

  return globalForDb.portfolioDbClient;
}
