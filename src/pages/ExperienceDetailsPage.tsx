// pages/ExperienceDetailsPage.tsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { ExperienceHero } from "@/components/CulinaryExperiencesSection/ExperienceDetails/ExperienceHero";
import { ExperienceInfo } from "@/components/CulinaryExperiencesSection/ExperienceDetails/ExperienceInfo";
import { ExperienceSchedule } from "@/components/CulinaryExperiencesSection/ExperienceDetails/ExperienceSchedule";
import { ReservationModal } from "@/components/CulinaryExperiencesSection/ReservationModal";

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

// DATA MOCK - Reemplaza con tu fuente de datos real
export const diningExperiences: DiningExperience[] = [
  {
    id: "d1",
    name: "Cena Gourmet Mediterránea",
    description: "Menú degustación con influencias griegas, italianas y españolas para una experiencia culinaria única",
    fullDescription: "Sumérgete en una experiencia gastronómica única que celebra los sabores auténticos del Mediterráneo. Nuestro chef ejecutivo ha creado un menú degustación de 5 tiempos que combina técnicas culinarias tradicionales con toques modernos. Cada plato cuenta una historia, desde los olivos centenarios de Grecia hasta las costas doradas de España. Acompañado de una selección premium de vinos locales e internacionales, maridados perfectamente con cada curso. La velada se complementa con música en vivo que transporta a los comensales a las terrazas mediterráneas.",
    price: 75,
    image: "/images/comida mediterrania.webp",
    duration: "3 horas",
    time: "20:00 - 23:00",
    type: "Cena",
    isVegetarianFriendly: true,
    isAlcoholIncluded: true,
    features: ["5 platos gourmet", "Maridaje de vinos", "Música en vivo"],
    chef: "Chef Isabella Rossi",
    maxCapacity: 24,
    location: "Terraza Mediterránea - Piso 12",
    dietaryRestrictions: ["Vegetariano", "Vegano", "Sin gluten", "Sin lactosa"],
    gallery: [
      "/images/comida mediterrania.webp",
      "/images/comida mediterrania.webp",
      "/images/comida mediterrania.webp",
      "/images/comida mediterrania.webp"
    ],
    schedule: [
      { day: "Lunes", times: ["20:00"], available: true },
      { day: "Martes", times: ["20:00"], available: true },
      { day: "Miércoles", times: ["20:00"], available: false },
      { day: "Jueves", times: ["20:00"], available: true },
      { day: "Viernes", times: ["20:00", "21:30"], available: true },
      { day: "Sábado", times: ["19:00", "21:30"], available: true },
      { day: "Domingo", times: ["20:00"], available: true }
    ]
  },
  {
    id: "d3",
    name: "Degustación de Vinos Premium",
    description: "Selección exclusiva de los mejores vinos de la región con acompañamiento gourmet",
    fullDescription: "Una experiencia enológica excepcional guiada por nuestro sommelier certificado. Descubre 6 vinos premium cuidadosamente seleccionados de las mejores bodegas regionales e internacionales. Cada vino viene acompañado de una explicación detallada sobre su origen, proceso de elaboración y características únicas. La degustación incluye una exquisita tabla de quesos artesanales, embutidos premium y frutos secos, perfectamente maridados para realzar los sabores de cada vino. Aprende sobre técnicas de cata, maridajes y la historia vinícola de la región.",
    price: 60,
    image: "/images/degustacion de vinos premium.webp",
    duration: "2 horas",
    time: "18:00 - 20:00",
    type: "Degustación",
    isVegetarianFriendly: false,
    isAlcoholIncluded: true,
    features: ["6 vinos premium", "Tabla de quesos", "Guía sommelier"],
    chef: "Sommelier Marcus Dubois",
    maxCapacity: 16,
    location: "Cava Premium - Sótano",
    dietaryRestrictions: ["Sin gluten disponible"],
    gallery: [
      "/images/degustacion de vinos premium.webp",
      "/images/comida mediterrania.webp",
      "/images/degustacion de vinos premium.webp",
      "/images/degustacion de vinos premium.webp"
    ],
    schedule: [
      { day: "Lunes", times: [], available: false },
      { day: "Martes", times: ["18:00"], available: true },
      { day: "Miércoles", times: ["18:00"], available: true },
      { day: "Jueves", times: ["18:00", "20:30"], available: true },
      { day: "Viernes", times: ["18:00", "20:30"], available: true },
      { day: "Sábado", times: ["16:00", "18:00", "20:30"], available: true },
      { day: "Domingo", times: ["18:00"], available: true }
    ]
  },
  {
    id: "d4",
    name: "Clase de Cocina con Chef",
    description: "Aprende los secretos de nuestra cocina estrella con técnicas profesionales",
    fullDescription: "Una experiencia culinaria inmersiva donde aprenderás de la mano de nuestro chef ejecutivo. Esta clase magistral te enseñará técnicas profesionales de cocina, desde el manejo del cuchillo hasta técnicas avanzadas de cocción. Trabajarás con ingredientes premium y aprenderás a crear 3 platos signature del restaurante. La clase incluye un recetario exclusivo con todos los secretos y técnicas enseñadas. Al final, disfrutarás de una degustación completa de todos los platos preparados, acompañados de vinos seleccionados. Perfecto para entusiastas de la cocina que quieren llevar sus habilidades al siguiente nivel.",
    price: 90,
    image: "/images/clases de cocina.webp",
    duration: "3.5 horas",
    time: "10:00 - 13:30",
    type: "Taller",
    isVegetarianFriendly: false,
    isAlcoholIncluded: false,
    features: ["Ingredientes premium", "Recetario exclusivo", "Degustación final"],
    chef: "Chef Executive Antonio Martínez",
    maxCapacity: 12,
    location: "Cocina Didáctica - Piso 2",
    dietaryRestrictions: ["Adaptable según necesidades"],
    gallery: [
      "/images/clases de cocina.webp",
      "/images/clases de cocina.webp",
      "/images/clases de cocina.webp",
      "/images/clases de cocina.webp"
    ],
    schedule: [
      { day: "Lunes", times: ["10:00"], available: true },
      { day: "Martes", times: ["10:00"], available: false },
      { day: "Miércoles", times: ["10:00"], available: true },
      { day: "Jueves", times: ["10:00"], available: true },
      { day: "Viernes", times: ["10:00"], available: true },
      { day: "Sábado", times: ["10:00", "15:00"], available: true },
      { day: "Domingo", times: ["10:00"], available: true }
    ]
  }
];

export const ExperienceDetailsPage = () => {
    const { id } = useParams<{ id: string }>(); // Obtener ID de URL params [[0]](#__0)
    const navigate = useNavigate();
    const [experience, setExperience] = useState<DiningExperience | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);

    // useEffect para cargar data basada en el ID de la URL [[2]](#__2)
    useEffect(() => {
        const loadExperience = async () => {
            try {
                setLoading(true);
                setError(null);

                if (!id) {
                    setError("ID de experiencia no proporcionado");
                    return;
                }

                // Simular API call - reemplaza con tu lógica de fetching real
                await new Promise(resolve => setTimeout(resolve, 500)); // Simular delay

                const foundExperience = diningExperiences.find(exp => exp.id === id);
                
                if (!foundExperience) {
                    setError("Experiencia no encontrada");
                    return;
                }

                setExperience(foundExperience);
            } catch (err) {
                setError("Error al cargar la experiencia");
                console.error("Error loading experience:", err);
            } finally {
                setLoading(false);
            }
        };

        loadExperience();
    }, [id]); // Dependencia en el ID para recargar cuando cambie [[1]](#__1)

    const handleBack = () => {
        navigate('/experiences');
    };

    const handleReserve = () => {
        setIsReservationModalOpen(true);
    };

    // Estados de carga y error [[3]](#__3)
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#F20C1F] mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Cargando experiencia...</p>
                </div>
            </div>
        );
    }

    if (error || !experience) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center max-w-md mx-auto px-4">
                    <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <ArrowLeft className="w-8 h-8 text-red-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        {error || "Experiencia no encontrada"}
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Lo sentimos, no pudimos encontrar la experiencia que buscas.
                    </p>
                    <Button
                        onClick={handleBack}
                        className="bg-[#F20C1F] hover:bg-[#F20C1F]/90 text-white px-6 py-2"
                    >
                        Volver a Experiencias
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="min-h-screen bg-white">

                {/* Hero Section */}
                <ExperienceHero experience={experience} onReserve={handleReserve} />

                {/* Info Section */}
                <ExperienceInfo experience={experience} />

                {/* Schedule Section */}
                <ExperienceSchedule experience={experience} />

                {/* Fixed Bottom Action Bar */}
                <div className="sticky bottom-0 z-40 bg-white border-t border-gray-200 shadow-lg">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="text-center sm:text-left">
                                <h3 className="text-lg font-bold text-[#0D0D0D]">{experience.name}</h3>
                                <p className="text-gray-600">Desde ${experience.price} por persona</p>
                            </div>
                            <Button
                                onClick={handleReserve}
                                className="w-full sm:w-auto bg-[#F20C1F] hover:bg-[#F20C1F]/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-3 text-lg font-semibold"
                            >
                                Reservar Experiencia
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reservation Modal */}
            {experience && (
                <ReservationModal
                    experience={experience}
                    isOpen={isReservationModalOpen}
                    onClose={() => setIsReservationModalOpen(false)}
                />
            )}
        </>
    );
};
