import React, { useState } from 'react';
import { ClothingItem } from '../types';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { PaymentModal } from './PaymentModal';
import { ShoppingCart, RefreshCw, Star, Leaf } from 'lucide-react';

interface ClothingCardProps {
  item: ClothingItem;
  showSwapOption?: boolean;
}

export const ClothingCard: React.FC<ClothingCardProps> = ({ item, showSwapOption = false }) => {
  const { user } = useAuth();
  const { addToCart, clothingItems, createSwapRequest } = useApp();
  const [selectedSwapItem, setSelectedSwapItem] = useState<string>('');
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentType, setPaymentType] = useState<'purchase' | 'swap'>('purchase');

  const userItems = clothingItems.filter(clothing => clothing.ownerId === user?.id);

  const handleAddToCart = () => {
    if (item.availableForPurchase) {
      setPaymentType('purchase');
      setShowPaymentModal(true);
    }
  };

  const handleSwapRequest = () => {
    if (selectedSwapItem) {
      setPaymentType('swap');
      setShowPaymentModal(true);
    }
  };

  const handlePaymentSuccess = () => {
    if (paymentType === 'purchase') {
      addToCart(item);
    } else {
      createSwapRequest(selectedSwapItem, item.id, 'I\'d like to swap this item with you!');
      setShowSwapModal(false);
      setSelectedSwapItem('');
    }
    setShowPaymentModal(false);
  };

  const getSustainabilityColor = (score: number) => {
    if (score >= 9) return 'text-green-600';
    if (score >= 7) return 'text-yellow-600';
    return 'text-orange-600';
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
        <div className="relative aspect-square overflow-hidden">
          <img
            src={item.images[0]}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 left-2 bg-white bg-opacity-90 rounded-full px-2 py-1">
            <div className="flex items-center space-x-1">
              <Leaf className={`h-4 w-4 ${getSustainabilityColor(item.sustainabilityScore)}`} />
              <span className={`text-sm font-medium ${getSustainabilityColor(item.sustainabilityScore)}`}>
                {item.sustainabilityScore}/10
              </span>
            </div>
          </div>
          <div className="absolute top-2 right-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              item.condition === 'Like New' ? 'bg-green-100 text-green-800' :
              item.condition === 'Good' ? 'bg-yellow-100 text-yellow-800' :
              'bg-orange-100 text-orange-800'
            }`}>
              {item.condition}
            </span>
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.title}</h3>
          <p className="text-gray-600 text-sm mb-2">{item.brand} • Size {item.size}</p>
          <p className="text-gray-700 text-sm mb-3 line-clamp-2">{item.description}</p>
          
          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl font-bold text-green-600">${item.price}</span>
            <div className="flex items-center space-x-1 text-gray-500 text-sm">
              <Star className="h-4 w-4 fill-current text-yellow-400" />
              <span>Eco-friendly</span>
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            {item.availableForPurchase && user && (
              <button
                onClick={handleAddToCart}
                className="flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
              >
                <ShoppingCart className="h-4 w-4" />
                <span>Add to Cart</span>
              </button>
            )}
            
            {item.availableForSwap && user && showSwapOption && userItems.length > 0 && (
              <button
                onClick={() => setShowSwapModal(true)}
                className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Propose Swap</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Swap Modal */}
      {showSwapModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold mb-4">Propose a Swap</h3>
            <p className="text-gray-600 mb-4">Select one of your items to swap with "{item.title}"</p>
            
            <div className="space-y-3 max-h-60 overflow-y-auto mb-4">
              {userItems.map((userItem) => (
                <label key={userItem.id} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    value={userItem.id}
                    checked={selectedSwapItem === userItem.id}
                    onChange={(e) => setSelectedSwapItem(e.target.value)}
                    className="text-green-600"
                  />
                  <img
                    src={userItem.images[0]}
                    alt={userItem.title}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div>
                    <p className="font-medium">{userItem.title}</p>
                    <p className="text-sm text-gray-600">{userItem.brand} • {userItem.size}</p>
                  </div>
                </label>
              ))}
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowSwapModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSwapRequest}
                disabled={!selectedSwapItem}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send Swap Request
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        amount={paymentType === 'purchase' ? item.price : 2.99}
        type={paymentType}
        itemTitle={item.title}
      />
    </>
  );
};