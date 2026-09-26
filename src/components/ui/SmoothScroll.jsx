import React, { useEffect, useRef } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Unified GSAP Ticker Hook
 * Binds Lenis's raf call directly into GSAP's ticker loop.
 * Eliminates dual rAF cycles and guarantees synchronous ScrollTrigger calculations.
 */
function LenisGsapSync() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    // 1. Notify ScrollTrigger whenever Lenis scrolls
    lenis.on('scroll', ScrollTrigger.update);

    // 2. Drive Lenis updates directly from GSAP's single rAF ticker
    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    // Disable lag smoothing for instant physics response
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off('scroll', ScrollTrigger.update);
      gsap.ticker.remove(updateTicker);
    };
  }, [lenis]);

  return null;
}

/**
 * SmoothScroll Wrapper
 * Configured with autoRaf={false} so GSAP drives the single unified animation loop.
 */
export function SmoothScroll({ children }) {
  return (
    <ReactLenis
      root
      autoRaf={false}
      options={{
        duration: 1.4,
        lerp: 0.08,
        smoothWheel: true,
        wheelMultiplier: 0.95,
        touchMultiplier: 1.6,
        infinite: false,
      }}
    >
      <LenisGsapSync />
      {children}
    </ReactLenis>
  );
}

export default SmoothScroll;
