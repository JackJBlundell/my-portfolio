import React from 'react';
import { Check } from 'lucide-react';
import SEO from '../../components/SEO';
import EagleOnlyLayout, {
  EoFoundingButton,
  EoHero,
  EoSectionHeader,
} from '../../components/eagleonly/EagleOnlyLayout';
import EoReceipt from '../../components/eagleonly/EoReceipt';
import EoReveal from '../../components/eagleonly/EoReveal';
import {
  ALBATROSS_FEATURE,
  ALBATROSS_PRICE,
  EAGLE_FEATURES,
  EO_OG_ALT,
  EO_OG_IMAGE,
  EO_PATH,
  FOUNDING_CLOSING_LABEL,
  FOUNDING_LOCK_LINE,
  FOUNDING_LOCK_MONTHS,
  FOUNDING_PLACES,
  FOUNDING_PRICE,
  GO_LIVE_SEASON,
  PRICING_ITEMS,
  TRANSACTION_FEE,
  isFoundingOpen,
} from '../../data/eagleonly';
import { eagleOnlyBreadcrumbs, eagleOnlyProductJsonLd } from '../../utils/eagleonlySeo';

const PATH = `${EO_PATH}/pricing`;

const EagleOnlyPricing: React.FC = () => {
  const foundingOpen = isFoundingOpen();

  return (
    <EagleOnlyLayout>
      <SEO
        title={`EagleOnly Pricing: From ${FOUNDING_PRICE} a Month`}
        description={`EagleOnly Founding Partner clubs pay ${FOUNDING_PRICE} a month, locked in for ${FOUNDING_LOCK_MONTHS} months. Albatross Package +${ALBATROSS_PRICE} a month. A flat ${TRANSACTION_FEE} per transaction, never a percentage of club revenue.`}
        url={PATH}
        image={EO_OG_IMAGE}
        imageAlt={EO_OG_ALT}
        imageWidth={1200}
        imageHeight={630}
        jsonLd={[eagleOnlyProductJsonLd(), eagleOnlyBreadcrumbs({ name: 'Pricing', path: PATH })]}
      />

      <EoHero
        crumb="Pricing"
        eyebrow={foundingOpen ? `Founding Partner places close ${FOUNDING_CLOSING_LABEL}` : 'Pricing'}
        title={
          <>
            Plain pricing, <em>no percentage</em>
          </>
        }
        intro={
          <p>
            One monthly price for the platform, an optional Albatross Package, and a flat{' '}
            {TRANSACTION_FEE} per transaction. We never take a cut of what your club earns.
          </p>
        }
        actions={<EoFoundingButton />}
      />

      <section className="eo-section eo-section-pull">
        <div className="eo-section-inner">
          <div className="eo-tiers">
            <EoReveal className="eo-tier-card eo-tier-card-featured">
              {foundingOpen && <span className="eo-ribbon">Founding Partner rate</span>}
              <span className="eo-tier eo-tier-eagle">Eagle · Core platform</span>
              <strong className="eo-tier-price">
                {FOUNDING_PRICE}
                <small>/month</small>
              </strong>
              <p>
                {foundingOpen
                  ? `For the first ${FOUNDING_PLACES} clubs, going live for the ${GO_LIVE_SEASON} season. ${FOUNDING_LOCK_LINE}`
                  : 'Founding Partner rate. Get in touch for current pricing.'}
              </p>
              <EoFoundingButton variant="gold" />
              <ul className="eo-checklist">
                {EAGLE_FEATURES.map((feature) => (
                  <li key={feature.slug}>
                    <Check size={16} strokeWidth={2.5} />
                    {feature.title}
                  </li>
                ))}
              </ul>
            </EoReveal>

            <EoReveal className="eo-tier-card eo-tier-card-gold" delay={0.1}>
              <span className="eo-tier eo-tier-albatross">Albatross Package</span>
              <strong className="eo-tier-price">
                +{ALBATROSS_PRICE}
                <small>/month</small>
              </strong>
              <p>Everything in Eagle, plus the hardware and back office.</p>
              <ul className="eo-checklist eo-checklist-gold">
                {ALBATROSS_FEATURE.points.map((point) => (
                  <li key={point}>
                    <Check size={16} strokeWidth={2.5} />
                    {point}
                  </li>
                ))}
              </ul>
              <p className="eo-tier-footnote">
                Card readers are bought separately: Stripe Reader M2 about £49 + VAT, WisePOS E about
                £179 + VAT.
              </p>
            </EoReveal>
          </div>
        </div>
      </section>

      <section className="eo-section eo-section-tint">
        <div className="eo-section-inner eo-narrow">
          <EoSectionHeader eyebrow="The detail" title="What you pay for" />
          <EoReveal>
            <table className="eo-price-table">
              <thead>
                <tr>
                  <th scope="col">Item</th>
                  <th scope="col">Price</th>
                  <th scope="col">Notes</th>
                </tr>
              </thead>
              <tbody>
                {PRICING_ITEMS.map((item) => (
                  <tr key={item.name}>
                    <th scope="row">{item.name}</th>
                    <td className="eo-price-cell">{item.price}</td>
                    <td>{item.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </EoReveal>
        </div>
      </section>

      <section className="eo-section eo-section-dark">
        <div className="eo-section-inner eo-split">
          <EoReveal>
            <span className="eo-eyebrow">Your revenue</span>
            <h2>The platform should pay its way</h2>
            <p>
              Payments go straight to your club's own Stripe account. OpenTee fills spare places on
              the tee sheet, and up to three sponsors a month pay the club directly for space in
              your app.
            </p>
          </EoReveal>
          <EoReveal delay={0.1}>
            <EoReceipt />
          </EoReveal>
        </div>
      </section>
    </EagleOnlyLayout>
  );
};

export default EagleOnlyPricing;
