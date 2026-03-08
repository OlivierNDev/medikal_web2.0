import React from 'react';
import './Security.css';

const securityMeasures = [
  {
    id: 1,
    code: 'SEC-001',
    category: 'Encryption',
    title: 'End-to-End Encryption',
    description: 'All data is encrypted in transit and at rest using industry-standard encryption protocols.',
    details: [
      { label: 'In Transit', value: 'TLS 1.3' },
      { label: 'At Rest', value: 'AES-256' },
      { label: 'Key Management', value: 'HSM-Based' },
      { label: 'Certificate Authority', value: 'Let\'s Encrypt / Commercial CA' }
    ],
    technical: 'Data encryption follows NIST SP 800-175B guidelines with FIPS 140-2 Level 3 validated cryptographic modules.'
  },
  {
    id: 2,
    code: 'SEC-002',
    category: 'Access Control',
    title: 'Multi-Layer Authentication',
    description: 'Comprehensive access control system with role-based permissions and multi-factor authentication.',
    details: [
      { label: 'MFA Required', value: 'Yes' },
      { label: 'RBAC Levels', value: '5+ Roles' },
      { label: 'Session Timeout', value: '15 min idle' },
      { label: 'Password Policy', value: 'NIST 800-63B' }
    ],
    technical: 'Implements OAuth 2.0, SAML 2.0, and OpenID Connect for federated identity management. Access logs are immutable and auditable.'
  },
  {
    id: 3,
    code: 'SEC-003',
    category: 'Infrastructure',
    title: 'Secure Cloud Architecture',
    description: 'Enterprise-grade infrastructure with network segmentation, firewalls, and intrusion detection.',
    details: [
      { label: 'Framework', value: 'ISO 27001 Aligned' },
      { label: 'Data Centers', value: 'Multi-Region' },
      { label: 'Backup Frequency', value: 'Real-Time' },
      { label: 'Disaster Recovery', value: 'RTO < 4h' }
    ],
    technical: 'Infrastructure hosted on AWS/Azure with VPC isolation, WAF protection, and DDoS mitigation. Regular penetration testing and vulnerability assessments.'
  },
  {
    id: 4,
    code: 'SEC-004',
    category: 'Data Protection',
    title: 'Anonymization & Pseudonymization',
    description: 'Advanced data anonymization techniques to protect patient privacy while enabling research.',
    details: [
      { label: 'Anonymization Method', value: 'K-Anonymity' },
      { label: 'Differential Privacy', value: 'ε = 0.1' },
      { label: 'PII Removal', value: 'Automated' },
      { label: 'Re-identification Risk', value: '< 0.1%' }
    ],
    technical: 'Implements k-anonymity (k≥5), l-diversity, and t-closeness models. Differential privacy with ε-differential privacy guarantees for aggregate statistics.'
  },
  {
    id: 5,
    code: 'SEC-005',
    category: 'Monitoring',
    title: 'Continuous Security Monitoring',
    description: 'Real-time threat detection, security event logging, and automated incident response.',
    details: [
      { label: 'SIEM Integration', value: '24/7 Monitoring' },
      { label: 'Threat Detection', value: 'AI-Powered' },
      { label: 'Alert Response', value: '< 5 minutes' },
      { label: 'Audit Log Retention', value: '7 years' }
    ],
    technical: 'Security Information and Event Management (SIEM) with machine learning-based anomaly detection. All security events logged to immutable storage with cryptographic integrity verification.'
  },
  {
    id: 6,
    code: 'SEC-006',
    category: 'Compliance',
    title: 'Regulatory Compliance',
    description: 'Adherence to international and regional data protection and healthcare regulations.',
    details: [
      { label: 'ISO Standards', value: '27001, 27799' },
      { label: 'HIPAA', value: 'Architecture Designed' },
      { label: 'GDPR', value: 'Privacy Framework' },
      { label: 'Local Regulations', value: 'Country-Specific' }
    ],
    technical: 'Security architecture designed to support compliance with international healthcare regulations. Regular security assessments and continuous monitoring of regulatory changes. Data Processing Agreements (DPAs) with all service providers.'
  }
];

const Security = React.memo(function Security() {
  return (
    <div className="security-page">
      {/* Hero */}
      <section className="security-hero">
        <div className="container">
          <div className="security-hero-content">
            <span className="security-tag">Security</span>
            <h1>Enterprise-Grade Security</h1>
            <p className="security-intro">Last Updated: 08 March 2026</p>
            <p>Multi-layered security architecture protecting healthcare data through encryption, access controls, and continuous monitoring. Built to support global healthcare compliance frameworks.</p>
          </div>
        </div>
      </section>

      {/* Security Overview */}
      <section className="security-overview">
        <div className="container">
          <div className="overview-stats">
            <div className="overview-stat">
              <div className="stat-code">SEC-STAT-001</div>
              <div className="stat-value">99.9%</div>
              <div className="stat-label">Uptime SLA</div>
            </div>
            <div className="overview-stat">
              <div className="stat-code">SEC-STAT-002</div>
              <div className="stat-value">&lt;5min</div>
              <div className="stat-label">Threat Response</div>
            </div>
            <div className="overview-stat">
              <div className="stat-code">SEC-STAT-003</div>
              <div className="stat-value">AES-256</div>
              <div className="stat-label">Encryption Standard</div>
            </div>
            <div className="overview-stat">
              <div className="stat-code">SEC-STAT-004</div>
              <div className="stat-value">ISO 27001</div>
              <div className="stat-label">Framework</div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Measures */}
      <section className="security-measures-section">
        <div className="container">
          <div className="section-header">
            <h2>Security Architecture</h2>
            <p>Comprehensive security measures protecting healthcare data at every layer of the platform.</p>
          </div>

          <div className="security-measures-grid">
            {securityMeasures.map((measure, index) => (
              <div key={measure.id} className="security-measure-card">
                <div className="measure-header">
                  <div className="measure-meta">
                    <span className="measure-category">{measure.category}</span>
                    <span className="measure-code">{measure.code}</span>
                  </div>
                </div>
                <h3>{measure.title}</h3>
                <p className="measure-description">{measure.description}</p>
                
                <div className="measure-details">
                  {measure.details.map((detail, i) => (
                    <div key={i} className="detail-row">
                      <span className="detail-label">{detail.label}</span>
                      <span className="detail-value">{detail.value}</span>
                    </div>
                  ))}
                </div>

                <div className="measure-technical">
                  <div className="technical-label">Technical Specification</div>
                  <p>{measure.technical}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Standards */}
      <section className="security-standards-section">
        <div className="container">
          <div className="section-header">
            <h2>Security & Compliance Framework</h2>
            <p>Aligned with global healthcare security standards and regulatory requirements.</p>
          </div>

          <div className="standards-grid">
            <div className="standard-card">
              <div className="standard-code">STD-001</div>
              <h4>ISO 27001</h4>
              <p>Designed for compliance with ISO 27001 Information Security Management System standards for healthcare data protection.</p>
              <div className="standard-status">In Roadmap</div>
            </div>
            <div className="standard-card">
              <div className="standard-code">STD-002</div>
              <h4>ISO 27799</h4>
              <p>Health informatics security management framework aligned with ISO 27002 guidelines.</p>
              <div className="standard-status">Planned</div>
            </div>
            <div className="standard-card">
              <div className="standard-code">STD-003</div>
              <h4>HIPAA</h4>
              <p>Security architecture designed to support HIPAA compliance for protected health information.</p>
              <div className="standard-status">Architecture Designed</div>
            </div>
            <div className="standard-card">
              <div className="standard-code">STD-004</div>
              <h4>GDPR</h4>
              <p>Privacy framework implemented to support General Data Protection Regulation requirements for European data subjects.</p>
              <div className="standard-status">Privacy Framework</div>
            </div>
            <div className="standard-card">
              <div className="standard-code">STD-005</div>
              <h4>HL7 FHIR</h4>
              <p>Built following HL7 FHIR interoperability standards for secure healthcare data exchange.</p>
              <div className="standard-status">API Standard</div>
            </div>
            <div className="standard-card">
              <div className="standard-code">STD-006</div>
              <h4>NIST Framework</h4>
              <p>Security architecture aligned with NIST Cybersecurity Framework for critical infrastructure protection.</p>
              <div className="standard-status">Security Framework</div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Practices */}
      <section className="security-practices-section">
        <div className="container">
          <div className="section-header">
            <h2>Security Practices</h2>
            <p>Ongoing security operations and best practices.</p>
          </div>

          <div className="practices-grid">
            <div className="practice-item">
              <div className="practice-code">PRC-001</div>
              <h4>Penetration Testing</h4>
              <p>Quarterly third-party penetration testing by certified security firms. All identified vulnerabilities are remediated within 30 days of discovery.</p>
            </div>
            <div className="practice-item">
              <div className="practice-code">PRC-002</div>
              <h4>Vulnerability Management</h4>
              <p>Continuous vulnerability scanning with automated patch management. Critical vulnerabilities patched within 48 hours, high-severity within 7 days.</p>
            </div>
            <div className="practice-item">
              <div className="practice-code">PRC-003</div>
              <h4>Security Training</h4>
              <p>Annual security awareness training for all personnel. Role-specific training for developers, administrators, and support staff.</p>
            </div>
            <div className="practice-item">
              <div className="practice-code">PRC-004</div>
              <h4>Incident Response</h4>
              <p>Documented incident response procedures with 24/7 security operations center. Breach notification protocols comply with regulatory requirements.</p>
            </div>
            <div className="practice-item">
              <div className="practice-code">PRC-005</div>
              <h4>Data Backup & Recovery</h4>
              <p>Real-time data replication across multiple geographic regions. Recovery Time Objective (RTO) of less than 4 hours, Recovery Point Objective (RPO) of less than 1 hour.</p>
            </div>
            <div className="practice-item">
              <div className="practice-code">PRC-006</div>
              <h4>Third-Party Audits</h4>
              <p>Annual independent security audits and assessments. SOC 2 Type II audits for service organizations handling healthcare data.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Data Security Flow */}
      <section className="security-flow-section">
        <div className="container">
          <div className="section-header">
            <h2>Data Security Flow</h2>
            <p>How data is protected throughout its lifecycle in the Medikal platform.</p>
          </div>

          <div className="flow-diagram">
            <div className="flow-step">
              <div className="flow-code">FLOW-001</div>
              <h4>Data Ingestion</h4>
              <p>TLS 1.3 encrypted transmission from healthcare facilities. Data validated and sanitized upon receipt.</p>
            </div>
            <div className="flow-arrow">→</div>
            <div className="flow-step">
              <div className="flow-code">FLOW-002</div>
              <h4>Anonymization</h4>
              <p>Automated PII removal and pseudonymization. K-anonymity and differential privacy applied.</p>
            </div>
            <div className="flow-arrow">→</div>
            <div className="flow-step">
              <div className="flow-code">FLOW-003</div>
              <h4>Encryption</h4>
              <p>AES-256 encryption at rest. Encrypted storage in isolated, access-controlled databases.</p>
            </div>
            <div className="flow-arrow">→</div>
            <div className="flow-step">
              <div className="flow-code">FLOW-004</div>
              <h4>Processing</h4>
              <p>AI processing in secure, isolated compute environments. No data leaves encrypted boundaries.</p>
            </div>
            <div className="flow-arrow">→</div>
            <div className="flow-step">
              <div className="flow-code">FLOW-005</div>
              <h4>Output</h4>
              <p>Results encrypted in transit back to authorized users. Access logged and auditable.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Security Contact */}
      <section className="security-contact-section">
        <div className="container">
          <div className="security-contact-content">
            <div className="contact-header">
              <span className="contact-code">SEC-CONTACT</span>
              <h2>Security Inquiries</h2>
            </div>
            <p>For security-related questions, vulnerability reports, or security audit requests, please contact our security team.</p>
            
            <div className="security-contacts">
              <div className="security-contact-item">
                <h4>Security Team</h4>
                <p><a href="mailto:security@medikalafrica.com">security@medikalafrica.com</a></p>
                <span className="contact-note">For security incidents and vulnerabilities</span>
              </div>
              <div className="security-contact-item">
                <h4>Compliance</h4>
                <p><a href="mailto:compliance@medikalafrica.com">compliance@medikalafrica.com</a></p>
                <span className="contact-note">For compliance and audit requests</span>
              </div>
              <div className="security-contact-item">
                <h4>Bug Bounty</h4>
                <p><a href="mailto:bugbounty@medikalafrica.com">bugbounty@medikalafrica.com</a></p>
                <span className="contact-note">For responsible vulnerability disclosure</span>
              </div>
            </div>

            <div className="info-box">
              <h4>Responsible Disclosure</h4>
              <p>We encourage responsible disclosure of security vulnerabilities. Please report security issues to our security team. We commit to acknowledging reports within 24 hours and providing updates on remediation progress.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});

export default Security;
