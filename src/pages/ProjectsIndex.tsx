import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import projectsData from '../data/projects.json';
import SEO from '../components/SEO';
import './ProjectsIndex.css';

interface Project {
  id: string;
  slug: string;
  name: string;
  description_short: string;
  categories: string[];
  media: {
    thumbnail: string;
    images: string[];
  };
}

const ProjectsIndex: React.FC = () => {
  const navigate = useNavigate();
  const projects: Project[] = projectsData.projects;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <div className="projects-index">
      <SEO
        title="Projects"
        description="Explore my portfolio of cross-platform applications, backend systems, and innovative solutions built with React, React Native, and modern technologies."
        url="/projects"
      />
      <motion.div
        className="projects-index-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="projects-index-title">
          All <span className="highlight">Projects</span>
        </h1>
        <p className="projects-index-subtitle">
          Explore my portfolio of cross-platform applications, backend systems, and innovative solutions
        </p>
      </motion.div>

      <motion.div
        className="projects-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {projects.map((project) => (
          <motion.div
            key={project.id}
            className="project-card-index"
            variants={cardVariants}
            whileHover={{
              scale: 1.03,
              transition: { duration: 0.2 },
            }}
            onClick={() => navigate(`/projects/${project.slug}`)}
          >
            <div className="project-card-image-wrapper">
              <img
                src={project.media.thumbnail}
                alt={project.name}
                className="project-card-image"
                onError={(e) => {
                  e.currentTarget.src = `https://via.placeholder.com/600x400/0a0a0a/ff6b35?text=${encodeURIComponent(project.name)}`;
                }}
              />
              <div className="project-card-overlay">
                <span className="view-details">View Details →</span>
              </div>
            </div>

            <div className="project-card-content">
              <h2 className="project-card-title">{project.name}</h2>
              <p className="project-card-description">
                {project.description_short}
              </p>

              <div className="project-card-categories">
                {project.categories.slice(0, 3).map((category, index) => (
                  <motion.span
                    key={index}
                    className="category-pill"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                  >
                    {category}
                  </motion.span>
                ))}
                {project.categories.length > 3 && (
                  <span className="category-pill more">
                    +{project.categories.length - 3}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ProjectsIndex;
