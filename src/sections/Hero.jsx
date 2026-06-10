import React, { useEffect, useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import YoutubeEmbed from '../components/YoutubeEmbed';
import { TrendingUp, BarChart3 } from 'lucide-react';

const ROTATING_TITLES = ['Performance Marketer', 'Media Buyer', 'ROAS Optimizer', 'Ad Scaling Expert'];

export default function Hero() {
  const { name, bio, heroVideoUrl, whatsappUrl } = portfolioData.personalInfo;
  const allStats = portfolioData.stats;
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const current = ROTATING_TITLES[titleIndex];
    let t;
    if (!isDeleting && charIndex <= current.length) {
      t = setTimeout(() => { setDisplayed(current.slice(0, charIndex)); setCharIndex(c => c + 1); }, 70);
    } else if (!isDeleting && charIndex > current.length) {
      t = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && charIndex >= 0) {
      t = setTimeout(() => { setDisplayed(current.slice(0, charIndex)); setCharIndex(c => c - 1); }, 38);
    } else {
      setIsDeleting(false);
      setTitleIndex(i => (i + 1) % ROTATING_TITLES.length);
    }
    return () => clearTimeout(t);
  }, [charIndex, isDeleting, titleIndex]);

  const platforms = [
    { name: 'Meta Ads', color: 'from-blue-600 to-blue-500' },
    { name: 'Google Ads', color: 'from-teal-600 to-cyan-500' },
    { name: 'TikTok Ads', color: 'from-pink-600 to-rose-500' },
    { name: 'GTM Server', color: 'from-violet-700 to-purple-600' },
  ];

  return (
    <section className="relative min-h-screen pt-28 pb-20 px-6 md:px-12 max-w-7xl mx-auto flex items-center">
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[130px] -translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-violet-500/10 rounded-full blur-[130px] translate-x-1/2 pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center w-full">

        {/* LEFT */}
        <div className="space-y-6 text-center lg:text-left">
          {/* Name */}
          <div className="animate-slideUp" style={{ animationFillMode: 'both' }}>
            <p className="text-sm text-slate-500 font-medium tracking-[0.2em] uppercase mb-2">Hi, I'm</p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black font-display leading-[1.0] text-white">
              {name}<span className="text-gradient">.</span>
            </h1>
            <div className="h-9 flex items-center justify-center lg:justify-start mt-3">
              <span className="text-lg md:text-xl font-bold text-blue-400 font-display tracking-tight">
                {displayed}
                <span className="inline-block w-[2px] h-5 bg-blue-400 ml-0.5 align-middle animate-pulse" />
              </span>
            </div>
          </div>

          {/* Bio */}
          <p className="text-base text-slate-400 max-w-lg mx-auto lg:mx-0 leading-relaxed animate-fadeIn"
            style={{ animationDelay: '0.25s', animationFillMode: 'both' }}>
            {bio}
          </p>

          {/* Platform pills */}
          <div className="flex flex-wrap gap-2 justify-center lg:justify-start animate-fadeIn"
            style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
            {platforms.map(p => (
              <span key={p.name}
                className={`px-3 py-1 text-[10px] font-bold tracking-[0.15em] uppercase rounded-full bg-gradient-to-r ${p.color} text-white shadow-md`}>
                {p.name}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-3 pt-1 animate-slideUp"
            style={{ animationDelay: '0.45s', animationFillMode: 'both' }}>
            {allStats.map((s, i) => (
              <div key={i} className="text-center lg:text-left">
                <div className="text-xl md:text-2xl font-black font-display text-gradient">{s.value}</div>
                <div className="text-[9px] text-slate-500 uppercase tracking-wider leading-tight mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start animate-slideUp"
            style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
              className="cursor-pointer px-7 py-3.5 bg-gradient-to-r from-green-600 to-emerald-500 text-white text-xs font-bold uppercase tracking-widest rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] text-center flex items-center justify-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.557 4.126 1.526 5.855L0 24l6.335-1.506A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.784 9.784 0 0 1-4.988-1.365l-.358-.212-3.76.894.94-3.651-.233-.374A9.795 9.795 0 0 1 2.182 12c0-5.421 4.397-9.818 9.818-9.818 5.42 0 9.818 4.397 9.818 9.818 0 5.42-4.398 9.818-9.818 9.818z"/></svg>
              WhatsApp Now
            </a>
            <button onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="cursor-pointer px-7 py-3.5 border-2 border-blue-500 text-blue-300 hover:bg-blue-500 hover:text-white text-xs font-bold uppercase tracking-widest rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)] text-center">
              Schedule a Free Call
            </button>
          </div>
        </div>

        {/* RIGHT VIDEO */}
        <div className="w-full animate-fadeIn" style={{ animationDelay: '0.15s', animationFillMode: 'both' }}>
          <div className="relative">
            <div className="absolute -inset-[3px] rounded-2xl bg-gradient-to-br from-blue-500 via-violet-500 to-cyan-500 blur-sm opacity-60" />
            <div className="relative pb-[56.25%] h-0 rounded-xl overflow-hidden bg-[#060913]">
              <YoutubeEmbed url={heroVideoUrl} title={`${name} — Portfolio Showreel`} />
            </div>
            <div className="absolute -bottom-5 -left-5 glass-card border border-white/10 px-4 py-2.5 rounded-xl shadow-xl animate-float z-10">
              <div className="flex items-center gap-2">
                <TrendingUp size={15} className="text-green-400 flex-shrink-0" />
                <div>
                  <p className="text-xs font-black text-white leading-none">4.5x ROAS</p>
                  <p className="text-[9px] text-slate-500 uppercase tracking-wider mt-0.5">Avg. Return</p>
                </div>
              </div>
            </div>
            <div className="absolute -top-5 -right-5 glass-card border border-white/10 px-4 py-2.5 rounded-xl shadow-xl animate-float z-10" style={{ animationDelay: '1.5s' }}>
              <div className="flex items-center gap-2">
                <BarChart3 size={15} className="text-blue-400 flex-shrink-0" />
                <div>
                  <p className="text-xs font-black text-white leading-none">$1M+ Spent</p>
                  <p className="text-[9px] text-slate-500 uppercase tracking-wider mt-0.5">Ad Budget</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
