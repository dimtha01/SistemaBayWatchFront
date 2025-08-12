export interface Room {
  id: string;
  name: string;
  price: number;
  image: string;
  capacity: number;
  bedType: "King" | "Queen" | "Twin";
  view: "Ocean" | "City" | "Garden" | "Mountain";
  amenities: string[];
}

export interface RoomCardProps extends Room {}
