import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float, Billboard } from '@react-three/drei';
import * as THREE from 'three';
import { useDeviceTier } from '@/hooks/useDeviceTier';

const SKILLS = [
  { name: 'React', color: '#61dafb', category: 'Frontend' },
  { name: 'Next.js', color: '#ffffff', category: 'Fullstack' },
  { name: 'TypeScript', color: '#3178c6', category: 'Languages' },
  { name: 'JavaScript', color: '#f7df1e', category: 'Languages' },
  { name: 'GenAI / Gemini', color: '#ba9eff', category: 'AI' },
  { name: 'Node.js', color: '#68a063', category: 'Backend' },
  { name: 'Three.js', color: '#00f2ff', category: '3D/WebGL' },
  { name: 'GSAP', color: '#88ce02', category: 'Animation' },
  { name: 'TailwindCSS', color: '#38bdf8', category: 'Styling' },
  { name: 'MySQL', color: '#00758f', category: 'Database' },
  { name: 'Python', color: '#ffd43b', category: 'AI/Languages' },
  { name: 'PHP', color: '#777bb4', category: 'Backend' },
  { name: 'UI/UX Design', color: '#ff6b6b', category: 'Design' },
  { name: 'Git & GitHub', color: '#f05032', category: 'Tools' },
];

/**
 * Individual 3D Skill Tag / Billboard
 */
function SkillBadge({ position, skill, onSelect, isSelected }) {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef();

  return (
    <group position={position}>
      <Billboard follow={true} lockX={false} lockY={false} lockZ={false}>
        <mesh
          ref={meshRef}
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
            onSelect(skill);
          }}
          scale={hovered || isSelected ? 1.25 : 1}
        >
          {/* Rounded Pill Backing */}
          <planeGeometry args={[1.5, 0.55]} />
          <meshStandardMaterial
            color={hovered || isSelected ? '#1e293b' : '#0f172a'}
            roughness={0.2}
            metalness={0.7}
            transparent={true}
            opacity={0.85}
          />
        </mesh>

        {/* Glowing border ring on hover */}
        {(hovered || isSelected) && (
          <lineSegments scale={1.25}>
            <edgesGeometry args={[new THREE.PlaneGeometry(1.5, 0.55)]} />
            <lineBasicMaterial color={skill.color} linewidth={2} />
          </lineSegments>
        )}

        {/* Text Label */}
        <Text
          position={[0, 0, 0.05]}
          fontSize={0.17}
          color={hovered || isSelected ? skill.color : '#e2e8f0'}
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
        >
          {skill.name}
        </Text>
      </Billboard>
    </group>
  );
}

/**
 * Orbiting Spherical Cluster with Manual Inertia Drag & Reactive Lighting
 */
function SphereCluster({ onSelectSkill, activeSkill, mousePosRef }) {
  const groupRef = useRef();
  const lightRef = useRef();
  const isDraggingRef = useRef(false);
  const previousPointerPosition = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0.002, y: 0.003 });

  // Calculate Fibonacci Sphere points for balanced distribution
  const points = useMemo(() => {
    const radius = 2.4;
    const count = SKILLS.length;
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    return SKILLS.map((skill, i) => {
      const y = 1 - (i / (count - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      return {
        skill,
        position: [x * radius, y * radius, z * radius],
      };
    });
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Apply inertia and friction decay
    if (!isDraggingRef.current) {
      groupRef.current.rotation.y += velocityRef.current.x;
      groupRef.current.rotation.x += velocityRef.current.y;

      // Gentle friction decay down to ambient auto-rotation speed
      velocityRef.current.x = THREE.MathUtils.damp(velocityRef.current.x, 0.0025, 1.2, delta);
      velocityRef.current.y = THREE.MathUtils.damp(velocityRef.current.y, 0.001, 1.2, delta);
    }

    // Camera drift based on mouse coordinates
    const targetCamX = (mousePosRef.current.x - 0.5) * 1.2;
    const targetCamY = (mousePosRef.current.y - 0.5) * 1.2;
    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, targetCamX, 2, delta);
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, targetCamY, 2, delta);
    state.camera.lookAt(0, 0, 0);

    // Reactive pointer light
    if (lightRef.current) {
      const lx = (mousePosRef.current.x - 0.5) * 8;
      const ly = (mousePosRef.current.y - 0.5) * 8;
      lightRef.current.position.set(lx, ly, 4);
    }
  });

  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    previousPointerPosition.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current || !groupRef.current) return;
    const deltaX = e.clientX - previousPointerPosition.current.x;
    const deltaY = e.clientY - previousPointerPosition.current.y;

    const rotSpeed = 0.005;
    groupRef.current.rotation.y += deltaX * rotSpeed;
    groupRef.current.rotation.x += deltaY * rotSpeed;

    velocityRef.current = {
      x: deltaX * rotSpeed * 0.4,
      y: deltaY * rotSpeed * 0.4,
    };

    previousPointerPosition.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  useEffect(() => {
    window.addEventListener('pointerup', handlePointerUp);
    return () => window.removeEventListener('pointerup', handlePointerUp);
  }, []);

  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight ref={lightRef} color="#00f2ff" intensity={2.5} distance={10} />
      <directionalLight position={[0, 5, 5]} intensity={1} color="#ffffff" />

      {/* Orbiting Tech Stack Sphere */}
      <group
        ref={groupRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
      >
        {points.map(({ skill, position }) => (
          <SkillBadge
            key={skill.name}
            position={position}
            skill={skill}
            onSelect={onSelectSkill}
            isSelected={activeSkill?.name === skill.name}
          />
        ))}
      </group>
    </>
  );
}

/**
 * OrbitingSkillsSphere Component
 */
export function OrbitingSkillsSphere({ onSelectSkill, activeSkill }) {
  const { prefersReducedMotion } = useDeviceTier();
  const mousePosRef = useRef({ x: 0.5, y: 0.5 });

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

  if (prefersReducedMotion) {
    return (
      <div className="skills-reduced-motion-grid">
        {SKILLS.map((skill) => (
          <button
            key={skill.name}
            onClick={() => onSelectSkill?.(skill)}
            className="skill-badge-static"
            style={{ borderColor: skill.color }}
          >
            <span style={{ color: skill.color }}>●</span> {skill.name}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div
      className="orbiting-skills-canvas-container"
      style={{
        width: '100%',
        height: '480px',
        position: 'relative',
        touchAction: 'none',
        userSelect: 'none',
      }}
    >
      <div className="orbiting-skills-hint">
        <span>✦ Drag sphere to spin • Click node for details</span>
      </div>

      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 48 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <SphereCluster
          onSelectSkill={onSelectSkill}
          activeSkill={activeSkill}
          mousePosRef={mousePosRef}
        />
      </Canvas>
    </div>
  );
}

export default OrbitingSkillsSphere;
