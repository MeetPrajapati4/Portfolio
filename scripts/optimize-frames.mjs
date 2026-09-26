/**
 * @file optimize-frames.mjs
 * @description One-time Sharp-based image optimization CLI script for scroll-driven frame sequences.
 * 
 * Features:
 * - Converts raw PNG/JPEG/TIFF renders (from Blender, Cinema4D, After Effects, etc.) into high-efficiency WebP/AVIF frames.
 * - Scales frames to exact display dimensions (default 1920px width desktop, 960px width mobile).
 * - Generates both desktop and mobile optimized sets for responsive frame-scrubbing.
 * - Strips unneeded metadata and applies perceptual quality tuning to achieve <50KB per frame.
 * 
 * Usage:
 *   node scripts/optimize-frames.mjs [options]
 * 
 * Options:
 *   --input <dir>       Source directory of raw frame images (default: ./raw-frames)
 *   --output <dir>      Destination directory (default: ./public/frames)
 *   --width <px>        Desktop width (default: 1920)
 *   --height <px>       Desktop height (default: 1080)
 *   --quality <1-100>   WebP compression quality (default: 82)
 *   --generate-mobile   Also generate half-res mobile frames (default: true)
 *   --prefix <string>   Output filename prefix (default: frame_)
 */

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// Parse command line arguments
const args = process.argv.slice(2);
function getArg(key, defaultValue) {
  const index = args.indexOf(`--${key}`);
  if (index !== -1 && args[index + 1]) {
    return args[index + 1];
  }
  return defaultValue;
}
const hasFlag = (key) => args.includes(`--${key}`);

const INPUT_DIR = path.resolve(process.cwd(), getArg('input', './raw-frames'));
const OUTPUT_DIR = path.resolve(process.cwd(), getArg('output', './public/frames'));
const DESKTOP_WIDTH = parseInt(getArg('width', '1920'), 10);
const DESKTOP_HEIGHT = parseInt(getArg('height', '1080'), 10);
const QUALITY = parseInt(getArg('quality', '82'), 10);
const PREFIX = getArg('prefix', 'frame_');
const GENERATE_MOBILE = !hasFlag('no-mobile');

async function runOptimization() {
  console.log('====================================================');
  console.log('🎬 Scroll Frame Sequence Optimizer (Sharp)');
  console.log('====================================================');
  console.log(`📁 Input:       ${INPUT_DIR}`);
  console.log(`📁 Output:      ${OUTPUT_DIR}`);
  console.log(`📐 Dimensions:  ${DESKTOP_WIDTH}x${DESKTOP_HEIGHT} (Desktop)`);
  if (GENERATE_MOBILE) {
    console.log(`📱 Mobile set:  ${Math.round(DESKTOP_WIDTH / 2)}x${Math.round(DESKTOP_HEIGHT / 2)}`);
  }
  console.log(`⚡ Quality:     ${QUALITY}% WebP`);
  console.log('----------------------------------------------------');

  if (!fs.existsSync(INPUT_DIR)) {
    console.warn(`⚠️  Input directory "${INPUT_DIR}" does not exist.`);
    console.log(`👉 Please place your raw exported frames (e.g. frame001.png, frame002.png) in "${INPUT_DIR}"`);
    console.log(`   or pass --input <path_to_frames>`);
    return;
  }

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const validExtensions = new Set(['.png', '.jpg', '.jpeg', '.webp', '.tiff', '.bmp']);
  const files = fs.readdirSync(INPUT_DIR)
    .filter(file => validExtensions.has(path.extname(file).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

  if (files.length === 0) {
    console.warn(`⚠️  No image files found in "${INPUT_DIR}". Supported formats: PNG, JPG, WebP, TIFF.`);
    return;
  }

  console.log(`🔍 Found ${files.length} frames to optimize...`);

  let totalOriginalBytes = 0;
  let totalOptimizedBytes = 0;

  for (let i = 0; i < files.length; i++) {
    const filename = files[i];
    const inputPath = path.join(INPUT_DIR, filename);
    const frameIndex = (i + 1).toString().padStart(4, '0');
    const outputFilename = `${PREFIX}${frameIndex}.webp`;
    const outputPath = path.join(OUTPUT_DIR, outputFilename);

    const inputStat = fs.statSync(inputPath);
    totalOriginalBytes += inputStat.size;

    // Process Desktop Frame
    const imagePipeline = sharp(inputPath)
      .resize({
        width: DESKTOP_WIDTH,
        height: DESKTOP_HEIGHT,
        fit: 'contain',
        background: { r: 7, g: 11, b: 20, alpha: 1 }
      })
      .webp({
        quality: QUALITY,
        effort: 5,
        smartSubsample: true
      });

    await imagePipeline.toFile(outputPath);
    const outputStat = fs.statSync(outputPath);
    totalOptimizedBytes += outputStat.size;

    // Process Mobile Frame (Optional)
    if (GENERATE_MOBILE) {
      const mobileOutputFilename = `${PREFIX}mobile_${frameIndex}.webp`;
      const mobileOutputPath = path.join(OUTPUT_DIR, mobileOutputFilename);
      await sharp(inputPath)
        .resize({
          width: Math.round(DESKTOP_WIDTH / 2),
          height: Math.round(DESKTOP_HEIGHT / 2),
          fit: 'contain',
          background: { r: 7, g: 11, b: 20, alpha: 1 }
        })
        .webp({
          quality: Math.max(70, QUALITY - 8),
          effort: 5
        })
        .toFile(mobileOutputPath);
    }

    const savedPercent = ((1 - outputStat.size / inputStat.size) * 100).toFixed(1);
    console.log(
      `✓ [${i + 1}/${files.length}] ${filename} -> ${outputFilename} ` +
      `(${(outputStat.size / 1024).toFixed(1)} KB, saved ${savedPercent}%)`
    );
  }

  const overallSavings = ((1 - totalOptimizedBytes / totalOriginalBytes) * 100).toFixed(1);
  console.log('====================================================');
  console.log(`✨ Done! Processed ${files.length} frames.`);
  console.log(`📦 Original total:  ${(totalOriginalBytes / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`🚀 Optimized total: ${(totalOptimizedBytes / (1024 * 1024)).toFixed(2)} MB (${overallSavings}% size reduction)`);
  console.log(`⚡ Average frame:   ${(totalOptimizedBytes / files.length / 1024).toFixed(1)} KB`);
  console.log('====================================================');
}

runOptimization().catch((err) => {
  console.error('❌ Error optimizing frames:', err);
  process.exit(1);
});
