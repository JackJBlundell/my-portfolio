import React from 'react';
import { Link } from 'react-router-dom';
import { services } from '../data/services';
import { GIVEAWAY_NAME, GIVEAWAY_PATH } from '../data/giveaway';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="logo">
              <Logo variant="on-dark" />
            </Link>
            <p>
              Cardiff-based software development company building web
              applications, mobile apps and AI solutions for businesses
              across the UK.
            </p>
          </div>

          <div>
            <h4 className="footer-heading">Services</h4>
            <ul className="footer-links">
              {services.slice(0, 5).map((service) => (
                <li key={service.slug}>
                  <Link to={`/services/${service.slug}`}>{service.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="footer-heading">Company</h4>
            <ul className="footer-links">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/projects">Case Studies</Link></li>
              <li><Link to="/articles">Articles</Link></li>
              <li><Link to={GIVEAWAY_PATH}>{GIVEAWAY_NAME}</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-heading">Resources</h4>
            <ul className="footer-links">
              <li><Link to="/services">All Services</Link></li>
              <li><Link to="/app-development-cardiff">App Developers Cardiff</Link></li>
              <li><Link to="/services/mobile-app-development">iOS &amp; Android Apps</Link></li>
              <li><Link to="/services/custom-software-development">Custom Software UK</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Blundell Technologies. All rights reserved.</p>
          <p>Built in the UK</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
