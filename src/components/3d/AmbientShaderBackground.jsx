import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useDeviceTier } from '@/hooks/useDeviceTier';

/**
 * GLSL Vertex Shader
 * Simulates gentle undulating cyber field perturbed by mouse position
 */
const vertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  varying vec2 vUv;
  varying float vElevation;

  void main() {
    vUv = uv;
    vec3 pos = position;

    // Distant soft sine wave
    float wave1 = sin(pos.x * 1.5 + uTime * 0.4) * 0.15;
    float wave2 = cos(pos.y * 1.8 + uTime * 0.3) * 0.15;

    // Mouse attraction / deflection ripple
    float dist = distance(uv, uMouse);
    float mouseInfluence = smoothstep(0.45, 0.0, dist) * 0.35;
    
    pos.z += wave1 + wave2 + mouseInfluence;
    vElevation = pos.z;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

/**
 * GLSL Fragment Shader
 * Generates an ethereal dark-mode gradient with dynamic specular highlights
 */
const fragmentShader = `
  uniform float uTime;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;
  varying vec2 vUv;
  varying float vElevation;

  void main() {
    // Dynamic color gradient interpolation
    float mixVal = smoothstep(-0.2, 0.4, vElevation);
    vec3 color = mix(uColorA, uColorB, mixVal);

    // Subtle luminescent grid lines
    vec2 grid = abs(fract(vUv * 24.0 - 0.5) - 0.5) / fwidth(vUv * 24.0);
    float line = min(grid.x, grid.y);
    float gridAlpha = 1.0 - min(line, 1.0);

    color += uColorC * gridAlpha * 0.08;

    // Soft vignetting at boundaries
    float distFromCenter = distance(vUv, vec2(0.5));
    float vignette = smoothstep(0.7, 0.15, distFromCenter);

    gl_FragColor = vec4(color * vignette, 0.45);
  }
`;

function ShaderPlane() {
  const meshRef = useRef(null);
  const mouseTargetRef = useRef(new THREE.Vector2(0.5, 0.5));
  const mouseCurrentRef = useRef(new THREE.Vector2(0.5, 0.5));

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uColorA: { value: new THREE.Color('#070b16') }, // Deep dark navy
    uColorB: { value: new THREE.Color('#1a103c') }, // Rich deep purple
    uColorC: { value: new THREE.Color('#00f2ff') }, // Cyber cyan
  }), []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseTargetRef.current.x = e.clientX / window.innerWidth;
      mouseTargetRef.current.y = 1.0 - (e.clientY / window.innerHeight);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material;
    mat.uniforms.uTime.value += delta;

    // Smooth lerp mouse coordinates
    mouseCurrentRef.current.lerp(mouseTargetRef.current, 0.08);
    mat.uniforms.uMouse.value.copy(mouseCurrentRef.current);
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -1]}>
      <planeGeometry args={[10, 8, 48, 48]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
      />
    </mesh>
  );
}

/**
 * AmbientShaderBackground
 * 
 * Renders an ambient GLSL reactive fluid grid behind page sections.
 * Automatically disabled on low-power devices and prefers-reduced-motion.
 */
export function AmbientShaderBackground() {
  const { allowShaders, prefersReducedMotion } = useDeviceTier();

  if (!allowShaders || prefersReducedMotion) {
    return (
      <div 
        className="ambient-fallback-gradient"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          background: 'radial-gradient(ellipse at 50% 20%, rgba(186, 158, 255, 0.06), transparent 70%), radial-gradient(ellipse at 80% 80%, rgba(0, 242, 255, 0.04), transparent 60%)'
        }}
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.85
      }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 3], fov: 60 }}
        gl={{ antialias: false, powerPreference: 'high-performance', alpha: true }}
      >
        <ShaderPlane />
      </Canvas>
    </div>
  );
}

export default AmbientShaderBackground;
