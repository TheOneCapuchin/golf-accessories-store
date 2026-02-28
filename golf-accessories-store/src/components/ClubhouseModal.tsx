'use client';

import { useState, useEffect } from 'react';
import { X, Mail } from 'lucide-react';

interface ClubhouseModalProps {
  isOpen: boolean;
  onClose: () => void;
  source?: 'timer' | 'manual';
}

export default function ClubhouseModal({ isOpen, onClose, source = 'timer' }: ClubhouseModalProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Reset form when modal opens
      setEmail('');
      setIsSubmitted(false);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Store email in localStorage for demo purposes
    const existingEmails = JSON.parse(localStorage.getItem('clubhouse_emails') || '[]');
    localStorage.setItem('clubhouse_emails', JSON.stringify([...existingEmails, email]));
    
    setIsSubmitted(true);
    setIsSubmitting(false);
    
    // Auto close after success
    setTimeout(() => {
      onClose();
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with blur */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-gradient-to-br from-sunset-orange to-electric-green rounded-2xl sophisticated-shadow max-w-md w-full p-8 transform transition-all border-2 border-white">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-white/80 hover:text-white transition-colors bg-white/20 rounded-full"
        >
          <X size={20} />
        </button>

        {/* Content */}
        <div className="text-center">
          {/* Logo */}
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <span className="text-2xl">⛳</span>
          </div>

          {!isSubmitted ? (
            <>
              {/* Headline */}
              <h2 className="text-3xl font-bold text-white mb-3">
                Join the Clubhouse
              </h2>
              
              {/* Sub-text */}
              <p className="text-lg text-white/90 mb-8 leading-relaxed">
                Get <span className="font-bold text-yellow-300">15% OFF</span> your first bulk order and early access to new patterns.
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-sunset-orange/70 size={5}" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-12 pr-4 py-4 bg-white/90 backdrop-blur border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-foreground placeholder-sunset-orange/70"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !email}
                  className="w-full bg-white text-sunset-orange font-bold py-4 rounded-xl hover:bg-yellow-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-sunset-orange/30 border-t-sunset-orange rounded-full animate-spin"></div>
                      Joining...
                    </span>
                  ) : (
                    'Get My Discount'
                  )}
                </button>
              </form>

              {/* Trust indicators */}
              <div className="mt-6 flex items-center justify-center gap-4 text-xs text-white/80">
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-yellow-300 rounded-full"></div>
                  No spam
                </span>
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-yellow-300 rounded-full"></div>
                  Unsubscribe anytime
                </span>
              </div>
            </>
          ) : (
            /* Success state */
            <div className="py-8">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl text-sunset-orange">✓</span>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-3">
                Welcome to the Clubhouse!
              </h3>
              
              <p className="text-white/90 mb-4">
                Check your email for your 15% discount code.
              </p>
              
              <p className="text-sm text-yellow-300 font-medium">
                Redirecting you back to the store...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
