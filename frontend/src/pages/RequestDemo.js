import React, { useState, useCallback } from 'react';
import './RequestDemo.css';

// Free email service - Get your access key from https://web3forms.com
// It's completely free and requires no backend!
const WEB3FORMS_ACCESS_KEY = process.env.REACT_APP_WEB3FORMS_KEY || 'YOUR_ACCESS_KEY_HERE';
const RECIPIENT_EMAIL = 'info@medikalafrica.com'; // Your email to receive submissions

const contactTypes = [
  {
    id: 'demo',
    code: 'CT-001',
    title: 'Request Demo',
    description: 'Schedule a personalized demonstration of the Medikal platform for your organization.',
    responseTime: '<24 hours',
    fields: ['name', 'email', 'organization', 'country', 'facilityType', 'message']
  },
  {
    id: 'partnership',
    code: 'CT-002',
    title: 'Partnership Inquiry',
    description: 'Explore strategic partnerships, integrations, or collaboration opportunities.',
    responseTime: '<48 hours',
    fields: ['name', 'email', 'organization', 'country', 'partnershipType', 'message']
  },
  {
    id: 'research',
    code: 'CT-003',
    title: 'Research Data Access',
    description: 'Request access to anonymized AMR surveillance data for research purposes.',
    responseTime: '<72 hours',
    fields: ['name', 'email', 'organization', 'country', 'researchInstitution', 'researchPurpose', 'message']
  },
  {
    id: 'support',
    code: 'CT-004',
    title: 'Technical Support',
    description: 'Get help with platform integration, technical issues, or implementation questions.',
    responseTime: '<12 hours',
    fields: ['name', 'email', 'organization', 'country', 'supportType', 'message']
  }
];

const RequestDemo = React.memo(function RequestDemo() {
  const [activeType, setActiveType] = useState('demo');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: null, message: '' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    country: '',
    facilityType: '',
    partnershipType: '',
    researchInstitution: '',
    researchPurpose: '',
    supportType: '',
    message: ''
  });

  const activeContact = contactTypes.find(ct => ct.id === activeType);

  const handleChange = useCallback((e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    // Clear status when user starts typing
    if (submitStatus.type) {
      setSubmitStatus({ type: null, message: '' });
    }
  }, [submitStatus]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      // Prepare form data for Web3Forms
      const formPayload = {
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: `${activeContact.title} - ${formData.name} from ${formData.organization}`,
        from_name: formData.name,
        email: formData.email,
        // Format the message with all form fields
        message: `
Contact Type: ${activeContact.title} (${activeContact.code})
Response Time: ${activeContact.responseTime}

--- Contact Information ---
Name: ${formData.name}
Email: ${formData.email}
Organization: ${formData.organization}
Country: ${formData.country}

${activeType === 'demo' && formData.facilityType ? `Facility Type: ${formData.facilityType}\n` : ''}
${activeType === 'partnership' && formData.partnershipType ? `Partnership Type: ${formData.partnershipType}\n` : ''}
${activeType === 'research' && formData.researchInstitution ? `Research Institution: ${formData.researchInstitution}\n` : ''}
${activeType === 'research' && formData.researchPurpose ? `Research Purpose: ${formData.researchPurpose}\n` : ''}
${activeType === 'support' && formData.supportType ? `Support Type: ${formData.supportType}\n` : ''}

--- Message ---
${formData.message || 'No message provided'}
        `.trim()
      };

      // Send to Web3Forms API
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formPayload)
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus({
          type: 'success',
          message: `Thank you, ${formData.name}! We've received your ${activeContact.title.toLowerCase()} request and will respond within ${activeContact.responseTime}.`
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          organization: '',
          country: '',
          facilityType: '',
          partnershipType: '',
          researchInstitution: '',
          researchPurpose: '',
          supportType: '',
          message: ''
        });

        // Scroll to top to show success message
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Sorry, there was an error submitting your request. Please try again or contact us directly at info@medikalafrica.com'
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, activeType, activeContact]);

  return (
    <div className="contact-page">
      {/* Hero */}
      <section className="contact-hero">
        <div className="container">
          <div className="contact-hero-content">
            <span className="contact-tag">Contact Us</span>
            <h1>Get in Touch</h1>
            <p>Connect with our team for demos, partnerships, research data access, or technical support. We're here to help strengthen healthcare systems across Africa.</p>
          </div>
        </div>
      </section>

      {/* Contact Types */}
      <section className="contact-types-section">
        <div className="container">
          <div className="contact-types-grid">
            {contactTypes.map((type) => (
              <button
                key={type.id}
                className={`contact-type-card ${activeType === type.id ? 'active' : ''}`}
                onClick={() => setActiveType(type.id)}
              >
                <div className="type-code">{type.code}</div>
                <h3>{type.title}</h3>
                <p>{type.description}</p>
                <div className="type-response">
                  <span className="response-label">Response Time</span>
                  <span className="response-value">{type.responseTime}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="contact-form-section">
        <div className="container">
          <div className="form-container">
            <div className="form-header">
              <div className="form-header-left">
                <span className="form-code">{activeContact.code}</span>
                <h2>{activeContact.title}</h2>
                <p>{activeContact.description}</p>
              </div>
              <div className="form-header-right">
                <div className="response-info">
                  <span className="info-label">Expected Response</span>
                  <span className="info-value">{activeContact.responseTime}</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="contact-form">
              {/* Status Messages */}
              {submitStatus.type && (
                <div className={`form-status ${submitStatus.type}`}>
                  {submitStatus.type === 'success' && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  )}
                  {submitStatus.type === 'error' && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                  )}
                  <span>{submitStatus.message}</span>
                </div>
              )}

              {/* Setup Notice - Remove this after adding your access key */}
              {WEB3FORMS_ACCESS_KEY === 'YOUR_ACCESS_KEY_HERE' && (
                <div className="form-status warning">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                  <span>
                    <strong>Setup Required:</strong> Get your free access key from{' '}
                    <a href="https://web3forms.com" target="_blank" rel="noopener noreferrer" style={{ color: '#5EC4D5', textDecoration: 'underline' }}>
                      web3forms.com
                    </a>
                    {' '}and add it to your .env file as REACT_APP_WEB3FORMS_KEY
                  </span>
                </div>
              )}

              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label" htmlFor="name">
                    Full Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-input"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="email">
                    Work Email <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-input"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john.doe@organization.com"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="organization">
                    Organization <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    className="form-input"
                    required
                    value={formData.organization}
                    onChange={handleChange}
                    placeholder="Hospital, Ministry, Research Institution"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="country">
                    Country <span className="required">*</span>
                  </label>
                  <select
                    id="country"
                    name="country"
                    className="form-select"
                    required
                    value={formData.country}
                    onChange={handleChange}
                  >
                    <option value="">Select country</option>
                    <option value="Rwanda">Rwanda</option>
                    <option value="Kenya">Kenya</option>
                    <option value="Uganda">Uganda</option>
                    <option value="Tanzania">Tanzania</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="South Africa">South Africa</option>
                    <option value="Ghana">Ghana</option>
                    <option value="Ethiopia">Ethiopia</option>
                    <option value="Senegal">Senegal</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {activeType === 'demo' && (
                  <div className="form-group">
                    <label className="form-label" htmlFor="facilityType">
                      Facility Type <span className="required">*</span>
                    </label>
                    <select
                      id="facilityType"
                      name="facilityType"
                      className="form-select"
                      required
                      value={formData.facilityType}
                      onChange={handleChange}
                    >
                      <option value="">Select facility type</option>
                      <option value="Hospital">Hospital</option>
                      <option value="Clinic">Clinic</option>
                      <option value="Laboratory">Laboratory</option>
                      <option value="Ministry of Health">Ministry of Health</option>
                      <option value="Public Health Agency">Public Health Agency</option>
                      <option value="Research Institution">Research Institution</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                )}

                {activeType === 'partnership' && (
                  <div className="form-group">
                    <label className="form-label" htmlFor="partnershipType">
                      Partnership Type <span className="required">*</span>
                    </label>
                    <select
                      id="partnershipType"
                      name="partnershipType"
                      className="form-select"
                      required
                      value={formData.partnershipType}
                      onChange={handleChange}
                    >
                      <option value="">Select partnership type</option>
                      <option value="Technology Integration">Technology Integration</option>
                      <option value="Strategic Partnership">Strategic Partnership</option>
                      <option value="Distribution Partnership">Distribution Partnership</option>
                      <option value="Research Collaboration">Research Collaboration</option>
                      <option value="Investment">Investment</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                )}

                {activeType === 'research' && (
                  <>
                    <div className="form-group">
                      <label className="form-label" htmlFor="researchInstitution">
                        Research Institution <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        id="researchInstitution"
                        name="researchInstitution"
                        className="form-input"
                        required
                        value={formData.researchInstitution}
                        onChange={handleChange}
                        placeholder="University, Research Center"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="researchPurpose">
                        Research Purpose <span className="required">*</span>
                      </label>
                      <select
                        id="researchPurpose"
                        name="researchPurpose"
                        className="form-select"
                        required
                        value={formData.researchPurpose}
                        onChange={handleChange}
                      >
                        <option value="">Select purpose</option>
                        <option value="Academic Research">Academic Research</option>
                        <option value="Epidemiological Study">Epidemiological Study</option>
                        <option value="Clinical Trial">Clinical Trial</option>
                        <option value="Policy Development">Policy Development</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </>
                )}

                {activeType === 'support' && (
                  <div className="form-group">
                    <label className="form-label" htmlFor="supportType">
                      Support Type <span className="required">*</span>
                    </label>
                    <select
                      id="supportType"
                      name="supportType"
                      className="form-select"
                      required
                      value={formData.supportType}
                      onChange={handleChange}
                    >
                      <option value="">Select support type</option>
                      <option value="Platform Integration">Platform Integration</option>
                      <option value="Technical Issue">Technical Issue</option>
                      <option value="Implementation Support">Implementation Support</option>
                      <option value="API Documentation">API Documentation</option>
                      <option value="Training Request">Training Request</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                )}
              </div>

              <div className="form-group full-width">
                <label className="form-label" htmlFor="message">
                  Message {activeType === 'research' && <span className="required">*</span>}
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="form-textarea"
                  required={activeType === 'research'}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={activeType === 'research' ? 'Describe your research objectives and data requirements' : 'Tell us more about your needs or questions'}
                  rows="6"
                />
              </div>

              <button 
                type="submit" 
                className="form-submit-btn"
                disabled={isSubmitting || WEB3FORMS_ACCESS_KEY === 'YOUR_ACCESS_KEY_HERE'}
              >
                {isSubmitting ? (
                  <>
                    <svg className="spinner" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                    Submitting...
                  </>
                ) : (
                  'Submit Request'
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="contact-info-section">
        <div className="container">
          <div className="contact-info-grid">
            <div className="info-card">
              <div className="info-code">CI-001</div>
              <h3>Email</h3>
              <p>For general inquiries</p>
              <a href="mailto:info@medikalafrica.com" className="info-link">info@medikalafrica.com</a>
            </div>
            <div className="info-card">
              <div className="info-code">CI-002</div>
              <h3>Response Time</h3>
              <p>We typically respond within</p>
              <div className="info-value">24-48 hours</div>
            </div>
            <div className="info-card">
              <div className="info-code">CI-003</div>
              <h3>Office Hours</h3>
              <p>Monday - Friday</p>
              <div className="info-value">9:00 AM - 5:00 PM EAT</div>
            </div>
            <div className="info-card">
              <div className="info-code">CI-004</div>
              <h3>Location</h3>
              <p>Headquarters</p>
              <div className="info-value">Kigali, Rwanda</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});

export default RequestDemo;
