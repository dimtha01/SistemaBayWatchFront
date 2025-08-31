import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import type { ReservedPeriod } from "../../types"

interface CalendarLegendProps {
  reservedPeriods: ReservedPeriod[]
  isMobile?: boolean
}

export const CalendarLegend = ({ reservedPeriods, isMobile = false }: CalendarLegendProps) => {
  const today = new Date()

  const upcomingReservations = reservedPeriods
    .filter((period) => new Date(period.end) >= today)
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
    .slice(0, isMobile ? 2 : 3)

  if (isMobile) {
    return (
      <div className="p-3 bg-gray-50 border-t">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">Leyenda:</h4>
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

        {upcomingReservations.length > 0 && (
          <div className="border-t border-gray-200 pt-3">
            <h5 className="text-sm font-semibold text-gray-700 mb-2">Próximas Reservas:</h5>
            <div className="space-y-2 max-h-24 overflow-y-auto">
              {upcomingReservations.map((reservation, index) => (
                <div key={index} className="text-xs p-2 bg-white rounded border border-gray-200">
                  <div className="font-medium text-gray-800">
                    {format(new Date(reservation.start), "dd/MM", { locale: es })} -{" "}
                    {format(new Date(reservation.end), "dd/MM", { locale: es })}
                  </div>
                  {reservation.guestName && <div className="text-gray-500 truncate">{reservation.guestName}</div>}
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
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="ml-4 flex-shrink-0 w-48">
      <div className="p-4 bg-gray-50 rounded-lg border">
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

        {upcomingReservations.length > 0 && (
          <div className="border-t border-gray-200 pt-4">
            <h5 className="text-sm font-semibold text-gray-700 mb-3">Próximas Reservas:</h5>
            <div className="space-y-3 max-h-32 overflow-y-auto">
              {upcomingReservations.map((reservation, index) => (
                <div key={index} className="text-xs p-2 bg-white rounded border border-gray-200">
                  <div className="font-medium text-gray-800 mb-1">
                    {format(new Date(reservation.start), "dd/MM", { locale: es })} -{" "}
                    {format(new Date(reservation.end), "dd/MM", { locale: es })}
                  </div>
                  {reservation.guestName && <div className="text-gray-600 truncate mb-1">{reservation.guestName}</div>}
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
        )}
      </div>
    </div>
  )
}
