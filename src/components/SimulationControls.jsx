import React from 'react';
import { Play, SkipForward, TrendingUp, Sparkles } from 'lucide-react';

export default function SimulationControls({ startup, setStartup, onAdvanceMonth, onAdvanceQuarter }) {
  // Format currency helpers
  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };

  const handleMarketingChange = (e) => {
    const val = parseInt(e.target.value) || 0;
    setStartup(prev => ({ ...prev, marketingSpend: val }));
  };

  const handleRDChange = (e) => {
    const val = parseInt(e.target.value) || 0;
    setStartup(prev => ({ ...prev, rdSpend: val }));
  };

  const handlePriceChange = (e) => {
    const val = parseInt(e.target.value) || 0;
    setStartup(prev => ({ ...prev, pricePerUser: val }));
  };

  // Calculate current run rates
  const monthlySalary = startup.employees.reduce((sum, emp) => sum + emp.salary, 0);
  const serverCosts = startup.id === 'biotech' ? startup.activeUsers * 2000 : startup.activeUsers * 0.5;
  const totalBurn = monthlySalary + startup.marketingSpend + startup.rdSpend + serverCosts;
  const netFlow = startup.monthlyRevenue - totalBurn;

  // Max bounds depending on preset
  const maxMarketing = startup.id === 'hypergrowth' ? 500000 : startup.id === 'biotech' ? 100000 : 25000;
  const maxRD = startup.id === 'hypergrowth' ? 500000 : startup.id === 'biotech' ? 1000000 : 50000;

  return (
    <div className="glass-card highlight simulation-banner" style={bannerStyle}>
      {/* Sliders section */}
      <div style={slidersContainerStyle}>
        <div style={sliderWrapperStyle}>
          <div style={labelRowStyle}>
            <span style={labelStyle}>Marketing Budget</span>
            <span style={valueStyle}>{formatCurrency(startup.marketingSpend)}</span>
          </div>
          <input
            type="range"
            className="custom-slider"
            min="0"
            max={maxMarketing}
            step={startup.id === 'hypergrowth' ? 10000 : 1000}
            value={startup.marketingSpend}
            onChange={handleMarketingChange}
          />
        </div>

        <div style={sliderWrapperStyle}>
          <div style={labelRowStyle}>
            <span style={labelStyle}>Product R&D Budget</span>
            <span style={valueStyle}>{formatCurrency(startup.rdSpend)}</span>
          </div>
          <input
            type="range"
            className="custom-slider"
            min="0"
            max={maxRD}
            step={startup.id === 'hypergrowth' ? 10000 : 1000}
            value={startup.rdSpend}
            onChange={handleRDChange}
          />
        </div>

        {startup.id !== 'biotech' && (
          <div style={sliderWrapperStyle}>
            <div style={labelRowStyle}>
              <span style={labelStyle}>Price Per User</span>
              <span style={valueStyle}>${startup.pricePerUser}/mo</span>
            </div>
            <input
              type="range"
              className="custom-slider"
              min="5"
              max="150"
              step="1"
              value={startup.pricePerUser}
              onChange={handlePriceChange}
            />
          </div>
        )}
      </div>

      {/* Simulator Actions */}
      <div style={actionsContainerStyle}>
        <div style={finSummaryStyle}>
          <div style={finItemStyle}>
            <span style={finLabelStyle}>Estimated Burn</span>
            <span style={finValStyle}>{formatCurrency(totalBurn)}</span>
          </div>
          <div style={finItemStyle}>
            <span style={finLabelStyle}>Monthly Net</span>
            <span style={{ 
              ...finValStyle, 
              color: netFlow >= 0 ? 'var(--color-success)' : 'var(--color-danger)'
            }}>
              {netFlow >= 0 ? '+' : ''}{formatCurrency(netFlow)}
            </span>
          </div>
        </div>

        <div style={buttonGroupStyle}>
          <button 
            className="btn btn-secondary" 
            onClick={onAdvanceMonth}
            style={actionButtonStyle}
            disabled={startup.cashBalance <= 0 || !!startup.activeEvent}
          >
            <Play size={14} fill="currentColor" /> Simulate 1M
          </button>
          <button 
            className="btn btn-primary" 
            onClick={onAdvanceQuarter}
            style={actionButtonStyle}
            disabled={startup.cashBalance <= 0 || !!startup.activeEvent}
          >
            <SkipForward size={14} fill="currentColor" /> Simulate Quarter
          </button>
        </div>
      </div>
    </div>
  );
}

const bannerStyle = {
  marginTop: 'auto',
  padding: '1.25rem 2rem',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '2rem',
  borderWidth: '1.5px',
  background: 'rgba(10, 8, 22, 0.9)',
  backdropFilter: 'blur(20px)',
  position: 'sticky',
  bottom: '1.5rem',
  zIndex: 90
};

const slidersContainerStyle = {
  display: 'flex',
  flex: '1 1 500px',
  gap: '2rem',
  flexWrap: 'wrap'
};

const sliderWrapperStyle = {
  display: 'flex',
  flexDirection: 'column',
  flex: '1 1 200px',
  gap: '0.4rem'
};

const labelRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '0.85rem'
};

const labelStyle = {
  color: 'var(--text-muted)',
  fontWeight: '500'
};

const valueStyle = {
  color: 'var(--accent-color)',
  fontFamily: 'var(--font-heading)',
  fontWeight: '700'
};

const actionsContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '2rem',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  flex: '0 1 auto'
};

const finSummaryStyle = {
  display: 'flex',
  gap: '1.5rem'
};

const finItemStyle = {
  display: 'flex',
  flexDirection: 'column'
};

const finLabelStyle = {
  fontSize: '0.75rem',
  color: 'var(--text-muted)',
  textTransform: 'uppercase',
  letterSpacing: '0.05em'
};

const finValStyle = {
  fontFamily: 'var(--font-heading)',
  fontWeight: '700',
  fontSize: '1.15rem'
};

const buttonGroupStyle = {
  display: 'flex',
  gap: '0.75rem'
};

const actionButtonStyle = {
  padding: '0.65rem 1.25rem',
  whiteSpace: 'nowrap'
};
