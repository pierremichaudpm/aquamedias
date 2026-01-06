"use client";

import { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  Mail,
  Phone,
  Youtube,
  Instagram,
  Linkedin,
  Facebook,
  Menu,
  X,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function HeroSection() {
  const { isFrench, toggleLanguage } = useLanguage();
  const [activeSection, setActiveSection] = useState("hero");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const observerRef = useRef(null);
  const activeSectionRef = useRef(activeSection);

  const content = {
    fr: {
      subtitle: "SPÉCIALISTES EN IMAGES AQUATIQUES",
      tagline: "Nous créons l'impossible sous l'eau depuis 2000",
      email: "info@aquamedias.com",
      phone: "514-813-8788",
    },
    en: {
      subtitle: "UNDERWATER IMAGING SPECIALISTS",
      tagline: "Creating the impossible underwater since 2000",
      email: "info@aquamedias.com",
      phone: "514-813-8788",
    },
  };

  const currentContent = isFrench ? content.fr : content.en;

  // IntersectionObserver for section navigation
  useEffect(() => {
    const sections = ["hero", "about", "films", "services", "contact"];
    let lastChangeTime = 0;
    const MIN_CHANGE_DELAY = 200;

    const observer = new IntersectionObserver(
      (entries) => {
        const now = Date.now();
        const sectionVisibilities = {};

        entries.forEach((entry) => {
          const sectionId = entry.target.id;
          sectionVisibilities[sectionId] = entry.intersectionRatio;
        });

        sections.forEach((sectionId) => {
          if (!(sectionId in sectionVisibilities)) {
            sectionVisibilities[sectionId] = 0;
          }
        });

        let mostVisibleSection = activeSectionRef.current;
        let highestRatio = 0;

        Object.entries(sectionVisibilities).forEach(([sectionId, ratio]) => {
          if (ratio > highestRatio) {
            highestRatio = ratio;
            mostVisibleSection = sectionId;
          }
        });

        const shouldChange =
          mostVisibleSection !== activeSectionRef.current && highestRatio > 0.4;

        if (shouldChange && now - lastChangeTime >= MIN_CHANGE_DELAY) {
          lastChangeTime = now;
          setActiveSection(mostVisibleSection);
          activeSectionRef.current = mostVisibleSection;
        }
      },
      {
        root: null,
        rootMargin: "-10% 0px -10% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1.0],
      },
    );

    observerRef.current = observer;

    setTimeout(() => {
      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          observer.observe(element);
        }
      });
    }, 100);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  const menuItems = [
    { id: "hero", label: "ACCUEIL" },
    { id: "about", label: "L'EAU" },
    { id: "films", label: "PROJETS" },
    { id: "services", label: "EXPERTISE" },
    { id: "contact", label: "CONTACT" },
  ];

  const handleClick = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section
      id="hero"
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Cyan Underlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-cyan-500/60 via-cyan-600/50 to-cyan-900/40" />

      {/* Video Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover opacity-85"
          style={{
            transform: "scale(1.18) translateY(-7%)",
            transformOrigin: "center top",
            width: "100%",
            height: "100%",
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

      {/* Language Toggle */}
      <div className="absolute top-6 right-6 z-30 fade-in-up">
        <button
          onClick={toggleLanguage}
          className="px-5 py-2.5 rounded-full bg-black/40 backdrop-blur-md border-2 border-cyan-400/40 text-cyan-300 hover:text-cyan-200 hover:border-cyan-300 hover:bg-black/60 smooth-transition hover:scale-105 text-lg font-medium shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/30"
        >
          {isFrench ? "EN" : "FR"}
        </button>
      </div>

      {/* Burger Menu for Mobile */}
      <div className="absolute top-6 left-6 z-40 md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="w-14 h-14 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md border-2 border-cyan-400/40 text-cyan-300 hover:text-cyan-200 hover:border-cyan-300 hover:bg-black/60 smooth-transition hover:scale-105"
          aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-30 md:hidden smooth-transition-slow ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />
        <div
          className={`absolute top-0 left-0 h-full w-64 bg-gradient-to-b from-cyan-950/95 to-slate-900/95 backdrop-blur-xl border-r border-cyan-500/30 shadow-2xl shadow-cyan-500/20 transform smooth-transition-slow ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-8 pt-24 h-full flex flex-col">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-cyan-300 mb-2">MENU</h3>
              <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-full"></div>
            </div>

            <nav className="flex-1">
              <ul className="space-y-6">
                {menuItems.map(({ id, label }) => {
                  const isActive = activeSection === id;
                  return (
                    <li key={id}>
                      <button
                        onClick={() => {
                          handleClick(id);
                          setIsMenuOpen(false);
                        }}
                        className={`w-full text-left py-3 px-4 rounded-lg smooth-transition-fast flex items-center gap-3 ${
                          isActive
                            ? "bg-cyan-500/20 border-l-4 border-cyan-400 text-cyan-300 font-bold"
                            : "text-cyan-100/80 hover:bg-cyan-500/10 hover:text-cyan-300 hover:border-l-4 border-cyan-400/50"
                        }`}
                      >
                        <div
                          className={`w-3 h-3 rounded-full ${
                            isActive ? "bg-cyan-400" : "bg-cyan-400/40"
                          }`}
                        />
                        <span className="text-lg font-medium tracking-wide">
                          {label}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="mt-auto pt-8 border-t border-cyan-500/20">
              <div className="flex justify-center gap-4">
                <a
                  href="https://www.youtube.com/user/Aquamedias"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-cyan-500/50 hover:border-cyan-400 hover:bg-cyan-500/20 smooth-transition"
                >
                  <Youtube className="text-cyan-400" size={20} />
                </a>
                <a
                  href="https://www.instagram.com/aquamedias"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-cyan-500/50 hover:border-cyan-400 hover:bg-cyan-500/20 smooth-transition"
                >
                  <Instagram className="text-cyan-400" size={20} />
                </a>
                <a
                  href="https://www.facebook.com/aquamedias"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-cyan-500/50 hover:border-cyan-400 hover:bg-cyan-500/20 smooth-transition"
                >
                  <Facebook className="text-cyan-400" size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/company/aquamedias"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-cyan-500/50 hover:border-cyan-400 hover:bg-cyan-500/20 smooth-transition"
                >
                  <Linkedin className="text-cyan-400" size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Navigation Menu for Desktop */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col items-center justify-center">
        {/* Simple overlay with lines on top, bottom, left and proper padding */}
        <div className="absolute right-0 top-0 h-full w-48 pt-[15px] pb-[15px]">
          <div className="h-full w-full bg-black/10 backdrop-blur-sm rounded-l-2xl border-t border-b border-l border-cyan-400/20" />
        </div>

        <div className="relative flex flex-col items-end py-8">
          {menuItems.map(({ id, label }, index) => {
            const isActive = activeSection === id;
            const isFirst = index === 0;
            const isLast = index === menuItems.length - 1;

            return (
              <div
                key={id}
                className={`pr-6 pl-4 ${isFirst ? "mt-[15px]" : ""} ${isLast ? "mb-[15px]" : ""} ${!isLast ? "mb-2" : ""}`}
              >
                <button
                  onClick={() => handleClick(id)}
                  className="group flex items-center gap-3"
                  aria-label={`Aller à ${label}`}
                >
                  <span
                    className={`hidden lg:inline text-lg font-semibold whitespace-nowrap tracking-wider mr-4 smooth-transition duration-300 ease-out ${
                      isActive ? "text-cyan-300 font-bold" : "text-cyan-200/60"
                    }`}
                  >
                    {label}
                  </span>
                  <div
                    className={`w-3.5 h-3.5 rounded-full smooth-transition duration-300 ease-out ${
                      isActive
                        ? "bg-cyan-300 scale-110"
                        : "bg-cyan-400/40 group-hover:bg-cyan-300/60"
                    }`}
                  />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center w-full px-4">
        {/* Logo */}
        <div
          className="mb-2 md:mb-3 fade-in-up flex justify-center"
          style={{ animationDelay: "0.2s" }}
        >
          <img
            src="/images/logoi.png"
            alt="Aquamedias Logo"
            className="h-16 md:h-24 lg:h-32 w-auto object-contain"
          />
        </div>

        {/* Logo Title */}
        <div
          className="mb-4 fade-in-up flex justify-center"
          style={{ animationDelay: "0.4s" }}
        >
          <img
            src="/images/title.png"
            alt="Aquamedias Title Logo"
            className="h-24 md:h-32 lg:h-40 w-auto object-contain"
          />
        </div>

        <h2
          className="text-2xl md:text-4xl font-light mb-3 tracking-tight fade-in-up font-antonio hero-subtitle"
          style={{ animationDelay: "0.6s" }}
        >
          {currentContent.subtitle}
        </h2>

        <h1
          className="text-xl md:text-2xl lg:text-3xl font-light mb-8 tracking-normal fade-in-up font-cormorant hero-tagline !text-white"
          style={{ animationDelay: "0.8s" }}
        >
          {currentContent.tagline}
        </h1>

        {/* Contact Info */}
        <div
          className="flex flex-wrap justify-center gap-6 mb-[49px] fade-in-up"
          style={{ animationDelay: "1.0s" }}
        >
          <a
            href={`mailto:${currentContent.email}`}
            className="flex items-center gap-3 bg-black/40 backdrop-blur-sm rounded-full px-6 py-3 text-cyan-300 hover:text-white hover:bg-black/60 smooth-transition group text-lg"
          >
            <Mail
              className="group-hover:scale-110 transition-transform"
              size={24}
            />
            <span>{currentContent.email}</span>
          </a>
          <a
            href={`tel:+1${currentContent.phone.replace(/-/g, "")}`}
            className="flex items-center gap-3 bg-black/40 backdrop-blur-sm rounded-full px-6 py-3 text-cyan-300 hover:text-white hover:bg-black/60 smooth-transition group text-lg"
          >
            <Phone
              className="group-hover:scale-110 transition-transform"
              size={24}
            />
            <span>{currentContent.phone}</span>
          </a>
        </div>

        {/* Social Media Icons */}
        <div
          className="hidden md:flex justify-center gap-5 fade-in-up relative -top-[40px] md:-top-[35px] lg:-top-[30px]"
          style={{ animationDelay: "1.2s" }}
        >
          <a
            href="https://www.youtube.com/user/Aquamedias"
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 flex items-center justify-center rounded-full border-2 border-cyan-500/50 hover:border-cyan-400 hover:bg-cyan-500/20 smooth-transition backdrop-blur-sm bg-black/20"
          >
            <Youtube className="text-cyan-400" size={24} />
          </a>
          <a
            href="https://www.instagram.com/aquamedias"
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 flex items-center justify-center rounded-full border-2 border-cyan-500/50 hover:border-cyan-400 hover:bg-cyan-500/20 smooth-transition backdrop-blur-sm bg-black/20"
          >
            <Instagram className="text-cyan-400" size={24} />
          </a>
          <a
            href="https://www.facebook.com/aquamedias"
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 flex items-center justify-center rounded-full border-2 border-cyan-500/50 hover:border-cyan-400 hover:bg-cyan-500/20 smooth-transition backdrop-blur-sm bg-black/20"
          >
            <Facebook className="text-cyan-400" size={24} />
          </a>
          <a
            href="https://www.linkedin.com/company/aquamedias"
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 flex items-center justify-center rounded-full border-2 border-cyan-500/50 hover:border-cyan-400 hover:bg-cyan-500/20 smooth-transition backdrop-blur-sm bg-black/20"
          >
            <Linkedin className="text-cyan-400" size={24} />
          </a>
        </div>
      </div>

      {/* Down Arrow */}
      <div
        onClick={() => handleClick("about")}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 bounce z-10 cursor-pointer fade-in-up"
        style={{ animationDelay: "1.4s" }}
      >
        <ChevronDown className="text-cyan-400 drop-shadow-lg w-5 h-5 md:w-6 md:h-6" />
        <div className="w-px h-10 md:h-12 lg:h-14 bg-gradient-to-b from-cyan-400 to-transparent" />
      </div>
    </section>
  );
}
