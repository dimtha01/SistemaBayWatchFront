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
  AlertCircle,
  X,
  Download,
  InfoIcon,
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
  // 🆕 NUEVO PARÁMETRO PARA EL ID DE LA HABITACIÓN
  roomId: string;
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

// 🆕 INTERFACES PARA LA API
interface ReservaAPI {
  fecha_entrada: string;
  fecha_salida: string;
  estado_reserva: string;
}

interface APIResponse {
  success: boolean;
  message: string;
  data: ReservaAPI[];
}

export const BookingWidget = ({
  pricePerNight,
  onBooking,
  maxGuests = 4,
  minNights = 1,
  maxNights = 30,
  unavailableDates = [],
  reservedPeriods = [],
  roomId, // 🆕 PARÁMETRO OBLIGATORIO
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
  const [dateErrors, setDateErrors] = useState<{ [key: string]: string }>({});
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isValidBooking, setIsValidBooking] = useState(false);

  // 🆕 ESTADOS PARA LA API
  const [apiReservedPeriods, setApiReservedPeriods] = useState<
    {
      start: string;
      end: string;
      reason?: string;
      guestName?: string;
      status?: "confirmed" | "pending" | "checkout";
    }[]
  >([]);
  const [isLoadingReservations, setIsLoadingReservations] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // AGREGAR ESTE useEffect DESPUÉS DE TODOS LOS useState
useEffect(() => {
  // Inyectar estilos CSS una sola vez
  if (!document.getElementById("calendar-custom-styles")) {
    const customStyles = `
      .calendar-reserved-confirmed {
        background-color: #ef4444 !important;
        color: white !important;
        font-weight: 600 !important;
        border-radius: 6px !important;
      }
      .calendar-reserved-pending {
        background-color: #f59e0b !important;
        color: #92400e !important;
        font-weight: 500 !important;
        border-radius: 6px !important;
      }
      .calendar-reserved-checkout {
        background-color: #3b82f6 !important;
        color: white !important;
        font-weight: 500 !important;
        border-radius: 6px !important;
      }
      .calendar-selected-checkin {
        background-color: #10b981 !important;
        color: white !important;
        font-weight: 700 !important;
        border-radius: 6px !important;
      }
      .calendar-selected-checkout {
        background-color: #059669 !important;
        color: white !important;
        font-weight: 700 !important;
        border-radius: 6px !important;
      }
      .calendar-selected-range {
        background-color: #d1fae5 !important;
        color: #065f46 !important;
        border-radius: 6px !important;
      }
    `;

    const styleElement = document.createElement("style");
    styleElement.id = "calendar-custom-styles";
    styleElement.textContent = customStyles;
    document.head.appendChild(styleElement);
  }
}, []); // ← DEPENDENCIAS VACÍAS - SOLO SE EJECUTA UNA VEZ
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

  // 🆕 FUNCIÓN PARA OBTENER RESERVAS DE LA API
  const fetchReservations = useCallback(async () => {
    if (!roomId) return;

    setIsLoadingReservations(true);
    setApiError(null);

    try {
      const response = await fetch(
        `http://localhost:3000/api/reservaHabitacion/${roomId}`
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const apiData: APIResponse = await response.json();

      if (apiData.success && apiData.data) {
        // 🔄 CONVERTIR DATOS DE LA API AL FORMATO ESPERADO
        const convertedPeriods = apiData.data.map((reserva) => {
          // Convertir estado de la API a nuestro formato
          let status: "confirmed" | "pending" | "checkout" = "confirmed";

          switch (reserva.estado_reserva.toLowerCase()) {
            case "confirmada":
            case "confirmed":
              status = "confirmed";
              break;
            case "pendiente":
            case "pending":
            case "en proceso":
              status = "pending";
              break;
            case "checkout":
            case "finalizada":
              status = "checkout";
              break;
            default:
              status = "confirmed";
          }

          return {
            start: reserva.fecha_entrada,
            end: reserva.fecha_salida,
            status,
            reason: `Reserva ${reserva.estado_reserva}`,
            guestName: undefined, // La API no proporciona nombre del huésped
          };
        });

        setApiReservedPeriods(convertedPeriods);
        console.log(
          `✅ Cargadas ${convertedPeriods.length} reservas para la habitación ${roomId}`
        );
      } else {
        console.log(
          `ℹ️ ${apiData.message || "No hay reservas para esta habitación"}`
        );
        setApiReservedPeriods([]);
      }
    } catch (error) {
      console.error("❌ Error al cargar reservas:", error);
      setApiError(error instanceof Error ? error.message : "Error desconocido");
      setApiReservedPeriods([]);
    } finally {
      setIsLoadingReservations(false);
    }
  }, [roomId]);

  // 🆕 CARGAR RESERVAS AL MONTAR EL COMPONENTE Y CUANDO CAMBIE EL roomId
  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  // 🔄 COMBINAR PERÍODOS RESERVADOS DE PROPS Y API
  const allReservedPeriods = useMemo(() => {
    return [...reservedPeriods, ...apiReservedPeriods];
  }, [reservedPeriods, apiReservedPeriods]);

  // ✅ FUNCIÓN PARA VERIFICAR SI UNA FECHA ESTÁ DESHABILITADA
  const isDateDisabled = useCallback(
    (date: Date): boolean => {
      // Fechas pasadas
      if (date < today) return true;

      const dateString = format(date, "yyyy-MM-dd");

      // Fechas individuales no disponibles
      if (unavailableDates.includes(dateString)) return true;

      // Verificar períodos reservados (intervalo semi-abierto [start, end))
      return allReservedPeriods.some((period) => {
        const startDate = new Date(period.start);
        const endDate = new Date(period.end);
        return date >= startDate && date < endDate;
      });
    },
    [unavailableDates, allReservedPeriods]
  );

  // ✅ FUNCIÓN MEJORADA PARA OBTENER MODIFICADORES CON COLORES CORREGIDOS
  // Línea ~280 - REEMPLAZAR TODA LA FUNCIÓN
  const getDateModifiers = useCallback(() => {
    const modifiers: any = {};
    const modifiersClassNames: any = {};

    // Marcar fechas no disponibles
    const unavailableDateObjects = unavailableDates.map(
      (dateStr) => new Date(dateStr)
    );
    if (unavailableDateObjects.length > 0) {
      modifiers.unavailable = unavailableDateObjects;
      modifiersClassNames.unavailable = "opacity-50 line-through text-red-500";
    }

    // Marcar períodos reservados
    allReservedPeriods.forEach((period, index) => {
      const startDate = new Date(period.start);
      const endDate = new Date(period.end);
      const reservedDates: Date[] = [];

      for (
        let date = new Date(startDate);
        date < endDate;
        date.setDate(date.getDate() + 1)
      ) {
        reservedDates.push(new Date(date));
      }

      const modifierKey = `reserved_${index}`;
      modifiers[modifierKey] = reservedDates;

      // Diferentes estilos según el estado SIN MANIPULAR EL DOM
      switch (period.status) {
        case "confirmed":
          modifiersClassNames[modifierKey] =
            "bg-red-500 text-white font-semibold";
          break;
        case "pending":
          modifiersClassNames[modifierKey] =
            "bg-yellow-400 text-yellow-900 font-medium";
          break;
        case "checkout":
          modifiersClassNames[modifierKey] =
            "bg-blue-400 text-white font-medium";
          break;
        default:
          modifiersClassNames[modifierKey] =
            "bg-red-500 text-white font-semibold";
      }
    });

    // Marcar fechas seleccionadas
    if (checkIn) {
      modifiers.checkIn = [checkIn];
      modifiersClassNames.checkIn = "bg-green-500 text-white font-bold";
    }

    if (checkOut) {
      modifiers.checkOut = [checkOut];
      modifiersClassNames.checkOut = "bg-green-600 text-white font-bold";
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
        modifiersClassNames.selectedRange = "bg-green-100 text-green-800";
      }
    }

    return { modifiers, modifiersClassNames };
  }, [unavailableDates, allReservedPeriods, checkIn, checkOut]);

  // ✅ VALIDACIÓN DE FECHAS ACTUALIZADA
 // ✅ REEMPLAZAR validateDates COMPLETAMENTE



  // ✅ CÁLCULOS DE RESERVA ACTUALIZADOS
// ✅ REEMPLAZAR bookingCalculations COMPLETAMENTE
const bookingCalculations = useMemo(() => {
  if (!checkIn || !checkOut) {
    return {
      nights: 0,
      subtotal: 0,
      taxes: 150,
      total: 150,
      isValidDates: false,
    };
  }

  if (checkOut <= checkIn) {
    return {
      nights: 0,
      subtotal: 0,
      taxes: 150,
      total: 150,
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
      total: 150,
      isValidDates: false,
    };
  }

  const subtotal = nights * pricePerNight;
  const taxes = 150;
  const total = subtotal + taxes;

  // Validación simple sin dependencias circulares
  const hasDateConflicts = (() => {
    for (
      let date = new Date(checkIn);
      date < checkOut;
      date.setDate(date.getDate() + 1)
    ) {
      if (isDateDisabled(date)) {
        return true;
      }
    }
    return false;
  })();

  return {
    nights,
    subtotal,
    taxes,
    total,
    isValidDates: !hasDateConflicts,
  };
}, [checkIn, checkOut, pricePerNight, minNights, maxNights, isDateDisabled]);


  // ✅ useEffect PARA ACTUALIZAR isValidBooking
  // ✅ REEMPLAZAR useEffect COMPLETAMENTE
useEffect(() => {
  const isValid = Boolean(
    checkIn &&
    checkOut &&
    bookingCalculations.isValidDates &&
    bookingCalculations.nights > 0 &&
    Object.keys(dateErrors).length === 0
  );

  // Solo actualizar si hay cambio
  if (isValid !== isValidBooking) {
    setIsValidBooking(isValid);
  }
}, [checkIn, checkOut, bookingCalculations.isValidDates, bookingCalculations.nights, dateErrors, isValidBooking]);


  // ✅ MANEJAR SELECCIÓN DE FECHAS EN EL CALENDARIO
 // ✅ REEMPLAZAR ESTAS FUNCIONES COMPLETAMENTE
const handleCheckInSelect = useCallback(
  (date: Date | undefined) => {
    if (!date) return;
    
    setCheckIn(date);
    
    // Si la fecha de checkout es anterior o igual, limpiarla
    if (checkOut && checkOut <= date) {
      setCheckOut(undefined);
    }
    
    setShowCheckInCalendar(false);
    
    // Limpiar errores de fechas
    setDateErrors({});
  },
  [checkOut] // ← SOLO checkOut como dependencia
);

const handleCheckOutSelect = useCallback(
  (date: Date | undefined) => {
    if (!date) return;
    
    setCheckOut(date);
    setShowCheckOutCalendar(false);
    
    // Limpiar errores de fechas
    setDateErrors({});
  },
  [] // ← SIN DEPENDENCIAS
);

  // ✅ FUNCIONES AUXILIARES
  const generateBookingId = useCallback(() => {
    return `HTL${Date.now().toString().slice(-8)}${Math.random()
      .toString(36)
      .substr(2, 4)
      .toUpperCase()}`;
  }, []);


  const formatDateShort = useCallback((date: Date | undefined) => {
    if (!date) return "";
    return format(date, "dd/MM/yyyy");
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
          {/* INDICADOR DE CARGA */}
          {isLoadingReservations && (
            <div className="mb-4 p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-700">
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-600"></div>
                <span>Cargando reservas...</span>
              </div>
            </div>
          )}

          {/* ERROR DE API */}
          {apiError && (
            <div className="mb-4 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-700">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-3 w-3" />
                <span>Error: {apiError}</span>
              </div>
              <button
                onClick={fetchReservations}
                className="mt-1 text-xs underline hover:no-underline"
              >
                Reintentar
              </button>
            </div>
          )}

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
            const upcomingReservations = allReservedPeriods
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
    [allReservedPeriods, isLoadingReservations, apiError, fetchReservations]
  );

  // ✅ OBTENER MODIFICADORES DEL CALENDARIO
  // Línea ~750 - REEMPLAZAR CON useMemo
  const { modifiers, modifiersClassNames } = useMemo(() => {
    return getDateModifiers();
  }, [getDateModifiers]);

  // ✅ DEBUG LOG
 // Línea ~755 - SIMPLIFICAR LAS DEPENDENCIAS
useEffect(() => {
  console.log("Debug booking:", {
    checkIn: checkIn ? format(checkIn, "yyyy-MM-dd") : null,
    checkOut: checkOut ? format(checkOut, "yyyy-MM-dd") : null,
    nights: bookingCalculations.nights,
    isValidBooking,
    roomId,
  });
}, [checkIn, checkOut, bookingCalculations.nights, isValidBooking, roomId]);


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

          {/* 🆕 MOSTRAR INFORMACIÓN DE CARGA DE RESERVAS */}
          {isLoadingReservations && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center space-x-2 text-sm text-blue-700">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                <span>Actualizando disponibilidad...</span>
              </div>
            </div>
          )}

          {apiError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center space-x-2 text-sm text-red-700">
                <AlertCircle className="h-4 w-4" />
                <span>Error al cargar reservas</span>
              </div>
              <button
                onClick={fetchReservations}
                className="mt-2 text-xs text-red-600 underline hover:no-underline"
              >
                Reintentar
              </button>
            </div>
          )}

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
              disabled={!isValidBooking || isLoadingReservations}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-6 text-lg shadow-lg"
            >
              {isLoadingReservations
                ? "Cargando disponibilidad..."
                : isValidBooking
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
            disabled={isLoadingReservations}
            className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-6"
          >
            {isLoadingReservations ? "Cargando..." : "Reservar"}
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

          {/* 🆕 INDICADORES DE ESTADO EN MÓVIL */}
          {isLoadingReservations && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center space-x-2 text-sm text-blue-700">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                <span>Actualizando disponibilidad...</span>
              </div>
            </div>
          )}

          {apiError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center space-x-2 text-sm text-red-700">
                <AlertCircle className="h-4 w-4" />
                <span>Error al cargar reservas</span>
              </div>
              <button
                onClick={fetchReservations}
                className="mt-2 text-xs text-red-600 underline hover:no-underline"
              >
                Reintentar
              </button>
            </div>
          )}

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
                      {/* INDICADOR DE CARGA EN MÓVIL */}
                      {isLoadingReservations && (
                        <div className="mb-3 p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-700">
                          <div className="flex items-center space-x-2">
                            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-600"></div>
                            <span>Cargando...</span>
                          </div>
                        </div>
                      )}

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
                        const upcomingReservations = allReservedPeriods
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
              disabled={!isValidBooking || isLoadingReservations}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-4"
            >
              {isLoadingReservations
                ? "Cargando disponibilidad..."
                : isValidBooking
                ? "Continuar al Pago"
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
        </div>
      </div>

      {/* ✅ MODAL DE PAGO MEJORADO CON VALIDACIÓN COMPLETA */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={closePaymentModal}
          />
          <div className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header del Modal */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {paymentStep !== "method" && (
                    <button
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
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <ArrowLeft className="h-5 w-5" />
                    </button>
                  )}
                  <h2 className="text-xl font-bold text-gray-900">
                    {paymentStep === "method" && "Método de Pago"}
                    {paymentStep === "details" && "Detalles de Pago"}
                    {paymentStep === "guest" && "Información del Huésped"}
                    {paymentStep === "success" && "¡Reserva Confirmada!"}
                  </h2>
                </div>
                <button
                  onClick={closePaymentModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Indicador de progreso */}
              <div className="flex items-center mt-4 space-x-2">
                {["method", "details", "guest", "success"].map(
                  (step, index) => (
                    <div key={step} className="flex items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                          paymentStep === step
                            ? "bg-red-600 text-white"
                            : index <
                              ["method", "details", "guest", "success"].indexOf(
                                paymentStep
                              )
                            ? "bg-green-500 text-white"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {index <
                        ["method", "details", "guest", "success"].indexOf(
                          paymentStep
                        ) ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          index + 1
                        )}
                      </div>
                      {index < 3 && (
                        <div
                          className={`w-8 h-0.5 ${
                            index <
                            ["method", "details", "guest", "success"].indexOf(
                              paymentStep
                            )
                              ? "bg-green-500"
                              : "bg-gray-200"
                          }`}
                        />
                      )}
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="p-6">
              {/* PASO 1: SELECCIÓN DE MÉTODO DE PAGO */}
              {paymentStep === "method" && (
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <div className="flex items-start space-x-3">
                      <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-blue-900">
                          Pago Seguro
                        </h3>
                        <p className="text-sm text-blue-700 mt-1">
                          Todos los métodos de pago están protegidos con
                          encriptación SSL de 256 bits.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-3">
                    {paymentMethods
                      .filter((method) => method.available)
                      .map((method) => (
                        <button
                          key={method.id}
                          onClick={() => handlePaymentMethodSelect(method.id)}
                          className={`p-4 border-2 rounded-lg text-left transition-all hover:border-red-300 hover:bg-red-50 ${
                            selectedPaymentMethod === method.id
                              ? "border-red-500 bg-red-50"
                              : "border-gray-200"
                          }`}
                        >
                          <div className="flex items-center space-x-4">
                            <div
                              className={`p-2 rounded-lg text-white ${method.color}`}
                            >
                              {method.icon}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium text-gray-900">
                                {method.name}
                              </h3>
                              <p className="text-sm text-gray-600 mt-1">
                                {method.description}
                              </p>
                            </div>
                            {selectedPaymentMethod === method.id && (
                              <CheckCircle className="h-5 w-5 text-red-600" />
                            )}
                          </div>
                        </button>
                      ))}
                  </div>
                </div>
              )}

              {/* PASO 2: DETALLES DE PAGO */}
              {paymentStep === "details" && (
                <div className="space-y-6">
                  {/* Tarjeta de Crédito/Débito */}
                  {selectedPaymentMethod === "tarjeta" && (
                    <div className="space-y-4">
                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                        <div className="flex items-center space-x-2">
                          <CreditCard className="h-5 w-5 text-orange-600" />
                          <span className="font-medium text-orange-900">
                            Información de la Tarjeta
                          </span>
                        </div>
                        <p className="text-sm text-orange-700 mt-1">
                          Ingresa los datos de tu tarjeta de crédito o débito.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <Label htmlFor="cardNumber">Número de Tarjeta</Label>
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={paymentDetails.cardNumber}
                            onChange={(e) => {
                              const value = e.target.value
                                .replace(/\s/g, "")
                                .replace(/(.{4})/g, "$1 ")
                                .trim()
                                .slice(0, 19);
                              setPaymentDetails((prev) => ({
                                ...prev,
                                cardNumber: value,
                              }));
                            }}
                            className={
                              errors.cardNumber ? "border-red-500" : ""
                            }
                          />
                          {errors.cardNumber && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.cardNumber}
                            </p>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiryDate">Vencimiento</Label>
                            <Input
                              id="expiryDate"
                              placeholder="MM/AA"
                              value={paymentDetails.expiryDate}
                              onChange={(e) => {
                                const value = e.target.value
                                  .replace(/\D/g, "")
                                  .replace(/(\d{2})(\d)/, "$1/$2")
                                  .slice(0, 5);
                                setPaymentDetails((prev) => ({
                                  ...prev,
                                  expiryDate: value,
                                }));
                              }}
                              className={
                                errors.expiryDate ? "border-red-500" : ""
                              }
                            />
                            {errors.expiryDate && (
                              <p className="text-red-500 text-sm mt-1">
                                {errors.expiryDate}
                              </p>
                            )}
                          </div>

                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input
                              id="cvv"
                              placeholder="123"
                              value={paymentDetails.cvv}
                              onChange={(e) => {
                                const value = e.target.value
                                  .replace(/\D/g, "")
                                  .slice(0, 4);
                                setPaymentDetails((prev) => ({
                                  ...prev,
                                  cvv: value,
                                }));
                              }}
                              className={errors.cvv ? "border-red-500" : ""}
                            />
                            {errors.cvv && (
                              <p className="text-red-500 text-sm mt-1">
                                {errors.cvv}
                              </p>
                            )}
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="cardName">Nombre en la Tarjeta</Label>
                          <Input
                            id="cardName"
                            placeholder="Juan Pérez"
                            value={paymentDetails.cardName}
                            onChange={(e) =>
                              setPaymentDetails((prev) => ({
                                ...prev,
                                cardName: e.target.value,
                              }))
                            }
                            className={errors.cardName ? "border-red-500" : ""}
                          />
                          {errors.cardName && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.cardName}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Transferencia Bancaria */}
                  {selectedPaymentMethod === "transferencia" && (
                    <div className="space-y-4">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-center space-x-2">
                          <Building2 className="h-5 w-5 text-blue-600" />
                          <span className="font-medium text-blue-900">
                            Transferencia Bancaria
                          </span>
                        </div>
                        <div className="mt-3 space-y-2 text-sm text-blue-700">
                          <p>
                            <strong>Banco:</strong> Banco de Venezuela
                          </p>
                          <p>
                            <strong>Cuenta:</strong> 0102-1234-56-7890123456
                          </p>
                          <p>
                            <strong>Titular:</strong> Hotel Paradise C.A.
                          </p>
                          <p>
                            <strong>RIF:</strong> J-12345678-9
                          </p>
                          <p>
                            <strong>Monto:</strong> ${bookingCalculations.total}
                          </p>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="transferenceReference">
                          Número de Referencia
                        </Label>
                        <Input
                          id="transferenceReference"
                          placeholder="Ej: 123456789012"
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
                          <p className="text-red-500 text-sm mt-1">
                            {errors.transferenceReference}
                          </p>
                        )}
                        <p className="text-xs text-gray-500 mt-1">
                          Ingresa el número de referencia de tu transferencia
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Pago Móvil */}
                  {selectedPaymentMethod === "pago-movil" && (
                    <div className="space-y-4">
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                        <div className="flex items-center space-x-2">
                          <Smartphone className="h-5 w-5 text-purple-600" />
                          <span className="font-medium text-purple-900">
                            Pago Móvil
                          </span>
                        </div>
                        <div className="mt-3 space-y-2 text-sm text-purple-700">
                          <p>
                            <strong>Banco:</strong> Banco de Venezuela
                          </p>
                          <p>
                            <strong>Teléfono:</strong> 0414-123-4567
                          </p>
                          <p>
                            <strong>Cédula:</strong> V-12.345.678
                          </p>
                          <p>
                            <strong>Monto:</strong> ${bookingCalculations.total}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <Label htmlFor="pagoMovilPhone">Tu Teléfono</Label>
                          <Input
                            id="pagoMovilPhone"
                            placeholder="0414-123-4567"
                            value={paymentDetails.pagoMovilPhone}
                            onChange={(e) => {
                              const value = e.target.value
                                .replace(/\D/g, "")
                                .replace(/(\d{4})(\d{3})(\d{4})/, "$1-$2-$3")
                                .slice(0, 13);
                              setPaymentDetails((prev) => ({
                                ...prev,
                                pagoMovilPhone: value,
                              }));
                            }}
                            className={
                              errors.pagoMovilPhone ? "border-red-500" : ""
                            }
                          />
                          {errors.pagoMovilPhone && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.pagoMovilPhone}
                            </p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="pagoMovilReference">
                            Número de Referencia
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
                            <p className="text-red-500 text-sm mt-1">
                              {errors.pagoMovilReference}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Criptomonedas */}
                  {selectedPaymentMethod === "crypto" && (
                    <div className="space-y-4">
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <div className="flex items-center space-x-2">
                          <Bitcoin className="h-5 w-5 text-yellow-600" />
                          <span className="font-medium text-yellow-900">
                            Pago con Criptomonedas
                          </span>
                        </div>
                        <div className="mt-3 space-y-2 text-sm text-yellow-700">
                          <p>
                            <strong>Bitcoin (BTC):</strong>{" "}
                            bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
                          </p>
                          <p>
                            <strong>USDT (TRC20):</strong>{" "}
                            TQn9Y2khEsLMWD946u9T3fKXAE1muiF23Y
                          </p>
                          <p>
                            <strong>Ethereum (ETH):</strong>{" "}
                            0x742d35Cc6632C0532925a3b8D4C9db3C6e4C8b69
                          </p>
                          <p>
                            <strong>Monto:</strong> ${bookingCalculations.total}{" "}
                            USD
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <Label htmlFor="cryptoWallet">
                            Tu Dirección de Wallet
                          </Label>
                          <Input
                            id="cryptoWallet"
                            placeholder="Ej: bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
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
                            <p className="text-red-500 text-sm mt-1">
                              {errors.cryptoWallet}
                            </p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="cryptoTxHash">
                            Hash de Transacción
                          </Label>
                          <Input
                            id="cryptoTxHash"
                            placeholder="Ej: 1a2b3c4d5e6f7g8h9i0j..."
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
                            <p className="text-red-500 text-sm mt-1">
                              {errors.cryptoTxHash}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Zelle */}
                  {selectedPaymentMethod === "zelle" && (
                    <div className="space-y-4">
                      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                        <div className="flex items-center space-x-2">
                          <Send className="h-5 w-5 text-indigo-600" />
                          <span className="font-medium text-indigo-900">
                            Pago con Zelle
                          </span>
                        </div>
                        <div className="mt-3 space-y-2 text-sm text-indigo-700">
                          <p>
                            <strong>Email:</strong> payments@hotelparadise.com
                          </p>
                          <p>
                            <strong>Nombre:</strong> Hotel Paradise LLC
                          </p>
                          <p>
                            <strong>Monto:</strong> ${bookingCalculations.total}{" "}
                            USD
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <Label htmlFor="zelleEmail">Tu Email de Zelle</Label>
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
                            className={
                              errors.zelleEmail ? "border-red-500" : ""
                            }
                          />
                          {errors.zelleEmail && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.zelleEmail}
                            </p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="zelleReference">
                            Número de Confirmación
                          </Label>
                          <Input
                            id="zelleReference"
                            placeholder="Ej: ZEL123456789"
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
                            <p className="text-red-500 text-sm mt-1">
                              {errors.zelleReference}
                            </p>
                          )}
                        </div>
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

              {/* PASO 3: INFORMACIÓN DEL HUÉSPED */}
              {paymentStep === "guest" && (
                <div className="space-y-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-green-600" />
                      <span className="font-medium text-green-900">
                        Información del Huésped Principal
                      </span>
                    </div>
                    <p className="text-sm text-green-700 mt-1">
                      Esta información será utilizada para el registro y
                      contacto.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <Label htmlFor="guestName">Nombre Completo *</Label>
                      <Input
                        id="guestName"
                        placeholder="Juan Pérez"
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
                        <p className="text-red-500 text-sm mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="guestEmail">Email *</Label>
                      <Input
                        id="guestEmail"
                        type="email"
                        placeholder="juan@ejemplo.com"
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
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="guestPhone">Teléfono *</Label>
                      <Input
                        id="guestPhone"
                        placeholder="0414-123-4567"
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
                        <p className="text-red-500 text-sm mt-1">
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
                        placeholder="V-12.345.678 o E-12345678"
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
                        <p className="text-red-500 text-sm mt-1">
                          {errors.document}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="guestNotes">
                        Comentarios Adicionales (Opcional)
                      </Label>
                      <textarea
                        id="guestNotes"
                        placeholder="Solicitudes especiales, alergias, etc."
                        value={guestInfo.notes}
                        onChange={(e) =>
                          setGuestInfo((prev) => ({
                            ...prev,
                            notes: e.target.value,
                          }))
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"
                        rows={3}
                      />
                    </div>
                  </div>

                  {/* Términos y Condiciones */}
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id="terms"
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                        className="mt-1 h-4 w-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                      />
                      <div className="text-sm">
                        <label htmlFor="terms" className="text-gray-700">
                          Acepto los{" "}
                          <a
                            href="#"
                            className="text-red-600 hover:text-red-700 underline"
                          >
                            términos y condiciones
                          </a>{" "}
                          y la{" "}
                          <a
                            href="#"
                            className="text-red-600 hover:text-red-700 underline"
                          >
                            política de privacidad
                          </a>
                          .
                        </label>
                        {errors.terms && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.terms}
                          </p>
                        )}
                      </div>
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

              {/* PASO 4: CONFIRMACIÓN EXITOSA */}
              {paymentStep === "success" && (
                <div className="text-center space-y-6">
                  <div className="flex justify-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-12 w-12 text-green-600" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      ¡Reserva Confirmada!
                    </h3>
                    <p className="text-gray-600">
                      Tu reserva ha sido procesada exitosamente. Recibirás un
                      email de confirmación en breve.
                    </p>
                  </div>

                  {/* Detalles de la reserva confirmada */}
                  <div className="bg-gray-50 rounded-lg p-6 text-left">
                    <h4 className="font-semibold text-gray-900 mb-4">
                      Detalles de tu Reserva:
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          Número de Reserva:
                        </span>
                        <span className="font-medium">
                          #
                          {Math.random()
                            .toString(36)
                            .substr(2, 9)
                            .toUpperCase()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Check-in:</span>
                        <span className="font-medium">
                          {checkIn ? formatDateShort(checkIn) : ""}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Check-out:</span>
                        <span className="font-medium">
                          {checkOut ? formatDateShort(checkOut) : ""}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Huéspedes:</span>
                        <span className="font-medium">
                          {guests}{" "}
                          {parseInt(guests) === 1 ? "Huésped" : "Huéspedes"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Noches:</span>
                        <span className="font-medium">
                          {bookingCalculations.nights}
                        </span>
                      </div>
                      <div className="border-t border-gray-200 pt-3">
                        <div className="flex justify-between font-bold text-lg">
                          <span>Total Pagado:</span>
                          <span className="text-green-600">
                            ${bookingCalculations.total}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Información importante */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <InfoIcon className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div className="text-left">
                        <h4 className="font-medium text-blue-900 mb-2">
                          Información Importante:
                        </h4>
                        <ul className="text-sm text-blue-700 space-y-1">
                          <li>• Check-in: 3:00 PM - 11:00 PM</li>
                          <li>• Check-out: 7:00 AM - 12:00 PM</li>
                          <li>
                            • Presenta tu documento de identidad al llegar
                          </li>
                          <li>• Política de cancelación: 24 horas antes</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={() => {
                        // Aquí podrías generar un PDF o enviar por email
                        alert(
                          "Función de descarga de comprobante en desarrollo"
                        );
                      }}
                      variant="outline"
                      className="flex-1"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Descargar Comprobante
                    </Button>
                    <Button
                      onClick={closePaymentModal}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                    >
                      Cerrar
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Resumen de reserva lateral (solo visible en pasos 1-3) */}
            {paymentStep !== "success" && (
              <div className="border-t border-gray-200 p-6 bg-gray-50">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Resumen de Reserva
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Habitación:</span>
                    <span className="font-medium">Suite Premium</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Fechas:</span>
                    <span className="font-medium">
                      {checkIn && checkOut
                        ? `${formatDateShort(checkIn)} - ${formatDateShort(
                            checkOut
                          )}`
                        : "No seleccionadas"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Huéspedes:</span>
                    <span className="font-medium">
                      {guests}{" "}
                      {parseInt(guests) === 1 ? "Huésped" : "Huéspedes"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Noches:</span>
                    <span className="font-medium">
                      {bookingCalculations.nights}
                    </span>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal:</span>
                      <span>${bookingCalculations.subtotal}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Impuestos:</span>
                      <span>${bookingCalculations.taxes}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t border-gray-200 pt-2 mt-2">
                      <span>Total:</span>
                      <span className="text-red-600">
                        ${bookingCalculations.total}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default BookingWidget;
