"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Users,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Bell,
  Search,
  Settings,
  Home,
  BarChart3,
  FileText,
  Calendar,
  MessageSquare,
  Download,
  RefreshCw,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Filter,
  Plus,
  ArrowUpDown,
  CalendarDays,
  CreditCard,
  MapPin,
  Phone,
  Mail,
  User,
  Bed,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Image as ImageIcon,
  Star,
  Wifi,
  Car,
  Coffee,
  Tv,
  Bath,
  Check,
  X,
  AlertTriangle,
} from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// Tipos de datos
interface Reserva {
  reserva_id: number;
  habitacion_id: number;
  huesped_id: number;
  usuario_id: number | null;
  fecha_entrada: string;
  fecha_salida: string;
  total_precio: string;
  estado_reserva: string;
  metodo_pago: string;
  notas: string | null;
  numero_habitacion: string;
  nombre_tipo: string;
  nombre_completo: string;
  email_huesped: string;
  telefono_huesped: string;
  documento_identidad: string;
  comentarios_adicionales: string | null;
  pago_id: number;
  comprobante_imagen: string;
  fecha_pago: string;
}

// Función para obtener el badge del estado de reserva con diseño mejorado
const getEstadoBadge = (estado: string) => {
  switch (estado.toLowerCase()) {
    case "pago confirmado":
      return (
        <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 px-3 py-1.5 font-medium">
          <CheckCircle className="w-3 h-3 mr-1.5" />
          Pago Confirmado
        </Badge>
      );
    case "pago por confirmar":
      return (
        <Badge className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 px-3 py-1.5 font-medium">
          <AlertCircle className="w-3 h-3 mr-1.5" />
          Pago Por Confirmar
        </Badge>
      );
    case "pago rechazado":
      return (
        <Badge className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100 px-3 py-1.5 font-medium">
          <XCircle className="w-3 h-3 mr-1.5" />
          Pago Rechazado
        </Badge>
      );
    // Mantener los estados anteriores para compatibilidad
    case "confirmada":
      return (
        <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 px-3 py-1.5 font-medium">
          <CheckCircle className="w-3 h-3 mr-1.5" />
          Confirmada
        </Badge>
      );
    case "pendiente":
      return (
        <Badge className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 px-3 py-1.5 font-medium">
          <AlertCircle className="w-3 h-3 mr-1.5" />
          Pendiente
        </Badge>
      );
    case "cancelada":
      return (
        <Badge className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100 px-3 py-1.5 font-medium">
          <XCircle className="w-3 h-3 mr-1.5" />
          Cancelada
        </Badge>
      );
    case "completada":
      return (
        <Badge className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 px-3 py-1.5 font-medium">
          <CheckCircle className="w-3 h-3 mr-1.5" />
          Completada
        </Badge>
      );
    default:
      return (
        <Badge variant="outline" className="px-3 py-1.5 font-medium">
          {estado}
        </Badge>
      );
  }
};


// Función para obtener el badge del método de pago con diseño mejorado y nuevos métodos
const getMetodoPagoBadge = (metodo: string) => {
  switch (metodo.toLowerCase()) {
    case "transferencia":
      return (
        <Badge className="bg-red-50 text-red-700 border-red-200 px-3 py-1.5 font-medium">
          <CreditCard className="w-3 h-3 mr-1.5" />
          Transferencia
        </Badge>
      );
    case "pago_movil":
      return (
        <Badge className="bg-purple-50 text-purple-700 border-purple-200 px-3 py-1.5 font-medium">
          <Phone className="w-3 h-3 mr-1.5" />
          Pago Móvil
        </Badge>
      );
    case "efectivo":
      return (
        <Badge className="bg-green-50 text-green-700 border-green-200 px-3 py-1.5 font-medium">
          <DollarSign className="w-3 h-3 mr-1.5" />
          Efectivo
        </Badge>
      );
    case "tarjeta":
      return (
        <Badge className="bg-gray-50 text-gray-700 border-gray-200 px-3 py-1.5 font-medium">
          <CreditCard className="w-3 h-3 mr-1.5" />
          Tarjeta
        </Badge>
      );
    case "zelle":
      return (
        <Badge className="bg-blue-50 text-blue-700 border-blue-200 px-3 py-1.5 font-medium">
          <DollarSign className="w-3 h-3 mr-1.5" />
          Zelle
        </Badge>
      );
    case "cripto":
    case "crypto":
      return (
        <Badge className="bg-orange-50 text-orange-700 border-orange-200 px-3 py-1.5 font-medium">
          <CreditCard className="w-3 h-3 mr-1.5" />
          Cripto
        </Badge>
      );
    case "paypal":
      return (
        <Badge className="bg-indigo-50 text-indigo-700 border-indigo-200 px-3 py-1.5 font-medium">
          <CreditCard className="w-3 h-3 mr-1.5" />
          PayPal
        </Badge>
      );
    case "binance":
      return (
        <Badge className="bg-yellow-50 text-yellow-700 border-yellow-200 px-3 py-1.5 font-medium">
          <CreditCard className="w-3 h-3 mr-1.5" />
          Binance
        </Badge>
      );
    default:
      return (
        <Badge variant="outline" className="px-3 py-1.5 font-medium">
          <CreditCard className="w-3 h-3 mr-1.5" />
          {metodo}
        </Badge>
      );
  }
};

// Componente para cambiar estado de reserva
const CambiarEstadoReserva = ({
  reserva,
  onEstadoCambiado
}: {
  reserva: Reserva;
  onEstadoCambiado: () => void;
}) => {
  const [loading, setLoading] = useState(false);

  const cambiarEstado = async (nuevoEstado: string) => {
    try {
      setLoading(true);

      const response = await fetch('http://localhost:3000/api/reservaHabitacion/estado', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reserva_id: reserva.reserva_id,
          nuevo_estado: nuevoEstado
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Mostrar mensaje de éxito sin toast
        alert(`Estado cambiado a ${nuevoEstado} exitosamente`);
        onEstadoCambiado();
      } else {
        // Mostrar mensaje de error sin toast
        alert(`Error al cambiar el estado: ${data.message || 'Ha ocurrido un error inesperado.'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error de conexión: No se pudo conectar con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  const getEstadoIcon = (estado: string) => {
    switch (estado.toLowerCase()) {
      case 'pago confirmado':
        return <CheckCircle className="h-4 w-4 text-emerald-600" />;
      case 'pago por confirmar':
        return <AlertCircle className="h-4 w-4 text-amber-600" />;
      case 'pago rechazado':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getEstadoColor = (estado: string) => {
    switch (estado.toLowerCase()) {
      case 'pago confirmado':
        return 'text-emerald-600 bg-emerald-50 hover:bg-emerald-100';
      case 'pago por confirmar':
        return 'text-amber-600 bg-amber-50 hover:bg-amber-100';
      case 'pago rechazado':
        return 'text-red-600 bg-red-50 hover:bg-red-100';
      default:
        return 'text-gray-600 bg-gray-50 hover:bg-gray-100';
    }
  };

  // Función para obtener el color del botón de confirmación
  const getButtonColor = (estado: string) => {
    switch (estado.toLowerCase()) {
      case 'pago confirmado':
        return 'bg-emerald-600 hover:bg-emerald-700';
      case 'pago por confirmar':
        return 'bg-amber-600 hover:bg-amber-700';
      case 'pago rechazado':
        return 'bg-red-600 hover:bg-red-700';
      default:
        return 'bg-gray-600 hover:bg-gray-700';
    }
  };

  // Función para obtener el badge del estado actualizada
  const getEstadoBadgeLocal = (estado: string) => {
    switch (estado.toLowerCase()) {
      case "pago confirmado":
        return (
          <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 px-3 py-1.5 font-medium">
            <CheckCircle className="w-3 h-3 mr-1.5" />
            Pago Confirmado
          </Badge>
        );
      case "pago por confirmar":
        return (
          <Badge className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 px-3 py-1.5 font-medium">
            <AlertCircle className="w-3 h-3 mr-1.5" />
            Pago Por Confirmar
          </Badge>
        );
      case "pago rechazado":
        return (
          <Badge className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100 px-3 py-1.5 font-medium">
            <XCircle className="w-3 h-3 mr-1.5" />
            Pago Rechazado
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="px-3 py-1.5 font-medium">
            {estado}
          </Badge>
        );
    }
  };

  const estados = ['Pago Por Confirmar', 'Pago Confirmado', 'Pago Rechazado'];
  const estadosDisponibles = estados.filter(estado => estado.toLowerCase() !== reserva.estado_reserva.toLowerCase());

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 px-3 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg">
          <Edit className="h-4 w-4 mr-1" />
          Cambiar Estado
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 rounded-xl shadow-xl border-0 bg-white/95 backdrop-blur-sm">
        <div className="px-4 py-3 border-b border-gray-100">
          <p className="text-sm font-semibold text-gray-900">Cambiar Estado</p>
          <p className="text-xs text-gray-500">Reserva #{reserva.reserva_id}</p>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-xs text-gray-500">Estado actual:</span>
            {getEstadoBadgeLocal(reserva.estado_reserva)}
          </div>
        </div>
        <div className="py-2">
          {estadosDisponibles.map((estado) => (
            <AlertDialog key={estado}>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem
                  className={`py-3 px-4 rounded-lg m-1 cursor-pointer ${getEstadoColor(estado)}`}
                  onSelect={(e) => e.preventDefault()}
                >
                  <div className="flex items-center gap-3 w-full">
                    {getEstadoIcon(estado)}
                    <div className="flex-1">
                      <span className="font-medium">{estado}</span>
                    </div>
                  </div>
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogContent className="rounded-2xl border-0 shadow-2xl max-w-md">
                <AlertDialogHeader>
                  <AlertDialogTitle className="flex items-center gap-3 text-xl">
                    {getEstadoIcon(estado)}
                    <span>Confirmar Cambio de Estado</span>
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-base leading-relaxed">
                    <div className="space-y-3 mt-4">
                      <div className="bg-gray-50 p-4 rounded-xl">
                        <p className="text-sm text-gray-600 mb-2">
                          <strong>Reserva:</strong> #{reserva.reserva_id}
                        </p>
                        <p className="text-sm text-gray-600 mb-2">
                          <strong>Huésped:</strong> {reserva.nombre_completo}
                        </p>
                        <p className="text-sm text-gray-600">
                          <strong>Habitación:</strong> {reserva.numero_habitacion}
                        </p>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-700">Estado actual:</span>
                          {getEstadoBadgeLocal(reserva.estado_reserva)}
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                          <ArrowUpDown className="h-4 w-4" />
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-700">Nuevo estado:</span>
                          {getEstadoBadgeLocal(estado)}
                        </div>
                      </div>

                      <p className="text-gray-600">
                        ¿Estás seguro de que deseas cambiar el estado de esta reserva a{" "}
                        <span className={`font-semibold ${getEstadoColor(estado).split(' ')[0]}`}>
                          {estado}
                        </span>?
                      </p>
                    </div>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="gap-3 mt-6">
                  <AlertDialogCancel className="rounded-xl px-6 hover:bg-gray-100">
                    Cancelar
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => cambiarEstado(estado)}
                    disabled={loading}
                    className={`rounded-xl px-6 ${getButtonColor(estado)}`}
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Cambiando...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        {getEstadoIcon(estado)}
                        <span>Confirmar Cambio</span>
                      </div>
                    )}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// Componente para mostrar detalles de la reserva completamente responsivo con tema rojo
const DetallesReservaModal = ({ reserva }: { reserva: Reserva }) => {
  const fechaEntrada = new Date(reserva.fecha_entrada);
  const fechaSalida = new Date(reserva.fecha_salida);
  const fechaPago = new Date(reserva.fecha_pago);

  // Calcular noches
  const noches = Math.ceil((fechaSalida.getTime() - fechaEntrada.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 px-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg">
          <Eye className="h-4 w-4 mr-1" />
          <span className="hidden sm:inline">Ver Detalles</span>
          <span className="sm:hidden">Ver</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-[95vw] h-[95vh] max-h-[95vh] sm:w-[90vw] sm:max-w-[90vw] lg:w-[85vw] lg:max-w-[85vw] xl:w-[80vw] xl:max-w-[80vw] overflow-hidden p-0 bg-gradient-to-br from-slate-50 to-gray-100">
        {/* Header del Modal - Responsivo con tema rojo */}
        <div className="relative bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 text-white p-3 sm:p-4 lg:p-6">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <DialogHeader>
              <DialogTitle className="text-lg sm:text-xl lg:text-2xl font-bold flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                  <Bed className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <div className="flex-1">
                  <span>Reserva #{reserva.reserva_id}</span>
                  <div className="text-sm sm:text-base font-normal text-red-100 mt-1">
                    Habitación {reserva.numero_habitacion} • {reserva.nombre_tipo}
                  </div>
                </div>
              </DialogTitle>
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-3">
                {getEstadoBadge(reserva.estado_reserva)}
                <div className="flex items-center gap-2 text-red-100">
                  <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="font-medium text-sm sm:text-base">{noches} {noches === 1 ? 'noche' : 'noches'}</span>
                </div>
                <div className="flex items-center gap-2 text-red-100">
                  <DollarSign className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="font-bold text-lg sm:text-xl text-white">${parseFloat(reserva.total_precio).toLocaleString()}</span>
                </div>
              </div>
            </DialogHeader>
          </div>

          {/* Decorative elements - Ocultos en móvil */}
          <div className="hidden sm:block absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="hidden sm:block absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
        </div>

        {/* Content - Layout responsivo con tema rojo */}
        <div className="p-3 sm:p-4 lg:p-6 overflow-y-auto max-h-[calc(95vh-120px)] sm:max-h-[calc(95vh-140px)] lg:max-h-[calc(95vh-150px)]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">

            {/* Columna 1: Información de la Reserva y Fechas */}
            <div className="space-y-3 sm:space-y-4">
              {/* Timeline de la Reserva */}
              <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-red-50">
                <CardHeader className="bg-gradient-to-r from-red-50 to-rose-50 border-b pb-2 sm:pb-3">
                  <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                    <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-lg bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center">
                      <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                    </div>
                    <span className="hidden sm:inline">Timeline de la Reserva</span>
                    <span className="sm:hidden">Timeline</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 sm:p-4">
                  <div className="space-y-3 sm:space-y-4">
                    {/* Fecha de Entrada */}
                    <div className="flex items-start gap-2 sm:gap-3">
                      <div className="flex-shrink-0">
                        <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-md">
                          <CalendarDays className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                          <h4 className="font-bold text-green-700 text-xs sm:text-sm">Check-in</h4>
                          <Badge className="bg-green-100 text-green-700 text-xs px-2 py-1 w-fit">Entrada</Badge>
                        </div>
                        <p className="text-xs sm:text-sm font-semibold text-gray-900">
                          {fechaEntrada.toLocaleDateString('es-ES', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </p>
                        <p className="text-xs text-gray-500">15:00 PM</p>
                      </div>
                    </div>

                    {/* Línea de conexión */}
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-8 sm:w-10 flex justify-center">
                        <div className="w-0.5 h-4 sm:h-6 bg-gradient-to-b from-green-300 to-red-300"></div>
                      </div>
                      <div className="flex-1 text-center">
                        <div className="bg-gradient-to-r from-red-50 to-rose-50 rounded-lg p-2 border">
                          <p className="text-xs font-medium text-gray-600">Duración</p>
                          <p className="text-base sm:text-lg font-bold text-red-600">{noches}</p>
                          <p className="text-xs text-gray-500">{noches === 1 ? 'noche' : 'noches'}</p>
                        </div>
                      </div>
                    </div>

                    {/* Fecha de Salida */}
                    <div className="flex items-start gap-2 sm:gap-3">
                      <div className="flex-shrink-0">
                        <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gradient-to-br from-red-400 to-rose-500 flex items-center justify-center shadow-md">
                          <CalendarDays className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                          <h4 className="font-bold text-red-700 text-xs sm:text-sm">Check-out</h4>
                          <Badge className="bg-red-100 text-red-700 text-xs px-2 py-1 w-fit">Salida</Badge>
                        </div>
                        <p className="text-xs sm:text-sm font-semibold text-gray-900">
                          {fechaSalida.toLocaleDateString('es-ES', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </p>
                        <p className="text-xs text-gray-500">12:00 PM</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Información de la Habitación */}
              <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-red-50">
                <CardHeader className="bg-gradient-to-r from-red-50 to-rose-50 border-b pb-2 sm:pb-3">
                  <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                    <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-lg bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center">
                      <Bed className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                    </div>
                    <span className="hidden sm:inline">Detalles de la Habitación</span>
                    <span className="sm:hidden">Habitación</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 sm:p-4">
                  <div className="space-y-3 sm:space-y-4">
                    {/* Número de Habitación */}
                    <div className="text-center bg-gradient-to-r from-red-500 to-rose-600 rounded-xl p-3 sm:p-4 text-white">
                      <p className="text-xs font-medium opacity-90 mb-1">Habitación</p>
                      <p className="text-2xl sm:text-3xl font-bold mb-1">{reserva.numero_habitacion}</p>
                      <p className="text-xs sm:text-sm font-medium opacity-90">{reserva.nombre_tipo}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                      <div className="bg-white p-2 sm:p-3 rounded-lg border shadow-sm">
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-1">ID Habitación</p>
                        <p className="font-mono text-xs sm:text-sm font-bold text-red-600">#{reserva.habitacion_id}</p>
                      </div>
                      <div className="bg-white p-2 sm:p-3 rounded-lg border shadow-sm">
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Precio/Noche</p>
                        <p className="text-xs sm:text-sm font-bold text-green-600">${(parseFloat(reserva.total_precio) / noches).toLocaleString()}</p>
                      </div>
                    </div>

                    {/* Amenidades */}
                    <div>
                      <p className="text-xs font-semibold text-gray-600 uppercase mb-2">Amenidades</p>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center gap-2 bg-white p-2 rounded-lg border text-xs">
                          <Wifi className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />
                          <span>WiFi</span>
                          <div className="flex items-center gap-2 bg-white p-2 rounded-lg border text-xs">
                            <Tv className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />
                            <span>TV</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Columna 2: Información del Huésped */}
            <div className="space-y-3 sm:space-y-4">
              <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-emerald-50">
                <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50 border-b pb-2 sm:pb-3">
                  <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                    <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-lg bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                      <User className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                    </div>
                    <span className="hidden sm:inline">Perfil del Huésped</span>
                    <span className="sm:hidden">Huésped</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 sm:p-4">
                  <div className="space-y-3 sm:space-y-4">
                    {/* Avatar y Nombre */}
                    <div className="text-center">
                      <Avatar className="h-12 w-12 sm:h-16 sm:w-16 mx-auto border-2 border-white shadow-lg">
                        <AvatarFallback className="text-sm sm:text-lg font-bold bg-gradient-to-br from-red-400 to-rose-500 text-white">
                          {reserva.nombre_completo.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 mt-2">{reserva.nombre_completo}</h3>
                      <p className="text-xs text-gray-500 font-medium">ID: #{reserva.huesped_id}</p>

                      {/* Rating */}
                      <div className="flex items-center justify-center gap-1 mt-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        ))}
                        <span className="text-xs text-gray-500 ml-1">VIP</span>
                      </div>
                    </div>

                    {/* Información de Contacto */}
                    <div className="space-y-2 sm:space-y-3">
                      <div className="bg-white p-2 sm:p-3 rounded-lg border shadow-sm">
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-lg bg-red-100 flex items-center justify-center">
                            <Mail className="h-3 w-3 sm:h-4 sm:w-4 text-red-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-gray-500 uppercase">Email</p>
                            <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">{reserva.email_huesped}</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white p-2 sm:p-3 rounded-lg border shadow-sm">
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-lg bg-green-100 flex items-center justify-center">
                            <Phone className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-xs font-semibold text-gray-500 uppercase">Teléfono</p>
                            <p className="text-xs sm:text-sm font-medium text-gray-900">{reserva.telefono_huesped}</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white p-2 sm:p-3 rounded-lg border shadow-sm">
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-lg bg-purple-100 flex items-center justify-center">
                            <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-xs font-semibold text-gray-500 uppercase">Documento</p>
                            <p className="text-xs sm:text-sm font-medium text-gray-900">{reserva.documento_identidad}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Comentarios */}
                    {reserva.comentarios_adicionales && (
                      <div className="bg-gradient-to-r from-red-50 to-rose-50 p-2 sm:p-3 rounded-lg border">
                        <p className="text-xs font-semibold text-gray-600 uppercase mb-2">Comentarios</p>
                        <p className="text-xs leading-relaxed text-gray-700">{reserva.comentarios_adicionales}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Columna 3: Información de Pago y Acciones */}
            <div className="space-y-3 sm:space-y-4">
              {/* Información de Pago */}
              <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-red-50">
                <CardHeader className="bg-gradient-to-r from-red-50 to-rose-50 border-b pb-2 sm:pb-3">
                  <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                    <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-lg bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center">
                      <CreditCard className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                    </div>
                    <span className="hidden sm:inline">Información de Pago</span>
                    <span className="sm:hidden">Pago</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 sm:p-4">
                  <div className="space-y-3 sm:space-y-4">
                    {/* Total Pagado */}
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-3 sm:p-4 text-white">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs font-medium opacity-90">Total Pagado</p>
                        <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                      </div>
                      <p className="text-xl sm:text-2xl font-bold mb-1">${parseFloat(reserva.total_precio).toLocaleString()}</p>
                      <div className="flex items-center gap-1 text-xs opacity-90">
                        <Clock className="h-3 w-3" />
                        <span>Pagado el {fechaPago.toLocaleDateString('es-ES')}</span>
                      </div>
                    </div>

                    {/* Detalles del Pago */}
                    <div className="space-y-2 sm:space-y-3">
                      <div className="bg-white p-2 sm:p-3 rounded-lg border shadow-sm">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-semibold text-gray-500 uppercase">ID de Pago</p>
                          <Badge variant="outline" className="font-mono text-xs">#{reserva.pago_id}</Badge>
                        </div>
                      </div>

                      <div className="bg-white p-2 sm:p-3 rounded-lg border shadow-sm">
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Método de Pago</p>
                        <div className="flex items-center justify-between">
                          {getMetodoPagoBadge(reserva.metodo_pago)}
                          <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
                        </div>
                      </div>

                      <div className="bg-white p-2 sm:p-3 rounded-lg border shadow-sm">
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Fecha y Hora</p>
                        <p className="text-xs sm:text-sm font-medium text-gray-900">
                          {fechaPago.toLocaleDateString('es-ES', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>

                    {/* Desglose */}
                    <div className="bg-gray-50 p-2 sm:p-3 rounded-lg border">
                      <p className="text-xs font-semibold text-gray-600 uppercase mb-2">Desglose</p>
                      <div className="space-y-1">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-gray-600">Precio/noche</span>
                          <span className="font-medium">${(parseFloat(reserva.total_precio) / noches).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-gray-600">{noches} {noches === 1 ? 'noche' : 'noches'}</span>
                          <span className="font-medium">${parseFloat(reserva.total_precio).toLocaleString()}</span>
                        </div>
                        <div className="border-t pt-1 mt-1">
                          <div className="flex justify-between items-center">
                            <span className="font-semibold text-gray-900 text-xs sm:text-sm">Total</span>
                            <span className="font-bold text-green-600 text-sm">${parseFloat(reserva.total_precio).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Comprobante */}
                    {reserva.comprobante_imagen && (
                      <div className="bg-white p-2 sm:p-3 rounded-lg border shadow-sm">
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Comprobante</p>
                        <div className="relative group">
                          <img
                            src={`http://localhost:3000${reserva.comprobante_imagen}`}
                            alt="Comprobante"
                            className="w-full h-24 sm:h-32 object-cover rounded-lg border cursor-pointer hover:shadow-md transition-all"
                            onClick={() => window.open(`http://localhost:3000${reserva.comprobante_imagen}`, '_blank')}
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all rounded-lg flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                                <Eye className="h-3 w-3 sm:h-4 sm:w-4 text-gray-700" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full mt-2 text-xs hover:bg-red-50 h-8"
                          onClick={() => window.open(`http://localhost:3000${reserva.comprobante_imagen}`, '_blank')}
                        >
                          <ImageIcon className="h-3 w-3 mr-1" />
                          <span className="hidden sm:inline">Ver Completa</span>
                          <span className="sm:hidden">Ver</span>
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

        
             
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Componente principal mejorado con tema rojo
export const ReservaHabitacionDashboard = () => {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("todos");

  // Cargar reservas
  const cargarReservas = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/api/reservahabitacion');
      const data = await response.json();

      if (data.success) {
        setReservas(data.data);
      } else {
        setError(data.message || 'Error al cargar las reservas');
      }
    } catch (error) {
      setError('Error de conexión al cargar las reservas');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarReservas();
  }, []);

  // Filtrar reservas
  const reservasFiltradas = reservas.filter(reserva => {
    const matchesSearch =
      reserva.nombre_completo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reserva.numero_habitacion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reserva.email_huesped.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reserva.documento_identidad.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reserva.reserva_id.toString().includes(searchTerm);

    const matchesEstado = filtroEstado === "todos" || reserva.estado_reserva.toLowerCase() === filtroEstado.toLowerCase();

    return matchesSearch && matchesEstado;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-rose-50">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="relative">
              <div className="h-16 w-16 rounded-full border-4 border-red-200 border-t-red-600 animate-spin mx-auto mb-4"></div>
            </div>
            <p className="text-lg font-medium text-gray-600">Cargando reservas...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-rose-50">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <p className="text-lg font-medium text-red-600 mb-4">{error}</p>
            <Button onClick={cargarReservas} className="bg-red-600 hover:bg-red-700">
              <RefreshCw className="h-4 w-4 mr-2" />
              Reintentar
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-rose-50">
      <header className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white shadow-2xl border-b-4 border-red-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo y título */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="h-14 w-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30 shadow-xl">
                  <BarChart3 className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 h-4 w-4 bg-yellow-400 rounded-full flex items-center justify-center">
                  <div className="h-2 w-2 bg-yellow-600 rounded-full animate-pulse"></div>
                </div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-2xl lg:text-3xl font-bold text-white">
                  Hotel Dashboard
                </h1>
                <p className="text-red-100 text-sm font-medium">
                  Sistema de Gestión Hotelera • Reservas
                </p>
              </div>
            </div>

            {/* Derecha - Controles */}
            <div className="flex items-center space-x-4">
              {/* Barra de búsqueda */}
              <div className="hidden md:block relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-red-300" />
                <input
                  type="search"
                  placeholder="Buscar reservas..."
                  className="h-12 w-64 lg:w-80 rounded-2xl border-0 bg-white/10 backdrop-blur-sm pl-12 pr-4 text-white placeholder:text-red-200 focus:outline-none focus:ring-2 focus:ring-white/30 focus:bg-white/20 transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Botón de búsqueda móvil */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden h-12 w-12 rounded-2xl bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/20"
              >
                <Search className="h-5 w-5" />
              </Button>

              {/* Notificaciones */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-12 w-12 rounded-2xl bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/20"
                >
                  <Bell className="h-5 w-5" />
                </Button>
                {reservas.filter(r => r.estado_reserva.toLowerCase() === 'pendiente').length > 0 && (
                  <div className="absolute -top-2 -right-2 h-6 w-6 bg-yellow-400 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-red-900">
                      {reservas.filter(r => r.estado_reserva.toLowerCase() === 'pendiente').length}
                    </span>
                  </div>
                )}
              </div>

              {/* Configuración */}
              <Button
                variant="ghost"
                size="icon"
                className="h-12 w-12 rounded-2xl bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/20"
              >
                <Settings className="h-5 w-5" />
              </Button>

              {/* Avatar del usuario */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-12 w-12 rounded-2xl bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 p-0">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-gradient-to-br from-red-500 to-rose-600 text-white font-bold text-sm">
                        R
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-400 rounded-full border-2 border-white"></div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 mt-2 rounded-2xl shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-900">Administrador</p>
                    <p className="text-xs text-gray-500">admin@hotel.com</p>
                  </div>
                  <DropdownMenuSeparator className="my-1" />
                  <DropdownMenuItem className="py-3 px-4 rounded-lg m-1 text-red-600">
                    <XCircle className="mr-3 h-4 w-4" />
                    Cerrar Sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Barra de navegación secundaria */}
          <div className="border-t border-white/20 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2 text-white/90">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    {new Date().toLocaleDateString('es-ES', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 px-4 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/20 text-xs"
                  onClick={cargarReservas}
                >
                  <RefreshCw className="h-3 w-3 mr-2" />
                  Actualizar
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Elementos decorativos */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-48 translate-x-48"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-32 -translate-x-32"></div>
        </div>
      </header>

      <div className="flex">
        {/* Contenido Principal */}
        <main className="flex-1 p-8">
          <div className="space-y-8 max-w-7xl mx-auto">
            {/* Header de la página mejorado con tema rojo */}
            <div className="flex items-center justify-between mb-8">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-lg">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                      Gestión de Reservas
                    </h2>
                    <p className="text-gray-500 text-lg font-medium">
                      Administra y supervisa todas las reservas de habitaciones
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Button size="default" className="h-11 px-6 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 shadow-lg">
                  <Plus className="h-4 w-4 mr-2" />
                  Nueva Reserva
                </Button>
              </div>
            </div>

            {/* Estadísticas mejoradas con tema rojo */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-red-50 hover:shadow-xl transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Total Reservas</CardTitle>
                  <div className="h-10 w-10 rounded-xl bg-red-100 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-red-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900">{reservas.length}</div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-amber-50 hover:shadow-xl transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Por Confirmar</CardTitle>
                  <div className="h-10 w-10 rounded-xl bg-amber-100 flex items-center justify-center">
                    <AlertCircle className="h-5 w-5 text-amber-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-amber-600">
                    {reservas.filter(r => r.estado_reserva.toLowerCase() === 'pago por confirmar').length}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Requieren confirmación</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-emerald-50 hover:shadow-xl transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Confirmadas</CardTitle>
                  <div className="h-10 w-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-emerald-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-emerald-600">
                    {reservas.filter(r => r.estado_reserva.toLowerCase() === 'pago confirmado').length}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Pagos confirmados</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-red-50 hover:shadow-xl transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Rechazadas</CardTitle>
                  <div className="h-10 w-10 rounded-xl bg-red-100 flex items-center justify-center">
                    <XCircle className="h-5 w-5 text-red-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-600">
                    {reservas.filter(r => r.estado_reserva.toLowerCase() === 'pago rechazado').length}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Pagos rechazados</p>
                </CardContent>
              </Card>
            </div>

            <Card className="border-0 shadow-xl bg-white">
              <CardHeader className="pb-6 border-b bg-gradient-to-r from-gray-50 to-red-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <Input
                        placeholder="Buscar por nombre, habitación, email..."
                        className="pl-12 w-96 h-12 rounded-xl border-gray-200 bg-white/80 backdrop-blur focus:bg-white focus:ring-red-500 transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="default" className="h-12 px-6 rounded-xl border-gray-200 bg-white/80 backdrop-blur hover:bg-white">
                          <Filter className="h-4 w-4 mr-2" />
                          Estado: {filtroEstado === "todos" ? "Todos" :
                            filtroEstado === "pago por confirmar" ? "Por Confirmar" :
                              filtroEstado === "pago confirmado" ? "Confirmado" :
                                filtroEstado === "pago rechazado" ? "Rechazado" : filtroEstado}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56 rounded-xl shadow-xl border-0">
                        <DropdownMenuItem onClick={() => setFiltroEstado("todos")} className="rounded-lg">
                          Todos los estados
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => setFiltroEstado("pago por confirmar")} className="rounded-lg">
                          <AlertCircle className="h-4 w-4 mr-2 text-amber-500" />
                          Pago Por Confirmar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setFiltroEstado("pago confirmado")} className="rounded-lg">
                          <CheckCircle className="h-4 w-4 mr-2 text-emerald-500" />
                          Pago Confirmado
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setFiltroEstado("pago rechazado")} className="rounded-lg">
                          <XCircle className="h-4 w-4 mr-2 text-red-500" />
                          Pago Rechazado
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <Button variant="ghost" size="default" className="h-12 px-6 rounded-xl hover:bg-gray-50" onClick={cargarReservas}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Actualizar
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="px-0 pb-0">
                {/* Tabla de reservas */}
                <div className="overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent bg-gradient-to-r from-gray-50 to-red-50 border-b-2">
                        <TableHead className="w-[100px] py-5 px-6 font-semibold text-gray-700">
                          <Button variant="ghost" className="h-auto p-0 font-semibold text-gray-700 hover:text-gray-900">
                            ID
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </Button>
                        </TableHead>
                        <TableHead className="py-5 px-6 font-semibold text-gray-700">
                          <Button variant="ghost" className="h-auto p-0 font-semibold text-gray-700 hover:text-gray-900">
                            Huésped
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </Button>
                        </TableHead>
                        <TableHead className="py-5 px-6 font-semibold text-gray-700">
                          <Button variant="ghost" className="h-auto p-0 font-semibold text-gray-700 hover:text-gray-900">
                            Habitación
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </Button>
                        </TableHead>
                        <TableHead className="py-5 px-6 font-semibold text-gray-700">
                          <Button variant="ghost" className="h-auto p-0 font-semibold text-gray-700 hover:text-gray-900">
                            Fechas
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </Button>
                        </TableHead>
                        <TableHead className="py-5 px-6 font-semibold text-gray-700">
                          <Button variant="ghost" className="h-auto p-0 font-semibold text-gray-700 hover:text-gray-900">
                            Estado
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </Button>
                        </TableHead>
                        <TableHead className="py-5 px-6 font-semibold text-gray-700">
                          <Button variant="ghost" className="h-auto p-0 font-semibold text-gray-700 hover:text-gray-900">
                            Pago
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </Button>
                        </TableHead>
                        <TableHead className="py-5 px-6 font-semibold text-gray-700">
                          <Button variant="ghost" className="h-auto p-0 font-semibold text-gray-700 hover:text-gray-900">
                            Total
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </Button>
                        </TableHead>
                        <TableHead className="text-right py-5 px-6 font-semibold text-gray-700">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {reservasFiltradas.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center py-16">
                            <div className="flex flex-col items-center gap-4">
                              <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
                                <Search className="h-8 w-8 text-gray-400" />
                              </div>
                              <div className="space-y-2">
                                <p className="text-xl font-semibold text-gray-600">No se encontraron reservas</p>
                                <p className="text-gray-400">
                                  {searchTerm || filtroEstado !== "todos"
                                    ? "Intenta ajustar los filtros de búsqueda"
                                    : "No hay reservas registradas en el sistema"}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : (
                        reservasFiltradas.map((reserva, index) => {
                          const fechaEntrada = new Date(reserva.fecha_entrada);
                          const fechaSalida = new Date(reserva.fecha_salida);
                          const noches = Math.ceil((fechaSalida.getTime() - fechaEntrada.getTime()) / (1000 * 60 * 60 * 24));

                          return (
                            <TableRow
                              key={reserva.reserva_id}
                              className="hover:bg-gradient-to-r hover:from-red-50/50 hover:to-rose-50/50 transition-all duration-200 border-b border-gray-100"
                            >
                              <TableCell className="font-medium py-6 px-6">
                                <div className="flex items-center gap-2">
                                  <div className="h-2 w-2 rounded-full bg-red-500"></div>
                                  <span className="text-sm font-mono bg-gray-100 px-3 py-1.5 rounded-lg font-semibold">
                                    #{reserva.reserva_id}
                                  </span>
                                </div>
                              </TableCell>

                              <TableCell className="py-6 px-6">
                                <div className="flex items-center gap-4">
                                  <Avatar className="h-12 w-12 border-2 border-white shadow-lg">
                                    <AvatarFallback className="text-sm font-semibold bg-gradient-to-br from-red-400 to-rose-500 text-white">
                                      {reserva.nombre_completo.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="space-y-1">
                                    <div className="font-semibold text-gray-900">{reserva.nombre_completo}</div>
                                    <div className="text-xs text-gray-500 flex items-center gap-1">
                                      <Mail className="h-3 w-3" />
                                      {reserva.email_huesped}
                                    </div>
                                    <div className="text-xs text-gray-500 flex items-center gap-1">
                                      <Phone className="h-3 w-3" />
                                      {reserva.telefono_huesped}
                                    </div>
                                  </div>
                                </div>
                              </TableCell>

                              <TableCell className="py-6 px-6">
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2">
                                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-red-100 to-rose-100 flex items-center justify-center">
                                      <Bed className="h-4 w-4 text-red-600" />
                                    </div>
                                    <span className="font-mono font-bold text-lg text-red-600">{reserva.numero_habitacion}</span>
                                  </div>
                                  <div className="text-sm text-gray-600 font-medium">
                                    {reserva.nombre_tipo}
                                  </div>
                                  <div className="text-xs text-gray-400">
                                    ID: #{reserva.habitacion_id}
                                  </div>
                                </div>
                              </TableCell>

                              <TableCell className="py-6 px-6">
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2 text-sm">
                                    <CalendarDays className="h-4 w-4 text-emerald-600" />
                                    <span className="text-emerald-600 font-semibold">
                                      {fechaEntrada.toLocaleDateString('es-ES', {
                                        month: 'short',
                                        day: 'numeric'
                                      })}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm">
                                    <CalendarDays className="h-4 w-4 text-red-600" />
                                    <span className="text-red-600 font-semibold">
                                      {fechaSalida.toLocaleDateString('es-ES', {
                                        month: 'short',
                                        day: 'numeric'
                                      })}
                                    </span>
                                  </div>
                                  <div className="text-xs text-gray-500 flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg">
                                    <Clock className="h-3 w-3" />
                                    {noches} {noches === 1 ? 'noche' : 'noches'}
                                  </div>
                                </div>
                              </TableCell>

                              <TableCell className="py-6 px-6">
                                {getEstadoBadge(reserva.estado_reserva)}
                              </TableCell>

                              <TableCell className="py-6 px-6">
                                <div className="space-y-2">
                                  {getMetodoPagoBadge(reserva.metodo_pago)}
                                  <div className="text-xs text-gray-400">
                                    {new Date(reserva.fecha_pago).toLocaleDateString('es-ES', {
                                      month: 'short',
                                      day: 'numeric',
                                      hour: '2-digit',
                                      minute: '2-digit'
                                    })}
                                  </div>
                                </div>
                              </TableCell>

                              <TableCell className="py-6 px-6">
                                <div className="text-right space-y-1">
                                  <div className="text-xl font-bold text-green-600">
                                    ${parseFloat(reserva.total_precio).toLocaleString()}
                                  </div>
                                  <div className="text-xs text-gray-400">
                                    ${(parseFloat(reserva.total_precio) / noches).toLocaleString()}/noche
                                  </div>
                                </div>
                              </TableCell>

                              <TableCell className="text-right py-6 px-6">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-10 w-10 p-0 rounded-xl hover:bg-gray-100">
                                      <span className="sr-only">Abrir menú</span>
                                      <MoreHorizontal className="h-5 w-5" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end" className="w-56 rounded-xl shadow-xl border-0">
                                    <DropdownMenuItem asChild>
                                      <DetallesReservaModal reserva={reserva} />
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                      <CambiarEstadoReserva
                                        reserva={reserva}
                                        onEstadoCambiado={cargarReservas}
                                      />
                                    </DropdownMenuItem>                                    
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          );
                        })
                      )}
                    </TableBody>
                  </Table>
                </div>

                {/* Paginación mejorada con tema rojo */}
                <div className="flex items-center justify-between p-6 border-t bg-gradient-to-r from-gray-50 to-red-50">
                  <div className="text-sm text-gray-600">
                    Mostrando <span className="font-semibold text-gray-900">1-{reservasFiltradas.length}</span> de{" "}
                    <span className="font-semibold text-gray-900">{reservas.length}</span> reservas
                    {(searchTerm || filtroEstado !== "todos") && (
                      <span className="ml-2 text-red-600 font-medium">
                        (filtrado de {reservas.length} total)
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" disabled className="h-10 px-4 rounded-xl">
                      Anterior
                    </Button>
                    <div className="flex items-center space-x-1">
                      <Button variant="default" size="sm" className="h-10 w-10 rounded-xl bg-red-600 hover:bg-red-700">
                        1
                      </Button>
                      <Button variant="outline" size="sm" className="h-10 w-10 rounded-xl" disabled>
                        2
                      </Button>
                      <Button variant="outline" size="sm" className="h-10 w-10 rounded-xl" disabled>
                        3
                      </Button>
                    </div>
                    <Button variant="outline" size="sm" disabled className="h-10 px-4 rounded-xl">
                      Siguiente
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

