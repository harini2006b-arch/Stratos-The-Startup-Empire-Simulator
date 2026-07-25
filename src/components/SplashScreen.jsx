import React, { useState, useEffect } from 'react';

export default function SplashScreen({ fadeOut }) {
  const [logIndex, setLogIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const loadingLogs = [
    "Initializing simulation core database...",
    "Connecting to rival server networks...",
    "Calibrating burn rate calculations...",
    "Assembling board director agents...",
    "Deploying shadow competitor algorithms...",
    "System ready. Stratos simulator unlocked."
  ];

  // Cycle logs every 850ms
  useEffect(() => {
    const logInterval = setInterval(() => {
      setLogIndex(prev => (prev < loadingLogs.length - 1 ? prev + 1 : prev));
    }, 850);
    return () => clearInterval(logInterval);
  }, []);

  // Tick progress bar from 0% to 100% over 5.0 seconds
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => (prev < 100 ? prev + 2 : 100));
    }, 100);
    return () => clearInterval(progressInterval);
  }, []);

  const activeSegments = Math.floor(progress / 10);

  return (
    <div className={`splash-overlay ${fadeOut ? 'fade-out' : ''}`} style={overlayStyle}>
      {/* 1. BRIGHT FUTURISTIC BACKDROP WITH MAP & TECH GRID */}
      <div style={serverRoomContainerStyle}>
        {/* Left Server Racks (Brightened borders & lines) */}
        <div style={serverRackStyle('left')}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={`rack-l-${i}`} style={serverBladeStyle}>
              <div style={rackLEDStyle(i % 3 === 0 ? 'green' : i % 3 === 1 ? 'yellow' : 'red')} />
              <div style={rackLineStyle} />
            </div>
          ))}
        </div>

        {/* Center Grid Map Screen (Brightened radar, grid lines, & world map) */}
        <div style={worldMonitorStyle}>
          {/* Cyan/Purple digital grid overlay */}
          <div style={digitalGridOverlayStyle} />
          {/* Lighter world map silhouette */}
          <div style={worldMapOverlayStyle} />
          {/* Pulsing radar sweep */}
          <div style={radarSweepStyle} />
        </div>

        {/* Right Server Racks (Brightened borders & lines) */}
        <div style={serverRackStyle('right')}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={`rack-r-${i}`} style={serverBladeStyle}>
              <div style={rackLEDStyle(i % 2 === 0 ? 'green' : 'red')} />
              <div style={rackLineStyle} />
            </div>
          ))}
        </div>
      </div>

      {/* 2. FOREGROUND COMMAND CONSOLE DESK PLATE */}
      <div style={consoleForegroundDeskStyle}>
        
        {/* Holographic Projection Area with Lighter Beam Flare */}
        <div style={hologramEmitterContainerStyle}>
          {/* Glowing Cone Beam Flare pointing up to the logo */}
          <div style={hologramBeamStyle} />

          {/* Brighter concentric rotating rings */}
          <div className="hologram-ring-outer" style={outerRingStyle} />
          <div className="hologram-ring-mid" style={midRingStyle} />
          <div className="hologram-ring-inner" style={innerRingStyle} />

          {/* Large Glowing Neon SVG Monogram Emblem */}
          <div style={hologramIconWrapperStyle}>
            <svg width="140" height="140" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <filter id="neon-glow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              
              {/* Skyscraper Building (Bright neon cyan) */}
              <path 
                d="M42 20H58V65H42V20ZM34 38H42V65H34V38ZM58 32H66V65H58V32ZM26 48H34V65H26V48ZM66 42H74V65H66V42Z" 
                stroke="#38bdf8" 
                strokeWidth="2" 
                fill="rgba(56, 189, 248, 0.25)"
                filter="url(#neon-glow)" 
              />
              
              {/* Glowing window grids */}
              <line x1="46" y1="28" x2="54" y2="28" stroke="#bae6fd" strokeWidth="1.5" filter="url(#neon-glow)" />
              <line x1="46" y1="36" x2="54" y2="36" stroke="#bae6fd" strokeWidth="1.5" filter="url(#neon-glow)" />
              <line x1="46" y1="44" x2="54" y2="44" stroke="#bae6fd" strokeWidth="1.5" filter="url(#neon-glow)" />
              <line x1="46" y1="52" x2="54" y2="52" stroke="#bae6fd" strokeWidth="1.5" filter="url(#neon-glow)" />

              {/* Bar Chart base bars (Bright pink) */}
              <rect x="44" y="68" width="5" height="15" fill="#f472b6" filter="url(#neon-glow)" />
              <rect x="52" y="68" width="5" height="20" fill="#f472b6" filter="url(#neon-glow)" />
              <rect x="60" y="68" width="5" height="25" fill="#f472b6" filter="url(#neon-glow)" />
              <rect x="68" y="68" width="5" height="30" fill="#f472b6" filter="url(#neon-glow)" />

              {/* Upward Trending Arrow (Vibrant crimson rose) */}
              <path 
                d="M32 78L48 64L60 68L80 44" 
                stroke="#f43f5e" 
                strokeWidth="3.2" 
                strokeLinecap="round" 
                filter="url(#neon-glow)" 
              />
              <path 
                d="M74 44H80V50" 
                stroke="#f43f5e" 
                strokeWidth="3.2" 
                strokeLinecap="round" 
                filter="url(#neon-glow)" 
              />

              {/* Number 2 (Left side) */}
              <path 
                d="M32 54C32 52 34 50 36 50C38 50 39 51 39 53C39 55 37 57 34 59V61H40" 
                stroke="#e9d5ff" 
                strokeWidth="2.2" 
                strokeLinecap="round"
                filter="url(#neon-glow)" 
              />
              
              {/* Number 4 (Right side) */}
              <path 
                d="M62 50V56H68M66 50V61" 
                stroke="#e9d5ff" 
                strokeWidth="2.2" 
                strokeLinecap="round"
                filter="url(#neon-glow)" 
              />
            </svg>
          </div>
        </div>

        {/* Plaques: Brightened Metallic Fonts */}
        <div style={titleAreaStyle}>
          <h1 style={metallicTitleStyle}>STRATOS EMPIRE</h1>
          <span style={titleSubstyle}>SIMULATOR</span>
        </div>

        {/* Brightened Log Console Bezel Plate */}
        <div style={metallicLogPlateStyle}>
          <div style={logTextStyle}>
            {loadingLogs[logIndex]}
          </div>
        </div>

        {/* Segmented Amethyst Progress Bar (Lighter borders & neon active blocks) */}
        <div style={segmentedBarContainerStyle}>
          {Array.from({ length: 10 }).map((_, index) => {
            const isActive = index < activeSegments;
            return (
              <div 
                key={index} 
                style={segmentedBlockStyle(isActive)} 
              />
            );
          })}
        </div>

        {/* Small Console Details / Screws (Brightened metallic gradients) */}
        <div style={screwStyle('left')} />
        <div style={screwStyle('right')} />
      </div>
      
      {/* 3. Global CSS Injections for rotations and maps */}
      <style>{`
        @keyframes rotate-clockwise {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes rotate-counter {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes radar-sweep-sweep {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .hologram-ring-outer {
          animation: rotate-clockwise 12s linear infinite;
        }
        .hologram-ring-mid {
          animation: rotate-counter 8s linear infinite;
        }
        .hologram-ring-inner {
          animation: rotate-clockwise 4s linear infinite;
        }
      `}</style>
    </div>
  );
}

// BRIGHTENED STYLE DECLARATIONS

const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: '#0c0a12',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  zIndex: 999999,
  overflow: 'hidden'
};

const serverRoomContainerStyle = {
  display: 'flex',
  width: '100%',
  height: '55%',
  background: '#09070e',
  position: 'relative',
  borderBottom: '4px solid #232130'
};

const serverRackStyle = (side) => ({
  width: '18%',
  height: '100%',
  background: '#13111b',
  padding: '1.5rem 1rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  borderLeft: side === 'right' ? '2.5px solid #2b283d' : 'none',
  borderRight: side === 'left' ? '2.5px solid #2b283d' : 'none',
  boxShadow: 'inset 0 0 25px rgba(0,0,0,0.85)'
});

const serverBladeStyle = {
  height: '35px',
  background: '#1d1b28',
  borderRadius: '4px',
  border: '1.5px solid #322f46',
  display: 'flex',
  alignItems: 'center',
  padding: '0 0.75rem',
  gap: '1rem',
  position: 'relative'
};

const rackLEDStyle = (color) => ({
  width: '9px',
  height: '9px',
  borderRadius: '50%',
  backgroundColor: color === 'green' ? '#10b981' : color === 'yellow' ? '#fbbf24' : '#f87171',
  boxShadow: color === 'green' 
    ? '0 0 10px #10b981, 0 0 5px #10b981' 
    : color === 'yellow' 
      ? '0 0 10px #fbbf24, 0 0 5px #fbbf24' 
      : '0 0 10px #f87171, 0 0 5px #f87171',
  animation: 'pulse-glow 1.5s infinite alternate'
});

const rackLineStyle = {
  flex: 1,
  height: '2px',
  background: 'rgba(255, 255, 255, 0.12)',
  borderRadius: '1px'
};

const worldMonitorStyle = {
  flex: 1,
  height: '100%',
  position: 'relative',
  background: 'radial-gradient(circle at center, #1b1333 0%, #07050b 100%)',
  overflow: 'hidden'
};

const digitalGridOverlayStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundImage: `
    linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)
  `,
  backgroundSize: '24px 24px',
  opacity: 0.8,
  pointerEvents: 'none'
};

const worldMapOverlayStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundImage: 'url("https://www.amcharts.com/lib/3/images/assets/maps/worldLow.svg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  opacity: 0.18,
  filter: 'invert(1) sepia(1) saturate(5) hue-rotate(220deg) brightness(1.2)'
};

const radarSweepStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '100%',
  height: '100%',
  marginLeft: '-50%',
  marginTop: '-50%',
  background: 'conic-gradient(from 0deg, rgba(139, 92, 246, 0.28) 0deg, transparent 90deg, transparent 360deg)',
  borderRadius: '50%',
  animation: 'radar-sweep-sweep 6s linear infinite',
  pointerEvents: 'none'
};

// Console Desk Foreground panel
const consoleForegroundDeskStyle = {
  height: '45%',
  width: '100%',
  background: 'linear-gradient(180deg, #242133 0%, #110e17 100%)',
  borderTop: '2.5px solid #413d5a',
  boxShadow: '0 -12px 50px rgba(0,0,0,0.85)',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: '2rem'
};

// Hologram Beam Cone Flare
const hologramBeamStyle = {
  position: 'absolute',
  bottom: '-10px',
  width: '180px',
  height: '240px',
  background: 'linear-gradient(to top, rgba(168, 85, 247, 0.2), rgba(96, 165, 250, 0.05), transparent)',
  clipPath: 'polygon(30% 100%, 70% 100%, 100% 0%, 0% 0%)',
  filter: 'blur(12px)',
  zIndex: 1,
  pointerEvents: 'none'
};

// Holographic circular loops (Brightened & Thickened)
const hologramEmitterContainerStyle = {
  position: 'absolute',
  top: '-165px',
  width: '330px',
  height: '330px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  pointerEvents: 'none'
};

const outerRingStyle = {
  position: 'absolute',
  width: '290px',
  height: '290px',
  borderRadius: '50%',
  border: '2.5px dashed rgba(168, 85, 247, 0.35)',
  boxShadow: '0 0 20px rgba(168, 85, 247, 0.2)'
};

const midRingStyle = {
  position: 'absolute',
  width: '230px',
  height: '230px',
  borderRadius: '50%',
  border: '2.5px solid rgba(96, 165, 250, 0.45)',
  borderTopColor: 'transparent',
  borderBottomColor: 'transparent',
  boxShadow: '0 0 25px rgba(96, 165, 250, 0.25)'
};

const innerRingStyle = {
  position: 'absolute',
  width: '180px',
  height: '180px',
  borderRadius: '50%',
  border: '3px dotted rgba(236, 72, 153, 0.55)',
  boxShadow: '0 0 30px rgba(236, 72, 153, 0.3)'
};

const hologramIconWrapperStyle = {
  position: 'relative',
  zIndex: 10,
  filter: 'drop-shadow(0 0 15px rgba(168, 85, 247, 0.8))',
  animation: 'logo-pulse 2s infinite alternate'
};

// Title elements (Brightened chrome shine)
const titleAreaStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '4rem',
  zIndex: 15
};

const metallicTitleStyle = {
  fontFamily: 'var(--font-heading)',
  fontSize: '2.8rem',
  fontWeight: '900',
  letterSpacing: '0.28em',
  margin: 0,
  color: '#ffffff',
  textShadow: '0 0 12px rgba(168, 85, 247, 0.5), 0 0 25px rgba(168, 85, 247, 0.2), 0 2px 4px rgba(0,0,0,0.6)',
  background: 'linear-gradient(180deg, #ffffff 0%, #cbd5e1 50%, #94a3b8 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent'
};

const titleSubstyle = {
  fontFamily: 'var(--font-heading)',
  fontSize: '0.85rem',
  fontWeight: '800',
  color: 'rgba(255, 255, 255, 0.65)',
  textShadow: '0 0 6px rgba(255,255,255,0.4)',
  letterSpacing: '0.48em',
  marginTop: '0.25rem'
};

// Brightened console plate for logs
const metallicLogPlateStyle = {
  width: '450px',
  height: '38px',
  background: 'linear-gradient(180deg, #181524 0%, #29243a 100%)',
  border: '1.5px solid rgba(255,255,255,0.18)',
  borderRadius: '4px',
  boxShadow: 'inset 0 1.5px 4px rgba(0,0,0,0.8), 0 2px 12px rgba(0,0,0,0.5)',
  marginTop: '1.25rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  zIndex: 15
};

const logTextStyle = {
  fontFamily: 'monospace',
  fontSize: '0.85rem',
  color: '#a7f3d0', // Mint green glow
  fontWeight: 'bold',
  textShadow: '0 0 8px #10b981',
  letterSpacing: '0.05em'
};

// Segmented Progress Bar (10 segments)
const segmentedBarContainerStyle = {
  display: 'flex',
  gap: '6px',
  padding: '6px',
  width: '300px',
  height: '26px',
  background: 'rgba(0, 0, 0, 0.5)',
  border: '2px solid #3c3852',
  borderRadius: '6px',
  boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.6)',
  marginTop: '1.25rem',
  zIndex: 15
};

const segmentedBlockStyle = (isActive) => ({
  flex: 1,
  borderRadius: '2px',
  background: isActive 
    ? 'linear-gradient(135deg, #c084fc 0%, #f472b6 100%)' 
    : 'rgba(255,255,255,0.03)',
  border: `1px solid ${isActive ? '#f472b6' : 'rgba(0,0,0,0.25)'}`,
  boxShadow: isActive 
    ? '0 0 12px #f472b6, 0 0 4px #c084fc, inset 0 1px 1px rgba(255,255,255,0.3)' 
    : 'none',
  transition: 'all 0.15s ease'
});

// Screws for metallic console plate feel (Silver-toned highlights)
const screwStyle = (side) => ({
  position: 'absolute',
  top: '25px',
  left: side === 'left' ? '25px' : 'auto',
  right: side === 'right' ? '25px' : 'auto',
  width: '12px',
  height: '12px',
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #9ca3af 0%, #374151 100%)',
  boxShadow: 'inset 0 1.5px 2px rgba(0,0,0,0.6), 0 1.5px 2px rgba(255,255,255,0.2)',
  border: '1px solid #4b5563',
  zIndex: 15
});
