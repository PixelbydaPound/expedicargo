import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "@supabase/supabase-js";
import * as kv from "./kv_store.tsx";
import { sendQuoteEmails } from "./email_service.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-b5281c63/health", (c) => {
  return c.json({ status: "ok" });
});

// Get all quotes endpoint
app.get("/make-server-b5281c63/quotes", async (c) => {
  try {
    console.log("Fetching all quotes...");
    
    // Get all keys with the prefix "quote:"
    const quotes = await kv.getByPrefix("quote:");
    
    console.log(`Found ${quotes.length} quotes`);
    
    return c.json({ 
      status: "ok", 
      count: quotes.length,
      data: quotes 
    });
  } catch (err) {
    console.error("Error fetching quotes:", err);
    return c.json({ error: err.message || String(err) }, 500);
  }
});

// Test Make.com webhook with sample data
app.post("/make-server-b5281c63/test-webhook", async (c) => {
  try {
    // Data formatted for Make.com (snake_case to match mapping)
    const testData = {
      quote_id: "EXP-20241029-TEST",
      business_name: "Test Company",
      contact_name: "John Doe",
      email: "test@example.com",
      phone: "+1234567890",
      shipment_type: "Sea Freight",
      origin: "Port of Los Angeles",
      destination: "Port of Shanghai",
      port_or_airport_departure: "Port of Los Angeles",
      port_or_airport_arrival: "Port of Shanghai",
      cargo_type: "Electronics and machinery",
      merchandise_description: "Electronics and machinery",
      company: "Test Company",
      quantity: "50 pallets",
      dimensions: "120cm x 80cm x 100cm",
      weight: "500 kg",
      is_dangerous: "No",
      needs_insurance: "Yes",
      insurance_value: "25000",
      timestamp: new Date().toISOString()
    };

    console.log("Sending test data to Make.com:", JSON.stringify(testData, null, 2));

    const makeWebhook = "https://hook.us2.make.com/wusgmbryj3mz01ngwmm12ip93a9k4p7b";
    
    const response = await fetch(makeWebhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(testData)
    });

    const responseText = await response.text();
    
    console.log("Make.com response status:", response.status);
    console.log("Make.com response body:", responseText);

    return c.json({ 
      status: "ok",
      sent: testData,
      makeResponse: {
        status: response.status,
        body: responseText
      }
    });
    
  } catch (err) {
    console.error("Error testing webhook:", err);
    return c.json({ error: err.message || String(err) }, 500);
  }
});

// Sync all quotes to Google Sheets via Make.com
app.post("/make-server-b5281c63/sync-quotes", async (c) => {
  try {
    console.log("Starting sync of all quotes to Google Sheets...");
    
    // Get all quotes from KV store
    const quotes = await kv.getByPrefix("quote:");
    console.log(`Found ${quotes.length} quotes to sync`);
    
    if (quotes.length === 0) {
      return c.json({ 
        status: "ok", 
        message: "No quotes to sync",
        synced: 0 
      });
    }
    
    // Make.com webhook URL
    const makeWebhook = "https://hook.us2.make.com/wusgmbryj3mz01ngwmm12ip93a9k4p7b";
    
    let successCount = 0;
    let failCount = 0;
    const errors = [];
    const synced = [];
    
    // Send each quote to Make.com webhook
    for (const quote of quotes) {
      try {
        // Data is already in snake_case format, keep it that way for Make.com
        const sheetsData = {
          quote_id: quote.quote_id || "",
          business_name: quote.business_name || "",
          contact_name: quote.contact_name || "",
          email: quote.email || "",
          phone: quote.phone || "",
          shipment_type: quote.shipment_type || "",
          origin: quote.origin || quote.port_or_airport_departure || "",
          destination: quote.destination || quote.port_or_airport_arrival || "",
          port_or_airport_departure: quote.port_or_airport_departure || "",
          port_or_airport_arrival: quote.port_or_airport_arrival || "",
          cargo_type: quote.cargo_type || quote.merchandise_description || "",
          merchandise_description: quote.merchandise_description || "",
          company: quote.company || quote.business_name || "",
          quantity: quote.quantity || "",
          dimensions: quote.dimensions || "",
          weight: quote.weight || "",
          is_dangerous: quote.is_dangerous || "",
          needs_insurance: quote.needs_insurance || "",
          insurance_value: quote.insurance_value || "",
          timestamp: quote.timestamp || quote.created_at || new Date().toISOString()
        };
        
        console.log(`Syncing quote data:`, JSON.stringify(sheetsData, null, 2));
        
        const response = await fetch(makeWebhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(sheetsData)
        });
        
        const responseText = await response.text();
        console.log(`Response status: ${response.status}, body:`, responseText);
        
        if (response.ok) {
          successCount++;
          synced.push({ 
            email: quote.email, 
            business: quote.business_name,
            status: 'success' 
          });
          console.log(`✓ Successfully synced quote: ${quote.email}`);
        } else {
          failCount++;
          errors.push({ 
            email: quote.email, 
            status: response.status,
            error: responseText 
          });
          console.error(`✗ Failed to sync quote ${quote.email}:`, responseText);
        }
        
        // Add a small delay to avoid overwhelming the webhook
        await new Promise(resolve => setTimeout(resolve, 500));
        
      } catch (err) {
        failCount++;
        errors.push({ 
          email: quote.email, 
          error: err.message || String(err)
        });
        console.error(`✗ Error syncing quote ${quote.email}:`, err);
      }
    }
    
    console.log(`Sync complete: ${successCount} successful, ${failCount} failed`);
    
    return c.json({ 
      status: "ok", 
      message: "Sync completed",
      total: quotes.length,
      synced: successCount,
      failed: failCount,
      syncedQuotes: synced.length > 0 ? synced : undefined,
      errors: errors.length > 0 ? errors : undefined
    });
    
  } catch (err) {
    console.error("Error during sync:", err);
    return c.json({ error: err.message || String(err) }, 500);
  }
});

// Email endpoint - Send quote confirmation and admin notification
app.post("/make-server-b5281c63/send-quote-emails", async (c) => {
  try {
    const body = await c.req.json();
    console.log("📧 Sending quote emails for:", body.quote_id);
    
    // Send both customer and admin emails
    const results = await sendQuoteEmails(body);
    
    return c.json({
      status: "ok",
      results: {
        customer: results.customer.success ? "sent" : "failed",
        admin: results.admin.success ? "sent" : "failed",
      },
      errors: {
        customer: results.customer.error || null,
        admin: results.admin.error || null,
      }
    });
  } catch (err) {
    console.error("❌ Error in send-quote-emails endpoint:", err);
    return c.json({ error: err.message || String(err) }, 500);
  }
});

// Quote submission endpoint
app.post("/make-server-b5281c63/quotes", async (c) => {
  try {
    // Get raw text first to debug
    const rawBody = await c.req.text();
    console.log("Raw body length:", rawBody.length);
    console.log("Raw body (first 300 chars):", rawBody.substring(0, 300));

    let body;
    try {
      // Strategy 1: Find first { and last } and extract only that
      const firstBrace = rawBody.indexOf('{');
      const lastBrace = rawBody.lastIndexOf('}');
      
      if (firstBrace === -1 || lastBrace === -1) {
        throw new Error("No JSON object found in body");
      }
      
      const jsonString = rawBody.substring(firstBrace, lastBrace + 1);
      console.log("Extracted JSON string:", jsonString);
      
      body = JSON.parse(jsonString);
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      console.error("Failed to parse body:", rawBody.substring(0, 300));
      
      // Try to clean non-printable characters
      try {
        const cleaned = rawBody.replace(/[\x00-\x1F\x7F-\x9F]/g, '').trim();
        console.log("Trying cleaned version:", cleaned);
        body = JSON.parse(cleaned);
        console.log("Successfully parsed cleaned version");
      } catch (cleanError) {
        return c.json({ 
          error: "Invalid JSON format", 
          details: parseError.message,
          received: rawBody.substring(0, 200),
          charCodes: Array.from(rawBody.substring(0, 250)).map(c => c.charCodeAt(0))
        }, 400);
      }
    }

    console.log("Parsed quote submission:", body);

    // Generate a unique key for this quote using timestamp and email
    const timestamp = new Date().toISOString();
    const quoteKey = `quote:${timestamp}:${body.email}`;

    // Prepare the quote data with all fields
    const quoteData = {
      quote_id: body.quote_id || "",
      business_name: body.business_name,
      contact_name: body.contact_name,
      email: body.email,
      phone: body.phone || "",
      shipment_type: body.shipment_type,
      origin: body.origin || body.port_or_airport_departure || "",
      destination: body.destination || body.port_or_airport_arrival || "",
      port_or_airport_departure: body.port_or_airport_departure || "",
      port_or_airport_arrival: body.port_or_airport_arrival || "",
      cargo_type: body.cargo_type || body.merchandise_description || "",
      merchandise_description: body.merchandise_description || "",
      company: body.company || body.business_name || "",
      quantity: body.quantity || "",
      packaging_type: body.packaging_type || "",
      dimensions: body.dimensions || "",
      weight: body.weight || "",
      is_dangerous: body.is_dangerous || "",
      needs_insurance: body.needs_insurance || "",
      insurance_value: body.insurance_value || "",
      description: body.description || "",
      consultation: body.consultation || null,
      language: body.language || "es",
      formType: body.formType || "quote",
      created_at: timestamp,
      timestamp: body.timestamp || timestamp,
    };

    // Store in KV store
    await kv.set(quoteKey, quoteData);
    console.log("✅ Quote successfully saved to KV store with key:", quoteKey);

    // Send emails via Resend (async, don't block response)
    sendQuoteEmails(quoteData).catch(err => {
      console.error("⚠️ Failed to send emails (non-blocking):", err);
    });

    return c.json({ 
      status: "ok", 
      data: { key: quoteKey, ...quoteData } 
    }, 201);
  } catch (err) {
    console.error("Error processing quote submission:", err);
    return c.json({ error: err.message || String(err) }, 500);
  }
});

Deno.serve(app.fetch);