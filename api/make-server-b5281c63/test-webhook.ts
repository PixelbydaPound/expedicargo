function json(res: any, status: number, body: any) {
  res.status(status).setHeader("Content-Type", "application/json").end(JSON.stringify(body));
}

export default async function handler(req: any, res: any) {
  try {
    if (req.method !== "POST") {
      json(res, 405, { error: "Method not allowed" });
      return;
    }

    const timestamp = new Date();
    const dateStr = timestamp.toISOString().slice(0, 10).replace(/-/g, "");
    const randomNum = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0");
    const quoteId = `EXP-${dateStr}-${randomNum}`;

    const sent = {
      quote_id: quoteId,
      business_name: `WEBHOOK TEST ${timestamp.toISOString()}`,
      contact_name: "Webhook Test User",
      email: "debug@expedicargo.com",
      phone: "+1-555-DEBUG",
      shipment_type: "Sea Freight",
      origin: "Port of Houston, TX",
      destination: "Port of Barcelona, Spain",
      port_or_airport_departure: "Port of Houston, TX",
      port_or_airport_arrival: "Port of Barcelona, Spain",
      cargo_type: "Webhook test cargo",
      merchandise_description: "Webhook test cargo",
      company: "Expedicargo",
      quantity: "10 containers",
      dimensions: "600cm x 240cm x 260cm",
      weight: "30000 kg",
      is_dangerous: "No",
      needs_insurance: "Yes",
      insurance_value: "25000",
      timestamp: timestamp.toISOString(),
    };

    const makeWebhookUrl = process.env.MAKE_WEBHOOK_URL;
    if (!makeWebhookUrl) {
      json(res, 500, { error: "Missing MAKE_WEBHOOK_URL env var" });
      return;
    }

    const makeRes = await fetch(makeWebhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sent),
    });

    const body = await makeRes.text().catch(() => "");
    json(res, 200, {
      status: "ok",
      sent,
      makeResponse: { status: makeRes.status, body: body || "Accepted" },
    });
  } catch (err: any) {
    json(res, 500, { error: err?.message || String(err) });
  }
}

