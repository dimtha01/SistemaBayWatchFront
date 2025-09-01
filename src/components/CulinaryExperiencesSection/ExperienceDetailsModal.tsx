// import { Dialog, DialogContent } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import {
//     X,
//     Clock,
//     Users,
//     MapPin,
//     ChefHat,
//     Star,
//     Wine,
//     Leaf,
//     Calendar,
//     Camera,
//     Award,
//     Utensils,
//     ChevronLeft,
//     ChevronRight
// } from "lucide-react";
// import { motion } from "framer-motion";
// import { useState } from "react";

// type DiningExperience = {
//     id: string;
//     name: string;
//     description: string;
//     fullDescription: string;
//     price: number;
//     image: string;
//     duration: string;
//     time: string;
//     type: string;
//     isVegetarianFriendly: boolean;
//     isAlcoholIncluded: boolean;
//     features: string[];
//     chef: string;
//     maxCapacity: number;
//     location: string;
//     dietaryRestrictions: string[];
//     gallery: string[];
//     schedule: {
//         day: string;
//         times: string[];
//         available: boolean;
//     }[];
// };

// interface ExperienceDetailsModalProps {
//     experience: DiningExperience;
//     isOpen: boolean;
//     onClose: () => void;
//     onReserve: () => void;
// }

// export const ExperienceDetailsModal = ({
//     experience,
//     isOpen,
//     onClose,
//     onReserve
// }: ExperienceDetailsModalProps) => {
//     const [selectedImageIndex, setSelectedImageIndex] = useState(0);

//     const getTypeIcon = (type: string) => {
//         switch (type) {
//             case "Cena":
//                 return <Star className="w-5 h-5" />;
//             case "Degustación":
//                 return <Wine className="w-5 h-5" />;
//             case "Taller":
//                 return <ChefHat className="w-5 h-5" />;
//             default:
//                 return <Utensils className="w-5 h-5" />;
//         }
//     };

//     const nextImage = () => {
//         setSelectedImageIndex((prev) =>
//             prev === experience.gallery.length - 1 ? 0 : prev + 1
//         );
//     };

//     const prevImage = () => {
//         setSelectedImageIndex((prev) =>
//             prev === 0 ? experience.gallery.length - 1 : prev - 1
//         );
//     };

//     return (
//         <Dialog open={isOpen} onOpenChange={onClose}>
//             <DialogContent className="max-w-7xl w-[98vw] h-[95vh] p-0 overflow-hidden bg-white border-0 shadow-2xl">
//                 <motion.div
//                     initial={{ opacity: 0, scale: 0.95 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     exit={{ opacity: 0, scale: 0.95 }}
//                     transition={{ duration: 0.3 }}
//                     className="relative h-full flex flex-col"
//                 >
//                     {/* Close Button */}
//                     <Button
//                         variant="ghost"
//                         size="icon"
//                         onClick={onClose}
//                         className="absolute top-4 right-4 z-50 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg rounded-full"
//                     >
//                         <X className="h-5 w-5" />
//                     </Button>

//                     {/* Hero Image Section - Altura fija */}
//                     <div className="relative h-72 sm:h-80 lg:h-96 overflow-hidden flex-shrink-0">
//                         <img
//                             src={experience.gallery[selectedImageIndex]}
//                             alt={experience.name}
//                             className="w-full h-full object-cover"
//                         />

//                         {/* Navigation arrows */}
//                         {experience.gallery.length > 1 && (
//                             <>
//                                 <Button
//                                     variant="ghost"
//                                     size="icon"
//                                     onClick={prevImage}
//                                     className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm"
//                                 >
//                                     <ChevronLeft className="h-5 w-5" />
//                                 </Button>
//                                 <Button
//                                     variant="ghost"
//                                     size="icon"
//                                     onClick={nextImage}
//                                     className="absolute right-16 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm"
//                                 >
//                                     <ChevronRight className="h-5 w-5" />
//                                 </Button>
//                             </>
//                         )}

//                         {/* Gradient Overlay */}
//                         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

//                         {/* Price Badge */}
//                         <div className="absolute top-6 right-6 bg-[#F20C1F] text-white px-6 py-3 rounded-full font-bold text-2xl shadow-lg">
//                             ${experience.price}
//                         </div>

//                         {/* Type Badge */}
//                         <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm text-[#020659] px-4 py-2 rounded-full font-medium flex items-center gap-2 shadow-lg">
//                             {getTypeIcon(experience.type)}
//                             {experience.type}
//                         </div>

//                         {/* Title Overlay */}
//                         <div className="absolute bottom-6 left-6 right-6">
//                             <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
//                                 {experience.name}
//                             </h1>
//                             <p className="text-white/90 text-base sm:text-lg max-w-4xl">
//                                 {experience.description}
//                             </p>
//                         </div>
//                     </div>

//                     {/* Gallery Thumbnails - Altura fija */}
//                     {experience.gallery.length > 1 && (
//                         <div className="px-6 py-4 bg-gray-50 flex-shrink-0">
//                             <div className="flex gap-3 overflow-x-auto pb-2">
//                                 {experience.gallery.map((image, index) => (
//                                     <button
//                                         key={index}
//                                         onClick={() => setSelectedImageIndex(index)}
//                                         className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all duration-300 ${selectedImageIndex === index
//                                                 ? 'ring-3 ring-[#F20C1F] scale-105'
//                                                 : 'hover:scale-105 opacity-70 hover:opacity-100'
//                                             }`}
//                                     >
//                                         <img
//                                             src={image}
//                                             alt={`${experience.name} ${index + 1}`}
//                                             className="w-full h-full object-cover"
//                                         />
//                                     </button>
//                                 ))}
//                             </div>
//                         </div>
//                     )}

//                     {/* Scrollable Content - SOLUCION AQUI */}
//                     <ScrollArea className="flex-1 h-0">
//                         <div className="p-8 space-y-10 pb-6">
//                             {/* Quick Info Grid */}
//                             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
//                                 <div className="flex items-center gap-4 p-5 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
//                                     <Clock className="w-7 h-7 text-[#F20C1F]" />
//                                     <div>
//                                         <p className="font-semibold text-[#0D0D0D] text-md">Duración</p>
//                                         <p className="text-gray-600">{experience.duration}</p>
//                                     </div>
//                                 </div>

//                                 <div className="flex items-center gap-4 p-5 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
//                                     <Users className="w-7 h-7 text-[#F20C1F]" />
//                                     <div>
//                                         <p className="font-semibold text-[#0D0D0D] text-lg">Capacidad</p>
//                                         <p className="text-gray-600">Máx. {experience.maxCapacity} personas</p>
//                                     </div>
//                                 </div>

//                                 <div className="flex items-center gap-4 p-5 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
//                                     <MapPin className="w-7 h-7 text-[#F20C1F]" />
//                                     <div>
//                                         <p className="font-semibold text-[#0D0D0D] text-lg">Ubicación</p>
//                                         <p className="text-gray-600">{experience.location}</p>
//                                     </div>
//                                 </div>

//                                 <div className="flex items-center gap-4 p-5 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
//                                     <Award className="w-7 h-7 text-[#F20C1F]" />
//                                     <div>
//                                         <p className="font-semibold text-[#0D0D0D] text-lg">Chef</p>
//                                         <p className="text-gray-600">{experience.chef}</p>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Description - Más espacio y mejor tipografía */}
//                             <div className="space-y-6">
//                                 <h2 className="text-3xl font-bold text-[#0D0D0D] border-b border-gray-200 pb-3">
//                                     Descripción Completa
//                                 </h2>
//                                 <div className="bg-gradient-to-r from-gray-50 to-white p-8 rounded-2xl border border-gray-100">
//                                     <p className="text-gray-700 leading-relaxed text-lg text-justify max-w-none">
//                                         {experience.fullDescription}
//                                     </p>
//                                 </div>
//                             </div>

//                             {/* Features & Inclusions */}
//                             <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
//                                 {/* What's Included */}
//                                 <div className="space-y-6">
//                                     <h3 className="text-2xl font-bold text-[#0D0D0D] flex items-center gap-3">
//                                         <Camera className="w-6 h-6 text-[#F20C1F]" />
//                                         Qué Incluye
//                                     </h3>
//                                     <div className="space-y-4">
//                                         {experience.features.map((feature, index) => (
//                                             <div key={index} className="flex items-center gap-4 p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors">
//                                                 <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></div>
//                                                 <span className="text-gray-700 text-lg">{feature}</span>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>

//                                 {/* Dietary Options */}
//                                 <div className="space-y-6">
//                                     <h3 className="text-2xl font-bold text-[#0D0D0D] flex items-center gap-3">
//                                         <Leaf className="w-6 h-6 text-[#F20C1F]" />
//                                         Opciones Dietéticas
//                                     </h3>
//                                     <div className="space-y-4">
//                                         <div className="flex flex-wrap gap-3">
//                                             {experience.dietaryRestrictions.map((restriction, index) => (
//                                                 <Badge key={index} variant="secondary" className="text-base px-4 py-2">
//                                                     {restriction}
//                                                 </Badge>
//                                             ))}
//                                         </div>

//                                         <div className="flex flex-wrap gap-6 mt-6">
//                                             {experience.isVegetarianFriendly && (
//                                                 <div className="flex items-center gap-3 text-green-600 bg-green-50 px-4 py-3 rounded-lg">
//                                                     <Leaf className="w-5 h-5" />
//                                                     <span className="text-base font-medium">Vegetariano disponible</span>
//                                                 </div>
//                                             )}
//                                             {experience.isAlcoholIncluded && (
//                                                 <div className="flex items-center gap-3 text-purple-600 bg-purple-50 px-4 py-3 rounded-lg">
//                                                     <Wine className="w-5 h-5" />
//                                                     <span className="text-base font-medium">Bebidas alcohólicas incluidas</span>
//                                                 </div>
//                                             )}
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Schedule */}
//                             <div className="space-y-6">
//                                 <h3 className="text-2xl font-bold text-[#0D0D0D] flex items-center gap-3 border-b border-gray-200 pb-3">
//                                     <Calendar className="w-6 h-6 text-[#F20C1F]" />
//                                     Horarios Disponibles
//                                 </h3>
//                                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-4">
//                                     {experience.schedule.map((day, index) => (
//                                         <div
//                                             key={index}
//                                             className={`p-5 rounded-xl border-2 transition-all duration-300 ${day.available
//                                                     ? 'border-green-200 bg-green-50 hover:border-green-300 hover:shadow-md'
//                                                     : 'border-gray-200 bg-gray-50 opacity-60'
//                                                 }`}
//                                         >
//                                             <h4 className="font-bold text-[#0D0D0D] mb-3 text-lg">{day.day}</h4>
//                                             {day.times.length > 0 ? (
//                                                 <div className="space-y-2">
//                                                     {day.times.map((time, timeIndex) => (
//                                                         <div
//                                                             key={timeIndex}
//                                                             className={`text-sm px-3 py-2 rounded-lg font-medium ${day.available
//                                                                     ? 'bg-green-100 text-green-800'
//                                                                     : 'bg-gray-100 text-gray-500'
//                                                                 }`}
//                                                         >
//                                                             {time}
//                                                         </div>
//                                                     ))}
//                                                 </div>
//                                             ) : (
//                                                 <p className="text-sm text-gray-500 italic">No disponible</p>
//                                             )}
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>
//                     </ScrollArea>


//                     {/* Action Buttons - Fijos en la parte inferior */}
//                     <div className="flex-shrink-0 px-8 py-6 border-t border-gray-200 bg-white">
//                         <div className="flex flex-col sm:flex-row gap-4">
//                             <Button
//                                 variant="outline"
//                                 onClick={onClose}
//                                 className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 py-3 text-lg"
//                             >
//                                 Cerrar
//                             </Button>
//                             <Button
//                                 onClick={onReserve}
//                                 className="flex-1 bg-[#F20C1F] hover:bg-[#F20C1F]/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 py-3 text-lg font-semibold"
//                             >
//                                 Reservar Experiencia - ${experience.price}
//                             </Button>
//                         </div>
//                     </div>
//                 </motion.div>
//             </DialogContent>
//         </Dialog>
//     );
// };
