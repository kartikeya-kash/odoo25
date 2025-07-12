import React from 'react';
import { useApp } from '../context/AppContext';
import { PaymentModal } from '../components/PaymentModal';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';

export const Cart: React.FC = () => {
  const { cartItems, removeFromCart, clearCart } = useApp();
  const [showPaymentModal, setShowPaymentModal] = React.useState(false);

  const total = cartItems.reduce((sum, cartItem) => sum + (cartItem.item.price * cartItem.quantity), 0);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some sustainable fashion items to get started!</p>
          <a
            href="/marketplace"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Browse Marketplace
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6">
            <div className="flow-root">
              <ul className="-my-6 divide-y divide-gray-200">
                {cartItems.map((cartItem) => (
                  <li key={cartItem.item.id} className="py-6 flex">
                    <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                      <img
                        src={cartItem.item.images[0]}
                        alt={cartItem.item.title}
                        className="w-full h-full object-center object-cover"
                      />
                    </div>

                    <div className="ml-4 flex-1 flex flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>{cartItem.item.title}</h3>
                          <p className="ml-4">${(cartItem.item.price * cartItem.quantity).toFixed(2)}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {cartItem.item.brand} • Size {cartItem.item.size}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          Condition: {cartItem.item.condition}
                        </p>
                      </div>
                      <div className="flex-1 flex items-end justify-between text-sm">
                        <div className="flex items-center space-x-3">
                          <button className="p-1 rounded-full hover:bg-gray-100 transition-colors">
                            <Minus className="h-4 w-4 text-gray-600" />
                          </button>
                          <span className="text-gray-500">Qty {cartItem.quantity}</span>
                          <button className="p-1 rounded-full hover:bg-gray-100 transition-colors">
                            <Plus className="h-4 w-4 text-gray-600" />
                          </button>
                        </div>

                        <div className="flex">
                          <button
                            type="button"
                            onClick={() => removeFromCart(cartItem.item.id)}
                            className="font-medium text-red-600 hover:text-red-500 flex items-center space-x-1"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 px-6 py-6">
            <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
              <p>Subtotal</p>
              <p>${total.toFixed(2)}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500 mb-6">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="space-y-3">
              <button 
                onClick={() => setShowPaymentModal(true)}
                className="w-full bg-green-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
              >
                Checkout
              </button>
              <button
                onClick={clearCart}
                className="w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm py-3 px-4 text-base font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
              >
                Clear Cart
              </button>
            </div>
            <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
              <p>
                or{' '}
                <a
                  href="/marketplace"
                  className="text-green-600 font-medium hover:text-green-500"
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Sustainability Impact */}
        <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-900 mb-2">🌱 Your Sustainability Impact</h3>
          <p className="text-green-800">
            By choosing pre-loved items, you're helping reduce textile waste and supporting circular fashion. 
            Your cart saves approximately <strong>2.5 kg of CO2</strong> compared to buying new items!
          </p>
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        amount={total}
        type="purchase"
        itemTitle={`${cartItems.length} item${cartItems.length > 1 ? 's' : ''}`}
      />
    </div>
  );
};