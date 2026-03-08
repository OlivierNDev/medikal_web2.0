import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Platform from './pages/Platform';
import AMR from './pages/AMR';
import Research from './pages/Research';
import RequestDemo from './pages/RequestDemo';
import HowItWorks from './pages/HowItWorks';
import Team from './pages/Team';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/platform" element={<Platform />} />
        <Route path="/amr" element={<AMR />} />
        <Route path="/research" element={<Research />} />
        <Route path="/request-demo" element={<RequestDemo />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/team" element={<Team />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
