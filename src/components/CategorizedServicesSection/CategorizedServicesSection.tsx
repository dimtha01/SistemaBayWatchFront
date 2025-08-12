import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, Info, Users, Dumbbell, Waves, SpadeIcon as Spa, Wifi } from "lucide-react"

interface ServiceDetail {
  name: string
  description: string
  schedule?: string
  policy?: string
  icon: React.ReactNode
}

interface ServiceCategory {
  category: string
  services: ServiceDetail[]
}

const categorizedServicesData: ServiceCategory[] = [
  {
    category: "Bienestar y Recreación",
    services: [
      {
        name: "Spa & Masajes",
        description: "Relájate con nuestra variedad de tratamientos y masajes profesionales.",
        schedule: "09:00 - 20:00 (cita previa)",
        policy: "Se requiere reserva con 24h de antelación.",
        icon: <Spa className="w-6 h-6 text-[#F20C1F]" />,
      },
      {
        name: "Piscina Climatizada",
        description: "Disfruta de nuestra piscina interior climatizada durante todo el año.",
        schedule: "07:00 - 22:00",
        policy: "Acceso gratuito para huéspedes. Niños siempre acompañados.",
        icon: <Waves className="w-6 h-6 text-[#F20C1F]" />,
      },
      {
        name: "Gimnasio",
        description: "Mantente en forma con nuestro equipo de última generación.",
        schedule: "24 horas (acceso con tarjeta de habitación)",
        policy: "Uso bajo responsabilidad del huésped. Se recomienda ropa deportiva.",
        icon: <Dumbbell className="w-6 h-6 text-[#F20C1F]" />,
      },
    ],
  },
  {
    category: "Conectividad y Negocios",
    services: [
      {
        name: "Wi-Fi Gratuito",
        description: "Conexión a internet de alta velocidad en todo el hotel.",
        schedule: "24/7",
        policy: "Disponible para todos los huéspedes sin costo adicional.",
        icon: <Wifi className="w-6 h-6 text-[#F20C1F]" />,
      },
      {
        name: "Centro de Negocios",
        description: "Espacio equipado con computadoras, impresoras y salas de reuniones.",
        schedule: "08:00 - 20:00",
        policy: "Uso por horas, consultar tarifas en recepción.",
        icon: <Users className="w-6 h-6 text-[#F20C1F]" />,
      },
    ],
  },
]

export const CategorizedServicesSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#0D0D0D] mb-4">Servicios del Hotel</h2>
          <p className="text-lg text-[#0D0D0D]">
            Descubre la amplia gama de servicios diseñados para tu comodidad y disfrute.
          </p>
        </div>

        {categorizedServicesData.map((categoryData) => (
          <div key={categoryData.category} className="mb-12 last:mb-0">
            <h3 className="text-2xl font-bold text-[#0D0D0D] mb-6 text-center md:text-left">{categoryData.category}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoryData.services.map((service, index) => (
                <Card key={index} className="shadow-sm hover:shadow-md transition-shadow duration-300 border-[#F2E205]/20">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="p-2 bg-[#F2E205]/10 rounded-full mr-4">{service.icon}</div>
                      <h4 className="font-semibold text-[#0D0D0D] text-xl">{service.name}</h4>
                    </div>
                    <p className="text-sm text-[#0D0D0D] mb-4">{service.description}</p>
                    {service.schedule && (
                      <div className="flex items-center text-[#0D0D0D] text-sm mb-2">
                        <Clock className="w-4 h-4 mr-2 text-[#F20C1F]" />
                        <span>Horario: {service.schedule}</span>
                      </div>
                    )}
                    {service.policy && (
                      <div className="flex items-start text-[#0D0D0D] text-sm">
                        <Info className="w-4 h-4 mr-2 mt-1 text-[#F20C1F]" />
                        <span>Política: {service.policy}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
} 