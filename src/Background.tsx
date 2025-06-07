import React from 'react';

const Background = () => {
  return (
    <svg width="800" height="600" viewBox="0 0 800 600" preserveAspectRatio="none" style={{ position: 'absolute', top: 0, left: 0, zIndex: -1 }}>
      <defs>
        <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#0c141f' }} />
          <stop offset="60%" style={{ stopColor: '#2c3e50' }} />
          <stop offset="100%" style={{ stopColor: '#34495e' }} />
        </linearGradient>
        <linearGradient id="buildingGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#2d3436' }} />
          <stop offset="100%" style={{ stopColor: '#1d2123' }} />
        </linearGradient>
      </defs>

      {/* Sky */}
      <rect x="0" y="0" width="800" height="600" fill="url(#skyGradient)" />

      {/* Moon */}
      <circle cx="700" cy="100" r="40" fill="#f1c40f" opacity="0.4" />

      {/* Distant Buildings */}
      <path d="M 0 450 L 50 400 L 100 460 L 150 420 L 200 480 L 250 440 L 300 500 L 350 450 L 400 490 L 450 430 L 500 470 L 550 410 L 600 480 L 650 420 L 700 490 L 750 440 L 800 510 L 800 600 L 0 600 Z" fill="rgba(0,0,0,0.2)" />
      
      {/* Ruined Cityscape */}
      <g fill="url(#buildingGradient)" stroke="#111" strokeWidth="0.5">
        <path d="M 0 550 L 0 400 L 40 400 L 40 350 L 80 350 L 80 550 Z" />
        <path d="M 60 550 L 60 420 L 70 420 L 75 380 L 90 380 L 100 420 L 120 420 L 120 550 Z" />
        <path d="M 110 550 L 110 300 L 130 300 L 130 250 L 180 250 L 170 350 L 180 550 Z" />
        <rect x="175" y="450" width="80" height="100" />
        <path d="M 250 550 L 250 380 L 280 380 L 290 350 L 330 350 L 330 550 Z" />
        <rect x="350" y="320" width="60" height="230" />
        <rect x="420" y="400" width="40" height="150" />
        <path d="M 480 550 L 480 280 L 500 280 L 510 320 L 500 330 L 540 330 L 540 250 L 580 250 L 580 550 Z" />
        <path d="M 590 550 L 590 450 L 620 450 L 610 420 L 650 420 L 650 550 Z" />
        <rect x="660" y="350" width="50" height="200" />
        <path d="M 720 550 L 720 380 L 750 380 L 760 400 L 800 400 L 800 550 Z" />
      </g>
      
      {/* Ground/Rubble */}
      <rect x="0" y="550" width="800" height="50" fill="#2d3436" />
      <path d="M 0 600 L 0 550 Q 100 540, 200 555 T 400 550 T 600 560 T 800 550 L 800 600 Z" fill="#1d2123" />
    </svg>
  );
};

export default Background; 