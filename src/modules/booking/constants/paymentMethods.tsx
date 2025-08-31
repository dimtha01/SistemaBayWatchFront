import { CreditCard, DollarSign, Smartphone, Building2, Bitcoin, Send } from "lucide-react"
import type { PaymentMethod } from "../types"

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "efectivo",
    name: "Efectivo",
    icon: <DollarSign className="h-6 w-6" />,
    description: "Pago en efectivo al momento del check-in",
    color: "bg-green-500",
    available: true,
  },
  {
    id: "transferencia",
    name: "Transferencia Bancaria",
    icon: <Building2 className="h-6 w-6" />,
    description: "Transferencia a cuenta bancaria",
    color: "bg-blue-500",
    available: true,
  },
  {
    id: "pago-movil",
    name: "Pago Móvil",
    icon: <Smartphone className="h-6 w-6" />,
    description: "Pago móvil interbancario",
    color: "bg-purple-500",
    available: true,
  },
  {
    id: "tarjeta",
    name: "Tarjeta de Crédito/Débito",
    icon: <CreditCard className="h-6 w-6" />,
    description: "Visa, Mastercard, American Express",
    color: "bg-orange-500",
    available: true,
  },
  {
    id: "crypto",
    name: "Criptomonedas",
    icon: <Bitcoin className="h-6 w-6" />,
    description: "Bitcoin, USDT, Ethereum",
    color: "bg-yellow-500",
    available: true,
  },
  {
    id: "zelle",
    name: "Zelle",
    icon: <Send className="h-6 w-6" />,
    description: "Transferencia vía Zelle",
    color: "bg-indigo-500",
    available: true,
  },
]

export const BANK_INFO = {
  transferencia: {
    bank: "Banco de Venezuela",
    account: "0102-0123-45-1234567890",
    holder: "Hotel Paradise C.A.",
    rif: "J-12345678-9",
  },
  pagoMovil: {
    bank: "0102 - Banco de Venezuela",
    phone: "0414-123-4567",
    cedula: "V-12345678",
  },
  crypto: {
    bitcoin: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
    usdt: "TQn9Y2khEsLJW1ChVWFMSMeRDow5KcbLSE",
    ethereum: "0x742d35Cc6634C0532925a3b8D4020a2fDf0e9f",
  },
  zelle: {
    email: "pagos@hotelparadise.com",
    name: "Hotel Paradise LLC",
  },
}
