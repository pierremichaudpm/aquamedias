'use client';

import { Calendar, Film, Droplets } from 'lucide-react';

export default function AboutSection() {
  const stats = [
    { value: '25+', label: 'Années', description: 'd\'expertise aquatique', icon: <Calendar className="w-8 h-8" /> },
    { value: '50+', label: 'Productions', description: 'réalisées avec succès', icon: <Film className="w-8 h-8" /> },
    { value: '100%', label: 'Aquatique', description: 'spécialisation totale', icon: <Droplets className="w-8 h-8" /> },
  ];

  return (
    <section id="about" className="section-padding bg-gradient-to-b from-cyan-950 via-black to-cyan-950">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 fadeInUp text-cyan-400">
            L&apos;EAU - NOTRE UNIVERS
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed fadeInUp" style={{ animationDelay: '0.2s' }}>
            Depuis le tournant du siècle, AQUAMEDIAS repousse les limites de la production aquatique. 
            Des blockbusters hollywoodiens aux expériences immersives, nous maîtrisons l&apos;art de tourner dans l&apos;eau.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="group relative bg-cyan-950/50 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-8 hover:border-cyan-400/50 transition-all duration-500 fadeInUp"
              style={{ animationDelay: `${0.4 + index * 0.1}s` }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden">
                <div className="absolute -inset-[100%] shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-6xl md:text-7xl font-bold text-cyan-400">
                    {stat.value}
                  </div>
                  <div className="text-cyan-400">
                    {stat.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {stat.label}
                </h3>
                <p className="text-gray-400">
                  {stat.description}
                </p>
              </div>
              
              {/* Decorative element */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-cyan rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 max-w-3xl mx-auto fadeInUp" style={{ animationDelay: '0.7s' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-cyan-950/40 p-6 rounded-xl border border-cyan-500/20">
              <h4 className="text-xl font-bold text-cyan-400 mb-3">Innovation Continue</h4>
              <p className="text-cyan-200">
                Nous développons constamment de nouvelles techniques et technologies pour capturer 
                la beauté sous-marine comme jamais auparavant.
              </p>
            </div>
            <div className="bg-cyan-950/40 p-6 rounded-xl border border-cyan-500/20">
              <h4 className="text-xl font-bold text-cyan-400 mb-3">Expertise Globale</h4>
              <p className="text-cyan-200">
                Notre équipe travaille sur des projets à travers le monde, apportant notre savoir-faire 
                unique à chaque production.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
