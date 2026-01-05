'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronDown, Mail, Phone, Youtube, Instagram, Linkedin } from 'lucide-react';

export default function HeroSection() {
  const [isFrench, setIsFrench] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const observerRef = useRef(null);
  
  const content = {
    fr: {
      subtitle: "SPÉCIALISTES EN IMAGES AQUATIQUES",
      tagline: "Nous créons l'impossible sous l'eau depuis 2000",
      email: "info@aquamedias.com",
      phone: "514-813-8788"
    },
    en: {
      subtitle: "UNDERWATER IMAGING SPECIALISTS",
      tagline: "Creating the impossible underwater since 2000",
      email: "info@aquamedias.com",
      phone: "514-813-8788"
    }
  };

  const currentContent = isFrench ? content.fr : content.en;

  // SOLUTION: IntersectionObserver - DEBUG BUG ABOUT
  useEffect(() => {
    console.log('🚀 INITIALISATION IntersectionObserver - DEBUG BUG');
    
    const sections = ['hero', 'about', 'films', 'services', 'contact'];
    let lastChangeTime = 0;
    const MIN_CHANGE_DELAY = 200; // Réduit à 200ms
    
    const observer = new IntersectionObserver(
      (entries) => {
        const now = Date.now();
        
        console.log('📊 Entrées détectées:', entries.length);
        
        // DEBUG: Afficher toutes les visibilités
        const sectionVisibilities = {};
        entries.forEach(entry => {
          const sectionId = entry.target.id;
          const ratio = entry.intersectionRatio;
          sectionVisibilities[sectionId] = ratio;
          console.log(`   ${sectionId}: ${Math.round(ratio * 100)}% visible`);
        });
        
        // Compléter avec 0
        sections.forEach(sectionId => {
          if (!(sectionId in sectionVisibilities)) {
            sectionVisibilities[sectionId] = 0;
          }
        });
        
        // Trouver la plus visible
        let mostVisibleSection = activeSection;
        let highestRatio = 0;
        
        Object.entries(sectionVisibilities).forEach(([sectionId, ratio]) => {
          if (ratio > highestRatio) {
            highestRatio = ratio;
            mostVisibleSection = sectionId;
          }
        });
        
        console.log(`🎯 Plus visible: ${mostVisibleSection} (${Math.round(highestRatio * 100)}%), Actuelle: ${activeSection}`);
        
        // LOGIQUE SIMPLIFIÉE pour déboguer
        // Changement si la nouvelle section est visible à plus de 40%
        const shouldChange = 
          mostVisibleSection !== activeSection &&
          highestRatio > 0.4; // Seuil réduit pour debug
        
        if (shouldChange && now - lastChangeTime >= MIN_CHANGE_DELAY) {
          console.log(`🔄 DEBUG CHANGEMENT: ${activeSection} -> ${mostVisibleSection}`);
          lastChangeTime = now;
          setActiveSection(mostVisibleSection);
        }
      },
      {
        root: null,
        rootMargin: '-10% 0px -10% 0px', // Zone moins réduite pour mieux détecter
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
      }
    );

    observerRef.current = observer;

    setTimeout(() => {
      console.log('👀 Début observation - Vérification sections:');
      sections.forEach(sectionId => {
        const element = document.getElementById(sectionId);
        if (element) {
          observer.observe(element);
          const rect = element.getBoundingClientRect();
          console.log(`   ✅ ${sectionId}: observé, height=${rect.height}px`);
        } else {
          console.log(`   ❌ ${sectionId}: NON TROUVÉ`);
        }
      });
    }, 1000);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [activeSection]);

  const menuItems = [
    { id: 'hero', label: 'ACCUEIL' },
    { id: 'about', label: "L'EAU" },
    { id: 'films', label: 'PROJETS' },
    { id: 'services', label: 'EXPERTISE' },
    { id: 'contact', label: 'CONTACT' }
  ];

  const handleClick = (sectionId) => {
    console.log(`🎯 Clic sur: ${sectionId}`);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      
      {/* Cyan Underlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-500/60 via-cyan-600/50 to-cyan-900/40" />
      
      {/* Video Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-85"
          style={{ 
            transform: 'scale(1.18) translateY(-7%)',
            transformOrigin: 'center top',
            width: '100%',
            height: '100%'
          }}
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
          <source src="/videos/hero.webm" type="video/webm" />
          <source src="/videos/choregraphie_neorealite.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/50" />

      {/* Language Toggle - Version cyan */}
      <div className="absolute top-6 right-6 z-30 fade-in-up">
        <button
          onClick={() => setIsFrench(!isFrench)}
          className="px-5 py-2.5 rounded-full bg-black/40 backdrop-blur-md border-2 border-cyan-400/40 text-cyan-300 hover:text-cyan-200 hover:border-cyan-300 hover:bg-black/60 transition-all duration-300 hover:scale-110 text-lg font-medium shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20"
        >
          {isFrench ? 'EN' : 'FR'}
        </button>
      </div>


      {/* Scroll Navigation Menu */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col items-end gap-6">
        {menuItems.map(({ id, label }, index) => {
          const topPosition = `calc(50% + ${(index - 2) * 4}rem)`;
          const isActive = activeSection === id;
          
          return (
            <div key={id} className="relative" style={{ top: topPosition }}>
              <button
                onClick={() => handleClick(id)}
                className="group flex items-center gap-3"
                aria-label={`Aller à ${label}`}
              >
                <span className={`hidden lg:inline text-lg font-semibold whitespace-nowrap tracking-wider mr-4 transition-all duration-300 ease-out ${
                  isActive ? 'text-cyan-300 font-bold' : 'text-cyan-200/60'
                }`}>
                  {label}
                </span>
                <div className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ease-out ${
                  isActive 
                    ? 'bg-cyan-300 scale-110' 
                    : 'bg-cyan-400/40 group-hover:bg-cyan-300/60'
                }`} />
              </button>
            </div>
          );
        })}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center w-full px-4">
        
        <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold leading-none mb-8 fade-in-up font-antonio whitespace-nowrap" style={{ color: '#0092b8' }}>
          AQUAMEDIAS
        </h1>
        
        <h2 className="text-2xl md:text-4xl font-light mb-6 tracking-tight fade-in-up font-antonio hero-subtitle" style={{ animationDelay: '0.3s', color: '#53eafd' }}>
          {currentContent.subtitle}
        </h2>
        
        <p className="text-2xl md:text-3xl text-cyan-50 mb-12 max-w-3xl mx-auto font-light fade-in-up font-cormorant" style={{ animationDelay: '0.5s' }}>
          {currentContent.tagline}
        </p>

        <div className="flex flex-wrap justify-center gap-6 mb-16 fade-in-up" style={{ animationDelay: '0.7s' }}>
          <a 
            href={`mailto:${currentContent.email}`}
            className="flex items-center gap-3 bg-black/40 backdrop-blur-sm rounded-full px-6 py-3 text-cyan-300 hover:text-white hover:bg-black/60 transition-all group text-lg"
          >
            <Mail className="group-hover:scale-110 transition-transform" size={24} />
            <span>{currentContent.email}</span>
          </a>
          <a 
            href={`tel:+1${currentContent.phone.replace(/-/g, '')}`}
            className="flex items-center gap-3 bg-black/40 backdrop-blur-sm rounded-full px-6 py-3 text-cyan-300 hover:text-white hover:bg-black/60 transition-all group text-lg"
          >
            <Phone className="group-hover:scale-110 transition-transform" size={24} />
            <span>{currentContent.phone}</span>
          </a>
        </div>

        <div className="flex justify-center gap-6 fade-in-up" style={{ animationDelay: '0.9s' }}>
          <a 
            href="https://www.youtube.com/user/Aquamedias"
            target="_blank"
            rel="noopener noreferrer"
            className="w-16 h-16 flex items-center justify-center rounded-full border-2 border-cyan-500/50 hover:border-cyan-400 hover:bg-cyan-500/20 transition-all backdrop-blur-sm bg-black/20"
          >
            <Youtube className="text-cyan-400" size={28} />
          </a>
          <a 
            href="https://www.instagram.com/aquamedias"
            target="_blank"
            rel="noopener noreferrer"
            className="w-16 h-16 flex items-center justify-center rounded-full border-2 border-cyan-500/50 hover:border-cyan-400 hover:bg-cyan-500/20 transition-all backdrop-blur-sm bg-black/20"
          >
            <Instagram className="text-cyan-400" size={28} />
          </a>
          <a 
            href="https://www.linkedin.com/company/aquamedias"
            target="_blank"
            rel="noopener noreferrer"
            className="w-16 h-16 flex items-center justify-center rounded-full border-2 border-cyan-500/50 hover:border-cyan-400 hover:bg-cyan-500/20 transition-all backdrop-blur-sm bg-black/20"
          >
            <Linkedin className="text-cyan-400" size={28} />
          </a>
        </div>
      </div>

      <div 
        onClick={() => handleClick('about')}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 bounce z-10 cursor-pointer fade-in-up"
        style={{ animationDelay: '1.1s' }}
      >
        <ChevronDown className="text-cyan-400 drop-shadow-lg" size={40} />
        <div className="w-px h-20 bg-gradient-to-b from-cyan-400 to-transparent" />
      </div>
    </section>
  );
}