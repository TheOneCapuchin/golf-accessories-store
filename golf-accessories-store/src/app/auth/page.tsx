'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import { Mail, Lock, User, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import CategoryNavigation from '@/components/CategoryNavigation';

export default function AuthPage() {
  const router = useRouter();
  const { login, isAuthenticated } = useStore();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Redirect if already authenticated
  if (isAuthenticated()) {
    router.push('/profile');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (isSignUp) {
        // Sign up logic
        if (password.length < 6) {
          setError('Password must be at least 6 characters');
          return;
        }
        
        // Store user (mock)
        login(email, name);
      } else {
        // Login logic - check if user exists in clubhouse emails
        const clubhouseEmails = JSON.parse(localStorage.getItem('clubhouse_emails') || '[]');
        if (!clubhouseEmails.includes(email)) {
          setError('Email not found. Please join the Clubhouse first!');
          return;
        }
        
        login(email, name || email.split('@')[0]);
      }

      router.push('/profile');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bone-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-bone-white/95 backdrop-blur-sm border-b border-soft-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-electric-green to-sunset-orange rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">⛳</span>
              </div>
              <h1 className="text-xl font-bold gradient-text">GolfVibe</h1>
            </Link>
            
            <Link 
              href="/"
              className="flex items-center gap-2 text-foreground hover:text-electric-green transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Store
            </Link>
          </div>
        </div>
      </header>

      {/* Category Navigation */}
      <CategoryNavigation />

      {/* Auth Content */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-md mx-auto">
          <div className="bg-bone-white rounded-2xl sophisticated-shadow border border-soft-gray p-8">
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-electric-green to-sunset-orange rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">⛳</span>
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-2">
                {isSignUp ? 'Join the Clubhouse' : 'Welcome Back'}
              </h2>
              <p className="text-warm-gray">
                {isSignUp 
                  ? 'Create your account to save favorites and get exclusive deals.'
                  : 'Sign in to access your wishlist and member benefits.'
                }
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {isSignUp && (
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-warm-gray" size={20} />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full pl-12 pr-4 py-3 bg-soft-gray border border-soft-gray rounded-xl focus:outline-none focus:ring-2 focus:ring-electric-green focus:border-transparent text-foreground placeholder-warm-gray"
                      required={isSignUp}
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-warm-gray" size={20} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-12 pr-4 py-3 bg-soft-gray border border-soft-gray rounded-xl focus:outline-none focus:ring-2 focus:ring-electric-green focus:border-transparent text-foreground placeholder-warm-gray"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-warm-gray" size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-12 pr-12 py-3 bg-soft-gray border border-soft-gray rounded-xl focus:outline-none focus:ring-2 focus:ring-electric-green focus:border-transparent text-foreground placeholder-warm-gray"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-warm-gray hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-sunset-orange text-white font-semibold py-3 rounded-xl hover:bg-sunset-orange/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    {isSignUp ? 'Creating Account...' : 'Signing In...'}
                  </span>
                ) : (
                  isSignUp ? 'Create Account' : 'Sign In'
                )}
              </button>
            </form>

            {/* Toggle */}
            <div className="mt-6 text-center">
              <p className="text-warm-gray">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                <button
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    setError('');
                  }}
                  className="ml-2 text-electric-green font-medium hover:text-electric-green/80 transition-colors"
                >
                  {isSignUp ? 'Sign In' : 'Sign Up'}
                </button>
              </p>
            </div>

            {/* Clubhouse reminder */}
            {!isSignUp && (
              <div className="mt-6 p-4 bg-electric-green/10 border border-electric-green/20 rounded-lg">
                <p className="text-sm text-electric-green font-medium text-center">
                  💡 New here? Join the Clubhouse on the homepage to get 15% OFF your first order!
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
