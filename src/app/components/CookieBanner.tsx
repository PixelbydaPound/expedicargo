import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Cookie, X } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

const COOKIE_CONSENT_KEY = "expedicargo_cookie_consent";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!hasConsent) {
      // Show banner after a brief delay
      setTimeout(() => {
        setIsVisible(true);
      }, 1500);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-in slide-in-from-bottom duration-500">
      <div className="bg-gray-900 dark:bg-gray-950 border-t border-gray-700 dark:border-gray-600 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3 flex-1">
              <Cookie className="h-6 w-6 text-blue-400 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="text-white font-semibold mb-1">
                  {t('🍪 Usamos Cookies', '🍪 We Use Cookies')}
                </h3>
                <p className="text-sm text-gray-300">
                  {t(
                    'Utilizamos cookies esenciales para mejorar tu experiencia, recordar tus preferencias (idioma, tema) y analizar el uso del sitio. No vendemos tu información personal.',
                    'We use essential cookies to improve your experience, remember your preferences (language, theme), and analyze site usage. We do not sell your personal information.'
                  )}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto">
              <Button
                onClick={handleDecline}
                variant="outline"
                size="sm"
                className="flex-1 md:flex-none border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                {t('Solo Esenciales', 'Essential Only')}
              </Button>
              <Button
                onClick={handleAccept}
                size="sm"
                className="flex-1 md:flex-none bg-blue-600 hover:bg-blue-700 text-white"
              >
                {t('Aceptar Todas', 'Accept All')}
              </Button>
              <button
                onClick={handleDecline}
                className="text-gray-400 hover:text-white p-2 transition-colors"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <div className="mt-3 text-xs text-gray-400">
            {t(
              'Al continuar navegando, aceptas el uso de cookies. Lee nuestra ',
              'By continuing to browse, you accept the use of cookies. Read our '
            )}
            <button 
              onClick={() => {
                handleAccept();
                // The footer will handle opening the modal
                setTimeout(() => {
                  const event = new CustomEvent('openLegalModal', { detail: 'cookies' });
                  window.dispatchEvent(event);
                }, 100);
              }}
              className="underline hover:text-gray-200 transition-colors"
            >
              {t('Política de Cookies', 'Cookie Policy')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
