import React, { useEffect } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import { Calendar, MessageSquare, Clock, CheckCircle2, AlertTriangle } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const PERKS = [
  { icon: Calendar, text: 'Free 30-min strategy call' },
  { icon: MessageSquare, text: 'No sales pitch — pure value' },
  { icon: Clock, text: 'Results-focused conversation' },
];

const BULLETS = [
  "Review of your current Meta Ads and Google Ads performance",
  "Identification of the biggest opportunities and bottlenecks affecting growth",
  "Actionable recommendations to improve ROAS, lower CPA, and increase conversions",
  "Creative and messaging insights to help your ads stand out and convert better",
  "Tracking audit covering Pixel, Conversions API (CAPI), GA4, and attribution accuracy",
  "A customized scaling roadmap based on your goals, budget, and market",
  "Clear next steps you can implement immediately to improve performance"
];

export default function Contact() {
  const ref = useScrollReveal();

  return (
    <section id="contact" ref={ref} className="py-32 px-6 md:px-12 relative overflow-hidden bg-brandBg border-b border-black/10">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="reveal text-center mb-16 space-y-4">
          <h2 className="text-5xl md:text-6xl font-black font-display text-[#000] uppercase tracking-tighter leading-none">
            Schedule Your <br />
            <span className="text-brandAccent">Strategy Call.</span>
          </h2>
          <p className="text-sm text-brandMuted max-w-xl mx-auto pt-4 font-medium leading-relaxed">
            Book a direct strategy session. We'll map out exactly how to scale your brand with predictable, data-driven ad frameworks.
          </p>
        </div>

        {/* Perks */}
        <div className="reveal flex flex-wrap justify-center gap-6 mb-16">
          {PERKS.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-3 px-6 py-3 bg-white border border-black/10 shadow-[4px_4px_0px_var(--color-brandAccent)]">
              <Icon size={16} className="text-brandAccent flex-shrink-0" />
              <span className="text-xs text-[#000] font-bold uppercase tracking-widest">{text}</span>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-12">
          
          {/* Left Column: What you'll get */}
          <div className="reveal lg:h-full">
            <div className="bg-white border border-black/10 p-6 md:p-8 shadow-[4px_4px_0px_var(--color-brandAccent)] lg:shadow-[8px_8px_0px_var(--color-brandAccent)] lg:h-full">
              <h3 className="text-xl md:text-2xl font-black font-display text-[#000] uppercase tracking-tight mb-8">
                What You'll Get Inside This Free Strategy Call
              </h3>
              
              <ul className="space-y-4 md:space-y-5">
                {BULLETS.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <CheckCircle2 size={24} className="text-brandAccent flex-shrink-0 mt-0.5" />
                    <span className="text-sm md:text-base text-brandMuted font-medium leading-relaxed">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Calendly Iframe */}
          <div className="reveal lg:h-full">
            <div className="border border-black/10 bg-white p-2 md:p-4 shadow-[4px_4px_0px_var(--color-brandAccent)] lg:shadow-[8px_8px_0px_var(--color-brandAccent)] lg:h-full">
              <iframe
                src="https://calendly.com/hafizur-personal01/30min?embed_domain=true&embed_type=Inline&hide_event_type_details=1&hide_gdpr_banner=1&background_color=ffffff&text_color=0a0a0a&primary_color=2563eb"
                width="100%"
                height="100%"
                frameBorder="0"
                title="Schedule a Call"
                className="w-full h-[600px] lg:h-[700px]"
                loading="eager"
              ></iframe>
            </div>
          </div>

        </div>

        {/* Full Width Footer Sections */}
        <div className="reveal space-y-6">
          <div className="p-6 md:p-8 bg-brandBg border border-black/10 shadow-[4px_4px_0px_var(--color-brandAccent)]">
            <p className="text-lg md:text-xl font-bold text-[#000] text-center leading-relaxed">
              Most business owners leave with a clearer growth strategy, a better understanding of their data, and a practical action plan for scaling profitably.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-start gap-4 p-6 md:p-8 bg-yellow-50 border border-yellow-200 text-yellow-800 shadow-[4px_4px_0px_rgba(202,138,4,0.3)]">
            <AlertTriangle size={32} className="flex-shrink-0 mt-1 text-yellow-600" />
            <p className="text-base md:text-lg font-medium leading-relaxed">
              <strong className="text-yellow-900 block mb-1 text-xl">Please Note:</strong>
              I reserve a limited number of strategy sessions each week to ensure every call receives my full attention. If you cannot attend, please reschedule or let me know in advance so the slot can be offered to another business owner.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
