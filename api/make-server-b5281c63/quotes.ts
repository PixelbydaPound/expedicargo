import { getSql } from "../_lib/neon";
import { sendQuoteEmails } from "../_lib/resend";

function json(res: any, status: number, body: unknown) {
  try {
    const s = JSON.stringify(body, (_key, value) =>
      typeof value === "bigint" ? value.toString() : value
    );
    res.status(status).setHeader("Content-Type", "application/json").end(s);
  } catch {
    res
      .status(500)
      .setHeader("Content-Type", "application/json")
      .end(JSON.stringify({ error: "Response serialization failed" }));
  }
}

/** Vercel sometimes delivers JSON as a string; normalize before reading email / fields. */
function parseBody(req: any): Record<string, unknown> {
  const b = req.body;
  if (b && typeof b === "object" && !Buffer.isBuffer(b)) return b as Record<string, unknown>;
  if (typeof b === "string") {
    try {
      const o = JSON.parse(b) as unknown;
      return o && typeof o === "object" ? (o as Record<string, unknown>) : {};
    } catch {
      return {};
    }
  }
  return {};
}

function pickQuoteId(body: any): string {
  const q = body?.quote_id || body?.quoteId;
  return typeof q === "string" ? q : "";
}

export default async function handler(req: any, res: any) {
  try {
    const sql = getSql();
    if (req.method === "GET") {
      const rows = await sql`
        select id, created_at, data from quotes order by created_at desc limit 200
      `;
      json(res, 200, { status: "ok", data: rows });
      return;
    }

    if (req.method !== "POST") {
      json(res, 405, { error: "Method not allowed" });
      return;
    }

    const body = parseBody(req);
    const quote_id = pickQuoteId(body);

    const payload = JSON.stringify(body);
    // Use sql.query + $1 — tagged-template `${x}::jsonb` can break Neon’s SQL parser.
    const insertedRows = await sql.query(
      "insert into quotes (data) values ($1::jsonb) returning id, created_at",
      [payload]
    );
    const row = insertedRows[0];

    // Must await: Vercel freezes the function after the response is sent, so
    // fire-and-forget Promises often never run and emails never leave Resend.
    let email: Awaited<ReturnType<typeof sendQuoteEmails>> | null = null;
    let email_error: string | null = null;
    try {
      email = await sendQuoteEmails({ ...body, quote_id });
    } catch (err: unknown) {
      email_error = err instanceof Error ? err.message : String(err);
      // eslint-disable-next-line no-console
      console.error("Email send failed:", email_error);
    }

    json(res, 201, {
      status: "ok",
      data: {
        id: row?.id != null ? String(row.id) : undefined,
        created_at: row?.created_at,
        quote_id,
      },
      email,
      ...(email_error ? { email_error } : {}),
    });
  } catch (err: any) {
    json(res, 500, { error: err?.message || String(err) });
  }
}

