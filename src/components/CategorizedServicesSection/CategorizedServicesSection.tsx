import type React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Clock,
  Info,
  Users,
  Dumbbell,
  Waves,
  SpadeIcon as Spa,
  Wifi,
  Star,
  MapPin,
  Phone,
  Calendar,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Zap,
  Crown,
  Sparkles,
  Eye,
  BookOpen,
  Coffee,
  Car,
  Utensils,
  Shield,
  HeadphonesIcon,
  Baby,
  Shirt,
  Briefcase,
  Wine,
  Camera,
  Gift,
} from "lucide-react";

interface ServiceDetail {
  name: string;
  description: string;
  schedule?: string;
  policy?: string;
  icon: React.ComponentType<any>;
  premium?: boolean;
  popular?: boolean;
  price?: string;
  features?: string[];
  location?: string;
  contact?: string;
}

interface ServiceCategory {
  category: string;
  description: string;
  color: string;
  bgColor: string;
  iconColor: string;
  categoryIcon: React.ComponentType<any>;
  services: ServiceDetail[];
}

const categorizedServicesData: ServiceCategory[] = [
  {
    category: "Bienestar y Recreación",
    description: "Espacios diseñados para tu relajación y bienestar físico",
    color: "from-[#F20C0C] to-[#D10000]",
    bgColor: "bg-[#F20C1F]/10",
    iconColor: "text-[#F20C1F]",
    categoryIcon: Spa,
    services: [
      {
        name: "Spa & Masajes Premium",
        description: "Relájate con nuestra variedad de tratamientos y masajes profesionales en un ambiente de lujo y tranquilidad.",
        schedule: "09:00 - 20:00",
        policy: "Se requiere reserva con 24h de antelación",
        icon: Spa,
        premium: true,
        popular: true,
        price: "Desde $80",
        features: ["Masajes Terapéuticos", "Aromaterapia", "Tratamientos Faciales", "Sauna Finlandesa"],
        location: "Piso 3 - Ala Este",
        contact: "Ext. 301"
      },
      {
        name: "Piscina Climatizada Infinity",
        description: "Disfruta de nuestra espectacular piscina infinity climatizada con vista panorámica de la ciudad.",
        schedule: "07:00 - 22:00",
        policy: "Acceso gratuito para huéspedes. Niños siempre acompañados",
        icon: Waves,
        features: ["Vista Panorámica", "Jacuzzi Integrado", "Bar Acuático", "Área para Niños"],
        location: "Azotea - Piso 15",
        contact: "Ext. 150"
      },
      {
        name: "Gimnasio High-Tech",
        description: "Mantente en forma con nuestro equipo de última generación y entrenadores personales disponibles.",
        schedule: "24 horas",
        policy: "Acceso con tarjeta de habitación. Ropa deportiva obligatoria",
        icon: Dumbbell,
        features: ["Equipos Technogym", "Entrenador Personal", "Clases Grupales", "Área de Yoga"],
        location: "Piso 2 - Ala Oeste",
        contact: "Ext. 200"
      },
    ],
  },
  {
    category: "Conectividad y Negocios",
    description: "Servicios profesionales para el viajero de negocios moderno",
    color: "from-[#F20C0C] to-[#D10000]", // ✅ Mismo rojo
    bgColor: "bg-[#F20C1F]/10", // ✅ Fondo rojo claro
    iconColor: "text-[#F20C1F]", // ✅ Ícono rojo
    categoryIcon: Briefcase,
    services: [
      {
        name: "Wi-Fi Ultra Rápido",
        description: "Conexión a internet de fibra óptica de alta velocidad en todo el hotel con velocidades de hasta 1GB.",
        schedule: "24/7",
        policy: "Disponible para todos los huéspedes sin costo adicional",
        icon: Wifi,
        popular: true,
        features: ["1GB de Velocidad", "Cobertura Total", "Soporte Técnico 24/7", "Conexión Segura"],
        location: "Todo el Hotel",
        contact: "Ext. 100"
      },
      {
        name: "Centro de Negocios Executive",
        description: "Espacio profesional equipado con tecnología de vanguardia para reuniones y trabajo remoto.",
        schedule: "08:00 - 20:00",
        policy: "Uso por horas, consultar tarifas en recepción",
        icon: Users,
        premium: true,
        price: "Desde $25/hora",
        features: ["Salas de Reuniones", "Videoconferencia HD", "Secretaria Virtual", "Servicios de Impresión"],
        location: "Piso 1 - Lobby",
        contact: "Ext. 110"
      },
    ],
  },
  {
    category: "Gastronomía y Entretenimiento",
    description: "Experiencias culinarias y de entretenimiento excepcionales",
    color: "from-[#F20C0C] to-[#D10000]",
    bgColor: "bg-[#F20C1F]/10",
    iconColor: "text-[#F20C1F]",
    categoryIcon: Utensils,
    services: [
      {
        name: "Restaurante Gourmet",
        description: "Cocina internacional de autor con ingredientes premium y maridajes exclusivos.",
        schedule: "07:00 - 23:00",
        policy: "Reservas recomendadas para cenas",
        icon: Utensils,
        premium: true,
        popular: true,
        features: ["Chef Michelin", "Menú Degustación", "Carta de Vinos Premium", "Terraza Privada"],
        location: "Piso 1 - Vista al Jardín",
        contact: "Ext. 401"
      },
      {
        name: "Sky Bar & Lounge",
        description: "Bar en la azotea con cócteles artesanales y vista de 360° de la ciudad.",
        schedule: "18:00 - 02:00",
        policy: "Solo mayores de 21 años después de las 22:00",
        icon: Wine,
        premium: true,
        features: ["Vista 360°", "Cócteles Artesanales", "DJ en Vivo", "Área VIP"],
        location: "Azotea - Piso 16",
        contact: "Ext. 160"
      },
    ],
  },
  {
    category: "Servicios Adicionales",
    description: "Comodidades extra para una experiencia completa",
    color: "from-[#F20C0C] to-[#D10000]", // ✅ Mismo rojo
    bgColor: "bg-[#F20C1F]/10", // ✅ Fondo rojo claro
    iconColor: "text-[#F20C1F]", // ✅ Ícono rojo
    categoryIcon: HeadphonesIcon,
    services: [
      {
        name: "Concierge Premium 24/7",
        description: "Servicio personalizado para reservas, tours, transporte y cualquier necesidad especial.",
        schedule: "24 horas",
        policy: "Disponible para todos los huéspedes",
        icon: HeadphonesIcon,
        popular: true,
        features: ["Asistencia Personal", "Reservas de Shows", "Tours Privados", "Transporte VIP"],
        location: "Lobby Principal",
        contact: "Ext. 000"
      },
      {
        name: "Servicio de Lavandería Express",
        description: "Servicio de lavandería y tintorería con entrega el mismo día.",
        schedule: "08:00 - 18:00",
        policy: "Recogida antes de las 10:00 para entrega mismo día",
        icon: Shirt,
        price: "Desde $15",
        features: ["Servicio Express", "Planchado Profesional", "Tintorería", "Entrega en Habitación"],
        location: "Piso -1",
        contact: "Ext. 250"
      },
      {
        name: "Estacionamiento Valet",
        description: "Servicio de estacionamiento con valet para tu comodidad y seguridad.",
        schedule: "24 horas",
        policy: "Sujeto a disponibilidad",
        icon: Car,
        price: "$30/noche",
        features: ["Servicio Valet", "Seguridad 24/7", "Lavado de Auto", "Carga Eléctrica"],
        location: "Entrada Principal",
        contact: "Ext. 050"
      },
    ],
  },
];

const serviceStats = [
  {
    icon: Star,
    number: "50+",
    label: "Servicios",
    description: "Disponibles 24/7"
  },
  {
    icon: Users,
    number: "200+",
    label: "Staff",
    description: "Profesionales certificados"
  },
  {
    icon: Clock,
    number: "24/7",
    label: "Atención",
    description: "Servicio continuo"
  },
  {
    icon: Shield,
    number: "100%",
    label: "Garantía",
    description: "Satisfacción asegurada"
  }
];

export const CategorizedServicesSection = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 xl:py-24 bg-white relative overflow-hidden">
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
          <div className="inline-flex items-center gap-2 bg-[#F20C1F] text-[#fff] px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            <Crown className="w-3 h-3 sm:w-4 sm:h-4" />
            Servicios Premium
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#0D0D0D] mb-4 sm:mb-6 leading-tight px-4">
            Servicios del <span className="text-[#F20C1F]">Hotel</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-[#0D0D0D] max-w-4xl mx-auto leading-relaxed px-4">
            Descubre la amplia gama de servicios diseñados para tu comodidad y disfrute,
            cada uno pensado para superar tus expectativas.
          </p>
        </motion.div>

        {/* Service Categories */}
        {categorizedServicesData.map((categoryData, categoryIndex) => (
          <motion.div
            key={categoryData.category}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 + categoryIndex * 0.3 }}
            className="mb-12 sm:mb-16 lg:mb-20 last:mb-0"
          >
            {/* Category Header */}
            <div className="text-center mb-8 sm:mb-12">
              <div className="inline-flex items-center gap-3 mb-4 sm:mb-6">
                <div className={`p-3 sm:p-4 ${categoryData.bgColor} rounded-2xl border border-[#F20C1F]/20`}>
                  <categoryData.categoryIcon className={`w-6 h-6 sm:w-8 sm:h-8 ${categoryData.iconColor}`} />
                </div>
                <div className="text-left">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0D0D0D] leading-tight">
                    {categoryData.category}
                  </h3>
                  <p className="text-sm sm:text-base text-[#0D0D0D] mt-1">
                    {categoryData.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
              {categoryData.services.map((service, serviceIndex) => (
                <motion.div
                  key={serviceIndex}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 + categoryIndex * 0.3 + serviceIndex * 0.1 }}
                  className="group"
                >
                  <Card className="h-full shadow-md sm:shadow-lg border border-gray-200 bg-white hover:shadow-xl transition-all duration-500 transform hover:scale-105 overflow-hidden">
                    {/* Top Gradient Bar */}
                    <div className={`h-2 bg-gradient-to-r ${categoryData.color}`}></div>

                    <CardContent className="p-6 sm:p-8 relative h-full flex flex-col">
                      {/* Background Pattern */}
                      <div className={`absolute top-0 right-0 w-24 h-24 ${categoryData.bgColor} rounded-full opacity-20 transform translate-x-8 -translate-y-8`}></div>

                      {/* Header */}
                      <div className="relative z-10 mb-4 sm:mb-6">
                        <div className="flex items-start justify-between mb-3 sm:mb-4">
                          <div className={`p-3 sm:p-4 ${categoryData.bgColor} rounded-xl border border-[#F20C1F]/20 group-hover:scale-110 transition-transform duration-300`}>
                            <service.icon className={`w-6 h-6 sm:w-8 sm:h-8 ${categoryData.iconColor}`} />
                          </div>
                          <div className="flex flex-col gap-2">
                            {service.premium && (
                              <Badge className="bg-[#F20C1F] text-white text-xs px-2 py-1">
                                <Crown className="w-3 h-3 mr-1" />
                                Premium
                              </Badge>
                            )}
                            {service.popular && (
                              <Badge className="bg-[#F20C1F] text-white text-xs px-2 py-1">
                                <Star className="w-3 h-3 mr-1" />
                                Popular
                              </Badge>
                            )}
                          </div>
                        </div>

                        <h4 className="text-xl sm:text-2xl font-bold text-[#0D0D0D] mb-2 sm:mb-3 leading-tight">
                          {service.name}
                        </h4>

                        {service.price && (
                          <div className="text-lg sm:text-xl font-bold text-[#F20C1F] mb-2">
                            {service.price}
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="relative z-10 flex-1 space-y-3 sm:space-y-4">
                        <p className="text-sm sm:text-base text-[#0D0D0D] leading-relaxed">
                          {service.description}
                        </p>

                        {service.features && (
                          <div className="space-y-2">
                            <h5 className="text-sm font-semibold text-[#0D0D0D]">Incluye:</h5>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                              {service.features.slice(0, 4).map((feature, featureIndex) => (
                                <div key={featureIndex} className="flex items-center gap-2 text-xs sm:text-sm text-[#0D0D0D]">
                                  <CheckCircle className="w-3 h-3 text-[#F20C1F] flex-shrink-0" />
                                  <span className="truncate">{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="space-y-2">
                          {service.schedule && (
                            <div className="flex items-center gap-2 text-xs sm:text-sm text-[#0D0D0D]">
                              <Clock className="w-4 h-4 text-[#F20C1F] flex-shrink-0" />
                              <span><strong>Horario:</strong> {service.schedule}</span>
                            </div>
                          )}
                          {service.location && (
                            <div className="flex items-center gap-2 text-xs sm:text-sm text-[#0D0D0D]">
                              <MapPin className="w-4 h-4 text-[#F20C1F] flex-shrink-0" />
                              <span><strong>Ubicación:</strong> {service.location}</span>
                            </div>
                          )}
                          {service.contact && (
                            <div className="flex items-center gap-2 text-xs sm:text-sm text-[#0D0D0D]">
                              <Phone className="w-4 h-4 text-[#F20C1F] flex-shrink-0" />
                              <span><strong>Contacto:</strong> {service.contact}</span>
                            </div>
                          )}
                          {service.policy && (
                            <div className="flex items-start gap-2 text-xs sm:text-sm text-[#0D0D0D]">
                              <AlertCircle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                              <span><strong>Política:</strong> {service.policy}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};