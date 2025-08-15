import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, X, ChevronLeft, ChevronRight, MapPin, Play, Image as ImageIcon, Video, Clock, Filter } from "lucide-react";

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: 'exterior' | 'rooms' | 'facilities' | 'dining' | 'details';
  title: string;
  description: string;
  isVideo?: boolean;
  duration?: string;
  fileSize?: string;
}

interface GalleryProps {
  images?: GalleryImage[];
  autoPlay?: boolean;
  showThumbnails?: boolean;
}

const defaultImages: GalleryImage[] = [
  {
    id: '1',
    src: '/images/bungalow.webp',
    alt: 'Hotel BookMe - Vista aérea de la propiedad frente al mar',
    category: 'exterior',
    title: 'Hotel BookMe - Tour Virtual',
    description: 'Desde 1985 • Tradición y Elegancia',
    isVideo: true,
    duration: '2:45'
  },
  {
    id: '2',
    src: '/images/bungalow.webp',
    alt: 'Suite de lujo con vista panorámica',
    category: 'rooms',
    title: 'Suite Presidencial',
    description: 'Espacios amplios con las mejores vistas de la ciudad',
    isVideo: false
  },
  {
    id: '3',
    src: '/images/bungalow.webp',
    alt: 'Piscina infinita en la azotea',
    category: 'facilities',
    title: 'Piscina Infinita - Video',
    description: 'Relájate mientras disfrutas de vistas espectaculares',
    isVideo: true,
    duration: '1:30'
  },
  {
    id: '4',
    src: '/images/bungalow.webp',
    alt: 'Restaurante gourmet con ambiente elegante',
    category: 'dining',
    title: 'Restaurante Gourmet',
    description: 'Experiencias culinarias de clase mundial',
    isVideo: false
  },
  {
    id: '5',
    src: '/images/bungalow.webp',
    alt: 'Detalle arquitectónico del lobby',
    category: 'details',
    title: 'Lobby Exclusivo',
    description: 'Detalles únicos que reflejan nuestra identidad',
    isVideo: false
  },
  {
    id: '6',
    src: '/images/bungalow.webp',
    alt: 'Centro de spa y bienestar',
    category: 'facilities',
    title: 'Spa & Wellness - Recorrido',
    description: 'Espacios diseñados para tu relajación total',
    isVideo: true,
    duration: '3:15'
  }
];

const categoryLabels = {
  exterior: 'Exteriores',
  rooms: 'Habitaciones',
  facilities: 'Instalaciones',
  dining: 'Gastronomía',
  details: 'Detalles Únicos'
};

export const AboutUsGallery: React.FC<GalleryProps> = ({
  images = defaultImages,
  autoPlay = false,
  showThumbnails = true
}) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  // Filtradas según categoría
  const filteredImages = activeCategory === 'all'
    ? images
    : images.filter(img => img.category === activeCategory);

  const categories = ['all', ...Array.from(new Set(images.map(img => img.category)))];

  // Simulación de carga
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // AutoPlay en modal
  useEffect(() => {
    if (selectedImage && autoPlay) {
      const interval = setInterval(() => {
        handleNext();
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [selectedImage, autoPlay, currentIndex, filteredImages]);

  const openModal = (image: GalleryImage, index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const handleNext = () => {
    if (filteredImages.length === 0) return;
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setCurrentIndex(nextIndex);
    const img = filteredImages[nextIndex];
    setSelectedImage(img);
  };

  const handlePrev = () => {
    if (filteredImages.length === 0) return;
    const prevIndex = currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    const img = filteredImages[prevIndex];
    setSelectedImage(img);
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (selectedImage) {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [selectedImage, currentIndex, filteredImages]);

  if (isLoading) {
    return (
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Loading skeleton para filtros */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse mb-4"></div>
            <div className="flex gap-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-10 w-24 bg-gray-200 rounded-full animate-pulse"></div>
              ))}
            </div>
          </div>
          {/* Loading skeleton para cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-2xl h-80 animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Filtro de categorías */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12 sm:mb-16"
        >
          <div className="flex items-center gap-3 mb-4 w-full justify-center">
            <Filter className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">Filtrar por:</span>
          </div>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {categories.map(category => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-[#F20C1F] to-[#020659] text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md hover:shadow-lg border border-gray-200'
                }`}
              >
                {category === 'all' ? 'Todas' : categoryLabels[category as keyof typeof categoryLabels]}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Grid de la galería */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10">
          <AnimatePresence>
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => openModal(image, index)}
              >
                <div className="relative overflow-hidden rounded-3xl bg-white shadow-xl hover:shadow-2xl transition-all duration-700 hover:-translate-y-3 border border-gray-100/50">
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

                    {/* Badge de tipo */}
                    <div className="absolute top-4 left-4 z-10">
                      <div className={`px-3 py-2 rounded-xl backdrop-blur-md border text-xs font-semibold flex items-center gap-2 ${
                        image.isVideo
                          ? 'bg-red-500/90 text-white border-red-400/50'
                          : 'bg-blue-500/90 text-white border-blue-400/50'
                      }`}>
                        {image.isVideo ? (
                          <>
                            <Video className="w-3 h-3" /> VIDEO
                          </>
                        ) : (
                          <>
                            <ImageIcon className="w-3 h-3" /> IMAGEN
                          </>
                        )}
                      </div>
                    </div>

                    {/* Duración del video */}
                    {image.isVideo && image.duration && (
                      <div className="absolute top-4 right-4 z-10">
                        <div className="px-3 py-2 rounded-xl bg-black/70 backdrop-blur-md text-white text-xs font-medium flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {image.duration}
                        </div>
                      </div>
                    )}

                    {/* Play button para videos */}
                    {image.isVideo && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xl hover:bg-white transition-all duration-300 hover:scale-110 border-4 border-white/30">
                          <Play className="w-8 h-8 sm:w-10 sm:h-10 text-[#F20C1F] ml-1" fill="currentColor" />
                        </div>
                      </div>
                    )}

                    {/* Overlay para imágenes */}
                    {!image.isVideo && (
                      <div className="absolute inset-0 bg-gradient-to-t from-[#F20C1F]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-3 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                          <Camera className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Contenido de la card */}
                  <div className="p-6 sm:p-8 bg-gradient-to-br from-white to-gray-50/50">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-[#F20C1F] to-[#020659] rounded-lg rotate-12 shadow-lg flex items-center justify-center">
                        <div className="w-3 h-3 bg-white rounded-sm -rotate-12"></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">
                            {image.title}
                          </h3>
                          {image.isVideo && (
                            <div className="flex-shrink-0 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                          )}
                        </div>
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3">
                          {image.description}
                        </p>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-[#F20C1F]" />
                          <span className="text-sm font-medium text-[#F20C1F]">
                            {categoryLabels[image.category]}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Efecto shimmer */}
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Mensaje cuando no hay resultados */}
        {filteredImages.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <Filter className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No hay contenido disponible</h3>
            <p className="text-gray-600 mb-6">No se encontraron elementos para la categoría seleccionada.</p>
            <button
              onClick={() => setActiveCategory('all')}
              className="px-6 py-3 bg-gradient-to-r from-[#F20C1F] to-[#020659] text-white rounded-full font-medium hover:shadow-lg transition-all duration-300"
            >
              Ver todas las categorías
            </button>
          </motion.div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-6xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Controles del modal */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 bg-white/10 backdrop-blur-md rounded-full p-3 text-white hover:bg-white/20 transition-colors border border-white/20"
              >
                <X className="w-6 h-6" />
              </button>

              {filteredImages.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 backdrop-blur-md rounded-full p-4 text-white hover:bg-white/20 transition-colors border border-white/20"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  <button
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 backdrop-blur-md rounded-full p-4 text-white hover:bg-white/20 transition-colors border border-white/20"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Contenido del modal */}
              <div className="relative">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="w-full h-auto max-h-[70vh] object-contain rounded-2xl"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-8 text-white rounded-b-2xl">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                      selectedImage.isVideo ? 'bg-red-500' : 'bg-blue-500'
                    }`}>
                      {selectedImage.isVideo ? 'VIDEO' : 'IMAGEN'}
                    </div>
                    {selectedImage.isVideo && selectedImage.duration && (
                      <div className="px-3 py-1 rounded-lg bg-white/20 text-xs font-medium">
                        {selectedImage.duration}
                      </div>
                    )}
                  </div>
                  <h3 className="text-3xl font-bold mb-3">{selectedImage.title}</h3>
                  <p className="text-xl opacity-90 mb-4">{selectedImage.description}</p>
                  <div className="flex items-center gap-3 text-base opacity-75">
                    <MapPin className="w-5 h-5" />
                    <span>{categoryLabels[selectedImage.category]}</span>
                  </div>
                </div>
              </div>

              {/* Thumbnails */}
              {showThumbnails && filteredImages.length > 1 && (
                <div className="flex justify-center gap-3 mt-6 overflow-x-auto pb-2">
                  {filteredImages.map((img, idx) => (
                    <button
                      key={img.id}
                      onClick={() => {
                        setCurrentIndex(idx);
                        setSelectedImage(img);
                      }}
                      className={`relative flex-shrink-0 w-20 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                        idx === currentIndex
                          ? 'border-white scale-110 shadow-lg'
                          : 'border-white/30 hover:border-white/60 hover:scale-105'
                      }`}
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="w-full h-full object-cover"
                      />
                      {img.isVideo && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                          <Play className="w-4 h-4 text-white" fill="currentColor" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}

              {/* Contador de imágenes */}
              {filteredImages.length > 1 && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                  {currentIndex + 1} / {filteredImages.length}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
