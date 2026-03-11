import React, { useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar = React.memo(function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isActive = useCallback((path) => location.pathname === path ? 'nav-link active' : 'nav-link', [location.pathname]);
  
  const handleMobileToggle = useCallback(() => setMobileOpen(true), []);
  const handleMobileClose = useCallback(() => setMobileOpen(false), []);

  return (
    <>
      <nav className="nav" data-testid="main-nav">
        <div className="container nav-container">
          <Link to="/">
            <img src={logo} alt="Medikal Africa" className="nav-logo" data-testid="nav-logo" loading="eager" />
          </Link>

          <div className="nav-links" data-testid="nav-links">
            <Link to="/" className={isActive('/')}>Home</Link>
            <Link to="/platform" className={isActive('/platform')}>Platform</Link>
            <Link to="/how-it-works" className={isActive('/how-it-works')}>How It Works</Link>
            <Link to="/amr" className={isActive('/amr')}>AMR</Link>
            <Link to="/team" className={isActive('/team')}>Team</Link>
            <Link to="/research" className={isActive('/research')}>Research</Link>
            <Link to="/blog" className={isActive('/blog')}>News</Link>
          </div>

          <Link to="/request-demo" className="nav-cta" data-testid="nav-cta">Request Demo</Link>

          <button 
            className="nav-mobile-btn" 
            onClick={handleMobileToggle}
            aria-label="Menu"
            data-testid="mobile-menu-btn"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h18M3 6h18M3 18h18"/>
            </svg>
          </button>
        </div>
      </nav>

      <div 
        className={`mobile-overlay ${mobileOpen ? 'active' : ''}`} 
        onClick={handleMobileClose}
        data-testid="mobile-overlay"
      />
      
      <div className={`mobile-menu ${mobileOpen ? 'active' : ''}`} data-testid="mobile-menu">
        <div className="mobile-menu-header">
          <img src={logo} alt="Medikal Africa" height="28" loading="lazy" />
          <button 
            className="mobile-close" 
            onClick={handleMobileClose}
            aria-label="Close"
            data-testid="mobile-menu-close"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <div className="mobile-menu-links">
          <Link to="/" onClick={handleMobileClose}>Home</Link>
          <Link to="/platform" onClick={handleMobileClose}>Platform</Link>
          <Link to="/how-it-works" onClick={handleMobileClose}>How It Works</Link>
          <Link to="/amr" onClick={handleMobileClose}>AMR Intelligence</Link>
          <Link to="/team" onClick={handleMobileClose}>Team</Link>
          <Link to="/research" onClick={handleMobileClose}>Research</Link>
          <Link to="/blog" onClick={handleMobileClose}>News</Link>
          <Link to="/request-demo" onClick={handleMobileClose}>Request Demo</Link>
        </div>
      </div>
    </>
  );
});

export default Navbar;
