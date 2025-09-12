import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, Leaf, Clock, Users, Star, Wine, ChefHat } from "lucide-react";
import { diningExperiences, type DiningExperience } from './experiences.data';
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate 
import { ReservationModal } from "./ReservationModal";

const getTypeIcon = (type: string) => {
  switch (type) {
    case "Cena":
      return <Star className="w-3 h-3 sm:w-4 sm:h-4" />;
    case "Degustación":
      return <Wine className="w-3 h-3 sm:w-4 sm:h-4" />;
    case "Taller":
      return <ChefHat className="w-3 h-3 sm:w-4 sm:h-4" />;
    default:
      return <Users className="w-3 h-3 sm:w-4 sm:h-4" />;
  }
};

export const CulinaryExperiencesSection = () => {
  const navigate = useNavigate(); // Hook para navegación programática 
  const [selectedExperience, setSelectedExperience] = useState<DiningExperience | null>(null);
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);

  // Función actualizada para navegar a la página de detalles 
  const handleViewDetails = (experience: DiningExperience) => {
    // Navegar a la ruta dinámica de detalles de experiencia
    navigate(`/experiences/${experience.id}`);
  };

  // Función para abrir modal de reserva directamente
  const handleReserveNow = (experience: DiningExperience) => {
    setSelectedExperience(experience);
    setIsReservationModalOpen(true);
  };

  // Función alternativa para navegación con estado (opcional) 

  // Función para navegación con query params (alternativa) 
  // const handleViewDetailsWithQuery = (experience: DiningExperience) => {
  //   navigate(`/experiences/${experience.id}?name=${encodeURIComponent(experience.name)}&price=${experience.price}`);
  // };

  return (
    <>
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-20 sm:w-32 h-20 sm:h-32 bg-[#F20C1F]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-24 sm:w-40 h-24 sm:h-40 bg-[#020659]/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 sm:mb-12 lg:mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-[#F20C1F]/10 px-3 sm:px-4 py-2 rounded-full mb-4 sm:mb-6">
              <ChefHat className="w-4 sm:w-5 h-4 sm:h-5 text-[#F20C1F]" />
              <span className="text-[#F20C1F] font-semibold text-sm sm:text-base">Experiencias Únicas</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#0D0D0D] mb-4 sm:mb-6 leading-tight px-4">
              Experiencias Gastronómicas
              <span className="block text-[#F20C1F]">Exclusivas</span>
            </h2>

            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
              Descubre sabores excepcionales y vive momentos únicos durante tu estancia
            </p>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {diningExperiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="h-full"
              >
                <Card className="group overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border-0 bg-white/80 backdrop-blur-sm hover:bg-white hover:scale-105 cursor-pointer h-full flex flex-col">
                  {/* Image Container - También navegable al hacer click */}
                  <div 
                    className="relative h-40 sm:h-48 md:h-52 lg:h-48 xl:h-52 overflow-hidden cursor-pointer"
                    onClick={() => handleViewDetails(experience)} // Navegación desde imagen
                  >
                    <img
                      src={experience.image}
                      alt={experience.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Price Badge */}
                    <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-[#F20C1F] text-white px-2 sm:px-3 py-1 rounded-full font-bold text-sm sm:text-lg shadow-lg">
                      ${experience.price}
                    </div>

                    {/* Type Badge */}
                    <div className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-white/90 backdrop-blur-sm text-[#020659] px-2 sm:px-3 py-1 rounded-full font-medium text-xs sm:text-sm flex items-center gap-1 sm:gap-2 shadow-lg">
                      {getTypeIcon(experience.type)}
                      <span className="hidden xs:inline">{experience.type}</span>
                    </div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                  
                  <CardContent className="p-3 sm:p-4 md:p-6 flex flex-col flex-grow">
                    {/* Title - También navegable */}
                    <div className="h-12 sm:h-14 md:h-16 mb-3 sm:mb-4">
                      <h3 
                        className="text-lg sm:text-xl font-bold text-[#0D0D0D] group-hover:text-[#F20C1F] transition-colors duration-300 line-clamp-2 leading-tight cursor-pointer"
                        onClick={() => handleViewDetails(experience)} // Navegación desde título
                      >
                        {experience.name}
                      </h3>
                    </div>

                    {/* Description */}
                    <div className="h-10 sm:h-12 mb-4 sm:mb-6">
                      <p className="text-gray-600 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                        {experience.description}
                      </p>
                    </div>

                    {/* Info Grid */}
                    <div className="mb-4 sm:mb-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm">
                        <div className="flex items-center text-gray-700">
                          <Clock className="w-3 sm:w-4 h-3 sm:h-4 mr-2 text-[#F20C1F] flex-shrink-0" />
                          <span className="truncate">{experience.duration}</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <CalendarDays className="w-3 sm:w-4 h-3 sm:h-4 mr-2 text-[#F20C1F] flex-shrink-0" />
                          <span className="truncate">{experience.time}</span>
                        </div>
                        {experience.isVegetarianFriendly && (
                          <div className="flex items-center text-gray-700 col-span-1 sm:col-span-2">
                            <Leaf className="w-3 sm:w-4 h-3 sm:h-4 mr-2 text-green-500 flex-shrink-0" />
                            <span className="truncate">Opción vegetariana</span>
                          </div>
                        )}
                        {experience.isAlcoholIncluded && (
                          <div className="flex items-center text-gray-700 col-span-1 sm:col-span-2">
                            <Wine className="w-3 sm:w-4 h-3 sm:h-4 mr-2 text-purple-500 flex-shrink-0" />
                            <span className="truncate">Bebidas incluidas</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-4 sm:mb-6">
                      <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                        <h4 className="font-semibold text-[#0D0D0D] mb-2 text-xs sm:text-sm">Incluye:</h4>
                        <ul className="grid grid-cols-1 gap-1 text-xs">
                          {experience.features.map((feature, index) => (
                            <li key={index} className="flex items-center text-gray-600">
                              <span className="w-1 sm:w-1.5 h-1 sm:h-1.5 bg-[#F20C1F] rounded-full mr-2 flex-shrink-0"></span>
                              <span className="truncate">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="mt-auto">
                      {/* Footer Info */}
                      <div className="pt-3 sm:pt-4 border-t border-gray-100 text-xs text-gray-500 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
                        <span className="flex items-center gap-1">
                          <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-green-500 rounded-full"></span>
                          <span className="text-xs">Cancelación gratuita</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-blue-500 rounded-full"></span>
                          <span className="text-xs">Sin prepago</span>
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal de Reserva */}
      {selectedExperience && (
        <ReservationModal
          experience={selectedExperience}
          isOpen={isReservationModalOpen}
          onClose={() => setIsReservationModalOpen(false)}
        />
      )}
    </>
  );
};
