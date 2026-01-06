"use client";

import { GraduationCap, Film, Zap, X } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

// Composant Modal simple pour les services
const ServiceModal = ({ isOpen, onClose, service, currentContent }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  // Gestion de l'ouverture/fermeture
  useEffect(() => {
    if (isOpen) {
      // Use setTimeout to avoid synchronous state updates in effect
      setTimeout(() => {
        setIsVisible(true);
        setTimeout(() => setContentVisible(true), 50);
      }, 0);
      document.body.style.overflow = "hidden";
    } else {
      // Use setTimeout to avoid synchronous state updates in effect
      setTimeout(() => {
        setIsVisible(false);
        setContentVisible(false);
      }, 0);
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  const handleCloseClick = useCallback(() => {
    setIsVisible(false);
    setContentVisible(false);
    setTimeout(onClose, 300);
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsVisible(false);
      setContentVisible(false);
      setTimeout(onClose, 300);
    }
  };

  // Gestion de la touche Échap
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleCloseClick();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleCloseClick]);

  if (!isOpen && !isVisible) return null;
  if (!service) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300" />

      {/* Modal Content */}
      <div
        className={`relative w-full max-w-2xl bg-gradient-to-br from-slate-900 to-cyan-950 rounded-xl overflow-hidden border border-cyan-500/30 shadow-2xl transform transition-all duration-300 ${
          contentVisible
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={handleCloseClick}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/60 backdrop-blur-sm border border-cyan-500/40 text-cyan-300 hover:text-white hover:bg-black/80 hover:border-cyan-400 transition-all"
          aria-label="Fermer la modal"
        >
          <X size={20} />
        </button>

        {/* Modal Content */}
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start gap-4 mb-6">
            <div className="text-4xl text-cyan-400">{service.icon}</div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {service.title}
              </h2>
              <p className="text-gray-300">{service.description}</p>
            </div>
          </div>

          {/* Features */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-cyan-400 mb-4">
              {currentContent.modalFeatures}
            </h3>
            <ul className="space-y-3">
              {service.features.map((feature, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50"
                >
                  <div className="w-2 h-2 bg-cyan-400 rounded-full flex-shrink-0" />
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Additional Info */}
          <div className="p-4 rounded-lg bg-cyan-900/30 border border-cyan-500/20">
            <p className="text-gray-300 text-sm">
              {currentContent.modalContactInfo}
            </p>
          </div>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-cyan-500/20 flex justify-end">
            <a
              href="mailto:info@aquamedias.com"
              className="px-5 py-2 rounded-full bg-cyan-500 text-white font-medium hover:bg-cyan-600 transition-all"
            >
              {currentContent.modalContact}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ServicesSection() {
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isFrench } = useLanguage();

  const content = {
    fr: {
      title: "EXPERTISE 360°",
      subtitle:
        "Une approche complète pour répondre à tous vos besoins en production aquatique",
      services: [
        {
          title: "Formation Spécialisée",
          description:
            "Programmes de formation avancée pour les équipes techniques et créatives souhaitant maîtriser les techniques de production aquatique.",
          features: [
            "Certification professionnelle",
            "Ateliers pratiques",
            "Mentorat expert",
          ],
        },
        {
          title: "Production Aquatique",
          description:
            "Gestion complète de productions sous-marines, de la pré-production à la post-production, avec notre équipe d'experts.",
          features: [
            "Équipement spécialisé",
            "Sécurité maximale",
            "Innovation technique",
          ],
        },
        {
          title: "Innovation Technologique",
          description:
            "Développement de technologies de pointe pour repousser les limites de la capture d'images sous-marines.",
          features: [
            "R&D continue",
            "Prototypage rapide",
            "Solutions sur mesure",
          ],
        },
      ],
      customSolution: "Besoin d'une solution sur mesure ?",
      customDescription:
        "Contactez-nous pour discuter de votre projet spécifique et découvrir comment notre expertise peut faire la différence.",
      requestQuote: "Demander un devis",
      clickToLearn: "Click to learn more →",
      modalFeatures: "Caractéristiques",
      modalContactInfo:
        "Pour plus d'informations sur ce service ou pour discuter de vos besoins spécifiques, contactez-nous directement.",
      modalContact: "Contactez-nous",
    },
    en: {
      title: "360° EXPERTISE",
      subtitle:
        "A comprehensive approach to meet all your aquatic production needs",
      services: [
        {
          title: "Specialized Training",
          description:
            "Advanced training programs for technical and creative teams looking to master aquatic production techniques.",
          features: [
            "Professional certification",
            "Practical workshops",
            "Expert mentoring",
          ],
        },
        {
          title: "Aquatic Production",
          description:
            "Complete management of underwater productions, from pre-production to post-production, with our team of experts.",
          features: [
            "Specialized equipment",
            "Maximum safety",
            "Technical innovation",
          ],
        },
        {
          title: "Technological Innovation",
          description:
            "Development of cutting-edge technologies to push the boundaries of underwater image capture.",
          features: ["Continuous R&D", "Rapid prototyping", "Custom solutions"],
        },
      ],
      customSolution: "Need a custom solution?",
      customDescription:
        "Contact us to discuss your specific project and discover how our expertise can make a difference.",
      requestQuote: "Request a quote",
      clickToLearn: "Click to learn more →",
      modalFeatures: "Features",
      modalContactInfo:
        "For more information about this service or to discuss your specific needs, contact us directly.",
      modalContact: "Contact us",
    },
  };

  const currentContent = isFrench ? content.fr : content.en;

  const services = [
    {
      title: currentContent.services[0].title,
      description: currentContent.services[0].description,
      icon: <GraduationCap className="w-12 h-12" />,
      features: currentContent.services[0].features,
    },
    {
      title: currentContent.services[1].title,
      description: currentContent.services[1].description,
      icon: <Film className="w-12 h-12" />,
      features: currentContent.services[1].features,
    },
    {
      title: currentContent.services[2].title,
      description: currentContent.services[2].description,
      icon: <Zap className="w-12 h-12" />,
      features: currentContent.services[2].features,
    },
  ];

  const handleServiceClick = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
    document.body.style.overflow = "";
  };

  return (
    <section
      id="services"
      className="section-padding bg-gradient-to-b from-cyan-950 via-black to-cyan-950"
    >
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 fadeInUp text-cyan-400">
            {currentContent.title}
          </h2>
          <p
            className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto fadeInUp"
            style={{ animationDelay: "0.2s" }}
          >
            {currentContent.subtitle}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div
              key={service.title}
              onClick={() => handleServiceClick(service)}
              className="group relative bg-cyan-950/50 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-8 hover:border-cyan-400/50 transition-all duration-500 fadeInUp cursor-pointer"
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
                <p className="text-gray-300 mb-6">{service.description}</p>

                {/* Features */}
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                      <span className="text-gray-400">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Indicator */}
                <div className="mt-8 flex items-center justify-end">
                  <div className="text-cyan-400 text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-500">
                    {currentContent.clickToLearn}
                  </div>
                </div>
              </div>

              {/* Hover Scale Effect */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-cyan-400/20 transition-all duration-500 group-hover:scale-[1.02]" />
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div
          className="mt-16 max-w-4xl mx-auto fadeInUp"
          style={{ animationDelay: "0.6s" }}
        >
          <div className="bg-gradient-to-r from-cyan-900/30 to-cyan-800/30 rounded-2xl p-8 border border-cyan-500/40">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="text-2xl font-bold text-white mb-2">
                  {currentContent.customSolution}
                </h4>
                <p className="text-gray-300">
                  {currentContent.customDescription}
                </p>
              </div>
              <a
                href="mailto:info@aquamedias.com"
                className="px-8 py-3 bg-cyan-500 text-white font-bold rounded-full hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 transform hover:scale-105 whitespace-nowrap hover:bg-cyan-600"
              >
                {currentContent.requestQuote}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Service Modal */}
      <ServiceModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        service={selectedService}
        currentContent={currentContent}
      />
    </section>
  );
}
