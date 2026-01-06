"use client";

import { Calendar, Film, Droplets, X } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

// Composant Modal pour les vidéos
const VideoModal = ({ isOpen, onClose, videoId }) => {
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

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm transition-opacity duration-300" />

      {/* Modal Content */}
      <div
        className={`relative w-full max-w-6xl aspect-video bg-black rounded-xl overflow-hidden transform transition-all duration-300 ${
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

        {/* Fullscreen Video */}
        <video
          className="w-full h-full object-contain"
          autoPlay
          muted
          loop
          playsInline
          controls
        >
          <source
            src={`/videos/${getVideoNameById(videoId)}`}
            type="video/mp4"
          />
          Votre navigateur ne supporte pas la vidéo.
        </video>
      </div>
    </div>
  );
};

// Fonction pour obtenir le nom de la vidéo par ID
const getVideoNameById = (id) => {
  const videos = [
    {
      id: 1,
      name: "choregraphie_neorealite.mp4",
      optimized: "choregraphie_neorealite_optimized.mp4",
    },
    {
      id: 2,
      name: "CiteMemoire_MTL.mp4",
      optimized: "CiteMemoire_MTL_optimized.mp4",
    },
    {
      id: 3,
      name: "CosmopolitanOfLasVegas_Opulence.mp4",
      optimized: "CosmopolitanOfLasVegas_Opulence_optimized.mp4",
    },
    {
      id: 4,
      name: "CosmopolitanOfLasVegas_Opulence_MakingOf.mp4",
      optimized: "CosmopolitanOfLasVegas_Opulence_MakingOf_optimized.mp4",
    },
    {
      id: 5,
      name: "Experiences_VR&Dome.mp4",
      optimized: "Experiences_VR&Dome_optimized.mp4",
    },
    {
      id: 6,
      name: "RedpathWaterfrontFestival_Toronto.mp4",
      optimized: "RedpathWaterfrontFestival_Toronto_optimized.mp4",
    },
  ];
  const video = videos.find((v) => v.id === id);
  return video ? video.name : "";
};

export default function AboutSection() {
  const { isFrench } = useLanguage();

  const content = {
    fr: {
      title: "L'EAU - NOTRE UNIVERS",
      description:
        "Depuis le tournant du siècle, Aquamedia repousse les limites de la production aquatique. Des blockbusters hollywoodiens aux expériences immersives, nous maîtrisons l'art de tourner dans l'eau.",
      stats: [
        { value: "25+", label: "Années", description: "d'expertise aquatique" },
        {
          value: "50+",
          label: "Productions",
          description: "réalisées avec succès",
        },
        {
          value: "100%",
          label: "Aquatique",
          description: "spécialisation totale",
        },
      ],
      innovationTitle: "Innovation Continue",
      innovationText:
        "Nous développons constamment de nouvelles techniques et technologies pour capturer la beauté sous-marine comme jamais auparavant.",
      expertiseTitle: "Expertise Globale",
      expertiseText:
        "Notre équipe travaille sur des projets à travers le monde, apportant notre savoir-faire unique à chaque production.",
    },
    en: {
      title: "WATER - OUR UNIVERSE",
      description:
        "Since the turn of the century, Aquamedia has been pushing the boundaries of aquatic production. From Hollywood blockbusters to immersive experiences, we master the art of filming in water.",
      stats: [
        { value: "25+", label: "Years", description: "of aquatic expertise" },
        {
          value: "50+",
          label: "Productions",
          description: "successfully completed",
        },
        {
          value: "100%",
          label: "Aquatic",
          description: "total specialization",
        },
      ],
      innovationTitle: "Continuous Innovation",
      innovationText:
        "We constantly develop new techniques and technologies to capture underwater beauty like never before.",
      expertiseTitle: "Global Expertise",
      expertiseText:
        "Our team works on projects around the world, bringing our unique expertise to each production.",
    },
  };

  const currentContent = isFrench ? content.fr : content.en;

  const stats = [
    {
      value: currentContent.stats[0].value,
      label: currentContent.stats[0].label,
      description: currentContent.stats[0].description,
      icon: <Calendar className="w-8 h-8" />,
    },
    {
      value: currentContent.stats[1].value,
      label: currentContent.stats[1].label,
      description: currentContent.stats[1].description,
      icon: <Film className="w-8 h-8" />,
    },
    {
      value: currentContent.stats[2].value,
      label: currentContent.stats[2].label,
      description: currentContent.stats[2].description,
      icon: <Droplets className="w-8 h-8" />,
    },
  ];

  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const videoRefs = useRef([]);
  const sectionObserverRef = useRef(null);

  // IntersectionObserver simple pour contrôler les vidéos
  useEffect(() => {
    const sectionElement = document.getElementById("about");
    if (!sectionElement) return;

    // Fonction simple pour contrôler les vidéos
    const controlVideos = (shouldPlay) => {
      videoRefs.current.forEach((video) => {
        if (video) {
          if (shouldPlay) {
            video.play().catch(() => {
              // Ignorer les erreurs d'autoplay silencieusement
            });
          } else {
            video.pause();
          }
        }
      });
    };

    // Observer simple sans debouncing complexe
    sectionObserverRef.current = new IntersectionObserver(
      (entries) => {
        const isVisible = entries[0].isIntersecting;
        controlVideos(isVisible);
      },
      {
        threshold: 0.01,
      },
    );

    sectionObserverRef.current.observe(sectionElement);

    // Initialiser les vidéos
    const initVideos = () => {
      videoRefs.current.forEach((video) => {
        if (video) {
          video.loop = true;
          video.muted = true;
          video.playsInline = true;
          video.preload = "metadata";
        }
      });
    };

    const timeoutId = setTimeout(initVideos, 500);

    return () => {
      clearTimeout(timeoutId);
      if (sectionObserverRef.current) {
        sectionObserverRef.current.disconnect();
      }
    };
  }, []);

  const handleVideoClick = (videoId) => {
    // Vérifier si on est en desktop (largeur d'écran >= 1024px)
    if (window.innerWidth >= 1024) {
      setSelectedVideoId(videoId);
      setIsVideoModalOpen(true);
    }
  };

  const handleCloseVideoModal = () => {
    setIsVideoModalOpen(false);
    setSelectedVideoId(null);
    document.body.style.overflow = "";
  };

  return (
    <section
      id="about"
      className="section-padding bg-gradient-to-b from-cyan-950 via-black to-cyan-950"
    >
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 fadeInUp text-cyan-400">
            {currentContent.title}
          </h2>

          <p
            className="text-xl md:text-2xl text-gray-300 leading-relaxed fadeInUp"
            style={{ animationDelay: "0.2s" }}
          >
            {currentContent.description}
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
                  <div className="text-cyan-400">{stat.icon}</div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {stat.label}
                </h3>
                <p className="text-gray-400">{stat.description}</p>
              </div>

              {/* Decorative element */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-cyan rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div
          className="mt-16 max-w-3xl mx-auto fadeInUp"
          style={{ animationDelay: "0.7s" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-cyan-950/40 p-6 rounded-xl border border-cyan-500/20">
              <h4 className="text-xl font-bold text-cyan-400 mb-3">
                {currentContent.innovationTitle}
              </h4>
              <p className="text-cyan-200">{currentContent.innovationText}</p>
            </div>
            <div className="bg-cyan-950/40 p-6 rounded-xl border border-cyan-500/20">
              <h4 className="text-xl font-bold text-cyan-400 mb-3">
                {currentContent.expertiseTitle}
              </h4>
              <p className="text-cyan-200">{currentContent.expertiseText}</p>
            </div>
          </div>
        </div>

        {/* Videos Section - 2 rows of 3 videos */}
        <div className="mt-20 fadeInUp" style={{ animationDelay: "0.9s" }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                id: 1,
                name: "choregraphie_neorealite.mp4",
                optimized: "choregraphie_neorealite_optimized.mp4",
                title: "Chorégraphie Néoréalité",
              },
              {
                id: 2,
                name: "CiteMemoire_MTL.mp4",
                optimized: "CiteMemoire_MTL_optimized.mp4",
                title: "Cité Mémoire Montréal",
              },
              {
                id: 3,
                name: "CosmopolitanOfLasVegas_Opulence.mp4",
                optimized: "CosmopolitanOfLasVegas_Opulence_optimized.mp4",
                title: "Cosmopolitan Las Vegas",
              },
              {
                id: 4,
                name: "CosmopolitanOfLasVegas_Opulence_MakingOf.mp4",
                optimized:
                  "CosmopolitanOfLasVegas_Opulence_MakingOf_optimized.mp4",
                title: "Making Of Cosmopolitan",
              },
              {
                id: 5,
                name: "Experiences_VR&Dome.mp4",
                optimized: "Experiences_VR&Dome_optimized.mp4",
                title: "Expériences VR & Dôme",
              },
              {
                id: 6,
                name: "RedpathWaterfrontFestival_Toronto.mp4",
                optimized: "RedpathWaterfrontFestival_Toronto_optimized.mp4",
                title: "Redpath Waterfront Toronto",
              },
            ].map((video, index) => (
              <div
                key={video.id}
                onClick={() => handleVideoClick(video.id)}
                className="group relative aspect-video rounded-xl overflow-hidden cursor-pointer bg-gradient-to-br from-cyan-900/40 to-slate-900/40 border border-cyan-500/30"
              >
                {/* Video playing in loop like hero - with fallback */}
                <div className="absolute inset-0">
                  <video
                    ref={(el) => (videoRefs.current[index] = el)}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    onError={(e) => {
                      console.log(
                        `Erreur de chargement vidéo ${video.optimized}:`,
                        e,
                      );
                      // Fallback si la vidéo n'existe pas encore
                      e.target.style.display = "none";
                      const fallback =
                        e.target.parentElement.querySelector(".video-fallback");
                      if (fallback) fallback.style.display = "flex";
                    }}
                    onCanPlay={(e) => {
                      // La vidéo est prête, mais on laisse l'IntersectionObserver contrôler la lecture
                      // Ne pas démarrer automatiquement
                    }}
                  >
                    <source
                      src={`/videos/${video.optimized}`}
                      type="video/mp4"
                    />
                    <source src={`/videos/${video.name}`} type="video/mp4" />
                  </video>

                  {/* Fallback placeholder when video doesn't exist */}
                  <div className="video-fallback absolute inset-0 flex items-center justify-center hidden">
                    <div className="text-center p-4">
                      <div className="text-cyan-400 text-5xl mb-4">▶</div>
                      <div className="text-cyan-300 font-medium">
                        {video.title}
                      </div>
                      <div className="text-cyan-400/70 text-sm mt-2">
                        Cliquez pour agrandir
                      </div>
                    </div>
                  </div>
                </div>

                {/* Water effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Simple overlay for click indication */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-black/60 backdrop-blur-sm border border-cyan-400/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100">
                    <div className="text-cyan-400 text-2xl">⤢</div>
                  </div>
                </div>

                {/* Simple border on hover */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-cyan-400/50 rounded-xl transition-all duration-300" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={handleCloseVideoModal}
        videoId={selectedVideoId}
      />
    </section>
  );
}
