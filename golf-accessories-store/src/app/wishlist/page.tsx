'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import { products } from '@/lib/mock-data';
import { Heart, ShoppingBag, ArrowLeft } from 'lucide-react';
import CategoryNavigation from '@/components/CategoryNavigation';
import ProductCard from '@/components/ProductCard';
import ClubhouseModal from '@/components/ClubhouseModal';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, isAuthenticated, user } = useStore();
  const [isClubhouseModalOpen, setIsClubhouseModalOpen] = useState(false);

  const wishlistProducts = products.filter(product => wishlist.includes(product.id));

  return (
    <div className="min-h-screen bg-bone-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-bone-white/95 backdrop-blur-sm border-b border-soft-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-electric-green to-sunset-orange rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">⛳</span>
              </div>
              <h1 className="text-xl font-bold gradient-text">GolfVibe</h1>
            </Link>
            
            <div className="flex items-center gap-4">
              {isAuthenticated() ? (
                <Link 
                  href="/profile"
                  className="flex items-center gap-2 text-foreground hover:text-electric-green transition-colors"
                >
                  <div className="w-6 h-6 bg-gradient-to-r from-electric-green to-sunset-orange rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {user?.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                  {user?.name}
                </Link>
              ) : (
                <Link 
                  href="/auth"
                  className="text-foreground hover:text-electric-green font-medium transition-colors"
                >
                  Log In
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Category Navigation */}
      <CategoryNavigation />

      {/* Wishlist Content */}
      <section className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link 
              href="/"
              className="flex items-center gap-2 text-warm-gray hover:text-foreground transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Store
            </Link>
            
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                <Heart size={32} className="text-sunset-orange" />
                Your Wishlist
                <span className="text-xl text-warm-gray">({wishlistProducts.length} items)</span>
              </h1>
            </div>
          </div>

          {/* Empty State */}
          {wishlistProducts.length === 0 ? (
            <div className="bg-bone-white rounded-2xl sophisticated-shadow border border-soft-gray p-16 text-center">
              <Heart size={64} className="text-warm-gray mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-foreground mb-4">Your wishlist is empty</h2>
              <p className="text-warm-gray mb-8 max-w-md mx-auto">
                Start adding your favorite golf accessories to your wishlist! Click the heart icon on any product to save it here.
              </p>
              <Link 
                href="/"
                className="accent-button px-8 py-4 rounded-xl text-lg inline-block"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <>
              {/* Stats Bar */}
              <div className="bg-gradient-to-r from-electric-green/5 to-sunset-orange/5 rounded-xl border border-soft-gray p-6 mb-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                  <div>
                    <p className="text-3xl font-bold text-foreground">{wishlistProducts.length}</p>
                    <p className="text-sm text-warm-gray">Saved Items</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-foreground">
                      {wishlistProducts.reduce((total, product) => total + product.basePrice, 0).toFixed(0)}
                    </p>
                    <p className="text-sm text-warm-gray">Total Value</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-electric-green">15%</p>
                    <p className="text-sm text-warm-gray">Member Discount</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-sunset-orange">
                      ${(wishlistProducts.reduce((total, product) => total + product.basePrice, 0) * 0.85).toFixed(0)}
                    </p>
                    <p className="text-sm text-warm-gray">After Discount</p>
                  </div>
                </div>
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {wishlistProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onShowClubhouseModal={() => setIsClubhouseModalOpen(true)}
                  />
                ))}
              </div>

              {/* CTA Section */}
              <div className="mt-12 text-center bg-bone-white rounded-2xl sophisticated-shadow border border-soft-gray p-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">Ready to make your purchase?</h3>
                <p className="text-warm-gray mb-6 max-w-2xl mx-auto">
                  Get 15% off your bulk order when you join the Clubhouse. Members get exclusive access to new patterns and special deals.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    onClick={() => setIsClubhouseModalOpen(true)}
                    className="accent-button px-6 py-3 rounded-lg"
                  >
                    Join the Clubhouse
                  </button>
                  <Link 
                    href="/category/performance-polos"
                    className="subtle-button px-6 py-3 rounded-lg inline-block"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Clubhouse Modal */}
      <ClubhouseModal 
        isOpen={isClubhouseModalOpen} 
        onClose={() => setIsClubhouseModalOpen(false)} 
      />
    </div>
  );
}
