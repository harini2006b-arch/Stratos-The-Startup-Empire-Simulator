import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Users, 
  Map, 
  Sliders, 
  ChevronLeft, 
  ChevronRight,
  Sparkles,
  ShieldAlert
} from 'lucide-react';
import Logo from './Logo';

export default function Sidebar({ activeTab, setActiveTab, startup, collapsed, setCollapsed }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'financials', label: 'Financials', icon: TrendingUp },
    { id: 'hiring', label: 'Hiring & Team', icon: Users },
    { id: 'roadmap', label: 'Roadmap & Expansion', icon: Map },
    { id: 'customizer', label: 'Customizer', icon: Sliders }
  ];

  // Calculate Runway
  const monthlySalary = startup.employees.reduce((sum, emp) => sum + emp.salary, 0);
  const serverCosts = startup.id === 'biotech' ? startup.activeUsers * 2000 : startup.activeUsers * 0.5;
  const totalBurn = monthlySalary + startup.marketingSpend + startup.rdSpend + serverCosts;
  const netFlow = startup.monthlyRevenue - totalBurn;
  
  let runwayMonths = '∞';
  if (netFlow < 0) {
    runwayMonths = Math.max(0, (startup.cashBalance / Math.abs(netFlow)).toFixed(1));
  }

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`} style={sidebarStyle}>
      <div className="sidebar-header" style={headerStyle}>
        <div style={logoContainerStyle}>
          <div className="logo-icon-container" style={{ ...logoIconStyle, background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Logo size={36} />
          </div>
          {!collapsed && (
            <span style={logoTextStyle}>
              Stratos Empire
            </span>
          )}
        </div>
        <button 
          className="btn-icon-only" 
          onClick={() => setCollapsed(!collapsed)}
          style={toggleButtonStyle}
          title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      <nav style={navStyle} className={startup.activeEvent ? 'locked-navigation' : ''}>
        {menuItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={isActive ? { ...navItemStyle, ...navItemActiveStyle } : navItemStyle}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon size={18} color={isActive ? "var(--text-primary)" : "var(--text-muted)"} />
              {!collapsed && <span>{item.label}</span>}
              {!collapsed && isActive && <div style={activeIndicatorStyle} />}
            </button>
          );
        })}
      </nav>

      {/* Mini status panel in Sidebar */}
      {!collapsed && (
        <div className="glass-card" style={miniStatusCardStyle}>
          <div style={presetNameStyle}>
            <Sparkles size={12} style={{ marginRight: '4px' }} />
            {startup.name}
          </div>
          <div style={runwayContainerStyle}>
            <span style={runwayLabelStyle}>Runway</span>
            <span style={{ 
              fontWeight: '700', 
              color: parseFloat(runwayMonths) < 3 ? 'var(--color-danger)' : 'var(--color-success)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              {parseFloat(runwayMonths) < 3 && <ShieldAlert size={14} />}
              {runwayMonths === '∞' ? 'Infinite' : `${runwayMonths} Months`}
            </span>
          </div>
          <div style={progressContainerStyle}>
            <div style={{
              ...progressBarFillStyle,
              width: runwayMonths === '∞' ? '100%' : `${Math.min(100, (parseFloat(runwayMonths) / 12) * 100)}%`,
              backgroundColor: parseFloat(runwayMonths) < 3 ? 'var(--color-danger)' : 'var(--color-success)'
            }} />
          </div>
        </div>
      )}
    </aside>
  );
}

// Inline styles for Sidebar structure
const sidebarStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  width: '260px',
  background: 'rgba(10, 8, 22, 0.85)',
  backdropFilter: 'blur(15px)',
  borderRight: '1px solid var(--border-color)',
  display: 'flex',
  flexDirection: 'column',
  padding: '1.5rem 1rem',
  zIndex: 100,
  transition: 'width 0.3s ease',
  overflowX: 'hidden'
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '2rem',
  height: '40px'
};

const logoContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
  cursor: 'pointer'
};

const logoIconStyle = {
  width: '32px',
  height: '32px',
  borderRadius: '8px',
  background: 'rgba(139, 92, 246, 0.15)',
  border: '1px solid rgba(139, 92, 246, 0.3)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const logoTextStyle = {
  fontFamily: 'var(--font-heading)',
  fontSize: '1.15rem',
  fontWeight: '800',
  background: 'var(--accent-gradient)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  whiteSpace: 'nowrap'
};

const toggleButtonStyle = {
  padding: '0.4rem',
  borderRadius: '6px',
  cursor: 'pointer'
};

const navStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  flex: 1
};

const navItemStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  padding: '0.85rem 1rem',
  border: 'none',
  background: 'transparent',
  color: 'var(--text-muted)',
  fontFamily: 'var(--font-heading)',
  fontSize: '0.95rem',
  fontWeight: '600',
  borderRadius: '8px',
  cursor: 'pointer',
  textAlign: 'left',
  width: '100%',
  position: 'relative',
  transition: 'all 0.2s ease'
};

const navItemActiveStyle = {
  background: 'rgba(139, 92, 246, 0.12)',
  color: 'var(--text-primary)',
  border: '1px solid rgba(139, 92, 246, 0.2)'
};

const activeIndicatorStyle = {
  position: 'absolute',
  right: '0',
  top: '25%',
  bottom: '25%',
  width: '4px',
  borderRadius: '4px 0 0 4px',
  background: 'var(--accent-color)',
  boxShadow: '0 0 10px var(--accent-color)'
};

const miniStatusCardStyle = {
  padding: '1rem',
  fontSize: '0.85rem',
  background: 'rgba(255, 255, 255, 0.02)',
  border: '1px solid var(--border-color)',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.65rem'
};

const presetNameStyle = {
  fontWeight: '700',
  color: 'var(--text-primary)',
  textTransform: 'uppercase',
  fontSize: '0.75rem',
  letterSpacing: '0.05em',
  display: 'flex',
  alignItems: 'center'
};

const runwayContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};

const runwayLabelStyle = {
  color: 'var(--text-muted)'
};

const progressContainerStyle = {
  width: '100%',
  height: '6px',
  borderRadius: '3px',
  background: 'rgba(255,255,255,0.05)',
  overflow: 'hidden'
};

const progressBarFillStyle = {
  height: '100%',
  borderRadius: '3px',
  transition: 'width 0.5s ease-in-out'
};
