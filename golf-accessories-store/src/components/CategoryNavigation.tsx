'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { categories } from '@/lib/mock-data';
import { useLanguage } from '@/context/LanguageContext';

export default function CategoryNavigation() {
  const pathname = usePathname();
  const { t } = useLanguage();

  return (
    <nav className="sticky top-16 z-30 bg-[#0D1A11] border-b border-white/10 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          <div className="flex items-center space-x-8 overflow-x-auto">
            {categories.map((category) => {
              const isActive = pathname === `/category/${category.id}`;
              
              // Get translated category name
              const getTranslatedName = (categoryId: string) => {
                switch (categoryId) {
                  case 'polos':
                    return t.performancePolos;
                  case 'towels':
                    return t.microfiberTowels;
                  case 'caps':
                    return t.structuredCaps;
                  case 'bags':
                    return t.lightweightBags;
                  case 'tees':
                    return t.durableTees;
                  case 'putter-covers':
                    return t.putterCovers;
                  default:
                    return category.name;
                }
              };

              return (
                <Link
                  key={category.id}
                  href={`/category/${category.id}`}
                  className={`relative whitespace-nowrap px-3 py-2 text-sm font-medium transition-colors nav-link-underglow ${
                    isActive
                      ? 'text-[#39FF14] active'
                      : 'text-white/80'
                  }`}
                >
                  {getTranslatedName(category.id)}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
