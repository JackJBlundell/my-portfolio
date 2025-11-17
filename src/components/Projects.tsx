import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import projectsData from '../data/projects.json';
import './Projects.css';

interface Project {
  id: string;
  slug: string;
  name: string;
  description_short: string;
  categories: string[];
  media: {
    thumbnail: string;
  };
}

const Projects: React.FC = () => {
  const projects: Project[] = projectsData.projects.slice(0, 3);

  return (
    <section className="projects" id="projects">
      <div className="projects-container">
        <motion.div
          className="projects-header"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            Featured <span className="highlight">Projects</span>
          </h2>
          <p className="section-subtitle">
            Explore some of my recent cross-platform applications and full-stack solutions
          </p>
        </motion.div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <Link
              key={project.id}
              to={`/projects/${project.slug}`}
              className="project-card-link"
            >
              <motion.div
                className="project-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="project-image-wrapper">
                  <img
                    src={project.media.thumbnail}
                    alt={project.name}
                    className="project-image"
                    onError={(e) => {
                      e.currentTarget.src = `https://via.placeholder.com/600x400/0a0a0a/ff6b35?text=${encodeURIComponent(project.name)}`;
                    }}
                  />
                  <div className="project-overlay">
                    <span className="view-project">View Project →</span>
                  </div>
                </div>
                <div className="project-info">
                  <div className="project-category">
                    {project.categories[0]}
                  </div>
                  <h3 className="project-title">{project.name}</h3>
                  <p className="project-description">{project.description_short}</p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        <motion.div
          className="view-all-projects"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Link to="/projects" className="view-all-button">
            View All Projects →
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
