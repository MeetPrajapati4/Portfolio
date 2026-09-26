import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const OUTPUT_DIR = path.resolve(process.cwd(), 'public/frames');
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const TOTAL_FRAMES = 24;
const WIDTH = 1280;
const HEIGHT = 720;

console.log(`Generating ${TOTAL_FRAMES} demo 3D frames in ${OUTPUT_DIR}...`);

async function generateFrames() {
  for (let i = 1; i <= TOTAL_FRAMES; i++) {
    const progress = (i - 1) / (TOTAL_FRAMES - 1);
    const angle = progress * Math.PI * 2;
    const rotX = Math.sin(angle) * 0.45;
    const rotY = progress * Math.PI * 2;
    const scale = 0.85 + Math.sin(progress * Math.PI) * 0.25;

    // Generate procedural 3D svg with rotating rings, polyhedron, and particle glow
    const cx = WIDTH / 2;
    const cy = HEIGHT / 2;
    const r = 240 * scale;

    // Generate orbiting ring points with 3D projection
    const ringSegments = 32;
    const rings = [0, Math.PI / 3, (2 * Math.PI) / 3].map((ringTilt, rIdx) => {
      let d = '';
      for (let s = 0; s <= ringSegments; s++) {
        const theta = (s / ringSegments) * Math.PI * 2;
        // 3D coordinates on tilted ring
        let x = r * Math.cos(theta);
        let y = r * Math.sin(theta) * Math.cos(ringTilt);
        let z = r * Math.sin(theta) * Math.sin(ringTilt);

        // Rotate by rotY
        const rx = x * Math.cos(rotY + rIdx) - z * Math.sin(rotY + rIdx);
        const rz = x * Math.sin(rotY + rIdx) + z * Math.cos(rotY + rIdx);

        // Perspective projection
        const fov = 800;
        const pz = fov / (fov + rz + 100);
        const px = cx + rx * pz;
        const py = cy + (y * Math.cos(rotX) - rz * Math.sin(rotX)) * pz;

        d += (s === 0 ? `M ${px.toFixed(1)} ${py.toFixed(1)} ` : `L ${px.toFixed(1)} ${py.toFixed(1)} `);
      }
      return d;
    });

    // Outer orbiting particles
    let particlesSvg = '';
    const numParticles = 28;
    for (let p = 0; p < numParticles; p++) {
      const pAngle = (p / numParticles) * Math.PI * 2 + rotY * 1.5;
      const pDist = r * (1.1 + 0.3 * Math.sin(p * 2 + angle * 3));
      const px = cx + Math.cos(pAngle) * pDist;
      const py = cy + Math.sin(pAngle) * pDist * 0.55 * Math.cos(rotX);
      const pr = 2 + (p % 4) * 1.5;
      const pOpacity = 0.3 + 0.6 * Math.sin(p * 1.7 + angle * 2);
      const pColor = p % 2 === 0 ? '#00f2ff' : '#ba9eff';
      particlesSvg += `<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="${pr}" fill="${pColor}" opacity="${pOpacity.toFixed(2)}" filter="url(#glow)" />`;
    }

    // Central geometric diamond / core coordinates
    const coreSize = 75 * scale;
    const corePoints = [
      [0, -coreSize * 1.4, 0],
      [coreSize, 0, 0],
      [0, 0, coreSize],
      [-coreSize, 0, 0],
      [0, 0, -coreSize],
      [0, coreSize * 1.4, 0]
    ].map(([x, y, z]) => {
      const rx = x * Math.cos(rotY * 2) - z * Math.sin(rotY * 2);
      const rz = x * Math.sin(rotY * 2) + z * Math.cos(rotY * 2);
      const fov = 700;
      const pz = fov / (fov + rz);
      return [cx + rx * pz, cy + y * pz];
    });

    const coreEdges = [
      [0, 1], [0, 2], [0, 3], [0, 4],
      [5, 1], [5, 2], [5, 3], [5, 4],
      [1, 2], [2, 3], [3, 4], [4, 1]
    ].map(([a, b]) => `M ${corePoints[a][0].toFixed(1)} ${corePoints[a][1].toFixed(1)} L ${corePoints[b][0].toFixed(1)} ${corePoints[b][1].toFixed(1)}`).join(' ');

    const hue1 = 260 + Math.sin(angle) * 30; // Violet to indigo
    const hue2 = 185 + Math.cos(angle) * 20; // Cyan to aqua

    const svg = `
    <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bgGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="hsl(${hue1}, 80%, 25%)" stop-opacity="0.35" />
          <stop offset="60%" stop-color="hsl(${hue2}, 90%, 15%)" stop-opacity="0.12" />
          <stop offset="100%" stop-color="#070b14" stop-opacity="0" />
        </radialGradient>
        <linearGradient id="ringGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#00f2ff" />
          <stop offset="100%" stop-color="#ba9eff" />
        </linearGradient>
        <linearGradient id="ringGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#ba9eff" />
          <stop offset="100%" stop-color="#38bdf8" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="heavyGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="15" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <!-- Deep space backdrop -->
      <rect width="100%" height="100%" fill="#07090e" />

      <!-- Center ambient volumetric sphere -->
      <circle cx="${cx}" cy="${cy}" r="${r * 1.5}" fill="url(#bgGlow)" />

      <!-- Orbiting Rings -->
      <path d="${rings[0]}" stroke="url(#ringGrad1)" stroke-width="2.5" fill="none" opacity="0.85" filter="url(#glow)" />
      <path d="${rings[1]}" stroke="url(#ringGrad2)" stroke-width="2.2" fill="none" opacity="0.75" filter="url(#glow)" />
      <path d="${rings[2]}" stroke="#6366f1" stroke-width="1.8" fill="none" opacity="0.6" stroke-dasharray="8 6" />

      <!-- Dynamic Particles -->
      ${particlesSvg}

      <!-- Center AI Quantum Core -->
      <circle cx="${cx}" cy="${cy}" r="${coreSize * 0.4}" fill="#00f2ff" opacity="0.8" filter="url(#heavyGlow)" />
      <path d="${coreEdges}" stroke="#ffffff" stroke-width="2.2" fill="none" opacity="0.9" filter="url(#glow)" />

      <!-- Frame HUD Overlay subtle tech telemetry -->
      <text x="60" y="${HEIGHT - 45}" fill="#475569" font-family="monospace" font-size="12" letter-spacing="3">RENDER_SEQ_00${i.toString().padStart(2, '0')} // FPS:60 // 3D_ROT_ANG: ${(progress * 360).toFixed(0)}°</text>
      <text x="${WIDTH - 240}" y="${HEIGHT - 45}" fill="#475569" font-family="monospace" font-size="12" letter-spacing="2">NEURAL_CORE_v2.4 [ACTIVE]</text>
    </svg>
    `;

    const frameNum = i.toString().padStart(4, '0');
    const outputPath = path.join(OUTPUT_DIR, `frame_${frameNum}.webp`);

    await sharp(Buffer.from(svg))
      .webp({ quality: 88, effort: 4 })
      .toFile(outputPath);
  }
  console.log('✅ Successfully generated 24 frames in /public/frames/!');
}

generateFrames().catch(console.error);
