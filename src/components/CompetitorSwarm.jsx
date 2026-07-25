import React from 'react';
import { ShieldAlert, Zap, TrendingUp, HelpCircle } from 'lucide-react';

export default function CompetitorSwarm({ startup }) {
  const competitor = startup.competitor || {
    name: 'AlphaSync',
    valuation: 9000000,
    monthlyRevenue: 300000,
    activeUsers: 20000,
    rdProgress: 40,
    pricing: 14
  };

  // Helper to format currency
  const formatCurrency = (val) => {
    if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `$${(val / 1000).toFixed(0)}K`;
    return `$${val}`;
  };

  // Calculate comparisons
  const valuationShare = startup.valuation + competitor.valuation > 0 
    ? (startup.valuation / (startup.valuation + competitor.valuation)) * 100 
    : 50;

  const usersShare = startup.activeUsers + competitor.activeUsers > 0 
    ? (startup.activeUsers / (startup.activeUsers + competitor.activeUsers)) * 100 
    : 50;

  return (
    <div className="glass-card" style={containerStyle}>
      <div style={headerStyle}>
        <h3 style={{ margin: 0 }}>Competitor Swarm</h3>
        <span style={badgeStyle}>Rival: {competitor.name}</span>
      </div>

      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.25rem', lineHeight: '1.4' }}>
        A shadow AI rival startup grows dynamically in parallel. Undercutting prices or underfunding R&D will trigger poaching campaigns and pricing wars.
      </p>

      {/* 1. Comparison Bars */}
      <div style={comparisonBlockStyle}>
        {/* Valuation bar */}
        <div style={compRowStyle}>
          <div style={labelRowStyle}>
            <span>Valuation Comparison</span>
            <span><strong>{formatCurrency(startup.valuation)}</strong> vs <strong>{formatCurrency(competitor.valuation)}</strong></span>
          </div>
          <div style={gaugeContainerStyle}>
            <div style={{ ...gaugeFillStyle, width: `${valuationShare}%`, background: 'var(--accent-gradient)' }} />
          </div>
          <div style={legendRowStyle}>
            <span style={{ color: 'var(--accent-color)' }}>You ({valuationShare.toFixed(0)}%)</span>
            <span style={{ color: 'var(--text-muted)' }}>{competitor.name} ({(100 - valuationShare).toFixed(0)}%)</span>
          </div>
        </div>

        {/* Active users bar */}
        <div style={compRowStyle}>
          <div style={labelRowStyle}>
            <span>{startup.id === 'biotech' ? 'Partners' : 'Active Users'}</span>
            <span><strong>{startup.activeUsers.toLocaleString()}</strong> vs <strong>{competitor.activeUsers.toLocaleString()}</strong></span>
          </div>
          <div style={gaugeContainerStyle}>
            <div style={{ ...gaugeFillStyle, width: `${usersShare}%`, background: 'var(--accent-gradient)' }} />
          </div>
          <div style={legendRowStyle}>
            <span style={{ color: 'var(--accent-color)' }}>You ({usersShare.toFixed(0)}%)</span>
            <span style={{ color: 'var(--text-muted)' }}>{competitor.name} ({(100 - usersShare).toFixed(0)}%)</span>
          </div>
        </div>
      </div>

      {/* 2. Rival R&D progress */}
      <div style={competitorStatusCardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
          <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>Rival Product Velocity</span>
          <span style={{ color: 'var(--color-danger)', fontWeight: 'bold' }}>{competitor.rdProgress}% Progress</span>
        </div>
        <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${competitor.rdProgress}%`, background: 'var(--color-danger)', boxShadow: '0 0 8px var(--color-danger)' }} />
        </div>
        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.4rem', display: 'block' }}>
          If rival reaches 100%, they launch a feature sprint and poach 8% of your active users. Increase R&D spend to suppress them.
        </span>
      </div>

      {/* 3. Competitor News Feed */}
      {competitor.newsAlert && (
        <div style={newsAlertStyle}>
          <ShieldAlert size={16} color="var(--color-danger)" style={{ flexShrink: 0, marginTop: '2px' }} />
          <span style={{ fontSize: '0.8rem', color: 'var(--text-primary)' }}>{competitor.newsAlert}</span>
        </div>
      )}
    </div>
  );
}

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  height: '350px'
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '0.5rem'
};

const badgeStyle = {
  fontSize: '0.7rem',
  fontWeight: 'bold',
  padding: '0.15rem 0.5rem',
  borderRadius: '20px',
  background: 'rgba(239, 68, 68, 0.15)',
  color: 'var(--color-danger)',
  border: '1px solid rgba(239, 68, 68, 0.3)'
};

const comparisonBlockStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  marginBottom: '1rem'
};

const compRowStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.35rem'
};

const labelRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '0.8rem',
  color: 'var(--text-muted)'
};

const gaugeContainerStyle = {
  width: '100%',
  height: '8px',
  borderRadius: '4px',
  background: 'rgba(255,255,255,0.05)',
  overflow: 'hidden',
  position: 'relative'
};

const gaugeFillStyle = {
  height: '100%',
  borderRadius: '4px',
  transition: 'width 0.4s ease'
};

const legendRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '0.7rem'
};

const competitorStatusCardStyle = {
  background: 'rgba(0,0,0,0.15)',
  border: '1px solid var(--border-color)',
  borderRadius: '8px',
  padding: '0.75rem',
  marginTop: 'auto'
};

const newsAlertStyle = {
  background: 'rgba(239, 68, 68, 0.1)',
  border: '1px solid rgba(239, 68, 68, 0.25)',
  borderRadius: '8px',
  padding: '0.65rem 0.85rem',
  display: 'flex',
  gap: '0.5rem',
  alignItems: 'flex-start',
  marginTop: '0.75rem',
  animation: 'pulse-glow 2s infinite'
};
