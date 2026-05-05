import { Button } from "./ui/button";
import { Menu, Moon, Sun, Globe } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";
import { QuoteModal } from "./QuoteModal";
import { useCalendly } from "../hooks/useCalendly";
import { toast } from "sonner";
import logoLight from "figma:asset/0b60878fdc9f70c738e52651376c49ae8e8bfdab.png";
import logoDark from "figma:asset/0d38c4457213c014bc5a750211625d5de4b44ba0.png";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { openCalendly, isLoaded } = useCalendly();

  const handleScheduleConsultation = () => {
    if (!isLoaded) {
      toast.error(
        language === 'es' 
          ? 'Cargando sistema de reservas...' 
          : 'Loading booking system...'
      );
      return;
    }

    openCalendly({
      utmSource: 'header',
      utmMedium: 'website',
      utmCampaign: 'header-consultation-button'
    });

    // Close mobile menu if open
    setIsMenuOpen(false);

    // Show success toast
    toast.success(
      language === 'es'
        ? '✅ Calendario abierto - Selecciona tu horario'
        : '✅ Calendar opened - Select your time'
    );
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            {/* Mobile - Smaller logo */}
            <img 
              src={theme === 'dark' ? logoDark : logoLight} 
              alt="Expedicargo - The Way to Go" 
              className="h-8 w-auto md:hidden transition-opacity duration-300"
            />
            {/* Desktop - Full size logo */}
            <img 
              src={theme === 'dark' ? logoDark : logoLight} 
              alt="Expedicargo - The Way to Go" 
              className="hidden md:block h-12 w-auto transition-opacity duration-300"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <button onClick={() => scrollToSection('inicio')} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              {t('Inicio', 'Home')}
            </button>
            <button onClick={() => scrollToSection('como-funciona')} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              {t('Cómo Funciona', 'How It Works')}
            </button>
            <button onClick={() => scrollToSection('nosotros')} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              {t('Sobre Nosotros', 'About Us')}
            </button>
            <button onClick={() => scrollToSection('faq')} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              {t('FAQ', 'FAQ')}
            </button>
            <Button onClick={() => setIsQuoteModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
              {t('Cotiza Ya', 'Quote Now')}
            </Button>
            <Button 
              onClick={handleScheduleConsultation} 
              variant="outline"
              className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:border-emerald-500 dark:text-emerald-400 dark:hover:bg-emerald-950"
            >
              {t('Agenda Mi Consulta', 'Schedule My Consultation')}
            </Button>
            
            {/* Language Toggle */}
            <button 
              onClick={toggleLanguage}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              aria-label="Toggle language"
            >
              <div className="flex items-center gap-1">
                <Globe className="h-5 w-5" />
                <span className="text-sm">{language.toUpperCase()}</span>
              </div>
            </button>

            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button 
              onClick={toggleLanguage}
              className="p-2 text-gray-700 dark:text-gray-300"
              aria-label="Toggle language"
            >
              <div className="flex items-center gap-1">
                <Globe className="h-5 w-5" />
                <span className="text-sm">{language.toUpperCase()}</span>
              </div>
            </button>
            <button 
              onClick={toggleTheme}
              className="p-2 text-gray-700 dark:text-gray-300"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>
            <button 
              className="p-2 text-gray-700 dark:text-gray-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-col space-y-4">
              <button onClick={() => scrollToSection('inicio')} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left">
                {t('Inicio', 'Home')}
              </button>
              <button onClick={() => scrollToSection('como-funciona')} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left">
                {t('Cómo Funciona', 'How It Works')}
              </button>
              <button onClick={() => scrollToSection('nosotros')} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left">
                {t('Sobre Nosotros', 'About Us')}
              </button>
              <button onClick={() => scrollToSection('faq')} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left">
                {t('FAQ', 'FAQ')}
              </button>
              <Button onClick={() => setIsQuoteModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 w-full">
                {t('Cotiza Ya', 'Quote Now')}
              </Button>
              <Button 
                onClick={handleScheduleConsultation} 
                variant="outline"
                className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:border-emerald-500 dark:text-emerald-400 dark:hover:bg-emerald-950 w-full"
              >
                {t('Agenda Mi Consulta', 'Schedule My Consultation')}
              </Button>
            </div>
          </nav>
        )}
      </div>
      
      <QuoteModal 
        open={isQuoteModalOpen} 
        onOpenChange={setIsQuoteModalOpen}
      />
    </header>
  );
}