import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { RestaurantCard } from "./RestaurantCard";
import { ScheduleModal } from "./ScheduleModal";
import { schedulesData } from "./schedulesData";

export const RestaurantSchedulesSection = () => {
  const [selectedOutlet, setSelectedOutlet] = useState(null);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [reservationStep, setReservationStep] = useState('view');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    guests: 2,
    date: '',
    time: '',
    specialRequests: ''
  });
  const [formErrors, setFormErrors] = useState({});

  // Funciones helper
  const hasAvailableSlots = (outlet: any) => {
    return outlet.schedule.some((item: any) => item.available && outlet.isOpen && !outlet.maintenanceMode);
  };

  const getAvailableSchedules = (outlet: any) => {
    return outlet.schedule.filter((item: any) => item.available && outlet.isOpen && !outlet.maintenanceMode);
  };

  const handleReservation = (outlet: any, scheduleItem: any) => {
    setSelectedOutlet(outlet);
    setSelectedSchedule(scheduleItem);
    setReservationStep('reserve');

    // Set default date to today
    const today = new Date().toISOString().split('T')[0];
    setFormData(prev => ({
      ...prev,
      date: today
    }));
  };

  const validateForm = () => {
    const errors: any = {};

    if (!formData.name.trim()) {
      errors.name = 'El nombre es requerido';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'El teléfono es requerido';
    } else if (!/^\+?[\d\s\-\(\)]{8,}$/.test(formData.phone.replace(/\s/g, ''))) {
      errors.phone = 'Número de teléfono inválido';
    }

    if (!formData.date) {
      errors.date = 'La fecha es requerida';
    }

    if (!formData.time) {
      errors.time = 'La hora es requerida';
    }

    if (formData.guests < 1) {
      errors.guests = 'Mínimo 1 huésped';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const confirmReservation = () => {
    if (validateForm()) {
      setReservationStep('success');
    }
  };

  const closeModal = () => {
    setSelectedOutlet(null);
    setSelectedSchedule(null);
    setReservationStep('view');
    setFormData({
      name: '',
      phone: '',
      guests: 2,
      date: '',
      time: '',
      specialRequests: ''
    });
    setFormErrors({});
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-20 sm:w-32 h-20 sm:h-32 bg-[#F20C1F]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-24 sm:w-40 h-24 sm:h-40 bg-[#020659]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-[#F20C1F]/10 px-3 sm:px-4 py-2 rounded-full mb-4 sm:mb-6">
            <Sparkles className="w-4 sm:w-5 h-4 sm:h-5 text-[#F20C1F]" />
            <span className="text-[#F20C1F] font-semibold text-sm sm:text-base">Experiencias Culinarias</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#0D0D0D] mb-4 sm:mb-6 leading-tight px-4">
            Horarios de Restaurantes
            <span className="block text-[#F20C1F]">y Bares</span>
          </h2>

          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            Planifica tus momentos de disfrute culinario en nuestro hotel.
            <span className="block mt-2 font-medium text-[#0D0D0D]">
              Reserva tu mesa y vive experiencias gastronómicas inolvidables
            </span>
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {schedulesData.map((outlet, index) => (
            <RestaurantCard
              key={outlet.id}
              outlet={outlet}
              index={index}
              onSelect={setSelectedOutlet}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <ScheduleModal
        selectedOutlet={selectedOutlet}
        selectedSchedule={selectedSchedule}
        reservationStep={reservationStep}
        formData={formData}
        formErrors={formErrors}
        onClose={closeModal}
        onReservation={handleReservation}
        onStepChange={setReservationStep}
        onFormChange={handleInputChange}
        onConfirm={confirmReservation}
      />
    </section>
  );
};
