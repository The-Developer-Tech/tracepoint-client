import React, { useState } from 'react';

function Investigation({ onLog, user, pendingDossiers, setPendingDossiers }) {
    const [selectedSuspect, setSelectedSuspect] = useState('Alex Morgan');
    const [evidenceNotes, setEvidenceNotes] = useState('');

    const isChief = user?.role === 'Admin';

    const handleOfficerSubmit = (e) => {
        e.preventDefault();

        // Dynamically grab the exact name and badge number of the currently logged-in officer
        const newDossier = {
            id: Date.now(),
            officer: `${user?.fullName} (${user?.badgeNumber})`,
            suspect: selectedSuspect,
            notes: evidenceNotes,
            status: 'Pending Chief Review'
        };

        setPendingDossiers([newDossier, ...pendingDossiers]);
        if (onLog) {
            onLog('INVESTIGATION', `Officer ${user?.fullName} [${user?.badgeNumber}] transmitted preliminary dossier targeting ${selectedSuspect} to Chief Inspector queue.`);
        }
        setEvidenceNotes('');
        alert('Dossier successfully transmitted to the Chief Inspector review queue.');
    };

    const handleDispatchToCourt = (dossierId) => {
        setPendingDossiers(pendingDossiers.filter(d => d.id !== dossierId));
        if (onLog) {
            onLog('SECURITY', `CHIEF INSPECTOR ${user?.fullName} authorized and dispatched Final Conclusion to the Court Database.`);
        }
        alert('Official Final Conclusion successfully dispatched to the Court Database!');
    };

    return (
        <div style={{ maxWidth: '950px', margin: '0 auto' }}>
            <h2 style={{ color: '#f8fafc', marginBottom: '4px', letterSpacing: '1px' }}>
                📋 INVESTIGATION COMMAND & DOSSIER QUEUE
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '24px' }}>
                CHAIN OF COMMAND: {isChief ? 'CHIEF INSPECTOR REVIEW PANEL' : 'OFFICER FINDINGS SUBMISSION PORTAL'}
            </p>

            {!isChief ? (
                <div style={{ backgroundColor: '#0f172a', padding: '24px', borderRadius: '8px', border: '1px solid #1e293b', boxShadow: '0 10px 25px rgba(0,0,0,0.3)' }}>
                    <h3 style={{ color: '#38bdf8', fontSize: '1rem', marginTop: '0', marginBottom: '16px', borderBottom: '1px solid #1e293b', paddingBottom: '8px' }}>
                        ✍️ SUBMIT PRELIMINARY FINDINGS (Officer Portal)
                    </h3>

                    <form onSubmit={handleOfficerSubmit}>
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#94a3b8', marginBottom: '6px' }}>
                                PRIMARY TARGET / LEAD SUSPECT:
                            </label>
                            <select
                                value={selectedSuspect}
                                onChange={(e) => setSelectedSuspect(e.target.value)}
                                style={{ width: '100%', padding: '10px', backgroundColor: '#030712', color: '#f8fafc', border: '1px solid #334155', borderRadius: '6px', fontSize: '0.85rem' }}
                            >
                                <option value="Alex Morgan">Alex Morgan (Software Developer - ID: 1)</option>
                                <option value="Jamie Smith">Jamie Smith (Security Officer - ID: 2)</option>
                                <option value="Taylor Williams">Taylor Williams (Research Assistant - ID: 3)</option>
                            </select>
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#94a3b8', marginBottom: '6px' }}>
                                EVIDENCE SUMMARY & ALIBI ANALYSIS:
                            </label>
                            <textarea
                                rows="4"
                                required
                                placeholder="Detail your findings and evidentiary backing for the Chief Inspector..."
                                value={evidenceNotes}
                                onChange={(e) => setEvidenceNotes(e.target.value)}
                                style={{ width: '100%', padding: '10px', backgroundColor: '#030712', color: '#f8fafc', border: '1px solid #334155', borderRadius: '6px', fontSize: '0.85rem', resize: 'vertical' }}
                            />
                        </div>

                        <button
                            type="submit"
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#38bdf8',
                                color: '#0f172a',
                                border: 'none',
                                borderRadius: '6px',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                fontSize: '0.85rem'
                            }}
                        >
                            📤 TRANSMIT FINDINGS TO CHIEF INSPECTOR
                        </button>
                    </form>
                </div>
            ) : (
                <div style={{ backgroundColor: '#0f172a', padding: '24px', borderRadius: '8px', border: '1px solid #1e293b', marginBottom: '24px', boxShadow: '0 10px 25px rgba(0,0,0,0.3)' }}>
                    <h3 style={{ color: '#f59e0b', fontSize: '1rem', marginTop: '0', marginBottom: '8px' }}>
                        👑 CHIEF INSPECTOR CONTROL PANEL
                    </h3>
                    <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '0' }}>
                        Welcome, Chief {user?.fullName}. You are logged in with administrative clearance. Review incoming officer reports below and authorize their transmission to the official court database.
                    </p>
                </div>
            )}

            <div style={{ backgroundColor: '#0f172a', padding: '24px', borderRadius: '8px', border: '1px solid #1e293b', boxShadow: '0 10px 25px rgba(0,0,0,0.3)', marginTop: isChief ? '0' : '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e293b', paddingBottom: '8px', marginBottom: '16px' }}>
                    <h3 style={{ color: '#f59e0b', fontSize: '1rem', margin: '0' }}>
                        🛡️ CHIEF INSPECTOR APPROVAL QUEUE ({pendingDossiers.length} Pending)
                    </h3>
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                        Current Clearance: <strong style={{ color: isChief ? '#ef4444' : '#38bdf8' }}>{isChief ? 'Admin' : 'Officer'}</strong>
                    </span>
                </div>

                {pendingDossiers.length === 0 ? (
                    <p style={{ color: '#64748b', fontSize: '0.85rem', textAlign: 'center', margin: '20px 0' }}>
                        No pending dossiers in the queue. All findings have been dispatched to court.
                    </p>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {pendingDossiers.map((d) => (
                            <div key={d.id} style={{ backgroundColor: '#030712', padding: '16px', borderRadius: '6px', border: '1px solid #334155' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#f8fafc' }}>
                                        Target: {d.suspect}
                                    </span>
                                    <span style={{ fontSize: '0.75rem', backgroundColor: '#f59e0b', color: '#451a03', padding: '2px 8px', borderRadius: '4px', fontWeight: 'bold' }}>
                                        {d.status}
                                    </span>
                                </div>
                                <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '8px' }}>
                                    Submitted by: <strong style={{ color: '#cbd5e1' }}>{d.officer}</strong>
                                </div>
                                <div style={{ fontSize: '0.85rem', color: '#cbd5e1', backgroundColor: '#0f172a', padding: '10px', borderRadius: '4px', marginBottom: '14px', border: '1px solid #1e293b' }}>
                                    "{d.notes}"
                                </div>

                                {isChief ? (
                                    <button
                                        onClick={() => handleDispatchToCourt(d.id)}
                                        style={{
                                            width: '100%',
                                            padding: '10px',
                                            backgroundColor: '#10b981',
                                            color: '#ffffff',
                                            border: 'none',
                                            borderRadius: '6px',
                                            fontWeight: 'bold',
                                            cursor: 'pointer',
                                            fontSize: '0.8rem',
                                            letterSpacing: '0.5px'
                                        }}
                                    >
                                        ⚖️ AUTHORIZE & DISPATCH FINAL CONCLUSION TO COURT DATABASE
                                    </button>
                                ) : (
                                    <div style={{ fontSize: '0.75rem', color: '#ef4444', fontStyle: 'italic', textAlign: 'right' }}>
                                        🔒 Restricted: Chief Inspector / Admin clearance required to dispatch to court database.
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Investigation;