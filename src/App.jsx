import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Financials from './components/Financials';
import TeamHiring from './components/TeamHiring';
import RoadmapExpansion from './components/RoadmapExpansion';
import Customizer from './components/Customizer';
import SimulationControls from './components/SimulationControls';
import SplashScreen from './components/SplashScreen';
import WarRoom from './components/WarRoom';
import CommandCenter from './components/CommandCenter';
import LoginOnboard from './components/LoginOnboard';
import { 
  STARTUP_PRESETS, 
  calculateNextMonth, 
  calculateNextQuarter,
  applyBlackSwanResolution,
  generateBoardDebate,
  parseCommandToPivot
} from './utils/mockData';
import { ShieldAlert, RefreshCw, Zap, Users } from 'lucide-react';

export default function App() {
  // Login Gatekeeper States
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Base State Loading Stratos Presets (dynamic details overridden during login)
  const [startup, setStartup] = useState(() => STARTUP_PRESETS.hypergrowth);
  const [activePreset, setActivePreset] = useState('hypergrowth');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Theme state
  const [activeTheme, setActiveTheme] = useState('amethyst');

  // Splash screen loaders (starts ONLY after successful login authentication)
  const [showSplash, setShowSplash] = useState(false);
  const [fadeOutSplash, setFadeOutSplash] = useState(false);

  // Month ticking counter
  const [elapsedMonths, setElapsedMonths] = useState(0);

  // Board Dialogue Chat history state
  const [debateHistory, setDebateHistory] = useState(() => generateBoardDebate('pricing', { price: 15 }));

  // Pivot command notification alerts
  const [pivotNotification, setPivotNotification] = useState(null);

  // Widget visibility customization state
  const [visibleWidgets, setVisibleWidgets] = useState({
    valuation: true,
    revenue: true,
    users: true,
    cash: true
  });

  // Apply theme class to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', activeTheme);
  }, [activeTheme]);

  // Apply War Room crimson alarm theme globally
  useEffect(() => {
    if (startup.activeEvent) {
      document.documentElement.setAttribute('data-theme-warroom', 'true');
    } else {
      document.documentElement.removeAttribute('data-theme-warroom');
    }
  }, [startup.activeEvent]);

  // Handle splash screen timeout loader after Login
  useEffect(() => {
    if (!isLoggedIn) return;

    const fadeTimer = setTimeout(() => {
      setFadeOutSplash(true);
    }, 5000); // begin fade out
    const removeTimer = setTimeout(() => {
      setShowSplash(false);
    }, 6000); // fully remove
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [isLoggedIn]);

  // Autonomous Board Monitor 1: Watch Hiring Count
  const [prevEmpCount, setPrevEmpCount] = useState(startup.employees.length);
  useEffect(() => {
    if (startup.employees.length > prevEmpCount) {
      const newEmp = startup.employees[startup.employees.length - 1];
      const debate = generateBoardDebate('hire', { role: newEmp.role });
      setDebateHistory(prev => [...prev, ...debate]);
    }
    setPrevEmpCount(startup.employees.length);
  }, [startup.employees.length]);

  // Autonomous Board Monitor 2: Watch Pricing Slides
  const [prevPrice, setPrevPrice] = useState(startup.pricePerUser);
  useEffect(() => {
    if (startup.pricePerUser !== prevPrice) {
      const debate = generateBoardDebate('pricing', { price: startup.pricePerUser });
      setDebateHistory(prev => [...prev, ...debate]);
    }
    setPrevPrice(startup.pricePerUser);
  }, [startup.pricePerUser]);

  // Autonomous Board Monitor 3: Watch Funding Rounds
  const [prevFundingCount, setPrevFundingCount] = useState(startup.fundingRounds.length);
  useEffect(() => {
    if (startup.fundingRounds.length > prevFundingCount) {
      const debate = generateBoardDebate('funding', {});
      setDebateHistory(prev => [...prev, ...debate]);
    }
    setPrevFundingCount(startup.fundingRounds.length);
  }, [startup.fundingRounds.length]);

  // Handle Login Authentication and Onboarding Customizations
  const handleLogin = (config) => {
    setStartup(() => {
      const basePreset = STARTUP_PRESETS[config.initialPreset];
      
      // Calculate customized valuation based on pricing and users
      let initialValuation = 0;
      if (config.initialPreset === 'biotech') {
        initialValuation = 10000000 + config.customCash * 0.5;
      } else {
        const monthlyRevenue = config.customUsers * config.customPricing;
        const arr = monthlyRevenue * 12;
        const multiple = config.initialPreset === 'bootstrapped' ? 4 : 15;
        initialValuation = Math.floor(arr * multiple + config.customCash);
      }

      // Generate retro history data matching the tweaked starting values
      const updatedHistory = basePreset.history.map((h, idx) => {
        const factor = (idx + 1) / basePreset.history.length;
        const historicalUsers = Math.max(1, Math.floor(config.customUsers * factor));
        const historicalRev = config.initialPreset === 'biotech' ? 0 : Math.floor(historicalUsers * config.customPricing);
        const historicalCash = Math.max(10000, Math.floor(config.customCash * (0.8 + 0.2 * factor)));
        const historicalVal = config.initialPreset === 'biotech' 
          ? 10000000 + historicalCash * 0.5 
          : historicalRev * 12 * (config.initialPreset === 'bootstrapped' ? 4 : 15);
        
        return {
          ...h,
          Users: historicalUsers,
          Revenue: historicalRev,
          Cash: historicalCash,
          Valuation: historicalVal
        };
      });

      return {
        ...basePreset,
        name: config.companyName,
        cashBalance: config.customCash,
        activeUsers: config.customUsers,
        pricePerUser: config.customPricing,
        valuation: initialValuation,
        employees: basePreset.employees.map(e => e.id === 1 ? { ...e, name: `${config.founderName} (Founder)` } : e),
        history: updatedHistory
      };
    });

    setActivePreset(config.initialPreset);
    setIsLoggedIn(true);
    setShowSplash(true);
    setFadeOutSplash(false);
    
    // Seed initial debate dialog
    const debate = generateBoardDebate('pricing', { price: config.customPricing });
    setDebateHistory(debate);
  };

  // Handle Preset Change
  const handleSelectPreset = (presetId) => {
    setStartup({ ...STARTUP_PRESETS[presetId] });
    setActivePreset(presetId);
    setElapsedMonths(0);
    const debate = generateBoardDebate('pricing', { price: STARTUP_PRESETS[presetId].pricePerUser });
    setDebateHistory(debate);
  };

  // Handle Theme Change
  const handleSelectTheme = (themeId) => {
    setActiveTheme(themeId);
  };

  // Time Advance Tickers
  const handleAdvanceMonth = () => {
    setStartup(prev => {
      const nextState = calculateNextMonth(prev);
      return nextState;
    });
    setElapsedMonths(prev => prev + 1);

    // Trigger board feedback monthly debate
    const debate = generateBoardDebate('month_tick', {});
    setDebateHistory(prev => [...prev, ...debate]);
  };

  const handleAdvanceQuarter = () => {
    setStartup(prev => {
      const nextState = calculateNextQuarter(prev);
      return nextState;
    });
    setElapsedMonths(prev => prev + 3);

    // Trigger board feedback monthly debate
    const debate = generateBoardDebate('month_tick', {});
    setDebateHistory(prev => [...prev, ...debate]);
  };

  // Resolve Black Swan Event
  const handleResolveEvent = (option) => {
    if (startup.cashBalance < option.cost) {
      alert("Insufficient cash reserves to fund this strategy!");
      return;
    }
    setStartup(prev => applyBlackSwanResolution(prev, prev.activeEvent.id, option.type));
  };

  // Resolve Employee Poach Attempt
  const handleCounterPoach = () => {
    const poach = startup.poachAlert;
    setStartup(prev => {
      const updatedEmployees = prev.employees.map(e => 
        e.id === poach.employeeId ? { ...e, salary: poach.rivalOffer } : e
      );
      return {
        ...prev,
        employees: updatedEmployees,
        poachAlert: null
      };
    });

    const debate = [
      {
        sender: 'Sarah (CFO)',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
        message: `Raising salary for ${poach.employeeName} to $${poach.rivalOffer}/mo maintains our roadmap development power, but it tightens our cash buffer.`,
        color: '#22d3ee'
      }
    ];
    setDebateHistory(prev => [...prev, ...debate]);
  };

  const handleLetEmployeeGo = () => {
    const poach = startup.poachAlert;
    setStartup(prev => {
      const updatedEmployees = prev.employees.filter(e => e.id !== poach.employeeId);
      return {
        ...prev,
        employees: updatedEmployees,
        poachAlert: null
      };
    });

    const debate = [
      {
        sender: 'Kenji (Product)',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
        message: `Losing our ${poach.role} ${poach.employeeName} will slow down our active milestones. We must hire a replacement immediately.`,
        color: '#34d399'
      }
    ];
    setDebateHistory(prev => [...prev, ...debate]);
  };

  // Execute Natural Language Command Center Pivot
  const handleExecuteCommand = (commandText) => {
    const result = parseCommandToPivot(commandText, startup);
    if (result.error) {
      alert(result.error);
      return;
    }

    setStartup(result.state);
    
    // Trigger success banner overlay
    setPivotNotification(result.successText);
    setTimeout(() => setPivotNotification(null), 5000);

    // Trigger board debate
    const debate = generateBoardDebate('pivot', {});
    setDebateHistory(prev => [...prev, ...debate]);
  };

  // Bankruptcy Modal Actions
  const handleEmergencyBailout = () => {
    setStartup(prev => {
      const emergencyValuation = Math.floor(500000 / 0.15);
      const newRound = {
        round: 'Emergency Bailout',
        amount: 500000,
        valuation: emergencyValuation,
        date: `Month ${elapsedMonths}`,
        investor: 'Apex Bailout Fund',
        dilution: 15
      };

      return {
        ...prev,
        cashBalance: 500000,
        valuation: emergencyValuation,
        fundingRounds: [...prev.fundingRounds, newRound]
      };
    });
  };

  const handleRestartPreset = () => {
    handleSelectPreset(activePreset);
  };

  // If user is not authenticated, lock everything behind the glassmorphic Onboarding login portal
  if (!isLoggedIn) {
    return <LoginOnboard onLogin={handleLogin} />;
  }

  // Render proper views
  const renderActiveView = () => {
    // If a Black Swan shock is active, force-morph the view to the War Room dashboard
    if (startup.activeEvent) {
      return <WarRoom startup={startup} onResolveOption={handleResolveEvent} />;
    }

    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard 
            startup={startup} 
            visibleWidgets={visibleWidgets} 
            onNavigate={setActiveTab}
            debateHistory={debateHistory}
          />
        );
      case 'financials':
        return (
          <Financials 
            startup={startup} 
            setStartup={setStartup} 
          />
        );
      case 'hiring':
        return (
          <TeamHiring 
            startup={startup} 
            setStartup={setStartup} 
          />
        );
      case 'roadmap':
        return (
          <RoadmapExpansion 
            startup={startup} 
            setStartup={setStartup} 
          />
        );
      case 'customizer':
        return (
          <Customizer
            activePreset={activePreset}
            handleSelectPreset={handleSelectPreset}
            activeTheme={activeTheme}
            handleSelectTheme={handleSelectTheme}
            visibleWidgets={visibleWidgets}
            setVisibleWidgets={setVisibleWidgets}
          />
        );
      default:
        return (
          <Dashboard 
            startup={startup} 
            visibleWidgets={visibleWidgets} 
            onNavigate={setActiveTab}
            debateHistory={debateHistory}
          />
        );
    }
  };

  // Check if bankruptcy is hit
  const isBankrupt = startup.cashBalance <= 0;

  return (
    <div className="app-container">
      {/* 0. Animated Brand Splash Screen */}
      {showSplash && <SplashScreen fadeOut={fadeOutSplash} />}

      {/* 1. Navigation Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        startup={startup}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />

      {/* 2. Main Content Stream */}
      <main className="main-content" style={{ marginLeft: sidebarCollapsed ? '80px' : '260px' }}>
        {/* Dashboard Top Header row */}
        <header className="header-row">
          <div>
            <h1>Stratos Empire Simulator</h1>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Simulate. Strategize. Scale.
            </span>
          </div>
          
          {/* Global Natural Language Command Bar */}
          {!startup.activeEvent && (
            <CommandCenter onExecuteCommand={handleExecuteCommand} />
          )}

          <div className="header-meta">
            <span>Active Model: <strong>{startup.name}</strong></span>
            <span>Simulation Run: <strong>{elapsedMonths} Months</strong></span>
          </div>
        </header>

        {/* 3. Panel Container */}
        <div style={{ flex: 1 }}>
          {renderActiveView()}
        </div>

        {/* 4. Persistent Simulation Footer Bar */}
        <SimulationControls 
          startup={startup}
          setStartup={setStartup}
          onAdvanceMonth={handleAdvanceMonth}
          onAdvanceQuarter={handleAdvanceQuarter}
        />
      </main>

      {/* 5. Natural Language Pivot Notification Overlay Banner */}
      {pivotNotification && (
        <div style={pivotOverlayStyle}>
          <Zap size={18} color="#ffffff" style={{ animation: 'pulse-glow 1s infinite' }} />
          <span>{pivotNotification}</span>
        </div>
      )}

      {/* 6. Competitor Employee Poaching Modal */}
      {startup.poachAlert && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ borderColor: 'var(--color-danger)' }}>
            <Users size={48} color="var(--color-danger)" style={{ marginBottom: '1rem', animation: 'pulse-glow 1.5s infinite' }} />
            <h2 className="modal-title" style={{ color: 'var(--color-danger)' }}>Poaching Attempt!</h2>
            <p className="modal-body">
              Your shadow competitor, <strong>{startup.poachAlert.rivalName}</strong>, is attempting to poach <strong>{startup.poachAlert.employeeName}</strong> ({startup.poachAlert.role}).
              <br /><br />
              They offered them a salary of <strong>${startup.poachAlert.rivalOffer.toLocaleString()}/mo</strong> (a 35% raise over your ${startup.poachAlert.currentSalary.toLocaleString()}/mo package).
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button className="btn btn-primary" onClick={handleCounterPoach}>
                Counter-Offer: Match & Retain Employee
              </button>
              <button className="btn btn-secondary" onClick={handleLetEmployeeGo}>
                Let Them Exit (Roadmap Progress -20%)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. Emergency Bankruptcy Alert Modal */}
      {isBankrupt && (
        <div className="modal-overlay">
          <div className="modal-content">
            <ShieldAlert size={48} color="var(--color-danger)" style={{ marginBottom: '1rem', animation: 'pulse-glow 1.5s infinite' }} />
            <h2 className="modal-title" style={{ color: 'var(--color-danger)' }}>Out of Capital!</h2>
            <p className="modal-body">
              Your startup has run out of funds to pay salaries and finance R&D. Emergency actions are required immediately.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button className="btn btn-primary" onClick={handleEmergencyBailout}>
                Accept Emergency Bailout ($500K Cash)
              </button>
              <button className="btn btn-secondary" onClick={handleRestartPreset}>
                Restart Model Preset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Styling for global pivot notification overlay
const pivotOverlayStyle = {
  position: 'fixed',
  top: '20px',
  left: '50%',
  transform: 'translateX(-50%)',
  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  border: '1.5px solid #34d399',
  boxShadow: '0 10px 40px rgba(16, 185, 129, 0.4), 0 0 20px rgba(16, 185, 129, 0.2)',
  borderRadius: '30px',
  padding: '0.85rem 2rem',
  color: '#ffffff',
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
  fontSize: '0.9rem',
  fontWeight: '700',
  zIndex: 99999,
  animation: 'fade-in 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards'
};
