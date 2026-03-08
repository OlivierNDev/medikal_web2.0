import React, { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
// Lazy load heavy animation component
const MedikalPipeline = lazy(() => import('../components/MedikalPipeline'));
import nvidiaLogo from '../assets/nvidia-logo.png';
import africaCdcLogo from '../assets/africa-cdc-logo.png';
import amrLogo from '../assets/amr-logo.png';
import robolabsLogo from '../assets/robolabs-logo.png';

const Home = React.memo(function Home() {
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
              <a href="#pipeline" className="btn-secondary" data-testid="hero-cta-secondary">See How It Works</a>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Pipeline Section */}
      <div id="pipeline">
        <Suspense fallback={<div style={{ minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading pipeline...</div>}>
          <MedikalPipeline />
        </Suspense>
      </div>

      {/* Features */}
      <section className="features-section" data-testid="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Platform Capabilities</h2>
            <p>Unified clinical intelligence connecting hospitals, labs, and health ministries.</p>
          </div>
          <div className="features-grid-tech" data-testid="features-grid">
            <div className="feature-card-tech">
              <div className="feature-code">CLI-001</div>
              <h3>Clinical Intelligence</h3>
              <p>AI-powered diagnostic assistance with evidence-based treatment recommendations.</p>
              <div className="feature-tech-line"></div>
            </div>
            <div className="feature-card-tech">
              <div className="feature-code">AMR-002</div>
              <h3>AMR Detection</h3>
              <p>Real-time surveillance of resistance patterns with early warning alerts.</p>
              <div className="feature-tech-line"></div>
            </div>
            <div className="feature-card-tech">
              <div className="feature-code">ABS-003</div>
              <h3>Antibiotic Stewardship</h3>
              <p>Intelligent recommendations for optimal antibiotic selection and dosing.</p>
              <div className="feature-tech-line"></div>
            </div>
            <div className="feature-card-tech">
              <div className="feature-code">LAB-004</div>
              <h3>Lab Analytics</h3>
              <p>Integration with laboratory systems for susceptibility testing analysis.</p>
              <div className="feature-tech-line"></div>
            </div>
            <div className="feature-card-tech">
              <div className="feature-code">HIS-005</div>
              <h3>Health Intelligence</h3>
              <p>Dashboards for ministries to monitor trends and allocate resources.</p>
              <div className="feature-tech-line"></div>
            </div>
            <div className="feature-card-tech">
              <div className="feature-code">ML-006</div>
              <h3>Multilingual AI</h3>
              <p>Clinical support communicating in more than 3 local African languages.</p>
              <div className="feature-tech-line"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="partners-section" data-testid="partners-section">
        <div className="container">
          <div className="partners-content">
            <div className="partners-label">TRUSTED BY</div>
            <div className="partners-grid" data-testid="partners-grid">
              <div className="partner-item partner-item-nvidia">
                <img src={nvidiaLogo} alt="NVIDIA" className="partner-logo" loading="lazy" />
                <div className="partner-tooltip">We've partnered with NVIDIA through Inception Program</div>
              </div>
              <div className="partner-item">
                <img src={africaCdcLogo} alt="Africa CDC" className="partner-logo" loading="lazy" />
              </div>
              <div className="partner-item">
                <img src={amrLogo} alt="AMR Initiative Rwanda" className="partner-logo" loading="lazy" />
              </div>
              <div className="partner-item">
                <img src={robolabsLogo} alt="RoboLabs" className="partner-logo" loading="lazy" />
              </div>
            </div>
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
});

export default Home;
