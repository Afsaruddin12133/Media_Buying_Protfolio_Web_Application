import React, { useEffect } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import { Calendar, MessageSquare, Clock } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const PERKS = [
  { icon: Calendar, text: 'Free 30-min strategy call' },
  { icon: MessageSquare, text: 'No sales pitch — pure value' },
  { icon: Clock, text: 'Results-focused conversation' },
];

export default function Contact() {
  const ref = useScrollReveal();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);
    return () => { if (document.body.contains(script)) document.body.removeChild(script); };
  }, []);

  return (
    <section id="contact" ref={ref} className="py-28 px-6 md:px-12 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="reveal text-center max-w-2xl mx-auto mb-12 space-y-3">
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-blue-400">Let's Talk</p>
          <h2 className="text-3xl md:text-4xl font-black font-display text-white">
            Schedule Your <span className="text-gradient">Free Strategy Call</span>
          </h2>
          <div className="section-divider w-24 mx-auto" />
          <p className="text-sm text-slate-400 leading-relaxed">
            Book a direct strategy session. We'll map out exactly how to scale your brand with predictable, data-driven ad frameworks.
          </p>
        </div>

        {/* Perks */}
        <div className="reveal flex flex-wrap justify-center gap-4 mb-10">
          {PERKS.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2.5 px-4 py-2.5 glass-card rounded-full border border-white/5">
              <Icon size={13} className="text-blue-400 flex-shrink-0" />
              <span className="text-xs text-slate-300 font-medium">{text}</span>
            </div>
          ))}
        </div>

        {/* Calendly Widget */}
        <div className="reveal glass-card border border-blue-500/15 p-2 md:p-3 rounded-2xl shadow-[0_0_60px_rgba(59,130,246,0.08)] overflow-hidden">
          <div
            className="calendly-inline-widget w-full rounded-xl overflow-hidden"
            data-url="https://calendly.com/afsaruddin12133/free-media-buying-call-for-your-business?background_color=060913&text_color=f8fafc&primary_color=3b82f6"
            style={{ minWidth: '320px', height: '700px' }}
          />
        </div>
      </div>
    </section>
  );
}
