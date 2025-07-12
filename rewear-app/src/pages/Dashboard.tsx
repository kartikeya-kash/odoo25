import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { AddItemModal } from '../components/AddItemModal';
import { Package, RefreshCw, ShoppingBag, Plus, User, Star } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { clothingItems, swapRequests, updateSwapRequest, deleteClothingItem } = useApp();
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddItemModal, setShowAddItemModal] = useState(false);

  const userItems = clothingItems.filter(item => item.ownerId === user?.id);
  const userSwapRequests = swapRequests.filter(
    request => request.fromUserId === user?.id || request.toUserId === user?.id
  );

  const stats = [
    { label: 'Items Listed', value: userItems.length, icon: Package, color: 'bg-blue-500' },
    { label: 'Swaps Completed', value: 5, icon: RefreshCw, color: 'bg-green-500' },
    { label: 'Items Sold', value: 3, icon: ShoppingBag, color: 'bg-purple-500' },
    { label: 'Sustainability Score', value: '9.2/10', icon: Star, color: 'bg-yellow-500' },
  ];

  const handleSwapResponse = (requestId: string, status: 'accepted' | 'rejected') => {
    updateSwapRequest(requestId, status);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="bg-green-100 rounded-full p-3">
              <User className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
              <p className="text-gray-600">Manage your sustainable fashion journey</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`${stat.color} rounded-full p-3`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'items', label: 'My Items' },
                { id: 'swaps', label: 'Swap Requests' },
                { id: 'profile', label: 'Profile' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <RefreshCw className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-gray-900">Swap request approved!</p>
                    <p className="text-sm text-gray-600">Your vintage jacket swap was accepted</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <Package className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">New item listed</p>
                    <p className="text-sm text-gray-600">Organic cotton t-shirt is now available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'items' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">My Items</h3>
              <button 
                onClick={() => setShowAddItemModal(true)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Add Item</span>
              </button>
            </div>
            {userItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userItems.map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-900">{item.title}</h4>
                      <p className="text-gray-600 text-sm">{item.brand} • {item.size}</p>
                      <p className="text-green-600 font-bold">${item.price}</p>
                      <div className="mt-3 flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                        <button 
                          onClick={() => deleteClothingItem(item.id)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No items listed yet</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'swaps' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Swap Requests</h3>
            {userSwapRequests.length > 0 ? (
              <div className="space-y-4">
                {userSwapRequests.map((request) => {
                  const fromItem = clothingItems.find(item => item.id === request.fromItemId);
                  const toItem = clothingItems.find(item => item.id === request.toItemId);
                  const isIncoming = request.toUserId === user?.id;

                  return (
                    <div key={request.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <RefreshCw className="h-6 w-6 text-blue-600" />
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              {isIncoming ? 'Incoming Swap Request' : 'Outgoing Swap Request'}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {isIncoming ? `From user` : `To user`} • {new Date(request.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          request.status === 'accepted' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {request.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="text-center">
                          <h5 className="font-medium text-gray-900 mb-2">
                            {isIncoming ? 'They offer' : 'You offer'}
                          </h5>
                          {fromItem && (
                            <div className="border border-gray-200 rounded-lg p-3">
                              <img
                                src={fromItem.images[0]}
                                alt={fromItem.title}
                                className="w-full h-32 object-cover rounded mb-2"
                              />
                              <p className="font-medium">{fromItem.title}</p>
                              <p className="text-sm text-gray-600">{fromItem.brand}</p>
                            </div>
                          )}
                        </div>
                        <div className="text-center">
                          <h5 className="font-medium text-gray-900 mb-2">
                            {isIncoming ? 'For your' : 'For their'}
                          </h5>
                          {toItem && (
                            <div className="border border-gray-200 rounded-lg p-3">
                              <img
                                src={toItem.images[0]}
                                alt={toItem.title}
                                className="w-full h-32 object-cover rounded mb-2"
                              />
                              <p className="font-medium">{toItem.title}</p>
                              <p className="text-sm text-gray-600">{toItem.brand}</p>
                            </div>
                          )}
                        </div>
                      </div>
                      {isIncoming && request.status === 'pending' && (
                        <div className="flex justify-center space-x-4 mt-4">
                          <button
                            onClick={() => handleSwapResponse(request.id, 'accepted')}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleSwapResponse(request.id, 'rejected')}
                            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                          >
                            Decline
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <RefreshCw className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No swap requests yet</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Profile Settings</h3>
            <div className="max-w-md space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={user?.name || ''}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-green-500 focus:border-green-500"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={user?.email || ''}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-green-500 focus:border-green-500"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Member Since</label>
                <input
                  type="text"
                  value={user?.joinedDate || ''}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-green-500 focus:border-green-500"
                  readOnly
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Item Modal */}
      <AddItemModal
        isOpen={showAddItemModal}
        onClose={() => setShowAddItemModal(false)}
      />
    </div>
  );
};