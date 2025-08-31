"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import type { PaymentDetails } from "../../types";
import { BANK_INFO } from "../../constants";
import { copyToClipboard } from "../../utils";

interface MobilePaymentFormProps {
  paymentDetails: PaymentDetails;
  setPaymentDetails: (details: PaymentDetails) => void;
  errors: { [key: string]: string };
}

export const MobilePaymentForm = ({
  paymentDetails,
  setPaymentDetails,
  errors,
}: MobilePaymentFormProps) => {
  return (
    <div className="space-y-4">
      <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
        <h4 className="font-semibold text-purple-800 mb-2">
          Datos para Pago Móvil
        </h4>
        <div className="space-y-2 text-sm text-purple-700">
          <div className="flex justify-between">
            <span className="font-medium">Banco:</span>
            <span>{BANK_INFO.pagoMovil.bank}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Teléfono:</span>
            <span>{BANK_INFO.pagoMovil.phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Cédula:</span>
            <span>{BANK_INFO.pagoMovil.cedula}</span>
          </div>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-3 w-full bg-transparent"
          onClick={() => {
            copyToClipboard("04141234567");
            alert("Teléfono copiado al portapapeles");
          }}
        >
          <Copy className="h-4 w-4 mr-2" />
          Copiar Teléfono
        </Button>
      </div>

      <div>
        <Label htmlFor="pagoMovilPhone">Tu Teléfono *</Label>
        <Input
          id="pagoMovilPhone"
          placeholder="0414-123-4567"
          value={paymentDetails.pagoMovilPhone}
          onChange={(e) => {
            let value = e.target.value.replace(/\D/g, "");
            if (value.length <= 11) {
              if (value.length >= 4) {
                value =
                  value.substring(0, 4) +
                  "-" +
                  value.substring(4, 7) +
                  "-" +
                  value.substring(7, 11);
              }
              setPaymentDetails({
                ...paymentDetails,
                pagoMovilPhone: value,
              });
            }
          }}
          className={errors.pagoMovilPhone ? "border-red-500" : ""}
        />
        {errors.pagoMovilPhone && (
          <p className="text-sm text-red-500 mt-1">{errors.pagoMovilPhone}</p>
        )}
      </div>

      <div>
        <Label htmlFor="pagoMovilReference">Número de Referencia *</Label>
        <Input
          id="pagoMovilReference"
          placeholder="Ej: 123456789"
          value={paymentDetails.pagoMovilReference}
          onChange={(e) =>
            setPaymentDetails({
              ...paymentDetails,
              pagoMovilReference: e.target.value,
            })
          }
          className={errors.pagoMovilReference ? "border-red-500" : ""}
        />
        {errors.pagoMovilReference && (
          <p className="text-sm text-red-500 mt-1">
            {errors.pagoMovilReference}
          </p>
        )}
        <p className="text-xs text-gray-500 mt-1">
          Número de referencia del pago móvil
        </p>
      </div>
    </div>
  );
};
