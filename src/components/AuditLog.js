import React, { useState } from 'react';

function AuditLog({ logs, onClear }) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#030712',
            borderTop: '1px solid #1e293b',
            color: '#38bdf8',
            fontFamily: 'monospace, monospace',
            fontSize: '0.8rem',
            zIndex: 1000,
            boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.5)'
        }}>
            {/* Terminal Header Bar */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '6px 16px',
                backgroundColor: '#0f172a',
                borderBottom: isCollapsed ? 'none' : '1px solid #1e293b',
                cursor: 'pointer'
            }} onClick={() => setIsCollapsed(!isCollapsed)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#4ade80' }}>●</span>
                    <strong style={{ color: '#f8fafc', letterSpacing: '1px' }}>SYSTEM AUDIT LOG (LIVE TELEMETRY)</strong>
                    <span style={{ color: '#64748b', fontSize: '0.75rem' }}>({logs.length} events logged)</span>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    {onClear && (
                        <button
                            onClick={(e) => { e.stopPropagation(); onClear(); }}
                            style={{
                                background: 'transparent',
                                border: '1px solid #334155',
                                color: '#94a3b8',
                                borderRadius: '4px',
                                padding: '2px 8px',
                                fontSize: '0.7rem',
                                cursor: 'pointer'
                            }}
                        >
                            CLEAR LOGS
                        </button>
                    )}
                    <span style={{ color: '#94a3b8' }}>{isCollapsed ? '▲ EXPAND' : '▼ COLLAPSE'}</span>
                </div>
            </div>

            {/* Terminal Output Window */}
            {!isCollapsed && (
                <div style={{
                    maxHeight: '120px',
                    overflowY: 'auto',
                    padding: '8px 16px',
                    display: 'flex',
                    flexDirection: 'column-reverse',
                    gap: '4px'
                }}>
                    {logs.length === 0 ? (
                        <div style={{ color: '#64748b' }}>[SYSTEM IDLE] Waiting for investigator interactions...</div>
                    ) : (
                        logs.map((log, index) => (
                            <div key={index} style={{ lineHeight: '1.4' }}>
                                <span style={{ color: '#64748b' }}>[{log.timestamp}]</span>{' '}
                                <span style={{ color: log.type === 'ACTION' ? '#4ade80' : '#38bdf8', fontWeight: 'bold' }}>
                                    {log.type}:
                                </span>{' '}
                                <span style={{ color: '#e2e8f0' }}>{log.message}</span>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}

export default AuditLog;