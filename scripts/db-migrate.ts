import { readFile } from "node:fs/promises";
import path from "node:path";

import { Client } from "pg";

async function main() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is required to run database migrations.");
  }

  const migrationPath = path.join(
    process.cwd(),
    "db",
    "migrations",
    "001_portfolio_content.sql",
  );
  const migration = await readFile(migrationPath, "utf8");
  const statements = migration
    .split("-- statement-breakpoint")
    .map((statement) => statement.trim())
    .filter(Boolean);

  const client = new Client({ connectionString: databaseUrl });
  await client.connect();

  try {
    await client.query("BEGIN");
    for (const statement of statements) {
      await client.query(statement);
    }
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    await client.end();
  }

  console.log(`Applied ${statements.length} migration statements.`);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
