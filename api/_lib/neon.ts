import { Pool } from "pg";

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing required env var: ${name}`);
  return v;
}

let pool: Pool | null = null;

export function getPool() {
  if (!pool) {
    pool = new Pool({
      connectionString: requireEnv("DATABASE_URL"),
      ssl: { rejectUnauthorized: false },
      max: 5,
    });
  }
  return pool;
}

