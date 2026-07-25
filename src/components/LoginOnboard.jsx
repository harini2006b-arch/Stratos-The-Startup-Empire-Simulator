import React, { useState } from 'react';
import Logo from './Logo';
import { User, Briefcase, DollarSign, Users, Award, Shield, Zap } from 'lucide-react';

export default function LoginOnboard({ onLogin }) {
  const [founderName, setFounderName] = useState('Harini');
  const [companyName, setCompanyName] = useState('Stratos Tech');
  const [preset, setPreset] = useState('hypergrowth');
  
  // Custom Starting Metrics (Dynamically changeable on login)
  const [customCash, setCustomCash] = useState(2500000);
  const [customUsers, setCustomUsers] = useState(30000);
  const [customPricing, setCustomPricing] = useState(15);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({
      founderName,
      companyName,
      initialPreset: preset,
      customCash,
      customUsers,
      customPricing
    });
  };

  const handlePresetSelect = (presetType) => {
    setPreset(presetType);
    if (presetType === 'bootstrapped') {
      setCustomCash(120000);
      setCustomUsers(1200);
      setCustomPricing(29);
    } else if (presetType === 'hypergrowth') {
      setCustomCash(2500000);
      setCustomUsers(30000);
      setCustomPricing(15);
    } else if (presetType === 'biotech') {
      setCustomCash(8500000);
      setCustomUsers(8);
      setCustomPricing(0);
    }
  };

  return (
    <div style={loginWrapperStyle}>
      {/* Dynamic Background Glow Effects */}
      <div style={ambientGlowPinkStyle} />
      <div style={ambientGlowPurpleStyle} />

      <div className="glass-card" style={loginCardStyle}>
        {/* Logo and Header */}
        <div style={logoWrapperStyle}>
          <Logo />
          <h1 style={titleStyle}>STRATOS EMPIRE</h1>
          <span style={subtitleStyle}>SIMULATOR INTERFACE PORTAL</span>
        </div>

        <form onSubmit={handleSubmit} style={formStyle}>
          {/* 1. Identity Fields */}
          <div style={inputGroupGridStyle}>
            <div style={inputContainerStyle}>
              <label style={labelStyle}>Founder Name</label>
              <div style={inputWrapperInnerStyle}>
                <User size={16} color="var(--accent-color)" />
                <input 
                  type="text" 
                  value={founderName} 
                  onChange={(e) => setFounderName(e.target.value)} 
                  style={inputStyle}
                  required
                />
              </div>
            </div>

            <div style={inputContainerStyle}>
              <label style={labelStyle}>Company Name</label>
              <div style={inputWrapperInnerStyle}>
                <Briefcase size={16} color="var(--accent-color)" />
                <input 
                  type="text" 
                  value={companyName} 
                  onChange={(e) => setCompanyName(e.target.value)} 
                  style={inputStyle}
                  required
                />
              </div>
            </div>
          </div>

          {/* 2. Startup Presets Selector */}
          <div style={{ marginTop: '1rem' }}>
            <label style={labelStyle}>Select Starting Paradigm</label>
            <div style={presetContainerStyle}>
              <button
                type="button"
                onClick={() => handlePresetSelect('bootstrapped')}
                style={presetCardStyle(preset === 'bootstrapped')}
                className="btn-preset-reset"
              >
                <Award size={18} color={preset === 'bootstrapped' ? 'var(--accent-color)' : 'var(--text-muted)'} />
                <div style={{ textAlign: 'left' }}>
                  <h4 style={{ margin: 0 }}>Bootstrapped</h4>
                  <span style={{ fontSize: '0.65rem' }}>Organically Funded</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handlePresetSelect('hypergrowth')}
                style={presetCardStyle(preset === 'hypergrowth')}
                className="btn-preset-reset"
              >
                <Zap size={18} color={preset === 'hypergrowth' ? 'var(--accent-color)' : 'var(--text-muted)'} />
                <div style={{ textAlign: 'left' }}>
                  <h4 style={{ margin: 0 }}>VC Hyper-growth</h4>
                  <span style={{ fontSize: '0.65rem' }}>Scale to the Moon</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handlePresetSelect('biotech')}
                style={presetCardStyle(preset === 'biotech')}
                className="btn-preset-reset"
              >
                <Shield size={18} color={preset === 'biotech' ? 'var(--accent-color)' : 'var(--text-muted)'} />
                <div style={{ textAlign: 'left' }}>
                  <h4 style={{ margin: 0 }}>DeepTech R&D</h4>
                  <span style={{ fontSize: '0.65rem' }}>Scientific High-risk</span>
                </div>
              </button>
            </div>
          </div>

          {/* 3. Change Starting Data Dynamically */}
          <div style={metricTweakSectionStyle}>
            <span style={sectionHeaderStyle}>Configure Custom Starting Data</span>
            <div style={metricsGridStyle}>
              <div style={inputContainerStyle}>
                <label style={labelStyle}>Starting Capital ($)</label>
                <div style={inputWrapperInnerStyle}>
                  <DollarSign size={14} color="var(--text-muted)" />
                  <input
                    type="number"
                    value={customCash}
                    onChange={(e) => setCustomCash(Number(e.target.value))}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div style={inputContainerStyle}>
                <label style={labelStyle}>Initial Users / Partners</label>
                <div style={inputWrapperInnerStyle}>
                  <Users size={14} color="var(--text-muted)" />
                  <input
                    type="number"
                    value={customUsers}
                    onChange={(e) => setCustomUsers(Number(e.target.value))}
                    style={inputStyle}
                  />
                </div>
              </div>

              {preset !== 'biotech' && (
                <div style={inputContainerStyle}>
                  <label style={labelStyle}>User Pricing ($/mo)</label>
                  <div style={inputWrapperInnerStyle}>
                    <DollarSign size={14} color="var(--text-muted)" />
                    <input
                      type="number"
                      value={customPricing}
                      onChange={(e) => setCustomPricing(Number(e.target.value))}
                      style={inputStyle}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Submit Action */}
          <button type="submit" style={submitButtonStyle}>
            INITIATE SIMULATION CORE
          </button>
        </form>
      </div>
    </div>
  );
}

// Inline Styling declarations for Login layout
const loginWrapperStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: '#040308',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '1.5rem',
  zIndex: 99999,
  overflowY: 'auto'
};

const loginCardStyle = {
  width: '100%',
  maxWidth: '560px',
  background: 'rgba(12, 10, 24, 0.75)',
  border: '1.5px solid rgba(139, 92, 246, 0.25)',
  borderRadius: '24px',
  padding: '2.5rem',
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.7), 0 0 40px rgba(139, 92, 246, 0.15)',
  backdropFilter: 'blur(25px)',
  animation: 'fade-in 0.8s ease-out'
};

const logoWrapperStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  marginBottom: '2rem'
};

const titleStyle = {
  fontFamily: 'var(--font-heading)',
  fontSize: '2rem',
  fontWeight: '800',
  letterSpacing: '0.15em',
  margin: '1rem 0 0.2rem 0',
  background: 'linear-gradient(135deg, #a78bfa 0%, #ec4899 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent'
};

const subtitleStyle = {
  fontSize: '0.75rem',
  fontWeight: '700',
  color: 'var(--text-muted)',
  letterSpacing: '0.2em'
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.25rem'
};

const inputGroupGridStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '1rem'
};

const inputContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.4rem'
};

const labelStyle = {
  fontSize: '0.75rem',
  fontWeight: '700',
  color: 'var(--text-muted)',
  textTransform: 'uppercase',
  letterSpacing: '0.05em'
};

const inputWrapperInnerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '0 0.85rem',
  height: '42px',
  background: 'rgba(255, 255, 255, 0.03)',
  border: '1px solid var(--border-color)',
  borderRadius: '8px',
  transition: 'border-color var(--transition-speed) ease'
};

const inputStyle = {
  background: 'none',
  border: 'none',
  outline: 'none',
  fontSize: '0.85rem',
  color: 'var(--text-primary)',
  width: '100%',
  fontFamily: 'inherit'
};

const presetContainerStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '0.75rem',
  marginTop: '0.25rem'
};

const presetCardStyle = (isActive) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '0.5rem',
  padding: '0.85rem',
  borderRadius: '10px',
  border: `1.5px solid ${isActive ? 'var(--accent-color)' : 'rgba(255, 255, 255, 0.05)'}`,
  background: isActive ? 'rgba(139, 92, 246, 0.08)' : 'rgba(255, 255, 255, 0.02)',
  boxShadow: isActive ? '0 0 15px rgba(139, 92, 246, 0.15)' : 'none',
  cursor: 'pointer',
  transition: 'all 0.2s ease'
});

const metricTweakSectionStyle = {
  borderTop: '1px solid rgba(255, 255, 255, 0.05)',
  paddingTop: '1.25rem',
  marginTop: '0.5rem'
};

const sectionHeaderStyle = {
  fontSize: '0.8rem',
  fontWeight: '700',
  color: 'var(--accent-color)',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  display: 'block',
  marginBottom: '0.85rem'
};

const metricsGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '0.75rem'
};

const submitButtonStyle = {
  height: '46px',
  borderRadius: '8px',
  background: 'var(--accent-gradient)',
  color: '#ffffff',
  fontSize: '0.9rem',
  fontWeight: '800',
  letterSpacing: '0.1em',
  border: 'none',
  cursor: 'pointer',
  boxShadow: '0 8px 30px rgba(139, 92, 246, 0.4)',
  marginTop: '1rem',
  transition: 'all 0.3s ease'
};

// Ambient floating neon light drops
const ambientGlowPinkStyle = {
  position: 'absolute',
  top: '20%',
  left: '30%',
  width: '300px',
  height: '300px',
  background: 'rgba(236, 72, 153, 0.12)',
  filter: 'blur(100px)',
  borderRadius: '50%',
  pointerEvents: 'none'
};

const ambientGlowPurpleStyle = {
  position: 'absolute',
  bottom: '25%',
  right: '25%',
  width: '350px',
  height: '350px',
  background: 'rgba(139, 92, 246, 0.15)',
  filter: 'blur(110px)',
  borderRadius: '50%',
  pointerEvents: 'none'
};
