import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ThreeBackground from './ThreeBackground';
import MagneticButton from './MagneticButton';
import SceneControls, { ScenePreset } from './SceneControls';
import './Hero.css';

const Hero: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [controlsOpen, setControlsOpen] = useState(false);
  const [particleColor, setParticleColor] = useState('#FF6B35');
  const [showParticles, setShowParticles] = useState(true);
  const [showShapes, setShowShapes] = useState(true);
  const [showRocket, setShowRocket] = useState(false);
  const [physicsSpeed, setPhysicsSpeed] = useState(1);
  const [backgroundGradient, setBackgroundGradient] = useState('');

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handlePresetChange = (preset: ScenePreset) => {
    setParticleColor(preset.particleColor);
    setBackgroundGradient(preset.backgroundColor);
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const floatingAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 3,
      repeat: Infinity as number,
      ease: 'easeInOut' as const,
    },
  };

  return (
    <section className="hero" id="hero">
      <ThreeBackground
        particleColor={particleColor}
        showParticles={showParticles}
        showShapes={showShapes}
        showRocket={showRocket}
        physicsSpeed={physicsSpeed}
      />

      <SceneControls
        isOpen={controlsOpen}
        onToggle={() => setControlsOpen(!controlsOpen)}
        particleColor={particleColor}
        onColorChange={setParticleColor}
        showParticles={showParticles}
        onParticlesToggle={() => setShowParticles(!showParticles)}
        showShapes={showShapes}
        onShapesToggle={() => setShowShapes(!showShapes)}
        showRocket={showRocket}
        onRocketToggle={() => setShowRocket(!showRocket)}
        physicsSpeed={physicsSpeed}
        onSpeedChange={setPhysicsSpeed}
        onPresetChange={handlePresetChange}
      />

      <div className="hero-background" style={{ background: backgroundGradient || 'transparent' }}>
        <motion.div
          className="gradient-orb orb-1"
          animate={{
            x: mousePosition.x * 0.5,
            y: mousePosition.y * 0.5,
          }}
          transition={{ type: 'spring', stiffness: 50, damping: 20 }}
        />
        <motion.div
          className="gradient-orb orb-2"
          animate={{
            x: mousePosition.x * -0.3,
            y: mousePosition.y * -0.3,
          }}
          transition={{ type: 'spring', stiffness: 50, damping: 20 }}
        />
        <motion.div
          className="gradient-orb orb-3"
          animate={{
            x: mousePosition.x * 0.4,
            y: mousePosition.y * -0.4,
          }}
          transition={{ type: 'spring', stiffness: 50, damping: 20 }}
        />
      </div>

      <motion.div
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="hero-badge" variants={itemVariants}>
          <span className="badge-dot"></span>
          Available for Freelance Projects
        </motion.div>

        <motion.h1
          className="hero-title"
          variants={itemVariants}
        >
          Jack Blundell
        </motion.h1>

        <motion.div className="hero-subtitle" variants={itemVariants}>
          <span className="gradient-text">React.js</span>
          <span className="separator">|</span>
          <span className="gradient-text">React Native</span>
          <span className="separator">|</span>
          <span className="gradient-text">App Developer</span>
        </motion.div>

        <motion.p className="hero-tagline" variants={itemVariants}>
          Passionate about making{' '}
          <span className="emphasis">f*cking amazing technology</span>
        </motion.p>

        <motion.p className="hero-description" variants={itemVariants}>
          Your go-to developer for turning MVP ideas into reality.
          <br />
          From concept to launch, I build cross-platform experiences that users
          love.
        </motion.p>

        <motion.div className="hero-cta" variants={itemVariants}>
          <MagneticButton href="#contact" className="cta-button primary">
            Let's Build Something
          </MagneticButton>
          <MagneticButton href="#projects" className="cta-button secondary">
            View My Work
          </MagneticButton>
        </motion.div>

        <motion.div
          className="hero-scroll-indicator"
          animate={floatingAnimation}
        >
          <div className="scroll-arrow"></div>
          <span>Scroll to explore</span>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
