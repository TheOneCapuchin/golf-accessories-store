import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatPrice(price: number, language: 'en' | 'no' = 'en'): string {
  if (language === 'no') {
    // Norwegian Krone formatting
    return new Intl.NumberFormat('nb-NO', {
      style: 'currency',
      currency: 'NOK',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price * 10); // Rough conversion: 1 USD ≈ 10 NOK
  } else {
    // USD formatting
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  }
}

export function calculateQuantityPricing(basePrice: number, quantity: number): number {
  if (quantity >= 100) return basePrice * 0.7; // 30% off
  if (quantity >= 50) return basePrice * 0.8;  // 20% off
  if (quantity >= 25) return basePrice * 0.9;  // 10% off
  return basePrice;
}

export function getQuantityPricingTiers(basePrice: number) {
  return [
    { minQuantity: 1, pricePerUnit: basePrice, savings: 0 },
    { minQuantity: 25, pricePerUnit: basePrice * 0.9, savings: 10 },
    { minQuantity: 50, pricePerUnit: basePrice * 0.8, savings: 20 },
    { minQuantity: 100, pricePerUnit: basePrice * 0.7, savings: 30 },
  ];
}
