import { useEffect, useState } from 'react';

interface CalendlyOptions {
  prefill?: {
    name?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
  };
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

export function useCalendly() {
  const [isLoaded, setIsLoaded] = useState(false);

  // Load Calendly widget script and styles
  useEffect(() => {
    // Add Calendly CSS
    const link = document.createElement('link');
    link.href = 'https://assets.calendly.com/assets/external/widget.css';
    link.rel = 'stylesheet';
    
    // Check if already added
    if (!document.querySelector('link[href*="calendly"]')) {
      document.head.appendChild(link);
    }

    // Add Calendly JS
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    
    script.onload = () => {
      setIsLoaded(true);
    };
    
    // Check if already added
    if (!document.querySelector('script[src*="calendly"]')) {
      document.body.appendChild(script);
    } else {
      // Script already exists, mark as loaded
      if (window.Calendly) {
        setIsLoaded(true);
      }
    }

    return () => {
      // Don't remove on unmount as other components might be using it
    };
  }, []);

  const openCalendly = (options?: CalendlyOptions) => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: 'https://calendly.com/e-gonzalez-expedicargo/30min',
        prefill: options?.prefill,
        utm: {
          utmSource: options?.utmSource || 'expedicargo-website',
          utmMedium: options?.utmMedium || 'website',
          utmCampaign: options?.utmCampaign || 'consultation-booking'
        }
      });
    } else {
      console.warn('Calendly widget not loaded yet. Please try again in a moment.');
    }
  };

  return { openCalendly, isLoaded };
}
