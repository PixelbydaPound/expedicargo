# 🚀 Webhook Test Instructions - Make.com Field Mapping

## Quick Start: Refresh Webhook Fields in Make.com

### Step 1: Send Test Data
Visit this URL in your browser:
```
https://your-site.com/?webhook-test=true
```

This will open the **Webhook Test Tool** where you can:
1. Click the **"Send Test Webhook"** button
2. Wait for the success message
3. Verify the data was sent to Make.com

### Step 2: Check Make.com for New Fields
After sending the test, the webhook will include:

```json
{
  "quote_id": "EXP-20241029-TEST",
  "business_name": "Test Company",
  "contact_name": "John Doe",
  "email": "test@example.com",
  "phone": "+1234567890",
  "shipment_type": "Sea Freight",
  "origin": "Port of Los Angeles",
  "destination": "Port of Shanghai",
  "port_or_airport_departure": "Port of Los Angeles",
  "port_or_airport_arrival": "Port of Barcelona, Spain",
  "cargo_type": "Electronics and machinery",
  "merchandise_description": "Electronics and machinery",
  "company": "Test Company",
  "quantity": "50 pallets",
  "dimensions": "120cm x 80cm x 100cm",
  "weight": "500 kg",
  "is_dangerous": "No",
  "needs_insurance": "Yes",        ← NEW FIELD
  "insurance_value": "25000",      ← NEW FIELD
  "timestamp": "2025-10-30T..."
}
```

### Step 3: Map in Make.com

1. **Go to your Make.com scenario**
2. **Click on the "Webhooks - Custom webhook" module**
3. **Look for the insurance fields** in the dropdown list:
   - `needs_insurance`
   - `insurance_value`

4. **In your Google Sheets "Add a Row" module**, map these fields:

| Google Sheets Column Header | Make.com Field to Select |
|----------------------------|-------------------------|
| Needs Insurance | Click dropdown → Select `1. needs_insurance` |
| Insurance Value (USD) | Click dropdown → Select `1. insurance_value` |

### Step 4: Save and Test
1. Save your Make.com scenario
2. Submit a real quote from your website
3. Verify the insurance data appears in Google Sheets

---

## Alternative: Use Browser Console

If you prefer to use the browser console instead of the visual tool:

```javascript
// Open your browser console (F12) on any page of your site
fetch('https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-b5281c63/test-webhook', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_ANON_KEY',
    'Content-Type': 'application/json'
  }
})
.then(r => r.json())
.then(data => {
  console.log('✅ Test webhook sent!', data);
  console.log('📊 Data sent to Make.com:', data.sent);
})
.catch(err => console.error('❌ Error:', err));
```

---

## Expected Make.com Dropdown Options

After sending the test webhook, you should see these options in Make.com:

```
Webhooks - Custom webhook [bundle]
├── 1. quote_id
├── 1. business_name
├── 1. contact_name
├── 1. email
├── 1. phone
├── 1. shipment_type
├── 1. origin
├── 1. destination
├── 1. port_or_airport_departure
├── 1. port_or_airport_arrival
├── 1. cargo_type
├── 1. merchandise_description
├── 1. company
├── 1. quantity
├── 1. dimensions
├── 1. weight
├── 1. is_dangerous
├── 1. needs_insurance        ← NEW
├── 1. insurance_value        ← NEW
└── 1. timestamp
```

---

## Troubleshooting

### ❌ Problem: I don't see `needs_insurance` or `insurance_value` in Make.com

**Solutions:**
1. ✅ Send the test webhook using the tool at `?webhook-test=true`
2. ✅ In Make.com, click "Re-determine data structure" on your webhook module
3. ✅ Or click "Run once" in Make.com to capture new webhook data
4. ✅ Make sure your Make.com scenario is active/running

### ❌ Problem: Fields show as "undefined" or blank in Google Sheets

**Solutions:**
1. ✅ Verify you selected `1. needs_insurance` NOT just typed "needs_insurance"
2. ✅ Verify you selected `1. insurance_value` NOT just typed "insurance_value"
3. ✅ Check that column names in Google Sheets match exactly
4. ✅ Test with a real quote submission (not just the test data)

### ❌ Problem: Test data appears in my Google Sheet

**Solution:**
- This is expected! The test creates a row with email: `test@example.com`
- You can safely delete this test row after confirming the mapping works
- Future real quotes will use real customer emails

---

## Visual Mapping Reference

When you click on the Google Sheets column mapping in Make.com, you should see:

```
Column: Needs Insurance
Value: [Click dropdown]
  → Select: "1. needs_insurance"

Column: Insurance Value (USD)  
Value: [Click dropdown]
  → Select: "1. insurance_value"
```

The dropdown format will be:
```
1. needs_insurance        (from Webhooks module output)
1. insurance_value        (from Webhooks module output)
```

---

## Complete Mapping Checklist

- [ ] Sent test webhook using `?webhook-test=true` OR browser console
- [ ] Verified test data arrived in Make.com
- [ ] Opened Google Sheets "Add a Row" module in Make.com
- [ ] Mapped `1. needs_insurance` to "Needs Insurance" column
- [ ] Mapped `1. insurance_value` to "Insurance Value (USD)" column
- [ ] Saved Make.com scenario
- [ ] Submitted a test quote with insurance = Yes
- [ ] Checked Google Sheets for insurance data
- [ ] Deleted test row with `test@example.com`

---

## Quick Reference URLs

- **Webhook Test Tool**: `https://your-site.com/?webhook-test=true`
- **Debug Panel**: `https://your-site.com/?debug=true`
- **Make.com Webhook URL**: `https://hook.us2.make.com/wusgmbryj3mz01ngwmm12ip93a9k4p7b`

---

## Support

If you still don't see the insurance fields after following these steps:

1. Check the browser console for errors
2. Verify your Make.com webhook is receiving data (check the scenario history)
3. Try deactivating and reactivating your Make.com scenario
4. Ensure your Google Sheets has the column headers created

The backend is correctly sending the insurance fields - the issue is usually in the Make.com mapping configuration.
