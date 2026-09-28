import React, { useState, useEffect } from 'react';

// Reusable SuspectCard Component (Satisfies Part J, O & P)
function SuspectCard({ suspect, isSelected, onSelect }) {
    return (
        <div
            onClick={() => onSelect(suspect)}
            style={{
                padding: '16px',
                borderRadius: '8px',
                backgroundColor: isSelected ? '#1e293b' : '#030712',
                border: isSelected ? '2px solid #38bdf8' : '1px solid #1e293b',
                cursor: 'pointer',
                marginBottom: '12px',
                transition: 'all 0.2s ease'
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <strong style={{ color: '#f8fafc', fontSize: '1rem' }}>{suspect.name}</strong>
                <span style={{ color: '#64748b', fontSize: '0.8rem', fontFamily: 'monospace' }}>ID: {suspect.suspectID}</span>
            </div>
            <div style={{ fontSize: '0.85rem', color: '#38bdf8', fontWeight: 'bold', marginBottom: '6px' }}>
                {suspect.occupation}
            </div>
            <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: 0, lineHeight: '1.4' }}>
                {suspect.description}
            </p>
        </div>
    );
}

function Suspects({ onLog, user }) {
    const [suspects, setSuspects] = useState([]);
    const [selectedSuspect, setSelectedSuspect] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Updated to match your running ASP.NET Core API port (https://localhost:7291)
    const API_BASE_URL = 'https://localhost:7291';

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/suspects`)
            .then(res => {
                if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
                return res.json();
            })
            .then(data => {
                setSuspects(data);
                if (data.length > 0) setSelectedSuspect(data[0]);
                setLoading(false);
                if (onLog) onLog('API', `Fetched ${data.length} suspects from Web API.`);
            })
            .catch(err => {
                console.error('API Fetch Error:', err);
                setError(`Failed to connect to API at ${API_BASE_URL}.`);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '50px', color: '#38bdf8' }}>
                <h3>⏳ CONNECTING TO API (https://localhost:7291)...</h3>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ textAlign: 'center', padding: '40px', backgroundColor: '#1e1b4b', border: '1px solid #4338ca', borderRadius: '12px', maxWidth: '700px', margin: '40px auto' }}>
                <h3 style={{ color: '#ef4444', marginTop: 0 }}>⚠️ API CONNECTION ERROR</h3>
                <p style={{ color: '#cbd5e1' }}>{error}</p>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
                    If using self-signed HTTPS certificates locally, open <a href="https://localhost:7291/swagger/index.html" target="_blank" rel="noreferrer" style={{ color: '#38bdf8' }}>https://localhost:7291/swagger/index.html</a> in a new tab and click "Proceed / Accept Certificate", then refresh this page.
                </p>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'left' }}>
            <div style={{ marginBottom: '24px', borderBottom: '1px solid #1e293b', paddingBottom: '16px' }}>
                <h2 style={{ color: '#f8fafc', margin: '0 0 6px 0', fontSize: '1.5rem', letterSpacing: '1px' }}>
                    SUSPECTS — CASE 1: THE MISSING PROTOTYPE
                </h2>
                <span style={{ color: '#38bdf8', fontSize: '0.8rem', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 'bold' }}>
                    DATA RETRIEVED FROM APPLICATIONDBCONTEXT VIA ASP.NET CORE API
                </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '24px' }}>
                {/* Reusable Suspect List */}
                <div>
                    <h3 style={{ color: '#94a3b8', fontSize: '0.85rem', textTransform: 'uppercase', margin: '0 0 16px 0' }}>
                        ACTIVE SUBJECT ROSTER ({suspects.length})
                    </h3>
                    {suspects.map(s => (
                        <SuspectCard
                            key={s.suspectID}
                            suspect={s}
                            isSelected={selectedSuspect?.suspectID === s.suspectID}
                            onSelect={(suspect) => {
                                setSelectedSuspect(suspect);
                                if (onLog) onLog('ACTION', `Selected suspect: ${suspect.name}`);
                            }}
                        />
                    ))}
                </div>

                {/* Selected Suspect Dossier */}
                {selectedSuspect && (
                    <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '24px', height: 'fit-content' }}>
                        <h3 style={{ color: '#38bdf8', marginTop: 0, borderBottom: '1px solid #1e293b', paddingBottom: '12px' }}>
                            INVESTIGATION DOSSIER: {selectedSuspect.name}
                        </h3>
                        <div style={{ marginBottom: '16px' }}>
                            <strong style={{ color: '#94a3b8', fontSize: '0.8rem', textTransform: 'uppercase', display: 'block' }}>Occupation:</strong>
                            <span style={{ color: '#f8fafc', fontSize: '1rem' }}>{selectedSuspect.occupation}</span>
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <strong style={{ color: '#94a3b8', fontSize: '0.8rem', textTransform: 'uppercase', display: 'block' }}>Suspect ID:</strong>
                            <span style={{ color: '#cbd5e1', fontFamily: 'monospace' }}>{selectedSuspect.suspectID}</span>
                        </div>
                        <div>
                            <strong style={{ color: '#94a3b8', fontSize: '0.8rem', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>Case Description:</strong>
                            <div style={{ backgroundColor: '#030712', border: '1px solid #1e293b', padding: '14px', borderRadius: '8px', color: '#cbd5e1', fontSize: '0.9rem', lineHeight: '1.5' }}>
                                "{selectedSuspect.description}"
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Suspects;