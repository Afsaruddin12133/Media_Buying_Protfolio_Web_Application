import React from 'react';
import { portfolioData } from '../data/portfolioData';

export default function Footer() {
  const { whatsappUrl } = portfolioData.personalInfo;

  const socialLinks = [
    { name: 'LinkedIn', href: '#', color: 'hover:text-blue-400' },
    { name: 'Fiverr', href: '#', color: 'hover:text-green-400' },
    { name: 'Upwork', href: '#', color: 'hover:text-emerald-400' },
    { name: 'WhatsApp', href: whatsappUrl, color: 'hover:text-green-400' },
  ];

  return (
    <footer className="relative border-t border-white/5 bg-[#050810] overflow-hidden">
      {/* Top gradient line */}
      <div className="section-divider" />

      {/* Subtle glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-blue-500/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-14 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">

          {/* Logo */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="flex items-center gap-1.5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-violet-700 flex items-center justify-center">
                <svg width="15" height="15" viewBox="0 0 20 20" fill="none">
                  <path d="M4 3V17M16 3V17M4 10H16" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-sm font-black tracking-[0.18em] text-white font-display uppercase">HAFIZ</span>
            </div>
            <p className="text-[10px] text-slate-600 uppercase tracking-[0.25em]">Performance Marketer</p>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-8">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-xs font-semibold tracking-wider text-slate-500 ${link.color} transition-colors duration-200`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* CTA */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-violet-600 text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:from-blue-500 hover:to-violet-500 transition-all duration-300 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]"
          >
            Work With Me
          </a>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-slate-600 uppercase tracking-widest">
            © {new Date().getFullYear()} HAFIZ. All Rights Reserved.
          </p>
          <p className="text-[11px] text-slate-700 tracking-wide">
            Media Buying · Performance Marketing · Conversion Tracking
          </p>
        </div>
      </div>
    </footer>
  );
}
