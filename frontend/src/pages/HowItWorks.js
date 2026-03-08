import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './HowItWorks.css';

const steps = [
  {
    id: 1,
    phase: "Data Collection",
    title: "Clinical data enters the system",
    description: "Hospitals and laboratories transmit prescription records, lab test results, imaging data, and patient symptoms through Medikal's secure API endpoints.",
    details: [
      "EMR/EHR integration via HL7 FHIR",
      "Lab Information System (LIS) connectors",
      "Real-time data streaming with encryption",
      "Support for 500+ facility types"
    ],
    visual: "intake",
    color: "#5EC4D5"
  },
  {
    id: 2,
    phase: "Security Layer",
    title: "Data is encrypted and anonymized",
    description: "All patient data passes through a multi-layer security pipeline. Personal identifiers are stripped, and data is encrypted with AES-256 before processing.",
    details: [
      "AES-256 encryption at rest and in transit",
      "TLS 1.3 for all API communications",
      "HIPAA-compliant data handling",
      "Automated PII anonymization"
    ],
    visual: "security",
    color: "#10B981"
  },
  {
    id: 3,
    phase: "AI Processing",
    title: "AI models analyze clinical patterns",
    description: "Our proprietary models process diagnostic data, prescription patterns, and lab results simultaneously. The system identifies anomalies and emerging resistance patterns.",
    details: [
      "Clinical NLP for unstructured data",
      "Computer vision for medical imaging",
      "Time-series analysis for trend detection",
      "Ensemble models with 96.2% accuracy"
    ],
    visual: "ai",
    color: "#8B5CF6"
  },
  {
    id: 4,
    phase: "AMR Detection",
    title: "Resistance patterns are identified",
    description: "The AMR engine cross-references current data against historical baselines. When resistance rates exceed thresholds, the system flags potential outbreaks.",
    details: [
      "Multi-pathogen resistance tracking",
      "Geographic cluster detection",
      "Predictive modeling for outbreak risk",
      "Automatic severity classification"
    ],
    visual: "detection",
    color: "#EF4444"
  },
  {
    id: 5,
    phase: "Intelligence Output",
    title: "Actionable insights delivered",
    description: "Health authorities and clinicians receive real-time dashboards, automated alerts, and evidence-based treatment recommendations through the intelligence layer.",
    details: [
      "Real-time surveillance dashboards",
      "SMS/email alert system for clinicians",
      "Treatment recommendation engine",
      "Ministry-level reporting tools"
    ],
    visual: "output",
    color: "#F59E0B"
  }
];

const StepVisual = ({ type, isActive }) => {
  if (type === 'intake') {
    return (
      <svg viewBox="0 0 200 160" className="step-svg">
        {[0, 1, 2, 3].map(i => (
          <React.Fragment key={i}>
            <motion.rect
              x={20 + i * 45} y={20} width={35} height={50} rx={4}
              fill="none" stroke="#5EC4D5" strokeWidth="1"
              initial={{ opacity: 0, y: 10 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0.2 }}
              transition={{ delay: i * 0.15 }}
            />
            <motion.line
              x1={37 + i * 45} y1={70} x2={100} y2={130}
              stroke="#5EC4D5" strokeWidth="0.5" strokeDasharray="3 3"
              initial={{ opacity: 0 }}
              animate={isActive ? { opacity: 0.4 } : { opacity: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
            />
          </React.Fragment>
        ))}
        <motion.rect
          x={75} y={115} width={50} height={30} rx={6}
          fill="rgba(94,196,213,0.15)" stroke="#5EC4D5" strokeWidth="1"
          initial={{ scale: 0 }}
          animate={isActive ? { scale: 1 } : { scale: 0.5, opacity: 0.2 }}
          transition={{ delay: 0.8 }}
        />
        <motion.text x={100} y={134} textAnchor="middle" fill="#5EC4D5" fontSize="8" fontWeight="600"
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1 }}
        >API</motion.text>
      </svg>
    );
  }
  if (type === 'security') {
    return (
      <svg viewBox="0 0 200 160" className="step-svg">
        <motion.path
          d="M100 20 L130 40 L130 80 Q130 110 100 120 Q70 110 70 80 L70 40 Z"
          fill="rgba(16,185,129,0.1)" stroke="#10B981" strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={isActive ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 1.5 }}
        />
        <motion.text x={100} y={75} textAnchor="middle" fill="#10B981" fontSize="20" fontWeight="700"
          initial={{ opacity: 0, scale: 0 }}
          animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8 }}
        >&#x2713;</motion.text>
        {[30, 60, 90, 120, 150].map((x, i) => (
          <motion.rect key={i}
            x={x} y={140} width={20} height={4} rx={2}
            fill="#10B981"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={isActive ? { opacity: 0.3, scaleX: 1 } : { opacity: 0 }}
            transition={{ delay: 1 + i * 0.1 }}
          />
        ))}
      </svg>
    );
  }
  if (type === 'ai') {
    const nodes = [
      { x: 30, y: 40 }, { x: 30, y: 80 }, { x: 30, y: 120 },
      { x: 100, y: 50 }, { x: 100, y: 90 }, { x: 100, y: 130 },
      { x: 170, y: 80 }
    ];
    const edges = [[0,3],[0,4],[1,3],[1,4],[1,5],[2,4],[2,5],[3,6],[4,6],[5,6]];
    return (
      <svg viewBox="0 0 200 160" className="step-svg">
        {edges.map(([a, b], i) => (
          <motion.line key={i}
            x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y}
            stroke="#8B5CF6" strokeWidth="0.8"
            initial={{ opacity: 0 }}
            animate={isActive ? { opacity: 0.3 } : { opacity: 0.05 }}
            transition={{ delay: i * 0.05 }}
          />
        ))}
        {nodes.map((n, i) => (
          <motion.circle key={i}
            cx={n.x} cy={n.y} r={i === 6 ? 12 : 8}
            fill={i === 6 ? 'rgba(139,92,246,0.2)' : 'rgba(139,92,246,0.1)'}
            stroke="#8B5CF6" strokeWidth="1"
            initial={{ scale: 0 }}
            animate={isActive ? { scale: 1 } : { scale: 0 }}
            transition={{ delay: 0.3 + i * 0.08 }}
          />
        ))}
        {isActive && (
          <motion.circle r={4} fill="#8B5CF6"
            initial={{ cx: 30, cy: 80 }}
            animate={{ cx: [30, 100, 170], cy: [80, 70, 80] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        )}
      </svg>
    );
  }
  if (type === 'detection') {
    return (
      <svg viewBox="0 0 200 160" className="step-svg">
        <motion.path
          d="M40 130 Q70 130 80 100 Q90 70 100 80 Q110 90 120 50 Q130 10 150 40 Q160 60 170 30"
          fill="none" stroke="#EF4444" strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={isActive ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 1.5 }}
        />
        <motion.line x1={120} y1={0} x2={120} y2={160} stroke="#EF4444" strokeWidth="0.5" strokeDasharray="4 4"
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 0.3 } : { opacity: 0 }}
          transition={{ delay: 1 }}
        />
        <motion.text x={130} y={16} fill="#EF4444" fontSize="7" fontWeight="600"
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.2 }}
        >THRESHOLD</motion.text>
        <motion.circle cx={150} cy={40} r={6} fill="none" stroke="#EF4444" strokeWidth="1"
          initial={{ scale: 0 }}
          animate={isActive ? { scale: [1, 1.5, 1] } : { scale: 0 }}
          transition={{ delay: 1.5, duration: 1, repeat: Infinity }}
        />
      </svg>
    );
  }
  // output
  return (
    <svg viewBox="0 0 200 160" className="step-svg">
      {[0, 1, 2].map(i => (
        <motion.rect key={i}
          x={30 + i * 50} y={20} width={40} height={100} rx={6}
          fill="none" stroke="#F59E0B" strokeWidth="1"
          initial={{ opacity: 0, y: 10 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0.1 }}
          transition={{ delay: i * 0.2 }}
        />
      ))}
      {[0, 1, 2].map(i => (
        <motion.rect key={`bar-${i}`}
          x={38 + i * 50} y={isActive ? (60 - i * 15) : 110}
          width={24} height={isActive ? (60 + i * 15) : 10} rx={3}
          fill={`rgba(245,158,11,${0.2 + i * 0.15})`}
          transition={{ delay: 0.5 + i * 0.15, duration: 0.8 }}
        />
      ))}
      <motion.circle cx={170} cy={140} r={4} fill="#F59E0B"
        initial={{ opacity: 0 }}
        animate={isActive ? { opacity: [0, 1, 0] } : { opacity: 0 }}
        transition={{ delay: 1, duration: 1.5, repeat: Infinity }}
      />
      <motion.text x={178} y={143} fill="#F59E0B" fontSize="7" fontWeight="500"
        initial={{ opacity: 0 }}
        animate={isActive ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1 }}
      >LIVE</motion.text>
    </svg>
  );
};

function HowItWorks() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <div className="hiw-page" data-testid="how-it-works-page">
      {/* Hero */}
      <section className="hiw-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="page-tag" data-testid="hiw-page-tag">How It Works</span>
            <h1>From Hospital to Intelligence</h1>
            <p>Five stages transform raw clinical data into actionable AMR intelligence that saves lives across Africa.</p>
          </motion.div>
        </div>
      </section>

      {/* Pipeline Overview */}
      <section className="hiw-pipeline-overview">
        <div className="container">
          <div className="pipeline-steps-bar" data-testid="hiw-steps-bar">
            {steps.map((step, i) => (
              <React.Fragment key={step.id}>
                <button
                  className={`step-marker ${activeStep === step.id ? 'active' : ''} ${activeStep > step.id ? 'completed' : ''}`}
                  onClick={() => setActiveStep(step.id)}
                  style={{ '--step-color': step.color }}
                  data-testid={`hiw-step-${step.id}`}
                >
                  <span className="step-num">{step.id}</span>
                  <span className="step-phase">{step.phase}</span>
                </button>
                {i < steps.length - 1 && (
                  <div className={`step-connector ${activeStep > step.id ? 'filled' : ''}`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Active Step Detail */}
      <section className="hiw-detail">
        <div className="container">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              className="hiw-detail-grid"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="hiw-detail-text">
                <span className="detail-phase" style={{ color: steps[activeStep - 1].color }}>
                  Phase {activeStep}
                </span>
                <h2>{steps[activeStep - 1].title}</h2>
                <p className="detail-desc">{steps[activeStep - 1].description}</p>
                <ul className="detail-list">
                  {steps[activeStep - 1].details.map((d, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                    >
                      <span className="detail-bullet" style={{ background: steps[activeStep - 1].color }} />
                      {d}
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div className="hiw-detail-visual" style={{ '--glow-color': steps[activeStep - 1].color }}>
                <StepVisual type={steps[activeStep - 1].visual} isActive={true} />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav buttons */}
          <div className="hiw-nav-buttons" data-testid="hiw-nav-buttons">
            <button
              className="hiw-nav-btn"
              disabled={activeStep === 1}
              onClick={() => setActiveStep(s => s - 1)}
              data-testid="hiw-prev-btn"
            >
              Previous
            </button>
            <span className="hiw-nav-count">{activeStep} / {steps.length}</span>
            <button
              className="hiw-nav-btn primary"
              disabled={activeStep === steps.length}
              onClick={() => setActiveStep(s => s + 1)}
              data-testid="hiw-next-btn"
            >
              Next
            </button>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="hiw-tech">
        <div className="container">
          <div className="hiw-tech-grid" data-testid="hiw-tech-grid">
            <div className="tech-item">
              <span className="tech-number">96.2%</span>
              <span className="tech-label">AI Model Accuracy</span>
            </div>
            <div className="tech-item">
              <span className="tech-number">&lt;200ms</span>
              <span className="tech-label">Analysis Latency</span>
            </div>
            <div className="tech-item">
              <span className="tech-number">AES-256</span>
              <span className="tech-label">Encryption Standard</span>
            </div>
            <div className="tech-item">
              <span className="tech-number">HL7 FHIR</span>
              <span className="tech-label">Integration Protocol</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" data-testid="hiw-cta">
        <div className="container">
          <h2>Ready to deploy Medikal?</h2>
          <p>See the pipeline in action with your own data.</p>
          <Link to="/request-demo" className="btn-white" data-testid="hiw-cta-btn">Request Demo</Link>
        </div>
      </section>
    </div>
  );
}

export default HowItWorks;
