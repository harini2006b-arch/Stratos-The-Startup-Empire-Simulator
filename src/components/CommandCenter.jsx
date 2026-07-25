import React, { useState } from 'react';
import { Terminal, Zap, ArrowRight } from 'lucide-react';

export default function CommandCenter({ onExecuteCommand }) {
  const [command, setCommand] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestions = [
    { text: 'pivot to healthcare', desc: 'Enterprise MedTech shift ($499 pricing)' },
    { text: 'cut costs / austerity', desc: 'Lay offs, slashes marketing & R&D spend' },
    { text: 'viral growth mode', desc: 'Doubles marketing, cuts CAC & drops price' },
    { text: 'poach competitor developers', desc: 'Secure Cynthia, elite Architect for $60K' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!command.trim()) return;
    onExecuteCommand(command);
    setCommand('');
    setShowSuggestions(false);
  };

  const handleSelectSuggestion = (text) => {
    onExecuteCommand(text);
    setCommand('');
    setShowSuggestions(false);
  };

  return (
    <div style={wrapperStyle} onBlur={(e) => {
      // delay hiding suggestions so clicks register
      if (!e.currentTarget.contains(e.relatedTarget)) {
        setTimeout(() => setShowSuggestions(false), 200);
      }
    }}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={consoleIconContainerStyle}>
          <Terminal size={16} color="var(--accent-color)" />
        </div>
        
        <input
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          placeholder="⚡ Command Center: Type a pivot prompt (e.g. 'pivot to healthcare')..."
          style={inputStyle}
          className="form-input"
        />

        <button type="submit" style={submitButtonStyle} className="btn-icon-only">
          <ArrowRight size={14} />
        </button>
      </form>

      {/* Suggestions dropdown */}
      {showSuggestions && (
        <div className="glass-card" style={dropdownStyle}>
          <div style={dropdownTitleStyle}>Suggested Prompts</div>
          <div style={listStyle}>
            {suggestions.map((s, idx) => (
              <button
                key={idx}
                type="button"
                onMouseDown={() => handleSelectSuggestion(s.text)}
                style={itemButtonStyle}
                className="btn-preset-reset"
              >
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontWeight: '700', fontSize: '0.85rem', color: 'var(--accent-color)' }}>
                    {s.text}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {s.desc}
                  </span>
                </div>
                <Zap size={12} color="var(--accent-color)" style={{ marginLeft: 'auto' }} />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Styling details for Command bar layout
const wrapperStyle = {
  position: 'relative',
  width: '100%',
  maxWidth: '480px',
  zIndex: 105
};

const formStyle = {
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  width: '100%'
};

const consoleIconContainerStyle = {
  position: 'absolute',
  left: '12px',
  display: 'flex',
  alignItems: 'center',
  pointerEvents: 'none'
};

const inputStyle = {
  paddingLeft: '2.5rem',
  paddingRight: '2.5rem',
  height: '40px',
  background: 'rgba(255, 255, 255, 0.03)',
  border: '1px solid var(--border-color)',
  borderRadius: '8px',
  fontSize: '0.85rem',
  color: 'var(--text-primary)',
  boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)'
};

const submitButtonStyle = {
  position: 'absolute',
  right: '6px',
  top: '6px',
  bottom: '6px',
  width: '28px',
  height: '28px',
  padding: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba(255, 255, 255, 0.03)',
  border: '1px solid var(--border-color)'
};

const dropdownStyle = {
  position: 'absolute',
  top: '48px',
  left: 0,
  right: 0,
  background: 'rgba(10, 8, 22, 0.95)',
  backdropFilter: 'blur(15px)',
  border: '1px solid var(--border-color)',
  borderRadius: '10px',
  padding: '0.75rem',
  boxShadow: '0 10px 30px rgba(0,0,0,0.5), 0 0 15px rgba(var(--accent-color-rgb), 0.15)',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem'
};

const dropdownTitleStyle = {
  fontSize: '0.75rem',
  fontWeight: '700',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  color: 'var(--text-muted)',
  paddingLeft: '0.5rem',
  marginBottom: '0.25rem'
};

const listStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.35rem'
};

const itemButtonStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '0.5rem 0.75rem',
  borderRadius: '6px',
  cursor: 'pointer',
  transition: 'background 0.2s',
  width: '100%',
  textAlign: 'left',
  border: '1px solid transparent'
};
