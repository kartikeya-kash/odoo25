export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
  avatar?: string;
  joinedDate: string;
}

export interface ClothingItem {
  id: string;
  title: string;
  brand: string;
  size: string;
  condition: 'Like New' | 'Good' | 'Fair';
  category: 'Tops' | 'Bottoms' | 'Dresses' | 'Outerwear' | 'Shoes' | 'Accessories';
  color: string;
  description: string;
  images: string[];
  price: number;
  availableForSwap: boolean;
  availableForPurchase: boolean;
  ownerId: string;
  ownerName: string;
  sustainabilityScore: number;
  materials: string[];
  createdAt: string;
}

export interface SwapRequest {
  id: string;
  fromUserId: string;
  toUserId: string;
  fromItemId: string;
  toItemId: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  message?: string;
  createdAt: string;
}

export interface CartItem {
  item: ClothingItem;
  quantity: number;
}