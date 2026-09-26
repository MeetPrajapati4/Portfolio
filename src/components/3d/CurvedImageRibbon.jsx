import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './CurvedImageRibbon.css';

gsap.registerPlugin(ScrollTrigger);

const BASE_PHOTOS = [
  {
    url: '/profile/mit-portrait-suit.png',
    title: 'System Architecture',
    role: 'Full-Stack Architecture & Cloud',
    tags: ['React', 'Next.js', 'Node.js', 'Distributed Systems'],
    color: '#818cf8',
  },
  {
    url: '/profile/mit-portrait-turtleneck.png',
    title: 'Applied Intelligence',
    role: 'Generative AI & Multimodal Pipelines',
    tags: ['Gemini API', 'LLMs', 'Python', 'Agentic Workflows'],
    color: '#a5b4fc',
  },
  {
    url: '/profile/mit-portrait-smile.png',
    title: 'Interface Engineering',
    role: '3D Spatial Interaction & WebGL Motion',
    tags: ['Three.js', 'GSAP Motion', 'Framer Motion', 'Tailwind'],
    color: '#93c5fd',
  },
  {
    url: '/profile/mit-portrait-formal.png',
    title: 'Enterprise Engineering',
    role: 'Robust & Mission-Critical Backend Systems',
    tags: ['Relational SQL', 'API Architecture', 'TypeScript', 'Clean Code'],
    color: '#cbd5e1',
  },
  {
    url: '/profile/mit-studio-full.jpg',
    title: 'Product Delivery',
    role: 'End-to-End Software Design & Production',
    tags: ['System Prototyping', 'Performance', 'SEO', 'Deployment'],
    color: '#c084fc',
  },
];

// Duplicate to form a continuous 10-slot cylinder ribbon
const PHOTO_DATA = [...BASE_PHOTOS, ...BASE_PHOTOS];

/**
 * Creates smooth curved plane geometry with high segment density
 */
function createCurvedPlaneGeometry(width, height, radius, segmentsX = 48, segmentsY = 2) {
  const geo = new THREE.PlaneGeometry(width, height, segmentsX, segmentsY);
  const pos = geo.attributes.position;

  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const theta = x / radius;
    pos.setZ(i, -radius * (1 - Math.cos(theta)));
  }

  geo.computeVertexNormals();
  return geo;
}

/**
 * Single Curved 3D Card
 * - Zero shining / zero glare: Uses matte basic materials
 * - Card 0: Orchestrated top-to-bottom scroll descent and alignment
 */
function CurvedCard({ index, totalCards, radius, item, onFocus, isFocused, scrollProgressRef }) {
  const groupRef = useRef();
  const photoMatRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Load texture with sRGB color profile
  const texture = useTexture(item.url);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;

  // Refined, well-proportioned card dimensions
  const cardWidth = 2.1;
  const cardHeight = 2.85;

  // Photo geometry: high-segment curved plane
  const photoGeo = useMemo(() => {
    return createCurvedPlaneGeometry(cardWidth, cardHeight, radius, 48, 2);
  }, [cardWidth, cardHeight, radius]);

  // Polar coordinates on cylinder (docked target)
  const baseAngle = (index / totalCards) * Math.PI * 2;
  const finalX = Math.sin(baseAngle) * radius;
  const finalZ = Math.cos(baseAngle) * radius;
  const finalY = 0;

  // Directional origin (starts in upper viewport, perfectly visible descending into place)
  const dirSpread = 1.45;
  const startX = Math.sin(baseAngle) * (radius * dirSpread);
  const startZ = Math.cos(baseAngle) * (radius * dirSpread);
  const startY = 3.6 + Math.sin(index * 1.5) * 0.4;
  const startRotX = 0.35 * Math.cos(baseAngle);
  const startRotZ = -0.28 * Math.sin(baseAngle);
  const startScale = 0.9;

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    let targetScale = isFocused ? 1.05 : hovered ? 1.02 : 1.0;

    // Synchronized scroll choreography:
    // Glides down from top direction into cylinder slot during first 20% of scroll
    if (scrollProgressRef) {
      const p = scrollProgressRef.current ?? 1.0;
      const assembleEnd = 0.20;
      const staggerDelay = (index % 5) * 0.015;
      const cardP = Math.min(1.0, Math.max(0.0, (p - staggerDelay) / (assembleEnd - staggerDelay)));
      const ease = 1 - Math.pow(1 - cardP, 3); // Smooth cubic ease out

      const targetX = THREE.MathUtils.lerp(startX, finalX, ease);
      const targetY = THREE.MathUtils.lerp(startY, finalY, ease);
      const targetZ = THREE.MathUtils.lerp(startZ, finalZ, ease);
      const targetRotX = THREE.MathUtils.lerp(startRotX, 0.0, ease);
      const targetRotZ = THREE.MathUtils.lerp(startRotZ, 0.0, ease);
      const entranceScale = THREE.MathUtils.lerp(startScale, 1.0, ease);

      // Reaches 100% opacity quickly so card is fully vivid and properly visible
      const fadeProgress = Math.min(1.0, Math.max(0.0, cardP * 3.5));
      const targetOpacity = THREE.MathUtils.lerp(0.0, 1.0, fadeProgress);

      if (photoMatRef.current) {
        photoMatRef.current.opacity = THREE.MathUtils.damp(photoMatRef.current.opacity, targetOpacity, 18, delta);
      }

      groupRef.current.position.x = THREE.MathUtils.damp(groupRef.current.position.x, targetX, 14, delta);
      groupRef.current.position.y = THREE.MathUtils.damp(groupRef.current.position.y, targetY, 14, delta);
      groupRef.current.position.z = THREE.MathUtils.damp(groupRef.current.position.z, targetZ, 14, delta);
      groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, targetRotX, 14, delta);
      groupRef.current.rotation.z = THREE.MathUtils.damp(groupRef.current.rotation.z, targetRotZ, 14, delta);

      targetScale *= entranceScale;
    }

    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 8);
  });

  return (
    <group
      ref={groupRef}
      position={[startX, startY, startZ]}
      rotation={[startRotX, baseAngle, startRotZ]}
    >
      {/* Pure Floating Photo Mesh — 100% Transparent, ZERO Background Box */}
      <mesh
        geometry={photoGeo}
        position={[0, 0, 0]}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
        onClick={(e) => {
          e.stopPropagation();
          onFocus(index);
        }}
      >
        <meshBasicMaterial
          ref={photoMatRef}
          map={texture}
          side={THREE.DoubleSide}
          transparent={true}
          opacity={0}
        />
      </mesh>
    </group>
  );
}

/**
 * 3D Cylinder Scene with GSAP Inertia & Scroll Sync
 */
function CylinderScene({ onActiveChange, activeIndex, mousePosRef, targetIndex }) {
  const cylinderGroupRef = useRef();
  const radius = 4.2;
  const totalCards = PHOTO_DATA.length;

  const targetRotationRef = useRef(0);
  const currentRotationRef = useRef(0);
  const isDraggingRef = useRef(false);
  const previousPointerXRef = useRef(0);
  const dragVelocityRef = useRef(0);
  const scrollProgressRef = useRef(0);

  // Sync scroll with cylinder rotation & Card assembly:
  // Page pins until the user scrolls through all photos!
  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: '#cylinder-ribbon-section',
      start: 'top top',
      end: '+=350%',
      pin: true,
      scrub: 1.0,
      onUpdate: (self) => {
        scrollProgressRef.current = self.progress;
        if (!isDraggingRef.current) {
          // Phase 1 (0.0 to 0.20): Cards assemble into cylinder ring
          // Phase 2 (0.20 to 1.0): Cylinder scrolls through ALL photos (360deg rotation)
          if (self.progress > 0.20) {
            const rotProgress = (self.progress - 0.20) / 0.80;
            targetRotationRef.current = rotProgress * Math.PI * -2.5;
          } else {
            targetRotationRef.current = 0;
          }
        }
      },
    });

    return () => trigger.kill();
  }, []);

  // React to programmatic target selection (e.g. control dots)
  useEffect(() => {
    if (typeof targetIndex === 'number' && targetIndex >= 0) {
      const anglePerCard = (Math.PI * 2) / totalCards;
      targetRotationRef.current = -targetIndex * anglePerCard;
      dragVelocityRef.current = 0;
    }
  }, [targetIndex, totalCards]);

  useFrame((state, delta) => {
    if (!cylinderGroupRef.current) return;

    if (isDraggingRef.current) {
      currentRotationRef.current += dragVelocityRef.current;
      targetRotationRef.current = currentRotationRef.current;
    } else {
      // Smooth friction deceleration
      dragVelocityRef.current *= Math.pow(0.93, delta * 60);

      // Damp current rotation toward target
      currentRotationRef.current = THREE.MathUtils.damp(
        currentRotationRef.current,
        targetRotationRef.current + dragVelocityRef.current * 12,
        4.5,
        delta
      );
    }

    cylinderGroupRef.current.rotation.y = currentRotationRef.current;

    // Determine front-facing card (5 unique personas)
    const anglePerCard = (Math.PI * 2) / totalCards;
    let normalized = (-currentRotationRef.current) % (Math.PI * 2);
    if (normalized < 0) normalized += Math.PI * 2;
    const rawIdx = Math.round(normalized / anglePerCard) % totalCards;
    const personaIdx = rawIdx % BASE_PHOTOS.length;

    if (personaIdx !== activeIndex && onActiveChange) {
      onActiveChange(personaIdx);
    }

    // Camera subtle drift
    const targetCamX = (mousePosRef.current.x - 0.5) * 0.8;
    const targetCamY = (mousePosRef.current.y - 0.5) * 0.3;
    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, targetCamX, 2, delta);
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, targetCamY, 2, delta);
    state.camera.lookAt(0, 0, 0);
  });

  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    previousPointerXRef.current = e.clientX;
    dragVelocityRef.current = 0;
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - previousPointerXRef.current;
    const rotSpeed = 0.0055;
    dragVelocityRef.current = deltaX * rotSpeed;
    currentRotationRef.current += deltaX * rotSpeed;
    targetRotationRef.current = currentRotationRef.current;
    previousPointerXRef.current = e.clientX;
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  useEffect(() => {
    window.addEventListener('pointerup', handlePointerUp);
    return () => window.removeEventListener('pointerup', handlePointerUp);
  }, []);

  const handleFocusCard = (index) => {
    const anglePerCard = (Math.PI * 2) / totalCards;
    targetRotationRef.current = -index * anglePerCard;
    dragVelocityRef.current = 0;
  };

  return (
    <>
      {/* Soft uniform studio lighting (NO harsh specular spots or shiny reflections) */}
      <ambientLight intensity={1.5} />
      <directionalLight position={[0, 8, 8]} intensity={1.0} color="#ffffff" />
      <directionalLight position={[-6, 4, 4]} intensity={0.5} color="#94a3b8" />

      {/* 3D Cylinder Group */}
      <group
        ref={cylinderGroupRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
      >
        {PHOTO_DATA.map((item, idx) => (
          <CurvedCard
            key={`${item.title}-${idx}`}
            index={idx}
            totalCards={totalCards}
            radius={radius}
            item={item}
            onFocus={handleFocusCard}
            isFocused={activeIndex === (idx % BASE_PHOTOS.length)}
            scrollProgressRef={scrollProgressRef}
          />
        ))}
      </group>
    </>
  );
}

/**
 * CurvedImageRibbon Component
 * Screen-Covering Width, Top-to-Bottom Sliding Card Animation, and Matte Zero-Shine Finish
 */
export function CurvedImageRibbon() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [targetIndex, setTargetIndex] = useState(null);
  const mousePosRef = useRef({ x: 0.5, y: 0.5 });
  const activeItem = BASE_PHOTOS[activeIndex] || BASE_PHOTOS[0];

  useEffect(() => {
    const handleMove = (e) => {
      mousePosRef.current = {
        x: e.clientX / window.innerWidth,
        y: 1.0 - (e.clientY / window.innerHeight),
      };
    };

    const handleTouch = (e) => {
      if (e.touches.length > 0) {
        mousePosRef.current = {
          x: e.touches[0].clientX / window.innerWidth,
          y: 1.0 - (e.touches[0].clientY / window.innerHeight),
        };
      }
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('touchmove', handleTouch, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleTouch);
    };
  }, []);

  const handleSelectPersona = (idx) => {
    setActiveIndex(idx);
    setTargetIndex(idx);
  };

  return (
    <section id="cylinder-ribbon-section" className="curved-ribbon-section">
      <div className="curved-ribbon-viewport">
        {/* Understated Top Caption */}
        <div className="ribbon-caption-bar">
          <span className="ribbon-caption-tag">Perspectives</span>
          <span className="ribbon-caption-instruction">Scroll down or drag horizontally</span>
        </div>

        {/* 3D WebGL Cylinder Canvas Viewport — Full Screen Width & Height, NO Box */}
        <div className="curved-ribbon-canvas-expanded">
          <Canvas
            camera={{ position: [0, 0, 7.8], fov: 42 }}
            gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          >
            <CylinderScene
              onActiveChange={setActiveIndex}
              activeIndex={activeIndex}
              mousePosRef={mousePosRef}
              targetIndex={targetIndex}
            />
          </Canvas>
        </div>

        {/* Bottom Control Strip */}
        <div className="curved-ribbon-control-strip">
          <div className="control-strip-info">
            <h3 className="control-strip-title">{activeItem.title}</h3>
            <span className="control-strip-role">{activeItem.role}</span>
          </div>

          <div className="control-strip-dots">
            {BASE_PHOTOS.map((item, idx) => (
              <button
                key={item.title}
                onClick={() => handleSelectPersona(idx)}
                className={`control-dot-btn ${activeIndex === idx ? 'active' : ''}`}
                aria-label={`Select ${item.title}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CurvedImageRibbon;
