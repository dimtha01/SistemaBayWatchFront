import { format } from "date-fns";
import { es } from "date-fns/locale";

export const formatDate = (date: Date | undefined): string => {
  if (!date) return "";
  return format(date, "dd 'de' MMMM, yyyy", { locale: es });
};

export const formatDateShort = (date: Date | undefined): string => {
  if (!date) return "";
  return format(date, "dd/MM/yyyy");
};

export const isDateDisabled = (
  date: Date,
  unavailableDates: string[],
  reservedPeriods: Array<{ start: string; end: string }>
): boolean => {
  const today = new Date();

  // Fechas pasadas
  if (date < today) return true;

  const dateString = format(date, "yyyy-MM-dd");

  // Fechas individuales no disponibles
  if (unavailableDates.includes(dateString)) return true;

  // Verificar períodos reservados
  return reservedPeriods.some((period) => {
    const startDate = new Date(period.start);
    const endDate = new Date(period.end);
    return date >= startDate && date < endDate;
  });
};
