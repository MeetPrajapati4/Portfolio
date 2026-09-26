import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowUpRight, 
  FileText, 
  Send, 
  Github, 
  Linkedin, 
  Mail, 
  Sparkles,
  Compass,
  Code2,
  FolderGit2,
  Briefcase,
  Layers,
  Circle
} from "lucide-react";
import { useLenis } from 'lenis/react';
import resumeFile from "../../../Doc/Final_Resume.pdf";
import "./Navbar.css";

const navLinks = [
  { id: "about", index: "01", name: "About", href: "#about" },
  { id: "skills", index: "02", name: "Skills", href: "#skills" },
  { id: "projects", index: "03", name: "Projects", href: "#projects" },
  { id: "experience", index: "04", name: "Journey", href: "#experience" },
  { id: "contact", index: "05", name: "Contact", href: "#contact" },
];

export function Navbar({ customLogoSrc = "/Logo.png" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [hoveredLink, setHoveredLink] = useState(null);
  const [currentTime, setCurrentTime] = useState("");
  const lenis = useLenis();

  // Dynamic live clock for studio telemetry (IST time)
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const options = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
      };
      try {
        setCurrentTime(new Intl.DateTimeFormat("en-GB", options).format(now));
      } catch {
        setCurrentTime(now.toLocaleTimeString());
      }
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Track scroll position to morph header from edge horizon to elevated floating deck
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
      if (window.scrollY < 180) {
        setActiveSection("");
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection observer for section tracking
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    const sections = ["about", "skills", "projects", "experience", "contact"];
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Smooth scroll handler via Lenis
  const handleNavClick = (e, href) => {
    e.preventDefault();
    if (lenis) {
      if (href === "#hero" || href === "#") {
        lenis.scrollTo(0, { duration: 1.4 });
      } else {
        lenis.scrollTo(href, { duration: 1.4, offset: -40 });
      }
    } else {
      const targetId = href.replace("#", "");
      if (targetId === "hero" || !targetId) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
    setIsOpen(false);
  };

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <header className={`horizon-navbar-root ${scrolled ? "scrolled" : ""}`}>
        {/* Top ambient laser accent beam */}
        <div className="horizon-top-laser" />

        <div className="horizon-navbar-inner">
          {/* LEFT: Identity & Studio Monogram */}
          <div className="horizon-brand-col">
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, "#hero")}
              className="horizon-brand-link"
              aria-label="Mit Chadotara Home"
            >
              <div className="horizon-monogram-frame">
                <img
                  src={customLogoSrc}
                  alt="Mit Logo"
                  className="horizon-monogram-img"
                />
                <div className="horizon-monogram-ambient" />
              </div>
              
              <div className="horizon-identity-meta">
                <div className="horizon-name-row">
                  <span className="horizon-name">MIT CHADOTARA</span>
                </div>
                <div className="horizon-status-sub">
                  <span className="horizon-status-dot" />
                  <span className="horizon-status-text">AVAILABLE FOR WORK</span>
                </div>
              </div>
            </a>
          </div>

          {/* CENTER: Architectural Segmented Nav Rail */}
          <nav className="horizon-nav-rail" aria-label="Main Navigation">
            <div 
              className="horizon-nav-track"
              onMouseLeave={() => setHoveredLink(null)}
            >
              {navLinks.map((item) => {
                const isActive = activeSection === item.id;
                const isHovered = hoveredLink === item.id;

                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    onMouseEnter={() => setHoveredLink(item.id)}
                    className={`horizon-nav-item ${isActive ? "active" : ""} ${isHovered ? "hovered" : ""}`}
                  >
                    <span className="nav-index-tag">{item.index}</span>
                    <span className="nav-label">{item.name}</span>

                    {/* Active sliding iridescent capsule */}
                    {isActive && (
                      <motion.div
                        layoutId="activeHorizonPill"
                        className="horizon-active-indicator"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      >
                        <span className="active-dot" />
                      </motion.div>
                    )}
                  </a>
                );
              })}
            </div>
          </nav>

          {/* RIGHT: Telemetry, Resume & Direct Action */}
          <div className="horizon-action-col">
            {/* Live Clock / Location Telemetry (Desktop Only) */}
            <div className="horizon-telemetry-pill">
              <span className="telemetry-coord">AHM • IN</span>
              <span className="telemetry-divider">/</span>
              <span className="telemetry-time">{currentTime || "IST"}</span>
            </div>

            {/* Quick Resume Link */}
            <a
              href={resumeFile}
              download="Mit_Chadotara_Resume.pdf"
              className="horizon-resume-btn"
              title="Download Resume"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FileText size={14} className="resume-icon" />
              <span className="resume-label">RESUME</span>
            </a>

            {/* Primary Action Button */}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="horizon-cta-action"
            >
              <span className="cta-glow-ring" />
              <span className="cta-text">LET'S TALK</span>
              <ArrowUpRight size={14} className="cta-arrow" />
            </a>

            {/* Kinetic Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`horizon-hamburger ${isOpen ? "open" : ""}`}
              aria-label="Toggle Navigation Menu"
              aria-expanded={isOpen}
            >
              <div className="hamburger-line line-1" />
              <div className="hamburger-line line-2" />
            </button>
          </div>
        </div>
      </header>

      {/* Editorial Fullscreen Glass Command Center (Mobile & Tablet) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="horizon-mobile-overlay"
          >
            {/* Backdrop Blur Layer */}
            <div className="horizon-mobile-backdrop" onClick={() => setIsOpen(false)} />

            {/* Drawer Container */}
            <motion.div
              initial={{ y: -40, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -30, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="horizon-mobile-drawer"
            >
              {/* Drawer Header */}
              <div className="mobile-drawer-header">
                <div className="mobile-drawer-brand">
                  <div className="horizon-monogram-frame small">
                    <img src={customLogoSrc} alt="Logo" className="horizon-monogram-img" />
                  </div>
                  <div>
                    <div className="horizon-name" style={{ fontSize: '0.95rem' }}>MIT CHADOTARA</div>
                    <div className="horizon-status-sub" style={{ fontSize: '0.65rem' }}>
                      <span className="horizon-status-dot" />
                      <span>ONLINE & AVAILABLE</span>
                    </div>
                  </div>
                </div>

                <div className="mobile-telemetry-mini">
                  {currentTime}
                </div>
              </div>

              {/* Numbered Navigation List */}
              <div className="mobile-nav-links">
                {navLinks.map((item, idx) => {
                  const isActive = activeSection === item.id;
                  return (
                    <motion.a
                      key={item.id}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={`mobile-nav-row ${isActive ? "active" : ""}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + idx * 0.04 }}
                    >
                      <div className="mobile-nav-left">
                        <span className="mobile-idx">{item.index}</span>
                        <span className="mobile-title">{item.name}</span>
                      </div>
                      <ArrowUpRight size={18} className="mobile-arrow" />
                    </motion.a>
                  );
                })}
              </div>

              {/* Mobile Drawer Footer with CTA & Socials */}
              <div className="mobile-drawer-footer">
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, "#contact")}
                  className="mobile-cta-full"
                >
                  <Send size={16} />
                  <span>START A CONVERSATION</span>
                  <ArrowUpRight size={16} />
                </a>

                <div className="mobile-secondary-row">
                  <a
                    href={resumeFile}
                    download="Mit_Chadotara_Resume.pdf"
                    className="mobile-resume-download"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FileText size={15} />
                    <span>Download CV</span>
                  </a>

                  <div className="mobile-social-dock">
                    <a 
                      href="https://github.com/MeetPrajapati4" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="mobile-social-icon"
                      aria-label="GitHub Profile"
                    >
                      <Github size={17} />
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/mit-chadotara-8422472b8/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="mobile-social-icon"
                      aria-label="LinkedIn Profile"
                    >
                      <Linkedin size={17} />
                    </a>
                    <a 
                      href="mailto:mitchadotara412@gmail.com" 
                      className="mobile-social-icon"
                      aria-label="Email Mit"
                    >
                      <Mail size={17} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
