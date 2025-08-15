import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Lightbulb,
  Smile,
  Handshake,
  Heart,
  Star,
  Users,
  Award,
  Crown,
  Sparkles,
  ArrowRight,
  Quote,
  CheckCircle,
  Zap,
  Eye,
  Target,
} from "lucide-react";

export const ServicePhilosophySection = () => {
  const philosophyPillars = [
    {
      icon: Lightbulb,
      title: "Innovación Constante",
      description: "Buscamos continuamente nuevas formas de mejorar y enriquecer la experiencia de nuestros huéspedes con tecnología de vanguardia y servicios únicos.",
      color: "from-[#F20C0C] to-[#D10000]",
      bgColor: "bg-[#F20C1F]/10",
      iconColor: "text-[#F20C1F]",
      features: ["Tecnología Smart Room", "Check-in Digital", "Servicios Personalizados"]
    },
    {
      icon: Smile,
      title: "Atención Personalizada",
      description: "Cada huésped es único, y nuestro equipo se esfuerza por ofrecer un servicio adaptado a sus necesidades específicas y preferencias individuales.",
      color: "from-[#F20C0C] to-[#D10000]",
      bgColor: "bg-[#F20C1F]/10",
      iconColor: "text-[#F20C1F]",
      features: ["Concierge 24/7", "Preferencias Guardadas", "Servicio Proactivo"]
    },
    {
      icon: Handshake,
      title: "Compromiso con la Excelencia",
      description: "Nos esforzamos por mantener los más altos estándares de calidad en todos nuestros servicios, superando expectativas en cada detalle.",
      color: "from-[#F20C0C] to-[#D10000]",
      bgColor: "bg-[#F20C1F]/10",
      iconColor: "text-[#F20C1F]",
      features: ["Estándares Premium", "Mejora Continua", "Satisfacción Garantizada"]
    },
  ];

  const values = [
    {
      icon: Heart,
      title: "Pasión",
      description: "Por la hospitalidad"
    },
    {
      icon: Star,
      title: "Excelencia",
      description: "En cada servicio"
    },
    {
      icon: Users,
      title: "Equipo",
      description: "Profesional dedicado"
    },
    {
      icon: Award,
      title: "Reconocimiento",
      description: "A nivel internacional"
    }
  ];

  const testimonialQuote = {
    text: "La filosofía de servicio del Hotel BookMe no es solo una promesa, es una experiencia vivida que transforma cada estancia en un recuerdo inolvidable.",
    author: "María González",
    position: "Directora de Experiencia al Cliente"
  };

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-32 right-16 w-32 h-32 bg-[#F20C1F]/20 rounded-full blur-2xl animate-pulse delay-1000" />
      <div className="absolute top-1/3 right-20 w-16 h-16 bg-white/5 rounded-full blur-lg animate-pulse delay-500" />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-ping"
            style={{
              top: `${20 + i * 15}%`,
              left: `${10 + i * 12}%`,
              animationDelay: `${i * 800}ms`,
              animationDuration: '3s',
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 transform transition-all duration-1000 delay-300 translate-y-0 opacity-100">
          <div className="inline-flex items-center gap-2 bg-[#F20C1F] text-[#fff] px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Crown className="w-4 h-4" />
            Filosofía de Servicio
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#0D0D0D] mb-6 leading-tight">
            Nuestra <span className="text-[#0D0D0D]">Filosofía</span> de 
            <span className="text-[#0D0D0D]"> Servicio</span>
          </h2>
          <p className="text-lg text-[#0D0D0D] max-w-3xl mx-auto leading-relaxed">
            Nos dedicamos a superar las expectativas de nuestros huéspedes en cada interacción, 
            creando experiencias memorables que van más allá del simple alojamiento.
          </p>
        </div>

        {/* Philosophy Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {philosophyPillars.map((pillar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.2 }}
              className="group"
            >
              <Card className="h-full shadow-md sm:shadow-lg border border-gray-200 bg-white hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${pillar.color}`}></div>
                <CardContent className="p-6 sm:p-8 text-center relative">
                  {/* Background Pattern */}
                  <div className={`absolute top-0 right-0 w-24 h-24 ${pillar.bgColor} rounded-full opacity-20 transform translate-x-8 -translate-y-8`}></div>
                  
                  {/* Icon */}
                  <div className="relative z-10 mb-6">
                    <div className={`p-4 sm:p-5 ${pillar.bgColor} rounded-2xl w-fit mx-auto border border-[#F20C1F]/20 group-hover:scale-110 transition-transform duration-300`}>
                      <pillar.icon className={`w-8 h-8 sm:w-10 sm:h-10 ${pillar.iconColor}`} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-xl sm:text-2xl font-bold text-[#0D0D0D] mb-3 sm:mb-4">
                      {pillar.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[#0D0D0D] leading-relaxed mb-6">
                      {pillar.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-2 mb-6">
                      {pillar.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center justify-center gap-2 text-xs sm:text-sm text-[#0D0D0D]">
                          <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-[#F20C1F] flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Values Grid */}
        <div className="mb-16 transform transition-all duration-1000 delay-700 translate-y-0 opacity-100">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0D0D0D] mb-3 sm:mb-4">
              Nuestros <span className="text-[#F20C1F]">Valores</span>
            </h3>
            <p className="text-sm sm:text-base lg:text-lg text-[#0D0D0D] max-w-2xl mx-auto px-4">
              Los pilares fundamentales que guían cada decisión y acción en nuestro hotel
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              >
                <Card className="shadow-md sm:shadow-lg border border-gray-200 bg-white hover:shadow-xl transition-all duration-300 transform hover:scale-105 h-full">
                  <CardContent className="p-4 sm:p-6 text-center h-full flex flex-col justify-center">
                    <div className="p-3 sm:p-4 bg-[#F20C1F]/10 rounded-full w-fit mx-auto mb-3 sm:mb-4">
                      <value.icon className="w-6 h-6 sm:w-8 sm:h-8 text-[#F20C1F]" />
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-[#0D0D0D] mb-1 sm:mb-2">
                      {value.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#0D0D0D]/70">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};