'use client';

import { GraduationCap, Film, Zap } from 'lucide-react';

const services = [
  {
    title: 'Formation Spécialisée',
    description: 'Programmes de formation avancée pour les équipes techniques et créatives souhaitant maîtriser les techniques de production aquatique.',
    icon: <GraduationCap className="w-12 h-12" />,
    features: ['Certification professionnelle', 'Ateliers pratiques', 'Mentorat expert']
  },
  {
    title: 'Production Aquatique',
    description: 'Gestion complète de productions sous-marines, de la pré-production à la post-production, avec notre équipe d\'experts.',
    icon: <Film className="w-12 h-12" />,
    features: ['Équipement spécialisé', 'Sécurité maximale', 'Innovation technique']
  },
  {
    title: 'Innovation Technologique',
    description: 'Développement de technologies de pointe pour repousser les limites de la capture d\'images sous-marines.',
    icon: <Zap className="w-12 h-12" />,
    features: ['R&D continue', 'Prototypage rapide', 'Solutions sur mesure']
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="section-padding bg-gradient-to-b from-cyan-950 via-black to-cyan-950">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 fadeInUp text-cyan-400">
            EXPERTISE 360°
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto fadeInUp" style={{ animationDelay: '0.2s' }}>
            Une approche complète pour répondre à tous vos besoins en production aquatique
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group relative bg-cyan-950/50 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-8 hover:border-cyan-400/50 transition-all duration-500 fadeInUp"
              style={{ animationDelay: `${0.3 + index * 0.1}s` }}
            >
              {/* Shimmer Effect Container */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden">
                <div className="absolute -inset-[100%] shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
              
              <div className="relative z-10">
                {/* Icon */}
                <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-500">
                  {service.icon}
                </div>
                
                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-4">
                  {service.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-300 mb-6">
                  {service.description}
                </p>
                
                {/* Features */}
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                      <span className="text-gray-400">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {/* CTA Button */}
                <button className="mt-8 w-full py-3 bg-cyan-500 text-white font-bold rounded-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500 hover:bg-cyan-600">
                  En savoir plus
                </button>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-20 h-20">
                <div className="absolute top-4 right-4 w-12 h-12 border-t border-r border-cyan-400/30 rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              
              <div className="absolute bottom-0 left-0 w-20 h-20">
                <div className="absolute bottom-4 left-4 w-12 h-12 border-b border-l border-cyan-400/30 rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              
              {/* Hover Scale Effect */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-cyan-400/20 rounded-2xl transition-all duration-500 group-hover:scale-[1.02]" />
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 max-w-4xl mx-auto fadeInUp" style={{ animationDelay: '0.6s' }}>
          <div className="bg-gradient-to-r from-cyan-900/30 to-cyan-800/30 rounded-2xl p-8 border border-cyan-500/40">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="text-2xl font-bold text-white mb-2">
                  Besoin d&apos;une solution sur mesure ?
                </h4>
                <p className="text-gray-300">
                  Contactez-nous pour discuter de votre projet spécifique et découvrir comment 
                  notre expertise peut faire la différence.
                </p>
              </div>
              <a
                href="mailto:info@aquamedias.com"
                className="px-8 py-3 bg-cyan-500 text-white font-bold rounded-full hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 transform hover:scale-105 whitespace-nowrap hover:bg-cyan-600"
              >
                Demander un devis
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
