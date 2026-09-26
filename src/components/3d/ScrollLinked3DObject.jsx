import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useDeviceTier } from '@/hooks/useDeviceTier';

gsap.registerPlugin(ScrollTrigger);

/**
 * Geometric Abstract Brand Core
 * Low-poly stylized icosahedron / quantum polyhedron with glowing inner node and wireframe halo
 */
function BrandGeometry({ scrollProgressRef, mousePosRef }) {
  const groupRef = useRef(null);
  const outerMeshRef = useRef(null);
  const innerMeshRef = useRef(null);
  const lightRef = useRef(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // 1. Continuous ScrollTrigger scrub rotation
    const scrollAngle = scrollProgressRef.current * Math.PI * 4;
    groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, scrollAngle, 4, delta);
    groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, scrollAngle * 0.6, 4, delta);

    // 2. Camera drift based on normalized mouse position (looking around scene)
    const targetCamX = (mousePosRef.current.x - 0.5) * 1.5;
    const targetCamY = (mousePosRef.current.y - 0.5) * 1.5;
    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, targetCamX, 3, delta);
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, targetCamY, 3, delta);
    state.camera.lookAt(0, 0, 0);

    // 3. Reactive Lighting: position point light relative to pointer coordinates
    if (lightRef.current) {
      const lightX = (mousePosRef.current.x - 0.5) * 6;
      const lightY = (mousePosRef.current.y - 0.5) * 6;
      lightRef.current.position.set(lightX, lightY, 3.5);
    }

    // Subtle counter-rotation for inner core
    if (innerMeshRef.current) {
      innerMeshRef.current.rotation.y -= delta * 0.8;
      innerMeshRef.current.rotation.z += delta * 0.5;
    }
  });

  return (
    <>
      {/* Reactive Pointer Light catching specular facets */}
      <pointLight
        ref={lightRef}
        intensity={3.5}
        distance={12}
        color="#00f2ff"
      />
      <ambientLight intensity={0.4} />
      <directionalLight position={[-4, 4, 2]} intensity={1.5} color="#ba9eff" />

      <group ref={groupRef}>
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
          {/* Low-Poly Faceted Outer Shell */}
          <mesh ref={outerMeshRef}>
            <icosahedronGeometry args={[1.6, 0]} />
            <meshPhysicalMaterial
              color="#131c33"
              roughness={0.15}
              metalness={0.85}
              clearcoat={1.0}
              clearcoatRoughness={0.1}
              wireframe={false}
              flatShading={true}
            />
          </mesh>

          {/* Holographic Wireframe Cage */}
          <mesh>
            <icosahedronGeometry args={[1.62, 0]} />
            <meshBasicMaterial
              color="#ba9eff"
              wireframe={true}
              transparent={true}
              opacity={0.45}
            />
          </mesh>

          {/* Inner Glowing AI Quantum Core */}
          <mesh ref={innerMeshRef}>
            <octahedronGeometry args={[0.75, 0]} />
            <meshStandardMaterial
              color="#00f2ff"
              emissive="#00f2ff"
              emissiveIntensity={2.5}
              wireframe={true}
            />
          </mesh>
        </Float>
      </group>
    </>
  );
}

/**
 * ScrollLinked3DObject Component
 * Renders an independent 3D brand object whose rotation is driven by ScrollTrigger scrub.
 */
export function ScrollLinked3DObject({ containerSelector = '#about' }) {
  const { prefersReducedMotion, isLowPower } = useDeviceTier();
  const scrollProgressRef = useRef(0);
  const mousePosRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    if (prefersReducedMotion) return;

    // Track normalized mouse / touch coordinates
    const handlePointerMove = (e) => {
      mousePosRef.current = {
        x: e.clientX / window.innerWidth,
        y: 1.0 - (e.clientY / window.innerHeight),
      };
    };

    // Mobile Device Orientation Parallax fallback
    const handleOrientation = (e) => {
      if (e.gamma !== null && e.beta !== null) {
        // Clamp gamma (-45 to 45) and beta (-45 to 45) to 0..1 range
        const normX = THREE.MathUtils.clamp((e.gamma + 45) / 90, 0, 1);
        const normY = THREE.MathUtils.clamp((e.beta + 45) / 90, 0, 1);
        mousePosRef.current = { x: normX, y: normY };
      }
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        mousePosRef.current = {
          x: e.touches[0].clientX / window.innerWidth,
          y: 1.0 - (e.touches[0].clientY / window.innerHeight),
        };
      }
    }, { passive: true });

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation, { passive: true });
    }

    // ScrollTrigger to continuously drive rotation through the section
    const trigger = ScrollTrigger.create({
      trigger: containerSelector,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1.2,
      onUpdate: (self) => {
        scrollProgressRef.current = self.progress;
      },
    });

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      if (window.DeviceOrientationEvent) {
        window.removeEventListener('deviceorientation', handleOrientation);
      }
      trigger.kill();
    };
  }, [containerSelector, prefersReducedMotion]);

  if (isLowPower || prefersReducedMotion) {
    return null;
  }

  return (
    <div
      className="scroll-linked-3d-wrapper"
      style={{
        width: '100%',
        height: '380px',
        position: 'relative',
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <BrandGeometry scrollProgressRef={scrollProgressRef} mousePosRef={mousePosRef} />
      </Canvas>
    </div>
  );
}

export default ScrollLinked3DObject;
