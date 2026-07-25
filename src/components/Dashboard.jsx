import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import MetricCard from './MetricCard';
import BoardOfDirectors from './BoardOfDirectors';
import CompetitorSwarm from './CompetitorSwarm';
import { Sparkles, ArrowRight, Zap, Target } from 'lucide-react';

export default function Dashboard({ startup, visibleWidgets, onNavigate, debateHistory }) {
  const history = startup.history;
  const currentMonthData = history[history.length - 1] || {};
  const prevMonthData = history[history.length - 2] || currentMonthData;

  // Calculate percentage growths for KPIs
  const calculateGrowth = (current, prev) => {
    if (!prev || prev === 0) return '+0.0%';
    const pct = ((current - prev) / prev) * 100;
    return `${pct >= 0 ? '+' : ''}${pct.toFixed(1)}%`;
  };

  const valuationGrowth = calculateGrowth(startup.valuation, prevMonthData.Valuation);
  const revenueGrowth = calculateGrowth(startup.monthlyRevenue, prevMonthData.Revenue);
  const usersGrowth = calculateGrowth(startup.activeUsers, prevMonthData.Users);
  const cashGrowth = calculateGrowth(startup.cashBalance, prevMonthData.Cash);

  // Budget Breakdown calculation for Pie Chart
  const adminSalaries = startup.employees.filter(e => e.dept === 'Operations').reduce((a, b) => a + b.salary, 0);
  const devSalaries = startup.employees.filter(e => e.dept === 'Engineering').reduce((a, b) => a + b.salary, 0);
  const productSalaries = startup.employees.filter(e => e.dept === 'Product').reduce((a, b) => a + b.salary, 0);
  const marketingSalaries = startup.employees.filter(e => e.dept === 'Marketing').reduce((a, b) => a + b.salary, 0);
  const salesSalaries = startup.employees.filter(e => e.dept === 'Sales').reduce((a, b) => a + b.salary, 0);

  const serverCosts = startup.id === 'biotech' ? startup.activeUsers * 2000 : startup.activeUsers * 0.5;

  const budgetData = [
    { name: 'Operations', value: adminSalaries + serverCosts },
    { name: 'R&D & Product', value: productSalaries + devSalaries + startup.rdSpend },
    { name: 'Marketing', value: marketingSalaries + startup.marketingSpend },
    { name: 'Sales & BD', value: salesSalaries }
  ].filter(item => item.value > 0);

  const PIE_COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981'];

  // Currency Formatter
  const formatCurrency = (val) => {
    if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `$${(val / 1000).toFixed(0)}K`;
    return `$${val}`;
  };

  return (
    <div style={dashboardContainerStyle}>
      {/* 1. KPIs Row */}
      <div className="grid-4">
        {visibleWidgets.valuation && (
          <MetricCard
            title="Company Valuation"
            value={startup.valuation}
            trend={valuationGrowth}
            isPositive={parseFloat(valuationGrowth) >= 0}
            historyData={history}
            dataKey="Valuation"
            formatType="currency"
          />
        )}
        {visibleWidgets.revenue && (
          <MetricCard
            title="Monthly Revenue"
            value={startup.monthlyRevenue}
            trend={revenueGrowth}
            isPositive={parseFloat(revenueGrowth) >= 0}
            historyData={history}
            dataKey="Revenue"
            formatType="currency"
          />
        )}
        {visibleWidgets.users && (
          <MetricCard
            title={startup.id === 'biotech' ? "Active Partners" : "Active Users"}
            value={startup.activeUsers}
            trend={usersGrowth}
            isPositive={parseFloat(usersGrowth) >= 0}
            historyData={history}
            dataKey="Users"
            formatType="integer"
          />
        )}
        {visibleWidgets.cash && (
          <MetricCard
            title="Cash Balance"
            value={startup.cashBalance}
            trend={cashGrowth}
            isPositive={parseFloat(cashGrowth) >= 0}
            historyData={history}
            dataKey="Cash"
            formatType="currency"
          />
        )}
      </div>

      {/* 2. Charts & Board Row */}
      <div className="grid-3" style={{ marginTop: '1.5rem' }}>
        {/* Main Growth Graph (takes 2 cols) */}
        <div className="glass-card" style={{ gridColumn: 'span 2', minHeight: '350px' }}>
          <div style={chartHeaderStyle}>
            <h3>Growth Overview</h3>
            <span style={chartSubStyle}>Revenue vs Operating Profit over time</span>
          </div>
          <div style={{ width: '100%', height: '280px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={history} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent-color)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--accent-color)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorProf" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-success)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--color-success)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={11} tickLine={false} />
                <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} tickFormatter={formatCurrency} />
                <Tooltip 
                  contentStyle={{ background: 'rgba(10, 8, 22, 0.95)', border: '1px solid var(--border-color)', borderRadius: '8px' }}
                  labelStyle={{ fontWeight: 'bold', color: 'var(--text-primary)' }}
                  formatter={(val) => [formatCurrency(val), null]}
                />
                <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                <Area type="monotone" name="Monthly Revenue" dataKey="Revenue" stroke="var(--accent-color)" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRev)" />
                <Area type="monotone" name="Net Profit/Loss" dataKey="Profit" stroke="var(--color-success)" strokeWidth={2.5} fillOpacity={1} fill="url(#colorProf)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Board of Directors Panel (takes 1 col) */}
        <BoardOfDirectors debateHistory={debateHistory} />
      </div>

      {/* 3. Competitor Swarm & Budget Allocation Row */}
      <div className="grid-2" style={{ marginTop: '1.5rem' }}>
        {/* Competitor Swarm */}
        <CompetitorSwarm startup={startup} />

        {/* Budget Allocation Pie */}
        <div className="glass-card" style={{ minHeight: '350px' }}>
          <div style={chartHeaderStyle}>
            <h3>Budget Allocation</h3>
            <span style={chartSubStyle}>Current monthly expenditures breakdown</span>
          </div>
          <div style={{ width: '100%', height: '220px', position: 'relative' }}>
            {budgetData.length === 0 ? (
              <div style={emptyPieStyle}>No active expenses</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={budgetData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {budgetData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ background: 'rgba(10, 8, 22, 0.95)', border: '1px solid var(--border-color)', borderRadius: '8px', fontSize: 11 }}
                    formatter={(val) => [formatCurrency(val), null]}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
            {budgetData.length > 0 && (
              <div style={pieCenterTextStyle}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total Burn</span>
                <span style={{ fontSize: '1.05rem', fontWeight: '800' }}>
                  {formatCurrency(budgetData.reduce((s, d) => s + d.value, 0))}
                </span>
              </div>
            )}
          </div>
          {/* Custom Budget Legend */}
          <div style={budgetLegendStyle}>
            {budgetData.map((item, idx) => (
              <div key={item.name} style={legendItemStyle}>
                <div style={{ ...legendDotStyle, backgroundColor: PIE_COLORS[idx % PIE_COLORS.length] }} />
                <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{item.name}</span>
                <strong style={{ marginLeft: 'auto' }}>{formatCurrency(item.value)}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Bottom Row (Startup Intel & Action cards) */}
      <div className="grid-2" style={{ marginTop: '1.5rem' }}>
        <div className="glass-card" style={statCardStyle}>
          <div style={panelTitleStyle}>
            <Target size={18} color="var(--accent-color)" />
            <h3>Startup Vital Indicators</h3>
          </div>
          <div style={indicatorsGridStyle}>
            <div style={indicatorItemStyle}>
              <span style={indicatorLabelStyle}>Active Employees</span>
              <span style={indicatorValStyle}>{startup.employees.length} Members</span>
            </div>
            <div style={indicatorItemStyle}>
              <span style={indicatorLabelStyle}>Pricing Per User</span>
              <span style={indicatorValStyle}>${startup.pricePerUser}/mo</span>
            </div>
            <div style={indicatorItemStyle}>
              <span style={indicatorLabelStyle}>Market Coverage</span>
              <span style={indicatorValStyle}>
                {startup.expansionMarkets.filter(m => m.status === 'unlocked').length} / {startup.expansionMarkets.length} Regions
              </span>
            </div>
            <div style={indicatorItemStyle}>
              <span style={indicatorLabelStyle}>Active CAC</span>
              <span style={indicatorValStyle}>${startup.cac.toFixed(0)} / user</span>
            </div>
          </div>
        </div>

        {/* Action Panel Card */}
        <div className="glass-card highlight" style={{ ...statCardStyle, justifyContent: 'center' }}>
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <Sparkles size={32} color="var(--accent-color)" style={{ marginBottom: '1rem', animation: 'pulse-glow 2s infinite' }} />
            <h3 style={{ marginBottom: '0.5rem' }}>Ready to Scale?</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.25rem', maxWidth: '380px', marginInline: 'auto' }}>
              Adjust marketing sliders, R&D budgets, and headcounts to optimize operations, then advance time to see simulation outcomes.
            </p>
            <button className="btn btn-primary" onClick={() => onNavigate('roadmap')}>
              Review Roadmap Milestones <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const dashboardContainerStyle = {
  display: 'flex',
  flexDirection: 'column'
};

const chartHeaderStyle = {
  marginBottom: '1rem'
};

const chartSubStyle = {
  fontSize: '0.75rem',
  color: 'var(--text-muted)'
};

const pieCenterTextStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  pointerEvents: 'none'
};

const emptyPieStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  color: 'var(--text-muted)',
  fontSize: '0.9rem'
};

const budgetLegendStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.4rem',
  marginTop: '0.5rem',
  fontSize: '0.8rem'
};

const legendItemStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  color: 'var(--text-muted)'
};

const legendDotStyle = {
  width: '8px',
  height: '8px',
  borderRadius: '50%'
};

const statCardStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  gap: '1rem'
};

const panelTitleStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem'
};

const indicatorsGridStyle = {
  display: 'grid',
  gridTemplateCoordinates: 'repeat(2, 1fr)',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '1rem',
  flex: 1
};

const indicatorItemStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '1rem',
  background: 'rgba(255,255,255,0.02)',
  border: '1px solid var(--border-color)',
  borderRadius: '10px'
};

const indicatorLabelStyle = {
  fontSize: '0.75rem',
  color: 'var(--text-muted)'
};

const indicatorValStyle = {
  fontFamily: 'var(--font-heading)',
  fontWeight: '700',
  fontSize: '1rem',
  color: 'var(--text-primary)',
  marginTop: '0.25rem'
};
