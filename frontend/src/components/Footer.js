import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/medikal-logo.png';

function Footer() {
  return (
    <footer className="footer" data-testid="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <img src={logo} alt="Medikal Africa" />
            <p>AI-powered clinical intelligence for antimicrobial resistance detection across Africa.</p>
          </div>
          <div>
            <h4 className="footer-title">Platform</h4>
            <ul className="footer-links">
              <li><Link to="/platform">Overview</Link></li>
              <li><Link to="/amr">AMR Intelligence</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="footer-title">Company</h4>
            <ul className="footer-links">
              <li><Link to="/research">Research</Link></li>
              <li><Link to="/request-demo">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="footer-title">Contact</h4>
            <ul className="footer-links">
              <li><a href="mailto:info@medikalafrica.com">info@medikalafrica.com</a></li>
              <li><a href="tel:+17024163329">+1 (702) 416-3329</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Medikal Africa</p>
          <a href="https://twitter.com/medikal_africa" target="_blank" rel="noopener noreferrer">Twitter</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
