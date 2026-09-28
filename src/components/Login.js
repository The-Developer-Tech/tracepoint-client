import React, { useState } from 'react';
import { playFailureSound } from './audioFX';

function Login({ onLogin, onNavigateToRegister, onLog }) {
    const [badgeNumber, setBadgeNumber] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [hasError, setHasError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const registeredUsers = JSON.parse(localStorage.getItem('forensic_users') || '[]');

        const foundUser = registeredUsers.find(
            u => u.badgeNumber.toLowerCase() === badgeNumber.trim().toLowerCase() && u.password === password
        );

        if (foundUser) {
            setHasError(false);
            setErrorMessage('');
            if (onLog) onLog('AUTH', `Authentication Successful: ${foundUser.fullName} [${foundUser.badgeNumber}]`);
            onLogin(foundUser); // Instant login transition
        } else {
            playFailureSound();

            setHasError(false);
            setTimeout(() => setHasError(true), 10);

            setErrorMessage('INVALID BADGE NUMBER OR PASSWORD');
            if (onLog) onLog('SECURITY', `AUTHENTICATION FAILURE: Invalid attempt for Badge ID "${badgeNumber}"`);
        }
    };

    return (
        <div style={{ maxWidth: '420px', margin: '60px auto', padding: '32px', backgroundColor: '#0f172a', borderRadius: '12px', border: hasError ? '2px solid #ef4444' : '1px solid #1e293b', animation: hasError ? 'flashRed3Times 0.6s ease-in-out 3' : 'none' }}>
            <style>
                {`
                    @keyframes flashRed3Times {
                        0%, 100% {
                            border-color: #ef4444;
                            box-shadow: 0 0 20px rgba(239, 68, 68, 0.8);
                        }
                        50% {
                            border-color: #1e293b;
                            box-shadow: none;
                        }
                    }

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

            <h2 style={{ textAlign: 'center', color: '#f8fafc', marginBottom: '8px', letterSpacing: '1px' }}>
                OFFICER AUTHENTICATION
            </h2>
            <p style={{ textAlign: 'center', color: '#64748b', fontSize: '0.85rem', marginBottom: '24px' }}>
                ENTER CREDENTIALS TO ACCESS FORENSIC SYSTEM
            </p>

            {errorMessage && (
                <div style={{ backgroundColor: '#450a0a', border: '1px solid #ef4444', color: '#fca5a5', padding: '10px', borderRadius: '6px', fontSize: '0.8rem', textAlign: 'center', marginBottom: '16px', fontWeight: 'bold' }}>
                    ⚠️ {errorMessage}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.8rem', marginBottom: '6px', fontWeight: 'bold' }}>
                        BADGE NUMBER
                    </label>
                    <input
                        type="text"
                        value={badgeNumber}
                        onChange={(e) => {
                            setBadgeNumber(e.target.value);
                            setHasError(false);
                        }}
                        placeholder="e.g. INV-8849"
                        required
                        style={{
                            width: '100%',
                            padding: '10px 12px',
                            backgroundColor: '#030712',
                            border: hasError ? '2px solid #ef4444' : '1px solid #334155',
                            borderRadius: '6px',
                            color: '#f8fafc',
                            boxSizing: 'border-box',
                            outline: 'none'
                        }}
                    />
                </div>

                <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.8rem', marginBottom: '6px', fontWeight: 'bold' }}>
                        PASSWORD
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setHasError(false);
                        }}
                        placeholder="••••••••"
                        required
                        style={{
                            width: '100%',
                            padding: '10px 12px',
                            backgroundColor: '#030712',
                            border: hasError ? '2px solid #ef4444' : '1px solid #334155',
                            borderRadius: '6px',
                            color: '#f8fafc',
                            boxSizing: 'border-box',
                            outline: 'none'
                        }}
                    />
                </div>

                <button
                    type="submit"
                    style={{
                        width: '100%',
                        padding: '12px',
                        backgroundColor: hasError ? '#ef4444' : '#38bdf8',
                        color: hasError ? '#ffffff' : '#0f172a',
                        border: 'none',
                        borderRadius: '6px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        transition: 'background-color 0.2s ease'
                    }}
                >
                    AUTHENTICATE
                </button>
            </form>

            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <button
                    onClick={onNavigateToRegister}
                    style={{ backgroundColor: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '0.8rem' }}
                >
                    Need an account? <span style={{ color: '#38bdf8', textDecoration: 'underline' }}>Register Officer</span>
                </button>
            </div>
        </div>
    );
}

export default Login;