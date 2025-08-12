import { useState, useEffect } from "react";
import { ArrowDown, Star, Users, Gift } from "lucide-react";
export const RegisterHero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="relative h-screen flex items-start justify-center pt-12 md:pt-20 overflow-hidden">
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

      {/* Contenido principal */}
      <div className="relative z-10 px-6 max-w-5xl mx-auto text-center mt-16">
        {/* Icono principal */}
        <div
          className={`mb-8 flex justify-center transform transition-all duration-1000 delay-200 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
        >
          <div className="relative">
            <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-4 shadow-xl border border-[#F20C1F] hover:border-[#F20C0C] transition-all">
              <Users className="w-10 h-10 text-[#F20C1F]" />
            </div>
            <div className="absolute -top-2 -right-2 bg-white/20 rounded-full p-1 shadow-md">
              <Star className="w-5 h-5 text-[#F2E205] animate-pulse" />
            </div>
            <div className="absolute -bottom-1 -left-1 bg-white/20 rounded-full p-1 shadow-md">
              <Gift className="w-4 h-4 text-[#F20C1F] animate-bounce delay-500" />
            </div>
          </div>
        </div>

        {/* Título principal */}
        <h1
          className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight transform transition-all duration-1000 delay-400 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
        >
          <span className="block">Únete a</span>
          <span className="block bg-gradient-to-r from-[#F20C1F] to-[#F20C0C] bg-clip-text text-transparent">
            Nuestra Comunidad
          </span>
        </h1>

        {/* Subtítulo */}
        <p
          className={`text-lg sm:text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed transform transition-all duration-1000 delay-600 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
        >
          Crea tu cuenta y descubre un mundo de posibilidades. Únete a miles de usuarios que ya disfrutan de nuestros servicios.
        </p>

        {/* Beneficios destacados */}
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 max-w-4xl mx-auto transform transition-all duration-1000 delay-800 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
        >
          {[
            { icon: Star, title: "Experiencia Premium", desc: "Acceso completo a todas las funcionalidades" },
            { icon: Users, title: "Comunidad Activa", desc: "Conecta con usuarios de todo el mundo" },
            { icon: Gift, title: "Beneficios Exclusivos", desc: "Ofertas especiales y descuentos únicos" },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-[#F20C1F] hover:bg-white/15 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-[#F20C1F] to-[#F20C0C] rounded-xl flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-semibold mb-2">{item.title}</h3>
              <p className="text-white/80 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Estadísticas rápidas */}
        <div
          className={`flex flex-wrap justify-center gap-8 mb-10 transform transition-all duration-1000 delay-1000 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
        >
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-1">10K+</div>
            <div className="text-white/70 text-sm">Usuarios Activos</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-1">50K+</div>
            <div className="text-white/70 text-sm">Reservas Exitosas</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-1">4.9★</div>
            <div className="text-white/70 text-sm">Valoración Media</div>
          </div>
        </div>

        {/* Indicador de scroll */}
        <div
          className={`flex flex-col items-center transform transition-all duration-1000 delay-1200 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
        >
          <p className="text-white/80 text-sm mb-3 font-medium">Comienza tu registro</p>
          <div className="animate-bounce">
            <ArrowDown className="w-6 h-6 text-[#F20C1F]" />
          </div>
        </div>
      </div>

      {/* Ondas decorativas */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="block w-full h-16">
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill="white"
            className="opacity-10"
          />
        </svg>
      </div>
    </section>
  );
};