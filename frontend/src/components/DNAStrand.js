import React from 'react';
import './DNAStrand.css';

const DNAStrand = ({ position = 'right', opacity = 0.1 }) => {
  return (
    <div 
      className={`dna-strand dna-strand-${position}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 200 800" preserveAspectRatio="xMidYMin meet">
        <defs>
          <linearGradient id="dna-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#5EC4D5" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#5EC4D5" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#5EC4D5" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        
        {/* DNA double helix structure - technical representation */}
        <path
          d="M 100 0 Q 120 100 100 200 Q 80 300 100 400 Q 120 500 100 600 Q 80 700 100 800"
          fill="none"
          stroke="#5EC4D5"
          strokeWidth="1.5"
          opacity="0.15"
          className="dna-helix-1"
        />
        <path
          d="M 100 0 Q 80 100 100 200 Q 120 300 100 400 Q 80 500 100 600 Q 120 700 100 800"
          fill="none"
          stroke="#5EC4D5"
          strokeWidth="1.5"
          opacity="0.15"
          className="dna-helix-2"
        />
        
        {/* Base pairs - technical representation */}
        {Array.from({ length: 20 }, (_, i) => {
          const y = i * 40;
          const offset = i % 2 === 0 ? 20 : -20;
          return (
            <line
              key={i}
              x1={100 + offset}
              y1={y}
              x2={100 - offset}
              y2={y}
              stroke="#5EC4D5"
              strokeWidth="0.8"
              opacity="0.2"
            />
          );
        })}
      </svg>
    </div>
  );
};

export default DNAStrand;
