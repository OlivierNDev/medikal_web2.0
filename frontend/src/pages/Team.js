import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Team.css';

const teamMembers = [
  {
    id: 1,
    name: "Olivier Niyonshima",
    role: "Founder & CEO",
    bio: "Software engineer focused on AI and scalable healthcare systems. Leads product vision and continental expansion strategy.",
    education: "Algonquin College, Ottawa",
    linkedin: "#",
    twitter: "#",
    initials: "ON"
  },
  {
    id: 2,
    name: "Tresor Yubahwe",
    role: "Co-Founder & COO",
    bio: "Specializes in ML and AI model development. Leading the Kinyarwanda language AI model and operational excellence.",
    education: "Princeton University",
    linkedin: "#",
    twitter: "#",
    initials: "TY"
  },
  {
    id: 3,
    name: "Amen Divine Ikamba",
    role: "Co-Founder & Head of Product",
    bio: "Leads product development and user experience. Ensures seamless clinical workflow integration across health systems.",
    education: "Pitzer College, California",
    linkedin: "#",
    twitter: "#",
    initials: "AI"
  }
];

const advisors = [
  { name: "Dr. Sarah Chen", role: "Clinical Advisor", org: "Stanford Medicine" },
  { name: "Prof. James Okello", role: "AMR Research Advisor", org: "Makerere University" },
  { name: "Marie Dubois", role: "Public Health Advisor", org: "WHO Africa" }
];

function Team() {
  return (
    <div className="team-page">
      {/* Hero */}
      <section className="team-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="page-tag">Our Team</span>
            <h1>Built by African Innovators</h1>
            <p>A team of healthcare technologists, AI researchers, and public health experts committed to transforming African healthcare through technology.</p>
          </motion.div>
        </div>
      </section>

      {/* Founders */}
      <section className="founders-section">
        <div className="container">
          <div className="founders-grid">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                className="founder-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
              >
                <div className="founder-avatar">
                  <span>{member.initials}</span>
                </div>
                <h3>{member.name}</h3>
                <span className="founder-role">{member.role}</span>
                <p>{member.bio}</p>
                <span className="founder-edu">{member.education}</span>
                <div className="founder-links">
                  <a href={member.linkedin} aria-label="LinkedIn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/>
                      <rect x="2" y="9" width="4" height="12"/>
                      <circle cx="4" cy="4" r="2"/>
                    </svg>
                  </a>
                  <a href={member.twitter} aria-label="Twitter">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                    </svg>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-content">
            <div className="mission-text">
              <h2>Our Mission</h2>
              <p className="mission-statement">
                "To achieve a 70% reduction in antimicrobial resistance across African health systems by 2030 through AI-powered clinical intelligence."
              </p>
              <div className="mission-stats">
                <div className="m-stat">
                  <span className="m-value">54</span>
                  <span className="m-label">Target Countries</span>
                </div>
                <div className="m-stat">
                  <span className="m-value">2M+</span>
                  <span className="m-label">Lives to Impact</span>
                </div>
                <div className="m-stat">
                  <span className="m-value">500+</span>
                  <span className="m-label">Facilities</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advisors */}
      <section className="advisors-section">
        <div className="container">
          <h2>Advisory Board</h2>
          <p className="section-desc">Guided by global experts in clinical medicine, AMR research, and public health policy.</p>
          <div className="advisors-grid">
            {advisors.map((advisor, index) => (
              <motion.div
                key={index}
                className="advisor-card"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <h4>{advisor.name}</h4>
                <span className="advisor-role">{advisor.role}</span>
                <span className="advisor-org">{advisor.org}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join */}
      <section className="join-section">
        <div className="container">
          <div className="join-content">
            <h2>Join Our Mission</h2>
            <p>We're building the future of healthcare in Africa. If you're passionate about using technology to save lives, we want to hear from you.</p>
            <div className="join-buttons">
              <Link to="/request-demo" className="btn-primary">Partner With Us</Link>
              <a href="mailto:careers@medikalafrica.com" className="btn-secondary">View Open Roles</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Team;
