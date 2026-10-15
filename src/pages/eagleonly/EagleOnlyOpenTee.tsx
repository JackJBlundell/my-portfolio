import React from "react";
import SEO from "../../components/SEO";
import EagleOnlyLayout, {
  EoFoundingButton,
  EoHero,
  EoSectionHeader,
} from "../../components/eagleonly/EagleOnlyLayout";
import EoFourball from "../../components/eagleonly/EoFourball";
import EoPhoneMockup from "../../components/eagleonly/EoPhoneMockup";
import EoReveal from "../../components/eagleonly/EoReveal";
import {
  EO_OG_ALT,
  EO_OG_IMAGE,
  EO_PATH,
  OPENTEE_FAQS,
  OPENTEE_LINE,
  OPENTEE_STEPS,
} from "../../data/eagleonly";
import {
  eagleOnlyBreadcrumbs,
  eagleOnlyProductJsonLd,
  faqJsonLd,
} from "../../utils/eagleonlySeo";

const PATH = `${EO_PATH}/opentee`;

const EagleOnlyOpenTee: React.FC = () => (
  <EagleOnlyLayout>
    <SEO
      title="OpenTee: Shared Tee Times for Golf Clubs"
      description="OpenTee lets anyone open their tee time for others to join, so two-balls and three-balls fill to four-balls and one slot earns more green fees."
      url={PATH}
      image={EO_OG_IMAGE}
      imageAlt={EO_OG_ALT}
      imageWidth={1200}
      imageHeight={630}
      jsonLd={[
        eagleOnlyProductJsonLd(),
        faqJsonLd(OPENTEE_FAQS, PATH),
        eagleOnlyBreadcrumbs({ name: "OpenTee", path: PATH }),
      ]}
    />

    <EoHero
      crumb="OpenTee"
      eyebrow="OpenTee · Included with EagleOnly"
      title={
        <>
          Two-balls become <em>four-balls</em>
        </>
      }
      intro={
        <p>
          {OPENTEE_LINE} One slot on the tee sheet, more green fees for the
          club.
        </p>
      }
      actions={<EoFoundingButton />}
      aside={<EoPhoneMockup withChips />}
    />

    <section className="eo-section">
      <div className="eo-section-inner">
        <EoSectionHeader
          eyebrow="How it works"
          title="Four steps, no extra work for the club"
        />
        <ol className="eo-steps">
          {OPENTEE_STEPS.map((step, index) => (
            <EoReveal as="li" key={step.title} delay={index * 0.08}>
              <span className="eo-step-number">{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </EoReveal>
          ))}
        </ol>
      </div>
    </section>

    <section className="eo-section eo-section-dark">
      <div className="eo-section-inner eo-split">
        <EoReveal>
          <span className="eo-eyebrow">Why it matters</span>
          <h2>A two-ball uses the same slot as a four-ball</h2>
          <p>
            Every tee time that goes out with empty places is green fee income
            the club can't get back. OpenTee lets the golfers who are already
            playing fill those places, and gives members and visitors an easy
            way to find a game.
          </p>
        </EoReveal>
        <EoReveal delay={0.1}>
          <EoFourball />
        </EoReveal>
      </div>
    </section>

    <section className="eo-section eo-section-tint">
      <div className="eo-section-inner eo-faq-layout">
        <EoReveal className="eo-faq-intro">
          <span className="eo-eyebrow">Questions</span>
          <h2>About OpenTee</h2>
        </EoReveal>
        <div className="eo-faqs">
          {OPENTEE_FAQS.map((faq) => (
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

export default EagleOnlyOpenTee;
