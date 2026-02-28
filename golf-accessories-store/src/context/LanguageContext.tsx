'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, Language } from '@/lib/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.en;
  isLanguageChanging: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [isLanguageChanging, setIsLanguageChanging] = useState(false);

  const setLanguage = (lang: Language) => {
    setIsLanguageChanging(true);
    setLanguageState(lang);
    
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('kapuchin-language', lang);
    }
    
    // Reset changing state after animation
    setTimeout(() => setIsLanguageChanging(false), 600);
  };

  // Load language from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('kapuchin-language') as Language | null;
      if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'no')) {
        setLanguageState(savedLanguage);
      }
    }
  }, []);

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isLanguageChanging }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
