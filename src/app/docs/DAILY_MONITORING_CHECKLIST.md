# ✅ Daily Make.com Monitoring Checklist (2 Minutes)

## Morning Check (9:00 AM) - 90 seconds

### 1. Check Scenario Status
- [ ] Go to: https://www.make.com/en/login
- [ ] Find: "Expedicargo Quote Form" scenario
- [ ] Status: **GREEN** ✅ (Active and running)
- [ ] If GREY ⚫: **IMMEDIATELY ACTIVATE** - Critical!

### 2. Quick History Glance
- [ ] Click scenario → **History**
- [ ] Look at last 24 hours
- [ ] All green checkmarks? ✅ You're good!
- [ ] Any red X marks? ❌ Investigate (see Emergency Guide)

### 3. Check Email
- [ ] Any Make.com failure alerts? 
  - ❌ Yes → Follow emergency guide
  - ✅ No → Great!

**Time: 90 seconds**

---

## Evening Check (5:00 PM) - 30 seconds

### Quick Verification
- [ ] Go to Make.com dashboard
- [ ] Scenario still **ACTIVE** (green)
- [ ] Check inbox - any late alerts?

**Time: 30 seconds**

---

## What Each Status Means

```
✅ GREEN   = Active, running perfectly
🟡 YELLOW  = Warning, investigate soon  
🔴 RED     = Failed execution, check now
⚫ GREY    = INACTIVE - CRITICAL! Activate NOW!
```

---

## Red Flags (Take Immediate Action)

### 🚨 CRITICAL
- **Scenario is GREY (inactive)** → Reactivate immediately
- **Multiple consecutive red errors** → Follow emergency guide
- **Email alert says "scenario deactivated"** → Reactivate now

### ⚠️ URGENT
- **1-2 red errors in history** → Check what failed
- **No executions in 24 hours** → Webhook might be broken
- **Gmail authentication expired** → Re-authenticate

### 💡 MONITOR
- **Operation usage above 80%** → Plan to upgrade
- **Slow execution times** → Performance degrading

---

## Emergency Response (If Something's Wrong)

### Step 1: Quick Assessment (10 seconds)
- What's the status? (Grey, Red, Yellow)
- Which module failed? (Email, Sheets, other)
- When did it start? (Just now, hours ago)

### Step 2: Quick Fix (2 minutes)
- **If GREY:** Click scenario → Activate → Done
- **If email mapping error:** Follow `/docs/MAKE_FIX_NOW.md`
- **If other error:** Check `/docs/EMERGENCY_MAKE_CHECKLIST.md`

### Step 3: Verify Fix (1 minute)
- Submit test quote from website
- Check it processes successfully
- Check email arrives

**Total emergency response: ~5 minutes**

---

## Weekly Deep Check (Mondays, 15 minutes)

In addition to daily checks, do this EVERY MONDAY:

### 1. Review Full Week (5 min)
- [ ] Go to Make.com → History
- [ ] Filter: Last 7 days
- [ ] Count total executions: _______
- [ ] Count errors: _______ (should be 0-1)
- [ ] Success rate: _______ % (should be 99%+)

### 2. Test Yourself (5 min)
- [ ] Go to your website
- [ ] Submit a real test quote with YOUR email
- [ ] Time how long until email arrives: _______ seconds
- [ ] Check Google Sheets - new row added? ✅
- [ ] Email looks correct? ✅

### 3. Check Usage (2 min)
- [ ] Make.com → Operations usage
- [ ] Used this month: _______
- [ ] Limit: _______
- [ ] % used: _______ (alert if >80%)

### 4. Check Connections (3 min)
- [ ] Gmail connection: ✅ Active
- [ ] Google Sheets connection: ✅ Active
- [ ] Webhook URL unchanged: ✅
- [ ] All error handlers active: ✅

---

## Monthly Deep Dive (1st Monday, 30 minutes)

### Full System Audit
- [ ] Review month's execution stats
- [ ] Check operation usage trends
- [ ] Test backup scenario (activate → test → deactivate)
- [ ] Verify all field mappings intact
- [ ] Update documentation if needed
- [ ] Plan any improvements

---

## Quick Reference: Who to Contact

### Issue Type → Action

| Issue | Action | Time Limit |
|-------|--------|------------|
| Scenario inactive (grey) | Reactivate yourself | Immediate |
| Email mapping error | Follow MAKE_FIX_NOW.md | 5 minutes |
| Unknown error | Check EMERGENCY_CHECKLIST.md | 15 minutes |
| Platform issue | Contact Make.com support | 1 hour |
| Still broken | Activate backup scenario | 30 minutes |

---

## Pro Tips

### Set Reminders
- **Phone alarm: 9:00 AM** - "Check Make.com"
- **Phone alarm: 5:00 PM** - "Check Make.com"
- **Calendar: Every Monday 9 AM** - "Weekly Make.com audit"

### Bookmark These
- Make.com Dashboard: https://www.make.com/en/scenarios
- Emergency Guide: `/docs/EMERGENCY_MAKE_CHECKLIST.md`
- Your Google Sheet: [Add your sheet URL]
- Supabase Dashboard: [Add your Supabase URL]

### Mobile Access
- **Install Make.com mobile app** for quick status checks
- Add Make.com alerts email to your phone's VIP list
- Bookmark dashboard on phone home screen

---

## Habit Formation

### Week 1-2: Building the Habit
- ✅ Set phone alarms for 9 AM and 5 PM
- ✅ Check even if no alerts
- ✅ Track how long it takes (should be <2 min)

### Week 3-4: Routine Established
- ✅ Checks become automatic
- ✅ You know what "normal" looks like
- ✅ Spot anomalies instantly

### Month 2+: Maintenance Mode
- ✅ Checking is second nature
- ✅ Barely takes any time
- ✅ Catch issues before they become problems

---

## Success Indicators

You're doing great if:
- ✅ You check Make.com at least once daily
- ✅ You spot and fix issues within 15 minutes
- ✅ Your scenario has 99%+ success rate
- ✅ You haven't missed a quote in weeks
- ✅ Monitoring takes <2 minutes per day

---

## Printable Daily Checklist

```
┌─────────────────────────────────────────┐
│  DAILY MAKE.COM CHECK                   │
│  Date: _____________                    │
├─────────────────────────────────────────┤
│  MORNING (9 AM):                        │
│  ☐ Status: GREEN ✅                     │
│  ☐ History: No errors                   │
│  ☐ Inbox: No alerts                     │
│                                         │
│  EVENING (5 PM):                        │
│  ☐ Status: Still GREEN ✅               │
│  ☐ Inbox: No alerts                     │
│                                         │
│  NOTES:                                 │
│  _________________________________      │
│  _________________________________      │
│                                         │
│  QUOTES TODAY: _______                  │
│  ERRORS TODAY: _______                  │
└─────────────────────────────────────────┘
```

**Print this and post next to your computer!**

---

## Automation Ideas

### Set Up Auto-Reminders

**Google Calendar:**
- Daily 9 AM: "Check Make.com (2 min)"
- Daily 5 PM: "Check Make.com (30 sec)"
- Monday 9 AM: "Weekly Make.com Audit (15 min)"
- 1st Monday: "Monthly Make.com Deep Dive (30 min)"

**Slack/Discord Reminder Bot:**
```
/remind me to check Make.com at 9:00 AM every weekday
/remind me to check Make.com at 5:00 PM every weekday
```

**IFTTT Automation:**
- If Make.com sends error email → Send SMS to your phone
- If scenario inactive → Send urgent notification

---

## Metrics to Track (Optional)

### Weekly Tracker Spreadsheet

| Week | Quotes | Errors | Uptime | Avg Speed | Notes |
|------|--------|--------|--------|-----------|-------|
| Nov 1 | 87 | 0 | 100% | 3.2s | Perfect |
| Nov 8 | 92 | 1 | 99% | 3.5s | 1 email bounce |

**Benefits:**
- Spot trends early
- Show business growth
- Justify automation investment
- Quick reference for troubleshooting

---

## Remember

### The 2-Minute Rule
"Monitoring takes 2 minutes daily, but prevents hours of problems."

### The Peace of Mind Rule
"Daily checks = nightly sleep without worry."

### The Business Rule
"Every missed quote is lost revenue. Monitoring is insurance."

---

## Download Mobile App

**Make.com Mobile App:**
- iOS: App Store → Search "Make"
- Android: Play Store → Search "Make"

**Benefits:**
- Check status from anywhere
- Get push notifications
- Quick scenario activate/deactivate
- View execution history

---

## Final Checklist: Are You Protected?

- [ ] Daily morning checks scheduled
- [ ] Daily evening checks scheduled
- [ ] Weekly Monday audits scheduled
- [ ] Monthly deep dives scheduled
- [ ] Make.com alerts configured
- [ ] Emergency guides bookmarked
- [ ] Mobile app installed (optional)
- [ ] Team knows emergency procedures

**If all checked: You're fully protected!** ✅

---

## Time Investment vs. Risk

```
Time Investment:
- Daily checks: 2 minutes × 365 days = 12 hours/year
- Weekly audits: 15 minutes × 52 weeks = 13 hours/year
- Monthly deep dives: 30 minutes × 12 months = 6 hours/year
TOTAL: 31 hours per year

Risk Without Monitoring:
- One major outage: 4+ hours to discover and fix
- Lost quotes during outage: Immeasurable
- Customer trust impact: Significant
- Revenue loss: High

CONCLUSION: 31 hours of monitoring prevents 100+ hours of crisis management.
```

---

**Start tomorrow morning at 9 AM with your first check!** ⏰

**Set your alarm now!** 📱

**Print this checklist and post it!** 🖨️

**Your quote system is now bulletproof!** 🛡️
