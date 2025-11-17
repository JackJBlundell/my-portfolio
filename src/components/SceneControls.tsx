import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './SceneControls.css';

export interface ScenePreset {
  name: string;
  particleColor: string;
  backgroundColor: string;
  description: string;
}

interface SceneControlsProps {
  isOpen: boolean;
  onToggle: () => void;
  particleColor: string;
  onColorChange: (color: string) => void;
  showParticles: boolean;
  onParticlesToggle: () => void;
  showShapes: boolean;
  onShapesToggle: () => void;
  showRocket: boolean;
  onRocketToggle: () => void;
  physicsSpeed: number;
  onSpeedChange: (speed: number) => void;
  onPresetChange: (preset: ScenePreset) => void;
}

const SceneControls: React.FC<SceneControlsProps> = ({
  isOpen,
  onToggle,
  particleColor,
  onColorChange,
  showParticles,
  onParticlesToggle,
  showShapes,
  onShapesToggle,
  showRocket,
  onRocketToggle,
  physicsSpeed,
  onSpeedChange,
  onPresetChange,
}) => {
  const presets: ScenePreset[] = [
    {
      name: 'Nebula',
      particleColor: '#FF00FF',
      backgroundColor: 'radial-gradient(circle at 30% 50%, rgba(255, 0, 255, 0.3), transparent), radial-gradient(circle at 70% 50%, rgba(0, 255, 255, 0.3), transparent)',
      description: 'Cosmic purple & cyan'
    },
    {
      name: 'Matrix',
      particleColor: '#00FF00',
      backgroundColor: 'radial-gradient(circle at 50% 50%, rgba(0, 255, 0, 0.2), transparent)',
      description: 'Digital green vibes'
    },
    {
      name: 'Synthwave',
      particleColor: '#FF1493',
      backgroundColor: 'linear-gradient(180deg, rgba(255, 20, 147, 0.3) 0%, rgba(148, 0, 211, 0.3) 100%)',
      description: 'Retro pink & purple'
    },
  ];

  const colors = [
    { name: 'Orange', value: '#FF6B35' },
    { name: 'Purple', value: '#764ba2' },
    { name: 'Blue', value: '#667eea' },
    { name: 'Cyan', value: '#00D4FF' },
    { name: 'Pink', value: '#FF0080' },
    { name: 'Green', value: '#00FF88' },
  ];

  return (
    <>
      <motion.button
        className="controls-toggle"
        onClick={onToggle}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        ⚙️
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="scene-controls"
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Presets */}
            <div className="icon-group">
              {presets.map((preset) => (
                <motion.button
                  key={preset.name}
                  className="icon-btn"
                  onClick={() => onPresetChange(preset)}
                  title={`${preset.name}: ${preset.description}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {preset.name === 'Nebula' && '🌌'}
                  {preset.name === 'Matrix' && '💚'}
                  {preset.name === 'Synthwave' && '🌆'}
                </motion.button>
              ))}
            </div>

            {/* Toggle icons */}
            <div className="icon-group">
              <motion.button
                className={`icon-btn ${showParticles ? 'active' : ''}`}
                onClick={onParticlesToggle}
                title="Particles"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ✨
              </motion.button>

              <motion.button
                className={`icon-btn ${showShapes ? 'active' : ''}`}
                onClick={onShapesToggle}
                title="3D Shapes"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                🔷
              </motion.button>

              <motion.button
                className={`icon-btn ${showRocket ? 'active' : ''}`}
                onClick={onRocketToggle}
                title="Rocket"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                🚀
              </motion.button>
            </div>

            {/* Speed slider */}
            <div className="icon-group">
              <div className="speed-control">
                <span className="speed-icon" title="Physics Speed">⚡</span>
                <input
                  type="range"
                  min="0.5"
                  max="3"
                  step="0.5"
                  value={physicsSpeed}
                  onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
                  className="speed-slider"
                />
                <span className="speed-value">{physicsSpeed}x</span>
              </div>
            </div>

            {/* Color picker */}
            <div className="icon-group">
              <div className="color-picker">
                {colors.map((color) => (
                  <motion.button
                    key={color.value}
                    className={`color-btn ${particleColor === color.value ? 'active' : ''}`}
                    style={{ background: color.value }}
                    onClick={() => onColorChange(color.value)}
                    title={color.name}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SceneControls;
