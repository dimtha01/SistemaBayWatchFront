import { ServiceItem } from "../ServiceItem/ServiceItem";

const servicesData = [
  {
    title: "Spa & Bienestar",
    description:
      "Relájese y rejuvenezca con nuestros tratamientos de spa de clase mundial.",
  },
  {
    title: "Restaurante Gourmet",
    description:
      "Deléitese con nuestra cocina de autor preparada por chefs de renombre.",
  },
  {
    title: "Centro de Fitness",
    description:
      "Manténgase en forma durante su estancia con nuestro gimnasio completamente equipado.",
  },
  {
    title: "Piscina Infinita",
    description:
      "Disfrute de vistas impresionantes mientras se relaja en nuestra piscina infinita.",
  },
  {
    title: "Servicio de Concierge",
    description:
      "Nuestro equipo de concierge está disponible 24/7 para atender todas sus necesidades.",
  },
  {
    title: "Salas de Conferencias",
    description:
      "Espacios versátiles para reuniones y eventos con tecnología de vanguardia.",
  },
];

export const ExclusiveExperiencesSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="inline-block bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
            Servicios
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Experiencias Exclusivas
          </h2>
          <p className="text-lg text-gray-600">
            Disfrute de nuestros servicios premium diseñados para hacer su
            estancia inolvidable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <ServiceItem
              key={index}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
