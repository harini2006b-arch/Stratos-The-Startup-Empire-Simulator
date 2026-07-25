import React from 'react';
import { Sliders, Sparkles, Paintbrush, LayoutGrid, RotateCcw } from 'lucide-react';
import { STARTUP_PRESETS } from '../utils/mockData';

export default function Customizer({ 
  activePreset, 
  handleSelectPreset, 
  activeTheme, 
  handleSelectTheme, 
  visibleWidgets, 
  setVisibleWidgets 
}) {

  // Themes list
  const themes = [
    { id: 'amethyst', name: 'Electric Amethyst', color: '#8b5cf6', desc: 'Vibrant neon violet & deep navy' },
    { id: 'cyberpunk', name: 'Neon Cyberpunk', color: '#06b6d4', desc: 'High-contrast cyan & virtual steel' },
    { id: 'emerald', name: 'Emerald Mint', color: '#10b981', desc: 'Sleek dark forest & electric emerald' }
  ];

  // Presets list
  const presets = Object.values(STARTUP_PRESETS);

  // Toggle Widget Visibility
  const toggleWidget = (widgetKey) => {
    setVisibleWidgets(prev => ({
      ...prev,
      [widgetKey]: !prev[widgetKey]
    }));
  };

  return (
    <div style={containerStyle}>
      <div className="grid-2">
        {/* 1. Theme and Aesthetic Customisation */}
        <div className="glass-card" style={cardStyle}>
          <div style={headerStyle}>
            <Paintbrush size={20} color="var(--accent-color)" />
            <h3>Aesthetics & Theme Swapper</h3>
          </div>
          <p style={descStyle}>
            Switch color schemes to alter the system-wide glow, border accents, and visual gradients.
          </p>

          <div style={themesContainerStyle}>
            {themes.map(t => {
              const isSelected = activeTheme === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => handleSelectTheme(t.id)}
                  style={themeItemStyle(isSelected)}
                >
                  <div style={themeColorIndicatorStyle(t.color)} />
                  <div style={themeMetaStyle}>
                    <strong>{t.name}</strong>
                    <span>{t.desc}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Startup Presets Selector */}
        <div className="glass-card" style={cardStyle}>
          <div style={headerStyle}>
            <Sparkles size={20} color="var(--accent-color)" />
            <h3>Choose Startup Model</h3>
          </div>
          <p style={descStyle}>
            Selecting a model will reload all statistics, employees, funding history, and milestone stages to the preset default.
          </p>

          <div style={presetsContainerStyle}>
            {presets.map(p => {
              const isSelected = activePreset === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => handleSelectPreset(p.id)}
                  style={presetItemStyle(isSelected)}
                >
                  <div style={presetMetaStyle}>
                    <strong>{p.name}</strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginVertical: '0.2rem' }}>
                      {p.tagline}
                    </span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                      Starting Valuation: ${(p.valuation / 1000000).toFixed(1)}M | Revenue: ${p.monthlyRevenue >= 1000 ? `${(p.monthlyRevenue / 1000).toFixed(0)}K` : p.monthlyRevenue}/mo
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Dashboard Widget customizer */}
      <div className="glass-card" style={{ marginTop: '1.5rem' }}>
        <div style={headerStyle}>
          <LayoutGrid size={20} color="var(--accent-color)" />
          <h3>Manage Dashboard KPI Widgets</h3>
        </div>
        <p style={descStyle}>
          Toggle widgets on/off to customize your core monitoring dashboard. Unchecked widgets will be hidden.
        </p>

        <div style={widgetsGridStyle}>
          {Object.keys(visibleWidgets).map(key => {
            const labelMap = {
              valuation: 'Company Valuation',
              revenue: 'Monthly Revenue',
              users: 'Active Users / Partners',
              cash: 'Cash Reserves Balance'
            };
            return (
              <label key={key} style={widgetLabelStyle(visibleWidgets[key])}>
                <input
                  type="checkbox"
                  checked={visibleWidgets[key]}
                  onChange={() => toggleWidget(key)}
                  style={checkboxStyle}
                />
                <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>{labelMap[key] || key}</span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const containerStyle = {
  display: 'flex',
  flexDirection: 'column'
};

const cardStyle = {
  minHeight: '340px',
  display: 'flex',
  flexDirection: 'column'
};

const headerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  marginBottom: '0.5rem'
};

const descStyle = {
  fontSize: '0.85rem',
  color: 'var(--text-muted)',
  lineHeight: '1.5',
  marginBottom: '1.5rem'
};

const themesContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.85rem',
  flex: 1
};

const themeItemStyle = (selected) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '1rem',
  background: selected ? 'rgba(139, 92, 246, 0.08)' : 'rgba(255, 255, 255, 0.02)',
  border: selected ? '1px solid var(--accent-color)' : '1px solid var(--border-color)',
  borderRadius: '12px',
  cursor: 'pointer',
  textAlign: 'left',
  width: '100%',
  transition: 'all 0.2s ease',
  boxShadow: selected ? '0 0 12px rgba(var(--accent-color-rgb), 0.15)' : 'none'
});

const themeColorIndicatorStyle = (color) => ({
  width: '20px',
  height: '20px',
  borderRadius: '50%',
  backgroundColor: color,
  boxShadow: `0 0 10px ${color}`,
  marginRight: '1rem',
  flexShrink: 0
});

const themeMetaStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.15rem'
};

const presetsContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.85rem',
  flex: 1
};

const presetItemStyle = (selected) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '0.9rem 1rem',
  background: selected ? 'rgba(139, 92, 246, 0.08)' : 'rgba(255, 255, 255, 0.02)',
  border: selected ? '1px solid var(--accent-color)' : '1px solid var(--border-color)',
  borderRadius: '12px',
  cursor: 'pointer',
  textAlign: 'left',
  width: '100%',
  transition: 'all 0.2s ease',
  boxShadow: selected ? '0 0 12px rgba(var(--accent-color-rgb), 0.15)' : 'none'
});

const presetMetaStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  textAlign: 'left'
};

const widgetsGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '1rem',
  marginTop: '1rem'
};

const widgetLabelStyle = (active) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
  padding: '1rem',
  background: active ? 'rgba(139, 92, 246, 0.06)' : 'rgba(0,0,0,0.15)',
  border: active ? '1px solid var(--accent-color)' : '1px solid var(--border-color)',
  borderRadius: '10px',
  cursor: 'pointer',
  userSelect: 'none',
  transition: 'all 0.2s ease'
});

const checkboxStyle = {
  accentColor: 'var(--accent-color)',
  width: '16px',
  height: '16px',
  cursor: 'pointer'
};
