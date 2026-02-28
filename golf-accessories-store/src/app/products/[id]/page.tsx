'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useStore } from '@/lib/store';
import { products } from '@/lib/mock-data';
import { formatPrice, getQuantityPricingTiers } from '@/lib/utils';
import { ShoppingCart, Plus, Minus, Star, Heart, Share2 } from 'lucide-react';
import ImageZoom from '@/components/ImageZoom';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const { addToCart } = useStore();
  
  const [selectedPattern, setSelectedPattern] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  
  const product = products.find(p => p.id === productId);
  
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-deep-navy mb-4">Product not found</h1>
          <button className="text-electric-green hover:text-sunset-orange">
            Back to shop
          </button>
        </div>
      </div>
    );
  }
  
  const currentPattern = product.patterns[selectedPattern];
  const pricingTiers = getQuantityPricingTiers(product.basePrice);
  const currentPrice = pricingTiers.find(tier => quantity >= tier.minQuantity)?.pricePerUnit || product.basePrice;
  
  const handleAddToCart = () => {
    addToCart(product, currentPattern.id, quantity);
  };
  
  const updateQuantity = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-electric-green/5 to-sunset-orange/5">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-electric-green to-sunset-orange rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">⛳</span>
              </div>
              <h1 className="text-xl font-bold gradient-text">GolfVibe</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="p-2 text-deep-navy hover:text-electric-green transition-colors">
                <Heart size={20} />
              </button>
              <button className="p-2 text-deep-navy hover:text-electric-green transition-colors">
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-xl">
              <ImageZoom
                src={product.images[selectedImage]}
                alt={`${currentPattern.name} ${product.name}`}
                className="w-full h-full"
              />
            </div>
            
            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    selectedImage === index
                      ? 'border-electric-green shadow-lg'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-xs text-gray-500">View {index + 1}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-sm font-semibold text-electric-green bg-electric-green/10 px-3 py-1 rounded-full">
                  {product.category.name}
                </span>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-sm text-gray-600 ml-1">(4.9)</span>
                </div>
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-bold text-deep-navy mb-4">
                {product.name}
              </h1>
              
              <p className="text-lg text-gray-600 mb-6">
                {product.description}
              </p>
            </div>

            {/* Pattern Selection */}
            <div>
              <h3 className="text-lg font-semibold text-deep-navy mb-3">Choose Your Pattern</h3>
              <div className="grid grid-cols-2 gap-3">
                {product.patterns.map((pattern, index) => (
                  <button
                    key={pattern.id}
                    onClick={() => setSelectedPattern(index)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                      selectedPattern === index
                        ? 'border-electric-green bg-electric-green/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex gap-1">
                        {pattern.colors.slice(0, 3).map((color, colorIndex) => (
                          <div
                            key={colorIndex}
                            className="w-4 h-4 rounded-full border border-white/50"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      {selectedPattern === index && (
                        <div className="w-5 h-5 bg-electric-green rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                      )}
                    </div>
                    <p className="font-semibold text-deep-navy">{pattern.name}</p>
                    <p className="text-xs text-gray-500 capitalize">{pattern.type} Pattern</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity-Based Pricing */}
            <div>
              <h3 className="text-lg font-semibold text-deep-navy mb-3">Quantity Pricing</h3>
              <div className="space-y-2">
                {pricingTiers.map((tier, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-200 ${
                      quantity >= tier.minQuantity
                        ? 'border-electric-green bg-electric-green/5'
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full ${
                        quantity >= tier.minQuantity ? 'bg-electric-green' : 'bg-gray-300'
                      }`} />
                      <span className="font-medium text-deep-navy">
                        {tier.minQuantity}+ units
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-deep-navy">
                        {formatPrice(tier.pricePerUnit)} each
                      </p>
                      {tier.savings > 0 && (
                        <p className="text-sm text-electric-green font-semibold">
                          Save {tier.savings}%
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div>
              <h3 className="text-lg font-semibold text-deep-navy mb-3">Quantity</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border-2 border-gray-200 rounded-lg">
                  <button
                    onClick={() => updateQuantity(quantity - 1)}
                    className="p-3 text-deep-navy hover:bg-gray-100 transition-colors"
                  >
                    <Minus size={20} />
                  </button>
                  <div className="w-16 text-center">
                    <span className="text-xl font-bold text-deep-navy">{quantity}</span>
                  </div>
                  <button
                    onClick={() => updateQuantity(quantity + 1)}
                    className="p-3 text-deep-navy hover:bg-gray-100 transition-colors"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                
                <div className="text-right">
                  <p className="text-sm text-gray-600">Total Price</p>
                  <p className="text-2xl font-bold text-deep-navy">
                    {formatPrice(currentPrice * quantity)}
                  </p>
                </div>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-gradient-to-r from-electric-green to-sunset-orange text-deep-navy py-4 rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center justify-center gap-3"
            >
              <ShoppingCart size={24} />
              Add to Cart - {formatPrice(currentPrice * quantity)}
            </button>

            {/* Product Features */}
            <div>
              <h3 className="text-lg font-semibold text-deep-navy mb-3">Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-600">
                    <div className="w-2 h-2 bg-electric-green rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Pattern Details */}
            <div className="p-4 bg-gradient-to-r from-electric-green/10 to-sunset-orange/10 rounded-xl">
              <h4 className="font-semibold text-deep-navy mb-2">About {currentPattern.name} Pattern</h4>
              <p className="text-gray-600 text-sm">
                {currentPattern.description || `A unique ${currentPattern.type} pattern designed to make you stand out on the course.`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
