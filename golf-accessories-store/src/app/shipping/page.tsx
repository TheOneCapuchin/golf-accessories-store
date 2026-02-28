'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import { Globe, ArrowRight, Mail, MapPin, Truck, Package, Clock, Shield } from 'lucide-react';
import CategoryNavigation from '@/components/CategoryNavigation';

const translations = {
  en: {
    title: "Shipping & Delivery",
    subtitle: "Fast delivery from Porsgrunn",
    heroTitle: "Lightning Fast Delivery",
    heroSubtitle: "From our warehouse in Porsgrunn to your doorstep",
    fastDelivery: "Lightning Fast Delivery from Porsgrunn",
    fastText: "We ship directly from our warehouse in Porsgrunn, ensuring your golf gear reaches you quickly and safely. No long waits or international shipping delays.",
    partnership: "Partnership with Posten Bring",
    partnershipText: "We've partnered with Posten Bring to provide reliable, trackable shipping throughout Norway. Get real-time updates on your order from warehouse to delivery.",
    localPickup: "Local Pickup Available",
    localText: "Live in the Porsgrunn area? Choose local pickup and get your gear the same day! Perfect for last-minute tournament needs.",
    localAddress: "Kjøpmannsgata 12, 3900 Porsgrunn",
    shippingOptions: [
      {
        icon: Truck,
        title: "Standard Shipping",
        time: "2-4 business days",
        price: "79 kr",
        description: "Reliable delivery throughout Norway"
      },
      {
        icon: Package,
        title: "Express Shipping",
        time: "1-2 business days",
        price: "149 kr",
        description: "Priority handling and delivery"
      },
      {
        icon: MapPin,
        title: "Local Pickup",
        time: "Same day",
        price: "Free",
        description: "Pick up at our Porsgrunn warehouse"
      }
    ],
    features: [
      {
        icon: Shield,
        title: "Secure Packaging",
        description: "Professional packaging to protect your gear"
      },
      {
        icon: Clock,
        title: "Fast Processing",
        description: "Orders shipped within 24 hours"
      },
      {
        icon: Package,
        title: "Track Your Order",
        description: "Real-time tracking from Posten Bring"
      }
    ],
    cta: "Shop Now",
    contact: "Questions about shipping?",
    email: "hei@golfvibe.no",
    location: "Porsgrunn, Norway"
  },
  no: {
    title: "Frakt & Levering",
    subtitle: "Lynrask levering fra Porsgrunn",
    heroTitle: "Lynrask Levering",
    heroSubtitle: "Fra vårt lager i Porsgrunn til din dørterskel",
    fastDelivery: "Lynrask levering fra Porsgrunn",
    fastText: "Vi sender direkte fra vårt lager i Porsgrunn, noe som sikrer at ditt golfutstyr når deg raskt og sikkert. Ingen lange ventetider eller internasjonale forsinkelser.",
    partnership: "Samarbeid med Posten Bring",
    partnershipText: "Vi har inngått partnerskap med Posten Bring for å tilby pålitelig, sporbar frakt i hele Norge. Få sanntidsoppdateringer på bestillingen din fra lager til levering.",
    localPickup: "Lokal Henting Tilgjengelig",
    localText: "Bor du i Porsgrunn-området? Velg lokal henting og få utstyret ditt samme dag! Perfekt for siste-liten-turnbehov.",
    localAddress: "Kjøpmannsgata 12, 3900 Porsgrunn",
    shippingOptions: [
      {
        icon: Truck,
        title: "Standard Frakt",
        time: "2-4 virkedager",
        price: "79 kr",
        description: "Pålitelig levering i hele Norge"
      },
      {
        icon: Package,
        title: "Express Frakt",
        time: "1-2 virkedager",
        price: "149 kr",
        description: "Prioritert behandling og levering"
      },
      {
        icon: MapPin,
        title: "Lokal Henting",
        time: "Samme dag",
        price: "Gratis",
        description: "Hent hos oss i Porsgrunn"
      }
    ],
    features: [
      {
        icon: Shield,
        title: "Sikker Emballasje",
        description: "Profesjonell pakking for å beskytte utstyret ditt"
      },
      {
        icon: Clock,
        title: "Rask Behandling",
        description: "Bestillinger sendes innen 24 timer"
      },
      {
        icon: Package,
        title: "Spor Bestillingen",
        description: "Sanntidssporing fra Posten Bring"
      }
    ],
    cta: "Handle Nå",
    contact: "Spørsmål om frakt?",
    email: "hei@golfvibe.no",
    location: "Porsgrunn, Norge"
  }
};

export default function ShippingPage() {
  const { isAuthenticated, user } = useStore();
  const [language, setLanguage] = useState<'en' | 'no'>('en');
  const t = translations[language];

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
            
            <div className="flex items-center gap-4">
              {/* Language Toggle */}
              <button
                onClick={() => setLanguage(language === 'en' ? 'no' : 'en')}
                className="flex items-center gap-1 px-3 py-2 bg-soft-gray rounded-lg hover:bg-soft-gray/80 transition-colors text-sm font-medium text-foreground"
              >
                <span className="text-lg">{language === 'en' ? '🇬🇧' : '🇳🇴'}</span>
                {language === 'en' ? 'EN' : 'NO'}
              </button>
              
              {isAuthenticated() ? (
                <Link 
                  href="/profile"
                  className="flex items-center gap-2 text-foreground hover:text-electric-green transition-colors"
                >
                  <div className="w-6 h-6 bg-gradient-to-r from-electric-green to-sunset-orange rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {user?.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                  {user?.name}
                </Link>
              ) : (
                <Link 
                  href="/auth"
                  className="text-foreground hover:text-electric-green font-medium transition-colors"
                >
                  {language === 'en' ? 'Log In' : 'Logg Inn'}
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Category Navigation */}
      <CategoryNavigation />

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-electric-green/10 via-transparent to-sunset-orange/10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
            {t.heroTitle}
          </h1>
          <p className="text-xl text-warm-gray mb-8">
            {t.heroSubtitle}
          </p>
        </div>
      </section>

      {/* Fast Delivery */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {t.fastDelivery}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-electric-green to-sunset-orange mx-auto mb-8"></div>
          </div>
          
          <div className="bg-bone-white rounded-2xl sophisticated-shadow border border-soft-gray p-8 md:p-12">
            <p className="text-lg text-foreground leading-relaxed">
              {t.fastText}
            </p>
          </div>
        </div>
      </section>

      {/* Partnership */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-soft-gray/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {t.partnership}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-sunset-orange to-electric-green mx-auto mb-8"></div>
          </div>
          
          <div className="bg-gradient-to-br from-sunset-orange/10 to-electric-green/10 rounded-2xl border border-soft-gray p-8 md:p-12">
            <p className="text-lg text-foreground leading-relaxed">
              {t.partnershipText}
            </p>
          </div>
        </div>
      </section>

      {/* Local Pickup */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {t.localPickup}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-electric-green to-sunset-orange mx-auto mb-8"></div>
          </div>
          
          <div className="bg-bone-white rounded-2xl sophisticated-shadow border border-soft-gray p-8 md:p-12 text-center">
            <p className="text-lg text-foreground leading-relaxed mb-4">
              {t.localText}
            </p>
            <div className="flex items-center justify-center gap-2 text-warm-gray">
              <MapPin size={20} />
              <span className="font-medium">{t.localAddress}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Shipping Options */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-soft-gray/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {language === 'en' ? 'Shipping Options' : 'Fraktalternativer'}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-electric-green to-sunset-orange mx-auto mb-8"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.shippingOptions.map((option, index) => (
              <div key={index} className="bg-bone-white rounded-2xl sophisticated-shadow border border-soft-gray p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-electric-green to-sunset-orange rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <option.icon size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {option.title}
                </h3>
                <p className="text-2xl font-bold text-sunset-orange mb-2">
                  {option.price}
                </p>
                <p className="text-warm-gray mb-4">
                  {option.time}
                </p>
                <p className="text-sm text-foreground">
                  {option.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-electric-green to-sunset-orange rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <feature.icon size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-warm-gray">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-soft-gray/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {language === 'en' ? 'Ready to Get Your Gear?' : 'Klar til å få utstyret ditt?'}
          </h2>
          <p className="text-lg text-warm-gray mb-8">
            {language === 'en' 
              ? 'Shop our collection and enjoy fast, reliable shipping from Porsgrunn.'
              : 'Handle vår kolleksjon og nyt rask, pålitelig frakt fra Porsgrunn.'
            }
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/category/performance-polos"
              className="accent-button px-8 py-4 rounded-xl text-lg inline-block"
            >
              {t.cta}
              <ArrowRight size={20} className="ml-2" />
            </Link>
            
            <a 
              href={`mailto:${t.email}`}
              className="subtle-button px-8 py-4 rounded-xl text-lg inline-block flex items-center justify-center gap-2"
            >
              <Mail size={20} />
              {t.contact}
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MapPin size={16} />
            <span>{t.location}</span>
          </div>
          <p className="text-white/80">
            © 2024 GolfVibe. {language === 'en' ? 'Fast delivery from Porsgrunn.' : 'Rask levering fra Porsgrunn.'}
          </p>
        </div>
      </footer>
    </div>
  );
}
