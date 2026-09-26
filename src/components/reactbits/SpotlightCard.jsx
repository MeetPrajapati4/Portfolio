import React, { useRef, useState } from 'react';
import './SpotlightCard.css';

/**
 * SpotlightCard (ReactBits Component)
 * 
 * Interactive card with a cursor-following radial gradient spotlight.
 * Creates an ultra-premium glassmorphic illuminated effect on hover.
 */
export function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(0, 242, 255, 0.18)',
  borderColor = 'rgba(0, 242, 255, 0.45)',
  ...props
}) {
  const cardRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`spotlight-card ${className}`}
      {...props}
    >
      {/* Background Spotlight */}
      <div
        className="spotlight-overlay"
        style={{
          opacity,
          background: `radial-gradient(circle 320px at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* Border Spotlight */}
      <div
        className="spotlight-border"
        style={{
          opacity,
          background: `radial-gradient(circle 280px at ${position.x}px ${position.y}px, ${borderColor}, transparent 60%)`,
        }}
        aria-hidden="true"
      />

      <div className="spotlight-content">
        {children}
      </div>
    </div>
  );
}

export default SpotlightCard;
