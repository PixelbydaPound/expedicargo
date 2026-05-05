import { useEffect } from 'react';

interface CalendlyEvent {
  event: string;
  payload?: {
    event?: {
      uri: string;
    };
    invitee?: {
      uri: string;
    };
  };
}

interface CalendlyEventHandlers {
  onEventScheduled?: () => void;
  onEventTypeViewed?: () => void;
  onDateAndTimeSelected?: () => void;
  onProfilePageViewed?: () => void;
}

/**
 * Hook to listen to Calendly widget events
 * Useful for analytics tracking and user notifications
 */
export function useCalendlyEvents(handlers: CalendlyEventHandlers = {}) {
  useEffect(() => {
    const handleCalendlyEvent = (e: MessageEvent<CalendlyEvent>) => {
      // Only process Calendly events
      if (e.origin !== 'https://calendly.com' && e.origin !== 'https://www.calendly.com') {
        return;
      }

      const { event } = e.data;

      switch (event) {
        case 'calendly.event_scheduled':
          console.log('✅ Calendly: Event scheduled!');
          handlers.onEventScheduled?.();
          break;
        
        case 'calendly.event_type_viewed':
          console.log('👀 Calendly: Event type viewed');
          handlers.onEventTypeViewed?.();
          break;
        
        case 'calendly.date_and_time_selected':
          console.log('📅 Calendly: Date and time selected');
          handlers.onDateAndTimeSelected?.();
          break;
        
        case 'calendly.profile_page_viewed':
          console.log('📄 Calendly: Profile page viewed');
          handlers.onProfilePageViewed?.();
          break;
      }
    };

    window.addEventListener('message', handleCalendlyEvent);

    return () => {
      window.removeEventListener('message', handleCalendlyEvent);
    };
  }, [handlers]);
}
