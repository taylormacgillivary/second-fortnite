import React from 'react';

const Wall = () => {
  return (
    <svg width="60" height="60" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="woodGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8C6A4F" />
          <stop offset="100%" stopColor="#71543F" />
        </linearGradient>
        <pattern id="woodGrain" patternUnits="userSpaceOnUse" width="20" height="100" patternTransform="rotate(45)">
          <path d="M 0 10 H 20" stroke="#604733" strokeWidth="1" />
          <path d="M 0 30 H 20" stroke="#604733" strokeWidth="1.5" />
          <path d="M 0 55 H 20" stroke="#5C422F" strokeWidth="2" />
          <path d="M 0 80 H 20" stroke="#604733" strokeWidth="1" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="100" height="100" fill="url(#woodGradient)" />
      <rect x="0" y="0" width="100" height="100" fill="url(#woodGrain)" opacity="0.3" />
      <rect x="0" y="0" width="100" height="100" fill="none" stroke="#403022" strokeWidth="4" />
    </svg>
  );
};

export default Wall; 