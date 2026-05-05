import { Button } from "./ui/button";
import { Calendar } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { useCalendly } from "../hooks/useCalendly";
import { useCalendlyEvents } from "../hooks/useCalendlyEvents";
import { toast } from "sonner";

export function ConsultationSection() {
  const { t } = useLanguage();
  const { openCalendly } = useCalendly();

  // Listen for Calendly events
  useCalendlyEvents({
    onEventScheduled: () => {
      toast.success(
        t(
          '¡Consulta Agendada! Revisa tu email para los detalles.',
          'Consultation Booked! Check your email for details.'
        ),
        {
          duration: 5000,
          position: 'top-center'
        }
      );
    }
  });

  const handleScheduleClick = () => {
    openCalendly({
      utmMedium: 'consultation-section',
      utmCampaign: 'free-30min-consultation'
    });
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Title */}
          <h2 className="text-4xl mb-6 text-gray-900 dark:text-white">
            {t(
              '¿Necesitas una Consulta con un Experto en Logística?',
              'Need a Logistics Expert Consultation?'
            )}
          </h2>

          {/* Subtitle */}
          <h3 className="text-2xl mb-8 text-gray-800 dark:text-gray-200">
            {t(
              'Agenda una Consulta de Logística de 30 Minutos',
              'Book a 30-Minute Logistics Consultation'
            )}
          </h3>

          {/* Body Copy */}
          <div className="mb-8 text-lg text-gray-600 dark:text-gray-300 space-y-4 max-w-3xl mx-auto">
            <p>
              {t(
                'Obtén orientación experta adaptada a tus necesidades de envío.',
                'Get expert guidance tailored to your shipping needs.'
              )}
            </p>
            <p>
              {t(
                'Nuestros especialistas en logística evaluarán el tipo de carga, las rutas y los plazos para ayudarte a elegir la solución más eficiente y rentable.',
                'Our logistics specialists will assess your cargo type, routes, and timelines to help you choose the most efficient and cost-effective solution.'
              )}
            </p>
            <p>
              {t(
                'Agenda tu consulta gratuita de 30 minutos hoy y optimiza tu próximo envío con confianza.',
                'Schedule your free 30-minute consultation today and streamline your next shipment with confidence.'
              )}
            </p>
          </div>

          {/* CTA Button */}
          <Button 
            onClick={handleScheduleClick}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-600 dark:hover:to-indigo-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Calendar className="h-5 w-5 mr-2" />
            {t('Agenda Mi Consulta', 'Schedule My Consultation')}
          </Button>
        </div>
      </div>
    </section>
  );
}
