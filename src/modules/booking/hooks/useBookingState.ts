"use client"

import { useState, useCallback } from "react"
import type { PaymentDetails, GuestInfo, PaymentStep } from "../types"

export const useBookingState = () => {
  const [checkIn, setCheckIn] = useState<Date | undefined>()
  const [checkOut, setCheckOut] = useState<Date | undefined>()
  const [guests, setGuests] = useState("2")
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("")
  const [showCheckInCalendar, setShowCheckInCalendar] = useState(false)
  const [showCheckOutCalendar, setShowCheckOutCalendar] = useState(false)
  const [paymentStep, setPaymentStep] = useState<PaymentStep>("method")
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [bookingId, setBookingId] = useState("")
  const [dateErrors, setDateErrors] = useState<{ [key: string]: string }>({})
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [isValidBooking, setIsValidBooking] = useState(false)

  const [guestInfo, setGuestInfo] = useState<GuestInfo>({
    name: "",
    email: "",
    phone: "",
    document: "",
    notes: "",
  })

  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
    transferenceReference: "",
    pagoMovilPhone: "",
    pagoMovilReference: "",
    cryptoWallet: "",
    cryptoTxHash: "",
    zelleEmail: "",
    zelleReference: "",
  })

  const resetBooking = useCallback(() => {
    setCheckIn(undefined)
    setCheckOut(undefined)
    setGuests("2")
    setGuestInfo({ name: "", email: "", phone: "", document: "", notes: "" })
    setPaymentDetails({
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardName: "",
      transferenceReference: "",
      pagoMovilPhone: "",
      pagoMovilReference: "",
      cryptoWallet: "",
      cryptoTxHash: "",
      zelleEmail: "",
      zelleReference: "",
    })
    setShowPaymentModal(false)
    setPaymentStep("method")
    setSelectedPaymentMethod("")
    setErrors({})
    setDateErrors({})
    setBookingId("")
    setTermsAccepted(false)
    setIsValidBooking(false)
  }, [])

  return {
    // State
    checkIn,
    checkOut,
    guests,
    showPaymentModal,
    selectedPaymentMethod,
    showCheckInCalendar,
    showCheckOutCalendar,
    paymentStep,
    errors,
    bookingId,
    dateErrors,
    termsAccepted,
    isValidBooking,
    guestInfo,
    paymentDetails,
    // Setters
    setCheckIn,
    setCheckOut,
    setGuests,
    setShowPaymentModal,
    setSelectedPaymentMethod,
    setShowCheckInCalendar,
    setShowCheckOutCalendar,
    setPaymentStep,
    setErrors,
    setBookingId,
    setDateErrors,
    setTermsAccepted,
    setIsValidBooking,
    setGuestInfo,
    setPaymentDetails,
    // Actions
    resetBooking,
  }
}
