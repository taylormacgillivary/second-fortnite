import React from 'react';

const Enemy = () => {
  return (
    <svg width="60" height="40" viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg">
       <defs>
        <linearGradient id="droneBodyGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#555" />
          <stop offset="100%" stopColor="#333" />
        </linearGradient>
        <radialGradient id="droneEyeGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF4500" />
          <stop offset="100%" stopColor="#B22222" />
        </radialGradient>
      </defs>
      
      {/* Main Body */}
      <path d="M 10 20 C 10 0, 90 0, 90 20 L 90 40 C 90 60, 10 60, 10 40 Z" fill="url(#droneBodyGradient)" stroke="#222" strokeWidth="2" />
      
      {/* Propellers */}
      <rect x="0" y="18" width="20" height="4" fill="#444" />
      <rect x="80" y="18" width="20" height="4" fill="#444" />
      <rect x="5" y="15" width="5" height="10" fill="#333" />
      <rect x="85" y="15" width="5" height="10" fill="#333" />
      
      {/* Central Eye */}
      <circle cx="50" cy="30" r="10" fill="url(#droneEyeGradient)" />
      <circle cx="50" cy="30" r="4" fill="#FFD700" />
    </svg>
  );
};

export default Enemy; 