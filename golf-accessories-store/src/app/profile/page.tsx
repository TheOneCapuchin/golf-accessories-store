'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import { products } from '@/lib/mock-data';
import { Heart, ShoppingBag, Trophy, Star, ArrowRight, LogOut } from 'lucide-react';
import CategoryNavigation from '@/components/CategoryNavigation';
import ProductCard from '@/components/ProductCard';
import ClubhouseModal from '@/components/ClubhouseModal';

export default function ProfilePage() {
  const { user, wishlist, logout, isAuthenticated, removeFromWishlist } = useStore();
  const [isClubhouseModalOpen, setIsClubhouseModalOpen] = useState(false);

  if (!isAuthenticated()) {
    return (
      <div className="min-h-screen bg-bone-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Please Log In</h2>
          <p className="text-warm-gray mb-6">You need to be logged in to view your profile.</p>
          <Link 
            href="/auth"
            className="accent-button px-6 py-3 rounded-lg inline-block"
          >
            Log In
          </Link>
        </div>
      </div>
    );
  }

  const wishlistProducts = products.filter(product => wishlist.includes(product.id));
  
  // Mock member tier logic based on wishlist size
  const getMemberTier = () => {
    if (wishlist.length >= 10) return { name: 'Pro Buyer', color: 'text-sunset-orange', bgColor: 'bg-sunset-orange/10' };
    if (wishlist.length >= 5) return { name: 'Enthusiast', color: 'text-electric-green', bgColor: 'bg-electric-green/10' };
    return { name: 'Starter', color: 'text-warm-gray', bgColor: 'bg-warm-gray/10' };
  };

  const memberTier = getMemberTier();

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

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
              <Link 
                href="/wishlist"
                className="flex items-center gap-2 text-foreground hover:text-electric-green transition-colors"
              >
                <Heart size={16} />
                Wishlist ({wishlist.length})
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-warm-gray hover:text-foreground transition-colors"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Category Navigation */}
      <CategoryNavigation />

      {/* Profile Content */}
      <section className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="bg-bone-white rounded-2xl sophisticated-shadow border border-soft-gray p-8 mb-8">
            <div className="flex items-center gap-6 mb-6">
              {/* Avatar */}
              <div className="w-20 h-20 bg-gradient-to-r from-electric-green to-sunset-orange rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {user?.name?.[0]?.toUpperCase() || 'U'}
              </div>
              
              {/* User Info */}
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-foreground mb-2">{user?.name}</h2>
                <p className="text-warm-gray mb-4">{user?.email}</p>
                
                {/* Member Tier */}
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${memberTier.bgColor}`}>
                  <Trophy size={16} className={memberTier.color} />
                  <span className={`font-medium ${memberTier.color}`}>{memberTier.name} Member</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-soft-gray">
              <div className="text-center">
                <p className="text-3xl font-bold text-foreground mb-1">{wishlist.length}</p>
                <p className="text-sm text-warm-gray">Saved Items</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-foreground mb-1">15%</p>
                <p className="text-sm text-warm-gray">Member Discount</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-foreground mb-1">Early</p>
                <p className="text-sm text-warm-gray">Pattern Access</p>
              </div>
            </div>
          </div>

          {/* Member Benefits */}
          <div className="bg-gradient-to-r from-electric-green/5 to-sunset-orange/5 rounded-2xl border border-soft-gray p-8 mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Star className="text-sunset-orange" size={24} />
              Member Benefits
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-electric-green/20 rounded-full flex items-center justify-center">
                  <span className="text-electric-green font-bold">%</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">15% Member Discount</p>
                  <p className="text-sm text-warm-gray">On all bulk orders</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-sunset-orange/20 rounded-full flex items-center justify-center">
                  <span className="text-sunset-orange font-bold">⚡</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">Early Access</p>
                  <p className="text-sm text-warm-gray">New patterns first</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-electric-green/20 rounded-full flex items-center justify-center">
                  <span className="text-electric-green font-bold">🎁</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">Exclusive Deals</p>
                  <p className="text-sm text-warm-gray">Member-only offers</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-sunset-orange/20 rounded-full flex items-center justify-center">
                  <span className="text-sunset-orange font-bold">📧</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">Newsletter</p>
                  <p className="text-sm text-warm-gray">Clubhouse updates</p>
                </div>
              </div>
            </div>
          </div>

          {/* Wishlist Section */}
          {wishlistProducts.length > 0 ? (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <Heart size={24} className="text-sunset-orange" />
                  Your Wishlist ({wishlistProducts.length})
                </h3>
                <Link 
                  href="/wishlist"
                  className="flex items-center gap-2 text-electric-green hover:text-electric-green/80 transition-colors"
                >
                  View All
                  <ArrowRight size={16} />
                </Link>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistProducts.slice(0, 6).map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onShowClubhouseModal={() => setIsClubhouseModalOpen(true)}
                  />
                ))}
              </div>
              
              {wishlistProducts.length > 6 && (
                <div className="text-center mt-8">
                  <Link 
                    href="/wishlist"
                    className="subtle-button px-6 py-3 rounded-lg inline-block"
                  >
                    View All {wishlistProducts.length} Saved Items
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-bone-white rounded-2xl sophisticated-shadow border border-soft-gray p-12 text-center">
              <Heart size={48} className="text-warm-gray mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">No saved items yet</h3>
              <p className="text-warm-gray mb-6">Start adding items to your wishlist to see them here!</p>
              <Link 
                href="/"
                className="accent-button px-6 py-3 rounded-lg inline-block"
              >
                Start Shopping
              </Link>
            </div>
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
