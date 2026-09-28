import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Home() {
    const navigate = useNavigate();
    const [activeCase, setActiveCase] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('https://localhost:7291/api/cases/1')
            .then(response => {
                setActiveCase(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching active incident:", error);
                setLoading(false);
            });
    }, []);

    const caseId = activeCase?.caseID || activeCase?.CaseID || '1';
    const caseTitle = activeCase?.caseName || activeCase?.CaseName || 'The Missing Prototype';
    const status = activeCase?.status || activeCase?.Status || 'OPEN';

    return (
        <div style={{
            display: 'flex',
            width: '100vw',
            minHeight: '100vh',
            margin: 0,
            padding: 0,
            backgroundColor: '#090d16',
            color: '#f8fafc',
            fontFamily: 'monospace, sans-serif',
            boxSizing: 'border-box'
        }}>
            {/* Functional Forensic Sidebar */}
            <aside style={{
                width: '280px',
                borderRight: '1px solid #1e293b',
                backgroundColor: '#0f172a',
                padding: '24px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                flexShrink: 0
            }}>
                <div>
                    <span style={{ fontSize: '0.75rem', color: '#38bdf8', fontWeight: 'bold', letterSpacing: '1px' }}>
                        SYSTEM / STATUS
                    </span>
                    <div style={{ fontSize: '0.85rem', color: '#4ade80', marginTop: '6px' }}>
                        ● DFR ENGINE v2.4.1 ONLINE
                    </div>
                </div>

                {/* Working Navigation Tree */}
                <div>
                    <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 'bold', letterSpacing: '1px' }}>
                        NAVIGATION TREE
                    </span>
                    <ul style={{ listStyle: 'none', padding: 0, margin: '12px 0 0 0', fontSize: '0.85rem', lineHeight: '2.2' }}>
                        <li>
                            <Link to="/case" style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: 'bold' }}>
                                ▸ /ROOT/{caseId}
                            </Link>
                        </li>
                        <li>
                            <Link to="/suspects" style={{ color: '#94a3b8', textDecoration: 'none', paddingLeft: '12px' }}>
                                ├─ /SUSPECTS
                            </Link>
                        </li>
                        <li>
                            <Link to="/evidence" style={{ color: '#94a3b8', textDecoration: 'none', paddingLeft: '12px' }}>
                                ├─ /EVIDENCE_LOCKER
                            </Link>
                        </li>
                        <li>
                            <Link to="/investigation" style={{ color: '#94a3b8', textDecoration: 'none', paddingLeft: '12px' }}>
                                └─ /SUBMIT_REPORT
                            </Link>
                        </li>
                    </ul>
                </div>

                <div style={{ marginTop: 'auto', borderTop: '1px solid #1e293b', paddingTop: '16px', fontSize: '0.75rem', color: '#64748b' }}>
                    CRYPTOGRAPHIC HASH:<br />
                    <span style={{ color: '#cbd5e1', fontSize: '0.68rem', wordBreak: 'break-all' }}>
                        e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
                    </span>
                </div>
            </aside>

            {/* Full-Width Center Console Pane */}
            <main style={{ flex: 1, padding: '40px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
                {/* Header Bar */}
                <header style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: '#0f172a',
                    border: '1px solid #1e293b',
                    padding: '16px 24px',
                    borderRadius: '8px',
                    fontSize: '0.85rem'
                }}>
                    <div>
                        <span style={{ color: '#64748b' }}>ACTIVE INCIDENT: </span>
                        <span style={{ color: '#f87171', fontWeight: 'bold' }}>
                            {loading ? 'LOADING...' : caseId}
                        </span>
                    </div>
                    <div>
                        <span style={{ color: '#64748b' }}>STATUS: </span>
                        <span style={{ color: '#4ade80', fontWeight: 'bold' }}>
                            {loading ? 'FETCHING...' : status.toUpperCase()}
                        </span>
                    </div>
                    <div>
                        <span style={{ color: '#64748b' }}>INTEGRITY: </span>
                        <span style={{ color: '#38bdf8' }}>VERIFIED (SHA-256)</span>
                    </div>
                </header>

                {/* Main Action Card */}
                <div style={{
                    backgroundColor: '#0f172a',
                    border: '1px solid #334155',
                    borderRadius: '12px',
                    padding: '50px 40px',
                    textAlign: 'center',
                    maxWidth: '900px',
                    width: '100%',
                    margin: '20px auto 0 auto',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                    boxSizing: 'border-box'
                }}>
                    <span style={{ fontSize: '0.8rem', color: '#38bdf8', letterSpacing: '2px', textTransform: 'uppercase' }}>
                        TRACEPOINT FORENSICS CONTROL
                    </span>
                    <h1 style={{ fontSize: '2.5rem', color: '#f8fafc', margin: '16px 0 8px 0', letterSpacing: '1px' }}>
                        DIGITAL INVESTIGATION SYSTEM
                    </h1>
                    <h2 style={{ fontSize: '1.3rem', color: '#f87171', marginTop: 0, marginBottom: '28px' }}>
                        {caseTitle}
                    </h2>

                    <p style={{ color: '#cbd5e1', lineHeight: '1.7', fontSize: '1.05rem', maxWidth: '650px', margin: '0 auto 36px auto' }}>
                        A prototype has disappeared from a secure research laboratory.
                        Your task is to investigate the evidence and identify the most likely suspect.
                    </p>

                    <button
                        onClick={() => navigate('/case')}
                        style={{
                            padding: '16px 36px',
                            backgroundColor: '#38bdf8',
                            color: '#0f172a',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '1.05rem',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            letterSpacing: '1px',
                            boxShadow: '0 0 20px rgba(56, 189, 248, 0.4)'
                        }}
                    >
                        START INVESTIGATION →
                    </button>
                </div>
            </main>
        </div>
    );
}

export default Home;