import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
    return (
        <nav style={{ backgroundColor: '#2c3e50', padding: '15px', display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>HOME</Link>
            <Link to="/case" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>CASE</Link>
            <Link to="/suspects" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>SUSPECTS</Link>
            <Link to="/evidence" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>EVIDENCE</Link>
            <Link to="/investigation" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>INVESTIGATION</Link>
        </nav>
    );
}

export default Navigation;