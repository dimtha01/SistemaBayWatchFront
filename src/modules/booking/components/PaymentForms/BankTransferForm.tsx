"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import type { PaymentDetails } from "../../types";
import { BANK_INFO } from "../../constants";
import { copyToClipboard } from "../../utils";

interface BankTransferFormProps {
  paymentDetails: PaymentDetails;
  setPaymentDetails: (details: PaymentDetails) => void;
  errors: { [key: string]: string };
}

export const BankTransferForm = ({
  paymentDetails,
  setPaymentDetails,
  errors,
}: BankTransferFormProps) => {
  return (
    <div className="space-y-4">
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h4 className="font-semibold text-blue-800 mb-2">
          Datos Bancarios para Transferencia
        </h4>
        <div className="space-y-2 text-sm text-blue-700">
          <div className="flex justify-between">
            <span className="font-medium">Banco:</span>
            <span>{BANK_INFO.transferencia.bank}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Cuenta:</span>
            <span>{BANK_INFO.transferencia.account}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Titular:</span>
            <span>{BANK_INFO.transferencia.holder}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">RIF:</span>
            <span>{BANK_INFO.transferencia.rif}</span>
          </div>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-3 w-full bg-transparent"
          onClick={() => {
            copyToClipboard(BANK_INFO.transferencia.account);
            alert("Número de cuenta copiado al portapapeles");
          }}
        >
          <Copy className="h-4 w-4 mr-2" />
          Copiar Número de Cuenta
        </Button>
      </div>

      <div>
        <Label htmlFor="transferenceReference">Número de Referencia *</Label>
        <Input
          id="transferenceReference"
          placeholder="Ej: 123456789"
          value={paymentDetails.transferenceReference}
          onChange={(e) =>
            setPaymentDetails({
              ...paymentDetails,
              transferenceReference: e.target.value,
            })
          }
          className={errors.transferenceReference ? "border-red-500" : ""}
        />
        {errors.transferenceReference && (
          <p className="text-sm text-red-500 mt-1">
            {errors.transferenceReference}
          </p>
        )}
        <p className="text-xs text-gray-500 mt-1">
          Número de referencia que aparece en tu comprobante
        </p>
      </div>
    </div>
  );
};
