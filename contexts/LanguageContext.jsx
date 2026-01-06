'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [isFrench, setIsFrench] = useState(true);

  // Charger la langue depuis localStorage au démarrage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setIsFrench(savedLanguage === 'fr');
    }
  }, []);

  // Sauvegarder la langue dans localStorage quand elle change
  useEffect(() => {
    localStorage.setItem('language', isFrench ? 'fr' : 'en');
    // Déclencher un événement pour notifier les autres composants
    window.dispatchEvent(new Event('languageChange'));
  }, [isFrench]);

  const toggleLanguage = () => {
    setIsFrench(!isFrench);
  };

  const setLanguage = (language) => {
    setIsFrench(language === 'fr');
  };

  return (
    <LanguageContext.Provider value={{ isFrench, toggleLanguage, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}