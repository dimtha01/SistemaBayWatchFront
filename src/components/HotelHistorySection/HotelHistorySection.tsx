export const HotelHistorySection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="md:order-2">
          <img
            src="/images/hotel.webp"
            alt="Historia del Hotel"
            className="rounded-lg shadow-lg w-full h-auto object-cover"
          />
        </div>
        <div className="md:order-1">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Nuestra Historia
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            Fundado en 1985, el Hotel [Nombre del Hotel] comenzó como un pequeño
            establecimiento familiar con la visión de ofrecer una experiencia de
            hospitalidad inigualable. A lo largo de las décadas, hemos crecido y
            nos hemos modernizado, pero siempre manteniendo la calidez y el
            servicio personalizado que nos caracterizan.
          </p>
          <p className="text-lg text-gray-700">
            Desde nuestros humildes comienzos, hemos sido testigos de
            innumerables historias de huéspedes, celebraciones y momentos
            especiales, convirtiéndonos en un referente de lujo y confort en la
            región.
          </p>
        </div>
      </div>
    </section>
  );
};
