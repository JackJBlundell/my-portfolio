import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Grid } from 'lucide-react';
import projectsData from '../data/projects.json';
import ImageCarousel from '../components/ImageCarousel';
import SEO from '../components/SEO';
import { getFeatureIcon, getTechIcon } from '../utils/iconMapping';
import './ProjectDetail.css';

interface FeatureGroup {
  title: string;
  category: string;
  features: string[];
}

interface Project {
  id: string;
  slug: string;
  name: string;
  description_short: string;
  description_long: string;
  tech: string[];
  categories: string[];
  media: {
    thumbnail: string;
    images: string[];
  };
  featureGroups: FeatureGroup[];
}

const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('');

  const projects: Project[] = projectsData.projects;
  const project = projects.find((p) => p.slug === slug);
  const currentIndex = projects.findIndex((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (project && project.categories.length > 0) {
      setActiveTab(project.categories[0]);
    }
  }, [project]);

  if (!project) {
    return (
      <div className="project-detail-error">
        <h1>Project Not Found</h1>
        <button onClick={() => navigate('/projects')}>
          View All Projects
        </button>
      </div>
    );
  }

  const previousProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  // Group features by category
  const getFeaturesForCategory = (category: string): FeatureGroup[] => {
    return project.featureGroups.filter((group) =>
      group.category === category
    );
  };

  return (
    <motion.div
      className="project-detail"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <SEO
        title={project.name}
        description={project.description_short}
        image={project.media.thumbnail}
        url={`/projects/${project.slug}`}
        type="article"
      />

      {/* Corner Navigation */}
      <div className="corner-nav">
        {previousProject && (
          <motion.button
            className="corner-nav-button corner-nav-prev"
            onClick={() => navigate(`/projects/${previousProject.slug}`)}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring' as const }}
            whileHover={{ scale: 1.05, x: -5 }}
          >
            <ChevronLeft size={20} />
            <span>Previous</span>
          </motion.button>
        )}

        {nextProject && (
          <motion.button
            className="corner-nav-button corner-nav-next"
            onClick={() => navigate(`/projects/${nextProject.slug}`)}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring' as const }}
            whileHover={{ scale: 1.05, x: 5 }}
          >
            <span>Next</span>
            <ChevronRight size={20} />
          </motion.button>
        )}
      </div>

      {/* Hero Section */}
      <motion.div
        className="project-hero"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="project-detail-title">{project.name}</h1>

        <motion.div
          className="project-categories-hero"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {project.categories.map((category, index) => (
            <motion.span
              key={index}
              className="category-pill-hero"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: 0.3 + index * 0.05,
                type: 'spring' as const,
                stiffness: 200,
              }}
            >
              {category}
            </motion.span>
          ))}
        </motion.div>

        <motion.p
          className="project-description-short"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {project.description_short}
        </motion.p>
      </motion.div>

      {/* Image Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <ImageCarousel images={project.media.images} projectName={project.name} />
      </motion.div>

      {/* Long Description */}
      <motion.div
        className="project-description-long"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {project.description_long.split('\n\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </motion.div>

      {/* Technology Stack */}
      <motion.div
        className="tech-stack-section"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="section-heading">Technology Stack</h2>
        <div className="tech-grid">
          {project.tech.map((tech, index) => {
            const TechIcon = getTechIcon(tech);
            return (
              <motion.div
                key={index}
                className="tech-item"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
              >
                <TechIcon size={28} className="tech-icon" />
                <span className="tech-name">{tech}</span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Tabs Section */}
      <motion.div
        className="tabs-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="tabs-header">
          {project.categories.map((category) => (
            <motion.button
              key={category}
              className={`tab-button-detail ${activeTab === category ? 'active' : ''}`}
              onClick={() => setActiveTab(category)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {category}
              {activeTab === category && (
                <motion.div
                  className="tab-underline"
                  layoutId="activeTabUnderline"
                  transition={{ type: 'spring' as const, stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="tab-content"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {getFeaturesForCategory(activeTab).map((group, groupIndex) => (
              <motion.div
                key={groupIndex}
                className="feature-group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: groupIndex * 0.1 }}
              >
                <h3 className="feature-group-title">{group.title}</h3>
                <div className="features-list">
                  {group.features.map((feature, featureIndex) => {
                    const FeatureIcon = getFeatureIcon(feature);
                    return (
                      <motion.div
                        key={featureIndex}
                        className="feature-item"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (groupIndex * 0.1) + (featureIndex * 0.03) }}
                      >
                        <motion.div
                          className="feature-icon-wrapper"
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          transition={{
                            delay: (groupIndex * 0.1) + (featureIndex * 0.03) + 0.1,
                            type: 'spring' as const,
                          }}
                        >
                          <FeatureIcon size={20} className="feature-icon" />
                        </motion.div>
                        <span className="feature-text">{feature}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Bottom Navigation */}
      <motion.div
        className="bottom-nav"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {previousProject && (
          <motion.button
            className="bottom-nav-button"
            onClick={() => navigate(`/projects/${previousProject.slug}`)}
            whileHover={{ scale: 1.02, x: -5 }}
          >
            <ChevronLeft size={24} />
            <div className="bottom-nav-content">
              <span className="bottom-nav-label">Previous Project</span>
              <span className="bottom-nav-title">{previousProject.name}</span>
            </div>
          </motion.button>
        )}

        <motion.button
          className="bottom-nav-button bottom-nav-all"
          onClick={() => navigate('/projects')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Grid size={24} />
          <span>All Projects</span>
        </motion.button>

        {nextProject && (
          <motion.button
            className="bottom-nav-button"
            onClick={() => navigate(`/projects/${nextProject.slug}`)}
            whileHover={{ scale: 1.02, x: 5 }}
          >
            <div className="bottom-nav-content">
              <span className="bottom-nav-label">Next Project</span>
              <span className="bottom-nav-title">{nextProject.name}</span>
            </div>
            <ChevronRight size={24} />
          </motion.button>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ProjectDetail;
