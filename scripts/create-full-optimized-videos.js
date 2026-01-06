const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

// Configuration
const VIDEOS_DIR = path.join(__dirname, '../public/videos');
const OPTIMIZED_SUFFIX = '_optimized';

// Videos used in AboutSection component
const ABOUT_SECTION_VIDEOS = [
  'choregraphie_neorealite.mp4',
  'CiteMemoire_MTL.mp4',
  'CosmopolitanOfLasVegas_Opulence.mp4',
  'CosmopolitanOfLasVegas_Opulence_MakingOf.mp4',
  'Experiences_VR&Dome.mp4',
  'RedpathWaterfrontFestival_Toronto.mp4'
];

// FFmpeg settings for optimized full-length videos
const OPTIMIZATION_SETTINGS = {
  width: 854, // 480p width (16:9)
  height: 480, // 480p height
  crf: 28, // Quality setting (23-28 is good for web)
  preset: 'fast', // Encoding speed
  fps: 24, // Standard cinematic FPS
  bitrate: '800k', // Target bitrate for good quality
  fadeDuration: 1.0, // 1 second fade in/out for seamless loops
  maxDuration: 30 // Maximum duration in seconds (optimize long videos)
};

// Check if FFmpeg is available
async function checkFFmpeg() {
  try {
    const { stdout } = await execAsync('ffmpeg -version');
    console.log('✓ FFmpeg is available');
    return true;
  } catch (error) {
    console.error('❌ FFmpeg is not installed or not in PATH');
    console.error('Please install FFmpeg: sudo apt-get install ffmpeg');
    return false;
  }
}

// Get video duration using FFprobe
async function getVideoDuration(videoPath) {
  try {
    const { stdout } = await execAsync(
      `ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${videoPath}"`
    );
    return parseFloat(stdout.trim());
  } catch (error) {
    console.error(`❌ Error getting duration for ${videoPath}:`, error.message);
    return null;
  }
}

// Create optimized full-length version of a video with fade loops
async function createOptimizedVideo(videoName) {
  const inputPath = path.join(VIDEOS_DIR, videoName);
  const outputName = videoName.replace('.mp4', `${OPTIMIZED_SUFFIX}.mp4`);
  const outputPath = path.join(VIDEOS_DIR, outputName);

  // Check if input video exists
  if (!fs.existsSync(inputPath)) {
    console.log(`❌ Source video not found: ${videoName}`);
    return false;
  }

  // Check if optimized video already exists
  if (fs.existsSync(outputPath)) {
    console.log(`🗑️  Deleting existing optimized video: ${outputName}`);
    fs.unlinkSync(outputPath);
  }

  console.log(`🔄 Creating optimized full-length video for: ${videoName}`);

  try {
    // Get video duration
    const duration = await getVideoDuration(inputPath);
    if (!duration) {
      console.log(`❌ Could not get duration for ${videoName}`);
      return false;
    }

    console.log(`   Original duration: ${duration.toFixed(1)} seconds`);

    // Determine actual duration to use (respect maxDuration)
    const actualDuration = Math.min(duration, OPTIMIZATION_SETTINGS.maxDuration);
    const startTime = 0; // Start from beginning

    // Calculate fade parameters
    const fadeInStart = 0;
    const fadeInDuration = OPTIMIZATION_SETTINGS.fadeDuration;
    const fadeOutStart = actualDuration - OPTIMIZATION_SETTINGS.fadeDuration;
    const fadeOutDuration = OPTIMIZATION_SETTINGS.fadeDuration;

    // FFmpeg command to create optimized full-length video with fade loops
    const ffmpegCommand = [
      'ffmpeg',
      `-ss ${startTime.toFixed(2)}`, // Start time
      `-i "${inputPath}"`,
      `-t ${actualDuration.toFixed(2)}`, // Duration (up to maxDuration)
      `-vf "scale=${OPTIMIZATION_SETTINGS.width}:${OPTIMIZATION_SETTINGS.height}:force_original_aspect_ratio=decrease,pad=${OPTIMIZATION_SETTINGS.width}:${OPTIMIZATION_SETTINGS.height}:(ow-iw)/2:(oh-ih)/2,fade=t=in:st=${fadeInStart}:d=${fadeInDuration},fade=t=out:st=${fadeOutStart}:d=${fadeOutDuration}"`, // Scale, pad, and add fade in/out
      `-c:v libx264`, // Video codec
      `-crf ${OPTIMIZATION_SETTINGS.crf}`, // Quality
      `-preset ${OPTIMIZATION_SETTINGS.preset}`, // Encoding speed
      `-r ${OPTIMIZATION_SETTINGS.fps}`, // Frame rate
      `-b:v ${OPTIMIZATION_SETTINGS.bitrate}`, // Bitrate
      `-an`, // No audio (for autoplay thumbnails)
      `-movflags +faststart`, // Optimize for web streaming
      `-pix_fmt yuv420p`, // Ensure compatibility
      `-y`, // Overwrite output
      `"${outputPath}"`
    ].join(' ');

    console.log(`   Running FFmpeg command...`);
    console.log(`   Target: ${actualDuration.toFixed(1)}s, ${OPTIMIZATION_SETTINGS.width}x${OPTIMIZATION_SETTINGS.height}, ${OPTIMIZATION_SETTINGS.bitrate}`);

    const { stdout, stderr } = await execAsync(ffmpegCommand, { maxBuffer: 1024 * 1024 * 10 });

    // Check if optimized video was created successfully
    if (fs.existsSync(outputPath)) {
      const stats = fs.statSync(outputPath);
      const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);
      console.log(`✓ Created optimized video: ${outputName} (${fileSizeMB} MB, ${actualDuration.toFixed(1)}s)`);
      return true;
    } else {
      console.error(`❌ Failed to create optimized video: ${outputName}`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Error creating optimized video for ${videoName}:`, error.message);
    return false;
  }
}

// Create optimized versions for all About section videos
async function createAllOptimizedVideos() {
  console.log('🎬 Starting optimized full-length video creation...');
  console.log(`📁 Videos directory: ${VIDEOS_DIR}`);
  console.log(`📊 Optimization settings:`);
  console.log(`   Resolution: ${OPTIMIZATION_SETTINGS.width}x${OPTIMIZATION_SETTINGS.height}`);
  console.log(`   Max duration: ${OPTIMIZATION_SETTINGS.maxDuration}s`);
  console.log(`   Fade duration: ${OPTIMIZATION_SETTINGS.fadeDuration}s`);
  console.log(`   Bitrate: ${OPTIMIZATION_SETTINGS.bitrate}`);
  console.log(`   FPS: ${OPTIMIZATION_SETTINGS.fps}`);
  console.log('---');

  // Check FFmpeg
  const ffmpegAvailable = await checkFFmpeg();
  if (!ffmpegAvailable) {
    process.exit(1);
  }

  // Check videos directory
  if (!fs.existsSync(VIDEOS_DIR)) {
    console.error(`❌ Videos directory not found: ${VIDEOS_DIR}`);
    process.exit(1);
  }

  // Process each video
  let successCount = 0;
  let failCount = 0;

  for (const videoName of ABOUT_SECTION_VIDEOS) {
    const success = await createOptimizedVideo(videoName);
    if (success) {
      successCount++;
    } else {
      failCount++;
    }
    console.log('---');
  }

  // Summary
  console.log('📊 Summary:');
  console.log(`✓ Successfully created: ${successCount} optimized videos`);
  if (failCount > 0) {
    console.log(`❌ Failed: ${failCount} videos`);
  }

  // Next steps
  if (successCount > 0) {
    console.log('\n💡 Next steps:');
    console.log('1. Update AboutSection.jsx to use _optimized videos for autoplay');
    console.log('2. Keep original videos for modal playback');
    console.log('3. Videos have 1-second fade in/out for seamless loops');
    console.log('4. Maximum 30 seconds duration for performance');
  }

  return successCount > 0;
}

// Run the script
if (require.main === module) {
  createAllOptimizedVideos()
    .then(success => {
      if (success) {
        console.log('\n✅ Optimized video creation completed successfully!');
      } else {
        console.log('\n⚠️ Optimized video creation completed with errors');
        process.exit(1);
      }
    })
    .catch(error => {
      console.error('❌ Script failed:', error);
      process.exit(1);
    });
}

module.exports = { createAllOptimizedVideos, ABOUT_SECTION_VIDEOS };
