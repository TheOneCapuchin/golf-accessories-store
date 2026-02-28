import { Product, Pattern } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useStore } from '@/lib/store';
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
    <div className="pattern-card group relative bg-bone-white rounded-xl overflow-hidden sophisticated-shadow border border-soft-gray">
      <div className="relative aspect-square overflow-hidden">
        {/* Pattern overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/5 z-10" />
        
        {/* Product mockup */}
        <div className="relative w-full h-full bg-gradient-to-br from-soft-gray to-bone-white flex items-center justify-center">
          <div className="relative">
            {/* Main product icon */}
            <div className="text-6xl mb-2 filter drop-shadow-sm">{productIcon}</div>
            
            {/* Pattern color indicators */}
            <div className="flex justify-center gap-1">
              {displayPattern.colors.slice(0, 3).map((color, index) => (
                <div
                  key={index}
                  className="w-2 h-2 rounded-full border border-white/50 shadow-sm"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 z-20" />
        
        {/* Quick actions */}
        <div className="absolute bottom-4 left-4 right-4 z-30 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
          <div className="flex gap-2">
            <Link
              href={`/products/${product.id}`}
              className="flex-1 bg-bone-white/95 backdrop-blur-sm text-foreground py-2 px-3 rounded-lg font-medium text-sm hover:bg-electric-green hover:text-deep-navy transition-all duration-200 flex items-center justify-center gap-2 subtle-accent-border"
            >
              <Eye size={14} />
              View
            </Link>
            <button
              onClick={handleQuickAdd}
              className="flex-1 bg-electric-green text-deep-navy py-2 px-3 rounded-lg font-medium text-sm hover:bg-sunset-orange transition-all duration-200 flex items-center justify-center gap-2"
            >
              <ShoppingCart size={14} />
              Add
            </button>
          </div>
        </div>

        {/* Category badge */}
        <div className="absolute top-4 left-4 z-20">
          <span className="bg-bone-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-foreground border border-soft-gray">
            {product.category.name}
          </span>
        </div>

        {/* Wishlist button */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-4 right-4 z-20 p-2 bg-bone-white/90 backdrop-blur-sm rounded-full border border-soft-gray hover:border-sunset-orange transition-all duration-200"
        >
          <Heart 
            size={16} 
            className={`transition-colors duration-200 ${
              isSaved ? 'fill-sunset-orange text-sunset-orange' : 'text-warm-gray hover:text-sunset-orange'
            }`}
          />
        </button>
      </div>
      
      <div className="p-5">
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-foreground group-hover:text-electric-green transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-sm text-warm-gray line-clamp-2 mt-1">
            {product.description}
          </p>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xl font-bold text-foreground">
              {formatPrice(product.basePrice)}
            </p>
            <p className="text-xs text-warm-gray">
              {displayPattern.name}
            </p>
          </div>
          
          <div className="flex gap-1">
            {displayPattern.colors.slice(0, 3).map((color, index) => (
              <div
                key={index}
                className="w-3 h-3 rounded-full border border-soft-gray shadow-sm"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        {/* Bulk discount indicator */}
        <div className="flex items-center gap-2 text-xs text-electric-green font-medium">
          <span>💰</span>
          <span>Save 20% on 50+ units</span>
        </div>
      </div>
    </div>
  );
}
