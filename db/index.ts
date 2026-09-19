import "server-only";

import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

declare global {
  // Reuse the pool during Next.js development hot reloads.
  var realHoroscopePgPool: Pool | undefined;
}

function databaseUrl() {
  const url = process.env.DATABASE_URL?.trim();
  if (!url) {
    throw new Error("DATABASE_URL tanımlı değil. PostgreSQL bağlantısını ortam değişkenlerine ekleyin.");
  }
  return url;
}

function createPool() {
  const connectionString = databaseUrl();
  const host = new URL(connectionString).hostname;
  const useSsl =
    process.env.NODE_ENV === "production" &&
    host !== "localhost" &&
    host !== "127.0.0.1" &&
    host !== "::1";
  return new Pool({
    connectionString,
    max: 10,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 10_000,
    ...(useSsl
      ? { ssl: { rejectUnauthorized: false } }
      : {}),
  });
}

export function getPool() {
  if (!globalThis.realHoroscopePgPool) {
    globalThis.realHoroscopePgPool = createPool();
  }
  return globalThis.realHoroscopePgPool;
}

export function getDb() {
  return drizzle(getPool(), { schema });
}
