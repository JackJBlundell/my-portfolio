import React from 'react';
import { Link } from 'react-router-dom';
import projectsData from '../data/projects.json';
import SEO from '../components/SEO';
import ProjectShowcase from '../components/ProjectShowcase';

const ProjectsIndex: React.FC = () => {
  return (
    <>
      <SEO
        title="Projects"
        description="Explore our portfolio of cross-platform applications, web platforms, and software solutions built for real-world businesses and organisations."
        url="/projects"
      />

      <div className="page-header">
        <h1>Our Projects</h1>
        <p>
          Real-world applications we have designed, built, and shipped
          across multiple industries and platforms.
        </p>
      </div>

      <section className="section">
        <ProjectShowcase projects={projectsData.projects} />
      </section>

      <section className="cta-section">
        <h2>Want to See Your Project Here?</h2>
        <p>
          We would love to help you build something great.
          Get in touch to discuss your project.
        </p>
        <Link to="/contact" className="btn btn-primary btn-lg">
          Start Your Project
        </Link>
      </section>
    </>
  );
};

export default ProjectsIndex;
