import React from 'react';

const Bomb = () => {
  return (
    <svg width="20" height="40" viewBox="0 0 100 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bombBody" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#2c3e50" />
          <stop offset="100%" stopColor="#34495e" />
        </linearGradient>
        <linearGradient id="bombTip" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#e74c3c" />
          <stop offset="100%" stopColor="#c0392b" />
        </linearGradient>
      </defs>
      {/* Main Body */}
      <rect x="20" y="50" width="60" height="120" rx="20" fill="url(#bombBody)" />
      {/* Fins */}
      <path d="M 50 170 L 20 200 L 30 170 Z" fill="#7f8c8d" />
      <path d="M 50 170 L 80 200 L 70 170 Z" fill="#7f8c8d" />
      {/* Tip */}
      <path d="M 50 0 C 20 0, 20 50, 50 50 C 80 50, 80 0, 50 0 Z" fill="url(#bombTip)" />
    </svg>
  );
};

export default Bomb; 