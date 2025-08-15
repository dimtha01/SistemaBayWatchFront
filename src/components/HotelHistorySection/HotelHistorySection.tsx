import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Calendar,
  Award,
  Users,
  Heart,
  Star,
  Crown,
  Building,
  Sparkles,
  Clock,
  MapPin,
  Trophy,
  Diamond,
  ArrowRight,
  Play,
  ImageIcon,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

// Componente wrapper personalizado para Link + Button
const LinkButton = ({ to, children, className, variant, ...props }) => {
  return (
    <Link to={to} className="inline-block">
      <Button className={className} variant={variant} {...props}>
        {children}
      </Button>
    </Link>
  );
};

export const HotelHistorySection = () => {
  const navigate = useNavigate();

  const milestones = [
    {
      year: "1985",
      title: "Fundación",
      description: "Apertura como hotel familiar boutique con 20 habitaciones",
      icon: Building,
      color: "bg-[#F20C1F]",
      details: "Comenzamos como un pequeño hotel familiar en el corazón de la ciudad"
    },
    {
      year: "1992",
      title: "Primera Expansión",
      description: "Inauguración del ala de suites premium y restaurante gourmet",
      icon: Crown,
      color: "bg-[#F20C1F]",
      details: "Duplicamos nuestra capacidad y añadimos servicios de lujo"
    },
    {
      year: "2005",
      title: "Renovación Completa",
      description: "Modernización total manteniendo la elegancia clásica",
      icon: Sparkles,
      color: "bg-[#F20C1F]",
      details: "Inversión de $2M en renovación completa de todas las instalaciones"
    },
    {
      year: "2018",
      title: "Reconocimiento Internacional",
      description: "Premio al mejor hotel boutique de la región",
      icon: Trophy,
      color: "bg-[#F20C1F]",
      details: "Reconocido por la Asociación Mundial de Hoteles de Lujo"
    },
  ];

  const achievements = [
    {
      icon: Star,
      number: "5",
      label: "Estrellas",
      description: "Calificación de lujo",
      color: "text-[#F20C1F]"
    },
    {
      icon: Users,
      number: "50K+",
      label: "Huéspedes",
      description: "Satisfechos anualmente",
      color: "text-[#F20C1F]"
    },
    {
      icon: Award,
      number: "15",
      label: "Premios",
      description: "Reconocimientos internacionales",
      color: "text-[#F20C1F]"
    },
    {
      icon: Heart,
      number: "98%",
      label: "Satisfacción",
      description: "Índice de recomendación",
      color: "text-[#F20C1F]"
    },
  ];

  // Función para manejar navegación programática
  const handleNavigateToGallery = () => {
    navigate('/aboutUsGalery');
  };

  const handlePlayVideo = () => {
    // Aquí puedes implementar la lógica para reproducir video
    console.log('Reproducir video de historia del hotel');
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
            <Clock className="w-4 h-4" />
            Nuestra Historia
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#0D0D0D] mb-6 leading-tight">
            Una <span className="text-[#F20C1F]">Tradición</span> de Excelencia
          </h2>
          <p className="text-lg text-[#0D0D0D] max-w-3xl mx-auto leading-relaxed">
            Desde 1985, hemos sido pioneros en redefinir la hospitalidad de lujo,
            creando experiencias memorables que trascienden el tiempo.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-16">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:order-2 relative"
          >
            <div className="relative group">
              <div className="relative overflow-hidden rounded-2xl shadow-lg sm:shadow-xl">
                <img
                  src="/images/hotel.webp"
                  alt="Historia del Hotel BookMe"
                  className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="p-4 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                    <Play className="w-6 h-6 text-white fill-current" />
                  </div>
                </div>

                {/* Overlay Badge */}
                <div className="absolute bottom-3 left-3 right-3">
                  <Card className="bg-white/90 backdrop-blur-sm border border-gray-200 shadow-lg">
                    <CardContent className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-[#F20C1F]/10 rounded-full">
                          <Diamond className="w-4 h-4 text-[#F20C1F]" />
                        </div>
                        <div>
                          <h4 className="font-bold text-[#0D0D0D] text-sm">
                            Hotel BookMe
                          </h4>
                          <p className="text-gray-600 text-xs">
                            Desde 1985 • Tradición y Elegancia
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-2 -right-2 w-16 h-16 bg-[#F20C1F]/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-2 -left-2 w-20 h-20 bg-[#020659]/10 rounded-full blur-xl"></div>
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:order-1 space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#020659]/10 rounded-full">
                  <MapPin className="w-5 h-5 text-[#0D0D0D]" />
                </div>
                <Badge className="bg-[#F20C1F]/10 text-[#F20C1F] text-xs px-2 py-1">
                  Establecido en 1985
                </Badge>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0D0D0D] leading-tight">
                Una Historia de 
                <span className="text-[#F20C1F]"> Innovación</span> y 
                <span className="text-[#0D0D0D]"> Tradición</span>
              </h3>

              <div className="space-y-3">
                <p className="text-sm sm:text-base text-[#0D0D0D] leading-relaxed">
                  Fundado en 1985, el <strong>Hotel BookMe</strong> comenzó como un pequeño 
                  establecimiento familiar con la visión de ofrecer una experiencia de 
                  hospitalidad inigualable. A lo largo de las décadas, hemos crecido y 
                  nos hemos modernizado, pero siempre manteniendo la calidez y el 
                  servicio personalizado que nos caracterizan.
                </p>
                
                <p className="text-sm sm:text-base text-[#0D0D0D] leading-relaxed">
                  Desde nuestros humildes comienzos, hemos sido testigos de 
                  innumerables historias de huéspedes, celebraciones y momentos 
                  especiales, convirtiéndonos en un referente de lujo y confort en la 
                  región.
                </p>

                <p className="text-sm sm:text-base text-[#0D0D0D] leading-relaxed">
                  Hoy, después de casi cuatro décadas, continuamos innovando mientras 
                  honramos nuestras raíces, ofreciendo experiencias que combinan la 
                  elegancia atemporal con las comodidades modernas.
                </p>
              </div>
            </div>

            {/* Call to Action - CORREGIDO CON MÚLTIPLES OPCIONES */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/aboutUsGalery">
                <Button className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-[#F20C1F] to-[#D10000] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-sm">
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Conocer Más
                </Button>
              </Link>

              
              <Button 
                onClick={handlePlayVideo}
                variant="outline" 
                className="w-full sm:w-auto px-6 py-3 border-2 border-[#F20C1F] text-[#0D0D0D] font-semibold rounded-xl hover:bg-[#D10000] hover:text-white transition-all duration-300 text-sm"
              >
                <Play className="w-4 h-4 mr-2" />
                Ver Video
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Timeline Section - NUEVO */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0D0D0D] mb-3">
              Nuestra <span className="text-[#F20C1F]">Evolución</span>
            </h3>
            <p className="text-sm sm:text-base text-[#0D0D0D] max-w-2xl mx-auto">
              Momentos clave que han definido nuestra historia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <CardContent className="p-6 text-center h-full flex flex-col">
                    <div className="p-3 bg-[#F20C1F]/10 rounded-full w-fit mx-auto mb-4">
                      <milestone.icon className="w-6 h-6 text-[#F20C1F]" />
                    </div>
                    <div className="text-2xl font-bold text-[#F20C1F] mb-2">
                      {milestone.year}
                    </div>
                    <h4 className="text-lg font-semibold text-[#0D0D0D] mb-2">
                      {milestone.title}
                    </h4>
                    <p className="text-sm text-[#0D0D0D]/70 flex-grow">
                      {milestone.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Achievements Section */}
        <div className="text-center transform transition-all duration-1000 delay-700 translate-y-0 opacity-100">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0D0D0D] mb-3">
            Nuestros <span className="text-[#F20C1F]">Logros</span>
          </h3>
          <p className="text-sm sm:text-base text-[#0D0D0D] max-w-2xl mx-auto mb-8">
            Números que reflejan nuestro compromiso con la excelencia
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              >
                <Card className="shadow-md sm:shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:scale-105 h-full">
                  <CardContent className="p-4 text-center h-full flex flex-col justify-center">
                    <div className="p-3 bg-[#F20C1F]/10 rounded-full w-fit mx-auto mb-3">
                      <achievement.icon className={`w-6 h-6 ${achievement.color}`} />
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold text-[#0D0D0D] mb-1">
                      {achievement.number}
                    </div>
                    <div className="text-sm sm:text-base font-semibold text-[#0D0D0D] mb-1">
                      {achievement.label}
                    </div>
                    <div className="text-xs sm:text-sm text-[#0D0D0D]/70">
                      {achievement.description}
                    </div>
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
