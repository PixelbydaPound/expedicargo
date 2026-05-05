import { sql } from "../_lib/neon";
import { sendQuoteEmails } from "../_lib/resend";

function json(res: any, status: number, body: any) {
  res.status(status).setHeader("Content-Type", "application/json").end(JSON.stringify(body));
}

function pickQuoteId(body: any): string {
  const q = body?.quote_id || body?.quoteId;
  return typeof q === "string" ? q : "";
}

export default async function handler(req: any, res: any) {
  try {
    if (req.method === "GET") {
      const rows =
        await sql`select id, created_at, data from quotes order by created_at desc limit 200`;
      json(res, 200, { status: "ok", data: rows });
      return;
    }

    if (req.method !== "POST") {
      json(res, 405, { error: "Method not allowed" });
      return;
    }

    const body = req.body && typeof req.body === "object" ? req.body : {};
    const quote_id = pickQuoteId(body);

    const [row] =
      await sql`insert into quotes (data) values (${body}::jsonb) returning id, created_at`;

    // fire-and-forget emails
    sendQuoteEmails({ ...body, quote_id }).catch((err) => {
      // eslint-disable-next-line no-console
      console.error("Email send failed:", err);
    });

    json(res, 201, { status: "ok", data: { id: row?.id, created_at: row?.created_at, quote_id } });
  } catch (err: any) {
    json(res, 500, { error: err?.message || String(err) });
  }
}

