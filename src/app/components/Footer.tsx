import { Instagram } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { useState } from "react";
import { LegalModal } from "./LegalModal";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalModalTab, setLegalModalTab] = useState<'terms' | 'privacy' | 'cookies'>('terms');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openLegalModal = (tab: 'terms' | 'privacy' | 'cookies') => {
    setLegalModalTab(tab);
    setLegalModalOpen(true);
  };

  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-300 dark:text-gray-400 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="text-white mb-4">Expedicargo</div>
            <p className="text-sm text-gray-400">
              {t(
                'Facilitador logístico digital conectando el mundo con soluciones inteligentes.',
                'Digital logistics facilitator connecting the world with smart solutions.'
              )}
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white mb-4">{t('Servicios', 'Services')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => scrollToSection('como-funciona')} className="hover:text-white transition-colors">
                  {t('Cómo Funciona', 'How It Works')}
                </button>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white mb-4">{t('Compañía', 'Company')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => scrollToSection('nosotros')} className="hover:text-white transition-colors">
                  {t('Sobre Nosotros', 'About Us')}
                </button>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => openLegalModal('terms')} className="hover:text-white transition-colors">
                  {t('Términos de Servicio', 'Terms of Service')}
                </button>
              </li>
              <li>
                <button onClick={() => openLegalModal('privacy')} className="hover:text-white transition-colors">
                  {t('Privacidad', 'Privacy')}
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 dark:border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            © {currentYear} Expedicargo. {t('Todos los derechos reservados.', 'All rights reserved.')} <span className="text-xs opacity-50">v7.0</span>
          </p>
          
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <a 
              href="https://www.instagram.com/expedicargo?igsh=MTFsMWVxZm4wbDRqYw%3D%3D&utm_source=qr" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center space-x-2 hover:text-white transition-colors group"
            >
              <Instagram className="h-5 w-5" />
              <span className="text-sm">
                {t('Síguenos en Instagram', 'Follow us on Instagram')}
              </span>
            </a>
          </div>
        </div>
      </div>
      
      <LegalModal 
        open={legalModalOpen} 
        onOpenChange={setLegalModalOpen} 
        defaultTab={legalModalTab} 
      />
    </footer>
  );
}