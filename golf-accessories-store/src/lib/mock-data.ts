import { Product, Pattern, ProductCategory, AdminMetrics } from './types';

export const patterns: Pattern[] = [
  {
    id: 'neon-wave',
    name: 'Neon Wave',
    type: 'neon',
    colors: ['#00FF88', '#FF10F0', '#00D4FF'],
    thumbnail: '/patterns/neon-wave.jpg',
    description: 'Electric neon waves that glow on the green'
  },
  {
    id: 'retro-90s',
    name: 'Retro 90s',
    type: 'retro',
    colors: ['#FF6B35', '#9C27B0', '#FFD700'],
    thumbnail: '/patterns/retro-90s.jpg',
    description: 'Vintage 90s geometric patterns'
  },
  {
    id: 'floral-fairway',
    name: 'Floral Fairway',
    type: 'floral',
    colors: ['#E91E63', '#00FF88', '#FFD700'],
    thumbnail: '/patterns/floral-fairway.jpg',
    description: 'Elegant floral designs with a golf twist'
  },
  {
    id: 'geometric-dash',
    name: 'Geometric Dash',
    type: 'geometric',
    colors: ['#1A237E', '#00FF88', '#FF6B35'],
    thumbnail: '/patterns/geometric-dash.jpg',
    description: 'Bold geometric patterns for the modern golfer'
  },
  {
    id: 'electric-camo',
    name: 'Electric Camo',
    type: 'camo',
    colors: ['#00FF88', '#1A237E', '#00D4FF'],
    thumbnail: '/patterns/electric-camo.jpg',
    description: 'High-tech camouflage with electric colors'
  },
  {
    id: 'abstract-flow',
    name: 'Abstract Flow',
    type: 'abstract',
    colors: ['#FF10F0', '#00D4FF', '#FFD700'],
    thumbnail: '/patterns/abstract-flow.jpg',
    description: 'Fluid abstract patterns that stand out'
  }
];

export const categories: ProductCategory[] = [
  {
    id: 'polos',
    name: 'Performance Polos',
    slug: 'polos',
    description: 'Moisture-wicking polos with vibrant patterns'
  },
  {
    id: 'towels',
    name: 'Golf Towels',
    slug: 'towels',
    description: 'Premium microfiber towels with custom designs'
  },
  {
    id: 'caps',
    name: 'Golf Caps',
    slug: 'caps',
    description: 'Structured caps with bold patterns'
  },
  {
    id: 'bags',
    name: 'Golf Bags',
    slug: 'bags',
    description: 'Lightweight bags with individualized style'
  },
  {
    id: 'tees',
    name: 'Golf Tees',
    slug: 'tees',
    description: 'Durable tees with colorful patterns'
  },
  {
    id: 'putter-covers',
    name: 'Putter Covers',
    slug: 'putter-covers',
    description: 'Handcrafted covers with unique designs'
  }
];

export const products: Product[] = [
  // Performance Polos - 6 products
  {
    id: 'performance-polo-elite',
    name: 'Elite Performance Polo',
    category: categories[0],
    basePrice: 49.99,
    images: [
      'https://source.unsplash.com/400x300/?colorful-golf-polo,vibrant-patterns',
      'https://source.unsplash.com/400x300/?golf-shirt,neon-designs',
      'https://source.unsplash.com/400x300/?polo-shirt,abstract-patterns'
    ],
    patterns: [patterns[0], patterns[1], patterns[2]],
    description: 'Premium moisture-wicking fabric with UV protection. Designed for peak performance on the course.',
    features: [
      'Moisture-wicking technology',
      'UV 50+ protection',
      'Anti-odor treatment',
      'Four-way stretch',
      'Tag-free label'
    ],
    inventory: [
      { patternId: patterns[0].id, quantity: 150, bulkPrice: 25.00, minOrderQuantity: 50 },
      { patternId: patterns[1].id, quantity: 100, bulkPrice: 27.00, minOrderQuantity: 50 },
      { patternId: patterns[2].id, quantity: 75, bulkPrice: 28.00, minOrderQuantity: 50 }
    ],
    landedCost: 25.00,
    msrp: 49.99,
    breakEvenPoint: 50
  },
  {
    id: 'performance-polo-pro',
    name: 'Pro Tour Polo',
    category: categories[0],
    basePrice: 54.99,
    images: [
      'https://source.unsplash.com/400x300/?professional-golf-shirt,premium-fabric',
      'https://source.unsplash.com/400x300/?tournament-polo,athletic-wear',
      'https://source.unsplash.com/400x300/?golf-apparel,performance-fabric'
    ],
    patterns: [patterns[3], patterns[4], patterns[5]],
    description: 'Tour-level performance with enhanced breathability and professional styling.',
    features: [
      'Tour-grade fabric',
      'Enhanced breathability',
      'Professional fit',
      'Quick-dry technology',
      'Performance collar'
    ],
    inventory: [
      { patternId: patterns[3].id, quantity: 120, bulkPrice: 27.50, minOrderQuantity: 50 },
      { patternId: patterns[4].id, quantity: 90, bulkPrice: 28.00, minOrderQuantity: 50 },
      { patternId: patterns[5].id, quantity: 80, bulkPrice: 29.00, minOrderQuantity: 50 }
    ],
    landedCost: 27.50,
    msrp: 54.99,
    breakEvenPoint: 50
  },
  {
    id: 'performance-polo-slim',
    name: 'Slim Fit Performance Polo',
    category: categories[0],
    basePrice: 44.99,
    images: [
      'https://source.unsplash.com/400x300/?slim-fit-polo,golf-fashion',
      'https://source.unsplash.com/400x300/?athletic-polo,modern-fit',
      'https://source.unsplash.com/400x300/?golf-style,contemporary-design'
    ],
    patterns: [patterns[0], patterns[3], patterns[4]],
    description: 'Modern slim fit with performance features for the style-conscious golfer.',
    features: [
      'Slim fit design',
      'Performance fabric',
      'Modern styling',
      'Athletic cut',
      'Contemporary look'
    ],
    inventory: [
      { patternId: patterns[0].id, quantity: 100, bulkPrice: 22.50, minOrderQuantity: 50 },
      { patternId: patterns[3].id, quantity: 80, bulkPrice: 23.00, minOrderQuantity: 50 },
      { patternId: patterns[4].id, quantity: 70, bulkPrice: 24.00, minOrderQuantity: 50 }
    ],
    landedCost: 22.50,
    msrp: 44.99,
    breakEvenPoint: 50
  },
  {
    id: 'performance-polo-classic',
    name: 'Classic Cut Polo',
    category: categories[0],
    basePrice: 42.99,
    images: [
      'https://source.unsplash.com/400x300/?classic-golf-polo,traditional-style',
      'https://source.unsplash.com/400x300/?timeless-polo,golf-fashion',
      'https://source.unsplash.com/400x300/?traditional-golf-shirt,classic-design'
    ],
    patterns: [patterns[1], patterns[2], patterns[5]],
    description: 'Traditional golf polo styling with modern performance technology.',
    features: [
      'Classic fit',
      'Traditional styling',
      'Performance fabric',
      'Timeless design',
      'Comfortable cut'
    ],
    inventory: [
      { patternId: patterns[1].id, quantity: 110, bulkPrice: 21.50, minOrderQuantity: 50 },
      { patternId: patterns[2].id, quantity: 85, bulkPrice: 22.00, minOrderQuantity: 50 },
      { patternId: patterns[5].id, quantity: 75, bulkPrice: 23.00, minOrderQuantity: 50 }
    ],
    landedCost: 21.50,
    msrp: 42.99,
    breakEvenPoint: 50
  },
  {
    id: 'performance-polo-athletic',
    name: 'Athletic Performance Polo',
    category: categories[0],
    basePrice: 47.99,
    images: [
      'https://source.unsplash.com/400x300/?athletic-golf-shirt,sportswear',
      'https://source.unsplash.com/400x300/?sporty-polo,active-wear',
      'https://source.unsplash.com/400x300/?golf-athletic,performance-gear'
    ],
    patterns: [patterns[0], patterns[4], patterns[5]],
    description: 'Athletic cut designed for maximum movement and performance.',
    features: [
      'Athletic cut',
      'Maximum mobility',
      'Performance fabric',
      'Sport styling',
      'Active wear design'
    ],
    inventory: [
      { patternId: patterns[0].id, quantity: 95, bulkPrice: 24.00, minOrderQuantity: 50 },
      { patternId: patterns[4].id, quantity: 75, bulkPrice: 25.00, minOrderQuantity: 50 },
      { patternId: patterns[5].id, quantity: 65, bulkPrice: 26.00, minOrderQuantity: 50 }
    ],
    landedCost: 24.00,
    msrp: 47.99,
    breakEvenPoint: 50
  },
  {
    id: 'performance-polo-luxe',
    name: 'Luxury Performance Polo',
    category: categories[0],
    basePrice: 59.99,
    images: [
      'https://source.unsplash.com/400x300/?luxury-golf-shirt,premium-fabric',
      'https://source.unsplash.com/400x300/?high-end-polo,designer-golf',
      'https://source.unsplash.com/400x300/?premium-golf-wear,luxury-sportswear'
    ],
    patterns: [patterns[1], patterns[3], patterns[5]],
    description: 'Premium materials and craftsmanship for the discerning golfer.',
    features: [
      'Luxury fabric',
      'Premium craftsmanship',
      'Designer styling',
      'High-end materials',
      'Elite performance'
    ],
    inventory: [
      { patternId: patterns[1].id, quantity: 60, bulkPrice: 30.00, minOrderQuantity: 50 },
      { patternId: patterns[3].id, quantity: 50, bulkPrice: 31.00, minOrderQuantity: 50 },
      { patternId: patterns[5].id, quantity: 40, bulkPrice: 32.00, minOrderQuantity: 50 }
    ],
    landedCost: 30.00,
    msrp: 59.99,
    breakEvenPoint: 50
  },

  // Golf Towels - 5 products
  {
    id: 'microfiber-towel-premium',
    name: 'Premium Microfiber Towel',
    category: categories[1],
    basePrice: 24.99,
    images: [
      'https://source.unsplash.com/400x300/?colorful-golf-towel,microfiber',
      'https://source.unsplash.com/400x300/?golf-accessories,vibrant-towel',
      'https://source.unsplash.com/400x300/?patterned-golf-towel,sports-accessory'
    ],
    patterns: [patterns[3], patterns[4], patterns[5]],
    description: 'Ultra-absorbent microfiber towel with carabiner clip. Perfect for keeping your gear clean.',
    features: [
      'Super absorbent microfiber',
      'Carabiner clip included',
      'Tri-fold design',
      'Machine washable',
      'Quick-dry material'
    ],
    inventory: [
      { patternId: patterns[3].id, quantity: 200, bulkPrice: 12.00, minOrderQuantity: 100 },
      { patternId: patterns[4].id, quantity: 150, bulkPrice: 13.00, minOrderQuantity: 100 },
      { patternId: patterns[5].id, quantity: 125, bulkPrice: 13.50, minOrderQuantity: 100 }
    ],
    landedCost: 12.00,
    msrp: 24.99,
    breakEvenPoint: 100
  },
  {
    id: 'microfiber-towel-pro',
    name: 'Pro Grade Microfiber Towel',
    category: categories[1],
    basePrice: 29.99,
    images: [
      'https://source.unsplash.com/400x300/?professional-golf-towel,premium-accessory',
      'https://source.unsplash.com/400x300/?tournament-towel,pro-gear',
      'https://source.unsplash.com/400x300/?golf-equipment,high-quality-towel'
    ],
    patterns: [patterns[0], patterns[1], patterns[2]],
    description: 'Professional-grade towel with enhanced absorbency and durability.',
    features: [
      'Pro-grade material',
      'Enhanced absorbency',
      'Superior durability',
      'Professional quality',
      'Heavy-duty construction'
    ],
    inventory: [
      { patternId: patterns[0].id, quantity: 150, bulkPrice: 15.00, minOrderQuantity: 100 },
      { patternId: patterns[1].id, quantity: 120, bulkPrice: 16.00, minOrderQuantity: 100 },
      { patternId: patterns[2].id, quantity: 100, bulkPrice: 17.00, minOrderQuantity: 100 }
    ],
    landedCost: 15.00,
    msrp: 29.99,
    breakEvenPoint: 100
  },
  {
    id: 'microfiber-towel-compact',
    name: 'Compact Microfiber Towel',
    category: categories[1],
    basePrice: 19.99,
    images: [
      'https://source.unsplash.com/400x300/?compact-golf-towel,small-accessory',
      'https://source.unsplash.com/400x300/?mini-golf-towel,portable-gear',
      'https://source.unsplash.com/400x300/?travel-golf-towel,compact-design'
    ],
    patterns: [patterns[3], patterns[4], patterns[0]],
    description: 'Compact size perfect for golf bags or pockets without sacrificing performance.',
    features: [
      'Compact design',
      'Portable size',
      'Space-saving',
      'Lightweight',
      'Easy to carry'
    ],
    inventory: [
      { patternId: patterns[3].id, quantity: 180, bulkPrice: 10.00, minOrderQuantity: 100 },
      { patternId: patterns[4].id, quantity: 140, bulkPrice: 11.00, minOrderQuantity: 100 },
      { patternId: patterns[0].id, quantity: 110, bulkPrice: 12.00, minOrderQuantity: 100 }
    ],
    landedCost: 10.00,
    msrp: 19.99,
    breakEvenPoint: 100
  },
  {
    id: 'microfiber-towel-large',
    name: 'Large Microfiber Towel',
    category: categories[1],
    basePrice: 34.99,
    images: [
      'https://source.unsplash.com/400x300/?large-golf-towel,oversized-accessory',
      'https://source.unsplash.com/400x300/?big-golf-towel,extra-large',
      'https://source.unsplash.com/400x300/?golf-bag-towel,full-size'
    ],
    patterns: [patterns[1], patterns[2], patterns[5]],
    description: 'Extra-large towel for maximum coverage and cleaning power.',
    features: [
      'Extra-large size',
      'Maximum coverage',
      'Heavy-duty cleaning',
      'Full-size design',
      'Premium absorbency'
    ],
    inventory: [
      { patternId: patterns[1].id, quantity: 100, bulkPrice: 17.50, minOrderQuantity: 100 },
      { patternId: patterns[2].id, quantity: 80, bulkPrice: 18.00, minOrderQuantity: 100 },
      { patternId: patterns[5].id, quantity: 70, bulkPrice: 19.00, minOrderQuantity: 100 }
    ],
    landedCost: 17.50,
    msrp: 34.99,
    breakEvenPoint: 100
  },
  {
    id: 'microfiber-towel-luxe',
    name: 'Luxury Microfiber Towel',
    category: categories[1],
    basePrice: 39.99,
    images: [
      'https://source.unsplash.com/400x300/?luxury-golf-towel,premium-fabric',
      'https://source.unsplash.com/400x300/?designer-golf-towel,high-end-accessory',
      'https://source.unsplash.com/400x300/?premium-golf-towel,luxury-sports'
    ],
    patterns: [patterns[0], patterns[3], patterns[4]],
    description: 'Premium luxury towel with superior materials and craftsmanship.',
    features: [
      'Luxury materials',
      'Superior craftsmanship',
      'Premium fabric',
      'Elite quality',
      'Designer patterns'
    ],
    inventory: [
      { patternId: patterns[0].id, quantity: 80, bulkPrice: 20.00, minOrderQuantity: 100 },
      { patternId: patterns[3].id, quantity: 60, bulkPrice: 21.00, minOrderQuantity: 100 },
      { patternId: patterns[4].id, quantity: 50, bulkPrice: 22.00, minOrderQuantity: 100 }
    ],
    landedCost: 20.00,
    msrp: 39.99,
    breakEvenPoint: 100
  },

  // Golf Caps - 4 products
  {
    id: 'structured-cap-pro',
    name: 'Pro Structured Cap',
    category: categories[2],
    basePrice: 34.99,
    images: [
      'https://source.unsplash.com/400x300/?colorful-golf-cap,structured-hat',
      'https://source.unsplash.com/400x300/?patterned-golf-cap,vibrant-headwear',
      'https://source.unsplash.com/400x300/?golf-hat,modern-design'
    ],
    patterns: [patterns[0], patterns[1], patterns[2]],
    description: 'Structured fit with embroidered patterns. Adjustable strap for perfect fit.',
    features: [
      'Structured 6-panel design',
      'Adjustable plastic snapback',
      'Embroidered patterns',
      'Moisture-wicking sweatband',
      'Pre-curved visor'
    ],
    inventory: [
      { patternId: patterns[0].id, quantity: 120, bulkPrice: 18.00, minOrderQuantity: 75 },
      { patternId: patterns[1].id, quantity: 90, bulkPrice: 19.00, minOrderQuantity: 75 },
      { patternId: patterns[2].id, quantity: 80, bulkPrice: 20.00, minOrderQuantity: 75 }
    ],
    landedCost: 18.00,
    msrp: 34.99,
    breakEvenPoint: 75
  },
  {
    id: 'structured-cap-flex',
    name: 'Flex Fit Cap',
    category: categories[2],
    basePrice: 32.99,
    images: [
      'https://source.unsplash.com/400x300/?flex-fit-golf-cap,stretch-hat',
      'https://source.unsplash.com/400x300/?elastic-golf-cap,comfortable-fit',
      'https://source.unsplash.com/400x300/?stretch-golf-hat,modern-cap'
    ],
    patterns: [patterns[3], patterns[4], patterns[5]],
    description: 'Stretch fit cap with flexible sizing and comfortable wear.',
    features: [
      'Stretch fit design',
      'Flexible sizing',
      'Comfortable wear',
      'No strap needed',
      'Modern fit'
    ],
    inventory: [
      { patternId: patterns[3].id, quantity: 100, bulkPrice: 16.50, minOrderQuantity: 75 },
      { patternId: patterns[4].id, quantity: 80, bulkPrice: 17.00, minOrderQuantity: 75 },
      { patternId: patterns[5].id, quantity: 70, bulkPrice: 18.00, minOrderQuantity: 75 }
    ],
    landedCost: 16.50,
    msrp: 32.99,
    breakEvenPoint: 75
  },
  {
    id: 'structured-cap-classic',
    name: 'Classic Golf Cap',
    category: categories[2],
    basePrice: 29.99,
    images: [
      'https://source.unsplash.com/400x300/?classic-golf-cap,traditional-hat',
      'https://source.unsplash.com/400x300/?timeless-golf-cap,vintage-style',
      'https://source.unsplash.com/400x300/?traditional-golf-hat,classic-design'
    ],
    patterns: [patterns[0], patterns[2], patterns[4]],
    description: 'Traditional golf cap styling with modern comfort features.',
    features: [
      'Classic styling',
      'Traditional design',
      'Comfortable fit',
      'Timeless look',
      'Golf heritage'
    ],
    inventory: [
      { patternId: patterns[0].id, quantity: 110, bulkPrice: 15.00, minOrderQuantity: 75 },
      { patternId: patterns[2].id, quantity: 85, bulkPrice: 16.00, minOrderQuantity: 75 },
      { patternId: patterns[4].id, quantity: 75, bulkPrice: 17.00, minOrderQuantity: 75 }
    ],
    landedCost: 15.00,
    msrp: 29.99,
    breakEvenPoint: 75
  },
  {
    id: 'structured-cap-performance',
    name: 'Performance Golf Cap',
    category: categories[2],
    basePrice: 36.99,
    images: [
      'https://source.unsplash.com/400x300/?performance-golf-cap,athletic-hat',
      'https://source.unsplash.com/400x300/?sport-golf-cap,active-wear',
      'https://source.unsplash.com/400x300/?athletic-golf-hat,performance-gear'
    ],
    patterns: [patterns[1], patterns[3], patterns[5]],
    description: 'Performance-focused cap with advanced moisture management.',
    features: [
      'Performance fabric',
      'Moisture management',
      'Athletic styling',
      'Advanced materials',
      'Sport performance'
    ],
    inventory: [
      { patternId: patterns[1].id, quantity: 90, bulkPrice: 18.50, minOrderQuantity: 75 },
      { patternId: patterns[3].id, quantity: 70, bulkPrice: 19.00, minOrderQuantity: 75 },
      { patternId: patterns[5].id, quantity: 60, bulkPrice: 20.00, minOrderQuantity: 75 }
    ],
    landedCost: 18.50,
    msrp: 36.99,
    breakEvenPoint: 75
  },

  // Golf Bags - 4 products
  {
    id: 'lightweight-bag-stand',
    name: 'Ultralight Stand Bag',
    category: categories[3],
    basePrice: 189.99,
    images: [
      'https://source.unsplash.com/400x300/?colorful-golf-bag,stand-bag',
      'https://source.unsplash.com/400x300/?patterned-golf-bag,vibrant-design',
      'https://source.unsplash.com/400x300/?golf-stand-bag,modern-style'
    ],
    patterns: [patterns[3], patterns[4], patterns[5]],
    description: 'Lightweight stand bag with custom patterns. Perfect for walking the course.',
    features: [
      'Ultra-lightweight construction',
      'Dual shoulder straps',
      '5-way divider top',
      '6 pockets including cooler pocket',
      'Automatic stand system'
    ],
    inventory: [
      { patternId: patterns[3].id, quantity: 40, bulkPrice: 95.00, minOrderQuantity: 25 },
      { patternId: patterns[4].id, quantity: 30, bulkPrice: 98.00, minOrderQuantity: 25 },
      { patternId: patterns[5].id, quantity: 25, bulkPrice: 100.00, minOrderQuantity: 25 }
    ],
    landedCost: 95.00,
    msrp: 189.99,
    breakEvenPoint: 25
  },
  {
    id: 'lightweight-bag-cart',
    name: 'Lightweight Cart Bag',
    category: categories[3],
    basePrice: 219.99,
    images: [
      'https://source.unsplash.com/400x300/?golf-cart-bag,premium-design',
      'https://source.unsplash.com/400x300/?cart-golf-bag,luxury-style',
      'https://source.unsplash.com/400x300/?golf-bag-cart,high-end'
    ],
    patterns: [patterns[0], patterns[1], patterns[2]],
    description: 'Cart-compatible bag with premium features and ample storage.',
    features: [
      'Cart compatible design',
      'Premium construction',
      'Ample storage',
      '14-way divider',
      'Luxury features'
    ],
    inventory: [
      { patternId: patterns[0].id, quantity: 35, bulkPrice: 110.00, minOrderQuantity: 25 },
      { patternId: patterns[1].id, quantity: 25, bulkPrice: 112.00, minOrderQuantity: 25 },
      { patternId: patterns[2].id, quantity: 20, bulkPrice: 115.00, minOrderQuantity: 25 }
    ],
    landedCost: 110.00,
    msrp: 219.99,
    breakEvenPoint: 25
  },
  {
    id: 'lightweight-bag-sunday',
    name: 'Sunday Golf Bag',
    category: categories[3],
    basePrice: 149.99,
    images: [
      'https://source.unsplash.com/400x300/?sunday-golf-bag,lightweight-design',
      'https://source.unsplash.com/400x300/?compact-golf-bag,portable-style',
      'https://source.unsplash.com/400x300/?minimal-golf-bag,lightweight-gear'
    ],
    patterns: [patterns[3], patterns[4], patterns[0]],
    description: 'Compact Sunday bag perfect for quick rounds and essential clubs.',
    features: [
      'Compact design',
      'Lightweight construction',
      'Essential storage',
      'Quick round ready',
      'Minimalist approach'
    ],
    inventory: [
      { patternId: patterns[3].id, quantity: 45, bulkPrice: 75.00, minOrderQuantity: 25 },
      { patternId: patterns[4].id, quantity: 35, bulkPrice: 77.00, minOrderQuantity: 25 },
      { patternId: patterns[0].id, quantity: 30, bulkPrice: 80.00, minOrderQuantity: 25 }
    ],
    landedCost: 75.00,
    msrp: 149.99,
    breakEvenPoint: 25
  },
  {
    id: 'lightweight-bag-tour',
    name: 'Tour Staff Bag',
    category: categories[3],
    basePrice: 299.99,
    images: [
      'https://source.unsplash.com/400x300/?tour-golf-bag,professional-equipment',
      'https://source.unsplash.com/400x300/?staff-golf-bag,pro-level',
      'https://source.unsplash.com/400x300/?tour-bag-golf,premium-gear'
    ],
    patterns: [patterns[1], patterns[2], patterns[5]],
    description: 'Professional tour-level bag with maximum storage and premium features.',
    features: [
      'Tour-level construction',
      'Maximum storage',
      'Premium materials',
      'Professional design',
      'Pro tour features'
    ],
    inventory: [
      { patternId: patterns[1].id, quantity: 20, bulkPrice: 150.00, minOrderQuantity: 25 },
      { patternId: patterns[2].id, quantity: 15, bulkPrice: 155.00, minOrderQuantity: 25 },
      { patternId: patterns[5].id, quantity: 10, bulkPrice: 160.00, minOrderQuantity: 25 }
    ],
    landedCost: 150.00,
    msrp: 299.99,
    breakEvenPoint: 25
  },

  // Golf Tees - 5 products
  {
    id: 'durable-tees-premium',
    name: 'Pro Grade Golf Tees',
    category: categories[4],
    basePrice: 9.99,
    images: [
      'https://source.unsplash.com/400x300/?colorful-golf-tees,vibrant-designs',
      'https://source.unsplash.com/400x300/?patterned-golf-tees,sports-accessory',
      'https://source.unsplash.com/400x300/?golf-tees,bright-colors'
    ],
    patterns: [patterns[0], patterns[1], patterns[2]],
    description: 'Durable plastic tees with vibrant patterns. Pack of 20 tees in assorted heights.',
    features: [
      'Pack of 20 tees',
      'Assorted heights (2.75", 3.25")',
      'Durable plastic construction',
      'Low drag design',
      'Vibrant patterns'
    ],
    inventory: [
      { patternId: patterns[0].id, quantity: 500, bulkPrice: 4.00, minOrderQuantity: 200 },
      { patternId: patterns[1].id, quantity: 400, bulkPrice: 4.20, minOrderQuantity: 200 },
      { patternId: patterns[2].id, quantity: 350, bulkPrice: 4.50, minOrderQuantity: 200 }
    ],
    landedCost: 4.00,
    msrp: 9.99,
    breakEvenPoint: 200
  },
  {
    id: 'durable-tees-bamboo',
    name: 'Bamboo Golf Tees',
    category: categories[4],
    basePrice: 12.99,
    images: [
      'https://source.unsplash.com/400x300/?bamboo-golf-tees,eco-friendly',
      'https://source.unsplash.com/400x300/?wooden-golf-tees,natural-material',
      'https://source.unsplash.com/400x300/?sustainable-golf-tees,eco-design'
    ],
    patterns: [patterns[3], patterns[4], patterns[5]],
    description: 'Eco-friendly bamboo tees with natural strength and biodegradable design.',
    features: [
      'Eco-friendly bamboo',
      'Biodegradable',
      'Natural strength',
      'Sustainable material',
      'Environmental choice'
    ],
    inventory: [
      { patternId: patterns[3].id, quantity: 300, bulkPrice: 6.50, minOrderQuantity: 200 },
      { patternId: patterns[4].id, quantity: 250, bulkPrice: 7.00, minOrderQuantity: 200 },
      { patternId: patterns[5].id, quantity: 200, bulkPrice: 7.50, minOrderQuantity: 200 }
    ],
    landedCost: 6.50,
    msrp: 12.99,
    breakEvenPoint: 200
  },
  {
    id: 'durable-tees-pro',
    name: 'Professional Golf Tees',
    category: categories[4],
    basePrice: 14.99,
    images: [
      'https://source.unsplash.com/400x300/?professional-golf-tees,premium-quality',
      'https://source.unsplash.com/400x300/?tournament-golf-tees,pro-grade',
      'https://source.unsplash.com/400x300/?competition-golf-tees,high-performance'
    ],
    patterns: [patterns[0], patterns[2], patterns[4]],
    description: 'Professional-grade tees used by tour players for maximum performance.',
    features: [
      'Professional grade',
      'Tour approved',
      'Maximum performance',
      'Competition ready',
      'Pro quality'
    ],
    inventory: [
      { patternId: patterns[0].id, quantity: 250, bulkPrice: 7.50, minOrderQuantity: 200 },
      { patternId: patterns[2].id, quantity: 200, bulkPrice: 8.00, minOrderQuantity: 200 },
      { patternId: patterns[4].id, quantity: 180, bulkPrice: 8.50, minOrderQuantity: 200 }
    ],
    landedCost: 7.50,
    msrp: 14.99,
    breakEvenPoint: 200
  },
  {
    id: 'durable-tees-mixed',
    name: 'Mixed Height Golf Tees',
    category: categories[4],
    basePrice: 11.99,
    images: [
      'https://source.unsplash.com/400x300/?mixed-golf-tees,assorted-sizes',
      'https://source.unsplash.com/400x300/?variety-golf-tees,multiple-heights',
      'https://source.unsplash.com/400x300/?assorted-golf-tees,different-sizes'
    ],
    patterns: [patterns[1], patterns[3], patterns[5]],
    description: 'Mixed pack with various heights for different clubs and situations.',
    features: [
      'Mixed heights',
      'Various sizes',
      'Club specific',
      'Versatile pack',
      'Complete set'
    ],
    inventory: [
      { patternId: patterns[1].id, quantity: 350, bulkPrice: 6.00, minOrderQuantity: 200 },
      { patternId: patterns[3].id, quantity: 280, bulkPrice: 6.50, minOrderQuantity: 200 },
      { patternId: patterns[5].id, quantity: 220, bulkPrice: 7.00, minOrderQuantity: 200 }
    ],
    landedCost: 6.00,
    msrp: 11.99,
    breakEvenPoint: 200
  },
  {
    id: 'durable-tees-luxe',
    name: 'Luxury Golf Tees',
    category: categories[4],
    basePrice: 16.99,
    images: [
      'https://source.unsplash.com/400x300/?luxury-golf-tees,premium-design',
      'https://source.unsplash.com/400x300/?designer-golf-tees,high-end',
      'https://source.unsplash.com/400x300/?premium-golf-tees,luxury-sports'
    ],
    patterns: [patterns[0], patterns[3], patterns[4]],
    description: 'Premium luxury tees with superior materials and exclusive designs.',
    features: [
      'Luxury materials',
      'Premium design',
      'Exclusive patterns',
      'Superior quality',
      'Elite performance'
    ],
    inventory: [
      { patternId: patterns[0].id, quantity: 200, bulkPrice: 8.50, minOrderQuantity: 200 },
      { patternId: patterns[3].id, quantity: 150, bulkPrice: 9.00, minOrderQuantity: 200 },
      { patternId: patterns[4].id, quantity: 120, bulkPrice: 9.50, minOrderQuantity: 200 }
    ],
    landedCost: 8.50,
    msrp: 16.99,
    breakEvenPoint: 200
  },

  // Putter Covers - 5 products
  {
    id: 'putter-cover-classic',
    name: 'Handcrafted Putter Cover',
    category: categories[5],
    basePrice: 44.99,
    images: [
      'https://source.unsplash.com/400x300/?colorful-putter-cover,vibrant-design',
      'https://source.unsplash.com/400x300/?patterned-putter-cover,golf-accessory',
      'https://source.unsplash.com/400x300/?golf-putter-cover,modern-style'
    ],
    patterns: [patterns[3], patterns[4], patterns[5]],
    description: 'Premium putter cover with magnetic closure. Protect your putter in style.',
    features: [
      'Magnetic closure system',
      'Soft inner lining',
      'Water-resistant exterior',
      'Embroidered details',
      'Universal fit for most putters'
    ],
    inventory: [
      { patternId: patterns[3].id, quantity: 80, bulkPrice: 22.00, minOrderQuantity: 40 },
      { patternId: patterns[4].id, quantity: 60, bulkPrice: 23.00, minOrderQuantity: 40 },
      { patternId: patterns[5].id, quantity: 50, bulkPrice: 24.00, minOrderQuantity: 40 }
    ],
    landedCost: 22.00,
    msrp: 44.99,
    breakEvenPoint: 40
  },
  {
    id: 'putter-cover-blade',
    name: 'Blade Putter Cover',
    category: categories[5],
    basePrice: 39.99,
    images: [
      'https://source.unsplash.com/400x300/?blade-putter-cover,traditional-design',
      'https://source.unsplash.com/400x300/?classic-putter-cover,blade-style',
      'https://source.unsplash.com/400x300/?traditional-putter-cover,vintage-look'
    ],
    patterns: [patterns[0], patterns[1], patterns[2]],
    description: 'Specially designed for blade putters with snug fit and protection.',
    features: [
      'Blade putter specific',
      'Snug fit design',
      'Enhanced protection',
      'Traditional styling',
      'Perfect compatibility'
    ],
    inventory: [
      { patternId: patterns[0].id, quantity: 70, bulkPrice: 20.00, minOrderQuantity: 40 },
      { patternId: patterns[1].id, quantity: 55, bulkPrice: 21.00, minOrderQuantity: 40 },
      { patternId: patterns[2].id, quantity: 45, bulkPrice: 22.00, minOrderQuantity: 40 }
    ],
    landedCost: 20.00,
    msrp: 39.99,
    breakEvenPoint: 40
  },
  {
    id: 'putter-cover-mallet',
    name: 'Mallet Putter Cover',
    category: categories[5],
    basePrice: 42.99,
    images: [
      'https://source.unsplash.com/400x300/?mallet-putter-cover,modern-design',
      'https://source.unsplash.com/400x300/?large-putter-cover,mallet-style',
      'https://source.unsplash.com/400x300/?oversized-putter-cover,modern-golf'
    ],
    patterns: [patterns[3], patterns[4], patterns[0]],
    description: 'Designed for larger mallet putters with extra room and protection.',
    features: [
      'Mallet putter design',
      'Extra room',
      'Enhanced protection',
      'Modern styling',
      'Large putter compatible'
    ],
    inventory: [
      { patternId: patterns[3].id, quantity: 65, bulkPrice: 21.50, minOrderQuantity: 40 },
      { patternId: patterns[4].id, quantity: 50, bulkPrice: 22.00, minOrderQuantity: 40 },
      { patternId: patterns[0].id, quantity: 40, bulkPrice: 23.00, minOrderQuantity: 40 }
    ],
    landedCost: 21.50,
    msrp: 42.99,
    breakEvenPoint: 40
  },
  {
    id: 'putter-cover-luxe',
    name: 'Luxury Putter Cover',
    category: categories[5],
    basePrice: 54.99,
    images: [
      'https://source.unsplash.com/400x300/?luxury-putter-cover,premium-materials',
      'https://source.unsplash.com/400x300/?designer-putter-cover,high-end',
      'https://source.unsplash.com/400x300/?premium-putter-cover,luxury-golf'
    ],
    patterns: [patterns[1], patterns[2], patterns[5]],
    description: 'Premium luxury cover with leather accents and superior craftsmanship.',
    features: [
      'Luxury materials',
      'Leather accents',
      'Superior craftsmanship',
      'Premium construction',
      'Elite design'
    ],
    inventory: [
      { patternId: patterns[1].id, quantity: 40, bulkPrice: 27.50, minOrderQuantity: 40 },
      { patternId: patterns[2].id, quantity: 30, bulkPrice: 28.00, minOrderQuantity: 40 },
      { patternId: patterns[5].id, quantity: 25, bulkPrice: 29.00, minOrderQuantity: 40 }
    ],
    landedCost: 27.50,
    msrp: 54.99,
    breakEvenPoint: 40
  },
  {
    id: 'putter-cover-custom',
    name: 'Custom Putter Cover',
    category: categories[5],
    basePrice: 49.99,
    images: [
      'https://source.unsplash.com/400x300/?custom-putter-cover,personalized-design',
      'https://source.unsplash.com/400x300/?personalized-golf-cover,custom-style',
      'https://source.unsplash.com/400x300/?bespoke-putter-cover,unique-design'
    ],
    patterns: [patterns[0], patterns[3], patterns[4]],
    description: 'Customizable cover with personalization options and unique designs.',
    features: [
      'Customizable design',
      'Personalization options',
      'Unique patterns',
      'Personal touch',
      'Bespoke styling'
    ],
    inventory: [
      { patternId: patterns[0].id, quantity: 55, bulkPrice: 25.00, minOrderQuantity: 40 },
      { patternId: patterns[3].id, quantity: 45, bulkPrice: 26.00, minOrderQuantity: 40 },
      { patternId: patterns[4].id, quantity: 35, bulkPrice: 27.00, minOrderQuantity: 40 }
    ],
    landedCost: 25.00,
    msrp: 49.99,
    breakEvenPoint: 40
  }
];

export const mockAdminMetrics: AdminMetrics = {
  totalRevenue: 15420.50,
  totalCost: 8230.25,
  profitMargin: 46.6,
  unitsSold: 342,
  breakEvenStatus: {
    'neon-wave': true,
    'retro-90s': false,
    'floral-fairway': true,
    'geometric-dash': false,
    'electric-camo': true,
    'abstract-flow': false
  }
};
