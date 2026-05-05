# ✅ Make.com Email Fix - Simple Checklist

**Print this or keep it open while you fix!**

---

## 🎯 THE FIX (Check off as you go)

### Step 1: Open Make.com
- [ ] Go to Make.com website
- [ ] Log in to your account
- [ ] Open scenario: "Integration Webhooks, HTTP"
- [ ] You should see the workflow diagram

### Step 2: Find the Broken Module
- [ ] Look for Email module with ❌ red error icon
- [ ] It should be module #7 in the flow
- [ ] Click on it to open the settings

### Step 3: Check the "To" Field
- [ ] Look at the "To" field
- [ ] Is it empty? ❌
- [ ] Is the mapping broken/gray? ❌
- [ ] Does it need to be fixed? → YES

### Step 4: Fix the Mapping
- [ ] Click inside the "To" field
- [ ] Delete any existing content (if any)
- [ ] Look for the dropdown menu that appears
- [ ] Find the section "Webhooks" or "1"
- [ ] Click on "email" in that section
- [ ] Verify you now see: `{{1.email}}` with purple tag
- [ ] Does it look correct? → YES

### Step 5: Save It
- [ ] Click "OK" at the bottom of Email module
- [ ] Click "Save" button for the scenario
- [ ] Did it save successfully? ✅

### Step 6: Test It
- [ ] Click "Run once" button (bottom left of Make.com)
- [ ] Open your Expedicargo website in another tab
- [ ] Click "Solicita Cotización" button
- [ ] Fill out the quote form with YOUR email
- [ ] Submit the form
- [ ] Return to Make.com tab
- [ ] Watch the execution flow

### Step 7: Verify Success
- [ ] Did the Webhook module turn green? ✅
- [ ] Did the Email module turn green? ✅
- [ ] Did the Google Sheets module turn green? ✅
- [ ] Did you receive the email in your inbox? ✅

### Step 8: Process Queue
- [ ] Click "Show queue" (purple banner at top)
- [ ] Do you see 2 records waiting? → YES
- [ ] Click "Process all" or process individually
- [ ] Did both process successfully? ✅
- [ ] Queue now shows 0 records? ✅

### Step 9: Final Test
- [ ] Submit another test quote from website
- [ ] Did it work immediately? ✅
- [ ] Email received? ✅
- [ ] No errors in Make.com? ✅

---

## 🎉 SUCCESS!

If all boxes are checked, you're done! ✅

Your quote submission flow is now working perfectly.

---

## 🚨 IF SOMETHING DIDN'T WORK

### If Step 4 failed (can't find email field):
→ Read: `/docs/MAKE_EMAIL_ERROR_FIX.md` - Section: "Fix the Mapping"

### If Step 7 failed (modules not green):
→ Read: `/docs/MAKE_EMAIL_ERROR_FIX.md` - Section: "Advanced Troubleshooting"

### If you can't find the Email module:
→ Look for the module that says "Send an Email" or has the email icon

### If the dropdown doesn't show "email" field:
1. Click the Webhook module (first one)
2. Click "Re-determine data structure"
3. Submit a new quote from website
4. Go back to Email module and try again

---

## 📱 QUICK REFERENCE

**What the "To" field should look like:**
```
To: {{1.email}}
    [1. email] ← Purple tag showing this
```

**What the "To" field should NOT look like:**
```
To: [empty]  ❌
To: {{1.email}} (gray/broken) ❌
To: test@email.com (hardcoded) ❌
```

---

## 📞 NEED HELP?

**Read these guides in order:**

1. **MAKE_QUICK_FIX_VISUAL.md** ← Start here (visual guide)
2. **MAKE_EMAIL_ERROR_FIX.md** ← If quick fix doesn't work
3. **URGENT_FIX_SUMMARY.md** ← Overview and action items

**All located in:** `/docs/` folder

---

**Good luck! You've got this!** 💪
