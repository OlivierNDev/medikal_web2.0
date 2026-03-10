import React from 'react';
import './MedicalMicrobes.css';

const MedicalMicrobes = ({ count = 3, variant = 'default' }) => {
  const microbes = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 20 + Math.random() * 30,
    delay: Math.random() * 5,
    duration: 8 + Math.random() * 4,
  }));

  return (
    <div className={`medical-microbes medical-microbes-${variant}`} aria-hidden="true">
      {microbes.map((microbe) => (
        <svg
          key={microbe.id}
          className="microbe-svg"
          style={{
            left: `${microbe.x}%`,
            top: `${microbe.y}%`,
            width: `${microbe.size}px`,
            height: `${microbe.size}px`,
            animationDelay: `${microbe.delay}s`,
            animationDuration: `${microbe.duration}s`,
          }}
          viewBox="0 0 100 100"
        >
          {/* Technical microbe design - bacterial cell structure */}
          <circle
            cx="50"
            cy="50"
            r="35"
            fill="none"
            stroke="#5EC4D5"
            strokeWidth="1.5"
            opacity="0.15"
          />
          <circle
            cx="50"
            cy="50"
            r="25"
            fill="none"
            stroke="#5EC4D5"
            strokeWidth="1"
            opacity="0.2"
          />
          <circle
            cx="50"
            cy="50"
            r="15"
            fill="none"
            stroke="#5EC4D5"
            strokeWidth="0.5"
            opacity="0.25"
          />
          {/* Flagella - technical representation */}
          <path
            d="M 50 50 L 30 30 M 50 50 L 70 30 M 50 50 L 30 70 M 50 50 L 70 70"
            stroke="#5EC4D5"
            strokeWidth="0.8"
            opacity="0.2"
            strokeLinecap="round"
          />
          {/* Nucleoid region */}
          <ellipse
            cx="50"
            cy="50"
            rx="8"
            ry="12"
            fill="#5EC4D5"
            opacity="0.1"
          />
        </svg>
      ))}
    </div>
  );
};

export default MedicalMicrobes;
