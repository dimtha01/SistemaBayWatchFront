import { Waves, Building, Leaf, Mountain } from "lucide-react";
import type { ViewIconsMap, ViewLabelsMap } from "../types/room.types";

export const VIEW_ICONS: ViewIconsMap = {
  Ocean: <Waves className="w-4 h-4 text-[#020659]" />,
  City: <Building className="w-4 h-4 text-[#020659]" />,
  Garden: <Leaf className="w-4 h-4 text-[#020659]" />,
  Mountain: <Mountain className="w-4 h-4 text-[#020659]" />,
  Pool: <Waves className="w-4 h-4 text-[#020659]" />,
};

export const VIEW_LABELS: ViewLabelsMap = {
  Ocean: "al océano",
  City: "a la ciudad",
  Garden: "al jardín",
  Mountain: "a la montaña",
  Pool: "a la piscina",
};

export const DEFAULT_BOOKING_CONFIG = {
  maxGuests: 4,
  minNights: 1,
  maxNights: 30,
};

export const DEFAULT_UNAVAILABLE_DATES = [
  "2024-12-24",
  "2024-12-25",
  "2024-12-31",
  "2025-01-01",
  "2025-02-14",
  "2025-04-18",
  "2025-04-19",
  "2025-04-20",
  "2025-05-01",
  "2025-07-05",
  "2025-07-24",
  "2025-10-12",
];

export const DEFAULT_RESERVED_PERIODS = [
  {
    start: "2024-12-15",
    end: "2024-12-23",
    reason: "Reserva confirmada - Temporada navideña",
  },
  {
    start: "2024-12-26",
    end: "2024-12-30",
    reason: "Reserva confirmada - Fin de año",
  },
];
