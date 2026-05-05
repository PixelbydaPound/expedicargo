# 📧 Make.com Email Template Setup Guide

## Updated HTML Email Template

The new email template includes **ALL Phase One fields** including:
- ✅ Insurance fields (`needs_insurance`, `insurance_value`)
- ✅ Packaging type (`packaging_type`)
- ✅ Port/Airport details with codes
- ✅ Dangerous goods alert
- ✅ Complete cargo dimensions
- ✅ Instagram link
- ✅ Removed "INC" from company name

---

## 📋 Template Location

The complete HTML template is saved at:
```
/docs/EMAIL_TEMPLATE_HTML.html
```

---

## 🔧 Make.com Setup Instructions

### Step 1: Copy the HTML Template

1. Open `/docs/EMAIL_TEMPLATE_HTML.html`
2. Copy the **entire HTML code**
3. Go to your Make.com scenario

### Step 2: Configure Gmail Module

1. Find your **Gmail - Send an Email** module
2. In the **Content** field, select **HTML** (not Plain Text)
3. Paste the entire HTML template
4. The template already has all the `{{1.fieldname}}` placeholders

### Step 3: Map the Fields

Make.com should automatically detect these fields from your webhook:

| Field in Template | Make.com Webhook Field | Description |
|------------------|----------------------|-------------|
| `{{1.quote_id}}` | `1. quote_id` | Unique quote identifier |
| `{{1.business_name}}` | `1. business_name` | Company name |
| `{{1.contact_name}}` | `1. contact_name` | Contact person |
| `{{1.email}}` | `1. email` | Contact email |
| `{{1.phone}}` | `1. phone` | Contact phone |
| `{{1.shipment_type}}` | `1. shipment_type` | Sea/Air/Ground |
| `{{1.origin}}` | `1. origin` | Origin location |
| `{{1.destination}}` | `1. destination` | Destination location |
| `{{1.port_or_airport_departure}}` | `1. port_or_airport_departure` | Departure port/airport |
| `{{1.port_or_airport_arrival}}` | `1. port_or_airport_arrival` | Arrival port/airport |
| `{{1.cargo_type}}` | `1. cargo_type` | Cargo description |
| `{{1.merchandise_description}}` | `1. merchandise_description` | Detailed description |
| `{{1.packaging_type}}` | `1. packaging_type` | Container/pallet type |
| `{{1.quantity}}` | `1. quantity` | Amount with units |
| `{{1.dimensions}}` | `1. dimensions` | H x W x L in cm |
| `{{1.weight}}` | `1. weight` | Weight in kg |
| `{{1.is_dangerous}}` | `1. is_dangerous` | "Yes" or "No" |
| `{{1.needs_insurance}}` | `1. needs_insurance` | "Yes" or "No" |
| `{{1.insurance_value}}` | `1. insurance_value` | USD amount |
| `{{1.timestamp}}` | `1. timestamp` | Submission date/time |

---

## ⚠️ Important: Conditional Sections

The template includes two **conditional sections** that should only show when relevant:

### 1. Dangerous Goods Alert
Shows when `is_dangerous = "Yes"`

**Current HTML:**
```html
<div class="danger-alert" style="display: {{1.is_dangerous}};">
```

**Make.com Fix:**
You have two options:

#### **Option A: Use Router (Recommended)**
1. Add a **Router** module after the webhook
2. Create two routes:
   - **Route 1 (Dangerous):** Filter `is_dangerous = "Yes"` → Send email with danger alert
   - **Route 2 (Normal):** Filter `is_dangerous = "No"` → Send email without danger alert

#### **Option B: Use Text Function**
Replace `style="display: {{1.is_dangerous}};"` with:
```
style="display: {{if(1.is_dangerous = "Yes"; "block"; "none")}};"
```

### 2. Insurance Highlight Section
Shows when `needs_insurance = "Yes"`

**Current HTML:**
```html
<div class="insurance-highlight" style="display: {{1.needs_insurance}};">
```

**Make.com Fix:**
Same as above, use Option A (Router) or Option B (Text Function):
```
style="display: {{if(1.needs_insurance = "Yes"; "block"; "none")}};"
```

---

## 🎨 Advanced: Single Template with Conditionals

If you want **one template** that handles all scenarios, replace the conditional divs:

### Dangerous Goods Section (Line ~150-158)
**Replace:**
```html
<div class="danger-alert" style="display: {{1.is_dangerous}};">
```

**With:**
```html
<div class="danger-alert" style="display: {{if(1.is_dangerous = "Yes"; "block"; "none")}};">
```

### Insurance Section (Line ~160-175)
**Replace:**
```html
<div class="insurance-highlight" style="display: {{1.needs_insurance}};">
```

**With:**
```html
<div class="insurance-highlight" style="display: {{if(1.needs_insurance = "Yes"; "block"; "none")}};">
```

---

## 📧 Gmail Module Configuration

### To (Recipient)
```
{{1.email}}
```

### Subject (Spanish/English)
```
✅ Cotización {{1.quote_id}} Recibida | Quote Received - Expedicargo
```

OR (Dynamic based on language - requires additional setup):
```
{{if(1.language = "es"; "✅ Cotización Recibida - " + 1.quote_id; "✅ Quote Received - " + 1.quote_id)}} - Expedicargo
```

### From Name
```
Expedicargo
```

### From Email
```
noreply@expedicargo.com
```
(Or your configured Gmail/no-reply address)

### Content Type
```
HTML
```
**Important:** Must be HTML, not Plain Text

### Content (Body)
Paste the entire HTML template from `/docs/EMAIL_TEMPLATE_HTML.html`

---

## 🧪 Testing the Email

### Step 1: Send Test Quote
1. Go to your website
2. Fill out the quote form completely
3. Select **"Yes"** for insurance
4. Select **"No"** for dangerous goods
5. Submit the form

### Step 2: Check Email
You should receive an email with:
- ✅ All fields populated
- ✅ Insurance section showing with the value
- ✅ Dangerous goods section hidden
- ✅ Proper formatting and styling
- ✅ Working Calendly link
- ✅ Instagram link

### Step 3: Test Dangerous Goods
1. Submit another test quote
2. Select **"Yes"** for dangerous goods
3. Check that the red danger alert appears

### Step 4: Test No Insurance
1. Submit a test quote
2. Select **"No"** for insurance
3. Check that the insurance section is hidden

---

## 🔍 Troubleshooting

### Problem: Fields show as `{{1.field_name}}` instead of values

**Solution:**
1. Make sure the Gmail module is **after** the Webhook module
2. Click "Re-determine data structure" on the Webhook
3. Re-map all fields in the Gmail module

### Problem: Conditional sections always show (or never show)

**Solution:**
1. Check that you implemented the `if()` function correctly
2. Verify the field values are exactly "Yes" or "No" (case-sensitive)
3. Test with `display: none;` to hide by default, then use `block` to show

### Problem: Email is plain text, not HTML

**Solution:**
1. In Gmail module settings, change Content Type to **HTML**
2. Make sure you didn't accidentally add extra characters before `<!DOCTYPE html>`

### Problem: Styling doesn't work

**Solution:**
1. Gmail strips some CSS - the template uses inline styles which work best
2. Test the email in different email clients
3. Inline styles (in `style=""` attributes) work better than `<style>` blocks

---

## 📊 Template Features

### ✅ What's Included
- Responsive design (works on mobile and desktop email clients)
- Inline CSS for maximum compatibility
- Bilingual (Spanish/English) throughout
- Professional gradient header
- Clear visual hierarchy
- Color-coded sections (blue for info, yellow for insurance, red for danger)
- Calendly call-to-action button
- Instagram social link
- Quote ID and timestamp for reference
- Footer with contact information

### 🎨 Color Scheme
- **Primary Blue:** `#2563eb` (headers, buttons, links)
- **Success Green:** `#10b981` (checkmark)
- **Warning Yellow:** `#f59e0b` (insurance section)
- **Danger Red:** `#ef4444` (dangerous goods)
- **Neutral Gray:** Various shades for text and backgrounds

---

## 🚀 Quick Start Checklist

- [ ] Copy HTML from `/docs/EMAIL_TEMPLATE_HTML.html`
- [ ] Open Make.com scenario
- [ ] Find Gmail module (or add new one)
- [ ] Set Content Type to **HTML**
- [ ] Paste HTML template into Content field
- [ ] Set To: `{{1.email}}`
- [ ] Set Subject: `✅ Cotización {{1.quote_id}} Recibida | Quote Received - Expedicargo`
- [ ] Set From Name: `Expedicargo`
- [ ] Add conditional logic for insurance/danger sections (if using single template)
- [ ] Save scenario
- [ ] Send test quote
- [ ] Check email formatting and all fields populate correctly
- [ ] Test with insurance = Yes
- [ ] Test with dangerous goods = Yes
- [ ] Verify Calendly link works
- [ ] Verify Instagram link works

---

## 📝 Notes

1. **No-Reply Address:** Make sure your Gmail account is configured to send from a no-reply address
2. **Daily Limits:** Gmail has sending limits - consider upgrading to Google Workspace if you send many quotes
3. **SPF/DKIM:** Configure proper email authentication to avoid spam filters
4. **Testing:** Always send test emails to multiple email clients (Gmail, Outlook, Apple Mail) to verify formatting

---

## 🆕 What's New in This Template

Compared to your old template, this version includes:

1. ✅ **Insurance section** with conditional display
2. ✅ **Dangerous goods alert** with conditional display
3. ✅ **Packaging type** field
4. ✅ **Port/Airport codes** (departure and arrival)
5. ✅ **Merchandise description** (separate from cargo type)
6. ✅ **Timestamp** reference at bottom
7. ✅ **Instagram link** in footer
8. ✅ Removed "INC" from company name
9. ✅ Better visual hierarchy with section titles
10. ✅ Improved spacing and readability

---

## 💡 Pro Tips

- **Personalization:** The email uses `{{1.contact_name}}` for personal greeting
- **Quote ID:** Prominently displayed for easy reference
- **CTA:** Calendly button encourages immediate engagement
- **Bilingual:** Shows both languages to cover all customers
- **Professional:** Clean design builds trust and credibility

---

**Need help?** Check the browser console when submitting quotes to see the exact data being sent to Make.com. All field names match exactly between the website, Make.com webhook, and this email template.
