import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import { getServiceBySlug } from '../data/services';
import { getRegionBySlug, regions } from '../data/regions';
import SEO from '../components/SEO';
import { absoluteUrl, breadcrumbList, ORGANIZATION_ID } from '../utils/seo';

const ServiceRegion: React.FC = () => {
  const { serviceSlug, regionSlug } = useParams<{
    serviceSlug: string;
    regionSlug: string;
  }>();
  const service = serviceSlug ? getServiceBySlug(serviceSlug) : undefined;
  const region = regionSlug ? getRegionBySlug(regionSlug) : undefined;

  if (!service || !region) {
    return <Navigate to="/services" replace />;
  }

  // Cardiff has its own landing page; other city pages stay up for visitors but out of search results
  if (region.slug === 'cardiff') {
    return <Navigate to="/app-development-cardiff" replace />;
  }

  const otherRegions = regions.filter((r) => r.slug !== region.slug);

  return (
    <>
      <SEO
        title={`${service.name} in ${region.name}`}
        description={`${service.seoDescription} Serving businesses in ${region.name} and across the UK.`}
        url={`/services/${service.slug}/${region.slug}`}
        noindex
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: `${service.name} in ${region.name}`,
            serviceType: service.name,
            description: service.seoDescription,
            url: absoluteUrl(`/services/${service.slug}/${region.slug}`),
            provider: { '@id': ORGANIZATION_ID },
            areaServed: { '@type': 'City', name: region.name },
          },
          breadcrumbList([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
            { name: service.name, path: `/services/${service.slug}` },
            { name: region.name, path: `/services/${service.slug}/${region.slug}` },
          ]),
        ]}
      />

      <div className="page-header">
        <div className="breadcrumb" style={{ justifyContent: 'center' }}>
          <Link to="/">Home</Link>
          <span className="breadcrumb-separator">/</span>
          <Link to="/services">Services</Link>
          <span className="breadcrumb-separator">/</span>
          <Link to={`/services/${service.slug}`}>{service.name}</Link>
          <span className="breadcrumb-separator">/</span>
          <span>{region.name}</span>
        </div>
        <h1>{service.name} in {region.name}</h1>
        <p>
          Professional {service.name.toLowerCase()} services for businesses
          in {region.name}. Delivered by Blundell Technologies.
        </p>
      </div>

      <div className="service-detail">
        <div className="region-info">
          <p>{region.description}</p>
        </div>

        <div className="service-detail-content">
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '1rem' }}>
            {service.name} for {region.name} Businesses
          </h2>
          {service.longDescription.split('\n\n').map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="service-benefits">
          <h2>What You Get</h2>
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
          <h2>Technologies</h2>
          <div className="tech-tags">
            {service.technologies.map((tech) => (
              <span key={tech} className="tech-tag">{tech}</span>
            ))}
          </div>
        </div>

        {/* Other Regions */}
        <div className="region-links">
          <h2>{service.name} in Other Locations</h2>
          <div className="region-links-grid">
            {otherRegions.map((r) => (
              <Link
                key={r.slug}
                to={`/services/${service.slug}/${r.slug}`}
                className="region-link"
              >
                {r.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <section className="cta-section">
        <h2>Looking for {service.name} in {region.name}?</h2>
        <p>
          Contact us today for a free consultation and transparent quote.
          We typically respond within 24 hours.
        </p>
        <Link to="/contact" className="btn btn-primary btn-lg">
          Get Your Free Quote
        </Link>
      </section>
    </>
  );
};

export default ServiceRegion;
