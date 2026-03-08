import React from 'react';
import './Terms.css';

const Terms = React.memo(function Terms() {
  return (
    <div className="terms-page">
      {/* Hero */}
      <section className="terms-hero">
        <div className="container">
          <div className="terms-hero-content">
            <span className="terms-tag">Legal</span>
            <h1>Terms of Service</h1>
            <p className="terms-intro">Last Updated: 08 March 2026</p>
            <p>These Terms of Service govern your use of the Medikal Africa platform. By accessing or using our services, you agree to be bound by these terms.</p>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="terms-toc">
        <div className="container">
          <div className="toc-card">
            <h3>Table of Contents</h3>
            <nav className="toc-nav">
              <a href="#acceptance">1. Acceptance of Terms</a>
              <a href="#services">2. Description of Services</a>
              <a href="#eligibility">3. Eligibility & Registration</a>
              <a href="#user-obligations">4. User Obligations</a>
              <a href="#data-ownership">5. Data Ownership & Rights</a>
              <a href="#intellectual-property">6. Intellectual Property</a>
              <a href="#service-availability">7. Service Availability</a>
              <a href="#fees-payment">8. Fees & Payment</a>
              <a href="#termination">9. Termination</a>
              <a href="#liability">10. Limitation of Liability</a>
              <a href="#indemnification">11. Indemnification</a>
              <a href="#disputes">12. Dispute Resolution</a>
              <a href="#modifications">13. Modifications to Terms</a>
              <a href="#contact">14. Contact Information</a>
            </nav>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="terms-content">
        <div className="container">
          <div className="terms-sections">
            
            {/* Acceptance */}
            <section id="acceptance" className="terms-section">
              <div className="section-header">
                <span className="section-code">TS-001</span>
                <h2>1. Acceptance of Terms</h2>
              </div>
              <div className="section-body">
                <p>By accessing, downloading, installing, or using the Medikal Africa platform ("Platform"), you ("User," "you," or "your") agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not use the Platform.</p>
                
                <div className="info-box">
                  <h4>Binding Agreement</h4>
                  <p>These Terms constitute a legally binding agreement between you and Medikal Africa. If you are using the Platform on behalf of an organization, you represent that you have authority to bind that organization to these Terms.</p>
                </div>

                <div className="info-box">
                  <h4>Additional Agreements</h4>
                  <p>Your use of specific services may be subject to additional agreements, including but not limited to Data Processing Agreements, Service Level Agreements, and Business Associate Agreements. These additional agreements supplement but do not replace these Terms.</p>
                </div>
              </div>
            </section>

            {/* Services */}
            <section id="services" className="terms-section">
              <div className="section-header">
                <span className="section-code">TS-002</span>
                <h2>2. Description of Services</h2>
              </div>
              <div className="section-body">
                <p>The Medikal Africa platform provides AI-powered clinical intelligence services for antimicrobial resistance detection and surveillance. Our services include:</p>

                <div className="service-item">
                  <div className="service-header">
                    <span className="service-code">SVC-001</span>
                    <h4>AMR Detection & Surveillance</h4>
                  </div>
                  <p>Real-time analysis of antimicrobial resistance patterns using AI models to identify emerging threats and provide early warning alerts.</p>
                </div>

                <div className="service-item">
                  <div className="service-header">
                    <span className="service-code">SVC-002</span>
                    <h4>Clinical Decision Support</h4>
                  </div>
                  <p>Evidence-based treatment recommendations and antibiotic stewardship guidance based on local resistance patterns and clinical guidelines.</p>
                </div>

                <div className="service-item">
                  <div className="service-header">
                    <span className="service-code">SVC-003</span>
                    <h4>Public Health Intelligence</h4>
                  </div>
                  <p>Aggregated dashboards and reports for ministries of health and public health agencies to monitor AMR trends and allocate resources.</p>
                </div>

                <div className="service-item">
                  <div className="service-header">
                    <span className="service-code">SVC-004</span>
                    <h4>Research Data Access</h4>
                  </div>
                  <p>Anonymized AMR surveillance data available to research institutions under data sharing agreements for scientific research purposes.</p>
                </div>

                <div className="info-box">
                  <h4>Service Modifications</h4>
                  <p>We reserve the right to modify, suspend, or discontinue any aspect of the Platform at any time, with or without notice. We will provide reasonable notice for material changes that affect your use of the Platform.</p>
                </div>
              </div>
            </section>

            {/* Eligibility */}
            <section id="eligibility" className="terms-section">
              <div className="section-header">
                <span className="section-code">TS-003</span>
                <h2>3. Eligibility & Registration</h2>
              </div>
              <div className="section-body">
                <div className="eligibility-requirement">
                  <h4>Eligible Users</h4>
                  <p>The Platform is designed for use by:</p>
                  <ul>
                    <li>Healthcare facilities (hospitals, clinics, laboratories)</li>
                    <li>Public health agencies and ministries of health</li>
                    <li>Research institutions and academic organizations</li>
                    <li>Authorized healthcare professionals and administrators</li>
                  </ul>
                </div>

                <div className="eligibility-requirement">
                  <h4>Registration Requirements</h4>
                  <ul>
                    <li>You must provide accurate, current, and complete information during registration</li>
                    <li>You must maintain and update your registration information</li>
                    <li>You are responsible for maintaining the confidentiality of your account credentials</li>
                    <li>You must notify us immediately of any unauthorized access to your account</li>
                    <li>You must be authorized to represent your organization and bind it to these Terms</li>
                  </ul>
                </div>

                <div className="info-box">
                  <h4>Account Security</h4>
                  <p>You are solely responsible for all activities that occur under your account. Medikal Africa is not liable for any loss or damage arising from unauthorized use of your account. You agree to use strong passwords and enable multi-factor authentication when available.</p>
                </div>
              </div>
            </section>

            {/* User Obligations */}
            <section id="user-obligations" className="terms-section">
              <div className="section-header">
                <span className="section-code">TS-004</span>
                <h2>4. User Obligations</h2>
              </div>
              <div className="section-body">
                <p>As a user of the Platform, you agree to:</p>

                <div className="obligation-item">
                  <h4>Compliance with Laws</h4>
                  <p>Use the Platform in compliance with all applicable local, national, and international laws and regulations, including healthcare data protection laws, medical device regulations, and public health reporting requirements.</p>
                </div>

                <div className="obligation-item">
                  <h4>Authorized Use</h4>
                  <p>Use the Platform only for authorized purposes and in accordance with these Terms. You may not use the Platform for any illegal, unauthorized, or prohibited purpose.</p>
                </div>

                <div className="obligation-item">
                  <h4>Data Accuracy</h4>
                  <p>Ensure that all data submitted to the Platform is accurate, complete, and obtained through lawful means. You are responsible for obtaining necessary consents and authorizations for data submission.</p>
                </div>

                <div className="obligation-item">
                  <h4>Prohibited Activities</h4>
                  <p>You agree not to:</p>
                  <ul>
                    <li>Attempt to reverse engineer, decompile, or disassemble the Platform</li>
                    <li>Interfere with or disrupt the Platform's security, functionality, or availability</li>
                    <li>Introduce viruses, malware, or other harmful code</li>
                    <li>Access or attempt to access other users' data without authorization</li>
                    <li>Use automated systems to access the Platform without permission</li>
                    <li>Violate any applicable healthcare privacy or security regulations</li>
                  </ul>
                </div>

                <div className="obligation-item">
                  <h4>Clinical Responsibility</h4>
                  <p>The Platform provides decision support tools but does not replace clinical judgment. Healthcare providers remain solely responsible for all clinical decisions and patient care. The Platform's recommendations are advisory and should be used in conjunction with professional medical judgment.</p>
                </div>
              </div>
            </section>

            {/* Data Ownership */}
            <section id="data-ownership" className="terms-section">
              <div className="section-header">
                <span className="section-code">TS-005</span>
                <h2>5. Data Ownership & Rights</h2>
              </div>
              <div className="section-body">
                <div className="ownership-clause">
                  <h4>Your Data</h4>
                  <p>You retain all ownership rights to data that you submit to the Platform ("Your Data"). By submitting Your Data, you grant Medikal Africa a limited, non-exclusive license to:</p>
                  <ul>
                    <li>Process and analyze Your Data to provide Platform services</li>
                    <li>Create anonymized, aggregated datasets for research and public health purposes</li>
                    <li>Generate reports and analytics based on Your Data</li>
                    <li>Store and maintain Your Data as necessary to provide services</li>
                  </ul>
                </div>

                <div className="ownership-clause">
                  <h4>Anonymized Data</h4>
                  <p>Once data is anonymized and aggregated, it becomes part of Medikal Africa's research dataset. Anonymized data may be used for:</p>
                  <ul>
                    <li>Continental AMR surveillance and reporting</li>
                    <li>Scientific research and publication</li>
                    <li>Public health intelligence and policy development</li>
                    <li>Platform improvement and AI model training</li>
                  </ul>
                </div>

                <div className="ownership-clause">
                  <h4>Data Access & Export</h4>
                  <p>You have the right to access, export, and delete Your Data at any time, subject to legal retention requirements and public health obligations. Data export will be provided in standard formats (HL7 FHIR, CSV, JSON) within 30 days of request.</p>
                </div>

                <div className="info-box">
                  <h4>Data Portability</h4>
                  <p>Upon termination of service, you may request export of Your Data. We will provide data in machine-readable formats within 90 days of service termination, subject to applicable legal requirements.</p>
                </div>
              </div>
            </section>

            {/* Intellectual Property */}
            <section id="intellectual-property" className="terms-section">
              <div className="section-header">
                <span className="section-code">TS-006</span>
                <h2>6. Intellectual Property</h2>
              </div>
              <div className="section-body">
                <div className="ip-clause">
                  <h4>Platform IP</h4>
                  <p>The Platform, including all software, algorithms, AI models, user interfaces, documentation, and related materials, is the exclusive property of Medikal Africa and is protected by copyright, trademark, patent, and other intellectual property laws.</p>
                </div>

                <div className="ip-clause">
                  <h4>Limited License</h4>
                  <p>Subject to these Terms, Medikal Africa grants you a limited, non-exclusive, non-transferable, revocable license to access and use the Platform for your authorized purposes during the term of your service agreement.</p>
                </div>

                <div className="ip-clause">
                  <h4>Restrictions</h4>
                  <p>You may not:</p>
                  <ul>
                    <li>Copy, modify, or create derivative works of the Platform</li>
                    <li>Reverse engineer or attempt to extract source code</li>
                    <li>Remove or alter any copyright, trademark, or proprietary notices</li>
                    <li>Use the Platform to develop competing products or services</li>
                    <li>Transfer or sublicense your access rights to third parties</li>
                  </ul>
                </div>

                <div className="ip-clause">
                  <h4>Feedback</h4>
                  <p>Any feedback, suggestions, or ideas you provide regarding the Platform may be used by Medikal Africa without obligation or compensation to you. By providing feedback, you grant Medikal Africa a perpetual, irrevocable license to use, modify, and incorporate such feedback.</p>
                </div>
              </div>
            </section>

            {/* Service Availability */}
            <section id="service-availability" className="terms-section">
              <div className="section-header">
                <span className="section-code">TS-007</span>
                <h2>7. Service Availability</h2>
              </div>
              <div className="section-body">
                <div className="availability-clause">
                  <h4>Uptime Commitment</h4>
                  <p>We strive to maintain Platform availability of 99.5% uptime, excluding scheduled maintenance windows. Scheduled maintenance will be communicated at least 48 hours in advance when possible.</p>
                </div>

                <div className="availability-clause">
                  <h4>Service Interruptions</h4>
                  <p>We do not guarantee uninterrupted or error-free service. The Platform may be unavailable due to:</p>
                  <ul>
                    <li>Scheduled maintenance and updates</li>
                    <li>Technical failures or system errors</li>
                    <li>Force majeure events (natural disasters, cyberattacks, etc.)</li>
                    <li>Third-party service provider issues</li>
                    <li>Regulatory or legal requirements</li>
                  </ul>
                </div>

                <div className="availability-clause">
                  <h4>Performance</h4>
                  <p>We make reasonable efforts to ensure Platform performance but do not guarantee specific response times or processing speeds. Performance may vary based on data volume, network conditions, and system load.</p>
                </div>

                <div className="info-box">
                  <h4>Service Level Agreements</h4>
                  <p>Specific uptime guarantees and performance metrics may be defined in separate Service Level Agreements (SLAs) for enterprise customers. SLAs supplement but do not replace these Terms.</p>
                </div>
              </div>
            </section>

            {/* Fees & Payment */}
            <section id="fees-payment" className="terms-section">
              <div className="section-header">
                <span className="section-code">TS-008</span>
                <h2>8. Fees & Payment</h2>
              </div>
              <div className="section-body">
                <div className="payment-clause">
                  <h4>Service Fees</h4>
                  <p>Access to the Platform may be subject to fees as specified in your service agreement or pricing plan. Fees are based on factors including:</p>
                  <ul>
                    <li>Number of facilities or users</li>
                    <li>Data volume and processing requirements</li>
                    <li>Service tier and feature access</li>
                    <li>Support and implementation services</li>
                  </ul>
                </div>

                <div className="payment-clause">
                  <h4>Payment Terms</h4>
                  <ul>
                    <li>Fees are typically billed monthly or annually in advance</li>
                    <li>Payment is due within 30 days of invoice date unless otherwise specified</li>
                    <li>Late payments may result in service suspension or termination</li>
                    <li>All fees are non-refundable except as required by law or specified in your agreement</li>
                  </ul>
                </div>

                <div className="payment-clause">
                  <h4>Price Changes</h4>
                  <p>We reserve the right to modify pricing with 90 days' notice. Price changes will not affect your current billing period but will apply to subsequent renewals or new service periods.</p>
                </div>

                <div className="payment-clause">
                  <h4>Taxes</h4>
                  <p>You are responsible for all taxes, duties, and government charges applicable to your use of the Platform, unless otherwise specified in your service agreement.</p>
                </div>
              </div>
            </section>

            {/* Termination */}
            <section id="termination" className="terms-section">
              <div className="section-header">
                <span className="section-code">TS-009</span>
                <h2>9. Termination</h2>
              </div>
              <div className="section-body">
                <div className="termination-clause">
                  <h4>Termination by You</h4>
                  <p>You may terminate your use of the Platform at any time by providing written notice. Termination will be effective at the end of your current billing period, unless immediate termination is requested and approved.</p>
                </div>

                <div className="termination-clause">
                  <h4>Termination by Us</h4>
                  <p>We may suspend or terminate your access immediately if:</p>
                  <ul>
                    <li>You violate these Terms or your service agreement</li>
                    <li>You fail to pay fees when due</li>
                    <li>You engage in fraudulent or illegal activities</li>
                    <li>You breach data security or privacy obligations</li>
                    <li>Required by law or regulatory authority</li>
                  </ul>
                </div>

                <div className="termination-clause">
                  <h4>Effect of Termination</h4>
                  <ul>
                    <li>Your access to the Platform will be revoked</li>
                    <li>You may request data export within 90 days of termination</li>
                    <li>Your Data will be securely deleted according to our data retention policy</li>
                    <li>Anonymized data may be retained for research purposes</li>
                    <li>All outstanding fees remain due and payable</li>
                  </ul>
                </div>

                <div className="info-box">
                  <h4>Survival</h4>
                  <p>Sections of these Terms that by their nature should survive termination (including but not limited to intellectual property, indemnification, and limitation of liability) will survive termination.</p>
                </div>
              </div>
            </section>

            {/* Limitation of Liability */}
            <section id="liability" className="terms-section">
              <div className="section-header">
                <span className="section-code">TS-010</span>
                <h2>10. Limitation of Liability</h2>
              </div>
              <div className="section-body">
                <div className="liability-clause">
                  <h4>Disclaimer of Warranties</h4>
                  <p>THE PLATFORM IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.</p>
                </div>

                <div className="liability-clause">
                  <h4>Clinical Disclaimer</h4>
                  <p>THE PLATFORM PROVIDES DECISION SUPPORT TOOLS BUT DOES NOT REPLACE CLINICAL JUDGMENT. MEDIKAL AFRICA IS NOT RESPONSIBLE FOR CLINICAL DECISIONS OR PATIENT OUTCOMES. HEALTHCARE PROVIDERS REMAIN SOLELY RESPONSIBLE FOR ALL MEDICAL DECISIONS AND PATIENT CARE.</p>
                </div>

                <div className="liability-clause">
                  <h4>Limitation of Damages</h4>
                  <p>TO THE MAXIMUM EXTENT PERMITTED BY LAW, MEDIKAL AFRICA SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, OR BUSINESS OPPORTUNITIES, ARISING FROM YOUR USE OF THE PLATFORM.</p>
                </div>

                <div className="liability-clause">
                  <h4>Maximum Liability</h4>
                  <p>OUR TOTAL LIABILITY FOR ANY CLAIMS ARISING FROM OR RELATED TO THE PLATFORM SHALL NOT EXCEED THE AMOUNT YOU PAID TO US IN THE 12 MONTHS PRECEDING THE CLAIM, OR $10,000, WHICHEVER IS GREATER.</p>
                </div>

                <div className="info-box warning">
                  <h4>Jurisdictional Limitations</h4>
                  <p>Some jurisdictions do not allow the exclusion of certain warranties or limitation of liability. In such jurisdictions, our liability is limited to the maximum extent permitted by law.</p>
                </div>
              </div>
            </section>

            {/* Indemnification */}
            <section id="indemnification" className="terms-section">
              <div className="section-header">
                <span className="section-code">TS-011</span>
                <h2>11. Indemnification</h2>
              </div>
              <div className="section-body">
                <p>You agree to indemnify, defend, and hold harmless Medikal Africa, its affiliates, officers, directors, employees, and agents from and against any claims, damages, losses, liabilities, costs, and expenses (including reasonable attorneys' fees) arising from:</p>
                <ul>
                  <li>Your use or misuse of the Platform</li>
                  <li>Your violation of these Terms or applicable laws</li>
                  <li>Your submission of inaccurate, illegal, or unauthorized data</li>
                  <li>Your breach of data privacy or security obligations</li>
                  <li>Clinical decisions or patient outcomes resulting from use of Platform recommendations</li>
                  <li>Any third-party claims arising from your use of the Platform</li>
                </ul>
              </div>
            </section>

            {/* Dispute Resolution */}
            <section id="disputes" className="terms-section">
              <div className="section-header">
                <span className="section-code">TS-012</span>
                <h2>12. Dispute Resolution</h2>
              </div>
              <div className="section-body">
                <div className="dispute-clause">
                  <h4>Governing Law</h4>
                  <p>These Terms shall be governed by and construed in accordance with the laws of Rwanda, without regard to its conflict of law provisions.</p>
                </div>

                <div className="dispute-clause">
                  <h4>Dispute Resolution Process</h4>
                  <p>In the event of any dispute, controversy, or claim arising out of or relating to these Terms:</p>
                  <ol>
                    <li><strong>Negotiation:</strong> Parties agree to first attempt to resolve disputes through good faith negotiation for 30 days</li>
                    <li><strong>Mediation:</strong> If negotiation fails, disputes shall be referred to mediation under the rules of the Rwanda Arbitration and Mediation Centre</li>
                    <li><strong>Arbitration:</strong> If mediation fails, disputes shall be resolved through binding arbitration in Kigali, Rwanda</li>
                    <li><strong>Courts:</strong> Either party may seek injunctive relief in courts of competent jurisdiction</li>
                  </ol>
                </div>

                <div className="dispute-clause">
                  <h4>Class Action Waiver</h4>
                  <p>You agree that any disputes will be resolved individually and not as part of a class action or representative proceeding.</p>
                </div>
              </div>
            </section>

            {/* Modifications */}
            <section id="modifications" className="terms-section">
              <div className="section-header">
                <span className="section-code">TS-013</span>
                <h2>13. Modifications to Terms</h2>
              </div>
              <div className="section-body">
                <p>We reserve the right to modify these Terms at any time. When we make material changes:</p>
                <ul>
                  <li>We will notify all registered users via email at least 30 days before changes take effect</li>
                  <li>We will update the "Last Updated" date at the top of these Terms</li>
                  <li>Material changes will be highlighted in the notification</li>
                  <li>Continued use of the Platform after changes constitutes acceptance of modified Terms</li>
                </ul>
                <p>If you do not agree to modified Terms, you must discontinue use of the Platform and terminate your account.</p>
              </div>
            </section>

            {/* Contact */}
            <section id="contact" className="terms-section">
              <div className="section-header">
                <span className="section-code">TS-014</span>
                <h2>14. Contact Information</h2>
              </div>
              <div className="section-body">
                <p>For questions regarding these Terms of Service, please contact:</p>

                <div className="contact-info">
                  <div className="contact-item">
                    <h4>Legal Department</h4>
                    <p>Medikal Africa</p>
                    <p>Kigali, Rwanda</p>
                    <p><a href="mailto:legal@medikalafrica.com">legal@medikalafrica.com</a></p>
                  </div>

                  <div className="contact-item">
                    <h4>General Inquiries</h4>
                    <p><a href="mailto:info@medikalafrica.com">info@medikalafrica.com</a></p>
                  </div>

                  <div className="contact-item">
                    <h4>Support</h4>
                    <p>For technical or service-related questions</p>
                    <p><a href="mailto:support@medikalafrica.com">support@medikalafrica.com</a></p>
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

export default Terms;
