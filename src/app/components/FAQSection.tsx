import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { useLanguage } from "../contexts/LanguageContext";

export function FAQSection() {
  const { t } = useLanguage();

  const faqs = [
    {
      question: t(
        "¿Qué tipos de envíos manejan?",
        "What types of shipments do you handle?"
      ),
      answer: t(
        "Manejamos todo tipo de envíos incluyendo carga aérea, marítima, terrestre y express. Desde pequeños paquetes hasta contenedores completos, nuestros socios logísticos están equipados para manejar cualquier volumen y tipo de mercancía.",
        "We handle all types of shipments including air, sea, ground and express freight. From small packages to full containers, our logistics partners are equipped to handle any volume and type of merchandise."
      )
    },
    {
      question: t(
        "¿Cómo funcionan los tiempos de entrega?",
        "How do delivery times work?"
      ),
      answer: t(
        "Los tiempos de entrega varían según el tipo de servicio seleccionado y la distancia. Los envíos express pueden tomar 1-3 días, mientras que los envíos marítimos internacionales pueden tomar de 2-6 semanas. Te proporcionamos estimaciones precisas al momento de cotizar.",
        "Delivery times vary depending on the type of service selected and distance. Express shipments can take 1-3 days, while international sea shipments can take 2-6 weeks. We provide accurate estimates when quoting."
      )
    },
    {
      question: t(
        "¿Necesito firmar un contrato a largo plazo?",
        "Do I need to sign a long-term contract?"
      ),
      answer: t(
        "No, uno de nuestros principales valores es la flexibilidad. No requerimos contratos a largo plazo ni compromisos mínimos. Puedes usar nuestros servicios cuando los necesites, pagando solo por cada envío individual.",
        "No, one of our core values is flexibility. We don't require long-term contracts or minimum commitments. You can use our services when you need them, paying only for each individual shipment."
      )
    },
    {
      question: t(
        "¿Ofrecen seguro para los envíos?",
        "Do you offer shipping insurance?"
      ),
      answer: t(
        "Sí, ofrecemos opciones de seguro completas para proteger tu carga. El costo del seguro se calcula según el valor declarado de la mercancía y el tipo de envío. Recomendamos asegurar todos los envíos de alto valor.",
        "Yes, we offer comprehensive insurance options to protect your cargo. Insurance costs are calculated based on the declared value of the merchandise and shipping type. We recommend insuring all high-value shipments."
      )
    },
    {
      question: t(
        "¿Cómo puedo rastrear mi envío?",
        "How can I track my shipment?"
      ),
      answer: t(
        "Una vez que tu envío está en tránsito, recibirás un número de rastreo que te permitirá monitorear el progreso en tiempo real. Puedes rastrear tu envío a través de nuestro portal web o contactarnos directamente para actualizaciones.",
        "You don't have to. After confirming your shipment, our logistics team tracks every stage for you and sends updates as your shipment moves. If you'd like an update between milestones, just contact us and we'll pull the latest status."
      )
    }
  ];

  return (
    <section id="faq" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-4xl mb-4 dark:text-white">
            {t('Preguntas Frecuentes', 'Frequently Asked Questions')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {t('Encuentra respuestas a las preguntas más comunes', 'Find answers to the most common questions')}
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-6 shadow-sm"
            >
              <AccordionTrigger className="text-left hover:no-underline py-6">
                <span className="text-gray-900 dark:text-white pr-4">
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-400 pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}