import { Separator } from "@/components/ui/separator"
import { CalendarIcon, Users } from "lucide-react"
import { formatDate } from "../../utils/dateUtils"
import type { BookingCalculations } from "../../types/booking.types"

interface BookingSummaryProps {
  checkIn: Date | undefined
  checkOut: Date | undefined
  guests: string
  bookingCalculations: BookingCalculations
}

export const BookingSummary = ({ checkIn, checkOut, guests, bookingCalculations }: BookingSummaryProps) => {
  return (
    <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-4 mb-6 border border-red-100">
      <h3 className="font-semibold text-red-800 mb-3">Resumen de tu Reserva</h3>
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
            {guests} huéspedes • {bookingCalculations.nights} {bookingCalculations.nights === 1 ? "noche" : "noches"}
          </span>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-red-600">${bookingCalculations.total}</p>
          <p className="text-xs text-gray-500">Total</p>
        </div>
      </div>
    </div>
  )
}
