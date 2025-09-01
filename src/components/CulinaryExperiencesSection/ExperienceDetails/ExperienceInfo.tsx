// components/experience-details/ExperienceInfo.tsx
import { Badge } from "@/components/ui/badge";
import {
    Clock,
    Users,
    MapPin,
    Award,
    Camera,
    Leaf,
    Wine
} from "lucide-react";
import { motion } from "framer-motion";

type DiningExperience = {
    id: string;
    name: string;
    description: string;
    fullDescription: string;
    price: number;
    image: string;
    duration: string;
    time: string;
    type: string;
    isVegetarianFriendly: boolean;
    isAlcoholIncluded: boolean;
    features: string[];
    chef: string;
    maxCapacity: number;
    location: string;
    dietaryRestrictions: string[];
    gallery: string[];
    schedule: {
        day: string;
        times: string[];
        available: boolean;
    }[];
};

interface ExperienceInfoProps {
    experience: DiningExperience;
}

export const ExperienceInfo = ({ experience }: ExperienceInfoProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-6 sm:py-8 lg:py-12 space-y-8 sm:space-y-10 lg:space-y-12"
        >
            {/* Quick Info Grid - RESPONSIVE PROGRESIVO */}
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.6 }}
                    className="flex flex-col xs:flex-row items-start xs:items-center gap-3 sm:gap-4 p-4 sm:p-5 lg:p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                    <Clock className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-[#F20C1F] flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                        <p className="font-semibold text-[#0D0D0D] text-base sm:text-lg lg:text-xl">Duración</p>
                        <p className="text-gray-600 text-sm sm:text-base lg:text-lg truncate">{experience.duration}</p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="flex flex-col xs:flex-row items-start xs:items-center gap-3 sm:gap-4 p-4 sm:p-5 lg:p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                    <Users className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-[#F20C1F] flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                        <p className="font-semibold text-[#0D0D0D] text-base sm:text-lg lg:text-xl">Capacidad</p>
                        <p className="text-gray-600 text-sm sm:text-base lg:text-lg">Máx. {experience.maxCapacity}</p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="flex flex-col xs:flex-row items-start xs:items-center gap-3 sm:gap-4 p-4 sm:p-5 lg:p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                    <MapPin className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-[#F20C1F] flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                        <p className="font-semibold text-[#0D0D0D] text-base sm:text-lg lg:text-xl">Ubicación</p>
                        <p className="text-gray-600 text-sm sm:text-base lg:text-lg truncate" title={experience.location}>
                            {experience.location}
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="flex flex-col xs:flex-row items-start xs:items-center gap-3 sm:gap-4 p-4 sm:p-5 lg:p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-lg xs:col-span-2 lg:col-span-1"
                >
                    <Award className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-[#F20C1F] flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                        <p className="font-semibold text-[#0D0D0D] text-base sm:text-lg lg:text-xl">Chef</p>
                        <p className="text-gray-600 text-sm sm:text-base lg:text-lg truncate" title={experience.chef}>
                            {experience.chef}
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Description - RESPONSIVE TYPOGRAPHY */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="space-y-4 sm:space-y-6 lg:space-y-8"
            >
                <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#0D0D0D] border-b border-gray-200 pb-2 sm:pb-3 lg:pb-4">
                    Descripción Completa
                </h2>
                <div className="bg-gradient-to-r from-gray-50 to-white p-4 sm:p-6 lg:p-8 xl:p-10 rounded-xl sm:rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                    <p className="text-gray-700 leading-relaxed text-base sm:text-lg lg:text-xl xl:text-2xl text-justify max-w-none">
                        {experience.fullDescription}
                    </p>
                </div>
            </motion.div>

            {/* Features & Inclusions - RESPONSIVE GRID LAYOUT */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 xl:gap-12">
                {/* What's Included - RESPONSIVE CARDS */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="space-y-4 sm:space-y-6 lg:space-y-8"
                >
                    <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-[#0D0D0D] flex flex-col xs:flex-row items-start xs:items-center gap-2 sm:gap-3">
                        <Camera className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 text-[#F20C1F] flex-shrink-0" />
                        <span>Qué Incluye</span>
                    </h3>
                    <div className="space-y-3 sm:space-y-4">
                        {experience.features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.7 + index * 0.1, duration: 0.6 }}
                                className="flex items-start xs:items-center gap-3 sm:gap-4 p-3 sm:p-4 lg:p-5 bg-green-50 rounded-lg sm:rounded-xl hover:bg-green-100 transition-all duration-300 hover:scale-105 hover:shadow-md"
                            >
                                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-4 lg:h-4 bg-green-500 rounded-full flex-shrink-0 mt-1 xs:mt-0"></div>
                                <span className="text-gray-700 text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed">
                                    {feature}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Dietary Options - RESPONSIVE BADGES */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                    className="space-y-4 sm:space-y-6 lg:space-y-8"
                >
                    <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-[#0D0D0D] flex flex-col xs:flex-row items-start xs:items-center gap-2 sm:gap-3">
                        <Leaf className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 text-[#F20C1F] flex-shrink-0" />
                        <span>Opciones Dietéticas</span>
                    </h3>
                    
                    <div className="space-y-4 sm:space-y-6">
                        {/* Dietary Restrictions Badges - RESPONSIVE FLEX WRAP */}
                        <div className="flex flex-wrap gap-2 sm:gap-3 lg:gap-4">
                            {experience.dietaryRestrictions.map((restriction, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                                >
                                    <Badge 
                                        variant="secondary" 
                                        className="text-xs sm:text-sm lg:text-base xl:text-lg px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 hover:scale-105 transition-transform duration-200"
                                    >
                                        {restriction}
                                    </Badge>
                                </motion.div>
                            ))}
                        </div>

                        {/* Special Features - RESPONSIVE CARDS */}
                        <div className="flex flex-col xs:flex-row flex-wrap gap-3 sm:gap-4 lg:gap-6 mt-4 sm:mt-6">
                            {experience.isVegetarianFriendly && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.9, duration: 0.6 }}
                                    className="flex items-center gap-2 sm:gap-3 text-green-600 bg-green-50 px-3 sm:px-4 lg:px-5 py-2 sm:py-3 lg:py-4 rounded-lg hover:bg-green-100 transition-all duration-300 hover:scale-105 hover:shadow-md flex-1 xs:flex-none min-w-0"
                                >
                                    <Leaf className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 flex-shrink-0" />
                                    <span className="text-xs sm:text-sm lg:text-base xl:text-lg font-medium truncate">
                                        Vegetariano disponible
                                    </span>
                                </motion.div>
                            )}
                            {experience.isAlcoholIncluded && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.0, duration: 0.6 }}
                                    className="flex items-center gap-2 sm:gap-3 text-purple-600 bg-purple-50 px-3 sm:px-4 lg:px-5 py-2 sm:py-3 lg:py-4 rounded-lg hover:bg-purple-100 transition-all duration-300 hover:scale-105 hover:shadow-md flex-1 xs:flex-none min-w-0"
                                >
                                    <Wine className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 flex-shrink-0" />
                                    <span className="text-xs sm:text-sm lg:text-base xl:text-lg font-medium truncate">
                                        Bebidas alcohólicas incluidas
                                    </span>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};
