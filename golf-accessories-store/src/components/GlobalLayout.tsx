'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useStore } from '@/lib/store';
import { useLanguage } from '@/context/LanguageContext';
import { ShoppingCart, Search, Menu, Heart, ArrowLeft, Home } from 'lucide-react';
import CategoryNavigation from '@/components/CategoryNavigation';
import Cart from '@/components/Cart';

interface GlobalLayoutProps {
  children: React.ReactNode;
  showBreadcrumbs?: boolean;
  breadcrumbs?: Array<{ name: string; href: string }>;
  title?: string;
  isKapuchinRoute?: boolean;
}

export default function GlobalLayout({ 
  children, 
  showBreadcrumbs = false, 
  breadcrumbs = [],
  title,
  isKapuchinRoute = false
}: GlobalLayoutProps) {
  const pathname = usePathname();
  const { 
    cart, 
    getCartItemCount, 
    getWishlistCount, 
    isAuthenticated, 
    user,
    addToCart,
    removeFromCart,
    updateQuantity,
    filteredProducts
  } = useStore();
  
  const { language, setLanguage, t, isLanguageChanging } = useLanguage();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  // Fade-in effect
  useEffect(() => {
    const timer = setTimeout(() => setIsPageLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleQuickAdd = (product: any, patternId: string) => {
    addToCart(product, patternId, 1);
  };

  return (
    <div className={`min-h-screen bg-[#1B3022] transition-opacity duration-300 ${isPageLoaded ? 'opacity-100' : 'opacity-0'} pt-0`}>
      {/* Header - Master Cap */}
      <header className={`sticky top-0 left-0 right-0 z-[100] w-full bg-[#0D1A11] border-b border-[#CCFF00]/20 shadow-md border-b border-white/10 mb-0 h-16 ${isLanguageChanging ? 'animate-pulse' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-[#CCFF00] to-[#CCFF00]/60 rounded-lg flex items-center justify-center">
                  <span className="text-[#1B3022] font-bold text-lg">⛳</span>
                </div>
                <div id="kapuchin-logo-isolated" className="kapuchin-glow">
                  <h1 className="text-xl font-bold text-white font-display">
                    <span className="kapuchin-text">Kapuchin</span><span className="text-2xl">🐒</span><span className="golf-text">Golf</span>
                    <span className="porsgrunn-text">Porsgrunn</span>
                  </h1>
                  <span className="location-tag">📍 59.1394°N, 9.6218°E</span>
                </div>
              </Link>
              
              {/* Main Navigation - Desktop */}
              <nav className="hidden md:flex items-center justify-between gap-8">
                <Link 
                  href="/community"
                  className="text-white hover:text-[#CCFF00] font-medium transition-all duration-500 ease-in-out px-3 py-1 rounded-full hover:bg-white/10 hover:backdrop-blur-md hover:border hover:border-white/10 nav-link-utility whitespace-nowrap"
                >
                  {t.community}
                </Link>
                <Link 
                  href="/wishlist"
                  className="flex items-center gap-1 text-white hover:text-[#CCFF00] font-medium transition-all duration-500 ease-in-out px-3 py-1 rounded-full hover:bg-white/10 hover:backdrop-blur-md hover:border hover:border-white/10 nav-link-utility whitespace-nowrap"
                >
                  <Heart size={16} />
                  {t.wishlist}
                  {getWishlistCount() > 0 && (
                    <span className="text-xs text-[#CCFF00] font-medium">
                      ({getWishlistCount()})
                    </span>
                  )}
                </Link>
                {isAuthenticated() ? (
                  <Link 
                    href="/profile"
                    className="flex items-center gap-2 text-white hover:text-[#CCFF00] font-medium transition-all duration-500 ease-in-out px-4 py-1 rounded-full hover:bg-white/10 hover:backdrop-blur-md hover:border hover:border-white/10 nav-link-utility"
                  >
                    <div className="w-6 h-6 bg-gradient-to-r from-[#CCFF00] to-[#CCFF00]/60 rounded-full flex items-center justify-center text-[#1B3022] text-xs font-bold">
                      {user?.name?.[0]?.toUpperCase() || 'U'}
                    </div>
                    {user?.name}
                  </Link>
                ) : (
                  <Link 
                    href="/auth"
                    className="text-white hover:text-[#CCFF00] font-medium transition-all duration-500 ease-in-out px-3 py-1 rounded-full hover:bg-white/10 hover:backdrop-blur-md hover:border hover:border-white/10 nav-link-utility whitespace-nowrap"
                  >
                    {t.login}
                  </Link>
                )}
                <Link 
                  href="/about"
                  className="text-white hover:text-[#CCFF00] font-medium transition-all duration-500 ease-in-out px-3 py-1 rounded-full hover:bg-white/10 hover:backdrop-blur-md hover:border hover:border-white/10 nav-link-utility whitespace-nowrap"
                >
                  {t.about}
                </Link>
                <Link 
                  href="/shipping"
                  className="text-white hover:text-[#CCFF00] font-medium transition-all duration-500 ease-in-out px-3 py-1 rounded-full hover:bg-white/10 hover:backdrop-blur-md hover:border hover:border-white/10 nav-link-utility whitespace-nowrap"
                >
                  {t.shipping}
                </Link>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              {/* Language Toggle - Exclusive Visibility */}
              <button
                onClick={() => setLanguage(language === 'en' ? 'no' : 'en')}
                className="flex items-center gap-2 px-3 py-2 bg-[#1B3022]/50 rounded-lg hover:bg-[#39FF14]/10 transition-all duration-300 ease-in-out text-sm font-medium text-white hover:text-[#39FF14] border border-transparent hover:border-[#39FF14]/30 relative group"
              >
                <span className="text-sm transition-transform duration-300 group-hover:scale-110">
                  {language === 'en' ? '��' : '��'}
                </span>
                {language === 'en' ? 'EN' : 'NO'}
                {/* Power Port Indicator */}
                <span className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-1.5 h-1.5 bg-[#39FF14] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </button>
              
              <button className="p-2 text-white hover:text-[#CCFF00] transition-colors">
                <Search size={20} />
              </button>
              <button 
                onClick={() => setIsCartOpen(true)}
                className="p-2 text-white hover:text-[#CCFF00] transition-colors relative"
              >
                <ShoppingCart size={20} />
                {getCartItemCount() > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#CCFF00] text-[#1B3022] text-xs font-bold rounded-full flex items-center justify-center">
                    {getCartItemCount()}
                  </span>
                )}
              </button>
              
              {/* Mobile Menu Toggle */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-white hover:text-[#CCFF00] transition-colors"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#1B3022] border-b border-[#CCFF00]/20">
            <div className="px-4 py-4 space-y-3">
              <Link 
                href="/community"
                className="block text-white hover:text-[#CCFF00] font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t.community}
              </Link>
              <Link 
                href="/wishlist"
                className="block text-white hover:text-[#CCFF00] font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t.wishlist}
              </Link>
              <Link 
                href="/about"
                className="block text-white hover:text-[#CCFF00] font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t.about}
              </Link>
              <Link 
                href="/shipping"
                className="block text-white hover:text-[#CCFF00] font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t.shipping}
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Category Navigation - Fixed */}
      <CategoryNavigation />

      {/* Main Content with proper spacing */}
      <main className={isKapuchinRoute ? 'pt-0' : 'pt-32'}>
        {/* Breadcrumbs */}
        {showBreadcrumbs && (
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center gap-2 text-sm text-white/60">
              <Link href="/" className="hover:text-white/90 transition-colors flex items-center gap-1">
                <Home size={14} />
                {language === 'en' ? 'Home' : 'Hjem'}
              </Link>
              {breadcrumbs.map((crumb, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span>/</span>
                  {index === breadcrumbs.length - 1 ? (
                    <span className="text-white font-medium">{crumb.name}</span>
                  ) : (
                    <Link href={crumb.href} className="hover:text-white/90 transition-colors">
                      {crumb.name}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          </div>
        )}

        {/* Page Title */}
        {title && (
          <div className="px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white">{title}</h1>
          </div>
        )}

        {/* Page Content */}
        {children}
      </main>

      {/* Footer - Present on all pages */}
      <footer className="bg-[#0D1A11] border-t border-[#CCFF00]/20 text-gray-300 py-12 px-4 sm:px-6 lg:px-8 mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-[#CCFF00] to-[#CCFF00]/60 rounded-lg flex items-center justify-center">
                  <span className="text-[#1B3022] font-bold text-lg">⛳</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white font-display">
                    Kapuchin<span className="text-2xl">🐒</span>Golf
                  </h3>
                  <span className="text-[#CCFF00] text-sm font-medium">Porsgrunn</span>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                {language === 'en' 
                  ? 'Premium forest golf gear, made in Norway.'
                  : 'Premium skog golfutstyr, laget i Norge.'
                }
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-white">{language === 'en' ? 'Shop' : 'Butikk'}</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/category/performance-polos" className="hover:text-[#CCFF00] transition-colors">Polos</Link></li>
                <li><Link href="/category/microfiber-towels" className="hover:text-[#CCFF00] transition-colors">Towels</Link></li>
                <li><Link href="/category/structured-caps" className="hover:text-[#CCFF00] transition-colors">Caps</Link></li>
                <li><Link href="/category/lightweight-bags" className="hover:text-[#CCFF00] transition-colors">Bags</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-white">{language === 'en' ? 'Company' : 'Selskap'}</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/about" className="hover:text-[#CCFF00] transition-colors">{t.about}</Link></li>
                <li><Link href="/shipping" className="hover:text-[#CCFF00] transition-colors">{t.shipping}</Link></li>
                <li><Link href="/community" className="hover:text-[#CCFF00] transition-colors">{t.community}</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-white">{language === 'en' ? 'Contact' : 'Kontakt'}</h4>
              <div className="space-y-2 text-gray-400 text-sm">
                <p>hei@kapuchingolf.no</p>
                <p>Porsgrunn, Norway 🌲</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-500 text-sm">
            <p>© 2024 KapuchinGolf 🐒 Porsgrunn. {language === 'en' ? 'All rights reserved.' : 'Alle rettigheter reservert.'}</p>
          </div>
        </div>
      </footer>

      {/* Cart */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}
