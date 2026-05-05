// Email service using Resend.com
// Handles customer confirmations and admin notifications

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
const RESEND_API_URL = 'https://api.resend.com/emails';

// Admin email address for notifications
// NOTE: e.gonzalez@expedicargo.com must be verified in Resend
// Verify at: https://resend.com/emails
const ADMIN_EMAIL = 'e.gonzalez@expedicargo.com';

interface QuoteEmailData {
  quote_id: string;
  business_name: string;
  contact_name: string;
  email: string;
  phone: string;
  shipment_type: string;
  origin: string;
  destination: string;
  merchandise_description: string;
  quantity: string;
  packaging_type: string;
  dimensions: string;
  weight: string;
  is_dangerous: string;
  needs_insurance: string;
  insurance_value?: string;
  timestamp: string;
  language?: 'es' | 'en'; // Default to Spanish if not provided
}

// Generate customer confirmation email (bilingual)
function generateCustomerEmailHTML(data: QuoteEmailData): string {
  const isSpanish = !data.language || data.language === 'es';
  
  const title = isSpanish ? '¡Cotización Recibida!' : 'Quote Received!';
  const greeting = isSpanish 
    ? `Hola ${data.contact_name},` 
    : `Hello ${data.contact_name},`;
  const intro = isSpanish
    ? 'Gracias por solicitar una cotización con Expedicargo. Hemos recibido tu solicitud y nuestro equipo la está revisando.'
    : 'Thank you for requesting a quote with Expedicargo. We have received your request and our team is reviewing it.';
  const quoteIdLabel = isSpanish ? 'ID de Cotización' : 'Quote ID';
  const detailsTitle = isSpanish ? 'Detalles de tu Cotización' : 'Your Quote Details';
  const contactLabel = isSpanish ? 'Información de Contacto' : 'Contact Information';
  const businessLabel = isSpanish ? 'Negocio' : 'Business';
  const emailLabel = isSpanish ? 'Correo' : 'Email';
  const phoneLabel = isSpanish ? 'Teléfono' : 'Phone';
  const shipmentLabel = isSpanish ? 'Detalles del Envío' : 'Shipment Details';
  const typeLabel = isSpanish ? 'Tipo de Envío' : 'Shipment Type';
  const originLabel = isSpanish ? 'Origen' : 'Origin';
  const destinationLabel = isSpanish ? 'Destino' : 'Destination';
  const cargoLabel = isSpanish ? 'Detalles de la Carga' : 'Cargo Details';
  const descriptionLabel = isSpanish ? 'Descripción' : 'Description';
  const quantityLabel = isSpanish ? 'Cantidad' : 'Quantity';
  const packagingLabel = isSpanish ? 'Tipo de Embalaje' : 'Packaging Type';
  const dimensionsLabel = isSpanish ? 'Dimensiones' : 'Dimensions';
  const weightLabel = isSpanish ? 'Peso' : 'Weight';
  const dangerousLabel = isSpanish ? 'Carga Peligrosa' : 'Dangerous Goods';
  const insuranceLabel = isSpanish ? 'Seguro' : 'Insurance';
  const insuranceValueLabel = isSpanish ? 'Valor Asegurado' : 'Insured Value';
  const nextStepsTitle = isSpanish ? 'Próximos Pasos' : 'Next Steps';
  const nextStepsText = isSpanish
    ? 'Nuestro equipo revisará tu solicitud y te contactará dentro de 24-48 horas con una cotización detallada.'
    : 'Our team will review your request and contact you within 24-48 hours with a detailed quote.';
  const questionsTitle = isSpanish ? '¿Tienes Preguntas?' : 'Have Questions?';
  const questionsText = isSpanish
    ? 'No dudes en responder a este correo o llamarnos. Estamos aquí para ayudarte.'
    : 'Feel free to reply to this email or call us. We are here to help you.';
  const thanksText = isSpanish
    ? 'Gracias por elegir Expedicargo para tus necesidades logísticas.'
    : 'Thank you for choosing Expedicargo for your logistics needs.';
  const teamText = isSpanish ? 'El Equipo de Expedicargo' : 'The Expedicargo Team';
  
  return `
<!DOCTYPE html>
<html lang="${isSpanish ? 'es' : 'en'}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700;">Expedicargo</h1>
              <p style="margin: 10px 0 0 0; color: #e0e7ff; font-size: 16px;">${title}</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              
              <!-- Greeting -->
              <p style="margin: 0 0 20px 0; font-size: 16px; color: #1f2937; line-height: 1.6;">${greeting}</p>
              <p style="margin: 0 0 30px 0; font-size: 16px; color: #1f2937; line-height: 1.6;">${intro}</p>
              
              <!-- Quote ID Badge -->
              <div style="background-color: #dbeafe; border-left: 4px solid #3b82f6; padding: 16px 20px; margin-bottom: 30px; border-radius: 4px;">
                <p style="margin: 0; font-size: 14px; color: #1e40af; font-weight: 600;">${quoteIdLabel}:</p>
                <p style="margin: 5px 0 0 0; font-size: 20px; color: #1e40af; font-weight: 700;">${data.quote_id}</p>
              </div>
              
              <!-- Details Title -->
              <h2 style="margin: 0 0 20px 0; font-size: 20px; color: #1f2937; font-weight: 700; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">${detailsTitle}</h2>
              
              <!-- Contact Information -->
              <div style="margin-bottom: 25px;">
                <h3 style="margin: 0 0 12px 0; font-size: 16px; color: #3b82f6; font-weight: 600;">${contactLabel}</h3>
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding: 6px 0; font-size: 14px; color: #6b7280; width: 140px;">${businessLabel}:</td>
                    <td style="padding: 6px 0; font-size: 14px; color: #1f2937; font-weight: 600;">${data.business_name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-size: 14px; color: #6b7280;">${emailLabel}:</td>
                    <td style="padding: 6px 0; font-size: 14px; color: #1f2937;">${data.email}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-size: 14px; color: #6b7280;">${phoneLabel}:</td>
                    <td style="padding: 6px 0; font-size: 14px; color: #1f2937;">${data.phone}</td>
                  </tr>
                </table>
              </div>
              
              <!-- Shipment Details -->
              <div style="margin-bottom: 25px;">
                <h3 style="margin: 0 0 12px 0; font-size: 16px; color: #3b82f6; font-weight: 600;">${shipmentLabel}</h3>
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding: 6px 0; font-size: 14px; color: #6b7280; width: 140px;">${typeLabel}:</td>
                    <td style="padding: 6px 0; font-size: 14px; color: #1f2937; font-weight: 600;">${data.shipment_type}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-size: 14px; color: #6b7280;">${originLabel}:</td>
                    <td style="padding: 6px 0; font-size: 14px; color: #1f2937;">${data.origin}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-size: 14px; color: #6b7280;">${destinationLabel}:</td>
                    <td style="padding: 6px 0; font-size: 14px; color: #1f2937;">${data.destination}</td>
                  </tr>
                </table>
              </div>
              
              <!-- Cargo Details -->
              <div style="margin-bottom: 30px;">
                <h3 style="margin: 0 0 12px 0; font-size: 16px; color: #3b82f6; font-weight: 600;">${cargoLabel}</h3>
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding: 6px 0; font-size: 14px; color: #6b7280; width: 140px;">${descriptionLabel}:</td>
                    <td style="padding: 6px 0; font-size: 14px; color: #1f2937;">${data.merchandise_description}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-size: 14px; color: #6b7280;">${quantityLabel}:</td>
                    <td style="padding: 6px 0; font-size: 14px; color: #1f2937;">${data.quantity}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-size: 14px; color: #6b7280;">${packagingLabel}:</td>
                    <td style="padding: 6px 0; font-size: 14px; color: #1f2937;">${data.packaging_type}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-size: 14px; color: #6b7280;">${dimensionsLabel}:</td>
                    <td style="padding: 6px 0; font-size: 14px; color: #1f2937;">${data.dimensions}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-size: 14px; color: #6b7280;">${weightLabel}:</td>
                    <td style="padding: 6px 0; font-size: 14px; color: #1f2937;">${data.weight}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-size: 14px; color: #6b7280;">${dangerousLabel}:</td>
                    <td style="padding: 6px 0; font-size: 14px; color: #1f2937;">${data.is_dangerous}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-size: 14px; color: #6b7280;">${insuranceLabel}:</td>
                    <td style="padding: 6px 0; font-size: 14px; color: #1f2937;">${data.needs_insurance}</td>
                  </tr>
                  ${data.needs_insurance === 'Yes' && data.insurance_value ? `
                  <tr>
                    <td style="padding: 6px 0; font-size: 14px; color: #6b7280;">${insuranceValueLabel}:</td>
                    <td style="padding: 6px 0; font-size: 14px; color: #1f2937;">$${data.insurance_value}</td>
                  </tr>
                  ` : ''}
                </table>
              </div>
              
              <!-- Next Steps -->
              <div style="background-color: #f0f9ff; border-radius: 6px; padding: 20px; margin-bottom: 25px;">
                <h3 style="margin: 0 0 10px 0; font-size: 16px; color: #1e40af; font-weight: 600;">✅ ${nextStepsTitle}</h3>
                <p style="margin: 0; font-size: 14px; color: #1e40af; line-height: 1.6;">${nextStepsText}</p>
              </div>
              
              <!-- Questions -->
              <div style="margin-bottom: 25px;">
                <h3 style="margin: 0 0 10px 0; font-size: 16px; color: #1f2937; font-weight: 600;">${questionsTitle}</h3>
                <p style="margin: 0; font-size: 14px; color: #6b7280; line-height: 1.6;">${questionsText}</p>
              </div>
              
              <!-- Closing -->
              <p style="margin: 0 0 10px 0; font-size: 14px; color: #1f2937; line-height: 1.6;">${thanksText}</p>
              <p style="margin: 0; font-size: 14px; color: #1f2937; font-weight: 600;">${teamText}</p>
              
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 10px 0; font-size: 14px; color: #6b7280; font-weight: 600;">Expedicargo</p>
              <p style="margin: 0 0 5px 0; font-size: 12px; color: #9ca3af;">${isSpanish ? 'Tu socio confiable en logística internacional' : 'Your trusted partner in international logistics'}</p>
              <p style="margin: 0; font-size: 12px; color: #9ca3af;">info@expedicargo.com</p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

// Generate admin notification email
function generateAdminEmailHTML(data: QuoteEmailData): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Quote Request</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700;">🚨 New Quote Request</h1>
              <p style="margin: 10px 0 0 0; color: #fee2e2; font-size: 16px;">Action Required</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              
              <!-- Alert -->
              <div style="background-color: #fef2f2; border-left: 4px solid #dc2626; padding: 16px 20px; margin-bottom: 30px; border-radius: 4px;">
                <p style="margin: 0; font-size: 14px; color: #991b1b; font-weight: 600;">Quote ID:</p>
                <p style="margin: 5px 0 0 0; font-size: 20px; color: #991b1b; font-weight: 700;">${data.quote_id}</p>
                <p style="margin: 10px 0 0 0; font-size: 12px; color: #991b1b;">Received: ${new Date(data.timestamp).toLocaleString()}</p>
              </div>
              
              <!-- Client Information -->
              <h2 style="margin: 0 0 20px 0; font-size: 20px; color: #1f2937; font-weight: 700; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">👤 Client Information</h2>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 25px;">
                <tr>
                  <td style="padding: 8px 0; font-size: 14px; color: #6b7280; width: 140px; vertical-align: top;">Business:</td>
                  <td style="padding: 8px 0; font-size: 15px; color: #1f2937; font-weight: 600;">${data.business_name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-size: 14px; color: #6b7280; vertical-align: top;">Contact:</td>
                  <td style="padding: 8px 0; font-size: 15px; color: #1f2937; font-weight: 600;">${data.contact_name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-size: 14px; color: #6b7280; vertical-align: top;">Email:</td>
                  <td style="padding: 8px 0; font-size: 15px; color: #1f2937;"><a href="mailto:${data.email}" style="color: #2563eb; text-decoration: none;">${data.email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-size: 14px; color: #6b7280; vertical-align: top;">Phone:</td>
                  <td style="padding: 8px 0; font-size: 15px; color: #1f2937;"><a href="tel:${data.phone}" style="color: #2563eb; text-decoration: none;">${data.phone}</a></td>
                </tr>
              </table>
              
              <!-- Shipment Details -->
              <h2 style="margin: 0 0 20px 0; font-size: 20px; color: #1f2937; font-weight: 700; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">🚢 Shipment Details</h2>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 25px;">
                <tr>
                  <td style="padding: 8px 0; font-size: 14px; color: #6b7280; width: 140px; vertical-align: top;">Type:</td>
                  <td style="padding: 8px 0; font-size: 15px; color: #1f2937; font-weight: 600;">${data.shipment_type}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-size: 14px; color: #6b7280; vertical-align: top;">Origin:</td>
                  <td style="padding: 8px 0; font-size: 15px; color: #1f2937;">${data.origin}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-size: 14px; color: #6b7280; vertical-align: top;">Destination:</td>
                  <td style="padding: 8px 0; font-size: 15px; color: #1f2937;">${data.destination}</td>
                </tr>
              </table>
              
              <!-- Cargo Details -->
              <h2 style="margin: 0 0 20px 0; font-size: 20px; color: #1f2937; font-weight: 700; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">📦 Cargo Details</h2>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 25px;">
                <tr>
                  <td style="padding: 8px 0; font-size: 14px; color: #6b7280; width: 140px; vertical-align: top;">Description:</td>
                  <td style="padding: 8px 0; font-size: 15px; color: #1f2937;">${data.merchandise_description}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-size: 14px; color: #6b7280; vertical-align: top;">Quantity:</td>
                  <td style="padding: 8px 0; font-size: 15px; color: #1f2937; font-weight: 600;">${data.quantity}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-size: 14px; color: #6b7280; vertical-align: top;">Packaging:</td>
                  <td style="padding: 8px 0; font-size: 15px; color: #1f2937;">${data.packaging_type}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-size: 14px; color: #6b7280; vertical-align: top;">Dimensions:</td>
                  <td style="padding: 8px 0; font-size: 15px; color: #1f2937;">${data.dimensions}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-size: 14px; color: #6b7280; vertical-align: top;">Weight:</td>
                  <td style="padding: 8px 0; font-size: 15px; color: #1f2937; font-weight: 600;">${data.weight}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-size: 14px; color: #6b7280; vertical-align: top;">Dangerous:</td>
                  <td style="padding: 8px 0; font-size: 15px; color: ${data.is_dangerous === 'Yes' ? '#dc2626' : '#059669'}; font-weight: 600;">${data.is_dangerous}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-size: 14px; color: #6b7280; vertical-align: top;">Insurance:</td>
                  <td style="padding: 8px 0; font-size: 15px; color: #1f2937; font-weight: 600;">${data.needs_insurance}</td>
                </tr>
                ${data.needs_insurance === 'Yes' && data.insurance_value ? `
                <tr>
                  <td style="padding: 8px 0; font-size: 14px; color: #6b7280; vertical-align: top;">Insured Value:</td>
                  <td style="padding: 8px 0; font-size: 15px; color: #1f2937; font-weight: 600;">$${data.insurance_value}</td>
                </tr>
                ` : ''}
              </table>
              
              <!-- Action Required -->
              <div style="background-color: #fef3c7; border-radius: 6px; padding: 20px; margin-bottom: 20px; border-left: 4px solid #f59e0b;">
                <h3 style="margin: 0 0 10px 0; font-size: 16px; color: #92400e; font-weight: 600;">⏰ Action Required</h3>
                <p style="margin: 0; font-size: 14px; color: #92400e; line-height: 1.6;">Please respond to this client within 24-48 hours with a detailed quote.</p>
              </div>
              
              <!-- CTA Button -->
              <div style="text-align: center; margin: 30px 0;">
                <a href="mailto:${data.email}?subject=Re: Quote ${data.quote_id} - Expedicargo" style="display: inline-block; background-color: #2563eb; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 6px; font-weight: 600; font-size: 16px;">Reply to Client</a>
              </div>
              
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; font-size: 12px; color: #9ca3af;">Expedicargo Admin Notification System</p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

// Send email via Resend API
// Domain verified! Using professional @expedicargo.com sender address
// DNS verified at: https://resend.com/domains
async function sendEmail(to: string, subject: string, html: string, from: string = 'Expedicargo <quotes@expedicargo.com>') {
  if (!RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY environment variable not set');
  }

  const response = await fetch(RESEND_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      html,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Resend API error:', response.status, errorText);
    throw new Error(`Resend API error: ${response.status} - ${errorText}`);
  }

  const result = await response.json();
  return result;
}

// Main function: Send customer confirmation email
export async function sendCustomerConfirmation(quoteData: QuoteEmailData) {
  try {
    const isSpanish = !quoteData.language || quoteData.language === 'es';
    const subject = isSpanish 
      ? `✅ Cotización Recibida - ${quoteData.quote_id}` 
      : `✅ Quote Received - ${quoteData.quote_id}`;
    
    const html = generateCustomerEmailHTML(quoteData);
    
    console.log(`📧 Sending customer confirmation to: ${quoteData.email}`);
    const result = await sendEmail(quoteData.email, subject, html);
    console.log(`✅ Customer email sent successfully:`, result);
    
    return { success: true, data: result };
  } catch (error) {
    console.error('❌ Error sending customer email:', error);
    return { success: false, error: error.message };
  }
}

// Main function: Send admin notification email
export async function sendAdminNotification(quoteData: QuoteEmailData) {
  try {
    const subject = `🚨 New Quote Request: ${quoteData.quote_id} - ${quoteData.business_name}`;
    
    const html = generateAdminEmailHTML(quoteData);
    
    console.log(`📧 Sending admin notification to: ${ADMIN_EMAIL}`);
    const result = await sendEmail(ADMIN_EMAIL, subject, html);
    console.log(`✅ Admin email sent successfully:`, result);
    
    return { success: true, data: result };
  } catch (error) {
    console.error('❌ Error sending admin email:', error);
    return { success: false, error: error.message };
  }
}

// Helper function: Delay to respect Resend rate limits
// Resend allows 2 requests/second, so we wait 600ms between emails to be safe
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Combined function: Send both emails with rate limit protection
export async function sendQuoteEmails(quoteData: QuoteEmailData) {
  const results = {
    customer: { success: false, error: null as any },
    admin: { success: false, error: null as any },
  };

  // Send customer email first
  console.log('📧 Step 1/2: Sending customer confirmation email...');
  const customerResult = await sendCustomerConfirmation(quoteData);
  results.customer = customerResult;

  // Wait 600ms to respect Resend's 2 requests/second rate limit
  console.log('⏳ Waiting 600ms to respect rate limit...');
  await delay(600);

  // Send admin email second
  console.log('📧 Step 2/2: Sending admin notification email...');
  const adminResult = await sendAdminNotification(quoteData);
  results.admin = adminResult;

  // Log final results
  console.log('📊 Email sending results:', {
    customer: results.customer.success ? '✅ Success' : '❌ Failed',
    admin: results.admin.success ? '✅ Success' : '❌ Failed',
  });

  return results;
}
