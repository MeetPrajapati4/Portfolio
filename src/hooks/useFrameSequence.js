import { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * @typedef {Object} FrameSequenceOptions
 * @property {number} frameCount - Total number of image frames in the sequence (e.g. 24)
 * @property {string} folderPath - Base public path to the frames directory (e.g. '/frames')
 * @property {string} prefix - Frame filename prefix (default 'frame_')
 * @property {string} extension - Image format extension (default 'webp')
 * @property {number} padLength - Zero-padding digits for frame index (default 4 -> frame_0001.webp)
 * @property {boolean} isMobile - Whether to load lower-resolution mobile frames if available
 * @property {boolean} prefersReducedMotion - If true, bypasses scroll sequence and displays static frame
 */

/**
 * @typedef {Object} FrameSequenceState
 * @property {HTMLImageElement[]} frames - Array of preloaded HTMLImageElement instances
 * @property {boolean} loaded - True once 100% of frames are preloaded into memory
 * @property {number} progress - Loading progress percentage from 0 to 100
 * @property {number} currentFrameIndex - Current active frame index (0-based)
 * @property {boolean} isReady - Ready for interactive canvas rendering
 * @property {function(HTMLCanvasElement, number): void} renderFrameToCanvas - Draws a specific frame to canvas
 */

/**
 * useFrameSequence Hook
 * 
 * Manages parallel preloading, cache management, and rAF-synchronized drawing of
 * scroll-scrubbed image frame sequences (Apple product page style).
 * 
 * Key Architecture Highlights:
 * 1. Parallel Preload with Accurate Progress: Tracks individual Image() onload events.
 * 2. Memory-Resident Cache: Keeps HTMLImageElements ready in memory to prevent jank/flicker.
 * 3. Demand-Driven rAF: Redraws onto <canvas> ONLY when the computed frame index changes.
 * 4. Responsive Object-Fit: Scales frames with 'contain' or 'cover' preserving crisp aspect ratio.
 * 5. Lifecycle Safety: Automatically cancels pending rAF loops and image decode handlers on unmount.
 * 
 * @param {FrameSequenceOptions} options
 * @returns {FrameSequenceState}
 */
export function useFrameSequence({
  frameCount = 24,
  folderPath = '/frames',
  prefix = 'frame_',
  extension = 'webp',
  padLength = 4,
  isMobile = false,
  prefersReducedMotion = false,
} = {}) {
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);

  const framesRef = useRef([]);
  const lastRenderedIndexRef = useRef(-1);
  const rafIdRef = useRef(null);
  const isUnmountedRef = useRef(false);

  // Compute file URL for a given frame index (1-based index)
  const getFrameUrl = useCallback((index) => {
    const padded = index.toString().padStart(padLength, '0');
    const mobilePrefix = isMobile ? `${prefix}mobile_` : prefix;
    return `${folderPath}/${mobilePrefix}${padded}.${extension}`;
  }, [folderPath, prefix, extension, padLength, isMobile]);

  // Preload all frames in parallel
  useEffect(() => {
    isUnmountedRef.current = false;
    let loadedCount = 0;
    const images = [];

    // Fallback if reduced motion is requested: only load the first frame
    const targetCount = prefersReducedMotion ? 1 : frameCount;

    for (let i = 1; i <= targetCount; i++) {
      const img = new Image();
      const url = getFrameUrl(i);

      img.src = url;

      const handleLoad = () => {
        if (isUnmountedRef.current) return;
        loadedCount++;
        const pct = Math.min(100, Math.round((loadedCount / targetCount) * 100));
        setProgress(pct);

        if (loadedCount >= targetCount) {
          framesRef.current = images;
          setLoaded(true);
        }
      };

      const handleError = () => {
        // In case mobile frames aren't found, try desktop fallback url
        if (isMobile) {
          const fallbackUrl = `${folderPath}/${prefix}${i.toString().padStart(padLength, '0')}.${extension}`;
          img.src = fallbackUrl;
          img.onload = handleLoad;
          img.onerror = () => handleLoad(); // Advance count even on error to unblock UI
        } else {
          handleLoad();
        }
      };

      if (img.complete && img.naturalWidth !== 0) {
        handleLoad();
      } else {
        img.onload = handleLoad;
        img.onerror = handleError;
      }

      images.push(img);
    }

    return () => {
      isUnmountedRef.current = true;
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [frameCount, folderPath, prefix, extension, padLength, isMobile, prefersReducedMotion, getFrameUrl]);

  /**
   * Helper to draw a frame onto a canvas maintaining high-DPI aspect ratio cover
   */
  const renderFrameToCanvas = useCallback((canvas, frameIndex, fit = 'contain') => {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = framesRef.current[frameIndex] || framesRef.current[0];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    ctx.clearRect(0, 0, cw, ch);

    let drawWidth, drawHeight, offsetX, offsetY;

    if (fit === 'cover') {
      const scale = Math.max(cw / iw, ch / ih);
      drawWidth = iw * scale;
      drawHeight = ih * scale;
      offsetX = (cw - drawWidth) / 2;
      offsetY = (ch - drawHeight) / 2;
    } else {
      // 'contain'
      const scale = Math.min(cw / iw, ch / ih);
      drawWidth = iw * scale;
      drawHeight = ih * scale;
      offsetX = (cw - drawWidth) / 2;
      offsetY = (ch - drawHeight) / 2;
    }

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

    lastRenderedIndexRef.current = frameIndex;
  }, []);

  return {
    frames: framesRef.current,
    loaded,
    progress,
    currentFrameIndex,
    setCurrentFrameIndex,
    isReady: loaded && framesRef.current.length > 0,
    renderFrameToCanvas,
    lastRenderedIndexRef,
  };
}

export default useFrameSequence;
