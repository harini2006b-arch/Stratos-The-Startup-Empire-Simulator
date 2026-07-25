import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingDown, 
  TrendingUp, 
  HelpCircle, 
  Plus, 
  Clock, 
  Percent, 
  ShieldAlert, 
  Briefcase 
} from 'lucide-react';

export default function Financials({ startup, setStartup }) {
  // Local state for VC Funding simulator
  const [fundingAmount, setFundingAmount] = useState(1000000);
  const [investorName, setInvestorName] = useState('Nebula Ventures');
  const [dilution, setDilution] = useState(20);

  // Local state for ROI calculator
  const [calcMarketing, setCalcMarketing] = useState(startup.marketingSpend);
  const [calcRD, setCalcRD] = useState(startup.rdSpend);

  // Financial calculations
  const monthlySalary = startup.employees.reduce((sum, emp) => sum + emp.salary, 0);
  const serverCosts = startup.id === 'biotech' ? startup.activeUsers * 2000 : startup.activeUsers * 0.5;
  const operatingExpenses = startup.marketingSpend + startup.rdSpend + serverCosts;
  const totalBurn = monthlySalary + operatingExpenses;
  const netIncome = startup.monthlyRevenue - totalBurn;

  // Format currency helpers
  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };

  // Raise VC Funding
  const handleRaiseFunding = (e) => {
    e.preventDefault();
    if (fundingAmount <= 0) return;

    // Calculate valuation post dilution
    // valuation = fundingAmount / (dilution / 100)
    const valuationPost = Math.floor(fundingAmount / (dilution / 100));

    const newRound = {
      round: `Series ${String.fromCharCode(65 + startup.fundingRounds.length - 1)}`, // Series A, B, etc.
      amount: fundingAmount,
      valuation: valuationPost,
      date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      investor: investorName,
      dilution: dilution
    };

    setStartup(prev => ({
      ...prev,
      cashBalance: prev.cashBalance + fundingAmount,
      valuation: valuationPost,
      fundingRounds: [...prev.fundingRounds, newRound]
    }));

    // Reset inputs
    setFundingAmount(1000000);
    setInvestorName('Apex Equity');
    setDilution(20);
  };

  // ROI Calculator Calculations
  // Estimated CAC
  const productCount = startup.employees.filter(emp => emp.dept === 'Product').length;
  const actualCac = Math.max(5, startup.cac * (1 - Math.min(0.4, productCount * 0.05)));

  const projectedUsersAcquired = Math.floor(calcMarketing / actualCac);
  const projectedRevenueAdded = projectedUsersAcquired * startup.pricePerUser;
  const projectedROI = calcMarketing > 0 ? ((projectedRevenueAdded / calcMarketing) * 100).toFixed(0) : 0;

  return (
    <div style={containerStyle}>
      {/* 1. Finance Cards */}
      <div className="grid-3">
        <div className="glass-card" style={finCardStyle}>
          <div style={cardHeaderStyle}>
            <DollarSign size={20} color="var(--accent-color)" />
            <span>Monthly Burn Rate</span>
          </div>
          <div style={cardValueStyle}>{formatCurrency(totalBurn)}</div>
          <div style={cardDescStyle}>
            Salary: {formatCurrency(monthlySalary)} | Ops: {formatCurrency(operatingExpenses)}
          </div>
        </div>

        <div className="glass-card" style={finCardStyle}>
          <div style={cardHeaderStyle}>
            {netIncome >= 0 ? <TrendingUp size={20} color="var(--color-success)" /> : <TrendingDown size={20} color="var(--color-danger)" />}
            <span>Net Monthly Income</span>
          </div>
          <div style={{ ...cardValueStyle, color: netIncome >= 0 ? 'var(--color-success)' : 'var(--color-danger)' }}>
            {netIncome >= 0 ? '+' : ''}{formatCurrency(netIncome)}
          </div>
          <div style={cardDescStyle}>
            Revenue: {formatCurrency(startup.monthlyRevenue)} / mo
          </div>
        </div>

        <div className="glass-card highlight" style={finCardStyle}>
          <div style={cardHeaderStyle}>
            <Clock size={20} color="var(--color-warning)" />
            <span>Estimated Runway</span>
          </div>
          <div style={{ ...cardValueStyle, color: 'var(--color-warning)' }}>
            {netIncome >= 0 ? 'Infinite (Profitable)' : `${(startup.cashBalance / Math.abs(netIncome)).toFixed(1)} Months`}
          </div>
          <div style={cardDescStyle}>
            Based on active burn rate and cash reserves
          </div>
        </div>
      </div>

      {/* 2. Funding Rounds & Raise VC Simulator */}
      <div className="grid-2" style={{ marginTop: '1.5rem' }}>
        {/* Funding Rounds list */}
        <div className="glass-card" style={layoutCardStyle}>
          <div style={titleContainerStyle}>
            <Briefcase size={18} color="var(--accent-color)" />
            <h3>Cap Table & Funding History</h3>
          </div>
          <div style={historyListStyle}>
            {startup.fundingRounds.map((round, idx) => (
              <div key={idx} style={historyItemStyle}>
                <div style={roundBadgeStyle}>
                  <strong>{round.round}</strong>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{round.date}</span>
                </div>
                <div style={roundDetailStyle}>
                  <span>Raised <strong>{formatCurrency(round.amount)}</strong></span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Valuation: {formatCurrency(round.valuation)} | Dilution: {round.dilution}%
                  </span>
                </div>
                <div style={{ marginLeft: 'auto', textAlign: 'right', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--accent-color)', fontWeight: 'bold' }}>{round.investor}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Raise Capital Panel */}
        <div className="glass-card" style={layoutCardStyle}>
          <div style={titleContainerStyle}>
            <Plus size={18} color="var(--color-success)" />
            <h3>Simulate Raising Capital</h3>
          </div>
          <form onSubmit={handleRaiseFunding} style={formStyle}>
            <div className="form-group">
              <label>Investor Name</label>
              <input 
                type="text" 
                className="form-input" 
                value={investorName} 
                onChange={(e) => setInvestorName(e.target.value)} 
                required
              />
            </div>

            <div className="grid-2" style={{ gap: '1rem', marginBottom: '0.5rem' }}>
              <div className="form-group">
                <label>Amount to Raise ($)</label>
                <input 
                  type="number" 
                  className="form-input" 
                  value={fundingAmount} 
                  onChange={(e) => setFundingAmount(parseInt(e.target.value) || 0)} 
                  min="10000"
                  required
                />
              </div>
              <div className="form-group">
                <label>Dilution (%)</label>
                <input 
                  type="number" 
                  className="form-input" 
                  value={dilution} 
                  onChange={(e) => setDilution(Math.min(90, Math.max(1, parseInt(e.target.value) || 0)))} 
                  min="1"
                  max="90"
                  required
                />
              </div>
            </div>

            <div style={simulationSummaryStyle}>
              <span>Post-money Valuation:</span>
              <strong>{formatCurrency(fundingAmount / (dilution / 100) || 0)}</strong>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
              Secure Investment Round
            </button>
          </form>
        </div>
      </div>

      {/* 3. Spend Calculator / ROI projections */}
      {startup.id !== 'biotech' && (
        <div className="glass-card" style={{ marginTop: '1.5rem' }}>
          <div style={titleContainerStyle}>
            <Percent size={18} color="var(--accent-color)" />
            <h3>Interactive Spend ROI Projections</h3>
          </div>
          <div className="grid-2" style={{ marginTop: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="custom-slider-container">
                <div className="slider-label-row">
                  <span className="slider-name">Simulate Marketing Spend</span>
                  <span className="slider-value">{formatCurrency(calcMarketing)}</span>
                </div>
                <input
                  type="range"
                  className="custom-slider"
                  min="0"
                  max="500000"
                  step="5000"
                  value={calcMarketing}
                  onChange={(e) => setCalcMarketing(parseInt(e.target.value))}
                />
              </div>

              <div className="custom-slider-container">
                <div className="slider-label-row">
                  <span className="slider-name">Simulate R&D Budget</span>
                  <span className="slider-value">{formatCurrency(calcRD)}</span>
                </div>
                <input
                  type="range"
                  className="custom-slider"
                  min="0"
                  max="500000"
                  step="5000"
                  value={calcRD}
                  onChange={(e) => setCalcRD(parseInt(e.target.value))}
                />
              </div>
            </div>

            <div style={calcResultPanelStyle}>
              <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.75rem' }}>Projected Month-over-Month Effects</h4>
              <div style={resultRowStyle}>
                <span>Estimated CAC:</span>
                <strong>${actualCac.toFixed(2)} / user</strong>
              </div>
              <div style={resultRowStyle}>
                <span>Projected New Users Acquired:</span>
                <strong style={{ color: 'var(--color-success)' }}>+{projectedUsersAcquired.toLocaleString()}</strong>
              </div>
              <div style={resultRowStyle}>
                <span>Projected Revenue Added:</span>
                <strong style={{ color: 'var(--color-success)' }}>+{formatCurrency(projectedRevenueAdded)}/mo</strong>
              </div>
              <div style={{ ...resultRowStyle, borderBottom: 'none', paddingBottom: 0 }}>
                <span>Marketing ROI:</span>
                <strong style={{ color: projectedROI > 100 ? 'var(--color-success)' : 'var(--color-warning)' }}>
                  {projectedROI}%
                </strong>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const containerStyle = {
  display: 'flex',
  flexDirection: 'column'
};

const finCardStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '1.5rem',
  minHeight: '140px'
};

const cardHeaderStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  fontSize: '0.85rem',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  color: 'var(--text-muted)',
  marginBottom: '0.75rem'
};

const cardValueStyle = {
  fontSize: '2rem',
  fontWeight: '800',
  fontFamily: 'var(--font-heading)',
  marginBottom: '0.5rem',
  letterSpacing: '-0.02em'
};

const cardDescStyle = {
  fontSize: '0.75rem',
  color: 'var(--text-muted)'
};

const layoutCardStyle = {
  minHeight: '380px',
  display: 'flex',
  flexDirection: 'column'
};

const titleContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  marginBottom: '1.25rem'
};

const historyListStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.85rem',
  flex: 1,
  overflowY: 'auto',
  maxHeight: '300px',
  paddingRight: '0.25rem'
};

const historyItemStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '0.85rem',
  background: 'rgba(255, 255, 255, 0.02)',
  border: '1px solid var(--border-color)',
  borderRadius: '8px',
  gap: '1rem'
};

const roundBadgeStyle = {
  display: 'flex',
  flexDirection: 'column',
  minWidth: '90px'
};

const roundDetailStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.15rem'
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  justifyContent: 'space-between'
};

const simulationSummaryStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0.85rem',
  background: 'rgba(139, 92, 246, 0.08)',
  border: '1px dashed rgba(139, 92, 246, 0.3)',
  borderRadius: '8px',
  fontSize: '0.9rem',
  marginTop: '0.5rem'
};

const calcResultPanelStyle = {
  background: 'rgba(0, 0, 0, 0.2)',
  border: '1px solid var(--border-color)',
  borderRadius: '12px',
  padding: '1.25rem'
};

const resultRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  paddingVertical: '0.65rem',
  borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
  fontSize: '0.85rem',
  paddingBottom: '0.65rem',
  paddingTop: '0.65rem',
  color: 'var(--text-muted)'
};
