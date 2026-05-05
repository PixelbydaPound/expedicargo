import { neon } from "@neondatabase/serverless";

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing required env var: ${name}`);
  return v;
}

let sql: ReturnType<typeof neon> | null = null;

/** Neon HTTP driver — fits Vercel serverless better than TCP `pg.Pool`. Use Neon’s pooled connection string in env. */
export function getSql() {
  if (!sql) {
    sql = neon(requireEnv("DATABASE_URL"));
  }
  return sql;
}
