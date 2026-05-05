# 🔧 Fix Google Sheets quote_id Mapping in Make.com

## ✅ Good News!
Your webhook is receiving the `quote_id` field correctly! The debug panel shows:
```
quote_id: "EXP-20251029-256"
```

## ❌ The Problem
The Google Sheets module isn't mapped to use this field yet.

---

## 🎯 Step-by-Step Fix:

### Step 1: Open the Google Sheets Module
1. In Make.com, click on the **Google Sheets** module (the one after the webhook)
2. You should see the mapping interface

### Step 2: Map quote_id to Column A
1. Look for the field labeled **"quote_id (A)"**
2. Click on it (it currently says "Enter text or type '/' to search")
3. You should see a dropdown with all webhook fields
4. Select **"1. quote_id"** from the list
5. It should now show: `{{1.quote_id}}`

### Step 3: Verify ALL Mappings
Make sure EVERY field is mapped. Here's the complete mapping:

```
Column A (quote_id) → 1. quote_id
Column B (business_name) → 1. business_name  
Column C (contact_name) → 1. contact_name
Column D (email) → 1. email
Column E (phone) → 1. phone
Column F (shipment_type) → 1. shipment_type
Column G (origin) → 1. origin
Column H (destination) → 1. destination
Column I (port_or_airport_departure) → 1. port_or_airport_departure
Column J (port_or_airport_arrival) → 1. port_or_airport_arrival
Column K (cargo_type) → 1. cargo_type
Column L (merchandise_description) → 1. merchandise_description
Column M (company) → 1. company
Column N (quantity) → 1. quantity
Column O (dimensions) → 1. dimensions
Column P (weight) → 1. weight
Column Q (is_dangerous) → 1. is_dangerous
Column R (timestamp) → 1. timestamp
```

### Step 4: Save the Scenario
1. Click **"Save"** button (bottom right)
2. The scenario will save your new mappings

### Step 5: Test Again
1. Go back to Figma Make
2. Click the **"🔧 Debug"** button
3. Click **"Test (18 Fields)"**
4. Wait 5-10 seconds
5. Refresh your Google Sheet
6. You should now see the quote_id in column A!

---

## 🔍 How to Check If It Worked:

After testing, your Google Sheet should show:
- **Column A**: EXP-20251029-XXX (the quote ID)
- **Column B**: DEBUG TEST 21:25:12 (or similar)
- **Column C**: Debug Panel Test User
- And so on...

---

## 🚨 Troubleshooting

### "I don't see quote_id in the dropdown"
**Solution**: 
1. Close the Google Sheets module
2. Click on the **Webhook** module
3. Click **"Re-determine data structure"**
4. Go back to Figma Make and click **"Test (18 Fields)"** again
5. Go back to Make.com - now the quote_id field should appear

### "The field is mapped but still empty in the sheet"
**Solution**:
1. Make sure you clicked **"Save"** in Make.com
2. Make sure the scenario is **"On"** (toggle at bottom left)
3. Send another test from the debug panel
4. Check Make.com History - click on the execution → click Google Sheets module → verify the data being sent

### "Status 200 but nothing in sheet"
**Solution**:
1. This means the webhook works but the Google Sheets module has an issue
2. Check the scenario execution in Make.com History
3. Click on the Google Sheets module in the history
4. Look for error messages
5. Common issues:
   - Wrong spreadsheet selected
   - Wrong sheet name (should be "Tabla 1" based on your screenshot)
   - Missing permissions

---

## 📸 Visual Reference

Looking at your screenshot, I can see:
- ✅ Webhook is working (received quote_id)
- ✅ Data is being sent to Make.com
- ❌ Google Sheets field "quote_id (A)" shows "Enter text or type '/' to search"
- ❌ This means it's NOT mapped yet

**You need to click on that field and select "1. quote_id" from the dropdown!**

---

## 💡 Quick Tip

If you're mapping many fields, you can use the **"Map"** button at the top of the Google Sheets module to quickly map all fields at once. But for now, just make sure `quote_id` is mapped to column A.

---

**Last Updated**: October 29, 2025  
**Status**: Debug panel working ✅ | Webhook receiving data ✅ | Needs mapping fix ❌
