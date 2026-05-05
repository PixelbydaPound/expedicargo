# 📅 Calendly Integration Documentation

## Overview
Your Expedicargo website now features a professional **Popup Modal** Calendly integration for seamless consultation bookings.

## ✅ What's Implemented

### 1. **Main Consultation Section**
- Located in the dedicated "Consultation" section of your homepage
- **Primary CTA button**: "Agenda Mi Consulta" / "Schedule My Consultation"
- Opens Calendly in a beautiful popup modal overlay
- Users can book without leaving your website

### 2. **Hero Section CTA**
- Secondary booking button in the hero section
- Quick access for visitors to book consultations immediately
- Styled as an outline button for visual hierarchy

### 3. **Reusable Hook: `useCalendly`**
- Location: `/hooks/useCalendly.ts`
- Automatically loads Calendly widget scripts
- Provides `openCalendly()` function
- Supports UTM tracking and user prefilling

## 🔧 How to Use in Other Components

If you want to add Calendly booking buttons anywhere else on your site:

```tsx
import { useCalendly } from '../hooks/useCalendly';
import { Calendar } from 'lucide-react';
import { Button } from './ui/button';

function MyComponent() {
  const { openCalendly } = useCalendly();

  return (
    <Button onClick={() => openCalendly()}>
      <Calendar className="mr-2 h-4 w-4" />
      Book Now
    </Button>
  );
}
```

### Advanced Usage with Prefill & UTM

```tsx
// Prefill user information
openCalendly({
  prefill: {
    name: 'John Doe',
    email: 'john@example.com'
  },
  utmSource: 'expedicargo-website',
  utmMedium: 'quote-form',
  utmCampaign: 'quote-to-consultation'
});
```

## 📊 UTM Tracking

Each button tracks where bookings come from:

| Location | UTM Medium | UTM Campaign |
|----------|------------|--------------|
| Hero Section | `hero-section` | `hero-cta` |
| Consultation Section | `consultation-section` | `free-30min-consultation` |

You can view these analytics in your Calendly dashboard.

## 🎨 Customization Options

### Change the Calendly Event

Edit `/hooks/useCalendly.ts` line 41:

```tsx
url: 'https://calendly.com/e-gonzalez-expedicargo/30min'
```

Replace with any other Calendly event URL you create.

### Add More Prefill Fields

Calendly supports prefilling:
- `name` or `firstName` + `lastName`
- `email`
- Custom question answers

### Change Button Styling

Buttons use your existing design system. Modify classes in:
- `/components/ConsultationSection.tsx` (line 85-88)
- `/components/HeroSection.tsx` (line 46-51)

## 🔗 Your Calendly Links

- **30-Min Event**: https://calendly.com/e-gonzalez-expedicargo/30min
- **Profile**: https://calendly.com/e-gonzalez-expedicargo

## 💡 Best Practices

1. **Don't remove the useCalendly hook** - It ensures scripts only load once
2. **Use UTM parameters** - Track which pages drive the most bookings
3. **Prefill when possible** - Use data from quote forms to reduce friction
4. **Monitor analytics** - Check Calendly dashboard for conversion data

## 🎯 Future Enhancements (Optional)

You could add:
- **Auto-prefill from quote form**: When users click "Schedule Consultation" after submitting a quote, pre-fill their name/email
- **Different event types**: Create separate Calendly events for different service types
- **Confirmation webhooks**: Receive notifications when someone books
- **Embed calendar inline**: Show availability directly on a dedicated booking page

## 📞 Support

For Calendly account settings and scheduling configurations:
- Login: https://calendly.com/login
- Dashboard: https://calendly.com/event_types/user/me

## 🚀 Live Demo

Test your integration:
1. Visit your website
2. Click "Schedule My Consultation" or "Book Consultation"
3. Select a time slot
4. Fill in details and confirm
5. You'll receive booking confirmation via email!

---

**Integration Status**: ✅ Complete and Live
**Last Updated**: January 2025
