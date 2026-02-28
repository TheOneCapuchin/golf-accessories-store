'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useStore } from '@/lib/store';
import { ShoppingCart, Search, Menu, Heart, ArrowLeft, Home } from 'lucide-react';
import CategoryNavigation from '@/components/CategoryNavigation';
import Cart from '@/components/Cart';

interface GlobalLayoutProps {
  children: React.ReactNode;
  showBreadcrumbs?: boolean;
  breadcrumbs?: Array<{ name: string; href: string }>;
  title?: string;
}

const translations = {
  en: {
    community: 'Community',
    wishlist: 'Wishlist',
    login: 'Log In / Sign Up',
    about: 'About',
    shipping: 'Shipping',
    comingSoon: 'Coming Soon',
    comingSoonText: 'More Vibrant Designs',
    emptyState: 'No products found in this category yet.',
    backToStore: 'Back to Store'
  },
  no: {
    community: 'Samfunn',
    wishlist: 'Ønskeliste',
    login: 'Logg Inn / Registrer',
    about: 'Om Oss',
    shipping: 'Frakt',
    comingSoon: 'Kommer Snart',
    comingSoonText: 'Flere Fargerike Design',
    emptyState: 'Ingen produkter funnet i denne kategorien ennå.',
    backToStore: 'Tilbake til Butikk'
  }
};

export default function GlobalLayout({ 
  children, 
  showBreadcrumbs = false, 
  breadcrumbs = [],
  title 
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
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState<'en' | 'no'>('en');
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  
  const t = translations[language];

  // Fade-in effect
  useEffect(() => {
    const timer = setTimeout(() => setIsPageLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleQuickAdd = (product: any, patternId: string) => {
    addToCart(product, patternId, 1);
  };

  return (
    <div className={`min-h-screen bg-bone-white transition-opacity duration-300 ${isPageLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Header - Fixed */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-bone-white/95 backdrop-blur-sm border-b border-soft-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-electric-green to-sunset-orange rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">⛳</span>
                </div>
                <h1 className="text-xl font-bold gradient-text">GolfVibe</h1>
              </Link>
              
              {/* Main Navigation - Desktop */}
              <nav className="hidden md:flex items-center justify-between gap-8">
                <Link 
                  href="/community"
                  className="text-foreground hover:text-electric-green font-medium transition-colors"
                >
                  {t.community}
                </Link>
                <Link 
                  href="/wishlist"
                  className="flex items-center gap-1 text-foreground hover:text-electric-green font-medium transition-colors"
                >
                  <Heart size={16} />
                  {t.wishlist}
                  {getWishlistCount() > 0 && (
                    <span className="text-xs text-electric-green font-medium">
                      ({getWishlistCount()})
                    </span>
                  )}
                </Link>
                {isAuthenticated() ? (
                  <Link 
                    href="/profile"
                    className="flex items-center gap-2 text-foreground hover:text-electric-green font-medium transition-colors"
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
                    {t.login}
                  </Link>
                )}
                <Link 
                  href="/about"
                  className="text-foreground hover:text-electric-green font-medium transition-colors"
                >
                  {t.about}
                </Link>
                <Link 
                  href="/shipping"
                  className="text-foreground hover:text-electric-green font-medium transition-colors"
                >
                  {t.shipping}
                </Link>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              {/* Language Toggle */}
              <button
                onClick={() => setLanguage(language === 'en' ? 'no' : 'en')}
                className="flex items-center gap-1 px-3 py-2 bg-soft-gray rounded-lg hover:bg-soft-gray/80 transition-colors text-sm font-medium text-foreground"
              >
                <span className="text-lg">{language === 'en' ? '🇬🇧' : '🇳🇴'}</span>
                {language === 'en' ? 'EN' : 'NO'}
              </button>
              
              <button className="p-2 text-foreground hover:text-electric-green transition-colors">
                <Search size={20} />
              </button>
              <button 
                onClick={() => setIsCartOpen(true)}
                className="p-2 text-foreground hover:text-electric-green transition-colors relative"
              >
                <ShoppingCart size={20} />
                {getCartItemCount() > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-electric-green text-deep-navy text-xs font-bold rounded-full flex items-center justify-center">
                    {getCartItemCount()}
                  </span>
                )}
              </button>
              
              {/* Mobile Menu Toggle */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-foreground hover:text-electric-green transition-colors"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-bone-white border-b border-soft-gray">
            <div className="px-4 py-4 space-y-3">
              <Link 
                href="/community"
                className="block text-foreground hover:text-electric-green font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t.community}
              </Link>
              <Link 
                href="/wishlist"
                className="block text-foreground hover:text-electric-green font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t.wishlist}
              </Link>
              <Link 
                href="/about"
                className="block text-foreground hover:text-electric-green font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t.about}
              </Link>
              <Link 
                href="/shipping"
                className="block text-foreground hover:text-electric-green font-medium transition-colors"
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
      <main className="pt-32">
        {/* Breadcrumbs */}
        {showBreadcrumbs && (
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center gap-2 text-sm text-warm-gray">
              <Link href="/" className="hover:text-foreground transition-colors flex items-center gap-1">
                <Home size={14} />
                {language === 'en' ? 'Home' : 'Hjem'}
              </Link>
              {breadcrumbs.map((crumb, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span>/</span>
                  {index === breadcrumbs.length - 1 ? (
                    <span className="text-foreground font-medium">{crumb.name}</span>
                  ) : (
                    <Link href={crumb.href} className="hover:text-foreground transition-colors">
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
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">{title}</h1>
          </div>
        )}

        {/* Page Content */}
        {children}
      </main>

      {/* Footer - Present on all pages */}
      <footer className="bg-foreground text-white py-12 px-4 sm:px-6 lg:px-8 mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-electric-green to-sunset-orange rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">⛳</span>
                </div>
                <h3 className="text-xl font-bold">GolfVibe</h3>
              </div>
              <p className="text-white/80 text-sm">
                {language === 'en' 
                  ? 'Anti-boring golf gear, made in Norway.'
                  : 'Anti-kjedelig golfutstyr, laget i Norge.'
                }
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">{language === 'en' ? 'Shop' : 'Butikk'}</h4>
              <ul className="space-y-2 text-white/80 text-sm">
                <li><Link href="/category/performance-polos" className="hover:text-white transition-colors">Polos</Link></li>
                <li><Link href="/category/microfiber-towels" className="hover:text-white transition-colors">Towels</Link></li>
                <li><Link href="/category/structured-caps" className="hover:text-white transition-colors">Caps</Link></li>
                <li><Link href="/category/lightweight-bags" className="hover:text-white transition-colors">Bags</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">{language === 'en' ? 'Company' : 'Selskap'}</h4>
              <ul className="space-y-2 text-white/80 text-sm">
                <li><Link href="/about" className="hover:text-white transition-colors">{t.about}</Link></li>
                <li><Link href="/shipping" className="hover:text-white transition-colors">{t.shipping}</Link></li>
                <li><Link href="/community" className="hover:text-white transition-colors">{t.community}</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">{language === 'en' ? 'Contact' : 'Kontakt'}</h4>
              <div className="space-y-2 text-white/80 text-sm">
                <p>hei@golfvibe.no</p>
                <p>Porsgrunn, Norway</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60 text-sm">
            <p>© 2024 GolfVibe. {language === 'en' ? 'All rights reserved.' : 'Alle rettigheter reservert.'}</p>
          </div>
        </div>
      </footer>

      {/* Cart */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}
