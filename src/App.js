import React, { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import { playFailureSound } from './components/audioFX';

// Page components
import Evidence from './pages/Evidence';
import Suspects from './pages/Suspects';
import Investigation from './pages/Investigation';

function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const [authView, setAuthView] = useState('login');
    const [activeTab, setActiveTab] = useState('suspects');
    const [logs, setLogs] = useState([`[${new Date().toLocaleTimeString()}] SYSTEM: Tracepoint Forensics Engine Initialized — Awaiting Officer Authentication`]);

    // Lifted state so submissions persist across account switches
    const [pendingDossiers, setPendingDossiers] = useState([]);

    const addLog = (type, message) => {
        const time = new Date().toLocaleTimeString();
        setLogs(prev => [`[${time}] ${type}: ${message}`, ...prev]);
    };

    const handleLogin = (user) => {
        setCurrentUser(user);
        addLog('AUTH', `SESSION ESTABLISHED: ${user.fullName} [${user.badgeNumber}] (${user.role})`);
    };

    const handleLogout = () => {
        if (currentUser) {
            addLog('AUTH', `SESSION TERMINATED: ${currentUser.fullName} [${currentUser.badgeNumber}] logged out.`);
        }
        setCurrentUser(null);
    };

    const handleClearLogs = () => {
        if (!currentUser || currentUser.role !== 'Admin') {
            playFailureSound();
            addLog('SECURITY', `UNAUTHORIZED PURGE BLOCKED: User "${currentUser?.fullName || 'Guest'}" lacks Administrative Clearance.`);
            alert('ACCESS DENIED: Administrative Clearance (Level 5) required to clear telemetry logs.');
            return;
        }

        setLogs([`[${new Date().toLocaleTimeString()}] ADMIN: Telemetry log purged by Administrator ${currentUser.fullName}`]);
    };

    return (
        <div style={{ backgroundColor: '#030712', minHeight: '100vh', color: '#f8fafc', fontFamily: 'sans-serif', paddingBottom: '0px' }}>
            <nav className="no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 28px', backgroundColor: '#0f172a', borderBottom: '1px solid #1e293b' }}>
                <div style={{ fontWeight: '800', color: '#38bdf8', letterSpacing: '1px', fontSize: '1.1rem' }}>
                    🛡️ TRACEPOINT FORENSICS CONTROL
                </div>

                {currentUser && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <div style={{ display: 'flex', gap: '8px', backgroundColor: '#030712', padding: '4px', borderRadius: '8px', border: '1px solid #1e293b' }}>
                            <button
                                onClick={() => setActiveTab('suspects')}
                                style={{
                                    backgroundColor: activeTab === 'suspects' ? '#38bdf8' : 'transparent',
                                    color: activeTab === 'suspects' ? '#0f172a' : '#94a3b8',
                                    border: 'none', padding: '6px 14px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.8rem'
                                }}
                            >
                                SUSPECTS & ALIBIS
                            </button>
                            <button
                                onClick={() => setActiveTab('evidence')}
                                style={{
                                    backgroundColor: activeTab === 'evidence' ? '#38bdf8' : 'transparent',
                                    color: activeTab === 'evidence' ? '#0f172a' : '#94a3b8',
                                    border: 'none', padding: '6px 14px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.8rem'
                                }}
                            >
                                EVIDENCE LOCKER
                            </button>
                            <button
                                onClick={() => setActiveTab('investigation')}
                                style={{
                                    backgroundColor: activeTab === 'investigation' ? '#38bdf8' : 'transparent',
                                    color: activeTab === 'investigation' ? '#0f172a' : '#94a3b8',
                                    border: 'none', padding: '6px 14px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.8rem'
                                }}
                            >
                                SUBMIT DOSSIER
                            </button>
                        </div>

                        <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                            {currentUser.role === 'Admin' ? 'Chief Inspector:' : 'Officer:'} <strong style={{ color: '#f8fafc' }}>{currentUser.fullName}</strong> ({currentUser.badgeNumber})
                            {currentUser.role === 'Admin' && <span style={{ marginLeft: '6px', color: '#ef4444', fontWeight: 'bold' }}>[CHIEF]</span>}
                        </span>
                        <button
                            onClick={handleLogout}
                            style={{ backgroundColor: '#1e293b', color: '#f8fafc', border: '1px solid #334155', borderRadius: '6px', padding: '6px 12px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold' }}
                        >
                            LOGOUT
                        </button>
                    </div>
                )}
            </nav>

            {!currentUser ? (
                authView === 'login' ? (
                    <Login onLogin={handleLogin} onNavigateToRegister={() => setAuthView('register')} onLog={addLog} />
                ) : (
                    <Register onNavigateToLogin={() => setAuthView('login')} onLog={addLog} />
                )
            ) : (
                <main style={{ padding: '24px' }}>
                    {activeTab === 'suspects' && <Suspects onLog={addLog} user={currentUser} />}
                    {activeTab === 'evidence' && <Evidence onLog={addLog} user={currentUser} />}
                    {activeTab === 'investigation' && (
                        <Investigation
                            onLog={addLog}
                            user={currentUser}
                            pendingDossiers={pendingDossiers}
                            setPendingDossiers={setPendingDossiers}
                        />
                    )}
                </main>
            )}
        </div>
    );
}

export default App;