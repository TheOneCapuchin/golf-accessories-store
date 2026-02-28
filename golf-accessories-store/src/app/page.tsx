'use client';

import { useEffect, useState } from 'react';
import { useStore } from '@/lib/store';
import { products, categories } from '@/lib/mock-data';
import ProductGrid from '@/components/ProductGrid';
import CategoryFilter from '@/components/CategoryFilter';
import ClubhouseModal from '@/components/ClubhouseModal';
import Link from 'next/link';

export default function Home() {
  const { setProducts } = useStore();
  const [isClubhouseModalOpen, setIsClubhouseModalOpen] = useState(false);

  useEffect(() => {
    setProducts(products);
  }, [setProducts]);

  useEffect(() => {
    // Show clubhouse modal after 5 seconds for new users
    const hasSeenModal = localStorage.getItem('has_seen_clubhouse_modal');
    if (!hasSeenModal) {
      const timer = setTimeout(() => {
        setIsClubhouseModalOpen(true);
        localStorage.setItem('has_seen_clubhouse_modal', 'true');
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-electric-green/10 via-transparent to-sunset-orange/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Anti-Boring Golf Gear That Actually Stands Out
          </h2>
          <p className="text-xl text-warm-gray mb-8 max-w-2xl mx-auto">
            Tired of navy blue and white? We bring personality to the course with vibrant, individualized golf accessories made in Norway.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/category/performance-polos"
              className="accent-button px-8 py-4 rounded-xl text-lg inline-block"
            >
              Shop Now
            </Link>
            <Link 
              href="/about"
              className="subtle-button px-8 py-4 rounded-xl text-lg inline-block"
            >
              Our Story
            </Link>
          </div>
        </div>
        
        {/* Lifestyle Image Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="grid grid-cols-3 gap-8 opacity-20">
            <div className="text-8xl transform rotate-12">👕</div>
            <div className="text-8xl transform -rotate-6">⛳</div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <div className="lg:w-80 flex-shrink-0">
              <CategoryFilter />
            </div>
            
            {/* Product Grid */}
            <div className="flex-1">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-2">Featured Products</h3>
                <p className="text-warm-gray">
                  Discover our collection of individualized golf accessories
                </p>
              </div>
              
              <ProductGrid onShowClubhouseModal={() => setIsClubhouseModalOpen(true)} products={products} />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-electric-green to-sunset-orange rounded-lg flex items-center justify-center">
                  <span className="text-foreground font-bold text-lg">⛳</span>
                </div>
                <h4 className="text-xl font-bold">GolfVibe</h4>
              </div>
              <p className="text-gray-400">
                Anti-boring golf accessories for players who dare to stand out.
              </p>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Shop</h5>
              <ul className="space-y-2 text-gray-400">
                {categories.map((category) => (
                  <li key={category.id}>
                    <button className="hover:text-electric-green transition-colors">
                      {category.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Company</h5>
              <ul className="space-y-2 text-gray-400">
                <li><button className="hover:text-electric-green transition-colors">About Us</button></li>
                <li><button className="hover:text-electric-green transition-colors">Sustainability</button></li>
                <li><button className="hover:text-electric-green transition-colors">Contact</button></li>
                <li><button className="hover:text-electric-green transition-colors">Blog</button></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Connect</h5>
              <ul className="space-y-2 text-gray-400">
                <li><button className="hover:text-electric-green transition-colors">Instagram</button></li>
                <li><button className="hover:text-electric-green transition-colors">TikTok</button></li>
                <li><button className="hover:text-electric-green transition-colors">YouTube</button></li>
                <li><button className="hover:text-electric-green transition-colors">Email Newsletter</button></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 GolfVibe. All rights reserved. | Anti-Boring Golf Gear</p>
          </div>
        </div>
      </footer>
      
      {/* Clubhouse Modal */}
      <ClubhouseModal 
        isOpen={isClubhouseModalOpen} 
        onClose={() => setIsClubhouseModalOpen(false)} 
      />
    </>
  );
}
