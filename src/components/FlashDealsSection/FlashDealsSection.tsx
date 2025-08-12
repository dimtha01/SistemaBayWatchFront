import { FlashDealCard } from "../FlashDealCard/FlashDealCard";

const flashDealsData = [
  {
    id: "fd1",
    name: "Escapada Romántica en Bali",
    originalPrice: 1200,
    discountedPrice: 899,
    image: "/images/bali.webp",
    description:
      "Disfruta de 3 noches en una villa privada con piscina, desayuno incluido y cena romántica.",
  },
  {
    id: "fd2",
    name: "Aventura Familiar en la Montaña",
    originalPrice: 950,
    discountedPrice: 699,
    image: "/images/escalada.webp",
    description:
      "Paquete de 4 días para toda la familia con actividades al aire libre y pensión completa.",
  },
  {
    id: "fd3",
    name: "Relajación en la Playa del Caribe",
    originalPrice: 1500,
    discountedPrice: 1099,
    image: "/images/playas del caribe.webp",
    description:
      "7 noches en un resort todo incluido frente al mar, con spa y deportes acuáticos.",
  },
  {
    id: "fd4",
    name: "City Break en París",
    originalPrice: 700,
    discountedPrice: 499,
    image: "/images/paris.webp",
    description:
      "3 días en un hotel boutique en el centro de París, cerca de las principales atracciones.",
  },
];

export const FlashDealsSection = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Ofertas Relámpago
          </h2>
          <p className="text-gray-600">
            ¡No te pierdas estas promociones por tiempo limitado!
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
