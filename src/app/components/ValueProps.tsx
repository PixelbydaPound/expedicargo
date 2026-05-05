import { Truck, Globe, Briefcase } from "lucide-react";
import { Card } from "./ui/card";
import { useLanguage } from "../contexts/LanguageContext";

export function ValueProps() {
  const { t } = useLanguage();
  
  const valueProps = [
    {
      icon: Truck,
      title: t("Sin almacén propio", "No Warehouse Ownership"),
      description: t(
        "Solo pagas por el servicio que necesitas. Sin costos ocultos ni infraestructura innecesaria.",
        "Only pay for the service you need. No hidden costs or unnecessary infrastructure."
      )
    },
    {
      icon: Globe,
      title: t("Cobertura internacional", "International Coverage"),
      description: t(
        "Aliados logísticos globales. Conectamos tu carga con destinos en todo el mundo.",
        "Global logistics partners. We connect your cargo with destinations worldwide."
      )
    },
    {
      icon: Briefcase,
      title: t("Planes flexibles", "Flexible Plans"),
      description: t(
        "Soluciones para individuos y empresas. Escalamos contigo a medida que creces.",
        "Solutions for individuals and businesses. We scale with you as you grow."
      )
    }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl mb-4 dark:text-white">
            {t('Nuestros Servicios', 'Our Services')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {t('Soluciones logísticas diseñadas para tu éxito', 'Logistics solutions designed for your success')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {valueProps.map((prop, index) => (
            <Card key={index} className="p-8 hover:shadow-lg transition-shadow bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-6">
                <prop.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="mb-4 dark:text-white">{prop.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{prop.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
