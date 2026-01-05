'use client';

import { Play, ExternalLink } from 'lucide-react';
import { useState, useEffect } from 'react';

// Composant d'image avec OMDb API et proxy CORS
const MoviePoster = ({ imdbId, alt, title, year }) => {
  const [error, setError] = useState(false);
  const [posterUrl, setPosterUrl] = useState('');
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
        const omdbResponse = await fetch(`https://www.omdbapi.com/?i=${imdbId}&apikey=c28ab8e1`);
        const omdbData = await omdbResponse.json();
        
        if (omdbData.Poster && omdbData.Poster !== 'N/A') {
          // 2. Utiliser un proxy CORS pour l'image Amazon
          const proxyUrl = corsProxy(omdbData.Poster);
          
          // 3. Tester si le proxy fonctionne
          const testResponse = await fetch(proxyUrl, { method: 'HEAD' });
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
        console.error('Erreur chargement affiche:', err);
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
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>
    );
  }
  
  return (
    <>
      <img 
        src={posterUrl} 
        alt={alt}
        className="w-full h-full object-cover"
        loading="lazy"
        onError={() => setError(true)}
      />
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
    </>
  );
};

const films = [
  { 
    title: 'X-Men: Dark Phoenix', 
    year: 2019,
    imdb: 'https://www.imdb.com/title/tt6565702/',
    imdbId: 'tt6565702'
  },
  { 
    title: 'At First Light', 
    year: 2018,
    imdb: 'https://www.imdb.com/title/tt6214928/',
    imdbId: 'tt6214928'
  },
  { 
    title: 'The Glass Castle', 
    year: 2017,
    imdb: 'https://www.imdb.com/title/tt2378507/',
    imdbId: 'tt2378507'
  },
  { 
    title: 'X-Men: Apocalypse', 
    year: 2016,
    imdb: 'https://www.imdb.com/title/tt3385516/',
    imdbId: 'tt3385516'
  },
  { 
    title: 'X-Men: Days of Future Past', 
    year: 2014,
    imdb: 'https://www.imdb.com/title/tt1877832/',
    imdbId: 'tt1877832'
  },
  { 
    title: 'The Fountain', 
    year: 2006,
    imdb: 'https://www.imdb.com/title/tt0414993/',
    imdbId: 'tt0414993'
  },
  { 
    title: 'The Day After Tomorrow', 
    year: 2004,
    imdb: 'https://www.imdb.com/title/tt0319262/',
    imdbId: 'tt0319262'
  },
  { 
    title: 'Gothika', 
    year: 2003,
    imdb: 'https://www.imdb.com/title/tt0348836/',
    imdbId: 'tt0348836'
  },
  { 
    title: 'The Covenant', 
    year: 2006,
    imdb: 'https://www.imdb.com/title/tt0475944/',
    imdbId: 'tt0475944'
  },
  { 
    title: 'Timeline', 
    year: 2003,
    imdb: 'https://www.imdb.com/title/tt0300556/',
    imdbId: 'tt0300556'
  },
];

export default function FilmsSection() {
  return (
    <section id="films" className="section-padding bg-gradient-to-b from-black to-cyan-950">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 fadeInUp text-cyan-400">
            PROJETS ICONIQUES
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto fadeInUp" style={{ animationDelay: '0.2s' }}>
            Découvrez quelques-uns des projets marquants où notre expertise aquatique a fait la différence
          </p>
        </div>

        {/* Films Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {films.map((film, index) => (
            <a
              key={film.title}
              href={film.imdb}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-[2/3] rounded-xl overflow-hidden fadeInUp block cursor-pointer"
              style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              aria-label={`Voir ${film.title} (${film.year}) sur IMDb - Nouvelle fenêtre`}
              title={`Voir ${film.title} sur IMDb`}
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
                  {String(index + 1).padStart(2, '0')}
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
                        Production Aquatique
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
            </a>
          ))}
        </div>

        {/* View More */}
        <div className="text-center mt-16 fadeInUp" style={{ animationDelay: '0.9s' }}>
          <button className="px-8 py-4 bg-cyan-500 text-white font-bold rounded-full hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 transform hover:scale-105 hover:bg-cyan-600">
            Voir tous les projets
          </button>
        </div>
      </div>
    </section>
  );
}
