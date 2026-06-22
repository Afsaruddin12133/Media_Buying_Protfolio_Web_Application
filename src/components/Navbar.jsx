import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { 
      name: 'Portfolio', 
      href: '/#portfolio',
      subLinks: [
        { name: 'Direct Response', href: '/?filter=Direct%20Response#portfolio' },
        { name: 'Brand Awareness', href: '/?filter=Brand%20Awareness#portfolio' },
        { name: 'Short-Form', href: '/?filter=Short-Form#portfolio' },
        { name: 'UGC', href: '/?filter=UGC#portfolio' },
        { name: 'Motion Graphics', href: '/?filter=Motion%20Graphics#portfolio' }
      ]
    },
    { 
      name: 'Case Studies', 
      href: '/#case-studies',
      subLinks: [
        { name: 'Meta Ads', href: '/?filter=Meta%20Ads#case-studies' },
        { name: 'Google Ads', href: '/?filter=Google%20Ads#case-studies' },
        { name: 'TikTok Ads', href: '/?filter=TikTok%20Ads#case-studies' },
        { name: 'Conversion Tracking', href: '/?filter=Conversion%20Tracking#case-studies' }
      ]
    },
    { 
      name: 'Services', 
      href: '/#services',
      subLinks: [
        { name: 'Media Buying', href: '/?filter=Media%20Buying#services' },
        { name: 'Video Editing', href: '/?filter=Video%20Editing#services' },
        { name: 'Creative Strategy', href: '/?filter=Creative%20Strategy#services' },
        { name: 'Analytics', href: '/?filter=Analytics#services' }
      ]
    },
    { name: 'About', href: '/#about' },
    { name: 'Contact', href: '/#contact' },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    
    const url = new URL(href, window.location.origin);
    const filter = url.searchParams.get('filter');
    
    if (filter) {
      if (url.hash === '#services') window.dispatchEvent(new CustomEvent('setServiceFilter', { detail: filter }));
      if (url.hash === '#portfolio') window.dispatchEvent(new CustomEvent('setPortfolioFilter', { detail: filter }));
      if (url.hash === '#case-studies') window.dispatchEvent(new CustomEvent('setCaseStudyFilter', { detail: filter }));
    } else {
      if (url.hash === '#services') window.dispatchEvent(new CustomEvent('setServiceFilter', { detail: 'All' }));
      if (url.hash === '#portfolio') window.dispatchEvent(new CustomEvent('setPortfolioFilter', { detail: 'All' }));
      if (url.hash === '#case-studies') window.dispatchEvent(new CustomEvent('setCaseStudyFilter', { detail: 'All' }));
    }

    const cleanHref = url.pathname + url.hash;
    navigate(cleanHref);

    setTimeout(() => {
      if (url.hash) {
        const id = url.hash.replace('#', '');
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      } else if (url.pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  };

  const scrollToContact = () => {
    setIsOpen(false);
    if (location.pathname !== '/') {
      navigate('/#contact');
    } else {
      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const LogoMark = () => (
    <Link to="/" onClick={(e) => handleLinkClick(e, '/')} className="group flex items-baseline select-none relative" aria-label="Hafiz Portfolio">
      <span className="font-display font-black text-3xl tracking-tighter text-[#000] uppercase group-hover:text-gray-700 transition-colors z-10">
        HAFIZ
      </span>
      <span className="w-2 h-2 bg-brandAccent ml-1 mb-1 shadow-[0_0_10px_var(--color-brandAccentGlow)] z-10 group-hover:scale-150 transition-transform duration-300"></span>
      {/* Brutalist offset shadow for logo on hover */}
      <span className="font-display font-black text-3xl tracking-tighter text-brandAccent uppercase absolute top-0 left-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:translate-y-1 transition-all z-0 pointer-events-none">
        HAFIZ
      </span>
    </Link>
  );

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-brandBg border-b border-black/10 py-4 shadow-sm'
            : 'bg-transparent border-b border-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <LogoMark />

          <nav className="hidden lg:block">
            <ul className="flex items-center space-x-8">
              {navLinks.map((link) => (
                <li key={link.name} className="relative group py-2">
                  <Link
                    to={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-xs tracking-widest uppercase font-bold text-brandMuted hover:text-brandAccent transition-colors duration-300 flex items-center gap-1"
                  >
                    {link.name}
                    {link.subLinks && <ChevronDown size={14} className="ml-0.5 group-hover:rotate-180 transition-transform duration-300" />}
                  </Link>
                  
                  {link.subLinks && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-black/10 shadow-[4px_4px_0px_var(--color-brandAccent)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                      <ul className="flex flex-col">
                        {link.subLinks.map((subLink) => (
                          <li key={subLink.name}>
                            <Link
                              to={subLink.href}
                              onClick={(e) => handleLinkClick(e, subLink.href)}
                              className="block px-4 py-3 text-xs tracking-widest uppercase font-bold text-brandMuted hover:text-brandAccent hover:bg-gray-50 transition-colors border-b border-black/5 last:border-b-0"
                            >
                              {subLink.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden lg:block">
            <button
              onClick={scrollToContact}
              className="cursor-pointer px-6 py-3 border border-brandAccent text-xs font-bold uppercase tracking-widest text-brandBg bg-brandAccent hover:bg-transparent hover:text-brandAccent hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_var(--color-brandAccent)] transition-all duration-300"
            >
              Book Consultation
            </button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden relative z-[60] text-[#000] hover:text-brandAccent transition-colors p-1 cursor-pointer"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Light Backdrop */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-[45] bg-white/95 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-y-0 right-0 z-[50] w-full max-w-sm flex flex-col bg-brandBg border-l border-black/10 shadow-2xl transform transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) lg:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-8 py-6 border-b border-black/10">
          <LogoMark />
          <button
            onClick={() => setIsOpen(false)}
            className="cursor-pointer text-brandMuted hover:text-brandAccent transition-colors p-2 -mr-2"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-10">
          <ul className="space-y-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="block text-3xl font-display font-black text-[#000] hover:text-brandAccent transition-colors uppercase tracking-tighter"
                >
                  {link.name}
                </Link>
                {link.subLinks && (
                  <ul className="mt-4 ml-4 space-y-4 border-l-2 border-brandAccent/20 pl-4">
                    {link.subLinks.map((subLink) => (
                      <li key={subLink.name}>
                        <Link
                          to={subLink.href}
                          onClick={(e) => handleLinkClick(e, subLink.href)}
                          className="block text-xl font-display font-bold text-brandMuted hover:text-brandAccent transition-colors uppercase tracking-tight"
                        >
                          {subLink.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="px-8 py-8 border-t border-black/10 bg-gray-50/80">
          <button
            onClick={scrollToContact}
            className="cursor-pointer block w-full text-center py-4 border border-brandAccent text-xs font-bold uppercase tracking-widest text-brandBg bg-brandAccent hover:bg-transparent hover:text-brandAccent hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_var(--color-brandAccent)] transition-all duration-300"
          >
            Book Consultation
          </button>
        </div>
      </div>
    </>
  );
}
