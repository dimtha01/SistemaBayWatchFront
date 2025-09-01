// components/experience-details/ExperienceHero.tsx
import { Button } from "@/components/ui/button";
import {
    Star,
    Wine,
    ChefHat,
    Utensils,
    ChevronLeft,
    ChevronRight,
    ImageOff
} from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { type DiningExperience } from '../experiences.data';

interface ExperienceHeroProps {
    experience: DiningExperience;
    onReserve: () => void;
}

export const ExperienceHero = ({ experience, onReserve }: ExperienceHeroProps) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [imageError, setImageError] = useState<{ [key: number]: boolean }>({});
    const [isLoading, setIsLoading] = useState(true);

    // DEBUGGING: Log para verificar datos
    useEffect(() => {
        console.log('ExperienceHero - Experience data:', experience);
        console.log('ExperienceHero - Gallery:', experience?.gallery);
        console.log('ExperienceHero - Gallery length:', experience?.gallery?.length);
    }, [experience]);

    // VALIDACIÓN MEJORADA CON DEBUGGING [[1]](#__1)
    const safeGallery = (() => {
        console.log('Creating safeGallery...');

        if (experience?.gallery && Array.isArray(experience.gallery) && experience.gallery.length > 0) {
            console.log('Using experience.gallery:', experience.gallery);
            return experience.gallery;
        }

        if (experience?.image) {
            console.log('Using experience.image as fallback:', experience.image);
            return [experience.image];
        }

        console.log('Using placeholder image');
        return ['https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop'];
    })();

    // Reset cuando cambia la experiencia
    useEffect(() => {
        console.log('Resetting component state for experience:', experience?.id);
        setSelectedImageIndex(0);
        setImageError({});
        setIsLoading(true);
    }, [experience?.id]);

    const getTypeIcon = (type: string) => {
        switch (type) {
            case "Cena":
                return <Star className="w-4 h-4 sm:w-5 sm:h-5" />;
            case "Degustación":
                return <Wine className="w-4 h-4 sm:w-5 sm:h-5" />;
            case "Taller":
                return <ChefHat className="w-4 h-4 sm:w-5 sm:h-5" />;
            default:
                return <Utensils className="w-4 h-4 sm:w-5 sm:h-5" />;
        }
    };

    const nextImage = () => {
        if (safeGallery.length > 1) {
            const newIndex = selectedImageIndex === safeGallery.length - 1 ? 0 : selectedImageIndex + 1;
            console.log('Next image:', newIndex, safeGallery[newIndex]);
            setSelectedImageIndex(newIndex);
        }
    };

    const prevImage = () => {
        if (safeGallery.length > 1) {
            const newIndex = selectedImageIndex === 0 ? safeGallery.length - 1 : selectedImageIndex - 1;
            console.log('Previous image:', newIndex, safeGallery[newIndex]);
            setSelectedImageIndex(newIndex);
        }
    };

    // Manejo mejorado de errores de imagen [[2]](#__2)
    const handleImageError = (index: number, src: string) => {
        console.error('Image failed to load:', src, 'at index:', index);
        setImageError(prev => ({ ...prev, [index]: true }));
        setIsLoading(false);
    };

    const handleImageLoad = (index: number, src: string) => {
        console.log('Image loaded successfully:', src, 'at index:', index);
        setIsLoading(false);
    };

    // Validación de experiencia
    if (!experience) {
        console.error('No experience data provided');
        return (
            <div className="relative h-64 sm:h-72 lg:h-96 bg-gray-200 flex items-center justify-center">
                <div className="text-center text-gray-500">
                    <ImageOff className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-2" />
                    <p className="text-sm sm:text-base">Experiencia no disponible</p>
                </div>
            </div>
        );
    }

    const currentImage = safeGallery[selectedImageIndex];
    const hasMultipleImages = safeGallery.length > 1;

    console.log('Current image:', currentImage);
    console.log('Has multiple images:', hasMultipleImages);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative w-full"
        >
            {/* HERO IMAGE SECTION - RESPONSIVO CENTRADO [[0]](#__0) */}
            <div className="relative w-full h-[100vh] sm:h-[100vh] md:h-[100vh] lg:h-[90vh] xl:h-screen max-h-screen flex items-center justify-center overflow-hidden bg-gray-200">

                {/* Loading Spinner - CENTRADO */}
                {isLoading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 z-10">
                        <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-[#F20C1F]"></div>
                        <p className="mt-2 sm:mt-4 text-sm sm:text-base text-gray-600 text-center px-4">
                            Cargando imagen...
                        </p>
                    </div>
                )}

                {/* Main Image - RESPONSIVO */}
                {!imageError[selectedImageIndex] ? (
                    <img
                        src={currentImage}
                        alt={experience.name}
                        className={`w-full h-full object-cover object-center transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'
                            }`}
                        onLoad={() => handleImageLoad(selectedImageIndex, currentImage)}
                        onError={() => handleImageError(selectedImageIndex, currentImage)}
                        style={{ display: 'block' }}
                    />
                ) : (
                    // Fallback cuando imagen falla - CENTRADO [[1]](#__1)
                    <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                        <div className="text-center text-gray-600 px-4">
                            <ImageOff className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2" />
                            <p className="text-sm sm:text-base">Imagen no disponible</p>
                            <p className="text-xs text-gray-500 mt-1 break-all max-w-xs">
                                URL: {currentImage}
                            </p>
                        </div>
                    </div>
                )}

                {/* Navigation arrows - RESPONSIVOS Y CENTRADOS [[2]](#__2) */}
                {hasMultipleImages && !isLoading && (
                    <>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={prevImage}
                            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm transition-all duration-200 z-20 w-8 h-8 sm:w-10 sm:h-10"
                            aria-label="Imagen anterior"
                        >
                            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={nextImage}
                            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm transition-all duration-200 z-20 w-8 h-8 sm:w-10 sm:h-10"
                            aria-label="Siguiente imagen"
                        >
                            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                        </Button>
                    </>
                )}
                {hasMultipleImages && (
                    <div className="absolute top-20 left-1/2 -translate-x-1/2  transform translate-y-8 sm:translate-y-12 bg-black/40 backdrop-blur-sm text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium z-10">
                        {selectedImageIndex + 1} / {safeGallery.length}
                    </div>
                )}

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-5" />

                {/* CONTADOR DE IMÁGENES - CENTRADO Y BAJADO [[3]](#__3) */}


                {/* CONTENIDO PRINCIPAL - CENTRADO Y RESPONSIVO [[0]](#__0) */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        {/* Badge del tipo de experiencia */}
                        <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm text-[#020659] px-3 py-1.5 sm:px-4 sm:py-2 rounded-full font-medium text-xs sm:text-sm mb-4 sm:mb-6">
                            {getTypeIcon(experience.type)}
                            {experience.type}
                        </div>

                        {/* Título principal */}
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 sm:mb-4 lg:mb-6 drop-shadow-lg leading-tight">
                            {experience.name}
                        </h1>

                        {/* Descripción */}
                        <p className="text-white/90 text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl lg:max-w-4xl mb-4 sm:mb-6 lg:mb-8 drop-shadow-md leading-relaxed">
                            {experience.description}
                        </p>

                        {/* Información adicional - RESPONSIVA */}
                        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-4 sm:mb-6 lg:mb-8 text-xs sm:text-sm text-white/80">
                            <span className="bg-black/20 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-1.5 rounded-full">
                                ⏱️ {experience.duration}
                            </span>
                            <span className="bg-black/20 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-1.5 rounded-full">
                                👨‍🍳 {experience.chef}
                            </span>
                            <span className="bg-black/20 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-1.5 rounded-full">
                                👥 Máx. {experience.maxCapacity}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* GALERÍA DE MINIATURAS - CENTRADA Y RESPONSIVA [[2]](#__2) */}
            {hasMultipleImages && (
                <div className="absolute bottom-36 sm:bottom-28 lg:bottom-20 left-1/2 -translate-x-1/2 z-20 w-full max-w-6xl px-4">
                    <div className="bg-black/40 backdrop-blur-md rounded-2xl p-3 sm:p-4">
                        <div className="flex justify-center">
                            <div className="flex items-center px-1 h-16 md:h-20 sm:h-20 lg:h-24 gap-2 sm:gap-3 overflow-x-hidden overflow-y-hidden pb-1 max-w-full">
                                <div className="flex gap-2 sm:gap-3">
                                    {safeGallery.map((image, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedImageIndex(index)}
                                            className={`relative flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-lg overflow-hidden transition-all duration-300 ${selectedImageIndex === index
                                                ? 'ring-2 ring-white scale-105'
                                                : 'hover:scale-105 opacity-70 hover:opacity-100'
                                                }`}
                                        >
                                            {!imageError[index] ? (
                                                <img
                                                    src={image}
                                                    alt={`${experience.name} ${index + 1}`}
                                                    className="w-full h-full object-cover"
                                                    onError={() => handleImageError(index, image)}
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gray-600 flex items-center justify-center">
                                                    <ImageOff className="w-3 h-3 sm:w-4 sm:h-4 text-gray-300" />
                                                </div>
                                            )}

                                            {selectedImageIndex === index && (
                                                <div className="absolute inset-0 bg-white/20 flex items-center justify-center">
                                                    <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white rounded-full"></div>
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Indicador de scroll en móvil */}
                        <div className="sm:hidden text-center mt-2">
                            <p className="text-xs text-gray-500">
                                Desliza para ver más imágenes
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    );
};
