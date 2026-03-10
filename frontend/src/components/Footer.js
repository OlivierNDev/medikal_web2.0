import React from 'react';
import { Link } from 'react-router-dom';

const Footer = React.memo(function Footer() {
  return (
    <footer className="footer" data-testid="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <p>AI-powered clinical intelligence for antimicrobial resistance detection across Africa.</p>
            <div className="footer-social">
              <a href="https://twitter.com/medikal_africa" target="_blank" rel="noopener noreferrer" aria-label="Twitter" data-testid="footer-twitter">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                </svg>
              </a>
              <a href="https://linkedin.com/company/medikal-africa" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" data-testid="footer-linkedin">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/medikal_africa/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" data-testid="footer-instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="mailto:info@medikalafrica.com" aria-label="Email" data-testid="footer-email">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <polyline points="22,4 12,13 2,4"/>
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h4 className="footer-title">Platform</h4>
            <ul className="footer-links">
              <li><Link to="/platform">Overview</Link></li>
              <li><Link to="/how-it-works">How It Works</Link></li>
              <li><Link to="/amr">AMR Intelligence</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="footer-title">Company</h4>
            <ul className="footer-links">
              <li><Link to="/team">Team</Link></li>
              <li><Link to="/research">Research</Link></li>
              <li><Link to="/request-demo">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="footer-title">Get Started</h4>
            <ul className="footer-links">
              <li><Link to="/request-demo">Request Demo</Link></li>
              <li><Link to="/platform">Platform Overview</Link></li>
              <li><Link to="/how-it-works">How It Works</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 Medikal Africa. All rights reserved.</p>
                <div className="footer-bottom-links">
                  <Link to="/privacy">Privacy</Link>
                  <span className="footer-divider">&middot;</span>
                  <Link to="/terms">Terms</Link>
                  <span className="footer-divider">&middot;</span>
                  <Link to="/security">Security</Link>
                </div>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
