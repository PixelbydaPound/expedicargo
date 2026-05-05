import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useLanguage } from "../contexts/LanguageContext";

export function AboutSection() {
  const { t } = useLanguage();

  return (
    <section id="nosotros" className="py-20 bg-white dark:bg-gray-900 transition-colors border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl mb-4 dark:text-white">
            {t('Sobre Nosotros', 'About Us')}
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbG9iYWwlMjBuZXR3b3JrfGVufDF8fHx8MTc2MTMzMDUwMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Red logística global"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="order-1 md:order-2">
            <h3 className="text-2xl mb-6 dark:text-white">
              {t('Conectando tu Negocio con el Mundo', 'Connecting Your Business with the World')}
            </h3>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
              {t(
                'En Expedicargo, simplificamos el transporte internacional de carga conectando tu negocio con los mejores transportistas aéreos, marítimos y terrestres.',
                'At Expedicargo, we simplify international freight transportation by connecting your business with the best air, sea, and ground carriers.'
              )}
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {t(
                'Ofrecemos soluciones logísticas completas sin las complicaciones tradicionales. Desde cotizaciones personalizadas hasta entregas puerta a puerta, servicio de seguros y opciones de envío flexibles, nos encargamos de cada detalle de tu carga.',
                'We offer complete logistics solutions without traditional complications. From personalized quotes to door-to-door delivery, insurance services, and flexible shipping options, we handle every detail of your cargo.'
              )}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              {t(
                'Sin contratos a largo plazo, sin almacenes propios, sin intermediarios innecesarios. Solo tu carga, la mejor ruta, y la tranquilidad de trabajar con expertos que optimizan cada envío para tu éxito.',
                'No long-term contracts, no warehouses, no unnecessary intermediaries. Just your cargo, the best route, and the peace of mind of working with experts who optimize every shipment for your success.'
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}