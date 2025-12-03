import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import './About.css';

const About: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <div className="about-page">
      <SEO
        title="About"
        description="Blundell Labs was born from years of experience building MVPs the hard way. Now we combine AI-powered development with battle-tested expertise to deliver enterprise-quality apps at startup speed."
        url="/about"
      />

      <motion.div
        className="about-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="about-header" variants={itemVariants}>
          <h1 className="about-title">
            About <span className="highlight">Blundell Labs</span>
          </h1>
          <p className="about-subtitle">
            Enterprise-quality MVPs at startup speed
          </p>
        </motion.div>

        <motion.div className="about-story" variants={itemVariants}>
          <div className="story-section">
            <h2>The Origin Story</h2>
            <p>
              Blundell Labs was born from Jack Blundell after learning the hard way
              just how challenging it can be to create the perfect MVP and scale it up
              without either ripping your hair out learning to code, or breaking the
              bank to get somebody to do it for you.
            </p>
          </div>

          <div className="story-section">
            <h2>Then Everything Changed</h2>
            <p>
              AI arrived. As someone who went to university and trained as a software
              engineer, it was scary. The landscape was shifting beneath everyone's feet.
            </p>
            <p>
              But instead of seeing it as a threat, we saw an opportunity. What if we
              could combine AI-powered development with years of real-world experience
              building and scaling applications? What if we could use these new tools
              alongside our battle-tested processes to create high-quality, scalable
              apps at an incredible pace—and at an even better rate?
            </p>
          </div>

          <div className="story-section">
            <h2>What We Do Now</h2>
            <p>
              Since then, we've helped countless startups build amazing MVPs and
              enterprise-ready solutions at prices that actually make sense. We bring
              the expertise of a senior development team with the efficiency that
              modern AI tools provide.
            </p>
            <p>
              The result? You get production-ready applications that are built to
              scale—without the traditional agency price tag.
            </p>
          </div>
        </motion.div>

        <motion.div className="about-values" variants={itemVariants}>
          <h2>Our Approach</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">⚡</div>
              <h3>Speed Without Compromise</h3>
              <p>
                AI-powered workflows let us move fast, but our engineering
                background ensures we never cut corners on quality.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">🏗️</div>
              <h3>Built to Scale</h3>
              <p>
                Every project is architected with growth in mind. Your MVP
                won't need a complete rewrite when you hit product-market fit.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">💰</div>
              <h3>Fair Pricing</h3>
              <p>
                Our efficiency gains get passed on to you. Enterprise-quality
                development shouldn't require enterprise budgets.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Partnership Mindset</h3>
              <p>
                We succeed when you succeed. That's why we focus on building
                products that actually solve problems for your users.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div className="about-cta" variants={itemVariants}>
          <h2>Ready to Build Something Great?</h2>
          <p>
            Whether you're a startup with a bold idea or an established business
            looking to innovate, we'd love to hear from you.
          </p>
          <a href="/#contact" className="cta-button">
            Start Your Project
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;
