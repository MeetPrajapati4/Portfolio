import React, { useState, useEffect } from "react"
import { Navbar } from "@/components/sections/Navbar"
import { Hero } from "@/components/sections/Hero"
import { CurvedImageRibbon } from "@/components/3d/CurvedImageRibbon"
import { About } from "@/components/sections/About"
import { Skills } from "@/components/sections/Skills"
import { Projects } from "@/components/sections/Projects"
import { Experience } from "@/components/sections/Experience"
import { Contact } from "@/components/sections/Contact"
import { Footer } from "@/components/sections/Footer"
import { useTheme } from "@/hooks/useTheme"
import { SmoothScroll } from "@/components/ui/SmoothScroll"
import { ScrollToTop } from "@/components/ui/ScrollToTop"
import { MagneticCursor } from "@/components/ui/MagneticCursor"
import TubesCursor from "@/components/ui/tubes-curor"
import { Loader } from "@/components/ui/Loader"
import { AnimatePresence } from "framer-motion"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import "./App.css"

export function App() {
  const [loading, setLoading] = useState(true)

  // Initialize dark theme system
  useTheme()

  // Prevent scroll during loader sequence and refresh layout on finish
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden"
      window.scrollTo(0, 0)
    } else {
      document.body.style.overflow = ""
      const timer = setTimeout(() => {
        ScrollTrigger.refresh()
      }, 700)
      return () => clearTimeout(timer)
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [loading])

  return (
    <>
      {/* Signature 3D Interactive Tubes Cursor Background */}
      <TubesCursor />

      {/* Magnetic Interactive Proximity Cursor with GSAP quickTo */}
      <MagneticCursor />

      {/* Editorial Intro Kinetic Loader */}
      <AnimatePresence mode="wait">
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {/* Global Scroll Indicators */}
      <ScrollToTop />

      {/* Unified Lenis + GSAP Smooth Scroll Context */}
      <div className="app-container" style={{ position: 'relative', zIndex: 1 }}>
        <SmoothScroll>
          <Navbar />
          <main id="main-content">
            {/* Hero Section */}
            <Hero />

            {/* Screen-Covering 3D Spatial Gallery with Top-to-Bottom Photo Scrub */}
            <CurvedImageRibbon />

            {/* About Section */}
            <About />

            {/* Orbiting 3D Tech-Stack Sphere with Inertia Drag */}
            <Skills />

            {/* 3D Tilt Project Cards with 180° Flip Architecture Telemetry */}
            <Projects />

            {/* Journey Timeline */}
            <Experience />

            {/* Contact & Social Dock */}
            <Contact />
          </main>
          <Footer />
        </SmoothScroll>
      </div>
    </>
  )
}

export default App
