import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Navbar() {
  const { logoText, ctaSecondary } = portfolioData.personalInfo;
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-brandNav/90 border-b border-gray-800/80 backdrop-blur-md py-4'
          : 'bg-transparent border-b border-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="text-2xl font-bold tracking-wider text-brandText font-display">
          {logoText}<span className="text-brandAccent">.</span>
        </a>

        {/* Desktop Navigation */}
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
                    className="flex items-center space-x-1 text-sm font-medium text-brandMuted hover:text-brandAccent transition-colors duration-200"
                  >
                    <span>{link.name}</span>
                    <ChevronDown size={14} className={`transform transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                ) : (
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-sm font-medium text-brandMuted hover:text-brandAccent transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                )}

                {/* Dropdown Menu */}
                {link.dropdown && (
                  <ul
                    className={`absolute left-0 mt-2 bg-brandCard border border-gray-800 rounded-none w-52 shadow-2xl py-2 transition-all duration-300 origin-top-left ${
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
                          className="block px-4 py-2.5 text-xs text-brandMuted hover:text-brandAccent hover:bg-gray-800/50 transition-all duration-200"
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

        {/* CTA Button */}
        <div className="hidden md:block">
          <a
            href={ctaSecondary.link}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-brandText border border-gray-700 hover:border-brandAccent hover:bg-brandAccent transition-all duration-300"
          >
            {ctaSecondary.text}
          </a>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-brandText hover:text-brandAccent transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-y-0 right-0 z-40 w-full max-w-sm bg-brandCard/95 backdrop-blur-lg border-l border-gray-800/80 p-8 pt-24 shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <ul className="space-y-6">
          {navLinks.map((link) => (
            <li key={link.name}>
              {link.dropdown ? (
                <div className="space-y-3">
                  <div className="text-sm font-semibold text-brandText uppercase tracking-wider">
                    {link.name}
                  </div>
                  <ul className="pl-4 border-l border-gray-800 space-y-3">
                    {link.dropdown.map((subItem) => (
                      <li key={subItem.name}>
                        <a
                          href={subItem.href}
                          onClick={(e) => handleLinkClick(e, subItem.href)}
                          className="block text-sm text-brandMuted hover:text-brandAccent transition-colors"
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
                  className="block text-base font-semibold text-brandText hover:text-brandAccent transition-colors"
                >
                  {link.name}
                </a>
              )}
            </li>
          ))}
          <li className="pt-6">
            <a
              href={ctaSecondary.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center py-3 text-sm font-semibold uppercase tracking-wider text-brandText border border-brandAccent hover:bg-brandAccent transition-all duration-300"
            >
              {ctaSecondary.text}
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
