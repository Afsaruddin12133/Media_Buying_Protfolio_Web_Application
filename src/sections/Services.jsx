import React from 'react';
import { Megaphone, Search, Music, BarChart2, CheckCircle2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import useScrollReveal from '../hooks/useScrollReveal';

const ICON_MAP = { Megaphone, Search, Music, BarChart: BarChart2 };

const GRADIENT_MAP = {
  'meta-ads': 'from-blue-600 to-blue-500',
  'google-ads': 'from-cyan-600 to-teal-500',
  'tiktok-ads': 'from-pink-600 to-rose-500',
  'conversion-tracking': 'from-violet-600 to-purple-500',
};

export default function Services() {
  const services = portfolioData.services;
  const ref = useScrollReveal();

  return (
    <section id="media-buying" ref={ref} className="py-28 px-6 md:px-12 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute right-0 top-1/3 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute left-0 bottom-1/3 w-[300px] h-[300px] bg-violet-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="reveal text-center max-w-2xl mx-auto mb-16 space-y-3">
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-blue-400">What I Do</p>
          <h2 className="text-3xl md:text-4xl font-black font-display text-white">
            Core <span className="text-gradient">Specializations</span>
          </h2>
          <div className="section-divider w-24 mx-auto" />
          <p className="text-sm text-slate-400 leading-relaxed">
            Deploying specialized funnels and data architectures to scale ad campaigns predictably across all major networks.
          </p>
        </div>

        {/* Services grid */}
        <div className="reveal-stagger grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => {
            const IconComponent = ICON_MAP[service.icon] || BarChart2;
            const grad = GRADIENT_MAP[service.id] || 'from-blue-600 to-violet-600';

            return (
              <div
                key={service.id}
                className="group glass-card rounded-2xl p-8 flex flex-col border border-white/5 hover:border-blue-500/30 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] transition-all duration-400 overflow-hidden relative"
              >
                {/* Subtle gradient corner */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${grad} opacity-0 group-hover:opacity-5 rounded-bl-full transition-opacity duration-500`} />

                <div className="space-y-5">
                  {/* Icon + Title */}
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${grad} flex items-center justify-center shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent size={22} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white font-display leading-tight">{service.title}</h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-400 leading-relaxed">{service.description}</p>

                  {/* Bullets */}
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    {service.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-400">
                        <CheckCircle2 size={13} className="text-green-400 flex-shrink-0 mt-0.5" />
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
