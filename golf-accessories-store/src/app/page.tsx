'use client';

import { useEffect, useState } from 'react';
import { useStore } from '@/lib/store';
import { products, categories } from '@/lib/mock-data';
import CategoryFilter from '@/components/CategoryFilter';
import CategoryNavigation from '@/components/CategoryNavigation';
import ProductGrid from '@/components/ProductGrid';
import JungleStageCarousel from '@/components/JungleStageCarousel';
import Link from 'next/link';
import ClubhouseModal from '@/components/ClubhouseModal';

export default function Home() {
  const { setProducts } = useStore();
  const [isClubhouseModalOpen, setIsClubhouseModalOpen] = useState(false);

  useEffect(() => {
    setProducts(products);
  }, [setProducts]);

  useEffect(() => {
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
      {/* Hero Section - Jungle Stage Carousel */}
      <section className="relative w-full bg-[#1B3022] overflow-hidden mt-0 mb-0">
        <JungleStageCarousel />
      </section>

      {/* Main Content - Viewport Pinned Layout */}
      <main className="min-w-full overflow-x-hidden pt-0 gap-y-0 space-y-0">
        {/* Fixed Left Border - Viewport Pinned */}
        <div className="absolute left-0 top-16 w-20 h-screen bg-[#0D1A11] z-[50] border-t border-black/20 mt-0"></div>
        
        {/* Fixed Right Border - Viewport Pinned */}
        <div className="absolute right-0 top-16 w-20 h-screen bg-[#0D1A11] z-[50] border-t border-black/20 mt-0"></div>
        
        {/* Center Content with Side Border Padding */}
        <div className="flex w-full mx-20 mt-0">
          <div className="flex flex-col lg:flex-row w-full gap-y-0">
            {/* Filter Sidebar - Integrated */}
            <div className="bg-[#0D1A11] hidden lg:block sticky top-16 w-80 h-[calc(100vh-4rem)] overflow-y-auto z-[50] flex-shrink-0 ml-0 mt-0">
              <div className="pl-4 pr-6 py-6">
                <CategoryFilter />
              </div>
            </div>
            
            {/* Product Grid Content with Border Clearance */}
            <div className="flex-1 px-4 sm:px-6 lg:px-8 lg:pl-12 lg:pr-12 main-content mt-0">
              <div className="w-full">
                {/* Featured Products Section - Primal Jungle */}
                <section className="w-full bg-[#0D1A11] border-b border-green-900/50 mt-0 mb-0">
                  <div className="px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-black uppercase tracking-wider text-white">
                      Featured Products
                    </h2>
                  </div>
                </section>
                
                <section className="w-full bg-[#0D1A11]">
                  <div className="px-4 sm:px-6 lg:px-8 py-8">
                    <ProductGrid onShowClubhouseModal={() => setIsClubhouseModalOpen(true)} products={products} />
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Clubhouse Modal */}
      <ClubhouseModal 
        isOpen={isClubhouseModalOpen} 
        onClose={() => setIsClubhouseModalOpen(false)} 
      />
    </>
  );
}
