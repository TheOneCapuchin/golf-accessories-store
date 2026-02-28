'use client';

import { Product, Pattern } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import { useLanguage } from '@/context/LanguageContext';
import { ShoppingCart, Eye, Heart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  selectedPattern?: Pattern;
  onShowClubhouseModal?: () => void;
}

const productImages: Record<string, string> = {
  'performance-polo': '👕',
  'microfiber-towel': '🏝️',
  'structured-cap': '🧢',
  'lightweight-bag': '🎒',
  'durable-tees': '🏌️',
  'putter-cover': '⛳'
};

export default function ProductCard({ product, selectedPattern, onShowClubhouseModal }: ProductCardProps) {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist, isAuthenticated } = useStore();
  const { t, language } = useLanguage();
  
  // Fallback for missing product data
  if (!product) {
    return (
      <div className="pattern-card group relative bg-[#243E2C] rounded-2xl overflow-hidden shadow-2xl border border-white/5">
        <div className="relative aspect-square overflow-hidden flex items-center justify-center">
          <div className="text-6xl">🏌️</div>
        </div>
        <div className="p-4">
          <p className="text-white text-sm">{t.emptyState}</p>
        </div>
      </div>
    );
  }
  
  const displayPattern = selectedPattern || product.patterns[0];
  const productIcon = productImages[product.id] || '🏌️';
  const isSaved = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, displayPattern.id, 1);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated()) {
      onShowClubhouseModal?.();
      return;
    }
    
    if (isSaved) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  return (
    // Changed to Moss Green background with a subtle white border
    <div className="pattern-card group relative bg-[#243E2C] rounded-2xl overflow-hidden shadow-2xl border border-white/5 hover:border-[#CCFF00]/40 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
      <div className="relative aspect-square overflow-hidden">
        {/* Darker gradient for the image area */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/40 z-10" />
        
        {/* Bottom gradient overlay for text readability */}
        <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-gradient-to-t from-black/60 to-transparent z-15"></div>
        
        {/* Product mockup background changed to match the theme */}
        <div className="relative w-full h-full bg-[#1B3022]/50 flex items-center justify-center rounded-t-2xl">
          <div className="relative">
            <div className="text-6xl mb-2 filter drop-shadow-xl">{productIcon}</div>
            
            <div className="flex justify-center gap-1">
              {displayPattern.colors.slice(0, 3).map((color, index) => (
                <div
                  key={index}
                  className="w-2 h-2 rounded-full border border-white/30 shadow-sm"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1A11]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 z-20" />
        
        {/* Quick actions - Styled for the dark theme */}
        <div className="absolute bottom-4 left-4 right-4 z-30 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
          <div className="flex gap-2">
            <Link
              href={`/products/${product.id}`}
              className="flex-1 bg-white/10 backdrop-blur-md text-white py-2 px-3 rounded-lg font-medium text-sm hover:bg-[#CCFF00] hover:text-[#1B3022] transition-all duration-200 flex items-center justify-center gap-2 border border-white/10"
            >
              <Eye size={14} />
              {t.view}
            </Link>
            <button
              onClick={handleQuickAdd}
              className="flex-1 bg-[#CCFF00] text-[#1B3022] py-2 px-3 rounded-lg font-medium text-sm hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-[#CCFF00]/20"
            >
              <ShoppingCart size={14} />
              {t.addToCart}
            </button>
          </div>
        </div>

        {/* Category badge - Dark background */}
        <div className="absolute top-4 left-4 z-20">
          <span className="bg-[#0D1A11]/80 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-[#CCFF00] border border-white/10">
            {product.category.name}
          </span>
        </div>

        {/* Wishlist button */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-4 right-4 z-20 p-2 bg-[#0D1A11]/60 backdrop-blur-sm rounded-full border border-white/10 hover:border-[#CCFF00] transition-all duration-200"
        >
          <Heart 
            size={16} 
            className={`transition-colors duration-200 ${
              isSaved ? 'fill-[0#CCFF0] text-[#CCFF00]' : 'text-white/60 hover:text-[#CCFF00]'
            }`}
          />
        </button>
      </div>
      
      {/* Content Area */}
      <div className="p-5 bg-[#4A3728]">
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-white group-hover:text-[#CCFF00] transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-sm text-gray-400 line-clamp-2 mt-1">
            {product.description}
          </p>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xl font-bold text-white">
              {formatPrice(product.basePrice, language)}
            </p>
            <p className="text-xs text-[#CCFF00]/80">
              {displayPattern.name}
            </p>
          </div>
          
          <div className="flex gap-1">
            {displayPattern.colors.slice(0, 3).map((color, index) => (
              <div
                key={index}
                className="w-3 h-3 rounded-full border border-white/20 shadow-sm"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        {/* Brand accent for discounts */}
        <div className="flex items-center gap-2 text-xs text-[#CCFF00] font-medium border-t border-white/5 pt-3 mt-1">
          <span>🌲</span>
          <span>Save 20% on 50+ units</span>
        </div>
      </div>
    </div>
  );
}