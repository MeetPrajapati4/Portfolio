import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Terminal, ChevronRight, ChevronLeft, ShieldCheck, Compass } from 'lucide-react';
import { TiltCard3D } from '@/components/ui/TiltCard3D';
import './PersonaShowcase.css';

const PERSONAS = [
  {
    id: 'architect',
    title: 'The System Architect',
    role: 'Full-Stack Architecture & Cloud',
    image: '/profile/mit-portrait-suit.png',
    quote: 'Designing scalable web backbones engineered for sub-millisecond response times.',
    tags: ['Next.js', 'React', 'Node.js', 'Distributed Systems'],
    color: '#00f2ff',
  },
  {
    id: 'ai-engineer',
    title: 'The AI Engineer',
    role: 'GenAI & Applied Intelligence',
    image: '/profile/mit-portrait-turtleneck.png',
    quote: 'Bridging bleeding-edge LLM capabilities with production-grade client apps.',
    tags: ['Gemini API', 'Vector Embeddings', 'Python', 'Agentic AI'],
    color: '#ba9eff',
  },
  {
    id: 'collaborator',
    title: 'The Collaborative Partner',
    role: 'Creative Engineering & UI/UX',
    image: '/profile/mit-portrait-smile.png',
    quote: 'Transforming complex product workflows into delightfully intuitive interactions.',
    tags: ['Three.js', 'GSAP', 'Framer Motion', 'TailwindCSS'],
    color: '#38bdf8',
  },
  {
    id: 'enterprise',
    title: 'The Enterprise Developer',
    role: 'Mission-Critical Engineering',
    image: '/profile/mit-portrait-formal.png',
    quote: 'Writing meticulously tested, self-documenting code built for longevity.',
    tags: ['Relational SQL', 'API Security', 'TypeScript', 'Clean Code'],
    color: '#ffd43b',
  },
  {
    id: 'creator',
    title: 'The Full-Cycle Creator',
    role: 'Studio Production & Delivery',
    image: '/profile/mit-studio-full.jpg',
    quote: 'From zero-to-one prototyping to high-scale global production deployments.',
    tags: ['Product Design', 'Performance', 'SEO', 'Vercel'],
    color: '#4ade80',
  },
];

export function PersonaShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activePersona = PERSONAS[activeIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % PERSONAS.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + PERSONAS.length) % PERSONAS.length);
  };

  return (
    <div className="persona-showcase-container">
      <div className="persona-showcase-header">
        <div className="persona-eyebrow">
          <Sparkles size={16} />
          <span>VISUAL DIMENSIONS</span>
        </div>
        <h3 className="persona-main-title">
          The Facets of <span className="persona-gradient-text">Mit Chadotara</span>
        </h3>
        <p className="persona-subtitle">
          Scroll through the gallery or select any dimension below to explore my engineering philosophy and creative capabilities.
        </p>
      </div>

      {/* Main Interactive Deck */}
      <div className="persona-deck-grid">
        {/* Left: 3D Tilt Persona Card */}
        <div className="persona-card-wrapper">
          <TiltCard3D maxTilt={10} className="persona-tilt-box">
            <div className="persona-card-inner glass-card">
              <div className="persona-image-box">
                <img
                  src={activePersona.image}
                  alt={activePersona.title}
                  className="persona-photo"
                />
                <div className="persona-image-overlay" />
                <div
                  className="persona-tag-pill"
                  style={{ borderColor: activePersona.color, color: activePersona.color }}
                >
                  <Terminal size={13} />
                  <span>{activePersona.role}</span>
                </div>
              </div>
            </div>
          </TiltCard3D>
        </div>

        {/* Right: Narrative & Dimension Selector */}
        <div className="persona-details-column">
          {/* Active Persona Narrative */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activePersona.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="persona-narrative-card glass-card"
            >
              <div className="persona-meta-row">
                <span className="persona-index-tag">0{activeIndex + 1} // 05</span>
                <span className="persona-status-badge">
                  <ShieldCheck size={14} className="text-cyan" />
                  <span>CORE COMPETENCY</span>
                </span>
              </div>

              <h4 className="persona-title" style={{ color: activePersona.color }}>
                {activePersona.title}
              </h4>
              <p className="persona-role-text">{activePersona.role}</p>

              <blockquote className="persona-quote-box">
                <p>"{activePersona.quote}"</p>
              </blockquote>

              <div className="persona-tags-row">
                {activePersona.tags.map((tag) => (
                  <span key={tag} className="persona-spec-badge">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Quick Select Thumbnails */}
          <div className="persona-thumbs-strip">
            {PERSONAS.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setActiveIndex(idx)}
                className={`persona-thumb-btn magnetic ${activeIndex === idx ? 'active' : ''}`}
                style={{
                  borderColor: activeIndex === idx ? item.color : 'rgba(255, 255, 255, 0.1)',
                }}
                aria-label={`Select ${item.title}`}
              >
                <img src={item.image} alt={item.title} className="thumb-img" />
                <span className="thumb-label">0{idx + 1}</span>
              </button>
            ))}

            {/* Navigation Arrows */}
            <div className="persona-nav-arrows">
              <button onClick={handlePrev} className="nav-arrow-btn magnetic" aria-label="Previous">
                <ChevronLeft size={18} />
              </button>
              <button onClick={handleNext} className="nav-arrow-btn magnetic" aria-label="Next">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonaShowcase;
