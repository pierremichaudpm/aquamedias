const fs = require('fs');
const path = require('path');

// Vérifier si la vidéo optimisée existe
const videosDir = path.join(__dirname, '../public/videos');
const optimizedVideo = path.join(videosDir, 'hero_optimized.mp4');
const heroVideo = path.join(videosDir, 'hero.mp4');

console.log('Vérification des fichiers vidéo...');

if (fs.existsSync(optimizedVideo)) {
  console.log(`✓ Vidéo optimisée trouvée: ${optimizedVideo}`);
  
  // Copier la vidéo optimisée vers hero.mp4
  if (!fs.existsSync(heroVideo)) {
    fs.copyFileSync(optimizedVideo, heroVideo);
    console.log(`✓ Copie de ${optimizedVideo} vers ${heroVideo}`);
  } else {
    console.log(`✓ ${heroVideo} existe déjà`);
  }
} else {
  console.log(`⚠ ${optimizedVideo} non trouvée`);
  
  // Vérifier si la vidéo originale existe
  const originalVideo = path.join(videosDir, 'Choregraphie_Neorealite.mp4');
  if (fs.existsSync(originalVideo)) {
    console.log(`✓ Vidéo originale trouvée: ${originalVideo}`);
    
    if (!fs.existsSync(heroVideo)) {
      fs.copyFileSync(originalVideo, heroVideo);
      console.log(`✓ Copie de ${originalVideo} vers ${heroVideo}`);
    }
  } else {
    console.log(`❌ Aucune vidéo trouvée dans ${videosDir}`);
  }
}

console.log('Vérification terminée.');










