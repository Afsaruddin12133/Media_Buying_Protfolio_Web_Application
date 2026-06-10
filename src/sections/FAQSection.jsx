import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import useScrollReveal from '../hooks/useScrollReveal';

function FAQItem({ faq, index }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`reveal group glass-card rounded-xl border transition-all duration-300 overflow-hidden ${
        open ? 'border-blue-500/40 shadow-[0_0_20px_rgba(59,130,246,0.1)]' : 'border-white/5 hover:border-white/10'
      }`}
      style={{ transitionDelay: `${index * 0.06}s` }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer"
      >
        <span className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors duration-200 leading-snug">
          {faq.question}
        </span>
        <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
          open ? 'bg-blue-500 rotate-180' : 'bg-white/5 group-hover:bg-white/10'
        }`}>
          <ChevronDown size={14} className="text-white" />
        </div>
      </button>

      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? 'max-h-96' : 'max-h-0'}`}>
        <p className="px-6 pb-6 text-sm text-slate-400 leading-relaxed border-t border-white/5 pt-4">
          {faq.answer}
        </p>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const faqs = portfolioData.faqs;
  const ref = useScrollReveal();

  return (
    <section id="faqs" ref={ref} className="py-28 px-6 md:px-12 bg-[#080d1a] relative overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <div className="reveal text-center mb-14 space-y-3">
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-blue-400">Got Questions?</p>
          <h2 className="text-3xl md:text-4xl font-black font-display text-white">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <div className="section-divider w-24 mx-auto" />
          <p className="text-sm text-slate-400">
            Quick answers about tracking, ad platforms, and how we work together.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem key={faq.id} faq={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
