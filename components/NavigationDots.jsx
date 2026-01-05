'use client';

import { useState, useEffect, useRef } from 'react';

const sections = ['hero', 'about', 'films', 'services', 'contact'];

export default function NavigationDots() {
  const [activeSection, setActiveSection] = useState('hero');
  const observerRef = useRef(null);

  // IntersectionObserver ANTI-JERKINESS
  useEffect(() => {
    let lastChangeTime = 0;
    const MIN_CHANGE_DELAY = 300;
    
    const observer = new IntersectionObserver(
      (entries) => {
        const now = Date.now();
        
        // Calculer toutes les visibilités
        const sectionVisibilities = {};
        entries.forEach(entry => {
          sectionVisibilities[entry.target.id] = entry.intersectionRatio;
        });
        
        // Compléter avec 0 pour les sections non détectées
        sections.forEach(sectionId => {
          if (!(sectionId in sectionVisibilities)) {
            sectionVisibilities[sectionId] = 0;
          }
        });
        
        // Trouver la plus visible
        let mostVisibleSection = activeSection;
        let highestRatio = sectionVisibilities[activeSection] || 0;
        
        Object.entries(sectionVisibilities).forEach(([sectionId, ratio]) => {
          if (ratio > highestRatio) {
            highestRatio = ratio;
            mostVisibleSection = sectionId;
          }
        });
        
        // Hystérésis : bonus pour la section actuelle
        const currentSectionBonus = 0.1;
        const currentSectionRatio = (sectionVisibilities[activeSection] || 0) + currentSectionBonus;
        
        // Changement seulement si significativement plus visible
        const shouldChange = 
          mostVisibleSection !== activeSection &&
          highestRatio > 0.6 &&
          highestRatio > currentSectionRatio + 0.15 &&
          now - lastChangeTime >= MIN_CHANGE_DELAY;
        
        if (shouldChange) {
          lastChangeTime = now;
          setActiveSection(mostVisibleSection);
        }
      },
      {
        root: null,
        rootMargin: '-25% 0px -25% 0px',
        threshold: [0, 0.2, 0.4, 0.6, 0.8, 1.0]
      }
    );

    observerRef.current = observer;

    setTimeout(() => {
      sections.forEach(sectionId => {
        const element = document.getElementById(sectionId);
        if (element) {
          observer.observe(element);
        }
      });
    }, 1000);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [activeSection]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-4">
      {sections.map((section) => {
        const isActive = activeSection === section;
        
        return (
          <button
            key={section}
            onClick={() => scrollToSection(section)}
            className="group relative flex items-center justify-center"
            aria-label={`Go to ${section} section`}
          >
            <div
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                isActive
                  ? 'bg-cyan-300 scale-110'
                  : 'bg-cyan-400/30 hover:bg-cyan-400/50'
              }`}
            />
            <div className="absolute right-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-black/80 backdrop-blur-sm px-3 py-1 rounded text-xs whitespace-nowrap">
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}