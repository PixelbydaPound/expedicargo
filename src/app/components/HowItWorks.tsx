import { Send, Lightbulb, MapPin } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { Button } from "./ui/button";
import { QuoteModal } from "./QuoteModal";
import { useState } from "react";

export function HowItWorks() {
  const { t } = useLanguage();
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const steps = [
    {
      number: "1",
      icon: Send,
      title: t("Envía la información de tu carga", "Send your cargo information"),
      description: t(
        "Comparte los detalles de tu envío a través de nuestro formulario rápido en línea: origen, destino y tipo de carga. Hacemos que sea fácil decirnos lo que necesitas en solo unos clics.",
        "Share your shipment details through our quick online form — origin, destination, and type of cargo. We make it easy to tell us what you need in just a few clicks."
      )
    },
    {
      number: "2",
      icon: Lightbulb,
      title: t("Recibe tu solución logística personalizada", "Receive your customized logistics solution"),
      description: t(
        "Una vez que recibamos tu solicitud, nuestro equipo analiza tu ruta, carga y tiempos para diseñar el plan más eficiente y competitivo para ti. Obtendrás una cotización personalizada y las mejores opciones de envío, todo en cuestión de horas.",
        "Once we receive your request, our team analyzes your route, cargo, and timing to design the most efficient and cost-competitive plan for you. You'll get a personalized quote and the best shipping options — all within hours."
      )
    },
    {
      number: "3",
      icon: MapPin,
      title: t("Rastrea tu envío con confianza", "Track your shipment with confidence"),
      description: t(
        "Después de confirmar tu envío, nuestro equipo de logística monitorea cada etapa, para que puedas relajarte mientras nosotros nos encargamos del trabajo pesado.",
        "After confirming your shipment, our logistics team monitors every stage, so you can relax while we handle the heavy lifting."
      )
    }
  ];

  return (
    <section id="como-funciona" className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl mb-4 dark:text-white">
            {t('Así Funciona Expedicargo', 'How Expedicargo Works')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {t('Simple, rápido y diseñado para las necesidades de tu carga.', 'Simple, fast, and built around your cargo needs.')}
          </p>
        </div>

        <div className="space-y-6 mb-12">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-start gap-6">
                {/* Large Number */}
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span className="text-4xl text-white">{step.number}</span>
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-1 pt-1">
                  <div className="flex items-center gap-3 mb-3">
                    <step.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    <h3 className="text-2xl dark:text-white">{step.title}</h3>
                  </div>
                  <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button 
            size="lg"
            onClick={() => setIsQuoteModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            {t('Cotizar Ahora', 'Quote Now')}
          </Button>
          
          <QuoteModal 
            open={isQuoteModalOpen} 
            onOpenChange={setIsQuoteModalOpen}
          />
        </div>
      </div>
    </section>
  );
}