import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Lazy load all pages for code splitting and faster initial load
const Home = lazy(() => import('./pages/Home'));
const Platform = lazy(() => import('./pages/Platform'));
const AMR = lazy(() => import('./pages/AMR'));
const Research = lazy(() => import('./pages/Research'));
const RequestDemo = lazy(() => import('./pages/RequestDemo'));
const HowItWorks = lazy(() => import('./pages/HowItWorks'));
const Team = lazy(() => import('./pages/Team'));
const Blog = lazy(() => import('./pages/Blog'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const Security = lazy(() => import('./pages/Security'));

// Loading component
const PageLoader = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    minHeight: '60vh',
    flexDirection: 'column',
    gap: '1rem'
  }}>
    <div style={{
      width: '40px',
      height: '40px',
      border: '3px solid #f3f3f3',
      borderTop: '3px solid #5EC4D5',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }}></div>
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/platform" element={<Platform />} />
          <Route path="/amr" element={<AMR />} />
          <Route path="/research" element={<Research />} />
          <Route path="/request-demo" element={<RequestDemo />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/team" element={<Team />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/security" element={<Security />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
}

export default React.memo(App);
