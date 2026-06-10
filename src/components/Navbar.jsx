import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const navLinks = [
    { name: 'About', href: '#about' },
    {
      name: 'Media Buying',
      href: '#media-buying',
      dropdown: [
        { name: 'Meta Ads', href: '#media-buying' },
        { name: 'Google Ads', href: '#media-buying' },
        { name: 'TikTok Ads', href: '#media-buying' },
        { name: 'Conversion Tracking', href: '#media-buying' },
      ],
    },
    { name: 'Video Editing', href: '#video-editing' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    setIsDropdownOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    setIsOpen(false);
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  /* ─── Text-only Creative Logo ─── */
  const LogoMark = () => (
    <a href="#" className="group flex items-baseline gap-[3px] select-none" aria-label="Hafiz Media Buyer">
      {/* Main wordmark */}
      <span
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 900,
          fontSize: '22px',
          letterSpacing: '-0.02em',
          lineHeight: 1,
          background: 'linear-gradient(135deg, #60a5fa 0%, #818cf8 50%, #a78bfa 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          transition: 'filter 0.3s ease',
        }}
        className="group-hover:[filter:brightness(1.2)]"
      >
        HAFIZ
      </span>
      {/* Accent dot */}
      <span
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 900,
          fontSize: '26px',
          lineHeight: 1,
          color: '#3b82f6',
          textShadow: '0 0 16px rgba(59,130,246,0.7)',
          marginLeft: '-1px',
        }}
      >
        ·
      </span>
      {/* Suffix */}
      <span
        style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 500,
          fontSize: '10px',
          letterSpacing: '0.22em',
          color: '#64748b',
          textTransform: 'uppercase',
          alignSelf: 'center',
          paddingBottom: '2px',
          transition: 'color 0.3s ease',
        }}
        className="group-hover:[color:#93c5fd]"
      >
        media
      </span>
    </a>
  );

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#060913]/95 border-b border-white/5 backdrop-blur-md py-3'
            : 'bg-transparent border-b border-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <LogoMark />

          {/* Desktop Nav */}
          <nav className="hidden md:block">
            <ul className="flex items-center space-x-8">
              {navLinks.map((link) => (
                <li
                  key={link.name}
                  className="relative group py-2"
                  onMouseEnter={() => link.dropdown && setIsDropdownOpen(true)}
                  onMouseLeave={() => link.dropdown && setIsDropdownOpen(false)}
                >
                  {link.dropdown ? (
                    <button
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="flex items-center space-x-1 text-sm font-medium text-slate-400 hover:text-white transition-colors duration-200 cursor-pointer"
                    >
                      <span>{link.name}</span>
                      <ChevronDown size={14} className={`transform transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                  ) : (
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="text-sm font-medium text-slate-400 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  )}

                  {link.dropdown && (
                    <ul
                      className={`absolute left-0 mt-2 bg-[#0b1121] border border-white/5 rounded-xl w-52 shadow-2xl py-2 transition-all duration-300 origin-top-left ${
                        isDropdownOpen
                          ? 'opacity-100 scale-100 translate-y-0 visible'
                          : 'opacity-0 scale-95 -translate-y-2 invisible pointer-events-none'
                      }`}
                    >
                      {link.dropdown.map((subItem) => (
                        <li key={subItem.name}>
                          <a
                            href={subItem.href}
                            onClick={(e) => handleLinkClick(e, subItem.href)}
                            className="block px-4 py-2.5 text-xs text-slate-400 hover:text-white hover:bg-blue-500/10 transition-all duration-200"
                          >
                            {subItem.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <button
              onClick={scrollToContact}
              className="cursor-pointer px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-blue-600 to-violet-600 rounded-lg hover:from-blue-500 hover:to-violet-500 transition-all duration-300 hover:shadow-[0_0_20px_rgba(99,102,241,0.5)]"
            >
              Schedule a Meeting
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative z-[60] text-white hover:text-blue-400 transition-colors p-1 cursor-pointer"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Dark Backdrop */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-[45] bg-black/70 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-y-0 right-0 z-[50] w-full max-w-[320px] flex flex-col bg-[#060913] border-l border-white/8 shadow-[0_0_60px_rgba(0,0,0,0.9)] transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
          <LogoMark />
          <button
            onClick={() => setIsOpen(false)}
            className="cursor-pointer text-slate-500 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        {/* Nav Links */}
        <div className="flex-1 overflow-y-auto px-6 py-8">
          <ul className="space-y-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                {link.dropdown ? (
                  <div className="space-y-3">
                    <div className="text-xs font-bold text-blue-400 uppercase tracking-widest">
                      {link.name}
                    </div>
                    <ul className="pl-4 border-l border-blue-500/20 space-y-3">
                      {link.dropdown.map((subItem) => (
                        <li key={subItem.name}>
                          <a
                            href={subItem.href}
                            onClick={(e) => handleLinkClick(e, subItem.href)}
                            className="block text-sm text-slate-400 hover:text-white transition-colors py-0.5"
                          >
                            {subItem.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="block text-base font-semibold text-white hover:text-blue-400 transition-colors"
                  >
                    {link.name}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Drawer Footer CTA */}
        <div className="px-6 py-6 border-t border-white/5 space-y-3">
          <button
            onClick={scrollToContact}
            className="cursor-pointer block w-full text-center py-3.5 text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 transition-all duration-300 rounded-lg shadow-lg"
          >
            Schedule a Meeting
          </button>
          <a
            href={portfolioData.personalInfo.whatsappUrl || 'https://wa.me/'}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center py-3 text-sm font-semibold uppercase tracking-wider text-green-400 border border-green-500/30 hover:border-green-500/70 hover:bg-green-500/10 transition-all duration-300 rounded-lg cursor-pointer"
          >
            WhatsApp Chat
          </a>
        </div>
      </div>
    </>
  );
}
