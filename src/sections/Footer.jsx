import React from 'react';
import { portfolioData } from '../data/portfolioData';

export default function Footer() {
  const { logoText } = portfolioData.personalInfo;

  const socialLinks = [
    { name: 'LinkedIn', href: '#' },
    { name: 'Fiverr', href: '#' },
    { name: 'Upwork', href: '#' },
    { name: 'WhatsApp', href: '#' },
  ];

  return (
    <footer className="text-center py-12 px-6 md:px-12 border-t border-gray-800 bg-[#090d16]">
      <div className="max-w-7xl mx-auto flex flex-col items-center space-y-6">
        {/* Social links grid */}
        <div className="flex justify-center space-x-8">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs md:text-sm font-semibold tracking-wider text-brandMuted hover:text-brandAccent transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* copyright notes */}
        <p className="text-2xs text-brandMuted uppercase tracking-widest font-medium">
          &copy; {new Date().getFullYear()} <span className="text-brandText font-bold">{logoText}.</span> All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
