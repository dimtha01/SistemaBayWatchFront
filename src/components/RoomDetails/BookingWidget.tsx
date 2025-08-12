/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  CreditCard,
  DollarSign,
  Smartphone,
  Building2,
  Bitcoin,
  Send,
  CheckCircle,
  ArrowLeft,
  Calendar as CalendarIcon,
  Users,
  Shield,
  Copy,
  AlertCircle,
  X,
  Share2,
  Download,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface BookingWidgetProps {
  pricePerNight: number;
  onBooking: (bookingData: any) => void;
  maxGuests?: number;
  minNights?: number;
  maxNights?: number;
  unavailableDates?: string[];
  reservedPeriods?: {
    start: string;
    end: string;
    reason?: string;
    guestName?: string;
    status?: "confirmed" | "pending" | "checkout";
  }[];
}

interface BookingData {
  id: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  nights: number;
  pricePerNight: number;
  subtotal: number;
  taxes: number;
  serviceFee: number;
  cleaningFee: number;
  total: number;
  bookingDate: string;
  status: "pending" | "confirmed" | "cancelled";
  paymentMethod: string;
  paymentDetails?: any;
  guestInfo?: {
    name: string;
    email: string;
    phone: string;
    document?: string;
    notes?: string;
  };
}

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  color: string;
  available: boolean;
}

export const BookingWidget = ({
  pricePerNight,
  onBooking,
  maxGuests = 4,
  minNights = 1,
  maxNights = 30,
  unavailableDates = [],
  reservedPeriods = [],
}: BookingWidgetProps) => {
  const [checkIn, setCheckIn] = useState<Date | undefined>();
  const [checkOut, setCheckOut] = useState<Date | undefined>();
  const [guests, setGuests] = useState("2");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [showCheckInCalendar, setShowCheckInCalendar] = useState(false);
  const [showCheckOutCalendar, setShowCheckOutCalendar] = useState(false);
  const [guestInfo, setGuestInfo] = useState({
    name: "",
    email: "",
    phone: "",
    document: "",
    notes: "",
  });

  // ✅ ESTADO ACTUALIZADO DE PAYMENT DETAILS CON TODOS LOS CAMPOS
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
    transferenceReference: "",
    pagoMovilPhone: "",
    pagoMovilReference: "",
    cryptoWallet: "",
    cryptoTxHash: "",
    zelleEmail: "",
    zelleReference: "",
  });

  const [paymentStep, setPaymentStep] = useState<
    "method" | "details" | "guest" | "success"
  >("method");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [bookingId, setBookingId] = useState("");
  const [dateErrors, setDateErrors] = useState<{ [key: string]: string }>({});
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isValidBooking, setIsValidBooking] = useState(false);

  // Métodos de pago disponibles
  const paymentMethods: PaymentMethod[] = [
    {
      id: "efectivo",
      name: "Efectivo",
      icon: <DollarSign className="h-6 w-6" />,
      description: "Pago en efectivo al momento del check-in",
      color: "bg-green-500",
      available: true,
    },
    {
      id: "transferencia",
      name: "Transferencia Bancaria",
      icon: <Building2 className="h-6 w-6" />,
      description: "Transferencia a cuenta bancaria",
      color: "bg-blue-500",
      available: true,
    },
    {
      id: "pago-movil",
      name: "Pago Móvil",
      icon: <Smartphone className="h-6 w-6" />,
      description: "Pago móvil interbancario",
      color: "bg-purple-500",
      available: true,
    },
    {
      id: "tarjeta",
      name: "Tarjeta de Crédito/Débito",
      icon: <CreditCard className="h-6 w-6" />,
      description: "Visa, Mastercard, American Express",
      color: "bg-orange-500",
      available: true,
    },
    {
      id: "crypto",
      name: "Criptomonedas",
      icon: <Bitcoin className="h-6 w-6" />,
      description: "Bitcoin, USDT, Ethereum",
      color: "bg-yellow-500",
      available: true,
    },
    {
      id: "zelle",
      name: "Zelle",
      icon: <Send className="h-6 w-6" />,
      description: "Transferencia vía Zelle",
      color: "bg-indigo-500",
      available: true,
    },
  ];

  // Obtener fecha mínima (hoy)
  const today = new Date();

  // ✅ FUNCIÓN PARA VERIFICAR SI UNA FECHA ESTÁ DESHABILITADA
  const isDateDisabled = useCallback(
    (date: Date): boolean => {
      // Fechas pasadas
      if (date < today) return true;

      const dateString = format(date, "yyyy-MM-dd");

      // Fechas individuales no disponibles
      if (unavailableDates.includes(dateString)) return true;

      // Verificar períodos reservados (intervalo semi-abierto [start, end))
      return reservedPeriods.some((period) => {
        const startDate = new Date(period.start);
        const endDate = new Date(period.end);
        return date >= startDate && date < endDate;
      });
    },
    [unavailableDates, reservedPeriods]
  );

  // ✅ FUNCIÓN MEJORADA PARA OBTENER MODIFICADORES CON COLORES CORREGIDOS
  const getDateModifiers = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const modifiers: any = {};
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const modifiersClassNames: any = {};

    // ✅ CSS personalizado para forzar los colores
    const customStyles = `
      .calendar-reserved-confirmed {
        background-color: #ef4444 !important;
        color: white !important;
        font-weight: 600 !important;
        border-radius: 6px !important;
      }
      .calendar-reserved-confirmed:hover {
        background-color: #dc2626 !important;
        color: white !important;
      }
      .calendar-reserved-pending {
        background-color: #f59e0b !important;
        color: #92400e !important;
        font-weight: 500 !important;
        border-radius: 6px !important;
      }
      .calendar-reserved-pending:hover {
        background-color: #d97706 !important;
        color: #92400e !important;
      }
      .calendar-reserved-checkout {
        background-color: #3b82f6 !important;
        color: white !important;
        font-weight: 500 !important;
        border-radius: 6px !important;
      }
      .calendar-reserved-checkout:hover {
        background-color: #2563eb !important;
        color: white !important;
      }
      .calendar-selected-checkin {
        background-color: #10b981 !important;
        color: white !important;
        font-weight: 700 !important;
        border-radius: 6px !important;
        box-shadow: 0 0 0 2px #6ee7b7 !important;
      }
      .calendar-selected-checkout {
        background-color: #059669 !important;
        color: white !important;
        font-weight: 700 !important;
        border-radius: 6px !important;
        box-shadow: 0 0 0 2px #6ee7b7 !important;
      }
      .calendar-selected-range {
        background-color: #d1fae5 !important;
        color: #065f46 !important;
        border-radius: 6px !important;
      }
      .calendar-unavailable {
        background-color: #fca5a5 !important;
        color: #991b1b !important;
        text-decoration: line-through !important;
        border-radius: 6px !important;
      }
    `;

    // Inyectar estilos si no existen
    if (!document.getElementById("calendar-custom-styles")) {
      const styleElement = document.createElement("style");
      styleElement.id = "calendar-custom-styles";
      styleElement.textContent = customStyles;
      document.head.appendChild(styleElement);
    }

    // Marcar fechas no disponibles
    const unavailableDateObjects = unavailableDates.map(
      (dateStr) => new Date(dateStr)
    );
    if (unavailableDateObjects.length > 0) {
      modifiers.unavailable = unavailableDateObjects;
      modifiersClassNames.unavailable = "calendar-unavailable";
    }

    // Marcar períodos reservados con diferentes colores según el estado
    reservedPeriods.forEach((period, index) => {
      const startDate = new Date(period.start);
      const endDate = new Date(period.end);
      const reservedDates: Date[] = [];

      // Generar todas las fechas del período (excluyendo la fecha de checkout)
      for (
        let date = new Date(startDate);
        date < endDate;
        date.setDate(date.getDate() + 1)
      ) {
        reservedDates.push(new Date(date));
      }

      const modifierKey = `reserved_${index}`;
      modifiers[modifierKey] = reservedDates;

      // Diferentes estilos según el estado
      switch (period.status) {
        case "confirmed":
          modifiersClassNames[modifierKey] = "calendar-reserved-confirmed";
          break;
        case "pending":
          modifiersClassNames[modifierKey] = "calendar-reserved-pending";
          break;
        case "checkout":
          modifiersClassNames[modifierKey] = "calendar-reserved-checkout";
          break;
        default:
          modifiersClassNames[modifierKey] = "calendar-reserved-confirmed";
      }
    });

    // Marcar fechas seleccionadas
    if (checkIn) {
      modifiers.checkIn = [checkIn];
      modifiersClassNames.checkIn = "calendar-selected-checkin";
    }

    if (checkOut) {
      modifiers.checkOut = [checkOut];
      modifiersClassNames.checkOut = "calendar-selected-checkout";
    }

    // Marcar rango seleccionado
    if (checkIn && checkOut) {
      const rangeDates: Date[] = [];
      for (
        let date = new Date(checkIn);
        date < checkOut;
        date.setDate(date.getDate() + 1)
      ) {
        if (date.getTime() !== checkIn.getTime()) {
          rangeDates.push(new Date(date));
        }
      }
      if (rangeDates.length > 0) {
        modifiers.selectedRange = rangeDates;
        modifiersClassNames.selectedRange = "calendar-selected-range";
      }
    }

    return { modifiers, modifiersClassNames };
  }, [unavailableDates, reservedPeriods, checkIn, checkOut]);

  // ✅ VALIDACIÓN DE FECHAS ACTUALIZADA
  const validateDates = useCallback(
    (checkInDate: Date | undefined, checkOutDate: Date | undefined) => {
      const newDateErrors: { [key: string]: string } = {};

      if (!checkInDate || !checkOutDate) return true;

      // Validar que check-in no esté deshabilitado
      if (isDateDisabled(checkInDate)) {
        newDateErrors.checkIn = "Fecha de check-in no disponible";
      }

      // Validar que no haya fechas deshabilitadas en el rango
      const start = new Date(checkInDate);
      const end = new Date(checkOutDate);

      for (
        let date = new Date(start);
        date < end;
        date.setDate(date.getDate() + 1)
      ) {
        if (isDateDisabled(date)) {
          newDateErrors.checkOut = "Tu estadía incluye fechas no disponibles";
          break;
        }
      }

      setDateErrors(newDateErrors);
      return Object.keys(newDateErrors).length === 0;
    },
    [isDateDisabled]
  );

  // ✅ CÁLCULOS DE RESERVA ACTUALIZADOS
  const bookingCalculations = useMemo(() => {
    if (!checkIn || !checkOut) {
      return {
        nights: 0,
        subtotal: 0,
        taxes: 150,
        total: 0,
        isValidDates: false,
      };
    }

    if (checkOut <= checkIn) {
      return {
        nights: 0,
        subtotal: 0,
        taxes: 150,
        total: 0,
        isValidDates: false,
      };
    }

    const nights = Math.floor(
      (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (nights < minNights || nights > maxNights) {
      return {
        nights,
        subtotal: 0,
        taxes: 150,
        total: 0,
        isValidDates: false,
      };
    }

    const isValidDateRange = validateDates(checkIn, checkOut);
    const subtotal = nights * pricePerNight;
    const taxes = 150;
    const total = subtotal + taxes;

    return {
      nights,
      subtotal,
      taxes,
      total,
      isValidDates: isValidDateRange,
    };
  }, [checkIn, checkOut, pricePerNight, minNights, maxNights, validateDates]);

  // ✅ useEffect PARA ACTUALIZAR isValidBooking
  useEffect(() => {
    const isValid =
      bookingCalculations.isValidDates &&
      Object.keys(dateErrors).length === 0 &&
      checkIn &&
      checkOut &&
      bookingCalculations.nights > 0;

    setIsValidBooking(isValid ?? false);
  }, [
    bookingCalculations.isValidDates,
    dateErrors,
    checkIn,
    checkOut,
    bookingCalculations.nights,
  ]);

  // ✅ MANEJAR SELECCIÓN DE FECHAS EN EL CALENDARIO
  const handleCheckInSelect = useCallback(
    (date: Date | undefined) => {
      setCheckIn(date);
      // Si la fecha de checkout es anterior o igual, limpiarla
      if (checkOut && date && checkOut <= date) {
        setCheckOut(undefined);
      }
      setShowCheckInCalendar(false);

      if (date) {
        validateDates(date, checkOut);
      }
    },
    [checkOut, validateDates]
  );

  const handleCheckOutSelect = useCallback(
    (date: Date | undefined) => {
      setCheckOut(date);
      setShowCheckOutCalendar(false);

      if (checkIn && date) {
        validateDates(checkIn, date);
      }
    },
    [checkIn, validateDates]
  );

  // ✅ FUNCIONES AUXILIARES
  const generateBookingId = useCallback(() => {
    return `HTL${Date.now().toString().slice(-8)}${Math.random()
      .toString(36)
      .substr(2, 4)
      .toUpperCase()}`;
  }, []);

  const formatDate = useCallback((date: Date | undefined) => {
    if (!date) return "";
    return format(date, "dd 'de' MMMM, yyyy", { locale: es });
  }, []);

  const formatDateShort = useCallback((date: Date | undefined) => {
    if (!date) return "";
    return format(date, "dd/MM/yyyy");
  }, []);

  const copyToClipboard = useCallback((text: string) => {
    navigator.clipboard.writeText(text);
  }, []);

  // ✅ HANDLE SUBMIT CON VALIDACIÓN CRÍTICA
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (!isValidBooking) {
        console.log("❌ Reserva bloqueada - Datos inválidos");
        return;
      }

      console.log("✅ Reserva válida, continuando...");
      setShowPaymentModal(true);
      setPaymentStep("method");
    },
    [isValidBooking]
  );

  const handlePaymentMethodSelect = useCallback((methodId: string) => {
    setSelectedPaymentMethod(methodId);
    if (methodId === "efectivo") {
      setPaymentStep("guest");
    } else {
      setPaymentStep("details");
    }
  }, []);

  // ✅ VALIDACIÓN DE DETALLES DE PAGO COMPLETA
  const validatePaymentDetails = useCallback(() => {
    const newErrors: { [key: string]: string } = {};

    switch (selectedPaymentMethod) {
      case "tarjeta":
        if (!paymentDetails.cardNumber.trim()) {
          newErrors.cardNumber = "Número de tarjeta requerido";
        } else if (paymentDetails.cardNumber.replace(/\s/g, "").length < 16) {
          newErrors.cardNumber = "Número de tarjeta inválido";
        }
        if (!paymentDetails.expiryDate.trim()) {
          newErrors.expiryDate = "Fecha de vencimiento requerida";
        } else if (!/^\d{2}\/\d{2}$/.test(paymentDetails.expiryDate)) {
          newErrors.expiryDate = "Formato inválido (MM/AA)";
        }
        if (!paymentDetails.cvv.trim()) {
          newErrors.cvv = "CVV requerido";
        } else if (paymentDetails.cvv.length < 3) {
          newErrors.cvv = "CVV inválido";
        }
        if (!paymentDetails.cardName.trim()) {
          newErrors.cardName = "Nombre en la tarjeta requerido";
        }
        break;

      case "transferencia":
        if (!paymentDetails.transferenceReference.trim()) {
          newErrors.transferenceReference =
            "Referencia de transferencia requerida";
        } else if (paymentDetails.transferenceReference.length < 6) {
          newErrors.transferenceReference =
            "Referencia debe tener al menos 6 caracteres";
        }
        break;

      case "pago-movil":
        if (!paymentDetails.pagoMovilPhone.trim()) {
          newErrors.pagoMovilPhone = "Teléfono requerido";
        } else if (
          !/^(0414|0424|0412|0416|0426)\d{7}$/.test(
            paymentDetails.pagoMovilPhone.replace(/[-\s]/g, "")
          )
        ) {
          newErrors.pagoMovilPhone = "Formato de teléfono inválido";
        }
        if (!paymentDetails.pagoMovilReference.trim()) {
          newErrors.pagoMovilReference = "Referencia requerida";
        } else if (paymentDetails.pagoMovilReference.length < 6) {
          newErrors.pagoMovilReference =
            "Referencia debe tener al menos 6 caracteres";
        }
        break;

      case "crypto":
        if (!paymentDetails.cryptoWallet.trim()) {
          newErrors.cryptoWallet = "Dirección de wallet requerida";
        } else if (paymentDetails.cryptoWallet.length < 26) {
          newErrors.cryptoWallet = "Dirección de wallet inválida";
        }
        if (!paymentDetails.cryptoTxHash.trim()) {
          newErrors.cryptoTxHash = "Hash de transacción requerido";
        }
        break;

      case "zelle":
        if (!paymentDetails.zelleEmail.trim()) {
          newErrors.zelleEmail = "Email de Zelle requerido";
        } else if (!/\S+@\S+\.\S+/.test(paymentDetails.zelleEmail)) {
          newErrors.zelleEmail = "Email inválido";
        }
        if (!paymentDetails.zelleReference.trim()) {
          newErrors.zelleReference = "Referencia de Zelle requerida";
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [selectedPaymentMethod, paymentDetails]);

  const validateGuestInfo = useCallback(() => {
    const newErrors: { [key: string]: string } = {};

    if (!guestInfo.name.trim()) {
      newErrors.name = "El nombre es requerido";
    }
    if (!guestInfo.email.trim()) {
      newErrors.email = "El email es requerido";
    } else if (!/\S+@\S+\.\S+/.test(guestInfo.email)) {
      newErrors.email = "Email inválido";
    }
    if (!guestInfo.phone.trim()) {
      newErrors.phone = "El teléfono es requerido";
    }
    if (!guestInfo.document.trim()) {
      newErrors.document = "El documento es requerido";
    }
    if (!termsAccepted) {
      newErrors.terms = "Debes aceptar los términos y condiciones";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [guestInfo, termsAccepted]);

  // ✅ ACTUALIZAR handlePaymentComplete
  const handlePaymentComplete = useCallback(() => {
    if (paymentStep === "details" && validatePaymentDetails()) {
      setPaymentStep("guest");
    } else if (paymentStep === "guest" && validateGuestInfo()) {
      const newBookingId = generateBookingId();
      setBookingId(newBookingId);

      const bookingData: BookingData = {
        id: newBookingId,
        checkIn: checkIn ? format(checkIn, "yyyy-MM-dd") : "",
        checkOut: checkOut ? format(checkOut, "yyyy-MM-dd") : "",
        guests: parseInt(guests),
        nights: bookingCalculations.nights,
        pricePerNight,
        subtotal: bookingCalculations.subtotal,
        taxes: bookingCalculations.taxes,
        serviceFee: 0,
        cleaningFee: 0,
        total: bookingCalculations.total,
        bookingDate: new Date().toISOString(),
        status: "confirmed",
        paymentMethod: selectedPaymentMethod,
        paymentDetails,
        guestInfo,
      };

      onBooking(bookingData);
      setPaymentStep("success");
    }
  }, [
    paymentStep,
    validatePaymentDetails,
    validateGuestInfo,
    generateBookingId,
    checkIn,
    checkOut,
    guests,
    bookingCalculations,
    pricePerNight,
    selectedPaymentMethod,
    paymentDetails,
    guestInfo,
    onBooking,
  ]);


  const resetBooking = useCallback(() => {
    setCheckIn(undefined);
    setCheckOut(undefined);
    setGuests("2");
    setGuestInfo({ name: "", email: "", phone: "", document: "", notes: "" });
    setPaymentDetails({
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardName: "",
      transferenceReference: "",
      pagoMovilPhone: "",
      pagoMovilReference: "",
      cryptoWallet: "",
      cryptoTxHash: "",
      zelleEmail: "",
      zelleReference: "",
    });
    setShowPaymentModal(false);
    setPaymentStep("method");
    setSelectedPaymentMethod("");
    setErrors({});
    setDateErrors({});
    setBookingId("");
    setTermsAccepted(false);
    setIsValidBooking(false);
  }, []);

  const closePaymentModal = useCallback(() => {
    if (paymentStep === "success") {
      resetBooking();
    } else {
      setShowPaymentModal(false);
      setPaymentStep("method");
      setSelectedPaymentMethod("");
      setErrors({});
    }
  }, [paymentStep, resetBooking]);

  const handleMobileBookingClick = useCallback(() => {
    const modal = document.getElementById("mobile-booking-modal");
    if (modal) modal.classList.remove("hidden");
  }, []);

  const closeMobileModal = useCallback(() => {
    const modal = document.getElementById("mobile-booking-modal");
    if (modal) modal.classList.add("hidden");
  }, []);

  // ✅ RENDERIZAR LEYENDA LATERAL DEL CALENDARIO CON PRÓXIMAS RESERVAS ABAJO
  const renderCalendarLegend = useCallback(
    () => (
      <div className="ml-4 flex-shrink-0 w-48">
        <div className="p-4 bg-gray-50 rounded-lg border">
          {/* LEYENDA PRIMERO */}
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Leyenda:</h4>
          <div className="space-y-3 mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 bg-red-500 rounded-md flex-shrink-0"></div>
              <span className="text-sm text-gray-700">Reservado</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 bg-yellow-400 rounded-md flex-shrink-0"></div>
              <span className="text-sm text-gray-700">Pendiente</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 bg-blue-400 rounded-md flex-shrink-0"></div>
              <span className="text-sm text-gray-700">Check-out</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 bg-green-500 rounded-md flex-shrink-0"></div>
              <span className="text-sm text-gray-700">Seleccionado</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 bg-green-100 border border-green-300 rounded-md flex-shrink-0"></div>
              <span className="text-sm text-gray-700">Rango</span>
            </div>
          </div>

          {/* PRÓXIMAS RESERVAS ABAJO */}
          {(() => {
            const upcomingReservations = reservedPeriods
              .filter((period) => new Date(period.end) >= today)
              .sort(
                (a, b) =>
                  new Date(a.start).getTime() - new Date(b.start).getTime()
              )
              .slice(0, 3);

            if (upcomingReservations.length === 0) return null;

            return (
              <div className="border-t border-gray-200 pt-4">
                <h5 className="text-sm font-semibold text-gray-700 mb-3">
                  Próximas Reservas:
                </h5>
                <div className="space-y-3 max-h-32 overflow-y-auto">
                  {upcomingReservations.map((reservation, index) => (
                    <div
                      key={index}
                      className="text-xs p-2 bg-white rounded border border-gray-200"
                    >
                      <div className="font-medium text-gray-800 mb-1">
                        {format(new Date(reservation.start), "dd/MM", {
                          locale: es,
                        })}{" "}
                        -{" "}
                        {format(new Date(reservation.end), "dd/MM", {
                          locale: es,
                        })}
                      </div>
                      {reservation.guestName && (
                        <div className="text-gray-600 truncate mb-1">
                          {reservation.guestName}
                        </div>
                      )}
                      <Badge
                        variant="secondary"
                        className={`text-xs ${
                          reservation.status === "confirmed"
                            ? "bg-red-100 text-red-700"
                            : reservation.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {reservation.status === "confirmed"
                          ? "Confirmado"
                          : reservation.status === "pending"
                          ? "Pendiente"
                          : "Check-out"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    ),
    [reservedPeriods]
  );

  // ✅ OBTENER MODIFICADORES DEL CALENDARIO
  const { modifiers, modifiersClassNames } = getDateModifiers();

  // ✅ DEBUG LOG
  useEffect(() => {
    console.log("Debug booking:", {
      checkIn: checkIn ? format(checkIn, "yyyy-MM-dd") : null,
      checkOut: checkOut ? format(checkOut, "yyyy-MM-dd") : null,
      nights: bookingCalculations.nights,
      isValidDates: bookingCalculations.isValidDates,
      dateErrors,
      isValidBooking,
    });
  }, [checkIn, checkOut, bookingCalculations, dateErrors, isValidBooking]);

  return (
    <>
      {/* Widget sticky para desktop */}
      <Card className="hidden lg:block shadow-2xl sticky top-28 border-t-4 border-red-600 bg-white/95 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex justify-between items-baseline mb-4">
            <span className="text-4xl font-bold text-red-600">
              ${pricePerNight}
            </span>
            <span className="text-lg text-gray-600">/ noche</span>
          </div>
          <p className="text-gray-600 text-sm mb-6">
            Precio promedio por noche, impuestos y tasas no incluidos.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* ✅ CALENDARIO DE CHECK-IN CON LEYENDA LATERAL */}
            <div>
              <Label>Fecha de Check-in</Label>
              <Popover
                open={showCheckInCalendar}
                onOpenChange={setShowCheckInCalendar}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !checkIn && "text-muted-foreground",
                      dateErrors.checkIn && "border-red-500"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {checkIn ? formatDateShort(checkIn) : "Seleccionar fecha"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <div className="flex">
                    <Calendar
                      mode="single"
                      selected={checkIn}
                      onSelect={handleCheckInSelect}
                      disabled={isDateDisabled}
                      modifiers={modifiers}
                      modifiersClassNames={modifiersClassNames}
                      initialFocus
                      locale={es}
                      className="flex-shrink-0"
                    />
                    {renderCalendarLegend()}
                  </div>
                </PopoverContent>
              </Popover>
              {dateErrors.checkIn && (
                <div className="mt-1 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-600 flex items-start space-x-2">
                  <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>{dateErrors.checkIn}</span>
                </div>
              )}
            </div>

            {/* ✅ CALENDARIO DE CHECK-OUT CON LEYENDA LATERAL */}
            <div>
              <Label>Fecha de Check-out</Label>
              <Popover
                open={showCheckOutCalendar}
                onOpenChange={setShowCheckOutCalendar}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !checkOut && "text-muted-foreground",
                      dateErrors.checkOut && "border-red-500"
                    )}
                    disabled={!checkIn}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {checkOut ? formatDateShort(checkOut) : "Seleccionar fecha"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <div className="flex">
                    <Calendar
                      mode="single"
                      selected={checkOut}
                      onSelect={handleCheckOutSelect}
                      disabled={(date: Date) => {
                        if (!checkIn) return true;
                        if (date <= checkIn) return true;
                        return isDateDisabled(date);
                      }}
                      modifiers={modifiers}
                      modifiersClassNames={modifiersClassNames}
                      initialFocus
                      locale={es}
                      className="flex-shrink-0"
                    />
                    {renderCalendarLegend()}
                  </div>
                </PopoverContent>
              </Popover>
              {dateErrors.checkOut && (
                <div className="mt-1 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-600 flex items-start space-x-2">
                  <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>{dateErrors.checkOut}</span>
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="num-guests">Número de Huéspedes</Label>
              <Select value={guests} onValueChange={setGuests}>
                <SelectTrigger className="bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: maxGuests }, (_, i) => i + 1).map(
                    (num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? "Huésped" : "Huéspedes"}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </div>

            {isValidBooking && (
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between text-gray-700 mb-2">
                  <span>
                    {bookingCalculations.nights}{" "}
                    {bookingCalculations.nights === 1 ? "Noche" : "Noches"} x $
                    {pricePerNight}
                  </span>
                  <span>${bookingCalculations.subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-700 mb-2">
                  <span>Impuestos y Tasas</span>
                  <span>${bookingCalculations.taxes}</span>
                </div>
                <div className="flex justify-between font-bold text-xl text-gray-900 border-t pt-3 mt-3">
                  <span>Total</span>
                  <span>${bookingCalculations.total}</span>
                </div>
              </div>
            )}

            <Button
              type="submit"
              disabled={!isValidBooking}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-6 text-lg shadow-lg"
            >
              {isValidBooking
                ? "Reservar Ahora"
                : Object.keys(dateErrors).length > 0
                ? "Fechas no disponibles"
                : bookingCalculations.nights > 0 &&
                  bookingCalculations.nights < minNights
                ? `Mínimo ${minNights} ${minNights === 1 ? "noche" : "noches"}`
                : bookingCalculations.nights > maxNights
                ? `Máximo ${maxNights} noches`
                : "Selecciona las fechas"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Barra fija para móvil */}
      <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-white border-t shadow-2xl z-40 p-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-red-600">
              ${pricePerNight}
            </span>
            <span className="text-gray-600 ml-1">/ noche</span>
          </div>
          <Button
            onClick={handleMobileBookingClick}
            className="bg-red-600 hover:bg-red-700 text-white px-6"
          >
            Reservar
          </Button>
        </div>
      </div>

      {/* Modal de reserva para móvil */}
      <div
        id="mobile-booking-modal"
        className="hidden fixed inset-0 z-50 lg:hidden"
      >
        <div
          className="absolute inset-0 bg-black/60"
          onClick={closeMobileModal}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-xl p-6 max-h-[80vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Detalles de Reserva</h3>
            <button
              onClick={closeMobileModal}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>

          <form
            onSubmit={(e) => {
              handleSubmit(e);
              if (isValidBooking) {
                closeMobileModal();
              }
            }}
            className="space-y-4"
          >
            {/* ✅ CALENDARIO MÓVIL CHECK-IN CON LEYENDA Y PRÓXIMAS RESERVAS ABAJO */}
            <div>
              <Label>Fecha de Check-in</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !checkIn && "text-muted-foreground",
                      dateErrors.checkIn && "border-red-500"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {checkIn ? formatDateShort(checkIn) : "Seleccionar fecha"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <div className="flex flex-col">
                    <Calendar
                      mode="single"
                      selected={checkIn}
                      onSelect={handleCheckInSelect}
                      disabled={isDateDisabled}
                      modifiers={modifiers}
                      modifiersClassNames={modifiersClassNames}
                      initialFocus
                      locale={es}
                    />
                    {/* LEYENDA PRIMERO EN MÓVIL */}
                    <div className="p-3 bg-gray-50 border-t">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">
                        Leyenda:
                      </h4>
                      <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-red-500 rounded"></div>
                          <span>Reservado</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-yellow-400 rounded"></div>
                          <span>Pendiente</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-blue-400 rounded"></div>
                          <span>Check-out</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-green-500 rounded"></div>
                          <span>Seleccionado</span>
                        </div>
                      </div>

                      {/* PRÓXIMAS RESERVAS ABAJO EN MÓVIL */}
                      {(() => {
                        const upcomingReservations = reservedPeriods
                          .filter((period) => new Date(period.end) >= today)
                          .sort(
                            (a, b) =>
                              new Date(a.start).getTime() -
                              new Date(b.start).getTime()
                          )
                          .slice(0, 2);

                        if (upcomingReservations.length === 0) return null;

                        return (
                          <div className="border-t border-gray-200 pt-3">
                            <h5 className="text-sm font-semibold text-gray-700 mb-2">
                              Próximas Reservas:
                            </h5>
                            <div className="space-y-2 max-h-24 overflow-y-auto">
                              {upcomingReservations.map(
                                (reservation, index) => (
                                  <div
                                    key={index}
                                    className="text-xs p-2 bg-white rounded border border-gray-200"
                                  >
                                    <div className="font-medium text-gray-800">
                                      {format(
                                        new Date(reservation.start),
                                        "dd/MM",
                                        { locale: es }
                                      )}{" "}
                                      -{" "}
                                      {format(
                                        new Date(reservation.end),
                                        "dd/MM",
                                        { locale: es }
                                      )}
                                    </div>
                                    {reservation.guestName && (
                                      <div className="text-gray-500 truncate">
                                        {reservation.guestName}
                                      </div>
                                    )}
                                    <div className="flex items-center space-x-1 mt-1">
                                      <div
                                        className={`w-2 h-2 rounded-full ${
                                          reservation.status === "confirmed"
                                            ? "bg-red-500"
                                            : reservation.status === "pending"
                                            ? "bg-yellow-400"
                                            : "bg-blue-400"
                                        }`}
                                      ></div>
                                      <span className="text-gray-400 capitalize">
                                        {reservation.status === "confirmed"
                                          ? "Confirmada"
                                          : reservation.status === "pending"
                                          ? "Pendiente"
                                          : "Check-out"}
                                      </span>
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              {dateErrors.checkIn && (
                <div className="mt-1 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-600 flex items-start space-x-2">
                  <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>{dateErrors.checkIn}</span>
                </div>
              )}
            </div>

            {/* ✅ CALENDARIO MÓVIL CHECK-OUT CON LEYENDA Y PRÓXIMAS RESERVAS ABAJO */}
            <div>
              <Label>Fecha de Check-out</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !checkOut && "text-muted-foreground",
                      dateErrors.checkOut && "border-red-500"
                    )}
                    disabled={!checkIn}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {checkOut ? formatDateShort(checkOut) : "Seleccionar fecha"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <div className="flex flex-col">
                    <Calendar
                      mode="single"
                      selected={checkOut}
                      onSelect={handleCheckOutSelect}
                      disabled={(date) => {
                        if (!checkIn) return true;
                        if (date <= checkIn) return true;
                        return isDateDisabled(date);
                      }}
                      modifiers={modifiers}
                      modifiersClassNames={modifiersClassNames}
                      initialFocus
                      locale={es}
                    />
                    {/* LEYENDA PRIMERO EN MÓVIL */}
                    <div className="p-3 bg-gray-50 border-t">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">
                        Leyenda:
                      </h4>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-red-500 rounded"></div>
                          <span>Reservado</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-yellow-400 rounded"></div>
                          <span>Pendiente</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-blue-400 rounded"></div>
                          <span>Check-out</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-green-500 rounded"></div>
                          <span>Seleccionado</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              {dateErrors.checkOut && (
                <div className="mt-1 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-600 flex items-start space-x-2">
                  <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>{dateErrors.checkOut}</span>
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="mobile-guests">Número de Huéspedes</Label>
              <Select value={guests} onValueChange={setGuests}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: maxGuests }, (_, i) => i + 1).map(
                    (num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? "Huésped" : "Huéspedes"}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </div>

            {isValidBooking && (
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between text-gray-700 mb-2">
                  <span>
                    {bookingCalculations.nights}{" "}
                    {bookingCalculations.nights === 1 ? "Noche" : "Noches"} x $
                    {pricePerNight}
                  </span>
                  <span>${bookingCalculations.subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-700 mb-2">
                  <span>Impuestos y Tasas</span>
                  <span>${bookingCalculations.taxes}</span>
                </div>
                <div className="flex justify-between font-bold text-xl text-gray-900 border-t pt-3 mt-3">
                  <span>
                    Total ({bookingCalculations.nights}{" "}
                    {bookingCalculations.nights === 1 ? "noche" : "noches"})
                  </span>
                  <span>${bookingCalculations.total}</span>
                </div>
              </div>
            )}

            <Button
              type="submit"
              disabled={!isValidBooking}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-4"
            >
              {isValidBooking
                ? "Continuar al Pago"
                : Object.keys(dateErrors).length > 0
                ? "Fechas no disponibles"
                : "Selecciona las fechas"}
            </Button>
          </form>
        </div>
      </div>

      {/* ✅ MODAL DE PAGO CON TODOS LOS FORMULARIOS IMPLEMENTADOS */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {paymentStep !== "method" && paymentStep !== "success" && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      if (paymentStep === "details") setPaymentStep("method");
                      else if (paymentStep === "guest") {
                        setPaymentStep(
                          selectedPaymentMethod === "efectivo"
                            ? "method"
                            : "details"
                        );
                      }
                    }}
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                )}
                <h2 className="text-2xl font-bold">
                  {paymentStep === "method" && "Método de Pago"}
                  {paymentStep === "details" && "Detalles del Pago"}
                  {paymentStep === "guest" && "Información del Huésped"}
                  {paymentStep === "success" && "¡Reserva Confirmada!"}
                </h2>
              </div>
              <Button variant="ghost" size="sm" onClick={closePaymentModal}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="p-6">
              {/* Resumen de la reserva */}
              {paymentStep !== "success" && (
                <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-4 mb-6 border border-red-100">
                  <h3 className="font-semibold text-red-800 mb-3">
                    Resumen de tu Reserva
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <CalendarIcon className="h-4 w-4 text-red-600" />
                        <span className="text-gray-600">Check-in</span>
                      </div>
                      <p className="font-medium">{formatDate(checkIn)}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <CalendarIcon className="h-4 w-4 text-red-600" />
                        <span className="text-gray-600">Check-out</span>
                      </div>
                      <p className="font-medium">{formatDate(checkOut)}</p>
                    </div>
                  </div>
                  <Separator className="my-3" />
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-red-600" />
                      <span className="text-sm text-gray-600">
                        {guests} huéspedes • {bookingCalculations.nights}{" "}
                        {bookingCalculations.nights === 1 ? "noche" : "noches"}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-red-600">
                        ${bookingCalculations.total}
                      </p>
                      <p className="text-xs text-gray-500">Total</p>
                    </div>
                  </div>
                </div>
              )}

              {/* ✅ PASO 1: SELECCIÓN DE MÉTODO DE PAGO */}
              {paymentStep === "method" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold mb-4">
                    Selecciona tu método de pago
                  </h3>
                  <div className="grid gap-4">
                    {paymentMethods.map((method) => (
                      <button
                        key={method.id}
                        onClick={() => handlePaymentMethodSelect(method.id)}
                        disabled={!method.available}
                        className={`p-4 border-2 rounded-xl text-left transition-all hover:shadow-md ${
                          selectedPaymentMethod === method.id
                            ? "border-red-500 bg-red-50"
                            : method.available
                            ? "border-gray-200 hover:border-gray-300"
                            : "border-gray-100 bg-gray-50 cursor-not-allowed"
                        }`}
                      >
                        <div className="flex items-center space-x-4">
                          <div
                            className={`${method.color} text-white rounded-full p-3 flex-shrink-0`}
                          >
                            {method.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <h4 className="font-semibold text-gray-900">
                                {method.name}
                              </h4>
                              {method.id === "efectivo" && (
                                <Badge
                                  variant="secondary"
                                  className="bg-green-100 text-green-700"
                                >
                                  Recomendado
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              {method.description}
                            </p>
                          </div>
                          {selectedPaymentMethod === method.id && (
                            <CheckCircle className="h-6 w-6 text-red-500 flex-shrink-0" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* ✅ PASO 2: DETALLES DEL PAGO - TODOS LOS FORMULARIOS */}
              {paymentStep === "details" && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div
                      className={`${
                        paymentMethods.find(
                          (m) => m.id === selectedPaymentMethod
                        )?.color
                      } text-white rounded-full p-3`}
                    >
                      {
                        paymentMethods.find(
                          (m) => m.id === selectedPaymentMethod
                        )?.icon
                      }
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">
                        {
                          paymentMethods.find(
                            (m) => m.id === selectedPaymentMethod
                          )?.name
                        }
                      </h3>
                      <p className="text-sm text-gray-600">
                        Completa los detalles de tu pago
                      </p>
                    </div>
                  </div>

                  {/* 💳 FORMULARIO DE TARJETA DE CRÉDITO */}
                  {selectedPaymentMethod === "tarjeta" && (
                    <div className="space-y-4">
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <div className="flex items-center space-x-2 mb-2">
                          <Shield className="h-5 w-5 text-blue-600" />
                          <span className="text-sm font-medium text-blue-800">
                            Pago Seguro SSL
                          </span>
                        </div>
                        <p className="text-xs text-blue-700">
                          Tus datos están protegidos con encriptación de 256
                          bits
                        </p>
                      </div>

                      <div>
                        <Label htmlFor="cardNumber">Número de Tarjeta *</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={paymentDetails.cardNumber}
                          onChange={(e) => {
                            // Formatear número de tarjeta con espacios
                            let value = e.target.value
                              .replace(/\s/g, "")
                              .replace(/\D/g, "");
                            value = value.replace(/(\d{4})(?=\d)/g, "$1 ");
                            if (value.length <= 19) {
                              // 16 dígitos + 3 espacios
                              setPaymentDetails((prev) => ({
                                ...prev,
                                cardNumber: value,
                              }));
                            }
                          }}
                          className={errors.cardNumber ? "border-red-500" : ""}
                          maxLength={19}
                        />
                        {errors.cardNumber && (
                          <p className="text-sm text-red-500 mt-1">
                            {errors.cardNumber}
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiryDate">
                            Fecha de Vencimiento *
                          </Label>
                          <Input
                            id="expiryDate"
                            placeholder="MM/AA"
                            value={paymentDetails.expiryDate}
                            onChange={(e) => {
                              let value = e.target.value.replace(/\D/g, "");
                              if (value.length >= 2) {
                                value =
                                  value.substring(0, 2) +
                                  "/" +
                                  value.substring(2, 4);
                              }
                              if (value.length <= 5) {
                                setPaymentDetails((prev) => ({
                                  ...prev,
                                  expiryDate: value,
                                }));
                              }
                            }}
                            className={
                              errors.expiryDate ? "border-red-500" : ""
                            }
                            maxLength={5}
                          />
                          {errors.expiryDate && (
                            <p className="text-sm text-red-500 mt-1">
                              {errors.expiryDate}
                            </p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="cvv">CVV *</Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            type="password"
                            value={paymentDetails.cvv}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, "");
                              if (value.length <= 4) {
                                setPaymentDetails((prev) => ({
                                  ...prev,
                                  cvv: value,
                                }));
                              }
                            }}
                            className={errors.cvv ? "border-red-500" : ""}
                            maxLength={4}
                          />
                          {errors.cvv && (
                            <p className="text-sm text-red-500 mt-1">
                              {errors.cvv}
                            </p>
                          )}
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="cardName">Nombre en la Tarjeta *</Label>
                        <Input
                          id="cardName"
                          placeholder="JUAN CARLOS PEREZ"
                          value={paymentDetails.cardName}
                          onChange={(e) =>
                            setPaymentDetails((prev) => ({
                              ...prev,
                              cardName: e.target.value.toUpperCase(),
                            }))
                          }
                          className={errors.cardName ? "border-red-500" : ""}
                        />
                        {errors.cardName && (
                          <p className="text-sm text-red-500 mt-1">
                            {errors.cardName}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* 🏦 FORMULARIO DE TRANSFERENCIA BANCARIA */}
                  {selectedPaymentMethod === "transferencia" && (
                    <div className="space-y-4">
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <h4 className="font-semibold text-blue-800 mb-2">
                          Datos Bancarios para Transferencia
                        </h4>
                        <div className="space-y-2 text-sm text-blue-700">
                          <div className="flex justify-between">
                            <span className="font-medium">Banco:</span>
                            <span>Banco de Venezuela</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium">Cuenta:</span>
                            <span>0102-0123-45-1234567890</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium">Titular:</span>
                            <span>Hotel Paradise C.A.</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium">RIF:</span>
                            <span>J-12345678-9</span>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="mt-3 w-full"
                          onClick={() => {
                            copyToClipboard("0102-0123-45-1234567890");
                            alert("Número de cuenta copiado al portapapeles");
                          }}
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          Copiar Número de Cuenta
                        </Button>
                      </div>

                      <div>
                        <Label htmlFor="transferenceReference">
                          Número de Referencia *
                        </Label>
                        <Input
                          id="transferenceReference"
                          placeholder="Ej: 123456789"
                          value={paymentDetails.transferenceReference}
                          onChange={(e) =>
                            setPaymentDetails((prev) => ({
                              ...prev,
                              transferenceReference: e.target.value,
                            }))
                          }
                          className={
                            errors.transferenceReference ? "border-red-500" : ""
                          }
                        />
                        {errors.transferenceReference && (
                          <p className="text-sm text-red-500 mt-1">
                            {errors.transferenceReference}
                          </p>
                        )}
                        <p className="text-xs text-gray-500 mt-1">
                          Número de referencia que aparece en tu comprobante
                        </p>
                      </div>
                    </div>
                  )}

                  {/* 📱 FORMULARIO DE PAGO MÓVIL */}
                  {selectedPaymentMethod === "pago-movil" && (
                    <div className="space-y-4">
                      <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                        <h4 className="font-semibold text-purple-800 mb-2">
                          Datos para Pago Móvil
                        </h4>
                        <div className="space-y-2 text-sm text-purple-700">
                          <div className="flex justify-between">
                            <span className="font-medium">Banco:</span>
                            <span>0102 - Banco de Venezuela</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium">Teléfono:</span>
                            <span>0414-123-4567</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium">Cédula:</span>
                            <span>V-12345678</span>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="mt-3 w-full"
                          onClick={() => {
                            copyToClipboard("04141234567");
                            alert("Teléfono copiado al portapapeles");
                          }}
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          Copiar Teléfono
                        </Button>
                      </div>

                      <div>
                        <Label htmlFor="pagoMovilPhone">Tu Teléfono *</Label>
                        <Input
                          id="pagoMovilPhone"
                          placeholder="0414-123-4567"
                          value={paymentDetails.pagoMovilPhone}
                          onChange={(e) => {
                            let value = e.target.value.replace(/\D/g, "");
                            if (value.length <= 11) {
                              if (value.length >= 4) {
                                value =
                                  value.substring(0, 4) +
                                  "-" +
                                  value.substring(4, 7) +
                                  "-" +
                                  value.substring(7, 11);
                              }
                              setPaymentDetails((prev) => ({
                                ...prev,
                                pagoMovilPhone: value,
                              }));
                            }
                          }}
                          className={
                            errors.pagoMovilPhone ? "border-red-500" : ""
                          }
                        />
                        {errors.pagoMovilPhone && (
                          <p className="text-sm text-red-500 mt-1">
                            {errors.pagoMovilPhone}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="pagoMovilReference">
                          Número de Referencia *
                        </Label>
                        <Input
                          id="pagoMovilReference"
                          placeholder="Ej: 123456789"
                          value={paymentDetails.pagoMovilReference}
                          onChange={(e) =>
                            setPaymentDetails((prev) => ({
                              ...prev,
                              pagoMovilReference: e.target.value,
                            }))
                          }
                          className={
                            errors.pagoMovilReference ? "border-red-500" : ""
                          }
                        />
                        {errors.pagoMovilReference && (
                          <p className="text-sm text-red-500 mt-1">
                            {errors.pagoMovilReference}
                          </p>
                        )}
                        <p className="text-xs text-gray-500 mt-1">
                          Número de referencia del pago móvil
                        </p>
                      </div>
                    </div>
                  )}

                  {/* 🪙 FORMULARIO DE CRIPTOMONEDAS */}
                  {selectedPaymentMethod === "crypto" && (
                    <div className="space-y-4">
                      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                        <h4 className="font-semibold text-yellow-800 mb-2">
                          Direcciones de Wallets
                        </h4>
                        <div className="space-y-3 text-sm text-yellow-700">
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-medium">
                                Bitcoin (BTC):
                              </span>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  copyToClipboard(
                                    "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
                                  );
                                  alert("Dirección Bitcoin copiada");
                                }}
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            </div>
                            <p className="text-xs bg-white p-2 rounded border break-all">
                              1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa
                            </p>
                          </div>

                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-medium">USDT (TRC20):</span>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  copyToClipboard(
                                    "TQn9Y2khEsLJW1ChVWFMSMeRDow5KcbLSE"
                                  );
                                  alert("Dirección USDT copiada");
                                }}
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            </div>
                            <p className="text-xs bg-white p-2 rounded border break-all">
                              TQn9Y2khEsLJW1ChVWFMSMeRDow5KcbLSE
                            </p>
                          </div>

                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-medium">
                                Ethereum (ETH):
                              </span>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  copyToClipboard(
                                    "0x742d35Cc6634C0532925a3b8D4020a2fDf0e9f"
                                  );
                                  alert("Dirección Ethereum copiada");
                                }}
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            </div>
                            <p className="text-xs bg-white p-2 rounded border break-all">
                              0x742d35Cc6634C0532925a3b8D4020a2fDf0e9f
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="cryptoWallet">
                          Tu Dirección de Wallet *
                        </Label>
                        <Input
                          id="cryptoWallet"
                          placeholder="Dirección de tu wallet desde donde enviaste"
                          value={paymentDetails.cryptoWallet}
                          onChange={(e) =>
                            setPaymentDetails((prev) => ({
                              ...prev,
                              cryptoWallet: e.target.value,
                            }))
                          }
                          className={
                            errors.cryptoWallet ? "border-red-500" : ""
                          }
                        />
                        {errors.cryptoWallet && (
                          <p className="text-sm text-red-500 mt-1">
                            {errors.cryptoWallet}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="cryptoTxHash">
                          Hash de Transacción *
                        </Label>
                        <Input
                          id="cryptoTxHash"
                          placeholder="Hash de la transacción enviada"
                          value={paymentDetails.cryptoTxHash}
                          onChange={(e) =>
                            setPaymentDetails((prev) => ({
                              ...prev,
                              cryptoTxHash: e.target.value,
                            }))
                          }
                          className={
                            errors.cryptoTxHash ? "border-red-500" : ""
                          }
                        />
                        {errors.cryptoTxHash && (
                          <p className="text-sm text-red-500 mt-1">
                            {errors.cryptoTxHash}
                          </p>
                        )}
                        <p className="text-xs text-gray-500 mt-1">
                          ID de transacción que aparece en tu wallet
                        </p>
                      </div>
                    </div>
                  )}

                  {/* 💸 FORMULARIO DE ZELLE */}
                  {selectedPaymentMethod === "zelle" && (
                    <div className="space-y-4">
                      <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                        <h4 className="font-semibold text-indigo-800 mb-2">
                          Datos para Zelle
                        </h4>
                        <div className="space-y-2 text-sm text-indigo-700">
                          <div className="flex justify-between">
                            <span className="font-medium">Email:</span>
                            <span>pagos@hotelparadise.com</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium">Nombre:</span>
                            <span>Hotel Paradise LLC</span>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="mt-3 w-full"
                          onClick={() => {
                            copyToClipboard("pagos@hotelparadise.com");
                            alert("Email de Zelle copiado al portapapeles");
                          }}
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          Copiar Email
                        </Button>
                      </div>

                      <div>
                        <Label htmlFor="zelleEmail">Tu Email de Zelle *</Label>
                        <Input
                          id="zelleEmail"
                          type="email"
                          placeholder="tu-email@ejemplo.com"
                          value={paymentDetails.zelleEmail}
                          onChange={(e) =>
                            setPaymentDetails((prev) => ({
                              ...prev,
                              zelleEmail: e.target.value,
                            }))
                          }
                          className={errors.zelleEmail ? "border-red-500" : ""}
                        />
                        {errors.zelleEmail && (
                          <p className="text-sm text-red-500 mt-1">
                            {errors.zelleEmail}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="zelleReference">
                          Número de Confirmación *
                        </Label>
                        <Input
                          id="zelleReference"
                          placeholder="Número de confirmación de Zelle"
                          value={paymentDetails.zelleReference}
                          onChange={(e) =>
                            setPaymentDetails((prev) => ({
                              ...prev,
                              zelleReference: e.target.value,
                            }))
                          }
                          className={
                            errors.zelleReference ? "border-red-500" : ""
                          }
                        />
                        {errors.zelleReference && (
                          <p className="text-sm text-red-500 mt-1">
                            {errors.zelleReference}
                          </p>
                        )}
                        <p className="text-xs text-gray-500 mt-1">
                          Número que aparece en tu confirmación de Zelle
                        </p>
                      </div>
                    </div>
                  )}

                  <Button
                    onClick={handlePaymentComplete}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-3"
                  >
                    Continuar
                  </Button>
                </div>
              )}

              {/* ✅ PASO 3: INFORMACIÓN DEL HUÉSPED */}
              {paymentStep === "guest" && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-red-100 text-red-600 rounded-full p-3">
                      <Users className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">
                        Información del Huésped Principal
                      </h3>
                      <p className="text-sm text-gray-600">
                        Datos necesarios para la reserva
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="guestName">Nombre Completo *</Label>
                      <Input
                        id="guestName"
                        placeholder="Ej: Juan Carlos Pérez"
                        value={guestInfo.name}
                        onChange={(e) =>
                          setGuestInfo((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        className={errors.name ? "border-red-500" : ""}
                      />
                      {errors.name && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="guestEmail">Correo Electrónico *</Label>
                      <Input
                        id="guestEmail"
                        type="email"
                        placeholder="ejemplo@correo.com"
                        value={guestInfo.email}
                        onChange={(e) =>
                          setGuestInfo((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        className={errors.email ? "border-red-500" : ""}
                      />
                      {errors.email && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="guestPhone">Número de Teléfono *</Label>
                      <Input
                        id="guestPhone"
                        placeholder="Ej: +58 414-123-4567"
                        value={guestInfo.phone}
                        onChange={(e) =>
                          setGuestInfo((prev) => ({
                            ...prev,
                            phone: e.target.value,
                          }))
                        }
                        className={errors.phone ? "border-red-500" : ""}
                      />
                      {errors.phone && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="guestDocument">
                        Documento de Identidad *
                      </Label>
                      <Input
                        id="guestDocument"
                        placeholder="Ej: V-12345678 o E-12345678"
                        value={guestInfo.document}
                        onChange={(e) =>
                          setGuestInfo((prev) => ({
                            ...prev,
                            document: e.target.value,
                          }))
                        }
                        className={errors.document ? "border-red-500" : ""}
                      />
                      {errors.document && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.document}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="guestNotes">
                        Notas Adicionales (Opcional)
                      </Label>
                      <Input
                        id="guestNotes"
                        placeholder="Solicitudes especiales, alergias, etc."
                        value={guestInfo.notes}
                        onChange={(e) =>
                          setGuestInfo((prev) => ({
                            ...prev,
                            notes: e.target.value,
                          }))
                        }
                      />
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg border">
                      <div className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          id="termsAccepted"
                          checked={termsAccepted}
                          onChange={(e) => setTermsAccepted(e.target.checked)}
                          className="mt-1"
                        />
                        <label
                          htmlFor="termsAccepted"
                          className="text-sm text-gray-700 flex-1"
                        >
                          Acepto los{" "}
                          <span className="text-red-600 underline cursor-pointer">
                            términos y condiciones
                          </span>{" "}
                          del hotel, así como las{" "}
                          <span className="text-red-600 underline cursor-pointer">
                            políticas de cancelación
                          </span>
                          .
                        </label>
                      </div>
                      {errors.terms && (
                        <p className="text-sm text-red-500 mt-2 ml-6">
                          {errors.terms}
                        </p>
                      )}
                    </div>
                  </div>

                  <Button
                    onClick={handlePaymentComplete}
                    disabled={!termsAccepted}
                    className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3"
                  >
                    Confirmar Reserva
                  </Button>
                </div>
              )}

              {/* ✅ PASO 4: CONFIRMACIÓN DE RESERVA */}
              {paymentStep === "success" && (
                <div className="text-center space-y-6">
                  <div className="flex justify-center">
                    <div className="bg-green-100 rounded-full p-6">
                      <CheckCircle className="h-16 w-16 text-green-600" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-green-800 mb-2">
                      ¡Reserva Confirmada!
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Tu reserva ha sido procesada exitosamente
                    </p>
                    <div className="bg-gray-50 rounded-lg p-4 text-left">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Detalles de la Reserva:
                      </h4>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>
                          <strong>ID de Reserva:</strong> {bookingId}
                        </p>
                        <p>
                          <strong>Check-in:</strong> {formatDate(checkIn)}
                        </p>
                        <p>
                          <strong>Check-out:</strong> {formatDate(checkOut)}
                        </p>
                        <p>
                          <strong>Huéspedes:</strong> {guests}
                        </p>
                        <p>
                          <strong>Total:</strong> ${bookingCalculations.total}
                        </p>
                        <p>
                          <strong>Método de Pago:</strong>{" "}
                          {
                            paymentMethods.find(
                              (m) => m.id === selectedPaymentMethod
                            )?.name
                          }
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={() => {
                        const bookingDetails = `
Reserva Confirmada - Hotel Paradise

ID de Reserva: ${bookingId}
Check-in: ${formatDate(checkIn)}
Check-out: ${formatDate(checkOut)}
Huéspedes: ${guests}
Noches: ${bookingCalculations.nights}
Total: $${bookingCalculations.total}
Método de Pago: ${
                          paymentMethods.find(
                            (m) => m.id === selectedPaymentMethod
                          )?.name
                        }

Huésped Principal:
Nombre: ${guestInfo.name}
Email: ${guestInfo.email}
Teléfono: ${guestInfo.phone}
                        `.trim();

                        if (navigator.share) {
                          navigator.share({
                            title: "Confirmación de Reserva",
                            text: bookingDetails,
                          });
                        } else {
                          copyToClipboard(bookingDetails);
                          alert("Detalles copiados al portapapeles");
                        }
                      }}
                      variant="outline"
                      className="flex-1"
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Compartir
                    </Button>

                    <Button
                      onClick={() => {
                        const element = document.createElement("a");
                        const bookingDetails = `
Reserva Confirmada - Hotel Paradise

ID de Reserva: ${bookingId}
Fecha de Reserva: ${format(new Date(), "dd/MM/yyyy HH:mm")}

DETALLES DE LA ESTADÍA:
Check-in: ${formatDate(checkIn)}
Check-out: ${formatDate(checkOut)}
Número de Huéspedes: ${guests}
Número de Noches: ${bookingCalculations.nights}

DESGLOSE DE PRECIOS:
Subtotal (${bookingCalculations.nights} noches × $${pricePerNight}): $${
                          bookingCalculations.subtotal
                        }
Impuestos y Tasas: $${bookingCalculations.taxes}
TOTAL: $${bookingCalculations.total}

MÉTODO DE PAGO:
${paymentMethods.find((m) => m.id === selectedPaymentMethod)?.name}

INFORMACIÓN DEL HUÉSPED:
Nombre: ${guestInfo.name}
Email: ${guestInfo.email}
Teléfono: ${guestInfo.phone}
Documento: ${guestInfo.document}

¡Gracias por elegir Hotel Paradise!
                        `.trim();

                        const file = new Blob([bookingDetails], {
                          type: "text/plain",
                        });
                        element.href = URL.createObjectURL(file);
                        element.download = `reserva-${bookingId}.txt`;
                        document.body.appendChild(element);
                        element.click();
                        document.body.removeChild(element);
                      }}
                      variant="outline"
                      className="flex-1"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Descargar
                    </Button>
                  </div>

                  <Button
                    onClick={closePaymentModal}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-3"
                  >
                    Cerrar
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BookingWidget;
