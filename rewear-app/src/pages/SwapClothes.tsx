import React, { useState } from 'react';
import { ClothingCard } from '../components/ClothingCard';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { RefreshCw, Search, Filter } from 'lucide-react';

export const SwapClothes: React.FC = () => {
  const { clothingItems } = useApp();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = ['Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Shoes', 'Accessories'];

  // Filter out user's own items and only show items available for swap
  const swappableItems = clothingItems
    .filter(item => 
      item.availableForSwap && 
      item.ownerId !== user?.id &&
      (searchTerm === '' || 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory === '' || item.category === selectedCategory)
    );

  const userItems = clothingItems.filter(item => item.ownerId === user?.id);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Login Required</h2>
          <p className="text-gray-600 mb-6">Please login to access the swap marketplace</p>
          <a
            href="/login"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Login to Continue
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-green-100 rounded-full p-4">
              <RefreshCw className="h-12 w-12 text-green-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Swap Your Clothes</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Give your clothes a new life by swapping with other fashion lovers. 
            It's sustainable, fun, and completely free!
          </p>
        </div>

        {/* How it Works */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">How Swapping Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold text-lg">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Browse & Find</h3>
              <p className="text-gray-600 text-sm">Browse items from other users and find something you love</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <span className="text-green-600 font-bold text-lg">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Propose Swap</h3>
              <p className="text-gray-600 text-sm">Select one of your items to offer in exchange</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <span className="text-purple-600 font-bold text-lg">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Exchange</h3>
              <p className="text-gray-600 text-sm">Once accepted, coordinate the exchange and enjoy your new item!</p>
            </div>
          </div>
        </div>

        {/* User Items Check */}
        {userItems.length === 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-yellow-900 mb-2">No Items to Swap</h3>
            <p className="text-yellow-800">
              You need to have items listed before you can propose swaps. 
              <a href="/dashboard" className="text-yellow-900 underline ml-1">Add some items to your wardrobe first!</a>
            </p>
          </div>
        )}

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search for items to swap..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Available Items for Swap */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Available for Swap</h2>
          {swappableItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {swappableItems.map((item) => (
                <ClothingCard 
                  key={item.id} 
                  item={item} 
                  showSwapOption={userItems.length > 0}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Filter className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or check back later for new items</p>
            </div>
          )}
        </div>

        {/* Sustainability Message */}
        <div className="bg-green-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Make a Difference with Every Swap</h2>
          <p className="text-green-100 text-lg mb-6">
            Every swap saves water, reduces carbon emissions, and keeps textiles out of landfills. 
            Join our community in making fashion more sustainable, one swap at a time.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">2.7K</div>
              <div className="text-green-200">Liters of water saved</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">15kg</div>
              <div className="text-green-200">CO2 emissions prevented</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">500+</div>
              <div className="text-green-200">Happy swappers</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};