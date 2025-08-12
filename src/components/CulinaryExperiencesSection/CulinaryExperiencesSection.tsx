import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, Leaf, Clock, Users } from "lucide-react";

type DiningExperience = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  duration: string;
  time: string;
  type: string;
  isVegetarianFriendly: boolean;
  isAlcoholIncluded: boolean;
  features: string[];
};

const diningExperiences: DiningExperience[] = [
  {
    id: "d1",
    name: "Cena Gourmet Mediterránea",
    description: "Menú degustación con influencias griegas, italianas y españolas",
    price: 75,
    image: "/images/comida mediterrania.webp",
    duration: "3 horas",
    time: "20:00 - 23:00",
    type: "Cena",
    isVegetarianFriendly: true,
    isAlcoholIncluded: true,
    features: ["5 platos gourmet", "Maridaje de vinos", "Música en vivo"]
  },
  {
    id: "d3",
    name: "Degustación de Vinos Premium",
    description: "Selección de los mejores vinos de la región",
    price: 60,
    image: "/images/degustacion de vinos premium.webp",
    duration: "2 horas",
    time: "18:00 - 20:00",
    type: "Degustación",
    isVegetarianFriendly: false,
    isAlcoholIncluded: true,
    features: ["6 vinos premium", "Tabla de quesos", "Guía sommelier"]
  },
  {
    id: "d4",
    name: "Clase de Cocina con Chef",
    description: "Aprende los secretos de nuestra cocina estrella",
    price: 90,
    image: "/images/clases de cocina.webp",
    duration: "3.5 horas",
    time: "10:00 - 13:30",
    type: "Taller",
    isVegetarianFriendly: false,
    isAlcoholIncluded: false,
    features: ["Ingredientes premium", "Recetario exclusivo", "Degustación final"]
  }
];

export const CulinaryExperiencesSection = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Experiencias Gastronómicas
          </h2>
          <p className="text-lg text-gray-600">
            Descubre sabores excepcionales durante tu estancia
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {diningExperiences.map((experience) => (
            <Card key={experience.id} className="overflow-hidden shadow-sm hover:shadow-md transition-all">
              <img
                src={experience.image}
                alt={experience.name}
                className="w-full h-48 object-cover"
              />
              
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{experience.name}</h3>
                  <span className="text-xl font-bold text-red-600">${experience.price}</span>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-700">
                    <Clock className="w-5 h-5 mr-2 text-gray-500" />
                    <span>{experience.duration}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Users className="w-5 h-5 mr-2 text-gray-500" />
                    <span>{experience.type}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <CalendarDays className="w-5 h-5 mr-2 text-gray-500" />
                    <span>{experience.time}</span>
                  </div>
                  {experience.isVegetarianFriendly && (
                    <div className="flex items-center text-gray-700">
                      <Leaf className="w-5 h-5 mr-2 text-green-500" />
                      <span>Opción vegetariana</span>
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-200 pt-4 mb-4">
                  <ul className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                    {experience.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex space-x-3 mt-6">
                  <Button variant="outline" className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-100">
                    Ver Detalles
                  </Button>
                  <Button className="flex-1 bg-red-600 hover:bg-red-700">
                    Reservar Ahora
                  </Button>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-500 flex justify-between">
                  <span>Cancelación gratuita</span>
                  <span>Sin prepago</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};