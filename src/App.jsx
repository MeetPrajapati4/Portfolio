import { useState } from "react"
import { Navbar } from "@/components/sections/Navbar"
import { Hero } from "@/components/sections/Hero"
import { About } from "@/components/sections/About"
import { Skills } from "@/components/sections/Skills"
import { Projects } from "@/components/sections/Projects"
import { Experience } from "@/components/sections/Experience"
import { Contact } from "@/components/sections/Contact"
import { Footer } from "@/components/sections/Footer"
import { useTheme } from "@/hooks/useTheme"
import { SmoothScroll } from "@/components/ui/SmoothScroll"
import { Loader } from "@/components/ui/Loader"
import { AnimatePresence, motion } from "framer-motion"
import TubesCursor from "@/components/ui/tubes-curor"
import { ScrollProgress } from "@/components/ui/ScrollProgress"
import { ScrollToTop } from "@/components/ui/ScrollToTop"
import "./App.css"

function App() {
  const [loading, setLoading] = useState(true)
  // Initialize theme
  useTheme()

  return (
    <>
      {/* Global 3D Background - Always visible */}
      <TubesCursor />

      <AnimatePresence mode="wait">
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="app-container"
          style={{ position: 'relative', zIndex: 1 }}
        >
          <ScrollProgress />
          <ScrollToTop />
          <SmoothScroll>
            <Navbar />
            <main>
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Experience />
              <Contact />
            </main>
            <Footer />
          </SmoothScroll>
        </motion.div>
      )}
    </>
  )
}

export default App
