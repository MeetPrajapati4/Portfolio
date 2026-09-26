import React, { useState, useEffect, useRef } from 'react';

const GLYPHS = 'ABCDEF0123456789_#@*&!%<>~/+';

/**
 * DecryptedText (ReactBits Component)
 * 
 * Decodes characters with high-tech random matrix glyphs.
 */
export function DecryptedText({
  text,
  speed = 40,
  maxIterations = 12,
  revealOnHover = true,
  className = '',
}) {
  const [displayText, setDisplayText] = useState(text);
  const isHoveredRef = useRef(false);

  const startDecryption = () => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) {
              return text[index];
            }
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join('')
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }
      iteration += 1 / (maxIterations / text.length);
    }, speed);
  };

  useEffect(() => {
    startDecryption();
  }, [text]);

  return (
    <span
      className={`decrypted-text ${className}`}
      onMouseEnter={() => {
        if (revealOnHover) startDecryption();
      }}
    >
      {displayText}
    </span>
  );
}

export default DecryptedText;
