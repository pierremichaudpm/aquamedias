#!/bin/bash
# Script optimisé pour Netlify Build

echo "🚀 Début du build optimisé..."

# Install dependencies with cache
if [ -d "node_modules" ]; then
  echo "📦 Utilisation du cache des dépendances..."
else
  echo "📦 Installation des dépendances..."
  npm ci --legacy-peer-deps --prefer-offline
fi

# Run prebuild script (video optimization)
echo "🎥 Optimisation des vidéos..."
node scripts/optimize-video.js

# Build Next.js with cache
echo "🏗️  Construction de Next.js..."
npm run build

echo "✅ Build terminé avec succès !"
