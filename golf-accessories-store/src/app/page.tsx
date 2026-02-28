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
      {/* Hero Section with Mist Effect */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-electric-lime/5 via-transparent to-electric-lime/5">
        {/* Mist Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-mist via-transparent to-mist pointer-events-none"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Premium Forest Golf Gear That Stands Out
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Experience the exclusive KapuchinGolf clubhouse atmosphere in Porsgrunn. Premium golf accessories with Deep Forest vibes and Electric Lime energy. 🐒⛳
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/category/performance-polos"
              className="bg-electric-lime text-deep-forest px-8 py-4 rounded-xl text-lg font-bold hover:bg-electric-lime/90 transition-all transform hover:scale-105 inline-block"
            >
              Shop Now
            </Link>
            <Link 
              href="/about"
              className="border border-electric-lime text-electric-lime px-8 py-4 rounded-xl text-lg font-bold hover:bg-electric-lime hover:text-deep-forest transition-all inline-block"
            >
              Our Story
            </Link>
          </div>
        </div>
        
        {/* Forest Atmosphere Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <div className="grid grid-cols-3 gap-8">
            <div className="text-8xl transform rotate-12">🌲</div>
            <div className="text-8xl transform -rotate-6">�</div>
            <div className="text-8xl transform rotate-12">⛳</div>
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
                <h3 className="text-2xl font-bold text-white mb-2">Featured Products</h3>
                <p className="text-white/70">
                  Discover our collection of premium forest golf accessories
                </p>
              </div>
              
              <ProductGrid onShowClubhouseModal={() => setIsClubhouseModalOpen(true)} products={products} />
            </div>
          </div>
        </div>
      </section>

      {/* Clubhouse Modal */}
      <ClubhouseModal 
        isOpen={isClubhouseModalOpen} 
        onClose={() => setIsClubhouseModalOpen(false)} 
      />
    </>
  );
}
