import React from 'react';
import './Privacy.css';

const Privacy = React.memo(function Privacy() {
  return (
    <div className="privacy-page">
      {/* Hero */}
      <section className="privacy-hero">
        <div className="container">
          <div className="privacy-hero-content">
            <span className="privacy-tag">Legal</span>
            <h1>Privacy Policy</h1>
            <p className="privacy-intro">Last Updated: 08 March 2026</p>
            <p>Medikal Africa is committed to protecting the privacy and security of healthcare data. This policy outlines how we collect, use, store, and protect information in our AI-powered clinical intelligence platform.</p>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="privacy-toc">
        <div className="container">
          <div className="toc-card">
            <h3>Table of Contents</h3>
            <nav className="toc-nav">
              <a href="#overview">1. Overview</a>
              <a href="#data-collection">2. Data Collection</a>
              <a href="#data-use">3. Data Use & Processing</a>
              <a href="#data-security">4. Data Security</a>
              <a href="#data-sharing">5. Data Sharing & Disclosure</a>
              <a href="#data-retention">6. Data Retention</a>
              <a href="#user-rights">7. User Rights</a>
              <a href="#compliance">8. Compliance & Standards</a>
              <a href="#changes">9. Policy Changes</a>
              <a href="#contact">10. Contact Information</a>
            </nav>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="privacy-content">
        <div className="container">
          <div className="privacy-sections">
            
            {/* Overview */}
            <section id="overview" className="privacy-section">
              <div className="section-header">
                <span className="section-code">PP-001</span>
                <h2>1. Overview</h2>
              </div>
              <div className="section-body">
                <p>Medikal Africa ("we," "our," or "us") operates an AI-powered clinical intelligence platform designed to detect antimicrobial resistance (AMR) patterns across African healthcare systems. This Privacy Policy describes our practices regarding the collection, use, and protection of healthcare data.</p>
                
                <div className="info-box">
                  <h4>Scope</h4>
                  <p>This policy applies to all data processed through the Medikal platform, including clinical data, prescription records, laboratory results, and any information collected from healthcare facilities, laboratories, and public health agencies.</p>
                </div>

                <div className="info-box">
                  <h4>Data Controller</h4>
                  <p>Medikal Africa, headquartered in Ottawa, Canada, serves as the data controller for information processed through our platform. Healthcare facilities and institutions using our services act as data processors for their respective patient data.</p>
                </div>
              </div>
            </section>

            {/* Data Collection */}
            <section id="data-collection" className="privacy-section">
              <div className="section-header">
                <span className="section-code">PP-002</span>
                <h2>2. Data Collection</h2>
              </div>
              <div className="section-body">
                <p>We collect and process the following categories of healthcare data:</p>

                <div className="data-category">
                  <h4>Clinical Data</h4>
                  <ul>
                    <li>Prescription records and antibiotic usage patterns</li>
                    <li>Laboratory test results and susceptibility data</li>
                    <li>Diagnostic imaging data (X-rays, scans)</li>
                    <li>Patient symptoms and clinical notes (anonymized)</li>
                    <li>Treatment outcomes and clinical responses</li>
                  </ul>
                </div>

                <div className="data-category">
                  <h4>Operational Data</h4>
                  <ul>
                    <li>Healthcare facility identifiers and locations</li>
                    <li>System usage logs and access records</li>
                    <li>Platform performance metrics</li>
                    <li>Integration and API usage data</li>
                  </ul>
                </div>

                <div className="data-category">
                  <h4>Anonymized Research Data</h4>
                  <ul>
                    <li>Aggregated AMR resistance patterns</li>
                    <li>Epidemiological trend data</li>
                    <li>Geographic distribution statistics</li>
                    <li>Time-series analysis data</li>
                  </ul>
                </div>

                <div className="info-box">
                  <h4>Personal Identifiable Information (PII)</h4>
                  <p>All patient-identifiable information is automatically anonymized or pseudonymized before processing. We do not store patient names, addresses, phone numbers, or other direct identifiers. Personal identifiers are stripped at the source facility level before data transmission to our platform.</p>
                </div>
              </div>
            </section>

            {/* Data Use */}
            <section id="data-use" className="privacy-section">
              <div className="section-header">
                <span className="section-code">PP-003</span>
                <h2>3. Data Use & Processing</h2>
              </div>
              <div className="section-body">
                <p>We use collected data exclusively for the following purposes:</p>

                <div className="use-case">
                  <div className="use-case-header">
                    <span className="use-code">UC-001</span>
                    <h4>AMR Detection & Surveillance</h4>
                  </div>
                  <p>AI-powered analysis of resistance patterns to identify emerging threats and provide early warning alerts to healthcare facilities and public health authorities.</p>
                </div>

                <div className="use-case">
                  <div className="use-case-header">
                    <span className="use-code">UC-002</span>
                    <h4>Clinical Decision Support</h4>
                  </div>
                  <p>Providing evidence-based treatment recommendations to clinicians based on local resistance patterns and clinical guidelines.</p>
                </div>

                <div className="use-case">
                  <div className="use-case-header">
                    <span className="use-code">UC-003</span>
                    <h4>Public Health Intelligence</h4>
                  </div>
                  <p>Generating aggregated reports and dashboards for ministries of health and public health agencies to monitor AMR trends and allocate resources.</p>
                </div>

                <div className="use-case">
                  <div className="use-case-header">
                    <span className="use-code">UC-004</span>
                    <h4>Research & Analytics</h4>
                  </div>
                  <p>Conducting anonymized research on AMR trends, treatment outcomes, and epidemiological patterns to advance scientific understanding of antimicrobial resistance in Africa.</p>
                </div>

                <div className="info-box">
                  <h4>Legal Basis</h4>
                  <p>Data processing is conducted under the following legal bases:</p>
                  <ul>
                    <li><strong>Public Health Interest:</strong> Processing necessary for public health surveillance and protection</li>
                    <li><strong>Legitimate Interest:</strong> Improving healthcare outcomes and AMR detection capabilities</li>
                    <li><strong>Consent:</strong> Where required by local regulations, explicit consent is obtained from healthcare facilities</li>
                    <li><strong>Legal Obligation:</strong> Compliance with healthcare reporting requirements and public health mandates</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Data Security */}
            <section id="data-security" className="privacy-section">
              <div className="section-header">
                <span className="section-code">PP-004</span>
                <h2>4. Data Security</h2>
              </div>
              <div className="section-body">
                <p>We implement comprehensive security measures to protect healthcare data:</p>

                <div className="security-measure">
                  <div className="measure-header">
                    <span className="measure-code">SEC-001</span>
                    <h4>Encryption</h4>
                  </div>
                  <ul>
                    <li><strong>In Transit:</strong> TLS 1.3 encryption for all API communications and data transfers</li>
                    <li><strong>At Rest:</strong> AES-256 encryption for all stored data</li>
                    <li><strong>Database:</strong> Encrypted database storage with key management</li>
                  </ul>
                </div>

                <div className="security-measure">
                  <div className="measure-header">
                    <span className="measure-code">SEC-002</span>
                    <h4>Access Controls</h4>
                  </div>
                  <ul>
                    <li>Role-based access control (RBAC) aligned with clinical workflows</li>
                    <li>Multi-factor authentication (MFA) for all system access</li>
                    <li>Principle of least privilege for user permissions</li>
                    <li>Regular access reviews and permission audits</li>
                  </ul>
                </div>

                <div className="security-measure">
                  <div className="measure-header">
                    <span className="measure-code">SEC-003</span>
                    <h4>Infrastructure Security</h4>
                  </div>
                  <ul>
                    <li>Secure cloud infrastructure with ISO 27001 compliance</li>
                    <li>Network segmentation and firewall protection</li>
                    <li>Intrusion detection and monitoring systems</li>
                    <li>Regular security assessments and penetration testing</li>
                  </ul>
                </div>

                <div className="security-measure">
                  <div className="measure-header">
                    <span className="measure-code">SEC-004</span>
                    <h4>Data Anonymization</h4>
                  </div>
                  <ul>
                    <li>Automated PII removal before data processing</li>
                    <li>Pseudonymization techniques for research data</li>
                    <li>K-anonymity and differential privacy methods</li>
                    <li>Regular audits of anonymization processes</li>
                  </ul>
                </div>

                <div className="security-measure">
                  <div className="measure-header">
                    <span className="measure-code">SEC-005</span>
                    <h4>Audit & Monitoring</h4>
                  </div>
                  <ul>
                    <li>Comprehensive audit logging of all data access and operations</li>
                    <li>Real-time monitoring for suspicious activities</li>
                    <li>Incident response procedures and breach notification protocols</li>
                    <li>Regular security training for all personnel</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Data Sharing */}
            <section id="data-sharing" className="privacy-section">
              <div className="section-header">
                <span className="section-code">PP-005</span>
                <h2>5. Data Sharing & Disclosure</h2>
              </div>
              <div className="section-body">
                <p>We share data only under the following circumstances:</p>

                <div className="sharing-scenario">
                  <h4>Healthcare Facilities</h4>
                  <p>Data is shared back to originating healthcare facilities for clinical decision support and operational purposes. Facilities only access their own data unless explicitly authorized for multi-facility networks.</p>
                </div>

                <div className="sharing-scenario">
                  <h4>Public Health Authorities</h4>
                  <p>Aggregated, anonymized AMR surveillance data is shared with ministries of health, Africa CDC, WHO, and other authorized public health agencies for continental surveillance and policy development.</p>
                </div>

                <div className="sharing-scenario">
                  <h4>Research Institutions</h4>
                  <p>Anonymized research data may be shared with academic institutions and research organizations under data sharing agreements, with strict controls on data use and publication.</p>
                </div>

                <div className="sharing-scenario">
                  <h4>Service Providers</h4>
                  <p>We may share data with trusted service providers (cloud infrastructure, security services) under strict contractual obligations and data processing agreements.</p>
                </div>

                <div className="info-box warning">
                  <h4>No Commercial Sale</h4>
                  <p>We do not sell, rent, or lease healthcare data to third parties for commercial purposes. All data sharing is conducted under strict agreements for healthcare, research, or public health purposes only.</p>
                </div>

                <div className="info-box">
                  <h4>Legal Requirements</h4>
                  <p>We may disclose data if required by law, court order, or regulatory authority, or to protect the rights, property, or safety of Medikal Africa, our users, or the public.</p>
                </div>
              </div>
            </section>

            {/* Data Retention */}
            <section id="data-retention" className="privacy-section">
              <div className="section-header">
                <span className="section-code">PP-006</span>
                <h2>6. Data Retention</h2>
              </div>
              <div className="section-body">
                <div className="retention-policy">
                  <h4>Retention Periods</h4>
                  <ul>
                    <li><strong>Active Clinical Data:</strong> Retained for the duration of the service agreement with healthcare facilities</li>
                    <li><strong>Anonymized Research Data:</strong> Retained indefinitely for longitudinal AMR trend analysis</li>
                    <li><strong>Audit Logs:</strong> Retained for 7 years for compliance and security purposes</li>
                    <li><strong>System Backups:</strong> Retained according to disaster recovery protocols (typically 30-90 days)</li>
                  </ul>
                </div>

                <div className="retention-policy">
                  <h4>Data Deletion</h4>
                  <ul>
                    <li>Upon termination of service agreements, clinical data is securely deleted within 90 days</li>
                    <li>Healthcare facilities may request immediate data deletion, subject to legal retention requirements</li>
                    <li>Anonymized research data may be retained for scientific purposes even after service termination</li>
                    <li>All data deletion follows secure erasure protocols meeting industry standards</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* User Rights */}
            <section id="user-rights" className="privacy-section">
              <div className="section-header">
                <span className="section-code">PP-007</span>
                <h2>7. User Rights</h2>
              </div>
              <div className="section-body">
                <p>Healthcare facilities and authorized users have the following rights regarding their data:</p>

                <div className="right-item">
                  <h4>Right to Access</h4>
                  <p>Request access to data processed about your facility, including what data is collected, how it's used, and with whom it's shared.</p>
                </div>

                <div className="right-item">
                  <h4>Right to Rectification</h4>
                  <p>Request correction of inaccurate or incomplete data through your facility administrator or our support team.</p>
                </div>

                <div className="right-item">
                  <h4>Right to Erasure</h4>
                  <p>Request deletion of your facility's data, subject to legal obligations and public health requirements for data retention.</p>
                </div>

                <div className="right-item">
                  <h4>Right to Restrict Processing</h4>
                  <p>Request limitation of data processing activities in certain circumstances, while maintaining essential service functionality.</p>
                </div>

                <div className="right-item">
                  <h4>Right to Data Portability</h4>
                  <p>Request export of your facility's data in a machine-readable format for transfer to another system.</p>
                </div>

                <div className="right-item">
                  <h4>Right to Object</h4>
                  <p>Object to certain types of data processing, particularly for research or analytics purposes, where legally permitted.</p>
                </div>

                <div className="info-box">
                  <h4>Exercising Your Rights</h4>
                  <p>To exercise any of these rights, please contact us at <a href="mailto:privacy@medikalafrica.com">privacy@medikalafrica.com</a> or through your facility administrator. We will respond to requests within 30 days, subject to verification of identity and authorization.</p>
                </div>
              </div>
            </section>

            {/* Compliance */}
            <section id="compliance" className="privacy-section">
              <div className="section-header">
                <span className="section-code">PP-008</span>
                <h2>8. Compliance & Standards</h2>
              </div>
              <div className="section-body">
                <p>Medikal Africa adheres to the following standards and regulations:</p>

                <div className="compliance-item">
                  <h4>International Standards</h4>
                  <ul>
                    <li><strong>ISO 27001:</strong> Information security management</li>
                    <li><strong>ISO 27799:</strong> Health informatics security</li>
                    <li><strong>HL7 FHIR:</strong> Healthcare data interoperability standards</li>
                    <li><strong>HIPAA:</strong> Health Insurance Portability and Accountability Act (where applicable)</li>
                  </ul>
                </div>

                <div className="compliance-item">
                  <h4>Regional Compliance</h4>
                  <ul>
                    <li>African Union data protection frameworks</li>
                    <li>Country-specific healthcare data regulations</li>
                    <li>Public health surveillance requirements</li>
                    <li>Medical device and software regulations (where applicable)</li>
                  </ul>
                </div>

                <div className="compliance-item">
                  <h4>Certifications & Audits</h4>
                  <ul>
                    <li>Regular third-party security audits</li>
                    <li>Penetration testing and vulnerability assessments</li>
                    <li>Compliance reviews with legal and regulatory experts</li>
                    <li>Ongoing monitoring and improvement of security practices</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Changes */}
            <section id="changes" className="privacy-section">
              <div className="section-header">
                <span className="section-code">PP-009</span>
                <h2>9. Policy Changes</h2>
              </div>
              <div className="section-body">
                <p>We may update this Privacy Policy periodically to reflect changes in our practices, technology, legal requirements, or other factors. When we make material changes:</p>
                <ul>
                  <li>We will notify all registered healthcare facilities via email</li>
                  <li>We will update the "Last Updated" date at the top of this policy</li>
                  <li>We will provide at least 30 days' notice for significant changes</li>
                  <li>Continued use of our services after changes constitutes acceptance of the updated policy</li>
                </ul>
                <p>We encourage you to review this policy regularly to stay informed about how we protect your data.</p>
              </div>
            </section>

            {/* Contact */}
            <section id="contact" className="privacy-section">
              <div className="section-header">
                <span className="section-code">PP-010</span>
                <h2>10. Contact Information</h2>
              </div>
              <div className="section-body">
                <p>For questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact:</p>

                <div className="contact-info">
                  <div className="contact-item">
                    <h4>Privacy Officer</h4>
                    <p>Medikal Africa</p>
                    <p>Ottawa, Canada</p>
                    <p><a href="mailto:privacy@medikalafrica.com">privacy@medikalafrica.com</a></p>
                  </div>

                  <div className="contact-item">
                    <h4>Data Protection Officer</h4>
                    <p>For GDPR-related inquiries (where applicable)</p>
                    <p><a href="mailto:dpo@medikalafrica.com">dpo@medikalafrica.com</a></p>
                  </div>

                  <div className="contact-item">
                    <h4>General Inquiries</h4>
                    <p><a href="mailto:info@medikalafrica.com">info@medikalafrica.com</a></p>
                  </div>
                </div>
              </div>
            </section>

          </div>
        </div>
      </section>
    </div>
  );
});

export default Privacy;
