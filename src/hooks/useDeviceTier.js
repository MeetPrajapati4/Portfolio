import { useState, useEffect } from 'react';

/**
 * @typedef {'high' | 'medium' | 'low'} DeviceTier
 * 
 * @typedef {Object} DeviceTierInfo
 * @property {DeviceTier} tier - Current performance tier ('high', 'medium', 'low')
 * @property {boolean} isLowPower - True if device is low-power (tier === 'low')
 * @property {boolean} isMobile - True if device is mobile/touch-driven
 * @property {boolean} prefersReducedMotion - System reduced-motion preference active
 * @property {boolean} allowShaders - Whether GLSL shader backgrounds should be rendered
 * @property {boolean} allowParticles - Whether high-density 3D particle systems are allowed
 * @property {boolean} allowMagneticCursor - Whether magnetic cursor should be enabled
 * @property {boolean} allow3DTilt - Whether 3D card tilt is enabled
 * @property {number} particleCount - Recommended particle density for 3D scenes
 * @property {number} fps - Estimated current frame rate sample
 */

/**
 * useDeviceTier Hook
 * Centralized hardware and performance capability detection.
 * 
 * Evaluates:
 * 1. prefers-reduced-motion media query (hard override)
 * 2. Hardware concurrency (CPU core count)
 * 3. Device memory (if available via Navigator API)
 * 4. Pointer precision & viewport dimension (coarse pointer / mobile)
 * 5. Dynamic post-mount FPS monitor (downgrades tier if struggling below 35 FPS)
 * 
 * @returns {DeviceTierInfo}
 */
export function useDeviceTier() {
  const [deviceInfo, setDeviceInfo] = useState({
    tier: 'high',
    isLowPower: false,
    isMobile: false,
    prefersReducedMotion: false,
    allowShaders: true,
    allowParticles: true,
    allowMagneticCursor: true,
    allow3DTilt: true,
    particleCount: 120,
    fps: 60,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 1. Reduced Motion Query
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let prefersReducedMotion = motionQuery.matches;

    // 2. Pointer & Viewport Assessment
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const isSmallScreen = window.innerWidth < 768;
    const isMobile = isTouch || isSmallScreen;

    // 3. Hardware Concurrency & Memory
    const cores = typeof navigator !== 'undefined' ? navigator.hardwareConcurrency || 4 : 4;
    // @ts-ignore
    const memory = typeof navigator !== 'undefined' && 'deviceMemory' in navigator ? navigator.deviceMemory : 8;

    // Initial Tier Determination
    let tier = 'high';
    if (prefersReducedMotion || cores <= 2 || memory <= 2 || (isMobile && cores <= 4)) {
      tier = 'low';
    } else if (cores <= 4 || memory <= 4 || isMobile) {
      tier = 'medium';
    }

    const updateState = (currentTier, currentFps = 60) => {
      const isLowPower = currentTier === 'low';
      const allowShaders = !prefersReducedMotion && !isLowPower;
      const allowParticles = !prefersReducedMotion;
      const allowMagneticCursor = !prefersReducedMotion && !isMobile && !isLowPower;
      const allow3DTilt = !prefersReducedMotion && !isMobile;
      const particleCount = prefersReducedMotion ? 0 : isLowPower ? 20 : currentTier === 'medium' ? 60 : 140;

      setDeviceInfo({
        tier: currentTier,
        isLowPower,
        isMobile,
        prefersReducedMotion,
        allowShaders,
        allowParticles,
        allowMagneticCursor,
        allow3DTilt,
        particleCount,
        fps: Math.round(currentFps),
      });
    };

    updateState(tier, 60);

    // Reduced motion change listener
    const handleMotionChange = (e) => {
      prefersReducedMotion = e.matches;
      updateState(prefersReducedMotion ? 'low' : tier, 60);
    };
    motionQuery.addEventListener('change', handleMotionChange);

    // 4. Quick Post-Mount FPS Sample (30 frames test to ensure buttery smoothness)
    let frameCount = 0;
    let startTime = performance.now();
    let animId = null;

    const sampleFps = (now) => {
      frameCount++;
      if (frameCount >= 30) {
        const elapsed = now - startTime;
        const sampledFps = (frameCount / elapsed) * 1000;

        // If rendering is struggling (< 36 fps), downgrade one tier
        if (sampledFps < 36 && tier === 'high') {
          tier = 'medium';
          updateState('medium', sampledFps);
        } else if (sampledFps < 28 && tier !== 'low') {
          tier = 'low';
          updateState('low', sampledFps);
        }
      } else {
        animId = requestAnimationFrame(sampleFps);
      }
    };

    animId = requestAnimationFrame(sampleFps);

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return deviceInfo;
}

export default useDeviceTier;
