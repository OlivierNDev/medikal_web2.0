import React, { useState } from 'react';

function RequestDemo() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    country: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you! We will reach out within 24 hours.');
  };

  return (
    <section className="form-section" style={{ paddingTop: '10rem' }} data-testid="request-section">
      <div className="container">
        <div className="section-header" style={{ marginBottom: '3rem' }}>
          <h2>Request a Demo</h2>
          <p>Our team will reach out within 24 hours.</p>
        </div>

        <div className="form-card" data-testid="request-form-card">
          <form onSubmit={handleSubmit} data-testid="request-form">
            <div className="form-group">
              <label className="form-label" htmlFor="name">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-input"
                required
                value={formData.name}
                onChange={handleChange}
                data-testid="input-name"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">Work Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input"
                required
                value={formData.email}
                onChange={handleChange}
                data-testid="input-email"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="organization">Organization *</label>
              <input
                type="text"
                id="organization"
                name="organization"
                className="form-input"
                required
                value={formData.organization}
                onChange={handleChange}
                data-testid="input-organization"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="country">Country *</label>
              <select
                id="country"
                name="country"
                className="form-select"
                required
                value={formData.country}
                onChange={handleChange}
                data-testid="select-country"
              >
                <option value="">Select country</option>
                <option value="Rwanda">Rwanda</option>
                <option value="Kenya">Kenya</option>
                <option value="Uganda">Uganda</option>
                <option value="Tanzania">Tanzania</option>
                <option value="Nigeria">Nigeria</option>
                <option value="South Africa">South Africa</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="message">Message (optional)</label>
              <textarea
                id="message"
                name="message"
                className="form-textarea"
                placeholder="Tell us about your needs"
                value={formData.message}
                onChange={handleChange}
                data-testid="textarea-message"
              />
            </div>

            <button type="submit" className="btn-primary form-submit" data-testid="submit-button">
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default RequestDemo;
