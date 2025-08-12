export interface Zone {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  isFavorite?: boolean;
}

export interface ZoneCardProps extends Zone {}
