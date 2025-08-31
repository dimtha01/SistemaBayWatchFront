import type { PaymentDetails, GuestInfo } from "../types/booking.types"

export const validatePaymentDetails = (
  paymentMethod: string,
  paymentDetails: PaymentDetails,
): { [key: string]: string } => {
  const errors: { [key: string]: string } = {}

  switch (paymentMethod) {
    case "tarjeta":
      if (!paymentDetails.cardNumber.trim()) {
        errors.cardNumber = "Número de tarjeta requerido"
      } else if (paymentDetails.cardNumber.replace(/\s/g, "").length < 16) {
        errors.cardNumber = "Número de tarjeta inválido"
      }
      if (!paymentDetails.expiryDate.trim()) {
        errors.expiryDate = "Fecha de vencimiento requerida"
      } else if (!/^\d{2}\/\d{2}$/.test(paymentDetails.expiryDate)) {
        errors.expiryDate = "Formato inválido (MM/AA)"
      }
      if (!paymentDetails.cvv.trim()) {
        errors.cvv = "CVV requerido"
      } else if (paymentDetails.cvv.length < 3) {
        errors.cvv = "CVV inválido"
      }
      if (!paymentDetails.cardName.trim()) {
        errors.cardName = "Nombre en la tarjeta requerido"
      }
      break

    case "transferencia":
      if (!paymentDetails.transferenceReference.trim()) {
        errors.transferenceReference = "Referencia de transferencia requerida"
      } else if (paymentDetails.transferenceReference.length < 6) {
        errors.transferenceReference = "Referencia debe tener al menos 6 caracteres"
      }
      break

    case "pago-movil":
      if (!paymentDetails.pagoMovilPhone.trim()) {
        errors.pagoMovilPhone = "Teléfono requerido"
      } else if (!/^(0414|0424|0412|0416|0426)\d{7}$/.test(paymentDetails.pagoMovilPhone.replace(/[-\s]/g, ""))) {
        errors.pagoMovilPhone = "Formato de teléfono inválido"
      }
      if (!paymentDetails.pagoMovilReference.trim()) {
        errors.pagoMovilReference = "Referencia requerida"
      } else if (paymentDetails.pagoMovilReference.length < 6) {
        errors.pagoMovilReference = "Referencia debe tener al menos 6 caracteres"
      }
      break

    case "crypto":
      if (!paymentDetails.cryptoWallet.trim()) {
        errors.cryptoWallet = "Dirección de wallet requerida"
      } else if (paymentDetails.cryptoWallet.length < 26) {
        errors.cryptoWallet = "Dirección de wallet inválida"
      }
      if (!paymentDetails.cryptoTxHash.trim()) {
        errors.cryptoTxHash = "Hash de transacción requerido"
      }
      break

    case "zelle":
      if (!paymentDetails.zelleEmail.trim()) {
        errors.zelleEmail = "Email de Zelle requerido"
      } else if (!/\S+@\S+\.\S+/.test(paymentDetails.zelleEmail)) {
        errors.zelleEmail = "Email inválido"
      }
      if (!paymentDetails.zelleReference.trim()) {
        errors.zelleReference = "Referencia de Zelle requerida"
      }
      break
  }

  return errors
}

export const validateGuestInfo = (guestInfo: GuestInfo, termsAccepted: boolean): { [key: string]: string } => {
  const errors: { [key: string]: string } = {}

  if (!guestInfo.name.trim()) {
    errors.name = "El nombre es requerido"
  }
  if (!guestInfo.email.trim()) {
    errors.email = "El email es requerido"
  } else if (!/\S+@\S+\.\S+/.test(guestInfo.email)) {
    errors.email = "Email inválido"
  }
  if (!guestInfo.phone.trim()) {
    errors.phone = "El teléfono es requerido"
  }
  if (!guestInfo.document.trim()) {
    errors.document = "El documento es requerido"
  }
  if (!termsAccepted) {
    errors.terms = "Debes aceptar los términos y condiciones"
  }

  return errors
}
