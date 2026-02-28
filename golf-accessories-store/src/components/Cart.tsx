'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import { products, patterns } from '@/lib/mock-data';
import { formatPrice } from '@/lib/utils';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Cart({ isOpen, onClose }: CartProps) {
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal } = useStore();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const getCartItemDetails = (item: typeof cart[0]) => {
    const product = products.find(p => p.id === item.productId);
    const pattern = patterns.find(p => p.id === item.patternId);
    return { product, pattern };
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate checkout process
    setTimeout(() => {
      clearCart();
      setIsCheckingOut(false);
      onClose();
      alert('Order placed successfully! 🎉');
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Cart Drawer */}
      <div className={`fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <ShoppingBag className="text-electric-green" size={24} />
              <h2 className="text-xl font-bold text-deep-navy">Shopping Cart</h2>
              <span className="bg-electric-green text-deep-navy text-sm font-bold px-2 py-1 rounded-full">
                {cart.reduce((total, item) => total + item.quantity, 0)}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-deep-navy transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gradient-to-br from-electric-green/20 to-sunset-orange/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag size={32} className="text-electric-green" />
                </div>
                <h3 className="text-lg font-semibold text-deep-navy mb-2">Your cart is empty</h3>
                <p className="text-gray-600 mb-6">Add some vibrant gear to get started!</p>
                <button
                  onClick={onClose}
                  className="text-electric-green hover:text-sunset-orange font-semibold transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item, index) => {
                  const { product, pattern } = getCartItemDetails(item);
                  if (!product || !pattern) return null;

                  return (
                    <div key={`${item.productId}-${item.patternId}`} className="bg-gray-50 rounded-xl p-4">
                      <div className="flex gap-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-electric-green/20 to-sunset-orange/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-2xl">🏌️</span>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-deep-navy truncate">{product.name}</h4>
                          <p className="text-sm text-gray-600 mb-2">{pattern.name} Pattern</p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(item.productId, item.patternId, item.quantity - 1)}
                                className="w-6 h-6 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-electric-green hover:border-electric-green transition-colors"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="w-8 text-center font-semibold text-deep-navy">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.productId, item.patternId, item.quantity + 1)}
                                className="w-6 h-6 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-electric-green hover:border-electric-green transition-colors"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                            
                            <div className="text-right">
                              <p className="font-bold text-deep-navy">
                                {formatPrice(item.price * item.quantity)}
                              </p>
                              <p className="text-xs text-gray-500">
                                {formatPrice(item.price)} each
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => removeFromCart(item.productId, item.patternId)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="border-t border-gray-200 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-deep-navy">Total</span>
                <span className="text-2xl font-bold gradient-text">
                  {formatPrice(getCartTotal())}
                </span>
              </div>
              
              <div className="space-y-2">
                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full bg-gradient-to-r from-electric-green to-sunset-orange text-deep-navy py-3 rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isCheckingOut ? (
                    <>
                      <div className="w-5 h-5 border-2 border-deep-navy border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Proceed to Checkout
                    </>
                  )}
                </button>
                
                <button
                  onClick={() => clearCart()}
                  className="w-full text-gray-600 hover:text-red-500 font-medium transition-colors"
                >
                  Clear Cart
                </button>
              </div>
              
              <div className="text-center text-xs text-gray-500">
                <p>Free shipping on orders over $100</p>
                <p>30-day returns on all items</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
