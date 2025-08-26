import { useState, useEffect } from "react";
import { ArrowDown, Star, Users, Gift, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

export const RegisterHero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="relative min-h-screen max-h-[1200px] flex items-center justify-center overflow-hidden">
      {/* Imagen de fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/imagen de login banner.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundAttachment: "fixed", // Opcional: da efecto parallax
        }}
      >
        {/* Overlay degradado para legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/80"></div>
      </div>

      {/* Contenido principal - Movido más hacia abajo */}
      <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-32 sm:pt-36 md:pt-40 lg:pt-32 xl:pt-28">
        <div className="max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto text-center">

          {/* 🍞 MIGAJAS/BREADCRUMBS */}
          <div
            className={`mb-6 sm:mb-8 md:mb-10 flex justify-center transform transition-all duration-1000 delay-100 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
          >
            <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-white/15 backdrop-blur-md rounded-full text-white/90 text-xs sm:text-sm border border-white/20">
              <Link to="/" className="hover:text-white transition-colors">
                Inicio
              </Link>
              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mx-2 sm:mx-3 rotate-[-90deg]" />
              <span className="text-white font-medium">Registro</span>
            </div>
          </div>

          {/* Título principal */}
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 md:mb-8 leading-tight transform transition-all duration-1000 delay-400 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
          >
            <span className="block">Únete a</span>
            <span className="block bg-gradient-to-r from-[#F20C1F] to-[#F20C0C] bg-clip-text text-transparent">
              Nuestra Comunidad
            </span>
          </h1>

          {/* Subtítulo */}
          <p
            className={`text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-8 sm:mb-10 md:mb-12 max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed transform transition-all duration-1000 delay-600 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
          >
            Crea tu cuenta y descubre un mundo de posibilidades, miles de usuarios ya disfrutan de nuestros servicios.
          </p>

          {/* Beneficios destacados */}
          <div
            className={`flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-10 md:mb-12 transform transition-all duration-1000 delay-800 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
          >
            {[
              { icon: Star, title: "Experiencia Premium" },
              { icon: Users, title: "Comunidad Activa" },
              { icon: Gift, title: "Beneficios Exclusivos" },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 sm:space-x-3 bg-white/10 backdrop-blur-sm rounded-full px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 border border-white/20 shadow-md hover:bg-white/15 hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-gradient-to-r from-[#F20C1F] to-[#F20C0C] rounded-full flex items-center justify-center">
                  <item.icon className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" />
                </div>
                <h3 className="text-white font-medium text-xs sm:text-sm md:text-base whitespace-nowrap">{item.title}</h3>
              </div>
            ))}
          </div>


          {/* Indicador de scroll */}
          <div
            className={`flex flex-col items-center transform transition-all duration-1000 delay-1200 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
          >
            <p className="text-white/80 text-sm sm:text-base mb-3 sm:mb-4 font-medium">
              Comienza tu registro
            </p>
            <div className="animate-bounce opacity-60 hover:opacity-100 transition-opacity duration-300">
              <ArrowDown className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white/70" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
