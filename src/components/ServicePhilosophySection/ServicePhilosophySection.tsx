import { Lightbulb, Smile, Handshake } from "lucide-react";

export const ServicePhilosophySection = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Nuestra Filosofía de Servicio
          </h2>
          <p className="text-lg text-gray-600">
            Nos dedicamos a superar las expectativas de nuestros huéspedes en
            cada interacción.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <Lightbulb className="w-12 h-12 text-orange-500 mx-auto mb-4" />
            <h3 className="font-bold text-gray-900 text-xl mb-2">
              Innovación Constante
            </h3>
            <p className="text-gray-600 text-sm">
              Buscamos continuamente nuevas formas de mejorar y enriquecer la
              experiencia de nuestros huéspedes.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <Smile className="w-12 h-12 text-orange-500 mx-auto mb-4" />
            <h3 className="font-bold text-gray-900 text-xl mb-2">
              Atención Personalizada
            </h3>
            <p className="text-gray-600 text-sm">
              Cada huésped es único, y nuestro equipo se esfuerza por ofrecer un
              servicio adaptado a sus necesidades.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <Handshake className="w-12 h-12 text-orange-500 mx-auto mb-4" />
            <h3 className="font-bold text-gray-900 text-xl mb-2">
              Compromiso con la Excelencia
            </h3>
            <p className="text-gray-600 text-sm">
              Nos esforzamos por mantener los más altos estándares de calidad en
              todos nuestros servicios.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
