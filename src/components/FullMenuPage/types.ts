import { LucideIcon } from "lucide-react";

export interface Dish {
  id: string;
  name: string;
  description: string;
  price: string;
  time: string;
  rating: number;
  isVegetarian?: boolean;
  isGlutenFree?: boolean;
  isSpicy?: boolean;
  image: string;
}

export interface Category {
  name: string;
  description: string;
  dishes: Dish[];
}

export interface Menu {
  id: string;
  name: string;
  subtitle: string;
  icon: LucideIcon;
  color: string;
  iconColor: string;
  categories: Category[];
}

export interface MenuData {
  [key: string]: Menu;
}

export type FilterType = "all" | "vegetarian" | "glutenFree" | "spicy";

export interface FilterOption {
  key: FilterType;
  label: string;
  icon?: LucideIcon;
}
