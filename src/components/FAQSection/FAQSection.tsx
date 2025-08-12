import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    question: "¿Cuál es el horario de check-in y check-out?",
    answer:
      "El check-in es a partir de las 15:00 y el check-out es hasta las 12:00. Si necesitas un horario diferente, por favor, consulta en recepción.",
  },
  {
    question: "¿El hotel ofrece servicio de habitaciones?",
    answer:
      "Sí, nuestro servicio de habitaciones está disponible las 24 horas del día con una amplia selección de platos y bebidas.",
  },
  {
    question: "¿Hay estacionamiento disponible en el hotel?",
    answer:
      "Sí, contamos con estacionamiento privado para huéspedes con costo adicional. Se recomienda reservar con antelación.",
  },
  {
    question: "¿El hotel es pet-friendly?",
    answer:
      "Aceptamos mascotas pequeñas bajo ciertas condiciones y con un cargo adicional. Por favor, consulta nuestra política de mascotas al hacer tu reserva.",
  },
  {
    question: "¿Hay opciones de comida para dietas especiales?",
    answer:
      "Sí, nuestros restaurantes ofrecen opciones vegetarianas, veganas y sin gluten. Por favor, informa a nuestro personal sobre tus necesidades dietéticas al hacer tu reserva o al llegar.",
  },
];

export const FAQSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Preguntas Frecuentes
          </h2>
          <p className="text-lg text-gray-600">
            Encuentra respuestas a las dudas más comunes sobre nuestros
            servicios.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`}>
                <AccordionTrigger className="font-semibold text-gray-800 text-left hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
