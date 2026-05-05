import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Check } from "lucide-react";

export function PlansSection() {
  const plans = [
    {
      name: "Básico",
      description: "Para individuos y pequeños envíos",
      price: "Desde $99",
      period: "/mes",
      features: [
        "Hasta 10 envíos por mes",
        "Rastreo básico en tiempo real",
        "Soporte por email",
        "Cobertura nacional",
        "Documentación estándar"
      ],
      highlighted: false
    },
    {
      name: "Negocios",
      description: "Para empresas en crecimiento",
      price: "Desde $299",
      period: "/mes",
      features: [
        "Hasta 50 envíos por mes",
        "Rastreo avanzado en tiempo real",
        "Prioridad en despacho",
        "Soporte dedicado 24/7",
        "Cobertura internacional",
        "Gestión de documentación",
        "Reportes mensuales"
      ],
      highlighted: true
    },
    {
      name: "Empresarial",
      description: "Para grandes volúmenes",
      price: "Personalizado",
      period: "",
      features: [
        "Envíos ilimitados",
        "Rastreo premium con alertas",
        "Atención personalizada",
        "Account manager dedicado",
        "API de integración",
        "Reportes personalizados",
        "Cobertura global premium",
        "SLA garantizado"
      ],
      highlighted: false
    }
  ];

  const scrollToContact = () => {
    const element = document.getElementById('contacto');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="planes" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl mb-4">Elige el Plan que se Adapta a Ti</h2>
          <p className="text-xl text-gray-600">Soluciones flexibles para cada necesidad</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`p-8 ${plan.highlighted ? 'border-2 border-blue-600 shadow-xl' : 'bg-white'}`}
            >
              <div className="text-center mb-6">
                <h3 className="mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="flex items-end justify-center">
                  <span className="text-4xl text-blue-600">{plan.price}</span>
                  {plan.period && <span className="text-gray-600 ml-2">{plan.period}</span>}
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <Check className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                onClick={scrollToContact}
                className={`w-full ${plan.highlighted ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-900 hover:bg-gray-800'}`}
              >
                Seleccionar Plan
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
