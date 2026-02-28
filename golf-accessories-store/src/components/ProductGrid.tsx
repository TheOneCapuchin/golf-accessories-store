import { Product } from '@/lib/types';
import ProductCard from './ProductCard';
import { useStore } from '@/lib/store';

interface ProductGridProps {
  products?: Product[];
  onShowClubhouseModal?: () => void;
}

export default function ProductGrid({ products, onShowClubhouseModal }: ProductGridProps) {
  const { selectedPatterns } = useStore();

  const filteredProducts = (products || []).filter(product => {
    if (selectedPatterns.length === 0) return true;
    return product.patterns.some(pattern => selectedPatterns.includes(pattern.id));
  });

  if (filteredProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-24 h-24 bg-gradient-to-br from-electric-green/20 to-sunset-orange/20 rounded-full flex items-center justify-center mb-4">
          <span className="text-4xl">🏌️</span>
        </div>
        <h3 className="text-xl font-bold text-deep-navy mb-2">No products found</h3>
        <p className="text-gray-600 text-center max-w-md">
          Try adjusting your pattern filters to see more products.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
