import React from 'react';
import { Link } from 'react-router-dom';

function AMR() {
  return (
    <>
      {/* Hero */}
      <section className="page-hero" data-testid="amr-hero">
        <div className="container">
          <h1>The AMR Crisis</h1>
          <p>Antimicrobial resistance threatens global health. Without intervention, drug-resistant infections could cause 10 million deaths annually by 2050.</p>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section" data-testid="amr-stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-value" style={{ color: '#EF4444' }}>4.95M</div>
              <div className="stat-label">AMR deaths (2019)</div>
            </div>
            <div className="stat-item">
              <div className="stat-value" style={{ color: '#EF4444' }}>1.27M</div>
              <div className="stat-label">Direct AMR deaths</div>
            </div>
            <div className="stat-item">
              <div className="stat-value" style={{ color: '#EF4444' }}>10M</div>
              <div className="stat-label">Projected by 2050</div>
            </div>
            <div className="stat-item">
              <div className="stat-value" style={{ color: '#EF4444' }}>$100T</div>
              <div className="stat-label">Economic cost</div>
            </div>
          </div>
        </div>
      </section>

      {/* Detection Flow */}
      <section className="architecture-section" data-testid="detection-section">
        <div className="container">
          <div className="grid-2">
            <div>
              <h2>How Medikal Detects Resistance</h2>
              <p style={{ marginBottom: '2rem' }}>AI-powered detection analyzes multiple data sources to identify emerging resistance patterns.</p>
              <ul className="simple-list">
                <li><strong>Prescription Data</strong> — Antibiotic usage patterns</li>
                <li><strong>Lab Susceptibility</strong> — Culture and sensitivity results</li>
                <li><strong>AI Analysis</strong> — Pattern detection and modeling</li>
                <li><strong>Early Warning</strong> — Alerts to clinicians and authorities</li>
              </ul>
            </div>
            <div className="architecture-visual">
              <div className="arch-node">Prescription Data</div>
              <div className="arch-arrow"></div>
              <div className="arch-node">Lab Results</div>
              <div className="arch-arrow"></div>
              <div className="arch-node active">AI Analysis</div>
              <div className="arch-arrow"></div>
              <div className="arch-node alert">Alert</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stewardship */}
      <section className="features-section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <div className="section-header">
            <h2>Antibiotic Stewardship</h2>
            <p>Intelligent recommendations to optimize prescribing and preserve antimicrobial effectiveness.</p>
          </div>
          <div className="features-grid">
            <div className="feature-card" style={{ background: 'var(--white)' }}>
              <h3>Optimal Selection</h3>
              <p>AI-guided antibiotic selection based on local resistance patterns.</p>
            </div>
            <div className="feature-card" style={{ background: 'var(--white)' }}>
              <h3>Dosing Optimization</h3>
              <p>Personalized dosing based on patient factors.</p>
            </div>
            <div className="feature-card" style={{ background: 'var(--white)' }}>
              <h3>Duration Guidance</h3>
              <p>Evidence-based treatment duration recommendations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <h2>Join the fight against AMR</h2>
          <p>Deploy Medikal's AMR intelligence in your health system.</p>
          <Link to="/request-demo" className="btn-white">Request Demo</Link>
        </div>
      </section>
    </>
  );
}

export default AMR;
