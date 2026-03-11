import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
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
        {/* Animated data sources */}
        {[0, 1, 2, 3].map(i => (
          <React.Fragment key={i}>
            <motion.rect
              x={20 + i * 45} y={20} width={35} height={50} rx={4}
              fill="none" stroke="#5EC4D5" strokeWidth="1"
              initial={{ opacity: 0, y: 10 }}
              animate={isActive ? { 
                opacity: 1, 
                y: 0,
                strokeWidth: [1, 2, 1]
              } : { opacity: 0.2 }}
              transition={{ 
                delay: i * 0.15,
                strokeWidth: { duration: 2, repeat: Infinity }
              }}
            />
            
            {/* Animated data flow lines */}
            <motion.line
              x1={37 + i * 45} y1={70} x2={100} y2={130}
              stroke="#5EC4D5" strokeWidth="0.5" strokeDasharray="3 3"
              initial={{ opacity: 0, pathLength: 0 }}
              animate={isActive ? { 
                opacity: 0.6,
                pathLength: 1
              } : { opacity: 0, pathLength: 0 }}
              transition={{ delay: 0.5 + i * 0.1, duration: 1 }}
            />
            
            {/* Animated data packets on lines */}
            {isActive && (
              <motion.circle
                r={2}
                fill="#5EC4D5"
                initial={{ cx: 37 + i * 45, cy: 70 }}
                animate={{
                  cx: [37 + i * 45, 100],
                  cy: [70, 130]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "linear"
                }}
              />
            )}
          </React.Fragment>
        ))}
        
        {/* API endpoint with pulse */}
        <motion.rect
          x={75} y={115} width={50} height={30} rx={6}
          fill="rgba(94,196,213,0.15)" stroke="#5EC4D5" strokeWidth="1"
          initial={{ scale: 0 }}
          animate={isActive ? { 
            scale: 1,
            strokeWidth: [1, 2, 1]
          } : { scale: 0.5, opacity: 0.2 }}
          transition={{ 
            delay: 0.8,
            strokeWidth: { duration: 1.5, repeat: Infinity }
          }}
        />
        
        {/* Glow effect around API */}
        {isActive && (
          <motion.rect
            x={75} y={115} width={50} height={30} rx={6}
            fill="none" stroke="#5EC4D5" strokeWidth="1"
            opacity={0.3}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
        
        <motion.text x={100} y={134} textAnchor="middle" fill="#5EC4D5" fontSize="8" fontWeight="600"
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1 }}
        >API</motion.text>
        
        {/* Data stream particles */}
        {isActive && [...Array(12)].map((_, i) => (
          <motion.circle
            key={i}
            r={1.5}
            fill="#5EC4D5"
            initial={{
              cx: 20 + (i % 4) * 45 + 17.5,
              cy: 20,
              opacity: 0
            }}
            animate={{
              cy: [20, 160],
              opacity: [0, 1, 1, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: (i % 4) * 0.2 + Math.floor(i / 4) * 0.5,
              ease: "easeOut"
            }}
          />
        ))}
      </svg>
    );
  }
  if (type === 'security') {
    return (
      <svg viewBox="0 0 200 160" className="step-svg">
        {/* Lock icon with animated path */}
        <motion.path
          d="M100 20 L130 40 L130 80 Q130 110 100 120 Q70 110 70 80 L70 40 Z"
          fill="rgba(16,185,129,0.1)" stroke="#10B981" strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={isActive ? { 
            pathLength: 1,
            strokeWidth: [1, 2, 1]
          } : { pathLength: 0 }}
          transition={{ 
            duration: 1.5,
            strokeWidth: { duration: 2, repeat: Infinity }
          }}
        />
        
        {/* Glow effect around lock */}
        {isActive && (
          <motion.path
            d="M100 20 L130 40 L130 80 Q130 110 100 120 Q70 110 70 80 L70 40 Z"
            fill="none" stroke="#10B981" strokeWidth="1"
            opacity={0.4}
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.4, 0.8, 0.4]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
        
        <motion.text x={100} y={75} textAnchor="middle" fill="#10B981" fontSize="20" fontWeight="700"
          initial={{ opacity: 0, scale: 0 }}
          animate={isActive ? { 
            opacity: 1, 
            scale: [1, 1.2, 1],
            rotate: [0, 5, -5, 0]
          } : { opacity: 0 }}
          transition={{ 
            delay: 0.8,
            scale: { duration: 2, repeat: Infinity },
            rotate: { duration: 3, repeat: Infinity }
          }}
        >&#x2713;</motion.text>
        
        {/* Encryption layers animation */}
        {[30, 60, 90, 120, 150].map((x, i) => (
          <React.Fragment key={i}>
            <motion.rect
              x={x} y={140} width={20} height={4} rx={2}
              fill="#10B981"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={isActive ? { 
                opacity: [0.3, 0.8, 0.3],
                scaleX: [0.8, 1, 0.8]
              } : { opacity: 0 }}
              transition={{ 
                delay: 1 + i * 0.1,
                duration: 1.5,
                repeat: Infinity
              }}
            />
            
            {/* Encryption particles */}
            {isActive && (
              <motion.circle
                r={2}
                fill="#10B981"
                cx={x + 10}
                cy={140}
                animate={{
                  y: [140, 120, 140],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            )}
          </React.Fragment>
        ))}
        
        {/* Security shield particles */}
        {isActive && [...Array(6)].map((_, i) => (
          <motion.circle
            key={i}
            r={1.5}
            fill="#10B981"
            cx={100}
            cy={70}
            initial={{ opacity: 0 }}
            animate={{
              x: [0, Math.cos((i * Math.PI * 2) / 6) * 40],
              y: [0, Math.sin((i * Math.PI * 2) / 6) * 40],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2
            }}
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
        {/* Neural network connections with animated data flow */}
        {edges.map(([a, b], i) => (
          <React.Fragment key={i}>
            <motion.line
              x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y}
              stroke="#8B5CF6" strokeWidth="0.8"
              initial={{ opacity: 0, pathLength: 0 }}
              animate={isActive ? { 
                opacity: 0.4,
                pathLength: 1,
                strokeWidth: [0.8, 1.2, 0.8]
              } : { opacity: 0.05, pathLength: 0 }}
              transition={{ 
                delay: i * 0.05,
                strokeWidth: { duration: 2, repeat: Infinity }
              }}
            />
            
            {/* Data packets flowing through connections */}
            {isActive && (
              <motion.circle
                r={2}
                fill="#8B5CF6"
                initial={{ cx: nodes[a].x, cy: nodes[a].y }}
                animate={{
                  cx: [nodes[a].x, nodes[b].x],
                  cy: [nodes[a].y, nodes[b].y]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "linear"
                }}
              />
            )}
          </React.Fragment>
        ))}
        
        {/* Neural network nodes with pulse */}
        {nodes.map((n, i) => (
          <React.Fragment key={i}>
            <motion.circle
              cx={n.x} cy={n.y} r={i === 6 ? 12 : 8}
              fill={i === 6 ? 'rgba(139,92,246,0.2)' : 'rgba(139,92,246,0.1)'}
              stroke="#8B5CF6" strokeWidth="1"
              initial={{ scale: 0 }}
              animate={isActive ? { 
                scale: 1,
                strokeWidth: [1, 2, 1]
              } : { scale: 0 }}
              transition={{ 
                delay: 0.3 + i * 0.08,
                strokeWidth: { duration: 2, repeat: Infinity }
              }}
            />
            
            {/* Node glow effect */}
            {isActive && (
              <motion.circle
                cx={n.x} cy={n.y} r={i === 6 ? 12 : 8}
                fill="none"
                stroke="#8B5CF6"
                strokeWidth="1"
                opacity={0.4}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.4, 0.8, 0.4]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.1
                }}
              />
            )}
          </React.Fragment>
        ))}
        
        {/* Main data flow through network */}
        {isActive && (
          <>
            <motion.circle r={4} fill="#8B5CF6"
              initial={{ cx: 30, cy: 80 }}
              animate={{ cx: [30, 100, 170], cy: [80, 70, 80] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <motion.circle r={3} fill="#8B5CF6" opacity={0.6}
              initial={{ cx: 30, cy: 80 }}
              animate={{ cx: [30, 100, 170], cy: [80, 70, 80] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3, ease: "linear" }}
            />
          </>
        )}
        
        {/* Processing indicator */}
        {isActive && (
          <motion.text
            x={170} y={95}
            fill="#8B5CF6"
            fontSize="6"
            fontWeight="600"
            opacity={0.8}
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            PROCESSING
          </motion.text>
        )}
      </svg>
    );
  }
  if (type === 'detection') {
    return (
      <svg viewBox="0 0 200 160" className="step-svg">
        {/* Resistance pattern graph */}
        <motion.path
          d="M40 130 Q70 130 80 100 Q90 70 100 80 Q110 90 120 50 Q130 10 150 40 Q160 60 170 30"
          fill="none" stroke="#EF4444" strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={isActive ? { 
            pathLength: 1,
            strokeWidth: [1.5, 2.5, 1.5]
          } : { pathLength: 0 }}
          transition={{ 
            duration: 1.5,
            strokeWidth: { duration: 2, repeat: Infinity }
          }}
        />
        
        {/* Animated data points on graph */}
        {isActive && [80, 100, 120, 150].map((x, i) => {
          const y = i === 0 ? 100 : i === 1 ? 80 : i === 2 ? 50 : 40;
          return (
            <motion.circle
              key={i}
              cx={x} cy={y} r={3}
              fill="#EF4444"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1.5, 1],
                opacity: [0, 1, 1]
              }}
              transition={{
                delay: 0.5 + i * 0.3,
                scale: { duration: 0.5 }
              }}
            />
          );
        })}
        
        {/* Threshold line with pulse */}
        <motion.line 
          x1={120} y1={0} x2={120} y2={160} 
          stroke="#EF4444" strokeWidth="0.5" strokeDasharray="4 4"
          initial={{ opacity: 0 }}
          animate={isActive ? { 
            opacity: [0.3, 0.8, 0.3],
            strokeWidth: [0.5, 1, 0.5]
          } : { opacity: 0 }}
          transition={{ 
            delay: 1,
            opacity: { duration: 2, repeat: Infinity },
            strokeWidth: { duration: 2, repeat: Infinity }
          }}
        />
        
        <motion.text x={130} y={16} fill="#EF4444" fontSize="7" fontWeight="600"
          initial={{ opacity: 0 }}
          animate={isActive ? { 
            opacity: 1,
            x: [130, 132, 130]
          } : { opacity: 0 }}
          transition={{ 
            delay: 1.2,
            x: { duration: 2, repeat: Infinity }
          }}
        >THRESHOLD</motion.text>
        
        {/* Alert indicator with expanding rings */}
        <motion.circle 
          cx={150} cy={40} r={6} 
          fill="none" stroke="#EF4444" strokeWidth="1"
          initial={{ scale: 0 }}
          animate={isActive ? { 
            scale: [1, 1.5, 1],
            strokeWidth: [1, 2, 1]
          } : { scale: 0 }}
          transition={{ 
            delay: 1.5, 
            duration: 1, 
            repeat: Infinity 
          }}
        />
        
        {/* Expanding alert rings */}
        {isActive && [...Array(3)].map((_, i) => (
          <motion.circle
            key={i}
            cx={150} cy={40} r={6}
            fill="none"
            stroke="#EF4444"
            strokeWidth="1"
            opacity={0.4}
            animate={{
              scale: [1, 3],
              opacity: [0.4, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3
            }}
          />
        ))}
        
        {/* Alert flash */}
        {isActive && (
          <motion.rect
            x={140} y={30} width={20} height={20} rx={2}
            fill="#EF4444"
            opacity={0.2}
            animate={{
              opacity: [0.2, 0.6, 0.2]
            }}
            transition={{
              duration: 1,
              repeat: Infinity
            }}
          />
        )}
        
        {/* Data stream to detection point */}
        {isActive && [...Array(5)].map((_, i) => (
          <motion.circle
            key={i}
            r={2}
            fill="#EF4444"
            initial={{ cx: 40, cy: 130, opacity: 0 }}
            animate={{
              cx: [40, 150],
              cy: [130, 40],
              opacity: [0, 1, 1, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
          />
        ))}
      </svg>
    );
  }
  // output
  return (
    <svg viewBox="0 0 200 160" className="step-svg">
      {/* Dashboard panels */}
      {[0, 1, 2].map(i => (
        <React.Fragment key={i}>
          <motion.rect
            x={30 + i * 50} y={20} width={40} height={100} rx={6}
            fill="none" stroke="#F59E0B" strokeWidth="1"
            initial={{ opacity: 0, y: 10 }}
            animate={isActive ? { 
              opacity: 1, 
              y: 0,
              strokeWidth: [1, 2, 1]
            } : { opacity: 0.1 }}
            transition={{ 
              delay: i * 0.2,
              strokeWidth: { duration: 2, repeat: Infinity }
            }}
          />
          
          {/* Panel glow */}
          {isActive && (
            <motion.rect
              x={30 + i * 50} y={20} width={40} height={100} rx={6}
              fill="none" stroke="#F59E0B" strokeWidth="1"
              opacity={0.3}
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.1
              }}
            />
          )}
        </React.Fragment>
      ))}
      
      {/* Animated data bars */}
      {[0, 1, 2].map(i => (
        <React.Fragment key={`bar-${i}`}>
          <motion.rect
            x={38 + i * 50} y={isActive ? (60 - i * 15) : 110}
            width={24} height={isActive ? (60 + i * 15) : 10} rx={3}
            fill={`rgba(245,158,11,${0.2 + i * 0.15})`}
            transition={{ delay: 0.5 + i * 0.15, duration: 0.8 }}
          />
          
          {/* Bar pulse animation */}
          {isActive && (
            <motion.rect
              x={38 + i * 50} y={isActive ? (60 - i * 15) : 110}
              width={24} height={isActive ? (60 + i * 15) : 10} rx={3}
              fill="#F59E0B"
              opacity={0.3}
              animate={{
                height: [
                  isActive ? (60 + i * 15) : 10,
                  isActive ? (65 + i * 15) : 10,
                  isActive ? (60 + i * 15) : 10
                ]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          )}
        </React.Fragment>
      ))}
      
      {/* Live indicator with pulse */}
      <motion.circle 
        cx={170} cy={140} r={4} 
        fill="#F59E0B"
        initial={{ opacity: 0 }}
        animate={isActive ? { 
          opacity: [0, 1, 0],
          scale: [1, 1.3, 1]
        } : { opacity: 0 }}
        transition={{ 
          delay: 1, 
          duration: 1.5, 
          repeat: Infinity 
        }}
      />
      
      {/* Expanding pulse rings */}
      {isActive && [...Array(2)].map((_, i) => (
        <motion.circle
          key={i}
          cx={170} cy={140} r={4}
          fill="none"
          stroke="#F59E0B"
          strokeWidth="1"
          opacity={0.4}
          animate={{
            scale: [1, 2.5],
            opacity: [0.4, 0]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.5
          }}
        />
      ))}
      
      <motion.text 
        x={178} y={143} 
        fill="#F59E0B" 
        fontSize="7" 
        fontWeight="500"
        initial={{ opacity: 0 }}
        animate={isActive ? { 
          opacity: [1, 0.5, 1],
          x: [178, 180, 178]
        } : { opacity: 0 }}
        transition={{ 
          delay: 1,
          opacity: { duration: 1.5, repeat: Infinity },
          x: { duration: 1.5, repeat: Infinity }
        }}
      >LIVE</motion.text>
      
      {/* Data streaming to dashboard */}
      {isActive && [...Array(8)].map((_, i) => (
        <motion.circle
          key={i}
          r={1.5}
          fill="#F59E0B"
          initial={{
            cx: 100,
            cy: 160,
            opacity: 0
          }}
          animate={{
            cx: [100, 30 + (i % 3) * 50 + 20],
            cy: [160, 20],
            opacity: [0, 1, 1, 0]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeOut"
          }}
        />
      ))}
    </svg>
  );
};

const HowItWorks = React.memo(function HowItWorks() {
  const [activeStep, setActiveStep] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  // Auto-advance feature
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setActiveStep(prev => {
        if (prev >= steps.length) {
          return 1; // Loop back to start
        }
        return prev + 1;
      });
    }, 4000); // Change step every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, steps.length]);

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
                <motion.button
                  className={`step-marker ${activeStep === step.id ? 'active' : ''} ${activeStep > step.id ? 'completed' : ''}`}
                  onClick={() => setActiveStep(step.id)}
                  style={{ '--step-color': step.color }}
                  data-testid={`hiw-step-${step.id}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    boxShadow: activeStep === step.id 
                      ? `0 0 30px ${step.color}40, 0 0 60px ${step.color}20`
                      : 'none'
                  }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                >
                  <span className="step-num">
                    {step.id}
                  </span>
                  <span className="step-phase">{step.phase}</span>
                  
                  {/* Active step glow effect */}
                  {activeStep === step.id && (
                    <motion.div
                      className="step-glow"
                      style={{ '--glow-color': step.color }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ 
                        opacity: [0.5, 1, 0.5],
                        scale: [0.8, 1.2, 0.8]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  )}
                  
                  {/* Data particles for active step */}
                  {activeStep === step.id && (
                    <div className="step-particles">
                      {[...Array(8)].map((_, idx) => (
                        <motion.div
                          key={idx}
                          className="particle"
                          style={{ '--particle-color': step.color }}
                          initial={{ 
                            x: '50%',
                            y: '50%',
                            opacity: 0,
                            scale: 0
                          }}
                          animate={{
                            x: `${50 + (Math.cos((idx * Math.PI * 2) / 8) * 60)}%`,
                            y: `${50 + (Math.sin((idx * Math.PI * 2) / 8) * 60)}%`,
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: idx * 0.1,
                            ease: "easeOut"
                          }}
                        />
                      ))}
                    </div>
                  )}
                </motion.button>
                {i < steps.length - 1 && (
                  <div className={`step-connector ${activeStep > step.id ? 'filled' : ''}`}>
                    {/* Traveling microbe from current step to next */}
                    {activeStep === step.id && (
                      <motion.div
                        className="traveling-microbe-connector"
                        initial={{ x: '-20px', opacity: 0, scale: 0 }}
                        animate={{ 
                          x: ['-20px', 'calc(100% + 20px)'],
                          opacity: [0, 1, 1, 0],
                          scale: [0, 1, 1, 0.8]
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          delay: 0.3,
                          ease: [0.4, 0, 0.2, 1]
                        }}
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 100 100"
                          style={{ filter: 'drop-shadow(0 0 6px rgba(94, 196, 213, 0.8))' }}
                        >
                          {/* Outer membrane */}
                          <circle
                            cx="50"
                            cy="50"
                            r="35"
                            fill="none"
                            stroke="#5EC4D5"
                            strokeWidth="2"
                            opacity="0.4"
                          />
                          {/* Cell wall */}
                          <circle
                            cx="50"
                            cy="50"
                            r="25"
                            fill="none"
                            stroke="#5EC4D5"
                            strokeWidth="1.5"
                            opacity="0.6"
                          />
                          {/* Inner membrane */}
                          <circle
                            cx="50"
                            cy="50"
                            r="15"
                            fill="none"
                            stroke="#5EC4D5"
                            strokeWidth="1"
                            opacity="0.8"
                          />
                          {/* Flagella - animated */}
                          <motion.path
                            d="M 50 50 L 30 30 M 50 50 L 70 30 M 50 50 L 30 70 M 50 50 L 70 70"
                            stroke="#5EC4D5"
                            strokeWidth="1.2"
                            opacity="0.5"
                            strokeLinecap="round"
                            animate={{
                              rotate: [0, 360],
                              opacity: [0.3, 0.6, 0.3]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "linear"
                            }}
                          />
                          {/* Nucleoid - glowing core */}
                          <motion.ellipse
                            cx="50"
                            cy="50"
                            rx="8"
                            ry="12"
                            fill="#5EC4D5"
                            animate={{
                              opacity: [0.3, 0.7, 0.3],
                              scale: [1, 1.2, 1]
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          />
                          {/* Glowing center */}
                          <circle
                            cx="50"
                            cy="50"
                            r="4"
                            fill="#5EC4D5"
                            opacity="0.9"
                          />
                        </svg>
                      </motion.div>
                    )}
                    
                    {/* Microbes for completed connectors */}
                    {activeStep > step.id && (
                      <>
                        {[...Array(2)].map((_, idx) => (
                          <motion.div
                            key={idx}
                            className="traveling-microbe-connector"
                            initial={{ x: '-20px', opacity: 0, scale: 0 }}
                            animate={{ 
                              x: ['-20px', 'calc(100% + 20px)'],
                              opacity: [0, 1, 1, 0],
                              scale: [0, 1, 1, 0.8]
                            }}
                            transition={{
                              duration: 2.5,
                              repeat: Infinity,
                              delay: idx * 1.2,
                              ease: [0.4, 0, 0.2, 1]
                            }}
                          >
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 100 100"
                              style={{ filter: 'drop-shadow(0 0 4px rgba(94, 196, 213, 0.6))' }}
                            >
                              <circle cx="50" cy="50" r="30" fill="none" stroke="#5EC4D5" strokeWidth="1.5" opacity="0.3" />
                              <circle cx="50" cy="50" r="20" fill="none" stroke="#5EC4D5" strokeWidth="1" opacity="0.5" />
                              <circle cx="50" cy="50" r="12" fill="none" stroke="#5EC4D5" strokeWidth="0.8" opacity="0.7" />
                              <motion.ellipse
                                cx="50"
                                cy="50"
                                rx="6"
                                ry="10"
                                fill="#5EC4D5"
                                animate={{
                                  opacity: [0.2, 0.5, 0.2]
                                }}
                                transition={{
                                  duration: 1.5,
                                  repeat: Infinity,
                                  ease: "easeInOut"
                                }}
                              />
                              <circle cx="50" cy="50" r="3" fill="#5EC4D5" opacity="0.8" />
                            </svg>
                          </motion.div>
                        ))}
                      </>
                    )}
                  </div>
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
              onClick={() => {
                setIsAutoPlaying(false);
                setActiveStep(s => s - 1);
              }}
              data-testid="hiw-prev-btn"
            >
              Previous
            </button>
            <button
              className={`hiw-nav-btn ${isAutoPlaying ? 'active' : ''}`}
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              data-testid="hiw-autoplay-btn"
              title={isAutoPlaying ? 'Pause animation' : 'Auto-play animation'}
            >
              {isAutoPlaying ? '⏸ Pause' : '▶ Auto'}
            </button>
            <span className="hiw-nav-count">{activeStep} / {steps.length}</span>
            <button
              className="hiw-nav-btn primary"
              disabled={activeStep === steps.length}
              onClick={() => {
                setIsAutoPlaying(false);
                setActiveStep(s => s + 1);
              }}
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
});

export default HowItWorks;
