import { FlashDealCard } from "../FlashDealCard/FlashDealCard";

const flashDealsData = [
  {
    id: "fd1",
    name: "Fin de Semana en Tucacas",
    originalPrice: 180,
    discountedPrice: 129,
    image: "/images/bali.webp",
    description:
      "2 noches con vista al mar, desayuno criollo incluido y acceso directo a la playa de Tucacas.",
  },
  {
    id: "fd2",
    name: "Aventura en Morrocoy",
    originalPrice: 320,
    discountedPrice: 249,
    image: "/images/escalada.webp",
    description:
      "3 días con tour a los Cayos de Morrocoy, snorkel incluido y almuerzo en Cayo Sombrero.",
  },
  {
    id: "fd3",
    name: "Relax Total Caribeño",
    originalPrice: 450,
    discountedPrice: 339,
    image: "/images/playas del caribe.webp",
    description:
      "5 noches todo incluido con spa, piscina frente al mar y excursiones a playas vírgenes.",
  },
  {
    id: "fd4",
    name: "Escapada Familiar",
    originalPrice: 280,
    discountedPrice: 199,
    image: "/images/bali.webp",
    description:
      "3 días para toda la familia con actividades acuáticas, kayak y visita al Parque Morrocoy.",
  },
];

export const FlashDealsSection = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Ofertas Relámpago - Tucacas
          </h2>
          <p className="text-gray-600">
            ¡Descubre el paraíso caribeño de Falcón con estas promociones especiales!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {flashDealsData.map((deal) => (
            <FlashDealCard
              key={deal.id}
              id={deal.id}
              name={deal.name}
              originalPrice={deal.originalPrice}
              discountedPrice={deal.discountedPrice}
              image={deal.image}
              description={deal.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
