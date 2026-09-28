import React from 'react';

function EvidenceCard({ evidence, isSelected, onSelect }) {
    if (!evidence) return null;

    const title = evidence.title || evidence.Title;
    const location = evidence.location || evidence.Location;
    const description = evidence.description || evidence.Description;

    return (
        <div style={{
            background: isSelected ? 'linear-gradient(145deg, #1e293b, #0f172a)' : '#ffffff',
            color: isSelected ? '#f8fafc' : '#0f172a',
            border: isSelected ? '2px solid #38bdf8' : '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '24px',
            margin: '12px',
            width: '320px',
            boxShadow: isSelected ? '0 10px 25px -5px rgba(56, 189, 248, 0.3)' : '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
            transition: 'all 0.3s ease',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
            textAlign: 'left'
        }}>
            <div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '12px'
                }}>
                    <span style={{
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        color: isSelected ? '#38bdf8' : '#0369a1',
                        backgroundColor: isSelected ? 'rgba(56, 189, 248, 0.15)' : '#e0f2fe',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        textTransform: 'uppercase'
                    }}>
                        {location}
                    </span>
                </div>

                <h3 style={{
                    margin: '0 0 12px 0',
                    fontSize: '1.35rem',
                    fontWeight: '700',
                    color: isSelected ? '#f8fafc' : '#0f172a'
                }}>
                    {title}
                </h3>

                <p style={{
                    fontSize: '0.95rem',
                    lineHeight: '1.5',
                    color: isSelected ? '#cbd5e1' : '#64748b',
                    marginBottom: '20px'
                }}>
                    {description}
                </p>
            </div>

            <button
                onClick={() => onSelect(evidence)}
                style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: 'none',
                    fontWeight: '600',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    backgroundColor: isSelected ? '#38bdf8' : '#0f172a',
                    color: isSelected ? '#0f172a' : '#ffffff'
                }}
            >
                {isSelected ? '🔍 Inspecting Details' : 'Examine Evidence'}
            </button>
        </div>
    );
}

export default EvidenceCard;