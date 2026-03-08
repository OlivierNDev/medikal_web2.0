import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './AMRDashboard.css';

// Country AMR Data
const countriesData = [
  { id: 1, name: "Nigeria", code: "NG", x: 32, y: 28, risk: "high", baseRate: 67, pathogen: "K. pneumoniae", antibiotics: ["Carbapenems", "Cephalosporins"], facilities: 18, region: "West Africa" },
  { id: 2, name: "Kenya", code: "KE", x: 62, y: 38, risk: "moderate", baseRate: 45, pathogen: "E. coli", antibiotics: ["Ciprofloxacin", "Ampicillin"], facilities: 12, region: "East Africa" },
  { id: 3, name: "Uganda", code: "UG", x: 55, y: 35, risk: "low", baseRate: 28, pathogen: "S. aureus", antibiotics: ["Methicillin"], facilities: 8, region: "East Africa" },
  { id: 4, name: "Rwanda", code: "RW", x: 54, y: 42, risk: "moderate", baseRate: 38, pathogen: "P. aeruginosa", antibiotics: ["Gentamicin"], facilities: 7, region: "East Africa" },
  { id: 5, name: "South Africa", code: "ZA", x: 52, y: 78, risk: "low", baseRate: 31, pathogen: "A. baumannii", antibiotics: ["Colistin"], facilities: 15, region: "Southern Africa" },
  { id: 6, name: "Ethiopia", code: "ET", x: 60, y: 25, risk: "moderate", baseRate: 42, pathogen: "Salmonella", antibiotics: ["Fluoroquinolones"], facilities: 10, region: "East Africa" },
  { id: 7, name: "Ghana", code: "GH", x: 25, y: 32, risk: "moderate", baseRate: 39, pathogen: "E. coli", antibiotics: ["Ampicillin", "Cotrimoxazole"], facilities: 9, region: "West Africa" },
  { id: 8, name: "Tanzania", code: "TZ", x: 58, y: 48, risk: "low", baseRate: 33, pathogen: "S. pneumoniae", antibiotics: ["Penicillin"], facilities: 11, region: "East Africa" },
  { id: 9, name: "DRC", code: "CD", x: 45, y: 42, risk: "high", baseRate: 58, pathogen: "K. pneumoniae", antibiotics: ["Carbapenems"], facilities: 6, region: "Central Africa" },
  { id: 10, name: "Egypt", code: "EG", x: 55, y: 8, risk: "moderate", baseRate: 44, pathogen: "A. baumannii", antibiotics: ["Carbapenems", "Colistin"], facilities: 14, region: "North Africa" },
  { id: 11, name: "Morocco", code: "MA", x: 22, y: 5, risk: "low", baseRate: 29, pathogen: "E. coli", antibiotics: ["Cephalosporins"], facilities: 12, region: "North Africa" },
  { id: 12, name: "Senegal", code: "SN", x: 15, y: 22, risk: "low", baseRate: 26, pathogen: "S. aureus", antibiotics: ["Methicillin"], facilities: 7, region: "West Africa" },
];

// Generate historical data for time series
const generateHistoricalData = (baseRate) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map((month, i) => ({
    month,
    rate: Math.max(10, Math.min(90, baseRate + (Math.random() - 0.5) * 20 - (11 - i) * 0.5))
  }));
};

// Risk colors - using only white and gray
const riskColors = { low: '#979797', moderate: '#FFFFFF', high: '#FFFFFF' };
const riskLabels = { low: 'Low Risk', moderate: 'Moderate', high: 'High' };

// Time Series Chart Component
const TimeSeriesChart = ({ data, countryName }) => {
  const maxRate = Math.max(...data.map(d => d.rate));
  const minRate = Math.min(...data.map(d => d.rate));
  const range = maxRate - minRate || 1;

  return (
    <div className="time-series-chart">
      <div className="chart-header">
        <h4>Resistance Trend - {countryName}</h4>
        <span className="chart-period">Last 12 months</span>
      </div>
      <div className="chart-container">
        <svg viewBox="0 0 400 150" className="chart-svg">
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map(y => (
            <line key={y} x1="40" y1={20 + y} x2="390" y2={20 + y} stroke="rgba(151, 151, 151, 0.1)" strokeWidth="0.5" />
          ))}
          
          {/* Y-axis labels */}
          <text x="35" y="25" className="axis-label">{Math.round(maxRate)}%</text>
          <text x="35" y="120" className="axis-label">{Math.round(minRate)}%</text>

          {/* Line path */}
          <motion.path
            d={data.map((d, i) => {
              const x = 40 + (i * 30);
              const y = 120 - ((d.rate - minRate) / range) * 100;
              return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
            }).join(' ')}
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5 }}
          />

          {/* Data points */}
          {data.map((d, i) => {
            const x = 40 + (i * 30);
            const y = 120 - ((d.rate - minRate) / range) * 100;
            return (
              <motion.circle
                key={i}
                cx={x}
                cy={y}
                r="4"
                fill="#1A1A1A"
                stroke="#FFFFFF"
                strokeWidth="2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.1 }}
              />
            );
          })}

          {/* X-axis labels */}
          {data.map((d, i) => (
            <text key={i} x={40 + (i * 30)} y="140" className="axis-label month-label">
              {d.month}
            </text>
          ))}
        </svg>
      </div>
      <div className="chart-footer">
        <div className="trend-indicator">
          <span className="trend-label">Trend:</span>
          <span className={`trend-value ${data[11].rate > data[0].rate ? 'increasing' : 'decreasing'}`}>
            {data[11].rate > data[0].rate ? '↑ Increasing' : '↓ Decreasing'}
          </span>
        </div>
        <div className="change-indicator">
          <span>{Math.abs(data[11].rate - data[0].rate).toFixed(1)}% change YoY</span>
        </div>
      </div>
    </div>
  );
};

// Live Counter Component
const LiveCounter = ({ label, value, suffix = '', color = '#FFFFFF' }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="live-counter">
      <span className="counter-value" style={{ color }}>{displayValue.toLocaleString()}{suffix}</span>
      <span className="counter-label">{label}</span>
    </div>
  );
};

// Main AMR Dashboard Component
const AMRDashboard = React.memo(function AMRDashboard() {
  const [countries, setCountries] = useState(countriesData);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [liveAlerts, setLiveAlerts] = useState(7);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [realtimeData, setRealtimeData] = useState({
    predictions: 12847,
    dataPoints: 1.2,
    accuracy: 96.2
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update resistance rates slightly
      setCountries(prev => prev.map(c => ({
        ...c,
        currentRate: c.baseRate + (Math.random() - 0.5) * 2
      })));

      // Update live metrics
      setRealtimeData(prev => ({
        predictions: prev.predictions + Math.floor(Math.random() * 50),
        dataPoints: +(prev.dataPoints + Math.random() * 0.01).toFixed(2),
        accuracy: +(96 + Math.random() * 0.5).toFixed(1)
      }));

      // Occasionally change alerts
      if (Math.random() > 0.8) {
        setLiveAlerts(prev => Math.max(1, prev + (Math.random() > 0.5 ? 1 : -1)));
      }

      setLastUpdate(new Date());
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleCountryClick = useCallback((country) => {
    setSelectedCountry(selectedCountry?.id === country.id ? null : {
      ...country,
      historicalData: generateHistoricalData(country.baseRate)
    });
  }, [selectedCountry]);

  return (
    <section className="amr-dashboard" data-testid="amr-dashboard">
      <div className="dashboard-container">
        {/* Header */}
        <div className="dashboard-header">
          <div className="header-left">
            <span className="live-badge">
              <span className="live-dot" />
              LIVE
            </span>
            <h2>AMR Intelligence Dashboard</h2>
            <p>Real-time antimicrobial resistance surveillance across Africa</p>
          </div>
          <div className="header-right">
            <div className="last-update">
              <span className="update-label">Last sync</span>
              <span className="update-time">{lastUpdate.toLocaleTimeString()}</span>
            </div>
          </div>
        </div>

        {/* Live Stats Bar */}
        <div className="live-stats-bar">
          <LiveCounter label="Predictions Today" value={realtimeData.predictions} />
          <LiveCounter label="Data Points (M)" value={realtimeData.dataPoints} suffix="M" />
          <LiveCounter label="Model Accuracy" value={realtimeData.accuracy} suffix="%" />
          <LiveCounter label="Active Alerts" value={liveAlerts} color="#FFFFFF" />
          <LiveCounter label="Connected Facilities" value={127} />
          <LiveCounter label="Countries Monitored" value={12} />
        </div>

        {/* Main Content Grid */}
        <div className="dashboard-grid">
          {/* Africa Map */}
          <div className="map-section">
            <div className="section-header">
              <h3>Continental Resistance Map</h3>
              <span className="section-hint">Click a country for detailed analytics</span>
            </div>
            
            <div className="africa-map-container">
              <svg viewBox="0 0 100 100" className="africa-svg">
                {/* Africa outline */}
                <path
                  d="M22,3 Q35,0 55,5 Q75,10 82,25 Q88,45 85,60 Q82,75 70,85 Q55,95 45,95 Q30,93 20,82 Q10,70 12,50 Q14,30 22,15 Q22,8 22,3"
                  fill="rgba(94, 196, 213, 0.03)"
                  stroke="#FFFFFF"
                  strokeWidth="0.3"
                  opacity="0.5"
                />
                
                {/* Grid */}
                {[20, 40, 60, 80].map(v => (
                  <React.Fragment key={v}>
                    <line x1="5" y1={v} x2="95" y2={v} stroke="#FFFFFF" strokeWidth="0.1" opacity="0.1" />
                    <line x1={v} y1="5" x2={v} y2="95" stroke="#FFFFFF" strokeWidth="0.1" opacity="0.1" />
                  </React.Fragment>
                ))}
              </svg>

              {/* Country Hotspots */}
              {countries.map((country) => (
                <motion.div
                  key={country.id}
                  className={`country-hotspot ${hoveredCountry?.id === country.id ? 'hovered' : ''} ${selectedCountry?.id === country.id ? 'selected' : ''}`}
                  style={{
                    left: `${country.x}%`,
                    top: `${country.y}%`,
                    '--risk-color': riskColors[country.risk]
                  }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: country.id * 0.05 }}
                  onClick={() => handleCountryClick(country)}
                  onMouseEnter={() => setHoveredCountry(country)}
                  onMouseLeave={() => setHoveredCountry(null)}
                >
                  <div className="hotspot-ring" />
                  <div className="hotspot-core" />
                  <span className="hotspot-code">{country.code}</span>

                  {/* Hover Tooltip */}
                  <AnimatePresence>
                    {hoveredCountry?.id === country.id && !selectedCountry && (
                      <motion.div
                        className="quick-tooltip"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                      >
                        <strong>{country.name}</strong>
                        <span style={{ color: riskColors[country.risk] }}>
                          {(country.currentRate || country.baseRate).toFixed(1)}% resistance
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}

              {/* Map Legend */}
              <div className="map-legend">
                {Object.entries(riskColors).map(([level, color]) => (
                  <div key={level} className="legend-item">
                    <span className="legend-dot" style={{ background: color }} />
                    <span>{riskLabels[level]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Details Panel */}
          <div className="details-section">
            <AnimatePresence mode="wait">
              {selectedCountry ? (
                <motion.div
                  key={selectedCountry.id}
                  className="country-details"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <div className="details-header">
                    <div className="country-info">
                      <h3>{selectedCountry.name}</h3>
                      <span className="region-tag">{selectedCountry.region}</span>
                    </div>
                    <span className="risk-badge" style={{ background: riskColors[selectedCountry.risk] }}>
                      {riskLabels[selectedCountry.risk]}
                    </span>
                  </div>

                  {/* Key Metrics */}
                  <div className="metrics-row">
                    <div className="metric-card">
                      <span className="metric-value" style={{ color: riskColors[selectedCountry.risk] }}>
                        {selectedCountry.baseRate}%
                      </span>
                      <span className="metric-label">Resistance Rate</span>
                    </div>
                    <div className="metric-card">
                      <span className="metric-value">{selectedCountry.facilities}</span>
                      <span className="metric-label">Facilities</span>
                    </div>
                    <div className="metric-card">
                      <span className="metric-value">{Math.floor(Math.random() * 5)}</span>
                      <span className="metric-label">Active Alerts</span>
                    </div>
                  </div>

                  {/* Pathogen Info */}
                  <div className="info-section">
                    <span className="info-label">Primary Pathogen</span>
                    <span className="pathogen-name">{selectedCountry.pathogen}</span>
                  </div>

                  {/* Antibiotics */}
                  <div className="info-section">
                    <span className="info-label">Affected Antibiotics</span>
                    <div className="antibiotic-list">
                      {selectedCountry.antibiotics.map((ab, i) => (
                        <span key={i} className="antibiotic-chip">{ab}</span>
                      ))}
                    </div>
                  </div>

                  {/* Time Series Chart */}
                  <TimeSeriesChart 
                    data={selectedCountry.historicalData} 
                    countryName={selectedCountry.name}
                  />

                  <button className="close-details" onClick={() => setSelectedCountry(null)}>
                    Close Details
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  className="empty-state"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="empty-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 16v-4M12 8h.01" />
                    </svg>
                  </div>
                  <h4>Select a Country</h4>
                  <p>Click on any country hotspot to view detailed AMR analytics and resistance trends.</p>
                  
                  {/* Quick Stats */}
                  <div className="quick-stats">
                    <div className="quick-stat">
                      <span className="qs-value" style={{ color: '#FFFFFF' }}>3</span>
                      <span className="qs-label">High Risk</span>
                    </div>
                    <div className="quick-stat">
                      <span className="qs-value" style={{ color: '#979797' }}>5</span>
                      <span className="qs-label">Moderate</span>
                    </div>
                    <div className="quick-stat">
                      <span className="qs-value" style={{ color: '#979797' }}>4</span>
                      <span className="qs-label">Low Risk</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Alerts Ticker */}
        <div className="alerts-ticker">
          <span className="ticker-label">LATEST ALERTS</span>
          <div className="ticker-content">
            <motion.div
              className="ticker-scroll"
              animate={{ x: [0, -1500] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
              <span className="alert-item">Nigeria: Carbapenem resistance spike detected in Lagos region</span>
              <span className="alert-item">Kenya: E. coli resistance increasing in Nairobi facilities</span>
              <span className="alert-item">Rwanda: P. aeruginosa levels stabilizing after intervention</span>
              <span className="alert-item">DRC: Critical K. pneumoniae outbreak in Kinshasa</span>
              <span className="alert-item">Ethiopia: New Salmonella resistance pattern identified</span>
              <span className="alert-item">Nigeria: Carbapenem resistance spike detected in Lagos region</span>
              <span className="alert-item">Kenya: E. coli resistance increasing in Nairobi facilities</span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default AMRDashboard;
