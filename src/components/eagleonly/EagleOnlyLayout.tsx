import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Mail, Menu, X } from 'lucide-react';
import {
  EO_CTA_LABEL,
  EO_CTA_TEXT,
  EO_DEMO_MAILTO,
  EO_EMAIL,
  EO_FAVICON,
  EO_ICON_PNG,
  EO_PAGES,
  EO_PATH,
  EO_TAGLINE,
  EO_WEBSITE,
  FOUNDING_CLOSING_LABEL,
  FOUNDING_LOCK_MONTHS,
  FOUNDING_PLACES,
  FOUNDING_PRICE,
  GO_LIVE_SEASON,
  isFoundingOpen,
} from '../../data/eagleonly';
import Logo from '../Logo';
import { EoIcon, EoWordmark } from './EoBrand';
import EoContours from './EoContours';
import EoReveal from './EoReveal';

// EagleOnly's brand faces. React hoists this into <head>, so they only load on EagleOnly pages
// (and the home page section) rather than slowing down the rest of the site.
export const EoFonts: React.FC = () => (
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700&family=Playfair+Display:ital,wght@0,600;0,700;1,600&display=swap"
    precedence="default"
  />
);

interface EoHeroProps {
  eyebrow: string;
  title: React.ReactNode;
  intro: React.ReactNode;
  // Buttons under the intro
  actions?: React.ReactNode;
  // Shown beside the text on wide screens, e.g. the phone mockup
  aside?: React.ReactNode;
  // Current page name for the breadcrumb; leave out on the overview
  crumb?: string;
  // Sits along the bottom edge of the hero, e.g. the overview's proof points
  footer?: React.ReactNode;
}

export const EoHero: React.FC<EoHeroProps> = ({ eyebrow, title, intro, actions, aside, crumb, footer }) => (
  <header className={`eo-hero ${aside ? 'eo-hero-split' : ''}`}>
    <EoContours />
    <div className="eo-hero-glow" aria-hidden="true" />
    <div className="eo-hero-inner">
      <div className="eo-hero-text">
        <nav className="eo-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Blundell Technologies</Link>
          <span aria-hidden="true">/</span>
          {crumb ? (
            <>
              <Link to={EO_PATH}>EagleOnly</Link>
              <span aria-hidden="true">/</span>
              <span>{crumb}</span>
            </>
          ) : (
            <span>EagleOnly</span>
          )}
        </nav>
        <span className="eo-eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <div className="eo-hero-intro">{intro}</div>
        {actions && <div className="eo-hero-actions">{actions}</div>}
      </div>
      {aside && <div className="eo-hero-aside">{aside}</div>}
    </div>
    {footer && <div className="eo-hero-footer">{footer}</div>}
  </header>
);

// The primary call to action on every EagleOnly page: an email asking for a demonstration
export const EoFoundingButton: React.FC<{ variant?: 'gold' | 'primary' | 'outline' }> = ({ variant = 'gold' }) => (
  <a href={EO_DEMO_MAILTO} className={`eo-btn eo-btn-${variant}`}>
    {EO_CTA_LABEL}
    <ArrowRight size={17} className="eo-btn-arrow" />
  </a>
);

// A centred eyebrow, heading and intro at the top of a section
export const EoSectionHeader: React.FC<{ eyebrow: string; title: React.ReactNode; children?: React.ReactNode }> = ({
  eyebrow,
  title,
  children,
}) => (
  <EoReveal className="eo-section-header">
    <span className="eo-eyebrow">{eyebrow}</span>
    <h2>{title}</h2>
    {children && <p>{children}</p>}
  </EoReveal>
);

// The only navbar on EagleOnly pages: the site navbar is hidden here (see App.tsx), so this one
// carries the way back to Blundell Technologies on the left, and in the mobile menu.
const EoNavbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`eo-nav ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'open' : ''}`} aria-label="EagleOnly">
      <div className="eo-nav-inner">
        <Link to="/" className="eo-nav-back">
          <ArrowLeft size={16} />
          <span>Blundell Technologies</span>
        </Link>
        <span className="eo-nav-divider" aria-hidden="true" />
        <Link to={EO_PATH} className="eo-nav-brand" aria-label="EagleOnly overview">
          <EoWordmark />
        </Link>

        <div className="eo-nav-links">
          {EO_PAGES.map((page) => (
            <NavLink
              key={page.path}
              to={page.path}
              end
              className={({ isActive }) => `eo-nav-link ${isActive ? 'active' : ''}`}
            >
              {page.label}
            </NavLink>
          ))}
          <Link to="/" className="eo-nav-link eo-nav-back-mobile">
            <ArrowLeft size={16} /> Back to Blundell Technologies
          </Link>
        </div>

        <a href={EO_DEMO_MAILTO} className="eo-btn eo-btn-gold eo-btn-sm eo-nav-cta">
          {EO_CTA_LABEL}
        </a>

        <button
          type="button"
          className="eo-nav-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </nav>
  );
};

// Shows the EagleOnly icon in the browser tab while on EagleOnly pages, and puts the site's
// own icons back on the way out
const useEagleOnlyFavicon = () => {
  useEffect(() => {
    const links = Array.from(
      document.querySelectorAll<HTMLLinkElement>('link[rel="icon"], link[rel="apple-touch-icon"]')
    );
    const original = links.map((link) => link.getAttribute('href'));
    links.forEach((link) => {
      link.href = link.rel === 'apple-touch-icon' ? EO_ICON_PNG : EO_FAVICON;
    });
    return () => links.forEach((link, i) => link.setAttribute('href', original[i] ?? ''));
  }, []);
};

const EagleOnlyLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const foundingOpen = isFoundingOpen();
  useEagleOnlyFavicon();

  return (
    <div className="eo eo-page">
      <EoFonts />

      <EoNavbar />

      {children}

      <section className="eo-cta">
        <EoContours />
        <EoReveal className="eo-cta-inner">
          <EoIcon size={72} />
          <span className="eo-eyebrow">
            {foundingOpen ? `${FOUNDING_PLACES} Founding Partner places` : 'EagleOnly'}
          </span>
          <h2>
            {foundingOpen ? (
              <>
                Go live for the <em>{GO_LIVE_SEASON} season</em>
              </>
            ) : (
              <>
                Bring your club onto <em>EagleOnly</em>
              </>
            )}
          </h2>
          <p>
            {foundingOpen
              ? `The first ${FOUNDING_PLACES} clubs pay ${FOUNDING_PRICE} a month for the core platform, locked in for ${FOUNDING_LOCK_MONTHS} months after switching. Places close on ${FOUNDING_CLOSING_LABEL}. ${EO_CTA_TEXT}`
              : EO_CTA_TEXT}
          </p>
          <div className="eo-cta-actions">
            <EoFoundingButton />
            <a href={`mailto:${EO_EMAIL}`} className="eo-cta-email">
              <Mail size={16} /> {EO_EMAIL}
            </a>
          </div>
        </EoReveal>
      </section>

      <div className="eo-maker">
        <div className="eo-maker-inner">
          <div className="eo-maker-marks">
            <EoWordmark />
            <span className="eo-maker-divider" aria-hidden="true" />
            <Link to="/" className="eo-maker-bt" aria-label="Blundell Technologies home">
              <Logo />
            </Link>
          </div>
          <p>
            <em>{EO_TAGLINE}</em> EagleOnly is designed, built and supported in Cardiff by{' '}
            <Link to="/">Blundell Technologies</Link>.{' '}
            <a href={EO_WEBSITE} target="_blank" rel="noopener noreferrer">
              eagleonly.co.uk
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default EagleOnlyLayout;
