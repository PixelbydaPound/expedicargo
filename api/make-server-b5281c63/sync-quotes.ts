import { getSql } from "../_lib/neon";

function json(res: any, status: number, body: any) {
  res.status(status).setHeader("Content-Type", "application/json").end(JSON.stringify(body));
}

export default async function handler(req: any, res: any) {
  try {
    const sql = getSql();
    if (req.method !== "POST") {
      json(res, 405, { error: "Method not allowed" });
      return;
    }

    const makeWebhookUrl = process.env.MAKE_WEBHOOK_URL;
    if (!makeWebhookUrl) {
      json(res, 500, { error: "Missing MAKE_WEBHOOK_URL env var" });
      return;
    }

    const quotes =
      await sql`select id, created_at, data from quotes order by created_at desc limit 50`;

    let successCount = 0;
    let failCount = 0;
    const errors: any[] = [];

    for (const q of quotes) {
      try {
        const makeRes = await fetch(makeWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(q.data),
        });
        if (!makeRes.ok) {
          failCount++;
          errors.push({ id: q.id, status: makeRes.status, body: await makeRes.text().catch(() => "") });
        } else {
          successCount++;
        }
      } catch (e: any) {
        failCount++;
        errors.push({ id: q.id, error: e?.message || String(e) });
      }
    }

    json(res, 200, {
      status: "ok",
      message: "Sync completed",
      total: quotes.length,
      synced: successCount,
      failed: failCount,
      errors: errors.length ? errors : undefined,
    });
  } catch (err: any) {
    json(res, 500, { error: err?.message || String(err) });
  }
}

