'use client';

import { useState, useEffect, useCallback } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'HOME' },
    { id: 'about', label: 'ABOUT' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'skills', label: 'SKILLS' },
    { id: 'journey', label: 'JOURNEY' },
    { id: 'contact', label: 'CONTACT' },
  ];

  const handleScroll = useCallback(() => {
    const y = window.pageYOffset || document.documentElement.scrollTop;
    const vh = window.innerHeight;
    setIsScrolled(y > vh * 0.6);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Scroll spy via IntersectionObserver
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={`nav${isScrolled ? ' is-scrolled' : ''}`} id="nav">
      {/* HC Monogram */}
      <a className="nav__brand" href="#home" aria-label="HIMA CHARAN — home">
        <span className="nav__brand-h">H</span>
        <span className="nav__brand-c">C</span>
      </a>

      {/* Navigation links */}
      <nav className={`nav__links${isMenuOpen ? ' is-open' : ''}`} aria-label="Primary">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`nav__link${activeSection === item.id ? ' is-active' : ''}`}
            onClick={handleLinkClick}
          >
            {item.label}
          </a>
        ))}
      </nav>

      {/* Right editorial statement */}
      <div className="nav__statement">
        <span>// TURNING COMPLEXITY</span>
        <br />
        <span>INTO OPPORTUNITY</span>
      </div>

      {/* Minimal menu icon (desktop) */}
      <div className="nav__menu-icon" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Mobile burger */}
      <button
        className="nav__burger"
        type="button"
        aria-label="Menu"
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <span></span>
        <span></span>
      </button>
    </header>
  );
}
