import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Globe, Smartphone, Brain, Cloud, Palette, ArrowRight, Shield, Zap, Users, TrendingUp } from 'lucide-react';
import { services } from '../data/services';
import projectsData from '../data/projects.json';
import SEO from '../components/SEO';
import ProjectShowcase from '../components/ProjectShowcase';

const iconMap: Record<string, React.FC<{ size?: number }>> = {
  Code, Globe, Smartphone, Brain, Cloud, Palette,
};

const HomePage: React.FC = () => {
  // Projects are ordered newest first, so the hero always shows the latest work
  const latestProject = projectsData.projects[0];

  return (
    <>
      <SEO />

      {/* Hero */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              Software Development Company &middot; Cardiff, UK
            </div>

            <h1>
              Custom Software &amp; Apps That Drive <span>Business Growth</span>
            </h1>

            <p className="hero-description">
              Blundell Technologies is a Cardiff-based software development company building
              custom software, web applications and iOS &amp; Android apps for ambitious
              businesses across the UK. Enterprise-grade engineering with transparent pricing.
            </p>

            <div className="hero-cta">
              <Link to="/contact" className="btn btn-primary btn-lg">
                Start a Project
              </Link>
              <Link to="/services" className="btn btn-outline btn-lg">
                Our Services
              </Link>
            </div>

            <div className="hero-stats">
              <div className="hero-stat">
                <h3>12+</h3>
                <p>Platforms Delivered</p>
              </div>
              <div className="hero-stat">
                <h3>5+</h3>
                <p>Years Experience</p>
              </div>
              <div className="hero-stat">
                <h3>Cardiff</h3>
                <p>Based, Serving the UK</p>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <Link to={`/projects/${latestProject.slug}`} className="hero-showcase">
              {latestProject.media.images[1] && (
                <img
                  src={latestProject.media.images[1]}
                  alt=""
                  className="hero-showcase-back"
                  width={1600}
                  height={900}
                />
              )}
              <img
                src={latestProject.media.images[0]}
                alt={`${latestProject.name}: ${latestProject.description_short}`}
                className="hero-showcase-main"
                width={1600}
                height={900}
                fetchPriority="high"
              />
              <span className="hero-showcase-caption">
                <span className="hero-showcase-label">Latest project</span>
                <strong>{latestProject.name}</strong>
                <ArrowRight size={16} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section">
        <div className="section-header">
          <h2>What We Build</h2>
          <p>
            From concept to deployment, we deliver end-to-end software solutions
            tailored to your business objectives.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service) => {
            const Icon = iconMap[service.icon] || Code;
            return (
              <Link
                key={service.slug}
                to={`/services/${service.slug}`}
                className="service-card"
              >
                <div className="service-card-icon">
                  <Icon size={24} />
                </div>
                <h3>{service.name}</h3>
                <p>{service.shortDescription}</p>
                <span className="service-card-arrow">
                  Learn more <ArrowRight size={14} />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Projects / Case Studies */}
      <section className="section section-surface">
        <div className="section-header">
          <h2>Selected Projects</h2>
          <p>
            Real-world applications we have designed, built, and shipped
            across multiple industries and platforms.
          </p>
        </div>

        <ProjectShowcase projects={projectsData.projects} />

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link to="/projects" className="btn btn-outline">
            View All Projects
          </Link>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section">
        <div className="section-header">
          <h2>Why Blundell Technologies</h2>
          <p>
            We combine deep technical expertise with a pragmatic,
            results-driven approach to software development.
          </p>
        </div>

        <div className="values-grid">
          <div className="value-item">
            <div className="value-icon">
              <Shield size={24} />
            </div>
            <h3>Enterprise Quality</h3>
            <p>
              Production-ready code with proper testing, security, and documentation.
              Built to the standards that serious businesses require.
            </p>
          </div>
          <div className="value-item">
            <div className="value-icon">
              <Zap size={24} />
            </div>
            <h3>Fast Delivery</h3>
            <p>
              Modern tooling and streamlined workflows allow us to move quickly
              without cutting corners on quality or reliability.
            </p>
          </div>
          <div className="value-item">
            <div className="value-icon">
              <Users size={24} />
            </div>
            <h3>Partnership Approach</h3>
            <p>
              We work as an extension of your team, with transparent communication
              and regular progress updates throughout every project.
            </p>
          </div>
          <div className="value-item">
            <div className="value-icon">
              <TrendingUp size={24} />
            </div>
            <h3>Built to Scale</h3>
            <p>
              Every solution is architected for growth. Your software will handle
              increased load and new features without requiring a rewrite.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <h2>Ready to Build Something Great?</h2>
        <p>
          Tell us about your project and we will get back to you within 24 hours
          with a clear plan and transparent quote.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/contact" className="btn btn-primary btn-lg">
            Start Your Project
          </Link>
          <Link to="/services" className="btn btn-outline btn-lg">
            Explore Services
          </Link>
        </div>
      </section>
    </>
  );
};

export default HomePage;
