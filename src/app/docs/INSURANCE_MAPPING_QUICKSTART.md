# 🚀 Insurance Fields Mapping - Quick Start Guide

## What Changed
Two new insurance fields have been added to the quote form:
1. **`needs_insurance`** - "Yes" or "No"
2. **`insurance_value`** - USD dollar amount (e.g., "25000")

## ✅ Backend Status
✅ **COMPLETE** - The backend is fully configured and sending insurance data

## 📋 Your To-Do: Update Make.com Mapping

### Step 1: Send Test Data to Make.com

Choose **ONE** of these methods:

#### **Method A: Use the Debug Panel** (Easiest)
1. Go to your site and add `?debug=true` to the URL
   - Example: `https://your-site.com/?debug=true`
2. Click the **"Test (18 Fields)"** button
3. This sends test data including insurance fields to Make.com

#### **Method B: Use the Webhook Test Tool** (Alternative)
1. Go to your site and add `?webhook-test=true` to the URL
   - Example: `https://your-site.com/?webhook-test=true`
2. Click **"Send Test Webhook"**
3. Wait for success confirmation

### Step 2: Refresh Make.com Data Structure

1. Open your Make.com scenario
2. Click on the **"Webhooks - Custom webhook"** module
3. Click **"Re-determine data structure"** button
4. Make.com will now detect the new insurance fields

### Step 3: Add Columns to Google Sheets

Add these two new columns (suggested placement after column Q "Is Dangerous"):

| Column | Header Name |
|--------|------------|
| R | Needs Insurance |
| S | Insurance Value (USD) |
| T | Timestamp |

### Step 4: Map Fields in Make.com

1. In your Make.com scenario, click the **"Google Sheets - Add a Row"** module
2. Find the new insurance columns and map them:

| Google Sheet Column | Make.com Webhook Field |
|--------------------|----------------------|
| Needs Insurance (R) | Select from dropdown: **`1. needs_insurance`** |
| Insurance Value (USD) (S) | Select from dropdown: **`1. insurance_value`** |

**IMPORTANT:** Don't type the field names - **select them from the dropdown list**

### Step 5: Save & Test

1. **Save** your Make.com scenario
2. Go to your website and submit a test quote with:
   - Insurance = **Yes**
   - Insurance Value = **10000**
3. Check Google Sheets - you should see:
   - Column R: "Yes"
   - Column S: "10000"

---

## 🎯 Expected Make.com Field List

After refreshing data structure, you should see these fields in the webhook dropdown:

```
1. quote_id
1. business_name
1. contact_name
1. email
1. phone
1. shipment_type
1. origin
1. destination
1. port_or_airport_departure
1. port_or_airport_arrival
1. cargo_type
1. merchandise_description
1. company
1. quantity
1. dimensions
1. weight
1. is_dangerous
1. needs_insurance        ← NEW
1. insurance_value        ← NEW
1. timestamp
```

---

## 🔍 Troubleshooting

### ❌ Problem: I don't see `needs_insurance` or `insurance_value` in Make.com

**Solution:**
1. Send test data again using Method A or B above
2. In Make.com, click **"Re-determine data structure"** on the webhook module
3. Or click **"Run once"** to capture live data
4. Check that your Make.com scenario is **Active** (not paused)

### ❌ Problem: Fields are blank in Google Sheets

**Possible causes:**
1. You typed the field names instead of selecting from dropdown
2. Column names in Google Sheets don't match exactly
3. Old test data doesn't have insurance values (only NEW quotes will)

**Solution:**
1. In Make.com, **delete** the current field mapping
2. Re-select the field from the **dropdown menu** (don't type it)
3. Make sure you see "1. needs_insurance" in the dropdown
4. Submit a new test quote to verify

### ❌ Problem: Test data created a row with "test@example.com"

**Solution:**
- This is **expected behavior**
- The test creates a sample row so Make.com can detect the fields
- Simply **delete this test row** from your Google Sheet
- Future real customer quotes will have real emails

---

## 📊 Complete Field Mapping Reference

Here's the full mapping for all 20 fields:

| # | Column Header | Make.com Field |
|---|--------------|----------------|
| A | Quote ID | `1. quote_id` |
| B | Business Name | `1. business_name` |
| C | Contact Name | `1. contact_name` |
| D | Email | `1. email` |
| E | Phone | `1. phone` |
| F | Shipment Type | `1. shipment_type` |
| G | Origin | `1. origin` |
| H | Destination | `1. destination` |
| I | Port/Airport Departure | `1. port_or_airport_departure` |
| J | Port/Airport Arrival | `1. port_or_airport_arrival` |
| K | Cargo Type | `1. cargo_type` |
| L | Merchandise Description | `1. merchandise_description` |
| M | Company | `1. company` |
| N | Quantity | `1. quantity` |
| O | Dimensions | `1. dimensions` |
| P | Weight | `1. weight` |
| Q | Is Dangerous | `1. is_dangerous` |
| **R** | **Needs Insurance** | **`1. needs_insurance`** ← NEW |
| **S** | **Insurance Value (USD)** | **`1. insurance_value`** ← NEW |
| T | Timestamp | `1. timestamp` |

---

## ✅ Final Checklist

- [ ] Sent test data to Make.com (Method A or B)
- [ ] Clicked "Re-determine data structure" in Make.com webhook module
- [ ] Added "Needs Insurance" column to Google Sheets (column R)
- [ ] Added "Insurance Value (USD)" column to Google Sheets (column S)
- [ ] Mapped `1. needs_insurance` to column R in Make.com
- [ ] Mapped `1. insurance_value` to column S in Make.com
- [ ] Saved Make.com scenario
- [ ] Submitted test quote with Insurance = Yes
- [ ] Verified insurance data appears in Google Sheets
- [ ] Deleted test row with test@example.com email

---

## 🎉 You're Done!

Once you complete these steps, all future quote submissions will automatically include insurance data in your Google Sheets. The backend handles everything else automatically!

**Questions?** Check the browser console (F12) when submitting a quote to see detailed logs of the data being sent.
