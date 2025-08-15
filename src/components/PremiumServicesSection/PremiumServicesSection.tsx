import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Baby, Car, Plane, X, User, Mail, Phone, Calendar, Clock, MessageSquare, Send, CheckCircle, ArrowRight, Home } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const premiumServicesData = [
  {
    id: "p1",
    name: "Servicio de Niñera",
    description: "Cuidado profesional y seguro para tus hijos, permitiéndote disfrutar de tu tiempo libre con total tranquilidad.",
    icon: <Baby className="w-8 h-8 text-[#F20C1F]" />,
    priceInfo: "Desde $25/hora",
    features: ["Cuidadoras certificadas", "Disponible 24/7", "Actividades educativas", "Referencias verificadas"],
    category: "childcare"
  },
  {
    id: "p2",
    name: "Traslados VIP",
    description: "Transporte de lujo desde y hacia el aeropuerto o cualquier destino local con el máximo confort.",
    icon: <Car className="w-8 h-8 text-[#F20C1F]" />,
    priceInfo: "Consultar tarifas",
    features: ["Vehículos de lujo", "Chofer profesional", "WiFi gratuito", "Agua y amenities"],
    category: "transport"
  },
  {
    id: "p3",
    name: "Excursiones Personalizadas",
    description: "Organizamos tours privados a los puntos de interés más emblemáticos de la región con guías expertos.",
    icon: <Plane className="w-8 h-8 text-[#F20C1F]" />,
    priceInfo: "A medida",
    features: ["Guías especializados", "Itinerarios personalizados", "Transporte incluido", "Grupos reducidos"],
    category: "tours"
  },
]

interface ServiceRequestForm {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  message: string;
}

export const PremiumServicesSection = () => {
  const [selectedService, setSelectedService] = useState<typeof premiumServicesData[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [submittedData, setSubmittedData] = useState<{ service: string; formData: ServiceRequestForm } | null>(null);
  const [formData, setFormData] = useState<ServiceRequestForm>({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '1',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openModal = (service: typeof premiumServicesData[0]) => {
    setSelectedService(service);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      guests: '1',
      message: ''
    });
    document.body.style.overflow = 'unset';
  };

  const closeConfirmation = () => {
    setIsConfirmationOpen(false);
    setSubmittedData(null);
    document.body.style.overflow = 'unset';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call [[1]](#__1)
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Store submitted data for confirmation modal
    setSubmittedData({
      service: selectedService?.name || '',
      formData: { ...formData }
    });

    setIsSubmitting(false);
    setIsModalOpen(false);
    setIsConfirmationOpen(true);

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      guests: '1',
      message: ''
    });
  };

  // Modal animation variants [[0]](#__0)
  const modalVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const modalContentVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", damping: 25, stiffness: 300 }
    },
    exit: { opacity: 0, scale: 0.8, y: 50 }
  };

  // Confirmation modal variants with success animation [[2]](#__2)
  const confirmationVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 300,
        delay: 0.1
      }
    },
    exit: {
      opacity: 0,
      scale: 0.5,
      transition: { duration: 0.2 }
    }
  };

  const checkmarkVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay: 0.3, duration: 0.8, ease: "easeInOut" },
        opacity: { delay: 0.3, duration: 0.3 }
      }
    }
  };

  return (
    <>
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <motion.div
            className="text-center mb-8 sm:mb-12 lg:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0D0D0D] mb-3 sm:mb-4">
              Servicios Premium
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-[#0D0D0D]/80 max-w-2xl mx-auto">
              Eleva tu experiencia con nuestras opciones exclusivas diseñadas para tu comodidad.
            </p>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {premiumServicesData.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="h-full"
              >
                <Card className="h-full shadow-lg hover:shadow-2xl transition-all duration-500 border-[#020659]/10 bg-white overflow-hidden group">
                  <CardContent className="p-6 sm:p-8 flex flex-col h-full">
                    {/* Icon Section */}
                    <div className="mb-6 flex justify-center">
                      <div className="p-4 bg-gradient-to-br from-[#F20C1F]/10 to-[#F20C1F]/20 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                        {service.icon}
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="text-center flex-grow flex flex-col">
                      <h3 className="font-bold text-[#0D0D0D] text-xl sm:text-2xl mb-3 sm:mb-4">
                        {service.name}
                      </h3>

                      <p className="text-sm sm:text-base text-[#0D0D0D]/70 mb-4 sm:mb-6 leading-relaxed flex-grow">
                        {service.description}
                      </p>

                      {/* Features List */}
                      <div className="mb-4 sm:mb-6">
                        <ul className="space-y-2 text-xs sm:text-sm text-[#0D0D0D]/60">
                          {service.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center justify-center gap-2">
                              <div className="w-1.5 h-1.5 bg-[#F20C1F] rounded-full"></div>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Price */}
                      <div className="mb-6">
                        <span className="text-[#F20C1F] font-bold text-lg sm:text-xl bg-[#F20C1F]/10 px-4 py-2 rounded-full">
                          {service.priceInfo}
                        </span>
                      </div>

                      {/* CTA Button */}
                      <Button
                        onClick={() => openModal(service)}
                        className="w-full bg-gradient-to-r from-[#F20C0C] to-[#F20C1F] hover:from-[#D10000] hover:to-[#D10000] text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 py-3 sm:py-4 text-sm sm:text-base font-semibold rounded-xl group-hover:scale-105"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Solicitar Servicio
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Request Modal */}
      <AnimatePresence>
        {isModalOpen && selectedService && (
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              variants={modalContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-gray-100 p-6 sm:p-8 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-[#F20C1F]/10 to-[#F20C1F]/20 rounded-xl">
                      {selectedService.icon}
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-[#0D0D0D]">
                        Solicitar {selectedService.name}
                      </h3>
                      <p className="text-sm text-[#0D0D0D]/60 mt-1">
                        {selectedService.priceInfo}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 sm:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-[#0D0D0D] flex items-center gap-2">
                        <User className="w-4 h-4 text-[#F20C1F]" />
                        Nombre completo *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F20C1F]/20 focus:border-[#F20C1F] transition-all duration-200"
                        placeholder="Tu nombre completo"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-[#0D0D0D] flex items-center gap-2">
                        <Mail className="w-4 h-4 text-[#F20C1F]" />
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F20C1F]/20 focus:border-[#F20C1F] transition-all duration-200"
                        placeholder="tu@email.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#0D0D0D] flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[#F20C1F]" />
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F20C1F]/20 focus:border-[#F20C1F] transition-all duration-200"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  {/* Service Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-[#0D0D0D] flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#F20C1F]" />
                        Fecha *
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        required
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F20C1F]/20 focus:border-[#F20C1F] transition-all duration-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-[#0D0D0D] flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#F20C1F]" />
                        Hora
                      </label>
                      <input
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F20C1F]/20 focus:border-[#F20C1F] transition-all duration-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-[#0D0D0D]">
                        {selectedService.category === 'childcare' ? 'Niños' :
                          selectedService.category === 'transport' ? 'Pasajeros' : 'Personas'}
                      </label>
                      <select
                        name="guests"
                        value={formData.guests}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F20C1F]/20 focus:border-[#F20C1F] transition-all duration-200"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                          <option key={num} value={num}>{num}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Additional Message */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#0D0D0D] flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-[#F20C1F]" />
                      Detalles adicionales
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F20C1F]/20 focus:border-[#F20C1F] transition-all duration-200 resize-none"
                      placeholder="Compártenos cualquier detalle específico sobre tu solicitud..."
                    />
                  </div>

                  {/* Service Features Reminder */}
                  <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                    <h4 className="font-semibold text-[#0D0D0D] mb-3">
                      Este servicio incluye:
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-[#0D0D0D]/70">
                      {selectedService.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-[#F20C1F] rounded-full"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Submit Button */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={closeModal}
                      className="flex-1 py-3 sm:py-4 text-[#0D0D0D] border-gray-200 hover:bg-gray-50 rounded-xl"
                    >
                      Cancelar
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-gradient-to-r from-[#F20C0C] to-[#F20C1F] hover:from-[#D10000] hover:to-[#D10000] text-white py-3 sm:py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Enviando...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Send className="w-4 h-4" />
                          Enviar Solicitud
                        </div>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Confirmation Modal [[2]](#__2) [[3]](#__3) */}
      <AnimatePresence>
        {isConfirmationOpen && submittedData && (
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={closeConfirmation}
          >
            <motion.div
              variants={confirmationVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full mx-4 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Success Header with Animation */}
              <div className="bg-gradient-to-br from-[#F20C1F]/5 to-[#F20C1F]/10 p-8 text-center relative overflow-hidden">
                {/* Animated Background Elements */}
                <motion.div
                  className="absolute inset-0 opacity-5"
                  initial={{ scale: 0, rotate: 0 }}
                  animate={{ scale: 1, rotate: 360 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  <div className="w-32 h-32 bg-[#F20C1F] rounded-full absolute -top-16 -right-16"></div>
                  <div className="w-24 h-24 bg-[#F20C1F] rounded-full absolute -bottom-12 -left-12"></div>
                </motion.div>

                {/* Animated Success Icon */}
                <motion.div
                  className="relative z-10 mb-6"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 15, stiffness: 300, delay: 0.2 }}
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-[#F20C1F] to-[#D10000] rounded-full flex items-center justify-center mx-auto shadow-lg">
                    <motion.svg
                      className="w-10 h-10 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      initial="hidden"
                      animate="visible"
                    >
                      <motion.path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                        variants={checkmarkVariants}
                      />
                    </motion.svg>
                  </div>
                </motion.div>

                {/* Success Message */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="relative z-10"
                >
                  <h3 className="text-2xl font-bold text-[#0D0D0D] mb-2">
                    ¡Solicitud Enviada!
                  </h3>
                  <p className="text-[#0D0D0D]/70 text-sm">
                    Tu solicitud ha sido procesada exitosamente
                  </p>
                </motion.div>
              </div>

              {/* Confirmation Details */}
              <motion.div
                className="p-6 space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {/* Service Details */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-semibold text-[#0D0D0D] mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#F20C1F] rounded-full"></div>
                    Detalles del Servicio
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#0D0D0D]/60">Servicio:</span>
                      <span className="font-medium text-[#0D0D0D]">{submittedData.service}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#0D0D0D]/60">Cliente:</span>
                      <span className="font-medium text-[#0D0D0D]">{submittedData.formData.name}</span>
                    </div>
                    {submittedData.formData.date && (
                      <div className="flex justify-between">
                        <span className="text-[#0D0D0D]/60">Fecha:</span>
                        <span className="font-medium text-[#0D0D0D]">
                          {new Date(submittedData.formData.date).toLocaleDateString('es-ES', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    )}
                    {submittedData.formData.time && (
                      <div className="flex justify-between">
                        <span className="text-[#0D0D0D]/60">Hora:</span>
                        <span className="font-medium text-[#0D0D0D]">{submittedData.formData.time}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Next Steps */}
                <div className="bg-gradient-to-r from-[#F20C1F]/5 to-[#F20C1F]/10 rounded-xl p-4">
                  <h4 className="font-semibold text-[#0D0D0D] mb-3 flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-[#F20C1F]" />
                    Próximos Pasos
                  </h4>
                  <ul className="space-y-2 text-sm text-[#0D0D0D]/70">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-[#F20C1F] rounded-full mt-2 flex-shrink-0"></div>
                      <span>Recibirás una confirmación por email en los próximos minutos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-[#F20C1F] rounded-full mt-2 flex-shrink-0"></div>
                      <span>Nuestro equipo se pondrá en contacto contigo dentro de 2 horas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-[#F20C1F] rounded-full mt-2 flex-shrink-0"></div>
                      <span>Te enviaremos todos los detalles y coordinación del servicio</span>
                    </li>
                  </ul>
                </div>

                {/* Contact Information */}
                <div className="text-center text-sm text-[#0D0D0D]/60">
                  <p>¿Necesitas hacer cambios? Contáctanos al:</p>
                  <p className="font-semibold text-[#F20C1F] mt-1">+1 (555) 123-4567</p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button
                    onClick={closeConfirmation}
                    className="flex-1 bg-gradient-to-r from-[#F20C0C] to-[#F20C1F] hover:from-[#D10000] hover:to-[#D10000] text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Home className="w-4 h-4" />
                      Volver al Inicio
                    </div>
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
