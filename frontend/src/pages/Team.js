import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Team.css';
import olivierPhoto from '../assets/team/olivier.jpg';
import tresorPhoto from '../assets/team/tresor.png';
import amenPhoto from '../assets/team/amen.png';

const teamMembers = [
  {
    id: 1,
    name: "Olivier Niyonshima",
    role: "Founder & CEO",
    bio: "Software engineer focused on AI and scalable healthcare systems. Leads product vision and continental expansion strategy.",
    education: "Algonquin College, Ottawa",
    linkedin: "https://www.linkedin.com/in/olivier-niyonshima-aa2b36236/",
    photo: olivierPhoto,
    initials: "ON"
  },
  {
    id: 2,
    name: "Tresor Yubahwe",
    role: "Co-Founder & COO",
    bio: "Specializes in ML and AI model development. Leading the Kinyarwanda language AI model and operational excellence.",
    education: "Princeton University",
    linkedin: "https://www.linkedin.com/in/tresoryubahwe/",
    photo: tresorPhoto,
    initials: "TY"
  },
  {
    id: 3,
    name: "Amen Divine Ikamba",
    role: "Co-Founder & Head of Product",
    bio: "Leads product development and user experience. Ensures seamless clinical workflow integration across health systems.",
    education: "Pitzer College, California",
    linkedin: "https://www.linkedin.com/in/amen123/",
    photo: amenPhoto,
    initials: "AI"
  }
];

const Team = React.memo(function Team() {
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

      {/* Leadership */}
      <section className="leadership-section">
        <div className="container">
          <div className="section-header">
            <h2>Founding Members</h2>
            <p>Our founding team brings together expertise in AI, healthcare systems, and product development.</p>
          </div>
          <div className="leadership-grid">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                className="leader-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
              >
                <div className="leader-avatar">
                  {member.photo ? (
                    <img src={member.photo} alt={member.name} />
                  ) : (
                    <span>{member.initials || member.name.split(' ').map(n => n[0]).join('')}</span>
                  )}
                </div>
                <h3>{member.name}</h3>
                <span className="leader-role">{member.role}</span>
                <p>{member.bio}</p>
                <span className="leader-edu">{member.education}</span>
                <div className="leader-links">
                  <a href={member.linkedin} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/>
                      <rect x="2" y="9" width="4" height="12"/>
                      <circle cx="4" cy="4" r="2"/>
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
});

export default Team;
