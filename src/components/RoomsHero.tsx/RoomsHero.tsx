import { useEffect, useState } from "react";
import { ChevronDown, Star, Award, Users, Bed } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const RoomsHero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const backgroundImages = [
    "/images/hero-background.webp",
    "/images/habitaones hero 2.webp",
    "/images/habitaones hero 3.webp",
  ];

  const stats = [
    {
      icon: (
        <Star className="text-[#000] group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
      ),
      value: "4.9",
      label: "Rating",
    },
    {
      icon: (
        <Award className="text-[#000] group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
      ),
      value: "50+",
      label: "Habitaciones",
    },
    {
      icon: (
        <Users className="text-[#000] group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
      ),
      value: "10K+",
      label: "Huéspedes",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen min-h-[500px] sm:min-h-[600px] lg:min-h-[700px] flex items-end justify-center text-center overflow-hidden">
      {/* Background Images with Slideshow */}
      <div className="absolute inset-0">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-2000 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url('${image}')` }}
          />
        ))}

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#F20C0C]/20 to-transparent" />
      </div>

      {/* Floating Elements - Responsive positioning */}
      <div className="absolute top-10 sm:top-20 left-4 sm:left-10 w-12 h-12 sm:w-20 sm:h-20 bg-white/10 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-20 sm:bottom-32 right-8 sm:right-16 w-20 h-20 sm:w-32 sm:h-32 bg-[#F20C0C]/20 rounded-full blur-2xl animate-pulse delay-1000" />
      <div className="absolute top-1/4 sm:top-1/3 right-8 sm:right-20 w-10 h-10 sm:w-16 sm:h-16 bg-white/5 rounded-full blur-lg animate-pulse delay-500" />

      {/* Animated Icons - Responsive */}
      <div className="absolute top-16 right-16 sm:top-32 sm:right-32 opacity-20">
        <div className="animate-bounce delay-200">
          <Bed className="w-6 h-6 sm:w-8 sm:h-8 text-white/30" />
        </div>
      </div>
      <div className="absolute bottom-24 left-8 sm:bottom-40 sm:left-20 opacity-20">
        <div
          className="animate-bounce delay-700"
          style={{ animationDirection: "reverse" }}
        >
          <Star className="w-4 h-4 sm:w-6 sm:h-6 text-orange-300/40" />
        </div>
      </div>

      {/* Particles - Responsive */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 sm:w-2 sm:h-2 bg-white/20 rounded-full animate-ping"
            style={{
              top: `${20 + i * 15}%`,
              left: `${10 + i * 12}%`,
              animationDelay: `${i * 800}ms`,
              animationDuration: "3s",
            }}
          />
        ))}
      </div>

      {/* Content Container - Positioned lower */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full pb-16 sm:pb-20 lg:pb-24">
        {/* Breadcrumb - Moved down */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-6 sm:mb-8 lg:mb-10"
        >
          <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-white/15 backdrop-blur-md rounded-full text-white/90 text-xs sm:text-sm border border-white/20">
            <Link to="/" className="hover:text-white transition-colors">
              Inicio
            </Link>
            <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 mx-1 sm:mx-2 rotate-[-90deg]" />
            <span className="text-white font-medium">
              Habitaciones & Suites
            </span>
          </div>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight"
        >
          <span className="block">Nuestras</span>
          <span className="block bg-gradient-to-r from-[#F20C0C] via-[#D10000] to-[#A00000] bg-clip-text text-transparent">
            Habitaciones
          </span>
          <span className="block text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light text-white/90 mt-1 sm:mt-2">
            & Suites
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white/90 max-w-4xl mx-auto mb-6 sm:mb-8 leading-relaxed px-2 sm:px-4"
        >
          Descubre el{" "}
          <span className="text-[#F20C1F] font-semibold">confort</span> y la{" "}
          <span className="text-[#F20C1F] font-semibold">elegancia</span> en
          cada rincón de tu estancia.
          <br className="hidden sm:block" />
          <span className="text-white/70 text-xs sm:text-sm md:text-base lg:text-lg block mt-1 sm:mt-2">
            Experiencias únicas diseñadas para superar tus expectativas
          </span>
        </motion.p>

        {/* Stats - Improved responsive grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 mb-6 sm:mb-10 max-w-4xl mx-auto"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-white/15 backdrop-blur-md rounded-lg border border-white/25 hover:bg-white/25 transition-all duration-300 group min-w-0 flex-1 sm:flex-none"
            >
              <div className="text-[#F20C1F] group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                {stat.icon}
              </div>
              <div className="text-left min-w-0">
                <div className="text-white font-bold text-sm sm:text-base lg:text-lg transition-colors duration-300 truncate">
                  {stat.value}
                </div>
                <div className="text-white/70 text-xs sm:text-sm group-hover:text-white/90 transition-colors duration-300 truncate">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons - Improved responsive layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-md sm:max-w-none mx-auto"
        >
          <button className="group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#F20C0C] to-[#F20C1F] hover:from-[#D10000] hover:to-[#B20000] text-white font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 text-sm sm:text-base">
            <span className="flex items-center justify-center gap-2">
              Ver Habitaciones
              <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" />
            </span>
          </button>
          <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white/15 backdrop-blur-md hover:bg-white/25 text-white font-semibold rounded-full border border-white/30 hover:border-white/50 transition-all duration-300 transform hover:scale-105 active:scale-95 text-sm sm:text-base">
            Reservar Ahora
          </button>
        </motion.div>
      </div>

      {/* Image Indicators - Responsive positioning */}
      <div className="absolute bottom-16 sm:bottom-20 right-4 sm:right-8 flex flex-col gap-2">
        {backgroundImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-1.5 sm:w-2 h-6 sm:h-8 rounded-full transition-all duration-300 ${
              index === currentImageIndex
                ? "bg-[#F20C1F] shadow-lg"
                : "bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
};
