import React from 'react';
import { portfolioData } from '../data/portfolioData';

export default function Hero() {
  const { name, title, bio, heroVideoUrl, ctaPrimary, ctaSecondary } = portfolioData.personalInfo;

  return (
    <section className="relative min-h-screen pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto flex items-center">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brandAccent/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
        {/* Left copy */}
        <div className="space-y-6 md:space-y-8 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display leading-tight text-brandText">
            Hi, I'm <span className="text-brandAccent">{name}</span>. <br />
            {title}
          </h1>
          <p className="text-base md:text-lg text-brandMuted max-w-xl mx-auto lg:mx-0 leading-relaxed">
            {bio}
          </p>
          
          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a
              href={ctaPrimary.link}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-3.5 bg-brandAccent hover:bg-blue-600 text-brandText text-xs font-bold uppercase tracking-widest transition-all duration-300 text-center"
            >
              {ctaPrimary.text}
            </a>
            <a
              href={ctaSecondary.link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 bg-transparent border border-gray-750 hover:border-brandMuted hover:bg-gray-800/40 text-brandText text-xs font-bold uppercase tracking-widest transition-all duration-300 text-center"
            >
              {ctaSecondary.text}
            </a>
          </div>
        </div>

        {/* Right Video Showcase */}
        <div className="w-full">
          <div className="relative pb-[56.25%] h-0 border border-gray-850 shadow-2xl bg-brandCard">
            <iframe
              src={heroVideoUrl}
              title={`${name} Portfolio Intro`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              className="absolute top-0 left-0 w-full h-full"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
