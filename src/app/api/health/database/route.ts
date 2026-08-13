import { NextResponse } from "next/server";

import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const startedAt = performance.now();

  try {
    const db = getDb();
    await db`SELECT 1 AS ok`;

    return NextResponse.json({
      status: "ok",
      database: "connected",
      latencyMs: Math.round(performance.now() - startedAt),
    });
  } catch (error) {
    console.error("Database health check failed", error);

    return NextResponse.json(
      {
        status: "error",
        database: "disconnected",
      },
      { status: 503 },
    );
  }
}
