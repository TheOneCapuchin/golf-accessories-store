'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import { Globe, ArrowRight, Mail, MapPin, Wind, Mountain } from 'lucide-react';
import CategoryNavigation from '@/components/CategoryNavigation';

const translations = {
  en: {
    title: "Beyond the Birdie",
    subtitle: "The GolfVibe Story",
    story: `Look around any Norwegian golf course. From Oslo to Porsgrunn, it's a sea of navy blue, white, and grey 💤. We love the game, but why does our gear have to be so... predictable? Golf is a game of personality—the loud shout after a long putt 🗣️, the raw frustration of the sand trap ⏳, and the shared laughs at the 19th hole 🍻. That's the energy that gets lost when we dress like we're heading to a boring board meeting.

That's exactly why I started GolfVibe. I was done with "plain." I wanted to create golf accessories and apparel that actually said something. I'm talking about towels that stand out on your bag 🎒, tees that aren't just disposable wood, and polos that feel as bold as a 300-meter drive straight down the fairway 🚀. We don't do "mass-produced." Every piece is selected and individualized right here in Norway to ensure it handles everything from our coastal winds to the mountain sun 🏔️.

We aren't a faceless global giant; we're a local Norwegian brand with a passion for the sport. When you order from us, your gear doesn't sit on a container ship for weeks 🚢. It's packed and shipped personally from our base, straight to your mailbox and ready for your next tee time ⛳. Welcome to a slightly less boring round of golf.`,
    features: [
      {
        icon: MapPin,
        title: "Norwegian Made",
        description: "Designed and individualized in Norway"
      },
      {
        icon: Wind,
        title: "Weather Tested",
        description: "Built for coastal winds and mountain courses"
      },
      {
        icon: Mountain,
        title: "Premium Quality",
        description: "Better than standard pro-shop gear"
      }
    ],
    cta: "Shop the Collection",
    contact: "Get in Touch",
    email: "hei@golfvibe.no",
    location: "Oslo, Norway"
  },
  no: {
    title: "Beyond Birdie",
    subtitle: "GolfVibe Historien",
    story: `Se deg rundt på hvilken som helst norsk golfbane. Fra Oslo til Porsgrunn er det et hav av marineblått, hvitt og grått 💤. Vi elsker spillet, men hvorfor må utstyret vårt være så... forutsigbart? Golf er tross alt et spill med personlighet – det høye ropet etter en lang putt 🗣️, den rå frustrasjonen i sandfella ⏳, og den gode latteren på det 19. hullet 🍻. Det er denne energien som mangler når vi kler oss som om vi skal i et kjedelig styremøte.

Det var nettopp derfor jeg startet GolfVibe. Jeg var ferdig med det "vanlige." Jeg ville skape golftilbehør som faktisk har noe på hjertet. Vi snakker håndklær som skiller seg ut på bagen 🎒, pegger som er mer enn bare kjedelig treverk, og poloer som føles like dristige som en 300-meters drive midt i fairway 🚀. Her hos oss driver vi ikke med masseproduksjon; hvert plagg og tilbehør er håndplukket og individualisert her i Norge for å tåle alt fra piskende kystvind til stekende sol på fjellbanene 🏔️.

Vi er ingen ansiktsløs global gigant, men et lokalt norsk merke som brenner for sporten. Når du bestiller fra oss, trenger du ikke vente på et containerskip fra andre siden av kloden 🚢. Alt pakkes og sendes personlig fra vår base, rett til din postkasse – klart for din neste tee-time ⛳. Velkommen til en litt mindre kjedelig runde golf.`,
    features: [
      {
        icon: MapPin,
        title: "Norskprodusert",
        description: "Designet og individualisert i Norge"
      },
      {
        icon: Wind,
        title: "Værtestet",
        description: "Bygget for kystvinder og fjellbaner"
      },
      {
        icon: Mountain,
        title: "Premium Kvalitet",
        description: "Bedre enn standard pro-shop-utstyr"
      }
    ],
    cta: "Se Kolleksjonen",
    contact: "Ta Kontakt",
    email: "hei@golfvibe.no",
    location: "Oslo, Norge"
  }
};

export default function AboutPage() {
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
                className="flex items-center gap-2 px-3 py-2 bg-soft-gray rounded-lg hover:bg-soft-gray/80 transition-colors"
              >
                <Globe size={16} />
                <span className="text-sm font-medium text-foreground">
                  {language === 'en' ? 'NO' : 'EN'}
                </span>
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
                  Log In
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
            {t.title}
          </h1>
          <p className="text-xl text-warm-gray mb-8">
            {t.subtitle}
          </p>
        </div>
      </section>

      {/* The Story */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {t.title}
            </h2>
            <p className="text-xl text-warm-gray mb-8">
              {t.subtitle}
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-electric-green to-sunset-orange mx-auto"></div>
          </div>
          
          <div className="bg-bone-white rounded-2xl sophisticated-shadow border border-soft-gray p-8 md:p-12">
            <div className="prose prose-lg max-w-none">
              {t.story.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-lg text-foreground leading-relaxed mb-6">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-soft-gray/30">
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
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {language === 'en' ? 'Ready to Stand Out?' : 'Klar til å skille deg ut?'}
          </h2>
          <p className="text-lg text-warm-gray mb-8">
            {language === 'en' 
              ? 'Join the Norwegian golf revolution and express your personality on the course.'
              : 'Bli med i den norske golfrevolusjonen og uttrykk din personlighet på banen.'
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
            © 2024 GolfVibe. {language === 'en' ? 'Anti-boring golf gear, made in Norway.' : 'Anti-kjedelig golfutstyr, laget i Norge.'}
          </p>
        </div>
      </footer>
    </div>
  );
}
