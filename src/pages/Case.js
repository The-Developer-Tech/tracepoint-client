import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CaseCard from '../components/CaseCard';

function Case() {
    // Part Q: React State
    const [caseData, setCaseData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch data from your API when the page loads
    useEffect(() => {
        axios.get('https://localhost:7291/api/cases/1') // Adjust port if needed
            .then(response => {
                setCaseData(response.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching case:", err);
                setError("Failed to load case data from the server.");
                setLoading(false);
            });
    }, []);

    return (
        <div style={{
            padding: '40px 20px',
            minHeight: '80vh',
            maxWidth: '1200px',
            margin: '0 auto'
        }}>
            <header style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h1 style={{
                    fontSize: '2.5rem',
                    letterSpacing: '2px',
                    color: '#0f172a',
                    marginBottom: '8px',
                    fontWeight: '800'
                }}>
                    CASE 
                </h1>
                <p style={{ color: '#64748b', fontSize: '1.1rem', margin: 0 }}>
                    TracePoint Investigations — Confidential Incident File
                </p>
            </header>

            {loading && (
                <div style={{ textAlign: 'center', color: '#64748b', fontSize: '1.1rem' }}>
                    Accessing secure database...
                </div>
            )}

            {error && (
                <div style={{
                    textAlign: 'center',
                    color: '#ef4444',
                    backgroundColor: '#fef2f2',
                    border: '1px solid #fecaca',
                    padding: '16px',
                    borderRadius: '8px',
                    maxWidth: '500px',
                    margin: '0 auto'
                }}>
                    {error}
                </div>
            )}

            {/* Part P: Passing props to child component */}
            {!loading && !error && <CaseCard caseData={caseData} />}
        </div>
    );
}

export default Case;