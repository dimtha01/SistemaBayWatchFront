export interface FlashDeal {
  id: string;
  name: string;
  originalPrice: number;
  discountedPrice: number;
  image: string;
  description: string;
}

export interface FlashDealCardProps extends FlashDeal {}
