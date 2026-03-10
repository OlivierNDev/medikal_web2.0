import React from 'react';
import './BackgroundGrid.css';

const BackgroundGrid = ({ variant = 'default' }) => {
  return (
    <div className={`background-grid background-grid-${variant}`}>
      <div className="grid-pattern"></div>
      <div className="grid-overlay"></div>
      <svg className="grid-svg" aria-hidden="true">
        <defs>
          <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="0.5" fill="#5EC4D5" opacity="0.1" />
          </pattern>
          <pattern id="grid-lines" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#5EC4D5" strokeWidth="0.5" opacity="0.08" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        <rect width="100%" height="100%" fill="url(#grid-lines)" />
      </svg>
    </div>
  );
};

export default BackgroundGrid;
