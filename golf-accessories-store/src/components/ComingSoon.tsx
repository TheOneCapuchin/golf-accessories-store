'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import { Mail, ArrowRight, Heart } from 'lucide-react';

interface ComingSoonProps {
  category?: string;
}

const translations = {
  en: {
    comingSoon: 'Coming Soon',
    title: 'More Vibrant Designs',
    description: 'We\'re working on bringing more exciting patterns and colors to this collection. Be the first to know when they drop!',
    notifyMe: 'Notify Me',
    emailPlaceholder: 'Enter your email',
    backToStore: 'Back to Store',
    exploreOther: 'Explore Other Categories',
    successMessage: 'Thanks! We\'ll notify you when this collection launches.'
  },
  no: {
    comingSoon: 'Kommer Snart',
    title: 'Flere Fargerike Design',
    description: 'Vi jobber med å bringe flere spennende mønstre og farger til denne kolleksjonen. Vær den første til å vite når de lanseres!',
    notifyMe: 'Varsle Meg',
    emailPlaceholder: 'Skriv inn din e-post',
    backToStore: 'Tilbake til Butikk',
    exploreOther: 'Utforsk Andre Kategorier',
    successMessage: 'Takk! Vi varsler deg når denne kolleksjonen lanseres.'
  }
};

export default function ComingSoon({ category }: ComingSoonProps) {
  const { isAuthenticated } = useStore();
  const [language, setLanguage] = useState<'en' | 'no'>('en');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const t = translations[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Store email for notifications
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-bone-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center">
        {/* Icon */}
        <div className="w-24 h-24 bg-gradient-to-r from-electric-green to-sunset-orange rounded-full flex items-center justify-center mx-auto mb-8">
          <Heart size={48} className="text-white" />
        </div>

        {/* Content */}
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          {t.comingSoon}
        </h1>
        
        <h2 className="text-2xl font-bold text-sunset-orange mb-6">
          {t.title}
        </h2>
        
        <p className="text-lg text-warm-gray mb-8 max-w-lg mx-auto">
          {t.description}
        </p>

        {/* Email Signup */}
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="mb-12">
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.emailPlaceholder}
                className="flex-1 px-4 py-3 bg-soft-gray border border-soft-gray rounded-xl focus:outline-none focus:ring-2 focus:ring-electric-green focus:border-transparent text-foreground placeholder-warm-gray"
                required
              />
              <button
                type="submit"
                className="accent-button px-6 py-3 rounded-xl"
              >
                {t.notifyMe}
              </button>
            </div>
          </form>
        ) : (
          <div className="mb-12 p-4 bg-electric-green/10 border border-electric-green/20 rounded-lg">
            <p className="text-electric-green font-medium">
              {t.successMessage}
            </p>
          </div>
        )}

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/"
            className="accent-button px-6 py-3 rounded-xl inline-flex items-center gap-2"
          >
            <ArrowRight size={20} />
            {t.backToStore}
          </Link>
          
          <Link 
            href="/category/performance-polos"
            className="subtle-button px-6 py-3 rounded-xl inline-block"
          >
            {t.exploreOther}
          </Link>
        </div>

        {/* Pattern Preview */}
        <div className="mt-16 grid grid-cols-3 gap-4 max-w-md mx-auto opacity-20">
          <div className="aspect-square bg-gradient-to-br from-electric-green to-sunset-orange rounded-lg"></div>
          <div className="aspect-square bg-gradient-to-br from-sunset-orange to-electric-green rounded-lg"></div>
          <div className="aspect-square bg-gradient-to-br from-electric-green to-sunset-orange rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}
