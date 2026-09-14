import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const About: React.FC = () => {
  return (
    <>
      <SEO
        title="About"
        description="Blundell Technologies is a Cardiff-based software development consultancy founded by Jack Blundell. We build custom software, web apps, and mobile applications for ambitious businesses."
        url="/about"
      />

      <div className="page-header">
        <h1>About Blundell Technologies</h1>
        <p>
          Cardiff-based software development consultancy building enterprise-grade
          solutions for ambitious businesses.
        </p>
      </div>

      <div className="about-content">
        <h2>Our Story</h2>
        <p>
          Blundell Technologies was founded by Jack Blundell after years of experience
          building software products across mobile, web, and cloud platforms. Having seen
          first-hand the challenges that businesses face when trying to bring software
          ideas to life — from spiralling costs and missed deadlines to products that
          don't meet real user needs — we set out to do things differently.
        </p>
        <p>
          We combine deep engineering expertise with modern development practices
          to deliver software that works. No unnecessary complexity, no inflated
          timelines, and no surprises. Just well-architected, production-ready
          solutions that solve genuine business problems.
        </p>

        <h2>What We Believe</h2>
        <p>
          Great software starts with a clear understanding of the problem it needs
          to solve. Technology decisions should follow business objectives, not the
          other way around. And the best results come from genuine partnership between
          our team and yours.
        </p>

        <div className="about-values-grid">
          <div className="about-value-card">
            <h3>Pragmatism Over Hype</h3>
            <p>
              We choose proven technologies and practical approaches. Every
              technical decision is grounded in what actually works at scale,
              not what's trending on social media.
            </p>
          </div>
          <div className="about-value-card">
            <h3>Quality Is Non-Negotiable</h3>
            <p>
              We write tested, documented, maintainable code. Cutting corners
              on quality always costs more in the long run, and we build
              software that teams can confidently work with for years.
            </p>
          </div>
          <div className="about-value-card">
            <h3>Transparent Communication</h3>
            <p>
              You will always know where your project stands. We provide regular
              updates, honest assessments, and clear explanations of trade-offs
              so you can make informed decisions.
            </p>
          </div>
          <div className="about-value-card">
            <h3>Long-Term Thinking</h3>
            <p>
              We architect solutions with growth in mind. Your software should
              support your business as it scales, not become a bottleneck that
              requires a costly rewrite.
            </p>
          </div>
        </div>

        <h2>Our Expertise</h2>
        <p>
          Our technical capabilities span the full software development lifecycle.
          We work with React and TypeScript on the front end, Node.js and Python
          on the back end, React Native for cross-platform mobile development, and
          AWS for cloud infrastructure. We also build AI-powered solutions using
          OpenAI and other leading platforms.
        </p>
        <p>
          But technology is only one part of the equation. We bring experience in
          product strategy, user experience design, and engineering best practices
          to every engagement. The result is software that's not just technically
          sound, but genuinely useful for the people who rely on it.
        </p>
      </div>

      <section className="cta-section">
        <h2>Let's Work Together</h2>
        <p>
          Whether you need a new application built from scratch or an existing
          system improved, we would be glad to discuss how we can help.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/contact" className="btn btn-primary btn-lg">
            Get in Touch
          </Link>
          <Link to="/services" className="btn btn-outline btn-lg">
            View Our Services
          </Link>
        </div>
      </section>
    </>
  );
};

export default About;
