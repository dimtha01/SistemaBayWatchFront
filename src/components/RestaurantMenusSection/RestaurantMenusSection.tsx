import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

const menusData = [
  {
    id: "m1",
    name: "Menú Principal del Restaurante 'El Sabor'",
    description:
      "Descubre nuestra selección de platos de autor, con opciones para todos los gustos.",
    items: [
      {
        category: "Entradas",
        dishes: [
          "Ensalada Caprese",
          "Carpaccio de Pulpo",
          "Sopa de Cebolla Gratinada",
        ],
      },
      {
        category: "Platos Fuertes",
        dishes: [
          "Salmón a la Plancha con Espárragos",
          "Solomillo de Ternera con Reducción de Vino Tinto",
          "Risotto de Setas Silvestres",
        ],
      },
      {
        category: "Postres",
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
    name: "Carta de Vinos y Bebidas",
    description:
      "Una cuidada selección de vinos nacionales e internacionales, cervezas artesanales y cócteles de autor.",
    items: [
      {
        category: "Vinos Tintos",
        dishes: [
          "Rioja Crianza",
          "Ribera del Duero Reserva",
          "Malbec Argentino",
        ],
      },
      {
        category: "Vinos Blancos",
        dishes: ["Albariño", "Verdejo", "Chardonnay"],
      },
      {
        category: "Cócteles de Autor",
        dishes: ["Mojito Clásico", "Margarita Picante", "Gin Tonic Premium"],
      },
      {
        category: "Bebidas sin Alcohol",
        dishes: ["Aguas Frescas", "Refrescos", "Cafés e Infusiones"],
      },
    ],
  },
  {
    id: "m3",
    name: "Menú de Desayuno Buffet",
    description: "Opciones frescas y variadas para empezar el día con energía.",
    items: [
      {
        category: "Estación de Panadería",
        dishes: ["Croissants", "Pan de Masa Madre", "Muffins"],
      },
      {
        category: "Frutas y Yogures",
        dishes: ["Frutas de Temporada", "Yogur Griego", "Granola Casera"],
      },
      {
        category: "Platos Calientes",
        dishes: ["Huevos Revueltos", "Bacon Crujiente", "Salchichas"],
      },
      { category: "Bebidas", dishes: ["Café", "Té", "Zumos Naturales"] },
    ],
  },
];

export const RestaurantMenusSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Nuestros Menús
          </h2>
          <p className="text-lg text-gray-600">
            Explora las delicias culinarias que te esperan en nuestros
            restaurantes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menusData.map((menu) => (
            <Card key={menu.id} className="flex flex-col">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-800 text-xl mb-4">
                  {menu.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4">{menu.description}</p>
                <Accordion type="single" collapsible className="w-full">
                  {menu.items.map((category, catIndex) => (
                    <AccordionItem
                      key={catIndex}
                      value={`item-${menu.id}-${catIndex}`}
                    >
                      <AccordionTrigger className="font-medium text-gray-700 hover:no-underline">
                        {category.category}
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                          {category.dishes.map((dish, dishIndex) => (
                            <li key={dishIndex}>{dish}</li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
