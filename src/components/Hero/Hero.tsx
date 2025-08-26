import { useState, useEffect } from "react";
import { ChevronDown, Star, Award, Clock, Calendar } from "lucide-react";
import { motion } from "framer-motion";

export const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const stats = [
    {
      icon: (
        <Star className="text-[#F20C1F] group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
      ),
      value: "4.8",
      label: "Rating",
    },
    {
      icon: (
        <Award className="text-[#F20C1F] group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
      ),
      value: "50+",
      label: "Habitaciones",
    },
    {
      icon: (
        <Award className="text-[#F20C1F] group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
      ),
      value: "5",
      label: "Chefs",
    },
    {
      icon: (
        <Clock className="text-[#F20C1F] group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
      ),
      value: "24/7",
      label: "Servicio",
    },
  ];

  useEffect(() => {
    // Inicia animación al montar el componente
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen max-h-[1200px] h-screen flex items-center justify-center overflow-hidden py-8 sm:py-12 md:py-16 lg:py-20 rounded-b-4xl">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/hero-background.webp')",
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-[#0D0D0D]/40" />
      </div>

      {/* Content - Perfectamente centrado */}
      <div className="relative mx-auto text-center items-center z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-32 sm:pt-36 md:pt-40 lg:pt-32 xl:pt-28">
        {/* Títulos Principales */}
        <div className="mb-2 sm:mb-12 lg:mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className={`text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-4 sm:mb-6 leading-tight transform transition-all duration-1000 delay-500 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <span className="block"> Bienvenido a </span>
            <span className="block bg-gradient-to-r from-[#F20C0C] via-[#D10000] to-[#A00000] bg-clip-text text-transparent">
              Baywatch
            </span>
            <span className="block text-2xl xs:text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-white/90 mt-1 sm:mt-2">
              Tu Escape Soñado
            </span>
          </motion.h1>

          {/* Subtítulo */}
          <p
            className={`text-base sm:text-lg md:text-xl lg:text-2xl font-light max-w-2xl sm:max-w-3xl lg:max-w-4xl mx-auto leading-relaxed text-gray-300 px-4 sm:px-6 lg:px-0 transition-all duration-1000 delay-700 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            Vive el confort, el lujo y la magia del mar en un solo lugar
            inolvidable
          </p>
        </div>

        {/* Stats Elegantes - Más compactos y centrados */}
        <div
          className={`flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 mb-6 sm:mb-10 px-2 transform transition-all duration-1000 delay-900 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-3 py-2 sm:px-4 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300 group hover:scale-105 sm:hover:scale-110 hover:rotate-1 cursor-pointer min-w-[90px] sm:min-w-[110px]"
            >
              <div className="text-[#F20C1F] group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                {stat.icon}
              </div>
              <div className="text-left">
                <div className="text-white font-bold text-sm sm:text-lg transition-colors duration-300">
                  {stat.value}
                </div>
                <div className="text-white/70 text-xs group-hover:text-white/90 transition-colors duration-300 whitespace-nowrap">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Indicador de scroll elegante - Centrado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="flex flex-col items-center justify-center"
        >
          <p className="text-white/60 text-xs sm:text-sm lg:text-base sm:mb-4 font-light text-center">
            Descubre tu próxima experiencia
          </p>
          <div className="animate-bounce opacity-70 hover:opacity-100 transition-opacity duration-300 cursor-pointer">
            <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-white/50" />
          </div>
        </motion.div>
      </div>

      {/* Floating Decorations - Responsivas */}
      <div
        className="absolute top-16 sm:top-20 left-4 sm:left-10 w-2 h-2 sm:w-3 sm:h-3 rounded-full blur-sm animate-pulse"
        style={{
          backgroundColor: "rgba(242, 226, 5, 0.3)",
          animationDelay: "0s",
        }}
      />
      <div
        className="absolute bottom-32 sm:bottom-40 right-8 sm:right-20 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full blur-xs animate-ping"
        style={{
          backgroundColor: "rgba(242, 12, 31, 0.4)",
          animationDelay: "1s",
        }}
      />
      <div
        className="absolute top-1/3 right-8 sm:right-16 w-3 h-3 sm:w-4 sm:h-4 rounded-full blur-md animate-pulse"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          animationDelay: "2s",
        }}
      />
    </section>
  );
};
