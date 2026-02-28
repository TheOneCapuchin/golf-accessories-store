import { Product } from '@/lib/types';
import ProductCard from './ProductCard';
import { useStore } from '@/lib/store';
import { products as mockProducts } from '@/lib/mock-data';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';

interface ProductGridProps {
  products?: Product[];
  onShowClubhouseModal?: () => void;
}

export default function ProductGrid({ products, onShowClubhouseModal }: ProductGridProps) {
  const { selectedPatterns } = useStore();
  const pathname = usePathname();
  const { t } = useLanguage();
  
  // Check if we're on a category-specific route
  const isCategoryPage = pathname.startsWith('/category/') && pathname !== '/category';

  // Hard-Code Visibility Check
  console.log('Products received:', products);
  console.log('Products length:', products?.length || 0);
  console.log('Is category page:', isCategoryPage);
  
  // Force fallback if empty
  const productsToUse = products && products.length > 0 ? products : mockProducts;
  console.log('Products to use:', productsToUse);

  const filteredProducts = isCategoryPage ? productsToUse : productsToUse.filter(product => {
    if (selectedPatterns.length === 0) return true;
    return product.patterns.some(pattern => selectedPatterns.includes(pattern.id));
  });

  console.log('Filtered products:', filteredProducts);

  if (filteredProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 z-[5]">
        <p className="text-white text-lg">{t.emptyState}</p>
        <p className="text-white/60 text-sm mt-2">{t.backToStore}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 z-[10] relative -mt-[1px]">
      {filteredProducts.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onShowClubhouseModal={onShowClubhouseModal}
        />
      ))}
    </div>
  );
}
