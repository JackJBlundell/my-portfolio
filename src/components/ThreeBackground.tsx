import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface ParticleFieldProps {
  count?: number;
  mousePosition: { x: number; y: number };
  color: string;
  speed: number;
}

function ParticleField({ count = 3000, mousePosition, color, speed }: ParticleFieldProps) {
  const points = useRef<THREE.Points>(null);
  const originalPositions = useRef<Float32Array | null>(null);
  const frameCount = useRef(0);

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 10;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 10;

      positions.set([x, y, z], i * 3);
    }

    if (!originalPositions.current) {
      originalPositions.current = new Float32Array(positions);
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (!points.current || !originalPositions.current) return;

    // Skip frames for performance (update every 2 frames)
    frameCount.current++;
    if (frameCount.current % 2 !== 0) return;

    const time = state.clock.getElapsedTime();
    const positions = points.current.geometry.attributes.position.array as Float32Array;

    // Precalculate mouse influence
    const mouseInfluenceX = mousePosition.x * 2;
    const mouseInfluenceY = mousePosition.y * 2;
    const timeSpeed = time * speed;

    // Simplified particle displacement (update only subset for performance)
    const step = count > 2000 ? 2 : 1; // Update every other particle if count is high
    for (let i = 0; i < count; i += step) {
      const i3 = i * 3;

      const originalX = originalPositions.current[i3];
      const originalY = originalPositions.current[i3 + 1];
      const originalZ = originalPositions.current[i3 + 2];

      // Simplified distance calculation (Manhattan distance for performance)
      const dx = originalX - mouseInfluenceX;
      const dy = originalY - mouseInfluenceY;
      const distanceApprox = Math.abs(dx) + Math.abs(dy);

      // Simplified force calculation
      const force = distanceApprox < 3 ? (3 - distanceApprox) * 0.15 : 0;

      positions[i3] = originalX + Math.sin(timeSpeed + originalX) * 0.1 + dx * force * 0.1;
      positions[i3 + 1] = originalY + Math.cos(timeSpeed + originalY) * 0.1 + dy * force * 0.1;
      positions[i3 + 2] = originalZ + Math.sin(timeSpeed * 0.5) * 0.1;
    }

    points.current.geometry.attributes.position.needsUpdate = true;

    // Slower rotation for better performance
    points.current.rotation.x = time * 0.03 * speed;
    points.current.rotation.y = time * 0.05 * speed;
  });

  return (
    <Points ref={points} positions={particlesPosition} stride={3} frustumCulled={true}>
      <PointMaterial
        transparent
        color={color}
        size={0.015}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

interface ShapeData {
  position: THREE.Vector3;
  velocity: { x: number; y: number; z: number };
  radius: number;
}

const shapePositions: ShapeData[] = [];

interface FloatingShapeProps {
  position: [number, number, number];
  mousePosition: { x: number; y: number };
  speed: number;
  index: number;
  radius: number;
}

function FloatingIcosahedron({ position, mousePosition, speed, index, radius }: FloatingShapeProps) {
  const mesh = useRef<THREE.Mesh>(null);
  const velocity = useRef({ x: (Math.random() - 0.5) * 0.02, y: (Math.random() - 0.5) * 0.02, z: 0 });
  const frameCount = useRef(0);

  React.useEffect(() => {
    if (!shapePositions[index] && mesh.current) {
      shapePositions[index] = {
        position: mesh.current.position.clone(),
        velocity: velocity.current,
        radius: radius
      };
    }
  }, [index, radius]);

  useFrame((state, delta) => {
    if (!mesh.current) return;

    frameCount.current++;
    const time = state.clock.getElapsedTime();

    // Mouse attraction/repulsion (optimized with distance squared)
    const mouseInfluenceX = mousePosition.x * 5;
    const mouseInfluenceY = mousePosition.y * 5;

    const dx = mesh.current.position.x - mouseInfluenceX;
    const dy = mesh.current.position.y - mouseInfluenceY;
    const distSq = dx * dx + dy * dy;

    // Magnetic effect - attract when close (skip sqrt)
    if (distSq < 9) { // 3 * 3
      const distance = Math.sqrt(distSq);
      const force = (3 - distance) * 0.01;
      velocity.current.x -= (dx / distance) * force;
      velocity.current.y -= (dy / distance) * force;
    }

    // Collision detection with other shapes (only every 2nd frame)
    if (frameCount.current % 2 === 0) {
      shapePositions.forEach((other, otherIndex) => {
        if (otherIndex === index || !other) return;

        const dx = mesh.current!.position.x - other.position.x;
        const dy = mesh.current!.position.y - other.position.y;
        const distSq = dx * dx + dy * dy;
        const minDistance = radius + other.radius;
        const minDistSq = minDistance * minDistance;

        if (distSq < minDistSq && distSq > 0.01) {
          // Collision detected - push shapes apart
          const distance = Math.sqrt(distSq);
          const overlap = minDistance - distance;
          const pushForce = overlap * 0.5;

          velocity.current.x += (dx / distance) * pushForce;
          velocity.current.y += (dy / distance) * pushForce;

          // Add some bounce
          velocity.current.x += (dx / distance) * 0.02;
          velocity.current.y += (dy / distance) * 0.02;
        }
      });
    }

    // Apply velocity
    mesh.current.position.x += velocity.current.x * speed;
    mesh.current.position.y += velocity.current.y * speed;

    // Boundary bounce
    if (Math.abs(mesh.current.position.x) > 5) velocity.current.x *= -0.8;
    if (Math.abs(mesh.current.position.y) > 5) velocity.current.y *= -0.8;

    // Add float animation
    mesh.current.position.y += Math.sin(time * 0.5 * speed) * 0.002;

    // Damping
    velocity.current.x *= 0.98;
    velocity.current.y *= 0.98;

    // Update position in shared array
    if (shapePositions[index]) {
      shapePositions[index].position.copy(mesh.current.position);
      shapePositions[index].velocity = velocity.current;
    }

    // Rotate with speed
    mesh.current.rotation.x = time * 0.2 * speed;
    mesh.current.rotation.y = time * 0.3 * speed;
  });

  return (
    <mesh ref={mesh} position={position}>
      <icosahedronGeometry args={[0.5, 0]} />
      <meshStandardMaterial
        color="#FF6B35"
        wireframe
        transparent
        opacity={0.3}
        emissive="#FF6B35"
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}

function FloatingTorus({ position, mousePosition, speed, index, radius }: FloatingShapeProps) {
  const mesh = useRef<THREE.Mesh>(null);
  const velocity = useRef({ x: (Math.random() - 0.5) * 0.015, y: (Math.random() - 0.5) * 0.015, z: 0 });
  const frameCount = useRef(0);

  React.useEffect(() => {
    if (!shapePositions[index] && mesh.current) {
      shapePositions[index] = {
        position: mesh.current.position.clone(),
        velocity: velocity.current,
        radius: radius
      };
    }
  }, [index, radius]);

  useFrame((state, delta) => {
    if (!mesh.current) return;

    frameCount.current++;
    const time = state.clock.getElapsedTime();

    // Mouse attraction (optimized)
    const mouseInfluenceX = mousePosition.x * 5;
    const mouseInfluenceY = mousePosition.y * 5;

    const dx = mesh.current.position.x - mouseInfluenceX;
    const dy = mesh.current.position.y - mouseInfluenceY;
    const distSq = dx * dx + dy * dy;

    if (distSq < 9) {
      const distance = Math.sqrt(distSq);
      const force = (3 - distance) * 0.01;
      velocity.current.x -= (dx / distance) * force;
      velocity.current.y -= (dy / distance) * force;
    }

    // Collision detection (every 2nd frame)
    if (frameCount.current % 2 === 0) {
      shapePositions.forEach((other, otherIndex) => {
        if (otherIndex === index || !other) return;

        const dx = mesh.current!.position.x - other.position.x;
        const dy = mesh.current!.position.y - other.position.y;
        const distSq = dx * dx + dy * dy;
        const minDistance = radius + other.radius;
        const minDistSq = minDistance * minDistance;

        if (distSq < minDistSq && distSq > 0.01) {
          const distance = Math.sqrt(distSq);
          const overlap = minDistance - distance;
          const pushForce = overlap * 0.5;

          velocity.current.x += (dx / distance) * pushForce;
          velocity.current.y += (dy / distance) * pushForce;

          velocity.current.x += (dx / distance) * 0.02;
          velocity.current.y += (dx / distance) * 0.02;
        }
      });
    }

    mesh.current.position.x += velocity.current.x * speed;
    mesh.current.position.y += velocity.current.y * speed;

    if (Math.abs(mesh.current.position.x) > 5) velocity.current.x *= -0.8;
    if (Math.abs(mesh.current.position.y) > 5) velocity.current.y *= -0.8;

    mesh.current.position.y += Math.cos(time * 0.4 * speed) * 0.002;

    velocity.current.x *= 0.98;
    velocity.current.y *= 0.98;

    if (shapePositions[index]) {
      shapePositions[index].position.copy(mesh.current.position);
      shapePositions[index].velocity = velocity.current;
    }

    mesh.current.rotation.x = time * 0.15 * speed;
    mesh.current.rotation.z = time * 0.2 * speed;
  });

  return (
    <mesh ref={mesh} position={position}>
      <torusGeometry args={[0.4, 0.15, 12, 32]} />
      <meshStandardMaterial
        color="#764ba2"
        wireframe
        transparent
        opacity={0.25}
        emissive="#764ba2"
        emissiveIntensity={0.4}
      />
    </mesh>
  );
}

function FloatingOctahedron({ position, mousePosition, speed, index, radius }: FloatingShapeProps) {
  const mesh = useRef<THREE.Mesh>(null);
  const velocity = useRef({ x: (Math.random() - 0.5) * 0.018, y: (Math.random() - 0.5) * 0.018, z: 0 });
  const frameCount = useRef(0);

  React.useEffect(() => {
    if (!shapePositions[index] && mesh.current) {
      shapePositions[index] = {
        position: mesh.current.position.clone(),
        velocity: velocity.current,
        radius: radius
      };
    }
  }, [index, radius]);

  useFrame((state, delta) => {
    if (!mesh.current) return;

    frameCount.current++;
    const time = state.clock.getElapsedTime();

    const mouseInfluenceX = mousePosition.x * 5;
    const mouseInfluenceY = mousePosition.y * 5;

    const dx = mesh.current.position.x - mouseInfluenceX;
    const dy = mesh.current.position.y - mouseInfluenceY;
    const distSq = dx * dx + dy * dy;

    if (distSq < 9) {
      const distance = Math.sqrt(distSq);
      const force = (3 - distance) * 0.01;
      velocity.current.x -= (dx / distance) * force;
      velocity.current.y -= (dy / distance) * force;
    }

    // Collision detection (every 2nd frame)
    if (frameCount.current % 2 === 0) {
      shapePositions.forEach((other, otherIndex) => {
        if (otherIndex === index || !other) return;

        const dx = mesh.current!.position.x - other.position.x;
        const dy = mesh.current!.position.y - other.position.y;
        const distSq = dx * dx + dy * dy;
        const minDistance = radius + other.radius;
        const minDistSq = minDistance * minDistance;

        if (distSq < minDistSq && distSq > 0.01) {
          const distance = Math.sqrt(distSq);
          const overlap = minDistance - distance;
          const pushForce = overlap * 0.5;

          velocity.current.x += (dx / distance) * pushForce;
          velocity.current.y += (dy / distance) * pushForce;

          velocity.current.x += (dx / distance) * 0.02;
          velocity.current.y += (dy / distance) * 0.02;
        }
      });
    }

    mesh.current.position.x += velocity.current.x * speed;
    mesh.current.position.y += velocity.current.y * speed;

    if (Math.abs(mesh.current.position.x) > 5) velocity.current.x *= -0.8;
    if (Math.abs(mesh.current.position.y) > 5) velocity.current.y *= -0.8;

    mesh.current.position.y += Math.sin(time * 0.6 * speed + 2) * 0.002;

    velocity.current.x *= 0.98;
    velocity.current.y *= 0.98;

    if (shapePositions[index]) {
      shapePositions[index].position.copy(mesh.current.position);
      shapePositions[index].velocity = velocity.current;
    }

    mesh.current.rotation.y = time * 0.25 * speed;
    mesh.current.rotation.z = time * 0.15 * speed;
  });

  return (
    <mesh ref={mesh} position={position}>
      <octahedronGeometry args={[0.45, 0]} />
      <meshStandardMaterial
        color="#667eea"
        wireframe
        transparent
        opacity={0.3}
        emissive="#667eea"
        emissiveIntensity={0.45}
      />
    </mesh>
  );
}

function Rocket({ mousePosition, speed, isFiring, onBreakShape }: {
  mousePosition: { x: number; y: number };
  speed: number;
  isFiring: boolean;
  onBreakShape: (index: number) => void;
}) {
  const group = useRef<THREE.Group>(null);
  const velocity = useRef({ x: 0, y: 0 });
  const targetPosition = useRef({ x: 0, y: 0 });
  const stationaryTimer = useRef(0);
  const orbitAngle = useRef(0);
  const currentRotation = useRef(0);

  useFrame((state, delta) => {
    if (!group.current) return;

    const time = state.clock.getElapsedTime();

    // Smooth target position update (prevents jitter)
    const newTargetX = mousePosition.x * 3;
    const newTargetY = mousePosition.y * 3;
    const smoothing = 0.2;
    targetPosition.current.x += (newTargetX - targetPosition.current.x) * smoothing;
    targetPosition.current.y += (newTargetY - targetPosition.current.y) * smoothing;

    const targetX = targetPosition.current.x;
    const targetY = targetPosition.current.y;

    // Calculate movement delta
    const dx = targetX - group.current.position.x;
    const dy = targetY - group.current.position.y;
    const distanceToTarget = Math.sqrt(dx * dx + dy * dy);

    // Check if mouse is stationary (with timer to prevent rapid switching)
    if (distanceToTarget < 0.05) {
      stationaryTimer.current += delta;
    } else {
      stationaryTimer.current = 0;
    }

    const isStationary = stationaryTimer.current > 0.5;

    if (isFiring) {
      // Firing mode - rocket shoots forward at high speed
      if (distanceToTarget > 0.01) {
        const firingSpeed = 0.3;
        velocity.current.x = (dx / distanceToTarget) * firingSpeed;
        velocity.current.y = (dy / distanceToTarget) * firingSpeed;
      }

      group.current.position.x += velocity.current.x * speed * 60 * delta;
      group.current.position.y += velocity.current.y * speed * 60 * delta;

      // Smooth rotation towards movement direction
      const targetAngle = Math.atan2(velocity.current.y, velocity.current.x) - Math.PI / 2;
      currentRotation.current += ((targetAngle - currentRotation.current + Math.PI) % (Math.PI * 2) - Math.PI) * 0.15;
      group.current.rotation.z = currentRotation.current;
    } else if (isStationary) {
      // Orbit around mouse when stationary
      orbitAngle.current += 0.04 * speed * 60 * delta;
      const orbitRadius = 1.5;

      group.current.position.x = targetX + Math.cos(orbitAngle.current) * orbitRadius;
      group.current.position.y = targetY + Math.sin(orbitAngle.current) * orbitRadius;

      // Smooth rotation towards tangent of orbit
      const targetAngle = orbitAngle.current + Math.PI / 2;
      currentRotation.current += ((targetAngle - currentRotation.current + Math.PI) % (Math.PI * 2) - Math.PI) * 0.1;
      group.current.rotation.z = currentRotation.current;
    } else {
      // Smooth following with frame-rate independence
      const followSpeed = Math.min(0.2 * speed * 60 * delta, 1);
      group.current.position.x += dx * followSpeed;
      group.current.position.y += dy * followSpeed;

      // Smooth rotation towards movement direction
      if (distanceToTarget > 0.01) {
        const targetAngle = Math.atan2(dy, dx) - Math.PI / 2;
        currentRotation.current += ((targetAngle - currentRotation.current + Math.PI) % (Math.PI * 2) - Math.PI) * 0.15;
        group.current.rotation.z = currentRotation.current;
      }
    }

    // Optimized collision detection (only when firing, check every 3rd frame)
    if (isFiring && state.clock.elapsedTime % 0.05 < delta) {
      shapePositions.forEach((shape, index) => {
        if (!shape) return;
        const dx = group.current!.position.x - shape.position.x;
        const dy = group.current!.position.y - shape.position.y;
        const distSq = dx * dx + dy * dy; // Skip sqrt for performance
        const minDistSq = (shape.radius + 0.3) * (shape.radius + 0.3);

        if (distSq < minDistSq) {
          onBreakShape(index);
        }
      });
    }

    // Smooth bobbing animation
    group.current.position.z = -1 + Math.sin(time * 2 * speed) * 0.08;
  });

  const flameScale = isFiring ? 2 : 1;
  const flameIntensity = isFiring ? 2 : 1;

  return (
    <group ref={group}>
      {/* Rocket body - metallic cone */}
      <mesh position={[0, 0, 0]}>
        <coneGeometry args={[0.2, 0.7, 12]} />
        <meshStandardMaterial
          color="#FF6B35"
          emissive="#FF6B35"
          emissiveIntensity={isFiring ? 1 : 0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Body stripes */}
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[0.21, 0.21, 0.1, 12]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.3} />
      </mesh>

      {/* Rocket fins - 3 fins for stability */}
      <mesh position={[0.18, -0.25, 0]} rotation={[0, 0, Math.PI / 6]}>
        <boxGeometry args={[0.2, 0.06, 0.02]} />
        <meshStandardMaterial
          color="#764ba2"
          emissive="#764ba2"
          emissiveIntensity={0.5}
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>
      <mesh position={[-0.18, -0.25, 0]} rotation={[0, 0, -Math.PI / 6]}>
        <boxGeometry args={[0.2, 0.06, 0.02]} />
        <meshStandardMaterial
          color="#764ba2"
          emissive="#764ba2"
          emissiveIntensity={0.5}
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>
      <mesh position={[0, -0.25, -0.18]} rotation={[Math.PI / 6, 0, 0]}>
        <boxGeometry args={[0.2, 0.06, 0.02]} />
        <meshStandardMaterial
          color="#764ba2"
          emissive="#764ba2"
          emissiveIntensity={0.5}
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* Rocket flame - animated */}
      <mesh position={[0, -0.45, 0]} scale={[1, flameScale, 1]}>
        <coneGeometry args={[0.1, 0.4, 8]} />
        <meshStandardMaterial
          color="#FFD700"
          emissive="#FF6B35"
          emissiveIntensity={flameIntensity}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Inner flame core */}
      <mesh position={[0, -0.45, 0]} scale={[0.5, flameScale * 0.8, 0.5]}>
        <coneGeometry args={[0.1, 0.4, 8]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#FFD700"
          emissiveIntensity={flameIntensity * 1.5}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Exhaust glow when firing */}
      {isFiring && (
        <pointLight position={[0, -0.5, 0]} intensity={3} distance={2} color="#FF6B35" />
      )}

      {/* Window - glowing cockpit */}
      <mesh position={[0, 0.2, 0.11]}>
        <circleGeometry args={[0.1, 16]} />
        <meshStandardMaterial
          color="#667eea"
          emissive="#667eea"
          emissiveIntensity={1.2}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Nose cone tip */}
      <mesh position={[0, 0.35, 0]}>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshStandardMaterial
          color="#FFD700"
          emissive="#FFD700"
          emissiveIntensity={0.8}
          metalness={1}
          roughness={0.1}
        />
      </mesh>
    </group>
  );
}

interface ThreeBackgroundProps {
  mousePosition: { x: number; y: number };
  particleColor: string;
  showParticles: boolean;
  showShapes: boolean;
  physicsSpeed: number;
  showRocket: boolean;
  isFiring: boolean;
  isLowPerformance: boolean;
}

const Scene = React.memo(function Scene({ mousePosition, particleColor, showParticles, showShapes, physicsSpeed, showRocket, isFiring, isLowPerformance }: ThreeBackgroundProps) {
  const [brokenShapes, setBrokenShapes] = React.useState<Set<number>>(new Set());

  const handleBreakShape = React.useCallback((index: number) => {
    setBrokenShapes(prev => new Set(prev).add(index));
    // Reset the shape after 2 seconds
    setTimeout(() => {
      setBrokenShapes(prev => {
        const newSet = new Set(prev);
        newSet.delete(index);
        return newSet;
      });
    }, 2000);
  }, []);

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color={particleColor} />

      {showParticles && (
        <ParticleField mousePosition={mousePosition} color={particleColor} speed={physicsSpeed} />
      )}

      {showShapes && (
        <>
          {!brokenShapes.has(0) && <FloatingIcosahedron position={[-3, 0, -2]} mousePosition={mousePosition} speed={physicsSpeed} index={0} radius={0.6} />}
          {!brokenShapes.has(1) && <FloatingTorus position={[3, -1, -3]} mousePosition={mousePosition} speed={physicsSpeed} index={1} radius={0.55} />}
          {!brokenShapes.has(2) && <FloatingOctahedron position={[0, 2, -2.5]} mousePosition={mousePosition} speed={physicsSpeed} index={2} radius={0.55} />}
          {!isLowPerformance && !brokenShapes.has(3) && <FloatingIcosahedron position={[4, 1, -4]} mousePosition={mousePosition} speed={physicsSpeed} index={3} radius={0.6} />}
          {!isLowPerformance && !brokenShapes.has(4) && <FloatingTorus position={[-4, -2, -3.5]} mousePosition={mousePosition} speed={physicsSpeed} index={4} radius={0.55} />}
        </>
      )}

      {showRocket && <Rocket mousePosition={mousePosition} speed={physicsSpeed} isFiring={isFiring} onBreakShape={handleBreakShape} />}
    </>
  );
});

interface ThreeBackgroundPropsMain {
  particleColor: string;
  showParticles: boolean;
  showShapes: boolean;
  physicsSpeed: number;
  showRocket: boolean;
}

export default function ThreeBackground({
  particleColor,
  showParticles,
  showShapes,
  physicsSpeed,
  showRocket,
}: ThreeBackgroundPropsMain) {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = React.useState(false);
  const [isFiring, setIsFiring] = React.useState(false);
  const [isLowPerformance, setIsLowPerformance] = React.useState(false);

  React.useEffect(() => {
    // Performance detection
    const detectPerformance = () => {
      const isMobileDevice = window.innerWidth < 768;
      setIsMobile(isMobileDevice);

      // Detect low performance devices (integrated graphics, low-end laptops)
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') as WebGLRenderingContext | null;

      if (gl) {
        try {
          const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
          if (debugInfo) {
            const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) as string;
            // Check for integrated graphics
            const isIntegrated = /Intel|Integrated|UHD|Iris/i.test(renderer);
            setIsLowPerformance(isIntegrated || isMobileDevice);
          }
        } catch (e) {
          // Fallback if WebGL detection fails
          setIsLowPerformance(isMobileDevice);
        }
      }

      // Also check hardware concurrency (CPU cores) as a fallback
      if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) {
        setIsLowPerformance(true);
      }
    };

    detectPerformance();
    window.addEventListener('resize', detectPerformance);

    // Throttled mouse movement for better performance
    let rafId: number | null = null;
    const handleMouseMove = (event: MouseEvent) => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        setMousePosition({
          x: (event.clientX / window.innerWidth) * 2 - 1,
          y: -(event.clientY / window.innerHeight) * 2 + 1,
        });
        rafId = null;
      });
    };

    const handleClick = () => {
      if (showRocket) {
        setIsFiring(true);
        setTimeout(() => setIsFiring(false), 500);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space' && showRocket) {
        event.preventDefault();
        setIsFiring(true);
        setTimeout(() => setIsFiring(false), 500);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', detectPerformance);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [showRocket]);

  // Adaptive particle count based on device performance
  const particleCount = isMobile ? 500 : isLowPerformance ? 1500 : 3000;

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
        dpr={isMobile ? [0.5, 1] : isLowPerformance ? [0.75, 1.25] : [1, 1.5]}
        gl={{
          antialias: !isLowPerformance,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        performance={{ min: 0.5 }}
      >
        <Scene
          mousePosition={mousePosition}
          particleColor={particleColor}
          showParticles={showParticles}
          showShapes={showShapes}
          physicsSpeed={physicsSpeed}
          showRocket={showRocket}
          isFiring={isFiring}
          isLowPerformance={isLowPerformance}
        />
      </Canvas>
    </div>
  );
}
