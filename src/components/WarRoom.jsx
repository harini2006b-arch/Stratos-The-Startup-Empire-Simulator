import React from 'react';
import { ShieldAlert, Zap, Lock, DollarSign } from 'lucide-react';

export default function WarRoom({ startup, onResolveOption }) {
  const activeEvent = startup.activeEvent;
  
  if (!activeEvent) return null;

  // Format currency helpers
  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div style={warRoomLayoutContainer}>
      {/* 1. Header Alarm Title */}
      <div className="glass-card war-room-warning-card" style={warningBannerStyle}>
        <div style={bannerHeaderRow}>
          <ShieldAlert size={36} color="var(--accent-color)" style={{ animation: 'pulse-glow 1.5s infinite' }} />
          <div>
            <span style={alertBadgeStyle}>CRISIS DETECTED - WAR ROOM ACTIVE</span>
            <h2 style={{ margin: 0, fontSize: '1.65rem', color: 'var(--text-primary)' }}>
              {activeEvent.title}
            </h2>
          </div>
        </div>
        <p style={eventDescStyle}>
          {activeEvent.description}
        </p>
      </div>

      {/* 2. Options Grid Title */}
      <div style={optionTitleRowStyle}>
        <h3>Formulate Strategic Response</h3>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Review the cash capital requirements and metric impacts of each response strategy below:
        </span>
      </div>

      {/* 3. Options Grid */}
      <div className="grid-3" style={{ marginTop: '1.25rem' }}>
        {activeEvent.options.map((option, idx) => {
          const isAffordable = startup.cashBalance >= option.cost;
          return (
            <div 
              key={idx}
              className={`war-room-option-card ${!isAffordable ? 'locked-navigation' : ''}`}
              onClick={() => isAffordable && onResolveOption(option)}
              style={optionCardStyle(isAffordable)}
            >
              <div>
                <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Zap size={16} color={isAffordable ? 'var(--accent-color)' : 'var(--text-muted)'} />
                  {option.text}
                </h4>
                <p>{option.impact}</p>
              </div>

              <div className="war-room-option-cost">
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                  <DollarSign size={14} /> 
                  Cost: <strong>{option.cost > 0 ? formatCurrency(option.cost) : 'No Capital Cost'}</strong>
                </span>
                {!isAffordable && (
                  <span style={{ color: 'var(--color-danger)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                    <Lock size={12} /> Insufficient Cash
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. Bottom locked simulation warning */}
      <div style={warningFooterStyle}>
        <span>⚠️ ADVANCING TIME IS LOCKED UNTIL THIS MACRO SHOCK IS RESOLVED</span>
      </div>
    </div>
  );
}

// Inline styles for War Room layout
const warRoomLayoutContainer = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  animation: 'fade-in 0.5s ease-out'
};

const warningBannerStyle = {
  background: 'rgba(239, 68, 68, 0.08)',
  padding: '2rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  marginBottom: '2rem'
};

const bannerHeaderRow = {
  display: 'flex',
  alignItems: 'center',
  gap: '1.25rem'
};

const alertBadgeStyle = {
  fontSize: '0.75rem',
  fontWeight: '800',
  color: 'var(--accent-color)',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  display: 'block',
  marginBottom: '0.25rem'
};

const eventDescStyle = {
  fontSize: '0.95rem',
  color: 'var(--text-primary)',
  lineHeight: '1.6',
  margin: 0
};

const optionTitleRowStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem',
  borderBottom: '1px solid var(--border-color)',
  paddingBottom: '0.75rem'
};

const optionCardStyle = (isAffordable) => ({
  opacity: isAffordable ? 1 : 0.6,
  cursor: isAffordable ? 'pointer' : 'not-allowed',
  pointerEvents: isAffordable ? 'auto' : 'none',
  borderWidth: isAffordable ? '1px' : '1px',
  borderColor: isAffordable ? 'var(--border-color)' : 'rgba(239, 68, 68, 0.15)'
});

const warningFooterStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '3rem',
  padding: '1rem',
  background: 'rgba(239, 68, 68, 0.1)',
  border: '1px dashed var(--accent-color)',
  borderRadius: '8px',
  color: 'var(--accent-color)',
  fontFamily: 'var(--font-heading)',
  fontWeight: '700',
  fontSize: '0.85rem',
  letterSpacing: '0.05em'
};
