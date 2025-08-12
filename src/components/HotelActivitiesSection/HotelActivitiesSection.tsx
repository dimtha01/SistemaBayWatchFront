import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sun, Mountain, Bike, Fish, UtensilsCrossed, Clock, Users, Calendar, Star } from "lucide-react";

const activitiesData = [
  {
    id: "a1",
    name: "Clases de Yoga al Amanecer",
    description: "Empieza el día con energía y paz interior en nuestros jardines.",
    image: "/images/yoga.webp",
    type: "Dentro del Hotel",
    icon: <Sun className="w-6 h-6 text-[#F20C1F]" />,
    schedule: "Diario 6:00 - 7:30 AM",
    duration: "1.5 horas",
    capacity: "Máx. 15 personas",
    difficulty: "Todos los niveles",
    requirements: "Ropa cómoda, traer toalla",
    rating: 4.9,
    highlights: [
      "Vistas al amanecer",
      "Instructor certificado",
      "Mat de yoga incluido",
      "Té herbal posterior"
    ],
    price: 25,
    ageRestriction: "Mayores de 12 años"
  },
  {
    id: "a2",
    name: "Senderismo Guiado",
    description: "Explora los senderos cercanos con un guía local y descubre paisajes impresionantes.",
    image: "/images/senderismo.webp",
    type: "Fuera del Hotel",
    icon: <Mountain className="w-6 h-6 text-[#F20C1F]" />,
    schedule: "Miércoles y Sábados 8:00 AM",
    duration: "4 horas",
    capacity: "Máx. 10 personas",
    difficulty: "Moderada",
    requirements: "Zapatos para caminata, agua",
    rating: 4.7,
    highlights: [
      "Cascada escondida",
      "Avistamiento de aves",
      "Snack ecológico incluido",
      "Guía naturalista"
    ],
    price: 40,
    ageRestriction: "Mayores de 14 años"
  },
  {
    id: "a3",
    name: "Alquiler de Bicicletas",
    description: "Recorre los alrededores del hotel a tu propio ritmo.",
    image: "/images/alquiler de bicicletas.webp",
    type: "Dentro/Fuera del Hotel",
    icon: <Bike className="w-6 h-6 text-[#F20C1F]" />,
    schedule: "Diario 7:00 AM - 6:00 PM",
    duration: "Flexible",
    capacity: "Disponibilidad limitada",
    difficulty: "Variable",
    requirements: "Depósito reembolsable",
    rating: 4.5,
    highlights: [
      "Bicis de montaña premium",
      "Mapas de rutas sugeridas",
      "Casco incluido",
      "Kit de reparación básico"
    ],
    price: 15,
    ageRestriction: "Mayores de 16 años"
  },
  {
    id: "a4",
    name: "Pesca Deportiva",
    description: "Una emocionante jornada de pesca en el lago cercano, ideal para aficionados.",
    image: "/images/pesca deportiva.webp",
    type: "Fuera del Hotel",
    icon: <Fish className="w-6 h-6 text-[#F20C1F]" />,
    schedule: "Viernes a Domingo 5:30 AM",
    duration: "5 horas",
    capacity: "Máx. 6 personas",
    difficulty: "Intermedia",
    requirements: "Licencia de pesca (opcional)",
    rating: 4.8,
    highlights: [
      "Equipo profesional incluido",
      "Guía experto en pesca",
      "Desayuno tipo picnic",
      "Opción 'captura y libera'"
    ],
    price: 65,
    ageRestriction: "Mayores de 10 años"
  },
  {
    id: "a5",
    name: "Clases de Cocina Local",
    description: "Aprende a preparar platos típicos de la región con nuestros chefs.",
    image: "/images/clases de cocina.webp",
    type: "Dentro del Hotel",
    icon: <UtensilsCrossed className="w-6 h-6 text-[#F20C1F]" />,
    schedule: "Lunes y Jueves 10:00 AM",
    duration: "3 horas",
    capacity: "Máx. 8 personas",
    difficulty: "Principiante",
    requirements: "Delantal incluido",
    rating: 4.9,
    highlights: [
      "Ingredientes locales frescos",
      "Recetario para llevar",
      "Degustación de lo preparado",
      "Certificado de participación"
    ],
    price: 55,
    ageRestriction: "Mayores de 10 años"
  }
];

export const HotelActivitiesSection = () => {
  return (
    <section className="py-16 bg-white"> {/* Fondo blanco, limpio */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#0D0D0D] mb-4">Actividades</h2>
          <p className="text-lg text-[#0D0D0D]">
            Disfruta de una variedad de actividades para todas las edades y gustos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activitiesData.map((activity) => (
            <Card
              key={activity.id}
              className="shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full bg-white rounded-lg border border-gray-200"
            >
              <img
                src={activity.image}
                alt={activity.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <CardContent className="p-6 flex flex-col flex-1">
                <div className="flex items-center mb-3">
                  <div className="p-2 bg-white rounded-full mr-3 border-2 border-[#F20C1F] shadow-sm">
                    {activity.icon}
                  </div>
                  <h3 className="font-bold text-[#0D0D0D] text-xl">
                    {activity.name}
                  </h3>
                </div>

                <p className="text-sm text-[#0D0D0D] mb-3 line-clamp-2">
                  {activity.description}
                </p>

                <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                  <div className="flex items-center gap-1 text-[#0D0D0D]">
                    <Clock className="w-4 h-4 text-[#F20C1F]" />
                    <span>{activity.duration}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[#0D0D0D]">
                    <Users className="w-4 h-4 text-[#F20C1F]" />
                    <span>{activity.capacity}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[#0D0D0D]">
                    <Calendar className="w-4 h-4 text-[#F20C1F]" />
                    <span>{activity.schedule}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[#0D0D0D]">
                    <Star className="w-4 h-4 text-[#F20C1F]" />
                    <span>{activity.rating}/5</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-[#0D0D0D] text-sm mb-2">Destacados:</h4>
                  <ul className="text-xs text-[#0D0D0D] space-y-1">
                    {activity.highlights.slice(0, 3).map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-[#F20C1F] mr-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-bold text-[#F20C1F]">
                      ${activity.price} USD
                    </span>
                    <span className="text-xs bg-white text-[#0D0D0D] px-2 py-1 rounded-full border border-[#F20C1F]">
                      {activity.ageRestriction}
                    </span>
                  </div>
                  <Button className="w-full bg-[#F20C1F] hover:bg-[#F20C0C] text-white transition-colors">
                    Reservar Ahora
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};