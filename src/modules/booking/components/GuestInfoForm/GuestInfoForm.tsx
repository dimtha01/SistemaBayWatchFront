"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Users } from "lucide-react"
import type { GuestInfo } from "../../types"

interface GuestInfoFormProps {
  guestInfo: GuestInfo
  setGuestInfo: (info: GuestInfo) => void
  errors: { [key: string]: string }
  termsAccepted: boolean
  setTermsAccepted: (accepted: boolean) => void
}

export const GuestInfoForm = ({
  guestInfo,
  setGuestInfo,
  errors,
  termsAccepted,
  setTermsAccepted,
}: GuestInfoFormProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="bg-red-100 text-red-600 rounded-full p-3">
          <Users className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Información del Huésped Principal</h3>
          <p className="text-sm text-gray-600">Datos necesarios para la reserva</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="guestName">Nombre Completo *</Label>
          <Input
            id="guestName"
            placeholder="Ej: Juan Carlos Pérez"
            value={guestInfo.name}
            onChange={(e) => setGuestInfo({ ...guestInfo, name: e.target.value })}
            className={errors.name ? "border-red-500" : ""}
          />
          {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
        </div>

        <div>
          <Label htmlFor="guestEmail">Correo Electrónico *</Label>
          <Input
            id="guestEmail"
            type="email"
            placeholder="ejemplo@correo.com"
            value={guestInfo.email}
            onChange={(e) => setGuestInfo({ ...guestInfo, email: e.target.value })}
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
        </div>

        <div>
          <Label htmlFor="guestPhone">Número de Teléfono *</Label>
          <Input
            id="guestPhone"
            placeholder="Ej: +58 414-123-4567"
            value={guestInfo.phone}
            onChange={(e) => setGuestInfo({ ...guestInfo, phone: e.target.value })}
            className={errors.phone ? "border-red-500" : ""}
          />
          {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
        </div>

        <div>
          <Label htmlFor="guestDocument">Documento de Identidad *</Label>
          <Input
            id="guestDocument"
            placeholder="Ej: V-12345678 o E-12345678"
            value={guestInfo.document}
            onChange={(e) => setGuestInfo({ ...guestInfo, document: e.target.value })}
            className={errors.document ? "border-red-500" : ""}
          />
          {errors.document && <p className="text-sm text-red-500 mt-1">{errors.document}</p>}
        </div>

        <div>
          <Label htmlFor="guestNotes">Notas Adicionales (Opcional)</Label>
          <Input
            id="guestNotes"
            placeholder="Solicitudes especiales, alergias, etc."
            value={guestInfo.notes}
            onChange={(e) => setGuestInfo({ ...guestInfo, notes: e.target.value })}
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
            <label htmlFor="termsAccepted" className="text-sm text-gray-700 flex-1">
              Acepto los <span className="text-red-600 underline cursor-pointer">términos y condiciones</span> del
              hotel, así como las{" "}
              <span className="text-red-600 underline cursor-pointer">políticas de cancelación</span>.
            </label>
          </div>
          {errors.terms && <p className="text-sm text-red-500 mt-2 ml-6">{errors.terms}</p>}
        </div>
      </div>
    </div>
  )
}
