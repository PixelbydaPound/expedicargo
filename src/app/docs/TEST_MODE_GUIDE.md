# 🧪 Quote Form Test Mode Guide

## How to Access Test Mode

### Option 1: Click the Test Button
- Look for the **orange "🧪 Test Mode" button** in the bottom-right corner of the website
- Click it to enter test mode

### Option 2: Use URL Parameter
- Add `?test=true` to the URL
- Example: `https://your-figma-make-preview.com?test=true`
- Or use: `?mode=test`

## What Test Mode Does

Test Mode provides a dedicated environment for testing the updated quote form with:

1. **Visual Testing Dashboard**
   - Shows all new features being tested
   - Lists expected fields and functionality
   - Displays test results in real-time

2. **Enhanced Console Logging**
   - Clear, organized console output
   - Step-by-step submission tracking
   - Detailed webhook data display

3. **Test Instructions**
   - Step-by-step testing guide
   - Expected console output examples
   - Make.com verification checklist

## Testing Workflow

### Step 1: Enter Test Mode
- Click the "🧪 Test Mode" button
- Or add `?test=true` to URL

### Step 2: Open Developer Console
- Press **F12** (or Cmd+Option+I on Mac)
- Go to the **Console** tab
- You should see: `🧪 TEST MODE ACTIVATED`

### Step 3: Submit a Test Quote
1. Click "🚀 Open Quote Form (Testing Mode)"
2. Fill out all required fields:
   - Business Name
   - Contact Name
   - Email
   - Phone
   - Shipment Type (Sea/Air)
   - Origin & Destination
   - Cargo Description
   - Dimensions & Weight
   - Dangerous Goods (Yes/No)
3. Click "Submit Quote Request"

### Step 4: Verify Console Output

You should see these messages in order:

```
⚡ UPDATED CODE ACTIVE - Generated Quote ID: EXP-20241029-XXX
🚀 NEW VERSION LOADED - Quote ID Generated: EXP-20241029-XXX
📤 Sending quote data with ID: EXP-20241029-XXX
📋 Quote data: { quote_id: "EXP-...", origin: "...", destination: "...", cargo_type: "...", company: "..." }
🏷️ Location codes: { departure: "XXX", arrival: "XXX" }
✨ If you see this, the new code is working!
✅ Make.com Response: 200 OK
✅ Supabase Response: 201
```

### Step 5: Check Make.com Webhook

1. Click "Open Make.com → History Tab" button
2. Or go to: https://www.make.com
3. Navigate to: Scenarios → Your Quote Scenario → History
4. Click on the latest execution
5. Click on the **Webhooks module**
6. Verify the webhook data contains ALL these fields:

**Required New Fields:**
- ✅ `quote_id` (Format: EXP-20241029-XXX)
- ✅ `origin` (Full location name)
- ✅ `destination` (Full location name)
- ✅ `cargo_type` (Merchandise description)
- ✅ `company` (Business name)

**Existing Fields:**
- `business_name`
- `contact_name`
- `email`
- `phone`
- `shipment_type`
- `port_or_airport_departure`
- `port_or_airport_arrival`
- `merchandise_description`
- `quantity`
- `dimensions`
- `weight`
- `is_dangerous`
- `timestamp`

## Troubleshooting

### ❌ "Test Mode button not visible"
- **Solution**: Scroll to bottom-right corner of the page
- The button is fixed positioned in the corner

### ❌ "Console shows old messages"
- **Solution**: Console logs from old code won't have emojis like 🚀 ⚡ ✨
- If you see `"Sending quote data:"` instead of `"📤 Sending quote data with ID:"`, you're running old code
- This shouldn't happen in Figma Make test mode

### ❌ "Webhook missing new fields"
- **Solution**: Make sure you're testing in THIS Figma Make environment
- NOT on expedicargo.com (that's the old code)
- Check the URL - it should be a Figma Make preview URL

### ❌ "Make.com returns 500 error"
- **Solution**: 
  - Check Make.com scenario is active
  - Verify webhook URL is correct
  - Check scenario execution logs for errors

## Next Steps After Successful Testing

Once you confirm the webhook receives all new fields:

### 1. Update Google Sheets Module
- Add `quote_id` column to your Google Sheet
- Map `{{1.quote_id}}` in the Google Sheets module
- Map `{{1.origin}}`, `{{1.destination}}`, `{{1.cargo_type}}`, `{{1.company}}`

### 2. Update Gmail Email Template
Replace the template with:

```html
<h2>New Quote Request - {{1.quote_id}}</h2>

<p><strong>Quote ID:</strong> {{1.quote_id}}</p>
<p><strong>Timestamp:</strong> {{1.timestamp}}</p>

<h3>Contact Information</h3>
<p><strong>Company:</strong> {{1.company}}</p>
<p><strong>Contact Name:</strong> {{1.contact_name}}</p>
<p><strong>Email:</strong> {{1.email}}</p>
<p><strong>Phone:</strong> {{1.phone}}</p>

<h3>Shipment Details</h3>
<p><strong>Type:</strong> {{1.shipment_type}}</p>
<p><strong>Origin:</strong> {{1.origin}}</p>
<p><strong>Destination:</strong> {{1.destination}}</p>
<p><strong>Cargo Type:</strong> {{1.cargo_type}}</p>

<h3>Cargo Specifications</h3>
<p><strong>Quantity:</strong> {{1.quantity}}</p>
<p><strong>Dimensions:</strong> {{1.dimensions}}</p>
<p><strong>Weight:</strong> {{1.weight}}</p>
<p><strong>Dangerous Goods:</strong> {{1.is_dangerous}}</p>
```

### 3. Deploy to Live Website (expedicargo.com)
- Copy the updated `QuoteModal.tsx` from Figma Make
- Deploy to your live website
- Test again on the live site

## Support

If you encounter issues:
1. Check this guide's troubleshooting section
2. Review console logs for error messages
3. Check Make.com execution logs
4. Verify all modules are properly configured

---

**Last Updated:** October 29, 2024  
**Version:** 2.0 (Quote ID Integration)
