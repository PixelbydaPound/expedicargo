import { Button } from "./ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { QuoteModal } from "./QuoteModal";

export function ContactSection() {
  const { t } = useLanguage();
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  return (
    <section id="contacto" className="py-20 bg-white dark:bg-gray-900 transition-colors border-t dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          <div className="flex-1">
            <h2 className="text-4xl md:text-5xl dark:text-white max-w-2xl">
              {t(
                'Asegúrate de elegir los servicios de expedición adecuados para tu entrega',
                'Make sure you choose the right expedition services for your delivery'
              )}
            </h2>
          </div>
          
          <div className="flex-shrink-0">
            <Button 
              onClick={() => setIsQuoteModalOpen(true)}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 px-8"
            >
              {t('Cotiza Ya', 'Quote Now')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
        
        <div className="text-center pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {t('¿Prefieres contactarnos directamente?', 'Prefer to contact us directly?')}
          </p>
          <Button 
            variant="outline"
            className="border-green-600 text-green-600 hover:bg-green-50 dark:border-green-500 dark:text-green-500 dark:hover:bg-green-950"
            onClick={() => window.open('https://wa.me/12697693965', '_blank')}
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            WhatsApp Business
          </Button>
        </div>
      </div>
      
      <QuoteModal 
        open={isQuoteModalOpen} 
        onOpenChange={setIsQuoteModalOpen}
      />
    </section>
  );
}
