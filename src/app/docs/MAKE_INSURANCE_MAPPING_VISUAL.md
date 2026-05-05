# 🎯 Make.com Insurance Mapping - Visual Step-by-Step

## ✅ Good News!
Based on your screenshots, the insurance fields **ARE ALREADY AVAILABLE** in Make.com. You just need to map them!

---

## 📍 Step-by-Step Mapping Instructions

### Step 1: Locate the Fields in Make.com

In your second screenshot, I can see the webhook bundle shows all available fields. You should see:
- `needs_insurance`
- `insurance_value`

These are in the list on the left side of the mapping panel.

### Step 2: Map "Needs Insurance" Column

1. **In Make.com**, find the row for column **N** (or wherever you placed "Needs Insurance")
2. **Click inside the input field** for that column
3. **In the dropdown/search that appears**, look for the webhook icon
4. **Click on** `1. needs_insurance` (it should be in the Webhooks bundle)
5. You should see a pink/red tag appear that says `1. needs_insurance`

**What to click:**
```
Column: needs_insurance (N)
Value field → Click → See dropdown list → Click "1. needs_insurance"
```

### Step 3: Map "Insurance Value (USD)" Column

1. **In Make.com**, find the row for column **O** (or wherever you placed "Insurance Value (USD)")
2. **Click inside the input field** for that column
3. **In the dropdown/search that appears**, look for the webhook icon  
4. **Click on** `1. insurance_value` (it should be in the Webhooks bundle)
5. You should see a pink/red tag appear that says `1. insurance_value`

**What to click:**
```
Column: insurance_value (O)
Value field → Click → See dropdown list → Click "1. insurance_value"
```

---

## 🔍 Troubleshooting Your Current Setup

Looking at your first screenshot (Google Sheets), I can see:
- ✅ `needs_insurance` column exists
- ✅ `insurance_value` column exists  
- ⚠️ But the values appear **empty** or show old data

This means the mapping is not yet connected. Here's how to fix it:

### Fix 1: Clear and Re-Map

1. In Make.com, click the **input field** for `needs_insurance (N)`
2. If there's any text there, **delete it**
3. Click the field again to open the dropdown
4. From the dropdown list, select `1. needs_insurance` (NOT just typing it)

Repeat for `insurance_value (O)`.

### Fix 2: Verify Mapping Visual

When correctly mapped, you should see:
```
needs_insurance (N):  [1. needs_insurance]  ← Pink/red tag
insurance_value (O):  [1. insurance_value]  ← Pink/red tag
```

**NOT:**
```
needs_insurance (N):  needs_insurance  ← Plain text (WRONG)
insurance_value (O):  insurance_value  ← Plain text (WRONG)
```

---

## 🎬 How to Use the Dropdown Selector

Based on your screenshot showing the search field:

1. **Click inside the column value field** (where it says "Enter text or type '/' to search")
2. **Type `/`** or just **start typing** `needs` or `insurance`
3. **A dropdown menu will appear** showing available fields
4. **Look for the webhook icon** (🔗 or similar) next to the field
5. **Click on** `1. needs_insurance` or `1. insurance_value`
6. **A colored tag should appear** instead of plain text

---

## 🧪 Test After Mapping

1. **Save your Make.com scenario**
2. **Submit a new test quote** from your website with:
   - ✅ "Do you need insurance?" → Select **Yes**
   - ✅ "Insurance Value" → Enter **10000**
3. **Check Google Sheets** - you should see:
   - Column N: `Yes`
   - Column O: `10000`

---

## 📊 Expected Data Flow

```
Website Form:
  User selects "Yes" for insurance
  User enters "10000" for value
         ↓
Frontend sends to Make.com webhook:
  {
    "needs_insurance": "Yes",
    "insurance_value": "10000"
  }
         ↓
Make.com receives data:
  1. needs_insurance = "Yes"
  1. insurance_value = "10000"
         ↓
Make.com maps to Google Sheets:
  Column N ← 1. needs_insurance ← "Yes"
  Column O ← 1. insurance_value ← "10000"
         ↓
Google Sheets row created:
  | ... | Yes | 10000 | ... |
```

---

## 🚨 Common Mistakes

### ❌ Mistake 1: Typing the field name
```
Column value: needs_insurance  ← Typed as plain text (WRONG)
```
**Fix:** Delete the text and **select from dropdown** instead

### ❌ Mistake 2: Using the wrong source
```
Column value: [Some other module].needs_insurance  ← Wrong source (WRONG)
```
**Fix:** Make sure you're selecting from the **Webhooks - Custom webhook [bundle]** source

### ❌ Mistake 3: Spelling mismatch
```
Column value: 1. need_insurance  ← Missing 's' (WRONG)
```
**Fix:** Use the exact field name: `1. needs_insurance` (with 's')

---

## 🎯 Quick Reference: Field Names

Use these **EXACT** field names when selecting from dropdown:

| Google Sheets Column | Make.com Field to Select | Data Type |
|---------------------|-------------------------|-----------|
| needs_insurance (N) | `1. needs_insurance` | Text: "Yes" or "No" |
| insurance_value (O) | `1. insurance_value` | Number: "10000" or "" |

---

## 🔄 If Fields Are Still Not Showing

1. **Run the debug test again:**
   - Go to `your-site.com/?debug=true`
   - Click **"Test (18 Fields)"** button
   - This will send fresh data to Make.com

2. **In Make.com:**
   - Click the **Webhooks - Custom webhook** module
   - Click **"Re-determine data structure"**
   - Or click **"Run once"** to capture new data

3. **Check the webhook data structure:**
   - In the Webhooks module, you should see all 20 fields
   - Including `needs_insurance` and `insurance_value`

---

## ✅ Success Checklist

- [ ] Opened Make.com scenario
- [ ] Found Google Sheets "Add a Row" module
- [ ] Located `needs_insurance (N)` mapping row
- [ ] Clicked inside the value field
- [ ] Selected `1. needs_insurance` from **dropdown** (not typed)
- [ ] Saw pink/red tag appear with `1. needs_insurance`
- [ ] Located `insurance_value (O)` mapping row  
- [ ] Clicked inside the value field
- [ ] Selected `1. insurance_value` from **dropdown** (not typed)
- [ ] Saw pink/red tag appear with `1. insurance_value`
- [ ] Saved Make.com scenario
- [ ] Submitted test quote with insurance = Yes
- [ ] Verified data appears in Google Sheets

---

## 🎥 What Your Screen Should Look Like

### Before Mapping:
```
Column: needs_insurance (N)
Value: [empty field] or [plain text]
```

### During Mapping (Dropdown Open):
```
Column: needs_insurance (N)
Value: [Search field with dropdown showing]:
       → 1. quote_id
       → 1. business_name
       → 1. contact_name
       → ...
       → 1. is_dangerous
       → 1. needs_insurance  ← CLICK THIS
       → 1. insurance_value
       → 1. timestamp
```

### After Mapping (Correct):
```
Column: needs_insurance (N)
Value: [1. needs_insurance] ← Pink/red tag
```

---

## 💡 Pro Tip

When you click inside a mapping field in Make.com, you can:
- Press **/** to open the field selector
- Type to search (e.g., type "insurance" to filter)
- Use arrow keys to navigate
- Press Enter to select

This makes it faster to find the exact field you need!

---

## 📞 Still Having Issues?

If the fields are still not mapping:
1. Take a screenshot of your Make.com Google Sheets module showing all column mappings
2. Check the browser console (F12) when submitting a quote to see the exact data being sent
3. Verify the webhook URL in Make.com matches: `https://hook.us2.make.com/wusgmbryj3mz01ngwmm12ip93a9k4p7b`

The data IS being sent correctly from the frontend - the issue is just in the Make.com mapping configuration.
