# Make.com Email Field Mapping Guide

## Overview
This guide explains how to properly map webhook fields in Make.com for the customer confirmation email.

## Problem
The customer confirmation email was showing blank fields because Make.com's email module wasn't properly mapping the webhook data to the email template fields.

## Solution
We've updated the quote form to send **additional field aliases** to ensure Make.com can properly map the data regardless of which field names are used in the email template.

## Webhook Data Structure

When a quote is submitted, the following data is sent to Make.com webhook:

```json
{
  "quote_id": "EXP-20241029-123",
  "business_name": "ABC Company",
  "contact_name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "shipment_type": "Sea Freight",
  "origin": "Port of Los Angeles",
  "destination": "Port of Shanghai",
  "port_or_airport_departure": "Port of Los Angeles",
  "port_or_airport_arrival": "Port of Shanghai",
  "cargo_type": "Electronics and machinery",
  "merchandise_description": "Electronics and machinery",
  "company": "ABC Company",
  "quantity": "50 pallets",
  "dimensions": "120cm x 80cm x 100cm",
  "weight": "500 kg",
  "is_dangerous": "No",
  "timestamp": "2024-10-29T12:00:00.000Z"
}
```

## Field Mapping Reference

| Email Field (Spanish) | Email Field (English) | Webhook Field Name | Alternative Fields |
|----------------------|----------------------|-------------------|-------------------|
| ID de Cotización | Quote ID | `quote_id` | - |
| Tipo de Envío | Shipment Type | `shipment_type` | - |
| Origen | Origin | `origin` | `port_or_airport_departure` |
| Destino | Destination | `destination` | `port_or_airport_arrival` |
| Tipo de Carga | Cargo Type | `cargo_type` | `merchandise_description` |
| Empresa | Company | `company` | `business_name` |
| Nombre de Contacto | Contact Name | `contact_name` | - |
| Correo Electrónico | Email | `email` | - |
| Teléfono | Phone | `phone` | - |
| Cantidad | Quantity | `quantity` | - |
| Dimensiones | Dimensions | `dimensions` | - |
| Peso | Weight | `weight` | - |
| Carga Peligrosa | Dangerous Cargo | `is_dangerous` | - |

## How to Fix in Make.com

### Step 1: Access Your Make.com Scenario
1. Go to Make.com dashboard
2. Open the scenario connected to webhook: `https://hook.us2.make.com/wusgmbryj3mz01ngwmm12ip93a9k4p7b`

### Step 2: Locate the Email Module
1. Find the "Send an Email" module (likely Gmail or another email service)
2. Click on it to open the configuration

### Step 3: Update Field Mappings
In the email module, you need to map the fields from the webhook to your email template. Look for the section where you're building the email content.

**For each blank field in your email, map it like this:**

#### Quote ID / ID de Cotización:
```
{{1.quote_id}}
```
*(Replace '1' with the actual module number of your webhook)*

#### Shipment Type / Tipo de Envío:
```
{{1.shipment_type}}
```

#### Origin / Origen:
```
{{1.origin}}
```

#### Destination / Destino:
```
{{1.destination}}
```

#### Cargo Type / Tipo de Carga:
```
{{1.cargo_type}}
```

#### Company / Empresa:
```
{{1.company}}
```

### Step 4: Verify the Module Number
- The module number (the number before the dot) should match your webhook module
- To find it, hover over the webhook module and note its number
- Use that number in all field mappings

### Step 5: Test the Integration

#### Option A: Use the Test Webhook Endpoint
1. In your browser, make a POST request to:
   ```
   https://[your-project-id].supabase.co/functions/v1/make-server-b5281c63/test-webhook
   ```
2. This will send test data through Make.com
3. Check if the confirmation email arrives with all fields populated

#### Option B: Submit a Test Quote
1. Go to your website
2. Fill out and submit the quote form
3. Check if the confirmation email has all fields filled

## Common Issues & Solutions

### Issue: Fields still showing as blank
**Solution:** Make sure you're using the correct module number. If your webhook is module 2, use `{{2.quote_id}}` not `{{1.quote_id}}`

### Issue: Email shows "Invalid email address"
**Solution:** 
1. Check the "To" field in the email module
2. It should be mapped to: `{{[MODULE_NUMBER].email}}`
3. Make sure there are no extra spaces or characters

### Issue: Some fields work, others don't
**Solution:** The data is now sent with multiple field names. If a field doesn't work with one name, try the alternative:
- Instead of `origin`, try `port_or_airport_departure`
- Instead of `cargo_type`, try `merchandise_description`
- Instead of `company`, try `business_name`

## Email Template Example

Here's an example of how your email template might look in Make.com:

```
Estimado/a {{1.contact_name}},
Dear {{1.contact_name}},

Gracias por solicitar una cotización con Expedicargo.
Thank you for requesting a quote with Expedicargo.

📦 Resumen de su Solicitud / Request Summary

ID de Cotización / Quote ID: {{1.quote_id}}
#

Tipo de Envío / Shipment Type: {{1.shipment_type}}

Origen / Origin: {{1.origin}}

Destino / Destination: {{1.destination}}

Tipo de Carga / Cargo Type: {{1.cargo_type}}

Empresa / Company: {{1.company}}

Cantidad / Quantity: {{1.quantity}}

Dimensiones / Dimensions: {{1.dimensions}}

Peso / Weight: {{1.weight}}

Carga Peligrosa / Dangerous Cargo: {{1.is_dangerous}}
```

## Updated Features

### Auto-Generated Quote ID
- Format: `EXP-YYYYMMDD-XXX`
- Example: `EXP-20241029-123`
- Unique for each quote submission
- Helps with tracking and customer service

### Duplicate Field Names
To ensure maximum compatibility, we now send the same data under multiple field names:
- `origin` = `port_or_airport_departure`
- `destination` = `port_or_airport_arrival`
- `cargo_type` = `merchandise_description`
- `company` = `business_name`

This means you can use whichever field name works best in your Make.com scenario.

## Need Help?

If you're still experiencing issues after following this guide:

1. Check the Make.com scenario execution history to see the exact data received
2. Verify that the webhook is receiving all fields (they should all be visible in the execution log)
3. Double-check that the email module is mapping to the correct webhook module number
4. Ensure there are no typos in the field names

## Logs to Check

When testing, check these logs:

1. **Browser Console** (Developer Tools):
   - Should show: `📤 Sending quote data with ID: EXP-XXXXXXXX-XXX`
   - Should show all quote data fields

2. **Make.com Execution History**:
   - Open the scenario
   - Click on "History"
   - Find the latest execution
   - Click to view details
   - Verify all fields are present in the webhook data

3. **Email Content**:
   - Check the actual email received
   - Verify each field is populated correctly
