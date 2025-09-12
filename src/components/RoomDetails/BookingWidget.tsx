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
  Upload
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
  roomId,
}: BookingWidgetProps) => {
  const [checkIn, setCheckIn] = useState<Date | undefined>();
  const [checkOut, setCheckOut] = useState<Date | undefined>();
  const [guests, setGuests] = useState("2");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [showCheckInCalendar, setShowCheckInCalendar] = useState(false);
  const [showCheckOutCalendar, setShowCheckOutCalendar] = useState(false);

  // ✅ ESTADO ACTUALIZADO DE INFORMACIÓN DEL HUÉSPED (OBLIGATORIO)
  const [guestInfo, setGuestInfo] = useState({
    nombre_completo: "",
    email: "",
    telefono: "",
    documento_identidad: "",
    comentarios_adicionales: "",
  });

  // ✅ ESTADO ACTUALIZADO DE PAYMENT DETAILS SIN TARJETA + ARCHIVO
  const [paymentDetails, setPaymentDetails] = useState({
    referencia_transferencia: "",
    telefono_pago_movil: "",
    referencia_pago_movil: "",
    billetera_cripto: "",
    hash_transaccion_cripto: "",
    email_zelle: "",
    referencia_zelle: "",
  });

  // 🆕 ESTADO PARA EL ARCHIVO DE COMPROBANTE
  const [comprobanteFile, setComprobanteFile] = useState<File | null>(null);
  const [comprobantePreview, setComprobantePreview] = useState<string | null>(null);

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
  const [isSubmittingReservation, setIsSubmittingReservation] = useState(false);

  // ESTILOS CSS INYECTADOS
  useEffect(() => {
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
  }, []);

  // ✅ MÉTODOS DE PAGO ACTUALIZADOS (SIN TARJETA DE CRÉDITO)
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
      id: "pago_movil",
      name: "Pago Móvil",
      icon: <Smartphone className="h-6 w-6" />,
      description: "Pago móvil interbancario",
      color: "bg-purple-500",
      available: true,
    },
    {
      id: "cripto",
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

  const today = new Date();

  // 🆕 FUNCIÓN PARA MANEJAR EL ARCHIVO DE COMPROBANTE
  const handleComprobanteChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar tipo de archivo
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({
          ...prev,
          comprobante: 'Solo se permiten archivos JPG, PNG, GIF o PDF'
        }));
        return;
      }

      // Validar tamaño (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          comprobante: 'El archivo no puede ser mayor a 5MB'
        }));
        return;
      }

      setComprobanteFile(file);
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.comprobante;
        return newErrors;
      });

      // Crear preview si es imagen
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setComprobantePreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setComprobantePreview(null);
      }
    }
  }, []);

  // FUNCIÓN PARA OBTENER RESERVAS DE LA API
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
        const convertedPeriods = apiData.data.map((reserva) => {
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
            guestName: undefined,
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

  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  const allReservedPeriods = useMemo(() => {
    return [...reservedPeriods, ...apiReservedPeriods];
  }, [reservedPeriods, apiReservedPeriods]);

  const isDateDisabled = useCallback(
    (date: Date): boolean => {
      if (date < today) return true;

      const dateString = format(date, "yyyy-MM-dd");

      if (unavailableDates.includes(dateString)) return true;

      return allReservedPeriods.some((period) => {
        const startDate = new Date(period.start);
        const endDate = new Date(period.end);
        return date >= startDate && date < endDate;
      });
    },
    [unavailableDates, allReservedPeriods]
  );

  const getDateModifiers = useCallback(() => {
    const modifiers: any = {};
    const modifiersClassNames: any = {};

    const unavailableDateObjects = unavailableDates.map(
      (dateStr) => new Date(dateStr)
    );
    if (unavailableDateObjects.length > 0) {
      modifiers.unavailable = unavailableDateObjects;
      modifiersClassNames.unavailable = "opacity-50 line-through text-red-500";
    }

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

    if (checkIn) {
      modifiers.checkIn = [checkIn];
      modifiersClassNames.checkIn = "bg-green-500 text-white font-bold";
    }

    if (checkOut) {
      modifiers.checkOut = [checkOut];
      modifiersClassNames.checkOut = "bg-green-600 text-white font-bold";
    }

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

  useEffect(() => {
    const isValid = Boolean(
      checkIn &&
      checkOut &&
      bookingCalculations.isValidDates &&
      bookingCalculations.nights > 0 &&
      Object.keys(dateErrors).length === 0
    );

    if (isValid !== isValidBooking) {
      setIsValidBooking(isValid);
    }
  }, [checkIn, checkOut, bookingCalculations.isValidDates, bookingCalculations.nights, dateErrors, isValidBooking]);

  const handleCheckInSelect = useCallback(
    (date: Date | undefined) => {
      if (!date) return;
      
      setCheckIn(date);
      
      if (checkOut && checkOut <= date) {
        setCheckOut(undefined);
      }
      
      setShowCheckInCalendar(false);
      setDateErrors({});
    },
    [checkOut]
  );

  const handleCheckOutSelect = useCallback(
    (date: Date | undefined) => {
      if (!date) return;
      
      setCheckOut(date);
      setShowCheckOutCalendar(false);
      setDateErrors({});
    },
    []
  );

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

  // ✅ VALIDACIÓN DE DETALLES DE PAGO ACTUALIZADA SIN TARJETA + COMPROBANTE
  const validatePaymentDetails = useCallback(() => {
    const newErrors: { [key: string]: string } = {};

    // Validar comprobante para todos los métodos excepto efectivo
    if (selectedPaymentMethod !== "efectivo" && !comprobanteFile) {
      newErrors.comprobante = "El comprobante de pago es obligatorio";
    }

    switch (selectedPaymentMethod) {
      case "transferencia":
        if (!paymentDetails.referencia_transferencia.trim()) {
          newErrors.referencia_transferencia = "Referencia de transferencia requerida";
        } else if (paymentDetails.referencia_transferencia.length < 6) {
          newErrors.referencia_transferencia = "Referencia debe tener al menos 6 caracteres";
        }
        break;

      case "pago_movil":
        if (!paymentDetails.telefono_pago_movil.trim()) {
          newErrors.telefono_pago_movil = "Teléfono requerido";
        } else if (
          !/^(0414|0424|0412|0416|0426)\d{7}$/.test(
            paymentDetails.telefono_pago_movil.replace(/[-\s]/g, "")
          )
        ) {
          newErrors.telefono_pago_movil = "Formato de teléfono inválido";
        }
        if (!paymentDetails.referencia_pago_movil.trim()) {
          newErrors.referencia_pago_movil = "Referencia requerida";
        } else if (paymentDetails.referencia_pago_movil.length < 6) {
          newErrors.referencia_pago_movil = "Referencia debe tener al menos 6 caracteres";
        }
        break;

      case "cripto":
        if (!paymentDetails.billetera_cripto.trim()) {
          newErrors.billetera_cripto = "Dirección de wallet requerida";
        } else if (paymentDetails.billetera_cripto.length < 26) {
          newErrors.billetera_cripto = "Dirección de wallet inválida";
        }
        if (!paymentDetails.hash_transaccion_cripto.trim()) {
          newErrors.hash_transaccion_cripto = "Hash de transacción requerido";
        }
        break;

      case "zelle":
        if (!paymentDetails.email_zelle.trim()) {
          newErrors.email_zelle = "Email de Zelle requerido";
        } else if (!/\S+@\S+\.\S+/.test(paymentDetails.email_zelle)) {
          newErrors.email_zelle = "Email inválido";
        }
        if (!paymentDetails.referencia_zelle.trim()) {
          newErrors.referencia_zelle = "Referencia de Zelle requerida";
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [selectedPaymentMethod, paymentDetails, comprobanteFile]);

  // ✅ VALIDACIÓN DE INFORMACIÓN DEL HUÉSPED ACTUALIZADA
  const validateGuestInfo = useCallback(() => {
    const newErrors: { [key: string]: string } = {};

    if (!guestInfo.nombre_completo.trim()) {
      newErrors.nombre_completo = "El nombre completo es requerido";
    }
    if (!guestInfo.email.trim()) {
      newErrors.email = "El email es requerido";
    } else if (!/\S+@\S+\.\S+/.test(guestInfo.email)) {
      newErrors.email = "Email inválido";
    }
    if (!guestInfo.telefono.trim()) {
      newErrors.telefono = "El teléfono es requerido";
    } else if (!/^(04\d{9}|02\d{8}|\+58\d{10})$/.test(guestInfo.telefono.replace(/[-\s]/g, ""))) {
      newErrors.telefono = "Formato de teléfono inválido. Ejemplos: 04141234567, 02121234567";
    }
    if (!guestInfo.documento_identidad.trim()) {
      newErrors.documento_identidad = "El documento de identidad es requerido";
    } else if (!/^[VEJPvejp]-?\d{6,8}$/.test(guestInfo.documento_identidad)) {
      newErrors.documento_identidad = "Formato de documento inválido. Ejemplos: V-12345678, E-12345678";
    }
    if (!termsAccepted) {
      newErrors.terms = "Debes aceptar los términos y condiciones";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [guestInfo, termsAccepted]);

  // 🆕 FUNCIÓN PARA ENVIAR LA RESERVA A LA API CON TODOS LOS DATOS
  const submitReservationToAPI = useCallback(async () => {
    if (!checkIn || !checkOut) {
      throw new Error("Datos incompletos para la reserva");
    }

    // Para efectivo no se requiere comprobante
    if (selectedPaymentMethod !== "efectivo" && !comprobanteFile) {
      throw new Error("Comprobante de pago requerido");
    }

    setIsSubmittingReservation(true);

    try {
      const formData = new FormData();

      // ✅ DATOS OBLIGATORIOS DE LA RESERVA
      formData.append('habitacion_id', roomId);
      formData.append('fecha_entrada', format(checkIn, 'yyyy-MM-dd'));
      formData.append('fecha_salida', format(checkOut, 'yyyy-MM-dd'));
      formData.append('metodo_pago', selectedPaymentMethod);
      formData.append('total_precio', bookingCalculations.total.toString());

      // ✅ DATOS OBLIGATORIOS DEL HUÉSPED
      formData.append('nombre_completo', guestInfo.nombre_completo);
      formData.append('email', guestInfo.email);
      formData.append('telefono', guestInfo.telefono);
      formData.append('documento_identidad', guestInfo.documento_identidad);

      // ✅ COMENTARIOS ADICIONALES (OPCIONAL)
      if (guestInfo.comentarios_adicionales.trim()) {
        formData.append('comentarios_adicionales', guestInfo.comentarios_adicionales);
      }

      // ✅ DATOS ESPECÍFICOS DEL MÉTODO DE PAGO
      switch (selectedPaymentMethod) {
        case "transferencia":
          formData.append('referencia_transferencia', paymentDetails.referencia_transferencia);
          break;
        case "pago_movil":
          formData.append('telefono_pago_movil', paymentDetails.telefono_pago_movil.replace(/[-\s]/g, ''));
          formData.append('referencia_pago_movil', paymentDetails.referencia_pago_movil);
          break;
        case "zelle":
          formData.append('email_zelle', paymentDetails.email_zelle);
          formData.append('referencia_zelle', paymentDetails.referencia_zelle);
          break;
        case "cripto":
          formData.append('billetera_cripto', paymentDetails.billetera_cripto);
          formData.append('hash_transaccion_cripto', paymentDetails.hash_transaccion_cripto);
          break;
      }

      // ✅ ARCHIVO DE COMPROBANTE (OBLIGATORIO PARA TODOS EXCEPTO EFECTIVO)
      if (selectedPaymentMethod !== "efectivo" && comprobanteFile) {
        formData.append('comprobantes', comprobanteFile);
      }

      console.log('🚀 Enviando datos a la API:', {
        habitacion_id: roomId,
        metodo_pago: selectedPaymentMethod,
        nombre_completo: guestInfo.nombre_completo,
        email: guestInfo.email,
        telefono: guestInfo.telefono,
        documento_identidad: guestInfo.documento_identidad,
        tiene_comprobante: !!comprobanteFile,
      });

      const response = await fetch('http://localhost:3000/api/reservaHabitacion', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || 'Error al crear la reserva');
      }

      console.log('✅ Reserva creada exitosamente:', result.data);
      return result.data;

    } catch (error) {
      console.error('❌ Error al enviar reserva:', error);
      throw error;
    } finally {
      setIsSubmittingReservation(false);
    }
  }, [
    checkIn,
    checkOut,
    roomId,
    selectedPaymentMethod,
    bookingCalculations.total,
    guestInfo,
    paymentDetails,
    comprobanteFile
  ]);

  // ✅ HANDLE PAYMENT COMPLETE ACTUALIZADO CON API
  const handlePaymentComplete = useCallback(async () => {
    if (paymentStep === "details" && validatePaymentDetails()) {
      setPaymentStep("guest");
    } else if (paymentStep === "guest" && validateGuestInfo()) {
      try {
        // 🆕 ENVIAR A LA API REAL
        const apiResult = await submitReservationToAPI();

        // Crear datos de reserva para el callback local
        // Crear datos de reserva para el callback local
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
          guestInfo: {
            name: guestInfo.nombre_completo,
            email: guestInfo.email,
            phone: guestInfo.telefono,
            document: guestInfo.documento_identidad,
            notes: guestInfo.comentarios_adicionales,
          },
        };

        // Llamar al callback del componente padre
        onBooking(bookingData);
        
        // Actualizar las reservas
        await fetchReservations();
        
        setPaymentStep("success");
      } catch (error) {
        console.error('Error al procesar la reserva:', error);
        setErrors({
          submit: error instanceof Error ? error.message : 'Error al procesar la reserva'
        });
      }
    }
  }, [
    paymentStep,
    validatePaymentDetails,
    validateGuestInfo,
    submitReservationToAPI,
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
    fetchReservations,
  ]);

  const resetBooking = useCallback(() => {
    setCheckIn(undefined);
    setCheckOut(undefined);
    setGuests("2");
    setGuestInfo({ 
      nombre_completo: "", 
      email: "", 
      telefono: "", 
      documento_identidad: "", 
      comentarios_adicionales: "" 
    });
    setPaymentDetails({
      referencia_transferencia: "",
      telefono_pago_movil: "",
      referencia_pago_movil: "",
      billetera_cripto: "",
      hash_transaccion_cripto: "",
      email_zelle: "",
      referencia_zelle: "",
    });
    setComprobanteFile(null);
    setComprobantePreview(null);
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

  const renderCalendarLegend = useCallback(
    () => (
      <div className="ml-4 flex-shrink-0 w-48">
        <div className="p-4 bg-gray-50 rounded-lg border">
          {isLoadingReservations && (
            <div className="mb-4 p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-700">
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-600"></div>
                <span>Cargando reservas...</span>
              </div>
            </div>
          )}

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

  const { modifiers, modifiersClassNames } = useMemo(() => {
    return getDateModifiers();
  }, [getDateModifiers]);

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
            {/* Calendario de Check-in */}
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

            {/* Calendario de Check-out */}
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
            {/* Calendarios móviles con estructura similar al desktop */}
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
                    <div className="p-3 bg-gray-50 border-t">
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

      {/* ✅ MODAL DE PAGO ACTUALIZADO SIN TARJETA + CON COMPROBANTE */}
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
                        <Label htmlFor="referencia_transferencia">
                          Número de Referencia
                        </Label>
                        <Input
                          id="referencia_transferencia"
                          placeholder="Ej: 123456789012"
                          value={paymentDetails.referencia_transferencia}
                          onChange={(e) =>
                            setPaymentDetails((prev) => ({
                              ...prev,
                              referencia_transferencia: e.target.value,
                            }))
                          }
                          className={
                            errors.referencia_transferencia ? "border-red-500" : ""
                          }
                        />
                        {errors.referencia_transferencia && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.referencia_transferencia}
                          </p>
                        )}
                        <p className="text-xs text-gray-500 mt-1">
                          Ingresa el número de referencia de tu transferencia
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Pago Móvil */}
                  {selectedPaymentMethod === "pago_movil" && (
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
                          <Label htmlFor="telefono_pago_movil">Tu Teléfono</Label>
                          <Input
                            id="telefono_pago_movil"
                            placeholder="0414-123-4567"
                            value={paymentDetails.telefono_pago_movil}
                            onChange={(e) => {
                              const value = e.target.value
                                .replace(/\D/g, "")
                                .replace(/(\d{4})(\d{3})(\d{4})/, "$1-$2-$3")
                                .slice(0, 13);
                              setPaymentDetails((prev) => ({
                                ...prev,
                                telefono_pago_movil: value,
                              }));
                            }}
                            className={
                              errors.telefono_pago_movil ? "border-red-500" : ""
                            }
                          />
                          {errors.telefono_pago_movil && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.telefono_pago_movil}
                            </p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="referencia_pago_movil">
                            Número de Referencia
                          </Label>
                          <Input
                            id="referencia_pago_movil"
                            placeholder="Ej: 123456789"
                            value={paymentDetails.referencia_pago_movil}
                            onChange={(e) =>
                              setPaymentDetails((prev) => ({
                                ...prev,
                                referencia_pago_movil: e.target.value,
                              }))
                            }
                            className={
                              errors.referencia_pago_movil ? "border-red-500" : ""
                            }
                          />
                          {errors.referencia_pago_movil && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.referencia_pago_movil}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Criptomonedas */}
                  {selectedPaymentMethod === "cripto" && (
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
                          <Label htmlFor="billetera_cripto">
                            Tu Dirección de Wallet
                          </Label>
                          <Input
                            id="billetera_cripto"
                            placeholder="Ej: bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
                            value={paymentDetails.billetera_cripto}
                            onChange={(e) =>
                              setPaymentDetails((prev) => ({
                                ...prev,
                                billetera_cripto: e.target.value,
                              }))
                            }
                            className={
                              errors.billetera_cripto ? "border-red-500" : ""
                            }
                          />
                          {errors.billetera_cripto && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.billetera_cripto}
                            </p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="hash_transaccion_cripto">
                            Hash de Transacción
                          </Label>
                          <Input
                            id="hash_transaccion_cripto"
                            placeholder="Ej: 1a2b3c4d5e6f7g8h9i0j..."
                            value={paymentDetails.hash_transaccion_cripto}
                            onChange={(e) =>
                              setPaymentDetails((prev) => ({
                                ...prev,
                                hash_transaccion_cripto: e.target.value,
                              }))
                            }
                            className={
                              errors.hash_transaccion_cripto ? "border-red-500" : ""
                            }
                          />
                          {errors.hash_transaccion_cripto && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.hash_transaccion_cripto}
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
                          <Label htmlFor="email_zelle">Tu Email de Zelle</Label>
                          <Input
                            id="email_zelle"
                            type="email"
                            placeholder="tu-email@ejemplo.com"
                            value={paymentDetails.email_zelle}
                            onChange={(e) =>
                              setPaymentDetails((prev) => ({
                                ...prev,
                                email_zelle: e.target.value,
                              }))
                            }
                            className={
                              errors.email_zelle ? "border-red-500" : ""
                            }
                          />
                          {errors.email_zelle && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.email_zelle}
                            </p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="referencia_zelle">
                            Número de Confirmación
                          </Label>
                          <Input
                            id="referencia_zelle"
                            placeholder="Ej: ZEL123456789"
                            value={paymentDetails.referencia_zelle}
                            onChange={(e) =>
                              setPaymentDetails((prev) => ({
                                ...prev,
                                referencia_zelle: e.target.value,
                              }))
                            }
                            className={
                              errors.referencia_zelle ? "border-red-500" : ""
                            }
                          />
                          {errors.referencia_zelle && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.referencia_zelle}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 🆕 SECCIÓN DE COMPROBANTE DE PAGO */}
                  <div className="border-t border-gray-200 pt-6">
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <Upload className="h-5 w-5 text-amber-600" />
                        <span className="font-medium text-amber-900">
                          Comprobante de Pago
                        </span>
                      </div>
                      <p className="text-sm text-amber-700 mt-1">
                        Sube una imagen o PDF del comprobante de tu pago para verificar la transacción.
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="comprobante">
                        Archivo de Comprobante *
                      </Label>
                      <div className="mt-2">
                        <input
                          id="comprobante"
                          type="file"
                          accept="image/*,.pdf"
                          onChange={handleComprobanteChange}
                          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100 border border-gray-300 rounded-lg p-2"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Formatos permitidos: JPG, PNG, GIF, PDF (máximo 5MB)
                        </p>
                      </div>
                      
                      {errors.comprobante && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.comprobante}
                        </p>
                      )}

                      {/* Preview del archivo */}
                      {comprobanteFile && (
                        <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                              {comprobantePreview ? (
                                <img
                                  src={comprobantePreview}
                                  alt="Preview"
                                  className="w-16 h-16 object-cover rounded-lg"
                                />
                              ) : (
                                <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                                  <span className="text-xs text-gray-500">PDF</span>
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-green-900 truncate">
                                {comprobanteFile.name}
                              </p>
                              <p className="text-xs text-green-700">
                                {(comprobanteFile.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                setComprobanteFile(null);
                                setComprobantePreview(null);
                                const input = document.getElementById('comprobante') as HTMLInputElement;
                                if (input) input.value = '';
                              }}
                              className="text-red-600 hover:text-red-700"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Error de envío si existe */}
                  {errors.submit && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="h-5 w-5 text-red-600" />
                        <span className="font-medium text-red-900">Error</span>
                      </div>
                      <p className="text-sm text-red-700 mt-1">
                        {errors.submit}
                      </p>
                    </div>
                  )}

                  <Button
                    onClick={handlePaymentComplete}
                    disabled={isSubmittingReservation}
                    className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white py-3"
                  >
                    {isSubmittingReservation ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Procesando...</span>
                      </div>
                    ) : (
                      "Continuar"
                    )}
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
                      <Label htmlFor="nombre_completo">Nombre Completo *</Label>
                      <Input
                        id="nombre_completo"
                        placeholder="Juan Pérez"
                        value={guestInfo.nombre_completo}
                        onChange={(e) =>
                          setGuestInfo((prev) => ({
                            ...prev,
                            nombre_completo: e.target.value,
                          }))
                        }
                        className={errors.nombre_completo ? "border-red-500" : ""}
                      />
                      {errors.nombre_completo && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.nombre_completo}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
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
                      <Label htmlFor="telefono">Teléfono *</Label>
                      <Input
                        id="telefono"
                        placeholder="0414-123-4567"
                        value={guestInfo.telefono}
                        onChange={(e) =>
                          setGuestInfo((prev) => ({
                            ...prev,
                            telefono: e.target.value,
                          }))
                        }
                        className={errors.telefono ? "border-red-500" : ""}
                      />
                      {errors.telefono && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.telefono}
                        </p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">
                        Formato: 04141234567, 02121234567 o +584141234567
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="documento_identidad">
                        Documento de Identidad *
                      </Label>
                      <Input
                        id="documento_identidad"
                        placeholder="V-12.345.678 o E-12345678"
                        value={guestInfo.documento_identidad}
                        onChange={(e) =>
                          setGuestInfo((prev) => ({
                            ...prev,
                            documento_identidad: e.target.value,
                          }))
                        }
                        className={errors.documento_identidad ? "border-red-500" : ""}
                      />
                      {errors.documento_identidad && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.documento_identidad}
                        </p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">
                        Formato: V-12345678, E-12345678, J-12345678, P-12345678
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="comentarios_adicionales">
                        Comentarios Adicionales (Opcional)
                      </Label>
                      <textarea
                        id="comentarios_adicionales"
                        placeholder="Solicitudes especiales, alergias, etc."
                        value={guestInfo.comentarios_adicionales}
                        onChange={(e) =>
                          setGuestInfo((prev) => ({
                            ...prev,
                            comentarios_adicionales: e.target.value,
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

                  {/* Error de envío si existe */}
                  {errors.submit && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="h-5 w-5 text-red-600" />
                        <span className="font-medium text-red-900">Error</span>
                      </div>
                      <p className="text-sm text-red-700 mt-1">
                        {errors.submit}
                      </p>
                    </div>
                  )}

                  <Button
                    onClick={handlePaymentComplete}
                    disabled={!termsAccepted || isSubmittingReservation}
                    className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3"
                  >
                    {isSubmittingReservation ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Confirmando Reserva...</span>
                      </div>
                    ) : (
                      "Confirmar Reserva"
                    )}
                  </Button>
                </div>
              )}

              {/* PASO 4: CONFIRMACIÓN EXITOSA */}
              {paymentStep === "success" && (
                <div className="text-center space-y-6">
                  <div className="flex justify-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-10 w-10 text-green-600" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      ¡Reserva Confirmada!
                    </h3>
                    <p className="text-gray-600">
                      Tu reserva ha sido procesada exitosamente. Recibirás un email de confirmación en breve.
                    </p>
                  </div>

                  {/* Resumen de la reserva */}
                  <div className="bg-gray-50 rounded-lg p-6 text-left">
                    <h4 className="font-semibold text-gray-900 mb-4">
                      Detalles de tu Reserva:
                    </h4>
                    <div className="space-y-3 text-sm">
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
                        <span className="font-medium">{guests}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Noches:</span>
                        <span className="font-medium">{bookingCalculations.nights}</span>
                      </div>
                      <div className="flex justify-between border-t pt-3">
                        <span className="text-gray-600">Total Pagado:</span>
                        <span className="font-bold text-lg">${bookingCalculations.total}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button
                      onClick={closePaymentModal}
                      className="w-full bg-red-600 hover:bg-red-700 text-white py-3"
                    >
                      Cerrar
                    </Button>
                    <p className="text-xs text-gray-500">
                      Se ha enviado un email de confirmación a {guestInfo.email}
                    </p>
                  </div>
                </div>
              )}

              {/* Resumen de reserva en la barra lateral */}
              {paymentStep !== "success" && (
                <div className="border-t border-gray-200 pt-6 mt-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Resumen de Reserva
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Check-in:</span>
                        <span>{checkIn ? formatDateShort(checkIn) : "No seleccionado"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Check-out:</span>
                        <span>{checkOut ? formatDateShort(checkOut) : "No seleccionado"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Huéspedes:</span>
                        <span>{guests}</span>
                      </div>
                      {isValidBooking && (
                        <>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Noches:</span>
                            <span>{bookingCalculations.nights}</span>
                          </div>
                          <div className="flex justify-between border-t pt-2 font-semibold">
                            <span>Total:</span>
                            <span>${bookingCalculations.total}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
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
