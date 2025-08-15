import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Award,
  Leaf,
  Globe,
  Shield,
  Star,
  Trophy,
  CheckCircle,
  Medal,
  Crown,
  Sparkles,
  ArrowRight,
  Calendar,
  Users,
  Heart,
  Zap,
  Eye,
  Download,
  ExternalLink,
} from "lucide-react";

const certificationsData = [
  {
    id: "c1",
    name: "Certificación de Calidad ISO 9001",
    shortName: "ISO 9001",
    description: "Garantizamos la excelencia en la gestión de nuestros procesos y servicios con los más altos estándares internacionales de calidad.",
    icon: Award,
    color: "from-[#F20C0C] to-[#D10000]",
    bgColor: "bg-[#F20C1F]/10",
    iconColor: "text-[#F20C1F]",
    year: "2020",
    validity: "Vigente hasta 2026",
    issuer: "Bureau Veritas",
    benefits: ["Procesos Optimizados", "Calidad Garantizada", "Mejora Continua"]
  },
  {
    id: "c2",
    name: "Hotel Sostenible (Green Key)",
    shortName: "Green Key",
    description: "Comprometidos con prácticas ecológicas y la reducción de nuestra huella ambiental para un turismo más sostenible.",
    icon: Leaf,
    color: "from-[#F20C0C] to-[#D10000]",
    bgColor: "bg-[#F20C1F]/10",
    iconColor: "text-[#F20C1F]",
    year: "2019",
    validity: "Certificación Anual",
    issuer: "Foundation for Environmental Education",
    benefits: ["Energía Renovable", "Gestión de Residuos", "Conservación del Agua"]
  },
  {
    id: "c3",
    name: "Premio a la Hospitalidad Global",
    shortName: "Global Hospitality",
    description: "Reconocidos internacionalmente por nuestro servicio excepcional y la satisfacción del cliente a nivel mundial.",
    icon: Globe,
    color: "from-[#F20C0C] to-[#D10000]",
    bgColor: "bg-[#F20C1F]/10",
    iconColor: "text-[#F20C1F]",
    year: "2023",
    validity: "Premio Anual",
    issuer: "World Hospitality Awards",
    benefits: ["Reconocimiento Mundial", "Servicio Excepcional", "Satisfacción Cliente"]
  },
];

const additionalAwards = [
  {
    icon: Trophy,
    title: "Mejor Hotel Boutique",
    year: "2023",
    organization: "Tourism Excellence Awards"
  },
  {
    icon: Medal,
    title: "Excelencia en Servicio",
    year: "2022",
    organization: "Hospitality Industry Council"
  },
  {
    icon: Crown,
    title: "Hotel de Lujo del Año",
    year: "2021",
    organization: "Luxury Travel Magazine"
  },
  {
    icon: Star,
    title: "5 Estrellas Diamond",
    year: "2020",
    organization: "AAA Tourism"
  }
];

const stats = [
  {
    icon: Shield,
    number: "15+",
    label: "Certificaciones",
    description: "Reconocimientos oficiales"
  },
  {
    icon: Trophy,
    number: "25+",
    label: "Premios",
    description: "Galardones internacionales"
  },
  {
    icon: Users,
    number: "100%",
    label: "Cumplimiento",
    description: "Estándares de calidad"
  },
  {
    icon: Heart,
    number: "99%",
    label: "Satisfacción",
    description: "Huéspedes certifican"
  }
];

export const CertificationsSection = () => {
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
            <Shield className="w-4 h-4" />
            Certificaciones y Reconocimientos
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#0D0D0D] mb-6 leading-tight">
            Nuestras <span className="text-[#F20C1F]">Certificaciones</span> y 
            <span className="text-[#0D0D0D]"> Reconocimientos</span>
          </h2>
          <p className="text-lg text-[#0D0D0D] max-w-3xl mx-auto leading-relaxed">
            Orgullosos de los estándares de calidad y sostenibilidad que nos avalan,
            respaldando nuestro compromiso con la excelencia en cada servicio.
          </p>
        </div>

        {/* Main Certifications */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {certificationsData.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.2 }}
              className="group"
            >
              <Card className="h-full shadow-md sm:shadow-lg border border-gray-200 bg-white hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden">
                {/* Top Gradient Bar */}
                <div className={`h-2 bg-gradient-to-r ${cert.color}`}></div>
                
                <CardContent className="p-6 sm:p-8 relative">
                  {/* Background Pattern */}
                  <div className={`absolute top-0 right-0 w-24 h-24 ${cert.bgColor} rounded-full opacity-20 transform translate-x-8 -translate-y-8`}></div>
                  
                  {/* Header */}
                  <div className="relative z-10 mb-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-4 sm:p-5 ${cert.bgColor} rounded-2xl border border-[#F20C1F]/20 group-hover:scale-110 transition-transform duration-300`}>
                        <cert.icon className={`w-8 h-8 sm:w-10 sm:h-10 ${cert.iconColor}`} />
                      </div>
                      <Badge className="bg-[#F20C1F] text-[#fff] text-xs px-2 py-1">
                        {cert.year}
                      </Badge>
                    </div>
                    
                    <h3 className="text-xl sm:text-2xl font-bold text-[#0D0D0D] mb-2 leading-tight">
                      {cert.name}
                    </h3>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <CheckCircle className="w-4 h-4 text-[#F20C1F]" />
                      <span className="text-sm text-[#F20C1F] font-medium">
                        {cert.validity}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 space-y-4">
                    <p className="text-sm sm:text-base text-[#0D0D0D] leading-relaxed">
                      {cert.description}
                    </p>

                    {/* Issuer */}
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-[#0D0D0D]">
                      <Award className="w-4 h-4 text-[#0D0D0D]" />
                      <span>Emitido por: <strong>{cert.issuer}</strong></span>
                    </div>

                    {/* Benefits */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-[#0D0D0D]">Beneficios:</h4>
                      <div className="space-y-1">
                        {cert.benefits.map((benefit, benefitIndex) => (
                          <div key={benefitIndex} className="flex items-center gap-2 text-xs sm:text-sm text-[#0D0D0D]">
                            <div className="w-1.5 h-1.5 bg-[#F20C1F] rounded-full"></div>
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Awards */}
        <div className="mb-16 transform transition-all duration-1000 delay-700 translate-y-0 opacity-100">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0D0D0D] mb-3 sm:mb-4">
              Premios y <span className="text-[#F20C1F]">Reconocimientos</span>
            </h3>
            <p className="text-sm sm:text-base lg:text-lg text-[#0D0D0D] max-w-2xl mx-auto px-4">
              Una trayectoria de excelencia reconocida por las principales organizaciones del sector
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {additionalAwards.map((award, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              >
                <Card className="shadow-md sm:shadow-lg border border-gray-200 bg-white hover:shadow-xl transition-all duration-300 transform hover:scale-105 h-full">
                  <CardContent className="p-4 sm:p-6 text-center h-full flex flex-col justify-center">
                    <div className="p-3 sm:p-4 bg-[#F20C1F]/10 rounded-full w-fit mx-auto mb-3 sm:mb-4">
                      <award.icon className="w-6 h-6 sm:w-8 sm:h-8 text-[#F20C1F]" />
                    </div>
                    <h4 className="text-sm sm:text-base font-bold text-[#0D0D0D] mb-1 sm:mb-2 leading-tight">
                      {award.title}
                    </h4>
                    <Badge className="bg-[#F20C1F] text-[#fff] text-xs px-2 py-1 mb-2">
                      {award.year}
                    </Badge>
                    <p className="text-xs sm:text-sm text-[#0D0D0D]/70">
                      {award.organization}
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