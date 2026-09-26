import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useDeviceTier } from '@/hooks/useDeviceTier';
import './MagneticCursor.css';

/**
 * MagneticCursor
 * 
 * High-performance cursor tracking using GSAP quickTo.
 * Eliminates React state updates on mousemove for locked 60/120fps motion.
 * 
 * Features:
 * - Magnetic attraction to clickable elements (.magnetic, button, a)
 * - Mix-blend mode contrast overlay
 * - Scale & morph on hover
 * - Smooth lerped trailing dot & follower ring
 * - Automatically deactivated on mobile / touch / low-power / prefers-reduced-motion
 */
export function MagneticCursor() {
  const { allowMagneticCursor, prefersReducedMotion } = useDeviceTier();
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    if (!allowMagneticCursor || prefersReducedMotion) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    // Use GSAP quickTo for ultra-smooth hardware-accelerated transforms
    const xToCursor = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power3" });
    const yToCursor = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power3" });
    const xToFollower = gsap.quickTo(follower, "x", { duration: 0.45, ease: "power2.out" });
    const yToFollower = gsap.quickTo(follower, "y", { duration: 0.45, ease: "power2.out" });

    let isHovering = false;
    let magneticTarget = null;

    const onMouseMove = (e) => {
      const { clientX: mx, clientY: my } = e;

      if (magneticTarget) {
        const rect = magneticTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = mx - centerX;
        const dy = my - centerY;

        // Pull toward center with gentle magnetic elasticity
        const pullFactor = 0.35;
        const targetX = centerX + dx * pullFactor;
        const targetY = centerY + dy * pullFactor;

        xToCursor(targetX);
        yToCursor(targetY);
        xToFollower(targetX);
        yToFollower(targetY);
      } else {
        xToCursor(mx);
        yToCursor(my);
        xToFollower(mx);
        yToFollower(my);
      }
    };

    const handlePointerOver = (e) => {
      const target = e.target.closest('a, button, [role="button"], .magnetic, .clickable');
      if (target) {
        isHovering = true;
        magneticTarget = target;
        cursor.classList.add('cursor-hover');
        follower.classList.add('follower-hover');
      }
    };

    const handlePointerOut = (e) => {
      const target = e.target.closest('a, button, [role="button"], .magnetic, .clickable');
      if (target) {
        isHovering = false;
        magneticTarget = null;
        cursor.classList.remove('cursor-hover');
        follower.classList.remove('follower-hover');
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', handlePointerOver, { passive: true });
    document.addEventListener('mouseout', handlePointerOut, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', handlePointerOver);
      document.removeEventListener('mouseout', handlePointerOut);
    };
  }, [allowMagneticCursor, prefersReducedMotion]);

  if (!allowMagneticCursor || prefersReducedMotion) {
    return null;
  }

  return (
    <div className="custom-cursor-container" aria-hidden="true">
      <div ref={cursorRef} className="cursor-dot" />
      <div ref={followerRef} className="cursor-follower" />
    </div>
  );
}

export default MagneticCursor;
