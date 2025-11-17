import React from 'react';
import { motion } from 'framer-motion';
import './Skills.css';

interface SkillCategory {
  title: string;
  skills: string[];
  icon: string;
}

const Skills: React.FC = () => {
  const skillCategories: SkillCategory[] = [
    {
      title: 'App Development',
      icon: '📱',
      skills: ['React.js', 'React Native', 'TypeScript', 'JavaScript', 'Expo'],
    },
    {
      title: 'Backend Functions',
      icon: '⚡',
      skills: ['Firebase Functions', 'AWS Lambda', 'Node.js', 'Express', 'REST APIs'],
    },
    {
      title: 'Database',
      icon: '🗄️',
      skills: [
        'NoSQL: Firebase, MongoDB, DynamoDB',
        'SQL: PostgreSQL, MySQL, SQLite',
      ],
    },
    {
      title: 'Authentication & Storage',
      icon: '🔐',
      skills: [
        'Firebase Auth',
        'AWS Cognito',
        'Auth0',
        'AWS S3',
        'Firebase Storage',
      ],
    },
    {
      title: 'Deployment',
      icon: '🚀',
      skills: [
        'Vercel',
        'AWS Amplify',
        'App Store & Play Store',
        'Expo EAS',
        'Docker',
      ],
    },
    {
      title: 'SEO & Analytics',
      icon: '📊',
      skills: [
        'Google Analytics',
        'SEO Optimization',
        'Performance Monitoring',
        'A/B Testing',
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
      },
    },
  };

  return (
    <section className="skills" id="skills">
      <div className="skills-container">
        <motion.div
          className="skills-header"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            Tech Stack & <span className="highlight">Expertise</span>
          </h2>
          <p className="section-subtitle">
            Full-stack capabilities to bring your vision to life
          </p>
        </motion.div>

        <motion.div
          className="skills-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              className="skill-card"
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
            >
              <div className="skill-icon">{category.icon}</div>
              <h3 className="skill-title">{category.title}</h3>
              <ul className="skill-list">
                {category.skills.map((skill, skillIndex) => (
                  <li key={skillIndex} className="skill-item">
                    <span className="skill-bullet">▸</span>
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
