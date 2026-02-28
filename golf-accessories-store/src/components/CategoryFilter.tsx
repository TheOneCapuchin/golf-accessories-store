'use client';

import { useStore } from '@/lib/store';
import { categories } from '@/lib/mock-data';
import { Slider } from '@radix-ui/react-slider';
import { useState } from 'react';
import { X, Tag, DollarSign, Percent } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function CategoryFilter() {
  const { 
    selectedCategories, 
    setSelectedCategories, 
    priceRange, 
    setPriceRange,
    selectedPatterns,
    setSelectedPatterns 
  } = useStore();
  
  const { t } = useLanguage();
  const [dealsOnly, setDealsOnly] = useState(false);
  const [localPriceRange, setLocalPriceRange] = useState(priceRange);

  const handleCategoryToggle = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  const handlePriceRangeChange = (value: number[]) => {
    setLocalPriceRange([value[0], value[1]]);
    setPriceRange([value[0], value[1]]);
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedPatterns([]);
    setPriceRange([0, 200]);
    setLocalPriceRange([0, 200]);
    setDealsOnly(false);
  };

  const hasActiveFilters = selectedCategories.length > 0 || selectedPatterns.length > 0 || dealsOnly;
  
  return (
    <div className="w-full bg-[#0D1A11] p-4 border-b border-green-900/30">
      <div className="space-y-4">
        {/* Categories */}
        <div>
          <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">
            {t.filterByCategory}
          </h3>
          <div className="space-y-2">
            {[
              { id: 'polos', name: t.performancePolos },
              { id: 'towels', name: t.microfiberTowels },
              { id: 'caps', name: t.structuredCaps },
              { id: 'bags', name: t.lightweightBags },
              { id: 'tees', name: t.durableTees },
              { id: 'putter-covers', name: t.putterCovers },
            ].map((category) => (
              <label key={category.id} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.id)}
                  onChange={() => handleCategoryToggle(category.id)}
                  className="w-4 h-4 text-[#39FF14] bg-[#1B3022] border-white/20 rounded focus:ring-[#39FF14] focus:ring-offset-[#0D1A11]"
                />
                <div className="flex-1">
                  <span className="text-sm font-medium text-white group-hover:text-[#39FF14] transition-colors">
                    {category.name}
                  </span>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
