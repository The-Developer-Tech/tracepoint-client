import React, { useState } from 'react';
import { playFailureSound } from './audioFX';

function Register({ onNavigateToLogin, onLog }) {
    const [fullName, setFullName] = useState('');
    const [badgeNumber, setBadgeNumber] = useState('');
    const [role, setRole] = useState('Lead Investigator');
    const [password, setPassword] = useState('');
    const [successBanner, setSuccessBanner] = useState('');
    const [errorBanner, setErrorBanner] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const cleanBadge = badgeNumber.trim();
        const cleanName = fullName.trim();

        if (!cleanName || !cleanBadge || !password) {
            playFailureSound();
            setErrorBanner('PLEASE FILL IN ALL REQUIRED REGISTRATION FIELDS');
            return;
        }

        const existingUsers = JSON.parse(localStorage.getItem('forensic_users') || '[]');

        const userExists = existingUsers.some(
            u => u.badgeNumber.toLowerCase() === cleanBadge.toLowerCase()
        );

        if (userExists) {
            playFailureSound();
            setErrorBanner(`BADGE ID "${cleanBadge}" IS ALREADY REGISTERED IN THE SYSTEM`);
            if (onLog) onLog('SECURITY', `REGISTRATION BLOCKED: Duplicate Badge ID "${cleanBadge}"`);
            return;
        }

        const newUser = {
            fullName: cleanName,
            badgeNumber: cleanBadge,
            role,
            password
        };

        existingUsers.push(newUser);
        localStorage.setItem('forensic_users', JSON.stringify(existingUsers));

        setErrorBanner('');
        setSuccessBanner(`${cleanName}, you have registered successfully.`);

        if (onLog) {
            onLog('AUTH', `NEW PERSONNEL REGISTERED: ${cleanName} [Badge #${cleanBadge}] (${role})`);
        }

        setTimeout(() => {
            onNavigateToLogin();
        }, 1800);
    };

    return (
        <div style={{ maxWidth: '440px', margin: '40px auto', padding: '32px', backgroundColor: '#0f172a', borderRadius: '12px', border: '1px solid #1e293b' }}>
            <style>
                {`
                    input:-webkit-autofill,
                    input:-webkit-autofill:hover, 
                    input:-webkit-autofill:focus {
                        -webkit-text-fill-color: #f8fafc !important;
                        -webkit-box-shadow: 0 0 0px 1000px #030712 inset !important;
                        transition: background-color 5000s ease-in-out 0s;
                    }
                `}
            </style>

            <div style={{ textAlign: 'center', marginBottom: '12px', fontSize: '2.5rem' }}>
                🛡️
            </div>

            <h2 style={{ textAlign: 'center', color: '#f8fafc', marginBottom: '6px', letterSpacing: '1px' }}>
                PERSONNEL REGISTRATION
            </h2>
            <p style={{ textAlign: 'center', color: '#64748b', fontSize: '0.85rem', marginBottom: '24px' }}>
                REGISTER OFFICIAL FORENSIC CREDENTIALS
            </p>

            {successBanner && (
                <div style={{ backgroundColor: '#064e3b', border: '1px solid #10b981', color: '#a7f3d0', padding: '12px', borderRadius: '6px', fontSize: '0.85rem', textAlign: 'center', marginBottom: '20px', fontWeight: 'bold', boxShadow: '0 0 10px rgba(16, 185, 129, 0.3)' }}>
                    ✅ {successBanner}
                </div>
            )}

            {errorBanner && (
                <div style={{ backgroundColor: '#450a0a', border: '1px solid #ef4444', color: '#fca5a5', padding: '10px', borderRadius: '6px', fontSize: '0.8rem', textAlign: 'center', marginBottom: '20px', fontWeight: 'bold' }}>
                    ⚠️ {errorBanner}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.8rem', marginBottom: '6px', fontWeight: 'bold' }}>
                        FULL NAME:
                    </label>
                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) => {
                            setFullName(e.target.value);
                            setErrorBanner('');
                        }}
                        placeholder="e.g. John Smith"
                        required
                        style={{ width: '100%', padding: '10px 12px', backgroundColor: '#030712', border: '1px solid #334155', borderRadius: '6px', color: '#f8fafc', boxSizing: 'border-box', outline: 'none' }}
                    />
                </div>

                <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.8rem', marginBottom: '6px', fontWeight: 'bold' }}>
                        BADGE NUMBER / AGENT ID:
                    </label>
                    <input
                        type="text"
                        value={badgeNumber}
                        onChange={(e) => {
                            setBadgeNumber(e.target.value);
                            setErrorBanner('');
                        }}
                        placeholder="e.g. INV-8849"
                        required
                        style={{ width: '100%', padding: '10px 12px', backgroundColor: '#030712', border: '1px solid #334155', borderRadius: '6px', color: '#f8fafc', boxSizing: 'border-box', outline: 'none' }}
                    />
                </div>

                <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.8rem', marginBottom: '6px', fontWeight: 'bold' }}>
                        CLEARANCE LEVEL:
                    </label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        style={{ width: '100%', padding: '10px 12px', backgroundColor: '#030712', border: '1px solid #334155', borderRadius: '6px', color: '#f8fafc', boxSizing: 'border-box', outline: 'none' }}
                    >
                        <option value="Lead Investigator">Lead Investigator (Full Access)</option>
                        <option value="Forensic Analyst">Forensic Analyst (Evidence & Suspects)</option>
                        <option value="Field Officer">Field Officer (Evidence Logger)</option>
                        <option value="Admin">Admin (System Control)</option>
                    </select>
                </div>

                <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.8rem', marginBottom: '6px', fontWeight: 'bold' }}>
                        CLEARANCE PASSWORD:
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setErrorBanner('');
                        }}
                        placeholder="••••••••"
                        required
                        style={{ width: '100%', padding: '10px 12px', backgroundColor: '#030712', border: '1px solid #334155', borderRadius: '6px', color: '#f8fafc', boxSizing: 'border-box', outline: 'none' }}
                    />
                </div>

                <button
                    type="submit"
                    disabled={!!successBanner}
                    style={{
                        width: '100%',
                        padding: '12px',
                        backgroundColor: successBanner ? '#10b981' : '#22c55e',
                        color: '#0f172a',
                        border: 'none',
                        borderRadius: '6px',
                        fontWeight: 'bold',
                        cursor: successBanner ? 'default' : 'pointer',
                        fontSize: '0.9rem'
                    }}
                >
                    {successBanner ? 'REDIRECTING TO LOGIN...' : 'REGISTER CREDENTIALS'}
                </button>
            </form>

            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <button
                    onClick={onNavigateToLogin}
                    style={{ backgroundColor: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '0.8rem' }}
                >
                    ← Back to Authentication
                </button>
            </div>
        </div>
    );
}

export default Register;