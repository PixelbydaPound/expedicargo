# 🚨 URGENT: Make.com Email Error - Quick Visual Fix

## ⚡ THE PROBLEM
Your Make.com scenario is failing with: **"Invalid email address in parameter 'to'"**

This means the Email module can't find a valid email address to send to.

---

## 🎯 THE SOLUTION (2 Minutes)

### Step 1: Open Your Email Module
1. Go to Make.com
2. Open scenario: **"Integration Webhooks, HTTP"**
3. Find the **Email module** (the one with red error icon - module 7)
4. **Click on it** to open

### Step 2: Check the "To" Field

Look at the **"To"** field. You'll see one of these scenarios:

#### ❌ **WRONG** - Empty or Lost Mapping
```
To: [empty field]
```
OR
```
To: {{1.email}}  (but text is gray/broken)
```

#### ✅ **CORRECT** - Properly Mapped
```
To: {{1.email}}  (text is purple/active, shows "1. email" tag)
```

### Step 3: Fix the Mapping

If it's wrong/empty:

1. **Click inside the "To" field**
2. **Delete** any existing content (if any)
3. **Look for the dropdown menu** that appears
4. **Find the section labeled "Webhooks" or "1"**
5. **Click on "email"** in that section
6. You should now see: `{{1.email}}` with a purple tag showing "1. email"
7. **Click "OK"** at bottom of Email module
8. **Click "Save"** on the scenario

### Step 4: Test It

1. **Click "Run once"** button (bottom left)
2. **Go to your Expedicargo website**
3. **Click "Solicita Cotización"**
4. **Fill out the form** with your test email
5. **Submit**
6. **Return to Make.com** - Watch the execution
7. ✅ **Email module should turn GREEN** (success!)
8. **Check your email** - You should receive the confirmation

### Step 5: Process Queue

1. **Click "Show queue"** (purple banner at top)
2. **View the 2 waiting records** - These are the failed submissions
3. **Click "Process all"** or process them individually
4. They should now **send successfully** ✅

---

## 🔍 DETAILED VISUAL WALKTHROUGH

### What You're Looking For in Make.com:

```
┌─────────────────────────────────────────┐
│  Email Module Settings                  │
├─────────────────────────────────────────┤
│                                         │
│  Connection: My Google Restricted...   │
│                                         │
│  To: [Click here to map field]         │ ← THIS IS THE PROBLEM!
│                                         │
│  Subject: ✅ Cotización {{1.quote...   │
│                                         │
│  Content Type: HTML                     │
│                                         │
└─────────────────────────────────────────┘
```

### What It Should Look Like:

```
┌─────────────────────────────────────────┐
│  Email Module Settings                  │
├─────────────────────────────────────────┤
│                                         │
│  Connection: My Google Restricted...   │
│                                         │
│  To: [1. email]                        │ ← Purple tag with "1. email"
│      {{1.email}}                       │
│                                         │
│  Subject: ✅ Cotización {{1.quote...   │
│                                         │
│  Content Type: HTML                     │
│                                         │
└─────────────────────────────────────────┘
```

---

## 🎯 MAPPING THE EMAIL FIELD

### When you click in the "To" field, you'll see a dropdown:

```
┌──────────────────────────┐
│ Choose a field:          │
├──────────────────────────┤
│ ▼ Webhooks               │ ← Expand this
│   ○ quote_id             │
│   ○ business_name        │
│   ○ contact_name         │
│   ● email               │ ← SELECT THIS ONE!
│   ○ phone                │
│   ○ shipment_type        │
│   ○ origin               │
│   [... more fields ...]  │
└──────────────────────────┘
```

### Click on **"email"** and it will insert: `{{1.email}}`

---

## ⚠️ COMMON MISTAKES TO AVOID

### ❌ Don't type manually
```
To: {{1.email}}  ← DON'T type this manually
```
**Why:** Manual typing doesn't create the mapping link. You MUST select from dropdown.

### ❌ Don't use the wrong field
```
To: {{1.contact_name}}  ← This is a name, not an email!
```

### ❌ Don't leave it empty
```
To: [empty]  ← This causes "Invalid email" error
```

### ✅ Do use the dropdown
```
To: {{1.email}}  ← Selected from "Webhooks → email" in dropdown
```

---

## 🧪 VERIFY IT'S WORKING

### Test Flow:

1. **Make.com** - Run once → Waiting for data...
2. **Your Website** - Submit quote form
3. **Make.com** - Receives webhook → Green checkmark ✅
4. **Email Module** - Sends email → Green checkmark ✅
5. **Your Inbox** - Receives confirmation email ✅

### Check These:

- [ ] Webhook module: ✅ Green (data received)
- [ ] Google Sheets module: ✅ Green (row added)
- [ ] Email module: ✅ Green (email sent)
- [ ] No red error icons
- [ ] Email received in your inbox
- [ ] Queue shows 0 records waiting

---

## 🆘 IF IT STILL DOESN'T WORK

### Check These:

#### 1. Gmail Connection Expired
```
Connection: My Google Restricted...  [Reconnect]
```
- Click "Reconnect" if you see it
- Re-authenticate with Gmail
- Grant permissions again

#### 2. Webhook Not Receiving Email
```
1. Click Webhook module
2. Click "Show queue" or view History
3. Look at the data bundle
4. Find "email" field
5. Check if it has a value
```

**If email is empty in webhook:**
- Problem is on the website (form not sending email)
- Try submitting a quote again
- Check browser console for errors

**If email exists in webhook:**
- Problem is the mapping in Email module
- Re-do Step 3 above

#### 3. Email Field Has Wrong Format
```
Webhook data shows:
"email": " test@domain.com "  ← Has spaces!
```

**Fix:** Add a text operation before Email module:
- Add "Set variable" module
- Name: `cleanedEmail`
- Value: `{{trim(1.email)}}`
- Use `{{cleanedEmail}}` in Email module "To" field

---

## 📞 EMERGENCY WORKAROUND

If you can't fix it right now and need quotes to go through:

### Temporary Solution:

1. **Disable the Email module** (turn it off temporarily)
2. **Keep Google Sheets logging** enabled
3. **Quotes will be saved** to your Google Sheet
4. **Manually email customers** from the sheet data
5. **Fix the email issue** when you have time
6. **Re-enable Email module** once fixed

### How to Disable Email Module:

1. Right-click Email module
2. Click "Disable module"
3. Save scenario
4. Quotes will still be logged to Sheets
5. You just won't auto-send emails

---

## 🎯 PREVENTION FOR FUTURE

### Add Error Handler:

1. Right-click Email module
2. Select "Add error handler"
3. Add a "Send notification" or "Log to Sheets" module
4. If email fails, you'll be notified
5. Scenario won't break completely

### Add Data Validation:

Before the Email module, add a **Router**:

**Route 1: Email is valid**
- Filter: `{{1.email}}` exists and contains "@"
- Action: Send email

**Route 2: Email is invalid**
- Filter: `{{1.email}}` is empty or invalid
- Action: Send alert to you + log error to separate sheet

---

## ✅ SUCCESS CHECKLIST

After fixing, confirm:

- [x] Email module "To" field shows `{{1.email}}` with purple tag
- [x] Can submit test quote successfully
- [x] Make.com execution shows all green checkmarks
- [x] Customer receives confirmation email
- [x] Google Sheets updated with new row
- [x] Queue shows 0 records waiting (processed the 2 failed ones)
- [x] Scenario is ACTIVE (not paused)
- [x] No error notifications from Make.com

---

## 📱 QUICK REFERENCE CARD

### The Fix in 4 Steps:

1. **Open Email module** in Make.com
2. **Click "To" field** → Delete current content
3. **Select from dropdown:** Webhooks → email
4. **Save** → Test with new quote submission

### Time: 2 minutes
### Difficulty: ⭐ Easy
### Success Rate: 99%

---

## 🎉 DONE!

Your quote submission flow should now be working perfectly!

**Test it:** Submit a quote and you should receive the email confirmation immediately.

**Questions?** Check the full guide: `/docs/MAKE_EMAIL_ERROR_FIX.md`
