import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Globe, Smartphone, Brain, Cloud, Palette, ArrowRight } from 'lucide-react';
import { services } from '../data/services';
import SEO from '../components/SEO';

const iconMap: Record<string, React.FC<{ size?: number }>> = {
  Code, Globe, Smartphone, Brain, Cloud, Palette,
};

const ServicesPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Services"
        description="Blundell Technologies offers custom software development, web applications, mobile apps, AI solutions, cloud infrastructure, and UI/UX design for businesses across the UK."
        url="/services"
      />

      <div className="page-header">
        <h1>Our Services</h1>
        <p>
          End-to-end software development services for businesses that need
          reliable, scalable, and well-engineered solutions.
        </p>
      </div>

      <div className="section">
        <div className="services-list">
          {services.map((service) => {
            const Icon = iconMap[service.icon] || Code;
            return (
              <Link
                key={service.slug}
                to={`/services/${service.slug}`}
                className="service-list-card"
              >
                <div className="service-card-icon">
                  <Icon size={24} />
                </div>
                <div className="service-list-info">
                  <h3>{service.name}</h3>
                  <p>{service.shortDescription}</p>
                </div>
                <ArrowRight size={20} style={{ color: 'var(--color-text-muted)' }} />
              </Link>
            );
          })}
        </div>
      </div>

      {/* Areas We Serve */}
      <section className="section section-surface">
        <div className="section-header">
          <h2>Based in Cardiff, Serving the UK</h2>
          <p>
            We meet businesses across Cardiff and South Wales in person, and work remotely
            with organisations throughout the rest of the UK.
          </p>
        </div>

        <div style={{ textAlign: 'center' }}>
          <Link to="/app-development-cardiff" className="btn btn-outline">
            App Developers in Cardiff <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="cta-section">
        <h2>Not Sure What You Need?</h2>
        <p>
          Get in touch and we will help you figure out the right approach for
          your project. No commitment, no pressure.
        </p>
        <Link to="/contact" className="btn btn-primary btn-lg">
          Start a Conversation
        </Link>
      </section>
    </>
  );
};

export default ServicesPage;
