import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChefHat, Wine, Coffee } from "lucide-react";
import { Link } from "react-router-dom";

const menusData = [
  {
    id: "m1",
    name: "Menú Principal",
    subtitle: "Restaurante 'El Sabor'",
    description:
      "Descubre nuestra selección de platos de autor, con opciones para todos los gustos.",
    icon: ChefHat,
    color: "bg-orange-50 border-orange-200",
    iconColor: "text-orange-600",
    items: [
      {
        category: "Entradas",
        count: 3,
        dishes: [
          "Ensalada Caprese",
          "Carpaccio de Pulpo",
          "Sopa de Cebolla Gratinada",
        ],
      },
      {
        category: "Platos Fuertes",
        count: 3,
        dishes: [
          "Salmón a la Plancha con Espárragos",
          "Solomillo de Ternera con Reducción de Vino Tinto",
          "Risotto de Setas Silvestres",
        ],
      },
      {
        category: "Postres",
        count: 3,
        dishes: [
          "Tarta de Queso con Frutos Rojos",
          "Brownie de Chocolate con Helado",
          "Mousse de Maracuyá",
        ],
      },
    ],
  },
  {
    id: "m2",
    name: "Carta de Vinos",
    subtitle: "y Bebidas Premium",
    description:
      "Una cuidada selección de vinos nacionales e internacionales, cervezas artesanales y cócteles de autor.",
    icon: Wine,
    color: "bg-purple-50 border-purple-200",
    iconColor: "text-purple-600",
    items: [
      {
        category: "Vinos Tintos",
        count: 3,
        dishes: [
          "Rioja Crianza",
          "Ribera del Duero Reserva",
          "Malbec Argentino",
        ],
      },
      {
        category: "Vinos Blancos",
        count: 3,
        dishes: ["Albariño", "Verdejo", "Chardonnay"],
      },
      {
        category: "Cócteles de Autor",
        count: 3,
        dishes: ["Mojito Clásico", "Margarita Picante", "Gin Tonic Premium"],
      },
      {
        category: "Sin Alcohol",
        count: 3,
        dishes: ["Aguas Frescas", "Refrescos", "Cafés e Infusiones"],
      },
    ],
  },
  {
    id: "m3",
    name: "Desayuno Buffet",
    subtitle: "Opciones Matutinas",
    description: "Opciones frescas y variadas para empezar el día con energía.",
    icon: Coffee,
    color: "bg-amber-50 border-amber-200",
    iconColor: "text-amber-600",
    items: [
      {
        category: "Panadería",
        count: 3,
        dishes: ["Croissants", "Pan de Masa Madre", "Muffins"],
      },
      {
        category: "Frutas y Yogures",
        count: 3,
        dishes: ["Frutas de Temporada", "Yogur Griego", "Granola Casera"],
      },
      {
        category: "Platos Calientes",
        count: 3,
        dishes: ["Huevos Revueltos", "Bacon Crujiente", "Salchichas"],
      },
      {
        category: "Bebidas",
        count: 3,
        dishes: ["Café", "Té", "Zumos Naturales"],
      },
    ],
  },
];

export const RestaurantMenusSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-6">
            <ChefHat className="w-8 h-8 text-orange-600" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Nuestros Menús
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Explora las delicias culinarias que te esperan en nuestros
            restaurantes
          </p>
        </div>

        {/* Menus Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {menusData.map((menu) => {
            const IconComponent = menu.icon;
            return (
              <Card
                key={menu.id}
                className={`group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${menu.color} border-2`}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`p-3 rounded-lg bg-white shadow-sm ${menu.iconColor}`}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {menu.items.reduce(
                        (total, category) => total + category.count,
                        0
                      )}{" "}
                      platos
                    </Badge>
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-900 text-xl mb-1">
                      {menu.name}
                    </h3>
                    <p className="text-sm font-medium text-gray-600 mb-3">
                      {menu.subtitle}
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {menu.description}
                    </p>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <Accordion type="single" collapsible className="w-full">
                    {menu.items.map((category, catIndex) => (
                      <AccordionItem
                        key={catIndex}
                        value={`item-${menu.id}-${catIndex}`}
                        className="border-gray-200"
                      >
                        <AccordionTrigger className="font-semibold text-gray-800 hover:no-underline hover:text-gray-900 py-4">
                          <div className="flex items-center justify-between w-full mr-4">
                            <span>{category.category}</span>
                            <Badge
                              variant="outline"
                              size="sm"
                              className="text-xs"
                            >
                              {category.count}
                            </Badge>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pb-4">
                          <div className="bg-white rounded-lg p-4 shadow-sm">
                            <ul className="space-y-2">
                              {category.dishes.map((dish, dishIndex) => (
                                <li
                                  key={dishIndex}
                                  className="flex items-center text-gray-700 text-sm"
                                >
                                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3 flex-shrink-0"></div>
                                  <span className="leading-relaxed">
                                    {dish}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <Link to='/fullMenu' className="px-8 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors duration-200 shadow-lg hover:shadow-xl">
              Ver Carta Completa
            </Link>
            <button className="px-8 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-200">
              Hacer Reserva
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
