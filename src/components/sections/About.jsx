import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Globe, Cpu, Sparkles, Terminal } from 'lucide-react';
import { ScrollLinked3DObject } from '@/components/3d/ScrollLinked3DObject';
import { SpotlightCard } from '@/components/reactbits/SpotlightCard';
import { ShinyText } from '@/components/reactbits/ShinyText';
import { DecryptedText } from '@/components/reactbits/DecryptedText';
import './About.css';

const stats = [
  { icon: Code, label: "Frontend", value: "React & Next.js", accent: "#00f2ff" },
  { icon: Cpu, label: "AI Systems", value: "Gemini & LLMs", accent: "#ba9eff" },
  { icon: Database, label: "Backend", value: "Node, Express & SQL", accent: "#ec4899" },
  { icon: Globe, label: "Interactive 3D", value: "Three.js & GSAP", accent: "#38bdf8" },
];

export function About() {
  return (
    <section id="about" className="about-section">
      <div className="about-bg-gradient" />
      <div className="about-bg-blur" />

      <div className="about-container">
        {/* Section Header */}
        <div className="about-header">
          <span className="about-eyebrow">Profile</span>
          <h2 className="about-title">Engineering Background</h2>
          <p className="about-subtitle">
            Full-Stack Developer and AI Specialist with an MCA in Artificial Intelligence,
            engineering production systems from reactive interfaces to multimodal machine intelligence.
          </p>
        </div>

        {/* Main Content Grid: Left Photo & Bio, Right Scroll-Linked 3D Object */}
        <div className="about-content-grid">
          {/* Left Column: Real Photo & Narrative */}
          <div className="about-bio-column">
            <SpotlightCard className="about-photo-card" spotlightColor="rgba(255, 255, 255, 0.06)">
              <div className="about-photo-wrapper">
                <img
                  src="/profile/mit-portrait-suit.png"
                  alt="Mit Chadotara - Full Stack & AI Developer"
                  className="about-profile-image"
                />
                <div className="about-photo-badge">
                  <span>Mit Chadotara — AI & Full-Stack</span>
                </div>
              </div>
            </SpotlightCard>

            <div className="about-bio-text">
              <p className="about-text">
                My work centers on <strong>computational performance</strong>, 
                <strong> immersive spatial graphics</strong>, and <strong>practical machine intelligence</strong>. 
                Whether architecting full-stack web applications with React, Next.js, and Node, or deploying 
                multimodal generative AI pipelines, I build systems engineered for reliability and speed.
              </p>
              <p className="about-text">
                Currently pursuing an <strong>MCA with AI Specialization at Parul University</strong> and previously completed 
                BCA at Adarsh BCA College. I hold professional experience as a Full Stack Developer Intern at 
                <strong> Codeveda Technologies</strong>, building scalable production solutions.
              </p>
              <div className="about-quote-box">
                <p className="about-quote-text">
                  "Quality is a luxury market — precision, performance, and craft are non-negotiable."
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Independent Scroll-Linked 3D Mesh Object */}
          <div className="about-3d-column">
            <SpotlightCard className="about-3d-card" spotlightColor="rgba(255, 255, 255, 0.06)">
              <div className="about-3d-header">
                <span className="about-3d-indicator" />
                <span className="about-3d-title">Realtime 3D Geometry</span>
              </div>
              <ScrollLinked3DObject containerSelector="#about" />
              <p className="about-3d-caption">
                Continuous low-poly quantum mesh rotating synchronously with your scroll depth.
                Move your cursor to inspect reactive surface lighting.
              </p>
            </SpotlightCard>
          </div>
        </div>

        {/* ReactBits Spotlight Stats Grid */}
        <div className="about-stats-container">
          <div className="about-stats-grid">
            {stats.map((stat, idx) => (
              <SpotlightCard
                key={idx}
                className="about-stat-card group"
                spotlightColor={`${stat.accent}20`}
                borderColor={`${stat.accent}55`}
              >
                <div className="about-stat-content">
                  <div
                    className="about-stat-icon-wrapper"
                    style={{ borderColor: `${stat.accent}40`, color: stat.accent }}
                  >
                    <stat.icon className="about-stat-icon" />
                  </div>
                  <div className="about-stat-info">
                    <div className="about-stat-label">{stat.label}</div>
                    <div className="about-stat-value">{stat.value}</div>
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
