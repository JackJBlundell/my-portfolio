import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import { getServiceBySlug, services } from '../data/services';
import SEO from '../components/SEO';
import { absoluteUrl, breadcrumbList, ORGANIZATION_ID } from '../utils/seo';

const ServiceDetail: React.FC = () => {
  const { serviceSlug } = useParams<{ serviceSlug: string }>();
  const service = serviceSlug ? getServiceBySlug(serviceSlug) : undefined;

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const otherServices = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <SEO
        title={service.seoTitle}
        description={service.seoDescription}
        url={`/services/${service.slug}`}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: service.name,
            serviceType: service.name,
            description: service.seoDescription,
            url: absoluteUrl(`/services/${service.slug}`),
            provider: { '@id': ORGANIZATION_ID },
            areaServed: { '@type': 'Country', name: 'United Kingdom' },
          },
          breadcrumbList([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
            { name: service.name, path: `/services/${service.slug}` },
          ]),
        ]}
      />

      <div className="page-header">
        <div className="breadcrumb" style={{ justifyContent: 'center' }}>
          <Link to="/">Home</Link>
          <span className="breadcrumb-separator">/</span>
          <Link to="/services">Services</Link>
          <span className="breadcrumb-separator">/</span>
          <span>{service.name}</span>
        </div>
        <h1>{service.name}</h1>
        <p>{service.shortDescription}</p>
      </div>

      <div className="service-detail">
        <div className="service-detail-content">
          {service.longDescription.split('\n\n').map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="service-benefits">
          <h2>Key Benefits</h2>
          <ul className="benefits-list">
            {service.benefits.map((benefit, i) => (
              <li key={i}>
                <span className="benefit-check">
                  <Check size={14} />
                </span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        <div className="service-technologies">
          <h2>Technologies We Use</h2>
          <div className="tech-tags">
            {service.technologies.map((tech) => (
              <span key={tech} className="tech-tag">{tech}</span>
            ))}
          </div>
        </div>

        {/* Areas We Serve */}
        <div className="region-links">
          <h2>Areas We Serve</h2>
          <div className="region-info">
            <p>
              We are based in Cardiff and work with businesses across South Wales, including
              Caerphilly, Newport and Swansea, and remotely with organisations throughout the
              rest of the UK. See our <Link to="/app-development-cardiff">app developers in Cardiff</Link> page
              for local case studies and FAQs.
            </p>
          </div>
        </div>

        {/* Other Services */}
        <div style={{ marginTop: '3rem' }}>
          <h2 style={{ fontSize: '1.625rem', marginBottom: '1.5rem', color: 'var(--color-text)' }}>
            Other Services
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {otherServices.map((s) => (
              <Link
                key={s.slug}
                to={`/services/${s.slug}`}
                className="region-link"
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                {s.name}
                <ArrowRight size={16} />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <section className="cta-section">
        <h2>Interested in {service.name}?</h2>
        <p>
          Tell us about your project and we will provide a clear plan
          and transparent quote within 24 hours.
        </p>
        <Link to="/contact" className="btn btn-primary btn-lg">
          Get a Free Quote
        </Link>
      </section>
    </>
  );
};

export default ServiceDetail;
