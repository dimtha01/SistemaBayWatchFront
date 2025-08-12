import { ArrowDown, Sparkles, Shield } from "lucide-react";

export const LoginHero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Imagen de fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/imagen de login banner.webp')", // 📌 Ruta de tu imagen
          backgroundSize: "cover",
          backgroundPosition: "center top", // Ajusta según necesites
        }}
      >
        {/* Overlay para mejorar legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/80"></div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 px-6 max-w-4xl mx-auto text-center">
        {/* Icono con efecto premium */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-4 shadow-xl border border-[#F20C1F] hover:border-[#F20C0C] transition-all">
              <Shield className="w-10 h-10 text-[#F20C1F]" />
            </div>
            <div className="absolute -top-2 -right-2 bg-white/20 rounded-full p-1 shadow-md">
              <Sparkles className="w-5 h-5 text-[#F2E205] animate-pulse" />
            </div>
          </div>
        </div>

        {/* Título principal */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
          <span className="block">Bienvenido</span>
          <span className="block bg-gradient-to-r from-[#F20C1F] to-[#F20C0C] bg-clip-text text-transparent">
            de Vuelta
          </span>
        </h1>

        {/* Subtítulo */}
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
          Accede a tu cuenta para gestionar tus reservas y disfrutar de una
          experiencia personalizada
        </p>

        {/* Características destacadas */}
        <div className="flex flex-wrap justify-center gap-5 mb-12">
          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2.5 border border-[#F20C1F] shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
            <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-white font-medium text-sm">Acceso Seguro</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2.5 border border-[#F20C1F] shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
            <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse delay-300"></div>
            <span className="text-white font-medium text-sm">Gestión Fácil</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2.5 border border-[#F20C1F] shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
            <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full animate-pulse delay-600"></div>
            <span className="text-white font-medium text-sm">Experiencia Premium</span>
          </div>
        </div>

        {/* Flecha animada */}
        <div className="flex flex-col items-center">
          <p className="text-white/80 text-sm mb-3 font-medium">
            Continúa para iniciar sesión
          </p>
          <div className="animate-bounce">
            <ArrowDown className="w-6 h-6 text-[#F20C1F]" />
          </div>
        </div>
      </div>
    </section>
  );
};