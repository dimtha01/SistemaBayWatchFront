import { useState, useEffect } from "react";
import { ChevronDown, Star, Award, Utensils, Clock } from "lucide-react";
import { Link } from "react-router-dom";

export const GastronomyHero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const backgroundImages = [
    "/images/gastronomia banner.webp",
    "/images/gastronomia banner 2.webp",
    "/images/gastronomia banner 3.webp",
  ];

  const stats = [
    {
      icon: (
        <Star className="text-[#000] group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
      ),
      value: "4.8",
      label: "Rating",
    },
    {
      icon: (
        <Utensils className="text-[#000] group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
      ),
      value: "200+",
      label: "Platillos",
    },
    {
      icon: (
        <Award className="text-[#000] group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
      ),
      value: "5",
      label: "Chefs",
    },
    {
      icon: (
        <Clock className="text-[#000] group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
      ),
      value: "24/7",
      label: "Servicio",
    },
  ];

  useEffect(() => {
    setIsLoaded(true);

    // Auto-rotate background images every 8 seconds
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen h-screen max-h-[1200px] flex items-center justify-center text-center overflow-hidden">
      {/* Background Images with Slideshow */}
      <div className="absolute inset-0">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-2000 ease-in-out ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url('${image}')` }}
          />
        ))}

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60 sm:from-black/30 sm:via-black/50 sm:to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#F20C0C]/10 to-transparent sm:from-[#F20C0C]/20" />
      </div>

      {/* Floating Elements - Responsive positioning */}
      <div className="absolute top-10 left-4 w-12 h-12 sm:top-20 sm:left-10 sm:w-20 sm:h-20 bg-white/10 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-20 right-8 w-20 h-20 sm:bottom-32 sm:right-16 sm:w-32 sm:h-32 bg-[#F20C0C]/20 rounded-full blur-2xl animate-pulse delay-1000" />
      <div className="absolute top-1/4 right-8 w-10 h-10 sm:top-1/3 sm:right-20 sm:w-16 sm:h-16 bg-white/5 rounded-full blur-lg animate-pulse delay-500" />

      {/* Content Container - Positioned in center */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full mt-20 sm:mt-24 lg:mt-32">
        {/* Breadcrumb */}
        <div
          className={`mb-6 sm:mb-8 transform transition-all duration-1000 delay-300 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <div className="inline-flex items-center px-4 py-2 sm:px-7 bg-white/10 backdrop-blur-md rounded-full text-white/80 text-xs sm:text-sm hover:bg-white/20 transition-all duration-300">
            <Link to="/" className="hover:text-white transition-colors">
              Inicio
            </Link>
            <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 mx-1 sm:mx-2 rotate-[-90deg]" />
            <span className="text-white font-medium">Gastronomía</span>
          </div>
        </div>

        {/* Main Title */}
        <h1
          className={`text-3xl xs:text-2xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-4 sm:mb-6 leading-tight transform transition-all duration-1000 delay-500 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <span className="block">Nuestra</span>
          <span className="block bg-gradient-to-r from-[#F20C0C] via-[#D10000] to-[#A00000] bg-clip-text text-transparent">
            Gastronomía
          </span>
          <span className="block text-2xl xs:text-3xl sm:text-3xl md:text-2xl lg:text-5xl xl:text-6xl font-light text-white/90 mt-1 sm:mt-2">
            Exquisita
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className={`text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto mb-6 sm:mb-8 leading-relaxed px-2 transform transition-all duration-1000 delay-700 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          Un viaje culinario que{" "}
          <span className="text-[#F20C1F] font-semibold">deleitará</span> todos
          tus sentidos con{" "}
          <span className="text-[#F20C1F] font-semibold">sabores únicos</span>.
          <br className="hidden sm:block" />
          <span className="text-white/70 text-sm sm:text-base md:text-lg block mt-1 sm:mt-2">
            Experiencias gastronómicas diseñadas por chefs expertos
          </span>
        </p>

        {/* Stats - Improved responsive grid */}
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

        {/* CTA Buttons - Improved responsive layout */}
      </div>

      {/* Image Indicators - Responsive positioning */}
      <div className="absolute bottom-8 right-4 sm:bottom-20 sm:right-8 flex flex-col gap-1 sm:gap-2">
        {backgroundImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-1.5 h-6 sm:w-2 sm:h-8 rounded-full transition-all duration-300 hover:scale-110 hover:w-2 sm:hover:w-3 ${
              index === currentImageIndex
                ? "bg-[#F20C1F] shadow-lg animate-pulse"
                : "bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator - Solo en pantallas grandes */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden sm:block">
        <div className="animate-bounce">
          <ChevronDown className="w-6 h-6 text-white/50" />
        </div>
      </div>
    </section>
  );
};
