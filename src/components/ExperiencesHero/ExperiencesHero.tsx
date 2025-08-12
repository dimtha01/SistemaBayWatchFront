import { useState, useEffect } from "react";
import { ChevronDown, Star, Camera, MapPin, Heart, Compass } from "lucide-react";
import { Link } from "react-router-dom";

export const ExperiencesHero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const backgroundImages = [
    "/images/experiencias banner.webp",
    "/images/experiencias banner 2.webp",
    "/images/experiencias banner 3.webp",
  ];

  const stats = [
    { icon: <Star className="w-5 h-5" />, value: "4.9", label: "Rating" },
    { icon: <Camera className="w-5 h-5" />, value: "25+", label: "Experiencias" },
    { icon: <MapPin className="w-5 h-5" />, value: "10+", label: "Destinos" },
    { icon: <Heart className="w-5 h-5" />, value: "99%", label: "Satisfacción" },
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
    <section className="relative h-screen min-h-[600px] flex items-center justify-center text-center overflow-hidden">
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/20 to-transparent" />
      </div>

      {/* Floating Elements with Enhanced Animations */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-32 right-16 w-32 h-32 bg-orange-500/20 rounded-full blur-2xl animate-pulse delay-1000" />
      <div className="absolute top-1/3 right-20 w-16 h-16 bg-white/5 rounded-full blur-lg animate-pulse delay-500" />

      {/* Animated Experience Icons */}
      <div className="absolute top-32 right-32 opacity-20">
        <div className="animate-bounce delay-200">
          <Camera className="w-8 h-8 text-white/30" />
        </div>
      </div>
      <div className="absolute bottom-40 left-20 opacity-20">
        <div className="animate-bounce delay-700" style={{ animationDirection: 'reverse' }}>
          <Compass className="w-6 h-6 text-orange-300/40" />
        </div>
      </div>
      <div className="absolute top-40 left-32 opacity-20">
        <div className="animate-bounce delay-1000">
          <MapPin className="w-7 h-7 text-white/25" />
        </div>
      </div>
      <div className="absolute bottom-28 right-40 opacity-20">
        <div className="animate-bounce delay-1500" style={{ animationDirection: 'reverse' }}>
          <Heart className="w-6 h-6 text-[#F20C1F]/30" />
        </div>
      </div>

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

      {/* Content Container */}
      <div className="relative z-10 px-6 max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <div
          className={`mb-6 transform transition-all duration-1000 delay-300 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
        >
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white/80 text-sm hover:bg-white/20 transition-all duration-300">
            <Link to="/">Inicio</Link>
            <ChevronDown className="w-4 h-4 mx-2 rotate-[-90deg]" />
            <span className="text-white font-medium">Experiencias</span>
          </div>
        </div>

        {/* Main Title with Enhanced Animations */}
        <h1
          className={`text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight transform transition-all duration-1000 delay-500 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
        >
          <span className="block animate-fade-in-up" style={{ animationDelay: '0.5s' }}>Experiencias</span>
          <span className="block bg-gradient-to-r from-[#F20C0C] via-[#D10000] to-[#A00000] bg-clip-text text-transparent">
            Inolvidables
          </span>
          <span className="block text-3xl md:text-4xl lg:text-5xl font-light text-white/90 mt-2 animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
            & Únicas
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className={`text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed transform transition-all duration-1000 delay-700 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
        >
          Sumérgete en{" "}
          <span className="text-[#F20C1F] font-semibold">aventuras</span> y{" "}
          <span className="text-[#F20C1F] font-semibold">momentos únicos</span>{" "}
          durante tu estancia.
          <br className="hidden md:block" />
          <span className="text-white/70 text-base md:text-lg block mt-2">
            Descubre experiencias diseñadas para crear recuerdos eternos
          </span>
        </p>

        {/* Stats with Hover Animations */}
        <div
          className={`flex flex-wrap justify-center gap-6 md:gap-8 mb-10 transform transition-all duration-1000 delay-900 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300 group hover:scale-110 hover:rotate-1 cursor-pointer"
              style={{ animationDelay: `${1000 + index * 200}ms` }}
            >
              <div className="text-[#000] group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                {stat.icon}
              </div>
              <div className="text-left">
                <div className="text-white font-bold text-lg transition-colors duration-300">{stat.value}</div>
                <div className="text-white/70 text-xs group-hover:text-white/90 transition-colors duration-300">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Buttons with Enhanced Animations */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center items-center transform transition-all duration-1000 delay-1100 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
        >
          <button className="group px-8 py-4 bg-gradient-to-r from-[#F20C0C] to-[#8A0303] hover:from-[#D10000] hover:to-[#5A0000] text-white font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 hover:-translate-y-1">
            <span className="flex items-center gap-2">
              Descubrir Experiencias
              <ChevronDown className="w-4 h-4 group-hover:translate-y-1 group-hover:rotate-180 transition-transform duration-300" />
            </span>
          </button>
          <button className="px-8 py-4 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white font-semibold rounded-full border border-white/30 hover:border-white/50 transition-all duration-300 transform hover:scale-105 active:scale-95 hover:rotate-1 hover:-translate-y-1">
            Ver Paquetes
          </button>
        </div>
      </div>

      {/* Image Indicators with Enhanced Animations */}
      <div className="absolute bottom-20 right-8 flex flex-col gap-2">
        {backgroundImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-2 h-8 rounded-full transition-all duration-300 hover:scale-110 hover:w-3 ${index === currentImageIndex ? "bg-orange-400 shadow-lg animate-pulse" : "bg-white/30 hover:bg-white/50"}`}
          />
        ))}
      </div>
    </section>
  );
};