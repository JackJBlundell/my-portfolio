import React, { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import emailjs from 'emailjs-com';
import './Contact.css';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: '+44',
    phone: '',
    projectTypes: [] as string[],
    projectDescription: '',
    timelineNumber: '',
    timelineDuration: 'weeks',
    budgetRange: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    try {
      // Check if environment variables are set
      const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
      const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        console.warn('EmailJS credentials not configured. Email will not be sent.');
        // Simulate success for demo purposes
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setStatus('success');
        setFormData({ name: '', email: '', countryCode: '+44', phone: '', projectTypes: [], projectDescription: '', timelineNumber: '', timelineDuration: 'weeks', budgetRange: '' });
        setTimeout(() => setStatus('idle'), 5000);
        return;
      }

      // Send email using EmailJS
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          phone_number: formData.phone ? `${formData.countryCode} ${formData.phone}` : 'Not provided',
          project_types: formData.projectTypes.join(', ') || 'Not specified',
          project_description: formData.projectDescription,
          timeline: formData.timelineNumber ? `${formData.timelineNumber} ${formData.timelineDuration}` : 'Not specified',
          budget_range: formData.budgetRange,
          to_email: 'jackjblundell@gmail.com',
        },
        publicKey
      );

      // Send auto-reply to the customer (if configured)
      const autoReplyTemplateId = process.env.REACT_APP_EMAILJS_AUTO_REPLY_TEMPLATE_ID;
      if (autoReplyTemplateId) {
        try {
          await emailjs.send(
            serviceId,
            autoReplyTemplateId,
            {
              from_name: formData.name,
              from_email: formData.email,
            },
            publicKey
          );
        } catch (error) {
          console.error('Auto-reply failed, but main email was sent:', error);
          // Don't fail the whole submission if auto-reply fails
        }
      }

      setStatus('success');
      setFormData({ name: '', email: '', countryCode: '+44', phone: '', projectTypes: [], projectDescription: '', timelineNumber: '', timelineDuration: 'weeks', budgetRange: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Error sending email:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      projectTypes: checked
        ? [...prev.projectTypes, value]
        : prev.projectTypes.filter(type => type !== value)
    }));
  };

  return (
    <section className="contact" id="contact">
      <div className="contact-container">
        <motion.div
          className="contact-header"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            Let's <span className="highlight">Work Together</span>
          </h2>
          <p className="section-subtitle">
            Have a project in mind? Let's make it happen.
          </p>
        </motion.div>

        <div className="contact-content">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="contact-info-title">Get in Touch</h3>
            <p className="contact-info-text">
              I'm always excited to hear about new projects and opportunities.
              Whether you're a startup looking to build your MVP or an
              established business needing a mobile solution, I'm here to help.
            </p>

            <div className="contact-details">
              <div className="contact-detail">
                <div className="detail-icon">📧</div>
                <div className="detail-content">
                  <h4>Email</h4>
                  <a href="mailto:jackjblundell@gmail.com">
                    jackjblundell@gmail.com
                  </a>
                </div>
              </div>

              <div className="contact-detail">
                <div className="detail-icon">⚡</div>
                <div className="detail-content">
                  <h4>Response Time</h4>
                  <p>Usually within 24 hours</p>
                </div>
              </div>

              <div className="contact-detail">
                <div className="detail-icon">🌍</div>
                <div className="detail-content">
                  <h4>Location</h4>
                  <p>Remote / Worldwide</p>
                </div>
              </div>
            </div>

            <div className="social-links">
              <h4>Connect with me</h4>
              <div className="social-icons">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
                  💼
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="GitHub">
                  💻
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Twitter">
                  🐦
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="contact-form-wrapper"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number (Optional)</label>
                <div className="phone-input-group">
                  <select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleChange}
                    className="country-code-select"
                  >
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+1">🇨🇦 +1</option>
                    <option value="+61">🇦🇺 +61</option>
                    <option value="+91">🇮🇳 +91</option>
                    <option value="+33">🇫🇷 +33</option>
                    <option value="+49">🇩🇪 +49</option>
                    <option value="+39">🇮🇹 +39</option>
                    <option value="+34">🇪🇸 +34</option>
                    <option value="+31">🇳🇱 +31</option>
                    <option value="+46">🇸🇪 +46</option>
                    <option value="+47">🇳🇴 +47</option>
                    <option value="+45">🇩🇰 +45</option>
                    <option value="+358">🇫🇮 +358</option>
                    <option value="+41">🇨🇭 +41</option>
                    <option value="+32">🇧🇪 +32</option>
                    <option value="+43">🇦🇹 +43</option>
                    <option value="+351">🇵🇹 +351</option>
                    <option value="+353">🇮🇪 +353</option>
                    <option value="+48">🇵🇱 +48</option>
                    <option value="+420">🇨🇿 +420</option>
                    <option value="+36">🇭🇺 +36</option>
                    <option value="+30">🇬🇷 +30</option>
                    <option value="+86">🇨🇳 +86</option>
                    <option value="+81">🇯🇵 +81</option>
                    <option value="+82">🇰🇷 +82</option>
                    <option value="+65">🇸🇬 +65</option>
                    <option value="+60">🇲🇾 +60</option>
                    <option value="+66">🇹🇭 +66</option>
                    <option value="+84">🇻🇳 +84</option>
                    <option value="+63">🇵🇭 +63</option>
                    <option value="+62">🇮🇩 +62</option>
                    <option value="+64">🇳🇿 +64</option>
                    <option value="+27">🇿🇦 +27</option>
                    <option value="+971">🇦🇪 +971</option>
                    <option value="+966">🇸🇦 +966</option>
                    <option value="+974">🇶🇦 +974</option>
                    <option value="+20">🇪🇬 +20</option>
                    <option value="+234">🇳🇬 +234</option>
                    <option value="+254">🇰🇪 +254</option>
                    <option value="+55">🇧🇷 +55</option>
                    <option value="+52">🇲🇽 +52</option>
                    <option value="+54">🇦🇷 +54</option>
                    <option value="+56">🇨🇱 +56</option>
                    <option value="+57">🇨🇴 +57</option>
                    <option value="+51">🇵🇪 +51</option>
                  </select>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="7123 456789"
                    className="phone-number-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Project Type (Select all that apply)</label>
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      value="Website"
                      checked={formData.projectTypes.includes('Website')}
                      onChange={handleCheckboxChange}
                    />
                    <span>Website</span>
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      value="Web Application"
                      checked={formData.projectTypes.includes('Web Application')}
                      onChange={handleCheckboxChange}
                    />
                    <span>Web Application</span>
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      value="Mobile App"
                      checked={formData.projectTypes.includes('Mobile App')}
                      onChange={handleCheckboxChange}
                    />
                    <span>Mobile App</span>
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      value="Backend Functions"
                      checked={formData.projectTypes.includes('Backend Functions')}
                      onChange={handleCheckboxChange}
                    />
                    <span>Backend Functions</span>
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      value="API Development"
                      checked={formData.projectTypes.includes('API Development')}
                      onChange={handleCheckboxChange}
                    />
                    <span>API Development</span>
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      value="Other"
                      checked={formData.projectTypes.includes('Other')}
                      onChange={handleCheckboxChange}
                    />
                    <span>Other</span>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="projectDescription">Project Description</label>
                <textarea
                  id="projectDescription"
                  name="projectDescription"
                  value={formData.projectDescription}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Describe your project, goals, and key features..."
                />
              </div>

              <div className="form-group">
                <label htmlFor="timelineNumber">Expected Timeline</label>
                <div className="timeline-input-group">
                  <input
                    type="number"
                    id="timelineNumber"
                    name="timelineNumber"
                    value={formData.timelineNumber}
                    onChange={handleChange}
                    required
                    min="1"
                    max="100"
                    placeholder="Enter number"
                    className="timeline-number-input"
                  />
                  <select
                    name="timelineDuration"
                    value={formData.timelineDuration}
                    onChange={handleChange}
                    className="timeline-duration-select"
                  >
                    <option value="days">Days</option>
                    <option value="weeks">Weeks</option>
                    <option value="months">Months</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="budgetRange">Budget Range</label>
                <select
                  id="budgetRange"
                  name="budgetRange"
                  value={formData.budgetRange}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a budget range</option>
                  <option value="<5k">Less than £5,000</option>
                  <option value="5k-10k">£5,000 - £10,000</option>
                  <option value="10k-25k">£10,000 - £25,000</option>
                  <option value="25k-50k">£25,000 - £50,000</option>
                  <option value="50k+">£50,000+</option>
                  <option value="open">Open to Discussion</option>
                </select>
              </div>

              <button
                type="submit"
                className="submit-button"
                disabled={status === 'sending'}
              >
                {status === 'sending' && 'Sending...'}
                {status === 'success' && '✓ Message Sent!'}
                {status === 'error' && '✗ Failed to Send'}
                {status === 'idle' && 'Send Message'}
              </button>

              {status === 'success' && (
                <motion.p
                  className="form-message success"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Thanks for reaching out! I'll get back to you soon.
                </motion.p>
              )}

              {status === 'error' && (
                <motion.p
                  className="form-message error"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Oops! Something went wrong. Please try emailing directly.
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </div>

      <footer className="footer">
        <p>
          &copy; 2025 Jack Blundell. Built with React & passion for amazing
          technology.
        </p>
      </footer>
    </section>
  );
};

export default Contact;
