"use client";

import { Play, ExternalLink, X, Calendar, Video } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

// Composant d'image avec OMDb API et proxy CORS
const MoviePoster = ({ imdbId, alt, title, year }) => {
  const [error, setError] = useState(false);
  const [posterUrl, setPosterUrl] = useState("");
  const [loading, setLoading] = useState(true);

  // Proxy CORS qui fonctionne
  const corsProxy = (url) => {
    // Utiliser corsproxy.io (service public)
    return `https://corsproxy.io/?${encodeURIComponent(url)}`;
  };

  // Charger l'URL de l'affiche depuis l'API OMDb
  useEffect(() => {
    const fetchPoster = async () => {
      try {
        setLoading(true);
        // 1. Récupérer l'URL de l'affiche depuis OMDb
        const omdbResponse = await fetch(
          `https://www.omdbapi.com/?i=${imdbId}&apikey=c28ab8e1`,
        );
        const omdbData = await omdbResponse.json();

        if (omdbData.Poster && omdbData.Poster !== "N/A") {
          // 2. Utiliser un proxy CORS pour l'image Amazon
          const proxyUrl = corsProxy(omdbData.Poster);

          // 3. Tester si le proxy fonctionne
          const testResponse = await fetch(proxyUrl, { method: "HEAD" });
          if (testResponse.ok) {
            setPosterUrl(proxyUrl);
            setError(false);
          } else {
            // Fallback: utiliser l'URL directe (peut échouer à cause de CORS)
            setPosterUrl(omdbData.Poster);
          }
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Erreur chargement affiche:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPoster();
  }, [imdbId]);

  if (loading) {
    // Pendant le chargement
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/30 via-cyan-800/30 to-cyan-700/30 flex items-center justify-center">
        <div className="text-center">
          <div className="text-white/60 text-sm">Chargement...</div>
        </div>
      </div>
    );
  }

  if (error) {
    // Fallback
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900 via-cyan-800 to-cyan-700 flex items-center justify-center">
        <div className="text-center p-4 z-10">
          <div className="text-xl font-bold text-white/80 mb-2">{title}</div>
          <div className="text-white/60">{year}</div>
        </div>
      </div>
    );
  }

  return (
    <img
      src={posterUrl}
      alt={alt}
      className="w-full h-full object-cover"
      loading="lazy"
      onError={() => setError(true)}
    />
  );
};

const films = [
  {
    title: "X-Men: Dark Phoenix",
    year: 2019,
    imdb: "https://www.imdb.com/title/tt6565702/",
    imdbId: "tt6565702",
  },
  {
    title: "At First Light",
    year: 2018,
    imdb: "https://www.imdb.com/title/tt6214928/",
    imdbId: "tt6214928",
  },
  {
    title: "The Glass Castle",
    year: 2017,
    imdb: "https://www.imdb.com/title/tt2378507/",
    imdbId: "tt2378507",
  },
  {
    title: "X-Men: Apocalypse",
    year: 2016,
    imdb: "https://www.imdb.com/title/tt3385516/",
    imdbId: "tt3385516",
  },
  {
    title: "X-Men: Days of Future Past",
    year: 2014,
    imdb: "https://www.imdb.com/title/tt1877832/",
    imdbId: "tt1877832",
  },
  {
    title: "The Fountain",
    year: 2006,
    imdb: "https://www.imdb.com/title/tt0414993/",
    imdbId: "tt0414993",
  },
  {
    title: "The Day After Tomorrow",
    year: 2004,
    imdb: "https://www.imdb.com/title/tt0319262/",
    imdbId: "tt0319262",
  },
  {
    title: "Gothika",
    year: 2003,
    imdb: "https://www.imdb.com/title/tt0348836/",
    imdbId: "tt0348836",
  },
  {
    title: "The Covenant",
    year: 2006,
    imdb: "https://www.imdb.com/title/tt0475944/",
    imdbId: "tt0475944",
  },
  {
    title: "Timeline",
    year: 2003,
    imdb: "https://www.imdb.com/title/tt0300556/",
    imdbId: "tt0300556",
  },
];

// Composant Modal
const ProjectModal = ({ isOpen, onClose, film, currentContent }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

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
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleCloseClick();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleCloseClick]);

  if (!isOpen && !isVisible) return null;
  if (!film) return null;

  // Gestion simple du scroll - déjà géré dans l'effet principal

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 transition-all duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={handleBackdropClick}
    >
      {/* Backdrop cliquable */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300" />

      {/* Modal Content */}
      <div
        className={`relative w-full max-w-4xl max-h-[90vh] md:max-h-[85vh] bg-gradient-to-br from-slate-900 to-cyan-950 rounded-xl md:rounded-2xl overflow-hidden border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 transform transition-all duration-300 ${
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

        {/* Modal Content with Scroll */}
        <div className="overflow-y-auto max-h-[90vh] md:max-h-[85vh] p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-6">
            {/* Colonne gauche - Affiche */}
            <div className="flex-shrink-0">
              <div className="w-32 h-48 rounded overflow-hidden">
                <MoviePoster
                  imdbId={film.imdbId}
                  alt={`Affiche de ${film.title}`}
                  title={film.title}
                  year={film.year}
                />
              </div>

              {/* Titre et infos sous l'affiche */}
              <div className="mt-4">
                <h2 className="text-xl font-bold text-white mb-2">
                  {film.title}
                </h2>
                <div className="flex items-center gap-4 text-cyan-300 text-sm">
                  <span className="flex items-center gap-2">
                    <Calendar size={14} />
                    {film.year}
                  </span>
                  <span className="flex items-center gap-2">
                    <Video size={14} />
                    {currentContent.featureFilm}
                  </span>
                </div>
              </div>
            </div>

            {/* Colonne droite - Contenu */}
            <div className="flex-1">
              {/* Contribution Aquatique */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-cyan-400 mb-3">
                  {currentContent.contribution}
                </h3>
                <div className="space-y-3 text-gray-300">
                  <p>{currentContent.modalText1}</p>
                  <p>{currentContent.modalText2}</p>
                </div>
              </div>

              {/* Défis Techniques */}
              <div>
                <h3 className="text-lg font-bold text-cyan-400 mb-3">
                  {currentContent.challenges}
                </h3>
                <div className="space-y-2">
                  {currentContent.challengesList.map((challenge, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/50"
                    >
                      <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                      <span className="text-gray-300">{challenge}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function FilmsSection() {
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isFrench } = useLanguage();

  const content = {
    fr: {
      title: "PROJETS ICONIQUES",
      subtitle:
        "Découvrez quelques-uns des projets marquants où notre expertise aquatique a fait la différence",
      viewAll: "Voir tous les projets",
      production: "Production Aquatique",
      contribution: "Contribution Aquatique",
      challenges: "Défis Techniques",
      featureFilm: "Long métrage",
      modalText1:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      modalText2:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      challengesList: [
        "Séquences sous-marines complexes avec acteurs",
        "Éclairage naturel en milieu aquatique",
        "Coordination sécurité avec équipe de plongée",
        "Intégration d'effets spéciaux numériques",
      ],
    },
    en: {
      title: "ICONIC PROJECTS",
      subtitle:
        "Discover some of the landmark projects where our aquatic expertise made a difference",
      viewAll: "View all projects",
      production: "Aquatic Production",
      contribution: "Aquatic Contribution",
      challenges: "Technical Challenges",
      featureFilm: "Feature film",
      modalText1:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      modalText2:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      challengesList: [
        "Complex underwater sequences with actors",
        "Natural lighting in aquatic environment",
        "Safety coordination with diving team",
        "Integration of digital special effects",
      ],
    },
  };

  const currentContent = isFrench ? content.fr : content.en;

  const handleFilmClick = (film) => {
    setSelectedFilm(film);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFilm(null);
    // S'assurer que le scroll est restauré
    document.body.style.overflow = "";
  };

  return (
    <section
      id="films"
      className="section-padding bg-gradient-to-b from-black to-cyan-950"
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

        {/* Films Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {films.map((film, index) => (
            <button
              key={film.title}
              onClick={() => handleFilmClick(film)}
              className="group relative aspect-[2/3] rounded-xl overflow-hidden fadeInUp block cursor-pointer text-left"
              style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              aria-label={`Voir les détails de ${film.title} (${film.year})`}
              title={`Voir les détails de ${film.title}`}
            >
              {/* Movie Poster */}
              <div className="absolute inset-0">
                <MoviePoster
                  imdbId={film.imdbId}
                  alt={`Affiche de ${film.title}`}
                  title={film.title}
                  year={film.year}
                />
              </div>

              {/* Film Number */}
              <div className="absolute top-3 left-3 z-10">
                <div className="text-4xl font-bold text-black/20">
                  {String(index + 1).padStart(2, "0")}
                </div>
              </div>

              {/* External Link Indicator */}
              <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ExternalLink className="w-4 h-4 text-cyan-300" />
              </div>

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-end p-4">
                <div className="transform transition-transform duration-500 group-hover:translate-y-0 translate-y-4">
                  <h3 className="text-lg font-bold text-white mb-1">
                    {film.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-cyan-400 font-medium text-sm">
                      {film.year}
                    </span>
                    <div className="flex items-center gap-1">
                      <Play className="w-3 h-3 text-cyan-400" />
                      <span className="text-xs text-gray-400">
                        {currentContent.production}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 border border-transparent group-hover:border-cyan-400/50 rounded-xl transition-all duration-500 group-hover:scale-105" />

              {/* Shimmer Effect on Hover */}
              <div className="absolute inset-0 overflow-hidden rounded-xl">
                <div className="absolute -inset-[100%] shimmer opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
              </div>

              {/* Water Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(34,211,238,0.3),transparent_70%)]" />
              </div>
            </button>
          ))}
        </div>

        {/* View More */}
        <div
          className="text-center mt-16 fadeInUp"
          style={{ animationDelay: "0.9s" }}
        >
          <button className="px-8 py-4 bg-cyan-500 text-white font-bold rounded-full hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 transform hover:scale-105 hover:bg-cyan-600">
            {currentContent.viewAll}
          </button>
        </div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        film={selectedFilm}
        currentContent={currentContent}
      />
    </section>
  );
}
