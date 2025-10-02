import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/header.css'

function Header() {
  const location = useLocation();

  return (
    <header className="app-header">
      <div className="container">
        <nav className="nav">
          <div className="nav-brand">
            <h1>Dragon Management System</h1>
          </div>
          <ul className="nav-links">
            <li>
              <Link 
                to="/" 
                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
              >
                Dragons
              </Link>
            </li>
            <li>
              <Link 
                to="/special-operations" 
                className={`nav-link ${location.pathname === '/special-operations' ? 'active' : ''}`}
              >
                Special Operations
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;