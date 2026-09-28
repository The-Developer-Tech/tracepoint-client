import React, { useState, useEffect } from 'react';

// Reusable EvidenceCard Component (Satisfies Parts K, O, P)
function EvidenceCard({ item, isSelected, onExamine }) {
    return (
        <div style={{
            backgroundColor: isSelected ? '#1e293b' : '#030712',
            border: isSelected ? '2px solid #38bdf8' : '1px solid #1e293b',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '12px',
            transition: 'all 0.2s ease'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <strong style={{ color: '#f8fafc', fontSize: '1rem' }}>{item.title}</strong>
                <span style={{ color: '#64748b', fontSize: '0.75rem', fontFamily: 'monospace' }}>
                    EVIDENCE ID: #{item.evidenceID}
                </span>
            </div>

            <div style={{ fontSize: '0.8rem', color: '#38bdf8', marginBottom: '10px', fontWeight: 'bold' }}>
                 Location: {item.location}
            </div>

            <button
                onClick={() => onExamine(item)}
                style={{
                    backgroundColor: isSelected ? '#38bdf8' : '#1e293b',
                    color: isSelected ? '#0f172a' : '#f8fafc',
                    border: 'none',
                    padding: '8px 14px',
                    borderRadius: '6px',
                    fontWeight: 'bold',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    width: '100%'
                }}
            >
                {isSelected ? '🔍 CURRENTLY EXAMINING' : 'EXAMINE EVIDENCE'}
            </button>
        </div>
    );
}

function Evidence({ onLog, user }) {
    const [evidenceList, setEvidenceList] = useState([]);
    const [selectedEvidence, setSelectedEvidence] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_BASE_URL = 'https://localhost:7291';

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/evidence`)
            .then(res => {
                if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
                return res.json();
            })
            .then(data => {
                setEvidenceList(data);
                if (data.length > 0) setSelectedEvidence(data[0]); // Default examine first item
                setLoading(false);
                if (onLog) onLog('API', `Retrieved ${data.length} evidence records from Web API.`);
            })
            .catch(err => {
                console.error('Evidence API Fetch Error:', err);
                setError('Failed to load evidence from API. Ensure ASP.NET Core API is running.');
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '50px', color: '#38bdf8' }}>
                <h3>🔍 RETRIEVING FORENSIC EVIDENCE FROM DATABASE...</h3>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ textAlign: 'center', padding: '40px', backgroundColor: '#1e1b4b', border: '1px solid #4338ca', borderRadius: '12px', maxWidth: '700px', margin: '40px auto' }}>
                <h3 style={{ color: '#ef4444', marginTop: 0 }}>⚠️ EVIDENCE API ERROR</h3>
                <p style={{ color: '#cbd5e1' }}>{error}</p>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'left' }}>
            <div style={{ marginBottom: '24px', borderBottom: '1px solid #1e293b', paddingBottom: '16px' }}>
                <h2 style={{ color: '#f8fafc', margin: '0 0 6px 0', fontSize: '1.5rem', letterSpacing: '1px' }}>
                    🔬 EVIDENCE LOCKER — CASE 1: THE MISSING PROTOTYPE
                </h2>
                <span style={{ color: '#38bdf8', fontSize: '0.8rem', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 'bold' }}>
                    DATA RETRIEVED FROM APPLICATIONDBCONTEXT VIA ASP.NET CORE API (/api/evidence)
                </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '24px' }}>
                {/* Left Panel: Evidence Items */}
                <div>
                    <h3 style={{ color: '#94a3b8', fontSize: '0.85rem', textTransform: 'uppercase', margin: '0 0 16px 0' }}>
                        LOGGED ARTIFACTS ({evidenceList.length})
                    </h3>
                    {evidenceList.map(item => (
                        <EvidenceCard
                            key={item.evidenceID}
                            item={item}
                            isSelected={selectedEvidence?.evidenceID === item.evidenceID}
                            onExamine={(selectedItem) => {
                                setSelectedEvidence(selectedItem);
                                if (onLog) onLog('INVESTIGATION', `Examining Evidence #${selectedItem.evidenceID}: ${selectedItem.title}`);
                            }}
                        />
                    ))}
                </div>

                {/* Right Panel: Detailed Forensics Examination View */}
                {selectedEvidence && (
                    <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '24px', height: 'fit-content' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e293b', paddingBottom: '12px', marginBottom: '16px' }}>
                            <h3 style={{ color: '#38bdf8', margin: 0 }}>
                                 FORENSIC ANALYSIS: {selectedEvidence.title}
                            </h3>
                            <span style={{ backgroundColor: '#0284c7', color: '#ffffff', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                                EVIDENCE #{selectedEvidence.evidenceID}
                            </span>
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                            <strong style={{ color: '#94a3b8', fontSize: '0.8rem', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                                Recovery Location:
                            </strong>
                            <span style={{ color: '#f8fafc', fontSize: '1rem', fontWeight: 'bold' }}>
                                 {selectedEvidence.location}
                            </span>
                        </div>

                        <div>
                            <strong style={{ color: '#94a3b8', fontSize: '0.8rem', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                                Examination Findings & Official Description:
                            </strong>
                            <div style={{ backgroundColor: '#030712', border: '1px solid #1e293b', padding: '16px', borderRadius: '8px', color: '#cbd5e1', fontSize: '0.95rem', lineHeight: '1.6' }}>
                                "{selectedEvidence.description}"
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Evidence;