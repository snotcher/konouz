import React from 'react';

export default function ZelligeBg({ opacity = 0.1, color = '#FAF5EC' }) {
  return (
    <svg
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        opacity: opacity,
      }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="zellige"
          x="0"
          y="0"
          width="50"
          height="50"
          patternUnits="userSpaceOnUse"
        >
          <g stroke={color} strokeWidth="0.6" fill="none">
            {/* 8-Pointed Star (Polygon with inner and outer radii) */}
            <polygon points="25,9 28.8,15.8 36.3,13.7 34.2,21.2 41,25 34.2,28.8 36.3,36.3 28.8,34.2 25,41 21.2,34.2 13.7,36.3 15.8,28.8 9,25 15.8,21.2 13.7,13.7 21.2,15.8" />
            
            {/* Diamonds at intersections */}
            <polygon points="0,-5 5,0 0,5 -5,0" />
            <polygon points="50,-5 55,0 50,5 45,0" />
            <polygon points="0,45 5,50 0,55 -5,50" />
            <polygon points="50,45 55,50 50,55 45,50" />
            
            {/* Diagonal connections from diamonds to star */}
            <line x1="2.5" y1="2.5" x2="13.7" y2="13.7" />
            <line x1="47.5" y1="2.5" x2="36.3" y2="13.7" />
            <line x1="2.5" y1="47.5" x2="13.7" y2="36.3" />
            <line x1="47.5" y1="47.5" x2="36.3" y2="36.3" />
            
            {/* Orthogonal connections to edges */}
            <line x1="25" y1="0" x2="25" y2="9" />
            <line x1="25" y1="50" x2="25" y2="41" />
            <line x1="0" y1="25" x2="9" y2="25" />
            <line x1="50" y1="25" x2="41" y2="25" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#zellige)" />
    </svg>
  );
}
