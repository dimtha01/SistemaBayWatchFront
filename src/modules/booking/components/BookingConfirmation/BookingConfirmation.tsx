"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle, Share2, Download } from "lucide-react"
import type { BookingData } from "../../types"
import { formatDate } from "../../utils"
import { copyToClipboard } from "../../utils"
import { generateBookingReceipt } from "../../services"

interface BookingConfirmationProps {
  bookingData: BookingData
  paymentMethodName: string
  onClose: () => void
}

export const BookingConfirmation = ({ bookingData, paymentMethodName, onClose }: BookingConfirmationProps) => {
  const handleShare = () => {
    const bookingDetails = `
Reserva Confirmada - Hotel Paradise

ID de Reserva: ${bookingData.id}
Check-in: ${formatDate(new Date(bookingData.checkIn))}
Check-out: ${formatDate(new Date(bookingData.checkOut))}
Huéspedes: ${bookingData.guests}
Noches: ${bookingData.nights}
Total: $${bookingData.total}
Método de Pago: ${paymentMethodName}

Huésped Principal:
Nombre: ${bookingData.guestInfo?.name}
Email: ${bookingData.guestInfo?.email}
Teléfono: ${bookingData.guestInfo?.phone}
    `.trim()

    if (navigator.share) {
      navigator.share({
        title: "Confirmación de Reserva",
        text: bookingDetails,
      })
    } else {
      copyToClipboard(bookingDetails)
      alert("Detalles copiados al portapapeles")
    }
  }

  const handleDownload = () => {
    const element = document.createElement("a")
    const bookingDetails = generateBookingReceipt(bookingData, paymentMethodName)

    const file = new Blob([bookingDetails], {
      type: "text/plain",
    })
    element.href = URL.createObjectURL(file)
    element.download = `reserva-${bookingData.id}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="text-center space-y-6">
      <div className="flex justify-center">
        <div className="bg-green-100 rounded-full p-6">
          <CheckCircle className="h-16 w-16 text-green-600" />
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-green-800 mb-2">¡Reserva Confirmada!</h3>
        <p className="text-gray-600 mb-4">Tu reserva ha sido procesada exitosamente</p>
        <div className="bg-gray-50 rounded-lg p-4 text-left">
          <h4 className="font-semibold text-gray-800 mb-2">Detalles de la Reserva:</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <p>
              <strong>ID de Reserva:</strong> {bookingData.id}
            </p>
            <p>
              <strong>Check-in:</strong> {formatDate(new Date(bookingData.checkIn))}
            </p>
            <p>
              <strong>Check-out:</strong> {formatDate(new Date(bookingData.checkOut))}
            </p>
            <p>
              <strong>Huéspedes:</strong> {bookingData.guests}
            </p>
            <p>
              <strong>Total:</strong> ${bookingData.total}
            </p>
            <p>
              <strong>Método de Pago:</strong> {paymentMethodName}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button onClick={handleShare} variant="outline" className="flex-1 bg-transparent">
          <Share2 className="h-4 w-4 mr-2" />
          Compartir
        </Button>

        <Button onClick={handleDownload} variant="outline" className="flex-1 bg-transparent">
          <Download className="h-4 w-4 mr-2" />
          Descargar
        </Button>
      </div>

      <Button onClick={onClose} className="w-full bg-red-600 hover:bg-red-700 text-white py-3">
        Cerrar
      </Button>
    </div>
  )
}
