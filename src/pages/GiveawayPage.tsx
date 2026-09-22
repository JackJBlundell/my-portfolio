import React, { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import SEO from '../components/SEO';
import { CONTACT_FORM_URL } from '../utils/formEndpoint';
import { scrollToSection } from '../utils/scrollToSection';
import { absoluteUrl, breadcrumbList } from '../utils/seo';
import {
  CLOSING_DATE_LABEL,
  CLOSING_DATE_SHORT_LABEL,
  ELIGIBILITY,
  GIVEAWAY_FAQS,
  GIVEAWAY_NAME,
  GIVEAWAY_PATH,
  GIVEAWAY_TAGLINE,
  GIVEAWAY_TERMS,
  JUDGING_CRITERIA,
  NOT_INCLUDED,
  PLATFORM_OPTIONS,
  PRIZE_INCLUDES,
  PRIZE_VALUE,
  SCOPE_PROMISE,
  SCOPE_STEPS,
  STAGE_OPTIONS,
  TECH_STACK,
  TIMELINE,
  WALES_CONNECTION_OPTIONS,
  WINNER_ANNOUNCED_LABEL,
  isGiveawayOpen,
} from '../data/giveaway';

// Field limits match backend/contact-form, which rejects anything longer
const LONG_ANSWER_MAX = 3000;

const EMPTY_ENTRY = {
  name: '',
  email: '',
  phone: '',
  startupName: '',
  location: '',
  walesConnection: '',
  stage: '',
  platform: '',
  pitch: '',
  problem: '',
  features: '',
  team: '',
  links: '',
  videoUrl: '',
  agreed: false,
  // Honeypot: hidden from people, so anything typed here came from a bot
  website: '',
};

// Hash links would only scroll once (the hash doesn't change on a second click), so scroll directly
const jumpTo = (sectionId: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault();
  scrollToSection(sectionId);
};

const GiveawayPage: React.FC = () => {
  const [entry, setEntry] = useState(EMPTY_ENTRY);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const entriesOpen = isGiveawayOpen();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch(CONTACT_FORM_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ form: 'giveaway', ...entry }),
      });
      if (!response.ok) {
        throw new Error(`Giveaway form responded ${response.status}`);
      }

      setStatus('success');
      setEntry(EMPTY_ENTRY);
      scrollToSection('enter');
    } catch {
      setStatus('error');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const isCheckbox = e.target instanceof HTMLInputElement && e.target.type === 'checkbox';
    setEntry({ ...entry, [name]: isCheckbox ? (e.target as HTMLInputElement).checked : value });
  };

  return (
    <>
      <SEO
        title="Welsh 25k Tech Giveaway: Win a Free Build for Your Startup"
        description={`One startup based in Wales wins its whole tech stack designed and built by Blundell Technologies, worth up to ${PRIZE_VALUE}: apps, web, backend, security, notifications and SEO. Free to enter. Entries close ${CLOSING_DATE_LABEL}.`}
        url={GIVEAWAY_PATH}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: GIVEAWAY_FAQS.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: { '@type': 'Answer', text: faq.answer },
            })),
            url: absoluteUrl(GIVEAWAY_PATH),
          },
          breadcrumbList([
            { name: 'Home', path: '/' },
            { name: GIVEAWAY_NAME, path: GIVEAWAY_PATH },
          ]),
        ]}
      />

      <div className="page-header">
        <div className="breadcrumb" style={{ justifyContent: 'center' }}>
          <Link to="/">Home</Link>
          <span className="breadcrumb-separator">/</span>
          <span>{GIVEAWAY_NAME}</span>
        </div>
        <span className="giveaway-eyebrow">
          {entriesOpen ? `Free to enter · Closes ${CLOSING_DATE_LABEL}` : 'Entries are closed'}
        </span>
        <h1>{GIVEAWAY_NAME}</h1>
        <p>{GIVEAWAY_TAGLINE}</p>

        <div className="giveaway-header-cta">
          {entriesOpen && (
            <a href="#enter" onClick={jumpTo('enter')} className="btn btn-primary btn-lg">
              Enter the Giveaway
            </a>
          )}
          <a href="#stack" onClick={jumpTo('stack')} className="btn btn-outline btn-lg">
            What's Covered
          </a>
          <a href="#terms" onClick={jumpTo('terms')} className="btn btn-outline btn-lg">
            Read the Terms
          </a>
        </div>

        <div className="giveaway-stats">
          <div>
            <strong>{PRIZE_VALUE}</strong>
            <span>Prize value</span>
          </div>
          <div>
            <strong>Free</strong>
            <span>To enter</span>
          </div>
          <div>
            <strong>{CLOSING_DATE_SHORT_LABEL}</strong>
            <span>Entries close</span>
          </div>
        </div>
      </div>

      <div className="service-detail">
        <section className="service-benefits">
          <h2>The Prize</h2>
          <div className="service-detail-content">
            <p>
              The winner gets the technology behind their startup built for them: not just an app
              or a website, but the whole stack it takes to put a product in front of real users.
              Mobile, wearables and tablets, web apps, the backend and server functions underneath,
              authentication and security, notifications, SEO and marketing, AI features and the
              infrastructure it all runs on. It is worth up to {PRIZE_VALUE} at our standard rates,
              and it is the same team that built <Link to="/projects/safentia">Safentia</Link> and{' '}
              <Link to="/projects/4kmatch">4kMatch</Link>.
            </p>
          </div>
          <ul className="benefits-list">
            {PRIZE_INCLUDES.map((item) => (
              <li key={item}>
                <span className="benefit-check">
                  <Check size={14} />
                </span>
                {item}
              </li>
            ))}
          </ul>
          <p className="giveaway-note">
            Running costs such as hosting, domain names, Apple and Google developer accounts and
            paid third-party services are not included, and the winner pays these directly. The
            full list of what the prize doesn't stretch to is further down this page.
          </p>
        </section>

        <section id="stack" className="service-benefits">
          <h2>What You Can Ask For</h2>
          <div className="service-detail-content">
            <p>
              This is the technology we work with every week, and any of it can go into your build.
              You don't need to know which parts you need: tell us what your product has to do and
              we will work that out together.
            </p>
          </div>
          <div className="giveaway-stack-grid">
            {TECH_STACK.map((group) => (
              <div key={group.title} className="giveaway-stack-card">
                <h3>{group.title}</h3>
                <p>{group.text}</p>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="service-benefits">
          <h2>How Far {PRIZE_VALUE} Goes</h2>
          <div className="service-detail-content">
            <p>{SCOPE_PROMISE}</p>
          </div>
          <ol className="giveaway-timeline">
            {SCOPE_STEPS.map((step) => (
              <li key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="service-benefits">
          <h2>What's Not Included</h2>
          <div className="service-detail-content">
            <p>
              So there are no surprises after the winner is announced, here is what the prize does
              not stretch to.
            </p>
          </div>
          <ul className="giveaway-exclusions">
            {NOT_INCLUDED.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="service-benefits">
          <h2>Who Can Enter</h2>
          <ul className="benefits-list">
            {ELIGIBILITY.map((item) => (
              <li key={item}>
                <span className="benefit-check">
                  <Check size={14} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="service-benefits">
          <h2>How We Judge Entries</h2>
          <div className="service-detail-content">
            <p>
              We are picking the idea we most want to exist, and that we believe can be made to
              work. Every entry is read against the same four things.
            </p>
          </div>
          <div className="about-values-grid">
            {JUDGING_CRITERIA.map((criterion) => (
              <div key={criterion.title} className="about-value-card">
                <h3>{criterion.title}</h3>
                <p>{criterion.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="service-benefits">
          <h2>How It Works</h2>
          <ol className="giveaway-timeline">
            {TIMELINE.map((step) => (
              <li key={step.title}>
                <span className="giveaway-timeline-when">{step.when}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="enter" className="service-benefits giveaway-entry">
          <h2>Enter the Giveaway</h2>

          {!entriesOpen && (
            <div className="giveaway-panel">
              <h3>Entries are closed</h3>
              <p>
                Thank you to everyone who entered. We will announce the winner by{' '}
                {WINNER_ANNOUNCED_LABEL}.
              </p>
            </div>
          )}

          {entriesOpen && status === 'success' && (
            <div className="giveaway-panel">
              <h3>Your entry is in</h3>
              <p>
                Thank you for entering. We have emailed you a confirmation, and we will be in
                touch after entries close on {CLOSING_DATE_LABEL}.
              </p>
            </div>
          )}

          {entriesOpen && status !== 'success' && (
            <>
              <div className="service-detail-content">
                <p>
                  Tell us about your startup and what you want built. You don't need a pitch deck
                  or a business plan, and you don't need to know what technology it takes: clear,
                  honest answers are what we are looking for.
                </p>
              </div>

              <form className="contact-form" onSubmit={handleSubmit}>
                <h3 className="giveaway-form-heading">About You</h3>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="name">Full Name *</label>
                    <input
                      className="form-input"
                      type="text"
                      id="name"
                      name="name"
                      value={entry.name}
                      onChange={handleChange}
                      required
                      maxLength={100}
                      autoComplete="name"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="email">Email Address *</label>
                    <input
                      className="form-input"
                      type="email"
                      id="email"
                      name="email"
                      value={entry.email}
                      onChange={handleChange}
                      required
                      maxLength={200}
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="phone">Phone Number</label>
                    <input
                      className="form-input"
                      type="tel"
                      id="phone"
                      name="phone"
                      value={entry.phone}
                      onChange={handleChange}
                      maxLength={40}
                      autoComplete="tel"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="startupName">Startup Name *</label>
                    <input
                      className="form-input"
                      type="text"
                      id="startupName"
                      name="startupName"
                      value={entry.startupName}
                      onChange={handleChange}
                      required
                      maxLength={120}
                      placeholder="A working name is fine"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="location">Where in Wales Are You Based? *</label>
                    <input
                      className="form-input"
                      type="text"
                      id="location"
                      name="location"
                      value={entry.location}
                      onChange={handleChange}
                      required
                      maxLength={100}
                      placeholder="e.g. Swansea"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="walesConnection">Your Connection to Wales *</label>
                    <select
                      className="form-select"
                      id="walesConnection"
                      name="walesConnection"
                      value={entry.walesConnection}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select one</option>
                      {WALES_CONNECTION_OPTIONS.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <h3 className="giveaway-form-heading">Your App</h3>

                <div className="form-group">
                  <label className="form-label" htmlFor="pitch">Describe It in One Sentence *</label>
                  <input
                    className="form-input"
                    type="text"
                    id="pitch"
                    name="pitch"
                    value={entry.pitch}
                    onChange={handleChange}
                    required
                    maxLength={200}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="stage">Where Are You Now? *</label>
                    <select
                      className="form-select"
                      id="stage"
                      name="stage"
                      value={entry.stage}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select one</option>
                      {STAGE_OPTIONS.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="platform">What Do You Want Built? *</label>
                    <select
                      className="form-select"
                      id="platform"
                      name="platform"
                      value={entry.platform}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select one</option>
                      {PLATFORM_OPTIONS.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="problem">What Problem Does It Solve, and for Who? *</label>
                  <p className="form-hint" id="problem-hint">
                    Who has the problem, how they deal with it today, and why yours is better.
                  </p>
                  <textarea
                    className="form-textarea"
                    id="problem"
                    name="problem"
                    value={entry.problem}
                    onChange={handleChange}
                    required
                    rows={5}
                    maxLength={LONG_ANSWER_MAX}
                    aria-describedby="problem-hint"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="features">What Does the First Version Need to Do? *</label>
                  <p className="form-hint" id="features-hint">
                    The features it needs to prove the idea with real users. Include the parts you
                    assume are out of reach, and we will tell you honestly what fits.
                  </p>
                  <textarea
                    className="form-textarea"
                    id="features"
                    name="features"
                    value={entry.features}
                    onChange={handleChange}
                    required
                    rows={5}
                    maxLength={LONG_ANSWER_MAX}
                    aria-describedby="features-hint"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="team">Who's Behind It, and What Happens After Launch? *</label>
                  <p className="form-hint" id="team-hint">
                    Your team, the time you can commit, and how you will reach your first users.
                  </p>
                  <textarea
                    className="form-textarea"
                    id="team"
                    name="team"
                    value={entry.team}
                    onChange={handleChange}
                    required
                    rows={5}
                    maxLength={LONG_ANSWER_MAX}
                    aria-describedby="team-hint"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="links">Website or Social Links</label>
                  <input
                    className="form-input"
                    type="text"
                    id="links"
                    name="links"
                    value={entry.links}
                    onChange={handleChange}
                    maxLength={500}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="videoUrl">Video Pitch Link</label>
                  <p className="form-hint" id="videoUrl-hint">
                    Optional. Up to 2 minutes on YouTube (unlisted is fine), Loom or Google Drive,
                    viewable by anyone with the link.
                  </p>
                  <input
                    className="form-input"
                    type="url"
                    id="videoUrl"
                    name="videoUrl"
                    value={entry.videoUrl}
                    onChange={handleChange}
                    maxLength={500}
                    placeholder="https://"
                    aria-describedby="videoUrl-hint"
                  />
                </div>

                <label className="form-checkbox">
                  <input
                    type="checkbox"
                    name="agreed"
                    checked={entry.agreed}
                    onChange={handleChange}
                    required
                  />
                  <span>
                    I confirm my startup is based in Wales, and I agree to the{' '}
                    <a href="#terms" onClick={jumpTo('terms')}>terms and conditions</a>. *
                  </span>
                </label>

                <input
                  type="text"
                  name="website"
                  value={entry.website}
                  onChange={handleChange}
                  className="form-honeypot"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  disabled={status === 'sending'}
                  style={{ width: '100%' }}
                >
                  {status === 'sending' ? 'Sending...' : 'Submit My Entry'}
                </button>

                {status === 'error' && (
                  <p className="form-message error">
                    Something went wrong and your entry was not sent. Please try again, or email
                    us at jackjblundell@gmail.com.
                  </p>
                )}
              </form>
            </>
          )}
        </section>

        <section className="service-benefits">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-list">
            {GIVEAWAY_FAQS.map((faq) => (
              <details key={faq.question} className="faq-item">
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section id="terms" className="service-benefits">
          <h2>Terms and Conditions</h2>
          <ol className="giveaway-terms">
            {GIVEAWAY_TERMS.map((term) => (
              <li key={term}>{term}</li>
            ))}
          </ol>
        </section>
      </div>
    </>
  );
};

export default GiveawayPage;
