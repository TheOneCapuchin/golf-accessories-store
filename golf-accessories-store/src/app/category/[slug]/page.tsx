'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useStore } from '@/lib/store';
import { categories, products } from '@/lib/mock-data';
import { ProductCategory } from '@/lib/types';
import ProductGrid from '@/components/ProductGrid';
import CategoryFilter from '@/components/CategoryFilter';
import ClubhouseModal from '@/components/ClubhouseModal';
import ComingSoon from '@/components/ComingSoon';

export default function CategoryPage() {
  const params = useParams();
  const { setProducts, selectedCategories, setSelectedCategories, filteredProducts } = useStore();
  const [currentCategory, setCurrentCategory] = useState<ProductCategory | null>(null);
  const [isClubhouseModalOpen, setIsClubhouseModalOpen] = useState(false);

  useEffect(() => {
    setProducts(products);
    
    // Find current category based on slug
    const category = categories.find(cat => cat.id === params.slug);
    if (category) {
      setCurrentCategory(category);
      // Auto-select this category in the filter
      setSelectedCategories([category.id]);
    }
  }, [params.slug, setProducts, setSelectedCategories]);

  if (!currentCategory) {
    return (
      <ComingSoon category={params.slug as string} />
    );
  }

  const categoryProducts = products.filter(product => 
    product.category.id === currentCategory.id
  );

  return (
    <>
      {/* Products - Direct-to-Grid Layout */}
      <section className="min-w-full overflow-x-hidden">
        {/* Fixed Left Border - Viewport Pinned */}
        <div className="fixed left-0 top-16 w-20 h-screen bg-[#0D1A11] z-40 border-t border-black/20"></div>
        
        {/* Fixed Right Border - Viewport Pinned */}
        <div className="fixed right-0 top-16 w-20 h-screen bg-[#0D1A11] z-40 border-t border-black/20"></div>
        
        {/* Center Content with Side Border Padding */}
        <div className="flex justify-center w-full">
          <div className="flex flex-col lg:flex-row max-w-7xl w-full">
            {/* Filter Sidebar - Integrated */}
            <div className="bg-[#0D1A11] hidden lg:block sticky top-16 w-80 h-[calc(100vh-4rem)] overflow-y-auto z-45 flex-shrink-0">
              <div className="pl-4 pr-6 py-6">
                <CategoryFilter />
              </div>
            </div>

            {/* Product Grid Content with Border Clearance */}
            <div className="flex-1 px-4 sm:px-6 lg:px-8 lg:pl-12 lg:pr-12 main-content">
              <div className="max-w-7xl mx-auto">
                <ProductGrid products={categoryProducts} onShowClubhouseModal={() => setIsClubhouseModalOpen(true)} />
              </div>
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
