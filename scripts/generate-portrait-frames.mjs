import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const OUTPUT_DIR = path.resolve(process.cwd(), 'public/frames');
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Load the 4 primary portraits of Mit Chadotara
const imgSuitB64 = fs.readFileSync('public/profile/mit-portrait-suit.png').toString('base64');
const imgTurtleneckB64 = fs.readFileSync('public/profile/mit-portrait-turtleneck.png').toString('base64');
const imgSmileB64 = fs.readFileSync('public/profile/mit-portrait-smile.png').toString('base64');
const imgFormalB64 = fs.readFileSync('public/profile/mit-portrait-formal.png').toString('base64');

const TOTAL_FRAMES = 24;
const WIDTH = 1280;
const HEIGHT = 720;

console.log(`🎬 Generating ${TOTAL_FRAMES} scroll-scrub frames from Mit's portraits...`);

/**
 * Calculates weights and camera scale across the 4 key stages:
 * Stage 1: Suit (side gaze) -> Stage 2: Turtleneck (focus) -> Stage 3: Smile (collaborative) -> Stage 4: Formal (executive)
 */
function getStageWeights(t) {
  // t from 0 to 1
  // Stage 1: 0.00 to 0.28
  // Transition 1->2: 0.28 to 0.40
  // Stage 2: 0.40 to 0.58
  // Transition 2->3: 0.58 to 0.70
  // Stage 3: 0.70 to 0.85
  // Transition 3->4: 0.85 to 1.00

  let w1 = 0, w2 = 0, w3 = 0, w4 = 0;

  if (t < 0.25) {
    w1 = 1;
  } else if (t < 0.42) {
    const f = (t - 0.25) / 0.17;
    // Smooth cosine interpolation
    const ease = (1 - Math.cos(f * Math.PI)) / 2;
    w1 = 1 - ease;
    w2 = ease;
  } else if (t < 0.60) {
    w2 = 1;
  } else if (t < 0.75) {
    const f = (t - 0.60) / 0.15;
    const ease = (1 - Math.cos(f * Math.PI)) / 2;
    w2 = 1 - ease;
    w3 = ease;
  } else if (t < 0.85) {
    w3 = 1;
  } else {
    const f = (t - 0.85) / 0.15;
    const ease = (1 - Math.cos(f * Math.PI)) / 2;
    w3 = 1 - ease;
    w4 = ease;
  }

  return { w1, w2, w3, w4 };
}

async function renderFrames() {
  for (let i = 1; i <= TOTAL_FRAMES; i++) {
    const progress = (i - 1) / (TOTAL_FRAMES - 1);
    const { w1, w2, w3, w4 } = getStageWeights(progress);

    // Subtle 3D camera push (scale increases gently with progress)
    const cameraScale = 0.94 + 0.12 * Math.sin(progress * Math.PI * 0.5);
    const panX = Math.sin(progress * Math.PI * 2) * 15;

    // Portrait card dimensions (centered with slight offset for text space)
    const cardW = 440 * cameraScale;
    const cardH = 580 * cameraScale;
    const cardX = (WIDTH / 2) - (cardW / 2) + panX;
    const cardY = (HEIGHT / 2) - (cardH / 2) - 10;

    // Dynamic background lighting color shifting between Cyber Cyan and Royal Purple
    const glowHue = 230 + progress * 50; // Deep Indigo -> Neon Cyan
    const glowIntensity = 0.35 + 0.15 * Math.sin(progress * Math.PI);

    // Floating micro-particles
    let particlesSvg = '';
    for (let p = 0; p < 18; p++) {
      const px = ((p * 73 + i * 29) % WIDTH);
      const py = ((p * 47 + i * 19) % HEIGHT);
      const pr = 1.5 + (p % 3);
      const op = 0.2 + 0.4 * Math.sin(p + progress * 4);
      const color = p % 2 === 0 ? '#00f2ff' : '#ba9eff';
      particlesSvg += `<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="${pr}" fill="${color}" opacity="${op.toFixed(2)}" filter="url(#softGlow)" />`;
    }

    // High tech HUD telemetry text
    let stageLabel = 'ARCHITECTING_DIGITAL_SYSTEMS';
    if (w2 > 0.5) stageLabel = 'ENGINEERING_FULLSTACK_AND_AI';
    else if (w3 > 0.5) stageLabel = 'COLLABORATIVE_LEADERSHIP';
    else if (w4 > 0.5) stageLabel = 'PRODUCTION_SCALE_EXCELLENCE';

    const frameNum = i.toString().padStart(4, '0');
    const displayIndex = i.toString().padStart(2, '0');

    const svg = `
    <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <!-- Background radial spotlight -->
        <radialGradient id="centerGlow" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stop-color="hsl(${glowHue}, 85%, 35%)" stop-opacity="${glowIntensity.toFixed(2)}" />
          <stop offset="45%" stop-color="hsl(${glowHue - 30}, 80%, 15%)" stop-opacity="0.25" />
          <stop offset="100%" stop-color="#07090e" stop-opacity="0" />
        </radialGradient>

        <!-- Rounded portrait mask with soft vignette edges -->
        <mask id="portraitMask">
          <rect x="0" y="0" width="${WIDTH}" height="${HEIGHT}" fill="black" />
          <rect x="${cardX.toFixed(1)}" y="${cardY.toFixed(1)}" width="${cardW.toFixed(1)}" height="${cardH.toFixed(1)}" rx="32" ry="32" fill="white" />
        </mask>

        <!-- Linear gradient for tech frame border -->
        <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ba9eff" stop-opacity="0.8" />
          <stop offset="50%" stop-color="#00f2ff" stop-opacity="0.9" />
          <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.4" />
        </linearGradient>

        <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        <filter id="auraGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="25" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <!-- Deep space canvas background -->
      <rect width="100%" height="100%" fill="#07090e" />

      <!-- Backlight ambient glow aura -->
      <circle cx="${(cardX + cardW / 2).toFixed(1)}" cy="${(cardY + cardH / 2).toFixed(1)}" r="${(cardW * 0.8).toFixed(1)}" fill="url(#centerGlow)" filter="url(#auraGlow)" />

      <!-- Cyber grid ambient pattern -->
      <g opacity="0.06" stroke="#ffffff" stroke-width="1">
        <line x1="0" y1="${HEIGHT * 0.25}" x2="${WIDTH}" y2="${HEIGHT * 0.25}" />
        <line x1="0" y1="${HEIGHT * 0.5}" x2="${WIDTH}" y2="${HEIGHT * 0.5}" />
        <line x1="0" y1="${HEIGHT * 0.75}" x2="${WIDTH}" y2="${HEIGHT * 0.75}" />
        <line x1="${WIDTH * 0.25}" y1="0" x2="${WIDTH * 0.25}" y2="${HEIGHT}" />
        <line x1="${WIDTH * 0.5}" y1="0" x2="${WIDTH * 0.5}" y2="${HEIGHT}" />
        <line x1="${WIDTH * 0.75}" y1="0" x2="${WIDTH * 0.75}" y2="${HEIGHT}" />
      </g>

      <!-- Floating particle system -->
      ${particlesSvg}

      <!-- Ambient volumetric ring behind portrait -->
      <ellipse cx="${(cardX + cardW / 2).toFixed(1)}" cy="${(cardY + cardH * 0.95).toFixed(1)}" rx="${(cardW * 0.65).toFixed(1)}" ry="24" fill="none" stroke="url(#borderGrad)" stroke-width="2" opacity="0.45" filter="url(#softGlow)" />

      <!-- Portrait Images Stack with Dynamic Blending (Masked into rounded card) -->
      <g mask="url(#portraitMask)">
        <!-- 1. Suit Portrait -->
        ${w1 > 0.001 ? `
          <image
            xlink:href="data:image/png;base64,${imgSuitB64}"
            x="${cardX.toFixed(1)}"
            y="${cardY.toFixed(1)}"
            width="${cardW.toFixed(1)}"
            height="${cardH.toFixed(1)}"
            opacity="${w1.toFixed(3)}"
            preserveAspectRatio="xMidYMid slice"
          />
        ` : ''}

        <!-- 2. Turtleneck Portrait -->
        ${w2 > 0.001 ? `
          <image
            xlink:href="data:image/png;base64,${imgTurtleneckB64}"
            x="${cardX.toFixed(1)}"
            y="${cardY.toFixed(1)}"
            width="${cardW.toFixed(1)}"
            height="${cardH.toFixed(1)}"
            opacity="${w2.toFixed(3)}"
            preserveAspectRatio="xMidYMid slice"
          />
        ` : ''}

        <!-- 3. Smile Portrait -->
        ${w3 > 0.001 ? `
          <image
            xlink:href="data:image/png;base64,${imgSmileB64}"
            x="${cardX.toFixed(1)}"
            y="${cardY.toFixed(1)}"
            width="${cardW.toFixed(1)}"
            height="${cardH.toFixed(1)}"
            opacity="${w3.toFixed(3)}"
            preserveAspectRatio="xMidYMid slice"
          />
        ` : ''}

        <!-- 4. Formal Portrait -->
        ${w4 > 0.001 ? `
          <image
            xlink:href="data:image/png;base64,${imgFormalB64}"
            x="${cardX.toFixed(1)}"
            y="${cardY.toFixed(1)}"
            width="${cardW.toFixed(1)}"
            height="${cardH.toFixed(1)}"
            opacity="${w4.toFixed(3)}"
            preserveAspectRatio="xMidYMid slice"
          />
        ` : ''}

        <!-- Cinematic vignette inside card -->
        <rect
          x="${cardX.toFixed(1)}"
          y="${cardY.toFixed(1)}"
          width="${cardW.toFixed(1)}"
          height="${cardH.toFixed(1)}"
          fill="url(#cardVignette)"
          style="mix-blend-mode: multiply;"
        />
      </g>

      <!-- Glassmorphic Cyber Border Around Portrait -->
      <rect
        x="${cardX.toFixed(1)}"
        y="${cardY.toFixed(1)}"
        width="${cardW.toFixed(1)}"
        height="${cardH.toFixed(1)}"
        rx="32"
        ry="32"
        fill="none"
        stroke="url(#borderGrad)"
        stroke-width="2"
        opacity="0.85"
        filter="url(#softGlow)"
      />

      <!-- Corner HUD Accents -->
      <g stroke="#00f2ff" stroke-width="2.5" fill="none" opacity="0.9">
        <path d="M ${(cardX - 8).toFixed(1)} ${(cardY + 24).toFixed(1)} L ${(cardX - 8).toFixed(1)} ${(cardY - 8).toFixed(1)} L ${(cardX + 24).toFixed(1)} ${(cardY - 8).toFixed(1)}" />
        <path d="M ${(cardX + cardW + 8).toFixed(1)} ${(cardY + 24).toFixed(1)} L ${(cardX + cardW + 8).toFixed(1)} ${(cardY - 8).toFixed(1)} L ${(cardX + cardW - 24).toFixed(1)} ${(cardY - 8).toFixed(1)}" />
        <path d="M ${(cardX - 8).toFixed(1)} ${(cardY + cardH - 24).toFixed(1)} L ${(cardX - 8).toFixed(1)} ${(cardY + cardH + 8).toFixed(1)} L ${(cardX + 24).toFixed(1)} ${(cardY + cardH + 8).toFixed(1)}" />
        <path d="M ${(cardX + cardW + 8).toFixed(1)} ${(cardY + cardH - 24).toFixed(1)} L ${(cardX + cardW + 8).toFixed(1)} ${(cardY + cardH + 8).toFixed(1)} L ${(cardX + cardW - 24).toFixed(1)} ${(cardY + cardH + 8).toFixed(1)}" />
      </g>

      <!-- Lower HUD Status Telemetry -->
      <g font-family="monospace" font-size="11" letter-spacing="2">
        <text x="50" y="${HEIGHT - 35}" fill="#64748b">PORTFOLIO_CORE // FRAME: ${displayIndex}/${TOTAL_FRAMES}</text>
        <text x="50" y="${HEIGHT - 18}" fill="#00f2ff" font-weight="bold">STAGE: ${stageLabel}</text>
        <text x="${WIDTH - 280}" y="${HEIGHT - 25}" fill="#94a3b8" letter-spacing="3">MEET_PRAJAPATI.AI [READY]</text>
      </g>
    </svg>
    `;

    const outputPath = path.join(OUTPUT_DIR, `frame_${frameNum}.webp`);

    await sharp(Buffer.from(svg))
      .webp({ quality: 86, effort: 4 })
      .toFile(outputPath);

    // Also generate half-res mobile frame
    const mobileOutputPath = path.join(OUTPUT_DIR, `frame_mobile_${frameNum}.webp`);
    await sharp(Buffer.from(svg))
      .resize(640, 360)
      .webp({ quality: 78, effort: 4 })
      .toFile(mobileOutputPath);

    console.log(`✓ Generated frame_${frameNum}.webp [w1:${w1.toFixed(2)}, w2:${w2.toFixed(2)}, w3:${w3.toFixed(2)}, w4:${w4.toFixed(2)}]`);
  }

  console.log('✨ All 24 portrait frames successfully generated in /public/frames/!');
}

renderFrames().catch(console.error);
