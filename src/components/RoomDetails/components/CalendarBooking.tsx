import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface CalendarBookingProps {
  selectedDate: Date | undefined;
  onDateSelect: (date: Date | undefined) => void;
  isDateDisabled: (date: Date) => boolean;
  modifiers: any;
  modifiersClassNames: any;
  dateErrors: { [key: string]: string };
  showCalendar: boolean;
  setShowCalendar: (show: boolean) => void;
  label: string;
  errorKey: string;
  legend: React.ReactNode;
}

const CalendarBooking = ({
  selectedDate,
  onDateSelect,
  isDateDisabled,
  modifiers,
  modifiersClassNames,
  dateErrors,
  showCalendar,
  setShowCalendar,
  label,
  errorKey,
  legend,
}: CalendarBookingProps) => {
  return (
    <div>
      <Label>{label}</Label>
      <Popover open={showCalendar} onOpenChange={setShowCalendar}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={`w-full justify-start text-left font-normal ${
              !selectedDate ? "text-muted-foreground" : ""
            } ${dateErrors[errorKey] ? "border-red-500" : ""}`}
          >
            {selectedDate ? format(selectedDate, "dd/MM/yyyy") : "Seleccionar fecha"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="flex">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={onDateSelect}
              disabled={isDateDisabled}
              modifiers={modifiers}
              modifiersClassNames={{
                ...modifiersClassNames,
                selected: "bg-green-500 text-white font-bold", // Estilo para la fecha seleccionada
                selectedRange: "bg-green-100 text-green-800", // Estilo para el rango seleccionado
              }}
              initialFocus
              locale={es}
              className="flex-shrink-0"
            />
            {legend}
          </div>
        </PopoverContent>
      </Popover>
      {dateErrors[errorKey] && (
        <div className="mt-1 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-600 flex items-start space-x-2">
          <span>{dateErrors[errorKey]}</span>
        </div>
      )}
    </div>
  );
};

export default CalendarBooking;
