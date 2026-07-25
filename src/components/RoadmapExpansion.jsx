import React from 'react';
import { 
  MapPin, 
  Map, 
  CheckCircle2, 
  Zap, 
  Lock, 
  Unlock, 
  Calendar, 
  DollarSign 
} from 'lucide-react';

export default function RoadmapExpansion({ startup, setStartup }) {
  // Format currency helpers
  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };

  // Accelerate Milestone Development manually (pay R&D speed up fee)
  const handleBoostMilestone = (milestoneId) => {
    const milestone = startup.roadmap.find(m => m.id === milestoneId);
    if (!milestone) return;

    // Cost to boost: 20% of milestone cost
    const boostCost = Math.floor(milestone.cost * 0.15);
    if (startup.cashBalance < boostCost) {
      alert("Insufficient cash reserves to boost development!");
      return;
    }

    setStartup(prev => {
      const updatedRoadmap = prev.roadmap.map(m => {
        if (m.id === milestoneId) {
          const newProgress = Math.min(100, m.progress + 25);
          return {
            ...m,
            progress: newProgress,
            status: newProgress === 100 ? 'completed' : m.status
          };
        }
        return m;
      });

      // Automatically kick off next planned milestone if the current one completes
      const hasInProgress = updatedRoadmap.some(m => m.status === 'in-progress');
      if (!hasInProgress) {
        const nextPlannedIndex = updatedRoadmap.findIndex(m => m.status === 'planned');
        if (nextPlannedIndex !== -1) {
          updatedRoadmap[nextPlannedIndex].status = 'in-progress';
        }
      }

      return {
        ...prev,
        cashBalance: prev.cashBalance - boostCost,
        roadmap: updatedRoadmap
      };
    });
  };

  // Unlock Expansion Market
  const handleUnlockMarket = (marketId, unlockCost) => {
    if (startup.cashBalance < unlockCost) {
      alert("Insufficient cash reserves to fund regional expansion!");
      return;
    }

    setStartup(prev => {
      const updatedMarkets = prev.expansionMarkets.map(m => {
        if (m.id === marketId) {
          return { ...m, status: 'unlocked' };
        }
        return m;
      });

      return {
        ...prev,
        cashBalance: prev.cashBalance - unlockCost,
        expansionMarkets: updatedMarkets
      };
    });
  };

  return (
    <div style={containerStyle}>
      <div className="grid-3" style={{ gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        {/* 1. Roadmap Timeline Panel */}
        <div className="glass-card" style={panelStyle}>
          <div style={panelHeaderStyle}>
            <Calendar size={20} color="var(--accent-color)" />
            <h3>Product Roadmap Milestones</h3>
          </div>
          <p style={panelDescStyle}>
            Product milestones are engineered over time by R&D spending and developer headcounts. You can accelerate milestones by funding dedicated development boosts.
          </p>

          <div className="timeline" style={{ marginTop: '2rem' }}>
            {startup.roadmap.map(milestone => (
              <div 
                key={milestone.id} 
                className={`timeline-item ${milestone.status}`}
              >
                <div className="timeline-dot" />
                <div className="timeline-content">
                  <div style={milestoneHeaderStyle}>
                    <div style={milestoneTitleBlockStyle}>
                      <span style={stageBadgeStyle(milestone.stage)}>{milestone.stage}</span>
                      <h4 style={{ margin: 0, fontSize: '1rem' }}>{milestone.name}</h4>
                    </div>
                    {milestone.status === 'completed' ? (
                      <span style={statusBadgeStyle('completed')}>
                        <CheckCircle2 size={12} /> Completed
                      </span>
                    ) : milestone.status === 'in-progress' ? (
                      <span style={statusBadgeStyle('in-progress')}>
                        <Zap size={12} /> Dev Active
                      </span>
                    ) : (
                      <span style={statusBadgeStyle('planned')}>Planned</span>
                    )}
                  </div>

                  <p style={milestoneDescStyle}>{milestone.desc}</p>
                  
                  {/* Progress Indicator */}
                  {(milestone.status === 'in-progress' || milestone.status === 'completed') && (
                    <div style={{ marginTop: '0.75rem' }}>
                      <div style={progressLabelStyle}>
                        <span>Development Progress</span>
                        <span>{milestone.progress}%</span>
                      </div>
                      <div style={progressBarContainerStyle}>
                        <div style={{ 
                          ...progressBarFillStyle, 
                          width: `${milestone.progress}%`,
                          backgroundColor: milestone.status === 'completed' ? 'var(--color-success)' : 'var(--accent-color)'
                        }} />
                      </div>
                    </div>
                  )}

                  {/* Manual Boost controls */}
                  {milestone.status === 'in-progress' && (
                    <div style={boostRowStyle}>
                      <div style={boostInfoStyle}>
                        <span>Accelerate development (+25%):</span>
                        <strong>{formatCurrency(milestone.cost * 0.15)}</strong>
                      </div>
                      <button 
                        className="btn btn-success" 
                        onClick={() => handleBoostMilestone(milestone.id)}
                        style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                      >
                        <Zap size={12} /> Inject Funds
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Expansion Markets Panel */}
        <div className="glass-card" style={panelStyle}>
          <div style={panelHeaderStyle}>
            <Map size={20} color="var(--accent-color)" />
            <h3>Market Expansion</h3>
          </div>
          <p style={panelDescStyle}>
            Scale operations globally. Unlocking overseas regions boosts active customer limits and increases valuation multiples.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
            {startup.expansionMarkets.map(market => {
              const isUnlocked = market.status === 'unlocked';
              return (
                <div key={market.id} className="glass-card" style={marketCardStyle(isUnlocked)}>
                  <div style={marketHeaderRowStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <MapPin size={18} color={isUnlocked ? 'var(--color-success)' : 'var(--text-muted)'} />
                      <span style={{ fontWeight: '700' }}>{market.name}</span>
                    </div>
                    {isUnlocked ? (
                      <span className="market-badge unlocked">
                        <Unlock size={10} style={{ marginRight: '3px' }} /> Active
                      </span>
                    ) : (
                      <span className="market-badge locked">
                        <Lock size={10} style={{ marginRight: '3px' }} /> Locked
                      </span>
                    )}
                  </div>

                  <div style={marketMetaGridStyle}>
                    <div>
                      <span style={marketMetaLabelStyle}>Audience Pool</span>
                      <strong style={marketMetaValStyle}>+{market.potUsers.toLocaleString()}</strong>
                    </div>
                    <div>
                      <span style={marketMetaLabelStyle}>ARR Multiplier</span>
                      <strong style={marketMetaValStyle}>x{market.revenueMultiplier.toFixed(1)}</strong>
                    </div>
                  </div>

                  {!isUnlocked && (
                    <div style={unlockRowStyle}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Expansion Cost:</span>
                      <button 
                        className="btn btn-primary" 
                        onClick={() => handleUnlockMarket(market.id, market.cost)}
                        style={{ padding: '0.45rem 0.9rem', fontSize: '0.75rem' }}
                      >
                        Unlock for {formatCurrency(market.cost)}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

const containerStyle = {
  display: 'flex',
  flexDirection: 'column'
};

const panelStyle = {
  display: 'flex',
  flexDirection: 'column'
};

const panelHeaderStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  marginBottom: '0.5rem'
};

const panelDescStyle = {
  fontSize: '0.85rem',
  color: 'var(--text-muted)',
  lineHeight: '1.5'
};

const milestoneHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '0.5rem'
};

const milestoneTitleBlockStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem'
};

const stageBadgeStyle = (stage) => {
  const colors = {
    'MVP': '#3b82f6',
    'Beta': '#8b5cf6',
    'Launch': '#ec4899',
    'Expansion': '#eab308',
    'Scale': '#10b981'
  };
  return {
    fontSize: '0.7rem',
    fontWeight: 'bold',
    padding: '0.15rem 0.5rem',
    borderRadius: '4px',
    backgroundColor: colors[stage] || 'var(--accent-color)',
    color: '#fff'
  };
};

const statusBadgeStyle = (status) => {
  const isCompleted = status === 'completed';
  const isInProgress = status === 'in-progress';
  return {
    fontSize: '0.75rem',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '0.2rem',
    color: isCompleted ? 'var(--color-success)' : isInProgress ? 'var(--accent-color)' : 'var(--text-muted)'
  };
};

const milestoneDescStyle = {
  fontSize: '0.8rem',
  color: 'var(--text-muted)',
  lineHeight: '1.4'
};

const progressLabelStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '0.75rem',
  color: 'var(--text-muted)',
  marginBottom: '0.25rem'
};

const progressBarContainerStyle = {
  width: '100%',
  height: '6px',
  borderRadius: '3px',
  background: 'rgba(255,255,255,0.05)',
  overflow: 'hidden'
};

const progressBarFillStyle = {
  height: '100%',
  borderRadius: '3px',
  transition: 'width 0.4s ease'
};

const boostRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '1rem',
  paddingTop: '0.85rem',
  borderTop: '1px dashed rgba(255,255,255,0.05)'
};

const boostInfoStyle = {
  display: 'flex',
  flexDirection: 'column',
  fontSize: '0.75rem'
};

const marketCardStyle = (unlocked) => ({
  background: unlocked ? 'rgba(16, 185, 129, 0.02)' : 'rgba(255,255,255,0.01)',
  borderColor: unlocked ? 'rgba(16, 185, 129, 0.2)' : 'var(--border-color)',
  padding: '1.25rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.85rem'
});

const marketHeaderRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};

const marketMetaGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '1rem',
  padding: '0.75rem',
  background: 'rgba(0,0,0,0.15)',
  borderRadius: '8px'
};

const marketMetaLabelStyle = {
  fontSize: '0.7rem',
  color: 'var(--text-muted)',
  display: 'block'
};

const marketMetaValStyle = {
  fontFamily: 'var(--font-heading)',
  fontSize: '0.95rem',
  color: 'var(--text-primary)'
};

const unlockRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '0.25rem',
  borderTop: '1px solid rgba(255,255,255,0.05)',
  paddingTop: '0.75rem'
};
