"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"
import type { PaymentDetails } from "../../types"
import { BANK_INFO } from "../../constants"
import { copyToClipboard } from "../../utils"

interface ZelleFormProps {
  paymentDetails: PaymentDetails
  setPaymentDetails: (details: PaymentDetails) => void
  errors: { [key: string]: string }
}

export const ZelleForm = ({ paymentDetails, setPaymentDetails, errors }: ZelleFormProps) => {
  return (
    <div className="space-y-4">
      <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
        <h4 className="font-semibold text-indigo-800 mb-2">Datos para Zelle</h4>
        <div className="space-y-2 text-sm text-indigo-700">
          <div className="flex justify-between">
            <span className="font-medium">Email:</span>
            <span>{BANK_INFO.zelle.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Nombre:</span>
            <span>{BANK_INFO.zelle.name}</span>
          </div>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-3 w-full bg-transparent"
          onClick={() => {
            copyToClipboard(BANK_INFO.zelle.email)
            alert("Email de Zelle copiado al portapapeles")
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
            setPaymentDetails({
              ...paymentDetails,
              zelleEmail: e.target.value,
            })
          }
          className={errors.zelleEmail ? "border-red-500" : ""}
        />
        {errors.zelleEmail && <p className="text-sm text-red-500 mt-1">{errors.zelleEmail}</p>}
      </div>

      <div>
        <Label htmlFor="zelleReference">Número de Confirmación *</Label>
        <Input
          id="zelleReference"
          placeholder="Número de confirmación de Zelle"
          value={paymentDetails.zelleReference}
          onChange={(e) =>
            setPaymentDetails({
              ...paymentDetails,
              zelleReference: e.target.value,
            })
          }
          className={errors.zelleReference ? "border-red-500" : ""}
        />
        {errors.zelleReference && <p className="text-sm text-red-500 mt-1">{errors.zelleReference}</p>}
        <p className="text-xs text-gray-500 mt-1">Número que aparece en tu confirmación de Zelle</p>
      </div>
    </div>
  )
}
