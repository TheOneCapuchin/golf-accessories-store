import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, CartItem, Pattern, AdminMetrics } from './types';

interface StoreState {
  // Cart state
  cart: CartItem[];
  addToCart: (product: Product, patternId: string, quantity: number) => void;
  removeFromCart: (productId: string, patternId: string) => void;
  updateQuantity: (productId: string, patternId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
  
  // Product state
  products: Product[];
  setProducts: (products: Product[]) => void;
  filteredProducts: Product[];
  
  // Filter state
  selectedPatterns: string[];
  selectedCategories: string[];
  priceRange: [number, number];
  setSelectedPatterns: (patterns: string[]) => void;
  setSelectedCategories: (categories: string[]) => void;
  setPriceRange: (range: [number, number]) => void;
  
  // Wishlist state
  wishlist: string[];
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  getWishlistCount: () => number;
  
  // Auth state
  user: { email: string; name: string } | null;
  login: (email: string, name: string) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
  
  // Admin state
  adminMetrics: AdminMetrics | null;
  setAdminMetrics: (metrics: AdminMetrics) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Cart
      cart: [],
      addToCart: (product: Product, patternId: string, quantity: number) => {
        const existingItem = get().cart.find(
          item => item.productId === product.id && item.patternId === patternId
        );
        
        if (existingItem) {
          set(state => ({
            cart: state.cart.map(item =>
              item.productId === product.id && item.patternId === patternId
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          }));
        } else {
          const pattern = product.patterns.find(p => p.id === patternId);
          const price = pattern ? product.basePrice : product.basePrice;
          
          set(state => ({
            cart: [...state.cart, {
              productId: product.id,
              patternId,
              quantity,
              price
            }]
          }));
        }
      },
      removeFromCart: (productId: string, patternId: string) => {
        set(state => ({
          cart: state.cart.filter(
            item => !(item.productId === productId && item.patternId === patternId)
          )
        }));
      },
      updateQuantity: (productId: string, patternId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeFromCart(productId, patternId);
          return;
        }
        
        set(state => ({
          cart: state.cart.map(item =>
            item.productId === productId && item.patternId === patternId
              ? { ...item, quantity }
              : item
          )
        }));
      },
      clearCart: () => set({ cart: [] }),
      getCartTotal: () => {
        return get().cart.reduce((total, item) => total + (item.price * item.quantity), 0);
      },
      getCartItemCount: () => {
        return get().cart.reduce((total, item) => total + item.quantity, 0);
      },
      
      // Products
      products: [],
      setProducts: (products: Product[]) => set({ products }),
      get filteredProducts() {
        const { products, selectedCategories, selectedPatterns, priceRange } = get();
        
        return products.filter(product => {
          // Filter by category
          if (selectedCategories.length > 0 && !selectedCategories.includes(product.category.id)) {
            return false;
          }
          
          // Filter by pattern
          if (selectedPatterns.length > 0) {
            const hasSelectedPattern = product.patterns.some(pattern => 
              selectedPatterns.includes(pattern.id)
            );
            if (!hasSelectedPattern) return false;
          }
          
          // Filter by price range
          if (product.basePrice < priceRange[0] || product.basePrice > priceRange[1]) {
            return false;
          }
          
          return true;
        });
      },
      
      // Filters
      selectedPatterns: [],
      selectedCategories: [],
      priceRange: [0, 100],
      setSelectedPatterns: (patterns: string[]) => set({ selectedPatterns: patterns }),
      setSelectedCategories: (categories: string[]) => set({ selectedCategories: categories }),
      setPriceRange: (range: [number, number]) => set({ priceRange: range }),
      
      // Wishlist
      wishlist: [],
      addToWishlist: (productId: string) => {
        set(state => {
          if (state.wishlist.includes(productId)) {
            return state; // Already in wishlist
          }
          return { wishlist: [...state.wishlist, productId] };
        });
      },
      removeFromWishlist: (productId: string) => {
        set(state => ({
          wishlist: state.wishlist.filter(id => id !== productId)
        }));
      },
      isInWishlist: (productId: string) => {
        return get().wishlist.includes(productId);
      },
      getWishlistCount: () => {
        return get().wishlist.length;
      },
      
      // Auth
      user: null,
      login: (email: string, name: string) => {
        set({ user: { email, name } });
      },
      logout: () => {
        set({ user: null });
      },
      isAuthenticated: () => {
        return get().user !== null;
      },
      
      // Admin
      adminMetrics: null,
      setAdminMetrics: (metrics: AdminMetrics) => set({ adminMetrics: metrics }),
    }),
    {
      name: 'golf-accessories-store',
      partialize: (state) => ({
        cart: state.cart,
        selectedPatterns: state.selectedPatterns,
        selectedCategories: state.selectedCategories,
        priceRange: state.priceRange,
        wishlist: state.wishlist,
        user: state.user,
      }),
    }
  )
);
