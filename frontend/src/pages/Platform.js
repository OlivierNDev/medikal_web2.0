import React from 'react';
import { Link } from 'react-router-dom';

const Platform = React.memo(function Platform() {
  return (
    <>
      {/* Hero */}
      <section className="page-hero" data-testid="platform-hero">
        <div className="container">
          <h1>The Clinical Intelligence Engine</h1>
          <p>Unified platform connecting hospitals, laboratories, and public health systems for comprehensive AMR surveillance.</p>
        </div>
      </section>

      {/* Architecture */}
      <section className="architecture-section" data-testid="architecture-section">
        <div className="container">
          <div className="grid-2">
            <div>
              <h2>How Data Flows</h2>
              <p style={{ marginBottom: '2rem' }}>From hospital intake to actionable insights through a secure, AI-powered pipeline.</p>
              <ul className="simple-list">
                <li><strong>Hospital Integration</strong> — Seamless EMR/EHR connection</li>
                <li><strong>Lab Data Ingestion</strong> — Real-time susceptibility results</li>
                <li><strong>AI Processing</strong> — Pattern detection and analysis</li>
                <li><strong>Intelligence Output</strong> — Actionable clinical insights</li>
              </ul>
            </div>
            <div className="architecture-visual" data-testid="architecture-visual">
              <div className="arch-node">Hospital Systems</div>
              <div className="arch-arrow"></div>
              <div className="arch-node">Data Pipeline</div>
              <div className="arch-arrow"></div>
              <div className="arch-node active">AI Engine</div>
              <div className="arch-arrow"></div>
              <div className="arch-node">Intelligence Dashboard</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features-section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <div className="section-header">
            <h2>Core Systems</h2>
            <p>Six integrated modules for comprehensive clinical intelligence.</p>
          </div>
          <div className="features-grid">
            <div className="feature-card feature-card-white">
              <h3>Clinical Intelligence</h3>
              <p>AI diagnostic assistance with evidence-based treatment recommendations.</p>
            </div>
            <div className="feature-card feature-card-white">
              <h3>Medikal AI Assistant</h3>
              <p>Multilingual conversational AI supporting clinicians.</p>
            </div>
            <div className="feature-card feature-card-white">
              <h3>Imaging AI</h3>
              <p>Medical image analysis for X-rays and diagnostic scans.</p>
            </div>
            <div className="feature-card feature-card-white">
              <h3>Lab Analytics</h3>
              <p>Laboratory information system integration.</p>
            </div>
            <div className="feature-card feature-card-white">
              <h3>AMR Detection</h3>
              <p>Real-time resistance pattern surveillance.</p>
            </div>
            <div className="feature-card feature-card-white">
              <h3>Health System Intelligence</h3>
              <p>Dashboards for public health agencies.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <h2>See the platform in action</h2>
          <p>Schedule a demo to explore integration options.</p>
          <Link to="/request-demo" className="btn-white">Request Demo</Link>
        </div>
      </section>
    </>
  );
});

export default Platform;
