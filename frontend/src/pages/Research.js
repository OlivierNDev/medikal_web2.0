import React from 'react';
import { Link } from 'react-router-dom';
import nvidiaLogo from '../assets/nvidia-logo.png';
import africaCdcLogo from '../assets/africa-cdc-logo.png';
import amrLogo from '../assets/amr-logo.png';
import robolabsLogo from '../assets/robolabs-logo.png';

function Research() {
  return (
    <>
      {/* Hero */}
      <section className="page-hero" data-testid="research-hero">
        <div className="container">
          <h1>Strengthening Health Systems</h1>
          <p>Partnering with global health organizations to combat antimicrobial resistance and improve clinical outcomes.</p>
        </div>
      </section>

      {/* Mission Stats */}
      <section className="stats-section" data-testid="mission-stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-value">54</div>
              <div className="stat-label">Target Countries</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">70%</div>
              <div className="stat-label">AMR Reduction Goal</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">2M+</div>
              <div className="stat-label">Lives to Impact</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">500+</div>
              <div className="stat-label">Target Facilities</div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="partners-section">
        <div className="container">
          <div className="partners-header">
            <p>Strategic Partners</p>
          </div>
          <div className="partners-grid">
            <img src={nvidiaLogo} alt="NVIDIA" className="partner-logo" />
            <img src={africaCdcLogo} alt="Africa CDC" className="partner-logo" />
            <img src={amrLogo} alt="AMR Initiative Rwanda" className="partner-logo" />
            <img src={robolabsLogo} alt="RoboLabs" className="partner-logo" />
          </div>
        </div>
      </section>

      {/* Partnerships Detail */}
      <section className="features-section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <div className="section-header">
            <h2>Collaborations</h2>
            <p>Strategic partnerships accelerating our impact.</p>
          </div>
          <div className="features-grid">
            <div className="feature-card" style={{ background: 'var(--white)' }}>
              <h3>NVIDIA Inception</h3>
              <p>GPU computing resources and AI expertise for healthcare development.</p>
            </div>
            <div className="feature-card" style={{ background: 'var(--white)' }}>
              <h3>Africa CDC</h3>
              <p>Supporting continental AMR surveillance and public health intelligence.</p>
            </div>
            <div className="feature-card" style={{ background: 'var(--white)' }}>
              <h3>AMR Initiative Rwanda</h3>
              <p>Building local capacity for antibiotic stewardship programs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <h2>Partner with Medikal</h2>
          <p>Join institutions strengthening health systems across Africa.</p>
          <Link to="/request-demo" className="btn-white">Request Demo</Link>
        </div>
      </section>
    </>
  );
}

export default Research;
