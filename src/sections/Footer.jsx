import React from 'react';
import { Link } from 'react-router-dom';
import { portfolioData } from '../data/portfolioData';

export default function Footer() {
  const { whatsappUrl, email } = portfolioData.personalInfo;

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/#about' },
    { name: 'Portfolio', href: '/#portfolio' },
    { name: 'Case Studies', href: '/#case-studies' },
  ];

  const servicesLinks = [
    { name: 'Media Buying', href: '/#services' },
    { name: 'Video Editing', href: '/#video-portfolio' },
    { name: 'Creative Strategy', href: '/#services' },
    { name: 'Analytics', href: '/#services' },
  ];

  const socialLinks = [
    { name: 'LinkedIn', href: '#', color: 'hover:text-brandAccent' },
    { name: 'Fiverr', href: '#', color: 'hover:text-brandAccent' },
    { name: 'Upwork', href: '#', color: 'hover:text-brandAccent' },
    { name: 'WhatsApp', href: whatsappUrl, color: 'hover:text-brandAccent' },
  ];

  const LogoMark = () => (
    <Link to="/" className="group flex items-baseline select-none relative w-fit mb-6" aria-label="Hafiz Portfolio">
      <span className="font-display font-black text-4xl tracking-tighter text-[#000] uppercase group-hover:text-gray-800 transition-colors z-10">
        HAFIZ
      </span>
      <span className="w-3 h-3 bg-brandAccent ml-1 mb-1 shadow-[0_0_10px_var(--color-brandAccentGlow)] z-10 group-hover:scale-150 transition-transform duration-300"></span>
      {/* Brutalist offset shadow for logo on hover */}
      <span className="font-display font-black text-4xl tracking-tighter text-brandAccent uppercase absolute top-0 left-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:translate-y-1 transition-all z-0 pointer-events-none">
        HAFIZ
      </span>
    </Link>
  );

  return (
    <footer className="relative bg-brandBg border-t border-black/10 pt-12 pb-6 overflow-hidden">
      
      {/* Stark Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-4 space-y-4">
            <LogoMark />
            <p className="text-xs text-brandMuted leading-relaxed max-w-sm font-medium">
              Scaling e-commerce and lead-gen brands through data-driven strategies and high-converting video creatives.
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h4 className="text-[10px] font-bold tracking-widest text-[#000] uppercase mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-xs text-brandMuted font-bold uppercase tracking-wider hover:text-brandAccent transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-bold tracking-widest text-[#000] uppercase mb-4">Services</h4>
            <ul className="space-y-2">
              {servicesLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-xs text-brandMuted font-bold uppercase tracking-wider hover:text-brandAccent transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 lg:col-start-10 space-y-4">
            <h4 className="text-[10px] font-bold tracking-widest text-[#000] uppercase mb-4">Contact</h4>
            <div className="space-y-2 text-xs text-brandMuted font-bold">
              <p className="uppercase tracking-widest">London, UK</p>
              <p>
                <a href={`mailto:${email || 'hello@expertagency.com'}`} className="hover:text-brandAccent transition-colors uppercase tracking-widest">
                  {email || 'hello@expertagency.com'}
                </a>
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-2">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-[9px] font-black uppercase tracking-widest text-[#000] border border-black/10 px-2 py-1 bg-white ${link.color} transition-colors`}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-black/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-brandMuted uppercase tracking-widest font-bold">
            © {new Date().getFullYear()} HAFIZ. All Rights Reserved.
          </p>
          <div className="flex gap-6 text-[10px] text-brandMuted font-bold uppercase tracking-widest">
            <Link to="#" className="hover:text-brandAccent transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-brandAccent transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
