import React from 'react';

export default function BoardOfDirectors({ debateHistory }) {
  return (
    <div className="glass-card" style={containerStyle}>
      <div style={headerStyle}>
        <h3 style={{ margin: 0 }}>Board of Directors</h3>
        <span style={badgeStyle}>Live Advisors</span>
      </div>
      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: '1.4' }}>
        Advisors analyze your corporate maneuvers (pricing adjustments, recruitment, pivots, funding) and debate strategies based on their unique corporate personalities.
      </p>

      {/* Debate Chat Feed */}
      <div style={chatFeedStyle}>
        {debateHistory.slice().reverse().map((msg, idx) => (
          <div key={idx} style={bubbleWrapperStyle}>
            <div style={avatarContainerStyle}>
              <img src={msg.avatar} alt={msg.sender} style={avatarStyle(msg.color)} />
            </div>
            <div style={bubbleContentStyle}>
              <div style={senderRowStyle}>
                <span style={{ fontWeight: '700', fontSize: '0.85rem', color: 'var(--text-primary)' }}>{msg.sender}</span>
                <span style={{ fontSize: '0.7rem', color: msg.color, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {msg.sender.includes('VC') ? 'Investor' : msg.sender.includes('CFO') ? 'Finance' : 'Product'}
                </span>
              </div>
              <div style={messageStyle(msg.color)}>
                {msg.message}
              </div>
            </div>
          </div>
        ))}
        {debateHistory.length === 0 && (
          <div style={emptyFeedStyle}>
            No corporate actions recorded yet. Adjust pricing, hire team members, or raise capital to trigger a board debate.
          </div>
        )}
      </div>
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
  background: 'rgba(139, 92, 246, 0.15)',
  color: 'var(--accent-color)',
  border: '1px solid rgba(139, 92, 246, 0.3)'
};

const chatFeedStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  flex: 1,
  overflowY: 'auto',
  paddingRight: '0.25rem'
};

const bubbleWrapperStyle = {
  display: 'flex',
  gap: '0.75rem',
  alignItems: 'flex-start',
  animation: 'fade-in 0.3s ease-out'
};

const avatarContainerStyle = {
  flexShrink: 0
};

const avatarStyle = (color) => ({
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  border: `2px solid ${color}`,
  boxShadow: `0 0 8px ${color}`
});

const bubbleContentStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem',
  flex: 1
};

const senderRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};

const messageStyle = (color) => ({
  background: 'rgba(255, 255, 255, 0.02)',
  border: `1px solid rgba(255,255,255,0.05)`,
  borderLeft: `3px solid ${color}`,
  borderRadius: '0 8px 8px 8px',
  padding: '0.75rem',
  fontSize: '0.8rem',
  lineHeight: '1.4',
  color: 'var(--text-primary)'
});

const emptyFeedStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  height: '80%',
  fontSize: '0.8rem',
  color: 'var(--text-muted)',
  paddingInline: '1.5rem',
  border: '1px dashed rgba(255,255,255,0.05)',
  borderRadius: '8px'
};
