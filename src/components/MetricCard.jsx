import React from 'react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function MetricCard({ title, value, trend, isPositive, historyData, dataKey, formatType }) {
  // Safe helper to format numbers into clean values ($12.4M, $420K, etc.)
  const formatNumber = (num) => {
    if (formatType === 'currency') {
      if (num >= 1000000) {
        return `$${(num / 1000000).toFixed(1)}M`;
      }
      if (num >= 1000) {
        return `$${(num / 1000).toFixed(0)}K`;
      }
      return `$${num}`;
    }
    if (formatType === 'integer') {
      return num.toLocaleString();
    }
    return num;
  };

  // Extract sparkline historical points
  const sparkData = historyData.map(h => ({ value: h[dataKey] }));

  return (
    <div className="glass-card metric-card" style={cardStyle}>
      <div style={topRowStyle}>
        <span style={titleStyle}>{title}</span>
        <span style={{
          ...trendStyle,
          color: isPositive ? 'var(--color-success)' : 'var(--color-danger)',
          backgroundColor: isPositive ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
          borderColor: isPositive ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'
        }}>
          {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {trend}
        </span>
      </div>

      <div style={valueStyle}>{formatNumber(value)}</div>

      {/* Sparkline area */}
      <div style={sparklineContainerStyle}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={sparkData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <defs>
              <linearGradient id={`colorSpark-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={isPositive ? 'var(--color-success)' : 'var(--accent-color)'} stopOpacity={0.4}/>
                <stop offset="95%" stopColor={isPositive ? 'var(--color-success)' : 'var(--accent-color)'} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              stroke={isPositive ? 'var(--color-success)' : 'var(--accent-color)'}
              strokeWidth={2}
              fillOpacity={1}
              fill={`url(#colorSpark-${dataKey})`}
              dot={false}
              isAnimationActive={true}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

const cardStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  minHeight: '160px',
  position: 'relative'
};

const topRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '0.5rem'
};

const titleStyle = {
  fontSize: '0.85rem',
  fontWeight: '600',
  color: 'var(--text-muted)',
  textTransform: 'uppercase',
  letterSpacing: '0.05em'
};

const trendStyle = {
  fontSize: '0.75rem',
  fontWeight: '700',
  display: 'flex',
  alignItems: 'center',
  gap: '0.2rem',
  padding: '0.15rem 0.5rem',
  borderRadius: '20px',
  border: '1px solid'
};

const valueStyle = {
  fontSize: '1.85rem',
  fontWeight: '800',
  fontFamily: 'var(--font-heading)',
  color: 'var(--text-primary)',
  marginBottom: '1rem',
  letterSpacing: '-0.02em'
};

const sparklineContainerStyle = {
  width: '100%',
  height: '50px',
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  overflow: 'hidden',
  borderRadius: '0 0 16px 16px'
};
