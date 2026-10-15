import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import SEO from '../../components/SEO';
import EagleOnlyLayout, {
  EoFoundingButton,
  EoHero,
  EoSectionHeader,
} from '../../components/eagleonly/EagleOnlyLayout';
import EoReveal from '../../components/eagleonly/EoReveal';
import { eoIcon } from '../../components/eagleonly/eoIcons';
import { EO_FEATURES, EO_OG_ALT, EO_OG_IMAGE, EO_PATH } from '../../data/eagleonly';
import { scrollToSection } from '../../utils/scrollToSection';
import { eagleOnlyBreadcrumbs, eagleOnlyProductJsonLd } from '../../utils/eagleonlySeo';

const PATH = `${EO_PATH}/features`;

// Smooth-scrolls to a feature, clearing the EagleOnly navbar, and keeps the hash shareable
const jumpTo = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault();
  scrollToSection(id, 96);
  window.history.replaceState(null, '', `#${id}`);
};

// Tracks which feature is in the middle band of the screen, to highlight it in the contents list
const useActiveFeature = () => {
  const [active, setActive] = useState(EO_FEATURES[0].slug);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    EO_FEATURES.forEach((f) => {
      const node = document.getElementById(f.slug);
      if (node) observer.observe(node);
    });
    return () => observer.disconnect();
  }, []);

  return active;
};

const EagleOnlyFeatures: React.FC = () => {
  const active = useActiveFeature();

  return (
    <EagleOnlyLayout>
      <SEO
        title="EagleOnly Features for Golf Clubs"
        description="Everything in EagleOnly: branded iOS and Android member app, admin CRM, tee sheet, OpenTee, competitions and WHS, clubhouse ordering, sponsors and payments."
        url={PATH}
        image={EO_OG_IMAGE}
        imageAlt={EO_OG_ALT}
        imageWidth={1200}
        imageHeight={630}
        jsonLd={[eagleOnlyProductJsonLd(), eagleOnlyBreadcrumbs({ name: 'Features', path: PATH })]}
      />

      <EoHero
        crumb="Features"
        eyebrow="The product suite"
        title={
          <>
            One system for the <em>whole club</em>
          </>
        }
        intro={
          <p>
            EagleOnly comes in two tiers. The Eagle package is the core platform every club gets.
            The Albatross Package adds tills, card terminals and stock control for clubs that want
            the back office covered too.
          </p>
        }
        actions={<EoFoundingButton />}
      />

      <section className="eo-section">
        <div className="eo-section-inner eo-docs">
          <nav className="eo-toc" aria-label="Features on this page">
            <span className="eo-toc-title">On this page</span>
            <ol>
              {EO_FEATURES.map((feature) => (
                <li key={feature.slug}>
                  <a
                    href={`#${feature.slug}`}
                    onClick={jumpTo(feature.slug)}
                    className={active === feature.slug ? 'active' : ''}
                  >
                    {feature.title}
                    {feature.tier === 'Albatross' && <span className="eo-toc-tier">Albatross</span>}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="eo-feature-list">
            {EO_FEATURES.map((feature) => {
              const Icon = eoIcon(feature.slug);
              return (
                <EoReveal
                  as="article"
                  key={feature.slug}
                  id={feature.slug}
                  className={`eo-feature-row ${feature.tier === 'Albatross' ? 'eo-feature-row-gold' : ''}`}
                >
                  <div className="eo-feature-row-head">
                    <span className={`eo-icon ${feature.tier === 'Albatross' ? 'eo-icon-gold' : ''}`}>
                      <Icon size={22} strokeWidth={1.75} />
                    </span>
                    <span className={`eo-tier eo-tier-${feature.tier.toLowerCase()}`}>
                      {feature.tier === 'Eagle' ? 'Eagle · Core' : 'Albatross Package'}
                    </span>
                  </div>
                  <h2>{feature.title}</h2>
                  <p>{feature.summary}</p>
                  <ul className="eo-pills">
                    {feature.points.map((point) => (
                      <li key={point}>
                        <Check size={14} strokeWidth={2.5} />
                        {point}
                      </li>
                    ))}
                  </ul>
                  {feature.slug === 'opentee' && (
                    <Link to={`${EO_PATH}/opentee`} className="eo-text-link">
                      More on OpenTee <ArrowRight size={16} />
                    </Link>
                  )}
                  {feature.slug === 'albatross' && (
                    <Link to={`${EO_PATH}/pricing`} className="eo-text-link">
                      Albatross pricing <ArrowRight size={16} />
                    </Link>
                  )}
                </EoReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="eo-section eo-section-tint">
        <div className="eo-section-inner eo-narrow">
          <EoSectionHeader eyebrow="White label" title="Your members never see our name">
            The app is published in the App Store and Google Play under your club's name, with your
            colours and crest throughout. EagleOnly's branding only appears on our own materials.
          </EoSectionHeader>
        </div>
      </section>
    </EagleOnlyLayout>
  );
};

export default EagleOnlyFeatures;
