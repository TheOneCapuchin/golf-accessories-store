'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import { categories, products } from '@/lib/mock-data';
import { ProductCategory } from '@/lib/types';
import ProductGrid from '@/components/ProductGrid';
import CategoryFilter from '@/components/CategoryFilter';
import ClubhouseModal from '@/components/ClubhouseModal';
import ComingSoon from '@/components/ComingSoon';
import { Home, ChevronRight } from 'lucide-react';

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
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

  const breadcrumbs = [
    { name: 'Accessories', href: '/category/performance-polos' },
    { name: currentCategory.name, href: `/category/${currentCategory.id}` }
  ];

  return (
    <>
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-warm-gray px-4 sm:px-6 lg:px-8 py-4">
        <Link href="/" className="hover:text-foreground transition-colors flex items-center gap-1">
          <Home size={14} />
          Home
        </Link>
        {breadcrumbs.map((crumb, index) => (
          <div key={index} className="flex items-center gap-2">
            <ChevronRight size={14} />
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

      {/* Category Hero */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {currentCategory.name} Collection
          </h1>
          <p className="text-xl text-warm-gray mb-8 max-w-2xl mx-auto">
            Discover our vibrant {currentCategory.name.toLowerCase()} with unique patterns and designs
          </p>
        </div>
      </section>

      {/* Products */}
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
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  {currentCategory.name} Collection
                </h2>
                <p className="text-warm-gray">
                  Discover our vibrant {currentCategory.name.toLowerCase()} with unique patterns and designs
                </p>
              </div>
              
              <ProductGrid products={categoryProducts} onShowClubhouseModal={() => setIsClubhouseModalOpen(true)} />
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
