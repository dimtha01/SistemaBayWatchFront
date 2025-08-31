"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Shield } from "lucide-react"
import type { PaymentDetails } from "../../types"

interface CreditCardFormProps {
  paymentDetails: PaymentDetails
  setPaymentDetails: (details: PaymentDetails) => void
  errors: { [key: string]: string }
}

export const CreditCardForm = ({ paymentDetails, setPaymentDetails, errors }: CreditCardFormProps) => {
  return (
    <div className="space-y-4">
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <div className="flex items-center space-x-2 mb-2">
          <Shield className="h-5 w-5 text-blue-600" />
          <span className="text-sm font-medium text-blue-800">Pago Seguro SSL</span>
        </div>
        <p className="text-xs text-blue-700">Tus datos están protegidos con encriptación de 256 bits</p>
      </div>

      <div>
        <Label htmlFor="cardNumber">Número de Tarjeta *</Label>
        <Input
          id="cardNumber"
          placeholder="1234 5678 9012 3456"
          value={paymentDetails.cardNumber}
          onChange={(e) => {
            // Formatear número de tarjeta con espacios
            let value = e.target.value.replace(/\s/g, "").replace(/\D/g, "")
            value = value.replace(/(\d{4})(?=\d)/g, "$1 ")
            if (value.length <= 19) {
              // 16 dígitos + 3 espacios
              setPaymentDetails({
                ...paymentDetails,
                cardNumber: value,
              })
            }
          }}
          className={errors.cardNumber ? "border-red-500" : ""}
          maxLength={19}
        />
        {errors.cardNumber && <p className="text-sm text-red-500 mt-1">{errors.cardNumber}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="expiryDate">Fecha de Vencimiento *</Label>
          <Input
            id="expiryDate"
            placeholder="MM/AA"
            value={paymentDetails.expiryDate}
            onChange={(e) => {
              let value = e.target.value.replace(/\D/g, "")
              if (value.length >= 2) {
                value = value.substring(0, 2) + "/" + value.substring(2, 4)
              }
              if (value.length <= 5) {
                setPaymentDetails({
                  ...paymentDetails,
                  expiryDate: value,
                })
              }
            }}
            className={errors.expiryDate ? "border-red-500" : ""}
            maxLength={5}
          />
          {errors.expiryDate && <p className="text-sm text-red-500 mt-1">{errors.expiryDate}</p>}
        </div>

        <div>
          <Label htmlFor="cvv">CVV *</Label>
          <Input
            id="cvv"
            placeholder="123"
            type="password"
            value={paymentDetails.cvv}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "")
              if (value.length <= 4) {
                setPaymentDetails({
                  ...paymentDetails,
                  cvv: value,
                })
              }
            }}
            className={errors.cvv ? "border-red-500" : ""}
            maxLength={4}
          />
          {errors.cvv && <p className="text-sm text-red-500 mt-1">{errors.cvv}</p>}
        </div>
      </div>

      <div>
        <Label htmlFor="cardName">Nombre en la Tarjeta *</Label>
        <Input
          id="cardName"
          placeholder="JUAN CARLOS PEREZ"
          value={paymentDetails.cardName}
          onChange={(e) =>
            setPaymentDetails({
              ...paymentDetails,
              cardName: e.target.value.toUpperCase(),
            })
          }
          className={errors.cardName ? "border-red-500" : ""}
        />
        {errors.cardName && <p className="text-sm text-red-500 mt-1">{errors.cardName}</p>}
      </div>
    </div>
  )
}
