import React, { useState } from 'react';
import { 
  Users, 
  DollarSign, 
  Briefcase, 
  Plus, 
  Trash2, 
  ArrowRight,
  TrendingUp,
  UserPlus
} from 'lucide-react';
import { CANDIDATE_POOL } from '../utils/mockData';

export default function TeamHiring({ startup, setStartup }) {
  // Local state for candidate pipeline
  const [candidates, setCandidates] = useState(() => {
    // Initialise candidates excluding anyone already in startup.employees
    const activeNames = new Set(startup.employees.map(e => e.name));
    return CANDIDATE_POOL.filter(c => !activeNames.has(c.name));
  });

  // Local state for new candidate form
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCandName, setNewCandName] = useState('');
  const [newCandRole, setNewCandRole] = useState('Frontend Engineer');
  const [newCandSalary, setNewCandSalary] = useState(8000);
  const [newCandDept, setNewCandDept] = useState('Engineering');

  // Core stats
  const totalEmployees = startup.employees.length;
  const totalPayroll = startup.employees.reduce((sum, emp) => sum + emp.salary, 0);
  const averageSalary = totalEmployees > 0 ? Math.floor(totalPayroll / totalEmployees) : 0;

  // Department distribution
  const depts = ['Engineering', 'Product', 'Marketing', 'Sales', 'Operations'];
  const getDeptCount = (dept) => startup.employees.filter(e => e.dept === dept).length;

  // Advance Candidate in Pipeline
  const moveCandidate = (candidateId, currentStatus) => {
    const statusOrder = ['sourcing', 'interviewing', 'offered', 'hired'];
    const nextIndex = statusOrder.indexOf(currentStatus) + 1;
    
    if (nextIndex >= statusOrder.length) return; // Already hired or out of range
    const nextStatus = statusOrder[nextIndex];

    if (nextStatus === 'hired') {
      // Add candidate to active employees
      const cand = candidates.find(c => c.id === candidateId);
      if (cand) {
        const newEmployee = {
          id: startup.employees.length + 1,
          name: cand.name,
          role: cand.role,
          salary: cand.salary,
          dept: cand.dept
        };

        setStartup(prev => ({
          ...prev,
          employees: [...prev.employees, newEmployee]
        }));

        // Remove from candidate pipeline
        setCandidates(prev => prev.filter(c => c.id !== candidateId));
      }
    } else {
      // Just update status in pipeline
      setCandidates(prev => prev.map(c => c.id === candidateId ? { ...c, status: nextStatus } : c));
    }
  };

  // Reject/Delete candidate from pipeline
  const rejectCandidate = (candidateId) => {
    setCandidates(prev => prev.filter(c => c.id !== candidateId));
  };

  // Add custom candidate
  const handleAddCandidate = (e) => {
    e.preventDefault();
    if (!newCandName.trim()) return;

    const newCand = {
      id: `custom_${Date.now()}`,
      name: newCandName,
      role: newCandRole,
      salary: Number(newCandSalary),
      dept: newCandDept,
      status: 'sourcing',
      rating: (Math.random() * (5.0 - 4.0) + 4.0).toFixed(1)
    };

    setCandidates(prev => [newCand, ...prev]);
    setNewCandName('');
    setShowAddForm(false);
  };

  // Render Kanban Columns
  const renderColumn = (statusKey, title) => {
    const filtered = candidates.filter(c => c.status === statusKey);
    return (
      <div key={statusKey} className="kanban-column">
        <div className="kanban-column-header">
          <span>{title}</span>
          <span className="kanban-count">{filtered.length}</span>
        </div>
        <div className="kanban-cards-container">
          {filtered.map(c => (
            <div key={c.id} className="kanban-card">
              <div className="kanban-card-title">{c.name}</div>
              <div className="kanban-card-subtitle">{c.role} ({c.dept})</div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.65rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Salary:</span>
                <span style={{ fontWeight: 'bold' }}>${c.salary.toLocaleString()}/mo</span>
              </div>

              <div className="kanban-card-footer">
                <span className="kanban-rating">★ {c.rating}</span>
                <div style={{ display: 'flex', gap: '0.25rem' }}>
                  <button 
                    onClick={() => rejectCandidate(c.id)}
                    className="btn btn-danger btn-icon-only" 
                    title="Reject Candidate"
                    style={{ padding: '0.2rem' }}
                  >
                    <Trash2 size={12} />
                  </button>
                  <button 
                    onClick={() => moveCandidate(c.id, c.status)}
                    className="btn btn-success btn-icon-only" 
                    title={statusKey === 'offered' ? "Hire Candidate" : "Advance Candidate"}
                    style={{ padding: '0.2rem' }}
                  >
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div style={emptyColumnStyle}>No candidates</div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div style={containerStyle}>
      {/* 1. Team analytics header */}
      <div className="grid-3">
        <div className="glass-card" style={statCardStyle}>
          <div style={statHeaderStyle}>
            <Users size={20} color="var(--accent-color)" />
            <span>Active Headcount</span>
          </div>
          <div style={statValueStyle}>{totalEmployees} Hires</div>
          <div style={statDescStyle}>Full-time employees active</div>
        </div>

        <div className="glass-card" style={statCardStyle}>
          <div style={statHeaderStyle}>
            <DollarSign size={20} color="var(--accent-color)" />
            <span>Monthly Payroll</span>
          </div>
          <div style={statValueStyle}>${totalPayroll.toLocaleString()}</div>
          <div style={statDescStyle}>Aggregated monthly salary cost</div>
        </div>

        <div className="glass-card" style={statCardStyle}>
          <div style={statHeaderStyle}>
            <TrendingUp size={20} color="var(--color-success)" />
            <span>Average Salary</span>
          </div>
          <div style={statValueStyle}>${averageSalary.toLocaleString()}/mo</div>
          <div style={statDescStyle}>Avg package per employee</div>
        </div>
      </div>

      {/* 2. Department distribution */}
      <div className="glass-card" style={{ marginTop: '1.5rem' }}>
        <div style={deptTitleStyle}>
          <h3>Department Distribution</h3>
        </div>
        <div style={deptBarGridStyle}>
          {depts.map(dept => {
            const count = getDeptCount(dept);
            const percentage = totalEmployees > 0 ? (count / totalEmployees) * 100 : 0;
            return (
              <div key={dept} style={deptBarItemStyle}>
                <div style={deptBarMetaStyle}>
                  <span>{dept}</span>
                  <strong>{count} ({percentage.toFixed(0)}%)</strong>
                </div>
                <div style={deptProgressBarContainerStyle}>
                  <div style={{ ...deptProgressBarFillStyle, width: `${percentage}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Pipeline Kanban */}
      <div className="glass-card" style={{ marginTop: '1.5rem' }}>
        <div style={kanbanHeaderRowStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <UserPlus size={20} color="var(--accent-color)" />
            <h3>Hiring Pipeline</h3>
          </div>
          <button 
            className="btn btn-secondary" 
            onClick={() => setShowAddForm(!showAddForm)}
          >
            <Plus size={16} /> Source Candidate
          </button>
        </div>

        {/* Add Candidate Form */}
        {showAddForm && (
          <form onSubmit={handleAddCandidate} className="glass-card" style={addFormStyle}>
            <h4 style={{ marginBottom: '1rem' }}>Source New Talent</h4>
            <div className="grid-4" style={{ gap: '1rem' }}>
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={newCandName} 
                  onChange={(e) => setNewCandName(e.target.value)} 
                  placeholder="e.g. John Doe"
                  required 
                />
              </div>
              <div className="form-group">
                <label>Role</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={newCandRole} 
                  onChange={(e) => setNewCandRole(e.target.value)} 
                  placeholder="e.g. Backend Dev"
                  required 
                />
              </div>
              <div className="form-group">
                <label>Department</label>
                <select 
                  className="form-input" 
                  value={newCandDept} 
                  onChange={(e) => setNewCandDept(e.target.value)}
                  style={{ background: '#121026', border: '1px solid var(--border-color)', height: '42px', color: '#fff' }}
                >
                  {depts.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Target Salary ($/mo)</label>
                <input 
                  type="number" 
                  className="form-input" 
                  value={newCandSalary} 
                  onChange={(e) => setNewCandSalary(parseInt(e.target.value) || 0)} 
                  min="1000"
                  required 
                />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem', justifyContent: 'flex-end' }}>
              <button type="button" className="btn btn-secondary" onClick={() => setShowAddForm(false)}>Cancel</button>
              <button type="submit" className="btn btn-primary">Add Candidate</button>
            </div>
          </form>
        )}

        <div className="kanban-board" style={{ marginTop: '1rem' }}>
          {renderColumn('sourcing', 'Sourcing')}
          {renderColumn('interviewing', 'Interviewing')}
          {renderColumn('offered', 'Offered')}
          
          {/* Hired is tracked in employees, but we show a summary slot for reference */}
          <div className="kanban-column" style={{ background: 'rgba(16, 185, 129, 0.05)', borderColor: 'rgba(16, 185, 129, 0.2)' }}>
            <div className="kanban-column-header" style={{ color: 'var(--color-success)', borderBottomColor: 'rgba(16, 185, 129, 0.2)' }}>
              <span>Hired / Active Team</span>
              <span className="kanban-count" style={{ backgroundColor: 'var(--color-success)' }}>{totalEmployees}</span>
            </div>
            <div className="kanban-cards-container" style={{ overflowY: 'auto', maxHeight: '350px', paddingRight: '0.25rem' }}>
              {startup.employees.map(e => (
                <div key={e.id} className="kanban-card" style={{ borderColor: 'rgba(16, 185, 129, 0.15)' }}>
                  <div className="kanban-card-title" style={{ color: 'var(--color-success)' }}>{e.name}</div>
                  <div className="kanban-card-subtitle">{e.role}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Salary:</span>
                    <strong>${e.salary.toLocaleString()}/mo</strong>
                  </div>
                </div>
              ))}
            </div>
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

const statCardStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '1.25rem',
  minHeight: '120px'
};

const statHeaderStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  fontSize: '0.85rem',
  textTransform: 'uppercase',
  color: 'var(--text-muted)',
  marginBottom: '0.5rem'
};

const statValueStyle = {
  fontSize: '1.75rem',
  fontWeight: '800',
  fontFamily: 'var(--font-heading)',
  color: 'var(--text-primary)',
  marginBottom: '0.25rem'
};

const statDescStyle = {
  fontSize: '0.75rem',
  color: 'var(--text-muted)'
};

const deptTitleStyle = {
  marginBottom: '1rem'
};

const deptBarGridStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem'
};

const deptBarItemStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.4rem'
};

const deptBarMetaStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '0.85rem',
  color: 'var(--text-muted)'
};

const deptProgressBarContainerStyle = {
  width: '100%',
  height: '8px',
  borderRadius: '4px',
  background: 'rgba(255, 255, 255, 0.05)',
  overflow: 'hidden'
};

const deptProgressBarFillStyle = {
  height: '100%',
  borderRadius: '4px',
  background: 'var(--accent-gradient)',
  boxShadow: '0 0 8px var(--accent-color)',
  transition: 'width 0.4s ease'
};

const kanbanHeaderRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '1rem'
};

const addFormStyle = {
  background: 'rgba(0, 0, 0, 0.3)',
  border: '1px solid var(--border-color)',
  padding: '1.25rem',
  borderRadius: '12px',
  marginBottom: '1.5rem'
};

const emptyColumnStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '80px',
  color: 'var(--text-muted)',
  fontSize: '0.75rem',
  border: '1px dashed rgba(255, 255, 255, 0.05)',
  borderRadius: '8px'
};
