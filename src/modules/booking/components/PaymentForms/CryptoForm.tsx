"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import type { PaymentDetails } from "../../types";
import { BANK_INFO } from "../../constants";
import { copyToClipboard } from "../../utils";

interface CryptoFormProps {
  paymentDetails: PaymentDetails;
  setPaymentDetails: (details: PaymentDetails) => void;
  errors: { [key: string]: string };
}

export const CryptoForm = ({
  paymentDetails,
  setPaymentDetails,
  errors,
}: CryptoFormProps) => {
  return (
    <div className="space-y-4">
      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
        <h4 className="font-semibold text-yellow-800 mb-2">
          Direcciones de Wallets
        </h4>
        <div className="space-y-3 text-sm text-yellow-700">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="font-medium">Bitcoin (BTC):</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  copyToClipboard(BANK_INFO.crypto.bitcoin);
                  alert("Dirección Bitcoin copiada");
                }}
              >
                <Copy className="h-3 w-3" />
              </Button>
            </div>
            <p className="text-xs bg-white p-2 rounded border break-all">
              {BANK_INFO.crypto.bitcoin}
            </p>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="font-medium">USDT (TRC20):</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  copyToClipboard(BANK_INFO.crypto.usdt);
                  alert("Dirección USDT copiada");
                }}
              >
                <Copy className="h-3 w-3" />
              </Button>
            </div>
            <p className="text-xs bg-white p-2 rounded border break-all">
              {BANK_INFO.crypto.usdt}
            </p>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="font-medium">Ethereum (ETH):</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  copyToClipboard(BANK_INFO.crypto.ethereum);
                  alert("Dirección Ethereum copiada");
                }}
              >
                <Copy className="h-3 w-3" />
              </Button>
            </div>
            <p className="text-xs bg-white p-2 rounded border break-all">
              {BANK_INFO.crypto.ethereum}
            </p>
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="cryptoWallet">Tu Dirección de Wallet *</Label>
        <Input
          id="cryptoWallet"
          placeholder="Dirección de tu wallet desde donde enviaste"
          value={paymentDetails.cryptoWallet}
          onChange={(e) =>
            setPaymentDetails({
              ...paymentDetails,
              cryptoWallet: e.target.value,
            })
          }
          className={errors.cryptoWallet ? "border-red-500" : ""}
        />
        {errors.cryptoWallet && (
          <p className="text-sm text-red-500 mt-1">{errors.cryptoWallet}</p>
        )}
      </div>

      <div>
        <Label htmlFor="cryptoTxHash">Hash de Transacción *</Label>
        <Input
          id="cryptoTxHash"
          placeholder="Hash de la transacción enviada"
          value={paymentDetails.cryptoTxHash}
          onChange={(e) =>
            setPaymentDetails({
              ...paymentDetails,
              cryptoTxHash: e.target.value,
            })
          }
          className={errors.cryptoTxHash ? "border-red-500" : ""}
        />
        {errors.cryptoTxHash && (
          <p className="text-sm text-red-500 mt-1">{errors.cryptoTxHash}</p>
        )}
        <p className="text-xs text-gray-500 mt-1">
          ID de transacción que aparece en tu wallet
        </p>
      </div>
    </div>
  );
};
