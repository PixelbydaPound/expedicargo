# Insurance Fields Integration Guide

## 📋 Overview
This guide explains how to add the new insurance fields to your Google Sheets and map them in Make.com for the Expedicargo quote automation flow.

---

## ✅ Backend Implementation (COMPLETED)

The backend has been updated to include insurance fields in all relevant endpoints:

### 1. **Fields Added to Supabase KV Store**
- `needs_insurance` - Yes/No value indicating if insurance is requested
- `insurance_value` - USD value of the merchandise (only when insurance is needed)

### 2. **Updated Endpoints**
- ✅ POST `/make-server-b5281c63/quotes` - Stores insurance fields in Supabase
- ✅ POST `/make-server-b5281c63/sync-quotes` - Sends insurance fields to Make.com webhook
- ✅ POST `/make-server-b5281c63/test-webhook` - Includes insurance in test data

---

## 📊 STEP 1: Add Columns to Google Sheets

Add these two new columns to your Google Sheets quote tracking spreadsheet:

### Column Headers (suggested order):
1. Quote ID
2. Business Name
3. Contact Name
4. Email
5. Phone
6. Shipment Type
7. Origin
8. Destination
9. Port/Airport Departure
10. Port/Airport Arrival
11. Cargo Type
12. Merchandise Description
13. Quantity
14. Dimensions
15. Weight
16. Is Dangerous
17. **Needs Insurance** ⬅️ NEW COLUMN
18. **Insurance Value (USD)** ⬅️ NEW COLUMN
19. Timestamp

### Data Format Examples:
- **Needs Insurance**: `Yes` or `No`
- **Insurance Value (USD)**: `25000` or `50000.50` or *(empty if insurance not needed)*

---

## 🔧 STEP 2: Update Make.com Webhook Mapping

### Access Your Make.com Scenario:
1. Go to https://make.com
2. Open your Expedicargo quote webhook scenario
3. Find the **Google Sheets "Add a Row"** module

### Add the New Field Mappings:

#### Field Mapping for "Needs Insurance" Column:
```
Column: Needs Insurance
Mapped Value: {{needs_insurance}}
```

#### Field Mapping for "Insurance Value (USD)" Column:
```
Column: Insurance Value (USD)
Mapped Value: {{insurance_value}}
```

### Complete Field Mapping Reference:
Here's the full mapping for all fields (including the new ones):

| Google Sheets Column | Make.com Webhook Field |
|---------------------|----------------------|
| Quote ID | `{{quote_id}}` |
| Business Name | `{{business_name}}` |
| Contact Name | `{{contact_name}}` |
| Email | `{{email}}` |
| Phone | `{{phone}}` |
| Shipment Type | `{{shipment_type}}` |
| Origin | `{{origin}}` |
| Destination | `{{destination}}` |
| Port/Airport Departure | `{{port_or_airport_departure}}` |
| Port/Airport Arrival | `{{port_or_airport_arrival}}` |
| Cargo Type | `{{cargo_type}}` |
| Merchandise Description | `{{merchandise_description}}` |
| Quantity | `{{quantity}}` |
| Dimensions | `{{dimensions}}` |
| Weight | `{{weight}}` |
| Is Dangerous | `{{is_dangerous}}` |
| **Needs Insurance** | **`{{needs_insurance}}`** ⬅️ NEW |
| **Insurance Value (USD)** | **`{{insurance_value}}`** ⬅️ NEW |
| Timestamp | `{{timestamp}}` |

---

## 🧪 STEP 3: Test the Integration

### Test Method 1: Using the Test Webhook Endpoint
1. Open your browser console or use a tool like Postman
2. Send a POST request to test the webhook:

```javascript
fetch('https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-b5281c63/test-webhook', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_ANON_KEY',
    'Content-Type': 'application/json'
  }
})
.then(r => r.json())
.then(data => console.log(data));
```

This will send test data including:
- `needs_insurance: "Yes"`
- `insurance_value: "25000"`

### Test Method 2: Submit a Real Quote
1. Go to your Expedicargo website
2. Fill out the quote form
3. Select "Yes" for "¿Necesita seguro?"
4. Enter a value like `10000` in the insurance field
5. Submit the form
6. Check your Google Sheets to verify the data appears correctly

---

## 📝 How Insurance Data Flows

```mermaid
Frontend (QuoteModal)
    ↓
    Sends: needs_insurance, insurance_value
    ↓
Backend (Supabase Edge Function)
    ↓
    Stores in KV Store
    ↓
Make.com Webhook
    ↓
    Maps to Google Sheets columns
    ↓
Google Sheets
    ✅ Data Recorded
```

---

## 🔍 Data Examples

### Example 1: Customer Needs Insurance
```json
{
  "needs_insurance": "Yes",
  "insurance_value": "50000"
}
```
**Google Sheets Result:**
- Needs Insurance: `Yes`
- Insurance Value (USD): `50000`

### Example 2: Customer Doesn't Need Insurance
```json
{
  "needs_insurance": "No",
  "insurance_value": ""
}
```
**Google Sheets Result:**
- Needs Insurance: `No`
- Insurance Value (USD): *(empty)*

---

## ✨ Frontend Behavior

The quote form already has proper insurance field logic:

1. **Radio Button Question**: "¿Necesita seguro de carga? / Do you need cargo insurance?"
   - Options: Yes / No

2. **Conditional Field**: When "Yes" is selected:
   - Shows input field for "Valor de la mercancía (USD) / Merchandise value (USD)"
   - Required field with numeric validation
   - Minimum value: 1
   - Step: 0.01 (allows decimals)

3. **Data Validation**:
   - If "No" is selected: Only `needs_insurance` is sent
   - If "Yes" is selected: Both `needs_insurance` and `insurance_value` are sent

---

## 🚨 Troubleshooting

### Issue: Insurance fields not appearing in Google Sheets
**Solution:**
1. Verify the columns exist in your Google Sheet
2. Check Make.com field mapping includes `{{needs_insurance}}` and `{{insurance_value}}`
3. Test with the test webhook endpoint first

### Issue: Insurance value showing as "undefined" or "null"
**Solution:**
1. Ensure the mapping uses `{{insurance_value}}` not `insurance_value`
2. Check that the column name in Google Sheets exactly matches your mapping

### Issue: Old quotes don't have insurance data
**Solution:**
- This is expected. Only new quotes submitted after this update will include insurance fields
- Old quotes will show empty values for insurance columns

---

## 📊 Verification Checklist

- [ ] Added "Needs Insurance" column to Google Sheets
- [ ] Added "Insurance Value (USD)" column to Google Sheets
- [ ] Updated Make.com webhook mapping with `{{needs_insurance}}`
- [ ] Updated Make.com webhook mapping with `{{insurance_value}}`
- [ ] Tested with test webhook endpoint
- [ ] Submitted a test quote with insurance = Yes
- [ ] Submitted a test quote with insurance = No
- [ ] Verified data appears correctly in Google Sheets
- [ ] Checked that existing workflow still works for other fields

---

## 🎯 Summary

**What You Need to Do:**
1. ✅ Add 2 new columns to your Google Sheets
2. ✅ Map 2 new fields in Make.com webhook module
3. ✅ Test the integration

**What's Already Done:**
- ✅ Backend updated to store insurance fields in Supabase
- ✅ Backend updated to send insurance fields to Make.com
- ✅ Frontend already collects insurance data from users
- ✅ Test endpoint includes sample insurance data

The backend is fully ready and waiting for your Google Sheets and Make.com configuration! 🚀
