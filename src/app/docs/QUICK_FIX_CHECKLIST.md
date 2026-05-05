# Quick Fix Checklist for Make.com Email

## ✅ What We Fixed in the Code

- ✅ Added auto-generated Quote ID (format: `EXP-20241029-123`)
- ✅ Added duplicate field names for better compatibility
- ✅ All form data now sends under multiple field aliases

## 🔧 What You Need to Fix in Make.com

### Step 1: Open Your Make.com Scenario
Go to: https://www.make.com/en/scenarios

### Step 2: Find the Email Module
Look for the module that sends the customer confirmation email (probably Gmail or another email service)

### Step 3: Update These Fields

Find the "To" field and make sure it's set to:
```
{{1.email}}
```
*(Change '1' to your webhook module number)*

---

### In the Email Body/Content, Replace:

#### ID de Cotización / Quote ID:
**Replace:** `#` or blank  
**With:** `{{1.quote_id}}`

#### Tipo de Envío / Shipment Type:
**Replace:** blank  
**With:** `{{1.shipment_type}}`

#### Origen / Origin:
**Replace:** blank  
**With:** `{{1.origin}}`

#### Destino / Destination:
**Replace:** blank  
**With:** `{{1.destination}}`

#### Tipo de Carga / Cargo Type:
**Replace:** blank  
**With:** `{{1.cargo_type}}`

#### Empresa / Company:
**Replace:** blank  
**With:** `{{1.company}}`

---

### Step 4: Find Your Webhook Module Number

1. Look at your webhook module (the first module that receives the form data)
2. Hover over it - you'll see a number (usually 1, 2, or 3)
3. Use that number in ALL the field mappings above
   - If it's module 2, use: `{{2.quote_id}}`
   - If it's module 3, use: `{{3.quote_id}}`

### Step 5: Save & Test

1. Click "Save" in Make.com
2. Go to your website and submit a test quote
3. Check the confirmation email - all fields should now be filled!

---

## 🎯 Example: Complete Email Template

Here's what your email content should look like (with module 1 as example):

```
Estimado/a {{1.contact_name}},
Dear {{1.contact_name}},

Gracias por solicitar una cotización con Expedicargo.
Thank you for requesting a quote with Expedicargo.

📦 Resumen de su Solicitud / Request Summary

ID de Cotización / Quote ID:
{{1.quote_id}}

Tipo de Envío / Shipment Type:
{{1.shipment_type}}

Origen / Origin:
{{1.origin}}

Destino / Destination:
{{1.destination}}

Tipo de Carga / Cargo Type:
{{1.cargo_type}}

Empresa / Company:
{{1.company}}

[Rest of email content...]
```

---

## 🐛 Still Not Working?

### Check 1: Is the "To" field correct?
- It should be: `{{X.email}}` where X is your webhook module number
- NO extra spaces, NO quotes around it

### Check 2: Are you using the right module number?
- Click on your webhook module
- Look at the execution history
- The data should show all fields like: `quote_id`, `shipment_type`, `origin`, etc.

### Check 3: Look at Make.com execution log
1. Run the scenario once
2. Click "History"
3. Click on the latest run
4. Check if the webhook received all the fields
5. If yes, the problem is in the email field mapping
6. If no, let me know and we'll debug further

---

## 📋 All Available Fields

You can use ANY of these fields in your email:

| Field Name | What It Contains |
|-----------|------------------|
| `quote_id` | EXP-20241029-123 |
| `business_name` | Company name |
| `company` | Same as business_name |
| `contact_name` | Contact person |
| `email` | Customer email |
| `phone` | Phone number |
| `shipment_type` | Sea Freight or Air Freight |
| `origin` | Departure location |
| `destination` | Arrival location |
| `port_or_airport_departure` | Same as origin |
| `port_or_airport_arrival` | Same as destination |
| `cargo_type` | Description of cargo |
| `merchandise_description` | Same as cargo_type |
| `quantity` | Amount with units (e.g., "50 pallets") |
| `dimensions` | Size in cm (e.g., "120cm x 80cm x 100cm") |
| `weight` | Weight in kg (e.g., "500 kg") |
| `is_dangerous` | Yes or No |
| `timestamp` | When quote was submitted |

---

## ⚡ Quick Test

After making changes, test immediately:

1. Visit your website
2. Fill the quote form with test data
3. Submit it
4. Check the confirmation email within 30 seconds
5. All fields should be populated! 🎉
