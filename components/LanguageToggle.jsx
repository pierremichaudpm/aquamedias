'use client';

import { Languages } from 'lucide-react';

export default function LanguageToggle({ language, toggleLanguage }) {
  return (
    <button
      onClick={toggleLanguage}
      className="fixed top-4 right-4 z-50 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-cyan-500/30 hover:border-cyan-400 transition-all duration-300 group"
      aria-label={`Switch to ${language === 'fr' ? 'English' : 'French'}`}
    >
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-white group-hover:text-cyan-300 transition-colors">
          {language === 'fr' ? 'FR' : 'EN'}
        </span>
        <div className="w-6 h-6 flex items-center justify-center">
          <Languages className="w-4 h-4 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
        </div>
      </div>
    </button>
  );
}
