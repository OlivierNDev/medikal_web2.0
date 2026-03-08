import React from 'react';
import { Link } from 'react-router-dom';
import nvidiaLogo from '../assets/nvidia-logo.png';
import africaCdcLogo from '../assets/africa-cdc-logo.png';
import amrLogo from '../assets/amr-logo.png';
import robolabsLogo from '../assets/robolabs-logo.png';

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="hero" data-testid="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-tag">Clinical Intelligence Platform</div>
            <h1>AI Infrastructure for <span>AMR Intelligence</span></h1>
            <p>Detecting antimicrobial resistance patterns and supporting clinical decisions across African health systems.</p>
            <div className="hero-cta">
              <Link to="/request-demo" className="btn-primary" data-testid="hero-cta-primary">Request Demo</Link>
              <a href="#video" className="btn-secondary" data-testid="hero-cta-secondary">Watch Demo</a>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="video-section" id="video" data-testid="video-section">
        <div className="container">
          <div className="video-wrapper">
            <video controls data-testid="demo-video">
              <source src="/assets/demo-video.mp4" type="video/mp4" />
              Your browser does not support video.
            </video>
          </div>
          <p className="video-caption">See how Medikal detects resistance patterns in real-time</p>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section" data-testid="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-value">95%</div>
              <div className="stat-label">AI Accuracy</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">500+</div>
              <div className="stat-label">Target Facilities</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">70%</div>
              <div className="stat-label">AMR Reduction Goal</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">54</div>
              <div className="stat-label">African Countries</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features-section" data-testid="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Platform Capabilities</h2>
            <p>Unified clinical intelligence connecting hospitals, labs, and health ministries.</p>
          </div>
          <div className="features-grid" data-testid="features-grid">
            <div className="feature-card">
              <h3>Clinical Intelligence</h3>
              <p>AI-powered diagnostic assistance with evidence-based treatment recommendations.</p>
            </div>
            <div className="feature-card">
              <h3>AMR Detection</h3>
              <p>Real-time surveillance of resistance patterns with early warning alerts.</p>
            </div>
            <div className="feature-card">
              <h3>Antibiotic Stewardship</h3>
              <p>Intelligent recommendations for optimal antibiotic selection and dosing.</p>
            </div>
            <div className="feature-card">
              <h3>Lab Analytics</h3>
              <p>Integration with laboratory systems for susceptibility testing analysis.</p>
            </div>
            <div className="feature-card">
              <h3>Health Intelligence</h3>
              <p>Dashboards for ministries to monitor trends and allocate resources.</p>
            </div>
            <div className="feature-card">
              <h3>Multilingual AI</h3>
              <p>Clinical support in English, French, and Kinyarwanda.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="partners-section" data-testid="partners-section">
        <div className="container">
          <div className="partners-header">
            <p>Trusted By</p>
          </div>
          <div className="partners-grid" data-testid="partners-grid">
            <img src={nvidiaLogo} alt="NVIDIA" className="partner-logo" />
            <img src={africaCdcLogo} alt="Africa CDC" className="partner-logo" />
            <img src={amrLogo} alt="AMR Initiative Rwanda" className="partner-logo" />
            <img src={robolabsLogo} alt="RoboLabs" className="partner-logo" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" data-testid="cta-section">
        <div className="container">
          <h2>Ready to strengthen your health system?</h2>
          <p>Join leading institutions using Medikal for AMR surveillance.</p>
          <Link to="/request-demo" className="btn-white" data-testid="cta-primary">Request Demo</Link>
        </div>
      </section>
    </>
  );
}

export default Home;
