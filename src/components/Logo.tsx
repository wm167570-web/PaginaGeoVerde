import React from 'react';

export default function Logo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 500 500" 
      className={className} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer Border Ring */}
      <circle cx="250" cy="250" r="245" stroke="#1f2937" strokeWidth="1" opacity="0.1" />

      {/* Top Accent Arc */}
      <path 
        d="M 110 180 A 160 160 0 0 1 390 180" 
        stroke="var(--color-brand-accent)" 
        strokeWidth="3" 
        fill="none"
      />

      {/* Main Text: GEOVERDE (Arched) */}
      <path id="logo-curve" d="M 80 280 A 180 180 0 0 1 420 280" fill="none" />
      <text className="fill-brand-primary font-bold" style={{ fontSize: '82px', fontWeight: 900 }}>
        <textPath href="#logo-curve" startOffset="50%" textAnchor="middle">
          GEOVERDE
        </textPath>
      </text>

      {/* Center Text: VIDA CONSCIENTE */}
      <g className="fill-brand-earth font-bold tracking-widest">
        <text x="250" y="245" textAnchor="middle" style={{ fontSize: '20px' }}>VIDA</text>
        <text x="250" y="270" textAnchor="middle" style={{ fontSize: '20px' }}>CONSCIENTE</text>
      </g>
      
      {/* Decorative Lines near center text */}
      <path d="M 200 220 Q 250 205 300 220" stroke="var(--color-brand-primary)" strokeWidth="2" opacity="0.2" fill="none" />
      <path d="M 215 210 Q 250 200 285 210" stroke="var(--color-brand-primary)" strokeWidth="1" opacity="0.1" fill="none" />

      {/* Side Dots */}
      <circle cx="95" cy="255" r="6" fill="var(--color-brand-accent)" />
      <circle cx="405" cy="255" r="6" fill="var(--color-brand-accent)" />

      {/* Landscape Section */}
      <defs>
        <clipPath id="logo-clip">
          <circle cx="250" cy="500" r="280" />
        </clipPath>
      </defs>

      <g clipPath="url(#logo-clip)" transform="translate(0, -30)">
        {/* Background */}
        <circle cx="250" cy="530" r="280" fill="white" />
        
        {/* Mountains */}
        <path d="M -50 630 Q 120 380 200 500 T 350 350 T 550 550 V 800 H -50 Z" fill="var(--color-brand-secondary)" />
        <path d="M -50 680 Q 100 450 180 550 T 320 400 T 550 600 V 800 H -50 Z" fill="var(--color-brand-primary)" />

        {/* Deep Water */}
        <rect x="0" y="550" width="500" height="300" fill="var(--color-brand-accent)" />
        
        {/* The White Flowing Shape (River/Lake center) */}
        <path d="M 250 480 Q 220 500 280 550 L 500 580 V 800 H 150 L 250 480 Z" fill="white" />
        
        {/* Foreground Peaks */}
        <path d="M -50 600 Q 100 480 180 580 T 350 480 T 550 650 V 800 H -50 Z" fill="var(--color-brand-earth)" />

        {/* Trees */}
        <g fill="var(--color-brand-primary)">
          <path d="M 120 620 L 135 550 L 150 620 Z" />
          <path d="M 150 650 L 165 580 L 180 650 Z" />
          <path d="M 185 680 L 200 610 L 215 680 Z" />
        </g>
      </g>
    </svg>
  );
}

