type QuoteEmailData = Record<string, unknown> & {
  quote_id?: string;
  business_name?: string;
  contact_name?: string;
  email?: string;
  phone?: string;
  shipment_type?: string;
  origin?: string;
  destination?: string;
  merchandise_description?: string;
  quantity?: string;
  packaging_type?: string;
  dimensions?: string;
  weight?: string;
  is_dangerous?: string;
  needs_insurance?: string;
  insurance_value?: string;
  language?: "es" | "en";
  timestamp?: string;
};

const RESEND_API_URL = "https://api.resend.com/emails";

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing required env var: ${name}`);
  return v;
}

function safeStr(v: unknown): string {
  if (v === null || v === undefined) return "";
  return String(v);
}

function renderQuoteTable(data: QuoteEmailData): string {
  const rows: Array<[string, string]> = [
    ["Quote ID", safeStr(data.quote_id)],
    ["Business", safeStr(data.business_name)],
    ["Contact", safeStr(data.contact_name)],
    ["Email", safeStr(data.email)],
    ["Phone", safeStr(data.phone)],
    ["Shipment type", safeStr(data.shipment_type)],
    ["Origin", safeStr(data.origin)],
    ["Destination", safeStr(data.destination)],
    ["Merchandise", safeStr(data.merchandise_description)],
    ["Quantity", safeStr(data.quantity)],
    ["Packaging", safeStr(data.packaging_type)],
    ["Dimensions", safeStr(data.dimensions)],
    ["Weight", safeStr(data.weight)],
    ["Dangerous", safeStr(data.is_dangerous)],
    ["Insurance", safeStr(data.needs_insurance)],
    ["Insurance value", safeStr(data.insurance_value)],
    ["Timestamp", safeStr(data.timestamp)],
  ].filter(([, v]) => v.trim().length > 0);

  return `
    <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%; border-collapse:collapse; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;">
      <tbody>
        ${rows
          .map(
            ([k, v]) => `
              <tr>
                <td style="padding:8px 10px; border:1px solid #e5e7eb; background:#f9fafb; font-weight:600; width:180px;">${k}</td>
                <td style="padding:8px 10px; border:1px solid #e5e7eb;">${v}</td>
              </tr>
            `
          )
          .join("")}
      </tbody>
    </table>
  `;
}

function customerEmailHtml(data: QuoteEmailData): { subject: string; html: string } {
  const isSpanish = !data.language || data.language === "es";
  const subject = isSpanish ? "¡Cotización recibida! (Expedicargo)" : "Quote received! (Expedicargo)";
  const greeting = isSpanish ? `Hola ${safeStr(data.contact_name) || ""},` : `Hello ${safeStr(data.contact_name) || ""},`;
  const intro = isSpanish
    ? "Gracias por solicitar una cotización con Expedicargo. Hemos recibido tu solicitud y nuestro equipo la está revisando."
    : "Thanks for requesting a quote with Expedicargo. We received your request and our team is reviewing it.";

  const next = isSpanish
    ? "Te contactaremos dentro de 24–48 horas con una cotización detallada."
    : "We’ll reach out within 24–48 hours with a detailed quote.";

  return {
    subject,
    html: `
      <div style="background:#f3f4f6; padding:24px;">
        <div style="max-width:640px; margin:0 auto; background:#ffffff; border-radius:10px; overflow:hidden; border:1px solid #e5e7eb;">
          <div style="padding:20px 24px; background:linear-gradient(135deg,#1e40af,#3b82f6); color:#fff;">
            <div style="font-size:22px; font-weight:800;">Expedicargo</div>
            <div style="opacity:.9; margin-top:6px;">${subject}</div>
          </div>
          <div style="padding:24px;">
            <p style="margin:0 0 12px 0; color:#111827;">${greeting}</p>
            <p style="margin:0 0 16px 0; color:#374151; line-height:1.5;">${intro}</p>
            ${renderQuoteTable(data)}
            <p style="margin:16px 0 0 0; color:#374151; line-height:1.5;">${next}</p>
            <p style="margin:16px 0 0 0; color:#6b7280; font-size:12px;">info@expedicargo.com</p>
          </div>
        </div>
      </div>
    `,
  };
}

function adminEmailHtml(data: QuoteEmailData): { subject: string; html: string } {
  const subject = `New quote request: ${safeStr(data.quote_id) || "Expedicargo"}`;
  return {
    subject,
    html: `
      <div style="background:#0b1220; padding:24px;">
        <div style="max-width:760px; margin:0 auto; background:#ffffff; border-radius:10px; overflow:hidden; border:1px solid #e5e7eb;">
          <div style="padding:20px 24px; background:#111827; color:#fff;">
            <div style="font-size:18px; font-weight:800;">Expedicargo — Admin notification</div>
            <div style="opacity:.9; margin-top:6px;">${subject}</div>
          </div>
          <div style="padding:24px;">
            ${renderQuoteTable(data)}
          </div>
        </div>
      </div>
    `,
  };
}

async function resendSend(params: { to: string; subject: string; html: string; replyTo?: string }): Promise<Response> {
  const apiKey = requireEnv("RESEND_API_KEY");
  const from = requireEnv("RESEND_FROM");
  return fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [params.to],
      subject: params.subject,
      html: params.html,
      reply_to: params.replyTo,
    }),
  });
}

export async function sendQuoteEmails(data: QuoteEmailData) {
  const adminTo = process.env.ADMIN_EMAIL || "e.gonzalez@expedicargo.com";
  const customerTo = safeStr(data.email);
  if (!customerTo) throw new Error("Missing customer email");

  const customer = customerEmailHtml(data);
  const admin = adminEmailHtml(data);

  const [customerRes, adminRes] = await Promise.allSettled([
    resendSend({ to: customerTo, subject: customer.subject, html: customer.html, replyTo: "info@expedicargo.com" }),
    resendSend({ to: adminTo, subject: admin.subject, html: admin.html }),
  ]);

  const normalize = async (res: PromiseSettledResult<Response>) => {
    if (res.status === "rejected") return { success: false, error: res.reason?.message || String(res.reason) };
    const ok = res.value.ok;
    const text = await res.value.text().catch(() => "");
    return ok ? { success: true } : { success: false, error: text || `Resend error ${res.value.status}` };
  };

  return {
    customer: await normalize(customerRes),
    admin: await normalize(adminRes),
  };
}

