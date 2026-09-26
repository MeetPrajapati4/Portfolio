import React from 'react';
import './ShinyText.css';

/**
 * ShinyText (ReactBits Component)
 * 
 * Renders text with an ultra-smooth animated gradient sweep shine.
 */
export function ShinyText({
  text,
  disabled = false,
  speed = 4,
  className = '',
  colors = ['#f8fafc', '#00f2ff', '#ba9eff', '#f8fafc'],
}) {
  const gradient = `linear-gradient(120deg, ${colors[0]} 0%, ${colors[1]} 30%, ${colors[2]} 60%, ${colors[3]} 100%)`;

  return (
    <span
      className={`shiny-text ${disabled ? 'disabled' : ''} ${className}`}
      style={{
        backgroundImage: gradient,
        animationDuration: `${speed}s`,
      }}
    >
      {text}
    </span>
  );
}

export default ShinyText;
