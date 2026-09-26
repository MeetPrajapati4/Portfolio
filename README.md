# Mit Chadotara — 3D Spatial Developer Portfolio

> High-performance, scroll-driven 3D developer portfolio featuring multi-directional WebGL curved cylinder spatial galleries, React Three Fiber scenes, ReactBits design system, Lenis smooth scrolling, and responsive bento architecture.

---

## 🌟 Architecture & Tech Stack

- **Framework**: React 18+ / Vite
- **3D Graphics & WebGL**: Three.js, `@react-three/fiber`, `@react-three/drei`
- **Animation & Spatial Physics**: GSAP 3.13+ + ScrollTrigger (pinned scrubs, unified ticker loop)
- **Component Motion**: Framer Motion
- **Smooth Scroll**: Lenis (integrated directly into GSAP's single unified ticker loop)
- **UI Architecture**: ReactBits Design System (SpotlightCard, ShinyText, DecryptedText, Bento Grid)
- **Icons**: Lucide React
- **Asset Optimization**: Sharp pipeline for high-resolution, lightweight image assets

---

## 🚀 Key Features

1. **3D Spatial Cylinder Gallery (`CurvedImageRibbon.jsx`)**:
   - Screen-covering, borderless 3D curved cylinder ribbon displaying persona photography.
   - **Multi-Directional Convergence**: Each card descends from its outer 3D spatial direction high above, materializing from transparent to solid ("vanish to visible").
   - **Pinned 360° Photo Scroll**: The section pins firmly until the user has scrolled through all photos, before continuing down the page.
   - **Zero-Shine Matte Finish**: True-color non-reflective materials with clean, natural studio lighting.
   - **Physics & Drag Interactivity**: Horizontal inertia drag with friction damping, click-to-focus, and telemetry HUD.

2. **Unified Motion Architecture**:
   - Lenis smooth scroll ticker hooked directly to GSAP (`gsap.ticker.add(updateTicker)` with `autoRaf={false}`).
   - Eliminates dual requestAnimationFrame loops and guarantees synchronous ScrollTrigger calculations without micro-stutters.

3. **Featured Projects Showcase**:
   - **AskiFy AI — Knowledge Assistant**: Multimodal conversational AI with semantic vector retrieval.
   - **Devv-Spark — Code Sandbox**: AI-driven multi-language code transformation sandbox.
   - **Music4U — Audio Streaming**: Low-latency audio streaming with dynamic playlist CRUD.
   - **AI Caption Generator**: NLP tone tuning and automated hashtag generation.

4. **Interactive 3D Arsenal (`Skills.jsx`)**:
   - Orbiting 3D skills sphere with interactive node telemetry inspector.

---

## 📁 Repository Structure

```text
PortFolio/
├── public/
│   ├── Logo.png                         # Official .M brand mark
│   ├── favicon.ico                      # High-res browser favicon
│   ├── favicons/                        # Multi-resolution favicons & touch icons
│   ├── profile/                         # Mit Chadotara portrait photography
│   └── projects/                        # 16:9 UI mockup project covers
├── src/
│   ├── components/
│   │   ├── 3d/
│   │   │   ├── CurvedImageRibbon.jsx    # Screen-covering 3D spatial cylinder ribbon
│   │   │   ├── OrbitingSkillsSphere.jsx # Draggable 3D tech-stack sphere with inertia
│   │   │   └── ScrollLinked3DObject.jsx # ScrollTrigger scrubbed 3D geometric mesh
│   │   ├── reactbits/
│   │   │   ├── SpotlightCard.jsx        # Cursor-following radial spotlight card
│   │   │   ├── ShinyText.jsx            # Animated text shimmer gradient
│   │   │   └── DecryptedText.jsx        # Matrix glyph scrambling on reveal
│   │   ├── sections/
│   │   │   ├── Hero.jsx                 # Dynamic typography & actions
│   │   │   ├── About.jsx                # Engineering bio & 3D mesh object
│   │   │   ├── Skills.jsx               # Technical stack & 3D sphere
│   │   │   ├── Projects.jsx             # Spotlight bento grid showcase
│   │   │   ├── Experience.jsx           # Journey & education timeline
│   │   │   ├── Contact.jsx              # Social channels & message form
│   │   │   └── Navbar.jsx               # Floating glass pill navbar with .M logo
│   │   └── ui/
│   │       ├── MagneticCursor.jsx       # GSAP magnetic proximity follower
│   │       ├── SmoothScroll.jsx         # Unified GSAP ticker + Lenis rAF integration
│   │       └── tubes-curor.jsx          # Interactive 3D tubes cursor background
│   ├── App.jsx                          # Root layout composition
│   ├── main.jsx                         # Application entrypoint
│   └── index.css                        # Design tokens, variables & typography
├── .gitignore                           # Production-grade git exclusions
├── package.json                         # Dependencies & scripts
└── vite.config.js                       # Vite bundler configuration
```

---

## 🛠️ Getting Started Locally

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm or yarn / pnpm

### Installation
```bash
# 1. Clone repository
git clone https://github.com/MeetPrajapati4/PortFolio.git

# 2. Navigate into project directory
cd PortFolio

# 3. Install dependencies
npm install

# 4. Start local development server
npm run dev
```

### Production Build
```bash
# Compile and optimize production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
