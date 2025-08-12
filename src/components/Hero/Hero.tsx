import { useState, useEffect } from "react";
import { SearchForm } from "../SearchForm/SearchForm";

export const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Inicia animación al montar el componente
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center">
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

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          {/* Título 1 */}
          <h1
            className={`text-5xl md:text-7xl font-bold mb-4 leading-tight text-white transition-all duration-1000 delay-300 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            Bienvenido a Baywatch
          </h1>

          {/* Título 2 con gradiente */}
          <h2
            className={`text-5xl md:text-7xl font-bold mb-6 leading-tight bg-gradient-to-r from-[#F20C0C] via-[#D10000] to-[#A00000] bg-clip-text text-transparent transition-all duration-1000 delay-500 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            tu escape soñado
          </h2>

          {/* Subtítulo */}
          <p
            className={`text-xl md:text-2xl font-light max-w-3xl mx-auto leading-relaxed text-gray-300 transition-all duration-1000 delay-700 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            Vive el confort, el lujo y la magia del mar en un solo lugar inolvidable
          </p>
        </div>

        {/* Formulario de búsqueda */}
        <div
          className={`transition-all duration-1000 delay-1000 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <SearchForm />
        </div>
      </div>

      {/* Floating Decorations */}
      <div
        className="absolute top-20 left-10 w-3 h-3 rounded-full blur-sm animate-pulse"
        style={{
          backgroundColor: "rgba(242, 226, 5, 0.3)",
          animationDelay: "0s",
        }}
      />
      <div
        className="absolute bottom-40 right-20 w-2 h-2 rounded-full blur-xs animate-ping"
        style={{
          backgroundColor: "rgba(242, 12, 31, 0.4)",
          animationDelay: "1s",
        }}
      />
    </section>
  );
};
