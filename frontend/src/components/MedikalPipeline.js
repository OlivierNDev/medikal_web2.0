import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './MedikalPipeline.css';

const scenes = [
  {
    id: 1,
    title: "Hospital Data Generation",
    text: "Clinical data is securely transmitted from hospitals and laboratories.",
    dataTypes: ["Prescriptions", "Lab Tests", "Imaging", "Symptoms"]
  },
  {
    id: 2,
    title: "Secure Data Pipeline",
    text: "Patient data is encrypted and processed through Medikal's secure health infrastructure.",
    dataTypes: ["AES-256", "TLS 1.3", "HIPAA", "Anonymized"]
  },
  {
    id: 3,
    title: "AI Analysis Layer",
    text: "AI models analyze diagnostics, prescriptions, and lab results.",
    dataTypes: ["Clinical AI", "Imaging AI", "Lab Analysis", "AMR Prediction"]
  },
  {
    id: 4,
    title: "Resistance Detection",
    text: "The AMR engine detects emerging resistance patterns across health systems.",
    dataTypes: ["Pattern Match", "Cluster Detection", "Risk Score", "Hotspots"]
  },
  {
    id: 5,
    title: "Intelligence Dashboard",
    text: "Health authorities receive real-time antimicrobial resistance intelligence.",
    dataTypes: ["Alerts", "Analytics", "Reports", "Insights"]
  }
];

// Data packet component
const DataPacket = ({ delay, color }) => (
  <motion.div
    className="data-packet"
    style={{ background: color }}
    initial={{ x: -20, opacity: 0 }}
    animate={{ 
      x: [0, 100, 200, 300, 400],
      opacity: [0, 1, 1, 1, 0]
    }}
    transition={{
      duration: 3,
      delay,
      repeat: Infinity,
      ease: "linear"
    }}
  />
);

// Pipeline node component
const PipelineNode = ({ label, icon, isActive, stats }) => (
  <motion.div 
    className={`pipeline-node ${isActive ? 'active' : ''}`}
    whileHover={{ scale: 1.05 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="node-icon">{icon}</div>
    <div className="node-label">{label}</div>
    {isActive && stats && (
      <motion.div 
        className="node-stats"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {stats}
      </motion.div>
    )}
  </motion.div>
);

// Africa map with hotspots
const AfricaMap = ({ activeScene }) => {
  const hotspots = [
    { id: 1, x: 65, y: 35, label: "Kenya", risk: "moderate", delay: 0 },
    { id: 2, x: 55, y: 42, label: "Uganda", risk: "low", delay: 0.2 },
    { id: 3, x: 35, y: 30, label: "Nigeria", risk: "high", delay: 0.4 },
    { id: 4, x: 50, y: 55, label: "Rwanda", risk: "moderate", delay: 0.6 },
    { id: 5, x: 60, y: 70, label: "S. Africa", risk: "low", delay: 0.8 },
  ];

  const riskColors = {
    low: '#10B981',
    moderate: '#F59E0B',
    high: '#EF4444'
  };

  return (
    <div className="africa-map">
      <svg viewBox="0 0 100 100" className="map-svg">
        {/* Simplified Africa outline */}
        <path
          d="M35,5 Q50,3 65,8 Q80,15 82,35 Q85,55 75,75 Q65,90 50,95 Q35,92 25,80 Q15,65 18,45 Q20,25 35,5"
          fill="none"
          stroke="#5EC4D5"
          strokeWidth="0.5"
          opacity="0.3"
        />
        
        {/* Grid lines */}
        {[20, 40, 60, 80].map(y => (
          <line key={`h${y}`} x1="10" y1={y} x2="90" y2={y} stroke="#5EC4D5" strokeWidth="0.1" opacity="0.2" />
        ))}
        {[20, 40, 60, 80].map(x => (
          <line key={`v${x}`} x1={x} y1="10" x2={x} y2="90" stroke="#5EC4D5" strokeWidth="0.1" opacity="0.2" />
        ))}
      </svg>

      {/* Hotspots */}
      {activeScene >= 4 && hotspots.map((spot) => (
        <motion.div
          key={spot.id}
          className="map-hotspot"
          style={{ 
            left: `${spot.x}%`, 
            top: `${spot.y}%`,
            '--risk-color': riskColors[spot.risk]
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: spot.delay, duration: 0.5 }}
        >
          <div className="hotspot-pulse" />
          <div className="hotspot-core" />
          <span className="hotspot-label">{spot.label}</span>
        </motion.div>
      ))}
    </div>
  );
};

// Neural network visualization
const NeuralNetwork = ({ isActive }) => {
  const nodes = [
    // Input layer
    { x: 10, y: 20 }, { x: 10, y: 40 }, { x: 10, y: 60 }, { x: 10, y: 80 },
    // Hidden layer 1
    { x: 35, y: 25 }, { x: 35, y: 50 }, { x: 35, y: 75 },
    // Hidden layer 2
    { x: 60, y: 30 }, { x: 60, y: 60 },
    // Output
    { x: 85, y: 45 }
  ];

  const connections = [
    [0, 4], [0, 5], [1, 4], [1, 5], [1, 6], [2, 5], [2, 6], [3, 5], [3, 6],
    [4, 7], [4, 8], [5, 7], [5, 8], [6, 7], [6, 8],
    [7, 9], [8, 9]
  ];

  return (
    <svg viewBox="0 0 100 100" className="neural-network">
      {/* Connections */}
      {connections.map(([from, to], i) => (
        <motion.line
          key={i}
          x1={nodes[from].x}
          y1={nodes[from].y}
          x2={nodes[to].x}
          y2={nodes[to].y}
          stroke="#5EC4D5"
          strokeWidth="0.3"
          initial={{ opacity: 0 }}
          animate={{ opacity: isActive ? 0.4 : 0.1 }}
          transition={{ delay: i * 0.05 }}
        />
      ))}
      
      {/* Nodes */}
      {nodes.map((node, i) => (
        <motion.circle
          key={i}
          cx={node.x}
          cy={node.y}
          r="3"
          fill="#0F1117"
          stroke="#5EC4D5"
          strokeWidth="0.5"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: i * 0.05 }}
        />
      ))}

      {/* Animated signal */}
      {isActive && (
        <motion.circle
          r="2"
          fill="#5EC4D5"
          initial={{ cx: 10, cy: 40 }}
          animate={{ 
            cx: [10, 35, 60, 85],
            cy: [40, 50, 45, 45]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      )}
    </svg>
  );
};

// Main Pipeline Component
export default function MedikalPipeline() {
  const [activeScene, setActiveScene] = useState(1);
  const [isHovering, setIsHovering] = useState(null);

  // Auto-advance scenes
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveScene(prev => prev >= 5 ? 1 : prev + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const pipelineStages = [
    { id: 1, label: "Hospitals", icon: "H", stats: "45+ facilities" },
    { id: 2, label: "Secure API", icon: "S", stats: "AES-256 encrypted" },
    { id: 3, label: "AI Engine", icon: "AI", stats: "96.2% accuracy" },
    { id: 4, label: "AMR Detection", icon: "D", stats: "Real-time alerts" },
    { id: 5, label: "Dashboard", icon: "I", stats: "Live insights" }
  ];

  return (
    <section className="pipeline-section" data-testid="pipeline-section">
      <div className="pipeline-container">
        {/* Header */}
        <div className="pipeline-header">
          <h2>See how Medikal detects resistance patterns in real-time</h2>
        </div>

        {/* Main visualization area */}
        <div className="pipeline-visualization">
          {/* Left panel - Scene info */}
          <div className="scene-info">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeScene}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
                className="scene-content"
              >
                <span className="scene-number">0{activeScene}</span>
                <h3>{scenes[activeScene - 1].title}</h3>
                <p>{scenes[activeScene - 1].text}</p>
                
                <div className="data-types">
                  {scenes[activeScene - 1].dataTypes.map((type, i) => (
                    <motion.span 
                      key={type}
                      className="data-tag"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      {type}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Scene indicators */}
            <div className="scene-indicators">
              {scenes.map((scene) => (
                <button
                  key={scene.id}
                  className={`indicator ${activeScene === scene.id ? 'active' : ''}`}
                  onClick={() => setActiveScene(scene.id)}
                />
              ))}
            </div>
          </div>

          {/* Center panel - Main animation */}
          <div className="animation-panel">
            {/* Pipeline flow */}
            <div className="pipeline-flow">
              {pipelineStages.map((stage, index) => (
                <React.Fragment key={stage.id}>
                  <PipelineNode 
                    {...stage}
                    isActive={activeScene === stage.id}
                  />
                  {index < pipelineStages.length - 1 && (
                    <div className="pipeline-connector">
                      <div className="connector-line" />
                      {activeScene > index && (
                        <>
                          <DataPacket delay={0} color="#5EC4D5" />
                          <DataPacket delay={0.5} color="#5EC4D5" />
                          <DataPacket delay={1} color="#5EC4D5" />
                        </>
                      )}
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Bottom visualizations */}
            <div className="visualization-panels">
              {/* Neural network */}
              <div className="viz-panel">
                <span className="viz-label">AI Model Activity</span>
                <NeuralNetwork isActive={activeScene === 3} />
              </div>

              {/* Africa map */}
              <div className="viz-panel map-panel">
                <span className="viz-label">AMR Hotspots</span>
                <AfricaMap activeScene={activeScene} />
              </div>

              {/* Metrics */}
              <div className="viz-panel metrics-panel">
                <span className="viz-label">Live Metrics</span>
                <div className="metrics-grid">
                  <div className="metric">
                    <motion.span 
                      className="metric-value"
                      key={activeScene}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {activeScene >= 3 ? '12,847' : '---'}
                    </motion.span>
                    <span className="metric-label">Predictions/day</span>
                  </div>
                  <div className="metric">
                    <span className="metric-value">96.2%</span>
                    <span className="metric-label">AI Accuracy</span>
                  </div>
                  <div className="metric">
                    <motion.span 
                      className="metric-value"
                      style={{ color: activeScene >= 4 ? '#EF4444' : '#5EC4D5' }}
                    >
                      {activeScene >= 4 ? '3' : '0'}
                    </motion.span>
                    <span className="metric-label">Active Alerts</span>
                  </div>
                  <div className="metric">
                    <span className="metric-value">45</span>
                    <span className="metric-label">Connected Sites</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom caption */}
        <div className="pipeline-caption">
          <span>Hospitals</span>
          <span className="caption-arrow">→</span>
          <span>Secure Data</span>
          <span className="caption-arrow">→</span>
          <span>AI Models</span>
          <span className="caption-arrow">→</span>
          <span>AMR Detection</span>
          <span className="caption-arrow">→</span>
          <span>Health Intelligence</span>
        </div>
      </div>
    </section>
  );
}
