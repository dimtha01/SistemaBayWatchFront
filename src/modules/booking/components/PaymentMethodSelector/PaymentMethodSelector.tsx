"use client"
import { Badge } from "@/components/ui/badge"
import { CheckCircle } from "lucide-react"
import type { PaymentMethod } from "../../types"
import { PAYMENT_METHODS } from "../../constants"

interface PaymentMethodSelectorProps {
  selectedPaymentMethod: string
  onPaymentMethodSelect: (methodId: string) => void
}

export const PaymentMethodSelector = ({ selectedPaymentMethod, onPaymentMethodSelect }: PaymentMethodSelectorProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Selecciona tu método de pago</h3>
      <div className="grid gap-4">
        {PAYMENT_METHODS.map((method: PaymentMethod) => (
          <button
            key={method.id}
            onClick={() => onPaymentMethodSelect(method.id)}
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
              <div className={`${method.color} text-white rounded-full p-3 flex-shrink-0`}>{method.icon}</div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h4 className="font-semibold text-gray-900">{method.name}</h4>
                  {method.id === "efectivo" && (
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      Recomendado
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1">{method.description}</p>
              </div>
              {selectedPaymentMethod === method.id && <CheckCircle className="h-6 w-6 text-red-500 flex-shrink-0" />}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
