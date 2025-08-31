"use client"

import { useCallback } from "react"
import { Calendar } from "@/components/ui/calendar"
import { es } from "date-fns/locale"
import { isDateDisabled } from "../../utils"
import type { ReservedPeriod } from "../../types"

interface BookingCalendarProps {
  selected: Date | undefined
  onSelect: (date: Date | undefined) => void
  unavailableDates: string[]
  reservedPeriods: ReservedPeriod[]
  checkIn?: Date
  checkOut?: Date
  disabled?: (date: Date) => boolean
}

// Tipo para los modificadores del calendario
interface DateModifiers {
  [key: string]: Date[]
}

interface ModifiersClassNames {
  [key: string]: string
}

export const BookingCalendar = ({
  selected,
  onSelect,
  unavailableDates,
  reservedPeriods,
  checkIn,
  checkOut,
  disabled,
}: BookingCalendarProps) => {
  const getDateModifiers = useCallback(() => {
    const modifiers: DateModifiers = {}
    const modifiersClassNames: ModifiersClassNames = {}

    // CSS personalizado para colores
    const customStyles = `
      .calendar-reserved-confirmed {
        background-color: #ef4444 !important;
        color: white !important;
        font-weight: 600 !important;
        border-radius: 6px !important;
      }
      .calendar-reserved-pending {
        background-color: #f59e0b !important;
        color: #92400e !important;
        font-weight: 500 !important;
        border-radius: 6px !important;
      }
      .calendar-reserved-checkout {
        background-color: #3b82f6 !important;
        color: white !important;
        font-weight: 500 !important;
        border-radius: 6px !important;
      }
      .calendar-selected-checkin {
        background-color: #10b981 !important;
        color: white !important;
        font-weight: 700 !important;
        border-radius: 6px !important;
        box-shadow: 0 0 0 2px #6ee7b7 !important;
      }
      .calendar-selected-checkout {
        background-color: #059669 !important;
        color: white !important;
        font-weight: 700 !important;
        border-radius: 6px !important;
        box-shadow: 0 0 0 2px #6ee7b7 !important;
      }
      .calendar-selected-range {
        background-color: #d1fae5 !important;
        color: #065f46 !important;
        border-radius: 6px !important;
      }
      .calendar-unavailable {
        background-color: #fca5a5 !important;
        color: #991b1b !important;
        text-decoration: line-through !important;
        border-radius: 6px !important;
      }
    `

    // Inyectar estilos si no existen
    if (!document.getElementById("calendar-custom-styles")) {
      const styleElement = document.createElement("style")
      styleElement.id = "calendar-custom-styles"
      styleElement.textContent = customStyles
      document.head.appendChild(styleElement)
    }

    // Marcar fechas no disponibles
    const unavailableDateObjects = unavailableDates.map((dateStr) => new Date(dateStr))
    if (unavailableDateObjects.length > 0) {
      modifiers.unavailable = unavailableDateObjects
      modifiersClassNames.unavailable = "calendar-unavailable"
    }

    // Marcar períodos reservados
    reservedPeriods.forEach((period, index) => {
      const startDate = new Date(period.start)
      const endDate = new Date(period.end)
      const reservedDates: Date[] = []

      for (let date = new Date(startDate); date < endDate; date.setDate(date.getDate() + 1)) {
        reservedDates.push(new Date(date))
      }

      const modifierKey = `reserved_${index}`
      modifiers[modifierKey] = reservedDates

      switch (period.status) {
        case "confirmed":
          modifiersClassNames[modifierKey] = "calendar-reserved-confirmed"
          break
        case "pending":
          modifiersClassNames[modifierKey] = "calendar-reserved-pending"
          break
        case "checkout":
          modifiersClassNames[modifierKey] = "calendar-reserved-checkout"
          break
        default:
          modifiersClassNames[modifierKey] = "calendar-reserved-confirmed"
      }
    })

    // Marcar fechas seleccionadas
    if (checkIn) {
      modifiers.checkIn = [checkIn]
      modifiersClassNames.checkIn = "calendar-selected-checkin"
    }

    if (checkOut) {
      modifiers.checkOut = [checkOut]
      modifiersClassNames.checkOut = "calendar-selected-checkout"
    }

    // Marcar rango seleccionado
    if (checkIn && checkOut) {
      const rangeDates: Date[] = []
      for (let date = new Date(checkIn); date < checkOut; date.setDate(date.getDate() + 1)) {
        if (date.getTime() !== checkIn.getTime()) {
          rangeDates.push(new Date(date))
        }
      }
      if (rangeDates.length > 0) {
        modifiers.selectedRange = rangeDates
        modifiersClassNames.selectedRange = "calendar-selected-range"
      }
    }

    return { modifiers, modifiersClassNames }
  }, [unavailableDates, reservedPeriods, checkIn, checkOut])

  const { modifiers, modifiersClassNames } = getDateModifiers()

  return (
    <Calendar
      mode="single"
      selected={selected}
      onSelect={onSelect}
      disabled={disabled || ((date: Date) => isDateDisabled(date, unavailableDates, reservedPeriods))}
      modifiers={modifiers}
      modifiersClassNames={modifiersClassNames}
      initialFocus
      locale={es}
      className="flex-shrink-0"
    />
  )
}
