import { Dialog, DialogContent} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  X, 
  Calendar as CalendarIcon, 
  Clock, 
  Users, 
  CreditCard, 
  Shield, 
  CheckCircle,
  AlertCircle,
  Phone,
  Mail,
  User,
  MessageSquare,
  Star,
  Wine,
  ChefHat
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

type DiningExperience = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  duration: string;
  time: string;
  type: string;
  maxCapacity: number;
  location: string;
  dietaryRestrictions: string[];
  schedule: {
    day: string;
    times: string[];
    available: boolean;
  }[];
};

interface ReservationModalProps {
  experience: DiningExperience;
  isOpen: boolean;
  onClose: () => void;
}

type ReservationStep = 'details' | 'payment' | 'confirmation' | 'unavailable';

export const ReservationModal = ({ experience, isOpen, onClose }: ReservationModalProps) => {
  const [currentStep, setCurrentStep] = useState<ReservationStep>('details');
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [guestCount, setGuestCount] = useState<number>(2);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: '',
    dietaryRestrictions: [] as string[],
    acceptTerms: false,
    acceptMarketing: false
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Cena":
        return <Star className="w-5 h-5" />;
      case "Degustación":
        return <Wine className="w-5 h-5" />;
      case "Taller":
        return <ChefHat className="w-5 h-5" />;
      default:
        return <Users className="w-5 h-5" />;
    }
  };

  const getAvailableTimesForDate = (date: Date) => {
    const dayName = format(date, 'EEEE', { locale: es });
    const daySchedule = experience.schedule.find(
      schedule => schedule.day.toLowerCase() === dayName.toLowerCase()
    );
    
    if (!daySchedule || !daySchedule.available) {
      return [];
    }
    
    return daySchedule.times;
  };

  const isDateAvailable = (date: Date) => {
    const dayName = format(date, 'EEEE', { locale: es });
    const daySchedule = experience.schedule.find(
      schedule => schedule.day.toLowerCase() === dayName.toLowerCase()
    );
    return daySchedule?.available || false;
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedTime('');
    
    if (date && !isDateAvailable(date)) {
      setCurrentStep('unavailable');
    } else if (currentStep === 'unavailable') {
      setCurrentStep('details');
    }
  };

  const handleDietaryRestrictionChange = (restriction: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      dietaryRestrictions: checked 
        ? [...prev.dietaryRestrictions, restriction]
        : prev.dietaryRestrictions.filter(r => r !== restriction)
    }));
  };

  const canProceedToPayment = () => {
    return selectedDate && 
           selectedTime && 
           guestCount > 0 && 
           guestCount <= experience.maxCapacity &&
           formData.firstName && 
           formData.lastName && 
           formData.email && 
           formData.phone && 
           formData.acceptTerms;
  };

  const handleReservation = () => {
    if (canProceedToPayment()) {
      setCurrentStep('payment');
    }
  };

  const handlePayment = () => {
    // Simulate payment processing
    setTimeout(() => {
      setCurrentStep('confirmation');
    }, 2000);
  };

  const totalPrice = experience.price * guestCount;

  const renderStepContent = () => {
    switch (currentStep) {
      case 'unavailable':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-8"
          >
            <AlertCircle className="w-16 h-16 text-orange-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-[#0D0D0D] mb-2">
              Fecha No Disponible
            </h3>
            <p className="text-gray-600 mb-6">
              Lo sentimos, esta experiencia no está disponible en la fecha seleccionada. 
              Por favor, elige otra fecha.
            </p>
            <Button 
              onClick={() => setCurrentStep('details')}
              className="bg-[#F20C1F] hover:bg-[#F20C1F]/90 text-white"
            >
              Seleccionar Otra Fecha
            </Button>
          </motion.div>
        );

      case 'details':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Experience Summary */}
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-start gap-4">
                <img
                  src={experience.image}
                  alt={experience.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {getTypeIcon(experience.type)}
                    <h3 className="font-bold text-[#0D0D0D]">{experience.name}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{experience.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {experience.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      Máx. {experience.maxCapacity}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-[#F20C1F]">${experience.price}</p>
                  <p className="text-sm text-gray-500">por persona</p>
                </div>
              </div>
            </div>

            {/* Date & Time Selection */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Label className="text-base font-semibold">Selecciona la Fecha</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? (
                        format(selectedDate, "PPP", { locale: es })
                      ) : (
                        <span>Selecciona una fecha</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={handleDateSelect}
                      disabled={(date) => 
                        date < new Date() || !isDateAvailable(date)
                      }
                      initialFocus
                      locale={es}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-4">
                <Label className="text-base font-semibold">Selecciona la Hora</Label>
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una hora" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedDate && getAvailableTimesForDate(selectedDate).map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Guest Count */}
            <div className="space-y-4">
              <Label className="text-base font-semibold">Número de Invitados</Label>
              <Select value={guestCount.toString()} onValueChange={(value) => setGuestCount(parseInt(value))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: experience.maxCapacity }, (_, i) => i + 1).map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? 'invitado' : 'invitados'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Personal Information */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-[#0D0D0D] flex items-center gap-2">
                <User className="w-5 h-5" />
                Información Personal
              </h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Nombre *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                    placeholder="Tu nombre"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Apellido *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                    placeholder="Tu apellido"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="tu@email.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+1 234 567 8900"
                  />
                </div>
              </div>
            </div>

            {/* Dietary Restrictions */}
            <div className="space-y-4">
              <Label className="text-base font-semibold">Restricciones Dietéticas</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {experience.dietaryRestrictions.map((restriction) => (
                  <div key={restriction} className="flex items-center space-x-2">
                    <Checkbox
                      id={restriction}
                      checked={formData.dietaryRestrictions.includes(restriction)}
                      onCheckedChange={(checked: boolean) => 
                        handleDietaryRestrictionChange(restriction, checked as boolean)
                      }
                    />
                    <Label htmlFor={restriction} className="text-sm">
                      {restriction}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Special Requests */}
            <div className="space-y-4">
              <Label htmlFor="specialRequests" className="text-base font-semibold flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Solicitudes Especiales
              </Label>
              <Textarea
                id="specialRequests"
                value={formData.specialRequests}
                onChange={(e) => setFormData(prev => ({ ...prev, specialRequests: e.target.value }))}
                placeholder="¿Hay algo especial que debemos saber? (celebraciones, alergias adicionales, etc.)"
                rows={3}
              />
            </div>

            {/* Terms and Marketing */}
            <div className="space-y-4">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="acceptTerms"
                  checked={formData.acceptTerms}
                  onCheckedChange={(checked: boolean) => 
                    setFormData(prev => ({ ...prev, acceptTerms: checked as boolean }))
                  }
                />
                <Label htmlFor="acceptTerms" className="text-sm leading-relaxed">
                  Acepto los <span className="text-[#F20C1F] underline cursor-pointer">términos y condiciones</span> y la <span className="text-[#F20C1F] underline cursor-pointer">política de privacidad</span> *
                </Label>
              </div>
              
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="acceptMarketing"
                  checked={formData.acceptMarketing}
                  onCheckedChange={(checked: boolean) => 
                    setFormData(prev => ({ ...prev, acceptMarketing: checked as boolean }))
                  }
                />
                <Label htmlFor="acceptMarketing" className="text-sm leading-relaxed">
                  Me gustaría recibir ofertas especiales y noticias sobre experiencias gastronómicas
                </Label>
              </div>
            </div>

            {/* Price Summary */}
            <div className="bg-[#F20C1F]/5 rounded-xl p-4 border border-[#F20C1F]/20">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-semibold text-[#0D0D0D]">Total a Pagar</p>
                  <p className="text-sm text-gray-600">{guestCount} invitado{guestCount > 1 ? 's' : ''} × ${experience.price}</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-[#F20C1F]">${totalPrice}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleReservation}
                disabled={!canProceedToPayment()}
                className="flex-1 bg-[#F20C1F] hover:bg-[#F20C1F]/90 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Proceder al Pago
              </Button>
            </div>
          </motion.div>
        );

      case 'payment':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Reservation Summary */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-[#0D0D0D] mb-4">Resumen de tu Reserva</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Experiencia:</span>
                  <span className="font-semibold">{experience.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fecha:</span>
                  <span className="font-semibold">
                    {selectedDate && format(selectedDate, "PPP", { locale: es })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Hora:</span>
                  <span className="font-semibold">{selectedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Invitados:</span>
                  <span className="font-semibold">{guestCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Nombre:</span>
                  <span className="font-semibold">{formData.firstName} {formData.lastName}</span>
                </div>
                <hr className="my-3" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-[#F20C1F]">${totalPrice}</span>
                </div>
              </div>
            </div>

            {/* Payment Form */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-[#0D0D0D] flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Información de Pago
              </h3>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Número de Tarjeta</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    className="text-lg tracking-wider"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Vencimiento</Label>
                    <Input
                      id="expiry"
                      placeholder="MM/AA"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardName">Nombre en la Tarjeta</Label>
                  <Input
                    id="cardName"
                    placeholder="Como aparece en la tarjeta"
                  />
                </div>
              </div>

              {/* Security Notice */}
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-semibold text-green-800 mb-1">Pago Seguro</p>
                  <p className="text-green-700">
                    Tu información está protegida con encriptación SSL de 256 bits. 
                    No almacenamos datos de tarjetas de crédito.
                  </p>
                </div>
              </div>

              {/* Cancellation Policy */}
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">Política de Cancelación</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Cancelación gratuita hasta 24 horas antes</li>
                  <li>• Cambios de fecha sin costo adicional</li>
                  <li>• Reembolso completo por cancelaciones del restaurante</li>
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                variant="outline"
                onClick={() => setCurrentStep('details')}
                className="flex-1"
              >
                Volver
              </Button>
              <Button
                onClick={handlePayment}
                className="flex-1 bg-[#F20C1F] hover:bg-[#F20C1F]/90 text-white"
              >
                Confirmar Pago - ${totalPrice}
              </Button>
            </div>
          </motion.div>
        );

      case 'confirmation':
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-[#0D0D0D] mb-4">
              ¡Reserva Confirmada!
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Tu experiencia gastronómica ha sido reservada exitosamente. 
              Recibirás un email de confirmación con todos los detalles.
            </p>

            <div className="bg-green-50 rounded-xl p-6 mb-6 text-left max-w-md mx-auto">
              <h4 className="font-bold text-green-800 mb-3">Detalles de tu Reserva:</h4>
              <div className="space-y-2 text-sm text-green-700">
                <p><strong>Código:</strong> #EXP-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                <p><strong>Experiencia:</strong> {experience.name}</p>
                <p><strong>Fecha:</strong> {selectedDate && format(selectedDate, "PPP", { locale: es })}</p>
                <p><strong>Hora:</strong> {selectedTime}</p>
                <p><strong>Invitados:</strong> {guestCount}</p>
                <p><strong>Total Pagado:</strong> ${totalPrice}</p>
              </div>
            </div>

            <div className="space-y-4">
              <Button
                onClick={onClose}
                className="bg-[#F20C1F] hover:bg-[#F20C1F]/90 text-white px-8"
              >
                Perfecto, ¡Nos vemos pronto!
              </Button>
              
              <div className="flex flex-col sm:flex-row gap-2 justify-center text-sm text-gray-500">
                <span>¿Necesitas ayuda?</span>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    +1 234 567 8900
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    reservas@hotel.com
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden bg-white border-0 shadow-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="relative"
        >
          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4 z-50 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg rounded-full"
          >
            <X className="h-5 w-5" />
          </Button>

          {/* Header */}
          <div className="bg-gradient-to-r from-[#F20C1F] to-[#F20C1F]/80 text-white p-6">
            <div className="flex items-center gap-3">
              {getTypeIcon(experience.type)}
              <div>
                <h2 className="text-2xl font-bold">
                  {currentStep === 'details' && 'Reservar Experiencia'}
                  {currentStep === 'payment' && 'Confirmar Pago'}
                  {currentStep === 'confirmation' && '¡Reserva Exitosa!'}
                  {currentStep === 'unavailable' && 'Fecha No Disponible'}
                </h2>
                <p className="text-white/90">{experience.name}</p>
              </div>
            </div>

            {/* Progress Indicator */}
            {currentStep !== 'unavailable' && currentStep !== 'confirmation' && (
              <div className="flex items-center gap-2 mt-4">
                <div className={`w-3 h-3 rounded-full ${
                  currentStep === 'details' ? 'bg-white' : 'bg-white/50'
                }`}></div>
                <div className="flex-1 h-0.5 bg-white/30"></div>
                <div className={`w-3 h-3 rounded-full ${
                  currentStep === 'payment' ? 'bg-white' : 'bg-white/50'
                }`}></div>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
            <AnimatePresence mode="wait">
              {renderStepContent()}
            </AnimatePresence>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};
