import React from 'react';
import { CreditCard } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface CreditCardFormProps {
  paymentDetails: any;
  setPaymentDetails: (details: any) => void;
  errors: { [key: string]: string };
}

const CreditCardForm: React.FC<CreditCardFormProps> = ({
  paymentDetails,
  setPaymentDetails,
  errors
}) => {
  return (
    <div className="space-y-4">
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
        <div className="flex items-center space-x-2">
          <CreditCard className="h-5 w-5 text-orange-600" />
          <span className="font-medium text-orange-900">Información de la Tarjeta</span>
        </div>
        <p className="text-sm text-orange-700 mt-1">
          Ingresa los datos de tu tarjeta de crédito o débito.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div>
          <Label htmlFor="cardNumber">Número de Tarjeta</Label>
          <Input
            id="cardNumber"
            placeholder="1234 5678 9012 3456"
            value={paymentDetails.cardNumber}
            onChange={(e) => {
              const value = e.target.value
                .replace(/\s/g, "")
                .replace(/(.{4})/g, "$1 ")
                .trim()
                .slice(0, 19);
              setPaymentDetails((prev: any) => ({
                ...prev,
                cardNumber: value,
              }));
            }}
            className={errors.cardNumber ? "border-red-500" : ""}
          />
          {errors.cardNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="expiryDate">Vencimiento</Label>
            <Input
              id="expiryDate"
              placeholder="MM/AA"
              value={paymentDetails.expiryDate}
              onChange={(e) => {
                const value = e.target.value
                  .replace(/\D/g, "")
                  .replace(/(\d{2})(\d)/, "$1/$2")
                  .slice(0, 5);
                setPaymentDetails((prev: any) => ({
                  ...prev,
                  expiryDate: value,
                }));
              }}
              className={errors.expiryDate ? "border-red-500" : ""}
            />
            {errors.expiryDate && (
              <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>
            )}
          </div>

          <div>
            <Label htmlFor="cvv">CVV</Label>
            <Input
              id="cvv"
              placeholder="123"
              value={paymentDetails.cvv}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "").slice(0, 4);
                setPaymentDetails((prev: any) => ({
                  ...prev,
                  cvv: value,
                }));
              }}
              className={errors.cvv ? "border-red-500" : ""}
            />
            {errors.cvv && (
              <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="cardName">Nombre en la Tarjeta</Label>
          <Input
            id="cardName"
            placeholder="Juan Pérez"
            value={paymentDetails.cardName}
            onChange={(e) =>
              setPaymentDetails((prev: any) => ({
                ...prev,
                cardName: e.target.value,
              }))
            }
            className={errors.cardName ? "border-red-500" : ""}
          />
          {errors.cardName && (
            <p className="text-red-500 text-sm mt-1">{errors.cardName}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreditCardForm;
