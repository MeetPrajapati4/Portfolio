import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { OrbitingSkillsSphere } from '@/components/3d/OrbitingSkillsSphere';
import { Sparkles, Terminal, Cpu } from 'lucide-react';
import { SpotlightCard } from '@/components/reactbits/SpotlightCard';
import { ShinyText } from '@/components/reactbits/ShinyText';
import { DecryptedText } from '@/components/reactbits/DecryptedText';
import './Skills.css';

const SKILL_DETAILS = {
  'React': {
    category: 'Frontend & Architecture',
    desc: 'Component architecture, custom hooks, state machines, SSR/CSR hydration, and high-performance DOM reconciliation.',
    exp: 'Advanced',
  },
  'Next.js': {
    category: 'Full-Stack Framework',
    desc: 'App Router, Server Components (RSC), API route handlers, static generation, streaming, and edge deployments.',
    exp: 'Advanced',
  },
  'TypeScript': {
    category: 'Programming Languages',
    desc: 'Static type safety, generics, conditional types, discriminated unions, and scalable codebase architecture.',
    exp: 'Proficient',
  },
  'JavaScript': {
    category: 'Languages',
    desc: 'Modern ES6+ features, asynchronous event loops, memory management, and browser Web APIs.',
    exp: 'Advanced',
  },
  'GenAI / Gemini': {
    category: 'Artificial Intelligence',
    desc: 'Prompt engineering, Google Gemini SDK, multimodal vision/audio input, structured output schemas, and RAG pipelines.',
    exp: 'Specialization',
  },
  'Three.js': {
    category: '3D Graphics & WebGL',
    desc: 'Custom GLSL shaders, camera controllers, scene optimization, lighting, and React Three Fiber integration.',
    exp: 'Proficient',
  },
  'GSAP': {
    category: 'Motion & Physics',
    desc: 'ScrollTrigger pinned scrubs, timeline sequencing, quickTo magnetic physics, and Lenis smooth scroll ticker sync.',
    exp: 'Advanced',
  },
  'Node.js': {
    category: 'Backend & APIs',
    desc: 'RESTful architectures, microservices, asynchronous I/O, middleware pipelines, and secure authentication.',
    exp: 'Proficient',
  },
  'TailwindCSS': {
    category: 'Styling Systems',
    desc: 'Utility-first tokens, responsive layouts, dark mode variables, and bespoke design systems.',
    exp: 'Advanced',
  },
  'MySQL': {
    category: 'Databases',
    desc: 'Relational schema design, complex JOINs, indexing, normalization, and query optimization.',
    exp: 'Proficient',
  },
  'Python': {
    category: 'AI & Data Processing',
    desc: 'Machine learning fundamentals, NumPy, script automation, and backend AI service integrations.',
    exp: 'Intermediate',
  },
  'PHP': {
    category: 'Backend Development',
    desc: 'Object-oriented programming, MySQL connectivity, session management, and MVC architectures.',
    exp: 'Proficient',
  },
};

export function Skills() {
  const [selectedSkill, setSelectedSkill] = useState({
    name: 'React',
    color: '#61dafb',
    category: 'Frontend',
  });

  const detail = SKILL_DETAILS[selectedSkill.name] || {
    category: selectedSkill.category || 'Technology',
    desc: 'Key tool in my full-stack engineering stack, powering production-ready digital solutions.',
    exp: 'Specialized',
  };

  return (
    <section id="skills" className="skills-section">
      <div className="skills-container">
        {/* Header */}
        <div className="skills-header">
          <span className="skills-eyebrow">Capabilities</span>
          <h2 className="skills-title">Technical Arsenal</h2>
          <p className="skills-description">
            Interactive spatial model of primary engineering tools, frameworks, and specialized runtimes.
          </p>
        </div>

        {/* 3D Sphere & Detail Inspector Grid */}
        <div className="skills-3d-layout">
          {/* Left: 3D Orbiting Sphere Canvas */}
          <SpotlightCard
            className="skills-sphere-card"
            spotlightColor="rgba(255, 255, 255, 0.06)"
          >
            <OrbitingSkillsSphere
              onSelectSkill={setSelectedSkill}
              activeSkill={selectedSkill}
            />
          </SpotlightCard>

          {/* Right: Selected Node Inspection Card */}
          <SpotlightCard
            className="skills-inspector-card"
            spotlightColor="rgba(255, 255, 255, 0.06)"
            borderColor="rgba(255, 255, 255, 0.12)"
          >
            <div className="inspector-header">
              <div className="inspector-dot" style={{ background: selectedSkill.color }} />
              <span className="inspector-title">Technology Details</span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedSkill.name}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="inspector-body"
              >
                <div className="inspector-badge-row">
                  <span
                    className="inspector-tech-badge"
                    style={{ borderColor: selectedSkill.color, color: selectedSkill.color }}
                  >
                    {detail.category}
                  </span>
                  <span className="inspector-level-badge">{detail.exp}</span>
                </div>

                <h3 className="inspector-tech-name" style={{ color: selectedSkill.color }}>
                  {selectedSkill.name}
                </h3>

                <p className="inspector-tech-desc">{detail.desc}</p>

                <div className="inspector-metrics-grid">
                  <div className="inspector-metric-box">
                    <span className="metric-label">Status</span>
                    <span className="metric-val text-green">Production Active</span>
                  </div>
                  <div className="inspector-metric-box">
                    <span className="metric-label">Domain</span>
                    <span className="metric-val">{selectedSkill.category || 'Core'}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}

export default Skills;
