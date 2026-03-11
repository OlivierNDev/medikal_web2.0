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

// Time-series data for each country
const countryTimeSeries = {
  Kenya: [
    { month: 'Jan', rate: 38 }, { month: 'Feb', rate: 39 }, { month: 'Mar', rate: 41 },
    { month: 'Apr', rate: 40 }, { month: 'May', rate: 42 }, { month: 'Jun', rate: 43 },
    { month: 'Jul', rate: 42 }, { month: 'Aug', rate: 44 }, { month: 'Sep', rate: 43 },
    { month: 'Oct', rate: 44 }, { month: 'Nov', rate: 45 }, { month: 'Dec', rate: 45 }
  ],
  Uganda: [
    { month: 'Jan', rate: 30 }, { month: 'Feb', rate: 29 }, { month: 'Mar', rate: 29 },
    { month: 'Apr', rate: 28 }, { month: 'May', rate: 28 }, { month: 'Jun', rate: 29 },
    { month: 'Jul', rate: 28 }, { month: 'Aug', rate: 27 }, { month: 'Sep', rate: 28 },
    { month: 'Oct', rate: 28 }, { month: 'Nov', rate: 28 }, { month: 'Dec', rate: 28 }
  ],
  Nigeria: [
    { month: 'Jan', rate: 52 }, { month: 'Feb', rate: 54 }, { month: 'Mar', rate: 55 },
    { month: 'Apr', rate: 58 }, { month: 'May', rate: 59 }, { month: 'Jun', rate: 61 },
    { month: 'Jul', rate: 62 }, { month: 'Aug', rate: 63 }, { month: 'Sep', rate: 64 },
    { month: 'Oct', rate: 65 }, { month: 'Nov', rate: 66 }, { month: 'Dec', rate: 67 }
  ],
  Rwanda: [
    { month: 'Jan', rate: 45 }, { month: 'Feb', rate: 44 }, { month: 'Mar', rate: 43 },
    { month: 'Apr', rate: 42 }, { month: 'May', rate: 42 }, { month: 'Jun', rate: 41 },
    { month: 'Jul', rate: 40 }, { month: 'Aug', rate: 40 }, { month: 'Sep', rate: 39 },
    { month: 'Oct', rate: 39 }, { month: 'Nov', rate: 38 }, { month: 'Dec', rate: 38 }
  ],
  "South Africa": [
    { month: 'Jan', rate: 33 }, { month: 'Feb', rate: 32 }, { month: 'Mar', rate: 32 },
    { month: 'Apr', rate: 31 }, { month: 'May', rate: 31 }, { month: 'Jun', rate: 32 },
    { month: 'Jul', rate: 31 }, { month: 'Aug', rate: 31 }, { month: 'Sep', rate: 31 },
    { month: 'Oct', rate: 31 }, { month: 'Nov', rate: 31 }, { month: 'Dec', rate: 31 }
  ]
};

const riskColors = {
  low: '#979797',
  moderate: '#FFFFFF',
  high: '#FFFFFF'
};

const riskLabels = {
  low: 'Low Risk',
  moderate: 'Moderate Risk',
  high: 'High Risk'
};

// Custom chart tooltip
const ChartTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="chart-tooltip-custom">
        <span className="chart-tooltip-label">{label}</span>
        <span className="chart-tooltip-value">{payload[0].value}% resistance</span>
      </div>
    );
  }
  return null;
};

// Animated Microbe component that travels along the pipeline
const TravelingMicrobe = ({ fromStage, toStage, delay = 0, isActive }) => {
  if (!isActive) return null;

  return (
    <motion.div
      className="traveling-microbe"
      initial={{ 
        opacity: 0, 
        scale: 0,
        x: '-10px'
      }}
      animate={{ 
        opacity: [0, 1, 1, 1, 0],
        scale: [0, 1, 1, 1, 0.8],
        x: ['-10px', 'calc(100% + 10px)']
      }}
      transition={{
        duration: 2.5,
        delay,
        ease: [0.4, 0, 0.2, 1],
        times: [0, 0.1, 0.5, 0.9, 1],
        repeat: isActive ? Infinity : 0,
        repeatDelay: 0.5
      }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 100 100"
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
  );
};

// Pipeline node component
const PipelineNode = ({ label, icon, isActive, stats }) => (
  <motion.div 
    className={`pipeline-node ${isActive ? 'active' : ''}`}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
  >
    <div className="node-icon">{icon}</div>
    <div className="node-label">{label}</div>
    {isActive && stats && (
      <motion.div 
        className="node-stats"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {stats}
      </motion.div>
    )}
  </motion.div>
);

// Africa map with interactive hotspots + click for chart
const AfricaMap = ({ activeScene, onCountryClick, selectedCountry }) => {
  const [hoveredSpot, setHoveredSpot] = useState(null);

  const hotspots = [
    { 
      id: 1, x: 65, y: 35, label: "Kenya", risk: "moderate", delay: 0,
      data: {
        resistanceRate: "45%", trend: "increasing", trendIcon: "\u2191",
        mainPathogen: "E. coli", affectedAntibiotics: ["Ciprofloxacin", "Ampicillin"],
        facilities: 12, alerts: 2, lastUpdate: "2 hours ago"
      }
    },
    { 
      id: 2, x: 55, y: 42, label: "Uganda", risk: "low", delay: 0.2,
      data: {
        resistanceRate: "28%", trend: "stable", trendIcon: "\u2192",
        mainPathogen: "S. aureus", affectedAntibiotics: ["Methicillin"],
        facilities: 8, alerts: 0, lastUpdate: "4 hours ago"
      }
    },
    { 
      id: 3, x: 35, y: 30, label: "Nigeria", risk: "high", delay: 0.4,
      data: {
        resistanceRate: "67%", trend: "critical", trendIcon: "\u2191\u2191",
        mainPathogen: "K. pneumoniae", affectedAntibiotics: ["Carbapenems", "Cephalosporins", "Fluoroquinolones"],
        facilities: 18, alerts: 5, lastUpdate: "30 min ago"
      }
    },
    { 
      id: 4, x: 50, y: 55, label: "Rwanda", risk: "moderate", delay: 0.6,
      data: {
        resistanceRate: "38%", trend: "decreasing", trendIcon: "\u2193",
        mainPathogen: "P. aeruginosa", affectedAntibiotics: ["Gentamicin", "Amikacin"],
        facilities: 7, alerts: 1, lastUpdate: "1 hour ago"
      }
    },
    { 
      id: 5, x: 55, y: 75, label: "South Africa", risk: "low", delay: 0.8,
      data: {
        resistanceRate: "31%", trend: "stable", trendIcon: "\u2192",
        mainPathogen: "A. baumannii", affectedAntibiotics: ["Colistin"],
        facilities: 15, alerts: 1, lastUpdate: "3 hours ago"
      }
    },
  ];

  return (
    <div className="africa-map">
      <svg viewBox="0 0 100 100" className="map-svg">
        <path
          d="M35,5 Q50,3 65,8 Q80,15 82,35 Q85,55 75,75 Q65,90 50,95 Q35,92 25,80 Q15,65 18,45 Q20,25 35,5"
          fill="none" stroke="#5EC4D5" strokeWidth="0.5" opacity="0.3"
        />
        {[20, 40, 60, 80].map(y => (
          <line key={`h${y}`} x1="10" y1={y} x2="90" y2={y} stroke="#5EC4D5" strokeWidth="0.1" opacity="0.2" />
        ))}
        {[20, 40, 60, 80].map(x => (
          <line key={`v${x}`} x1={x} y1="10" x2={x} y2="90" stroke="#5EC4D5" strokeWidth="0.1" opacity="0.2" />
        ))}
      </svg>

      {activeScene >= 4 && hotspots.map((spot) => (
        <motion.div
          key={spot.id}
          className={`map-hotspot ${hoveredSpot === spot.id ? 'hovered' : ''} ${selectedCountry === spot.label ? 'selected' : ''}`}
          style={{ 
            left: `${spot.x}%`, top: `${spot.y}%`,
            '--risk-color': riskColors[spot.risk]
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: spot.delay, duration: 0.3, ease: "easeOut" }}
          onMouseEnter={() => setHoveredSpot(spot.id)}
          onMouseLeave={() => setHoveredSpot(null)}
          onClick={() => onCountryClick(spot.label)}
          data-testid={`hotspot-${spot.label.toLowerCase().replace(' ', '-')}`}
        >
          <div className="hotspot-pulse" />
          <div className="hotspot-core" />
          <span className="hotspot-label">{spot.label}</span>

          <AnimatePresence>
            {hoveredSpot === spot.id && !selectedCountry && (
              <motion.div 
                className="hotspot-tooltip"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <div className="tooltip-header">
                  <span className="tooltip-country">{spot.label}</span>
                  <span className="tooltip-risk" style={{ background: riskColors[spot.risk] }}>
                    {riskLabels[spot.risk]}
                  </span>
                </div>
                <div className="tooltip-stats">
                  <div className="tooltip-stat">
                    <span className="stat-value" style={{ color: riskColors[spot.risk] }}>{spot.data.resistanceRate}</span>
                    <span className="stat-label">Resistance Rate</span>
                  </div>
                  <div className="tooltip-stat">
                    <span className="stat-value">{spot.data.trendIcon} {spot.data.trend}</span>
                    <span className="stat-label">Trend</span>
                  </div>
                </div>
                <div className="tooltip-section">
                  <span className="section-label">Primary Pathogen</span>
                  <span className="section-value pathogen">{spot.data.mainPathogen}</span>
                </div>
                <div className="tooltip-section">
                  <span className="section-label">Affected Antibiotics</span>
                  <div className="antibiotic-tags">
                    {spot.data.affectedAntibiotics.map((ab, i) => (
                      <span key={i} className="antibiotic-tag">{ab}</span>
                    ))}
                  </div>
                </div>
                <div className="tooltip-footer">
                  <div className="footer-stat">
                    <span className="footer-value">{spot.data.facilities}</span>
                    <span className="footer-label">Facilities</span>
                  </div>
                  <div className="footer-stat">
                    <span className="footer-value" style={{ color: spot.data.alerts > 0 ? '#FFFFFF' : '#979797' }}>
                      {spot.data.alerts}
                    </span>
                    <span className="footer-label">Alerts</span>
                  </div>
                  <div className="footer-stat">
                    <span className="footer-value">{spot.data.lastUpdate}</span>
                    <span className="footer-label">Updated</span>
                  </div>
                </div>
                <div className="tooltip-click-hint">Click for trends</div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}

      {activeScene >= 4 && (
        <div className="map-legend">
          <div className="legend-item">
            <span className="legend-dot" style={{ background: '#979797' }} />
            <span>Low</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot" style={{ background: '#FFFFFF' }} />
            <span>Moderate</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot" style={{ background: '#FFFFFF' }} />
            <span>High</span>
          </div>
        </div>
      )}

      {activeScene >= 4 && (
        <motion.p 
          className="map-instruction"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Hover for details \u00B7 Click for trends
        </motion.p>
      )}
    </div>
  );
};

// Time-series chart panel
const TrendChart = ({ country, onClose }) => {
  const data = countryTimeSeries[country];
  const hotspotData = {
    Kenya: { risk: 'moderate', rate: '45%', pathogen: 'E. coli' },
    Uganda: { risk: 'low', rate: '28%', pathogen: 'S. aureus' },
    Nigeria: { risk: 'high', rate: '67%', pathogen: 'K. pneumoniae' },
    Rwanda: { risk: 'moderate', rate: '38%', pathogen: 'P. aeruginosa' },
    "South Africa": { risk: 'low', rate: '31%', pathogen: 'A. baumannii' }
  };
  const info = hotspotData[country];

  return (
    <motion.div 
      className="trend-chart-panel"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      data-testid="trend-chart-panel"
    >
      <div className="trend-chart-header">
        <div>
          <h4>{country}</h4>
          <span className="trend-chart-subtitle">
            12-month resistance trend \u00B7 {info.pathogen}
          </span>
        </div>
        <div className="trend-chart-header-right">
          <span className="trend-chart-badge" style={{ background: riskColors[info.risk] }}>
            {riskLabels[info.risk]}
          </span>
          <button className="trend-chart-close" onClick={onClose} data-testid="trend-chart-close">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>
      <div className="trend-chart-body">
        <ResponsiveContainer width="100%" height={160}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id={`grad-${country}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={riskColors[info.risk]} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={riskColors[info.risk]} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="month" 
              tick={{ fill: '#979797', fontSize: 9 }} 
              axisLine={{ stroke: 'rgba(255,255,255,0.06)' }}
              tickLine={false}
            />
            <YAxis 
              domain={[0, 80]} 
              tick={{ fill: '#979797', fontSize: 9 }} 
              axisLine={{ stroke: 'rgba(255,255,255,0.06)' }}
              tickLine={false}
              width={30}
            />
            <Tooltip content={<ChartTooltip />} />
            <Area
              type="monotone"
              dataKey="rate"
              stroke={riskColors[info.risk]}
              strokeWidth={2}
              fill={`url(#grad-${country})`}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="trend-chart-footer">
        <span>Current: {info.rate}</span>
        <span>Primary: {info.pathogen}</span>
      </div>
    </motion.div>
  );
};

// Neural network visualization
const NeuralNetwork = ({ isActive }) => {
  const nodes = [
    { x: 10, y: 20 }, { x: 10, y: 40 }, { x: 10, y: 60 }, { x: 10, y: 80 },
    { x: 35, y: 25 }, { x: 35, y: 50 }, { x: 35, y: 75 },
    { x: 60, y: 30 }, { x: 60, y: 60 },
    { x: 85, y: 45 }
  ];
  const connections = [
    [0, 4], [0, 5], [1, 4], [1, 5], [1, 6], [2, 5], [2, 6], [3, 5], [3, 6],
    [4, 7], [4, 8], [5, 7], [5, 8], [6, 7], [6, 8],
    [7, 9], [8, 9]
  ];

  return (
    <svg viewBox="0 0 100 100" className="neural-network">
      {connections.map(([from, to], i) => (
        <motion.line key={i}
          x1={nodes[from].x} y1={nodes[from].y} x2={nodes[to].x} y2={nodes[to].y}
          stroke="#5EC4D5" strokeWidth="0.3"
          initial={{ opacity: 0 }}
          animate={{ opacity: isActive ? 0.3 : 0.1 }}
          transition={{ delay: i * 0.03, duration: 0.3, ease: "easeOut" }}
        />
      ))}
      {nodes.map((node, i) => (
        <motion.circle key={i}
          cx={node.x} cy={node.y} r="3"
          fill="#0A0A0A" stroke="#5EC4D5" strokeWidth="0.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.03, duration: 0.3, ease: "easeOut" }}
        />
      ))}
      {isActive && (
        <motion.circle r="2" fill="#5EC4D5"
          initial={{ cx: 10, cy: 40, opacity: 0 }}
          animate={{ 
            cx: [10, 35, 60, 85], 
            cy: [40, 50, 45, 45],
            opacity: [0, 1, 1, 0]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </svg>
  );
};

// Main Pipeline Component
const MedikalPipeline = React.memo(function MedikalPipeline() {
  const [activeScene, setActiveScene] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setActiveScene(prev => {
        if (prev >= 5) {
          // Reset to step 1 after completing all steps
          return 1;
        }
        return prev + 1;
      });
    }, 3000); // 3 seconds per step
    
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleStepClick = (stepId) => {
    setActiveScene(stepId);
    setIsPlaying(false);
  };

  const handlePlay = () => {
    setIsPlaying(true);
    setActiveScene(1);
  };

  return (
    <section className="pipeline-section" data-testid="pipeline-section">
      <div className="pipeline-container">
        <div className="pipeline-header">
          <h2>How Medikal detects resistance patterns</h2>
          <div className="pipeline-controls">
            <button 
              className={`control-btn ${isPlaying ? 'active' : ''}`}
              onClick={handlePlay}
              aria-label="Play animation"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 3l14 9-14 9V3z"/>
              </svg>
            </button>
            <span className="control-label">{activeScene}/5</span>
          </div>
        </div>

        <div className="pipeline-visualization">
          {/* Animated Pipeline Flow */}
          <div className="pipeline-flow">
            {scenes.map((scene, index) => {
              const isActive = activeScene === scene.id;
              const isCompleted = activeScene > scene.id;
              const isUpcoming = activeScene < scene.id;
              
              return (
                <React.Fragment key={scene.id}>
                  <div 
                    className={`pipeline-stage ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''} ${isUpcoming ? 'upcoming' : ''}`}
                    onClick={() => handleStepClick(scene.id)}
                  >
                    <div className="stage-indicator">
                      <div className="stage-number">{scene.id}</div>
                      {isActive && <div className="stage-pulse" />}
                      {isCompleted && (
                        <svg className="stage-check" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20 6L9 17l-5-5"/>
                        </svg>
                      )}
                    </div>
                    <div className="stage-content">
                      <h4>{scene.title}</h4>
                      <p>{scene.text}</p>
                    </div>
                    {isActive && (
                      <div className="stage-progress">
                        <div className="stage-progress-bar" />
                      </div>
                    )}
                  </div>
                  {index < scenes.length - 1 && (
                    <div className="pipeline-connector">
                      <div className={`connector-line ${isCompleted ? 'active' : ''} ${activeScene > scene.id ? 'completed' : ''}`}>
                        {activeScene === scene.id && (
                          <TravelingMicrobe 
                            fromStage={scene.id} 
                            toStage={scene.id + 1}
                            delay={0.3}
                            isActive={true}
                          />
                        )}
                        {activeScene > scene.id && (
                          <>
                            <div className="data-flow" />
                            <TravelingMicrobe 
                              fromStage={scene.id} 
                              toStage={scene.id + 1}
                              delay={0}
                              isActive={true}
                            />
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
});

export default MedikalPipeline;
