import React, { createContext, useContext, useState } from 'react';
import { ClothingItem, CartItem, SwapRequest } from '../types';

interface AppContextType {
  clothingItems: ClothingItem[];
  cartItems: CartItem[];
  swapRequests: SwapRequest[];
  addToCart: (item: ClothingItem) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  createSwapRequest: (fromItemId: string, toItemId: string, message?: string) => void;
  updateSwapRequest: (id: string, status: SwapRequest['status']) => void;
  addClothingItem: (item: Omit<ClothingItem, 'id' | 'createdAt'>) => void;
  updateClothingItem: (id: string, updates: Partial<ClothingItem>) => void;
  deleteClothingItem: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

// Enhanced mock clothing items with more variety
const mockClothingItems: ClothingItem[] = [
  {
    id: '1',
    title: 'Vintage Denim Jacket',
    brand: 'Levi\'s',
    size: 'M',
    condition: 'Good',
    category: 'Outerwear',
    color: 'Blue',
    description: 'Classic vintage Levi\'s denim jacket in excellent condition. Perfect for sustainable fashion lovers.',
    images: ['https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg'],
    price: 45,
    availableForSwap: true,
    availableForPurchase: true,
    ownerId: '1',
    ownerName: 'John Doe',
    sustainabilityScore: 9,
    materials: ['100% Cotton'],
    createdAt: '2024-01-20'
  },
  {
    id: '2',
    title: 'Organic Cotton T-Shirt',
    brand: 'Patagonia',
    size: 'L',
    condition: 'Like New',
    category: 'Tops',
    color: 'White',
    description: 'Sustainable organic cotton t-shirt from Patagonia. Barely worn, perfect for eco-conscious wardrobe.',
    images: ['https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg'],
    price: 25,
    availableForSwap: true,
    availableForPurchase: true,
    ownerId: '2',
    ownerName: 'Sarah Green',
    sustainabilityScore: 10,
    materials: ['100% Organic Cotton'],
    createdAt: '2024-01-21'
  },
  {
    id: '3',
    title: 'Wool Blend Sweater',
    brand: 'Everlane',
    size: 'S',
    condition: 'Good',
    category: 'Tops',
    color: 'Beige',
    description: 'Cozy wool blend sweater perfect for fall and winter. Sustainable fashion at its best.',
    images: ['https://images.pexels.com/photos/1639729/pexels-photo-1639729.jpeg'],
    price: 35,
    availableForSwap: true,
    availableForPurchase: true,
    ownerId: '3',
    ownerName: 'Mike Johnson',
    sustainabilityScore: 8,
    materials: ['70% Wool', '30% Cotton'],
    createdAt: '2024-01-22'
  },
  {
    id: '4',
    title: 'Sustainable Midi Dress',
    brand: 'Reformation',
    size: 'M',
    condition: 'Like New',
    category: 'Dresses',
    color: 'Green',
    description: 'Beautiful midi dress made from sustainable materials. Perfect for special occasions.',
    images: ['https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg'],
    price: 65,
    availableForSwap: true,
    availableForPurchase: true,
    ownerId: '4',
    ownerName: 'Emma Wilson',
    sustainabilityScore: 9,
    materials: ['100% Tencel'],
    createdAt: '2024-01-23'
  },
  {
    id: '5',
    title: 'Vintage Leather Boots',
    brand: 'Dr. Martens',
    size: '9',
    condition: 'Good',
    category: 'Shoes',
    color: 'Black',
    description: 'Classic Dr. Martens boots with character. Well-maintained and ready for many more years.',
    images: ['https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg'],
    price: 80,
    availableForSwap: true,
    availableForPurchase: true,
    ownerId: '5',
    ownerName: 'Alex Chen',
    sustainabilityScore: 8,
    materials: ['Genuine Leather'],
    createdAt: '2024-01-24'
  },
  {
    id: '6',
    title: 'Silk Scarf Collection',
    brand: 'Hermès',
    size: 'One Size',
    condition: 'Like New',
    category: 'Accessories',
    color: 'Multi',
    description: 'Authentic Hermès silk scarf in pristine condition. A timeless accessory for any wardrobe.',
    images: ['https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg'],
    price: 120,
    availableForSwap: true,
    availableForPurchase: true,
    ownerId: '6',
    ownerName: 'Sophie Martin',
    sustainabilityScore: 9,
    materials: ['100% Silk'],
    createdAt: '2024-01-25'
  },
  {
    id: '7',
    title: 'Eco-Friendly Yoga Pants',
    brand: 'Girlfriend Collective',
    size: 'M',
    condition: 'Like New',
    category: 'Bottoms',
    color: 'Black',
    description: 'Made from recycled plastic bottles. Super comfortable and sustainable activewear.',
    images: ['https://images.pexels.com/photos/4498606/pexels-photo-4498606.jpeg'],
    price: 40,
    availableForSwap: true,
    availableForPurchase: true,
    ownerId: '7',
    ownerName: 'Lisa Park',
    sustainabilityScore: 10,
    materials: ['Recycled Polyester'],
    createdAt: '2024-01-26'
  },
  {
    id: '8',
    title: 'Vintage Band T-Shirt',
    brand: 'Vintage',
    size: 'L',
    condition: 'Fair',
    category: 'Tops',
    color: 'Black',
    description: 'Authentic vintage band tee with great character. Perfect for music lovers and vintage enthusiasts.',
    images: ['https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg'],
    price: 30,
    availableForSwap: true,
    availableForPurchase: true,
    ownerId: '8',
    ownerName: 'David Rock',
    sustainabilityScore: 7,
    materials: ['100% Cotton'],
    createdAt: '2024-01-27'
  },
  {
    id: '9',
    title: 'Sustainable Blazer',
    brand: 'Eileen Fisher',
    size: 'M',
    condition: 'Good',
    category: 'Outerwear',
    color: 'Navy',
    description: 'Professional blazer made from sustainable materials. Perfect for work or formal occasions.',
    images: ['https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg'],
    price: 75,
    availableForSwap: true,
    availableForPurchase: true,
    ownerId: '9',
    ownerName: 'Rachel Green',
    sustainabilityScore: 9,
    materials: ['Organic Cotton', 'Recycled Polyester'],
    createdAt: '2024-01-28'
  },
  {
    id: '10',
    title: 'Handmade Knit Cardigan',
    brand: 'Local Artisan',
    size: 'S',
    condition: 'Like New',
    category: 'Tops',
    color: 'Cream',
    description: 'Beautiful handmade cardigan from local artisan. Unique piece with sustainable wool.',
    images: ['https://images.pexels.com/photos/1639729/pexels-photo-1639729.jpeg'],
    price: 55,
    availableForSwap: true,
    availableForPurchase: true,
    ownerId: '10',
    ownerName: 'Maria Santos',
    sustainabilityScore: 10,
    materials: ['100% Organic Wool'],
    createdAt: '2024-01-29'
  }
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [clothingItems, setClothingItems] = useState<ClothingItem[]>(mockClothingItems);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [swapRequests, setSwapRequests] = useState<SwapRequest[]>([]);

  const addToCart = (item: ClothingItem) => {
    setCartItems(prev => {
      const existingItem = prev.find(cartItem => cartItem.item.id === item.id);
      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.item.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(prev => prev.filter(cartItem => cartItem.item.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const createSwapRequest = (fromItemId: string, toItemId: string, message?: string) => {
    const newSwapRequest: SwapRequest = {
      id: Date.now().toString(),
      fromUserId: '1', // Current user
      toUserId: clothingItems.find(item => item.id === toItemId)?.ownerId || '',
      fromItemId,
      toItemId,
      status: 'pending',
      message,
      createdAt: new Date().toISOString()
    };
    setSwapRequests(prev => [...prev, newSwapRequest]);
  };

  const updateSwapRequest = (id: string, status: SwapRequest['status']) => {
    setSwapRequests(prev =>
      prev.map(request =>
        request.id === id ? { ...request, status } : request
      )
    );
  };

  const addClothingItem = (item: Omit<ClothingItem, 'id' | 'createdAt'>) => {
    const newItem: ClothingItem = {
      ...item,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setClothingItems(prev => [...prev, newItem]);
  };

  const updateClothingItem = (id: string, updates: Partial<ClothingItem>) => {
    setClothingItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, ...updates } : item
      )
    );
  };

  const deleteClothingItem = (id: string) => {
    setClothingItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <AppContext.Provider value={{
      clothingItems,
      cartItems,
      swapRequests,
      addToCart,
      removeFromCart,
      clearCart,
      createSwapRequest,
      updateSwapRequest,
      addClothingItem,
      updateClothingItem,
      deleteClothingItem
    }}>
      {children}
    </AppContext.Provider>
  );
};