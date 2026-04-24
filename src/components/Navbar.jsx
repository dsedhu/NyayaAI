import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ScaleIcon, MenuIcon, XIcon } from './Icons';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <ScaleIcon size={32} color="#FFD700" />
        NyayaAI
      </Link>

      <button
        className="navbar-hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {menuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
      </button>

      <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) => isActive ? 'active' : ''}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/analyze"
            className={({ isActive }) => isActive ? 'active' : ''}
            onClick={() => setMenuOpen(false)}
          >
            Analyze Case
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) => isActive ? 'active' : ''}
            onClick={() => setMenuOpen(false)}
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/education"
            className={({ isActive }) => isActive ? 'active' : ''}
            onClick={() => setMenuOpen(false)}
          >
            Know Your Rights
          </NavLink>
        </li>
        <li>
          <NavLink to="/analyze" className="btn btn-primary btn-sm" onClick={() => setMenuOpen(false)}>
            Get Insights
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
