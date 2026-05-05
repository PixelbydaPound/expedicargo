# 📧 Email Template - Quick Setup (2 Minutes)

## 🚀 Super Fast Setup

### Step 1: Copy the Template (30 seconds)
1. Open `/docs/EMAIL_TEMPLATE_MAKE_READY.html`
2. Press `Ctrl+A` (select all)
3. Press `Ctrl+C` (copy)

### Step 2: Paste into Make.com (30 seconds)
1. Open your Make.com scenario
2. Find the **Gmail - Send an Email** module
3. Click **Content Type** → Select **HTML**
4. Click in the **Content** field
5. Press `Ctrl+V` (paste)

### Step 3: Configure Email Settings (60 seconds)
```
To:      {{1.email}}
Subject: ✅ Cotización {{1.quote_id}} Recibida | Quote Received - Expedicargo
From:    Expedicargo <noreply@expedicargo.com>
```

### Step 4: Save & Test ✅
Done! The template has built-in conditional logic for insurance and dangerous goods.

---

## 📋 What's Included

✅ **All 20 Fields** from Phase One
- Contact info (name, email, phone, company)
- Shipment details (type, origin, destination, ports/airports)
- Cargo details (type, description, packaging, quantity, dimensions, weight)
- **Insurance fields** (needs_insurance, insurance_value)
- Dangerous goods flag
- Quote ID and timestamp

✅ **Smart Conditional Logic**
- Insurance section appears only when `needs_insurance = "Yes"`
- Danger alert appears only when `is_dangerous = "Yes"`

✅ **Professional Design**
- Gradient blue header
- Clean sections with icons
- Color-coded alerts (yellow for insurance, red for danger)
- Mobile-responsive
- Bilingual (Spanish/English)

✅ **Call-to-Actions**
- Calendly booking button
- Instagram link
- Contact email link

---

## 🎯 Three Templates Available

### 1. **EMAIL_TEMPLATE_MAKE_READY.html** ⭐ RECOMMENDED
- **Use this one!**
- Has conditional logic built-in using Make.com `if()` functions
- Copy and paste directly into Make.com
- No additional setup needed

### 2. **EMAIL_TEMPLATE_HTML.html**
- Basic version with placeholder conditionals
- Requires manual setup of Router or filters in Make.com
- For advanced users who want full control

### 3. **MAKE_EMAIL_TEMPLATE_SETUP.md**
- Complete documentation
- Explains all fields and setup options
- Troubleshooting guide

---

## 🧪 Test Checklist

After pasting the template, test with:

- [ ] Quote with insurance = **Yes**, value = **10000**
  - Email should show yellow insurance box with $10000
  
- [ ] Quote with insurance = **No**
  - Email should NOT show insurance box
  
- [ ] Quote with dangerous goods = **Yes**
  - Email should show red danger alert
  
- [ ] Quote with dangerous goods = **No**
  - Email should NOT show danger alert
  
- [ ] All other fields populate correctly
- [ ] Calendly link works
- [ ] Instagram link works
- [ ] Email displays correctly on mobile

---

## 📊 Field Mapping Reference

All fields auto-map from your webhook. The template uses:

| Template Variable | Webhook Field | Example Value |
|------------------|---------------|---------------|
| `{{1.quote_id}}` | quote_id | EXP-20241030-123 |
| `{{1.contact_name}}` | contact_name | John Doe |
| `{{1.email}}` | email | john@company.com |
| `{{1.business_name}}` | business_name | ABC Logistics |
| `{{1.phone}}` | phone | +1-555-1234 |
| `{{1.shipment_type}}` | shipment_type | Sea Freight |
| `{{1.origin}}` | origin | Los Angeles, CA |
| `{{1.destination}}` | destination | Barcelona, Spain |
| `{{1.port_or_airport_departure}}` | port_or_airport_departure | Port of LA (USLAX) |
| `{{1.port_or_airport_arrival}}` | port_or_airport_arrival | Port of Barcelona (ESBCN) |
| `{{1.cargo_type}}` | cargo_type | Electronics |
| `{{1.merchandise_description}}` | merchandise_description | Laptops and monitors |
| `{{1.packaging_type}}` | packaging_type | 20' Container |
| `{{1.quantity}}` | quantity | 5 20' Container |
| `{{1.dimensions}}` | dimensions | 589cm x 235cm x 239cm |
| `{{1.weight}}` | weight | 28000 kg |
| `{{1.is_dangerous}}` | is_dangerous | Yes / No |
| `{{1.needs_insurance}}` | needs_insurance | Yes / No |
| `{{1.insurance_value}}` | insurance_value | 25000 |
| `{{1.timestamp}}` | timestamp | 2024-10-30T15:30:00Z |

---

## ⚡ Pro Tips

### Conditional Logic Explained
The template uses Make.com's `if()` function:

```
{{if(condition; "value if true"; "value if false")}}
```

**Example 1 - Insurance Section:**
```
{{if(1.needs_insurance = "Yes"; "<div>SHOW INSURANCE BOX</div>"; "")}}
```
- If `needs_insurance` = "Yes" → Show insurance box
- If `needs_insurance` = "No" → Show nothing (empty string)

**Example 2 - Danger Alert:**
```
{{if(1.is_dangerous = "Yes"; "<div>SHOW DANGER ALERT</div>"; "")}}
```

### Date Formatting
The template formats the timestamp:
```
{{formatDate(1.timestamp; "DD/MM/YYYY HH:mm")}}
```

Change the format if you prefer:
- `"MM/DD/YYYY"` → 10/30/2024
- `"DD-MMM-YYYY"` → 30-Oct-2024
- `"YYYY-MM-DD HH:mm:ss"` → 2024-10-30 15:30:00

---

## 🎨 Customization

### Change Colors
Find and replace these hex codes:

| Element | Current Color | Hex Code |
|---------|--------------|----------|
| Primary Blue | ![#2563eb](https://via.placeholder.com/15/2563eb/000000?text=+) | `#2563eb` |
| Darker Blue | ![#1d4ed8](https://via.placeholder.com/15/1d4ed8/000000?text=+) | `#1d4ed8` |
| Success Green | ![#10b981](https://via.placeholder.com/15/10b981/000000?text=+) | `#10b981` |
| Warning Yellow | ![#f59e0b](https://via.placeholder.com/15/f59e0b/000000?text=+) | `#f59e0b` |
| Danger Red | ![#ef4444](https://via.placeholder.com/15/ef4444/000000?text=+) | `#ef4444` |

### Update Calendly Link
Find (around line 182):
```html
<a href="https://calendly.com/e-gonzalez-expedicargo/30min" class="button">
```

Replace with your Calendly URL.

### Update Contact Email
Find all instances of:
```
e.gonzalez@expedicargo.com
```

Replace with your actual contact email.

---

## 🚨 Common Issues

### Issue: Email shows raw HTML code
**Fix:** Make sure Content Type is set to **HTML** not **Plain Text**

### Issue: Conditional sections don't work
**Fix:** Make.com syntax is sensitive. Ensure:
- No extra spaces in `{{if(1.field_name = "Yes"; ...)}}`
- Values are exactly "Yes" or "No" (case-sensitive)
- Quotes are straight `"` not curly `""`

### Issue: Fields show `{{1.field_name}}` instead of values
**Fix:** 
1. Webhook must be connected and receiving data
2. Click "Re-determine data structure" on webhook
3. Make sure Gmail module is **after** webhook in the flow

### Issue: Insurance value shows without dollar sign
**Fix:** The template includes `${{1.insurance_value}} USD`
If you see just the number, check line ~160 for the insurance section.

---

## ✅ Final Checklist

- [ ] Copied HTML from `EMAIL_TEMPLATE_MAKE_READY.html`
- [ ] Set Gmail Content Type to HTML
- [ ] Pasted template into Content field
- [ ] Set To: `{{1.email}}`
- [ ] Set Subject with `{{1.quote_id}}`
- [ ] Set From Name: Expedicargo
- [ ] Saved Make.com scenario
- [ ] Sent test quote with insurance = Yes
- [ ] Verified insurance box appears in email
- [ ] Sent test quote with insurance = No
- [ ] Verified insurance box does NOT appear
- [ ] Checked all fields populate correctly
- [ ] Tested Calendly link
- [ ] Tested Instagram link
- [ ] Verified email looks good on mobile

---

**🎉 You're Done!** Your automated quote confirmation emails are now fully configured with all Phase One fields including insurance!

**Estimated setup time:** 2 minutes  
**Difficulty:** ⭐ Easy (copy & paste)  
**Template version:** 2.0 (Phase One Complete)
