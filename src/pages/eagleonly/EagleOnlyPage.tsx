import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, MapPin } from 'lucide-react';
import SEO from '../../components/SEO';
import EagleOnlyLayout, {
  EoFoundingButton,
  EoHero,
  EoSectionHeader,
} from '../../components/eagleonly/EagleOnlyLayout';
import EoFourball from '../../components/eagleonly/EoFourball';
import EoPhoneMockup from '../../components/eagleonly/EoPhoneMockup';
import EoReceipt from '../../components/eagleonly/EoReceipt';
import EoReveal from '../../components/eagleonly/EoReveal';
import { eoIcon } from '../../components/eagleonly/eoIcons';
import {
  ALBATROSS_FEATURE,
  ALBATROSS_PRICE,
  EAGLE_FEATURES,
  EO_FAQS,
  EO_OG_ALT,
  EO_OG_IMAGE,
  EO_PATH,
  EO_PILLARS,
  EO_PROOF_POINTS,
  FOUNDING_CLOSING_LABEL,
  FOUNDING_LOCK_MONTHS,
  FOUNDING_PLACES,
  FOUNDING_PRICE,
  OPENTEE_LINE,
  TRANSACTION_FEE,
  isFoundingOpen,
} from '../../data/eagleonly';
import { eagleOnlyBreadcrumbs, eagleOnlyProductJsonLd, faqJsonLd } from '../../utils/eagleonlySeo';

// The bento grid gives the two features clubs ask about first a double-width tile
const WIDE_FEATURES = ['member-app', 'opentee'];

const EagleOnlyPage: React.FC = () => {
  const foundingOpen = isFoundingOpen();

  return (
    <EagleOnlyLayout>
      <SEO
        title="EagleOnly: Golf Club App and Software"
        description={`Your golf club's own branded app, plus tee sheet, OpenTee, competitions, WHS and payments in one system. Money goes straight to the club. From ${FOUNDING_PRICE} a month.`}
        url={EO_PATH}
        image={EO_OG_IMAGE}
        imageAlt={EO_OG_ALT}
        imageWidth={1200}
        imageHeight={630}
        jsonLd={[eagleOnlyProductJsonLd(), faqJsonLd(EO_FAQS, EO_PATH), eagleOnlyBreadcrumbs()]}
      />

      <EoHero
        eyebrow="Golf club software · Made in Cardiff"
        title={
          <>
            Your club. Your app. <em>Your revenue.</em>
          </>
        }
        intro={
          <p>
            EagleOnly gives your golf club its own member app, under your name, colours and crest,
            plus one system to run the club from. Payments go straight to the club, and the
            platform is built to earn the club money as well as save it.
          </p>
        }
        actions={
          <>
            <EoFoundingButton />
            <Link to={`${EO_PATH}/features`} className="eo-btn eo-btn-ghost">
              See what's included
            </Link>
          </>
        }
        aside={<EoPhoneMockup withChips />}
        footer={
          <ul className="eo-proof">
            {EO_PROOF_POINTS.map((point) => (
              <li key={point.label}>
                <strong>{point.value}</strong>
                <span>{point.label}</span>
              </li>
            ))}
          </ul>
        }
      />

      {/* Your club. Your app. Your revenue. */}
      <section className="eo-section">
        <div className="eo-section-inner">
          <div className="eo-pillars">
            {EO_PILLARS.map((pillar, index) => (
              <EoReveal key={pillar.title} className="eo-pillar" delay={index * 0.1}>
                <span className="eo-pillar-number">0{index + 1}</span>
                <h2>{pillar.title}.</h2>
                <p>{pillar.text}</p>
              </EoReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="eo-section eo-section-tint">
        <div className="eo-section-inner">
          <EoSectionHeader eyebrow="The Eagle package" title="Everything the club runs on, in one place">
            The core platform covers members, bookings, competitions, the clubhouse and payments.
            No add-ons needed to make it work.
          </EoSectionHeader>

          <div className="eo-bento">
            {EAGLE_FEATURES.map((feature, index) => {
              const Icon = eoIcon(feature.slug);
              const wide = WIDE_FEATURES.includes(feature.slug);
              return (
                <EoReveal key={feature.slug} className={wide ? 'eo-bento-wide' : ''} delay={(index % 4) * 0.06}>
                  <Link
                    to={feature.slug === 'opentee' ? `${EO_PATH}/opentee` : `${EO_PATH}/features#${feature.slug}`}
                    className={`eo-bento-card ${wide ? 'eo-bento-card-feature' : ''}`}
                  >
                    <span className="eo-icon">
                      <Icon size={22} strokeWidth={1.75} />
                    </span>
                    <h3>{feature.title}</h3>
                    <p>{feature.summary}</p>
                    <span className="eo-bento-more" aria-hidden="true">
                      <ArrowUpRight size={18} />
                    </span>
                  </Link>
                </EoReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="eo-section">
        <div className="eo-section-inner eo-split">
          <EoReveal>
            <span className="eo-eyebrow">OpenTee · Included</span>
            <h2>Fill the gaps in your tee sheet</h2>
            <p className="eo-lead">{OPENTEE_LINE}</p>
            <p>
              Two-balls and three-balls fill to a four-ball, so the same slot on the tee sheet earns
              more green fees. Members find a game, visitors find a group, and the club does nothing
              extra.
            </p>
            <Link to={`${EO_PATH}/opentee`} className="eo-text-link">
              How OpenTee works <ArrowRight size={16} />
            </Link>
          </EoReveal>
          <EoReveal delay={0.1}>
            <EoFourball />
          </EoReveal>
        </div>
      </section>

      <section className="eo-section eo-section-dark">
        <div className="eo-section-inner eo-split">
          <EoReveal>
            <span className="eo-eyebrow">Payments</span>
            <h2>Money goes to the club, not through us</h2>
            <p>
              Every club has its own Stripe Connect account. Green fees, competition entries, bar
              orders and sponsor payments land there directly, and membership direct debits run
              through GoCardless.
            </p>
            <p>
              We take a flat {TRANSACTION_FEE} per transaction. Never a percentage of what your club
              earns.
            </p>
          </EoReveal>
          <EoReveal delay={0.1}>
            <EoReceipt />
          </EoReveal>
        </div>
      </section>

      <section className="eo-section">
        <div className="eo-section-inner eo-split eo-split-wide-left">
          <EoReveal>
            <span className="eo-eyebrow eo-eyebrow-gold">Albatross Package</span>
            <h2>Run the whole club on one system</h2>
            <p>{ALBATROSS_FEATURE.summary}</p>
            <ul className="eo-ticks eo-ticks-grid">
              {ALBATROSS_FEATURE.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </EoReveal>

          <EoReveal delay={0.1} className="eo-price-card">
            <span className="eo-price-label">Founding Partner rate</span>
            <strong className="eo-price-amount">
              {FOUNDING_PRICE}
              <small>/month</small>
            </strong>
            <span className="eo-price-sub">
              Eagle core platform · Locked in for {FOUNDING_LOCK_MONTHS} months
            </span>
            <div className="eo-price-addon">
              <span>Albatross Package</span>
              <strong>+{ALBATROSS_PRICE}/month</strong>
            </div>
            {foundingOpen && (
              <span className="eo-price-badge">
                First {FOUNDING_PLACES} clubs · Closes {FOUNDING_CLOSING_LABEL}
              </span>
            )}
            <Link to={`${EO_PATH}/pricing`} className="eo-text-link">
              Full pricing <ArrowRight size={16} />
            </Link>
          </EoReveal>
        </div>
      </section>

      <section className="eo-section eo-section-tint">
        <div className="eo-section-inner">
          <EoReveal className="eo-origin">
            <span className="eo-icon eo-icon-lg">
              <MapPin size={26} strokeWidth={1.75} />
            </span>
            <div>
              <span className="eo-eyebrow">Built in Cardiff, by a golfer</span>
              <h2>Starting with clubs we can drive to</h2>
              <p>
                EagleOnly was founded by Jack Blundell, a golfer based in South Wales, and is built
                and supported by the team at Blundell Technologies. We are starting with private
                members' clubs in Cardiff and South Wales, with pay and play courses to follow.
                Support comes directly from the people who build the platform.
              </p>
            </div>
          </EoReveal>
        </div>
      </section>

      <section className="eo-section">
        <div className="eo-section-inner eo-faq-layout">
          <EoReveal className="eo-faq-intro">
            <span className="eo-eyebrow">Questions</span>
            <h2>What clubs ask us</h2>
            <p>
              Moving from another system? <Link to={`${EO_PATH}/switching`}>See how switching works</Link>.
            </p>
          </EoReveal>
          <div className="eo-faqs">
            {EO_FAQS.map((faq) => (
              <details key={faq.question} className="eo-faq">
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </EagleOnlyLayout>
  );
};

export default EagleOnlyPage;
