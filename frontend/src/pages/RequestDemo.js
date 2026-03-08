import React, { useState, useCallback } from 'react';
import './RequestDemo.css';

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
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    console.log('Form submitted:', { type: activeType, ...formData });
    alert(`Thank you! We will respond to your ${activeContact.title.toLowerCase()} request within ${activeContact.responseTime}.`);
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

              <button type="submit" className="form-submit-btn">
                Submit Request
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
