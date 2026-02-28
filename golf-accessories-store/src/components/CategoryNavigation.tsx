'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { categories } from '@/lib/mock-data';

export default function CategoryNavigation() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-16 z-30 bg-bone-white border-b border-soft-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          <div className="flex items-center space-x-8 overflow-x-auto">
            {categories.map((category) => {
              const isActive = pathname === `/category/${category.id}`;
              return (
                <Link
                  key={category.id}
                  href={`/category/${category.id}`}
                  className={`whitespace-nowrap px-3 py-2 text-sm font-medium transition-colors border-b-2 ${
                    isActive
                      ? 'text-electric-green border-electric-green'
                      : 'text-foreground border-transparent hover:text-electric-green hover:border-soft-gray'
                  }`}
                >
                  {category.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
