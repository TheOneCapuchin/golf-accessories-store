'use client';

import { useState } from 'react';
import { Upload, Heart, MessageCircle, Share2, X, Camera, Tag } from 'lucide-react';
import CategoryNavigation from '@/components/CategoryNavigation';

interface CommunityPost {
  id: string;
  username: string;
  avatar: string;
  image: string;
  caption: string;
  likes: number;
  comments: number;
  tags: string[];
  timestamp: string;
  shopTheLook?: {
    productId: string;
    productName: string;
    price: string;
  };
}

const mockPosts: CommunityPost[] = [
  {
    id: '1',
    username: 'golf_pro_jess',
    avatar: '👩‍🦰',
    image: '🏌️‍♀️',
    caption: 'Loving my new Neon Wave polo on the course today! The vibes are immaculate ⛳✨',
    likes: 234,
    comments: 18,
    tags: ['neon-wave', 'polo', 'golf-style'],
    timestamp: '2 hours ago',
    shopTheLook: {
      productId: 'performance-polo',
      productName: 'Elite Performance Polo',
      price: '$49.99'
    }
  },
  {
    id: '2',
    username: 'fairway_fashion',
    avatar: '👨‍🦱',
    image: '🏝️',
    caption: 'That Floral Fairway towel really stands out against the green! Who says golf gear has to be boring? 🌸',
    likes: 189,
    comments: 12,
    tags: ['floral-fairway', 'towel', 'style'],
    timestamp: '4 hours ago',
    shopTheLook: {
      productId: 'microfiber-towel',
      productName: 'Premium Microfiber Towel',
      price: '$24.99'
    }
  },
  {
    id: '3',
    username: 'retro_golfer',
    avatar: '👴',
    image: '🧢',
    caption: 'Bringing back the 90s with this Retro cap! Classic vibes with modern comfort 🎸⛳',
    likes: 156,
    comments: 8,
    tags: ['retro-90s', 'cap', 'vintage'],
    timestamp: '6 hours ago',
    shopTheLook: {
      productId: 'structured-cap',
      productName: 'Pro Structured Cap',
      price: '$34.99'
    }
  },
  {
    id: '4',
    username: 'golf_girl_sarah',
    avatar: '👩',
    image: '⛳',
    caption: 'My putter cover gets all the compliments! The Geometric Dash pattern is everything 🔷',
    likes: 298,
    comments: 24,
    tags: ['geometric-dash', 'putter-cover', 'accessories'],
    timestamp: '8 hours ago',
    shopTheLook: {
      productId: 'putter-cover',
      productName: 'Handcrafted Putter Cover',
      price: '$44.99'
    }
  },
  {
    id: '5',
    username: 'weekend_warrior',
    avatar: '👨',
    image: '🎒',
    caption: 'Lightweight bag with maximum style! The Electric Camo pattern turns heads every round 🎯',
    likes: 167,
    comments: 15,
    tags: ['electric-camo', 'bag', 'golf-gear'],
    timestamp: '12 hours ago',
    shopTheLook: {
      productId: 'lightweight-bag',
      productName: 'Ultralight Stand Bag',
      price: '$189.99'
    }
  },
  {
    id: '6',
    username: 'tee_time_tina',
    avatar: '👩‍🦳',
    image: '🏌️',
    caption: 'Even my tees have personality! Love adding pops of color to my game 💚🧡',
    likes: 145,
    comments: 9,
    tags: ['neon', 'tees', 'golf-accessories'],
    timestamp: '1 day ago',
    shopTheLook: {
      productId: 'durable-tees',
      productName: 'Pro Grade Golf Tees',
      price: '$9.99'
    }
  }
];

export default function CommunityPage() {
  const [posts, setPosts] = useState<CommunityPost[]>(mockPosts);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadData, setUploadData] = useState({
    caption: '',
    tags: [] as string[]
  });

  const handleUpload = () => {
    if (uploadData.caption.trim()) {
      const newPost: CommunityPost = {
        id: Date.now().toString(),
        username: 'current_user',
        avatar: '😊',
        image: '📸',
        caption: uploadData.caption,
        likes: 0,
        comments: 0,
        tags: uploadData.tags,
        timestamp: 'Just now'
      };
      
      setPosts([newPost, ...posts]);
      setIsUploadModalOpen(false);
      setUploadData({ caption: '', tags: [] });
    }
  };

  return (
    <div className="min-h-screen bg-bone-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-bone-white/95 backdrop-blur-sm border-b border-soft-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-electric-green to-sunset-orange rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">⛳</span>
              </div>
              <h1 className="text-xl font-bold gradient-text">GolfVibe</h1>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              <button className="text-foreground hover:text-electric-green font-medium transition-colors">
                Shop
              </button>
              <button className="text-electric-green font-medium">
                Community
              </button>
              <button className="text-foreground hover:text-electric-green font-medium transition-colors">
                About
              </button>
            </nav>

            <button className="accent-button px-4 py-2 rounded-lg flex items-center gap-2">
              <Upload size={16} />
              Upload Your Look
            </button>
          </div>
        </div>
      </header>

      {/* Category Navigation */}
      <CategoryNavigation />

      {/* Hero Section */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-electric-green/5 to-sunset-orange/5">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Social Clubhouse
          </h2>
          <p className="text-xl text-warm-gray max-w-2xl mx-auto mb-8">
            See how golfers are expressing their individuality with vibrant gear. 
            Share your style and inspire the community!
          </p>
          
          <button 
            onClick={() => setIsUploadModalOpen(true)}
            className="accent-button px-8 py-3 rounded-xl flex items-center gap-2 mx-auto"
          >
            <Camera size={20} />
            Upload Your Look
          </button>
        </div>
      </section>

      {/* Community Grid */}
      <section className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {posts.map((post) => (
              <div key={post.id} className="break-inside-avoid mb-6">
                <div className="bg-bone-white rounded-xl sophisticated-shadow border border-soft-gray overflow-hidden">
                  {/* Post Header */}
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-electric-green/20 to-sunset-orange/20 rounded-full flex items-center justify-center text-lg">
                        {post.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-sm">{post.username}</p>
                        <p className="text-xs text-warm-gray">{post.timestamp}</p>
                      </div>
                    </div>
                    <button className="text-warm-gray hover:text-foreground transition-colors">
                      <Share2 size={16} />
                    </button>
                  </div>

                  {/* Post Image */}
                  <div className="relative aspect-square bg-gradient-to-br from-soft-gray to-bone-white flex items-center justify-center">
                    <div className="text-6xl filter drop-shadow-sm">{post.image}</div>
                  </div>

                  {/* Post Actions */}
                  <div className="p-4">
                    <div className="flex items-center gap-4 mb-3">
                      <button className="flex items-center gap-1 text-warm-gray hover:text-red-500 transition-colors">
                        <Heart size={18} />
                        <span className="text-sm font-medium">{post.likes}</span>
                      </button>
                      <button className="flex items-center gap-1 text-warm-gray hover:text-electric-green transition-colors">
                        <MessageCircle size={18} />
                        <span className="text-sm font-medium">{post.comments}</span>
                      </button>
                    </div>

                    {/* Caption */}
                    <div className="mb-3">
                      <p className="text-sm text-foreground">
                        <span className="font-semibold">{post.username}</span> {post.caption}
                      </p>
                    </div>

                    {/* Tags */}
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="text-xs text-electric-green bg-electric-green/10 px-2 py-1 rounded-full font-medium"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Shop the Look */}
                    {post.shopTheLook && (
                      <div className="bg-gradient-to-r from-electric-green/10 to-sunset-orange/10 rounded-lg p-3 border border-electric-green/20">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs font-semibold text-foreground mb-1 flex items-center gap-1">
                              <Tag size={12} />
                              Shop the Look
                            </p>
                            <p className="text-sm font-medium text-foreground">{post.shopTheLook.productName}</p>
                            <p className="text-sm text-electric-green font-bold">{post.shopTheLook.price}</p>
                          </div>
                          <button className="bg-electric-green text-deep-navy px-3 py-2 rounded-lg text-sm font-medium hover:bg-sunset-orange transition-colors">
                            Shop Now
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-bone-white rounded-xl sophisticated-shadow max-w-lg w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-foreground">Upload Your Look</h3>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="text-warm-gray hover:text-foreground transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              {/* Upload Area */}
              <div className="border-2 border-dashed border-soft-gray rounded-lg p-8 text-center hover:border-electric-green transition-colors">
                <Camera size={48} className="mx-auto text-warm-gray mb-4" />
                <p className="text-foreground font-medium mb-2">Click to upload or drag and drop</p>
                <p className="text-sm text-warm-gray">PNG, JPG, GIF up to 10MB</p>
              </div>

              {/* Caption */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Caption
                </label>
                <textarea
                  value={uploadData.caption}
                  onChange={(e) => setUploadData({ ...uploadData, caption: e.target.value })}
                  className="w-full px-3 py-2 border border-soft-gray rounded-lg focus:ring-2 focus:ring-electric-green focus:border-transparent bg-bone-white text-foreground"
                  rows={3}
                  placeholder="Tell us about your look..."
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Tags
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-soft-gray rounded-lg focus:ring-2 focus:ring-electric-green focus:border-transparent bg-bone-white text-foreground"
                  placeholder="#neon-wave #polo #golf-style"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setIsUploadModalOpen(false)}
                  className="flex-1 subtle-button px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpload}
                  className="flex-1 accent-button px-4 py-2 rounded-lg"
                >
                  Share Look
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
