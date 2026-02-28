'use client';

import { useStore } from '@/lib/store';
import { categories } from '@/lib/mock-data';
import { Slider } from '@radix-ui/react-slider';
import { useState } from 'react';
import { X, Tag, DollarSign, Percent } from 'lucide-react';

export default function CategoryFilter() {
  const { 
    selectedCategories, 
    setSelectedCategories, 
    priceRange, 
    setPriceRange,
    selectedPatterns,
    setSelectedPatterns 
  } = useStore();
  
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
    <div className="bg-bone-white rounded-xl sophisticated-shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">Filters</h2>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-warm-gray hover:text-foreground transition-colors flex items-center gap-1"
          >
            <X size={14} />
            Clear All
          </button>
        )}
      </div>

      {/* Categories */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
          <Tag size={16} className="text-electric-green" />
          Categories
        </h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label
              key={category.id}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(category.id)}
                onChange={() => handleCategoryToggle(category.id)}
                className="w-4 h-4 text-electric-green border-soft-gray rounded focus:ring-electric-green focus:ring-2"
              />
              <div className="flex-1">
                <span className="text-sm font-medium text-foreground group-hover:text-electric-green transition-colors">
                  {category.name}
                </span>
                <p className="text-xs text-warm-gray">{category.description}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
          <DollarSign size={16} className="text-sunset-orange" />
          Price Range
        </h3>
        <div className="space-y-4">
          <Slider
            value={localPriceRange}
            onValueChange={handlePriceRangeChange}
            max={200}
            min={0}
            step={5}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-foreground">${localPriceRange[0]}</span>
            <span className="font-medium text-foreground">${localPriceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Deals & Sales */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
          <Percent size={16} className="text-electric-green" />
          Deals & Sales
        </h3>
        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={dealsOnly}
            onChange={(e) => setDealsOnly(e.target.checked)}
            className="w-4 h-4 text-electric-green border-soft-gray rounded focus:ring-electric-green focus:ring-2"
          />
          <span className="text-sm font-medium text-foreground group-hover:text-electric-green transition-colors">
            Show bulk-buy discounts only
          </span>
        </label>
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="pt-4 border-t border-soft-gray">
          <p className="text-xs font-semibold text-foreground mb-3">Active Filters</p>
          <div className="flex flex-wrap gap-2">
            {selectedCategories.map((categoryId) => {
              const category = categories.find(c => c.id === categoryId);
              return (
                <span
                  key={categoryId}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-electric-green/10 text-electric-green text-xs font-medium rounded-full"
                >
                  {category?.name}
                </span>
              );
            })}
            {dealsOnly && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-sunset-orange/10 text-sunset-orange text-xs font-medium rounded-full">
                Deals Only
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
