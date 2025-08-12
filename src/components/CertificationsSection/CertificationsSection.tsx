import { Award, Leaf, Globe } from "lucide-react";

const certificationsData = [
  {
    id: "c1",
    name: "Certificación de Calidad ISO 9001",
    description:
      "Garantizamos la excelencia en la gestión de nuestros procesos y servicios.",
    icon: <Award className="w-12 h-12 text-green-600" />,
  },
  {
    id: "c2",
    name: "Hotel Sostenible (Green Key)",
    description:
      "Comprometidos con prácticas ecológicas y la reducción de nuestra huella ambiental.",
    icon: <Leaf className="w-12 h-12 text-green-600" />,
  },
  {
    id: "c3",
    name: "Premio a la Hospitalidad Global",
    description:
      "Reconocidos internacionalmente por nuestro servicio excepcional y la satisfacción del cliente.",
    icon: <Globe className="w-12 h-12 text-green-600" />,
  },
];

export const CertificationsSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Nuestras Certificaciones y Reconocimientos
          </h2>
          <p className="text-lg text-gray-600">
            Orgullosos de los estándares de calidad y sostenibilidad que nos
            avalan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {certificationsData.map((cert) => (
            <div key={cert.id} className="p-6 bg-gray-50 rounded-lg shadow-sm">
              <div className="mb-4">{cert.icon}</div>
              <h3 className="font-bold text-gray-900 text-xl mb-2">
                {cert.name}
              </h3>
              <p className="text-gray-600 text-sm">{cert.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
