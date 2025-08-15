"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  Send,
  Clock,
  MessageCircle,
  Star,
  Globe,
  CheckCircle,
  Menu,
  X,
} from "lucide-react";

export const ContactMainSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showContactInfo, setShowContactInfo] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular envío
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log("Formulario enviado:", formData);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset success message after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Dirección",
      content: "Av. Principal 1234, Centro Histórico",
      subtitle: "Ciudad de México, CDMX 06000",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: Mail,
      title: "Correo Electrónico",
      content: "info@bookmehotel.com",
      subtitle: "Respuesta en menos de 2 horas",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  const socialLinks = [
    { icon: Facebook, label: "Facebook", href: "#", color: "hover:text-blue-600" },
    { icon: Instagram, label: "Instagram", href: "#", color: "hover:text-pink-600" },
    { icon: Twitter, label: "Twitter", href: "#", color: "hover:text-sky-600" },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-[#F20C1F] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-[#020659] rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-[#F20C1F]/10 text-[#F20C1F] px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4" />
            Contacto
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#0D0D0D] mb-4 sm:mb-6 leading-tight px-4">
            Ponte en <span className="text-[#F20C1F]">Contacto</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            Estamos aquí para hacer realidad tu experiencia perfecta. 
            Contáctanos y descubre todo lo que podemos ofrecerte.
          </p>
        </motion.div>

        {/* Mobile Contact Info Toggle */}
        <div className="lg:hidden mb-6">
          <Button
            onClick={() => setShowContactInfo(!showContactInfo)}
            variant="outline"
            className="w-full flex items-center justify-between p-4 h-auto border-2 border-[#F20C1F]/20 hover:border-[#F20C1F] transition-colors"
          >
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-[#F20C1F]" />
              <span className="font-semibold">Información de Contacto</span>
            </div>
            {showContactInfo ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
          
          {showContactInfo && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4"
            >
              <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-4">
                    {contactInfo.map((info, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-300"
                      >
                        <div className={`p-2 rounded-lg ${info.bgColor} flex-shrink-0`}>
                          <info.icon className={`w-4 h-4 ${info.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-[#0D0D0D] text-sm">
                            {info.title}
                          </h4>
                          <p className="text-[#0D0D0D] font-medium text-sm">
                            {info.content}
                          </p>
                          <p className="text-gray-500 text-xs">
                            {info.subtitle}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Mobile Social Links */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <h4 className="font-semibold text-[#0D0D0D] text-sm mb-3">
                      Síguenos en Redes Sociales
                    </h4>
                    <div className="flex gap-3 justify-center">
                      {socialLinks.map((social, index) => (
                        <motion.a
                          key={index}
                          href={social.href}
                          aria-label={social.label}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className={`p-3 bg-gray-100 rounded-full text-gray-600 transition-all duration-300 ${social.color} hover:shadow-lg`}
                        >
                          <social.icon className="w-5 h-5" />
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 order-2 lg:order-1"
          >
            <Card className="shadow-xl lg:shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-4 sm:p-6 lg:p-8">
                <div className="flex items-center gap-3 mb-6 lg:mb-8">
                  <div className="p-2 sm:p-3 bg-[#F20C1F]/10 rounded-full">
                    <Send className="w-5 h-5 sm:w-6 sm:h-6 text-[#F20C1F]" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#0D0D0D]">
                      Envíanos un Mensaje
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600">Te responderemos lo antes posible</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-[#0D0D0D] font-medium text-sm sm:text-base">
                        Nombre Completo *
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Tu nombre"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="h-10 sm:h-12 border-gray-200 focus:border-[#F20C1F] focus:ring-[#F20C1F] transition-all duration-300 bg-white/50 text-sm sm:text-base"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-[#0D0D0D] font-medium text-sm sm:text-base">
                        Correo Electrónico *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="tu@ejemplo.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="h-10 sm:h-12 border-gray-200 focus:border-[#F20C1F] focus:ring-[#F20C1F] transition-all duration-300 bg-white/50 text-sm sm:text-base"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-[#0D0D0D] font-medium text-sm sm:text-base">
                      Asunto *
                    </Label>
                    <Input
                      id="subject"
                      type="text"
                      placeholder="¿En qué podemos ayudarte?"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="h-10 sm:h-12 border-gray-200 focus:border-[#F20C1F] focus:ring-[#F20C1F] transition-all duration-300 bg-white/50 text-sm sm:text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-[#0D0D0D] font-medium text-sm sm:text-base">
                      Tu Mensaje *
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Cuéntanos más detalles sobre tu consulta..."
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="sm:rows-6 border-gray-200 focus:border-[#F20C1F] focus:ring-[#F20C1F] transition-all duration-300 bg-white/50 resize-none text-sm sm:text-base"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 sm:h-14 bg-gradient-to-r from-[#F20C1F] to-[#D10000] hover:from-[#D10000] hover:to-[#A00000] text-white text-base sm:text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span className="text-sm sm:text-base">Enviando...</span>
                      </div>
                    ) : isSubmitted ? (
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="text-sm sm:text-base">¡Mensaje Enviado!</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="text-sm sm:text-base">Enviar Mensaje</span>
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info - Desktop Only */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="hidden lg:block space-y-6 order-1 lg:order-2"
          >
            {/* Contact Information */}
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-[#020659]/10 rounded-full">
                    <Star className="w-6 h-6 text-[#020659]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0D0D0D]">
                    Información de Contacto
                  </h3>
                </div>

                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                      className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-300"
                    >
                      <div className={`p-2 rounded-lg ${info.bgColor} flex-shrink-0`}>
                        <info.icon className={`w-5 h-5 ${info.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-[#0D0D0D] text-sm">
                          {info.title}
                        </h4>
                        <p className="text-[#0D0D0D] font-medium">
                          {info.content}
                        </p>
                        <p className="text-gray-500 text-sm">
                          {info.subtitle}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>


            {/* Social Media - Desktop */}
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="font-bold text-[#0D0D0D] text-lg mb-4">
                  Síguenos en Redes Sociales
                </h3>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      aria-label={social.label}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-3 bg-gray-100 rounded-full text-gray-600 transition-all duration-300 ${social.color} hover:shadow-lg`}
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 sm:mt-12"
        >
          <Card className="shadow-xl lg:shadow-2xl border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="p-4 sm:p-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 sm:p-3 bg-[#F20C1F]/10 rounded-full">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-[#F20C1F]" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#0D0D0D]">
                      Nuestra Ubicación
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600">Encuéntranos fácilmente en el corazón de la ciudad</p>
                  </div>
                </div>
              </div>
              <div className="h-64 sm:h-80 lg:h-96 bg-gray-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.8947!2d-99.1332!3d19.4326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff35f5c5b7a7%3A0x4a5d4e7b8c9d0e7!2sZócalo%20de%20la%20Ciudad%20de%20México!5e0!3m2!1ses!2smx!4v1678901234567!5m2!1ses!2smx"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación del Hotel"
                  className="grayscale hover:grayscale-0 transition-all duration-500"
                ></iframe>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};