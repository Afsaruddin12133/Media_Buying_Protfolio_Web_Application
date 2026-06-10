import React from 'react';
import { Megaphone, Search, Music, BarChart2, CheckCircle2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

// Static icon map — avoids wildcard import of all lucide icons
const ICON_MAP = {
  Megaphone: Megaphone,
  Search: Search,
  Music: Music,
  BarChart: BarChart2,
};

export default function Services() {
  const services = portfolioData.services;

  return (
    <section id="services" className="py-24 px-6 md:px-12 border-b border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-brandText">
            Core Specialization <span className="text-brandAccent">Pillars</span>
          </h2>
          <div className="w-16 h-1 bg-brandAccent mx-auto"></div>
          <p className="text-sm text-brandMuted">
            Deploying specialized funnels and data architectures to scale ad campaigns across primary networks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => {
            const IconComponent = ICON_MAP[service.icon] || BarChart2;

            return (
              <div
                key={service.id}
                className="bg-brandCard border border-gray-800 p-8 flex flex-col hover:border-brandAccent/60 transition-all duration-300 group"
              >
                <div className="space-y-6">
                  {/* Icon + Title row */}
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-brandAccent/10 border border-brandAccent/20 text-brandAccent group-hover:bg-brandAccent group-hover:text-brandText transition-all duration-300">
                      <IconComponent size={22} />
                    </div>
                    <h3 className="text-lg font-bold text-brandText font-display">
                      {service.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-xs md:text-sm text-brandMuted leading-relaxed">
                    {service.description}
                  </p>

                  {/* Feature bullets */}
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {service.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-2xs text-brandMuted">
                        <CheckCircle2 size={12} className="text-brandSuccess flex-shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
