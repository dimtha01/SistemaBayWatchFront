import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Users, Award, Calendar, MapPin, Heart, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  category: string;
  isVideo?: boolean;
}

interface AboutUsHeroProps {
  totalImages?: number;
  totalVideos?: number;
  yearsOfExperience?: number;
  totalProjects?: number;
  teamMembers?: number;
  awards?: number;
  slides?: HeroSlide[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

const defaultSlides: HeroSlide[] = [
  {
    id: '1',
    title: 'Construimos',
    subtitle: 'experiencias únicas',
    description: 'Desde nuestros inicios, hemos sido pioneros en crear espacios que combinan innovación, elegancia y funcionalidad.',
    image: '/images/bungalow.webp',
    category: 'Arquitectura',
    isVideo: false
  },
  {
    id: '2',
    title: 'Creamos espacios',
    subtitle: 'que inspiran',
    description: 'Cada proyecto cuenta una historia única de dedicación y excelencia, transformando visiones en realidades extraordinarias.',
    image: '/public/images/contantanos banner 2.webp',
    category: 'Diseño Interior',
    isVideo: true
  },
  {
    id: '3',
    title: 'Innovación y',
    subtitle: 'tradición unidos',
    description: 'Combinamos técnicas tradicionales con tecnología de vanguardia para crear espacios que trascienden el tiempo.',
    image: '/images/bungalow.webp',
    category: 'Innovación',
    isVideo: false
  },
  {
    id: '4',
    title: 'Experiencias',
    subtitle: 'memorables',
    description: 'Diseñamos cada detalle pensando en las emociones y experiencias que queremos crear en nuestros usuarios.',
    image: '/images/bungalow.webp',
    category: 'Experiencia',
    isVideo: true
  }
];

export const AboutUsHero = ({
  totalImages = 150,
  totalVideos = 25,
  yearsOfExperience = 15,
  totalProjects = 200,
  teamMembers = 12,
  awards = 8,
  slides = defaultSlides,
  autoPlay = true,
  autoPlayInterval = 5000
}: AboutUsHeroProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [progress, setProgress] = useState(0);

  // AutoPlay functionality
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setProgress(0);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isPlaying, slides.length, autoPlayInterval]);

  // Progress bar
  useEffect(() => {
    if (!isPlaying) return;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + (100 / (autoPlayInterval / 100));
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, [isPlaying, autoPlayInterval, currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setProgress(0);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setProgress(0);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setProgress(0);
  };

  return (
    <div className="relative bg-gray-100 overflow-hidden min-h-screen">
      {/* Background Images Carousel */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <img
              src={slides[currentSlide]?.image}
              alt={slides[currentSlide]?.title}
              className="w-full h-full object-cover"
            />
            {/* Overlay sutil solo para el texto */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Control izquierdo - Botón anterior */}
      <motion.button
        onClick={prevSlide}
        whileHover={{ scale: 1.1, x: -5 }}
        whileTap={{ scale: 0.9 }}
        className="absolute left-8 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm rounded-full p-4 text-gray-800 hover:bg-white transition-all duration-300 shadow-xl group"
      >
        <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </motion.button>

      {/* Control derecho - Botón siguiente */}
      <motion.button
        onClick={nextSlide}
        whileHover={{ scale: 1.1, x: 5 }}
        whileTap={{ scale: 0.9 }}
        className="absolute right-8 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm rounded-full p-4 text-gray-800 hover:bg-white transition-all duration-300 shadow-xl group"
      >
        <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </motion.button>

      {/* Contenido principal */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32 min-h-screen flex flex-col">
        {/* Contenido superior - Ocupa todo el espacio disponible */}
        <div className="flex-1 flex items-center">
          <div className="w-full">
            <div className="text-left max-w-2xl">

              {/* Título principal con animación */}
              <AnimatePresence mode="wait">
                <motion.h1
                  key={currentSlide}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.8 }}
                  className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg"
                >
                  {slides[currentSlide]?.title}
                  <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {slides[currentSlide]?.subtitle}
                  </span>
                </motion.h1>
              </AnimatePresence>

              {/* Subtítulo con animación */}
              <AnimatePresence mode="wait">
                <motion.p
                  key={`desc-${currentSlide}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-lg sm:text-xl max-w-xl leading-relaxed text-white/90 mb-8 drop-shadow-md"
                >
                  {slides[currentSlide]?.description}
                  {slides[currentSlide]?.isVideo && (
                    <span className="inline-flex items-center gap-2 ml-4 px-3 py-1 bg-red-500/90 rounded-full text-white text-sm">
                      <Play className="w-3 h-3" fill="currentColor" />
                      Video disponible
                    </span>
                  )}
                </motion.p>
              </AnimatePresence>

            </div>
          </div>
        </div>
      </div>

      {/* Miniaturas PEGADAS al borde inferior - Posicionamiento absoluto */}
      <div className="absolute bottom-7 left-0 right-0 z-20">
        {/* Contenedor de miniaturas */}
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-3 bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg">
            {slides.map((slide, index) => (
              <motion.button
                key={slide.id}
                onClick={() => goToSlide(index)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`relative overflow-hidden rounded-xl transition-all duration-300 ${
                  index === currentSlide 
                    ? 'ring-4 ring-blue-500 ring-opacity-70' 
                    : 'hover:ring-2 hover:ring-gray-300'
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className={`w-16 h-16 sm:w-20 sm:h-20 object-cover transition-all duration-300 ${
                    index === currentSlide ? 'opacity-100' : 'opacity-70 hover:opacity-90'
                  }`}
                />
                
                {/* Indicador de video */}
                {slide.isVideo && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <Play className="w-4 h-4 text-white" fill="currentColor" />
                  </div>
                )}
                
                {/* Progress bar para slide activo */}
                {index === currentSlide && isPlaying && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
                    <div 
                      className="h-full bg-blue-500 transition-all duration-100"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Slide counter - Posicionado dentro del contenedor de miniaturas */}
        <div className="absolute top-4 right-6 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
          {currentSlide + 1} / {slides.length}
        </div>
      </div>

      {/* Controles móviles - Solo visible en pantallas pequeñas */}
      <div className="absolute top-8 left-8 z-20 flex items-center gap-2 md:hidden">
        <motion.button
          onClick={prevSlide}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white/90 backdrop-blur-sm rounded-full p-2 text-gray-800 hover:bg-white transition-all duration-300 shadow-lg"
        >
          <ChevronLeft className="w-4 h-4" />
        </motion.button>
        <motion.button
          onClick={nextSlide}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white/90 backdrop-blur-sm rounded-full p-2 text-gray-800 hover:bg-white transition-all duration-300 shadow-lg"
        >
          <ChevronRight className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  );
};
