import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Grid, Check } from 'lucide-react';
import projectsData from '../data/projects.json';
import SEO from '../components/SEO';
import { getTechIcon } from '../utils/iconMapping';
import { absoluteUrl, breadcrumbList, ORGANIZATION_ID } from '../utils/seo';

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
    alts?: string[];
  };
  featureGroups: FeatureGroup[];
}

const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('');
  const [currentImage, setCurrentImage] = useState(0);

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
    setCurrentImage(0);
  }, [project]);

  if (!project) {
    return (
      <div style={{ textAlign: 'center', padding: '10rem 2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>Project Not Found</h1>
        <button className="btn btn-primary" onClick={() => navigate('/projects')}>
          View All Projects
        </button>
      </div>
    );
  }

  const previousProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  const getFeaturesForCategory = (category: string): FeatureGroup[] => {
    return project.featureGroups.filter((group) => group.category === category);
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % project.media.images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) =>
      prev === 0 ? project.media.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="project-detail">
      <SEO
        title={project.name}
        description={project.description_short}
        // Share previews use the original PNG; not every social network renders WebP
        image={project.media.thumbnail.replace(/\.webp$/, '.png')}
        imageAlt={project.media.alts?.[0]}
        url={`/projects/${project.slug}`}
        type="article"
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'CreativeWork',
            name: project.name,
            description: project.description_short,
            url: absoluteUrl(`/projects/${project.slug}`),
            image: project.media.images.map(absoluteUrl),
            creator: { '@id': ORGANIZATION_ID },
            keywords: [...project.categories, ...project.tech].join(', '),
          },
          breadcrumbList([
            { name: 'Home', path: '/' },
            { name: 'Projects', path: '/projects' },
            { name: project.name, path: `/projects/${project.slug}` },
          ]),
        ]}
      />

      <div className="breadcrumb">
        <Link to="/">Home</Link>
        <span className="breadcrumb-separator">/</span>
        <Link to="/projects">Projects</Link>
        <span className="breadcrumb-separator">/</span>
        <span>{project.name}</span>
      </div>

      {/* Header */}
      <div className="project-detail-header">
        <h1>{project.name}</h1>
        <div className="project-categories">
          {project.categories.map((category, index) => (
            <span key={index} className="tag">{category}</span>
          ))}
        </div>
        <p className="project-short-desc">{project.description_short}</p>
      </div>

      {/* Image Carousel */}
      {project.media.images.length > 0 && (
        <div className="project-carousel">
          <div className="carousel-wrapper">
            <img
              src={project.media.images[currentImage]}
              alt={project.media.alts?.[currentImage] ?? `${project.name} screenshot ${currentImage + 1}`}
              className="carousel-image"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            {project.media.images.length > 1 && (
              <>
                <button className="carousel-btn carousel-btn-prev" onClick={prevImage}>
                  <ChevronLeft size={20} />
                </button>
                <button className="carousel-btn carousel-btn-next" onClick={nextImage}>
                  <ChevronRight size={20} />
                </button>
              </>
            )}
          </div>
          {project.media.images.length > 1 && (
            <div className="carousel-dots">
              {project.media.images.map((_, index) => (
                <button
                  key={index}
                  className={`carousel-dot ${index === currentImage ? 'active' : ''}`}
                  onClick={() => setCurrentImage(index)}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Long Description */}
      <div className="project-long-desc">
        {project.description_long.split('\n\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      {/* Technology Stack */}
      <div className="project-tech">
        <h2>Technology Stack</h2>
        <div className="project-tech-grid">
          {project.tech.map((tech) => {
            const TechIcon = getTechIcon(tech);
            return (
              <div key={tech} className="tech-tag" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <TechIcon size={16} />
                {tech}
              </div>
            );
          })}
        </div>
      </div>

      {/* Feature Tabs */}
      <div className="project-features">
        <h2>Features</h2>
        <div className="feature-tabs">
          {project.categories.map((category) => (
            <button
              key={category}
              className={`feature-tab ${activeTab === category ? 'active' : ''}`}
              onClick={() => setActiveTab(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div>
          {getFeaturesForCategory(activeTab).map((group, groupIndex) => (
            <div key={groupIndex} className="feature-group">
              <h3>{group.title}</h3>
              <div className="feature-list">
                {group.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="feature-item">
                    <Check size={16} className="feature-item-icon" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="project-nav">
        {previousProject ? (
          <button
            className="project-nav-btn"
            onClick={() => navigate(`/projects/${previousProject.slug}`)}
          >
            <ChevronLeft size={18} />
            {previousProject.name}
          </button>
        ) : <div />}

        <Link to="/projects" className="project-nav-btn">
          <Grid size={18} />
          All Projects
        </Link>

        {nextProject ? (
          <button
            className="project-nav-btn"
            onClick={() => navigate(`/projects/${nextProject.slug}`)}
          >
            {nextProject.name}
            <ChevronRight size={18} />
          </button>
        ) : <div />}
      </div>
    </div>
  );
};

export default ProjectDetail;
