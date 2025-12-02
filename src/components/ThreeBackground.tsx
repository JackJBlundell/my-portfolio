import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface ParticleFieldProps {
  count?: number;
  color: string;
  speed: number;
}

// Simplified particle field - no mouse interaction, just gentle animation
function ParticleField({ count = 400, color, speed }: ParticleFieldProps) {
  const points = useRef<THREE.Points>(null);

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (!points.current) return;
    const time = state.clock.getElapsedTime();
    // Simple rotation only - no per-particle updates
    points.current.rotation.x = time * 0.02 * speed;
    points.current.rotation.y = time * 0.03 * speed;
  });

  return (
    <Points ref={points} positions={particlesPosition} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color={color}
        size={0.02}
        sizeAttenuation
        depthWrite={false}
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// Simple floating shape - just rotation, no physics
interface FloatingShapeProps {
  position: [number, number, number];
  speed: number;
  color: string;
  type: 'icosahedron' | 'torus' | 'octahedron';
}

function FloatingShape({ position, speed, color, type }: FloatingShapeProps) {
  const mesh = useRef<THREE.Mesh>(null);
  const initialY = position[1];

  useFrame((state) => {
    if (!mesh.current) return;
    const time = state.clock.getElapsedTime();

    // Simple floating animation
    mesh.current.position.y = initialY + Math.sin(time * 0.5 * speed) * 0.3;
    mesh.current.rotation.x = time * 0.15 * speed;
    mesh.current.rotation.y = time * 0.2 * speed;
  });

  const geometry = useMemo(() => {
    switch (type) {
      case 'icosahedron':
        return <icosahedronGeometry args={[0.5, 0]} />;
      case 'torus':
        return <torusGeometry args={[0.4, 0.15, 8, 16]} />;
      case 'octahedron':
        return <octahedronGeometry args={[0.45, 0]} />;
    }
  }, [type]);

  return (
    <mesh ref={mesh} position={position}>
      {geometry}
      <meshBasicMaterial color={color} wireframe transparent opacity={0.35} />
    </mesh>
  );
}

interface SceneProps {
  particleColor: string;
  showParticles: boolean;
  showShapes: boolean;
  physicsSpeed: number;
}

const Scene = React.memo(function Scene({ particleColor, showParticles, showShapes, physicsSpeed }: SceneProps) {
  return (
    <>
      {showParticles && (
        <ParticleField color={particleColor} speed={physicsSpeed} />
      )}

      {showShapes && (
        <>
          <FloatingShape position={[-2.5, 0, -2]} speed={physicsSpeed} color="#FF6B35" type="icosahedron" />
          <FloatingShape position={[2.5, -0.5, -3]} speed={physicsSpeed * 0.8} color="#764ba2" type="torus" />
          <FloatingShape position={[0, 1.5, -2.5]} speed={physicsSpeed * 0.9} color="#667eea" type="octahedron" />
        </>
      )}
    </>
  );
});

interface ThreeBackgroundPropsMain {
  particleColor: string;
  showParticles: boolean;
  showShapes: boolean;
  physicsSpeed: number;
}

export default function ThreeBackground({
  particleColor,
  showParticles,
  showShapes,
  physicsSpeed,
}: ThreeBackgroundPropsMain) {
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 0,
      pointerEvents: 'none'
    }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
        dpr={[0.5, 1]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: false,
        }}
        frameloop="always"
      >
        <Scene
          particleColor={particleColor}
          showParticles={showParticles}
          showShapes={showShapes}
          physicsSpeed={physicsSpeed}
        />
      </Canvas>
    </div>
  );
}
