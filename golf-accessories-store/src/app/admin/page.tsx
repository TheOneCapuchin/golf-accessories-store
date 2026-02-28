'use client';

import { useEffect, useState } from 'react';
import { useStore } from '@/lib/store';
import { products, patterns, mockAdminMetrics } from '@/lib/mock-data';
import { formatPrice } from '@/lib/utils';
import { AdminMetrics } from '@/lib/types';
import { 
  TrendingUp, 
  DollarSign, 
  Package, 
  Target, 
  AlertCircle, 
  CheckCircle,
  BarChart3,
  PieChart,
  Users
} from 'lucide-react';

export default function AdminDashboard() {
  const { setProducts, cart } = useStore();
  const [metrics, setMetrics] = useState<AdminMetrics>(mockAdminMetrics);

  useEffect(() => {
    setProducts(products);
  }, [setProducts]);

  const getPatternPerformance = () => {
    return patterns.map(pattern => {
      const isBreakEven = metrics.breakEvenStatus[pattern.id];
      const patternProducts = products.filter(p => p.patterns.some(pat => pat.id === pattern.id));
      const totalInventory = patternProducts.reduce((sum, product) => {
        const inventory = product.inventory.find(inv => inv.patternId === pattern.id);
        return sum + (inventory?.quantity || 0);
      }, 0);

      return {
        pattern,
        isBreakEven,
        totalInventory,
        productCount: patternProducts.length
      };
    });
  };

  const getTopProducts = () => {
    return products
      .map(product => ({
        ...product,
        totalSold: Math.floor(Math.random() * 100) + 10, // Mock sales data
        revenue: product.basePrice * (Math.floor(Math.random() * 100) + 10)
      }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);
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
              <h1 className="text-xl font-bold gradient-text">GolfVibe Admin</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="text-deep-navy hover:text-electric-green font-medium transition-colors">
                View Store
              </button>
              <button className="p-2 text-deep-navy hover:text-electric-green transition-colors">
                <BarChart3 size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-deep-navy mb-2">Admin Dashboard</h2>
          <p className="text-gray-600">Track your business performance and profit margins</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-electric-green/10 rounded-lg flex items-center justify-center">
                <DollarSign className="text-electric-green" size={24} />
              </div>
              <span className="text-sm font-semibold text-electric-green">+12.5%</span>
            </div>
            <h3 className="text-2xl font-bold text-deep-navy mb-1">
              {formatPrice(metrics.totalRevenue)}
            </h3>
            <p className="text-sm text-gray-600">Total Revenue</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-sunset-orange/10 rounded-lg flex items-center justify-center">
                <Package className="text-sunset-orange" size={24} />
              </div>
              <span className="text-sm font-semibold text-sunset-orange">+8.2%</span>
            </div>
            <h3 className="text-2xl font-bold text-deep-navy mb-1">
              {metrics.unitsSold}
            </h3>
            <p className="text-sm text-gray-600">Units Sold</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-deep-navy/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="text-deep-navy" size={24} />
              </div>
              <span className="text-sm font-semibold text-deep-navy">+2.1%</span>
            </div>
            <h3 className="text-2xl font-bold text-deep-navy mb-1">
              {metrics.profitMargin.toFixed(1)}%
            </h3>
            <p className="text-sm text-gray-600">Profit Margin</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-neon-pink/10 rounded-lg flex items-center justify-center">
                <Target className="text-neon-pink" size={24} />
              </div>
              <span className="text-sm font-semibold text-neon-pink">75%</span>
            </div>
            <h3 className="text-2xl font-bold text-deep-navy mb-1">
              {Object.values(metrics.breakEvenStatus).filter(Boolean).length}/{Object.keys(metrics.breakEvenStatus).length}
            </h3>
            <p className="text-sm text-gray-600">Break-Even Hit</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Pattern Performance */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-deep-navy mb-6">Pattern Performance</h3>
            <div className="space-y-4">
              {getPatternPerformance().map(({ pattern, isBreakEven, totalInventory, productCount }) => (
                <div key={pattern.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="flex gap-1">
                      {pattern.colors.slice(0, 3).map((color, index) => (
                        <div
                          key={index}
                          className="w-4 h-4 rounded-full border border-white/50"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                    <div>
                      <p className="font-semibold text-deep-navy">{pattern.name}</p>
                      <p className="text-sm text-gray-600 capitalize">{pattern.type} • {productCount} products</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Stock</p>
                      <p className="font-semibold text-deep-navy">{totalInventory}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {isBreakEven ? (
                        <>
                          <CheckCircle className="text-electric-green" size={20} />
                          <span className="text-sm font-semibold text-electric-green">Break-Even</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="text-sunset-orange" size={20} />
                          <span className="text-sm font-semibold text-sunset-orange">Not Yet</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-deep-navy mb-6">Top Performing Products</h3>
            <div className="space-y-4">
              {getTopProducts().map((product, index) => (
                <div key={product.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-electric-green to-sunset-orange rounded-lg flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-deep-navy">{product.name}</p>
                      <p className="text-sm text-gray-600">{product.totalSold} units sold</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-bold text-deep-navy">{formatPrice(product.revenue)}</p>
                    <p className="text-sm text-gray-600">{formatPrice(product.basePrice)} each</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Profit Margin Analysis */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-deep-navy mb-6">Profit Margin Analysis</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="p-4 bg-gradient-to-br from-electric-green/10 to-electric-green/5 rounded-lg">
              <h4 className="font-semibold text-deep-navy mb-3">High Margin Products</h4>
              <div className="space-y-2">
                {products
                  .filter(p => ((p.msrp - p.landedCost) / p.msrp) > 0.5)
                  .slice(0, 3)
                  .map(product => (
                    <div key={product.id} className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{product.name}</span>
                      <span className="text-sm font-bold text-electric-green">
                        {(((product.msrp - product.landedCost) / product.msrp) * 100).toFixed(1)}%
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            <div className="p-4 bg-gradient-to-br from-sunset-orange/10 to-sunset-orange/5 rounded-lg">
              <h4 className="font-semibold text-deep-navy mb-3">Break-Even Targets</h4>
              <div className="space-y-2">
                {products.slice(0, 3).map(product => (
                  <div key={product.id} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{product.name}</span>
                    <span className="text-sm font-bold text-sunset-orange">
                      {product.breakEvenPoint} units
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-gradient-to-br from-deep-navy/10 to-deep-navy/5 rounded-lg">
              <h4 className="font-semibold text-deep-navy mb-3">Cost Analysis</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Cost</span>
                  <span className="text-sm font-bold text-deep-navy">
                    {formatPrice(metrics.totalCost)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Avg Cost/Unit</span>
                  <span className="text-sm font-bold text-deep-navy">
                    {formatPrice(metrics.totalCost / metrics.unitsSold)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Profit</span>
                  <span className="text-sm font-bold text-electric-green">
                    {formatPrice(metrics.totalRevenue - metrics.totalCost)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
