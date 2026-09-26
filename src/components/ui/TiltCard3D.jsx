import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useDeviceTier } from '@/hooks/useDeviceTier';
import './TiltCard3D.css';

/**
 * TiltCard3D
 * 
 * Implements 3D card tilt physics using CSS 3D perspective transforms & GSAP springs.
 * Supports:
 * - Dynamic rotateX / rotateY proportional to cursor offset
 * - Interactive 180° flip to back face
 * - Dynamic specular light sheen that tracks pointer
 * - DeviceOrientation parallax for mobile devices
 * - Graceful fallback on prefers-reduced-motion
 */
export function TiltCard3D({
  children,
  backContent,
  className = '',
  maxTilt = 14,
  perspective = 1000,
}) {
  const cardRef = useRef(null);
  const cardInnerRef = useRef(null);
  const sheenRef = useRef(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const { allow3DTilt, prefersReducedMotion } = useDeviceTier();

  const handleMouseMove = (e) => {
    if (!allow3DTilt || prefersReducedMotion || isFlipped) return;
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    gsap.to(cardInnerRef.current, {
      rotateX,
      rotateY,
      duration: 0.3,
      ease: 'power2.out',
      transformPerspective: perspective,
      overwrite: 'auto',
    });

    // Update specular sheen position
    if (sheenRef.current) {
      const px = (x / rect.width) * 100;
      const py = (y / rect.height) * 100;
      sheenRef.current.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.0) 60%)`;
      sheenRef.current.style.opacity = '1';
    }
  };

  const handleMouseLeave = () => {
    if (prefersReducedMotion || isFlipped) return;
    gsap.to(cardInnerRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.7,
      ease: 'elastic.out(1, 0.45)',
      overwrite: 'auto',
    });

    if (sheenRef.current) {
      sheenRef.current.style.opacity = '0';
    }
  };

  // 180-degree flip handler
  const handleFlip = (e) => {
    // Only flip if not clicking a link or button
    if (e.target.closest('a, button')) return;

    const nextFlipped = !isFlipped;
    setIsFlipped(nextFlipped);

    gsap.to(cardInnerRef.current, {
      rotateY: nextFlipped ? 180 : 0,
      rotateX: 0,
      duration: 0.8,
      ease: 'power3.inOut',
    });
  };

  // Mobile DeviceOrientation support
  useEffect(() => {
    if (!window.DeviceOrientationEvent || !allow3DTilt || prefersReducedMotion || isFlipped) return;

    const handleOrientation = (e) => {
      if (e.gamma === null || e.beta === null) return;
      const tiltX = THREE_clamp((e.beta - 45) * 0.3, -maxTilt, maxTilt);
      const tiltY = THREE_clamp(e.gamma * 0.3, -maxTilt, maxTilt);

      gsap.to(cardInnerRef.current, {
        rotateX: -tiltX,
        rotateY: tiltY,
        duration: 0.4,
        ease: 'power1.out',
      });
    };

    window.addEventListener('deviceorientation', handleOrientation);
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, [allow3DTilt, prefersReducedMotion, isFlipped, maxTilt]);

  return (
    <div
      ref={cardRef}
      className={`tilt-card-container ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={backContent ? handleFlip : undefined}
      style={{ perspective: `${perspective}px` }}
    >
      <div ref={cardInnerRef} className={`tilt-card-inner ${isFlipped ? 'flipped' : ''}`}>
        {/* Front Face */}
        <div className="tilt-card-face tilt-card-front">
          {children}
          <div ref={sheenRef} className="tilt-card-sheen" />
          {backContent && (
            <div className="tilt-flip-indicator" title="Click to view details">
              <span>↻ Flip</span>
            </div>
          )}
        </div>

        {/* Back Face (Details) */}
        {backContent && (
          <div className="tilt-card-face tilt-card-back">
            {backContent}
            <div className="tilt-flip-indicator back" title="Click to flip back">
              <span>↺ Back</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function THREE_clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}

export default TiltCard3D;
