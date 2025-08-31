import { PAYMENT_METHODS } from "../../constants";
import type { PaymentDetails } from "../../types";
import {
  CreditCardForm,
  BankTransferForm,
  MobilePaymentForm,
  CryptoForm,
  ZelleForm,
} from "../PaymentForms";

interface PaymentDetailsFormProps {
  selectedPaymentMethod: string;
  paymentDetails: PaymentDetails;
  setPaymentDetails: (details: PaymentDetails) => void;
  errors: { [key: string]: string };
}

export const PaymentDetailsForm = ({
  selectedPaymentMethod,
  paymentDetails,
  setPaymentDetails,
  errors,
}: PaymentDetailsFormProps) => {
  const selectedMethod = PAYMENT_METHODS.find(
    (m) => m.id === selectedPaymentMethod
  );

  if (!selectedMethod) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className={`${selectedMethod.color} text-white rounded-full p-3`}>
          {selectedMethod.icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold">{selectedMethod.name}</h3>
          <p className="text-sm text-gray-600">
            Completa los detalles de tu pago
          </p>
        </div>
      </div>

      {selectedPaymentMethod === "tarjeta" && (
        <CreditCardForm
          paymentDetails={paymentDetails}
          setPaymentDetails={setPaymentDetails}
          errors={errors}
        />
      )}

      {selectedPaymentMethod === "transferencia" && (
        <BankTransferForm
          paymentDetails={paymentDetails}
          setPaymentDetails={setPaymentDetails}
          errors={errors}
        />
      )}

      {selectedPaymentMethod === "pago-movil" && (
        <MobilePaymentForm
          paymentDetails={paymentDetails}
          setPaymentDetails={setPaymentDetails}
          errors={errors}
        />
      )}

      {selectedPaymentMethod === "crypto" && (
        <CryptoForm
          paymentDetails={paymentDetails}
          setPaymentDetails={setPaymentDetails}
          errors={errors}
        />
      )}

      {selectedPaymentMethod === "zelle" && (
        <ZelleForm
          paymentDetails={paymentDetails}
          setPaymentDetails={setPaymentDetails}
          errors={errors}
        />
      )}
    </div>
  );
};
