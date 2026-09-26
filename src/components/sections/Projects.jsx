import React from 'react';
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Sparkles, Terminal, Layers, ArrowUpRight } from "lucide-react";
import { SpotlightCard } from "@/components/reactbits/SpotlightCard";
import { ShinyText } from "@/components/reactbits/ShinyText";
import { DecryptedText } from "@/components/reactbits/DecryptedText";
import "./Projects.css";

const projects = [
  {
    id: "askify-ai",
    title: "AskiFy AI — Knowledge Assistant",
    description: "Next-generation multimodal conversational AI platform featuring intelligent document querying, context-aware reasoning, and high-speed streaming LLM completions.",
    tech: ["React", "TypeScript", "TailwindCSS", "Gemini API", "FastAPI", "Vector DB"],
    live: "",
    repo: "https://github.com/MeetPrajapati4/AskiFy_AI",
    image: "/projects/askify.jpg",
    accent: "#00f2ff",
    badge: "NEW FLAGSHIP",
    architecture: [
      "Sub-second semantic vector retrieval pipeline with chunked document embeddings",
      "Multimodal document comprehension supporting PDF, codebases, and technical specs",
      "Real-time token streaming with reactive markdown syntax rendering and telemetry",
    ],
  },
  {
    id: "devv-spark",
    title: "Devv-Spark — Code Sandbox",
    description: "AI-powered code transformation platform and developer sandbox featuring real-time syntax compilation, token estimation, and cross-language translation.",
    tech: ["ReactJs", "TailwindCss", "Gemini", "Firebase"],
    live: "https://devv-spark.vercel.app",
    repo: "https://github.com/MeetPrajapati4/DevvSpark",
    image: "/projects/devvspark.jpg",
    accent: "#ba9eff",
    badge: "LIVE DEMO",
    architecture: [
      "Integrated Google Gemini API for instant natural language to multi-language code conversion",
      "AST-guided syntax highlighting and real-time browser sandbox code evaluation",
      "Firebase Firestore state synchronization with authenticated snippet workspaces",
    ],
  },
  {
    id: "music4u",
    title: "Music4U — Audio Streaming",
    description: "A feature-rich streaming platform offering dynamic playlist management, high-fidelity audio playback, and responsive waveform visualization.",
    tech: ["PHP", "JavaScript", "MySQL", "TailwindCSS"],
    live: "",
    repo: "https://github.com/MeetPrajapati4/Music4U",
    image: "/projects/music4u.jpg",
    accent: "#ec4899",
    badge: "FULL STACK",
    architecture: [
      "Relational MySQL indexing tuned for low-latency track indexing and metadata queries",
      "Custom JavaScript audio player with audio buffer caching and custom equalizer",
      "Dynamic playlist CRUD system with access control and media asset streaming",
    ],
  },
  {
    id: "caption-flow",
    title: "AI Caption Generator — NLP Suite",
    description: "Professional AI-driven platform that generates engaging, platform-optimized captions for social media with automated hashtags and engagement tone tuning.",
    tech: ["ReactJs", "TailwindCss", "OpenAI", "Cloudinary"],
    live: "",
    repo: "https://github.com/MeetPrajapati4",
    image: "/projects/caption_generator.jpg",
    accent: "#38bdf8",
    badge: "AI AUTOMATION",
    architecture: [
      "Automated image asset analysis leveraging multimodal vision-language models",
      "Cloudinary transformation pipeline for responsive image uploads and previews",
      "Platform-specific tone tuning (LinkedIn, X, Instagram) with viral hashtag recommendation",
    ],
  },
];

export function Projects() {
  return (
    <section id="projects" className="projects-section">
      <div className="projects-bg-grid" />

      <div className="projects-container">
        {/* Section Header */}
        <div className="projects-header">
          <span className="projects-eyebrow">Works</span>
          <h2 className="projects-title">Featured Projects</h2>
          <p className="projects-subtitle">
            Production-grade systems bridging multimodal intelligence, developer tooling, and modern full-stack architectures.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="projects-bento-grid">
          {projects.map((project, index) => (
            <SpotlightCard
              key={project.id}
              spotlightColor="rgba(255, 255, 255, 0.06)"
              borderColor="rgba(255, 255, 255, 0.12)"
              className={`project-spotlight-card ${index === 0 ? 'card-featured' : ''}`}
            >
              <div className="project-card-layout">
                {/* Visual Banner Preview */}
                <div className="project-banner-box">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="project-cover-img"
                    loading="lazy"
                  />
                  <div className="project-banner-overlay" />
                  <span
                    className="project-pill-badge"
                  >
                    {project.badge}
                  </span>
                </div>

                {/* Content Details */}
                <div className="project-card-body">
                  <div className="project-title-row">
                    <h3 className="project-heading">{project.title}</h3>
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-quick-link"
                        aria-label="Visit live app"
                      >
                        <ArrowUpRight size={18} />
                      </a>
                    )}
                  </div>

                  <p className="project-text-desc">{project.description}</p>

                  {/* Architecture Bullets */}
                  <ul className="project-points-list">
                    {project.architecture.map((pt, i) => (
                      <li key={i} className="project-point-item">
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Badges */}
                  <div className="project-tech-tags">
                    {project.tech.map((t) => (
                      <span key={t} className="project-chip">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Actions Bar */}
                  <div className="project-actions-bar">
                    {project.live && (
                      <Button variant="premium" size="sm" className="btn-project-live magnetic" asChild>
                        <a href={project.live} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" /> Launch Demo
                        </a>
                      </Button>
                    )}
                    {project.repo && (
                      <Button variant="outline" size="sm" className="btn-project-repo magnetic" asChild>
                        <a href={project.repo} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4 mr-2" /> View Repository
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
