'use client';

import { Mail, Phone, MapPin, Youtube, Instagram, Linkedin } from 'lucide-react';

export default function ContactSection() {
  return (
    <section id="contact" className="section-padding bg-gradient-to-b from-black to-cyan-950">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 fadeInUp text-cyan-400">
            CRÉONS L&apos;EXTRAORDINAIRE ENSEMBLE
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 fadeInUp" style={{ animationDelay: '0.2s' }}>
            Prêt à plonger dans votre prochain projet ? Notre équipe d&apos;experts est là pour 
            transformer votre vision en réalité aquatique.
          </p>
          
          {/* Contact Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 fadeInUp" style={{ animationDelay: '0.4s' }}>
            <div className="bg-cyan-950/40 p-6 rounded-2xl border border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300">
              <div className="text-cyan-400 mb-4">
                <Mail className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Courriel</h3>
              <a
                href="mailto:info@aquamedias.com"
                className="text-cyan-200 hover:text-cyan-300 transition-colors"
              >
                info@aquamedias.com
              </a>
            </div>
            
            <div className="bg-cyan-950/40 p-6 rounded-2xl border border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300">
              <div className="text-cyan-400 mb-4">
                <Phone className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Téléphone</h3>
              <a
                href="tel:+15148138788"
                className="text-cyan-200 hover:text-cyan-300 transition-colors"
              >
                +1 (514) 813-8788
              </a>
            </div>
            
            <div className="bg-cyan-950/40 p-6 rounded-2xl border border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300">
              <div className="text-cyan-400 mb-4">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Localisation</h3>
              <p className="text-cyan-200">
                Montréal, Québec<br />
                Canada
              </p>
            </div>
          </div>
          
          {/* Social Links */}
          <div className="fadeInUp" style={{ animationDelay: '0.6s', marginTop: '68px' }}>
            <h3 className="text-2xl font-bold text-white mb-6">Suivez notre actualité</h3>
            <div className="flex justify-center gap-6">
              {[
                { name: 'YouTube', icon: <Youtube className="w-6 h-6" />, color: 'text-red-400' },
                { name: 'Instagram', icon: <Instagram className="w-6 h-6" />, color: 'text-pink-400' },
                { name: 'LinkedIn', icon: <Linkedin className="w-6 h-6" />, color: 'text-blue-300' },
              ].map((social) => (
                <a
                  key={social.name}
                  href="#"
                  className={`w-14 h-14 rounded-full bg-black/50 border border-cyan-500/20 flex items-center justify-center hover:border-cyan-400 hover:bg-cyan-400/10 transition-all duration-300 transform hover:scale-110 ${social.color}`}
                  aria-label={`Follow us on ${social.name}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* Footer Note */}
          <div className="mt-12 pt-8 border-t border-cyan-500/30 fadeInUp" style={{ animationDelay: '0.8s' }}>
            <p className="text-gray-400">
              © {new Date().getFullYear()} AQUAMEDIAS. Tous droits réservés.<br />
              Spécialistes en images aquatiques depuis 2000.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
