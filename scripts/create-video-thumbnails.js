const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const { promisify } = require("util");

const execAsync = promisify(exec);

// Configuration
const VIDEOS_DIR = path.join(__dirname, "../public/videos");
const THUMBNAIL_SUFFIX = "_thumb";

// Videos used in AboutSection component
const ABOUT_SECTION_VIDEOS = [
  "choregraphie_neorealite.mp4",
  "CiteMemoire_MTL.mp4",
  "CosmopolitanOfLasVegas_Opulence.mp4",
  "CosmopolitanOfLasVegas_Opulence_MakingOf.mp4",
  "Experiences_VR&Dome.mp4",
  "RedpathWaterfrontFestival_Toronto.mp4",
];

// FFmpeg settings for thumbnails
const THUMBNAIL_SETTINGS = {
  duration: 10, // 10 seconds for better loop experience
  width: 640, // 640px width
  height: 360, // 360px height (16:9 aspect ratio)
  crf: 28, // Higher CRF = lower quality, smaller file size
  preset: "fast", // Encoding speed
  fps: 24, // Standard FPS for smoother playback
  bitrate: "800k", // Slightly higher bitrate for longer duration
  fadeDuration: 0.5, // 0.5 second fade in/out for smoother loops
};

// Check if FFmpeg is available
async function checkFFmpeg() {
  try {
    const { stdout } = await execAsync("ffmpeg -version");
    console.log("✓ FFmpeg is available");
    return true;
  } catch (error) {
    console.error("❌ FFmpeg is not installed or not in PATH");
    console.error("Please install FFmpeg: sudo apt-get install ffmpeg");
    return false;
  }
}

// Get video duration using FFprobe
async function getVideoDuration(videoPath) {
  try {
    const { stdout } = await execAsync(
      `ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${videoPath}"`,
    );
    return parseFloat(stdout.trim());
  } catch (error) {
    console.error(`❌ Error getting duration for ${videoPath}:`, error.message);
    return null;
  }
}

// Create thumbnail version of a video
async function createThumbnail(videoName) {
  const inputPath = path.join(VIDEOS_DIR, videoName);
  const outputName = videoName.replace(".mp4", `${THUMBNAIL_SUFFIX}.mp4`);
  const outputPath = path.join(VIDEOS_DIR, outputName);

  // Check if input video exists
  if (!fs.existsSync(inputPath)) {
    console.log(`❌ Source video not found: ${videoName}`);
    return false;
  }

  // Delete existing thumbnail to force recreation
  if (fs.existsSync(outputPath)) {
    console.log(`🗑️  Deleting existing thumbnail: ${outputName}`);
    fs.unlinkSync(outputPath);
  }

  console.log(`🔄 Creating thumbnail for: ${videoName}`);

  try {
    // Get video duration to calculate start time
    const duration = await getVideoDuration(inputPath);
    let startTime = 0;

    if (duration && duration > 8) {
      // Start from 15% into the video for better content with longer duration
      startTime = duration * 0.15;
    }

    // FFmpeg command to create thumbnail with fade in/out for smoother loops
    const ffmpegCommand = [
      "ffmpeg",
      `-ss ${startTime.toFixed(2)}`, // Start time
      `-i "${inputPath}"`,
      `-t ${THUMBNAIL_SETTINGS.duration}`, // Duration
      `-vf "scale=${THUMBNAIL_SETTINGS.width}:${THUMBNAIL_SETTINGS.height}:force_original_aspect_ratio=decrease,pad=${THUMBNAIL_SETTINGS.width}:${THUMBNAIL_SETTINGS.height}:(ow-iw)/2:(oh-ih)/2,fade=t=in:st=0:d=${THUMBNAIL_SETTINGS.fadeDuration},fade=t=out:st=${(THUMBNAIL_SETTINGS.duration - THUMBNAIL_SETTINGS.fadeDuration).toFixed(2)}:d=${THUMBNAIL_SETTINGS.fadeDuration}"`, // Scale, pad, and add fade in/out
      `-c:v libx264`, // Video codec
      `-crf ${THUMBNAIL_SETTINGS.crf}`, // Quality
      `-preset ${THUMBNAIL_SETTINGS.preset}`, // Encoding speed
      `-r ${THUMBNAIL_SETTINGS.fps}`, // Frame rate
      `-b:v ${THUMBNAIL_SETTINGS.bitrate}`, // Bitrate
      `-an`, // No audio
      `-movflags +faststart`, // Optimize for web
      `-y`, // Overwrite output
      `"${outputPath}"`,
    ].join(" ");

    console.log(`   Running: ${ffmpegCommand.substring(0, 100)}...`);

    const { stdout, stderr } = await execAsync(ffmpegCommand, {
      maxBuffer: 1024 * 1024 * 10,
    });

    // Check if thumbnail was created successfully
    if (fs.existsSync(outputPath)) {
      const stats = fs.statSync(outputPath);
      const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);
      console.log(`✓ Created thumbnail: ${outputName} (${fileSizeMB} MB)`);
      return true;
    } else {
      console.error(`❌ Failed to create thumbnail: ${outputName}`);
      return false;
    }
  } catch (error) {
    console.error(
      `❌ Error creating thumbnail for ${videoName}:`,
      error.message,
    );
    return false;
  }
}

// Create thumbnails for all About section videos
async function createAllThumbnails() {
  console.log("🎬 Starting video thumbnail creation...");
  console.log(`📁 Videos directory: ${VIDEOS_DIR}`);
  console.log(
    `📊 Target settings: ${THUMBNAIL_SETTINGS.duration}s loop with ${THUMBNAIL_SETTINGS.fadeDuration}s fade, ${THUMBNAIL_SETTINGS.width}x${THUMBNAIL_SETTINGS.height}, ${THUMBNAIL_SETTINGS.bitrate}`,
  );
  console.log("---");

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
    const success = await createThumbnail(videoName);
    if (success) {
      successCount++;
    } else {
      failCount++;
    }
    console.log("---");
  }

  // Summary
  console.log("📊 Summary:");
  console.log(`✓ Successfully created: ${successCount} thumbnails`);
  if (failCount > 0) {
    console.log(`❌ Failed: ${failCount} thumbnails`);
  }

  // Update AboutSection component to use thumbnails
  if (successCount > 0) {
    console.log("\n💡 Next steps:");
    console.log(
      "1. Thumbnails are now 10 seconds with 0.5s fade for seamless loops",
    );
    console.log("2. Keep original videos for modal playback");
    console.log("3. Run this script again if you add new videos");
  }

  return successCount > 0;
}

// Run the script
if (require.main === module) {
  createAllThumbnails()
    .then((success) => {
      if (success) {
        console.log("\n✅ Thumbnail creation completed successfully!");
      } else {
        console.log("\n⚠️ Thumbnail creation completed with errors");
        process.exit(1);
      }
    })
    .catch((error) => {
      console.error("❌ Script failed:", error);
      process.exit(1);
    });
}

module.exports = { createAllThumbnails, ABOUT_SECTION_VIDEOS };
