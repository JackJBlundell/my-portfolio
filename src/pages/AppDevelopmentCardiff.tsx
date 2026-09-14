import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import projectsData from '../data/projects.json';
import { services } from '../data/services';
import SEO from '../components/SEO';
import { absoluteUrl, breadcrumbList, ORGANIZATION_ID } from '../utils/seo';

const PAGE_PATH = '/app-development-cardiff';

const AREAS = ['Cardiff', 'Caerphilly', 'Newport', 'Swansea', 'Bristol'];

const FEATURED_SERVICE_SLUGS = [
  'mobile-app-development',
  'web-application-development',
  'custom-software-development',
  'ai-machine-learning',
];

const PROCESS_STEPS = [
  {
    title: '1. Discovery',
    text: 'We learn how your business works, who will use the app and what success looks like, then agree scope, cost and timeline up front.',
  },
  {
    title: '2. Design',
    text: 'User flows, wireframes and interface designs you can click through and give feedback on before development starts.',
  },
  {
    title: '3. Build',
    text: 'Your app and any web console or backend are built in short cycles, with regular progress updates and test builds on your own phone.',
  },
  {
    title: '4. Launch & Support',
    text: 'We handle App Store and Google Play releases, then look after updates, monitoring and new features once you are live.',
  },
];

const FAQS = [
  {
    question: 'How much does it cost to build an app in Cardiff?',
    answer:
      'It depends on what the app needs to do: the number of screens and user roles, whether it needs a web dashboard or customer portal, integrations with systems you already use, and whether it must work offline. After a free consultation we give you a clear, itemised quote, usually within 24 hours, so you know the cost before any work starts.',
  },
  {
    question: 'How long does it take to build an app?',
    answer:
      'A focused first version with the core features can often launch within a few months, while larger platforms with several apps and portals take longer. We agree the scope and a realistic timeline with you before development starts, and you get regular progress updates throughout.',
  },
  {
    question: 'Do you build apps for both iPhone and Android?',
    answer:
      'Yes. We build native iOS apps in Swift, native Android apps in Kotlin, and cross-platform apps in React Native that run on both from a single codebase. We recommend the approach that best fits your features and budget.',
  },
  {
    question: 'Can the app work with our existing systems?',
    answer:
      'Yes. We connect apps to existing databases, APIs and third-party services such as payments, mapping and sign-in, and we can build web consoles and customer portals that share the same data as your app.',
  },
  {
    question: 'Do you provide support after launch?',
    answer:
      'Yes. We can look after hosting, monitoring, operating system updates and new features once your app is live, so it keeps working as your business grows.',
  },
  {
    question: 'Can we meet in person?',
    answer:
      'Yes. We are based in Cardiff and happy to meet clients in person across Cardiff and South Wales, as well as working remotely with businesses anywhere in the UK.',
  },
  {
    question: 'How do you handle UK GDPR?',
    answer:
      'We design with UK GDPR in mind from the start: collecting only the data you need, controlling who can access it and hosting it securely. Safentia, for example, keeps each organisation\'s data isolated and hosts it in the EU.',
  },
];

const AppDevelopmentCardiff: React.FC = () => {
  const safentia = projectsData.projects.find((p) => p.slug === 'safentia');
  const featuredServices = services.filter((s) => FEATURED_SERVICE_SLUGS.includes(s.slug));

  return (
    <>
      <SEO
        title="App Developers Cardiff & South Wales"
        description="App and software developers based in Cardiff. We built Safentia, a fire risk assessment app and portal, for Firerite in Caerphilly."
        url={PAGE_PATH}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'ProfessionalService',
            '@id': absoluteUrl(`${PAGE_PATH}#business`),
            name: 'Blundell Technologies',
            url: absoluteUrl(PAGE_PATH),
            image: absoluteUrl('/og-image.jpg'),
            logo: absoluteUrl('/img/brand/logo-on-light.png'),
            email: 'jackjblundell@gmail.com',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Cardiff',
              addressRegion: 'Wales',
              addressCountry: 'GB',
            },
            areaServed: [
              ...AREAS.map((name) => ({ '@type': 'City', name })),
              { '@type': 'Country', name: 'United Kingdom' },
            ],
            parentOrganization: { '@id': ORGANIZATION_ID },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'App Development in Cardiff',
            serviceType: 'Mobile app development',
            url: absoluteUrl(PAGE_PATH),
            provider: { '@id': ORGANIZATION_ID },
            areaServed: AREAS.map((name) => ({ '@type': 'City', name })),
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQS.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: { '@type': 'Answer', text: faq.answer },
            })),
          },
          breadcrumbList([
            { name: 'Home', path: '/' },
            { name: 'App Developers Cardiff', path: PAGE_PATH },
          ]),
        ]}
      />

      <div className="page-header">
        <div className="breadcrumb" style={{ justifyContent: 'center' }}>
          <Link to="/">Home</Link>
          <span className="breadcrumb-separator">/</span>
          <span>App Developers Cardiff</span>
        </div>
        <h1>App Developers in Cardiff &amp; South Wales</h1>
        <p>
          Cardiff-based app and software developers building iOS, Android and web
          applications for businesses across South Wales and the UK.
        </p>
      </div>

      <div className="service-detail">
        <div className="service-detail-content">
          <p>
            Blundell Technologies is a software development company based in Cardiff. We design
            and build mobile apps for iPhone and Android, the web consoles and customer portals
            that sit alongside them, and the secure cloud backends that keep everything in sync.
          </p>
          <p>
            You work directly with the engineers building your product, from the first
            conversation to launch day and beyond. No account managers, no offshore handoffs,
            and a clear quote before any work starts.
          </p>
        </div>

        {safentia && (
          <div className="service-benefits">
            <h2>Case Study: Safentia for Firerite, Caerphilly</h2>
            <Link to={`/projects/${safentia.slug}`}>
              <img
                src={safentia.media.images[0]}
                alt="Safentia fire risk assessment app screens alongside the admin risk dashboard"
                className="case-study-image"
                width={1600}
                height={900}
                loading="lazy"
              />
            </Link>
            <div className="service-detail-content">
              <p>
                We built Safentia, a fire risk assessment platform for Firerite (UK) Limited in
                Caerphilly. Assessors capture findings on site with an iOS and Android app,
                auditors validate them in a web console, and customers see their buildings,
                actions and released reports in their own portal.
              </p>
            </div>
            <ul className="benefits-list">
              {[
                'Offline assessment capture that syncs automatically when signal returns',
                'Photo evidence and findings pinned on building floor plans',
                'Question-by-question auditor validation with a full audit trail',
                'Branded PDF reports generated from the validated record',
                'AI-drafted assessor narratives from recorded findings',
              ].map((highlight) => (
                <li key={highlight}>
                  <span className="benefit-check">
                    <Check size={14} />
                  </span>
                  {highlight}
                </li>
              ))}
            </ul>
            <Link to={`/projects/${safentia.slug}`} className="btn btn-outline">
              Read the Safentia Case Study <ArrowRight size={16} />
            </Link>
          </div>
        )}

        <div className="service-benefits">
          <h2>Software Development in Cardiff</h2>
          <div className="service-detail-content">
            <p>
              Not every project is an app. As a Cardiff software development company we also
              build web applications, customer portals, admin dashboards and custom internal
              tools, and we add practical AI features where they save your team time.
            </p>
          </div>
          <div className="region-links-grid">
            {featuredServices.map((service) => (
              <Link key={service.slug} to={`/services/${service.slug}`} className="region-link">
                {service.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="service-benefits">
          <h2>How We Work</h2>
          <div className="about-values-grid">
            {PROCESS_STEPS.map((step) => (
              <div key={step.title} className="about-value-card">
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="service-benefits">
          <h2>Areas We Serve</h2>
          <div className="service-detail-content">
            <p>
              We are based in Cardiff and work with businesses in {AREAS.slice(1, -1).join(', ')} and{' '}
              {AREAS[AREAS.length - 1]}, as well as clients across the rest of the UK.
            </p>
          </div>
        </div>

        <div className="service-benefits">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-list">
            {FAQS.map((faq) => (
              <details key={faq.question} className="faq-item">
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>

      <section className="cta-section">
        <h2>Planning an App in Cardiff?</h2>
        <p>
          Tell us about your idea and we will come back within 24 hours with a clear plan
          and a transparent quote.
        </p>
        <Link to="/contact" className="btn btn-primary btn-lg">
          Get a Free Quote
        </Link>
      </section>
    </>
  );
};

export default AppDevelopmentCardiff;
