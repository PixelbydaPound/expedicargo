import { Button } from "./ui/button";
import { useLanguage } from "../contexts/LanguageContext";
import { QuoteModal } from "./QuoteModal";
import { useState } from "react";
import { useCalendly } from "../hooks/useCalendly";
import { Calendar } from "lucide-react";
import heroImage from "figma:asset/d5a8053b84a14b249ed8d6f99a7ebe528c47ce48.png";

export function HeroSection() {
  const { t } = useLanguage();
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const { openCalendly } = useCalendly();
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className="relative text-white overflow-hidden min-h-[600px] md:min-h-[700px] flex items-end">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={heroImage}
          alt="Buque de carga aéreo"
          className="w-full h-full object-cover object-[35%_center] md:object-[25%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-16 md:pb-20 w-full">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6 md:mb-8 drop-shadow-lg">
            {t('Logística Inteligente sin Complicaciones.', 'Smart Logistics Without Complications.')}
          </h1>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg"
              onClick={() => setIsQuoteModalOpen(true)}
              className="bg-white text-blue-600 hover:bg-gray-100 shadow-xl"
            >
              {t('Solicitar Cotización', 'Request Quote')}
            </Button>
            <Button 
              size="lg"
              onClick={() => openCalendly({ utmMedium: 'hero-section', utmCampaign: 'hero-cta' })}
              variant="outline"
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 shadow-xl backdrop-blur-sm"
            >
              <Calendar className="h-5 w-5 mr-2" />
              {t('Agenda Consulta', 'Book Consultation')}
            </Button>
          </div>
          
          <QuoteModal 
            open={isQuoteModalOpen} 
            onOpenChange={setIsQuoteModalOpen}
          />
        </div>
      </div>
    </section>
  );
}
