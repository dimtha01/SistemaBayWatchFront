// components/experience-details/ExperienceSchedule.tsx
import { Calendar } from "lucide-react";
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

interface ExperienceScheduleProps {
    experience: DiningExperience;
}

export const ExperienceSchedule = ({ experience }: ExperienceScheduleProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        >
            <div className="space-y-6">
                <h3 className="text-2xl font-bold text-[#0D0D0D] flex items-center gap-3 border-b border-gray-200 pb-3">
                    <Calendar className="w-6 h-6 text-[#F20C1F]" />
                    Horarios Disponibles
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-4">
                    {experience.schedule.map((day, index) => (
                        <div
                            key={index}
                            className={`p-5 rounded-xl border-2 transition-all duration-300 ${day.available
                                    ? 'border-green-200 bg-green-50 hover:border-green-300 hover:shadow-md'
                                    : 'border-gray-200 bg-gray-50 opacity-60'
                                }`}
                        >
                            <h4 className="font-bold text-[#0D0D0D] mb-3 text-lg">{day.day}</h4>
                            {day.times.length > 0 ? (
                                <div className="space-y-2">
                                    {day.times.map((time, timeIndex) => (
                                        <div
                                            key={timeIndex}
                                            className={`text-sm px-3 py-2 rounded-lg font-medium ${day.available
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-gray-100 text-gray-500'
                                                }`}
                                        >
                                            {time}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-gray-500 italic">No disponible</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};
