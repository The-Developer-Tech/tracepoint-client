import React from 'react';
import { Link } from 'react-router-dom';

function CaseCard({ caseData }) {
    if (!caseData) return <p style={{ textAlign: 'center', color: '#94a3b8' }}>Loading case details...</p>;

    const caseName = caseData.caseName || caseData.CaseName || caseData.title || caseData.Title;
    const status = caseData.status || caseData.Status || 'OPEN';
    const description = caseData.description || caseData.Description;

    return (
        <div style={{
            background: 'linear-gradient(145deg, #1e293b, #0f172a)',
            color: '#f8fafc',
            border: '1px solid #334155',
            borderRadius: '16px',
            padding: '32px',
            maxWidth: '650px',
            margin: '0 auto',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
            textAlign: 'left',
            position: 'relative'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid #334155',
                paddingBottom: '16px',
                marginBottom: '24px'
            }}>
                <div>
                    <span style={{
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        color: '#38bdf8',
                        textTransform: 'uppercase',
                        letterSpacing: '1.5px'
                    }}>
                        ACTIVE CASE FILE
                    </span>
                    <h2 style={{
                        margin: '4px 0 0 0',
                        fontSize: '1.8rem',
                        fontWeight: '800',
                        color: '#f8fafc'
                    }}>
                        {caseName}
                    </h2>
                </div>

                <span style={{
                    backgroundColor: status.toString().toUpperCase() === 'OPEN' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(34, 197, 94, 0.15)',
                    color: status.toString().toUpperCase() === 'OPEN' ? '#f87171' : '#4ade80',
                    border: status.toString().toUpperCase() === 'OPEN' ? '1px solid #ef4444' : '1px solid #22c55e',
                    padding: '6px 14px',
                    borderRadius: '9999px',
                    fontWeight: '700',
                    fontSize: '0.8rem',
                    letterSpacing: '1px'
                }}>
                    ● STATUS: {status.toString().toUpperCase()}
                </span>
            </div>

            <div style={{ marginBottom: '32px' }}>
                <h4 style={{
                    color: '#94a3b8',
                    fontSize: '0.85rem',
                    textTransform: 'uppercase',
                    marginBottom: '8px',
                    letterSpacing: '0.5px'
                }}>
                    Incident Briefing
                </h4>
                <p style={{
                    fontSize: '1rem',
                    lineHeight: '1.7',
                    color: '#cbd5e1',
                    margin: '0'
                }}>
                    {description}
                </p>
            </div>

            <div style={{
                display: 'flex',
                gap: '16px',
                flexWrap: 'wrap',
                marginTop: '20px'
            }}>
                <Link to="/suspects" style={{ flex: '1', textDecoration: 'none' }}>
                    <button style={{
                        width: '100%',
                        padding: '12px 20px',
                        backgroundColor: '#38bdf8',
                        color: '#0f172a',
                        border: 'none',
                        borderRadius: '8px',
                        fontWeight: '700',
                        fontSize: '0.95rem',
                        cursor: 'pointer',
                        transition: 'opacity 0.2s ease'
                    }}>
                        View Suspects →
                    </button>
                </Link>

                <Link to="/evidence" style={{ flex: '1', textDecoration: 'none' }}>
                    <button style={{
                        width: '100%',
                        padding: '12px 20px',
                        backgroundColor: 'transparent',
                        color: '#f8fafc',
                        border: '1px solid #475569',
                        borderRadius: '8px',
                        fontWeight: '700',
                        fontSize: '0.95rem',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s ease'
                    }}>
                        View Evidence →
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default CaseCard;