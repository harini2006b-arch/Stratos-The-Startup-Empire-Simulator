import React from 'react';

export default function Logo({ size = 32, className = "" }) {
  // Common paths for S-curve, E-block, and the growth arrow to avoid duplication
  const sPath = "M 18 68 C 11 68, 7 65, 7 59 C 7 52, 19 50, 19 43 C 19 37, 13 35, 8 38";
  const ePath = "M 32 40 H 45 M 32 50 H 41 M 32 60 H 45 M 32 40 V 60";
  const arrowLinePath = "M 8 62 L 24 46 L 40 54 L 72 20";
  const arrowHeadPath = "M 56 20 H 72 V 36";

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 110 85" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`stratos-logo ${className}`}
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
    >
      <defs>
        {/* Neon Glow Filter */}
        <filter id="neonSoftGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" result="blur1" />
          <feGaussianBlur stdDeviation="2.5" result="blur2" />
          <feMerge>
            <feMergeNode in="blur1" />
            <feMergeNode in="blur2" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Purple/Violet Gradient for letters */}
        <linearGradient id="neonPurple" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="50%" stopColor="#c084fc" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>

        {/* Orange/Pink Gradient for arrow */}
        <linearGradient id="neonCyanPink" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#4f46e5" />
          <stop offset="40%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#f472b6" />
        </linearGradient>
      </defs>

      {/* 1. Background Bar Chart (with glow filter and rounded corners) */}
      <g opacity="0.65" filter="url(#neonSoftGlow)">
        {/* Bar 1 */}
        <rect x="25" y="32" width="8" height="36" rx="2" fill="url(#neonPurple)" />
        <rect x="25" y="32" width="8" height="36" rx="2" stroke="#ffffff" strokeWidth="0.75" fill="none" opacity="0.25" />
        
        {/* Bar 2 */}
        <rect x="39" y="22" width="8" height="46" rx="2" fill="url(#neonPurple)" />
        <rect x="39" y="22" width="8" height="46" rx="2" stroke="#ffffff" strokeWidth="0.75" fill="none" opacity="0.25" />
        
        {/* Bar 3 */}
        <rect x="53" y="12" width="8" height="56" rx="2" fill="url(#neonPurple)" />
        <rect x="53" y="12" width="8" height="56" rx="2" stroke="#ffffff" strokeWidth="0.75" fill="none" opacity="0.25" />
      </g>

      {/* 2. LAYERED NEON "S" MONOGRAM (Glow -> Neon -> White Core) */}
      <g>
        {/* Outer Glow */}
        <path d={sPath} stroke="url(#neonPurple)" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" opacity="0.25" filter="url(#neonSoftGlow)" />
        {/* Neon Base */}
        <path d={sPath} stroke="url(#neonPurple)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        {/* White Inner Core Light */}
        <path d={sPath} stroke="#ffffff" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
      </g>

      {/* 3. LAYERED NEON "E" MONOGRAM */}
      <g>
        {/* Outer Glow */}
        <path d={ePath} stroke="url(#neonPurple)" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" opacity="0.25" filter="url(#neonSoftGlow)" />
        {/* Neon Base */}
        <path d={ePath} stroke="url(#neonPurple)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        {/* White Inner Core Light */}
        <path d={ePath} stroke="#ffffff" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
      </g>

      {/* 4. LAYERED NEON RISING ARROW trajectory */}
      <g>
        {/* Outer Glow */}
        <path d={arrowLinePath} stroke="url(#neonCyanPink)" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" opacity="0.28" filter="url(#neonSoftGlow)" />
        <path d={arrowHeadPath} stroke="url(#neonCyanPink)" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" opacity="0.28" filter="url(#neonSoftGlow)" />
        
        {/* Neon Base */}
        <path d={arrowLinePath} stroke="url(#neonCyanPink)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
        <path d={arrowHeadPath} stroke="url(#neonCyanPink)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
        
        {/* White Inner Core Light */}
        <path d={arrowLinePath} stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.95" />
        <path d={arrowHeadPath} stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.95" />
      </g>
    </svg>
  );
}
