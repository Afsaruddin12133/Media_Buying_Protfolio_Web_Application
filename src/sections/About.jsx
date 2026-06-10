import React from 'react';
import { portfolioData } from '../data/portfolioData';

export default function About() {
  const { aboutHeading, aboutParagraph1, aboutParagraph2 } = portfolioData.personalInfo;
  const stats = portfolioData.stats;

  return (
    <div id="about" className="bg-[#0f172a] py-24 px-6 md:px-12 border-t border-b border-gray-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Image + Stats */}
        <div className="lg:col-span-5 flex flex-col gap-6 w-full">
          {/* Profile Image */}
          <div className="w-full h-[380px] overflow-hidden border border-gray-800 bg-brandCard">
            <img
              src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop&q=80"
              alt="Hafiz"
              loading="lazy"
              className="w-full h-full object-cover object-top hover:scale-102 transition-transform duration-500"
            />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="bg-brandCard border border-gray-800 p-6 text-center group hover:border-brandAccent transition-colors duration-300"
              >
                <h3 className="text-3xl font-bold font-display text-brandAccent mb-1.5 group-hover:scale-105 transition-transform duration-200">
                  {stat.value}
                </h3>
                <p className="text-4xs font-semibold text-brandMuted uppercase tracking-widest leading-normal">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Narrative Copy */}
        <div className="lg:col-span-7 lg:pl-6 space-y-6 pt-2">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-brandText leading-tight">
            {aboutHeading.split('.').map((part, index) => {
              if (index === 1) {
                return (
                  <span key={index} className="text-brandAccent">
                    .{part}
                  </span>
                );
              }
              return part;
            })}
          </h2>
          <p className="text-sm md:text-base text-brandMuted leading-relaxed">
            {aboutParagraph1}
          </p>
          <p className="text-sm md:text-base text-brandMuted leading-relaxed">
            {aboutParagraph2}
          </p>
        </div>
      </div>
    </div>
  );
}
