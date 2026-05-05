import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useLanguage } from "../contexts/LanguageContext";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function ClientsSection() {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const testimonials = [
    {
      quote: {
        es: "Expedicargo ha entregado consistentemente por encima de nuestras expectativas. Excelente trabajo de coordinación, tiempos de respuesta increíbles y un equipo realmente amigable.",
        en: "Expedicargo has consistently delivered above and beyond our expectations. Brilliant coordination work, incredible response times and a really friendly team."
      },
      name: {
        es: "María González",
        en: "Maria González"
      },
      title: {
        es: "Director de Logística",
        en: "Logistics Director"
      },
      image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
    },
    {
      quote: {
        es: "Hemos reducido nuestros costos logísticos significativamente desde que empezamos a trabajar con Expedicargo. Su red de transportistas confiables hace toda la diferencia.",
        en: "We have significantly reduced our logistics costs since we started working with Expedicargo. Their network of reliable carriers makes all the difference."
      },
      name: {
        es: "Ana Martínez",
        en: "Ana Martinez"
      },
      title: {
        es: "Directora de Cadena de Suministro",
        en: "Supply Chain Director"
      },
      image: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
    },
    {
      quote: {
        es: "El rastreo en tiempo real y la transparencia total en los costos nos da la tranquilidad que necesitamos. Expedicargo es nuestro socio logístico de confianza.",
        en: "Real-time tracking and complete cost transparency gives us the peace of mind we need. Expedicargo is our trusted logistics partner."
      },
      name: {
        es: "Roberto Fernández",
        en: "Roberto Fernandez"
      },
      title: {
        es: "CEO",
        en: "CEO"
      },
      image: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
    }
  ];

  // Auto-scroll functionality
  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, []);

  const startAutoScroll = () => {
    stopAutoScroll();
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000); // Change slide every 5 seconds
  };

  const stopAutoScroll = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const goToNext = () => {
    stopAutoScroll();
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    startAutoScroll();
  };

  const goToPrevious = () => {
    stopAutoScroll();
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    startAutoScroll();
  };

  const goToSlide = (index: number) => {
    stopAutoScroll();
    setCurrentIndex(index);
    startAutoScroll();
  };

  const currentTestimonial = testimonials[currentIndex];
  const { language } = useLanguage();

  return (
    <section className="py-20 bg-white dark:bg-gray-900 transition-colors border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl mb-4 dark:text-white">
            {t('Nuestros Clientes Anteriores', 'Our Past Clients')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {t('Empresas que confían en nuestros servicios logísticos', 'Companies that trust our logistics services')}
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-5xl mx-auto relative">
          <div className="grid md:grid-cols-2 gap-8 items-center bg-gray-50 dark:bg-gray-800 rounded-lg p-8 shadow-lg">
            <div className="order-2 md:order-1">
              <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
                <ImageWithFallback 
                  src={currentTestimonial.image}
                  alt="Logistics operation"
                  className="w-full h-full object-cover transition-opacity duration-500"
                />
              </div>
            </div>
            <div className="order-1 md:order-2">
              <blockquote className="mb-6">
                <p className="text-xl text-gray-700 dark:text-gray-300 italic mb-4 min-h-[120px]">
                  "{currentTestimonial.quote[language]}"
                </p>
                <footer>
                  <div className="dark:text-white">
                    {currentTestimonial.name[language]}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {currentTestimonial.title[language]}
                  </div>
                </footer>
              </blockquote>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6 text-gray-700 dark:text-gray-300" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6 text-gray-700 dark:text-gray-300" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex 
                    ? 'bg-blue-600 dark:bg-blue-500 w-8' 
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}