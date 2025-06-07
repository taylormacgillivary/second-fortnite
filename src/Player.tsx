import React from 'react';

const Player = () => {
  return (
    // For ultimate realism, you can replace this SVG with a Next.js Image component.
    // 1. Find a realistic image of a soldier with a transparent background (PNG).
    // 2. Save it in the `public` folder (e.g., /public/soldier.png).
    // 3. Replace the <svg> below with:
    //    <Image src="/soldier.png" alt="Player" width={50} height={70} />
    // 4. Adjust PLAYER_WIDTH and PLAYER_HEIGHT constants in `src/app/page.tsx`.
    <svg width="50" height="70" viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="helmetGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4A5C3D" />
          <stop offset="100%" stopColor="#3E4C33" />
        </linearGradient>
        <linearGradient id="skinGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E0B599"/>
          <stop offset="100%" stopColor="#C6A085"/>
        </linearGradient>
        <linearGradient id="shirtGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6B5E4A"/>
          <stop offset="100%" stopColor="#5A4E3D"/>
        </linearGradient>
        <linearGradient id="pantsGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5D5D3D"/>
          <stop offset="100%" stopColor="#4C4C33"/>
        </linearGradient>
        <linearGradient id="gunMetalGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#383838" />
          <stop offset="100%" stopColor="#282828" />
        </linearGradient>
        <linearGradient id="gunWoodGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6B4226" />
          <stop offset="100%" stopColor="#5A3820" />
        </linearGradient>
      </defs>

      {/* Legs & Boots */}
      <rect x="50" y="75" width="10" height="35" fill="url(#pantsGradient)" />
      <rect x="38" y="75" width="10" height="35" fill="url(#pantsGradient)" />
      <rect x="50" y="105" width="12" height="10" fill="#2A2A2A" />
      <rect x="38" y="105" width="12" height="10" fill="#2A2A2A" />

      {/* Torso & Vest */}
      <rect x="35" y="40" width="30" height="40" fill="url(#shirtGradient)" />
      <path d="M 40 50 L 60 50 L 58 70 L 42 70 Z" fill="#3D352A" />
      
      {/* Head & Helmet */}
      <circle cx="50" cy="30" r="12" fill="url(#helmetGradient)" />
      <path d="M 38 32 C 40 38, 60 38, 62 32 Z" fill="url(#skinGradient)" />

      {/* Arm */}
      <path d="M 35 45 L 25 55 L 30 75 L 45 65 Z" fill="url(#shirtGradient)" />
      
      {/* Minigun */}
      <g transform="rotate(5, 50, 60) scale(1.2)">
        {/* Main Body */}
        <rect x="5" y="58" width="55" height="12" rx="2" fill="url(#gunMetalGradient)" />
        {/* Barrels */}
        <rect x="0" y="58" width="20" height="2" fill="#111" />
        <rect x="0" y="63" width="20" height="2" fill="#111" />
        <rect x="0" y="68" width="20" height="2" fill="#111" />
        {/* Handle */}
        <path d="M 40 70 L 45 75 L 50 70 Z" fill="#222" />
        {/* Ammo Box */}
        <rect x="25" y="70" width="15" height="10" fill="#3D352A" />
      </g>
    </svg>
  );
};

export default Player; 