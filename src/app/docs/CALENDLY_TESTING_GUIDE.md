# 🧪 Calendly Integration Testing Guide

## Quick Testing Steps

### 1. **Enable Test Component (Optional)**

If you want to see a test panel, temporarily add this to `/App.tsx`:

```tsx
import { CalendlyTest } from "./components/CalendlyTest";

// Inside the return statement, add:
<CalendlyTest />
```

This will show a test panel in the bottom-right corner with:
- ✅ Loading status indicator
- 🔘 Test Basic Modal button
- 🔘 Test with Prefill button

**Remember to remove it after testing!**

### 2. **Test Main Integration**

1. **Visit your website**
2. **Scroll to "Consultation Section"**
3. **Click "Schedule My Consultation" button**
4. **Verify:**
   - ✅ Modal opens smoothly
   - ✅ Calendar displays correctly
   - ✅ Your availability shows
   - ✅ Dark/light mode works
   - ✅ Form is responsive on mobile

### 3. **Test Hero Section CTA**

1. **Go to homepage hero section**
2. **Click "Book Consultation" button**
3. **Verify:**
   - ✅ Same modal behavior
   - ✅ Consistent experience

### 4. **Test Complete Booking Flow**

1. **Click booking button**
2. **Select a date & time**
3. **Fill in details** (use test email)
4. **Submit booking**
5. **Verify:**
   - ✅ Success toast notification appears
   - ✅ Confirmation email received
   - ✅ Event appears in your Calendly dashboard

### 5. **Test Analytics Tracking**

After completing a test booking:

1. **Login to Calendly**: https://calendly.com/login
2. **Go to Analytics**
3. **Check "Source" data**
4. **Verify UTM parameters:**
   - Source: `expedicargo-website`
   - Medium: `consultation-section` or `hero-section`
   - Campaign: Shows correct campaign name

### 6. **Test Responsiveness**

- **Desktop**: ✅ Modal should be centered, spacious
- **Tablet**: ✅ Modal adjusts to screen size
- **Mobile**: ✅ Full-width modal, easy to navigate

### 7. **Test Dark Mode**

1. **Toggle dark mode** using your site's theme switcher
2. **Open Calendly modal**
3. **Verify**: Modal background adapts to theme

## 🐛 Troubleshooting

### Modal doesn't open?

**Check browser console for errors:**
```
Press F12 → Console tab
```

**Common issues:**
- Calendly script not loaded (wait 2-3 seconds after page load)
- Browser blocking popups (check popup blocker)
- Ad blocker interfering (temporarily disable)

### Success toast not showing?

**Verify:**
- Toast notification system is initialized in `App.tsx`
- `<Toaster />` component is present

### UTM tracking not working?

**Check:**
- Event appears in Calendly dashboard
- Wait 24 hours for analytics to update
- Verify you're checking correct event type

## ✅ Success Checklist

After testing, confirm:

- [ ] Modal opens on button click
- [ ] Calendar loads and displays availability
- [ ] Can select date and time
- [ ] Form accepts user input
- [ ] Booking confirmation works
- [ ] Success toast appears after booking
- [ ] Confirmation email received
- [ ] Event appears in Calendly dashboard
- [ ] Works on mobile devices
- [ ] Works in both dark and light mode
- [ ] UTM parameters tracked in analytics
- [ ] No console errors

## 📊 Analytics to Monitor

Track these metrics in Calendly:

1. **Conversion Rate**: Clicks → Bookings
2. **Traffic Source**: Which button drives more bookings?
3. **Popular Times**: When do clients prefer to book?
4. **Completion Rate**: Started vs completed bookings

## 🎯 A/B Testing Ideas

Try different variations:

1. **Button text:**
   - "Schedule Consultation" vs "Book Free Call"
   - "Talk to an Expert" vs "Get Expert Advice"

2. **Button placement:**
   - Hero section vs below How It Works
   - Sticky footer button?

3. **Call-out additions:**
   - "Limited Slots Available"
   - "Free 30-Minute Session"

## 📞 Need Help?

**Calendly Support:**
- Help Center: https://help.calendly.com
- Contact: https://calendly.com/contact

**Integration Issues:**
- Check browser console for errors
- Verify Calendly account is active
- Ensure event link is correct

---

**Happy Testing!** 🚀

If everything works, you can remove the CalendlyTest component and enjoy seamless consultation bookings!
