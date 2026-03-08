import React from 'react';
import { Link } from 'react-router-dom';
import './Research.css';

const researchData = [
  {
    id: 1,
    category: "Epidemiology",
    title: "AMR Prevalence Trends Across Africa",
    description: "Comprehensive analysis of antimicrobial resistance patterns across 54 African countries, tracking resistance rates for key pathogens including E. coli, K. pneumoniae, and S. aureus.",
    metrics: [
      { label: "Countries Analyzed", value: "54" },
      { label: "Data Points", value: "2.4M+" },
      { label: "Time Period", value: "2020-2024" }
    ],
    insights: [
      "E. coli resistance to third-generation cephalosporins increased 23% from 2020-2024",
      "K. pneumoniae carbapenem resistance highest in North and West Africa regions",
      "S. aureus MRSA prevalence varies significantly by country (8-45%)"
    ]
  },
  {
    id: 2,
    category: "Surveillance",
    title: "Real-Time Resistance Pattern Detection",
    description: "AI-powered surveillance system identifying emerging resistance clusters before they become widespread outbreaks, enabling proactive intervention strategies.",
    metrics: [
      { label: "Early Detection Rate", value: "94%" },
      { label: "Alert Response Time", value: "<24h" },
      { label: "Outbreaks Prevented", value: "127" }
    ],
    insights: [
      "Machine learning models detect resistance patterns 6-8 weeks before traditional methods",
      "Geographic clustering analysis reveals transmission pathways across borders",
      "Predictive modeling accuracy: 96.2% for resistance emergence forecasting"
    ]
  },
  {
    id: 3,
    category: "Clinical Impact",
    title: "Treatment Failure Analysis",
    description: "Longitudinal study examining clinical outcomes and treatment failures associated with antimicrobial resistance, correlating resistance patterns with patient outcomes.",
    metrics: [
      { label: "Patient Records", value: "450K+" },
      { label: "Treatment Episodes", value: "1.2M+" },
      { label: "Failure Rate", value: "18.3%" }
    ],
    insights: [
      "Treatment failure rates correlate directly with resistance prevalence (r=0.87)",
      "Time to effective treatment increased by 3.2 days in high-resistance regions",
      "Mortality rates 2.4x higher in patients with resistant infections"
    ]
  },
  {
    id: 4,
    category: "Antibiotic Usage",
    title: "Prescription Pattern Analysis",
    description: "Analysis of antibiotic prescribing patterns across healthcare facilities, identifying opportunities for stewardship and optimization.",
    metrics: [
      { label: "Facilities Monitored", value: "500+" },
      { label: "Prescriptions Analyzed", value: "8.7M+" },
      { label: "Optimization Potential", value: "34%" }
    ],
    insights: [
      "Broad-spectrum antibiotic use 2.1x higher than evidence-based guidelines recommend",
      "Empirical therapy accounts for 78% of prescriptions without culture confirmation",
      "Stewardship interventions show 28% reduction in inappropriate prescribing"
    ]
  }
];

const Research = React.memo(function Research() {
  return (
    <div className="research-page">
      {/* Hero */}
      <section className="research-hero">
        <div className="container">
          <div className="research-hero-content">
            <span className="research-tag">Research & Data</span>
            <h1>AMR Intelligence for the African Continent</h1>
            <p>Comprehensive antimicrobial resistance surveillance, trend analysis, and research insights derived from real-world clinical data across African health systems.</p>
          </div>
        </div>
      </section>

      {/* Research Overview */}
      <section className="research-overview">
        <div className="container">
          <div className="overview-grid">
            <div className="overview-stat">
              <div className="stat-code">R-001</div>
              <div className="stat-value">2.4M+</div>
              <div className="stat-label">Data Points Analyzed</div>
            </div>
            <div className="overview-stat">
              <div className="stat-code">R-002</div>
              <div className="stat-value">54</div>
              <div className="stat-label">Countries Covered</div>
            </div>
            <div className="overview-stat">
              <div className="stat-code">R-003</div>
              <div className="stat-value">96.2%</div>
              <div className="stat-label">Model Accuracy</div>
            </div>
            <div className="overview-stat">
              <div className="stat-code">R-004</div>
              <div className="stat-value">2020-2024</div>
              <div className="stat-label">Time Series Data</div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Studies */}
      <section className="research-studies">
        <div className="container">
          <div className="section-header">
            <h2>Research Studies</h2>
            <p>Deep analysis of AMR trends, patterns, and clinical impact across the African continent.</p>
          </div>
          
          <div className="studies-grid">
            {researchData.map((study, index) => (
              <div key={study.id} className="study-card">
                <div className="study-header">
                  <span className="study-category">{study.category}</span>
                  <span className="study-id">STUDY-{String(study.id).padStart(3, '0')}</span>
                </div>
                <h3>{study.title}</h3>
                <p className="study-description">{study.description}</p>
                
                <div className="study-metrics">
                  {study.metrics.map((metric, i) => (
                    <div key={i} className="metric-item">
                      <span className="metric-value">{metric.value}</span>
                      <span className="metric-label">{metric.label}</span>
                    </div>
                  ))}
                </div>

                <div className="study-insights">
                  <div className="insights-label">Key Findings</div>
                  <ul className="insights-list">
                    {study.insights.map((insight, i) => (
                      <li key={i}>{insight}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Access */}
      <section className="data-access-section">
        <div className="container">
          <div className="data-access-content">
            <div className="data-access-text">
              <span className="section-tag">Data Access</span>
              <h2>Research-Grade AMR Data</h2>
              <p>Access anonymized, aggregated AMR surveillance data for research purposes. Our dataset includes resistance patterns, treatment outcomes, and epidemiological trends across African health systems.</p>
              
              <div className="data-features">
                <div className="data-feature">
                  <span className="feature-code">DF-001</span>
                  <div>
                    <h4>Anonymized Data</h4>
                    <p>HIPAA-compliant, fully anonymized patient data</p>
                  </div>
                </div>
                <div className="data-feature">
                  <span className="feature-code">DF-002</span>
                  <div>
                    <h4>Real-Time Updates</h4>
                    <p>Continuous data collection with monthly updates</p>
                  </div>
                </div>
                <div className="data-feature">
                  <span className="feature-code">DF-003</span>
                  <div>
                    <h4>API Access</h4>
                    <p>Programmatic access for research institutions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Publications */}
      <section className="publications-section">
        <div className="container">
          <div className="section-header">
            <h2>Publications & Reports</h2>
            <p>Research outputs and data-driven insights on AMR in Africa.</p>
          </div>
          
          <div className="publications-list">
            <div className="publication-item">
              <div className="pub-meta">
                <span className="pub-type">Research Paper</span>
                <span className="pub-date">2024</span>
              </div>
              <h3>Machine Learning Models for Early Detection of Antimicrobial Resistance Patterns in Sub-Saharan Africa</h3>
              <p className="pub-authors">Medikal Research Team, Africa CDC, WHO Regional Office</p>
              <div className="pub-stats">
                <span>54 countries</span>
                <span>•</span>
                <span>2.4M data points</span>
                <span>•</span>
                <span>96.2% accuracy</span>
              </div>
            </div>
            
            <div className="publication-item">
              <div className="pub-meta">
                <span className="pub-type">Surveillance Report</span>
                <span className="pub-date">Q4 2024</span>
              </div>
              <h3>Quarterly AMR Surveillance Report: African Continent</h3>
              <p className="pub-authors">Medikal Intelligence Platform</p>
              <div className="pub-stats">
                <span>500+ facilities</span>
                <span>•</span>
                <span>127 alerts generated</span>
                <span>•</span>
                <span>18.3% treatment failure rate</span>
              </div>
            </div>
            
            <div className="publication-item">
              <div className="pub-meta">
                <span className="pub-type">Clinical Study</span>
                <span className="pub-date">2024</span>
              </div>
              <h3>Correlation Between Antibiotic Prescribing Patterns and Resistance Emergence: A Multi-Country Analysis</h3>
              <p className="pub-authors">Medikal Research Team</p>
              <div className="pub-stats">
                <span>8.7M prescriptions</span>
                <span>•</span>
                <span>34% optimization potential</span>
                <span>•</span>
                <span>28% reduction with stewardship</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="research-cta">
        <div className="container">
          <h2>Access Research Data</h2>
          <p>Request access to anonymized AMR surveillance data for your research institution.</p>
          <Link to="/request-demo" className="btn-white">Request Data Access</Link>
        </div>
      </section>
    </div>
  );
});

export default Research;
