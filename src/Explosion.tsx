import React from 'react';

const Explosion = () => {
  return (
    <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>
          {`
            @keyframes flash {
              0% { opacity: 1; transform: scale(1); }
              100% { opacity: 0; transform: scale(3); }
            }
            @keyframes fireball {
              0% { transform: scale(0); opacity: 0; }
              10% { opacity: 1; }
              60% { transform: scale(1.2); }
              100% { transform: scale(1.5); opacity: 0; }
            }
            @keyframes smoke-plume {
              0% { transform: scale(0) translateY(0); opacity: 0; }
              20% { opacity: 0.8; }
              100% { transform: scale(1.2) translateY(-15px); opacity: 0; }
            }
            @keyframes debris {
              0% { transform: scale(0); opacity: 1; }
              70% { transform: scale(2.5); opacity: 0.5; }
              100% { opacity: 0; }
            }
          `}
        </style>
        <radialGradient id="grad-fire" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="60%" stopColor="#ffec64" />
          <stop offset="90%" stopColor="#ff6464" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
        <filter id="turbulence">
          <feTurbulence type="fractalNoise" baseFrequency="0.1" numOctaves="3" seed="2"/>
          <feDisplacementMap in="SourceGraphic" scale="8" />
        </filter>
      </defs>

      {/* Debris */}
      <g style={{ animation: 'debris 1.5s ease-out forwards' }}>
          <circle cx="50" cy="50" r="15" fill="#444" opacity="0.4" />
          <circle cx="30" cy="40" r="10" fill="#666" opacity="0.3" />
          <circle cx="70" cy="60" r="12" fill="#555" opacity="0.35" />
      </g>
      
      {/* Smoke Plume */}
      <g filter="url(#turbulence)" opacity="0" style={{ animation: 'smoke-plume 1.5s ease-out forwards 0.2s' }}>
          <circle cx="50" cy="50" r="25" fill="#696969" />
          <circle cx="40" cy="40" r="20" fill="#787878" />
          <circle cx="60" cy="45" r="22" fill="#505050" />
      </g>
      
      {/* Fireball */}
      <circle cx="50" cy="50" r="30" fill="url(#grad-fire)" 
        style={{ animation: 'fireball 1s ease-out forwards 0.1s' }} />

      {/* Initial Flash */}
      <rect x="0" y="0" width="100" height="100" fill="#fff" 
        style={{ animation: 'flash 0.2s ease-out forwards' }} />
    </svg>
  );
};

export default Explosion; 