export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  basePrice: number;
  images: string[];
  patterns: Pattern[];
  description: string;
  features: string[];
  inventory: InventoryItem[];
  landedCost: number;
  msrp: number;
  breakEvenPoint: number;
}

export interface Pattern {
  id: string;
  name: string;
  type: PatternType;
  colors: string[];
  thumbnail: string;
  description?: string;
}

export interface InventoryItem {
  patternId: string;
  quantity: number;
  bulkPrice: number;
  minOrderQuantity: number;
}

export interface CartItem {
  productId: string;
  patternId: string;
  quantity: number;
  price: number;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export type PatternType = 
  | 'neon'
  | 'floral' 
  | 'geometric'
  | 'retro'
  | 'solid'
  | 'camo'
  | 'abstract';

export interface QuantityPricing {
  minQuantity: number;
  pricePerUnit: number;
  savings: number;
}

export interface AdminMetrics {
  totalRevenue: number;
  totalCost: number;
  profitMargin: number;
  unitsSold: number;
  breakEvenStatus: Record<string, boolean>;
}
