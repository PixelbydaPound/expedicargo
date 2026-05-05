// Calendly Widget Type Declarations

interface CalendlyPopupOptions {
  url: string;
  prefill?: {
    name?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    customAnswers?: {
      [key: string]: string;
    };
  };
  utm?: {
    utmCampaign?: string;
    utmSource?: string;
    utmMedium?: string;
    utmContent?: string;
    utmTerm?: string;
  };
}

interface CalendlyWidget {
  initPopupWidget: (options: CalendlyPopupOptions) => void;
  closePopupWidget: () => void;
  initInlineWidget: (options: { url: string; parentElement: HTMLElement }) => void;
}

interface Window {
  Calendly?: CalendlyWidget;
}
