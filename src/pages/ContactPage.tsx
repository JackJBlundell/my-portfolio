import React, { useState, FormEvent } from 'react';
import { Mail, Clock, MapPin } from 'lucide-react';
import SEO from '../components/SEO';
import { CONTACT_FORM_URL } from '../utils/formEndpoint';

const EMPTY_FORM = {
  name: '',
  email: '',
  company: '',
  phone: '',
  service: '',
  message: '',
  // Honeypot: hidden from people, so anything typed here came from a bot
  website: '',
};

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    try {
      if (!CONTACT_FORM_URL) {
        throw new Error('REACT_APP_CONTACT_FORM_URL is not set');
      }

      const response = await fetch(CONTACT_FORM_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(`Contact form responded ${response.status}`);
      }

      setStatus('success');
      setFormData(EMPTY_FORM);
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <SEO
        title="Contact"
        description="Get in touch with Blundell Technologies. Tell us about your project and receive a transparent quote within 24 hours."
        url="/contact"
      />

      <div className="page-header">
        <h1>Get in Touch</h1>
        <p>
          Tell us about your project and we will get back to you within 24 hours
          with a clear plan and transparent quote.
        </p>
      </div>

      <div className="contact-page">
        <div className="contact-info">
          <h2>Let's Discuss Your Project</h2>
          <p>
            Whether you have a detailed specification or just an idea, we are happy
            to talk through your requirements and advise on the best approach.
            There is no obligation and no pressure.
          </p>

          <div className="contact-details">
            <div className="contact-detail-item">
              <div className="contact-detail-icon">
                <Mail size={20} />
              </div>
              <div>
                <h3>Email</h3>
                <a href="mailto:jackjblundell@gmail.com">jackjblundell@gmail.com</a>
              </div>
            </div>
            <div className="contact-detail-item">
              <div className="contact-detail-icon">
                <Clock size={20} />
              </div>
              <div>
                <h3>Response Time</h3>
                <p>Within 24 hours</p>
              </div>
            </div>
            <div className="contact-detail-item">
              <div className="contact-detail-icon">
                <MapPin size={20} />
              </div>
              <div>
                <h3>Location</h3>
                <p>Cardiff, South Wales, UK</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="name">Full Name *</label>
                <input
                  className="form-input"
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Smith"
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="email">Email Address *</label>
                <input
                  className="form-input"
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john@company.com"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="company">Company</label>
                <input
                  className="form-input"
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Your company name"
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="phone">Phone Number</label>
                <input
                  className="form-input"
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+44 7123 456789"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="service">Service of Interest</label>
              <select
                className="form-select"
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
              >
                <option value="">Select a service (optional)</option>
                <option value="Custom Software Development">Custom Software Development</option>
                <option value="Web Application Development">Web Application Development</option>
                <option value="Mobile App Development">Mobile App Development</option>
                <option value="AI & Machine Learning">AI & Machine Learning</option>
                <option value="Cloud Infrastructure & DevOps">Cloud Infrastructure & DevOps</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="Other">Other / Not Sure</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="message">Project Description *</label>
              <textarea
                className="form-textarea"
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Tell us about your project, goals, and any specific requirements..."
              />
            </div>

            <input
              type="text"
              name="website"
              value={formData.website}
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
              {status === 'sending' && 'Sending...'}
              {status === 'success' && 'Message Sent!'}
              {status === 'error' && 'Failed to Send'}
              {status === 'idle' && 'Send Message'}
            </button>

            {status === 'success' && (
              <p className="form-message success">
                Thank you for reaching out. We will get back to you within 24 hours.
              </p>
            )}

            {status === 'error' && (
              <p className="form-message error">
                Something went wrong. Please try emailing us directly at jackjblundell@gmail.com.
              </p>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
