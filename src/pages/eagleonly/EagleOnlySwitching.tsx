import React from 'react';
import { ArrowRight, FileSpreadsheet, Flag, History, Smartphone } from 'lucide-react';
import SEO from '../../components/SEO';
import EagleOnlyLayout, {
  EoFoundingButton,
  EoHero,
  EoSectionHeader,
} from '../../components/eagleonly/EagleOnlyLayout';
import { EoIcon } from '../../components/eagleonly/EoBrand';
import EoReveal from '../../components/eagleonly/EoReveal';
import {
  EO_OG_ALT,
  EO_OG_IMAGE,
  EO_PATH,
  SWITCHING_COMPARISONS,
  SWITCHING_GUARANTEE,
  SWITCHING_STEPS,
} from '../../data/eagleonly';
import { eagleOnlyBreadcrumbs, eagleOnlyProductJsonLd } from '../../utils/eagleonlySeo';

const PATH = `${EO_PATH}/switching`;

// Matches SWITCHING_STEPS in order: members, handicaps, history, your app
const STEP_ICONS = [FileSpreadsheet, Flag, History, Smartphone];

const EagleOnlySwitching: React.FC = () => (
  <EagleOnlyLayout>
    <SEO
      title="Switch Golf Club Software to EagleOnly"
      description="Moving from ClubV1, intelligentgolf or BRS Golf? Members import from a CSV, WHS records sit with Wales Golf and England Golf, and old history stays archived."
      url={PATH}
      image={EO_OG_IMAGE}
      imageAlt={EO_OG_ALT}
      imageWidth={1200}
      imageHeight={630}
      jsonLd={[eagleOnlyProductJsonLd(), eagleOnlyBreadcrumbs({ name: 'Switching', path: PATH })]}
    />

    <EoHero
      crumb="Switching"
      eyebrow="Moving to EagleOnly"
      title={
        <>
          Switching is simpler <em>than it sounds</em>
        </>
      }
      intro={
        <p>
          Most clubs stay with their current system because moving feels like a big job. Here is
          what actually moves, what stays where it is, and what your members notice.
        </p>
      }
      actions={<EoFoundingButton />}
    />

    <section className="eo-section">
      <div className="eo-section-inner">
        <EoSectionHeader eyebrow="What moves" title="Members, handicaps and history" />
        <ol className="eo-timeline">
          {SWITCHING_STEPS.map((step, index) => {
            const Icon = STEP_ICONS[index] ?? ArrowRight;
            return (
              <EoReveal as="li" key={step.title} delay={index * 0.08}>
                <span className="eo-icon">
                  <Icon size={22} strokeWidth={1.75} />
                </span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </EoReveal>
            );
          })}
        </ol>
      </div>
    </section>

    <section className="eo-section eo-section-dark">
      <div className="eo-section-inner eo-narrow">
        <EoReveal className="eo-certificate">
          <EoIcon size={64} />
          <span className="eo-eyebrow">Switching guarantee</span>
          <blockquote>{SWITCHING_GUARANTEE}</blockquote>
          <span className="eo-certificate-sign">EagleOnly · by Blundell Technologies</span>
        </EoReveal>
      </div>
    </section>

    <section className="eo-section eo-section-tint">
      <div className="eo-section-inner">
        <EoSectionHeader eyebrow="Coming from another system" title="Where EagleOnly is different">
          These are all established systems that plenty of clubs run well on. The difference is
          ownership: with EagleOnly the app is your club's, and the money goes to your club.
        </EoSectionHeader>
        <div className="eo-compare">
          {SWITCHING_COMPARISONS.map((item, index) => (
            <EoReveal key={item.name} className="eo-compare-card" delay={index * 0.08}>
              <span className="eo-compare-from">Coming from</span>
              <h3>{item.name}</h3>
              <p>{item.text}</p>
            </EoReveal>
          ))}
        </div>
        <p className="eo-muted eo-small eo-center">
          ClubV1, intelligentgolf, BRS Golf and HowDidIDo are trademarks of their respective owners.
          EagleOnly is not affiliated with them.
        </p>
      </div>
    </section>
  </EagleOnlyLayout>
);

export default EagleOnlySwitching;
