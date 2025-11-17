import React from 'react';
import { motion } from 'framer-motion';
import './MVPSection.css';

const MVPSection: React.FC = () => {
  const features = [
    {
      icon: '💰',
      title: 'Budget-Friendly',
      description: 'MVPs starting from $900 without compromising on quality',
    },
    {
      icon: '🎯',
      title: 'Client-First Approach',
      description: 'Your needs drive every decision, from design to deployment',
    },
    {
      icon: '📱',
      title: 'Cross-Platform',
      description: 'One codebase, multiple platforms - iOS, Android, and Web',
    },
    {
      icon: '⚡',
      title: 'Rapid Development',
      description: 'Fast turnaround without sacrificing code quality or UX',
    },
  ];

  const priceRanges = [
    {
      range: '$900 - $3,000',
      title: 'Simple MVP',
      features: [
        'Single platform (iOS, Android, or Web)',
        'Core features only',
        'Basic backend integration',
        'Standard UI components',
      ],
    },
    {
      range: '$3,000 - $6,500',
      title: 'Standard MVP',
      features: [
        'Cross-platform (iOS + Android or Web)',
        'Multiple core features',
        'Advanced backend & database',
        'Custom UI/UX design',
        'Authentication & user management',
      ],
      highlighted: true,
    },
    {
      range: '$6,500 - $10,000+',
      title: 'Premium MVP',
      features: [
        'Full cross-platform (iOS + Android + Web)',
        'Complex feature sets',
        'Advanced backend architecture',
        'Custom animations & interactions',
        'Third-party integrations',
        'Analytics & monitoring',
      ],
    },
  ];

  return (
    <section className="mvp-section" id="pricing">
      <div className="mvp-container">
        <motion.div
          className="mvp-header"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            MVP Without <span className="highlight">Breaking the Bank</span>
          </h2>
          <p className="section-subtitle">
            Transform your idea into reality with flexible, client-focused solutions
          </p>
        </motion.div>

        <div className="mvp-features">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="mvp-feature-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="pricing-cards"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {priceRanges.map((tier, index) => (
            <motion.div
              key={index}
              className={`pricing-card ${tier.highlighted ? 'highlighted' : ''}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -10 }}
            >
              {tier.highlighted && (
                <div className="popular-badge">Most Popular</div>
              )}
              <div className="pricing-header">
                <h3 className="pricing-title">{tier.title}</h3>
                <div className="pricing-range">{tier.range}</div>
              </div>
              <ul className="pricing-features">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="pricing-feature">
                    <span className="feature-check">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="pricing-cta">
                Get Started
              </a>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mvp-cta-section"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="cta-title">
            Ready to bring your vision to life?
          </h3>
          <p className="cta-description">
            Every project is unique. Let's discuss your specific needs and find
            the perfect solution for your budget.
          </p>
          <a href="#contact" className="cta-button-large">
            Schedule a Free Consultation
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default MVPSection;
