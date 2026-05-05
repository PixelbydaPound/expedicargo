import { sendQuoteEmails } from "../_lib/resend.js";

function json(res: any, status: number, body: any) {
  res.status(status).setHeader("Content-Type", "application/json").end(JSON.stringify(body));
}

export default async function handler(req: any, res: any) {
  try {
    if (req.method !== "POST") {
      json(res, 405, { error: "Method not allowed" });
      return;
    }

    const body = req.body && typeof req.body === "object" ? req.body : {};
    const results = await sendQuoteEmails(body);
    json(res, 200, { status: "ok", results });
  } catch (err: any) {
    json(res, 500, { error: err?.message || String(err) });
  }
}

