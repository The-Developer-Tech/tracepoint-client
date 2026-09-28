import React from 'react';

function SuspectCard({ suspect, isSelected, onSelect }) {
    // Safety check to avoid reading properties on undefined
    if (!suspect) {
        return null;
    }

    return (
        <div style={{
            background: isSelected ? 'linear-gradient(145deg, #1e293b, #0f172a)' : '#ffffff',
            color: isSelected ? '#f8fafc' : '#0f172a',
            border: isSelected ? '2px solid #38bdf8' : '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '24px',
            margin: '16px',
            width: '300px',
            boxShadow: isSelected ? '0 10px 25px -5px rgba(56, 189, 248, 0.25)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {isSelected && (
                <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: '#38bdf8',
                    color: '#0f172a',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    padding: '2px 8px',
                    borderRadius: '9999px',
                    textTransform: 'uppercase'
                }}>
                    PRIMARY SUSPECT
                </div>
            )}

            <div>
                <h2 style={{ margin: '0 0 8px 0', fontSize: '1.5rem', fontWeight: '700' }}>
                    {suspect.name || suspect.Name}
                </h2>
                <div style={{
                    display: 'inline-block',
                    backgroundColor: isSelected ? 'rgba(56, 189, 248, 0.15)' : '#e0f2fe',
                    color: isSelected ? '#38bdf8' : '#0369a1',
                    padding: '4px 12px',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    marginBottom: '16px'
                }}>
                    {suspect.occupation || suspect.Occupation}
                </div>
                <p style={{
                    fontSize: '0.95rem',
                    lineHeight: '1.5',
                    color: isSelected ? '#cbd5e1' : '#475569',
                    marginBottom: '24px',
                    textAlign: 'left'
                }}>
                    {suspect.description || suspect.Description}
                </p>
            </div>

            <button
                onClick={() => onSelect && onSelect(suspect)}
                style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: 'none',
                    fontWeight: '600',
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s ease',
                    backgroundColor: isSelected ? '#38bdf8' : '#0f172a',
                    color: isSelected ? '#0f172a' : '#ffffff'
                }}
            >
                {isSelected ? '✓ Suspect Selected' : 'Select Suspect'}
            </button>
        </div>
    );
}

export default SuspectCard;