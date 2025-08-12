import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";

export const LocationDetailsSection = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Encuéntranos
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Estamos ubicados en el corazón de la ciudad, cerca de los
            principales puntos de interés.
          </p>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800 text-xl mb-1">
                  Dirección
                </h3>
                <p className="text-gray-600">
                  Calle Ficticia 123, Ciudad Ejemplo, País Imaginario, CP 12345
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800 text-xl mb-1">
                  Teléfono
                </h3>
                <p className="text-gray-600">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800 text-xl mb-1">
                  Correo Electrónico
                </h3>
                <p className="text-gray-600">info@bookmehotel.com</p>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <h3 className="font-semibold text-gray-800 text-xl mb-4">
              Síguenos en Redes Sociales
            </h3>
            <div className="flex gap-4">
              <a
                href="#"
                aria-label="Facebook"
                className="text-gray-600 hover:text-orange-500 transition-colors"
              >
                <Facebook className="w-7 h-7" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="text-gray-600 hover:text-orange-500 transition-colors"
              >
                <Instagram className="w-7 h-7" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="text-gray-600 hover:text-orange-500 transition-colors"
              >
                <Twitter className="w-7 h-7" />
              </a>
            </div>
          </div>
        </div>

        {/* Interactive Map Section */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ubicación en el Mapa
          </h2>
          <div className="w-full h-96 bg-gray-300 rounded-lg overflow-hidden shadow-md">
            {/* Placeholder for an embedded map (e.g., Google Maps iframe) */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.2100000000005!2d-122.4194155!3d37.7749295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064a9b0d7b7%3A0x4a5d4e7b8c9d0e7!2sGolden%20Gate%20Bridge!5e0!3m2!1sen!2sus!4v1678901234567!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación del Hotel"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};
