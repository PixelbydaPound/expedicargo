/** Minimal handler to verify Vercel runs `/api/*` functions (no DB / email imports). */
export default async function handler(_req: any, res: any) {
  res.status(200).json({ ok: true, service: "expedicargo-api" });
}
