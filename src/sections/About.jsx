import React from 'react';
import { portfolioData } from '../data/portfolioData';
import useScrollReveal from '../hooks/useScrollReveal';
import { Award, TrendingUp, Shield, Zap } from 'lucide-react';

const HIGHLIGHTS = [
  { icon: TrendingUp, label: 'Data-Driven', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { icon: Zap, label: 'Fast Setup', color: 'text-amber-400', bg: 'bg-amber-500/10' },
  { icon: Shield, label: 'Privacy-Ready', color: 'text-green-400', bg: 'bg-green-500/10' },
  { icon: Award, label: 'Certified', color: 'text-violet-400', bg: 'bg-violet-500/10' },
];

export default function About() {
  const { aboutHeading, aboutParagraph1, aboutParagraph2 } = portfolioData.personalInfo;
  const stats = portfolioData.stats;
  const ref = useScrollReveal();

  return (
    <section id="about" ref={ref} className="py-28 px-6 md:px-12 relative overflow-hidden border-t border-white/5">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/3 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative z-10">

        {/* LEFT — image + stats */}
        <div className="lg:col-span-5 flex flex-col gap-5 reveal-left">
          {/* Profile Image with gradient border */}
          <div className="relative group">
            <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-br from-blue-500/60 via-violet-500/40 to-cyan-500/40 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative w-full h-[360px] rounded-xl overflow-hidden border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop&q=80"
                alt="Hafiz — Performance Marketer"
                loading="lazy"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#060913]/70 via-transparent to-transparent" />
              {/* Name tag */}
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white font-black text-lg font-display">Hafiz.</p>
                <p className="text-blue-400 text-xs font-semibold tracking-wider uppercase">Performance Marketer</p>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="glass-card rounded-xl p-5 text-center group hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(59,130,246,0.2)] transition-all duration-300 hover:border-blue-500/30 border border-white/5"
              >
                <div className="text-3xl font-black font-display text-gradient mb-1 group-hover:scale-105 transition-transform duration-200">
                  {stat.value}
                </div>
                <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest leading-normal">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Highlight badges */}
          <div className="grid grid-cols-4 gap-2">
            {HIGHLIGHTS.map(({ icon: Icon, label, color, bg }) => (
              <div key={label} className={`${bg} rounded-xl p-3 flex flex-col items-center gap-1.5 border border-white/5`}>
                <Icon size={16} className={color} />
                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — narrative */}
        <div className="lg:col-span-7 lg:pl-6 space-y-7 pt-2 reveal-right">
          <div>
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-blue-400 mb-3">About Me</p>
            <h2 className="text-3xl md:text-4xl font-black font-display text-white leading-tight">
              {aboutHeading.split('.')[0]}
              <span className="text-gradient">.</span>
            </h2>
          </div>

          <div className="space-y-4">
            <p className="text-base text-slate-400 leading-relaxed">{aboutParagraph1}</p>
            <p className="text-base text-slate-400 leading-relaxed">{aboutParagraph2}</p>
          </div>

          {/* Trust indicators */}
          <div className="pt-2 space-y-3">
            {[
              'Meta Blueprint Certified Media Buyer',
              'Google Ads certified — Search, Shopping & PMax',
              'Server-Side GTM & Conversions API specialist',
              'TikTok Ads performance creative strategist',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                <span className="text-sm text-slate-300 font-medium">{item}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="cursor-pointer px-7 py-3.5 bg-gradient-to-r from-blue-600 to-violet-600 text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:from-blue-500 hover:to-violet-500 transition-all duration-300 hover:shadow-[0_0_25px_rgba(99,102,241,0.5)]"
            >
              Work With Me
            </button>
            <button
              onClick={() => document.querySelector('#media-buying')?.scrollIntoView({ behavior: 'smooth' })}
              className="cursor-pointer px-7 py-3.5 border border-white/10 hover:border-blue-500/50 text-slate-300 hover:text-white text-xs font-bold uppercase tracking-widest rounded-lg transition-all duration-300 hover:bg-blue-500/10"
            >
              View Services
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
