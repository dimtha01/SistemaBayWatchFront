import { useState, useEffect } from "react";
import { ChevronDown, Star, Calendar } from "lucide-react";
import { motion } from "framer-motion";

export const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Inicia animación al montar el componente
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen max-h-[1200px] h-screen flex items-center justify-center overflow-hidden py-8 sm:py-12 md:py-16 lg:py-20">
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
          {/* Título 1 */}
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 sm:mb-4 lg:mb-6 leading-tight text-white transition-all duration-1000 delay-300 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            Bienvenido a Baywatch
          </h1>

          {/* Título 2 con gradiente */}
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 lg:mb-8 leading-tight bg-gradient-to-r from-[#F20C0C] via-[#D10000] to-[#A00000] bg-clip-text text-transparent transition-all duration-1000 delay-500 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            tu escape soñado
          </h2>

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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="flex xs:flex-row justify-center items-center gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-8 lg:mb-10 max-w-xs sm:max-w-md mx-auto"
        >
          {[
            { icon: Star, value: "4.9", label: "Rating Premium" },
            { icon: Calendar, value: "24/7", label: "Servicio" },
          ].map((stat, index) => (
            <div
              key={index}
              className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 lg:py-2.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/15 transition-all duration-300 group w-full xs:w-auto justify-center xs:justify-start"
            >
              <div className="w-3.5 h-3.5 sm:w-5 sm:h-5 lg:w-6 lg:h-6 bg-gradient-to-r from-[#F20C0C] to-[#F20C1F] rounded-full flex items-center justify-center flex-shrink-0">
                <stat.icon className="w-2 h-2 sm:w-3 sm:h-3 lg:w-3.5 lg:h-3.5 text-white" />
              </div>
              <div className="text-left">
                <div className="text-white font-bold text-xs sm:text-sm lg:text-base">
                  {stat.value}
                </div>
                <div className="text-white/70 text-[10px] sm:text-xs lg:text-sm group-hover:text-white/90 transition-colors duration-300">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons - Más delgados y elegantes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8 justify-center items-center max-w-xs sm:max-w-md lg:max-w-2xl mx-auto mb-4 sm:mb-12 lg:mb-16"
        >
          {/* Botón Principal - Explorar (más delgado) */}
          <button className="group w-full sm:w-auto px-5 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-3.5 bg-gradient-to-r from-[#F20C0C] to-[#F20C1F] hover:from-[#D10000] hover:to-[#B20000] text-white font-bold rounded-full shadow-2xl hover:shadow-[0_20px_40px_rgba(242,12,12,0.4)] transition-all duration-500 transform hover:scale-105 active:scale-95 text-sm sm:text-base lg:text-lg relative overflow-hidden min-w-0">
            {/* Efecto de brillo */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <span className="flex items-center justify-center gap-2 sm:gap-3 relative z-10 whitespace-nowrap">
              Explorar Baywatch
              <ChevronDown className="w-4 h-4 sm:w-4 sm:h-4 lg:w-5 lg:h-5 group-hover:translate-y-1 group-hover:scale-110 transition-all duration-300 flex-shrink-0" />
            </span>
          </button>

          {/* Botón Secundario - Reservar (más delgado) */}
          <button className="group w-full sm:w-auto px-5 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-3.5 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white font-semibold rounded-full border-2 border-white/30 hover:border-white/60 transition-all duration-500 transform hover:scale-105 active:scale-95 text-sm sm:text-base lg:text-lg relative overflow-hidden min-w-0">
            {/* Efecto de brillo sutil */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <span className="flex items-center justify-center gap-2 sm:gap-3 relative z-10 whitespace-nowrap">
              <Calendar className="w-4 h-4 sm:w-4 sm:h-4 lg:w-5 lg:h-5 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 flex-shrink-0" />
              Reservar Ahora
            </span>
          </button>
        </motion.div>

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
