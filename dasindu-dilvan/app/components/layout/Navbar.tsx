// app/components/layout/Navbar.tsx
"use client";
import { useState } from "react";
import "./Navbar.css";

// Navigation links – correspond to section IDs
const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  // Track mobile menu open/close state
  const [menuOpen, setMenuOpen] = useState(false);

  // Close mobile menu when a link is clicked
  const handleLinkClick = () => setMenuOpen(false);

  return (
    <header className="navbar">
      <nav className="navbar-container">

        {/* --- LOGO --- */}
        <a href="#home" className="navbar-logo">
          Dasindu<span className="logo-dot">.</span>
        </a>

        {/* --- DESKTOP NAV LINKS --- */}
        <div className="navbar-links">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="nav-link">
              {link.name}
            </a>
          ))}
        </div>

        {/* --- RESUME BUTTON (desktop) --- */}
        <a
          href="/cv.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="navbar-resume"
        >
          Resume
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </a>

        {/* --- MOBILE HAMBURGER BUTTON --- */}
        <button
          className={`mobile-toggle ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span />
          <span />
          <span />
        </button>

        {/* --- MOBILE DROPDOWN --- */}
        {menuOpen && (
          <div className="mobile-dropdown">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} onClick={handleLinkClick}>
                {link.name}
              </a>
            ))}
            <a href="/cv.pdf" target="_blank" onClick={handleLinkClick} className="mobile-resume">
              Resume ↗
            </a>
          </div>
        )}

      </nav>
    </header>
  );
}
