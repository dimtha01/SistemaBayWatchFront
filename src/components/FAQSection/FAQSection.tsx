import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  HelpCircle,
  Clock,
  Utensils,
  Car,
  Heart,
  ChefHat,
  Phone,
  MessageCircle,
  CheckCircle,
  Star,
  ArrowRight,
  Filter,
  X,
  Search,
  ThumbsUp,
  Mail,
  Headphones,
} from "lucide-react";
import { useState } from "react";

const faqData = [
  {
    question: "¿Cuál es el horario de check-in y check-out?",
    answer:
      "El check-in es a partir de las 15:00 y el check-out es hasta las 12:00. Si necesitas un horario diferente, por favor, consulta en recepción. Ofrecemos servicio de early check-in y late check-out sujeto a disponibilidad.",
    icon: Clock,
    category: "Horarios",
    popular: true,
  },
  {
    question: "¿El hotel ofrece servicio de habitaciones?",
    answer:
      "Sí, nuestro servicio de habitaciones está disponible las 24 horas del día con una amplia selección de platos gourmet, bebidas premium y snacks. Nuestro menú incluye opciones internacionales y locales preparadas por nuestros chefs especializados.",
    icon: Utensils,
    category: "Servicios",
    popular: true,
  },
  {
    question: "¿Hay estacionamiento disponible en el hotel?",
    answer:
      "Sí, contamos con estacionamiento privado subterráneo para huéspedes con servicio de valet parking. El costo es de $25 USD por noche. Se recomienda reservar con antelación, especialmente durante temporada alta.",
    icon: Car,
    category: "Facilidades",
    popular: false,
  },
  {
    question: "¿El hotel es pet-friendly?",
    answer:
      "¡Por supuesto! Aceptamos mascotas de hasta 15kg con un cargo adicional de $30 USD por noche. Incluimos cama para mascotas, bowls de agua y comida, y un kit de bienvenida. Consulta nuestra política completa de mascotas al reservar.",
    icon: Heart,
    category: "Políticas",
    popular: false,
  },
  {
    question: "¿Hay opciones de comida para dietas especiales?",
    answer:
      "Absolutamente. Nuestros restaurantes ofrecen menús especializados para dietas vegetarianas, veganas, sin gluten, kosher y halal. Nuestros chefs pueden preparar platos personalizados. Por favor, informa sobre tus necesidades dietéticas al reservar.",
    icon: ChefHat,
    category: "Gastronomía",
    popular: true,
  },
  {
    question: "¿Ofrecen servicios de spa y bienestar?",
    answer:
      "Sí, contamos con un spa de clase mundial con tratamientos de relajación, masajes terapéuticos, sauna, jacuzzi y gimnasio completamente equipado. Abierto de 6:00 AM a 10:00 PM todos los días.",
    icon: Star,
    category: "Bienestar",
    popular: true,
  },
  {
    question: "¿Cuáles son las políticas de cancelación?",
    answer:
      "Ofrecemos cancelación gratuita hasta 24 horas antes de tu llegada. Para reservas no reembolsables, aplicamos tarifas especiales con condiciones específicas. Te recomendamos revisar los términos al momento de la reserva.",
    icon: CheckCircle,
    category: "Políticas",
    popular: true,
  },
  {
    question: "¿Tienen servicio de transporte al aeropuerto?",
    answer:
      "Sí, ofrecemos servicio de shuttle al aeropuerto con costo adicional de $15 USD por persona. También contamos con servicio de taxi y transfer privado. Se requiere reserva previa con al menos 2 horas de anticipación.",
    icon: Car,
    category: "Servicios",
    popular: false,
  },
];

const categories = ["Todos", "Horarios", "Servicios", "Facilidades", "Políticas", "Gastronomía", "Bienestar"];

export const FAQSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [helpfulAnswers, setHelpfulAnswers] = useState<number[]>([]);

  const filteredFAQs = faqData.filter(faq => {
    const matchesCategory = selectedCategory === "Todos" || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const popularFAQs = faqData.filter(faq => faq.popular);

  const handleHelpful = (index: number) => {
    if (!helpfulAnswers.includes(index)) {
      setHelpfulAnswers([...helpfulAnswers, index]);
    }
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-[#F20C1F] rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-[#020659] rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-[#F20C1F]/10 text-[#F20C1F] px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            <HelpCircle className="w-3 h-3 sm:w-4 sm:h-4" />
            Centro de Ayuda
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#0D0D0D] mb-4 sm:mb-6 leading-tight px-4">
            Preguntas <span className="text-[#F20C1F]">Frecuentes</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            Encuentra respuestas a las dudas más comunes sobre nuestros servicios 
            y facilidades. Si no encuentras lo que buscas, ¡contáctanos!
          </p>
        </motion.div>

        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-6">
          <Button
            onClick={() => setShowMobileFilter(!showMobileFilter)}
            variant="outline"
            className="w-full flex items-center justify-between p-4 h-auto border-2 border-[#F20C1F]/20 hover:border-[#F20C1F] transition-colors"
          >
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-[#F20C1F]" />
              <span className="font-semibold">Filtrar por Categoría</span>
              {selectedCategory !== "Todos" && (
                <Badge variant="secondary" className="text-xs">
                  {selectedCategory}
                </Badge>
              )}
            </div>
            {showMobileFilter ? <X className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
          </Button>
          
          {showMobileFilter && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4"
            >
              <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => {
                          setSelectedCategory(category);
                          setShowMobileFilter(false);
                        }}
                        className={`px-3 py-2 rounded-lg transition-all duration-300 text-sm font-medium ${
                          selectedCategory === category
                            ? 'bg-[#F20C1F] text-white shadow-lg'
                            : 'text-gray-600 bg-gray-100 hover:bg-gray-200 hover:text-[#0D0D0D]'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Main Content - Fixed Height Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Desktop Sidebar - Categories & Quick Help */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="hidden lg:block lg:col-span-3"
          >
            {/* Categories Filter */}
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm h-[600px]">
              <CardContent className="p-6 flex flex-col h-full">
                <h3 className="text-lg font-bold text-[#0D0D0D] mb-4 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-[#F20C1F]" />
                  Categorías
                </h3>
                <div className="space-y-2 flex-grow">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 text-sm font-medium ${
                        selectedCategory === category
                          ? 'bg-[#F20C1F] text-white shadow-lg'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-[#0D0D0D]'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
                
                {/* Desktop Contact Support (moved from bottom to sidebar) */}
                <div className="mt-auto pt-6">
                  <div className="p-3 bg-gradient-to-br from-[#F20C1F]/10 to-[#020659]/10 rounded-xl text-center">
                    <div className="p-2 bg-white rounded-full w-fit mx-auto mb-3">
                      <Headphones className="w-5 h-5 text-[#F20C1F]" />
                    </div>
                    <h3 className="text-sm font-bold text-[#0D0D0D] mb-1">
                      ¿Necesitas ayuda?
                    </h3>
                    <p className="text-xs text-gray-600 mb-3">
                      Soporte 24/7 disponible
                    </p>
                    <div className="grid grid-cols-1 gap-2">
                      <Button size="sm" className="bg-[#F20C1F] hover:bg-[#D10000] text-white text-xs py-1">
                        <Phone className="w-3 h-3 mr-1" />
                        Llamar
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main FAQ Content */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="lg:col-span-9"
          >
            <Card className="shadow-xl lg:shadow-2xl border-0 bg-white/80 backdrop-blur-sm h-[600px]">
              <CardContent className="p-4 sm:p-6 lg:p-8 h-full flex flex-col">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 lg:mb-8 gap-4 flex-shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="p-2 sm:p-3 bg-[#020659]/10 rounded-full">
                      <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-[#020659]" />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-[#0D0D0D]">
                        {selectedCategory === "Todos" ? "Todas las Preguntas" : selectedCategory}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600">
                        {filteredFAQs.length} pregunta{filteredFAQs.length !== 1 ? 's' : ''} disponible{filteredFAQs.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                  
                  {selectedCategory !== "Todos" && (
                    <Badge variant="secondary" className="text-sm px-3 py-1 w-fit">
                      {selectedCategory}
                    </Badge>
                  )}
                </div>

                {/* Scrollable FAQ Container */}
                <div className="overflow-y-auto flex-grow pr-2 custom-scrollbar">
                  <Accordion type="multiple" className="w-full space-y-3 sm:space-y-4">
                    {filteredFAQs.map((faq, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                      >
                        <AccordionItem 
                          value={`faq-${index}`} 
                          className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 bg-white/50 backdrop-blur-sm"
                        >
                          <AccordionTrigger className="px-4 sm:px-6 py-4 hover:no-underline group">
                            <div className="flex items-start gap-3 sm:gap-4 text-left w-full">
                              <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-[#F20C1F]/10 transition-colors flex-shrink-0 mt-1 sm:mt-0">
                                <faq.icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 group-hover:text-[#F20C1F] transition-colors" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3 mb-1">
                                  <span className="font-semibold text-[#0D0D0D] text-sm sm:text-base lg:text-lg group-hover:text-[#F20C1F] transition-colors leading-tight">
                                    {faq.question}
                                  </span>
                                  {faq.popular && (
                                    <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-800 w-fit">
                                      Popular
                                    </Badge>
                                  )}
                                </div>
                                <span className="text-xs sm:text-sm text-gray-500 font-medium">
                                  {faq.category}
                                </span>
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-4 sm:px-6 pb-4 sm:pb-6">
                            <div className="pl-0 sm:pl-14">
                              <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border-l-4 border-[#F20C1F]">
                                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                                  {faq.answer}
                                </p>
                              </div>
                              <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                                  <span>¿Te fue útil esta respuesta?</span>
                                </div>
                                <button 
                                  onClick={() => handleHelpful(index)}
                                  disabled={helpfulAnswers.includes(index)}
                                  className={`text-xs sm:text-sm flex items-center gap-1 transition-colors ${
                                    helpfulAnswers.includes(index)
                                      ? 'text-green-600 cursor-not-allowed'
                                      : 'text-[#F20C1F] hover:underline'
                                  }`}
                                >
                                  <ThumbsUp className="w-3 h-3 sm:w-4 sm:h-4" />
                                  {helpfulAnswers.includes(index) ? '¡Gracias!' : 'Sí, útil'}
                                </button>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </motion.div>
                    ))}
                  </Accordion>

                  {filteredFAQs.length === 0 && (
                    <div className="text-center py-8 sm:py-12">
                      <HelpCircle className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-600 mb-2">
                        {searchTerm ? 'No se encontraron resultados' : 'No hay preguntas en esta categoría'}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-500 mb-4">
                        {searchTerm 
                          ? 'Intenta con otros términos de búsqueda'
                          : 'Selecciona otra categoría o contacta con nuestro soporte.'
                        }
                      </p>
                      {searchTerm && (
                        <Button 
                          onClick={() => setSearchTerm('')}
                          variant="outline"
                          className="text-sm"
                        >
                          Limpiar búsqueda
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Mobile Contact Support */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="lg:hidden mt-8"
        >
          <Card className="shadow-xl border-0 bg-gradient-to-br from-[#F20C1F]/10 to-[#020659]/10 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="p-3 bg-white rounded-full w-fit mx-auto mb-4">
                <Headphones className="w-6 h-6 text-[#F20C1F]" />
              </div>
              <h3 className="text-lg font-bold text-[#0D0D0D] mb-2">
                ¿Necesitas ayuda?
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                Nuestro equipo de soporte está disponible 24/7 para asistirte
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button className="bg-[#F20C1F] hover:bg-[#D10000] text-white">
                  <Phone className="w-4 h-4 mr-2" />
                  Llamar Ahora
                </Button>
                <Button variant="outline">
                  <Mail className="w-4 h-4 mr-2" />
                  Enviar Email
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #F20C1F;
        }
      `}</style>
    </section>
  );
};